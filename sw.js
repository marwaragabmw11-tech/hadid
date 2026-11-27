/* مكتبة الحفظ المصوّرة — العمل بدون إنترنت.
   يحفظ صفحات المكتبة وملفاتها والخطوط على الجهاز عند أول زيارة،
   ويحفظ تلاوة كل آية تُسمع (أو تُنزَّل) من EveryAyah لتعمل لاحقًا بلا اتصال.
   قائمة الملفات تُحدَّث تلقائيًا بالأمر:  python3 tools/build_offline.py */
'use strict';
const FILES=/*FILES*/{
  "index.html":"62d89c1606",
  "offline.js":"1a7714e9cf",
  "kitab-plus.js":"be6d862d2d",
  "tajweed-engine.js":"81c1a86880",
  "anim/lib.js":"53cdffeac6",
  "manifest.webmanifest":"ef1b0a949a",
  "abasa.html":"117255b874",
  "adiyat.html":"6feeda63f4",
  "ahqaf.html":"b9acc58d1b",
  "ahzab.html":"9ba5e2b411",
  "ala.html":"5aa51dd86d",
  "alaq.html":"fbba20c7e9",
  "anam.html":"0345655718",
  "anbiya.html":"b615e23aab",
  "anfal.html":"7fe26f876a",
  "ankabut.html":"05553de239",
  "araf.html":"c99fc7209b",
  "asr.html":"335da3748b",
  "balad.html":"89f0edd523",
  "baqarah.html":"81061fab62",
  "baqarah2.html":"83c7b38797",
  "bayyina.html":"fdf45bd890",
  "buruj.html":"55f575f666",
  "dhariyat.html":"bcee2ad838",
  "duha.html":"25209515f5",
  "dukhan.html":"445c65ee99",
  "fajr.html":"e948c58246",
  "falaq.html":"63305edd3a",
  "fath.html":"bf20b0702f",
  "fatir.html":"1d57a6fc3f",
  "fil.html":"c7f06933c6",
  "furqan.html":"596b4beb86",
  "fussilat.html":"cecee649ab",
  "ghafir.html":"fe9e433576",
  "ghashiya.html":"9bd25a03ec",
  "hajj.html":"17eaf81d5f",
  "haqqa.html":"701f63fa29",
  "hashr.html":"22a3fa8cac",
  "hijr.html":"2c8fb11ef2",
  "hud.html":"7c1eb457c8",
  "hujurat.html":"7c0a36ae87",
  "humaza.html":"3e0029874b",
  "ibrahim.html":"8569413988",
  "ikhlas.html":"25db52927c",
  "imran.html":"4302d431b6",
  "infitar.html":"ccebe2698e",
  "insan.html":"ceb9dfca9c",
  "inshiqaq.html":"3db5b2fc58",
  "isra.html":"d55de19819",
  "jathiya.html":"d0cf8a96c4",
  "jinn.html":"38f0393f62",
  "jumua.html":"939bcbbe8a",
  "juz1.html":"8341f26dfd",
  "juz1full.html":"08cc78162f",
  "kafirun.html":"1d86692207",
  "kahf.html":"b5a1aeed40",
  "kawthar.html":"b792998265",
  "layl.html":"7d32c29878",
  "luqman.html":"b5b4e2083e",
  "maarij.html":"55e8101d4d",
  "maidah.html":"7a75f80d1d",
  "maryam.html":"6ef4f0d02a",
  "masad.html":"301439991d",
  "maun.html":"1cc6fe4d4b",
  "muddathir.html":"030e0442fe",
  "muhammad.html":"ac400ea13f",
  "mujadila.html":"3583570642",
  "mulk.html":"7b84b04e91",
  "muminun.html":"8ac01956f0",
  "mumtahana.html":"889ba940a7",
  "munafiqun.html":"1bed3840b4",
  "mursalat.html":"8d4619239a",
  "mutaffifin.html":"38bfec16ba",
  "muzzammil.html":"c9adeb151c",
  "naba.html":"7013aef6ee",
  "nahl.html":"cce5034bda",
  "najm.html":"d076a515cf",
  "naml.html":"c2de797c4e",
  "nas.html":"ef18768595",
  "nasr.html":"26e68d1ea9",
  "naziat.html":"f05304fa03",
  "nisa.html":"f4a65414bf",
  "nuh.html":"e815c6cfad",
  "nur.html":"1fcf67f26b",
  "qadr.html":"d92d669430",
  "qaf.html":"0d8f494039",
  "qalam.html":"64a6190507",
  "qamar.html":"4ca108d0aa",
  "qaria.html":"150524949a",
  "qasas.html":"8b82daa364",
  "qiyama.html":"6ce08e9029",
  "quraysh.html":"664d1f6a23",
  "raad.html":"8602f941b3",
  "rahman.html":"95acd4653d",
  "rum.html":"0fcd98368a",
  "saba.html":"9b18885c36",
  "sad.html":"d1f7acf108",
  "saff.html":"3a69003cae",
  "saffat.html":"27d0a2f536",
  "sajda.html":"3fd0781c59",
  "shams.html":"70b2ccad95",
  "sharh.html":"2bb8713215",
  "shuara.html":"a948152de4",
  "shura.html":"ef8ba620db",
  "surat-al-hadid.html":"64218f6201",
  "taghabun.html":"c04456e623",
  "taha.html":"c205fb4005",
  "tahrim.html":"00c84e00f4",
  "tajweed.html":"002ea5de25",
  "takathur.html":"eef539e1bd",
  "takwir.html":"6e7971aa82",
  "talaq.html":"b305e3664b",
  "tariq.html":"f44e85285a",
  "tawba.html":"3deec4d464",
  "tin.html":"7c1c02a7b1",
  "tur.html":"0319e6b54c",
  "waqia.html":"9091ae5acb",
  "yasin.html":"086d53df1f",
  "yunus.html":"b8046f0c56",
  "yusuf.html":"a486eccdeb",
  "zalzala.html":"9a22df0e91",
  "zukhruf.html":"509d18a234",
  "zumar.html":"b34bec62fb",
  "anim/100.js":"a968da5f29",
  "anim/101.js":"a8c6dfed12",
  "anim/102.js":"4f7e0d23ef",
  "anim/103.js":"b8ea5aeb47",
  "anim/104.js":"1e03da07d0",
  "anim/105.js":"25dfffea2e",
  "anim/106.js":"79ef749268",
  "anim/107.js":"50f761fe7d",
  "anim/108.js":"40ac469da4",
  "anim/109.js":"917e86f501",
  "anim/110.js":"21dd4202a1",
  "anim/111.js":"5b5afc6ac8",
  "anim/112.js":"1fad894d1d",
  "anim/113.js":"cbd4e4dfc6",
  "anim/114.js":"ac6c4663a4",
  "anim/78.js":"0367017ec5",
  "anim/79.js":"14cbc4689d",
  "anim/80.js":"49e66340a2",
  "anim/81.js":"f2ffdc66ce",
  "anim/82.js":"5eb5deb794",
  "anim/83.js":"c0ad1f01d0",
  "anim/84.js":"7263d51070",
  "anim/85.js":"7af04673a5",
  "anim/86.js":"4dc36f720c",
  "anim/87.js":"9facefa962",
  "anim/88.js":"d46ad843d7",
  "anim/89.js":"01d82d7324",
  "anim/90.js":"af2bd8c41b",
  "anim/91.js":"2269c17ba0",
  "anim/92.js":"754075e59a",
  "anim/93.js":"55ac22d896",
  "anim/94.js":"232f705d3e",
  "anim/95.js":"dba75ef5e4",
  "anim/96.js":"a651ffce8c",
  "anim/97.js":"b16e27c4b9",
  "anim/98.js":"57cfe18186",
  "anim/99.js":"4af9069628",
  "icons/icon-192.png":"4d898d0fa8",
  "icons/icon-512.png":"1fc2fb32f4",
  "muyassar/1.json":"67712876ce",
  "muyassar/10.json":"569fed710a",
  "muyassar/100.json":"7999d58ae0",
  "muyassar/101.json":"4efe6523df",
  "muyassar/102.json":"df1bc832fe",
  "muyassar/103.json":"56ec3837e6",
  "muyassar/104.json":"0a395e8556",
  "muyassar/105.json":"397999cb7a",
  "muyassar/106.json":"f3082433f7",
  "muyassar/107.json":"a794fe446e",
  "muyassar/108.json":"a138fb0dbb",
  "muyassar/109.json":"4e506c297c",
  "muyassar/11.json":"1b6a8ac7f7",
  "muyassar/110.json":"dd2498f5a1",
  "muyassar/111.json":"148537e07d",
  "muyassar/112.json":"2c96bc2175",
  "muyassar/113.json":"19751d25e4",
  "muyassar/114.json":"cfaa9230f2",
  "muyassar/12.json":"faebfc3d39",
  "muyassar/13.json":"c4a7ee896f",
  "muyassar/14.json":"41859db6d6",
  "muyassar/15.json":"b5cbf3d96b",
  "muyassar/16.json":"43bc512b94",
  "muyassar/17.json":"7f0d185c06",
  "muyassar/18.json":"6ba5199831",
  "muyassar/19.json":"32c2c502fd",
  "muyassar/2.json":"fc614c1e47",
  "muyassar/20.json":"d2d355db54",
  "muyassar/21.json":"78131ee3dd",
  "muyassar/22.json":"f51119eafa",
  "muyassar/23.json":"01e69c3f67",
  "muyassar/24.json":"bec7bfbd56",
  "muyassar/25.json":"24263638f2",
  "muyassar/26.json":"bccc2f0127",
  "muyassar/27.json":"7fd903f324",
  "muyassar/28.json":"033fcc2a76",
  "muyassar/29.json":"5b64a72c42",
  "muyassar/3.json":"414d26006b",
  "muyassar/30.json":"e05f5eca89",
  "muyassar/31.json":"b623fba04b",
  "muyassar/32.json":"83eccd288e",
  "muyassar/33.json":"d622e449e1",
  "muyassar/34.json":"3556d91415",
  "muyassar/35.json":"29f76be40d",
  "muyassar/36.json":"b65dc13b02",
  "muyassar/37.json":"8d58371249",
  "muyassar/38.json":"e8b9b18217",
  "muyassar/39.json":"dd5ff55e46",
  "muyassar/4.json":"42073f4ffc",
  "muyassar/40.json":"d9a3dd1f64",
  "muyassar/41.json":"3e38d57425",
  "muyassar/42.json":"c3063aa002",
  "muyassar/43.json":"b341a62d21",
  "muyassar/44.json":"8baa1596af",
  "muyassar/45.json":"c07aa66f2a",
  "muyassar/46.json":"157d980d3e",
  "muyassar/47.json":"57b9a14bae",
  "muyassar/48.json":"bcac6efe37",
  "muyassar/49.json":"4379bcf26a",
  "muyassar/5.json":"f4820f23c4",
  "muyassar/50.json":"3a21f8156e",
  "muyassar/51.json":"7a33e94cdb",
  "muyassar/52.json":"5b85579e73",
  "muyassar/53.json":"5ea1df7475",
  "muyassar/54.json":"d8cac83598",
  "muyassar/55.json":"5ccfeea894",
  "muyassar/56.json":"5754e1e980",
  "muyassar/57.json":"c47fabf753",
  "muyassar/58.json":"a8ce503bfd",
  "muyassar/59.json":"bdf4d7f1a3",
  "muyassar/6.json":"81adc92d41",
  "muyassar/60.json":"06a71324fa",
  "muyassar/61.json":"a3b540bf4d",
  "muyassar/62.json":"3a0d50b203",
  "muyassar/63.json":"59ad2b03a0",
  "muyassar/64.json":"c12ffbbda9",
  "muyassar/65.json":"f52a85de69",
  "muyassar/66.json":"ee842a5775",
  "muyassar/67.json":"3b7c47b781",
  "muyassar/68.json":"ffbc18e375",
  "muyassar/69.json":"fb1aac1f25",
  "muyassar/7.json":"919c9cfac7",
  "muyassar/70.json":"a9b6b45bea",
  "muyassar/71.json":"244869d5f2",
  "muyassar/72.json":"1bdb4dacf4",
  "muyassar/73.json":"17a1cc953b",
  "muyassar/74.json":"e7ada7986f",
  "muyassar/75.json":"cc73b474e0",
  "muyassar/76.json":"2e01ec1534",
  "muyassar/77.json":"e133610789",
  "muyassar/78.json":"0d94e764d1",
  "muyassar/79.json":"30c785deb7",
  "muyassar/8.json":"df4a4587ec",
  "muyassar/80.json":"670b2a1ed9",
  "muyassar/81.json":"c1cec25905",
  "muyassar/82.json":"c9a87fd1e4",
  "muyassar/83.json":"b67a4ce0bb",
  "muyassar/84.json":"716e196149",
  "muyassar/85.json":"f8c57ca968",
  "muyassar/86.json":"39073910b7",
  "muyassar/87.json":"21db19879b",
  "muyassar/88.json":"f324692996",
  "muyassar/89.json":"0d4bdea022",
  "muyassar/9.json":"eab9cefc4d",
  "muyassar/90.json":"37444c9a90",
  "muyassar/91.json":"92c6eb1bf2",
  "muyassar/92.json":"f690553c69",
  "muyassar/93.json":"3bd764109d",
  "muyassar/94.json":"1eb107d9c5",
  "muyassar/95.json":"4f3b9d3439",
  "muyassar/96.json":"a1e9754aac",
  "muyassar/97.json":"ef9942984e",
  "muyassar/98.json":"b74c36dfa3",
  "muyassar/99.json":"f05fe95082"
}/*END*/;
const C_FILES='hadid-files',C_FONTS='hadid-fonts',C_AUDIO='hadid-audio',META='__hadid_meta__';
const FONT_CSS='https://fonts.googleapis.com/css2?family=Amiri+Quran&family=Noto+Naskh+Arabic:wght@400;600;700&family=Reem+Kufi:wght@500;700&display=swap';
const AUDIO_MAX=6000;
let noCors=false;
const base=self.registration.scope;
const abs=f=>new URL(f,base).href;

