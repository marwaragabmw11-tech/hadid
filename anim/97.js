/* سورة القدر: مشهد متحرك لكل آية، على معنى التفسير الميسر.
   الملائكة وجبريل عليه السلام نورٌ فقط. لا يُرسم لله تعالى صورة ولا رمز. */
(function(){
'use strict';
const L=window.AAL;if(!L||!L.scene)return;
const A=window.AYAH_ANIM=window.AYAH_ANIM||{};
const SC=(id,bg,body,note,css)=>L.scene(97,id,bg,body,note,css);
const town=()=>`${L.hills('#141A2E')}<path d="M150 172 V140 Q150 124 180 116 Q210 124 210 140 V172Z" fill="#1E2640"/><rect x="226" y="100" width="10" height="72" fill="#1E2640"/><path d="M224 100 L231 88 L238 100Z" fill="#1E2640"/>${[60,110,280,320].map(x=>`<rect x="${x-14}" y="148" width="28" height="24" fill="#1E2640"/><rect x="${x-4}" y="156" width="8" height="8" fill="#FFE7A0" opacity=".8"/>`).join('')}`;

A[97]={
/* ١ إنا أنزلناه في ليلة القدر: أنزلنا القرآن في ليلة الشرف، إحدى ليالي رمضان */
1:SC(1,'night',
`${L.stars(24,11,140)}${L.moon(300,62,14,'#141C38')}${town()}
<g class="aq-fly" style="--dy:60px;animation-duration:3s">${L.glow(180,40,30,'#FFF1C2')}${L.book(180,56,60)}</g>
${L.text(180,150,'لَيْلَةِ الْقَدْرِ',22,'#FFF1C8','aq-fo',2.4)}
${L.small(180,194,'ليلة الشرف والفضل، من ليالي رمضان',12,'#FFE7A0','aq-fo',3)}`,
'أنزلنا القرآن في ليلة الشرف والفضل'),

/* ٢ وما أدراك ما ليلة القدر */
2:SC(2,'night',
`${L.stars(30,5,170)}${L.moon(300,62,14,'#141C38')}
${L.text(180,104,'وَمَا أَدْرَاكَ مَا لَيْلَةُ الْقَدْرِ',22,'#FFF1C8','aq-fo',.3)}
${L.text(180,156,'؟',40,'#FFD36B','aq-pop',1.4)}`,
'وما أدراك ما ليلة القدر والشرف؟'),

/* ٣ ليلة القدر خير من ألف شهر: العمل الصالح فيها خير من عمل ألف شهر */
3:SC(3,'night',
`${L.stars(10,8,60)}
${Array.from({length:200},(_,i)=>`<circle cx="${(196+(i%25)*6.2).toFixed(1)}" cy="${(96+Math.floor(i/25)*9)}" r="2" fill="#6A7490"/>`).join('')}
${L.small(270,180,'ألف شهر',13,'#C8D0E8','aq-fo',.6)}
${L.g('aq-pop',1.2,`${L.glow(80,130,40,'#FFE7A0')}${L.lamp(80,132)}`)}
${L.small(80,180,'ليلة واحدة',13,'#FFE7A0','aq-fo',1.4)}
${L.text(180,70,'خَيْرٌ مِّنْ أَلْفِ شَهْرٍ',24,'#FFF1C8','aq-fo',2)}`,
'العمل الصالح فيها خيرٌ من عمل ألف شهر'),

/* ٤ تنزل الملائكة والروح فيها بإذن ربهم من كل أمر */
4:SC(4,'night',
`${L.stars(16,3,120)}${town()}
${Array.from({length:12},(_,i)=>`<g class="dn" style="animation-delay:${(i*.35).toFixed(2)}s">${L.glow(30+(i*29)%300,0,i===5?18:9,'#EAF6FF')}</g>`).join('')}
${L.text(180,72,'تَنَزَّلُ الْمَلَائِكَةُ وَالرُّوحُ',22,'#FFF1C8','aq-fo',.6)}
${L.small(180,96,'الروح: جبريل عليه السلام',13,'#FFE7A0','aq-fo',1.4)}
${L.small(180,194,'بإذن ربهم من كل أمرٍ قضاه في تلك السنة',11,'#FFE7A0','aq-fo',2.2)}`,
'يكثر نزول الملائكة وجبريل فيها بإذن ربهم',
`.dn{opacity:0;animation:dn 4s linear infinite}@keyframes dn{0%{opacity:0;transform:translateY(-10px)}15%{opacity:1}85%{opacity:1}100%{opacity:0;transform:translateY(170px)}}`),

/* ٥ سلام هي حتى مطلع الفجر: أمن كلها لا شر فيها */
5:SC(5,'night',
`<rect class="fj" x="0" y="0" width="360" height="200" fill="#F7B267" opacity="0"/>
${L.stars(20,9,130)}${town()}
<g class="aq-up" style="animation-delay:1.6s;animation-duration:3s">${L.glow(180,176,60,'#FFD9A0')}</g>
${L.text(180,72,'سَلَامٌ هِيَ حَتَّىٰ مَطْلَعِ الْفَجْرِ',20,'#FFF1C8','aq-fo',.4)}
${L.small(180,96,'أمنٌ كلها، لا شرّ فيها',14,'#FFE7A0','aq-fo',1.2)}`,
'هي أمنٌ كلها، لا شرّ فيها إلى مطلع الفجر',
`.fj{animation:fj 4s 1.4s ease-in forwards}@keyframes fj{to{opacity:.35}}`)
};
})();
