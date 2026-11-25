/* سورة الهمزة: مشهد متحرك لكل آية، على معنى التفسير الميسر.
   الناس رسوم ظلية بلا ملامح، ولا يُرسم شيء مؤلم: النار تُعرض لهبًا وحده. */
(function(){
'use strict';
const L=window.AAL;if(!L||!L.scene)return;
const A=window.AYAH_ANIM=window.AYAH_ANIM||{};
const SC=(id,bg,body,note,css)=>L.scene(104,id,bg,body,note,css);
const stack=(x,y,n,dl=0)=>Array.from({length:n},(_,i)=>`<g class="aq-pop" style="animation-delay:${(dl+i*.18).toFixed(2)}s"><ellipse cx="${x}" cy="${y-i*5}" rx="11" ry="4" fill="#E8B84A" stroke="#B8862A" stroke-width="1"/></g>`).join('');
const hourglass=(x,y,s=1)=>`<g transform="translate(${x} ${y}) scale(${s})"><path d="M-16 -40 H16 M-16 0 H16" stroke="#C9A23A" stroke-width="3"/><path d="M-13 -38 Q-13 -24 0 -20 Q13 -24 13 -38Z M-13 -2 Q-13 -16 0 -20 Q13 -16 13 -2Z" fill="#E8EEF5" opacity=".35" stroke="#E8EEF5" stroke-width="1.2"/></g>`;
const fireRow=(y=200,s=1)=>[20,70,120,170,220,270,320,350].map((x,i)=>L.fire(x,y,s*(i%2?1.15:1),i*.1)).join('');

A[104]={
/* ١ ويل لكل همزة لمزة: شر وهلاك لكل مغتاب للناس، طعّان فيهم */
1:SC(1,'plain',
`${L.ground('#1E1A2A',172)}
${L.person(70,172,1.1,'#0A0A14')}${L.person(104,172,1.1,'#0A0A14')}
${[0,1,2].map(i=>L.wisp(`M120 ${128+i*6} Q180 ${100+i*14} 250 ${126+i*6}`,'aq-draw',.6+i*.4)).join('')}
${L.person(280,172,1.1,'#2B3A4F')}
${[0,1,2].map(i=>`<path class="aq-pop" d="M${240+i*6} ${118+i*10} l8 4 l-8 4" fill="#E86A7A" style="animation-delay:${1.6+i*.3}s"/>`).join('')}
${L.text(180,72,'هُمَزَةٍ لُّمَزَةٍ',24,'#FFF1C8','aq-fo',1.8)}
${L.small(180,96,'مغتابٌ للناس، طعّانٌ فيهم',13,'#FFE7A0','aq-fo',2.6)}
${L.small(180,192,'وَيْل: شرٌّ وهلاك',12,'#FFB08A','aq-fo',3.2)}`,
'شرٌّ وهلاك لكل مغتاب للناس، طعّان فيهم'),

/* ٢ الذي جمع مالًا وعدده: همّه جمع المال وتعداده */
2:SC(2,'dusk',
`${L.ground('#4A3A30',172)}
${L.person(70,172,1.25,'#141018')}
${stack(130,170,6,.3)}${stack(170,170,9,.8)}${stack(210,170,12,1.4)}${stack(250,170,15,2)}
${['١','٢','٣','٤'].map((n,i)=>L.small(130+i*40,186+(i%2?0:0),n,12,'#FFE7A0','aq-fo',.6+i*.6)).join('')}
${L.text(200,66,'جَمَعَ مَالًا وَعَدَّدَهُ',22,'#FFF1C8','aq-fo',2.6)}`,
'همّه جمع المال وعدّه'),

/* ٣ يحسب أن ماله أخلده: يظن أن ماله يضمن له الخلود والإفلات من الحساب */
3:SC(3,'dusk',
`${L.ground('#4A3A30',172)}
${L.coins(150,170,9)}${L.coins(150,158,6)}
${L.person(150,150,1.1,'#141018')}
${L.g('aq-pop',.6,`<ellipse cx="96" cy="86" rx="40" ry="18" fill="#FFFFFF" opacity=".85"/><circle cx="128" cy="108" r="4" fill="#FFFFFF" opacity=".85"/>${L.note(96,91,'سأبقى أبدًا',13,'#3A2A20')}`)}
${hourglass(280,172,1.6)}
<rect class="tp" x="270" y="114" width="20" height="18" fill="#E8B84A"/><rect class="bt" x="270" y="152" width="20" height="18" fill="#E8B84A"/>
<path class="aq-flow" d="M280 140 V168" stroke="#E8B84A" stroke-width="2"/>
${L.text(232,72,'يَحْسَبُ أَنَّ مَالَهُ أَخْلَدَهُ',17,'#FFF1C8','aq-fo',2.4)}`,
'يظن أن ماله يضمن له الخلود والنجاة من الحساب',
`.tp{transform-box:fill-box;transform-origin:50% 100%;animation:tp 4s .5s linear forwards}@keyframes tp{to{transform:scaleY(0)}}
.bt{transform-box:fill-box;transform-origin:50% 100%;transform:scaleY(0);animation:bt 4s .5s linear forwards}@keyframes bt{to{transform:scaleY(1)}}`),

/* ٤ كلا لينبذن في الحطمة: ليُطرحنّ في النار التي تهشّم كل ما يُلقى فيها */
4:SC(4,'hell',
`${fireRow(204,.9)}
${L.g('aq-fall',.6,L.coins(120,70,5),{'--dx':'10px','--dy':'110px','--r':'20deg'})}
${L.g('aq-fall',1,`<rect x="220" y="56" width="34" height="24" rx="3" fill="#8A5A3A" stroke="#C9A23A" stroke-width="2"/>`,{'--dx':'-6px','--dy':'110px','--r':'-30deg'})}
${L.text(180,100,'كَلَّا',22,'#FFD9A0','aq-pop',.3)}
${L.text(180,128,'الْحُطَمَةِ: تُحطّم كلّ ما يُلقى فيها',16,'#FFF1C8','aq-fo',1.8)}`,
'ليس الأمر كما ظنّ؛ ليُطرحنّ في الحطمة'),

/* ٥ وما أدراك ما الحطمة: وما أدراك ما حقيقة هذه النار؟ */
5:SC(5,'dark',
`${L.glow(180,200,120,'#E2451E','aq-glow')}
${L.text(180,108,'وَمَا أَدْرَاكَ مَا الْحُطَمَةُ',22,'#FFF1C8','aq-fo',.4)}
${L.text(180,160,'؟',44,'#FFB08A','aq-pop',1.4)}`,
'وما أدراك ما حقيقة هذه النار؟'),

/* ٦ نار الله الموقدة: المشتعلة الشديدة اللهب */
6:SC(6,'hell',
`${fireRow(204,1.25)}${L.embers(10,190)}
${L.text(180,76,'نَارُ اللَّهِ الْمُوقَدَةُ',24,'#FFF1C8','aq-fo',.6)}
${L.small(180,100,'المشتعلة الشديدة اللهب',14,'#FFE7A0','aq-fo',1.6)}`,
'نار الله المشتعلة الشديدة اللهب'),

/* ٧ التي تطلع على الأفئدة: من شدة حرّها تنفذ من الأجسام إلى القلوب */
7:SC(7,'hell',
`${fireRow(210,.8)}
${L.g('aq-pulse',0,L.heart(180,140,3.2,'#B23A48'))}
${[0,1,2,3,4,5].map(i=>{const a=i*60*Math.PI/180,x0=180+Math.cos(a)*90,y0=140+Math.sin(a)*52,x1=180+Math.cos(a)*36,y1=140+Math.sin(a)*24;return `<path class="aq-draw" d="M${x0.toFixed(0)} ${y0.toFixed(0)} L${x1.toFixed(0)} ${y1.toFixed(0)}" stroke="#FFB347" stroke-width="3" stroke-linecap="round" style="animation-delay:${.4+i*.2}s"/>`}).join('')}
${L.text(180,66,'تَطَّلِعُ عَلَى الْأَفْئِدَةِ',22,'#FFF1C8','aq-fo',1.6)}`,
'من شدة حرّها تنفذ إلى القلوب'),

/* ٨ إنها عليهم مؤصدة: مطبقة مغلقة عليهم */
8:SC(8,'hell',
`${fireRow(204,1)}
<rect class="lt" x="0" y="100" width="180" height="100" fill="#2A1A14" fill-opacity=".9" stroke="#5A3A22" stroke-width="3"/>
<rect class="rt" x="180" y="100" width="180" height="100" fill="#2A1A14" fill-opacity=".9" stroke="#5A3A22" stroke-width="3"/>
${L.text(180,76,'مُؤْصَدَةٌ: مُطبَقةٌ عليهم',20,'#FFF1C8','aq-fo',2.4)}`,
'إنها مُطبَقة عليهم مغلقة',
`.lt{transform:translateX(-180px);animation:cl 1.6s .6s ease-in forwards}.rt{transform:translateX(180px);animation:cl 1.6s .6s ease-in forwards}@keyframes cl{to{transform:none}}`),

/* ٩ في عمد ممددة: في سلاسل وأغلال مطوّلة لئلا يخرجوا منها */
9:SC(9,'hell',
`${fireRow(210,.8)}
${L.columns(60,176,6,48,84,'#4A3A34','aq-rise',.2)}
${L.chain(0,108,360,108)}${L.chain(0,130,360,130)}
${L.text(180,62,'فِي عَمَدٍ مُّمَدَّدَةٍ',22,'#FFF1C8','aq-fo',1.4)}`,
'في سلاسل وأغلال مطوّلة لئلا يخرجوا منها')
};
})();
