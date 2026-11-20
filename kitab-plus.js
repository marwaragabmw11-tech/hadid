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
  bar.innerHTML=`<button data-kp="map" aria-pressed="${KP.view==='map'}">🗺 خريطة القصة</button><a href="tajweed.html">📘 تعلّمي التجويد</a><a href="index.html">📚 المكتبة</a>`;
}
function enhanceCover(){
  const c=document.querySelector('#page .cover');if(!c||c.querySelector('.kp-new'))return;
  const d=document.createElement('div');d.className='kp-new';
  d.innerHTML=`<h3>جديد في هذا الكتاب</h3>
  <ul><li><b>خريطة القصة</b>: كل مشاهد السورة في طريق واحد بالصور، مع بدايات الآيات، لتحفظي الترتيب كأنه قصة.</li>
  <li><b>ألوان التجويد</b> في الآيات، ومراجعة للتجويد أثناء «سمّعي بصوتك» مع تسجيل صوتك ومقارنته بالقارئ.</li>
  <li><b>تكرار الآية</b>: آية واحدة، أو كل آية وحدها، أو المشهد كاملًا، أو تكرار تراكمي، مع مهلة لترديدك.</li>
  <li><b>قراء أكثر</b>: الشيخ محمود علي البنا ضمن القراء الخمسة، وقائمة بقراء آخرين من الإنترنت.</li></ul>
  <div class="toc"><button data-kp="map">خريطة القصة<span>السورة كلها في صفحة واحدة</span></button><a class="kp-toc" href="tajweed.html">تعلّمي التجويد<span>دروس قصيرة وتدريب</span></a></div>
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
   <p class="note">التعرّف على الصوت في المتصفح يفهم الكلمات فقط، ولا يقيس المدود والغنّة. لذلك: انظري إلى الأحكام قبل أن تبدئي، وسيظهر لكِ هنا الحكم عند كل كلمة صحيحة فيها حكم، ثم قيّمي نفسك وسجّلي تلاوتك وقارنيها بالقارئ.</p>
   <p class="kp-live" id="kp-live" aria-live="polite"></p>
   <details class="kp-more" id="kp-rules"><summary>أحكام التجويد في هذا المشهد (${ARn(R.length)}) — قيّمي نفسك</summary><ul class="kp-check">${R.map(({r,list})=>`<li><div><span class="tj-${TJ.RULES[r].c||'x'}"><span class="kp-dot"></span></span> <b>${TJ.RULES[r].n}</b> <span class="note">(${ARn(list.length)})</span></div>
     <div class="ex">${[...new Set(list.map(x=>x.w))].slice(0,6).map(esc).join(' · ')}</div>
     <div class="how">${TJ.RULES[r].how} <a href="tajweed.html#${TJ.RULES[r].lesson}">الدرس</a></div>
     <div class="kp-self" data-key="${r}"><button data-kp-self="${r}" data-v="1" aria-pressed="${self[r]===1}">✓ طبّقتُه</button><button data-kp-self="${r}" data-v="0" aria-pressed="${self[r]===0}">أحتاج تدريبًا</button></div></li>`).join('')}</ul></details>
   <p class="note" id="kp-selfsum"></p>
   <div class="kp-row"><label for="kp-rec-a">سجّلي آية وقارنيها:</label>
     <select id="kp-rec-a">${idx.map(i=>`<option value="${i}">الآية ${ARn(ay(i).v)}</option>`).join('')}</select>
     <button class="btn solid" data-kp="rec">🎙 سجّلي</button><button class="btn" data-kp="recplay" ${KP.recUrl?'':'disabled'}>▶ تلاوتي</button><button class="btn" data-kp="refplay">▶ القارئ</button></div>
   <p class="status" id="kp-rec-st">اختاري آية، ثم «سجّلي» واقرئيها، ثم «إيقاف». استمعي لتلاوتك ثم للقارئ، وانتبهي للمدود والغنّة.</p>`;
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
      btn.textContent='🎙 سجّلي من جديد';const pb=document.querySelector('[data-kp="recplay"]');if(pb)pb.disabled=false;
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
  if(t.dataset.kpR){reciter=t.dataset.kpR;store.set('hadid-reciter',reciter);const s=$$('reciter');if(s)s.value=reciter;fillRList(($$('kp-q')||{}).value);
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
  if(k==='recplay'){if(KP.recUrl){refA.pause();stopAudio();myA.src=KP.recUrl;myA.play()}return}
  if(k==='refplay'){const i=+(($$('kp-rec-a')||{}).value);if(isNaN(i))return;myA.pause();stopAudio();refA.src=urlOf(i);refA.play().catch(()=>{const s=$$('kp-rec-st');if(s)s.textContent='تعذّر تشغيل صوت القارئ. تأكدي من الاتصال بالإنترنت.'});return}
});
document.addEventListener('change',e=>{
  const id=e.target.id;
  if(id==='kp-rmode'){KP.rmode=e.target.value;store.set('kp-rmode',KP.rmode);stopAudio();const p=PAGES[cur];render();return}
  if(id==='kp-n'){KP.n=+e.target.value;store.set('kp-n',String(KP.n));return}
  if(id==='kp-gap'){KP.gap=e.target.value;store.set('kp-gap',KP.gap);return}
  if(id==='kp-one'){KP.one=+e.target.value;return}
  if(id==='reciter'){fillRList(($$('kp-q')||{}).value);return}
});
document.addEventListener('input',e=>{if(e.target.id==='kp-q')fillRList(e.target.value)});
// تشغيل زر «استمعي» في وضع «آية واحدة» يشغّل الآية المختارة
document.addEventListener('click',e=>{const t=e.target.closest('#playbtn[data-play]');if(t&&KP.rmode==='one'){e.stopImmediatePropagation();const s=SCENES[PAGES[cur]];playList([KP.one!=null&&sIdx(s).includes(KP.one)?KP.one:sIdx(s)[0]])}},true);

const startMap=location.hash==='#map';
const _rm=renderMap;
renderMap=function(){_rm();try{history.replaceState(null,'','#map')}catch(e){}};
const _r2=render;
render=function(){if(location.hash==='#map'){try{history.replaceState(null,'',location.pathname+location.search)}catch(e){}}_r2()};
window.addEventListener('hashchange',()=>{if(location.hash==='#map'&&KP.view!=='map')renderMap()});
render();
if(startMap)renderMap();
})();
