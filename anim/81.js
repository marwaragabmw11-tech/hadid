/* سورة التكوير: مشهد متحرك لكل آية، على معنى التفسير الميسر.
   لا يُرسم لله تعالى صورة ولا رمز، ولا يُرسم العرش. جبريل والملائكة نورٌ فقط.
   النبي ﷺ لا يُرسم. الموءودة لا تُرسم: يُشار إليها بزهرة صغيرة مضيئة.
   الناس رسوم ظلية بلا ملامح، والنار لهبٌ وحده. */
(function(){
'use strict';
const L=window.AAL;if(!L||!L.scene)return;
const A=window.AYAH_ANIM=window.AYAH_ANIM||{};
const SC=(id,bg,body,note,css)=>L.scene(81,id,bg,body,note,css);
const fireRow=(y=204,s=1)=>[20,70,120,170,220,270,320,350].map((x,i)=>L.fire(x,y,s*(i%2?1.15:1),i*.1)).join('');
const pattern=(cls)=>[[40,60],[320,60],[40,160],[320,160]].map(([x,y])=>L.star8(x,y,14,'#FFD36B',cls)).join('');
const star=(x,y,r,c='#FFF6D8')=>`<path d="M${x} ${y-r} L${x+r*.22} ${y-r*.22} L${x+r} ${y} L${x+r*.22} ${y+r*.22} L${x} ${y+r} L${x-r*.22} ${y+r*.22} L${x-r} ${y} L${x-r*.22} ${y-r*.22}Z" fill="${c}"/>`;
const fox=(x,y,s=1,c='#5A4A3A')=>`<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="-12" rx="16" ry="8" fill="${c}"/><path d="M-14 -4 V0 M-6 -4 V0 M6 -4 V0 M14 -4 V0" stroke="${c}" stroke-width="3"/><circle cx="16" cy="-18" r="6" fill="${c}"/><path d="M14 -24 l2 -6 l3 6 M18 -24 l3 -5 l2 6" fill="${c}"/><path d="M-16 -14 q-12 -2 -16 -12" stroke="${c}" stroke-width="4" fill="none" stroke-linecap="round"/></g>`;
const bk=(x,y,s=1)=>`<g transform="translate(${x} ${y}) scale(${s})"><rect x="-11" y="-14" width="22" height="28" rx="2" fill="#F7EFD9" stroke="#8A6A3A" stroke-width="1.5"/><path d="M-6 -6 H6 M-6 0 H6 M-6 6 H4" stroke="#8A6A3A" stroke-width="1.2"/></g>`;
const lightDesc=(x,y,r,dl=0,c='#EAF6FF')=>`<g class="aq-fly" style="--dx:0px;--dy:${y}px;animation-delay:${dl}s;animation-duration:2.6s">${L.glow(x,0,r,c)}</g>`;

A[81]={
/* ١ إذا الشمس كورت: لُفّت وذهب ضوؤها */
1:SC(1,'dusk',
`<rect class="dk" width="360" height="200" fill="#0A0A10" opacity="0"/>
<g class="sw">${L.sun(180,100,36)}</g>${L.hills('#1A1420')}
${L.text(180,174,'إِذَا الشَّمْسُ كُوِّرَتْ',22,'#FFF1C8','aq-fo',2)}
${L.small(180,196,'لُفّت وذهب ضوؤها',12,'#FFE7A0','aq-fo',2.6)}`,
'إذا الشمس لُفّت وذهب ضوؤها',
`.sw{transform-box:fill-box;transform-origin:center;animation:sw 3s .3s ease-in forwards}@keyframes sw{to{transform:scale(.15) rotate(540deg);opacity:.15}}
.dk{animation:dk 3s .3s forwards}@keyframes dk{to{opacity:.7}}`),

/* ٢ وإذا النجوم انكدرت: تناثرت فذهب نورها */
2:SC(2,'night',
`${Array.from({length:16},(_,i)=>`<g class="aq-fall" style="--dx:${(i%2?1:-1)*(10+i*3)}px;--dy:${120+i*4}px;--r:0deg;animation-delay:${(.3+i*.12).toFixed(2)}s">${star(20+(i*53)%330,30+(i*29)%90,4+(i%3))}</g>`).join('')}
${L.text(180,140,'وَإِذَا النُّجُومُ انكَدَرَتْ',22,'#FFF1C8','aq-fo',1.6)}
${L.small(180,166,'تناثرت فذهب نورها',13,'#FFE7A0','aq-fo',2.2)}`,
'وإذا النجوم تناثرت فذهب نورها'),

/* ٣ وإذا الجبال سيرت: سُيّرت فصارت غبارًا متطايرًا */
3:SC(3,'dusk',
`${L.g('aq-fly',.4,L.mountain(110,176,150,90,'#5A4A5A'),{'--dx':'-60px','--dy':'0px','animation-duration':'3s'})}${L.g('aq-fly',.6,L.mountain(270,176,160,100,'#4A3A4A'),{'--dx':'60px','--dy':'0px','animation-duration':'3s'})}
${Array.from({length:14},(_,i)=>`<circle class="aq-fly" cx="${60+(i*23)%240}" cy="${140+(i*13)%30}" r="${4+i%3}" fill="#B8A8A0" opacity=".7" style="--dx:${(i%2?1:-1)*30}px;--dy:-50px;animation-delay:${(1.6+i*.08).toFixed(2)}s"/>`).join('')}
${L.ground('#3A2E3A',176)}
${L.text(180,62,'وَإِذَا الْجِبَالُ سُيِّرَتْ',22,'#FFF1C8','aq-fo',1)}
${L.small(180,194,'سُيّرت عن وجه الأرض، فصارت غبارًا متطايرًا',12,'#FFE7A0','aq-fo',2.2)}`,
'وإذا الجبال سُيّرت فصارت غبارًا متطايرًا'),

/* ٤ وإذا العشار عطلت: النوق الحوامل تُركت وأُهملت */
4:SC(4,'dusk',
`${L.ground('#5A4A3A',176)}
${[90,180,270].map((x,i)=>L.camel(x,176,1,'#B8865A')).join('')}
<path d="M40 150 H320" stroke="#6A4A2A" stroke-width="2"/>${[40,120,200,280,320].map(x=>`<path d="M${x} 140 V176" stroke="#6A4A2A" stroke-width="3"/>`).join('')}
${L.g('aq-out',.6,L.person(330,176,1,'#141018'))}
${L.text(180,62,'وَإِذَا الْعِشَارُ عُطِّلَتْ',22,'#FFF1C8','aq-fo',1.4)}
${L.small(180,88,'النوق الحوامل تُركت وأُهملت',13,'#FFE7A0','aq-fo',2)}`,
'وإذا النوق الحوامل تُركت وأُهملت'),

/* ٥ وإذا الوحوش حشرت: جُمعت واختلطت ليُقتصّ لبعضها من بعض */
5:SC(5,'dusk',
`${L.ground('#5A4A3A',176)}
${L.g('aq-run',.2,fox(-20,176,1.2),{'--dx':'150px'})}${L.g('aq-run',.4,L.elephant(400,176,.6,'#6A6A72'),{'--dx':'-170px'})}
${L.g('aq-run',.6,fox(-60,170,.9,'#7A6A5A'),{'--dx':'170px'})}${L.g('aq-run',.3,L.horse(420,176,.7,'#4A2E1C'),{'--dx':'-150px'})}
${L.g('aq-fly',.5,L.bird(180,40,1.2,'#2A2A2A'),{'--dy':'40px'})}
${L.text(180,62,'وَإِذَا الْوُحُوشُ حُشِرَتْ',22,'#FFF1C8','aq-fo',1.6)}
${L.small(180,88,'جُمعت واختلطت؛ ليقتصّ الله لبعضها من بعض',12,'#FFE7A0','aq-fo',2.2)}`,
'وإذا الحيوانات الوحشية جُمعت واختلطت'),

/* ٦ وإذا البحار سجرت: أُوقدت فصارت نارًا تتوقد */
6:SC(6,'storm',
`${L.sea(140,'#2E7CB8')}
<g class="aq-fo" style="animation-delay:1s">${[30,80,130,180,230,280,330].map((x,i)=>L.fire(x,176,.8,i*.1)).join('')}</g>
<rect class="rd" x="0" y="130" width="360" height="70" fill="#E2451E" opacity="0"/>
${L.text(180,70,'وَإِذَا الْبِحَارُ سُجِّرَتْ',22,'#FFF1C8','aq-fo',.6)}
${L.small(180,96,'أُوقدت، فصارت على عِظمها نارًا تتوقّد',13,'#FFE7A0','aq-fo',1.6)}`,
'وإذا البحار أُوقدت فصارت نارًا تتوقد',
`.rd{animation:rd 2s 1s forwards}@keyframes rd{to{opacity:.55}}`),

/* ٧ وإذا النفوس زوجت: قُرنت بأمثالها ونظائرها */
7:SC(7,'dark',
`${L.ground('#1A1A24',176)}
${[[60,'#E6FFF2'],[60,'#E6FFF2'],[180,'#5B4A6E'],[180,'#5B4A6E'],[300,'#FFE7A0'],[300,'#FFE7A0']].map(([x,c],i)=>L.g('aq-run',.4,`${L.glow(i%2?x+60:x-60,124,10,c)}${L.person(i%2?x+60:x-60,176,.9,'#2B3A4F')}`,{'--dx':`${i%2?-46:46}px`,'animation-duration':'2s'})).join('')}
${L.text(180,62,'وَإِذَا النُّفُوسُ زُوِّجَتْ',22,'#FFF1C8','aq-fo',1.6)}
${L.small(180,88,'قُرنت كلُّ نفسٍ بأمثالها ونظائرها',13,'#FFE7A0','aq-fo',2.2)}`,
'وإذا النفوس قُرنت بأمثالها ونظائرها'),

/* ٨ وإذا الموءودة سئلت: الطفلة المدفونة حيّة تُسأل */
8:SC(8,'dawn',
`${L.ground('#5A4A5A',176)}
${L.g('aq-grow',.4,L.flower(180,176,'#F2B33D'))}${L.g('aq-glow',.8,L.glow(180,150,26,'#FFF1C2'))}
${L.text(180,64,'وَإِذَا الْمَوْءُودَةُ سُئِلَتْ',22,'#FFF1C8','aq-fo',1.2)}
${L.small(180,90,'الطفلة المدفونة حيّةً تُسأل يوم القيامة',13,'#FFE7A0','aq-fo',1.8)}
${L.small(180,194,'سؤالَ تطييبٍ لها، وتبكيتٍ لوائدها',12,'#FFF6D8','aq-fo',2.4)}`,
'وإذا الطفلة المدفونة حية سُئلت يوم القيامة'),

/* ٩ بأي ذنب قتلت */
9:SC(9,'dawn',
`${L.ground('#5A4A5A',176)}${L.flower(180,176,'#F2B33D')}${L.glow(180,150,26,'#FFF1C2','aq-glow')}
${L.text(180,96,'بِأَيِّ ذَنبٍ قُتِلَتْ',26,'#FFF1C8','aq-fo',.4)}
${L.text(180,130,'؟',32,'#FFD36B','aq-pop',1.4)}
${L.small(180,194,'لا ذنب لها',13,'#FFF6D8','aq-fo',2.2)}`,
'بأيّ ذنبٍ كان دفنها؟'),

/* ١٠ وإذا الصحف نشرت: عُرضت صحف الأعمال */
10:SC(10,'dark',
`${L.stars(14,10,80)}
${[70,180,290].map((x,i)=>L.scroll(x,130,96,60,'aq-pop',.3+i*.4)).join('')}
${L.text(180,62,'وَإِذَا الصُّحُفُ نُشِرَتْ',22,'#FFF1C8','aq-fo',1.6)}
${L.small(180,190,'عُرضت صحف الأعمال',13,'#FFE7A0','aq-fo',2.2)}`,
'وإذا صحف الأعمال عُرضت'),

/* ١١ وإذا السماء كشطت: قُلعت وأُزيلت من مكانها */
11:SC(11,'dark',
`<g class="pl"><rect x="0" y="0" width="360" height="200" fill="#2E5A8A"/>${L.stars(16,11,150)}${L.cloud(120,80,1.2,'#9FC3E0')}</g>
${L.hills('#141018')}
${L.text(180,100,'وَإِذَا السَّمَاءُ كُشِطَتْ',24,'#FFF1C8','aq-fo',2)}
${L.small(180,128,'قُلعت وأُزيلت من مكانها',14,'#FFE7A0','aq-fo',2.6)}`,
'وإذا السماء قُلعت وأُزيلت من مكانها',
`.pl{transform-origin:0 0;animation:pl 2.4s .4s ease-in forwards}@keyframes pl{to{transform:translate(-40px,-220px) rotate(-12deg)}}`),

/* ١٢ وإذا الجحيم سعرت: أُوقدت فأُضرمت */
12:SC(12,'hell',
`<g class="gr">${fireRow(204,1.3)}</g>${L.embers(12,190)}
${L.text(180,72,'وَإِذَا الْجَحِيمُ سُعِّرَتْ',24,'#FFF1C8','aq-fo',.8)}
${L.small(180,98,'أُوقدت فأُضرمت',14,'#FFE7A0','aq-fo',1.6)}`,
'وإذا النار أُوقدت فأُضرمت',
`.gr{transform-origin:180px 204px;transform:scaleY(.3);animation:gr 2s ease-out forwards}@keyframes gr{to{transform:none}}`),

/* ١٣ وإذا الجنة أزلفت: قُرّبت من أهلها المتقين */
13:SC(13,'garden',
`${L.grass('#7CC48A')}
<g class="nr">${L.gate(180,150,60,70,'#2E5A3A')}${L.tree(130,150,.7,'#3E9457','#F2B33D')}${L.tree(230,150,.7,'#3E9457','#E86A8A')}</g>
${L.people(3,40,26,180,.8,'#1E4A2A','person','',0,0)}
${L.text(180,62,'وَإِذَا الْجَنَّةُ أُزْلِفَتْ',22,'#1E4A2A','aq-fo',.6)}
${L.small(180,194,'قُرّبت دارُ النعيم من أهلها المتقين',12,'#1E4A2A','aq-fo',1.6)}`,
'وإذا الجنة قُرّبت من أهلها المتقين',
`.nr{transform-box:fill-box;transform-origin:50% 100%;transform:scale(.35);animation:nr 3s .3s ease-out forwards}@keyframes nr{to{transform:scale(1.15)}}`),

/* ١٤ علمت نفس ما أحضرت: تيقّنت كل نفس ما قدّمت من خير أو شر */
14:SC(14,'teal',
`${L.ground('#163A39',176)}${L.person(110,176,1.3,'#0B1D1F')}
${L.scroll(250,140,120,64,'aq-pop',.4)}
${[0,1,2].map(i=>`<circle class="aq-pop" cx="${216+i*34}" cy="128" r="7" fill="${i===1?'#5B4A6E':'#FFE7A0'}" style="animation-delay:${(1+i*.3).toFixed(1)}s"/>`).join('')}
${L.text(180,62,'عَلِمَتْ نَفْسٌ مَّا أَحْضَرَتْ',22,'#E6FFF2','aq-fo',1.6)}
${L.small(180,194,'تيقّنت كل نفس ما قدّمت من خير أو شر',12,'#E6FFF2','aq-fo',2.2)}`,
'إذا وقع ذلك، تيقّنت كل نفس ما قدّمت من خير أو شر'),

/* ١٥ فلا أقسم بالخنس: النجوم المختفية أنوارها نهارًا */
15:SC(15,'day',
`<rect class="nt" width="360" height="200" fill="#0B1024"/>
<g class="hd">${[[60,60],[140,40],[220,70],[300,50],[100,110],[260,120]].map(([x,y])=>star(x,y,6)).join('')}</g>
${L.g('aq-up',1.2,L.sun(300,90,22))}${L.hills('#7CC48A')}
${L.text(180,150,'فَلَا أُقْسِمُ بِالْخُنَّسِ',22,'#1E4A2A','aq-fo',1.8)}
${L.small(180,176,'النجوم المختفية أنوارها نهارًا',13,'#1E4A2A','aq-fo',2.4)}`,
'أقسم الله بالنجوم المختفية أنوارها نهارًا',
`.nt{animation:nt 2s .8s forwards}@keyframes nt{to{opacity:0}}.hd{animation:hd 2s .8s forwards}@keyframes hd{to{opacity:0}}`),

/* ١٦ الجوار الكنس: الجارية والمستترة في أبراجها */
16:SC(16,'night',
`${L.stars(14,16,170)}
${[[60,60],[180,40],[300,70]].map(([x,y],i)=>`<g class="aq-run" style="--dx:${60}px;animation-delay:${i*.3}s;animation-duration:2.6s"><g class="aq-out" style="animation-delay:${(2.2+i*.3).toFixed(1)}s">${L.glow(x,y,10,'#FFF6D8')}${star(x,y,7)}</g></g>`).join('')}
${L.text(180,120,'الْجَوَارِ الْكُنَّسِ',26,'#FFF1C8','aq-fo',.8)}
${L.small(180,148,'الجارية، والمستترة في أبراجها',14,'#FFE7A0','aq-fo',1.6)}`,
'النجوم الجارية والمستترة في أبراجها'),

/* ١٧ والليل إذا عسعس: إذا أقبل بظلامه */
17:SC(17,'dusk',
`${L.hills('#2A1E2A')}<rect class="sw" x="0" y="0" width="360" height="200" fill="#0B1024"/>
${L.g('aq-fo',1.8,L.stars(20,17,120))}
${L.text(180,96,'وَاللَّيْلِ إِذَا عَسْعَسَ',24,'#FFF1C8','aq-fo',2)}
${L.small(180,122,'إذا أقبل بظلامه',14,'#FFE7A0','aq-fo',2.6)}`,
'وأقسم بالليل إذا أقبل بظلامه',
`.sw{transform-origin:100% 0;transform:scaleX(0);opacity:.9;animation:sw 2.4s .3s ease-in-out forwards}@keyframes sw{to{transform:scaleX(1)}}`),

/* ١٨ والصبح إذا تنفس: إذا ظهر ضياؤه */
18:SC(18,'night',
`<rect class="fj" x="0" y="0" width="360" height="200" fill="#F7B267" opacity="0"/>
${L.stars(20,18,110)}${L.hills('#141A2E')}
<g class="aq-up" style="animation-delay:.6s;animation-duration:3s">${L.glow(180,186,80,'#FFD9A0')}</g>
${L.text(180,96,'وَالصُّبْحِ إِذَا تَنَفَّسَ',24,'#FFF1C8','aq-fo',1.4)}
${L.small(180,122,'إذا ظهر ضياؤه',14,'#FFE7A0','aq-fo',2)}`,
'وأقسم بالصبح إذا ظهر ضياؤه',
`.fj{animation:fj 4s .6s ease-in forwards}@keyframes fj{to{opacity:.4}}`),

/* ١٩ إنه لقول رسول كريم: تبليغ جبريل عليه السلام — نورٌ فقط */
19:SC(19,'night',
`${L.stars(20,19,180)}${lightDesc(180,100,30,.2,'#FFFFFF')}
${L.g('aq-fo',1.8,L.book(180,170,70))}
${L.text(180,62,'إِنَّهُ لَقَوْلُ رَسُولٍ كَرِيمٍ',22,'#FFF1C8','aq-fo',1)}
${L.small(180,86,'القرآن تبليغُ رسولٍ كريم: جبريل عليه السلام',12,'#FFE7A0','aq-fo',1.8)}`,
'إن القرآن لتبليغ رسول كريم، هو جبريل عليه السلام'),

/* ٢٠ ذي قوة عند ذي العرش مكين — نورٌ وكتابة فقط */
20:SC(20,'night',
`${L.stars(20,20,180)}<g class="aq-pulse">${L.glow(180,120,40,'#FFFFFF')}</g>
${L.text(180,62,'ذِي قُوَّةٍ عِندَ ذِي الْعَرْشِ مَكِينٍ',19,'#FFF1C8','aq-fo',.6)}
${L.small(180,180,'ذو قوةٍ في تنفيذ ما يُؤمر به، ذو مكانةٍ رفيعة عند الله',11,'#FFE7A0','aq-fo',1.4)}${L.small(180,96,'جبريل عليه السلام',12,'#FFF6D8','aq-fo',.8)}`,
'ذي قوة في تنفيذ ما يؤمر به، صاحب مكانة رفيعة عند الله'),

/* ٢١ مطاع ثم أمين: تطيعه الملائكة، مؤتمن على الوحي */
21:SC(21,'night',
`${L.stars(16,21,180)}${L.glow(180,100,26,'#FFFFFF','aq-glow')}
${[60,110,250,300].map((x,i)=>`<g class="aq-fly" style="--dx:${(180-x)*.4}px;--dy:-10px;animation-delay:${(.4+i*.2).toFixed(1)}s">${L.glow(x,140,9,'#EAF6FF')}</g>`).join('')}
${L.g('aq-fo',1.6,L.book(180,170,50))}
${L.text(180,62,'مُّطَاعٍ ثَمَّ أَمِينٍ',24,'#FFF1C8','aq-fo',1)}
${L.small(300,190,'تطيعه الملائكة',11,'#FFE7A0','aq-fo',1.8)}${L.small(70,190,'مؤتمنٌ على الوحي',11,'#FFE7A0','aq-fo',2.2)}`,
'تطيعه الملائكة، مؤتمن على الوحي الذي ينزل به'),

/* ٢٢ وما صاحبكم بمجنون */
22:SC(22,'teal',
`${pattern('aq-fo')}
${L.text(180,96,'وَمَا صَاحِبُكُم بِمَجْنُونٍ',24,'#FFF1C8','aq-fo',.4)}
${L.small(180,128,'وما محمدٌ ﷺ الذي تعرفونه بمجنون',14,'#E6FFF2','aq-fo',1.4)}`,
'وما محمد ﷺ الذي تعرفونه بمجنون'),

/* ٢٣ ولقد رآه بالأفق المبين: رأى جبريل على صورته في الأفق من ناحية المشرق — نورٌ فقط */
23:SC(23,'dawn',
`<path d="M20 200 L120 96 L150 112 L190 80 L280 200Z" fill="#2A2E3E"/>
<path d="M156 150 Q166 136 178 150 V162 H156Z" fill="#0A0C14"/>${L.small(167,176,'غار حراء',10,'#FFF6D8','aq-fo',.4)}
<g class="aq-grow" style="animation-delay:.8s;animation-duration:2s">${L.glow(300,96,56,'#FFFFFF')}</g>
${L.text(180,58,'وَلَقَدْ رَآهُ بِالْأُفُقِ الْمُبِينِ',20,'#FFF1C8','aq-fo',1.6)}
${L.small(300,164,'جبريل عليه السلام',11,'#FFF6D8','aq-fo',2.2)}${L.small(270,194,'في الأفق من ناحية المشرق',11,'#FFF6D8','aq-fo',2.6)}`,
'ولقد رأى محمد ﷺ جبريل على صورته في الأفق العظيم'),

/* ٢٤ وما هو على الغيب بضنين: ليس ببخيل في تبليغ الوحي */
24:SC(24,'teal',
`${L.ground('#163A39',176)}${L.glow(180,128,40,'#E6FFF2','aq-glow')}${L.book(180,146,70)}
${[0,1,2,3,4,5,6].map(i=>{const a=(-160+i*23.3)*Math.PI/180;return `<path class="aq-draw" d="M${(180+Math.cos(a)*44).toFixed(0)} ${(120+Math.sin(a)*34).toFixed(0)} L${(180+Math.cos(a)*90).toFixed(0)} ${(120+Math.sin(a)*70).toFixed(0)}" stroke="#E6FFF2" stroke-width="2" style="animation-delay:${(.6+i*.12).toFixed(2)}s"/>`}).join('')}
${L.text(180,62,'وَمَا هُوَ عَلَى الْغَيْبِ بِضَنِينٍ',20,'#E6FFF2','aq-fo',1.4)}
${L.small(180,194,'وما محمدٌ ﷺ ببخيلٍ في تبليغ الوحي',12,'#E6FFF2','aq-fo',2)}`,
'وما محمد ﷺ ببخيل في تبليغ الوحي'),

/* ٢٥ وما هو بقول شيطان رجيم: بل هو كلام الله ووحيه */
25:SC(25,'teal',
`${L.ground('#163A39',176)}${L.glow(270,124,36,'#E6FFF2','aq-glow')}${L.book(270,142,60)}
${L.g('aq-pop',.6,`<rect x="40" y="110" width="130" height="34" rx="12" fill="#FFFFFF" opacity=".85"/>${L.note(105,132,'قول شيطان',14,'#6A5A6A')}`)}
<path class="aq-draw" d="M44 110 L166 144 M166 110 L44 144" stroke="#E2451E" stroke-width="3.5" stroke-linecap="round" style="animation-delay:1.2s"/>
${L.text(180,62,'وَمَا هُوَ بِقَوْلِ شَيْطَانٍ رَّجِيمٍ',20,'#E6FFF2','aq-fo',1.6)}
${L.small(270,194,'بل هو كلام الله ووحيه',12,'#E6FFF2','aq-fo',2.2)}`,
'وما القرآن بقول شيطان رجيم، بل هو كلام الله'),

/* ٢٦ فأين تذهبون: أين تذهب بكم عقولكم في التكذيب؟ */
26:SC(26,'storm',
`${L.ground('#24222C',176)}
${[[-60,'-20px'],[0,'40px'],[60,'-40px']].map(([d,dx],i)=>L.g('aq-run',.4+i*.2,L.person(180+d,176,1,'#0A0A14'),{'--dx':dx,'animation-duration':'2.4s'})).join('')}
${L.text(90,120,'؟',28,'#FFB08A','aq-pop',1.4)}${L.text(280,114,'؟',32,'#FFB08A','aq-pop',1.8)}
${L.text(180,62,'فَأَيْنَ تَذْهَبُونَ',26,'#FFF1C8','aq-fo',.8)}
${L.small(180,194,'أين تذهب بكم عقولكم في التكذيب بعد هذه الحجج؟',11,'#FFE7A0','aq-fo',2.2)}`,
'فأين تذهب بكم عقولكم في التكذيب بالقرآن؟'),

/* ٢٧ إن هو إلا ذكر للعالمين: موعظة لجميع الناس */
27:SC(27,'teal',
`${L.ground('#163A39',176)}${L.glow(180,110,40,'#E6FFF2','aq-glow')}${L.book(180,126,60)}
${[30,80,280,330].map((x,i)=>`${L.person(x,176,.8,'#0B1D1F')}<path class="aq-draw" d="M180 126 Q${(180+x)/2} ${110} ${x} 140" stroke="#E6FFF2" stroke-width="1.5" stroke-dasharray="4 4" fill="none" style="animation-delay:${(.6+i*.3).toFixed(1)}s"/>`).join('')}
${L.text(180,62,'إِنْ هُوَ إِلَّا ذِكْرٌ لِّلْعَالَمِينَ',22,'#E6FFF2','aq-fo',1.6)}
${L.small(180,194,'موعظةٌ من الله لجميع الناس',12,'#E6FFF2','aq-fo',2.2)}`,
'ما هو إلا موعظة من الله لجميع الناس'),

/* ٢٨ لمن شاء منكم أن يستقيم: على الحق والإيمان */
28:SC(28,'dawn',
`<path d="M150 200 L176 100 H184 L210 200Z" fill="#E8C98A"/>${L.ground('#4A4A5A',200)}
${L.glow(180,96,30,'#FFF1C2','aq-glow')}
${L.g('aq-fly',.4,L.person(180,196,.9,'#141826'),{'--dx':'0px','--dy':'-56px','animation-duration':'3s'})}
${L.text(180,60,'لِمَن شَاءَ مِنكُمْ أَن يَسْتَقِيمَ',20,'#FFF1C8','aq-fo',1)}
${L.small(290,150,'على الحق والإيمان',12,'#FFF6D8','aq-fo',1.8)}`,
'لمن شاء منكم أن يستقيم على الحق والإيمان'),

/* ٢٩ وما تشاءون إلا أن يشاء الله رب العالمين */
29:SC(29,'dark',
`${L.stars(26,29,190)}${pattern('aq-fo')}
${L.text(180,94,'وَمَا تَشَاءُونَ إِلَّا أَن يَشَاءَ اللَّهُ',22,'#FFF1C8','aq-fo',.4)}
${L.text(180,126,'رَبُّ الْعَالَمِينَ',22,'#FFE7A0','aq-fo',1.2)}
${L.small(180,156,'لا تقدرون على الاستقامة إلا بمشيئة الله',13,'#E6FFF2','aq-fo',2)}`,
'وما تشاءون الاستقامة إلا بمشيئة الله رب العالمين')
};
})();