async function tell(msg){const cs=await self.clients.matchAll({includeUncontrolled:true,type:'window'});cs.forEach(c=>c.postMessage(msg))}

async function cacheFonts(){
  try{
    const c=await caches.open(C_FONTS);
    const r=await fetch(FONT_CSS,{mode:'cors'});if(!r.ok)return;
    const css=await r.clone().text();await c.put(FONT_CSS,r);
    const urls=[...new Set((css.match(/url\((https:[^)]+)\)/g)||[]).map(u=>u.slice(4,-1)))];
    await Promise.all(urls.map(async u=>{if(await c.match(u))return;try{const f=await fetch(u,{mode:'cors'});if(f.ok)await c.put(u,f)}catch(e){}}));
  }catch(e){}
}

async function syncFiles(){
  const c=await caches.open(C_FILES);
  let old={};try{const m=await c.match(META);if(m)old=await m.json()}catch(e){}
  const list=Object.keys(FILES),total=list.length;let done=0,failed=0;
  const todo=[];
  for(const f of list){if(old[f]===FILES[f]&&await c.match(abs(f)))done++;else todo.push(f)}
  tell({type:'hadid-progress',done,total});
  const next={};for(const f of list)if(old[f]===FILES[f])next[f]=FILES[f];
  let k=0;
  async function worker(){
    while(k<todo.length){const f=todo[k++];
      try{const r=await fetch(abs(f),{cache:'reload'});if(r.ok){await c.put(abs(f),r);next[f]=FILES[f]}else failed++}catch(e){failed++}
      done++;if(done%8===0||done===total)tell({type:'hadid-progress',done,total})}
  }
  await Promise.all([worker(),worker(),worker(),worker()]);
  // حذف الملفات التي لم تعد في المكتبة
  for(const f of Object.keys(old))if(!(f in FILES))await c.delete(abs(f));
  await c.put(META,new Response(JSON.stringify(next),{headers:{'Content-Type':'application/json'}}));
  tell({type:failed?'hadid-partial':'hadid-ready',done:total-failed,total});
}

