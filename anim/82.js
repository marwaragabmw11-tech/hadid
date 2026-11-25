/* مشاهد متحركة لكل آية من سورة الانفطار — تُعرض في «فيديو السورة».
   الملائكة تُرسم نورًا لا أشخاصًا. */
(function(){
'use strict';
const A=window.AYAH_ANIM=window.AYAH_ANIM||{};
// أنماط كل مشهد محصورة فيه حتى لا تؤثر على بقية الصفحة
const scope=(id,css)=>{const names=[...css.matchAll(/@keyframes\s+([\w-]+)/g)].map(m=>m[1]);
  const c=css.replace(/@keyframes\s+([\w-]+)/g,(m,n)=>`@keyframes k82_${id}${n}`).replace(/animation:([^;}]+)/g,(m,v)=>'animation:'+v.replace(/[\w-]+/g,w=>names.includes(w)?`k82_${id}${w}`:w));
  let r='',i=0;while(i<c.length){const j=c.indexOf('{',i);if(j<0)break;const sel=c.slice(i,j).trim();let d=1,k=j+1;while(d&&k<c.length){if(c[k]==='{')d++;else if(c[k]==='}')d--;k++}
    const body=c.slice(j,k);r+=sel.startsWith('@')?sel+body:sel.split(',').map(x=>`.a82_${id} ${x.trim()}`).join(',')+body;i=k}
  return r};
const svg=(id,defs,body,css)=>`<svg viewBox="0 0 360 200" xmlns="http://www.w3.org/2000/svg" class="aa a82_${id}" role="img"><defs>${defs||''}</defs><style>${scope(id,css||'')}</style>${body}</svg>`;
const lin=(id,a,b,vert=true)=>`<linearGradient id="${id}" x1="0" y1="0" x2="${vert?0:1}" y2="${vert?1:0}"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`;
const rad=(id,c,o=1)=>`<radialGradient id="${id}"><stop offset="0" stop-color="${c}" stop-opacity="${o}"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient>`;
const person=(x,y,s=1,fill='#2B3A4F',cls='')=>`<g class="${cls}" transform="translate(${x} ${y}) scale(${s})"><circle cy="-40" r="7.5" fill="${fill}"/><path d="M-10 0 V-22 Q-10 -31 0 -31 Q10 -31 10 -22 V0Z" fill="${fill}"/></g>`;
const stars=(n,seed,h=150,cls='')=>{let r=seed,o='';for(let i=0;i<n;i++){r=(r*9301+49297)%233280;const x=r/233280*360;r=(r*9301+49297)%233280;const y=r/233280*h;o+=`<circle class="${cls}" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(0.6+(i%3)*0.5).toFixed(1)}" fill="#FFF6D8" style="animation-delay:${(i%7)*0.3}s"/>`}return o};
const hills=(c='#121826')=>`<path d="M0 172 Q60 152 120 166 T240 160 T360 168 V200 H0Z" fill="${c}"/>`;
const flame=(x,y,s,c1,c2,cls,d=0)=>`<g transform="translate(${x} ${y}) scale(${s})"><g class="${cls}" style="animation-delay:${d}s"><path d="M0 0 C-22 -8 -24 -38 -6 -62 C-4 -44 6 -46 4 -70 C22 -52 26 -20 14 -4 Q8 2 0 0Z" fill="${c1}"/><path d="M0 0 C-10 -6 -12 -24 -2 -38 C0 -28 6 -30 6 -40 C14 -28 14 -10 8 -2Z" fill="${c2}"/></g></g>`;
const label=(x,y,t,size=14,fill='#FFD36B',cls='')=>`<text class="${cls}" x="${x}" y="${y}" text-anchor="middle" font-family="Reem Kufi, Noto Naskh Arabic, sans-serif" font-size="${size}" font-weight="700" fill="${fill}" direction="rtl">${t}</text>`;
const tw='.tw{animation:tw 2.4s ease-in-out infinite}@keyframes tw{50%{opacity:.25}}';
const fl='.fl{transform-box:fill-box;transform-origin:50% 100%;animation:fl .7s ease-in-out infinite alternate}@keyframes fl{from{transform:scaleY(.86) skewX(-3deg)}to{transform:scaleY(1.08) skewX(3deg)}}';

A[82]={
/* ١ إذا السماء انفطرت: السماء تنشق ويخرج النور من الشق */
1:svg(1,lin('s1sky','#120B24','#4A1730')+rad('s1g','#FFF3C4')+'<clipPath id="s1l"><polygon points="0,0 180,0 172,30 190,55 176,85 194,115 182,145 186,172 0,172"/></clipPath><clipPath id="s1r"><polygon points="180,0 360,0 360,172 186,172 182,145 194,115 176,85 190,55 172,30"/></clipPath>',
`<rect width="360" height="200" fill="#FFE9A8"/><ellipse class="g1" cx="180" cy="90" rx="60" ry="110" fill="url(#s1g)"/>
<g class="hl"><g clip-path="url(#s1l)"><rect width="360" height="172" fill="url(#s1sky)"/>${stars(28,7,150,'tw')}</g></g>
<g class="hr"><g clip-path="url(#s1r)"><rect width="360" height="172" fill="url(#s1sky)"/>${stars(28,7,150,'tw')}</g></g>
<polyline class="ck" points="180,0 172,30 190,55 176,85 194,115 182,145 186,172" fill="none" stroke="#FFF6D8" stroke-width="3" stroke-linejoin="round"/>
${hills()}`,
`${tw}.ck{stroke-dasharray:220;stroke-dashoffset:220;animation:ck 1.4s ease-in forwards}@keyframes ck{to{stroke-dashoffset:0}}
.hl{animation:hl 2.2s 1.3s ease-in-out forwards}@keyframes hl{to{transform:translateX(-26px) rotate(-3deg)}}
.hr{animation:hr 2.2s 1.3s ease-in-out forwards}@keyframes hr{to{transform:translateX(26px) rotate(3deg)}}
.hl,.hr{transform-box:view-box;transform-origin:50% 100%}
.g1{transform-box:fill-box;transform-origin:center;transform:scaleX(.1);animation:g1 2.4s 1.2s ease-out forwards}@keyframes g1{to{transform:scaleX(1.4)}}`),

/* ٢ وإذا الكواكب انتثرت: الكواكب والنجوم تتساقط متفرقة */
2:svg(2,lin('s2sky','#0B0F24','#2A1A3E'),
`<rect width="360" height="200" fill="url(#s2sky)"/>${stars(30,3,170,'tw')}
${[[60,40,12,'#E0A060',-60,170,0],[140,26,8,'#B8C4D8',-20,190,.4],[230,50,16,'#C9764E',40,160,.2],[300,30,9,'#E8D7A0',70,185,.7],[100,90,6,'#8FB3E8',-50,120,1],[260,100,7,'#F3C77A',30,110,1.2],[190,70,10,'#A2D3C2',0,140,.9]].map(([x,y,r,c,dx,dy,d])=>`<g class="pl" style="--dx:${dx}px;--dy:${dy}px;animation-delay:${.6+d}s"><circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/><circle cx="${x-r/3}" cy="${y-r/3}" r="${r/3}" fill="#fff" opacity=".35"/>${r>11?`<ellipse cx="${x}" cy="${y}" rx="${r*1.8}" ry="${r*.45}" fill="none" stroke="${c}" stroke-width="2" opacity=".8"/>`:''}</g>`).join('')}
${hills('#0E1220')}`,
`${tw}.pl{transform-box:fill-box;transform-origin:center;animation:pl 3s ease-in forwards}
@keyframes pl{0%{transform:none}12%{transform:translate(2px,-2px)}24%{transform:translate(-2px,1px)}100%{transform:translate(var(--dx),var(--dy)) rotate(70deg);opacity:.2}}`),

/* ٣ وإذا البحار فجّرت: البحار يتفجر بعضها في بعض */
3:svg(3,lin('s3sky','#2A2238','#5B3A3A')+lin('s3sea','#2E7CB8','#123A63'),
`<rect width="360" height="200" fill="url(#s3sky)"/>
<g class="sea"><path class="wv" d="M0 120 Q30 110 60 120 T120 120 T180 120 T240 120 T300 120 T360 120 T420 120 V260 H0Z" fill="url(#s3sea)"/></g>
<rect class="land" x="150" y="105" width="60" height="95" fill="#6B4E32"/>
${[0,1,2,3,4,5,6,7].map(i=>`<ellipse class="jet" cx="${158+i*6}" cy="110" rx="3" ry="9" fill="#8FD0F5" style="--h:${-50-(i%3)*25}px;--x:${(i-3.5)*8}px;animation-delay:${1+i*.08}s"/>`).join('')}
<path class="cr" d="M180 105 L174 130 L186 150 L176 175 L182 200" stroke="#2A1A10" stroke-width="2.5" fill="none"/>`,
`.wv{animation:wv 2s linear infinite}@keyframes wv{to{transform:translateX(-60px)}}
.sea{animation:sea 3s 1s ease-in forwards}@keyframes sea{to{transform:translateY(-38px)}}
.land{transform-box:fill-box;transform-origin:50% 100%;animation:land 1.6s 1.2s ease-in forwards}@keyframes land{to{transform:scaleY(0)}}
.cr{stroke-dasharray:120;stroke-dashoffset:120;animation:ck 2.4s forwards}@keyframes ck{40%{stroke-dashoffset:0;opacity:1}70%{stroke-dashoffset:0;opacity:1}100%{stroke-dashoffset:0;opacity:0}}
.jet{opacity:0;animation:jet 1.4s ease-out infinite}@keyframes jet{0%{opacity:1;transform:none}100%{opacity:0;transform:translate(var(--x),var(--h))}}`),

/* ٤ وإذا القبور بعثرت: القبور تُقلب ويقوم الناس منها */
4:svg(4,lin('s4sky','#1B2035','#4B3B4A')+`<clipPath id="s4c"><rect width="360" height="142"/></clipPath>`+rad('s4g','#FFE6A6',.8),
`<rect width="360" height="200" fill="url(#s4sky)"/>${stars(12,11,90,'tw')}
<rect y="140" width="360" height="60" fill="#5A4330"/><rect y="140" width="360" height="5" fill="#7A5C40"/>
${[60,140,220,300].map((x,i)=>`<ellipse class="bm" cx="${x}" cy="142" rx="30" ry="22" fill="url(#s4g)" style="animation-delay:${1+i*.25}s"/>
<g clip-path="url(#s4c)"><g class="up" style="animation-delay:${1.3+i*.3}s">${person(x,142,.95,'#E9E2D0')}</g></g>
<path class="lid" d="M${x-26} 142 Q${x} 118 ${x+26} 142Z" fill="#8A6A48" style="animation-delay:${.6+i*.25}s;--r:${i%2?40:-40}deg;--x:${i%2?22:-22}px"/>
${[0,1,2].map(j=>`<circle class="du" cx="${x-10+j*10}" cy="138" r="2.5" fill="#B08A60" style="animation-delay:${.7+i*.25+j*.1}s;--x:${(j-1)*14}px"/>`).join('')}`).join('')}`,
`${tw}.lid{transform-box:fill-box;transform-origin:50% 100%;animation:lid 1.2s ease-out forwards}@keyframes lid{60%{opacity:1}to{transform:translate(var(--x),-46px) rotate(var(--r));opacity:0}}
.du{opacity:0;animation:du 1.2s ease-out forwards}@keyframes du{0%{opacity:1}100%{opacity:0;transform:translate(var(--x),-26px)}}
.bm{opacity:0;animation:bm 1.5s forwards}@keyframes bm{to{opacity:1}}
.up{transform:translateY(52px);animation:up 2.2s ease-out forwards}@keyframes up{to{transform:none}}`),

/* ٥ علمت نفس ما قدّمت وأخّرت: صحيفة الأعمال تنفتح */
5:svg(5,lin('s5sky','#1E2440','#3A2E4A')+rad('s5g','#FFE3A0',.7),
`<rect width="360" height="200" fill="url(#s5sky)"/><ellipse cx="180" cy="110" rx="170" ry="90" fill="url(#s5g)"/>
<g class="bk"><path d="M180 48 Q130 36 70 46 V170 Q130 160 180 172Z" fill="#F7EFD9"/><path d="M180 48 Q230 36 290 46 V170 Q230 160 180 172Z" fill="#FBF5E4"/><path d="M180 48 V172" stroke="#C8B48A" stroke-width="2"/></g>
${label(235,70,'ما قدّمت',13,'#7A5410','lb')}${label(125,70,'ما أخّرت',13,'#7A5410','lb lb2')}
${[0,1,2,3,4,5].map(i=>`<path class="ln" d="M276 ${86+i*13} H194" stroke="#5A4A2A" stroke-width="2.4" stroke-linecap="round" style="animation-delay:${1+i*.35}s"/>`).join('')}
${[0,1,2,3,4,5].map(i=>`<path class="ln" d="M166 ${86+i*13} H${84+(i%2)*14}" stroke="#5A4A2A" stroke-width="2.4" stroke-linecap="round" style="animation-delay:${1.2+i*.35}s"/>`).join('')}`,
`.bk{transform-box:fill-box;transform-origin:50% 100%;animation:bk 1s ease-out}@keyframes bk{from{transform:scaleX(.05)}}
.ln{stroke-dasharray:90;stroke-dashoffset:90;animation:ln .5s ease-out forwards}@keyframes ln{to{stroke-dashoffset:0}}
.lb{opacity:0;animation:lb .6s .8s forwards}.lb2{animation-delay:1s}@keyframes lb{to{opacity:1}}`),

/* ٦ ما غرّك بربك الكريم: الإنسان يلتفت إلى بريق الدنيا والنعم تنزل عليه */
6:svg(6,lin('s6sky','#2B3D66','#C98F6A')+`<linearGradient id="s6r" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFF1C2" stop-opacity=".75"/><stop offset="1" stop-color="#FFF1C2" stop-opacity="0"/></linearGradient>`,
`<rect width="360" height="200" fill="url(#s6sky)"/>
<path class="ry" d="M200 0 L150 172 H290Z" fill="url(#s6r)"/>
${[0,1,2,3,4,5].map(i=>`<circle class="gift" cx="${190+i*14}" cy="10" r="3" fill="#FFE7A0" style="animation-delay:${i*.45}s"/>`).join('')}
${hills('#3A2E2A')}
${person(220,166,1.1,'#1E2633')}<path class="arm" d="M214 140 L190 132" stroke="#1E2633" stroke-width="5" stroke-linecap="round"/>
${[[70,150],[95,158],[120,148],[84,140],[108,138]].map(([x,y],i)=>`<ellipse cx="${x}" cy="${y}" rx="9" ry="4" fill="#E8B84A"/><path class="sp" d="M${x} ${y-14} l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2Z" fill="#FFF6C8" style="animation-delay:${i*.3}s"/>`).join('')}
${label(96,110,'؟',34,'#FFE7A0','q')}`,
`.ry{animation:ry 3s ease-in-out infinite alternate}@keyframes ry{from{opacity:.55}to{opacity:1}}
.gift{animation:gift 2.7s linear infinite}@keyframes gift{to{transform:translateY(150px);opacity:0}}
.sp{transform-box:fill-box;transform-origin:center;animation:sp 1.2s ease-in-out infinite alternate}@keyframes sp{from{transform:scale(.4);opacity:.3}}
.q{opacity:0;animation:lb .8s 1.5s forwards}@keyframes lb{to{opacity:1}}`),

/* ٧ الذي خلقك فسوّاك فعدلك: الإنسان يُخلق ويُسوّى ويُعدل */
7:svg(7,lin('s7sky','#13263A','#24506A')+rad('s7g','#BFE8FF',.6),
`<rect width="360" height="200" fill="url(#s7sky)"/><ellipse cx="180" cy="105" rx="110" ry="95" fill="url(#s7g)"/>
<path class="sym" d="M180 20 V185" stroke="#BFE8FF" stroke-width="1.2" stroke-dasharray="4 5"/>
<g class="out" fill="none" stroke="#FFFFFF" stroke-width="2.2"><circle cx="180" cy="52" r="15"/><path d="M152 182 V112 Q152 82 180 82 Q208 82 208 112 V182Z"/></g>
<g class="fill"><circle cx="180" cy="52" r="15" fill="#F3E3C3"/><path d="M152 182 V112 Q152 82 180 82 Q208 82 208 112 V182Z" fill="#3F7EA6"/></g>
<g class="bal"><path d="M120 100 H240" stroke="#FFD36B" stroke-width="3"/><circle cx="120" cy="100" r="5" fill="#FFD36B"/><circle cx="240" cy="100" r="5" fill="#FFD36B"/></g>
${label(300,40,'خلقك',14,'#FFE7A0','w w1')}${label(300,64,'فسوّاك',14,'#FFE7A0','w w2')}${label(300,88,'فعدلك',14,'#FFE7A0','w w3')}`,
`.out *{stroke-dasharray:300;stroke-dashoffset:300;animation:dr 1.6s ease-out forwards}@keyframes dr{to{stroke-dashoffset:0}}
.fill{opacity:0;animation:fo 1s 1.6s forwards}@keyframes fo{to{opacity:1}}
.bal{transform-box:fill-box;transform-origin:center;transform:rotate(16deg);opacity:0;animation:bal 1.6s 2.4s ease-in-out forwards}@keyframes bal{30%{opacity:1;transform:rotate(16deg)}70%{transform:rotate(-5deg)}100%{opacity:1;transform:rotate(0)}}
.sym{opacity:0;animation:fo .8s 2.4s forwards}
.w{opacity:0;animation:fo .6s forwards}.w1{animation-delay:.4s}.w2{animation-delay:1.8s}.w3{animation-delay:3s}`),

/* ٨ في أي صورة ما شاء ركّبك: صور مختلفة للناس */
8:svg(8,lin('s8sky','#F6E7C8','#E9C79A'),
`<rect width="360" height="200" fill="url(#s8sky)"/><path d="M0 172 H360 V200 H0Z" fill="#C79B67"/>
${[[45,1.05,'#5C3A21','#2E6F8E'],[105,.8,'#E0AC69','#B3443A'],[170,1.25,'#8D5524','#3D7A52'],[235,.65,'#F1C27D','#7B4FA0'],[300,1.1,'#C68642','#C27A1E']].map(([x,s,sk,cl],i)=>`<g class="pp" style="animation-delay:${.3+i*.45}s"><g transform="translate(${x} 172) scale(${s})"><circle cy="-48" r="9" fill="${sk}"/><path d="M-13 0 V-26 Q-13 -37 0 -37 Q13 -37 13 -26 V0Z" fill="${cl}"/></g></g>`).join('')}`,
`.pp{transform-box:fill-box;transform-origin:50% 100%;transform:scale(0);animation:pp .7s cubic-bezier(.3,1.5,.5,1) forwards}@keyframes pp{to{transform:scale(1)}}`),

/* ٩ كلا بل تكذبون بالدين: الميزان أمامه وهو يُعرض عنه */
9:svg(9,lin('s9sky','#1A2438','#3E4A66')+rad('s9g','#FFD36B',.8),
`<rect width="360" height="200" fill="url(#s9sky)"/>${stars(14,19,100,'tw')}
<circle cx="260" cy="110" r="70" fill="url(#s9g)"/>
<g transform="translate(260 150)"><path d="M0 0 V-62 M-22 0 H22" stroke="#FFD36B" stroke-width="3"/><g class="tilt"><path d="M-42 -62 H42" stroke="#FFD36B" stroke-width="3"/><path d="M-42 -62 L-54 -38 H-30Z M42 -62 L30 -38 H54Z" fill="none" stroke="#FFD36B" stroke-width="1.5"/><path d="M-56 -38 H-28 Q-42 -28 -56 -38Z M28 -38 H56 Q42 -28 28 -38Z" fill="#FFD36B"/></g></g>
${hills('#151B2A')}
<g class="walk">${person(170,168,1,'#0C1018')}</g>`,
`${tw}.tilt{animation:tl 3s ease-in-out infinite alternate}@keyframes tl{from{transform:rotate(-6deg)}to{transform:rotate(6deg)}}
.walk{animation:wk 4s ease-in forwards}@keyframes wk{to{transform:translateX(-120px)}}`),

/* ١٠ وإن عليكم لحافظين: نوران يحفظان الإنسان */
10:svg(10,lin('s10sky','#14213A','#2C3F5E')+rad('s10g','#DDF2FF'),
`<rect width="360" height="200" fill="url(#s10sky)"/>${stars(18,23,120,'tw')}${hills('#101827')}
${person(180,166,1.2,'#0B111B')}
<circle class="or" cx="132" cy="96" r="26" fill="url(#s10g)"/><circle class="or o2" cx="228" cy="96" r="26" fill="url(#s10g)"/>
<path class="lk" d="M150 100 Q180 80 210 100" fill="none" stroke="#DDF2FF" stroke-width="1.5" stroke-dasharray="3 5"/>`,
`${tw}.or{transform-box:fill-box;transform-origin:center;animation:or 2.4s ease-in-out infinite alternate}.o2{animation-delay:1.2s}@keyframes or{from{transform:scale(.75);opacity:.6}to{transform:scale(1.1);opacity:1}}
.lk{animation:lk 2s linear infinite}@keyframes lk{to{stroke-dashoffset:-16}}`),

/* ١١ كرامًا كاتبين: نوران يكتبان في الصحيفة */
11:svg(11,lin('s11sky','#1C2440','#3B3555')+rad('s11g','#DDF2FF'),
`<rect width="360" height="200" fill="url(#s11sky)"/>
<rect x="60" y="70" width="240" height="110" rx="8" fill="#F7EFD9"/><rect x="50" y="64" width="16" height="122" rx="8" fill="#D9C597"/><rect x="294" y="64" width="16" height="122" rx="8" fill="#D9C597"/>
<circle class="or" cx="110" cy="40" r="22" fill="url(#s11g)"/><circle class="or o2" cx="250" cy="40" r="22" fill="url(#s11g)"/>
${[0,1,2,3,4,5].map(i=>`<path class="ln" d="M282 ${90+i*15} H${78+(i%3)*20}" stroke="#4A3A20" stroke-width="2.4" stroke-linecap="round" style="animation-delay:${.5+i*.55}s"/>`).join('')}
<circle class="pen" cx="282" cy="90" r="4" fill="#FFE7A0"/>`,
`.or{transform-box:fill-box;transform-origin:center;animation:or 2s ease-in-out infinite alternate}.o2{animation-delay:1s}@keyframes or{from{transform:scale(.8);opacity:.7}to{transform:scale(1.1)}}
.ln{stroke-dasharray:210;stroke-dashoffset:210;animation:ln .55s linear forwards}@keyframes ln{to{stroke-dashoffset:0}}
.pen{animation:pen 3.3s .5s linear forwards}@keyframes pen{${[0,1,2,3,4,5].map(i=>`${(i/6*100).toFixed(0)}%{transform:translate(0,${i*15}px)}${((i+.95)/6*100).toFixed(0)}%{transform:translate(${-204+(i%3)*20}px,${i*15}px)}`).join('')}100%{opacity:0}}`),

/* ١٢ يعلمون ما تفعلون: كل عمل يُسجَّل */
12:svg(12,lin('s12sky','#1E2A3E','#34465E'),
`<rect width="360" height="200" fill="url(#s12sky)"/>
<rect x="210" y="30" width="120" height="150" rx="8" fill="#F7EFD9"/>
${[['M70 60 h50 a8 8 0 0 1 8 8 v16 a8 8 0 0 1 -8 8 h-30 l-10 10 v-10 h-10 a8 8 0 0 1 -8 -8 v-16 a8 8 0 0 1 8 -8Z','#9FD3F0','كلام'],['M78 128 q6 -14 12 0 q2 10 -6 10 q-8 0 -6 -10Z M102 118 q6 -14 12 0 q2 10 -6 10 q-8 0 -6 -10Z','#E9D9B8','خطوات'],['M74 164 q16 -8 34 0 l10 -6 v12 q-20 10 -44 4Z','#E8B884','عطاء']].map(([d,c,t],i)=>`<g class="ic" style="animation-delay:${.3+i*1.2}s"><path d="${d}" fill="${c}"/>${label(160,[80,130,170][i],t,12,'#FFE7A0')}</g>
<g class="ic" style="animation-delay:${.8+i*1.2}s"><path d="M226 ${60+i*42} l6 6 12 -12" stroke="#2F8A55" stroke-width="3" fill="none"/><path d="M252 ${57+i*42} H316" stroke="#4A3A20" stroke-width="2.4"/></g>`).join('')}`,
`.ic{opacity:0;animation:ic .6s ease-out forwards}@keyframes ic{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}`),

/* ١٣ إن الأبرار لفي نعيم: جنة فيها أنهار وأشجار وثمار */
13:svg(13,lin('s13sky','#BFE6F2','#FFF2CC')+rad('s13g','#FFF6D8'),
`<rect width="360" height="200" fill="url(#s13sky)"/><circle cx="180" cy="40" r="60" fill="url(#s13g)"/>
<path d="M150 120 Q180 70 210 120Z" fill="#F2D27A" opacity=".85"/><rect x="176" y="62" width="8" height="14" fill="#F2D27A"/>
<path d="M0 130 Q90 105 180 125 T360 120 V200 H0Z" fill="#5FB36F"/><path d="M0 150 Q90 135 180 150 T360 148 V200 H0Z" fill="#3E9457"/>
<path class="rv" d="M0 178 Q60 166 120 178 T240 176 T360 178" stroke="#7FD3F2" stroke-width="10" fill="none" stroke-linecap="round"/>
<path class="rv2" d="M0 178 Q60 166 120 178 T240 176 T360 178" stroke="#E6FAFF" stroke-width="2" fill="none" stroke-dasharray="8 14"/>
${[[40,130],[100,124],[260,122],[320,128]].map(([x,y],i)=>`<g class="tr" style="animation-delay:${i*.4}s"><rect x="${x-3}" y="${y-30}" width="6" height="32" fill="#7A5232"/><circle cx="${x}" cy="${y-40}" r="20" fill="#2F8A4A"/>${[0,1,2].map(j=>`<circle cx="${x-8+j*8}" cy="${y-38+(j%2)*8}" r="3.5" fill="${['#E8574A','#F2B33D','#E8574A'][j]}"/>`).join('')}</g>`).join('')}
${[0,1,2,3].map(i=>`<circle class="sp" cx="${60+i*80}" cy="${90+(i%2)*20}" r="2" fill="#FFF" style="animation-delay:${i*.5}s"/>`).join('')}`,
`.rv2{animation:rv 1.6s linear infinite}@keyframes rv{to{stroke-dashoffset:-44}}
.tr{transform-box:fill-box;transform-origin:50% 100%;animation:tr 3s ease-in-out infinite alternate}@keyframes tr{from{transform:rotate(-2deg)}to{transform:rotate(2deg)}}
.sp{animation:sp 2s ease-in-out infinite}@keyframes sp{50%{opacity:0;transform:translateY(-8px)}}`),

/* ١٤ وإن الفجار لفي جحيم */
14:svg(14,lin('s14sky','#1A0606','#5A120A'),
`<rect width="360" height="200" fill="url(#s14sky)"/><rect y="170" width="360" height="30" fill="#2A0A06"/>
${[[40,.9],[100,1.3],[170,1.7],[240,1.2],[310,1]].map(([x,s],i)=>flame(x,176,s,'#E2451E','#FFC23D','fl',i*.15)).join('')}
${[0,1,2,3,4,5,6,7].map(i=>`<circle class="em" cx="${30+i*42}" cy="170" r="2" fill="#FFB347" style="animation-delay:${i*.35}s"/>`).join('')}`,
`${fl}.em{animation:em 2.6s linear infinite}@keyframes em{to{transform:translate(10px,-150px);opacity:0}}`),

/* ١٥ يصلونها يوم الدين: لهبها يصيبهم */
15:svg(15,lin('s15sky','#2A0808','#7A1A0A'),
`<rect width="360" height="200" fill="url(#s15sky)"/>
<g class="grow">${[[70,1.4],[140,2],[220,2.2],[290,1.5]].map(([x,s],i)=>flame(x,200,s,'#E2451E','#FFC23D','fl',i*.2)).join('')}</g>
${[0,1,2,3].map(i=>`<path class="hw" d="M${40+i*90} 120 q10 -10 0 -20 q-10 -10 0 -20" stroke="#FFB347" stroke-width="1.5" fill="none" style="animation-delay:${i*.4}s"/>`).join('')}`,
`${fl}.grow{transform-box:view-box;transform-origin:50% 100%;transform:scaleY(.35);animation:gr 2.4s ease-out forwards}@keyframes gr{to{transform:scaleY(1)}}
.hw{opacity:0;animation:hw 2s ease-in-out infinite}@keyframes hw{30%{opacity:.8}100%{opacity:0;transform:translateY(-40px)}}`),

/* ١٦ وما هم عنها بغائبين: لا خروج منها */
16:svg(16,lin('s16sky','#1A0606','#3A0C08'),
`<rect width="360" height="200" fill="url(#s16sky)"/>
${[[90,1.6],[180,2],[270,1.6]].map(([x,s],i)=>flame(x,120,s,'#E2451E','#FFC23D','fl',i*.2)).join('')}
<rect x="20" y="110" width="320" height="90" fill="#3A3A42"/>${[0,1,2,3,4,5,6,7,8,9,10].map(i=>`<rect x="${20+i*30}" y="100" width="18" height="12" fill="#3A3A42"/>`).join('')}
${[0,1,2,3].map(r=>`<path d="M20 ${130+r*20} H340" stroke="#2A2A30" stroke-width="1.5"/>`).join('')}
<rect x="150" y="128" width="60" height="72" rx="3" fill="#24242A"/><path d="M180 128 V200" stroke="#111" stroke-width="2"/>
<g class="lock"><rect x="168" y="156" width="24" height="18" rx="3" fill="#C9A23A"/><path d="M173 156 V148 Q180 138 187 148 V156" stroke="#C9A23A" stroke-width="4" fill="none"/></g>`,
`${fl}.lock{transform-box:fill-box;transform-origin:50% 0;animation:lk 1.2s 1s ease-in-out 2}@keyframes lk{25%{transform:rotate(-8deg)}75%{transform:rotate(8deg)}}`),

/* ١٧ وما أدراك ما يوم الدين: عظمة يوم الحساب */
17:svg(17,lin('s17sky','#0E1326','#3B2A44')+rad('s17g','#FFE3A0'),
`<rect width="360" height="200" fill="url(#s17sky)"/>${stars(20,41,110,'tw')}
<ellipse class="dawn" cx="180" cy="172" rx="220" ry="110" fill="url(#s17g)"/>
${[0,1,2].map(i=>`<circle class="rg" cx="180" cy="100" r="30" fill="none" stroke="#FFE3A0" stroke-width="2" style="animation-delay:${i}s"/>`).join('')}
<path d="M0 172 H360 V200 H0Z" fill="#141826"/>
${label(180,110,'يوم الدين',30,'#FFF1C8','tt')}`,
`${tw}.dawn{transform-box:fill-box;transform-origin:50% 100%;transform:scaleY(.2);animation:dn 3s ease-out forwards}@keyframes dn{to{transform:scaleY(1)}}
.rg{transform-box:fill-box;transform-origin:center;opacity:0;animation:rg 3s ease-out infinite}@keyframes rg{0%{opacity:.8;transform:scale(.6)}100%{opacity:0;transform:scale(4)}}
.tt{opacity:0;animation:tt 1.5s 1s forwards}@keyframes tt{to{opacity:1}}`),

/* ١٨ ثم ما أدراك ما يوم الدين: تأكيد لعظمته */
18:svg(18,lin('s18sky','#0E1326','#4A2A3A')+rad('s18g','#FFE3A0'),
`<rect width="360" height="200" fill="url(#s18sky)"/>${stars(20,43,110,'tw')}
<ellipse cx="180" cy="172" rx="240" ry="130" fill="url(#s18g)"/>
${[0,1,2,3,4].map(i=>`<circle class="rg" cx="180" cy="100" r="30" fill="none" stroke="#FFE3A0" stroke-width="2.5" style="animation-delay:${i*.5}s"/>`).join('')}
<path d="M0 172 H360 V200 H0Z" fill="#141826"/>
${label(180,112,'يوم الدين',36,'#FFF1C8','tt')}${label(60,70,'؟',30,'#FFE3A0','q1')}${label(300,70,'؟',30,'#FFE3A0','q2')}`,
`${tw}.rg{transform-box:fill-box;transform-origin:center;opacity:0;animation:rg 2.5s ease-out infinite}@keyframes rg{0%{opacity:.9;transform:scale(.6)}100%{opacity:0;transform:scale(5)}}
.tt{transform-box:fill-box;transform-origin:center;animation:tt 1.6s ease-in-out infinite alternate}@keyframes tt{from{transform:scale(.94)}to{transform:scale(1.06)}}
.q1,.q2{opacity:0;animation:q 1s forwards}.q1{animation-delay:.6s}.q2{animation-delay:1.4s}@keyframes q{to{opacity:1}}`),

/* ١٩ يوم لا تملك نفس لنفس شيئًا والأمر يومئذ لله */
19:svg(19,lin('s19sky','#2A2D45','#6A5A6A')+lin('s19r','#FFF1C2','#FFF1C2')+rad('s19p','#FFE3A0',.5),
`<rect width="360" height="200" fill="url(#s19sky)"/>
<path class="ry" d="M120 0 H240 L360 172 H0Z" fill="#FFF1C2" opacity=".18"/>
<path d="M0 172 H360 V200 H0Z" fill="#2A2630"/>
${[50,130,230,310].map(x=>`<ellipse cx="${x}" cy="168" rx="30" ry="8" fill="url(#s19p)"/>${person(x,168,1,'#141826')}`).join('')}
<path class="rch" d="M140 138 L170 134" stroke="#141826" stroke-width="5" stroke-linecap="round"/>`,
`.ry{animation:ry 3s ease-in-out infinite alternate}@keyframes ry{to{opacity:.32}}
.rch{transform-box:fill-box;transform-origin:0 50%;animation:rch 3s 1s ease-in forwards}@keyframes rch{40%{transform:rotate(-8deg)}100%{transform:rotate(70deg)}}`)
};
})();
