/* سورة الشرح: مشهد متحرك لكل آية، على معنى التفسير الميسر.
   الخطاب للنبي ﷺ فلا يُرسم؛ يُعبَّر بالنور والرموز والكتابة. لا يُرسم لله تعالى صورة ولا رمز. */
(function(){
'use strict';
const L=window.AAL;if(!L||!L.scene)return;
const A=window.AYAH_ANIM=window.AYAH_ANIM||{};
const SC=(id,bg,body,note,css)=>L.scene(94,id,bg,body,note,css);
const rock=(x,y,w=90,h=50)=>`<path d="M${x-w/2} ${y} L${x-w/2+8} ${y-h+10} L${x-w/6} ${y-h} L${x+w/4} ${y-h+6} L${x+w/2} ${y-h+18} L${x+w/2-4} ${y}Z" fill="#6A6058"/><path d="M${x-w/6} ${y-h} L${x-w/10} ${y-h/2} L${x+6} ${y-h/3}" stroke="#4A443E" stroke-width="2" fill="none"/>`;
const rug=(x,y,w=70,h=28)=>`<rect x="${x-w/2}" y="${y-h}" width="${w}" height="${h}" rx="3" fill="#9A2A2A"/><rect x="${x-w/2+4}" y="${y-h+4}" width="${w-8}" height="${h-8}" rx="2" fill="none" stroke="#F2B33D"/>`;
const pattern=(cls)=>[[40,60],[320,60],[40,160],[320,160]].map(([x,y])=>L.star8(x,y,14,'#FFD36B',cls)).join('');

A[94]={
/* ١ ألم نشرح لك صدرك: نوسّع صدرك للدين والدعوة ومكارم الأخلاق */
1:SC(1,'teal',
`<circle class="ex" cx="180" cy="128" r="16" fill="#E6FFF2" opacity=".25"/>
<circle class="ex e2" cx="180" cy="128" r="16" fill="none" stroke="#E6FFF2" stroke-width="2"/>
${L.glow(180,128,22,'#FFF1C2','aq-glow')}
${L.text(180,62,'أَلَمْ نَشْرَحْ لَكَ صَدْرَكَ',22,'#E6FFF2','aq-fo',.4)}
${['لشرائع الدين','للدعوة إلى الله','لمكارم الأخلاق'].map((t,i)=>L.small([290,180,70][i],190,t,12,'#E6FFF2','aq-fo',1.6+i*.4)).join('')}`,
'ألم نوسّع لك صدرك أيها النبي؟',
`.ex{transform-box:fill-box;transform-origin:center;animation:ex 2.6s .4s ease-out forwards}@keyframes ex{to{transform:scale(3.4)}}.e2{animation-delay:.8s}`),

/* ٢ ووضعنا عنك وزرك: حططنا عنك حِملك */
2:SC(2,'dawn',
`${L.ground('#5A4A5A',176)}
<g class="up">${rock(180,150,100,54)}</g>
${L.g('aq-fo',1.6,L.glow(180,160,40,'#FFF1C2'))}
${L.text(180,62,'وَوَضَعْنَا عَنكَ وِزْرَكَ',22,'#FFF1C8','aq-fo',.4)}
${L.small(180,194,'حططنا عنك حِملك',13,'#FFF6D8','aq-fo',2)}`,
'وحططنا عنك حِملك',
`.up{animation:up 2.4s .8s ease-in forwards}@keyframes up{to{transform:translate(160px,-40px) rotate(20deg);opacity:0}}`),

/* ٣ الذي أنقض ظهرك: الذي أثقل ظهرك */
3:SC(3,'storm',
`${L.ground('#2A2630',176)}
<g class="ps">${rock(180,176,140,76)}</g>
<path class="aq-draw" d="M120 176 L132 168 M240 176 L228 168" stroke="#1A1418" stroke-width="2"/>
${L.text(180,62,'الَّذِي أَنقَضَ ظَهْرَكَ',22,'#FFF1C8','aq-fo',.4)}
${L.small(180,86,'الذي أثقل ظهرك',14,'#FFE7A0','aq-fo',1.4)}`,
'الحِمل الذي أثقل ظهرك',
`.ps{animation:ps 1.4s ease-in-out infinite alternate}@keyframes ps{to{transform:translateY(3px)}}`),

/* ٤ ورفعنا لك ذكرك: جعلناك في منزلة رفيعة عالية */
4:SC(4,'dawn',
`${L.ground('#3A4A5A',176)}
<rect x="254" y="76" width="32" height="100" fill="#E8D9B8"/><path d="M250 76 L270 46 L290 76Z" fill="#C9A23A"/><rect x="248" y="100" width="44" height="6" fill="#C9A23A"/>
<path d="M200 176 V150 Q200 124 230 116 V176Z M340 176 V150 Q340 124 310 116 V176Z" fill="#E8D9B8"/>
${[0,1,2].map(i=>`<path class="aq-fo" d="M${296+i*12} ${78-i*4} Q${312+i*16} 94 ${296+i*12} ${110+i*4}" stroke="#FFF1C2" stroke-width="2" fill="none" style="animation-delay:${.6+i*.3}s"/>`).join('')}
${L.g('aq-up',1,L.text(110,110,'وَرَفَعْنَا لَكَ ذِكْرَكَ',20,'#FFF1C8','',0))}
${L.small(110,140,'منزلةٌ رفيعة عالية',13,'#FFF6D8','aq-fo',2)}`,
'وجعلناك في منزلة رفيعة عالية'),

/* ٥ فإن مع العسر يسرًا: مع الضيق فرجًا */
5:SC(5,'dark',
`<path d="M0 30 H360 V200 H0Z" fill="#0A0C14"/>
<path d="M0 90 Q120 110 260 120 L360 60 V170 L260 150 Q120 150 0 170Z" fill="#2A2E3E"/>
${L.glow(340,115,40,'#FFF1C2','aq-glow')}
${L.g('aq-run',.6,'<circle cx="30" cy="130" r="5" fill="#FFE7A0"/>',{'--dx':'300px','animation-duration':'3s'})}
${L.small(48,84,'العُسر: الضيق',13,'#8A92B0','aq-fo',.3)}${L.small(300,190,'اليُسر: الفرج',13,'#FFE7A0','aq-fo',2.4)}
${L.text(210,58,'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا',20,'#FFF1C8','aq-fo',1)}`,
'فإنّ مع الضيق فرجًا'),

/* ٦ إن مع العسر يسرًا: تأكيدٌ ثانٍ */
6:SC(6,'storm',
`<rect class="cl" x="0" y="0" width="360" height="200" fill="#8FC3E0" opacity="0"/>
${L.g('aq-up',1.4,L.sun(180,96,24))}
<g class="aq-out" style="animation-delay:1s">${L.cloud(110,80,1.6,'#4A4F5A')}${L.cloud(250,76,1.8,'#4A4F5A')}${L.rain(60,300,96,'#9FD3F0')}</g>
${L.ground('#4A6A4A',176)}
${L.text(180,150,'إِنَّ مَعَ الْعُسْرِ يُسْرًا',22,'#FFF1C8','aq-fo',2)}
${L.small(180,194,'فلا يثنِك أذى أعدائك عن نشر الرسالة',11,'#FFF6D8','aq-fo',2.8)}`,
'إنّ مع الضيق فرجًا',
`.cl{animation:cl 2.4s 1s ease-in forwards}@keyframes cl{to{opacity:.8}}`),

/* ٧ فإذا فرغت فانصب: إذا فرغت من أشغال الدنيا فجِدّ في العبادة */
7:SC(7,'dusk',
`${L.ground('#4A3A30',172)}
<g class="aq-out" style="animation-delay:1.4s"><rect x="40" y="140" width="80" height="8" fill="#7A5232"/><path d="M50 148 V172 M110 148 V172" stroke="#7A5232" stroke-width="5"/><rect x="58" y="126" width="20" height="14" fill="#D9C597"/><rect x="84" y="130" width="24" height="10" fill="#8A8A92"/></g>
${L.small(80,110,'أشغال الدنيا',12,'#FFF6D8','aq-fo',.3)}
${L.arrow(132,150,200,150,'#FFE7A0')}
${L.g('aq-rise',1.8,`${rug(260,172,74,30)}${L.lamp(260,110)}`)}
${L.text(180,64,'فَإِذَا فَرَغْتَ فَانصَبْ',22,'#FFF1C8','aq-fo',2.2)}
${L.small(260,192,'جِدّ في العبادة',12,'#FFF6D8','aq-fo',2.6)}`,
'فإذا فرغت من أمور الدنيا فجِدّ في العبادة'),

/* ٨ وإلى ربك فارغب: وإلى ربك وحده فارغب فيما عنده */
8:SC(8,'teal',
`${L.stars(14,23,80)}${pattern('aq-fo')}
${L.text(180,100,'وَإِلَىٰ رَبِّكَ فَارْغَب',24,'#FFF1C8','aq-fo',.4)}
${L.small(180,134,'إلى ربك وحده، فارغب فيما عنده',15,'#E6FFF2','aq-fo',1.6)}`,
'وإلى ربك وحده فارغب فيما عنده')
};
})();
