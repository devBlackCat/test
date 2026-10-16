// Shared itinerary participation, attendee portrait controls, manually confirmed transit legs and item budget estimates.
// Deliberately one shared schedule; no copied person-specific plans.
(function installTripGroupDashboard(){
  "use strict";
  const people=window.TRIP_PARTICIPANTS||[];
  const guide=window.TRIP_BUDGET_DEFAULTS||{priceGuide:{},assumptions:{}};
  if(people.length!==5||typeof state==="undefined"||typeof renderBoard!=="function"){
    console.warn("Trip group widgets: prerequisites unavailable");return;
  }
  const allIds=people.map(p=>p.id);
  let pickedPerson=null;
  const expandedCards=new Set();
  const yen=n=>"¥"+Math.round(n||0).toLocaleString("ja-JP");
  const safe=v=>escapeHtml(String(v??""));
  const itemList=day=>currentSchedule()[day]||[];
  const attendees=item=>{
    const saved=state.attendance?.[item.uid];
    return Array.isArray(saved)?allIds.filter(id=>saved.includes(id)):allIds.slice();
  };
  const person=id=>people.find(p=>p.id===id);
  const avatar=(p,cls="")=>`<img class="trip-avatar ${cls}" src="${p.avatar}" alt="${safe(p.name)}" title="${safe(p.name)}" draggable="false">`;
  const categoryNames={admission:"입장·체험",food:"식비",transport:"교통비",lodging:"숙박비",other:"기타"};
  const trimCurrency=(v)=>Number.isFinite(Number(v))&&Number(v)>=0&&Number(v)<=10000000?Math.round(Number(v)):null;
  const normalizePrice=(row)=>row&&Number.isInteger(row.yen)&&row.yen>=0?row:null;

  function priceFor(item) {
    const custom=state.budgetOverrides?.[item.uid];
    if(custom)return {yen:custom.yen,category:custom.category,confidence:"custom",note:"이 일정에서 직접 지정한 예상금액"};
    if(item.routeId){
      const ids=itemPlaceIds(item);
      const resolved=ids.map(id=>guide.priceGuide?.[id]).filter(Boolean);
      if(!resolved.length)return null;
      return {yen:resolved.reduce((sum,p)=>sum+p.yen,0),category:"other",
        confidence:"bundle",note:"묶음 내 확인된 항목의 합계(미확정 항목 별도)"};
    }
    if(item.placeId){
      // HARUKA fare varies by endpoint. Don't apply the Kyoto ticket to every use.
      if(item.placeId==="haruka"){
        const text=(item.memo||"")+" "+(item.title||"");
        if(/교토|kyoto/i.test(text))return normalizePrice(guide.priceGuide?.haruka);
        if(/오사카|osaka/i.test(text))return normalizePrice(guide.priceGuide?.harukaOsaka);
        return null;
      }
      const known=normalizePrice(guide.priceGuide?.[item.placeId]);
      if(known)return known;
      if(item.placeId==="ujitea")return {yen:guide.assumptions.teaJPY||750,category:"food",confidence:"assumption",note:"말차·디저트 1인 예산 가정"};
      if(item.placeId==="pokecafe")return {yen:2500,category:"food",confidence:"assumption",note:"테마 식사 1인 임시 예산 가정 (공식 메뉴 가격 아님)"};
    }
    const txt=(item.title||"")+" "+(item.memo||"").slice(0,70);
    if(/점심|저녁|조식|아침 식사|식사|식당|레스토랑/.test(txt))
      return {yen:guide.assumptions.mealJPY||1500,category:"food",confidence:"assumption",note:"일반 식사 1인 임시 예산 가정"};
    if(/간식|차 한잔|카페|디저트/.test(txt))
      return {yen:guide.assumptions.teaJPY||750,category:"food",confidence:"assumption",note:"간식·카페 1인 임시 예산 가정"};
    return null;
  }
  const legKey=(day,a,b)=>day+"|"+a+"|"+b;
  function legAttendees(entry){return allIds.filter(id=>entry.memberIds?.includes(id));}
  function personShare(entry,id){
    const ids=legAttendees(entry),idx=ids.indexOf(id);
    if(idx<0||!ids.length)return 0;
    if(entry.type==="per_person")return entry.yen;
    return Math.floor(entry.yen/ids.length)+(idx<(entry.yen%ids.length)?1:0);
  }
  function summary(days,personId=null){
    const amounts={admission:0,food:0,transport:0,lodging:0,other:0};
    let missing=0,confirmedCount=0;
    for(const day of days){
      for(const item of itemList(day)){
        const ids=attendees(item).filter(id=>!personId||id===personId);
        if(!ids.length)continue;
        const price=priceFor(item);
        if(price){
          amounts[price.category]=(amounts[price.category]||0)+price.yen*ids.length;
          confirmedCount++;
        }else missing++;
      }
      for(const [key,entry] of Object.entries(state.transportOverrides||{})){
        if(!key.startsWith(day+"|")||!entry||!Number.isInteger(entry.yen))continue;
        // A moved or removed schedule card invalidates the old transfer pair.
        const parts=key.split("|"),items=itemList(day);
        const fromIndex=items.findIndex(it=>it.uid===parts[1]);
        if(fromIndex<0||items[fromIndex+1]?.uid!==parts[2])continue;
        // A fare applies only to friends who still attend both endpoints.
        const activePayers=legAttendees(entry).filter(id=>attendees(items[fromIndex]).includes(id)&&attendees(items[fromIndex+1]).includes(id));
        const effective={...entry,memberIds:activePayers};
        const payers=activePayers.filter(id=>!personId||personId===id);
        for(const id of payers)amounts.transport+=personShare(effective,id);
      }
    }
    return {amounts,total:Object.values(amounts).reduce((a,b)=>a+b,0),missing,confirmedCount};
  }
  function cardParticipantHtml(item){
  const assigned=Array.isArray(state.attendance?.[item.uid]);
  const ids=attendees(item);
  if(!assigned&&!expandedCards.has(item.uid)){
    return `<button type="button" class="trip-attendees-default" data-expand-attendees="${safe(item.uid)}" title="전원 참여 · 누르면 5명 모두 표시하여 제외 가능">👥 전원 <span aria-hidden="true">▾</span></button>`;
  }
  return `<div class="trip-attendees-strip" aria-label="${safe(ids.length)}명 참여">
    <span class="trip-avatar-stack">${ids.map(id=>{
      const p=person(id);
      return `<button type="button" class="trip-card-person" data-remove-attendee="${safe(id)}" title="${safe(p.name)} 제외 · 끌어서 상단으로 돌려놓기" aria-label="${safe(p.name)} 참가 취소" draggable="true">${avatar(p,"trip-avatar-small")}</button>`;
    }).join("")}</span>
    <span class="trip-attendee-count">${assigned?`${ids.length}/5`:"전원"}</span>
    ${assigned?`<button type="button" class="trip-reset-all" data-reset-attendees="${safe(item.uid)}" title="5명 전원 참여로 초기화">전원 복구</button>`:""}
    ${ids.length===0?'<span class="trip-attendee-empty">참가자 없음</span>':""}
  </div>`;
}

  function renderTopBar(){
  const root=document.getElementById("participantToolbar");
  if(!root)return;
  root.innerHTML=`<span class="trip-members-label">일정에 넣기 →</span>${people.map(p=>`<button class="trip-top-person ${pickedPerson===p.id?"active":""}" type="button" draggable="true" data-pick-person="${p.id}" aria-pressed="${pickedPerson===p.id}" title="${safe(p.name)} · 일정으로 드래그하거나 클릭 후 일정 선택">${avatar(p)}</button>`).join("")}`;
  root.querySelectorAll("[data-pick-person]").forEach(btn=>{
    btn.addEventListener("dragstart",event=>{
      pickedPerson=null;
      event.dataTransfer.setData("text/person",btn.dataset.pickPerson);
      event.dataTransfer.effectAllowed="copy";
    });
    btn.addEventListener("click",()=>{
      pickedPerson=pickedPerson===btn.dataset.pickPerson?null:btn.dataset.pickPerson;
      renderTopBar();
    });
  });
  root.addEventListener("dragover",onTopDragOver);
  root.addEventListener("drop",onTopDrop);
  updateBudgetTop();
}

  function onTopDragOver(event){
  if(event.dataTransfer.types.includes("text/remove-person")){
    event.preventDefault();event.dataTransfer.dropEffect="move";
  }
}

  function onTopDrop(event){
  const raw=event.dataTransfer.getData("text/remove-person");
  if(!raw)return;
  event.preventDefault();event.stopPropagation();
  const [day,uid,id]=raw.split("|"),item=itemList(day).find(it=>it.uid===uid);
  if(item&&allIds.includes(id))removeParticipant(item,id);
}

  function updateBudgetTop(){
  const btn=document.getElementById("tripBudgetBtn");if(!btn)return;
  const sum=summary(activeDays());
  btn.textContent=`예상 합계 ${yen(sum.total)}${sum.missing?` · 미확정 ${sum.missing}`:""}`;
  btn.title="5명 합계 · 일부 교통·숙박·항공비는 아직 미확정. 누르면 세부 금액과 일정별 금액 편집";
}

  function assignParticipant(item,id){
  if(!item||!allIds.includes(id))return;
  const assigned=Array.isArray(state.attendance?.[item.uid]);
  const ids=assigned?attendees(item):[];
  if(ids.includes(id)){toast(`${person(id).name}은 이미 참가 중입니다.`);return}
  const next=allIds.filter(v=>ids.includes(v)||v===id);
  if(next.length===5)delete state.attendance[item.uid];
  else state.attendance[item.uid]=next;
  expandedCards.delete(item.uid);
  persist();renderBoard();toast(`${person(id).name} 참가자를 반영했습니다.`);
}

  function removeParticipant(item,id){
  if(!item||!allIds.includes(id))return;
  const next=attendees(item).filter(member=>member!==id);
  state.attendance[item.uid]=next;
  expandedCards.delete(item.uid);
  persist();renderBoard();toast(`${person(id).name}을(를) 이 일정에서 제외했습니다.`);
}

  function resetAll(item){
  if(!item)return;
  delete state.attendance[item.uid];
  expandedCards.delete(item.uid);
  persist();renderBoard();toast("5명 전원 참가로 복구했습니다.");
}

  function syncCardAvatars(){
  document.querySelectorAll(".schedule-card[data-item]").forEach(card=>{
    const item=itemList(card.dataset.day).find(it=>it.uid===card.dataset.item);
    if(!item)return;
    const copy=card.querySelector(".schedule-card-copy");if(!copy)return;
    copy.insertAdjacentHTML("beforeend",cardParticipantHtml(item));
    const participants=copy.querySelector(".trip-attendees-strip");
    copy.querySelector("[data-expand-attendees]")?.addEventListener("click",event=>{
      event.stopPropagation();expandedCards.add(item.uid);renderBoard();
    });
    participants?.querySelectorAll("[data-remove-attendee]").forEach(btn=>{
      btn.addEventListener("click",event=>{
        event.stopPropagation();removeParticipant(item,btn.dataset.removeAttendee);
      });
      btn.addEventListener("dragstart",event=>{
        event.stopPropagation();
        event.dataTransfer.setData("text/remove-person",`${card.dataset.day}|${item.uid}|${btn.dataset.removeAttendee}`);
        event.dataTransfer.effectAllowed="move";
      });
    });
    participants?.querySelector("[data-reset-attendees]")?.addEventListener("click",event=>{
      event.stopPropagation();resetAll(item);
    });
    // An avatar from the header can be dropped anywhere on the card, including the photo.
    card.addEventListener("dragover",event=>{
      if(!event.dataTransfer.types.includes("text/person"))return;
      event.preventDefault();event.stopPropagation();
      event.dataTransfer.dropEffect="copy";
      card.classList.add("trip-drop-person");
    });
    card.addEventListener("dragleave",event=>{
      if(!card.contains(event.relatedTarget))card.classList.remove("trip-drop-person");
    });
    card.addEventListener("drop",event=>{
      const id=event.dataTransfer.getData("text/person");
      if(!allIds.includes(id))return;
      event.preventDefault();event.stopPropagation();
      card.classList.remove("trip-drop-person");
      assignParticipant(item,id);
    });
    // Touch/keyboard alternative to drag: tap a header portrait, then a card.
    card.addEventListener("click",event=>{
      if(!pickedPerson||event.target.closest("button,input,label,a,summary"))return;
      event.preventDefault();event.stopImmediatePropagation();
      const id=pickedPerson;pickedPerson=null;
      assignParticipant(item,id);renderTopBar();
    },true);
  });
  document.querySelectorAll(".day-column").forEach(column=>{
    const day=column.dataset.day,cards=[...column.querySelectorAll(".schedule-card[data-item]")];
    cards.forEach((card,i)=>{
      if(i===0)return;
      const hint=card.previousElementSibling;
      if(!hint?.classList.contains("movement-hint")||hint.classList.contains("route-leg-choice"))return;
      const left=cards[i-1].dataset.item,right=card.dataset.item;
      const key=legKey(day,left,right),existing=state.transportOverrides?.[key];
      const button=document.createElement("button");
      button.type="button";button.className="trip-leg-fee";
      button.textContent=existing?`🚆 ${existing.mode==="walk"?"도보":existing.mode==="taxi"?"택시":existing.mode==="bus"?"버스":"교통"} ${yen(existing.yen)}${existing.type==="per_person"?"/인":"/전체"}`:"＋ 교통비";
      button.title="이 구간의 교통수단과 예상 요금을 설정";
      button.addEventListener("click",()=>editLeg(day,left,right));
      hint.appendChild(button);
    });
  });
  updateBudgetTop();
}

  function openBudget(){
    let dlg=document.getElementById("tripBudgetDialog");
    if(!dlg){dlg=document.createElement("dialog");dlg.id="tripBudgetDialog";dlg.className="dialog trip-dialog";document.body.appendChild(dlg)}
    const days=activeDays();
    const each=summary(days);
    dlg.innerHTML=`<div class="trip-modal-content">
      <div class="trip-modal-head"><h2>여행 예상 경비</h2><button type="button" aria-label="닫기" data-close-budget>×</button></div>
      <p class="trip-modal-note">JPY 기준 · 현재 조사 가격과 예산 가정의 합계입니다. <strong>항공·미확정 숙박·일부 교통비는 빠져 있습니다.</strong></p>
      <div class="trip-modal-total"><small>5명 전체 · 확인/가정된 비용</small><strong>${yen(each.total)}</strong><small>미확정 일정 ${each.missing}건</small></div>
      <div class="trip-budget-grid">${Object.entries(categoryNames).map(([key,name])=>`<div><span>${name}</span><b>${yen(each.amounts[key])}</b></div>`).join("")}</div>
      <h3>날짜별 비용</h3>
      <div class="trip-budget-days">${days.map(day=>{const sum=summary([day]);return `<div><span>5/${day}</span><b>${yen(sum.total)}</b><small>${sum.missing?sum.missing+"건 미확정":"확인값만 반영"}</small></div>`}).join("")}</div>
      <h3>5명 개인별 계산</h3>
      <div class="trip-budget-people">${people.map(p=>{const s=summary(days,p.id);return `<div>${avatar(p)}<span>${safe(p.name)}</span><b>${yen(s.total)}</b></div>`}).join("")}</div>
      <p class="trip-modal-note">USJ 임시 예산 ¥10,500은 <strong>실제 날짜별 티켓 가격이 아닙니다.</strong> 2027년 5월 방문 전 재확인해야 합니다. 입장료·교통비 기본값의 출처는 <a href="https://museum.nintendo.com/en/guide/index.html" target="_blank" rel="noopener">Nintendo Museum</a>, <a href="https://www.westjr.co.jp/travel-information/kr/tickets-passes/oneway/haruka/" target="_blank" rel="noopener">JR 서일본</a> 등입니다.</p>
    </div>`;
    dlg.querySelector("[data-close-budget]").onclick=()=>dlg.close();
    if(!dlg.open)dlg.showModal();
  }
  function editLeg(day,fromUid,toUid){
    const prev=itemList(day).find(x=>x.uid===fromUid),next=itemList(day).find(x=>x.uid===toUid);
    if(!prev||!next)return;
    let dlg=document.getElementById("tripTransitDialog");
    if(!dlg){dlg=document.createElement("dialog");dlg.id="tripTransitDialog";dlg.className="dialog trip-dialog";document.body.appendChild(dlg)}
    const key=legKey(day,fromUid,toUid),prevSaved=state.transportOverrides?.[key];
    const shared=attendees(prev).filter(id=>attendees(next).includes(id));
    const payers=prevSaved?prevSaved.memberIds:shared;
    const title=item=>item.placeId?placeById(item.placeId)?.title:item.routeId?routeById(item.routeId)?.title:item.title||"일정";
    const options=[["walk","도보"],["train","철도"],["bus","버스"],["taxi","택시"],["other","기타"]];
    dlg.innerHTML=`<form method="dialog" class="trip-modal-content">
      <div class="trip-modal-head"><h2>이동 구간 교통비</h2><button type="button" data-close-transit aria-label="닫기">×</button></div>
      <p class="trip-modal-note">${safe(title(prev))} → ${safe(title(next))}</p>
      <label class="trip-control-label">이동 방식
        <select id="tripTransitMode">${options.map(([v,t])=>`<option value="${v}" ${v===(prevSaved?.mode||"train")?"selected":""}>${t}</option>`).join("")}</select>
      </label>
      <label class="trip-control-label">요금 (JPY)
        <input type="number" id="tripTransitAmount" min="0" max="10000000" step="1" placeholder="실제 노선·요금 확인 후 입력" value="${prevSaved?.yen??""}">
      </label>
      <label class="trip-control-label">비용 계산
        <select id="tripTransitType"><option value="per_person" ${prevSaved?.type==="shared_total"?"":"selected"}>1인당 금액</option><option value="shared_total" ${prevSaved?.type==="shared_total"?"selected":""}>전체 요금 나누기 (택시 등)</option></select>
      </label>
      <div class="trip-control-label"><span>이 구간 이동 참가자</span><div class="trip-person-picker">${people.map(p=>`<label class="trip-person-option ${payers.includes(p.id)?"selected":""}"><input type="checkbox" value="${p.id}" data-transit-member ${payers.includes(p.id)?"checked":""}>${avatar(p)}<span>${safe(p.name)}</span></label>`).join("")}</div></div>
      <p class="trip-modal-note">지도상의 직선거리는 운임이 아닙니다. 요금을 확인할 수 없는 구간은 저장하지 마세요. HARUKA 등 기존 교통 일정 카드에 이미 입력한 비용과 중복 계상되지 않도록 확인하세요.</p>
      <div class="trip-modal-actions"><button type="button" data-transit-remove ${prevSaved?"":"disabled"}>이 구간 요금 삭제</button><button type="submit" class="trip-primary-action">저장</button></div>
    </form>`;
    const form=dlg.querySelector("form");
    dlg.querySelector("[data-close-transit]").onclick=()=>dlg.close();
    dlg.querySelectorAll("[data-transit-member]").forEach(ck=>ck.onchange=()=>ck.closest(".trip-person-option").classList.toggle("selected",ck.checked));
    const mode=dlg.querySelector("#tripTransitMode"),amount=dlg.querySelector("#tripTransitAmount");
    mode.onchange=()=>{if(mode.value==="walk")amount.value="0";else if(amount.value==="0"&&!prevSaved)amount.value=""};
    dlg.querySelector("[data-transit-remove]").onclick=()=>{delete state.transportOverrides[key];persist();dlg.close();renderBoard()};
    form.addEventListener("submit",event=>{
      event.preventDefault();
      const value=trimCurrency(amount.value),members=[...dlg.querySelectorAll("[data-transit-member]:checked")].map(x=>x.value);
      if(amount.value===""||value===null||!members.length){toast("요금과 이동 참가자를 확인하세요.");return}
      state.transportOverrides[key]={mode:mode.value,yen:value,type:dlg.querySelector("#tripTransitType").value,memberIds:members};
      persist();dlg.close();renderBoard();toast("교통비를 저장했습니다.");
    });
    if(!dlg.open)dlg.showModal();
  }
  const baseBoard=renderBoard;
  renderBoard=function(){baseBoard();syncCardAvatars()};
  document.getElementById("tripBudgetBtn")?.addEventListener("click",openBudget);
  renderTopBar();
  renderBoard();
})();
