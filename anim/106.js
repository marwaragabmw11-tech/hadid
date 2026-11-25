/* سورة قريش: مشهد متحرك لكل آية، على معنى التفسير الميسر.
   لا يُرسم لله تعالى صورة ولا رمز؛ والقوافل جمال ورايات بلا ركّاب. */
(function(){
'use strict';
const L=window.AAL;if(!L||!L.scene)return;
const A=window.AYAH_ANIM=window.AYAH_ANIM||{};
const SC=(id,bg,body,note,css)=>L.scene(106,id,bg,body,note,css);
// قافلة من ثلاثة جمال تتقدمها راية؛ dir=-1 لتتجه يسارًا
const caravan=(x,y,s,dir,c)=>{const g=[0,1,2].map(i=>L.camel(x-dir*i*44*s,y,s,c)).join('')+`<path d="M${x+dir*30*s} ${y-46*s} V${y-82*s}" stroke="#5A3A1A" stroke-width="2"/><path class="aq-sway" d="M${x+dir*30*s} ${y-82*s} l${dir*18*s} 5 l${-dir*18*s} 6Z" fill="#2E7D4A"/>`;
  return dir>0?g:`<g transform="matrix(-1 0 0 1 ${2*x} 0)">${g}</g>`};
const valley=(c='#7A5A4A')=>`${L.mountain(50,172,150,80,c)}${L.mountain(310,172,160,88,c)}`;

A[106]={
/* ١ لإيلاف قريش: اعجبوا لأُلفة قريش وأمنهم واستقامة مصالحهم */
1:SC(1,'dusk',
`${valley('#5A4A5A')}${L.ground('#8A6A4A',172)}
<path class="aq-fo" d="M70 172 A110 92 0 0 1 290 172" fill="#FFF1C2" fill-opacity=".1" stroke="#FFE7A0" stroke-width="2" stroke-dasharray="5 6" style="animation-delay:1.4s"/>
${L.kaaba(180,172,36)}
${[92,128,232,268].map((x,i)=>L.house(x,172,26,'#E8D9B8',true,'aq-rise',.3+i*.2)).join('')}
${L.text(180,72,'لِإِيلَافِ قُرَيْشٍ',22,'#FFF1C8','aq-fo',1.8)}
${L.small(180,192,'أُلفتهم وأمنهم واستقامة مصالحهم',12,'#FFF6D8','aq-fo',2.6)}`,
'اعجبوا لأُلفة قريش وأمنهم'),

/* ٢ إيلافهم رحلة الشتاء والصيف: إلى اليمن شتاءً وإلى الشام صيفًا */
2:SC(2,'day',
`${L.sand('#D9A866')}
<path d="M180 46 V196" stroke="#5A2E10" stroke-width="1" stroke-dasharray="4 6" opacity=".5"/>
${L.cloud(80,70,1.1,'#9AA8B8','aq-drift')}${L.rain(50,110,74,'#5A8AB8')}
${L.sun(282,70,18,'aq-pulse')}
${L.kaaba(180,166,22)}
${L.g('aq-run',.3,caravan(150,176,.55,-1,'#9A6A3A'),{'--dx':'-110px'})}
${L.g('aq-run',.3,caravan(210,176,.55,1,'#8A5A2A'),{'--dx':'110px'})}
${L.text(88,128,'رحلة الشتاء: إلى اليمن',13,'#1E2A3A','aq-fo',1.2)}
${L.text(272,128,'رحلة الصيف: إلى الشام',13,'#1E2A3A','aq-fo',1.6)}`,
'رحلة الشتاء إلى اليمن، ورحلة الصيف إلى الشام'),

/* ٣ فليعبدوا رب هذا البيت: فليشكروا ويوحّدوا رب الكعبة التي نالوا بها الشرف */
3:SC(3,'night',
`${L.stars(18,12,100)}${L.ground('#2A2A36',172)}
${L.glow(180,134,60,'#FFE7A0','aq-glow')}${L.kaaba(180,172,64)}
${L.text(180,72,'فَلْيَعْبُدُوا رَبَّ هَٰذَا الْبَيْتِ',20,'#FFF1C8','aq-fo',1)}
${L.small(180,192,'البيت: الكعبة، وبه نالوا الشرف والرفعة',12,'#FFE7A0','aq-fo',2.2)}`,
'فليشكروا، وليعبدوا رب هذا البيت وحده'),

/* ٤ الذي أطعمهم من جوع وآمنهم من خوف */
4:SC(4,'dawn',
`${L.ground('#6A5A4A',172)}
<path d="M180 46 V196" stroke="#FFE7A0" stroke-width="1" stroke-dasharray="4 6" opacity=".5"/>
<path d="M50 150 H130 Q126 172 90 172 Q54 172 50 150Z" fill="#B8865A"/>
${[60,74,88,102,116,82,98].map((x,i)=>L.g('aq-pop',.8+i*.15,`<ellipse cx="${x}" cy="${i<5?146:136}" rx="7" ry="5" fill="${i%2?'#7A3A1A':'#D9A866'}"/>`)).join('')}
${L.text(90,92,'أَطْعَمَهُم مِّن جُوعٍ',17,'#FFF1C8','aq-fo',1.6)}
${[0,1].map(i=>L.house(232+i*56,172,34,'#E8D9B8',true)).join('')}
<g class="aq-out" style="animation-delay:1.4s">${L.smoke(232,130,1.6,'#141018')}${L.smoke(296,126,1.8,'#141018')}${L.smoke(264,150,1.4,'#141018')}</g>
${L.text(270,92,'وَآمَنَهُم مِّنْ خَوْفٍ',17,'#FFF1C8','aq-fo',2.6)}`,
'أطعمهم من جوع شديد، وآمنهم من خوف عظيم')
};
})();
