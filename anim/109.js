/* سورة الكافرون: مشهد متحرك لكل آية، على معنى التفسير الميسر.
   المخاطِب هو النبي ﷺ فلا يُرسم؛ يُشار إلى عبادته بالمحراب والكتابة.
   لا يُرسم لله تعالى صورة ولا رمز. الأصنام حجارة بلا وجوه، والناس رسوم ظلية بلا ملامح. */
(function(){
'use strict';
const L=window.AAL;if(!L||!L.scene)return;
const A=window.AYAH_ANIM=window.AYAH_ANIM||{};
const SC=(id,bg,body,note,css)=>L.scene(109,id,bg,body,note,css);
// أصنام: كتل حجرية بلا وجوه
const idols=(x,y,s=1,c='#7A7068')=>`<g transform="translate(${x} ${y}) scale(${s})">${[[-26,34,14],[0,48,18],[26,30,13]].map(([dx,h,w])=>`<rect x="${dx-w/2}" y="${-h}" width="${w}" height="${h}" rx="4" fill="${c}"/><rect x="${dx-w/2-3}" y="-6" width="${w+6}" height="6" fill="#4A443E"/>`).join('')}</g>`;
// محراب يتدلّى فيه قنديل
const mihrab=(x,y,s=1,cls='aq-glow')=>`<g transform="translate(${x} ${y}) scale(${s})"><path d="M-32 0 V-58 Q-32 -90 0 -102 Q32 -90 32 -58 V0Z" fill="#1B4A48"/><path d="M-22 0 V-56 Q-22 -80 0 -90 Q22 -80 22 -56 V0Z" fill="#CFF5E0" opacity=".16"/><path d="M0 -88 V-62" stroke="#C9A23A" stroke-width="1.2"/></g>${L.lamp(x,y-56*s,cls)}`;
const crowd=(n,x0,gap,y,s=1,c='#141826',dl=.2)=>L.people(n,x0,gap,y,s,c,'person','aq-rise',dl,.12);

A[109]={
/* ١ قل يا أيها الكافرون: قل -أيها الرسول- للذين كفروا بالله */
1:SC(1,'dusk',
`${L.sand('#8A6A4A')}${idols(300,168,1,'#6A6058')}
${crowd(5,190,22,170,.9,'#1A1620',.2)}
${[0,1,2].map(i=>`<path class="aq-fo" d="M${110+i*16} ${100-i*10} Q${124+i*20} 128 ${110+i*16} ${156+i*10}" stroke="#FFE7A0" stroke-width="2.5" fill="none" opacity=".8" style="animation-delay:${.9+i*.35}s"/>`).join('')}
${L.text(70,124,'قُلْ',40,'#FFF1C8','aq-pop',.4)}
${L.small(70,152,'أيها الرسول',12,'#FFF6D8','aq-fo',.8)}
${L.text(210,92,'يَا أَيُّهَا الْكَافِرُونَ',18,'#FFF1C8','aq-fo',2)}`,
'قل للذين كفروا بالله ورسوله: يا أيها الكافرون'),

/* ٢ لا أعبد ما تعبدون: لا أعبد الأصنام والآلهة الزائفة */
2:SC(2,'storm',
`${L.ground('#2A2630',172)}${idols(180,172,1.6,'#6A6058')}
<path class="aq-draw" d="M120 70 L240 172" stroke="#E2451E" stroke-width="7" stroke-linecap="round" style="animation-delay:1s"/>
<path class="aq-draw" d="M240 70 L120 172" stroke="#E2451E" stroke-width="7" stroke-linecap="round" style="animation-delay:1.5s"/>
${L.text(70,110,'لَا',40,'#FFD9A0','aq-pop',.5)}
${L.text(300,110,'أَعْبُدُ',24,'#FFF1C8','aq-fo',.9)}
${L.small(180,192,'أصنامٌ وآلهةٌ زائفة',12,'#FFE7A0','aq-fo',2.4)}`,
'لا أعبد ما تعبدون من الأصنام والآلهة الزائفة'),

/* ٣ ولا أنتم عابدون ما أعبد: لا تعبدون الإله الواحد، الله رب العالمين */
3:SC(3,'teal',
`${L.stars(10,4,70)}${L.ground('#163A39',172)}
${mihrab(250,172,1)}
${L.text(250,58,'إلهٌ واحد',15,'#FFF1C8','aq-fo',.8)}
${L.small(250,186,'المستحق وحده للعبادة',11,'#E6FFF2','aq-fo',1.4)}
${L.g('aq-run',1.8,crowd(4,120,22,172,.9,'#0B1D1F',0),{'--dx':'-110px'})}
${L.text(110,74,'وَلَا أَنتُمْ عَابِدُونَ',18,'#E6FFF2','aq-fo',2.4)}`,
'ولا أنتم تعبدون الإله الواحد، الله ربَّ العالمين'),

/* ٤ ولا أنا عابد ما عبدتم: طريقان لا يلتقيان */
4:SC(4,'dusk',
`${L.sand('#7A5A3A')}
<path class="aq-draw" d="M180 196 Q170 160 80 128" stroke="#5A4A42" stroke-width="10" fill="none" stroke-linecap="round"/>
<path class="aq-draw" d="M180 196 Q190 160 280 128" stroke="#E8C98A" stroke-width="10" fill="none" stroke-linecap="round" style="animation-delay:.4s"/>
${L.g('aq-dim',2,idols(70,126,.8,'#6A6058'))}
${L.g('aq-fo',1.2,mihrab(290,128,.65))}
${L.text(180,86,'وَلَا أَنَا عَابِدٌ مَّا عَبَدتُّمْ',18,'#FFF1C8','aq-fo',2.4)}
${L.small(70,150,'ما عبدتم',12,'#FFE7A0','aq-fo',1.6)}`,
'ولا أنا عابد ما عبدتم من الأصنام والآلهة الباطلة'),

/* ٥ ولا أنتم عابدون ما أعبد: ولن تعبدوه مستقبلًا؛ في أناس علم الله أنهم لا يؤمنون */
5:SC(5,'plain',
`${L.ground('#1E1A2A',172)}
${crowd(4,52,22,172,.9,'#0A0A14',.2)}
<ellipse class="aq-fo" cx="85" cy="150" rx="58" ry="34" fill="none" stroke="#5B4A6E" stroke-width="3" style="animation-delay:1s"/>
${mihrab(306,172,.8)}
<path class="aq-draw" d="M150 182 H262" stroke="#FFE7A0" stroke-width="2" stroke-dasharray="6 6" style="animation-delay:1.4s"/>
${L.small(206,196,'مستقبلًا',11,'#FFE7A0','aq-fo',1.6)}
${L.text(180,74,'وَلَا أَنتُمْ عَابِدُونَ مَا أَعْبُدُ',18,'#FFF1C8','aq-fo',2.2)}
${L.small(180,98,'في أناسٍ علم الله أنهم لا يؤمنون أبدًا',12,'#FFE7A0','aq-fo',3)}`,
'ولن تعبدوا مستقبلًا ما أعبد'),

/* ٦ لكم دينكم ولي دين: لكم دينكم الذي أصررتم عليه، ولي ديني لا أبغي غيره */
6:SC(6,'night',
`${L.stars(14,8,90)}${L.ground('#1A1E2C',172)}
${L.g('aq-dim',2.2,idols(90,172,1,'#6A6058'))}
${mihrab(270,172,.95)}
<path class="aq-draw" d="M180 50 V196" stroke="#FFE7A0" stroke-width="2.5" style="animation-delay:.4s"/>
${L.text(90,80,'لَكُمْ دِينُكُمْ',20,'#D8D2E8','aq-fo',1.2)}
${L.text(270,80,'وَلِيَ دِينِ',20,'#FFF1C8','aq-fo',2)}
${L.small(270,192,'لا أبغي غيره',12,'#FFE7A0','aq-fo',2.8)}`,
'لكم دينكم، ولي ديني الذي لا أبغي غيره')
};
})();
