/* سورة الفيل: مشهد متحرك لكل آية، على معنى التفسير الميسر.
   الجيش رسوم ظلية بلا ملامح، ولا يُرسم شيء مؤلم. */
(function(){
'use strict';
const L=window.AAL;if(!L||!L.scene)return;
const A=window.AYAH_ANIM=window.AYAH_ANIM||{};
const SC=(id,bg,body,note,css)=>L.scene(105,id,bg,body,note,css);
// جندي برمح
const soldier=(x,y,s=1,c='#2A1E1A')=>`${L.person(x,y,s,c)}<path d="M${x+12*s} ${y} L${x+16*s} ${y-62*s}" stroke="${c}" stroke-width="${2*s}"/><path d="M${x+16*s} ${y-62*s} l-3 8 h6Z" fill="${c}"/>`;
const army=(x,y,s=1,c='#2A1E1A')=>`${L.elephant(x,y,s*1.15,'#5A5A62')}${[-56,-80,-104,-128].map((d,i)=>soldier(x+d*s,y,s*(i%2?.85:.95),c)).join('')}`;
const flock=(x,y,n,s,c)=>Array.from({length:n},(_,i)=>L.bird(x+(i%3)*16+(i>2?8:0),y+(i>2?12:0)+(i%2)*5,s,c,'aq-bob',i*.1)).join('');
const leaf=(x,y,r,c)=>`<ellipse cx="${x}" cy="${y}" rx="7" ry="3" fill="${c}" transform="rotate(${r} ${x} ${y})"/>`;

A[105]={
/* ١ ألم تر كيف فعل ربك بأصحاب الفيل: أبرهة وجيشه أرادوا هدم الكعبة */
1:SC(1,'desert',
`${L.sand('#D9A866')}${L.mountain(310,168,120,60,'#B88A5A')}
${L.kaaba(306,170,36)}
${L.g('aq-run',.2,army(110,172,.9),{'--dx':'70px','animation-duration':'4s'})}
${L.text(150,78,'أَصْحَابِ الْفِيلِ',22,'#4A2A10','aq-fo',1.4)}
${L.small(150,102,'أبرهة وجيشه أرادوا هدم الكعبة',13,'#5A2E10','aq-fo',2.2)}`,
'ألم تعلم كيف فعل ربك بأصحاب الفيل؟'),

/* ٢ ألم يجعل كيدهم في تضليل: جعل ما دبّروه من شر باطلًا ضائعًا */
2:SC(2,'desert',
`${L.sand('#D9A866')}${L.kaaba(310,170,34)}
${army(150,172,.9)}
<path class="aq-draw" d="M176 120 Q240 90 286 128" stroke="#B23A48" stroke-width="3" stroke-dasharray="400" fill="none" style="animation-delay:.4s"/>
<g class="aq-out" style="animation-delay:2s"><path d="M280 122 l8 8 l-10 2Z" fill="#B23A48"/></g>
${L.g('aq-crumble',2,`<path d="M176 120 Q240 90 286 128" stroke="#B23A48" stroke-width="3" fill="none" opacity="0"/>`)}
<g class="ks">${L.small(232,96,'كيدهم',13,'#B23A48')}</g>
${L.text(150,64,'فِي تَضْلِيلٍ',24,'#4A2A10','aq-fo',2.2)}
${L.small(150,88,'في إبطالٍ وضياع',13,'#5A2E10','aq-fo',2.8)}`,
'جعل الله ما دبّروه من شر باطلًا ضائعًا',
`.aq-draw{animation:dw 2.6s ease-out forwards}@keyframes dw{60%{stroke-dashoffset:0;opacity:1}100%{stroke-dashoffset:0;opacity:0}}
.ks{opacity:0;animation:ks 3s .6s forwards}@keyframes ks{30%,60%{opacity:1}100%{opacity:0;transform:translateY(20px)}}`),

/* ٣ وأرسل عليهم طيرًا أبابيل: طيرًا في جماعات متتابعة */
3:SC(3,'day',
`${L.sand('#D9A866')}${army(200,184,.6,'#3A2E2A')}
${[0,1,2,3].map(i=>L.g('aq-fly',i*.85,flock(370,50+(i%2)*22,6,1.1,'#2A2A2A'),{'--dx':'-480px','--dy':'0px','animation-duration':'3.4s','animation-iteration-count':'infinite','animation-timing-function':'linear'})).join('')}
${L.text(180,114,'طَيْرًا أَبَابِيلَ',22,'#1E2A3A','aq-fo',1)}
${L.small(180,136,'جماعاتٍ متتابعة',13,'#1E2A3A','aq-fo',1.8)}`,
'أرسل عليهم طيرًا في جماعات متتابعة'),

/* ٤ ترميهم بحجارة من سجيل: من طين متحجّر */
4:SC(4,'day',
`${L.sand('#D9A866')}
${L.g('aq-dim',1.6,army(200,184,.6,'#3A2E2A'))}
${[60,110,160,210,260,310].map((x,i)=>L.bird(x,60+(i%2)*14,1.1,'#2A2A2A','aq-bob',i*.1)).join('')}
${[60,110,160,210,260,310].map((x,i)=>`<circle class="aq-fall" cx="${x}" cy="${66+(i%2)*14}" r="2.6" fill="#7A4A2A" style="--dy:${96-(i%2)*14}px;--r:0deg;animation-delay:${.6+i*.18}s;animation-iteration-count:infinite;animation-duration:1.6s"/>`).join('')}
${L.text(180,112,'بِحِجَارَةٍ مِّن سِجِّيلٍ',20,'#1E2A3A','aq-fo',1)}
${L.small(180,134,'سِجّيل: طينٌ متحجّر',13,'#5A2E10','aq-fo',1.8)}`,
'ترميهم بحجارة من طين متحجّر'),

/* ٥ فجعلهم كعصف مأكول: محطّمين كورق الزرع اليابس أكلته البهائم ثم رمت به */
5:SC(5,'desert',
`${L.sand('#C9A06A')}
${[30,60,90,270,300,330].map((x,i)=>L.grain(x,172,.9,'#B8A05A','aq-sway',i*.2)).join('')}
${Array.from({length:16},(_,i)=>L.g('aq-fly',.2+i*.15,leaf(110+(i*37)%140,150+(i*13)%22,(i*47)%180,i%2?'#A08850':'#8A6A3A'),{'--dx':`${(i%2?1:-1)*(20+(i*11)%40)}px`,'--dy':`${18+(i*7)%14}px`,'animation-duration':'2.4s'})).join('')}
${L.text(180,82,'كَعَصْفٍ مَّأْكُولٍ',26,'#4A2A10','aq-fo',1.4)}
${L.small(180,108,'ورقُ زرعٍ يابس أكلته البهائم ثم رمت به',13,'#5A2E10','aq-fo',2.2)}`,
'جعلهم محطّمين كورق الزرع اليابس')
};
})();
