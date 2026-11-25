/* سورة الفلق: مشهد متحرك لكل آية. */
(function(){
'use strict';
const L=window.AAL;if(!L)return;const S=(id,d,b,c)=>L.svg(113,id,d,b,c);
const A=window.AYAH_ANIM=window.AYAH_ANIM||{};
const dome=(x,y,r,cls='dm')=>`<path class="${cls}" d="M${x-r} ${y} A${r} ${r} 0 0 1 ${x+r} ${y}" fill="#FFF1C2" fill-opacity=".14" stroke="#FFE7A0" stroke-width="2"/>`;
A[113]={
/* ١ قل أعوذ برب الفلق: الصبح ينفلق من ظلمة الليل */
1:S(1,L.lin('ngt','#0B1024','#1E2445')+L.lin('dwn','#F7B267','#FCE3A7')+L.rad('sun','#FFE38A'),
`<rect width="360" height="200" fill="url(#dwn)"/><circle class="sun" cx="180" cy="190" r="90" fill="url(#sun)"/>
<g class="nl"><rect width="180" height="200" fill="url(#ngt)"/>${L.stars(10,3,140)}</g><g class="nr"><rect x="180" width="180" height="200" fill="url(#ngt)"/></g>
${L.hills('#3A2A2A')}${L.praying(180,170,1.1,'#1A1218')}
${L.note(180,40,'الفلق: الصبح',15,'#5A2E10','fo')}`,
`${L.tw}.nl{animation:nl 2.6s .6s ease-in forwards}@keyframes nl{to{transform:translateX(-190px)}}.nr{animation:nr 2.6s .6s ease-in forwards}@keyframes nr{to{transform:translateX(190px)}}
.sun{transform-box:fill-box;transform-origin:50% 100%;transform:translateY(40px);animation:sn 3s .8s ease-out forwards}@keyframes sn{to{transform:none}}
.fo{opacity:0;animation:fo 1s 2.6s forwards}@keyframes fo{to{opacity:1}}`),

/* ٢ من شر ما خلق: الحماية من أذى المخلوقات */
2:S(2,L.lin('sky','#2A3550','#6C7A8E'),
`<rect width="360" height="200" fill="url(#sky)"/><path d="M0 172 H360 V200 H0Z" fill="#4A3A2A"/>
${dome(180,172,62)}${L.person(180,170,1.1,'#141826')}
<g class="cr c1"><path d="M30 170 q10 -14 22 -4 q10 8 22 -2 q8 -6 14 2" stroke="#1B140E" stroke-width="5" fill="none" stroke-linecap="round"/><circle cx="88" cy="166" r="4" fill="#1B140E"/></g>
<g class="cr c2"><ellipse cx="300" cy="166" rx="12" ry="7" fill="#1B140E"/><path d="M312 164 q14 -18 2 -26 q-6 -4 -8 4" stroke="#1B140E" stroke-width="3" fill="none"/>${[0,1,2].map(i=>`<path d="M${294+i*5} 170 l-4 6 M${294+i*5} 162 l-4 -6" stroke="#1B140E" stroke-width="2"/>`).join('')}</g>
${L.note(180,40,'من شر جميع المخلوقات وأذاها',14,'#FFF6D8','fo')}`,
`.c1{animation:c1 2.4s ease-in-out forwards}@keyframes c1{60%{transform:translateX(42px)}100%{transform:translateX(20px)}}
.c2{animation:c2 2.4s ease-in-out forwards}@keyframes c2{60%{transform:translateX(-52px)}100%{transform:translateX(-30px)}}
.dm{animation:dm 1.4s 1s ease-in-out 2 alternate}@keyframes dm{to{fill-opacity:.35;stroke-width:4}}
.fo{opacity:0;animation:fo 1s 1.4s forwards}@keyframes fo{to{opacity:1}}`),

/* ٣ ومن شر غاسق إذا وقب: ليل شديد الظلمة يدخل ويتغلغل */
3:S(3,L.lin('sky','#4A5A7A','#C9A07A')+L.lin('dk','#05070F','#0B1024'),
`<rect width="360" height="200" fill="url(#sky)"/>
${[[30,40],[80,30],[250,46],[300,34]].map(([x,h])=>`<rect x="${x}" y="${172-h}" width="30" height="${h}" fill="#2A3044"/><rect x="${x+11}" y="${172-h+10}" width="7" height="9" fill="#FFE7A0"/>`).join('')}
<path d="M0 172 H360 V200 H0Z" fill="#2A2630"/>
<rect class="nt" width="360" height="200" fill="url(#dk)"/>
${L.stars(8,9,80,'st')}
${[[70,150],[290,150]].map(([x,y],i)=>`<g class="ey" style="animation-delay:${2.4+i*.4}s"><circle cx="${x}" cy="${y}" r="2.5" fill="#E8D05A"/><circle cx="${x+8}" cy="${y}" r="2.5" fill="#E8D05A"/></g>`).join('')}
${dome(180,172,50,'dm')}${L.person(180,170,1,'#141826')}
${L.note(180,36,'الليل إذا دخل وانتشر ظلامه',14,'#FFE7A0','fo')}`,
`.nt{transform-box:view-box;transform-origin:0 0;transform:translateY(-200px);animation:nt 2.6s ease-in forwards}@keyframes nt{to{transform:none;opacity:.88}}
.st{opacity:0;animation:fo 1s 2.4s forwards}.ey{opacity:0;animation:ey 1.6s ease-in-out infinite}@keyframes ey{30%,60%{opacity:1}}
.dm{opacity:0;animation:fo 1s 2.8s forwards}.fo{opacity:0;animation:fo 1s 1.6s forwards}@keyframes fo{to{opacity:1}}`),

/* ٤ ومن شر النفاثات في العقد: عُقد السحر والنفث فيها */
4:S(4,L.lin('sky','#1A1428','#3A2A40'),
`<rect width="360" height="200" fill="url(#sky)"/>
<path d="M30 100 Q90 80 150 100 T270 100 T330 100" stroke="#8A6A4A" stroke-width="4" fill="none"/>
${[70,130,190,250,310].map((x,i)=>`<g class="kn" style="animation-delay:${.3+i*.25}s"><circle cx="${x}" cy="${i%2?96:100}" r="8" fill="#6A4A30"/><path d="M${x-6} ${(i%2?96:100)-4} q6 8 12 0" stroke="#3A2A18" stroke-width="2" fill="none"/></g>
${L.wisp(`M${x} ${i%2?80:84} q-8 -10 0 -20 q8 -10 0 -20`,'wf',.8+i*.25)}`).join('')}
<rect class="sh" x="0" y="0" width="360" height="200" fill="#FFF1C2" opacity="0"/>
${L.note(180,160,'نعوذ بالله من شر السحر وأهله',14,'#FFE7A0','fo')}`,
`.kn{opacity:0;animation:kn .5s forwards}@keyframes kn{from{opacity:0;transform:scale(.3)}to{opacity:1;transform:none}}.kn{transform-box:fill-box;transform-origin:center}
.wf{opacity:0;animation:wf 1.8s ease-out infinite}@keyframes wf{0%{opacity:.9}100%{opacity:0;transform:translateY(-16px)}}
.sh{animation:sh 1.4s 2.8s forwards}@keyframes sh{40%{opacity:.35}100%{opacity:.08}}
.fo{opacity:0;animation:fo 1s 3s forwards}@keyframes fo{to{opacity:1}}`),

/* ٥ ومن شر حاسد إذا حسد: الحاسد يتمنى زوال النعمة، والنعمة محفوظة */
5:S(5,L.lin('sky','#8FC3E0','#F6E3B4'),
`<rect width="360" height="200" fill="url(#sky)"/><path d="M0 172 H360 V200 H0Z" fill="#7A9A5A"/>
<g><rect x="220" y="120" width="60" height="52" fill="#F2E2C2"/><path d="M212 120 L250 92 L288 120Z" fill="#B85A3A"/><rect x="244" y="146" width="12" height="26" fill="#7A5232"/>
<rect x="296" y="140" width="5" height="32" fill="#7A5232"/><circle cx="298" cy="132" r="14" fill="#3E9457"/><circle cx="292" cy="130" r="3" fill="#E8574A"/><circle cx="303" cy="136" r="3" fill="#F2B33D"/></g>
${L.person(200,170,1,'#2A4A6A')}
<path class="dmm" d="M190 172 A76 76 0 0 1 342 172" fill="#FFF1C2" fill-opacity=".18" stroke="#FFD36B" stroke-width="2.5"/>
${L.person(60,170,1,'#3A2A3A')}<ellipse class="au" cx="60" cy="140" rx="26" ry="40" fill="#3A2A3A" opacity=".25"/>
${L.wisp('M72 132 Q120 110 170 130','ar',.6)}
${L.note(180,40,'الحاسد يتمنى زوال نعمة الله عن الناس',13,'#2A2A3A','fo')}`,
`.ar{stroke-dasharray:110;stroke-dashoffset:110;animation:ar 2s ease-in forwards}@keyframes ar{70%{stroke-dashoffset:0;opacity:.85}100%{stroke-dashoffset:0;opacity:0}}
.dmm{opacity:0;animation:dmm 1s 1.6s forwards}@keyframes dmm{to{opacity:1}}
.au{transform-box:fill-box;transform-origin:center;animation:au 2s ease-in-out infinite alternate}@keyframes au{to{transform:scale(1.2)}}
.fo{opacity:0;animation:fo 1s 2.2s forwards}@keyframes fo{to{opacity:1}}`)
};
})();