self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(Promise.all([syncFiles(),cacheFonts()]))});
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));

async function trimAudio(c){const ks=await c.keys();if(ks.length>AUDIO_MAX)for(const k of ks.slice(0,ks.length-AUDIO_MAX))await c.delete(k)}

// تلاوة آية من EveryAyah: من الجهاز إن كانت محفوظة، وإلا تُجلب وتُحفظ
async function audio(req){
  const url=req.url.split('#')[0],c=await caches.open(C_AUDIO);
  const hit=await c.match(url);if(hit)return hit;
  if(!noCors)try{const r=await fetch(url,{mode:'cors'});if(r.ok){c.put(url,r.clone()).then(()=>trimAudio(c));return r}}catch(e){if(navigator.onLine)noCors=true}
  return fetch(req);
}

// الخطوط: من الجهاز أولًا
async function font(req){
  const c=await caches.open(C_FONTS);const hit=await c.match(req.url);if(hit)return hit;
  const r=await fetch(req);if(r.ok||r.type==='opaque')c.put(req.url,r.clone());return r;
}

// ملفات المكتبة: من الإنترنت إن توفّر (لأحدث نسخة)، وإلا من الجهاز
async function site(req){
  const c=await caches.open(C_FILES);
  let u=new URL(req.url);u.hash='';
  const key=u.pathname.endsWith('/')?new URL('index.html',u).href:u.href;
  const fromCache=()=>c.match(key,{ignoreSearch:true});
  const net=fetch(req).then(r=>{if(r.ok&&req.method==='GET'){const clean=key.split('?')[0];c.put(clean,r.clone())}return r});
  const timeout=new Promise(res=>setTimeout(res,4000));
  try{const r=await Promise.race([net,timeout]);if(r)return r}catch(e){}
  const hit=await fromCache();if(hit)return hit;
  try{return await net}catch(e){}
  return new Response('<!doctype html><meta charset="utf-8"><body dir="rtl" style="font-family:sans-serif;padding:2em">هذه الصفحة لم تُحفظ بعد على الجهاز. افتحيها مرة واحدة وأنتِ متصلة بالإنترنت.</body>',{status:503,headers:{'Content-Type':'text/html; charset=utf-8'}});
}

self.addEventListener('fetch',e=>{
  const req=e.request;if(req.method!=='GET')return;
  const u=new URL(req.url);
  if(u.hostname.endsWith('everyayah.com'))return e.respondWith(audio(req));
  if(u.hostname==='fonts.googleapis.com'||u.hostname==='fonts.gstatic.com')return e.respondWith(font(req));
  if(u.origin===self.location.origin&&req.url.startsWith(base))return e.respondWith(site(req));
});

self.addEventListener('message',e=>{
  const d=e.data||{};
  if(d.type==='hadid-status')e.waitUntil((async()=>{
    const c=await caches.open(C_FILES);let m={};try{const r=await c.match(META);if(r)m=await r.json()}catch(x){}
    const total=Object.keys(FILES).length,done=Object.keys(FILES).filter(f=>m[f]===FILES[f]).length;
    (e.source||{postMessage(){}}).postMessage({type:done>=total?'hadid-ready':'hadid-progress',done,total});
    if(done<total)await syncFiles();
  })());
});
