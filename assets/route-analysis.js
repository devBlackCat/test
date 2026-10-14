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
    preyzotaro:[34.661,135.505,"Preyz Nipponbashi Otaroad Osaka"]
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
    const hasFixedPlace=!!(p&&fixedTypes.has(p.category)) ||
      !!(p&&p.kind==="hotel") || !!(route&&route.placeIds.some(id=>{
        const r=placeById(id);return r&&(r.kind==="hotel"||fixedTypes.has(r.category));
      }));
    const timed=!!(item.start||item.end);
    const locked=timed||hasFixedPlace||!pts.length;
    return {item:item,index:index,label:itemLabel(item),pts:pts,first:pts[0]||null,last:pts[pts.length-1]||null,locked:locked,timed:timed,reason:timed?"입력된 시간 고정":hasFixedPlace?"숙박·교통 고정":!pts.length?"위치 정보 없음":""};
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
  function bestReorder(nodes,left,right) {
    if(nodes.length<2)return nodes.slice();
    let best=nodes.slice(), bestCost=sequenceCost(best,left,right);
    if(nodes.length<=8) {
      const used=new Set(),path=[];
      function examine(){
        if(path.length===nodes.length){
          const cost=sequenceCost(path,left,right);
          if(cost<bestCost-0.000001){bestCost=cost;best=path.slice();}
          return;
        }
        for(let i=0;i<nodes.length;i++){
          if(used.has(i))continue;
          used.add(i);path.push(nodes[i]);examine();path.pop();used.delete(i);
        }
      }
      examine();
    }else{
      let improved=true,round=0;
      while(improved&&round++<8){
        improved=false;
        for(let i=0;i<best.length;i++){
          for(let j=i+1;j<best.length;j++){
            const test=best.slice(0,i).concat(best.slice(i,j+1).reverse(),best.slice(j+1));
            const cost=sequenceCost(test,left,right);
            if(cost<bestCost-0.000001){best=test;bestCost=cost;improved=true;}
          }
        }
      }
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
  function analysis(day){
    const items=(state.plans[state.activePlan]||{})[day]||[];
    const nodes=items.map(makeNode),candidate=nodes.slice();
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
    return {day:day,nodes:nodes,candidate:candidate,current:current,better:better,gain:gain,
      percent:current.km>0?gain/current.km*100:0,segments:segments,
      excluded:nodes.filter(n=>!n.pts.length).length,
      constrained:nodes.filter(n=>n.locked).length,
      reordered:candidate.some((n,i)=>n!==nodes[i])};
  }
  const fmt = n => Number(n).toFixed(1);
  function mapLink(a,b){
    if(!a||!b||a.country!==b.country)return "";
    return "https://www.google.com/maps/dir/?api=1&origin="+encodeURIComponent(a.query)+
      "&destination="+encodeURIComponent(b.query)+"&travelmode=transit";
  }
  function summaryText(a){
    if(a.nodes.length<2)return "장소 추가 후 동선 분석";
    if(a.current.connections===0)return "위치 연결 데이터 부족";
    if(a.gain>=0.5&&a.percent>=8)return "직선 "+fmt(a.current.km)+"km · 개선 여지 "+fmt(a.gain)+"km";
    return "직선 합계 "+fmt(a.current.km)+"km · 큰 우회 미감지";
  }
  function makeDayButtons() {
    document.querySelectorAll(".day-column").forEach(column=>{
      const day=column.dataset.day;
      const head=column.querySelector(".day-head");
      if(!day||!head)return;
      const a=analysis(day);
      let btn=head.querySelector(".route-analyze-btn");
      if(!btn){
        btn=document.createElement("button");
        btn.type="button";btn.className="route-analyze-btn";
        btn.addEventListener("click",()=>openModal(day));
        head.appendChild(btn);
      }
      btn.textContent="↗ 동선 분석 · "+summaryText(a);
      btn.classList.toggle("route-analyze-warning",a.gain>=0.5&&a.percent>=8);
      btn.title="장소의 대략적 좌표로 계산한 직선거리 비교. 실제 이동 km·시간은 지도에서 확인";
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
    const improved=a.gain>=.5&&a.percent>=8&&a.reordered;
    const canUndo=!!undo&&undo.day===openDay&&undo.plan===state.activePlan;
    root.innerHTML=
      '<p class="route-analysis-disclaimer">표시된 km는 <strong>대략적 좌표 사이 직선거리 합계</strong>입니다. 도보거리·철도 소요시간·환승 횟수가 아닙니다. 실제 경로는 각 구간 Google 지도에서 확인하세요.</p>'+
      '<div class="route-analysis-stats"><div><small>현재 직선 합계</small><b>'+fmt(a.current.km)+' km</b></div><div><small>추천 순서 직선 합계</small><b>'+fmt(a.better.km)+' km</b></div><div><small>예상 감소분</small><b class="'+(improved?'better':'')+'">'+fmt(a.gain)+' km</b></div></div>'+
      '<p class="route-analysis-explain">'+(a.nodes.length<2?'비교하려면 같은 날짜에 장소를 두 곳 이상 추가하세요.':
        a.current.connections===0?'위치를 연결할 수 있는 구간이 없어 분석할 수 없습니다.':
        improved?'직선거리 기준으로 더 짧은 방문 순서가 있습니다. 예약·영업시간에 적합한지는 별도로 확인하세요.':
        '현재 순서에서 의미 있는 직선거리 단축안은 발견되지 않았습니다. 대중교통 기준 최적 경로라는 뜻은 아닙니다.')+'</p>'+
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
      if(!(latest.gain>=.5&&latest.percent>=8&&latest.reordered))return;
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
  const oldRenderBoard=renderBoard;
  renderBoard=function(){oldRenderBoard();makeDayButtons();};
  makeDayButtons();
})();