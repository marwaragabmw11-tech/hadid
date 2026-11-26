/* سورة البلد: مشهد متحرك لكل آية، على معنى التفسير الميسر.
   النبي ﷺ وآدم عليه السلام لا يُرسمان؛ يُشار إليهما بالكتابة. لا يُرسم لله تعالى صورة ولا رمز.
   الناس رسوم ظلية بلا ملامح، والنار لهبٌ وحده. */
(function(){
'use strict';
const L=window.AAL;if(!L||!L.scene)return;
const A=window.AYAH_ANIM=window.AYAH_ANIM||{};
const SC=(id,bg,body,note,css)=>L.scene(90,id,bg,body,note,css);
const arm=(x,y,s,dx,dy,c)=>`<path d="M${x+8*s} ${y-26*s} L${x+8*s+dx} ${y-26*s+dy}" stroke="${c}" stroke-width="${4.5*s}" stroke-linecap="round"/>`;
const seated=(x,y,s=1,c='#2B3A4F')=>`<g transform="translate(${x} ${y}) scale(${s})"><circle cy="-34" r="7.5" fill="${c}"/><path d="M-10 0 V-18 Q-10 -26 0 -26 Q10 -26 10 -18 V-6 H22 V0Z" fill="${c}"/></g>`;
const bubble=(x,y,w,t,c='#3A2A20',sz=13)=>`<rect x="${x-w/2}" y="${y-16}" width="${w}" height="30" rx="12" fill="#FFFFFF" opacity=".9"/><path d="M${x-6} ${y+14} l-4 10 l12 -10Z" fill="#FFFFFF" opacity=".9"/>${L.note(x,y+4,t,sz,c)}`;
const bread=(x,y)=>`<ellipse cx="${x}" cy="${y}" rx="9" ry="5" fill="#D9A866"/><ellipse cx="${x}" cy="${y-2}" rx="6" ry="3" fill="#E8C08A"/>`;
const feed=(x0,y0,dx,dy,dl=.8)=>`<g class="aq-fly" style="--dx:${dx}px;--dy:${dy}px;animation-delay:${dl}s">${bread(x0,y0)}</g>`;
const fireRow=(y=204,s=1)=>[20,70,120,170,220,270,320,350].map((x,i)=>L.fire(x,y,s*(i%2?1.15:1),i*.1)).join('');
const pattern=(cls)=>[[40,60],[320,60],[40,160],[320,160]].map(([x,y])=>L.star8(x,y,14,'#FFD36B',cls)).join('');
const badge=(x,y,t,dl,w=110)=>L.g('aq-pop',dl,`<rect x="${x-w/2}" y="${y-15}" width="${w}" height="26" rx="13" fill="#FFFFFF" opacity=".88"/>${L.note(x,y+3,t,12,'#1E2A3A')}`);
const hill=(c='#6A5A4A')=>`<path d="M0 196 L230 70 L300 70 L360 110 V200 H0Z" fill="${c}"/>`;

A[90]={
/* ١ لا أقسم بهذا البلد: أقسم الله بمكة البلد الحرام */
1:SC(1,'dawn',
`${L.mountain(60,172,150,80,'#5A4A5A')}${L.mountain(306,172,160,90,'#5A4A5A')}${L.ground('#8A6A4A',172)}
${L.glow(180,140,46,'#FFF1C2','aq-glow')}${L.kaaba(180,172,44)}
${L.text(180,64,'لَا أُقْسِمُ بِهَٰذَا الْبَلَدِ',22,'#FFF1C8','aq-fo',.6)}
${L.small(180,192,'أقسم الله بمكة: البلد الحرام',12,'#FFF6D8','aq-fo',1.6)}`,
'أقسم الله بهذا البلد الحرام: مكة'),

/* ٢ وأنت حل بهذا البلد: أُحلّ لك ساعة من نهار، وفيها بشارة بفتح مكة */
2:SC(2,'morning',
`${L.mountain(60,172,150,80,'#B8865A')}${L.mountain(306,172,160,90,'#B8865A')}${L.ground('#C9A06A',172)}
${L.kaaba(180,172,40)}
<g class="dl"><rect x="126" y="112" width="54" height="60" fill="#7A4A2A"/></g><g class="dr"><rect x="180" y="112" width="54" height="60" fill="#7A4A2A"/></g>
${L.wall(0,126,172,34,'#8A6A4A')}${L.wall(234,360,172,34,'#8A6A4A')}
${L.text(180,64,'وَأَنتَ حِلٌّ بِهَٰذَا الْبَلَدِ',22,'#5A2E10','aq-fo',1)}
${L.small(180,90,'بشارةٌ للنبي ﷺ بفتح مكة على يديه',13,'#5A2E10','aq-fo',2)}`,
'وأنت أيها النبي حلالٌ لك هذا البلد ساعة من نهار',
`.dl{animation:dl 2s 1s ease-in-out forwards}@keyframes dl{to{transform:translateX(-58px)}}
.dr{animation:dr 2s 1s ease-in-out forwards}@keyframes dr{to{transform:translateX(58px)}}`),

/* ٣ ووالد وما ولد: آدم عليه السلام وما تناسل منه */
3:SC(3,'teal',
`${L.ground('#163A39',184)}
<path class="aq-draw" d="M180 184 V140" stroke="#C9A06A" stroke-width="6"/>
${[[-120,-60],[-60,-70],[0,-76],[60,-70],[120,-60]].map(([dx,dy],i)=>`<path class="aq-draw" d="M180 140 Q${180+dx*.4} ${120} ${180+dx} ${140+dy+40}" stroke="#C9A06A" stroke-width="3" fill="none" style="animation-delay:${.6+i*.15}s"/>${L.g('aq-pop',1.4+i*.2,L.people(3,180+dx-18,18,140+dy+40,.42,'#E6FFF2','person','',0,0))}`).join('')}
${L.small(180,198,'آدم عليه السلام',12,'#E6FFF2','aq-fo',.4)}
${L.text(180,58,'وَوَالِدٍ وَمَا وَلَدَ',22,'#E6FFF2','aq-fo',2.4)}`,
'وأقسم بوالد البشرية آدم عليه السلام وما تناسل منه'),

/* ٤ لقد خلقنا الإنسان في كبد: في شدة وعناء من مكابدة الدنيا */
4:SC(4,'dusk',
`${hill()}
${L.g('aq-run',.4,`${L.person(40,186,1,'#141018')}<rect x="28" y="140" width="22" height="16" rx="3" fill="#7A5232"/>`,{'--dx':'120px','--dy':'-66px','animation-duration':'3.4s','animation-timing-function':'ease-in-out'})}
${L.text(250,62,'فِي كَبَدٍ',26,'#FFF1C8','aq-fo',1.4)}
${L.small(250,88,'في شدّة وعناء',14,'#FFE7A0','aq-fo',2)}`,
'لقد خلقنا الإنسان في شدة وعناء من مكابدة الدنيا'),

/* ٥ أيحسب أن لن يقدر عليه أحد: يظن بما جمع أن الله لن يقدر عليه */
5:SC(5,'dusk',
`${L.ground('#4A3A30',172)}
${L.coins(150,170,9)}${L.coins(150,158,6)}${L.person(150,150,1.1,'#141018')}
${L.g('aq-pop',.6,`<ellipse cx="260" cy="96" rx="64" ry="20" fill="#FFFFFF" opacity=".85"/><circle cx="196" cy="118" r="4" fill="#FFFFFF" opacity=".85"/>${L.note(260,101,'لن يقدر عليّ أحد',13,'#3A2A20')}`)}
${L.text(120,72,'أَيَحْسَبُ',24,'#FFF1C8','aq-fo',1.6)}
${L.text(300,150,'؟',34,'#FFB08A','aq-pop',2.2)}`,
'أيظن بما جمعه من مال أن الله لن يقدر عليه؟'),

/* ٦ يقول أهلكت مالًا لبدًا: يتباهى: أنفقت مالًا كثيرًا */
6:SC(6,'dusk',
`${L.ground('#4A3A30',172)}
${L.person(120,172,1.3,'#141018')}
${L.g('aq-pop',.6,bubble(200,96,130,'أنفقتُ مالًا كثيرًا'))}
${[220,250,280,310].map((x,i)=>L.g('aq-fall',1.2+i*.2,L.coins(x,140,3),{'--dx':'0px','--dy':'28px','--r':'0deg'})).join('')}
${L.text(180,60,'أَهْلَكْتُ مَالًا لُّبَدًا',22,'#FFF1C8','aq-fo',1.6)}
${L.small(120,192,'متباهيًا',12,'#FFE7A0','aq-fo',2.2)}`,
'يقول متباهيًا: أنفقت مالًا كثيرًا'),

/* ٧ أيحسب أن لم يره أحد: أيظن أن الله لا يراه ولا يحاسبه */
7:SC(7,'dark',
`${L.stars(22,9,180)}${pattern('aq-fo')}
${L.text(180,96,'أَيَحْسَبُ أَن لَّمْ يَرَهُ أَحَدٌ',22,'#FFF1C8','aq-fo',.4)}
${L.small(180,128,'أيظنّ أن الله لا يراه،',14,'#FFE7A0','aq-fo',1.4)}
${L.small(180,150,'ولا يحاسبه على الصغير والكبير؟',14,'#FFE7A0','aq-fo',2)}`,
'أيظن أن الله لا يراه ولا يحاسبه؟'),

/* ٨ ألم نجعل له عينين: يبصر بهما */
8:SC(8,'teal',
`${[130,230].map((x,i)=>L.g('aq-pop',.4+i*.3,`<path d="M${x-34} 130 Q${x} 98 ${x+34} 130 Q${x} 162 ${x-34} 130Z" fill="#F4F1EA"/><circle cx="${x}" cy="130" r="14" fill="#2E6A5A"/><circle cx="${x}" cy="130" r="6" fill="#0B1D1F"/><circle cx="${x+4}" cy="126" r="2.5" fill="#FFFFFF"/>`)).join('')}
${L.text(180,64,'أَلَمْ نَجْعَل لَّهُ عَيْنَيْنِ',22,'#E6FFF2','aq-fo',1.2)}
${L.small(180,190,'يبصر بهما',13,'#E6FFF2','aq-fo',1.8)}`,
'ألم نجعل له عينين يبصر بهما؟'),

/* ٩ ولسانًا وشفتين: ينطق بهما */
9:SC(9,'teal',
`${L.g('aq-pop',.4,`<rect x="110" y="96" width="140" height="56" rx="24" fill="#FFFFFF" opacity=".88"/><path d="M150 152 l-8 18 l26 -18Z" fill="#FFFFFF" opacity=".88"/>`)}
${[0,1,2].map(i=>`<path class="aq-draw" d="M${140+i*0} ${112+i*12} H${220-i*20}" stroke="#2E6A5A" stroke-width="4" stroke-linecap="round" style="animation-delay:${.9+i*.3}s"/>`).join('')}
${L.text(180,64,'وَلِسَانًا وَشَفَتَيْنِ',22,'#E6FFF2','aq-fo',1.4)}
${L.small(180,192,'ينطق بهما',13,'#E6FFF2','aq-fo',2)}`,
'ولسانًا وشفتين ينطق بهما'),

/* ١٠ وهديناه النجدين: بيّنا له سبيلي الخير والشر */
10:SC(10,'dusk',
`${L.ground('#4A3A30',176)}
<path class="aq-draw" d="M180 176 Q140 150 50 140" stroke="#4A4250" stroke-width="8" fill="none" stroke-linecap="round"/>
<path class="aq-draw" d="M180 176 Q220 150 310 140" stroke="#E8C98A" stroke-width="8" fill="none" stroke-linecap="round" style="animation-delay:.3s"/>
${L.person(180,176,1.1,'#141018')}
${L.small(290,122,'سبيل الخير',13,'#FFF1C8','aq-fo',1)}${L.small(70,122,'سبيل الشر',13,'#C8B8D8','aq-fo',1.4)}
${L.text(180,64,'وَهَدَيْنَاهُ النَّجْدَيْنِ',22,'#FFF1C8','aq-fo',1.8)}`,
'وبيّنا له سبيلَي الخير والشر'),

/* ١١ فلا اقتحم العقبة: فهلّا تجاوز مشقة الآخرة بإنفاق ماله */
11:SC(11,'dusk',
`${hill()}
${L.person(40,186,1,'#141018')}${L.coins(70,190,5)}
<path class="aq-draw" d="M60 170 Q150 100 250 70" stroke="#E8B84A" stroke-width="4" stroke-dasharray="4 6" fill="none" style="animation-delay:.8s"/>
${L.small(264,56,'العقبة',13,'#FFF1C8','aq-fo',.4)}
${L.text(150,62,'فَلَا اقْتَحَمَ الْعَقَبَةَ',22,'#FFF1C8','aq-fo',1.4)}
${L.small(150,86,'فهلّا تجاوزها بإنفاق ماله؟',12,'#FFE7A0','aq-fo',2.2)}`,
'فهلّا تجاوز مشقة الآخرة بإنفاق ماله فيأمن'),

/* ١٢ وما أدراك ما العقبة */
12:SC(12,'dusk',
`${hill('#5A4A40')}
${L.text(140,92,'وَمَا أَدْرَاكَ مَا الْعَقَبَةُ',22,'#FFF1C8','aq-fo',.4)}
${L.text(140,150,'؟',40,'#FFD36B','aq-pop',1.4)}`,
'وأيّ شيء أعلمك ما مشقة الآخرة وما يعين على تجاوزها؟'),

/* ١٣ فك رقبة: عتق رقبة مؤمنة من أسر الرق */
13:SC(13,'dawn',
`${L.ground('#5A4A5A',176)}
${L.person(180,176,1.3,'#141826')}
<g class="cl">${L.chain(120,150,176,150)}</g><g class="cr">${L.chain(184,150,240,150)}</g>
${L.g('aq-fo',1.8,L.glow(180,120,44,'#FFF1C2'))}
${L.text(180,62,'فَكُّ رَقَبَةٍ',26,'#FFF1C8','aq-fo',1.4)}
${L.small(180,194,'عتقُ رقبةٍ مؤمنة من أسر الرّق',12,'#FFF6D8','aq-fo',2)}`,
'هو عتق رقبة مؤمنة من أسر الرّق',
`.cl{animation:cl 1.4s 1s ease-in forwards}@keyframes cl{to{transform:translate(-40px,30px) rotate(-20deg);opacity:0}}
.cr{animation:cr 1.4s 1s ease-in forwards}@keyframes cr{to{transform:translate(40px,30px) rotate(20deg);opacity:0}}`),

/* ١٤ أو إطعام في يوم ذي مسغبة: في يوم مجاعة شديدة */
14:SC(14,'desert',
`${L.sand('#C9A06A')}${[60,300].map(x=>L.grain(x,172,.9,'#9A7A4A')).join('')}
${[110,170,230].map((x,i)=>`<path d="M${x-14} 162 H${x+14} Q${x+12} 174 ${x} 174 Q${x-12} 174 ${x-14} 162Z" fill="#8A6A4A"/>${L.g('aq-pop',1+i*.4,bread(x,160))}`).join('')}
${L.text(180,64,'أَوْ إِطْعَامٌ فِي يَوْمٍ ذِي مَسْغَبَةٍ',19,'#4A2A10','aq-fo',.4)}
${L.small(180,90,'في يوم مجاعة شديدة',14,'#5A2E10','aq-fo',1.4)}`,
'أو إطعامٌ في يوم ذي مجاعة شديدة'),

/* ١٥ يتيمًا ذا مقربة: يتيمًا من ذوي القرابة */
15:SC(15,'dawn',
`${L.ground('#5A4A5A',176)}${L.house(300,176,40,'#E8D9B8',true)}
${L.person(130,176,1.3,'#141826')}${arm(130,176,1.3,26,8,'#141826')}
${feed(168,150,40,14)}${L.person(214,176,.75,'#2B3A4F')}
${L.text(180,62,'يَتِيمًا ذَا مَقْرَبَةٍ',24,'#FFF1C8','aq-fo',1.2)}
${L.small(180,88,'من ذوي القرابة: صدقةٌ وصلةُ رحم',13,'#FFE7A0','aq-fo',1.8)}`,
'يتيمًا من ذوي القرابة: فيه الصدقة وصلة الرحم'),

/* ١٦ أو مسكينًا ذا متربة: فقيرًا معدمًا لا شيء عنده */
16:SC(16,'desert',
`${L.sand('#C9A06A')}
${L.person(130,176,1.3,'#3A2E2A')}${arm(130,176,1.3,26,8,'#3A2E2A')}
${feed(168,150,56,22)}${seated(240,178,1.1,'#5A4A42')}
${L.text(180,62,'أَوْ مِسْكِينًا ذَا مَتْرَبَةٍ',22,'#4A2A10','aq-fo',1.2)}
${L.small(180,88,'فقيرًا معدمًا لا شيء عنده',14,'#5A2E10','aq-fo',1.8)}`,
'أو فقيرًا معدمًا لا شيء عنده'),

/* ١٧ ثم كان من الذين آمنوا وتواصوا بالصبر وتواصوا بالمرحمة */
17:SC(17,'teal',
`${L.ground('#163A39',184)}
${L.people(6,70,44,184,.8,'#0B1D1F','person','aq-rise',.2,.12)}
${badge(270,62,'آمنوا',.8,90)}${badge(160,62,'تواصَوا بالصبر',1.3,120)}${badge(215,98,'تواصَوا بالمرحمة',1.8,130)}
${L.small(180,198,'صبرٌ على الطاعة وعن المعصية، ورحمةٌ بالخلق',11,'#E6FFF2','aq-fo',2.6)}`,
'ثم كان من المؤمنين المتواصين بالصبر والرحمة'),

/* ١٨ أولئك أصحاب الميمنة: يؤخذ بهم ذات اليمين إلى الجنة */
18:SC(18,'garden',
`${L.grass('#7CC48A')}${L.tree(290,166,1.1,'#3E9457','#F2B33D')}${L.tree(336,168,.9,'#3E9457','#E86A8A')}
${L.g('aq-run',.4,L.people(4,60,24,176,.8,'#1E4A2A','person','',0,0),{'--dx':'120px','animation-duration':'3s'})}
${L.text(160,64,'أُولَٰئِكَ أَصْحَابُ الْمَيْمَنَةِ',20,'#1E4A2A','aq-fo',1.2)}
${L.small(160,90,'يؤخذ بهم ذات اليمين إلى الجنة',13,'#1E4A2A','aq-fo',2)}`,
'هم أصحاب اليمين، يؤخذ بهم إلى الجنة'),

/* ١٩ والذين كفروا بآياتنا هم أصحاب المشأمة: ذات الشمال إلى النار */
19:SC(19,'dark',
`${[20,60,100].map((x,i)=>L.fire(x,206,.8,i*.1)).join('')}${L.ground('#2A2430',180)}
${L.g('aq-run',.4,L.people(4,230,24,180,.8,'#4A4458','person','',0,0),{'--dx':'-110px','animation-duration':'3s'})}
${L.text(200,64,'هُمْ أَصْحَابُ الْمَشْأَمَةِ',22,'#FFF1C8','aq-fo',1.2)}
${L.small(200,90,'يؤخذ بهم ذات الشمال إلى النار',13,'#FFD9A0','aq-fo',2)}`,
'الذين كفروا بالقرآن يؤخذ بهم ذات الشمال إلى النار'),

/* ٢٠ عليهم نار مؤصدة: مطبقة مغلقة عليهم */
20:SC(20,'hell',
`${fireRow(204,1)}
<rect class="lt" x="0" y="100" width="180" height="100" fill="#2A1A14" fill-opacity=".9" stroke="#5A3A22" stroke-width="3"/>
<rect class="rt" x="180" y="100" width="180" height="100" fill="#2A1A14" fill-opacity=".9" stroke="#5A3A22" stroke-width="3"/>
${L.text(180,72,'عَلَيْهِمْ نَارٌ مُّؤْصَدَةٌ',22,'#FFF1C8','aq-fo',2.2)}`,
'جزاؤهم جهنم مُطبَقة مغلقة عليهم',
`.lt{transform:translateX(-180px);animation:cl 1.6s .6s ease-in forwards}.rt{transform:translateX(180px);animation:cl 1.6s .6s ease-in forwards}@keyframes cl{to{transform:none}}`)
};
})();
