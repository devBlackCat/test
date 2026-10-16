// Shared itinerary reservation checklist. Every scheduled stop is shown, whether or not tickets are required.
// Unchecked by default. Uses existing reservationDone key so home and the checklist share confirmation state.
(function initReservationPage(){
  "use strict";
  const page=document.getElementById("reservationPage"),home=document.getElementById("workspace");
  const list=document.getElementById("reservationRows"),summary=document.getElementById("reservationStats"),filters=document.getElementById("reservationFilters");
  if(!page||!home||!list||!summary||!filters)return;
  let view="all";
  const safe=v=>escapeHtml(String(v??""));
  function getRows(day){
    const rows=[];
    for(const item of currentSchedule()[day]||[]){
      if(item.routeId&&itemPlaceIds(item).length){
        const group=routeById(item.routeId);
        for(const id of itemPlaceIds(item)){
          const place=placeById(id);
          rows.push({item,day,place,id,title:place?.title||id,group:group?.title||"",key:reservationKey(id,day)});
        }
      }else{
        const id=item.placeId||null,place=id?placeById(id):null;
        rows.push({item,day,place,id,title:place?.title||item.title||routeById(item.routeId)?.title||"직접 추가한 일정",group:"",
          key:reservationKey(id||"custom-"+item.uid,day)});
      }
    }
    return rows;
  }
  const done=r=>state.reservationDone?.[r.key]===true;
  function renderEntry(r){
    const checked=done(r),rule=r.id?RESERVATION_RULES[r.id]:null;
    const time=r.item.start?`${r.item.start}${r.item.end?" – "+r.item.end:""}`:"시간 미정";
    const image=r.place?.image&&r.place.image!==FALLBACK
      ?`<img class="res-thumb" src="${safe(r.place.image)}" alt="" loading="lazy" decoding="async">`
      :'<span class="res-thumb res-placeholder" aria-hidden="true">📍</span>';
    return `<article class="res-item ${checked?"res-complete":"res-pending"}">${image}
      <div class="res-item-info"><strong>${safe(r.title)}</strong><div class="res-item-meta">
        <span>${safe(time)}</span>${r.group?`<span>${safe(r.group)}</span>`:""}
        ${rule?`<span class="res-requirement">${safe(rule.level==="required"?"예약 필수":rule.level==="conditional"?"입장 확인":"예약 권장")}</span>`:""}
      </div></div>
      <label class="res-status"><input type="checkbox" data-reservation-check="${safe(r.key)}" ${checked?"checked":""} aria-label="${safe(r.title)} 예약 완료"><span>${checked?"예약 완료":"미완료"}</span></label>
    </article>`;
  }
  function renderReservations(){
    const data=activeDays().map(day=>({day,rows:getRows(day)}));
    const all=data.flatMap(group=>group.rows),completed=all.filter(done).length;
    summary.innerHTML=`<span>전체 <b>${all.length}</b></span><span>미완료 <b>${all.length-completed}</b></span><span>완료 <b>${completed}</b></span>`;
    filters.querySelectorAll("[data-booking-filter]").forEach(button=>{
      const active=button.dataset.bookingFilter===view;
      button.classList.toggle("active",active);
      button.setAttribute("aria-pressed",String(active));
    });
    const shown=data.map(({day,rows})=>({day,rows:rows.filter(r=>view==="all"||(view==="done"?done(r):!done(r)))}))
      .filter(group=>group.rows.length);
    list.innerHTML=shown.map(({day,rows})=>`<section class="res-day">
      <header><strong>${safe(DAY_META[day]?.date||"5/"+day)}</strong><span>${safe(DAY_META[day]?.week||"")}요일</span><small>${rows.length}개</small></header>
      <div class="res-day-items">${rows.map(renderEntry).join("")}</div>
    </section>`).join("")||'<div class="res-empty">표시할 일정이 없습니다. 홈에서 일정을 추가하거나 필터를 변경하세요.</div>';
    list.querySelectorAll("img.res-thumb").forEach(img=>{
      img.onerror=()=>{const placeholder=document.createElement("span");placeholder.className="res-thumb res-placeholder";placeholder.textContent="📍";img.replaceWith(placeholder)};
    });
  }
  function showPage(){
    const isReservation=window.location.hash==="#reservations";
    home.hidden=isReservation;
    page.hidden=!isReservation;
    document.querySelectorAll("[data-page-nav]").forEach(link=>{
      const active=link.dataset.pageNav===(isReservation?"reservations":"home");
      link.classList.toggle("active",active);
      if(active)link.setAttribute("aria-current","page");else link.removeAttribute("aria-current");
    });
    if(isReservation)renderReservations();
  }
  filters.addEventListener("click",event=>{
    const button=event.target.closest("[data-booking-filter]");
    if(!button)return;view=button.dataset.bookingFilter;renderReservations();
  });
  list.addEventListener("change",event=>{
    const input=event.target.closest("[data-reservation-check]");
    if(!input)return;
    const key=input.dataset.reservationCheck;
    if(!activeDays().some(day=>getRows(day).some(r=>r.key===key)))return;
    state.reservationDone[key]=input.checked;
    persist();
    renderBoard();
  });
  const originalRenderBoard=renderBoard;
  renderBoard=function(){originalRenderBoard();if(!page.hidden)renderReservations()};
  window.addEventListener("hashchange",showPage);
  showPage();
})();
