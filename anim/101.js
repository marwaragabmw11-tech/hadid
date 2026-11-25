/* سورة القارعة: مشهد متحرك لكل آية، على معنى التفسير الميسر.
   الناس رسوم ظلية بلا ملامح، والنار لهبٌ وحده. */
(function(){
'use strict';
const L=window.AAL;if(!L||!L.scene)return;
const A=window.AYAH_ANIM=window.AYAH_ANIM||{};
const SC=(id,bg,body,note,css)=>L.scene(101,id,bg,body,note,css);
const rings=(x,y,c='#FFE7A0',n=3)=>Array.from({length:n},(_,i)=>`<circle class="rg" cx="${x}" cy="${y}" r="20" fill="none" stroke="${c}" stroke-width="3" style="animation-delay:${i*.6}s"/>`).join('');
const ringCss='.rg{transform-box:fill-box;transform-origin:center;opacity:0;animation:rg 1.8s ease-out infinite}@keyframes rg{0%{opacity:.9;transform:scale(.4)}100%{opacity:0;transform:scale(5)}}';
const fireRow=(y=204,s=1)=>[20,70,120,170,220,270,320,350].map((x,i)=>L.fire(x,y,s*(i%2?1.15:1),i*.1)).join('');
// ميزان تميل كفّته: tilt سالب = ترجح الكفة اليمنى (الحسنات)
const balCss=(deg)=>`.bl{transform-box:view-box;transform-origin:180px 114px;animation:bl 2s .6s ease-in-out forwards}@keyframes bl{to{transform:rotate(${deg}deg)}}`;
const pans=(goodHeavy)=>`<g class="bl"><path d="M136 114 H224" stroke="#FFD36B" stroke-width="3"/>
<path d="M136 114 L124 138 M136 114 L148 138 M224 114 L212 138 M224 114 L236 138" stroke="#FFD36B" stroke-width="1.2"/>
<path d="M122 138 H150 Q136 148 122 138Z M210 138 H238 Q224 148 210 138Z" fill="#FFD36B"/>
${L.note(224,160,'الحسنات',11,'#E6FFF2')}${L.note(136,160,'السيئات',11,'#FFD9C0')}
${goodHeavy?`<circle cx="218" cy="134" r="4" fill="#7CE0A0"/><circle cx="226" cy="132" r="4" fill="#7CE0A0"/><circle cx="222" cy="127" r="4" fill="#7CE0A0"/><circle cx="136" cy="135" r="3" fill="#E86A5A"/>`:`<circle cx="224" cy="134" r="3" fill="#7CE0A0"/><circle cx="130" cy="134" r="4" fill="#E86A5A"/><circle cx="140" cy="133" r="4" fill="#E86A5A"/><circle cx="135" cy="127" r="4" fill="#E86A5A"/>`}</g>
<path d="M180 176 V114 M158 176 H202" stroke="#FFD36B" stroke-width="3"/>`;

A[101]={
/* ١ القارعة: الساعة التي تقرع قلوب الناس بأهوالها */
1:SC(1,'storm',
`<g class="aq-shake">${L.hills('#1A1C24')}</g>
${rings(180,112)}
${L.text(180,120,'الْقَارِعَةُ',34,'#FFF1C8','aq-pop',.3)}
${L.small(180,190,'الساعة تقرع القلوب بأهوالها',12,'#FFE7A0','aq-fo',1.4)}`,
'الساعة التي تقرع قلوب الناس بأهوالها',ringCss),

/* ٢ ما القارعة: أيّ شيء هذه القارعة؟ */
2:SC(2,'storm',
`${L.hills('#1A1C24')}${rings(180,110,'#FFB08A')}
${L.text(180,92,'مَا الْقَارِعَةُ',26,'#FFF1C8','aq-fo',.3)}
${L.text(180,150,'؟',40,'#FFB08A','aq-pop',1.2)}`,
'أيُّ شيء هذه القارعة؟',ringCss),

/* ٣ وما أدراك ما القارعة: وأيّ شيء أعلمك بها؟ */
3:SC(3,'dark',
`${L.stars(20,4,170)}
${L.text(180,100,'وَمَا أَدْرَاكَ مَا الْقَارِعَةُ',22,'#FFF1C8','aq-fo',.3)}
${L.small(180,130,'أيُّ شيءٍ أعلمك بها؟',14,'#FFE7A0','aq-fo',1.4)}
${L.text(180,176,'؟',30,'#FFB08A','aq-pop',2)}`,
'وأيُّ شيء أعلمك بها؟'),

/* ٤ يوم يكون الناس كالفراش المبثوث: في كثرتهم وتفرقهم وحركتهم */
4:SC(4,'plain',
`${L.ground('#1E1A2A',176)}
${Array.from({length:14},(_,i)=>L.moth(30+(i*53)%300,70+(i*37)%90,1,'#D9C9A8','mth',(i*.17).toFixed(2),{'--dx':`${(i%2?1:-1)*(12+i%5*6)}px`,'--dy':`${(i%3-1)*14}px`})).join('')}
${Array.from({length:9},(_,i)=>L.g('aq-drift',i*.2,L.person(24+i*40,176,.55+(i%3)*.08,'#0A0A14'),{'--dx':`${(i%2?1:-1)*22}px`})).join('')}
${L.text(180,64,'كَالْفَرَاشِ الْمَبْثُوثِ',22,'#FFF1C8','aq-fo',1.4)}
${L.small(180,196,'في كثرتهم وتفرّقهم وحركتهم',11,'#FFE7A0','aq-fo',2.2)}`,
'يكون الناس منتشرين كالفراش المتفرّق',
`.mth{animation:mth 1.6s ease-in-out infinite alternate}@keyframes mth{to{transform:translate(var(--dx),var(--dy))}}`),

/* ٥ وتكون الجبال كالعهن المنفوش: كالصوف الملوّن المنفوش فيصير هباء */
5:SC(5,'dusk',
`${L.g('aq-crumble',.6,L.mountain(110,176,160,100,'#6A5A6A'))}${L.g('aq-crumble',1,L.mountain(270,176,170,110,'#5A4A5A'))}
${Array.from({length:18},(_,i)=>`<circle class="aq-fly" cx="${60+(i*41)%250}" cy="${130+(i*17)%40}" r="${6+i%4*2}" fill="${['#E86A8A','#F2B33D','#7FB8D8','#B48AE8','#FFFFFF','#7CC48A'][i%6]}" opacity=".85" style="--dx:${(i%2?1:-1)*(20+(i*7)%40)}px;--dy:${-10-(i*13)%35}px;animation-delay:${(1.4+i*.08).toFixed(2)}s;animation-duration:3s"/>`).join('')}
${L.ground('#3A2E3A',176)}
${L.text(180,64,'كَالْعِهْنِ الْمَنفُوشِ',22,'#FFF1C8','aq-fo',2.2)}
${L.small(180,194,'كالصوف الملوّن يُنفش باليد',12,'#FFE7A0','aq-fo',2.8)}`,
'وتكون الجبال كالصوف الملوّن المنفوش'),

/* ٦ فأما من ثقلت موازينه: رجحت موازين حسناته */
6:SC(6,'teal',
`${L.ground('#163A39',176)}${pans(true)}
${L.text(180,66,'ثَقُلَتْ مَوَازِينُهُ',24,'#E6FFF2','aq-fo',2.4)}
${L.small(180,194,'رجحت حسناته',13,'#E6FFF2','aq-fo',3)}`,
'فأما من رجحت موازين حسناته',balCss(14)),

/* ٧ فهو في عيشة راضية: في حياة مرضية في الجنة */
7:SC(7,'garden',
`${L.grass('#7CC48A')}${L.river(186,'#7FD3F2')}
${L.tree(50,170,1.2,'#3E9457','#E86A8A','aq-grow',.2)}${L.tree(310,168,1.3,'#3E9457','#F2B33D','aq-grow',.4)}
${L.palm(250,172,.9,'aq-sway',0,true)}
${[90,130,170,210].map((x,i)=>L.flower(x,172,['#E86A8A','#F2B33D','#B48AE8'][i%3],'aq-grow',.8+i*.15)).join('')}
${L.text(180,70,'عِيشَةٍ رَّاضِيَةٍ',26,'#1E4A2A','aq-fo',1.2)}
${L.small(180,96,'حياةٌ مرضيّة في الجنة',14,'#1E4A2A','aq-fo',2)}`,
'فهو في حياة مرضيّة في الجنة'),

/* ٨ وأما من خفت موازينه: خفّت حسناته ورجحت سيئاته */
8:SC(8,'storm',
`${L.ground('#24222C',176)}${pans(false)}
${L.text(180,66,'خَفَّتْ مَوَازِينُهُ',24,'#FFF1C8','aq-fo',2.4)}
${L.small(180,194,'خفّت حسناته ورجحت سيئاته',13,'#FFE7A0','aq-fo',3)}`,
'وأما من خفّت موازين حسناته',balCss(-14)),

/* ٩ فأمه هاوية: مأواه جهنم */
9:SC(9,'dark',
`<path d="M0 120 H110 L130 200 H0Z M360 120 H250 L230 200 H360Z" fill="#1E1A24"/>
${L.glow(180,210,90,'#E2451E','aq-glow')}
${[150,180,210].map((x,i)=>L.fire(x,214,.6,i*.12)).join('')}
${L.text(180,70,'فَأُمُّهُ هَاوِيَةٌ',26,'#FFF1C8','aq-fo',.6)}
${L.small(180,96,'مأواه ومسكنه جهنّم',14,'#FFE7A0','aq-fo',1.6)}`,
'فمأواه جهنّم'),

/* ١٠ وما أدراك ما هيه: وما أدراك ما هذه الهاوية؟ */
10:SC(10,'dark',
`${L.glow(180,220,120,'#E2451E','aq-glow')}
${L.text(180,104,'وَمَا أَدْرَاكَ مَا هِيَهْ',24,'#FFF1C8','aq-fo',.3)}
${L.text(180,156,'؟',42,'#FFB08A','aq-pop',1.3)}`,
'وما أدراك ما هذه الهاوية؟'),

/* ١١ نار حامية: نار قد حميت من الوقود عليها */
11:SC(11,'hell',
`${fireRow(204,1.3)}${L.embers(10,190)}
${L.text(180,72,'نَارٌ حَامِيَةٌ',28,'#FFF1C8','aq-fo',.6)}
${L.small(180,98,'قد حَمِيَت من الوقود عليها',14,'#FFE7A0','aq-fo',1.6)}`,
'نارٌ قد حَمِيَت من الوقود عليها')
};
})();
