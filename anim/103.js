/* سورة العصر: مشهد متحرك لكل آية، على معنى التفسير الميسر.
   الناس رسوم ظلية بلا ملامح. */
(function(){
'use strict';
const L=window.AAL;if(!L||!L.scene)return;
const A=window.AYAH_ANIM=window.AYAH_ANIM||{};
const SC=(id,bg,body,note,css)=>L.scene(103,id,bg,body,note,css);
const hourglass=(x,y,s=1)=>`<g transform="translate(${x} ${y}) scale(${s})"><path d="M-16 -40 H16 M-16 0 H16" stroke="#C9A23A" stroke-width="3"/><path d="M-13 -38 Q-13 -24 0 -20 Q13 -24 13 -38Z M-13 -2 Q-13 -16 0 -20 Q13 -16 13 -2Z" fill="#E8EEF5" opacity=".35" stroke="#E8EEF5" stroke-width="1.2"/></g>`;
const sand=(x,y,s,dl=0)=>`<rect class="tp" x="${x-10*s}" y="${y-36*s}" width="${20*s}" height="${14*s}" fill="#E8B84A" style="animation-delay:${dl}s"/><rect class="bt" x="${x-10*s}" y="${y-14*s}" width="${20*s}" height="${13*s}" fill="#E8B84A" style="animation-delay:${dl}s"/><path class="aq-flow" d="M${x} ${y-20*s} V${y-2*s}" stroke="#E8B84A" stroke-width="2"/>`;
const py=x=>{const q=(a,b,c,t)=>(1-t)*(1-t)*a+2*t*(1-t)*b+t*t*c;if(x<=220){let t=x/220;return q(118,130,160,t)}const t=(x-220)/140;return q(160,190,196,t)};
const sandCss=`.tp{transform-box:fill-box;transform-origin:50% 100%;animation:tp 4.5s linear forwards}@keyframes tp{to{transform:scaleY(0)}}
.bt{transform-box:fill-box;transform-origin:50% 100%;transform:scaleY(0);animation:bt 4.5s linear forwards}@keyframes bt{to{transform:scaleY(1)}}`;

A[103]={
/* ١ والعصر: أقسم الله بالدهر لما فيه من عجائب قدرته */
1:SC(1,'dusk',
`${L.hills('#3A2E3A')}
<g class="dy">${L.sun(60,120,18)}</g><g class="nt">${L.moon(300,120,14,'#5A4A60')}</g>
${hourglass(180,166,1.7)}${sand(180,166,1.7)}
${L.text(180,72,'وَالْعَصْرِ: الدَّهر',22,'#FFF1C8','aq-fo',1)}
${L.small(180,192,'لا يجوز للعبد أن يُقسم إلا بالله',11,'#FFF6D8','aq-fo',3)}`,
'أقسم الله بالدهر؛ لما فيه من عجائب قدرته',
`${sandCss}.dy{animation:dy 4.5s ease-in-out forwards}@keyframes dy{to{transform:translate(110px,60px);opacity:0}}
.nt{opacity:0;animation:nt 4.5s ease-in-out forwards}@keyframes nt{to{transform:translate(-30px,-50px);opacity:1}}`),

/* ٢ إن الإنسان لفي خسر: بنو آدم في هلكة ونقصان */
2:SC(2,'storm',
`<path d="M0 118 Q120 130 220 160 T360 196 V200 H0Z" fill="#2A2630"/>
${[0,1,2,3,4].map(i=>L.g('aq-dim',1+i*.3,L.person(40+i*48,py(40+i*48),.85,'#0A0A14'))).join('')}
${hourglass(320,108,1.4)}${sand(320,108,1.4)}
${L.text(150,68,'لَفِي خُسْرٍ',26,'#FFF1C8','aq-fo',1.2)}
${L.small(150,94,'في هلَكةٍ ونقصان',14,'#FFE7A0','aq-fo',2)}`,
'إن بني آدم لفي هلكة ونقصان',
sandCss),

/* ٣ إلا الذين آمنوا وعملوا الصالحات وتواصوا بالحق وتواصوا بالصبر */
3:SC(3,'dawn',
`${L.glow(320,40,70,'#FFF1C2','aq-glow')}
<path d="M0 196 Q160 186 360 120 V200 H0Z" fill="#3A4A5A"/>
${[0,1,2,3].map(i=>L.g('aq-rise',.2+i*.15,L.person(70+i*44,186-i*15,.8,'#141826'))).join('')}
<path class="aq-draw" d="M78 166 L114 150 L158 136 L202 120" stroke="#FFE7A0" stroke-width="2.5" style="animation-delay:.9s"/>
${[['آمنوا',240,58],['عملوا الصالحات',122,58],['تواصَوا بالحق',240,94],['تواصَوا بالصبر',122,94]].map(([t,x,y],i)=>L.g('aq-pop',1.4+i*.5,`<rect x="${x-52}" y="${y-16}" width="104" height="26" rx="13" fill="#FFFFFF" opacity=".85"/>${L.note(x,y+2,t,13,'#1E2A3A')}`)).join('')}`,
'إلا المؤمنين العاملين المتواصين بالحق والصبر')
};
})();
