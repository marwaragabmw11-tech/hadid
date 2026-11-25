/* سورة النصر: مشهد متحرك لكل آية، على معنى التفسير الميسر.
   الخطاب للنبي ﷺ والداخلون في الإسلام صحابة؛ فلا يُرسم أحد منهم:
   يُعبَّر عن الفتح بالمكان، وعن الأفواج بالقوافل والرايات. */
(function(){
'use strict';
const L=window.AAL;if(!L||!L.scene)return;
const A=window.AYAH_ANIM=window.AYAH_ANIM||{};
const SC=(id,bg,body,note,css)=>L.scene(110,id,bg,body,note,css);
// قافلة من ثلاثة جمال بلا ركاب، تتقدمها راية؛ dir=-1 لتتجه يسارًا
const caravan=(x,y,s,dir,c)=>{const g=[0,1,2].map(i=>L.camel(x-dir*i*44*s,y,s,c)).join('')+`<path d="M${x+dir*30*s} ${y-46*s} V${y-82*s}" stroke="#5A3A1A" stroke-width="2"/><path class="aq-sway" d="M${x+dir*30*s} ${y-82*s} l${dir*18*s} 5 l${-dir*18*s} 6Z" fill="#2E7D4A"/>`;
  return dir>0?g:`<g transform="matrix(-1 0 0 1 ${2*x} 0)">${g}</g>`};

A[110]={
/* ١ إذا جاء نصر الله والفتح: النصر على كفار قريش وفتح مكة */
1:SC(1,'dawn',
`${L.g('aq-up',.2,L.sun(180,112,28))}
${L.mountain(60,172,150,86,'#4A3A5A')}${L.mountain(306,172,160,96,'#4A3A5A')}
${L.kaaba(180,172,44)}
${L.wall(0,126,172,34,'#6A5A4A')}${L.wall(234,360,172,34,'#6A5A4A')}
<g class="dl"><rect x="126" y="112" width="54" height="60" fill="#7A4A2A"/><path d="M134 120 H172 V164 H134Z" fill="none" stroke="#C9A23A" stroke-width="1.5"/></g>
<g class="dr"><rect x="180" y="112" width="54" height="60" fill="#7A4A2A"/><path d="M188 120 H226 V164 H188Z" fill="none" stroke="#C9A23A" stroke-width="1.5"/></g>
${L.ground('#8A6A4A',172)}
${L.text(100,84,'نَصْرُ اللَّهِ',22,'#FFF1C8','aq-rise',2.6)}${L.text(262,84,'وَالْفَتْحُ',22,'#FFF1C8','aq-rise',3)}
${L.small(180,192,'فُتحت مكة',12,'#FFF6D8','aq-fo',3.4)}`,
'تمّ النصر على كفار قريش، وفُتحت مكة',
`.dl{animation:dl 2s 1s ease-in-out forwards}@keyframes dl{to{transform:translateX(-58px)}}
.dr{animation:dr 2s 1s ease-in-out forwards}@keyframes dr{to{transform:translateX(58px)}}`),

/* ٢ ورأيت الناس يدخلون في دين الله أفواجًا: جماعات جماعات */
2:SC(2,'desert',
`${L.sand('#D9A866')}
${L.glow(180,140,40,'#FFF6D8','aq-glow')}${L.kaaba(180,160,34)}
${L.g('aq-run',.2,caravan(-30,170,.62,1,'#9A6A3A'),{'--dx':'96px'})}
${L.g('aq-run',.9,caravan(-30,190,.7,1,'#8A5A2A'),{'--dx':'84px'})}
${L.g('aq-run',.5,caravan(390,172,.62,-1,'#9A6A3A'),{'--dx':'-96px'})}
${L.g('aq-run',1.2,caravan(390,192,.7,-1,'#8A5A2A'),{'--dx':'-84px'})}
${L.text(180,86,'أَفْوَاجًا: جماعاتٍ جماعات',19,'#4A2A10','aq-fo',3.2)}`,
'رأيتَ الناس يدخلون في الإسلام جماعات جماعات'),

/* ٣ فسبح بحمد ربك واستغفره إنه كان توابا: أكثِر من التسبيح والاستغفار، فهو يقبل التوبة */
3:SC(3,'teal',
`${L.stars(12,21,60)}
${Array.from({length:33},(_,i)=>{const a=(i/33)*2*Math.PI+Math.PI/2;return `<circle class="bd" cx="${(180+Math.cos(a)*86).toFixed(1)}" cy="${(110+Math.sin(a)*54).toFixed(1)}" r="4.2" fill="#2F6B6A" stroke="#CFF5E0" stroke-width=".8" style="animation-delay:${(.3+i*.09).toFixed(2)}s"/>`}).join('')}
<path d="M180 164 V176 M176 176 L180 190 L184 176Z" stroke="#CFF5E0" stroke-width="1.5" fill="#CFF5E0"/>
${L.text(180,104,'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',17,'#FFF1C8','aq-fo',.6)}
${L.text(180,132,'أَسْتَغْفِرُ اللَّهَ',17,'#E6FFF2','aq-fo',2.2)}
${L.small(270,190,'إنه كان توّابًا: يقبل توبتهم',12,'#E6FFF2','aq-fo',3.6)}`,
'أكثِر من التسبيح بحمد ربك ومن الاستغفار',
`.bd{animation:bd .5s ease-out forwards}@keyframes bd{to{fill:#FFE7A0}}`)
};
})();
