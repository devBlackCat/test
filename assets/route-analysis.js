/* Route diagnostics v1: geographic straight-line comparison, offline and read-only until Apply.
   Values are approximate landmark/area coordinates, NOT walking, rail or driving distances.
   No network/API access and no changes to the shared schedule schema. */
(function () {
  "use strict";
  const geo = {
    kix:[34.435,135.244,"Kansai International Airport Terminal 1"],
    darakhyu:[37.460,126.440,"Darakhyu Incheon International Airport"],
    firstcabin:[34.437,135.245,"First Cabin Kansai Airport"],
    kixhotel:[34.437,135.245,"Aeroplaza Kansai Airport"],
    nikkokix:[34.436,135.244,"Hotel Nikko Kansai Airport"],
    washingtonkix:[34.410,135.297,"Kansai Airport Washington Hotel Rinku"],
    kixnearhotel:[34.410,135.297,"Rinku Town Station Osaka"],
    shinosaka:[34.733,135.500,"Shin-Osaka Station"],
    ekiben:[34.733,135.500,"Shin-Osaka Station"],
    pokemonstand:[34.733,135.500,"Shin-Osaka Station"],
    kyotohotel:[34.986,135.759,"Kyoto Station"],
    marufukuro:[34.991,135.763,"Marufukuro Kyoto"],
    pkmkyoto:[35.003,135.758,"Pokemon Center Kyoto SUINA MUROMACHI"],
    ninkyoto:[35.003,135.769,"Nintendo Kyoto Kyoto Takashimaya"],
    museum:[34.894,135.780,"Nintendo Museum Uji"],
    suntorykyoto:[34.919,135.697,"Suntory Kyoto Brewery Nagaokakyo"],
    osakahotel:[34.703,135.496,"Osaka Station Umeda"],
    ninosaka:[34.702,135.496,"Nintendo Osaka LUCUA SOUTH"],
    pkmosaka:[34.702,135.496,"Pokemon Center Osaka LUCUA SOUTH"],
    cardstation:[34.702,135.496,"Pokemon Card Station Osaka"],
    asahisuita:[34.762,135.525,"Asahi Beer Museum Suita"],
    shinsaibashi:[34.672,135.501,"Pokemon Center Osaka DX Daimaru Shinsaibashi"],
    pokecafe:[34.672,135.501,"Pokemon Cafe Osaka Daimaru Shinsaibashi"],
    kirbystore:[34.672,135.501,"Kirby Cafe The Store Osaka Daimaru Shinsaibashi"],
    dotonbori:[34.668,135.502,"Dotonbori Glico Sign Osaka"],
    usj:[34.665,135.432,"Universal Studios Japan"],
    snw:[34.665,135.433,"Super Nintendo World Universal Studios Japan"],
    powerup:[34.665,135.433,"Super Nintendo World Universal Studios Japan"],
    dendentown:[34.660,135.506,"Denden Town Otaroad Osaka"],
    superpotato:[34.661,135.505,"Super Potato Otaroad Osaka"],
    gametanteidan:[34.656,135.506,"Game Tanteidan Nipponbashi Osaka"],
    preyzmain:[34.663,135.507,"Preyz Osaka Nipponbashi"],
    preyzotaro:[34.661,135.505,"Preyz Nipponbashi Otaroad Osaka"],
    "nishiki":[35.005,135.765,"Nishiki Market Kyoto"],
    "surugayakyoto":[35.004,135.768,"Surugaya Kyoto Teramachi Store"],
    "ninkyoto-photo":[35.003,135.769,"Nintendo KYOTO T8 Rooftop"],
    "kiyomizudera":[34.995,135.785,"Kiyomizu-dera Kyoto"],
    "ninenzaka":[34.998,135.781,"Ninenzaka Kyoto"],
    "yasaka":[35.003,135.779,"Yasaka-jinja Shrine Gion Kyoto"],
    "fushimiinari":[34.967,135.772,"Fushimi Inari Taisha Kyoto"],
    "kyotomanga":[35.011,135.759,"Kyoto International Manga Museum"],
    "byodoin":[34.889,135.808,"Byodoin Temple Uji"],
    "ujitea":[34.891,135.807,"Byodoin Omotesando Uji"],
    "teamlabkyoto":[34.98,135.766,"teamLab Biovortex Kyoto"],
    "nijocastle":[35.015,135.748,"Nijo Castle Kyoto"],
    "arashiyama":[35.017,135.671,"Arashiyama Bamboo Grove Kyoto"],
    "kyotorailway":[34.988,135.743,"Kyoto Railway Museum"],
    "toji":[34.98,135.747,"Toji Temple Kyoto"],
    "toeistudio":[35.016,135.708,"Toei Kyoto Studio Park"],
    "nintendo-hq":[34.969,135.756,"Nintendo Headquarters Kyoto"],
    "kuromon":[34.665,135.506,"Kuromon Ichiba Market Osaka"],
    "umedasky":[34.705,135.49,"Umeda Sky Building Osaka"],
    "capcomumeda":[34.702,135.496,"Capcom Store Cafe Umeda LUCUA SOUTH"],
    "squareenix":[34.702,135.496,"Square Enix Nexus LUCUA SOUTH"]
  };
  const fixedTypes = new Set(["airport","transport","hotel"]);
  const esc = value => String(value === undefined || value === null ? "" : value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const actualGeo = id => {
    const d=geo[id];
    return d ? {id:id,lat:d[0],lon:d[1],query:d[2],country:id==="darakhyu"?"KR":"JP"} : null;
  };
  function haversine(a,b) {
    if(!a||!b||a.country!==b.country) return null;
    const rad=Math.PI/180, dLat=(b.lat-a.lat)*rad, dLon=(b.lon-a.lon)*rad;
    const h=Math.sin(dLat/2)**2+Math.cos(a.lat*rad)*Math.cos(b.lat*rad)*Math.sin(dLon/2)**2;
    return 6371*2*Math.asin(Math.min(1,Math.sqrt(h)));
  }
  function itemPoints(item) {
    if(item.placeId) return [actualGeo(item.placeId)].filter(Boolean);
    if(item.routeId) {
      const route=routeById(item.routeId);
      const ids=Array.isArray(item.memberIds)&&item.memberIds.length ? item.memberIds : (route ? route.placeIds : []);
      return ids.map(actualGeo).filter(Boolean);
    }
    return [];
  }
  function itemLabel(item) {
    if(item.placeId) return placeById(item.placeId)?.title || item.title || item.placeId;
    if(item.routeId) return routeById(item.routeId)?.title || item.routeId;
    return item.title || "커스텀 일정";
  }
  function makeNode(item,index) {
    const pts=itemPoints(item), p=item.placeId ? placeById(item.placeId):null;
    const route=item.routeId ? routeById(item.routeId):null;
    const selectedIds=route ? ((Array.isArray(item.memberIds)&&item.memberIds.length)?item.memberIds:route.placeIds) : [];
    const hasFixedPlace=!!(p&&fixedTypes.has(p.category)) ||
      !!(p&&p.kind==="hotel") || !!(route&&selectedIds.some(id=>{
        const r=placeById(id);return r&&(r.kind==="hotel"||fixedTypes.has(r.category));
      }));
    const timed=!!(item.start||item.end);
    const reservationLocked=!!(p&&RESERVATION_RULES[p.id]?.level==="required")||
      !!(route&&selectedIds.some(id=>RESERVATION_RULES[id]?.level==="required"));
    const locked=timed||hasFixedPlace||reservationLocked||!pts.length;
    return {item:item,index:index,label:itemLabel(item),pts:pts,first:pts[0]||null,last:pts[pts.length-1]||null,locked:locked,timed:timed,reason:timed?"입력된 시간 고정":hasFixedPlace?"숙박·교통 고정":reservationLocked?"사전 예약 우선 고정":!pts.length?"위치 정보 없음":""};
  }
  function distance(a,b) {
    return a&&b?haversine(a.last,b.first):null;
  }
  function sequenceCost(nodes,left,right) {
    if(!nodes.length)return 0;
    let result=0;
    const start=distance(left,nodes[0]);if(start!==null)result+=start;
    for(let i=1;i<nodes.length;i++){
      const d=distance(nodes[i-1],nodes[i]);if(d!==null)result+=d;
    }
    const end=distance(nodes[nodes.length-1],right);if(end!==null)result+=end;
    return result;
  }
  // Fast best-effort route ordering, avoiding factorial-time permutation search.
  function bestReorder(nodes,left,right) {
    if(nodes.length<2)return nodes.slice();
    let best=nodes.slice(),bestCost=sequenceCost(best,left,right);
    const starts=[nodes.slice()];
    for(let seed=0;seed<Math.min(3,nodes.length);seed++){
      const route=[nodes[seed]],unvisited=nodes.filter(x=>x!==nodes[seed]);
      while(unvisited.length){
        const last=route[route.length-1];
        unvisited.sort((a,b)=>(distance(last,a)??Infinity)-(distance(last,b)??Infinity));
        route.push(unvisited.shift());
      }
      starts.push(route);
    }
    for(let candidate of starts){
      let cost=sequenceCost(candidate,left,right);
      for(let round=0;round<5;round++){
        let improved=false;
        for(let i=0;i<candidate.length;i++){
          for(let j=i+1;j<candidate.length;j++){
            const test=candidate.slice(0,i).concat(candidate.slice(i,j+1).reverse(),candidate.slice(j+1));
            const next=sequenceCost(test,left,right);
            if(next<cost-0.00001){candidate=test;cost=next;improved=true;}
          }
        }
        if(!improved)break;
      }
      if(cost<bestCost-0.00001){best=candidate;bestCost=cost;}
    }
    return best;
  }
  function expandedPoints(nodes) {
    return nodes.flatMap(n=>n.pts);
  }
  function summarize(nodes){
    let total=0,verified=0,unmeasured=0,legs=0;
    for(const n of nodes){
      for(let i=1;i<n.pts.length;i++){
        const km=haversine(n.pts[i-1],n.pts[i]);if(km!==null){total+=km;verified++;}else unmeasured++;
      }
    }
    for(let i=1;i<nodes.length;i++){
      const km=distance(nodes[i-1],nodes[i]);
      if(km!==null){total+=km;verified++;}else unmeasured++;
      legs++;
    }
    return {km:total,connections:verified,missing:unmeasured,legs:legs,points:expandedPoints(nodes).length};
  }
  const analysisCache=new Map();
  function analysis(day){
    const items=(state.plans[state.activePlan]||{})[day]||[];
    const key=state.activePlan+':'+day+':'+JSON.stringify(items);
    if(analysisCache.has(key))return analysisCache.get(key);
    const nodes=items.map(makeNode),candidate=nodes.slice();
    const ambiguousLodging=new Set(nodes.filter(n=>isLodging(n.item)).map(n=>n.item.placeId||n.item.routeId)).size>1;
    let segments=0;
    for(let i=0;i<candidate.length;){
      if(candidate[i].locked){i++;continue;}
      let j=i;
      while(j<candidate.length&&!candidate[j].locked)j++;
      if(j-i>1){
        const replacement=bestReorder(candidate.slice(i,j),candidate[i-1]||null,candidate[j]||null);
        candidate.splice(i,j-i,...replacement);segments++;
      }
      i=j;
    }
    const current=summarize(nodes),better=summarize(candidate);
    const gain=Math.max(0,current.km-better.km);
    const value={day:day,nodes:nodes,candidate:candidate,current:current,better:better,gain:gain,
      percent:current.km>0?gain/current.km*100:0,segments:segments,
      ambiguousLodging:ambiguousLodging,
      excluded:nodes.filter(n=>!n.pts.length).length,
      constrained:nodes.filter(n=>n.locked).length,
      reordered:candidate.some((n,i)=>n!==nodes[i])};
    if(analysisCache.size>25)analysisCache.clear();
    analysisCache.set(key,value);
    return value;
  }
  const fmt = n => Number(n).toFixed(1);
  function mapLink(a,b){
    if(!a||!b||a.country!==b.country)return "";
    return "https://www.google.com/maps/dir/?api=1&origin="+encodeURIComponent(a.query)+
      "&destination="+encodeURIComponent(b.query)+"&travelmode=transit";
  }
  function isLodging(item) {
    const ids=item.placeId ? [item.placeId] : (item.routeId ?
      (Array.isArray(item.memberIds)&&item.memberIds.length ? item.memberIds : routeById(item.routeId)?.placeIds||[]) : []);
    return ids.some(id=>{
      const place=placeById(id);
      return place&&(place.kind==="hotel"||place.tags?.includes("숙박"));
    });
  }
  function canImprove(a) {
    return a.nodes.length>=3 && a.reordered && a.gain>=0.5 && a.percent>=8 &&
      !a.ambiguousLodging && a.current.missing===0 && a.better.missing===0;
  }
  function edgeKey(left,right) { return left.index+"->"+right.index; }
  function suggestedLegIndex(a) {
    if(!canImprove(a))return -1;
    const proposedEdges=new Set(a.candidate.slice(1).map((n,i)=>edgeKey(a.candidate[i],n)));
    let selected=-1,maximum=-1;
    for(let i=1;i<a.nodes.length;i++){
      const prior=a.nodes[i-1],curr=a.nodes[i];
      if(proposedEdges.has(edgeKey(prior,curr)))continue;
      if(isLodging(prior.item)&&isLodging(curr.item))continue;
      const km=distance(prior,curr);
      if(km!==null&&km>maximum){maximum=km;selected=i;}
    }
    return selected;
  }
  function makeLabel(value,className) {
    const el=document.createElement("span");
    el.className=className;el.textContent=value;
    return el;
  }
  function renderLegHints() {
    document.querySelectorAll(".day-column").forEach(column=>{
      const day=column.dataset.day;
      if(!day)return;
      const a=analysis(day),cards=[...column.querySelectorAll(".schedule-card")];
      const suggestion=suggestedLegIndex(a);
      for(let i=1;i<cards.length&&i<a.nodes.length;i++){
        const prior=a.nodes[i-1],curr=a.nodes[i],card=cards[i];
        let hint=card.previousElementSibling;
        const bothHotels=isLodging(prior.item)&&isLodging(curr.item)&&
          (prior.item.placeId||prior.item.routeId)!==(curr.item.placeId||curr.item.routeId);
        const km=distance(prior,curr);
        const onsite=km!==null&&km<0.06;
        // A transport/custom block without two geo endpoints must not generate
        // a fake or repetitive "unknown location" distance row.
        if(!bothHotels&&(km===null||onsite)){
          if(hint?.classList.contains("movement-hint"))hint.remove();
          continue;
        }
        if(!hint||!hint.classList.contains("movement-hint")){
          hint=document.createElement("div");
          card.parentNode.insertBefore(hint,card);
        }
        hint.className="movement-hint route-leg-hint"+(bothHotels?" route-leg-choice":km!==null&&km>=15?" route-leg-long":"");
        hint.textContent="";
        const row=document.createElement("div");
        row.className="route-leg-head";
        row.appendChild(makeLabel("↓","route-leg-arrow"));
        if(bothHotels){
          row.appendChild(makeLabel("숙박 후보 2곳 · 실제 숙박지 선택 필요","route-leg-main"));
        }else{
          const prefix=km>=15?"원거리 · ":"";
          row.appendChild(makeLabel(prefix+"직선 약 "+fmt(km)+"km","route-leg-main"));
        }
        hint.appendChild(row);
        if(bothHotels) {
          hint.appendChild(makeLabel("비교용 후보라면 한 곳만 확정해 주세요.","route-leg-detail"));
          continue;
        }
        const link=mapLink(prior.last,curr.first);
        const actions=document.createElement("div");
        actions.className="route-leg-actions";
        if(link&&!onsite){
          const anchor=document.createElement("a");
          anchor.className="route-segment-link";anchor.href=link;
          anchor.target="_blank";anchor.rel="noopener noreferrer";
          anchor.textContent="실제 교통 경로 확인 ↗";
          anchor.title="Google 지도에서 실제 도보·대중교통 경로와 이동시간 확인";
          actions.appendChild(anchor);
        }
        if(i===suggestion) {
          const btn=document.createElement("button");
          btn.type="button";btn.className="route-suggestion-btn";
          btn.textContent="↩ 방문 순서 개선 후보";
          btn.title="하루의 다른 장소들과 순서를 비교합니다. 직선거리 추정 기준입니다.";
          btn.addEventListener("click",()=>openModal(day));
          actions.appendChild(btn);
        }
        if(actions.childNodes.length)hint.appendChild(actions);
      }
      // A route bundle is one schedule card; show inner distances inside the card.
      for(let i=0;i<cards.length&&i<a.nodes.length;i++){
        const n=a.nodes[i];
        if(!n.item.routeId||n.pts.length<2)continue;
        const holder=cards[i].querySelector(".route-schedule-members");
        if(!holder)continue;
        let sum=0,known=0;
        for(let j=1;j<n.pts.length;j++){
          const km=haversine(n.pts[j-1],n.pts[j]);
          if(km!==null){sum+=km;known++;}
        }
        if(!known)continue;
        const note=document.createElement("div");
        note.className="route-inner-distance";
        note.textContent="↳ 묶음 내부 "+n.pts.length+"곳 · "+(sum<0.06?"같은 시설권역 · 이동 거의 없음":"직선 약 "+fmt(sum)+"km");
        holder.appendChild(note);
      }
    });
  }
  let dialog=null, openDay=null, displayMode="current",undo=null;
  function ensureDialog(){
    if(dialog)return;
    dialog=document.createElement("dialog");
    dialog.id="routeAnalysisDialog";
    dialog.className="route-analysis-dialog";
    dialog.innerHTML='<div class="route-analysis-shell"><div class="route-analysis-top"><div><small>여행 동선 진단</small><h2 id="raTitle">동선 분석</h2></div><button type="button" id="raClose" class="route-analysis-close" aria-label="닫기">×</button></div><div id="raContent"></div></div>';
    document.body.appendChild(dialog);
    dialog.querySelector("#raClose").addEventListener("click",()=>dialog.close());
    dialog.addEventListener("click",e=>{if(e.target===dialog)dialog.close();});
  }
  function drawing(nodes) {
    const pts=expandedPoints(nodes);
    const jp=pts.filter(p=>p.country==="JP");
    if(jp.length===0)return '<div class="route-no-map">지도에 표시할 장소가 없습니다.</div>';
    let latMin=Math.min(...jp.map(x=>x.lat)),latMax=Math.max(...jp.map(x=>x.lat));
    let lonMin=Math.min(...jp.map(x=>x.lon)),lonMax=Math.max(...jp.map(x=>x.lon));
    const latSpan=Math.max(.020,latMax-latMin),lonSpan=Math.max(.030,lonMax-lonMin);
    const dot=(p,i)=>({x:28+(p.lon-lonMin)/lonSpan*410,y:224-(p.lat-latMin)/latSpan*178,p:p,index:i});
    const dots=jp.map(dot);
    let result='<svg viewBox="0 0 470 250" role="img" aria-label="방문 장소의 상대적인 위치와 직선 연결"><rect x="0" y="0" width="470" height="250" rx="12" fill="#f5f8fc"/>';
    for(let i=1;i<dots.length;i++){
      const a=dots[i-1],b=dots[i];
      if(haversine(a.p,b.p)===null)continue;
      result+='<path d="M'+fmt(a.x)+','+fmt(a.y)+' L'+fmt(b.x)+','+fmt(b.y)+'" fill="none" stroke="#417cbe" stroke-width="2.5" stroke-linecap="round"/>';
    }
    for(let i=0;i<dots.length;i++){
      const d=dots[i], repeated=dots.slice(0,i).filter(z=>Math.abs(z.x-d.x)<3&&Math.abs(z.y-d.y)<3).length;
      const x=d.x+Math.min(repeated,3)*7,y=d.y-Math.min(repeated,3)*7;
      result+='<circle cx="'+fmt(x)+'" cy="'+fmt(y)+'" r="11" fill="#fff" stroke="#326ba8" stroke-width="2"/>';
      result+='<text x="'+fmt(x)+'" y="'+fmt(y+3.4)+'" text-anchor="middle" font-size="10" font-weight="800" fill="#225588">'+(i+1)+'</text>';
    }
    result+='</svg><p class="route-drawing-note">실제 지도·보행/철도 경로가 아닌 상대 위치도 · 점을 잇는 직선만 표시</p>';
    return result;
  }
  function renderList(nodes){
    return '<ol class="route-analysis-order">'+nodes.map((n,i)=>{
      const tail=n.last,next=nodes[i+1],link=next?mapLink(tail,next.first):"";
      const marker=n.locked?'<span class="route-fixed" title="'+esc(n.reason)+'">고정</span>':'';
      let leg="";
      if(next){
        const d=distance(n,next);
        leg='<div class="route-leg">'+(d!==null?'↳ 직선 '+fmt(d)+'km':'↳ 위치 미확정 / 항공·교통 이동 구간')+
          (link?' · <a href="'+esc(link)+'" target="_blank" rel="noopener noreferrer">Google 지도에서 실제 대중교통 확인 ↗</a>':'')+'</div>';
      }
      return '<li><div class="route-point-row"><span class="route-point-num">'+(i+1)+'</span><span class="route-point-name">'+esc(n.label)+'</span>'+marker+'</div>'+leg+'</li>';
    }).join("")+'</ol>';
  }
  function renderModal(){
    if(!openDay)return;
    const a=analysis(openDay);
    const proposed=displayMode==="recommended";
    const order=proposed?a.candidate:a.nodes;
    dialog.querySelector("#raTitle").textContent="5/"+openDay+" · 동선 진단";
    const root=dialog.querySelector("#raContent");
    const improved=canImprove(a);
    const canUndo=!!undo&&undo.day===openDay&&undo.plan===state.activePlan;
    root.innerHTML=
      '<p class="route-analysis-disclaimer">표시된 km는 <strong>대략적 좌표 사이 직선거리 합계</strong>입니다. 도보거리·철도 소요시간·환승 횟수가 아닙니다. 실제 경로는 각 구간 Google 지도에서 확인하세요.</p>'+
      '<div class="route-analysis-stats"><div><small>현재 직선 합계</small><b>'+fmt(a.current.km)+' km</b></div><div><small>추천 순서 직선 합계</small><b>'+fmt(a.better.km)+' km</b></div><div><small>예상 감소분</small><b class="'+(improved?'better':'')+'">'+fmt(a.gain)+' km</b></div></div>'+
      '<p class="route-analysis-explain">'+(a.nodes.length<2?'비교하려면 같은 날짜에 장소를 두 곳 이상 추가하세요.':
        a.ambiguousLodging?'같은 날짜에 숙박 후보가 여러 개 있습니다. 실제 숙박할 곳을 확정한 후 분석해 주세요.':
        a.current.connections===0?'위치를 연결할 수 있는 구간이 없어 분석할 수 없습니다.':
        a.nodes.length===2?'두 장소 사이 이동거리는 확인할 수 있지만, 방문 순서만으로 효율을 판정할 수는 없습니다.':
        a.current.missing>0?'좌표가 없는 일정이 있어 전체 동선 비교는 제한됩니다.':
        improved?'직선거리 기준으로 더 짧은 방문 순서가 있습니다. 예약·영업시간에 적합한지는 별도로 확인하세요.':
        '직선거리 기준으로 순서 변경에 따른 큰 단축은 발견되지 않았습니다. 실제 대중교통의 효율성을 판단한 결과는 아닙니다.')+'</p>'+
      '<div class="route-analysis-tabs" role="group" aria-label="동선 비교"><button type="button" data-ra-mode="current" class="'+(!proposed?'selected':'')+'">현재 순서</button><button type="button" data-ra-mode="recommended" class="'+(proposed?'selected':'')+'">개선 후보</button></div>'+
      '<div class="route-analysis-map">'+drawing(order)+'</div>'+
      renderList(order)+
      '<p class="route-analysis-limits">예약 또는 시작·종료 시간이 입력된 카드, 숙소, 교통 카드, 위치 미확정 일정은 순서 변경 대상에서 제외합니다. 위치 좌표는 안내용 근삿값입니다. 분석 제외 일정: '+a.excluded+'개 · 고정 일정: '+a.constrained+'개.</p>'+
      '<div class="route-analysis-actions">'+
      (canUndo?'<button type="button" class="ra-secondary" id="raUndo">직전 적용 되돌리기</button>':'')+
      '<button type="button" class="ra-secondary" id="raCopy">동선 요약 복사</button>'+
      '<button type="button" id="raApply" '+(!improved?'disabled':'')+'>개선 후보 순서 적용</button></div>';
    root.querySelectorAll("[data-ra-mode]").forEach(b=>b.addEventListener("click",()=>{displayMode=b.dataset.raMode;renderModal();}));
    root.querySelector("#raApply").addEventListener("click",()=>{
      const latest=analysis(openDay);
      if(!canImprove(latest))return;
      const original=latest.nodes.map(n=>n.item);
      if(!confirm("입력된 시간·숙박·교통 일정을 고정한 채, 나머지 장소의 순서를 바꾸시겠습니까?"))return;
      undo={day:openDay,plan:state.activePlan,items:original};
      state.plans[state.activePlan][openDay]=latest.candidate.map(n=>n.item);
      persist();renderBoard();displayMode="current";renderModal();
    });
    const u=root.querySelector("#raUndo");
    if(u)u.addEventListener("click",()=>{
      if(!undo||undo.plan!==state.activePlan||undo.day!==openDay)return;
      state.plans[state.activePlan][openDay]=undo.items;
      undo=null;persist();renderBoard();displayMode="current";renderModal();
    });
    root.querySelector("#raCopy").addEventListener("click",()=>{
      const text=order.map((n,i)=>(i+1)+". "+n.label).join("\n")+"\n연결 직선거리 합계: "+fmt(summarize(order).km)+"km (대략적 좌표 기준, 실제 이동 아님)";
      if(navigator.clipboard&&navigator.clipboard.writeText){
        navigator.clipboard.writeText(text).then(()=>toast("동선 요약을 복사했습니다.")).catch(()=>toast("복사를 완료하지 못했습니다."));
      } else toast("이 브라우저에서는 복사를 지원하지 않습니다.");
    });
  }
  function openModal(day){
    ensureDialog();
    openDay=day;displayMode="current";undo=null;
    renderModal();
    if(!dialog.open)dialog.showModal();
  }
  if(typeof renderBoard!=="function"||typeof state==="undefined"||typeof places==="undefined"){
    console.warn("Route diagnostics: trip planner is not loaded.");return;
  }
  // Read-only summaries used by the lower planner panel. Measurements are
  // approximate straight-line distances, and missing legs are not inferred.
  window.tripRouteSummary=function(day){
    const a=analysis(day);
    return {km:a.current.km,known:a.current.connections,missing:a.current.missing,excluded:a.excluded};
  };
  const oldRenderBoard=renderBoard;
  renderBoard=function(){oldRenderBoard();renderLegHints();};
  renderLegHints();
})();