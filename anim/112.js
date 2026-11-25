/* سورة الإخلاص: لا يُرسم الله تعالى ولا يُرمز إليه بصورة؛ المشاهد كتابة وزخرفة وخلقٌ يدل عليه. */
(function(){
'use strict';
const L=window.AAL;if(!L)return;const S=(id,d,b,c)=>L.svg(112,id,d,b,c);
const A=window.AYAH_ANIM=window.AYAH_ANIM||{};
const pattern=(cls)=>[[60,60],[300,60],[60,150],[300,150],[180,28]].map(([x,y],i)=>L.star8(x,y,16,'#FFD36B',cls)).join('');
const draw='.pt rect{stroke-dasharray:130;stroke-dashoffset:130;animation:pt 1.6s ease-out forwards}@keyframes pt{to{stroke-dashoffset:0}}';
A[112]={
/* ١ قل هو الله أحد */
1:S(1,L.lin('bg','#0F2A3A','#1F4A5A')+L.rad('g','#FFE7A0',.5),
`<rect width="360" height="200" fill="url(#bg)"/><ellipse cx="180" cy="100" rx="140" ry="90" fill="url(#g)"/>${pattern('pt')}
${L.label(180,118,'أَحَدٌ',58,'#FFF1C8','tt')}
${L.note(180,160,'واحد لا شريك له',15,'#FFE7A0','fo')}`,
`${draw}.tt{opacity:0;animation:fo 1.4s .6s forwards}.fo{opacity:0;animation:fo 1s 1.8s forwards}@keyframes fo{to{opacity:1}}`),

/* ٢ الله الصمد: يقصده الخلق في حاجاتهم */
2:S(2,L.lin('bg','#1E2A48','#C99A6A'),
`<rect width="360" height="200" fill="url(#bg)"/>${L.stars(12,15,80)}<path d="M0 172 H360 V200 H0Z" fill="#3A2E2A"/>
${[40,95,150,210,265,320].map((x,i)=>`${L.praying(x,170,i%2?.9:1.05,'#141826')}${[0,1,2].map(j=>`<circle class="du" cx="${x+(j-1)*4}" cy="118" r="2.2" fill="#FFE7A0" style="animation-delay:${i*.25+j*.5}s"/>`).join('')}`).join('')}
${L.note(180,40,'الصمد: الذي يقصده الخلق في حاجاتهم',14,'#FFF6D8','fo')}`,
`${L.tw}.du{opacity:0;animation:du 3s ease-out infinite}@keyframes du{0%{opacity:0}20%{opacity:1}100%{opacity:0;transform:translateY(-90px)}}
.fo{opacity:0;animation:fo 1s 1.2s forwards}@keyframes fo{to{opacity:1}}`),

/* ٣ لم يلد ولم يولد */
3:S(3,L.lin('bg','#2A1E3A','#4A3A5A')+L.rad('g','#FFE7A0',.4),
`<rect width="360" height="200" fill="url(#bg)"/><ellipse cx="180" cy="100" rx="150" ry="90" fill="url(#g)"/>${pattern('pt')}
${L.label(180,90,'لَمْ يَلِدْ',40,'#FFF1C8','l1')}${L.label(180,140,'وَلَمْ يُولَدْ',40,'#FFF1C8','l2')}
${L.note(180,182,'ليس له ولد ولا والد ولا صاحبة',13,'#FFE7A0','fo')}`,
`${draw}.l1{opacity:0;animation:fo 1s .5s forwards}.l2{opacity:0;animation:fo 1s 1.6s forwards}.fo{opacity:0;animation:fo 1s 2.6s forwards}@keyframes fo{to{opacity:1}}`),

/* ٤ ولم يكن له كفوًا أحد: لا يشبهه شيء من خلقه */
4:S(4,L.lin('bg','#13263A','#3A5A7A'),
`<rect width="360" height="200" fill="url(#bg)"/>
${[
 [40,`<circle cx="40" cy="110" r="18" fill="#FFC94A"/>`,'الشمس'],
 [100,`<circle cx="100" cy="110" r="16" fill="#F2EBD0"/><circle cx="107" cy="105" r="14" fill="#253F5C"/>`,'القمر'],
 [160,`<path d="M140 128 L160 88 L180 128Z" fill="#7A8A9A"/>`,'الجبال'],
 [220,`<path d="M200 120 q10 -8 20 0 t20 0" stroke="#7FD3F2" stroke-width="5" fill="none"/>`,'البحار'],
 [270,`<rect x="267" y="104" width="6" height="24" fill="#7A5232"/><circle cx="270" cy="100" r="13" fill="#3E9457"/>`,'الشجر'],
 [320,L.person(320,128,.8,'#F2E2C2'),'الإنسان']
].map(([x,g,t],i)=>`<g class="it" style="animation-delay:${.2+i*.3}s">${g}${L.note(x,150,t,11,'#DDEBF5')}</g>`).join('')}
<path class="ln" d="M20 160 H340" stroke="#FFD36B" stroke-width="1.5"/>
${L.note(180,186,'كلها مخلوقة، ولا يماثله ولا يشابهه أحد من خلقه',13,'#FFE7A0','fo')}
${L.label(180,52,'وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',24,'#FFF1C8','tt')}`,
`.it{opacity:0;animation:it .6s ease-out forwards}@keyframes it{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
.ln{stroke-dasharray:320;stroke-dashoffset:320;animation:ln 1s 2s forwards}@keyframes ln{to{stroke-dashoffset:0}}
.tt{opacity:0;animation:fo 1s 2.4s forwards}.fo{opacity:0;animation:fo 1s 2.8s forwards}@keyframes fo{to{opacity:1}}`)
};
})();
