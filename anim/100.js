/* سورة العاديات: مشهد متحرك لكل آية، على معنى التفسير الميسر.
   الخيل تُرسم بلا فرسان؛ لا يُرسم الصحابة. لا يُرسم لله تعالى صورة ولا رمز. */
(function(){
'use strict';
const L=window.AAL;if(!L||!L.scene)return;
const A=window.AYAH_ANIM=window.AYAH_ANIM||{};
const SC=(id,bg,body,note,css)=>L.scene(100,id,bg,body,note,css);
const herd=(x,y,s,c,n=3)=>Array.from({length:n},(_,i)=>L.horse(x-i*58*s,y+(i%2)*6,s,c)).join('');
const gallop=(inner,dl=0,dx='170px',dur='3s')=>L.g('aq-run',dl,inner,{'--dx':dx,'animation-duration':dur});
const pattern=(cls)=>[[40,60],[320,60],[40,150],[320,150]].map(([x,y])=>L.star8(x,y,14,'#FFD36B',cls)).join('');

A[100]={
/* ١ والعاديات ضبحًا: الخيل الجاريات يظهر صوت أنفاسها من سرعة عدوها */
1:SC(1,'dusk',
`${L.sand('#8A6A4A')}
${gallop(`${herd(90,176,1,'#4A2E1C')}${[0,1,2].map(i=>`<g class="br" style="animation-delay:${i*.25}s">${L.cloud(126-i*58,124+(i%2)*6,.35,'#FFF6D8')}</g>`).join('')}`,.2)}
${L.text(180,70,'وَالْعَادِيَاتِ ضَبْحًا',22,'#FFF1C8','aq-fo',1)}
${L.small(180,94,'الخيل الجارية يُسمع صوت أنفاسها',13,'#FFE7A0','aq-fo',1.8)}
${L.small(180,194,'لا يجوز للمخلوق أن يُقسم إلا بالله',11,'#FFF6D8','aq-fo',2.8)}`,
'أقسم الله بالخيل الجارية حين يُسمع صوت أنفاسها',
`.br{opacity:0;animation:br .8s ease-out infinite}@keyframes br{0%{opacity:.9}100%{opacity:0;transform:translateX(16px)}}`),

/* ٢ فالموريات قدحًا: تنقدح النار من صلابة حوافرها */
2:SC(2,'night',
`${L.stars(16,2,90)}<path d="M0 176 H360 V200 H0Z" fill="#3A3A44"/>${[30,90,150,210,270,330].map(x=>`<path d="M${x-14} 178 l8 -6 l12 2 l6 6Z" fill="#5A5A64"/>`).join('')}
${gallop(`${herd(110,176,1,'#2A1E16')}${[0,1,2].map(i=>[[-20,-2],[4,-2],[14,-4]].map(([a,b],j)=>`<path class="sp" d="M${110-i*58+a} ${176+b} l-4 -8 l3 4 l2 -9 l2 9 l3 -4 l-4 8Z" fill="#FFD36B" style="animation-delay:${(i*.2+j*.13).toFixed(2)}s"/>`).join('')).join('')}`,.2,'150px')}
${L.text(180,70,'فَالْمُورِيَاتِ قَدْحًا',22,'#FFF1C8','aq-fo',1)}
${L.small(180,94,'تنقدح النار من صلابة حوافرها',13,'#FFE7A0','aq-fo',1.8)}`,
'الخيل التي تقدح الشرر بحوافرها لشدة عدْوها',
`.sp{transform-box:fill-box;transform-origin:50% 100%;opacity:0;animation:sp .45s ease-out infinite}@keyframes sp{0%{opacity:1;transform:scale(.4)}100%{opacity:0;transform:scale(1.4) translateY(-4px)}}`),

/* ٣ فالمغيرات صبحًا: تغير على الأعداء عند الصبح */
3:SC(3,'dawn',
`${L.g('aq-up',0,L.sun(300,150,26))}${L.hills('#3A3448')}
${gallop(herd(80,180,1,'#1E1622'),.4,'200px','3.2s')}
${L.text(160,70,'فَالْمُغِيرَاتِ صُبْحًا',22,'#FFF1C8','aq-fo',1)}
${L.small(160,94,'تُغير على الأعداء عند الصبح',13,'#FFE7A0','aq-fo',1.8)}`,
'الخيل التي تُغير على الأعداء عند الصبح'),

/* ٤ فأثرن به نقعًا: فهيّجن بهذا العدو غبارًا */
4:SC(4,'desert',
`${L.sand('#D9A866')}
${gallop(herd(120,178,1,'#5A3A22'),0,'120px','3s')}
${Array.from({length:12},(_,i)=>`<g class="aq-rise" style="animation-delay:${(.3+i*.18).toFixed(2)}s">${L.smoke(20+i*30,178-(i%3)*8,1.2+(i%3)*.3,'#E6CDA0')}</g>`).join('')}
${L.text(180,70,'فَأَثَرْنَ بِهِ نَقْعًا',22,'#4A2A10','aq-fo',1.6)}
${L.small(180,94,'نَقْعًا: غبارًا',14,'#5A2E10','aq-fo',2.2)}`,
'فهيّجن بهذا العدْو غبارًا'),

/* ٥ فوسطن به جمعًا: توسّطن جموع الأعداء */
5:SC(5,'desert',
`${L.sand('#D9A866')}
${Array.from({length:4},(_,i)=>`${L.person(20+i*22,176,.8,'#3A2E2A')}${L.person(272+i*22,176,.8,'#3A2E2A')}`).join('')}
${gallop(herd(80,178,.9,'#5A3A22',2),.2,'112px','2.4s')}
${L.small(50,120,'جمع الأعداء',11,'#5A2E10','aq-fo',.4)}${L.small(306,120,'جمع الأعداء',11,'#5A2E10','aq-fo',.4)}
${L.text(180,70,'فَوَسَطْنَ بِهِ جَمْعًا',22,'#4A2A10','aq-fo',1.6)}
${L.small(180,94,'توسّطن جموع الأعداء',13,'#5A2E10','aq-fo',2.2)}`,
'فتوسّطن جموع الأعداء'),

/* ٦ إن الإنسان لربه لكنود: لِنعم ربه لجحود */
6:SC(6,'storm',
`${L.ground('#2A2630',172)}
${L.cloud(70,60,1,'#AAB4C2')}${L.rain(50,100,72,'#9FD3F0')}
${L.sun(300,64,16)}
${[[60,'#B8A05A'],[90,'#B8A05A']].map(([x,c])=>L.grain(x,172,.9,c)).join('')}${L.tree(300,172,.8,'#3E9457','#E86A8A','aq-sway')}
${L.person(180,172,1.3,'#0A0A14')}
${L.small(70,126,'نِعَم',12,'#FFE7A0','aq-fo',.4)}${L.small(300,126,'نِعَم',12,'#FFE7A0','aq-fo',.6)}
${L.text(180,108,'لَكَنُودٌ: جحودٌ لنعم ربه',18,'#FFF1C8','aq-fo',1.8)}`,
'إن الإنسان لنعم ربه لجحود'),

/* ٧ وإنه على ذلك لشهيد: مقرّ بجحوده */
7:SC(7,'storm',
`${L.ground('#2A2630',172)}
${L.person(120,172,1.3,'#0A0A14')}
${L.scroll(250,124,110,64,'aq-fo',.4)}
<path class="aq-draw" d="M214 150 l8 8 l16 -18" stroke="#B23A48" stroke-width="3.5" fill="none" stroke-linecap="round" style="animation-delay:2s"/>
${L.small(250,186,'يشهد على نفسه',12,'#FFE7A0','aq-fo',2.2)}
${L.text(180,66,'وَإِنَّهُ عَلَىٰ ذَٰلِكَ لَشَهِيدٌ',20,'#FFF1C8','aq-fo',1)}
${L.small(180,90,'مُقرٌّ بجحوده',14,'#FFE7A0','aq-fo',1.6)}`,
'وإنه بجحوده ذلك لمُقرّ'),

/* ٨ وإنه لحب الخير لشديد: لحب المال لشديد */
8:SC(8,'dusk',
`${L.ground('#4A3A30',172)}
${L.coins(240,170,9)}${L.coins(240,158,6)}${L.coins(240,148,3)}
${L.person(150,172,1.3,'#141018')}
${L.g('aq-pulse',.6,L.heart(160,132,1.4,'#E86A7A'))}
<path class="aq-draw" d="M168 132 Q200 120 226 146" stroke="#E8B84A" stroke-width="3" fill="none" stroke-dasharray="6 4" style="animation-delay:1s"/>
${L.text(180,66,'لِحُبِّ الْخَيْرِ لَشَدِيدٌ',22,'#FFF1C8','aq-fo',1.6)}
${L.small(180,90,'الخير هنا: المال',14,'#FFE7A0','aq-fo',2.2)}`,
'وإنه لحبّ المال لشديد'),

/* ٩ أفلا يعلم إذا بعثر ما في القبور: إذا أخرج الله الأموات للحساب */
9:SC(9,'plain',
`${L.ground('#2A2430',176)}
${[50,160,270].map((x,i)=>`<g class="aq-shake" style="animation-delay:${i*.2}s">${L.grave(x,180)}</g><g class="aq-rise" style="animation-delay:${1.2+i*.3}s">${L.person(x+30,176,.8,'#6A6478')}</g>`).join('')}
${L.text(180,70,'إِذَا بُعْثِرَ مَا فِي الْقُبُورِ',20,'#FFF1C8','aq-fo',.6)}
${L.small(180,94,'أُخرج الأموات من القبور للحساب',13,'#FFE7A0','aq-fo',1.6)}`,
'أفلا يعلم ما ينتظره إذا خرج الأموات للحساب؟'),

/* ١٠ وحصل ما في الصدور: استُخرج ما استتر في الصدور من خير أو شر */
10:SC(10,'plain',
`${L.ground('#2A2430',176)}
${[80,180,280].map((x,i)=>`${L.person(x,176,1.1,'#141826')}<circle class="aq-fly" cx="${x}" cy="140" r="7" fill="${i===1?'#5B4A6E':'#FFE7A0'}" style="--dy:-40px;animation-delay:${.6+i*.4}s;animation-duration:2s"/>`).join('')}
${L.small(80,84,'خير',12,'#FFE7A0','aq-fo',2.4)}${L.small(180,84,'شر',12,'#C8B8E0','aq-fo',2.6)}${L.small(280,84,'خير',12,'#FFE7A0','aq-fo',2.8)}
${L.text(180,58,'وَحُصِّلَ مَا فِي الصُّدُورِ',20,'#FFF1C8','aq-fo',1.4)}
${L.small(180,196,'ظهر ما كان مستترًا في القلوب',11,'#FFE7A0','aq-fo',3.2)}`,
'واستُخرج ما استتر في الصدور من خير أو شر'),

/* ١١ إن ربهم بهم يومئذ لخبير: لا يخفى عليه شيء */
11:SC(11,'teal',
`${pattern('aq-fo')}
${L.text(180,104,'إِنَّ رَبَّهُم بِهِمْ يَوْمَئِذٍ لَّخَبِيرٌ',20,'#FFF1C8','aq-fo',.4)}
${L.small(180,140,'لا يخفى عليه شيءٌ من أعمالهم',15,'#E6FFF2','aq-fo',1.6)}`,
'إن ربهم بهم وبأعمالهم يومئذ لخبير')
};
})();
