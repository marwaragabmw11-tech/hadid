/* مكتبة الحفظ المصوّرة — تفعيل العمل بدون إنترنت، وشارة صغيرة تبيّن حالة الحفظ على الجهاز.
   ويضيف HadidOffline.cacheAudio(روابط، عند_التقدم) لتنزيل تلاوة صفحة كاملة. */
(function(){
'use strict';
if(window.HadidOffline)return;
const ARn=n=>String(n).replace(/\d/g,d=>'٠١٢٣٤٥٦٧٨٩'[d]);
const isHome=/(^|\/)(index\.html)?$/.test(location.pathname);
let chip=null,hideT=0;
function show(text,ms){
  if(!document.body){document.addEventListener('DOMContentLoaded',()=>show(text,ms));return}
  if(!chip){
    chip=document.createElement('div');chip.id='hadid-offline-chip';chip.setAttribute('role','status');
    chip.style.cssText='position:fixed;bottom:12px;left:12px;z-index:9999;max-width:min(92vw,360px);padding:8px 14px;border-radius:18px;background:rgba(20,40,38,.92);color:#E6FFF2;font:600 13px/1.5 "Noto Naskh Arabic",sans-serif;direction:rtl;box-shadow:0 4px 14px rgba(0,0,0,.25);transition:opacity .4s;cursor:pointer';
    chip.onclick=()=>{chip.style.opacity='0'};
    document.body.appendChild(chip);
  }
  chip.textContent=text;chip.style.opacity='1';clearTimeout(hideT);if(ms)hideT=setTimeout(()=>{chip.style.opacity='0'},ms);
}
const READY='✓ المكتبة محفوظة على الجهاز وتعمل بدون إنترنت';
if('serviceWorker' in navigator&&(location.protocol==='https:'||location.hostname==='localhost')){
  navigator.serviceWorker.addEventListener('message',e=>{
    const d=e.data||{};
    if(d.type==='hadid-progress'&&d.done<d.total)show(`⬇ تُحفظ المكتبة على الجهاز للعمل بدون إنترنت: ${ARn(Math.round(d.done*100/d.total))}٪`);
    else if(d.type==='hadid-ready'||(d.type==='hadid-progress'&&d.done>=d.total)){
      const first=!localStorage.getItem('hadid-offline-ok');try{localStorage.setItem('hadid-offline-ok','1')}catch(x){}
      if(first||isHome)show(READY,first?6000:2500);
    }
    else if(d.type==='hadid-partial')show(`حُفظ ${ARn(d.done)} من ${ARn(d.total)} ملفًا. سيُكمل الحفظ في الزيارة القادمة.`,6000);
  });
  window.addEventListener('load',()=>{
    navigator.serviceWorker.register('sw.js').then(reg=>{
      const ask=()=>{const w=reg.active||navigator.serviceWorker.controller;if(w)w.postMessage({type:'hadid-status'})};
      if(reg.active)ask();else navigator.serviceWorker.ready.then(ask);
    }).catch(()=>{});
  });
}
window.addEventListener('offline',()=>show('📴 لا يوجد اتصال: تعمل المكتبة من الجهاز. التلاوة متاحة للآيات التي سُمعت أو نُزّلت من قبل.',7000));
window.addEventListener('online',()=>show('📶 عاد الاتصال بالإنترنت',2500));

// تنزيل ملفات صوتية إلى الجهاز (نفس المخزن الذي يستعمله sw.js)
async function cacheAudio(urls,onProgress){
  if(!('caches' in window))throw new Error('nocache');
  const c=await caches.open('hadid-audio');let done=0,saved=0,blocked=0,failed=0,k=0;
  const list=[...new Set(urls)];
  async function worker(){
    while(k<list.length){const u=list[k++];
      try{if(await c.match(u))saved++;else{const r=await fetch(u,{mode:'cors'});if(r.ok){await c.put(u,r);saved++}else failed++}}
      catch(e){blocked++}
      done++;onProgress&&onProgress(done,list.length)}
  }
  await Promise.all([worker(),worker(),worker(),worker()]);
  return {total:list.length,saved,failed,blocked};
}
async function audioCount(urls){
  if(!('caches' in window))return 0;const c=await caches.open('hadid-audio');let n=0;
  for(const u of new Set(urls))if(await c.match(u))n++;return n;
}
window.HadidOffline={cacheAudio,audioCount,show,ARn};
})();
