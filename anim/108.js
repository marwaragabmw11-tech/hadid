/* سورة الكوثر: مشهد متحرك لكل آية، على معنى التفسير الميسر.
   الخطاب للنبي ﷺ فلا يُرسم؛ يُعبَّر عنه بالمكان والكتابة. */
(function(){
'use strict';
const L=window.AAL;if(!L||!L.scene)return;
const A=window.AYAH_ANIM=window.AYAH_ANIM||{};
const SC=(id,bg,body,note,css)=>L.scene(108,id,bg,body,note,css);
// خيمة من لؤلؤ مجوّف
const pearl=(x,y,r=16)=>`<path d="M${x-r} ${y} A${r} ${r} 0 0 1 ${x+r} ${y}Z" fill="#F4F1EA"/><path d="M${x-r*.5} ${y-r*.55} A${r*.6} ${r*.6} 0 0 1 ${x+r*.2} ${y-r*.85}" stroke="#FFFFFF" stroke-width="2.5" fill="none" opacity=".9"/><path d="M${x-r*.3} ${y} A${r*.3} ${r*.45} 0 0 1 ${x+r*.3} ${y}Z" fill="#C9C2B6"/>`;
// كبش
const ram=(x,y,s=1)=>`<g transform="translate(${x} ${y}) scale(${s})"><path d="M-14 -10 V0 M-6 -10 V0 M8 -10 V0 M14 -10 V0" stroke="#3A3430" stroke-width="3"/>${[[-14,-18],[-4,-22],[6,-20],[-10,-12],[2,-12],[12,-14]].map(([a,b])=>`<circle cx="${a}" cy="${b}" r="8" fill="#EFE8DA"/>`).join('')}<ellipse cx="22" cy="-22" rx="7" ry="5" fill="#3A3430"/><path d="M18 -26 q6 -8 10 0" stroke="#8A7A6A" stroke-width="2.5" fill="none"/></g>`;
// سجادة صلاة عليها محراب
const rug=(x,y,w=70,h=100)=>`<rect x="${x-w/2}" y="${y-h}" width="${w}" height="${h}" rx="4" fill="#9A2A2A"/><rect x="${x-w/2+5}" y="${y-h+5}" width="${w-10}" height="${h-10}" rx="3" fill="none" stroke="#F2B33D" stroke-width="1.5"/><path d="M${x-w/2+14} ${y-14} V${y-h*.55} Q${x-w/2+14} ${y-h+18} ${x} ${y-h+12} Q${x+w/2-14} ${y-h+18} ${x+w/2-14} ${y-h*.55} V${y-14}Z" fill="#7A1E1E" stroke="#F2B33D" stroke-width="1.2"/>`;

A[108]={
/* ١ إنا أعطيناك الكوثر: الخير الكثير، ومنه نهر الكوثر في الجنة، حافتاه خيام اللؤلؤ المجوّف */
1:SC(1,'garden',
`${L.grass('#7CC48A')}
${L.tree(30,160,1.1,'#3E9457','#E86A8A')}${L.tree(330,158,1.2,'#3E9457','#F2B33D')}
${[60,120,180,240,300].map((x,i)=>L.g('aq-pop',.6+i*.25,pearl(x,166,15))).join('')}
${L.river(184,'#7FD3F2')}
${[48,96,150,212,264,318].map((x,i)=>L.flower(x,198,['#E86A8A','#F2B33D','#B48AE8'][i%3],'aq-grow',1.4+i*.1)).join('')}
${L.text(180,82,'الْكَوْثَرَ',30,'#1E4A2A','aq-fo',1.8)}
${L.small(180,108,'الخير الكثير، ومنه نهرٌ في الجنة',13,'#1E4A2A','aq-fo',2.6)}
${L.small(180,128,'حافتاه خيام اللؤلؤ المجوّف',12,'#2E6A3A','aq-fo',3.2)}`,
'أعطيناك الخير الكثير في الدنيا والآخرة'),

/* ٢ فصل لربك وانحر: أخلص صلاتك لربك، واذبح له وعلى اسمه وحده */
2:SC(2,'dawn',
`${L.ground('#5A4A3A',172)}
${L.g('aq-rise',.3,rug(260,170,70,92))}
${L.g('aq-rise',1.6,ram(90,170,1.4))}
<path d="M180 60 V196" stroke="#FFE7A0" stroke-width="1" stroke-dasharray="3 6" opacity=".5"/>
${L.text(260,64,'فَصَلِّ لِرَبِّكَ',19,'#FFF1C8','aq-fo',.9)}
${L.text(90,64,'وَانْحَرْ',22,'#FFF1C8','aq-fo',2.2)}
${L.small(90,90,'اذبح ذبيحتك على اسمه وحده',12,'#FFF6D8','aq-fo',2.8)}
${L.small(260,192,'أخلِص له صلاتك كلها',12,'#FFF6D8','aq-fo',1.5)}`,
'صلاتك كلها وذبيحتك لربك وحده'),

/* ٣ إن شانئك هو الأبتر: مبغضك هو المنقطع أثره، المقطوع من كل خير */
3:SC(3,'dusk',
`${L.sand('#7A5A3A')}
${L.glow(262,128,56,'#FFF1C2','aq-glow')}
${L.tree(262,170,1.9,'#3E9457','#F2B33D','aq-grow',.4)}
${L.small(262,192,'الهدى والنور يبقى ويمتد',12,'#FFF6D8','aq-fo',1.6)}
<g class="aq-dim" style="animation-delay:1.6s"><path d="M80 170 V140 L74 128 M80 148 L90 136" stroke="#5A3A22" stroke-width="7" stroke-linecap="round" fill="none"/><path d="M70 170 H92" stroke="#5A3A22" stroke-width="5"/></g>
${[0,1,2,3,4].map(i=>`<ellipse class="aq-out" cx="${100+i*14}" cy="${180+(i%2)*4}" rx="3" ry="5" fill="#4A3020" style="animation-delay:${1.8+i*.25}s"/>`).join('')}
${L.text(90,86,'الْأَبْتَرُ',26,'#FFF1C8','aq-fo',2.2)}
${L.small(90,112,'المنقطع أثره',13,'#FFE7A0','aq-fo',2.8)}`,
'مبغضك هو المقطوع من كل خير')
};
})();
