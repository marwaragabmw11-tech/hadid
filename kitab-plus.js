/* إضافات مكتبة الحفظ المصوّرة: خريطة القصة، ألوان التجويد ومراجعته عند التسميع،
   تكرار الآية بطرق مختلفة، وقراء آخرون من الإنترنت.
   يُحمَّل بعد سكربت الكتاب، ويعمل مع كل كتب المكتبة. */
(function(){
'use strict';
if(typeof render!=='function'||typeof AYAT==='undefined'||typeof SCENES==='undefined')return;
const TJ=window.TAJWEED||null;
const $$=id=>document.getElementById(id);
const ARn=n=>String(n).replace(/\d/g,d=>'٠١٢٣٤٥٦٧٨٩'[d]);
const store={get(k,d){try{const v=localStorage.getItem(k);return v===null?d:v}catch(e){return d}},set(k,v){try{localStorage.setItem(k,v)}catch(e){}}};
const FILE=(location.pathname.split('/').pop()||'book').replace(/\.html?$/,'');
const ay=i=>Array.isArray(AYAT[i])?{s:AYAT[i][0],v:AYAT[i][1],t:AYAT[i][2]}:{s:57,v:i+1,t:AYAT[i]};
const sIdx=s=>s.idx||Array.from({length:s.to-s.from+1},(_,k)=>s.from-1+k);
const sName=n=>(typeof SURAH!=='undefined'&&SURAH[n])||(n===57?'الحديد':'');
const WAQF=/^[ۖ-ۛ]$/;
const wordsOf=i=>ay(i).t.split(' ').filter(w=>w&&!WAQF.test(w));
const esc=t=>String(t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const pad=n=>String(n).padStart(3,'0');
const urlOf=i=>{const a=ay(i);return `https://everyayah.com/data/${reciter}/${pad(a.s)}${pad(a.v)}.mp3`};
const BOOK=(document.querySelector('.brand')||{}).textContent||document.title;

/* ---------- الأنماط ---------- */
const css=`
:root{--tj-g:#178A45;--tj-s:#8B949D;--tj-m6:#9B1C1C;--tj-m4:#D62839;--tj-m2:#D9730D;--tj-mb:#A77A0A;--tj-q:#1B6FC2}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){--tj-g:#4CC97A;--tj-s:#97A1AB;--tj-m6:#FF7A7A;--tj-m4:#FF9AA5;--tj-m2:#FFB264;--tj-mb:#E8C15A;--tj-q:#7DB8FF}}
:root[data-theme="dark"]{--tj-g:#4CC97A;--tj-s:#97A1AB;--tj-m6:#FF7A7A;--tj-m4:#FF9AA5;--tj-m2:#FFB264;--tj-mb:#E8C15A;--tj-q:#7DB8FF}
.tj{cursor:pointer}.tj-g{color:var(--tj-g)}.tj-s{color:var(--tj-s)}.tj-m6{color:var(--tj-m6)}.tj-m4{color:var(--tj-m4)}.tj-m2{color:var(--tj-m2)}.tj-mb{color:var(--tj-mb)}.tj-q{color:var(--tj-q)}
.kp-dot{display:inline-block;width:.8em;height:.8em;border-radius:50%;background:currentColor;vertical-align:middle}
.kp-bar{display:flex;gap:8px;justify-content:center;flex-wrap:wrap}
.kp-bar button,.kp-bar a{border:1px solid var(--gold);background:var(--paper);color:var(--gold);border-radius:999px;padding:4px 14px;font:600 .88rem var(--f-body);cursor:pointer;text-decoration:none}
.kp-bar [aria-pressed="true"]{background:var(--gold);color:var(--paper)}
.kp-bar [data-kp="map"]{background:#23824C;border-color:#23824C;color:#fff}
.kp-bar a[href^="tajweed"]{background:#1D5FB0;border-color:#1D5FB0;color:#fff}
.kp-bar [data-kp="map"],.kp-bar a[href^="tajweed"]{font-size:.95rem;padding:6px 16px;box-shadow:0 3px 10px rgba(0,0,0,.18)}
.kp-row{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
.kp-row label{font-size:.85rem;color:var(--muted)}
.kp-row select,.kp-more input{font:inherit;font-size:.9rem;border:1px solid var(--line);border-radius:8px;background:var(--paper);color:var(--ink);padding:4px 8px;max-width:100%}
.kp-more{border:1px solid var(--line);border-radius:10px;padding:8px 12px}
.kp-more summary{cursor:pointer;font-weight:700;color:var(--gold)}
.kp-more[open] summary{margin-bottom:8px}
.kp-rlist{display:flex;flex-wrap:wrap;gap:6px;max-height:190px;overflow:auto;margin:8px 0}
.kp-rlist button{border:1px solid var(--line);background:transparent;color:var(--ink);border-radius:999px;padding:2px 12px;font:600 .85rem var(--f-body);cursor:pointer}
.kp-rlist button[aria-pressed="true"]{background:var(--ink);color:var(--paper)}
.kp-more input[type=search],.kp-more input[type=url]{width:100%;margin-top:4px}
.kp-legend{display:flex;flex-wrap:wrap;gap:6px}
.kp-chip{display:inline-flex;align-items:center;gap:6px;border:1px solid var(--line);border-radius:999px;padding:2px 10px;font-size:.85rem;color:var(--ink);text-decoration:none;background:transparent;cursor:pointer;font-family:var(--f-body)}
.kp-chip b{font-weight:600;color:var(--muted);font-size:.78rem}
.kp-info{font-size:.9rem;margin:0;min-height:1.4em}
.kp-info b{font-weight:700}
.kp-check{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:10px}
.kp-check li{border-top:1px solid var(--line);padding-top:8px;display:flex;flex-direction:column;gap:4px}
.kp-check .ex{font-family:var(--f-quran);font-size:1.15rem}
.kp-check .how{font-size:.88rem;color:var(--muted)}
.vc-facts{margin:8px 0;padding-inline-start:18px;font-size:.92rem;display:flex;flex-direction:column;gap:4px}
#kp-vc{margin-top:8px}
.vc-sum{font-weight:600}
.vc-words{margin:6px 0;padding-inline-start:22px;display:flex;flex-direction:column;gap:6px}
.vc-words>li .w{font-family:var(--f-quran);font-size:1.25rem}
.vc-words>li.ok .w{color:var(--muted)}
.vc-words>li.bad .w{color:#B3261E}
.vc-words .md{font-size:.8rem;color:var(--muted)}
.vc-words ul{margin:2px 0;padding-inline-start:16px;font-size:.9rem}
.vc-words li.jali{color:#B3261E}.vc-words li.khafi{color:#8A5A00}
.vc-tl{width:100%;border-collapse:collapse;margin:6px 0;font-size:.85rem}
.vc-tl caption{caption-side:top;text-align:start;color:var(--muted);font-size:.8rem;padding-bottom:4px}
.vc-tl td{padding:3px 4px;border-top:1px solid var(--line);vertical-align:middle}
.vc-tl td.w{font-family:var(--f-quran);font-size:1.1rem;white-space:nowrap;width:1%}
.vc-tl td.t{white-space:nowrap;width:1%;color:var(--muted);font-size:.75rem;line-height:1.3}
.vc-bar{height:8px;border-radius:4px;margin:2px 0;min-width:2px}.vc-bar.r,.vc-key.r{background:var(--teal,#1B4A48)}.vc-bar.m,.vc-key.m{background:var(--gold,#B8860B)}.vc-bar.none{background:#B3261E;opacity:.4;width:100%!important}
.vc-key{display:inline-block;width:12px;height:8px;border-radius:3px;vertical-align:middle}
.vc-h{margin:10px 0 4px;font-size:.95rem}.vc-long{margin:0;padding-inline-start:18px;font-size:.88rem;display:flex;flex-direction:column;gap:3px}
.vc-long .w{font-family:var(--f-quran);font-size:1.05rem}.vc-long .lo{color:#B3261E}.vc-long .hi{color:#8A5A00}
.kp-exp{font-size:.72rem;background:#8A5A00;color:#fff;border-radius:6px;padding:1px 6px;margin-inline-start:4px}
.kp-self{display:flex;gap:6px;flex-wrap:wrap}
.kp-self button{border:1px solid var(--line);background:transparent;color:var(--ink);border-radius:8px;padding:2px 10px;font:600 .82rem var(--f-body);cursor:pointer}
.kp-self button[aria-pressed="true"][data-v="1"]{background:var(--leaf);border-color:var(--leaf);color:#fff}
.kp-self button[aria-pressed="true"][data-v="0"]{background:var(--danger,#B42318);border-color:var(--danger,#B42318);color:#fff}
.kp-live{background:var(--gold-soft);border-radius:10px;padding:8px 12px;margin:0;font-size:.92rem}
.kp-live:empty{display:none}
.kp-new{border-top:1px solid var(--line);padding-top:12px;display:flex;flex-direction:column;gap:8px}
.kp-new h3{margin:0;font-family:var(--f-display);font-size:1.05rem;color:var(--gold)}
.kp-new ul{margin:0;padding-inline-start:20px;font-size:.92rem}
a.kp-toc{text-align:start;border:1px solid var(--line);color:var(--ink);border-radius:10px;padding:8px 12px;font:600 .95rem var(--f-body);display:flex;flex-direction:column;text-decoration:none}
a.kp-toc span{font-size:.78rem;color:var(--muted);font-weight:400}
.kp-map{padding:18px 16px 22px;display:flex;flex-direction:column;gap:16px}
.kp-root{align-self:center;text-align:center;background:var(--night);color:#F3EEDF;border-radius:50%;width:150px;height:150px;display:grid;place-content:center;gap:2px;box-shadow:0 0 0 6px var(--gold-soft)}
.kp-root b{font-family:var(--f-quran);font-size:1.5rem;color:var(--glow);font-weight:400;line-height:1.3}
.kp-root span{font-size:.8rem}
.kp-rub{align-self:center;font-family:var(--f-display);font-size:.95rem;color:var(--gold);border:1px dashed var(--gold);border-radius:999px;padding:2px 14px;background:var(--paper);position:relative;z-index:1}
.kp-road{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:14px;position:relative}
.kp-roadwrap{position:relative;display:flex;flex-direction:column;gap:14px}
.kp-roadwrap::before{content:"";position:absolute;inset-block:0;inset-inline-start:50%;border-inline-start:3px dashed var(--gold);opacity:.45}
.kp-st{position:relative;display:grid;grid-template-columns:1fr 1fr;gap:10px;align-items:center}
.kp-st .kp-thumb{grid-column:1;border:2px solid var(--gold);border-radius:14px;overflow:hidden;padding:0;background:var(--paper);cursor:pointer;display:block;width:100%}
.kp-st .kp-thumb svg{display:block;width:100%;height:auto}
.kp-st .kp-body{grid-column:2;background:var(--paper);border:1px solid var(--line);border-radius:12px;padding:8px 10px;display:flex;flex-direction:column;gap:4px;z-index:1}
.kp-st.alt .kp-thumb{grid-column:2;grid-row:1}.kp-st.alt .kp-body{grid-column:1;grid-row:1}
.kp-st::after{content:attr(data-n);position:absolute;inset-inline-start:50%;top:50%;transform:translate(50%,-50%);width:30px;height:30px;border-radius:50%;background:var(--gold);color:var(--paper);display:grid;place-items:center;font:700 .85rem var(--f-display);z-index:2}
[dir="rtl"] .kp-st::after{transform:translate(50%,-50%)}
.kp-t{margin:0;font-family:var(--f-display);font-size:1rem;line-height:1.4;color:var(--ink)}
.kp-range{margin:0;font-size:.78rem;color:var(--muted)}
.kp-kid{margin:0;font-size:.86rem;line-height:1.7}
.kp-leaves{display:flex;flex-wrap:wrap;gap:4px}
.kp-leaf{font-family:var(--f-quran);font-size:1rem;border:1px solid var(--line);border-radius:8px;padding:0 6px;background:var(--bg);cursor:default}
.kp-leaf b{font-family:var(--f-body);font-size:.68rem;color:var(--gold);font-weight:700;margin-inline-end:3px}
.kp-test .kp-t,.kp-test .kp-leaf{color:transparent;background:linear-gradient(transparent 58%,var(--gold-soft) 58%);cursor:pointer;user-select:none}
.kp-test .kp-leaf b{color:transparent}
.kp-test .kp-shown{color:inherit!important;background:var(--bg)!important}
.kp-test .kp-shown b{color:var(--gold)!important}
.kp-go{align-self:flex-start;border:0;background:transparent;color:var(--gold);font:700 .8rem var(--f-body);cursor:pointer;padding:0}
@media (max-width:460px){.kp-st{grid-template-columns:1fr}.kp-st .kp-thumb,.kp-st.alt .kp-thumb{grid-column:1;grid-row:1}.kp-st .kp-body,.kp-st.alt .kp-body{grid-column:1;grid-row:2}.kp-roadwrap::before{display:none}.kp-st::after{inset-inline-start:auto;inset-inline-end:8px;top:8px;transform:none}}
`;
const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);

/* ---------- القراء ---------- */
const EXTRA=[
 ['Husary_Muallim_128kbps','الحصري (المصحف المعلّم)'],['Husary_128kbps_Mujawwad','الحصري (مجوّد)'],
 ['Minshawy_Mujawwad_192kbps','المنشاوي (مجوّد)'],['Abdul_Basit_Mujawwad_128kbps','عبد الباسط (مجوّد)'],
 ['Mustafa_Ismail_48kbps','مصطفى إسماعيل'],['Mohammad_al_Tablaway_128kbps','محمد محمود الطبلاوي'],
 ['Alafasy_128kbps','مشاري العفاسي'],['MaherAlMuaiqly128kbps','ماهر المعيقلي'],['Saood_ash-Shuraym_128kbps','سعود الشريم'],
 ['Ghamadi_40kbps','سعد الغامدي'],['Hudhaify_128kbps','علي الحذيفي'],['Muhammad_Ayyoub_128kbps','محمد أيوب'],
 ['Abdullah_Basfar_192kbps','عبد الله بصفر'],['Abu_Bakr_Ash-Shaatree_128kbps','أبو بكر الشاطري'],
 ['Ahmed_ibn_Ali_al-Ajamy_128kbps_ketaballah.net','أحمد بن علي العجمي'],['Hani_Rifai_192kbps','هاني الرفاعي'],
 ['Ibrahim_Akhdar_64kbps','إبراهيم الأخضر'],['Muhammad_Jibreel_128kbps','محمد جبريل'],['Ahmed_Neana_128kbps','أحمد نعينع'],
 ['Salaah_AbdulRahman_Bukhatir_128kbps','صلاح بوخاطر'],['Muhsin_Al_Qasim_192kbps','محسن القاسم'],
 ['Abdullaah_3awwaad_Al-Juhaynee_128kbps','عبد الله عوّاد الجهني'],['Salah_Al_Budair_128kbps','صلاح البدير'],
 ['Abdullah_Matroud_128kbps','عبد الله المطرود'],['Muhammad_AbdulKareem_128kbps','محمد عبد الكريم'],
 ['khalefa_al_tunaiji_64kbps','خليفة الطنيجي'],['Khaalid_Abdullaah_al-Qahtaanee_192kbps','خالد القحطاني'],
 ['Yasser_Ad-Dussary_128kbps','ياسر الدوسري'],['Nasser_Alqatami_128kbps','ناصر القطامي'],
 ['Ali_Hajjaj_AlSuesy_128kbps','علي حجاج السويسي'],['Sahl_Yassin_128kbps','سهل ياسين'],['aziz_alili_128kbps','عزيز عليلي'],
 ['Yaser_Salamah_128kbps','ياسر سلامة'],['Akram_AlAlaqimy_128kbps','أكرم العلاقمي'],['Ali_Jaber_64kbps','علي جابر'],
 ['Fares_Abbad_64kbps','فارس عباد'],['Ayman_Sowaid_64kbps','أيمن سويد'],['Karim_Mansoori_40kbps','كريم منصوري']
];
const MAIN5=RECITERS.slice(0,5).map(x=>x[0]);
EXTRA.forEach(x=>{if(!RECITERS.some(y=>y[0]===x[0]))RECITERS.push(x)});
try{
  if(store.get('kp-migrated','')!=='1'){store.set('kp-migrated','1');if(store.get('hadid-reciter','')==='Alafasy_128kbps')store.set('hadid-reciter','Husary_64kbps')}
  const r=store.get('hadid-reciter','');if(r&&RECITERS.some(x=>x[0]===r))reciter=r;
}catch(e){}
const rName=k=>(RECITERS.find(x=>x[0]===k)||[0,k])[1];
function reciterOptions(){
  const o=([k,n])=>`<option value="${k}" ${k===reciter?'selected':''}>${n}</option>`;
  return `<optgroup label="القراء الخمسة">${RECITERS.filter(x=>MAIN5.includes(x[0])).map(o).join('')}</optgroup><optgroup label="قراء آخرون">${RECITERS.filter(x=>!MAIN5.includes(x[0])).map(o).join('')}</optgroup>`;
}

/* ---------- الحالة ---------- */
const KP={view:null,tj:store.get('kp-tj','1')==='1',rmode:store.get('kp-rmode','ayah'),n:+store.get('kp-n','1'),gap:store.get('kp-gap','0'),one:null,loop:false,round:0,t:null,mapMode:'map',cache:{},rec:null,recUrl:null};
if(![0,1,2,3,5,7,10,15,20].includes(KP.n))KP.n=1;
const tjOf=i=>{if(!TJ)return null;if(!KP.cache[i])KP.cache[i]=TJ.analyze(ay(i).t);return KP.cache[i]};

/* ---------- التكرار ---------- */
const _stop=stopAudio;
stopAudio=function(){clearTimeout(KP.t);KP.t=null;_stop()};
playList=function(list){
  stopAudio();if(typeof vStop==='function')vStop();
  const n=KP.n;let q=[];KP.loop=false;KP.round=0;
  const single=list.length===1||KP.rmode==='one';
  if(single){const i=list.length===1?list[0]:(KP.one!=null&&list.includes(KP.one)?KP.one:list[0]);KP.one=i;
    if(n===0){q=[{i,r:1,of:0}];KP.loop=true}else for(let r=1;r<=n;r++)q.push({i,r,of:n});
    const sel=$$('kp-one');if(sel)sel.value=String(i);
  }else if(KP.rmode==='scene'){
    const N=n||1;for(let r=1;r<=N;r++)list.forEach(i=>q.push({i,r,of:n}));if(n===0)KP.loop=true;
  }else if(KP.rmode==='cumul'){
    const N=n||1;for(let k=0;k<list.length;k++)for(let r=1;r<=N;r++)for(let j=0;j<=k;j++)q.push({i:list[j],r,of:N,step:k+1});
  }else{const N=n||1;list.forEach(i=>{for(let r=1;r<=N;r++)q.push({i,r,of:N})})}
  A.queue=q;A.pos=0;A.playing=true;if(typeof setPlayBtn==='function')setPlayBtn();playCur();
};
playCur=function(){
  clearTimeout(KP.t);
  if(A.pos>=A.queue.length){
    if(KP.loop&&A.queue.length){A.pos=0;KP.round++}
    else{stopAudio();setStatus('انتهت التلاوة.');return}
  }
  let e=A.queue[A.pos];if(typeof e==='number')e={i:e,r:1,of:1};
  const a=ay(e.i);
  const times=e.of===0?`المرة ${ARn(KP.round+1)}`:(e.of>1?`المرة ${ARn(e.r)} من ${ARn(e.of)}`:'');
  const label=`يُتلى الآن: ${sName(a.s)} ${ARn(a.v)}${times?' · '+times:''}${e.step?` · الخطوة ${ARn(e.step)}`:''} · بصوت ${rName(reciter)}`;
  const go=()=>{if(!A.playing)return;audio.src=urlOf(e.i);hl(e.i);setStatus(label);
    const pr=audio.play();if(pr&&pr.catch)pr.catch(err=>{if(err&&err.name!=='AbortError'&&typeof audioErr==='function')audioErr()})};
  const started=A.pos>0||KP.round>0;
  let gap=0;if(started&&KP.gap!=='0'){gap=KP.gap==='x'?Math.max(1500,(isFinite(audio.duration)?audio.duration:3)*1000):(+KP.gap)*1000}
  if(gap){hl(-1);setStatus('دورك الآن: ردّدي ما سمعتِ…');KP.t=setTimeout(go,gap)}else go();
};

/* ---------- الرسم بعد كل صفحة ---------- */
const _render=render;
render=function(){KP.view=null;_render();try{post()}catch(err){console.error(err)}};
function post(){
  const p=PAGES[cur];
  addBar();
  if(typeof p==='number')enhanceScene(p);
  else if(p==='cover')enhanceCover();
}
function addBar(){
  let bar=$$('kp-bar');
  if(!bar){bar=document.createElement('div');bar.id='kp-bar';bar.className='kp-bar';
    const d=$$('dots');d.parentNode.insertBefore(bar,d.nextSibling)}
  bar.innerHTML=`<button data-kp="video" aria-pressed="${KP.view==='video'}">🎬 فيديو السورة</button><button data-kp="map" aria-pressed="${KP.view==='map'}">🗺 خريطة القصة</button><a href="tajweed.html">📘 تعلّمي التجويد</a><a href="index.html">📚 المكتبة</a>`;
}
function enhanceCover(){
  const c=document.querySelector('#page .cover');if(!c||c.querySelector('.kp-new'))return;
  const d=document.createElement('div');d.className='kp-new';
  d.innerHTML=`<h3>جديد في هذا الكتاب</h3>
  <ul><li><b>فيديو السورة</b>: مشاهد السورة تتوالى بالصور مع صوت القارئ، وتُضاء كل كلمة عند قراءتها، مع تكرار ومهلة للترديد وإخفاء النص لاختبار الحفظ.</li>
  <li><b>خريطة القصة</b>: كل مشاهد السورة في طريق واحد بالصور، مع بدايات الآيات، لتحفظي الترتيب كأنه قصة.</li>
  <li><b>ألوان التجويد</b> في الآيات، ومراجعة للتجويد أثناء «سمّعي بصوتك» مع تسجيل صوتك ومقارنته بالقارئ.</li>
  <li><b>تكرار الآية</b>: آية واحدة، أو كل آية وحدها، أو المشهد كاملًا، أو تكرار تراكمي، مع مهلة لترديدك.</li>
  <li><b>قراء أكثر</b>: الشيخ محمود علي البنا ضمن القراء الخمسة، وقائمة بقراء آخرين من الإنترنت.</li></ul>
  <div class="toc"><button data-kp="video">فيديو السورة<span>المشاهد تتوالى مع التلاوة</span></button><button data-kp="map">خريطة القصة<span>السورة كلها في صفحة واحدة</span></button><a class="kp-toc" href="tajweed.html">تعلّمي التجويد<span>دروس قصيرة وتدريب</span></a></div>
  <p class="note">رُوجع تشكيل الآيات وعلامات الوقف على نص مصحف المدينة النبوية (رواية حفص) من مجمع الملك فهد ومشروع تنزيل.</p>`;
  c.appendChild(d);
}
function rulesInScene(idx,colored){
  const R={};
  idx.forEach(i=>{const a=tjOf(i);if(!a)return;a.words.forEach((w,k)=>w.rules.forEach(r=>{
    if(colored&&!TJ.RULES[r].c&&r!=='izhar')return;
    if(r==='lam_qamar'||r==='izhar_sh'||r==='izhar_m')return;
    (R[r]=R[r]||[]);if(R[r].length<40)R[r].push({i,k,w:w.t})}))});
  return TJ.ORDER.filter(r=>R[r]).map(r=>({r,list:R[r]}));
}
function enhanceScene(p){
  const s=SCENES[p],idx=sIdx(s),m=mode[p]||'read';
  const inner=document.querySelector('#page .inner');if(!inner)return;
  // القارئ
  const sel=$$('reciter');if(sel){sel.innerHTML=reciterOptions();sel.value=reciter}
  // التكرار
  const rp=$$('rep');if(rp){rp.hidden=true;const lb=document.querySelector('label[for="rep"]');if(lb)lb.hidden=true}
  const player=inner.querySelector('.player');
  if(player&&!$$('kp-rmode')){
    if(KP.one==null||!idx.includes(KP.one))KP.one=idx[0];
    const box=document.createElement('div');box.className='kp-row';box.id='kp-repbox';
    const nOpts=(KP.rmode==='one'||KP.rmode==='scene')?[1,2,3,5,7,10,15,20,0]:[1,2,3,5,7,10,15,20];
    if(!nOpts.includes(KP.n))KP.n=3;
    box.innerHTML=`<label for="kp-rmode">التكرار</label>
     <select id="kp-rmode"><option value="ayah">كل آية وحدها</option><option value="one">آية واحدة</option><option value="scene">المشهد كاملًا</option><option value="cumul">تراكمي: ١، ثم ١–٢، ثم ١–٣…</option></select>
     <select id="kp-one" aria-label="الآية" ${KP.rmode==='one'?'':'hidden'}>${idx.map(i=>`<option value="${i}" ${i===KP.one?'selected':''}>الآية ${ARn(ay(i).v)}</option>`).join('')}</select>
     <select id="kp-n" aria-label="عدد المرات">${nOpts.map(n=>`<option value="${n}" ${n===KP.n?'selected':''}>${n?ARn(n)+' ×':'بلا توقف ∞'}</option>`).join('')}</select>
     <select id="kp-gap" aria-label="مهلة للترديد"><option value="0">بلا مهلة</option><option value="2">مهلة ٢ ث للترديد</option><option value="4">مهلة ٤ ث</option><option value="6">مهلة ٦ ث</option><option value="x">مهلة بطول الآية (اسمعي ثم ردّدي)</option></select>`;
    player.parentNode.insertBefore(box,player.nextSibling);
    $$('kp-rmode').value=KP.rmode;$$('kp-gap').value=KP.gap;
    const pb=$$('playbtn');if(pb&&KP.rmode==='one')pb.textContent='▶ استمعي للآية';
    // قارئ آخر من الإنترنت
    const more=document.createElement('details');more.className='kp-more';
    const a0=ay(idx[0]);
    more.innerHTML=`<summary>🔎 قارئ آخر من الإنترنت</summary>
      <input id="kp-q" type="search" placeholder="اكتبي اسم القارئ…" aria-label="ابحثي عن قارئ">
      <div class="kp-rlist" id="kp-rlist"></div>
      <p class="note">تُشغَّل التلاوة آية بآية من موقع EveryAyah، وتعمل معها كل طرق التكرار. تحتاج اتصالًا بالإنترنت.</p>
      <label for="kp-url" class="note">أو ألصقي رابط تلاوة صوتية (mp3) لأي قارئ آخر:</label>
      <div class="kp-row"><input id="kp-url" type="url" inputmode="url" placeholder="https://…" style="flex:1;min-width:0"><button class="btn" data-kp="url">▶ تشغيل الرابط</button></div>
      <p class="note">وللاستماع إلى السورة كاملة بمئات القراء: <a href="https://quran.com/${a0.s}" target="_blank" rel="noopener">Quran.com</a> · <a href="https://www.mp3quran.net/ar" target="_blank" rel="noopener">mp3quran.net</a></p>`;
    const status=$$('astatus');(status||box).parentNode.insertBefore(more,(status||box).nextSibling);
    fillRList('');
    // تنزيل تلاوة الصفحة للاستماع بدون إنترنت
    if(window.HadidOffline&&'caches' in window){
      const dl=document.createElement('div');dl.className='kp-row kp-offline';
      dl.innerHTML=`<button class="btn" data-kp="dlaudio">⬇ تنزيل تلاوة هذه الصفحة للاستماع بدون إنترنت</button><span class="note" id="kp-dl-st"></span>`;
      more.parentNode.insertBefore(dl,more.nextSibling);
      dlStatus();
    }
  }
  // زر ألوان التجويد
  const modes=inner.querySelector('.modes');
  if(modes&&TJ&&!modes.querySelector('[data-kp="tj"]')&&m!=='voice'){
    const b=document.createElement('button');b.className='mode';b.dataset.kp='tj';b.setAttribute('aria-pressed',KP.tj);b.textContent='🎨 ألوان التجويد';modes.appendChild(b);
  }
  if(!TJ)return;
  if(m==='voice')voicePanel(p,idx,inner);
  else{
    if(KP.tj)colorize(idx);
    const R=rulesInScene(idx,true);
    const box=document.createElement('div');box.className='box adult';box.id='kp-tjbox';
    box.innerHTML=`<h3>التجويد في هذا المشهد</h3>
      <div class="kp-legend">${R.map(({r,list})=>`<button class="kp-chip" data-kp-rule="${r}"><span class="tj-${TJ.RULES[r].c||'x'}"><span class="kp-dot"></span></span>${TJ.RULES[r].n}<b>${ARn(list.length)}</b></button>`).join('')||'<span class="note">لا أحكام ملوّنة هنا.</span>'}</div>
      <p class="kp-info" id="kp-tjinfo">${KP.tj?'اضغطي حكمًا أو حرفًا ملوّنًا لتعرفي الحكم وكيف تنطقينه.':'اضغطي «🎨 ألوان التجويد» لتلوين الأحكام في الآيات.'}</p>
      <p class="note">التلوين مساعدة آلية تتبع قواعد رواية حفص من طريق الشاطبية، وقد تفوتها مواضع نادرة؛ فالمرجع مصحف التجويد والمعلّم. <a href="tajweed.html">دروس التجويد ←</a></p>`;
    const anchor=inner.querySelector('.box.kid')||null;inner.insertBefore(box,anchor);
  }
}
function fillRList(q){
  const el=$$('kp-rlist');if(!el)return;q=(q||'').trim();
  const norm=t=>t.replace(/[أإآ]/g,'ا').replace(/ة/g,'ه').replace(/ى/g,'ي').replace(/[ً-ْ]/g,'');
  const L=RECITERS.filter(([k,n])=>!q||norm(n).includes(norm(q)));
  el.innerHTML=L.map(([k,n])=>`<button data-kp-r="${k}" aria-pressed="${k===reciter}">${n}</button>`).join('')||'<span class="note">لا يوجد قارئ بهذا الاسم في القائمة. جرّبي رابط mp3 أو المواقع بالأسفل.</span>';
}
function colorize(idx){
  idx.forEach(i=>{const a=tjOf(i);if(!a)return;
    document.querySelectorAll(`.ay[data-a="${i}"] .w`).forEach(el=>{
      if(el.classList.contains('hid'))return;const w=a.words[+el.dataset.k];if(!w)return;
      if(w.segs.some(s=>s.r))el.innerHTML=TJ.colorHTML(w);
    })});
}
function showRule(r,word){
  const el=$$('kp-tjinfo')||$$('kp-live');if(!el)return;const R=TJ.RULES[r];
  el.innerHTML=`<span class="tj-${R.c||'x'}"><span class="kp-dot"></span></span> <b>${R.n}</b>${word?` في «<span style="font-family:var(--f-quran)">${esc(word)}</span>»`:''}: ${R.how} <a href="tajweed.html#${R.lesson}">الدرس ←</a>`;
}

/* ---------- مراجعة التجويد مع التسميع بالصوت ---------- */
function voicePanel(p,idx,inner){
  const R=rulesInScene(idx,false).filter(x=>TJ.RULES[x.r].c||x.r==='izhar');
  const key=`kp-self-${FILE}-${p}`;let self={};try{self=JSON.parse(store.get(key,'{}'))||{}}catch(e){}
  const box=document.createElement('div');box.className='box adult';box.id='kp-review';
  box.innerHTML=`<h3>مراجعة التجويد مع التسميع</h3>
   <p class="note">التسميع بالصوت يتعرّف على الكلمات فقط. لذلك: انظري إلى الأحكام قبل أن تبدئي، وسيظهر لكِ هنا الحكم عند كل كلمة صحيحة فيها حكم. ثم قيّمي نفسك، وسجّلي آية وقارني صوتك بصوت القارئ، أو جرّبي الفحص التجريبي للتجويد.</p>
   <p class="kp-live" id="kp-live" aria-live="polite"></p>
   <details class="kp-more" id="kp-rules"><summary>أحكام التجويد في هذا المشهد (${ARn(R.length)}) — قيّمي نفسك</summary><ul class="kp-check">${R.map(({r,list})=>`<li><div><span class="tj-${TJ.RULES[r].c||'x'}"><span class="kp-dot"></span></span> <b>${TJ.RULES[r].n}</b> <span class="note">(${ARn(list.length)})</span></div>
     <div class="ex">${[...new Set(list.map(x=>x.w))].slice(0,6).map(esc).join(' · ')}</div>
     <div class="how">${TJ.RULES[r].how} <a href="tajweed.html#${TJ.RULES[r].lesson}">الدرس</a></div>
     <div class="kp-self" data-key="${r}"><button data-kp-self="${r}" data-v="1" aria-pressed="${self[r]===1}">✓ طبّقتُه</button><button data-kp-self="${r}" data-v="0" aria-pressed="${self[r]===0}">أحتاج تدريبًا</button></div></li>`).join('')}</ul></details>
   <p class="note" id="kp-selfsum"></p>
   <div class="kp-row"><label for="kp-rec-a">سجّلي آية وقارنيها:</label>
     <select id="kp-rec-a">${idx.map(i=>`<option value="${i}">الآية ${ARn(ay(i).v)}</option>`).join('')}</select>
     <button class="btn solid" data-kp="rec">🎙 سجّلي</button><button class="btn" data-kp="recplay" ${KP.recUrl?'':'disabled'}>▶ تلاوتي</button><button class="btn" data-kp="refplay">▶ القارئ</button></div>
   <p class="status" id="kp-rec-st">اختاري آية، ثم «سجّلي» واقرئيها، ثم «إيقاف». استمعي لتلاوتك ثم للقارئ، وانتبهي للمدود والغنّة.</p>
   <div class="kp-row"><button class="btn" data-kp="vcmp" ${KP.recUrl?'':'disabled'}>📊 قارني صوتي بالقارئ</button><button class="btn" data-kp="vchk" ${KP.recUrl?'':'disabled'}>🧪 فحص التجويد <span class="kp-exp">تجريبي</span></button></div>
   <details class="kp-more"><summary>عن الفحص التجريبي</summary><p class="note">«قارني صوتي بالقارئ» يعرض زمن كل كلمة وكل مدّ وغنّة عندكِ وعند القارئ جنبًا إلى جنب. يستمع نموذج ذكاء اصطناعي مفتوح (HisnLabs tajweed-v2) إلى تسجيلك داخل المتصفح، ويكتب ما سمعه بالأصوات، ثم يقارنه بالقراءة الصحيحة برواية حفص: المدود، والغنّة، والإخفاء، والإقلاب، والإدغام، والقلقلة، والشدّة، والحروف والحركات. يُنزَّل النموذج مرة واحدة (نحو ٢٣ ميغابايت) ثم يعمل بلا إنترنت، ولا يُرسَل صوتك إلى أي خادم.</p><p class="note">حدوده: يصف أحيانًا كلمة صحيحة بأنها خاطئة، ولم يُختبر على أصوات الأطفال، ولا يفهم الوقف في وسط الآية ولا التكرار. ملاحظاته للاسترشاد، والحكم للمعلّم.</p><button class="btn" data-kp="vself">جرّبي الفحص على صوت القارئ</button></details>
   <p class="status" id="kp-vc-st" aria-live="polite"></p><div id="kp-vc"></div>`;
  const v=inner.querySelector('.voice');inner.insertBefore(box,v?v.nextSibling:inner.querySelector('.box.kid'));
  selfSummary(self,R);
}
function selfSummary(self,R){
  const el=$$('kp-selfsum');if(!el)return;
  const need=Object.keys(self).filter(r=>self[r]===0);
  el.innerHTML=need.length?`تحتاجين تدريبًا على: ${need.map(r=>`<a href="tajweed.html#${TJ.RULES[r].lesson}">${TJ.RULES[r].n}</a>`).join('، ')}.`:'';
}
if(typeof mark==='function'){
  const _mark=mark;
  mark=function(x,cls){_mark(x,cls);
    try{if(cls!=='ok'||!TJ||!$$('kp-live'))return;const a=tjOf(x.a);const w=a&&a.words[x.k];if(!w)return;
      const r=w.rules.find(r=>TJ.RULES[r].c);if(!r)return;
      $$('kp-live').innerHTML=`✓ «<span style="font-family:var(--f-quran)">${esc(w.t)}</span>»: <span class="tj-${TJ.RULES[r].c}"><b>${TJ.RULES[r].n}</b></span> — ${TJ.RULES[r].how}`;
    }catch(e){}};
}
if(typeof done==='function'){
  const _done=done;
  done=function(){_done();const b=$$('kp-review');if(b){const d=$$('kp-rules');if(d)d.open=true;const l=$$('kp-live');if(l)l.textContent='انتهى التسميع. الآن قيّمي تجويدك في كل حكم، وسجّلي آية لتقارنيها بالقارئ.';b.scrollIntoView({behavior:'smooth',block:'start'})}};
}
const refA=new Audio(),myA=new Audio();
let VCload=null;
const loadVoice=()=>VCload=VCload||new Promise((ok,no)=>{if(window.HadidVoice)return ok();const s=document.createElement('script');s.src='voice-check.js?v=6';s.onload=ok;s.onerror=()=>{VCload=null;no(new Error('load'))};document.head.appendChild(s)});
let VCbusy=false;
async function voice(k){
  const st=$$('kp-vc-st'),box=$$('kp-vc'),i=+(($$('kp-rec-a')||{}).value);if(!st||!box||isNaN(i)||VCbusy)return;
  const say=m=>{st.textContent=m};const a=ay(i);
  if(k!=='vself'&&!KP.recUrl){say('سجّلي الآية أولًا.');return}
  VCbusy=true;refA.pause();myA.pause();stopAudio();box.innerHTML='';
  try{await loadVoice();const V=window.HadidVoice;
    if(k==='vcmp'){
      if(navigator.onLine||await V.isReady()){try{await V.compareWords(KP.recUrl,urlOf(i),a.s,a.v,box,say);return}catch(e){if(e&&e.message==='short')throw e;console.warn(e)}}
      await V.compare(KP.recUrl,urlOf(i),box,say);box.insertAdjacentHTML('afterbegin','<p class="note">مقارنة مبسّطة بارتفاع الصوت فقط، لأن نموذج الاستماع غير متاح الآن. اتصلي بالإنترنت مرة لتنزيله، فتظهر المقارنة كلمةً بكلمة.</p>')}
    else{const src=k==='vself'?urlOf(i):KP.recUrl;
      if(!navigator.onLine&&!(await V.isReady())){say('الفحص يحتاج إلى الإنترنت أول مرة فقط لتنزيل النموذج. اتصلي بالإنترنت ثم حاولي.');return}
      await V.check(src,a.s,a.v,box,say);
      if(k==='vself')box.insertAdjacentHTML('afterbegin',`<p class="note">هذا فحص تلاوة القارئ (${esc(rName(reciter))}) للآية ${ARn(a.v)}. تلاوته صحيحة، فكل ملاحظة هنا خطأ من الفحص نفسه، وتدلّك على مقدار الثقة به.</p>`)}
  }catch(e){say(e&&e.message==='short'?'التسجيل قصير جدًا أو صامت. اقرئي الآية كاملة قريبًا من الميكروفون.':k==='vcmp'?'تعذّرت المقارنة. تأكدي أن صوت القارئ متاح (بالإنترنت أو بعد تنزيله)، ثم حاولي.':'تعذّر الفحص. تأكدي من الاتصال بالإنترنت أول مرة، وجرّبي Chrome أو Edge أو Safari حديثًا.');console.warn(e);st.insertAdjacentHTML('beforeend',` <small style="opacity:.6" dir="ltr">(${esc(String(e&&e.message||e).slice(0,140))})</small>`)}
  finally{VCbusy=false}
}
async function recToggle(btn){
  const stEl=$$('kp-rec-st');
  if(KP.rec&&KP.rec.state==='recording'){KP.rec.stop();return}
  if(!navigator.mediaDevices||!window.MediaRecorder){stEl.textContent='التسجيل غير مدعوم في هذا المتصفح. جرّبي Chrome.';return}
  try{if(typeof vStop==='function')vStop();stopAudio();
    const stream=await navigator.mediaDevices.getUserMedia({audio:true});
    const rec=new MediaRecorder(stream),chunks=[];KP.rec=rec;
    rec.ondataavailable=e=>{if(e.data&&e.data.size)chunks.push(e.data)};
    rec.onstop=()=>{stream.getTracks().forEach(t=>t.stop());if(KP.recUrl)URL.revokeObjectURL(KP.recUrl);
      KP.recUrl=URL.createObjectURL(new Blob(chunks,{type:rec.mimeType||'audio/webm'}));
      btn.textContent='🎙 سجّلي من جديد';['recplay','vcmp','vchk'].forEach(k=>{const b=document.querySelector(`[data-kp="${k}"]`);if(b)b.disabled=false});
      stEl.textContent='تم التسجيل. استمعي إلى «تلاوتي» ثم «القارئ» وقارني.'};
    rec.start();btn.textContent='■ إيقاف';stEl.textContent='جارٍ التسجيل… اقرئي الآية الآن.';
  }catch(e){stEl.textContent='لم يُسمح باستخدام الميكروفون. اسمحي للمتصفح به ثم حاولي مرة أخرى.'}
}

/* ---------- خريطة القصة ---------- */
const firstSent=t=>{const m=String(t).match(/^[^.!؟?]+[.!؟?]?/);const s=m?m[0]:String(t);return s.length>150?s.slice(0,147)+'…':s};
let renderMap=function(){
  stopAudio();if(typeof vStop==='function')vStop();KP.view='map';addBar();
  const el=$$('page');const cnt=$$('count');if(cnt)cnt.textContent='الخريطة';
  const total=AYAT.length,mm=KP.mapMode;
  const groups=[];SCENES.forEach((s,i)=>{const r=s.rub||1;let g=groups.find(g=>g.r===r);if(!g){g={r,items:[]};groups.push(g)}g.items.push(i)});
  const rubName=r=>(typeof RUBS!=='undefined'&&RUBS[r-1])?`${RUBS[r-1][0]} · ${RUBS[r-1][1]}`:'';
  let n=0;
  const station=i=>{const s=SCENES[i],idx=sIdx(s),a1=ay(idx[0]),a2=ay(idx[idx.length-1]);n++;
    return `<li class="kp-st${n%2?'':' alt'}" data-n="${ARn(i+1)}">
      <button class="kp-thumb" data-go="${i+1}" aria-label="افتحي المشهد ${ARn(i+1)}">${s.svg}</button>
      <div class="kp-body"><h3 class="kp-t">${s.title}</h3><p class="kp-range">${sName(a1.s)} ${ARn(a1.v)}${a2.v!==a1.v?'–'+ARn(a2.v):''}</p>
        ${mm==='story'?`<p class="kp-kid">${s.kid||''}</p>`:(mm==='map'&&s.kid?`<p class="kp-kid">${firstSent(s.kid)}</p>`:'')}
        <div class="kp-leaves">${idx.map(j=>`<span class="kp-leaf"><b>${ARn(ay(j).v)}</b>${esc(wordsOf(j).slice(0,2).join(' '))}</span>`).join('')}</div>
        <button class="kp-go" data-go="${i+1}">افتحي المشهد ←</button></div></li>`};
  el.innerHTML=`<div class="kp-map ${mm==='test'?'kp-test':''}">
    <div><div class="eyebrow">خريطة القصة</div><h2>${esc(BOOK)}</h2></div>
    <div class="modes" role="group" aria-label="طريقة عرض الخريطة">
      ${[['map','الخريطة'],['story','احكي القصة'],['test','اختبري نفسك']].map(([k,t])=>`<button class="mode" data-kp-mm="${k}" aria-pressed="${mm===k}">${t}</button>`).join('')}</div>
    <p class="note">${mm==='test'?'العناوين وبدايات الآيات مخفية. تذكّري كل محطة بصورتها، ثم اضغطي لتتأكدي.':mm==='story'?'اقرئي السورة كأنها قصة: محطة بعد محطة، وفي كل محطة صورتها وما يحدث فيها.':'كل محطة مشهد من السورة بالترتيب، وتحتها بدايات آياته. اتبعي الطريق من أعلى إلى أسفل، واضغطي الصورة لتفتحي المشهد.'}</p>
    <div class="kp-root"><b>${esc(BOOK)}</b><span>${ARn(total)} ${total%100>=3&&total%100<=10?'آيات':'آية'} · ${ARn(SCENES.length)} ${SCENES.length%100>=3&&SCENES.length%100<=10?'مشاهد':'مشهدًا'}</span></div>
    <div class="kp-roadwrap">${groups.map(g=>`${groups.length>1&&rubName(g.r)?`<div class="kp-rub">${rubName(g.r)}</div>`:''}<ol class="kp-road">${g.items.map(station).join('')}</ol>`).join('')}</div>
    <p class="note">نصيحة: بعد أن تحفظي المشاهد، أغلقي الكتاب واحكي القصة من الذاكرة: ما صورة المحطة الأولى؟ وبماذا تبدأ آياتها؟ ثم انتقلي للتي بعدها.</p>
  </div>`;
  window.scrollTo({top:0,behavior:'smooth'});
};

/* ---------- الأحداث ---------- */
document.addEventListener('click',e=>{
  const t=e.target.closest('[data-kp],[data-kp-r],[data-kp-mm],[data-kp-rule],[data-kp-self],.tj,.kp-test .kp-t,.kp-test .kp-leaf');if(!t)return;
  if(t.classList.contains('tj')){showRule(t.dataset.r,t.closest('.w')&&t.closest('.w').textContent);return}
  if(t.classList.contains('kp-t')||t.classList.contains('kp-leaf')){t.classList.toggle('kp-shown');return}
  if(t.dataset.kpRule){showRule(t.dataset.kpRule,'');return}
  if(t.dataset.kpMm){KP.mapMode=t.dataset.kpMm;renderMap();return}
  if(t.dataset.kpR){reciter=t.dataset.kpR;store.set('hadid-reciter',reciter);const s=$$('reciter');if(s)s.value=reciter;fillRList(($$('kp-q')||{}).value);dlStatus();
    if(A.playing){A.queue=A.queue.slice(A.pos);A.pos=0;playCur()}else setStatus(`القارئ الآن: ${rName(reciter)}. اضغطي «استمعي».`);return}
  if(t.dataset.kpSelf){const key=`kp-self-${FILE}-${PAGES[cur]}`;let self={};try{self=JSON.parse(store.get(key,'{}'))||{}}catch(err){}
    const v=+t.dataset.v;if(self[t.dataset.kpSelf]===v)delete self[t.dataset.kpSelf];else self[t.dataset.kpSelf]=v;store.set(key,JSON.stringify(self));
    t.parentNode.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',self[t.dataset.kpSelf]===+b.dataset.v));selfSummary(self);return}
  const k=t.dataset.kp;
  if(k==='map'){renderMap();return}
  if(k==='tj'){KP.tj=!KP.tj;store.set('kp-tj',KP.tj?'1':'0');render();return}
  if(k==='url'){const u=(($$('kp-url')||{}).value||'').trim();
    if(!/^https?:\/\//i.test(u)){setStatus('اكتبي رابطًا يبدأ بـ https://',true);return}
    stopAudio();audio.src=u;const pr=audio.play();setStatus('تُشغَّل التلاوة من الرابط… اضغطي «إيقاف» لإيقافها.');
    const pb=$$('playbtn');if(pb){pb.textContent='■ إيقاف';pb.setAttribute('data-stop','');pb.removeAttribute('data-play')}
    if(pr&&pr.catch)pr.catch(()=>setStatus('تعذّر تشغيل هذا الرابط. تأكدي أنه رابط ملف صوتي مباشر.',true));return}
  if(k==='rec'){recToggle(t);return}
  if(k==='vcmp'||k==='vchk'||k==='vself'){voice(k);return}
  if(k==='dlaudio'){dlAudio();return}
  if(k==='recplay'){if(KP.recUrl){refA.pause();stopAudio();myA.src=KP.recUrl;myA.play()}return}
  if(k==='refplay'){const i=+(($$('kp-rec-a')||{}).value);if(isNaN(i))return;myA.pause();stopAudio();refA.src=urlOf(i);refA.play().catch(()=>{const s=$$('kp-rec-st');if(s)s.textContent='تعذّر تشغيل صوت القارئ. تأكدي من الاتصال بالإنترنت.'});return}
});
document.addEventListener('change',e=>{
  const id=e.target.id;
  if(id==='kp-rmode'){KP.rmode=e.target.value;store.set('kp-rmode',KP.rmode);stopAudio();const p=PAGES[cur];render();return}
  if(id==='kp-n'){KP.n=+e.target.value;store.set('kp-n',String(KP.n));return}
  if(id==='kp-gap'){KP.gap=e.target.value;store.set('kp-gap',KP.gap);return}
  if(id==='kp-one'){KP.one=+e.target.value;return}
  if(id==='reciter'){fillRList(($$('kp-q')||{}).value);setTimeout(dlStatus,50);return}
});
const allUrls=()=>AYAT.map((_,i)=>urlOf(i));
function dlStatus(){const st=$$('kp-dl-st');if(!st||!window.HadidOffline)return;const H=window.HadidOffline,u=allUrls();
  H.audioCount(u).then(n=>{st.textContent=n>=u.length?` ✓ محفوظة على الجهاز بصوت ${rName(reciter)}`:(n?` محفوظ ${H.ARn(n)} من ${H.ARn(u.length)} آية بصوت ${rName(reciter)}`:'')}).catch(()=>{})}
async function dlAudio(){const st=$$('kp-dl-st'),H=window.HadidOffline;if(!st||!H||KP.dl)return;KP.dl=true;
  const u=allUrls();st.textContent=' جارٍ التنزيل…';
  try{const r=await H.cacheAudio(u,(d,t)=>{st.textContent=` جارٍ التنزيل: ${H.ARn(d)} من ${H.ARn(t)}`});
    if(r.saved>=r.total)st.textContent=` ✓ نُزّلت التلاوة كاملة بصوت ${rName(reciter)}، وتعمل بدون إنترنت`;
    else if(r.blocked&&!r.saved)st.textContent=' تعذّر التنزيل: تأكدي من الاتصال بالإنترنت ثم أعيدي المحاولة.';
    else st.textContent=` نُزّل ${H.ARn(r.saved)} من ${H.ARn(r.total)} آية. أعيدي الضغط لإكمال الباقي.`}
  catch(e){st.textContent=' المتصفح لا يدعم الحفظ على الجهاز.'}
  KP.dl=false}
document.addEventListener('input',e=>{if(e.target.id==='kp-q')fillRList(e.target.value)});
// تشغيل زر «استمعي» في وضع «آية واحدة» يشغّل الآية المختارة
document.addEventListener('click',e=>{const t=e.target.closest('#playbtn[data-play]');if(t&&KP.rmode==='one'){e.stopImmediatePropagation();const s=SCENES[PAGES[cur]];playList([KP.one!=null&&sIdx(s).includes(KP.one)?KP.one:sIdx(s)[0]])}},true);


/* ---------- فيديو السورة: المشاهد تتوالى مع صوت القارئ ونص الآية ---------- */
const vcss=`
.kp-bar [data-kp="video"]{background:#B23A48;border-color:#B23A48;color:#fff;font-size:.95rem;padding:6px 16px;box-shadow:0 3px 10px rgba(0,0,0,.18)}
.kp-vid{padding:16px 14px 22px;display:flex;flex-direction:column;gap:12px}
.kp-stage{background:#0B111B;border-radius:16px;overflow:hidden;display:flex;flex-direction:column;position:relative;color:#F3EEDF}
.kp-pic{position:relative;aspect-ratio:9/5;overflow:hidden;background:#0B111B}
.kp-sv{position:absolute;inset:0;animation:kpkb 16s ease-in-out infinite alternate}
.kp-sv svg{width:100%;height:100%;display:block}
.kp-in{animation:kpfade .9s ease-out,kpkb 16s ease-in-out infinite alternate}
.kp-av{position:absolute;inset:0}.kp-av svg{width:100%;height:100%;display:block}
.kp-in2{animation:kpfade .6s ease-out}
@media (prefers-reduced-motion:reduce){.kp-av *{animation-duration:.01s!important;animation-iteration-count:1!important}}
@keyframes kpkb{from{transform:scale(1.02)}to{transform:scale(1.15) translate(-2%,1.5%)}}
@keyframes kpfade{from{opacity:0}to{opacity:1}}
@media (prefers-reduced-motion:reduce){.kp-sv,.kp-in{animation:none}}
.kp-top{position:absolute;top:8px;inset-inline-start:8px;background:rgba(11,17,27,.72);color:#FFD36B;border-radius:999px;padding:2px 12px;font:700 .8rem var(--f-body);max-width:calc(100% - 16px);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.kp-big{position:absolute;inset:0;margin:auto;width:72px;height:72px;border-radius:50%;border:0;background:rgba(255,211,107,.92);color:#0B111B;font-size:1.8rem;cursor:pointer;box-shadow:0 6px 20px rgba(0,0,0,.4)}
.kp-big[hidden]{display:none}
.kp-cap{padding:12px 14px 14px;text-align:center;overflow:auto;border-top:2px solid #FFD36B}
.kp-ayah{font-family:var(--f-quran);font-size:clamp(1.35rem,5vw,2rem);line-height:2.1;margin:0}
.kp-ayah .kv-w{transition:color .15s;border-radius:6px}
.kp-ayah .kv-w.on{color:#FFD36B;background:rgba(255,211,107,.14)}
.kp-ayah .kv-w.done{color:#F3EEDF}
.kp-ayah.tm-reveal .kv-w:not(.on):not(.done){opacity:0}
.kp-ayah.tm-hide .kv-w{opacity:0}
.kp-ayah.tm-hide .kv-w.on{opacity:1;color:transparent;background:rgba(255,211,107,.25)}
.kp-num{font-size:.8rem;color:#C9D2DC;margin-top:2px;display:block}
.kp-mean{margin:10px 0 0;padding:10px 12px;background:rgba(255,255,255,.07);border-radius:10px;text-align:start;font-size:clamp(.95rem,3.6vw,1.1rem);line-height:1.9;color:#F3EEDF}
.kp-mean b{color:#8FE3B0;font-family:var(--f-display);font-weight:500}
.kp-mean[hidden]{display:none}
.kp-gl{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px;justify-content:center}
.kp-gl span{background:rgba(255,211,107,.14);border:1px solid rgba(255,211,107,.4);border-radius:999px;padding:1px 10px;font-size:.85rem;color:#F3EEDF}
.kp-gl span i{font-style:normal;font-family:var(--f-quran);color:#FFD36B;margin-inline-end:4px}
.kp-stage:fullscreen .kp-cap,.kp-stage:-webkit-full-screen .kp-cap{max-height:50vh}
.kp-prog{height:6px;background:var(--line);border-radius:999px;overflow:hidden;cursor:pointer}
.kp-prog div{height:100%;background:#B23A48;width:0;transition:width .3s}
.kp-vctl{display:flex;justify-content:center;gap:10px;flex-wrap:wrap}
.kp-vctl button{min-width:48px;min-height:44px;border-radius:12px;border:1px solid var(--line);background:var(--paper);color:var(--ink);font:700 1rem var(--f-body);cursor:pointer;padding:0 12px}
.kp-vctl button.main{background:#B23A48;border-color:#B23A48;color:#fff;min-width:88px}
.kp-vset{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px}
.kp-vset label{display:flex;flex-direction:column;gap:2px;font-size:.8rem;color:var(--muted)}
.kp-vset select{font:inherit;font-size:.92rem;border:1px solid var(--line);border-radius:8px;background:var(--paper);color:var(--ink);padding:6px 8px;min-height:40px}
.kp-story{background:var(--gold-soft);border-radius:12px;padding:10px 12px;margin:0;font-size:.92rem;line-height:1.8}
.kp-story b{font-family:var(--f-display);color:var(--gold)}
.kp-stage:fullscreen{border-radius:0;height:100%}
.kp-stage:fullscreen .kp-pic{aspect-ratio:auto;flex:1}
.kp-stage:fullscreen .kp-cap{max-height:40vh}
.kp-stage:fullscreen .kp-ayah{font-size:clamp(1.6rem,4vw,2.8rem)}
.kp-stage:-webkit-full-screen{border-radius:0;height:100%}
.kp-stage:-webkit-full-screen .kp-pic{aspect-ratio:auto;flex:1}
`;
const vst=document.createElement('style');vst.textContent=vcss;document.head.appendChild(vst);
const sceneOf=[];SCENES.forEach((s,k)=>sIdx(s).forEach(i=>{if(sceneOf[i]==null)sceneOf[i]=k}));
for(let i=0,last=0;i<AYAT.length;i++){if(sceneOf[i]==null)sceneOf[i]=last;else last=sceneOf[i]}
const VV={i:0,r:1,playing:false,scene:-1,raf:0,au:new Audio(),
  rep:+store.get('kp-vrep','1')||1,mean:store.get('kp-vmean','1')==='1',tf:{},speed:+store.get('kp-vspeed','1')||1,tm:store.get('kp-vtm','show'),gap:+store.get('kp-vgap','0')||0,t:null};
const vau=VV.au;
const ANIM_V=3;
const vw=t=>[...t].filter(ch=>!/[ً-ٰٟۖ-ۭ]/.test(ch)).length+1;
function vStopAll(){VV.playing=false;clearTimeout(VV.t);cancelAnimationFrame(VV.raf);try{vau.pause()}catch(e){};vSetBtn()}
function vSetBtn(){const b=$$('kv-play');if(b)b.textContent=VV.playing?'⏸ إيقاف':'▶ تشغيل';const g=$$('kv-big');if(g)g.hidden=VV.playing}
function vStatus(t){const s=$$('kv-st');if(s)s.textContent=t||''}
function vShow(i){
  VV.i=Math.max(0,Math.min(AYAT.length-1,i));store.set(`kp-vpos-${FILE}`,String(VV.i));
  const k=sceneOf[VV.i],s=SCENES[k],a0=ay(VV.i),an=window.AYAH_ANIM&&AYAH_ANIM[a0.s]&&AYAH_ANIM[a0.s][a0.v];
  if(an){VV.scene=-1;const pic=$$('kv-scene');
    if(pic){pic.innerHTML=`<div class="kp-av kp-in2">${an}</div>`;const svg=pic.querySelector('svg');if(svg)svg.setAttribute('preserveAspectRatio','xMidYMid slice')}
    const top=$$('kv-top');if(top)top.textContent=`مشهد الآية ${ARn(a0.v)}`;
    if(s){const ix=sIdx(s),a1=ay(ix[0]),a2=ay(ix[ix.length-1]),rng=a1.v===a2.v?`الآية ${ARn(a1.v)}`:`الآيات ${ARn(a1.v)}–${ARn(a2.v)}`;const st=$$('kv-story');if(st)st.innerHTML=s.kid?`<b>قصة المشهد كله (${rng}):</b> ${s.kid}`:'';const sel=$$('kv-scenes');if(sel)sel.value=String(k)}
  }
  else if(k!==VV.scene&&s){VV.scene=k;const pic=$$('kv-scene');
    if(pic){pic.innerHTML=`<div class="kp-sv kp-in">${s.svg}</div>`;const svg=pic.querySelector('svg');if(svg)svg.setAttribute('preserveAspectRatio','xMidYMid slice')}
    const ix=sIdx(s),a1=ay(ix[0]),a2=ay(ix[ix.length-1]),rng=a1.v===a2.v?`الآية ${ARn(a1.v)}`:`الآيات ${ARn(a1.v)}–${ARn(a2.v)}`;
    const top=$$('kv-top');if(top)top.textContent=`صورة المشهد ${ARn(k+1)} من ${ARn(SCENES.length)} · ${rng}`;
    const st=$$('kv-story');if(st)st.innerHTML=s.kid?`<b>قصة المشهد كله (${rng}):</b> ${s.kid}`:'';
    const sel=$$('kv-scenes');if(sel)sel.value=String(k);
  }
  const a=ay(VV.i),ws=wordsOf(VV.i);
  const el=$$('kv-ayah');if(el){el.className='kp-ayah tm-'+VV.tm;el.innerHTML=ws.map((w,j)=>`<span class="kv-w" data-j="${j}">${esc(w)}</span>`).join(' ')}
  const n=$$('kv-num');if(n)n.textContent=`${sName(a.s)} · الآية ${ARn(a.v)}${VV.rep>1?` · المرة ${ARn(VV.r)} من ${ARn(VV.rep)}`:''}`;
  const bar=$$('kv-bar');if(bar)bar.style.width=((VV.i+1)/AYAT.length*100)+'%';
  const cap=$$('kv-cap');if(cap)cap.scrollTop=0;
  vMeaning();
}
// المعنى من التفسير الميسر، وكلمات الآية من مفردات المشهد
const vNorm=t=>String(t).replace(/[\u064B-\u065F\u0670\u06D6-\u06ED\u0640]/g,'').replace(/[أإآٱ]/g,'ا').replace(/ى/g,'ي').replace(/ة/g,'ه');
function vLoadTafsir(su){
  if(VV.tf[su])return VV.tf[su];
  VV.tf[su]=fetch(`muyassar/${su}.json`).then(r=>{if(!r.ok)throw 0;return r.json()}).catch(()=>{VV.tf[su]=null;return null});
  return VV.tf[su];
}
function vMeaning(){
  const box=$$('kv-mean');if(!box)return;const i=VV.i,a=ay(i);
  box.hidden=!VV.mean;
  const s=SCENES[sceneOf[i]],ws=wordsOf(i).map(vNorm);
  const gl=((s&&s.words)||[]).filter(([w])=>{const n=vNorm(w);return ws.some(x=>x===n||x.endsWith(n)||(n.length>3&&x.includes(n)))});
  const glH=gl.length?`<div class="kp-gl">${gl.map(([w,m])=>`<span><i>${esc(w)}</i>${esc(m)}</span>`).join('')}</div>`:'';
  box.innerHTML=`<b>معنى الآية ${ARn(a.v)}:</b> <span id="kv-mtxt">…</span>${glH}`;
  const p=vLoadTafsir(a.s);
  Promise.resolve(p).then(d=>{if(VV.i!==i)return;const t=$$('kv-mtxt');if(!t)return;
    if(!d||!d[a.v-1]){t.textContent='تعذّر تحميل المعنى. تأكدي من الاتصال بالإنترنت.';return}
    // التفسير الميسر يشرح أحيانًا عدة آيات معًا
    let f=a.v,l=a.v;while(f>1&&d[f-2]===d[a.v-1])f--;while(l<d.length&&d[l]===d[a.v-1])l++;
    const h=box.querySelector('b');if(h&&f!==l)h.textContent=`معنى الآيات ${ARn(f)}–${ARn(l)}:`;
    t.textContent=d[a.v-1]});
}
function vTick(){
  cancelAnimationFrame(VV.raf);
  const el=$$('kv-ayah');if(!el){return}
  const d=vau.duration;
  if(isFinite(d)&&d>0){
    const spans=[...el.querySelectorAll('.kv-w')],W=spans.map(s=>vw(s.textContent)),tot=W.reduce((x,y)=>x+y,0);
    // نترك ١٠٪ في البداية والنهاية لأن القارئ يبدأ بعد لحظة ويمد آخر الآية
    const f=Math.max(0,Math.min(1,(vau.currentTime/d-.04)/.9))*tot;
    let acc=0,cur=spans.length-1;for(let j=0;j<W.length;j++){acc+=W[j];if(f<acc){cur=j;break}}
    spans.forEach((s,j)=>{s.classList.toggle('on',j===cur);s.classList.toggle('done',j<cur)});
    const on=spans[cur],cap=$$('kv-cap');
    if(on&&cap&&(on.offsetTop>cap.scrollTop+cap.clientHeight-40||on.offsetTop<cap.scrollTop))cap.scrollTop=on.offsetTop-30;
  }
  if(VV.playing)VV.raf=requestAnimationFrame(vTick);
}
function vPlay(){
  clearTimeout(VV.t);VV.playing=true;vSetBtn();vStatus(`بصوت ${rName(reciter)}`);
  vau.src=urlOf(VV.i);vau.playbackRate=VV.speed;
  const p=vau.play();if(p&&p.catch)p.catch(err=>{if(err&&err.name!=='AbortError'){vStopAll();vStatus('تعذّر تشغيل الصوت. تأكدي من الاتصال بالإنترنت ثم اضغطي «تشغيل».')}});
  vTick();
}
vau.addEventListener('ended',()=>{
  if(!VV.playing)return;
  if(VV.r<VV.rep){VV.r++;vShow(VV.i)}
  else{VV.r=1;if(VV.i>=AYAT.length-1){vStopAll();vStatus('انتهى فيديو السورة. بارك الله فيكِ.');store.set(`kp-vpos-${FILE}`,'0');return}vShow(VV.i+1)}
  const go=()=>{if(VV.playing)vPlay()};
  if(VV.gap){vStatus('ردّدي الآية…');VV.t=setTimeout(go,VV.gap===9?Math.max(1500,(vau.duration||3)*1000/VV.speed):VV.gap*1000)}else VV.t=setTimeout(go,250);
});
vau.addEventListener('error',()=>{if(!VV.playing)return;vStopAll();vStatus('تعذّر تحميل صوت هذه الآية. تأكدي من الاتصال بالإنترنت، أو اختاري قارئًا آخر.')});
let renderVideo=function(){
  stopAudio();if(typeof vStop==='function')vStop();vStopAll();KP.view='video';addBar();
  const cnt=$$('count');if(cnt)cnt.textContent='الفيديو';
  const p=PAGES[cur];let start=+store.get(`kp-vpos-${FILE}`,'0')||0;
  if(typeof p==='number')start=sIdx(SCENES[p])[0];
  VV.scene=-1;VV.r=1;
  const o=(v,t,c)=>`<option value="${v}" ${String(v)===String(c)?'selected':''}>${t}</option>`;
  $$('page').innerHTML=`<div class="kp-vid">
   <div><div class="eyebrow">فيديو السورة</div><h2>${esc(BOOK)}</h2></div>
   <div class="kp-stage" id="kv-stage">
     <div class="kp-pic"><div id="kv-scene"></div><div class="kp-top" id="kv-top"></div><button class="kp-big" id="kv-big" data-kv="play" aria-label="تشغيل">▶</button></div>
     <div class="kp-cap" id="kv-cap"><p class="kp-ayah" id="kv-ayah"></p><span class="kp-num" id="kv-num"></span><div class="kp-mean" id="kv-mean"></div></div>
   </div>
   <div class="kp-prog" id="kv-prog" title="اضغطي للانتقال"><div id="kv-bar"></div></div>
   <div class="kp-vctl">
     <button data-kv="prev" aria-label="الآية السابقة">السابقة</button>
     <button class="main" id="kv-play" data-kv="play">▶ تشغيل</button>
     <button data-kv="next" aria-label="الآية التالية">التالية</button>
     <button data-kv="restart" aria-label="من البداية">↺</button>
     <button data-kv="fs" aria-label="ملء الشاشة">⛶</button>
   </div>
   <p class="status" id="kv-st" aria-live="polite">اضغطي «تشغيل» فتتوالى مشاهد السورة مع التلاوة، وتُضاء كل كلمة عند قراءتها.</p>
   <div class="kp-vset">
     <label>المشهد<select id="kv-scenes">${SCENES.map((s,k)=>o(k,`${ARn(k+1)}. ${s.title.replace(/<[^>]+>/g,'')}`,-1)).join('')}</select></label>
     <label>القارئ<select id="kv-rec">${reciterOptions()}</select></label>
     <label>نص الآية<select id="kv-tm">${o('show','ظاهر',VV.tm)}${o('reveal','يظهر مع التلاوة',VV.tm)}${o('hide','مخفي: اختبري حفظك',VV.tm)}</select></label>
     <label>معنى الآية<select id="kv-mean-s">${o(1,'يظهر (التفسير الميسر)',VV.mean?1:0)}${o(0,'مخفي',VV.mean?1:0)}</select></label>
     <label>تكرار كل آية<select id="kv-rep">${[1,2,3,5].map(n=>o(n,ARn(n)+' ×',VV.rep)).join('')}</select></label>
     <label>مهلة للترديد<select id="kv-gap">${o(0,'بلا مهلة',VV.gap)}${o(3,'٣ ثوانٍ',VV.gap)}${o(6,'٦ ثوانٍ',VV.gap)}${o(9,'بطول الآية',VV.gap)}</select></label>
     <label>السرعة<select id="kv-speed">${[.75,1,1.25].map(n=>o(n,n===1?'عادية':(n<1?'أبطأ':'أسرع'),VV.speed)).join('')}</select></label>
   </div>
   <p class="kp-story" id="kv-story"></p>
  </div>`;
  vShow(start);window.scrollTo({top:0,behavior:'smooth'});
  const loadAnims=()=>[...new Set(AYAT.map((x,i)=>ay(i).s))].forEach(su=>{
    if(window.AYAH_ANIM&&AYAH_ANIM[su])return;const id='kp-anim-'+su;if(document.getElementById(id))return;
    const sc=document.createElement('script');sc.id=id;sc.src=`anim/${su}.js?v=${ANIM_V}`;sc.onload=()=>{if(KP.view==='video'&&ay(VV.i).s===su)vShow(VV.i)};sc.onerror=()=>sc.remove();document.head.appendChild(sc);
  });
  if(window.AAL)loadAnims();
  else if(!document.getElementById('kp-anim-lib')){const lb=document.createElement('script');lb.id='kp-anim-lib';lb.src=`anim/lib.js?v=${ANIM_V}`;lb.onload=loadAnims;lb.onerror=loadAnims;document.head.appendChild(lb)}
};
document.addEventListener('click',e=>{
  const t=e.target.closest('[data-kv],[data-kp="video"],#kv-prog');if(!t)return;
  if(t.dataset.kp==='video'){renderVideo();return}
  if(t.id==='kv-prog'){const r=t.getBoundingClientRect();let f=(e.clientX-r.left)/r.width;if(getComputedStyle(t).direction==='rtl')f=1-f;const was=VV.playing;vStopAll();VV.r=1;vShow(Math.floor(f*AYAT.length));if(was)vPlay();return}
  const k=t.dataset.kv;
  if(k==='play'){if(VV.playing){vStopAll();vStatus('متوقف. اضغطي «تشغيل» لتكملي.')}else vPlay();return}
  if(k==='next'||k==='prev'||k==='restart'){const was=VV.playing;vStopAll();VV.r=1;vShow(k==='restart'?0:VV.i+(k==='next'?1:-1));if(was)vPlay();return}
  if(k==='fs'){const s=$$('kv-stage');if(!s)return;
    if(document.fullscreenElement||document.webkitFullscreenElement){(document.exitFullscreen||document.webkitExitFullscreen).call(document)}
    else{const f=s.requestFullscreen||s.webkitRequestFullscreen;if(f){try{const r=f.call(s);if(r&&r.catch)r.catch(()=>vStatus('ملء الشاشة غير متاح هنا.'))}catch(err){vStatus('ملء الشاشة غير متاح هنا.')}}else vStatus('ملء الشاشة غير متاح في هذا المتصفح.')}
    return}
});
document.addEventListener('change',e=>{
  const id=e.target.id,v=e.target.value;if(!id||id.indexOf('kv-')!==0)return;
  if(id==='kv-scenes'){const was=VV.playing;vStopAll();VV.r=1;vShow(sIdx(SCENES[+v])[0]);if(was)vPlay();return}
  if(id==='kv-rec'){reciter=v;store.set('hadid-reciter',v);if(VV.playing)vPlay();return}
  if(id==='kv-tm'){VV.tm=v;store.set('kp-vtm',v);const el=$$('kv-ayah');if(el)el.className='kp-ayah tm-'+v;return}
  if(id==='kv-mean-s'){VV.mean=v==='1';store.set('kp-vmean',VV.mean?'1':'0');vMeaning();return}
  if(id==='kv-rep'){VV.rep=+v;VV.r=1;store.set('kp-vrep',v);return}
  if(id==='kv-gap'){VV.gap=+v;store.set('kp-vgap',v);return}
  if(id==='kv-speed'){VV.speed=+v;store.set('kp-vspeed',v);vau.playbackRate=VV.speed;return}
});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&VV.playing){vStopAll();vStatus('توقف الفيديو لأن الصفحة أُغلقت. اضغطي «تشغيل» لتكملي.')}});

const startHash=location.hash;
const _rm=renderMap;
renderMap=function(){vStopAll();_rm();try{history.replaceState(null,'','#map')}catch(e){}};
const _rv=renderVideo;
renderVideo=function(){_rv();try{history.replaceState(null,'','#video')}catch(e){}};
const _r2=render;
render=function(){vStopAll();if(location.hash==='#map'||location.hash==='#video'){try{history.replaceState(null,'',location.pathname+location.search)}catch(e){}}_r2()};
window.addEventListener('hashchange',()=>{if(location.hash==='#map'&&KP.view!=='map')renderMap();else if(location.hash==='#video'&&KP.view!=='video')renderVideo()});
render();
if(startHash==='#map')renderMap();else if(startHash==='#video')renderVideo();
})();
