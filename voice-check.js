/* مكتبة الحفظ المصوّرة — مقارنة التلاوة بالقارئ + فحص تجريبي للتجويد
   1) compare(): مخطط صوتك تحت مخطط القارئ على مقياس زمني واحد. يعمل بلا إنترنت بعد تنزيل صوت القارئ. لا يحكم.
   2) check(): فحص تجريبي بنموذج HisnLabs/tajweed-v2 (رخصة Apache-2.0) يعمل داخل المتصفح بعد تنزيله مرة واحدة،
      ومحرّك قواعد منقول من imam.py في المشروع نفسه. النتائج للاسترشاد فقط ولا تُغني عن المعلّم. */
(function(){
'use strict';
const ORT_V='1.20.1';
const ORT_BASE=`https://cdn.jsdelivr.net/npm/onnxruntime-web@${ORT_V}/dist/`;
const MODEL_URL='https://huggingface.co/HisnLabs/tajweed-v2/resolve/main/onnx/model-int8.onnx';
const MODEL_CACHE='hadid-model';
const PHONEMES=['ء','ب','ت','ث','ج','ح','خ','د','ذ','ر','ز','س','ش','ص','ض','ط','ظ','ع','غ','ف','ق','ك','ل','م','ن','ه','و','ي','ا','ۦ','ۥ','َ','ُ','ِ','۪','ـ','ٲ','ڇ','ں','۾','ۜ','ؙ'];
const SR=16000,N_FFT=400,HOP=160,N_MEL=80,LEAD=Math.round(SR*.4);
const ARn=n=>String(n).replace(/\d/g,d=>'٠١٢٣٤٥٦٧٨٩'[d]);
const sec=x=>ARn((Math.round(x*10)/10).toFixed(1))+' ث';

/* ---------- الصوت ---------- */
async function toMono16k(src){
  const buf=src instanceof ArrayBuffer?src:await (await fetch(src)).arrayBuffer();
  const AC=window.AudioContext||window.webkitAudioContext;const ac=new AC();
  let dec;try{dec=await new Promise((ok,no)=>{const p=ac.decodeAudioData(buf.slice(0),ok,no);if(p&&p.then)p.then(ok,no)})}finally{try{ac.close()}catch(e){}}
  const len=Math.max(1,Math.ceil(dec.duration*SR));
  const oc=new OfflineAudioContext(1,len,SR);const s=oc.createBufferSource();s.buffer=dec;s.connect(oc.destination);s.start();
  const r=await oc.startRendering();return r.getChannelData(0).slice();
}
function trim(x){ // يقص الصمت في الطرفين (عتبة نسبية)
  const F=320,n=Math.floor(x.length/F);if(n<3)return {x,off:0};
  const e=new Float32Array(n);let mx=0;for(let i=0;i<n;i++){let s=0;for(let k=i*F;k<(i+1)*F;k++)s+=x[k]*x[k];e[i]=Math.sqrt(s/F);if(e[i]>mx)mx=e[i]}
  const th=Math.max(mx*.06,.003);let a=0,b=n-1;while(a<n&&e[a]<th)a++;while(b>a&&e[b]<th)b--;
  a=Math.max(0,a-3);b=Math.min(n-1,b+3);return {x:x.subarray(a*F,(b+1)*F),off:a*F/SR};
}

/* ---------- Whisper log-mel (80) مطابق لـ faster-whisper FeatureExtractor(padding=0) ---------- */
let MELF=null,COS=null,SIN=null,WIN=null;
function melFilters(){
  const nb=N_FFT/2+1,fft=new Float64Array(nb);for(let i=0;i<nb;i++)fft[i]=i*SR/N_FFT;
  const mels=new Float64Array(N_MEL+2),maxMel=45.245640471924965;for(let i=0;i<N_MEL+2;i++)mels[i]=maxMel*i/(N_MEL+1);
  const fsp=200/3,minLogHz=1000,minLogMel=minLogHz/fsp,logstep=Math.log(6.4)/27;
  const f=mels.map(m=>m>=minLogMel?minLogHz*Math.exp(logstep*(m-minLogMel)):fsp*m);
  const W=[];for(let m=0;m<N_MEL;m++){const row=new Float64Array(nb),en=2/(f[m+2]-f[m]);
    for(let k=0;k<nb;k++){const lo=(fft[k]-f[m])/(f[m+1]-f[m]),up=(f[m+2]-fft[k])/(f[m+2]-f[m+1]);row[k]=Math.max(0,Math.min(lo,up))*en}W.push(row)}
  return W;
}
function logMel(x){
  if(!MELF){MELF=melFilters();const nb=N_FFT/2+1;COS=new Float64Array(nb*N_FFT);SIN=new Float64Array(nb*N_FFT);
    for(let k=0;k<nb;k++)for(let t=0;t<N_FFT;t++){const a=2*Math.PI*k*t/N_FFT;COS[k*N_FFT+t]=Math.cos(a);SIN[k*N_FFT+t]=Math.sin(a)}
    WIN=new Float64Array(N_FFT);for(let i=0;i<N_FFT;i++)WIN[i]=.5-.5*Math.cos(2*Math.PI*i/N_FFT)}
  const P=N_FFT/2,L=x.length,padded=new Float64Array(L+2*P);
  for(let i=0;i<L;i++)padded[i+P]=x[i];
  for(let i=1;i<=P;i++){padded[P-i]=x[Math.min(i,L-1)];padded[P+L-1+i]=x[Math.max(0,L-1-i)]}
  const nF=Math.floor(L/HOP),nb=N_FFT/2+1,out=new Float32Array(N_MEL*nF),fr=new Float64Array(N_FFT),pw=new Float64Array(nb);let mx=-Infinity;
  for(let t=0;t<nF;t++){const o=t*HOP;for(let i=0;i<N_FFT;i++)fr[i]=padded[o+i]*WIN[i];
    for(let k=0;k<nb;k++){let re=0,im=0;const b=k*N_FFT;for(let i=0;i<N_FFT;i++){re+=fr[i]*COS[b+i];im-=fr[i]*SIN[b+i]}pw[k]=re*re+im*im}
    for(let m=0;m<N_MEL;m++){const row=MELF[m];let s=0;for(let k=0;k<nb;k++)s+=row[k]*pw[k];const v=Math.log10(Math.max(s,1e-10));out[m*nF+t]=v;if(v>mx)mx=v}}
  for(let i=0;i<out.length;i++)out[i]=(Math.max(out[i],mx-8)+4)/4;
  return {mel:out,frames:nF};
}

/* ---------- 1) المقارنة المرئية ---------- */
function envelope(x){ // طاقة كل ١٠ مللي ثانية (dB منسوبة إلى أعلى قيمة)
  const F=160,n=Math.floor(x.length/F),e=new Float32Array(n);let mx=1e-9;
  for(let i=0;i<n;i++){let s=0;for(let k=i*F;k<(i+1)*F;k++)s+=x[k]*x[k];e[i]=Math.sqrt(s/F);if(e[i]>mx)mx=e[i]}
  for(let i=0;i<n;i++)e[i]=Math.max(0,1+Math.log10(e[i]/mx+1e-6)/2.5); // 0..1 على مدى ٥٠ dB
  return e;
}
function segments(e){ // مقاطع الصوت المتصل، ومنها الأصوات الممدودة (ثبات الطاقة مدة طويلة)
  const on=.42,segs=[];let a=-1;
  for(let i=0;i<=e.length;i++){const v=i<e.length&&e[i]>on;if(v&&a<0)a=i;if(!v&&a>=0){if(i-a>=4)segs.push([a,i]);a=-1}}
  const held=[];
  for(const [a,b] of segs){let s=a;for(let i=a+1;i<=b;i++){const brk=i===b||Math.abs(e[i]-e[i-1])>.07;if(brk){if(i-s>=30)held.push([s,i]);s=i}}}
  return {segs,held};
}
function drawPair(cv,A,B){
  const dpr=window.devicePixelRatio||1,W=cv.clientWidth||600,H=180;cv.width=W*dpr;cv.height=H*dpr;
  const g=cv.getContext('2d');g.scale(dpr,dpr);g.clearRect(0,0,W,H);
  const T=Math.max(A.e.length,B.e.length)/100,pad=8,w=W-2*pad,px=t=>W-pad-t/T*w; // من اليمين إلى اليسار
  const css=getComputedStyle(document.documentElement);
  const c1=css.getPropertyValue('--teal').trim()||'#1B4A48',c2=css.getPropertyValue('--gold').trim()||'#B8860B';
  const lane=(o,env,col,lab,held)=>{const h=70,y0=o+h;
    g.fillStyle='rgba(127,127,127,.08)';g.fillRect(pad,o,w,h);
    g.fillStyle='rgba(184,134,11,.22)';held.forEach(([a,b])=>g.fillRect(px(b/100),o,px(a/100)-px(b/100),h));
    g.beginPath();g.moveTo(px(0),y0);for(let i=0;i<env.length;i++)g.lineTo(px(i/100),y0-env[i]*(h-6));g.lineTo(px(env.length/100),y0);g.closePath();
    g.fillStyle=col;g.globalAlpha=.75;g.fill();g.globalAlpha=1;
    g.font='600 12px system-ui,sans-serif';const tw=g.measureText(lab).width+10;g.fillStyle='rgba(255,255,255,.85)';g.fillRect(W-pad-tw,o+2,tw,16);g.fillStyle='#333';g.textAlign='right';g.fillText(lab,W-pad-5,o+14)};
  lane(6,A.e,c1,'القارئ',A.held);lane(98,B.e,c2,'صوتك',B.held);
  g.strokeStyle='rgba(127,127,127,.35)';g.lineWidth=1;g.fillStyle='#777';g.font='10px system-ui,sans-serif';g.textAlign='center';
  for(let t=0;t<=T;t+=T>20?5:T>8?2:1){const x=px(t);g.beginPath();g.moveTo(x,76);g.lineTo(x,98);g.stroke();g.fillText(ARn(t),x,90)}
}
async function compare(recSrc,refSrc,box,onStatus){
  const st=onStatus||(()=>{});st('جارٍ تحليل الصوتين…');
  const [r0,m0]=await Promise.all([toMono16k(refSrc),toMono16k(recSrc)]);
  const R=trim(r0).x,M=trim(m0).x;const A={e:envelope(R)},B={e:envelope(M)};
  Object.assign(A,segments(A.e));Object.assign(B,segments(B.e));
  const dA=R.length/SR,dB=M.length/SR,ratio=dB/dA;
  const hA=A.held.map(([a,b])=>(b-a)/100),hB=B.held.map(([a,b])=>(b-a)/100);
  const tempo=ratio>1.35?'تلاوتك أبطأ بكثير من القارئ':ratio>1.12?'تلاوتك أبطأ قليلًا من القارئ':ratio<.75?'تلاوتك أسرع بكثير من القارئ — تمهّلي، فالسرعة تُضيِّع المدود والغنّة':ratio<.9?'تلاوتك أسرع قليلًا من القارئ':'سرعتك قريبة من سرعة القارئ';
  box.innerHTML=`<canvas class="vc-cv" style="width:100%;height:180px;display:block"></canvas>
   <ul class="vc-facts">
    <li>المدة: القارئ ${sec(dA)} — أنتِ ${sec(dB)}. ${tempo}.</li>
    <li>مقاطع الصوت المتصل (بين الوقفات): القارئ ${ARn(A.segs.length)} — أنتِ ${ARn(B.segs.length)}.${Math.abs(A.segs.length-B.segs.length)>2?' العدد مختلف كثيرًا: ربما وقفتِ في غير موضع الوقف، أو وصلتِ ما يقف عنده القارئ.':''}</li>
    <li>الأصوات الممدودة الثابتة (المظلّلة): القارئ ${ARn(hA.length)}${hA.length?` (أطولها ${sec(Math.max(...hA))})`:''} — أنتِ ${ARn(hB.length)}${hB.length?` (أطولها ${sec(Math.max(...hB))})`:''}.</li>
   </ul>
   <p class="note">المخطط يرسم ارتفاع الصوت مع الزمن من اليمين إلى اليسار. المناطق المظلّلة صوت ثابت طويل، وأكثره مدّ أو غنّة. قارني مواضعها وطولها بين الصفّين، ثم استمعي للموضع المختلف. هذا رسم مساعد، لا يحكم على التلاوة.</p>`;
  drawPair(box.querySelector('canvas'),A,B);st('');
  return {dA,dB,ratio};
}

/* ---------- 2) الفحص التجريبي ---------- */
let ORT=null,SESS=null;
function loadScript(src){return new Promise((ok,no)=>{const s=document.createElement('script');s.src=src;s.onload=ok;s.onerror=()=>no(new Error('script '+src));document.head.appendChild(s)})}
async function modelBytes(onP){
  let c=null;try{c=await caches.open(MODEL_CACHE)}catch(e){}
  if(c){const hit=await c.match(MODEL_URL);if(hit)return new Uint8Array(await hit.arrayBuffer())}
  const res=await fetch(MODEL_URL,{mode:'cors'});if(!res.ok)throw new Error('model '+res.status);
  const total=+res.headers.get('content-length')||23e6;const rd=res.body.getReader(),parts=[];let got=0;
  for(;;){const {done,value}=await rd.read();if(done)break;parts.push(value);got+=value.length;onP&&onP(got/total)}
  const all=new Uint8Array(got);let o=0;for(const p of parts){all.set(p,o);o+=p.length}
  if(c)try{await c.put(MODEL_URL,new Response(all,{headers:{'content-type':'application/octet-stream'}}))}catch(e){}
  return all;
}
async function isReady(){try{const c=await caches.open(MODEL_CACHE);return !!(await c.match(MODEL_URL))}catch(e){return false}}
async function session(onP){
  if(SESS)return SESS;
  if(!window.ort)await loadScript(ORT_BASE+'ort.wasm.min.js');
  ORT=window.ort;ORT.env.wasm.wasmPaths=ORT_BASE;ORT.env.wasm.numThreads=1;
  const bytes=await modelBytes(onP);
  SESS=await ORT.InferenceSession.create(bytes,{executionProviders:['wasm']});
  return SESS;
}
async function hear(x){ // x: Float32 16 kHz
  const a=new Float32Array(x.length+2*LEAD);a.set(x,LEAD);
  let {mel,frames}=logMel(a);const use=Math.min(3000,frames>>1<<1);
  const m=new Float32Array(N_MEL*use);for(let k=0;k<N_MEL;k++)m.set(mel.subarray(k*frames,k*frames+use),k*use);
  const s=SESS,feeds={};feeds[s.inputNames[0]]=new ORT.Tensor('float32',m,[1,N_MEL,use]);
  if(s.inputNames[1])feeds[s.inputNames[1]]=new ORT.Tensor('int64',BigInt64Array.from([0n]),[1]);
  const o=(await s.run(feeds))[s.outputNames[0]];const [,T,V]=o.dims,lp=o.data;
  const step=a.length/SR/T;let out='',probs=[],times=[],prev=0,last=-1;
  for(let t=0;t<T;t++){let bi=0,bv=-Infinity;for(let v=0;v<V;v++){const q=lp[t*V+v];if(q>bv){bv=q;bi=v}}
    if(bi!==prev&&bi!==0){out+=PHONEMES[bi-1];probs.push(Math.exp(bv));times.push((t+.5)*step-LEAD/SR)}
    if(bi!==0)last=t;prev=bi}
  times.push(last>=0?(last+1)*step-LEAD/SR:0);
  return {heard:out,probs,times,cut:frames>3000};
}

/* imam.py (HisnLabs/tajweed) — منقول إلى JavaScript: listen() بالعربية فقط */
const LONG='اۥۦ',HARAKAT='َُِ',ONSET=3,TIME_SIX=8.3,TIME_FIVE=7.0;
const MADD={NormalMaddRule:'المد الطبيعي',MonfaselMaddRule:'المد المنفصل',MottaselMaddRule:'المد المتصل',LazemMaddRule:'المد اللازم',AaredMaddRule:'المد العارض للسكون',LeenMaddRule:'مد اللين'};
const CW={2:'حركتان',3:'ثلاث حركات',4:'أربع حركات',5:'خمس حركات',6:'ست حركات'};
const counts=n=>n?(CW[n]||`${ARn(n)} حركات`):'بلا مد';
const VN={'َ':'فتحة','ُ':'ضمة','ِ':'كسرة'};
function lev(a,b){const n=a.length,m=b.length,W=m+1,D=new Int32Array((n+1)*W);
  for(let i=0;i<=n;i++)D[i*W]=i;for(let j=0;j<=m;j++)D[j]=j;
  for(let i=1;i<=n;i++){const ai=a[i-1];for(let j=1;j<=m;j++){const x=D[(i-1)*W+j]+1,y=D[i*W+j-1]+1,z=D[(i-1)*W+j-1]+(ai!==b[j-1]?1:0);D[i*W+j]=x<y?(x<z?x:z):(y<z?y:z)}}
  return {D,W};}
function opcodes(a,b){const {D,W}=lev(a,b);let i=a.length,j=b.length;const ops=[];
  while(i>0||j>0){
    if(i>0&&j>0&&a[i-1]===b[j-1]&&D[i*W+j]===D[(i-1)*W+j-1]){ops.push(['equal',i-1,j-1]);i--;j--}
    else if(i>0&&j>0&&D[i*W+j]===D[(i-1)*W+j-1]+1){ops.push(['replace',i-1,j-1]);i--;j--}
    else if(i>0&&D[i*W+j]===D[(i-1)*W+j]+1){ops.push(['delete',i-1,j]);i--}
    else{ops.push(['insert',i,j-1]);j--}}
  ops.reverse();const out=[];
  for(const [t,x,y] of ops){const dx=t==='insert'?0:1,dy=t==='delete'?0:1,o=out[out.length-1];
    if(o&&o[0]===t&&o[2]===x&&o[4]===y){o[2]=x+dx;o[4]=y+dy}else out.push([t,x,x+dx,y,y+dy])}
  return out;}
function boundaries(ref,heard){const b=new Array(ref.length+1).fill(0);
  for(const [,i1,i2,j1,j2] of opcodes(ref,heard))for(let k=i1;k<=i2;k++)b[k]=j1+(i2>i1?pyRound((k-i1)*(j2-j1)/(i2-i1)):0);
  b[ref.length]=heard.length;return b;}
const pyRound=x=>{const f=Math.floor(x),d=x-f;return d>.5?f+1:d<.5?f:(f%2===0?f:f+1)};
function run(h,a,b,c){let k=-1;for(let x=a;x<b;x++)if(h[x]===c){k=x;break}if(k<0)return [0,a,a];
  let s=k,e=k;while(s>0&&h[s-1]===c)s--;while(e<h.length&&h[e]===c)e++;return [e-s,s,e];}
function dur(h,T,s,e){const a=s&&HARAKAT.includes(h[s-1])?T[s-1]:T[s];return Math.max(0,T[Math.min(e,T.length-1)]-a)}
function stripLen(s){let o='';for(const c of s){if(o&&o[o.length-1]===c)continue;o+=c}return [...o].filter(c=>!LONG.includes(c)&&!'ںڇ۾'.includes(c)).join('')}
function tempoOf(ref,h,b,T){if(!T||T.length!==h.length+1)return null;const last=ref.words.length-1,nat=[];
  for(const u of ref.units)if(u.kind==='madd'&&u.rule==='NormalMaddRule'&&u.word!==last){const [n,s,e]=run(h,Math.max(0,b[u.s]-1),Math.min(h.length,b[u.e]+1),u.char);if(n>=1&&n<=3)nat.push(dur(h,T,s,e))}
  const src=nat.filter(d=>d>.08&&d<2).sort((x,y)=>x-y);if(src.length<2)return null;return src[src.length>>1]/2;}
function listen(ref,heard,probs,times,minProb=.3,minJali=.7){
  const ph=ref.phonemes,h=heard.replace(/ /g,''),b=boundaries(ph,h),notes=ref.words.map(()=>[]),covered=new Array(ph.length).fill(false);
  let span=[0,0];
  const unsure=(hs,he,thr)=>{if(!probs||!probs.length)return false;const seg=probs.slice(Math.max(0,hs-1),Math.min(probs.length,he+1));return seg.length>0&&Math.min(...seg)<(thr==null?minProb:thr)};
  const add=(w,rule,sev,msg)=>{if(unsure(span[0],span[1]))return;notes[w].push({rule,sev,msg})};
  const moreNun=(u,hs,he)=>{const cnt=s=>[...s].filter(c=>c==='ن').length;return cnt(h.slice(Math.max(0,hs-2),he))>cnt(ph.slice(Math.max(0,u.s-2),u.e))};
  const seen={},maddHeard=ref.words.map(()=>[]),unit=tempoOf(ref,h,b,times);
  for(const u of ref.units){for(let x=u.s;x<u.e;x++)covered[x]=true;const hs=b[u.s],he=b[u.e];span=[hs,he];
    if(u.kind==='madd'){let [n,rs,re]=run(h,Math.max(0,hs-1),Math.min(h.length,he+1),u.char);
      if(u.rule==='LeenMaddRule'&&n>0)n+=1;
      const sym=n;let shown=n?(n<=3?2:n<=5?4:6):0;
      if(unit&&(n===4||n===5)){const tc=dur(h,times,rs,re)/unit;n=tc>=TIME_SIX?6:tc>=TIME_FIVE?5:4;shown=tc>=TIME_SIX?6:4}
      const al=u.allowed,near=al.reduce((p,a)=>Math.abs(a-n)<Math.abs(p-n)?a:p,al[0]),name=MADD[u.rule]||'المد';
      (seen[u.rule]=seen[u.rule]||[]).push([u.word,sym]);
      if(shown&&u.rule!=='NormalMaddRule')maddHeard[u.word].push({name,heard:shown});
      if(n===0&&u.rule!=='LeenMaddRule')add(u.word,u.rule,'jali',`${name}: المد محذوف`);
      else if(Math.abs(n-near)>1&&!unsure(hs,he))notes[u.word].push({rule:u.rule,sev:'khafi',msg:`${name}: ${counts(n)} بدل ${counts(al.includes(u.golden)?u.golden:near)}`});
    }else if(u.kind==='qalqalah'){if(!h.slice(Math.max(0,hs-1),he+1).includes('ڇ'))add(u.word,'qalqalah','khafi',`القلقلة غير ظاهرة على ${u.s?ph[u.s-1]:''}`)}
    else if(u.kind==='ikhfa'){const [n]=run(h,hs,Math.max(he,hs+1),'ں');
      if(n===0&&h.slice(hs,he+1).includes('ن'))add(u.word,'ikhfa','khafi','إخفاء: أظهرتِ النون، والصواب إخفاؤها مع الغنة');
      else if(n&&n<u.golden-1)add(u.word,'ikhfa','khafi','إخفاء: الغنة قصيرة')}
    else if(u.kind==='iqlab'){if(!h.slice(Math.max(0,hs-1),he+1).includes('۾'))add(u.word,'iqlab','khafi','إقلاب: تُقلب النون ميمًا مخفاة مع الغنة')}
    else if(u.kind==='ghunnah'||u.kind==='idgham_ghunnah'){const [n]=run(h,Math.max(0,hs-1),Math.min(h.length,he+1),u.char);
      if(u.kind==='idgham_ghunnah'&&u.char!=='ن'&&moreNun(u,hs,he))add(u.word,'idgham','khafi',`إدغام: أظهرتِ النون، والصواب إدغامها في ${u.char}`);
      else if(n<u.golden)add(u.word,u.kind,'khafi',u.kind==='ghunnah'?'الغنة ناقصة: أطيلي الغنة حركتين':'إدغام بغنة: الغنة ناقصة')}
    else if(u.kind==='shadda'||u.kind==='idgham'){const [n]=run(h,Math.max(0,hs-1),Math.min(h.length,he+1),u.char);
      if(u.kind==='idgham'&&moreNun(u,hs,he))add(u.word,'idgham','khafi',`إدغام: أظهرتِ النون، والصواب إدغامها في ${u.char}`);
      else if(n===1)add(u.word,'shadda','jali',`الشدة على ${u.char} غير ظاهرة`)}}
  const okSet=new Set([...LONG,'ڇ','ں','۾','ن','م']);
  for(const [tag,i1,i2,j1,j2] of opcodes(ph,h)){if(tag==='equal')continue;
    const exp=ph.slice(i1,i2),got=h.slice(j1,j2);
    if(i2>i1&&covered.slice(i1,i2).every(Boolean)&&(!got||[...got].every(c=>exp.includes(c)||okSet.has(c))))continue;
    if(tag==='insert'&&ref.units.some(u=>u.kind==='madd'&&u.s<=i1&&i1<=u.e&&[...got].every(c=>c===u.char)))continue;
    let w=ref.spans.findIndex(([a,z])=>a<=i1&&i1<z);if(w<0)w=ref.words.length-1;span=[j1,j2];
    if(i1<ONSET)continue;
    const ec=stripLen(exp),gc=stripLen(got);if(ec===gc)continue;if(unsure(j1,j2,minJali))continue;
    if(tag==='replace'&&ec.length===1&&gc.length===1&&HARAKAT.includes(ec)&&HARAKAT.includes(gc))notes[w].push({rule:'vowel',sev:'jali',msg:`الحركة: ${VN[gc]} بدل ${VN[ec]}`});
    else if(tag==='replace')add(w,'letter','jali',`نطقتِ «${got}» بدل «${exp}»`);
    else if(tag==='delete'){if([...exp].every(c=>LONG.includes(c)||HARAKAT.includes(c))&&exp.length===1)continue;add(w,'dropped','jali',`سقط صوت: «${exp}»`)}
    else if(tag==='insert'){if(i1===0||i1===ph.length)continue;
      if([...got].every(c=>LONG.includes(c))){if(got.length>=2)add(w,'madd_added','khafi','مد زائد في غير موضعه');continue}
      if(got.length===1&&HARAKAT.includes(got))continue;add(w,'added','jali',`زيادة: «${got}»`)}}
  ref.spans.forEach(([a,z],k)=>{if(z>a&&b[z]-b[a]<=Math.max(0,Math.floor((z-a)/4)))notes[k]=[{rule:'word',sev:'jali',msg:'لم تُسمع هذه الكلمة'}]});
  for(const rule of ['MonfaselMaddRule','MottaselMaddRule','AaredMaddRule']){const s=seen[rule];if(!s||s.length<2)continue;
    const lens=s.map(x=>x[1]).filter(Boolean);if(lens.length&&Math.max(...lens)-Math.min(...lens)>=2){const avg=pyRound(lens.reduce((p,q)=>p+q,0)/lens.length);
      const w=s.reduce((p,x)=>Math.abs(x[1]-avg)>Math.abs(p[1]-avg)?x:p,s[0])[0];
      notes[w].push({rule:rule+':uneven',sev:'khafi',msg:`${MADD[rule]}: سوّي بين المدود (${lens.map(ARn).join(' / ')})`})}}
  return ref.words.map((w,k)=>({word:w,ok:!notes[k].length,notes:notes[k],madd:maddHeard[k]}));
}
const TJC={};
async function refOf(su,v){
  if(!TJC[su]){const r=await fetch(`tj/${su}.json?v=1`);if(!r.ok)throw new Error('ref');TJC[su]=await r.json()}
  const d=TJC[su],i=v-1;if(!d.p[i])throw new Error('ref');const s=d.s[i],spans=[];for(let k=0;k<s.length;k+=2)spans.push([s[k],s[k+1]]);
  return {words:d.w[i],phonemes:d.p[i],spans,units:d.u[i].map(u=>({s:u[0],e:u[1],kind:u[2],word:u[3],golden:u[4],allowed:u[5],rule:u[6],char:u[7]}))};
}
async function check(src,su,v,box,onStatus){
  const st=onStatus||(()=>{});
  if(!SESS){const had=await isReady();st(had?'جارٍ تشغيل النموذج…':'تنزيل نموذج الفحص (نحو ٢٣ ميغابايت، مرة واحدة)…');
    await session(p=>st(`تنزيل نموذج الفحص… ${ARn(Math.min(100,Math.round(p*100)))}٪`))}
  st('جارٍ الاستماع إلى التلاوة…');
  const ref=await refOf(su,v);const x=trim(await toMono16k(src)).x;
  if(x.length<SR*.4)throw new Error('short');
  const r=await hear(x);const res=listen(ref,r.heard,r.probs,r.times);
  const bad=res.filter(w=>!w.ok).length,missing=res.filter(w=>w.notes.some(n=>n.rule==='word')).length;
  const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  box.innerHTML=`<p class="vc-sum">${missing>res.length/3?'لم يُسمع جزء كبير من الآية. تأكدي أنكِ اخترتِ الآية نفسها التي قرأتِها، وأن الميكروفون قريب.':bad?`ملاحظات محتملة في ${ARn(bad)} من ${ARn(res.length)} كلمة. استمعي إلى القارئ في هذه المواضع، فقد يخطئ الفحص.`:'لم يجد الفحص ملاحظات في هذه الآية.'}</p>
   ${r.cut?'<p class="note">التسجيل أطول من ٣٠ ثانية، فلم يُفحص آخره.</p>':''}
   <ol class="vc-words">${res.map(w=>`<li class="${w.ok?'ok':'bad'}"><span class="w">${esc(w.word)}</span>${w.madd.length?` <span class="md">${w.madd.map(m=>`${m.name}: ${counts(m.heard)}`).join('، ')}</span>`:''}${w.notes.length?`<ul>${w.notes.map(n=>`<li class="${n.sev}">${esc(n.msg)}</li>`).join('')}</ul>`:''}</li>`).join('')}</ol>
   <p class="note">فحص تجريبي: النموذج يخطئ أحيانًا فيصف كلمة صحيحة بأنها خاطئة (قرابة كلمة من كل ١٥ إلى ٢٥ كلمة صحيحة في تجارب صاحبه)، ولم يُختبر على أصوات الأطفال. اقرئي الآية كاملة بنفَس واحد أو بوقف صحيح، بلا تكرار. لا يُغني عن المعلّم.</p>`;
  st('');return {res,heard:r.heard,expected:ref.phonemes};
}

window.HadidVoice={compare,check,isReady,_t:{logMel,melFilters,listen,opcodes,boundaries,refOf,toMono16k,hear,session}};
})();
