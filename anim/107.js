/* سورة الماعون: مشهد متحرك لكل آية، على معنى التفسير الميسر.
   الناس رسوم ظلية بلا ملامح. */
(function(){
'use strict';
const L=window.AAL;if(!L||!L.scene)return;
const A=window.AYAH_ANIM=window.AYAH_ANIM||{};
const SC=(id,bg,body,note,css)=>L.scene(107,id,bg,body,note,css);
// ذراع ممدودة من كتف شخص مرسوم بـ L.person عند (x,y) بمقياس s
const arm=(x,y,s,dx,dy,c)=>`<path d="M${x+8*s} ${y-26*s} L${x+8*s+dx} ${y-26*s+dy}" stroke="${c}" stroke-width="${4.5*s}" stroke-linecap="round"/>`;
const seated=(x,y,s=1,c='#141826')=>`<g transform="translate(${x} ${y}) scale(${s})"><circle cy="-34" r="7.5" fill="${c}"/><path d="M-10 0 V-18 Q-10 -26 0 -26 Q10 -26 10 -18 V-6 H22 V0Z" fill="${c}"/></g>`;
const bowl=(x,y,c='#B8865A')=>`<path d="M${x-10} ${y-8} H${x+10} Q${x+9} ${y} ${x} ${y} Q${x-9} ${y} ${x-10} ${y-8}Z" fill="${c}"/>`;
const pot=(x,y,s=1)=>`<g transform="translate(${x} ${y}) scale(${s})"><path d="M-14 -16 H14 L12 -2 Q0 4 -12 -2Z" fill="#8A8A92"/><rect x="-16" y="-19" width="32" height="4" rx="2" fill="#6A6A72"/><path d="M-16 -12 h-5 M16 -12 h5" stroke="#6A6A72" stroke-width="3" stroke-linecap="round"/></g>`;
const bubble=(x,y,w,inner)=>`<rect x="${x-w/2}" y="${y-16}" width="${w}" height="30" rx="12" fill="#FFFFFF" opacity=".9"/><path d="M${x-6} ${y+14} l-4 10 l12 -10Z" fill="#FFFFFF" opacity=".9"/>${inner}`;
const cross=(x0,y0,x1,y1,dl)=>`<path class="aq-draw" d="M${x0} ${y0} L${x1} ${y1}" stroke="#E2451E" stroke-width="3.5" stroke-linecap="round" style="animation-delay:${dl}s"/>`;

A[107]={
/* ١ أرأيت الذي يكذب بالدين: يكذّب بالبعث والجزاء */
1:SC(1,'plain',
`${L.stars(12,3,80)}${L.ground('#1E1A2A',172)}
${L.glow(262,128,48,'#FFE7A0','aq-glow')}${L.scale(262,172,0,'#FFD36B','aq-fo',.3)}
${L.small(262,192,'البعث والجزاء',12,'#FFE7A0','aq-fo',.8)}
${L.person(100,172,1.3,'#0A0A14')}${L.g('aq-fo',1.2,arm(100,172,1.3,30,-6,'#0A0A14'))}
${L.text(118,82,'يُكَذِّبُ بِالدِّينِ',20,'#FFF1C8','aq-fo',1.8)}
${L.text(40,140,'؟',34,'#FFD9A0','aq-pop',2.6)}`,
'أرأيت حال الذي يكذّب بالبعث والجزاء؟'),

/* ٢ فذلك الذي يدع اليتيم: يدفعه بعنف وشدة عن حقه لقسوة قلبه */
2:SC(2,'storm',
`${L.ground('#2A2630',172)}
${L.coins(96,170,5)}${L.small(96,150,'حقُّه',12,'#FFE7A0','aq-fo',.3)}
${L.person(150,172,1.3,'#0A0A14')}${L.g('aq-fo',.9,arm(150,172,1.3,26,0,'#0A0A14'))}
${L.g('aq-fly',1,L.person(192,172,.7,'#2B3A4F'),{'--dx':'90px','animation-duration':'1.2s','animation-timing-function':'ease-out'})}
${L.small(282,130,'اليتيم',13,'#FFE7A0','aq-fo',2)}
${L.text(180,76,'يَدُعُّ: يدفع بعنفٍ وشدّة',19,'#FFF1C8','aq-fo',2.2)}`,
'يدفع اليتيم عن حقه بعنف؛ لقسوة قلبه'),

/* ٣ ولا يحض على طعام المسكين: لا يحث غيره على إطعامه، فكيف يطعمه بنفسه؟ */
3:SC(3,'dusk',
`${L.ground('#4A3A30',172)}
<rect x="40" y="140" width="100" height="8" fill="#7A5232"/><path d="M50 148 V172 M130 148 V172" stroke="#7A5232" stroke-width="5"/>
${[60,80,100,120].map(x=>`<ellipse cx="${x}" cy="134" rx="9" ry="6" fill="#D9A866"/>`).join('')}<circle cx="90" cy="126" r="5" fill="#E2451E"/>
${L.person(170,172,1.2,'#141018')}
${L.g('aq-pop',.8,bubble(196,96,74,L.note(196,101,'أطعِموه',13,'#3A2A20'))+cross(166,92,226,104,1.8))}
${L.g('aq-rise',.4,seated(290,172,1.1,'#2B3A4F'))}${bowl(320,170)}
${L.small(300,128,'المسكين',12,'#FFE7A0','aq-fo',1)}
${L.text(180,62,'وَلَا يَحُضُّ: لا يحثّ غيره',18,'#FFF1C8','aq-fo',2.4)}
${L.small(180,192,'فكيف يطعمه بنفسه؟',12,'#FFF6D8','aq-fo',3.2)}`,
'لا يحثّ غيره على إطعام المحتاج'),

/* ٤ فويل للمصلين: عذاب شديد للمصلين الذين يضيّعون صلاتهم */
4:SC(4,'storm',
`${L.ground('#24222C',172)}
<path d="M150 172 V112 Q150 88 180 80 Q210 88 210 112 V172Z" fill="#2E3A44"/>${L.lamp(180,110)}
${[40,80,120,240,280,320].map((x,i)=>i===1||i===4?L.g('aq-dim',1.4,`<g class="aq-shake" style="animation-delay:1.4s">${L.person(x,172,.95,'#0A0A14')}</g>`):L.person(x,172,.95,'#0A0A14')).join('')}
${L.text(180,62,'فَوَيْلٌ',28,'#FFB08A','aq-pop',1.8)}
${L.small(180,192,'وَيْل: عذابٌ شديد',12,'#FFE7A0','aq-fo',2.6)}`,
'عذاب شديد للمصلين الذين يضيّعون صلاتهم'),

/* ٥ الذين هم عن صلاتهم ساهون: لا يقيمونها على وجهها ولا يؤدونها في وقتها */
5:SC(5,'day',
`${L.ground('#C9A878',172)}
<g class="sn">${L.sun(40,90,16)}</g>
<circle cx="90" cy="120" r="26" fill="#FFF6D8" stroke="#5A3A22" stroke-width="3"/><path d="M90 120 V104" stroke="#5A3A22" stroke-width="3" stroke-linecap="round"/>
<g class="hd"><circle cx="90" cy="120" r="20" fill="none"/><path d="M90 120 V102" stroke="#B23A48" stroke-width="2.5" stroke-linecap="round"/></g>
<g class="aq-dim" style="animation-delay:.8s"><rect x="160" y="150" width="70" height="20" rx="3" fill="#9A2A2A"/><rect x="165" y="153" width="60" height="14" rx="2" fill="none" stroke="#F2B33D"/></g>
${L.small(195,144,'مكان الصلاة خالٍ',11,'#1E2A3A','aq-fo',1.4)}
${L.g('aq-bob',0,`${L.person(300,172,1.1,'#1E2A3A')}${L.coins(272,170,4)}`)}
${L.text(220,72,'سَاهُونَ: لاهون عنها',19,'#1E2A3A','aq-fo',2)}
${L.small(220,96,'لا يؤدونها في وقتها',13,'#5A2E10','aq-fo',2.8)}`,
'لا يقيمون الصلاة على وجهها، ولا في وقتها',
`.sn{animation:sn 4s ease-in-out forwards}@keyframes sn{to{transform:translate(280px,20px)}}
.hd{transform-box:fill-box;transform-origin:center;animation:hd 4s linear forwards}@keyframes hd{to{transform:rotate(540deg)}}`),

/* ٦ الذين هم يراءون: يتظاهرون بأعمال الخير مراءاة للناس */
6:SC(6,'dusk',
`${L.ground('#4A3A30',172)}
<path class="aq-glow" d="M150 40 L110 172 H210Z" fill="#FFF1C2" opacity=".18"/>
${L.person(160,172,1.2,'#141018')}${arm(160,172,1.2,22,4,'#141018')}
${L.g('aq-rise',.2,seated(214,172,1,'#2B3A4F'))}
${[0,1,2].map(i=>`<ellipse class="aq-fly" cx="184" cy="${144+i*2}" rx="5" ry="2.5" fill="#E8B84A" style="--dx:28px;--dy:${20-i*2}px;animation-delay:${.8+i*.4}s"/>`).join('')}
${L.g('aq-out',2.8,crowd3())}
${L.small(80,110,'الناس ينظرون',12,'#FFE7A0','aq-fo',.6)}
${L.text(220,70,'يُرَاءُونَ',24,'#FFF1C8','aq-fo',2.2)}
${L.small(220,96,'يُظهرون الخير ليراهم الناس',13,'#FFE7A0','aq-fo',3)}`,
'يتظاهرون بأعمال الخير مراءاة للناس'),

/* ٧ ويمنعون الماعون: يمنعون إعارة ما لا تضر إعارته من الآنية وغيرها */
7:SC(7,'day',
`${L.ground('#B8A07A',172)}
<rect x="40" y="96" width="120" height="76" fill="#E8D9B8"/><path d="M34 96 L100 62 L166 96Z" fill="#8A5A3A"/>
<rect x="56" y="112" width="30" height="24" fill="#6A4A30"/>${pot(71,134,.7)}
<rect x="110" y="124" width="30" height="48" fill="#3A2A1E"/>
<rect class="dr" x="110" y="124" width="30" height="48" fill="#8A5A3A" stroke="#5A3A22"/>
${L.person(184,172,1.05,'#2B3A4F')}
${L.g('aq-pop',.4,bubble(232,96,60,pot(232,104,.6)))}
${L.text(270,62,'الْمَاعُونَ',24,'#1E2A3A','aq-fo',2.4)}
${L.small(270,138,'ما لا تضرّ إعارته',13,'#1E2A3A','aq-fo',2.8)}
${L.small(270,156,'من الآنية وغيرها',13,'#1E2A3A','aq-fo',3.1)}`,
'يمنعون إعارة الآنية وغيرها مما لا تضر إعارته',
`.dr{transform-box:fill-box;transform-origin:0 50%;transform:scaleX(0);animation:dr .7s 1.6s ease-in forwards}@keyframes dr{to{transform:scaleX(1)}}`)
};
function crowd3(){return [30,58,86,114].map((x,i)=>L.person(x-10,172,.85,'#2A2430')).join('')}
})();
