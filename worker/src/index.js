// Cloudflare Worker: GitHub-backed shared travel schedule.
// Secrets: GITHUB_TOKEN, EDIT_KEY. Vars: GITHUB_REPO, GITHUB_BRANCH, SITE_ORIGIN.
const FILE_PATH='data/schedule.json';
function json(data,status=200,headers={}){
  return new Response(JSON.stringify(data),{status,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store',...headers}});
}
export default {
  async fetch(request,env){
    const origin=request.headers.get('Origin')||'';
    const allowed=env.SITE_ORIGIN||'https://devblackcat.github.io';
    const cors={'Access-Control-Allow-Origin':allowed,'Access-Control-Allow-Methods':'GET, PUT, OPTIONS','Access-Control-Allow-Headers':'Content-Type, X-Edit-Key','Vary':'Origin'};
    if(origin&&origin!==allowed)return json({error:'허용되지 않은 출처입니다.'},403);
    if(request.method==='OPTIONS')return new Response(null,{status:204,headers:cors});
    const respond=(body,status=200)=>json(body,status,cors);
    if(new URL(request.url).pathname!=='/api/plan')return respond({error:'Not found'},404);
    if(!['GET','PUT'].includes(request.method))return respond({error:'Method not allowed'},405);
    if(!env.GITHUB_TOKEN||!env.GITHUB_REPO||!env.EDIT_KEY)return respond({error:'Worker 설정이 완료되지 않았습니다.'},503);
    const branch=env.GITHUB_BRANCH||'main';
    const endpoint='https://api.github.com/repos/'+env.GITHUB_REPO+'/contents/'+FILE_PATH;
    const ghHeaders={'Authorization':'Bearer '+env.GITHUB_TOKEN,'Accept':'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28','User-Agent':'kansai-trip-worker'};
    async function current(){
      const url=endpoint+'?ref='+encodeURIComponent(branch)+'&t='+Date.now();
      const resp=await fetch(url,{headers:ghHeaders,cf:{cacheTtl:0}});
      if(!resp.ok)throw new Error('GitHub 읽기 실패 ('+resp.status+')');
      const file=await resp.json();
      const encoded=(file.content||'').replace(/\s/g,'');
      const bytes=Uint8Array.from(atob(encoded),c=>c.charCodeAt(0));
      return {sha:file.sha,data:JSON.parse(new TextDecoder().decode(bytes))};
    }
    try{
      if(request.method==='GET'){
        const file=await current();
        return respond(file);
      }
      // Compare secrets without placing them in public front-end assets.
      const provided=request.headers.get('X-Edit-Key')||'';
      const a=new TextEncoder().encode(provided),b=new TextEncoder().encode(env.EDIT_KEY);
      let diff=a.length^b.length;
      for(let i=0;i<Math.max(a.length,b.length);i++)diff|=(a[i]||0)^(b[i]||0);
      if(diff!==0)return respond({error:'편집 비밀번호가 올바르지 않습니다.'},401);
      if(Number(request.headers.get('Content-Length')||0)>250000)return respond({error:'요청 용량 초과'},413);
      const raw=await request.text();
      if(raw.length>250000)return respond({error:'요청 용량 초과'},413);
      let body;try{body=JSON.parse(raw)}catch{return respond({error:'잘못된 JSON'},400)}
      const data=body?.data;
      if(!body?.baseSha||!data||data.format!=='nintendo-kansai-trip-planner'||!data.state||!data.state.plans||typeof data.state.reservationDone!=='object')return respond({error:'일정 데이터 형식 오류'},400);
      const previous=await current();
      if(previous.sha!==body.baseSha)return respond({error:'다른 사용자가 먼저 저장했습니다.'},409);
      const encoded=btoa(Array.from(new TextEncoder().encode(JSON.stringify(data,null,2))).map(b=>String.fromCharCode(b)).join(''));
      const update=await fetch(endpoint,{method:'PUT',headers:{...ghHeaders,'Content-Type':'application/json'},body:JSON.stringify({message:'chore: update shared trip schedule',content:encoded,sha:previous.sha,branch})});
      if(update.status===409)return respond({error:'동시 저장 충돌'},409);
      if(!update.ok)return respond({error:'GitHub 저장 실패 ('+update.status+')'},502);
      const result=await update.json();
      return respond({sha:result.content?.sha,saved:true});
    }catch(error){console.error(error);return respond({error:'저장소 처리 중 오류가 발생했습니다.'},502)}
  }
};
