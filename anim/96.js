/* سورة العلق: مشهد متحرك لكل آية، على معنى التفسير الميسر.
   النبي ﷺ لا يُرسم: يُشار إلى صلاته بالسجادة والمحراب. الملائكة نورٌ فقط.
   لا يُرسم لله تعالى صورة ولا رمز. الناس رسوم ظلية بلا ملامح. */
(function(){
'use strict';
const L=window.AAL;if(!L||!L.scene)return;
const A=window.AYAH_ANIM=window.AYAH_ANIM||{};
const SC=(id,bg,body,note,css)=>L.scene(96,id,bg,body,note,css);
const arm=(x,y,s,dx,dy,c)=>`<path d="M${x+8*s} ${y-26*s} L${x+8*s+dx} ${y-26*s+dy}" stroke="${c}" stroke-width="${4.5*s}" stroke-linecap="round"/>`;
const rug=(x,y,w=60,h=26)=>`<rect x="${x-w/2}" y="${y-h}" width="${w}" height="${h}" rx="3" fill="#9A2A2A"/><rect x="${x-w/2+4}" y="${y-h+4}" width="${w-8}" height="${h-8}" rx="2" fill="none" stroke="#F2B33D"/>`;
const mihrab=(x,y,s=1)=>`<g transform="translate(${x} ${y}) scale(${s})"><path d="M-30 0 V-56 Q-30 -86 0 -96 Q30 -86 30 -56 V0Z" fill="#1B4A48"/><path d="M-20 0 V-54 Q-20 -76 0 -84 Q20 -76 20 -54 V0Z" fill="#CFF5E0" opacity=".16"/></g>${L.lamp(x,y-56*s)}`;
const pen=(x,y,r=-35)=>`<g transform="translate(${x} ${y}) rotate(${r})"><rect x="-3" y="-60" width="6" height="56" rx="2" fill="#C9A06A"/><path d="M-3 -4 L0 6 L3 -4Z" fill="#3A2A1A"/><path d="M-3 -40 H3 M-3 -22 H3" stroke="#8A6A3A"/></g>`;
const bubble=(x,y,w,t,c='#3A2A20')=>`<rect x="${x-w/2}" y="${y-16}" width="${w}" height="30" rx="12" fill="#FFFFFF" opacity=".9"/><path d="M${x-6} ${y+14} l-4 10 l12 -10Z" fill="#FFFFFF" opacity=".9"/>${L.note(x,y+4,t,13,c)}`;
const pattern=(cls)=>[[40,60],[320,60],[40,160],[320,160]].map(([x,y])=>L.star8(x,y,14,'#FFD36B',cls)).join('');

A[96]={
/* ١ اقرأ باسم ربك الذي خلق */
1:SC(1,'night',
`${L.stars(20,13,100)}
<path d="M40 200 L150 70 L190 96 L240 60 L330 200Z" fill="#2A2E3E"/>
<path d="M178 132 Q190 116 204 132 V150 H178Z" fill="#0A0C14"/>${L.glow(191,140,26,'#FFF1C2','aq-glow')}
${L.text(110,104,'اقْرَأْ',34,'#FFF1C8','aq-pop',.8)}
${L.small(180,192,'مفتتحًا باسم ربك المتفرّد بالخلق',12,'#FFE7A0','aq-fo',1.8)}`,
'اقرأ ما أُنزل إليك مفتتحًا باسم ربك'),

/* ٢ خلق الإنسان من علق: من قطعة دم غليظ أحمر */
2:SC(2,'rose',
`${L.ground('#3A2A3A',176)}
${L.g('aq-pop',.4,'<ellipse cx="70" cy="132" rx="10" ry="7" fill="#9A1E2A"/>')}
${L.arrow(96,132,146,132,'#FFE7A0')}
${L.g('aq-pop',1.4,'<path d="M184 140 q-14 -10 -4 -24 q12 -8 18 6 q4 12 -14 18Z" fill="#C9787A"/>')}
${L.arrow(214,132,264,132,'#FFE7A0')}
${L.g('aq-rise',2.4,L.person(300,176,1.2,'#141826'))}
${L.text(180,70,'خَلَقَ الْإِنسَانَ مِنْ عَلَقٍ',22,'#FFF1C8','aq-fo',.6)}
${L.small(70,160,'عَلَقة',12,'#FFE7A0','aq-fo',.8)}
${L.small(180,194,'العلق: قطعة دمٍ غليظٍ أحمر',12,'#FFE7A0','aq-fo',3)}`,
'خلق كل إنسان من قطعة دم غليظ أحمر'),

/* ٣ اقرأ وربك الأكرم: كثير الإحسان واسع الجود */
3:SC(3,'garden',
`${L.grass('#7CC48A')}${L.cloud(80,58,1,'#FFFFFF')}${L.rain(60,110,70,'#7FB8D8')}
${[60,110,160,210,260,310].map((x,i)=>L.plant(x,168,1.2,'#3E9457','aq-grow',.6+i*.2)).join('')}
${L.tree(320,166,1,'#3E9457','#F2B33D','aq-grow',.4)}
${L.text(200,78,'اقْرَأْ وَرَبُّكَ الْأَكْرَمُ',22,'#1E4A2A','aq-fo',1)}
${L.small(200,104,'كثير الإحسان، واسع الجود',14,'#1E4A2A','aq-fo',1.8)}`,
'اقرأ، وربك كثير الإحسان واسع الجود'),

/* ٤ الذي علم بالقلم: علّم خلقه الكتابة بالقلم */
4:SC(4,'dusk',
`<rect x="60" y="100" width="240" height="84" rx="4" fill="#F7EFD9"/>
${[0,1,2,3].map(i=>`<path class="aq-draw" d="M280 ${118+i*18} H${90+(i%2)*30}" stroke="#3A2A1A" stroke-width="2.4" style="animation-delay:${.4+i*.7}s;animation-duration:.8s"/>`).join('')}
<g class="pn">${pen(280,118)}</g>
${L.text(180,72,'الَّذِي عَلَّمَ بِالْقَلَمِ',22,'#FFF1C8','aq-fo',.3)}
${L.small(180,196,'علّم خلقه الكتابة بالقلم',12,'#FFF6D8','aq-fo',3)}`,
'الذي علّم خلقه الكتابة بالقلم',
`.pn{animation:pn 2.8s .4s linear forwards}@keyframes pn{25%{transform:translate(-180px,0)}26%{transform:translate(0,18px)}50%{transform:translate(-150px,18px)}51%{transform:translate(0,36px)}75%{transform:translate(-180px,36px)}76%{transform:translate(0,54px)}100%{transform:translate(-150px,54px)}}`),

/* ٥ علم الإنسان ما لم يعلم: من ظلمة الجهل إلى نور العلم */
5:SC(5,'dark',
`<rect class="lt" x="180" y="0" width="180" height="200" fill="#FFF1C2" opacity=".0"/>
${L.glow(290,110,60,'#FFF1C2','aq-glow')}${L.ground('#1E1A2A',176)}
${L.g('aq-run',.4,L.person(60,176,1.1,'#2B3A4F'),{'--dx':'150px','animation-duration':'3s'})}
${L.book(290,140,56,'aq-fo',1.6)}
${L.small(70,96,'ظلمة الجهل',13,'#8A92B0','aq-fo',.3)}${L.small(290,72,'نور العلم',14,'#FFE7A0','aq-fo',2)}
${L.text(180,190,'عَلَّمَ الْإِنسَانَ مَا لَمْ يَعْلَمْ',16,'#FFF1C8','aq-fo',2.6)}`,
'علّم الإنسان ما لم يكن يعلم',
`.lt{animation:lt 3s .4s ease-in forwards}@keyframes lt{to{opacity:.12}}`),

/* ٦ كلا إن الإنسان ليطغى: يتجاوز حدود الله */
6:SC(6,'storm',
`${L.ground('#24222C',172)}
<path d="M200 60 V172" stroke="#B23A48" stroke-width="3" stroke-dasharray="6 6"/>${L.small(232,80,'حدود الله',12,'#FFB08A','aq-fo',.3)}
${L.g('aq-run',.6,L.person(110,172,1.2,'#0A0A14'),{'--dx':'150px','animation-duration':'2.6s'})}
${L.text(110,82,'كَلَّا إِنَّ الْإِنسَانَ لَيَطْغَىٰ',18,'#FFF1C8','aq-fo',1.6)}
${L.small(110,106,'يتجاوز حدود الله',13,'#FFE7A0','aq-fo',2.2)}`,
'حقًّا إن الإنسان ليتجاوز حدود الله'),

/* ٧ أن رآه استغنى: إذا أبطره الغنى */
7:SC(7,'dusk',
`${L.ground('#4A3A30',172)}
${L.coins(120,170,9)}${L.coins(120,158,6)}${L.coins(120,148,3)}
<g class="pf">${L.person(200,172,1.2,'#141018')}</g>
${L.text(180,72,'أَن رَّآهُ اسْتَغْنَىٰ',22,'#FFF1C8','aq-fo',1)}
${L.small(180,96,'إذا أبطره الغنى',14,'#FFE7A0','aq-fo',1.8)}`,
'إذا رأى نفسه غنيًّا أبطره الغنى',
`.pf{transform-box:fill-box;transform-origin:50% 100%;animation:pf 2s .6s ease-out forwards}@keyframes pf{to{transform:scale(1.35)}}`),

/* ٨ إن إلى ربك الرجعى: المصير إلى الله فيجازي كل إنسان بعمله */
8:SC(8,'dusk',
`<path d="M150 200 L176 110 H184 L210 200Z" fill="#6A5A4A"/>${L.ground('#4A3A30',200)}
${L.people(4,40,26,196,.7,'#141018','person','aq-rise',.2,.15)}${L.people(4,244,26,196,.7,'#141018','person','aq-rise',.4,.15)}
${L.scale(180,150,0,'#FFD36B','aq-fo',1)}
${L.text(180,62,'إِنَّ إِلَىٰ رَبِّكَ الرُّجْعَىٰ',22,'#FFF1C8','aq-fo',1.6)}
${L.small(180,196,'فيجازي كلَّ إنسان بعمله',11,'#FFF6D8','aq-fo',2.4)}`,
'فليعلم كل طاغية أن المصير إلى الله'),

/* ٩ أرأيت الذي ينهى: أبو جهل ينهى عن الصلاة */
9:SC(9,'dusk',
`${L.ground('#4A3A30',172)}
${L.person(110,172,1.3,'#141018')}${L.g('aq-fo',.6,arm(110,172,1.3,30,-4,'#141018'))}
${L.g('aq-pop',1,bubble(180,98,70,'لا تُصلِّ'))}
${L.small(110,192,'أبو جهل',12,'#FFF6D8','aq-fo',.4)}
${L.text(250,66,'أَرَأَيْتَ الَّذِي يَنْهَىٰ',20,'#FFF1C8','aq-fo',1.6)}`,
'أرأيتَ أعجب من طغيان الذي ينهى؟'),

/* ١٠ عبدًا إذا صلى: محمدًا ﷺ */
10:SC(10,'dusk',
`${L.ground('#4A3A30',172)}
${mihrab(260,172,1)}${rug(260,172,56,22)}
${L.person(80,172,1.2,'#141018')}${arm(80,172,1.2,30,-4,'#141018')}
<path class="aq-draw" d="M130 120 L200 150" stroke="#B23A48" stroke-width="3" stroke-dasharray="6 5" style="animation-delay:.6s"/>
${L.text(180,64,'عَبْدًا إِذَا صَلَّىٰ',22,'#FFF1C8','aq-fo',1.2)}
${L.small(180,88,'وهو محمد ﷺ',14,'#FFE7A0','aq-fo',1.8)}`,
'ينهى عبدًا لنا إذا صلى لربه'),

/* ١١ أرأيت إن كان على الهدى */
11:SC(11,'dawn',
`<path d="M150 200 L176 100 H184 L210 200Z" fill="#E8C98A"/>${L.ground('#4A4A5A',200)}
${L.glow(180,96,40,'#FFF1C2','aq-glow')}${L.lamp(180,98)}
${[0,1,2].map(i=>`<path class="aq-draw" d="M${166-i*4} ${190-i*30} L${194+i*4} ${190-i*30}" stroke="#FFF1C2" stroke-width="2" style="animation-delay:${.4+i*.3}s"/>`).join('')}
${L.text(180,58,'أَرَأَيْتَ إِن كَانَ عَلَى الْهُدَىٰ',20,'#FFF1C8','aq-fo',1.2)}
${L.small(80,150,'فكيف ينهاه؟',14,'#FFF6D8','aq-fo',2)}`,
'أرأيت إن كان المنهيّ عن الصلاة على الهدى؟'),

/* ١٢ أو أمر بالتقوى */
12:SC(12,'teal',
`${L.ground('#163A39',176)}
<g class="aq-fo" style="animation-delay:.3s"><rect x="110" y="96" width="140" height="56" rx="4" fill="#F7EFD9"/><rect x="104" y="92" width="10" height="64" rx="5" fill="#D9C597"/><rect x="246" y="92" width="10" height="64" rx="5" fill="#D9C597"/></g>
${L.g('aq-pop',1.6,L.note(180,128,'التقوى',20,'#1B4A48'))}
${L.text(180,64,'أَوْ أَمَرَ بِالتَّقْوَىٰ',22,'#E6FFF2','aq-fo',.8)}
${L.small(180,194,'أيَنهاه عن أمر غيره بالتقوى؟',12,'#E6FFF2','aq-fo',2.2)}`,
'أو إن كان آمرًا غيره بالتقوى؟'),

/* ١٣ أرأيت إن كذب وتولى */
13:SC(13,'storm',
`${L.ground('#24222C',172)}
${L.glow(290,110,40,'#FFF1C2','aq-glow')}${L.book(290,130,50)}
${L.g('aq-run',.8,L.person(200,172,1.2,'#0A0A14'),{'--dx':'-150px','animation-duration':'2.4s'})}
${L.text(150,70,'أَرَأَيْتَ إِن كَذَّبَ وَتَوَلَّىٰ',20,'#FFF1C8','aq-fo',.4)}
${L.small(150,94,'كذّب بما يُدعى إليه، وأعرض عنه',13,'#FFE7A0','aq-fo',1.4)}`,
'أرأيت إن كذّب بما يُدعى إليه وأعرض؟'),

/* ١٤ ألم يعلم بأن الله يرى */
14:SC(14,'dark',
`${L.stars(26,17,180)}${pattern('aq-fo')}
${L.text(180,104,'أَلَمْ يَعْلَم بِأَنَّ اللَّهَ يَرَىٰ',22,'#FFF1C8','aq-fo',.4)}
${L.small(180,136,'يرى كلَّ ما يفعل',15,'#FFE7A0','aq-fo',1.6)}`,
'ألم يعلم بأن الله يرى كل ما يفعل؟'),

/* ١٥ كلا لئن لم ينته لنسفعًا بالناصية */
15:SC(15,'storm',
`${L.ground('#24222C',172)}
${L.person(110,172,1.3,'#0A0A14')}
<path class="aq-pop" d="M240 92 L276 154 H204Z" fill="#FFD36B" stroke="#B23A48" stroke-width="3" style="animation-delay:.6s"/>
${L.g('aq-pop',.8,L.note(240,146,'!',24,'#B23A48'))}
${L.text(180,62,'كَلَّا لَئِن لَّمْ يَنتَهِ',22,'#FFF1C8','aq-fo',1.2)}
${L.small(180,194,'لَنَسْفَعًا بِالنَّاصِيَةِ: لنأخذنّ بمقدّم رأسه',12,'#FFE7A0','aq-fo',2)}`,
'إن لم يرجع عن أذاه لنأخذنّ بمقدّم رأسه'),

/* ١٦ ناصية كاذبة خاطئة */
16:SC(16,'storm',
`${L.ground('#24222C',172)}
${L.person(180,172,1.2,'#0A0A14')}
${L.g('aq-pop',.6,`<rect x="220" y="92" width="100" height="34" rx="12" fill="#FFFFFF" opacity=".85"/>${L.note(270,114,'كاذبة',15,'#B23A48')}`)}
${L.g('aq-pop',1.2,`<rect x="40" y="92" width="100" height="34" rx="12" fill="#FFFFFF" opacity=".85"/>${L.note(90,114,'خاطئة',15,'#B23A48')}`)}
${L.small(270,146,'في مقالها',12,'#FFE7A0','aq-fo',1)}${L.small(90,146,'في أفعالها',12,'#FFE7A0','aq-fo',1.6)}
${L.text(180,64,'نَاصِيَةٍ كَاذِبَةٍ خَاطِئَةٍ',22,'#FFF1C8','aq-fo',2)}`,
'ناصية كاذبة في مقالها، خاطئة في أفعالها'),

/* ١٧ فليدع ناديه: فليحضر أهل ناديه الذين يستنصر بهم */
17:SC(17,'dusk',
`${L.ground('#4A3A30',172)}
${L.person(250,172,1.3,'#141018')}
${L.people(6,40,30,172,.85,'#2A2430','person','aq-rise',.4,.15)}
${L.text(180,66,'فَلْيَدْعُ نَادِيَهُ',22,'#FFF1C8','aq-fo',1.4)}
${L.small(180,90,'أهلَ مجلسه الذين يستنصر بهم',13,'#FFE7A0','aq-fo',2)}`,
'فليُحضر أهل ناديه الذين يستنصر بهم'),

/* ١٨ سندع الزبانية: ملائكة العذاب — نورٌ فقط */
18:SC(18,'dark',
`${L.ground('#1A1418',176)}
${L.people(5,60,30,176,.8,'#2A2430','person','',0,0)}
${Array.from({length:7},(_,i)=>`<g class="dn" style="animation-delay:${(i*.3).toFixed(1)}s">${L.glow(40+i*46,40,12,'#FFB08A')}</g>`).join('')}
${L.text(180,100,'سَنَدْعُ الزَّبَانِيَةَ',24,'#FFF1C8','aq-fo',.8)}
${L.small(180,126,'ملائكة العذاب',14,'#FFD9A0','aq-fo',1.6)}`,
'سندعو ملائكة العذاب',
`.dn{opacity:0;animation:dn 1.6s ease-out forwards}@keyframes dn{to{opacity:1;transform:translateY(20px)}}`),

/* ١٩ كلا لا تطعه واسجد واقترب */
19:SC(19,'teal',
`${L.stars(12,19,70)}${L.ground('#163A39',176)}
${mihrab(180,176,1.1)}${rug(180,176,64,24)}
${L.text(180,56,'كَلَّا لَا تُطِعْهُ وَاسْجُدْ وَاقْتَرِب',18,'#E6FFF2','aq-fo',.6)}
${L.small(70,140,'لن ينالك بسوء',13,'#E6FFF2','aq-fo',1.6)}
${L.small(290,140,'اقترب منه بطاعته',13,'#E6FFF2','aq-fo',2.2)}
${L.small(180,196,'۩ موضع سجدة',11,'#FFE7A0','aq-fo',2.8)}`,
'لا تطعه في ترك الصلاة، واسجد لربك واقترب منه')
};
})();
