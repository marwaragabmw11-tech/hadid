/* سورة الناس: مشهد متحرك لكل آية. الملائكة والشياطين لا تُرسم أشخاصًا. */
(function(){
'use strict';
const L=window.AAL;if(!L)return;const S=(id,d,b,c)=>L.svg(114,id,d,b,c);
const A=window.AYAH_ANIM=window.AYAH_ANIM||{};
const crowd=(fn,n,y,s,fill,gap,x0)=>Array.from({length:n},(_,i)=>`<g class="pp" style="animation-delay:${.2+i*.15}s">${fn(x0+i*gap,y,s,fill)}</g>`).join('');
const pop='.pp{opacity:0;animation:pp .6s ease-out forwards}@keyframes pp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}';
A[114]={
/* ١ قل أعوذ برب الناس: الناس يلجؤون إلى ربهم */
1:S(1,L.lin('sky','#1C2A48','#6B5A7A')+L.rad('g','#FFF1C2',.8),
`<rect width="360" height="200" fill="url(#sky)"/>${L.stars(16,5,90)}<ellipse class="gl" cx="180" cy="0" rx="200" ry="120" fill="url(#g)"/>
${L.hills('#1A2033')}${crowd(L.praying,7,170,1,'#0E1422',44,48)}
${L.note(180,60,'أعوذ: ألجأ وأعتصم',14,'#FFE7A0','fo')}`,
`${L.tw}${pop}${L.fo}.fo{animation-delay:1.4s}.gl{animation:gl 3s ease-in-out infinite alternate}@keyframes gl{from{opacity:.6}to{opacity:1}}`),

/* ٢ ملك الناس: كل الناس ومدنهم تحت ملكه */
2:S(2,L.lin('sky','#20345A','#E3B98A'),
`<rect width="360" height="200" fill="url(#sky)"/>
${[[20,40],[70,60],[130,30],[230,50],[290,36],[330,58]].map(([x,h],i)=>`<g class="bd" style="animation-delay:${i*.2}s"><rect x="${x}" y="${150-h}" width="26" height="${h}" fill="#3A4560"/>${[0,1].map(j=>`<rect x="${x+5+j*10}" y="${150-h+8}" width="5" height="7" fill="#FFE7A0"/>`).join('')}</g>`).join('')}
<path d="M0 150 H360 V200 H0Z" fill="#2A3044"/>
${crowd(L.person,12,190,.7,'#0E1422',28,24)}
${L.note(180,28,'كل الناس في ملكه، وهو يتصرف في كل شؤونهم',13,'#FFF6D8','fo')}`,
`${pop}${L.fo}.fo{animation-delay:1.6s}.bd{opacity:0;animation:pp .8s forwards}@keyframes pp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}`),

/* ٣ إله الناس: لا معبود بحق سواه — صفوف المصلين أمام المحراب */
3:S(3,L.lin('sky','#0F2A33','#2F6B6A')+L.rad('g','#CFF5E0',.7),
`<rect width="360" height="200" fill="url(#sky)"/>
<path d="M150 150 V92 Q150 62 180 52 Q210 62 210 92 V150Z" fill="#1B4A48"/><path class="mh" d="M160 150 V96 Q160 72 180 64 Q200 72 200 96 V150Z" fill="url(#g)"/>
<path d="M0 150 H360 V200 H0Z" fill="#163A39"/>${[0,1,2].map(r=>`<path d="M0 ${166+r*14} H360" stroke="#1F4E4C" stroke-width="1"/>`).join('')}
${[0,1,2].map(r=>Array.from({length:9-r},(_,i)=>`<g class="row" style="animation-delay:${.3+r*.5+i*.05}s">${L.person(36+i*36+r*18,164+r*16,.75+r*.12,'#0B1D1F')}</g>`).join('')).join('')}
${L.note(180,32,'لا معبود بحق سواه',16,'#E6FFF2','fo')}`,
`${L.fo}.fo{animation-delay:2s}.row{opacity:0;animation:rw .7s ease-out forwards}@keyframes rw{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
.mh{animation:mh 2.4s ease-in-out infinite alternate}@keyframes mh{from{opacity:.6}to{opacity:1}}`),

/* ٤ من شر الوسواس الخناس: يوسوس عند الغفلة ويختفي عند ذكر الله */
4:S(4,L.lin('sky','#151A2C','#2E3550')+L.rad('g','#FFF1C2',.9),
`<rect width="360" height="200" fill="url(#sky)"/>${L.hills('#101522')}
${L.person(180,168,1.4,'#0A0E18')}
<g class="ws">${L.wisp('M40 60 Q80 40 100 70 T150 96',' w1')}${L.wisp('M40 90 Q70 70 100 92 T150 108',' w2',.3)}</g>
<circle class="dk" cx="180" cy="110" r="10" fill="url(#g)"/>
${L.note(250,70,'ذكرُ الله',16,'#FFE7A0','dz')}
${L.note(80,180,'يختفي عند ذكر الله',12,'#FFE7A0','dz2')}`,
`.ws path{stroke-dasharray:140;stroke-dashoffset:140;animation:ws 1.4s ease-in forwards}@keyframes ws{to{stroke-dashoffset:0}}
.ws{animation:back 1.6s 2.6s ease-in forwards}@keyframes back{to{transform:translateX(-130px);opacity:0}}
.dk{transform-box:fill-box;transform-origin:center;opacity:0;animation:dk 1.6s 2s ease-out forwards}@keyframes dk{to{opacity:.75;transform:scale(6)}}
.dz{opacity:0;animation:fo .8s 1.9s forwards}.dz2{opacity:0;animation:fo .8s 3.6s forwards}@keyframes fo{to{opacity:1}}`),

/* ٥ الذي يوسوس في صدور الناس: يبث الشر والشكوك في الصدور */
5:S(5,L.lin('sky','#1A1F33','#3A3550'),
`<rect width="360" height="200" fill="url(#sky)"/>${L.hills('#121626')}
${[90,180,270].map((x,i)=>`${L.person(x,168,1.2,'#0A0E18')}<path class="ht" d="M${x} 140 c-6 -8 -16 -2 -10 6 l10 9 l10 -9 c6 -8 -4 -14 -10 -6Z" fill="#E86A7A" style="animation-delay:${1.2+i*.4}s"/>${L.wisp(`M${x-50} 40 Q${x-20} 60 ${x-30} 90 T${x} 138`,'wp',i*.4)}`).join('')}
${L.note(180,26,'يبث الشر والشكوك في الصدور',13,'#FFE7A0','fo')}`,
`${L.fo}.fo{animation-delay:1.8s}.wp{stroke-dasharray:140;stroke-dashoffset:140;animation:wp 1.6s ease-in forwards}@keyframes wp{to{stroke-dashoffset:0}}
.ht{animation:ht 1.5s ease-in-out infinite alternate}@keyframes ht{to{fill:#4A3550}}`),

/* ٦ من الجنة والناس: شياطين الجن والإنس */
6:S(6,L.lin('sky','#161B2E','#3B3048')+'<filter id="bl" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="5"/></filter>',
`<rect width="360" height="200" fill="url(#sky)"/><path d="M180 30 V180" stroke="#FFE7A0" stroke-width="1" stroke-dasharray="4 6" opacity=".5"/>
<path d="M0 172 H360 V200 H0Z" fill="#141826"/>
<g class="sm" filter="url(#bl)">${[[90,150,26],[76,120,20],[104,118,22],[90,92,18],[80,70,12],[100,64,10]].map(([x,y,r],i)=>`<circle class="pf" cx="${x}" cy="${y}" r="${r}" fill="#3A2E52" style="animation-delay:${i*.3}s"/>`).join('')}</g>
${L.wisp('M120 110 Q140 100 150 120',' sw',.6)}
${L.note(90,40,'من الجنّ',16,'#FFE7A0','fo')}
${L.person(230,170,1.1,'#0A0E18')}<path class="mo" d="M240 132 q12 -4 18 4" stroke="#5B4A6E" stroke-width="3" fill="none"/>${L.person(300,170,1.1,'#0A0E18')}
${L.note(265,40,'ومن الناس',16,'#FFE7A0','fo f2')}`,
`${L.fo}.f2{animation-delay:1.6s}.pf{transform-box:fill-box;transform-origin:center;animation:pf 2.2s ease-in-out infinite alternate}@keyframes pf{from{transform:scale(.85) translateY(3px)}to{transform:scale(1.15) translateY(-4px)}}
.sw{stroke-dasharray:60;stroke-dashoffset:60;animation:sw 1s forwards}@keyframes sw{to{stroke-dashoffset:0}}
.mo{opacity:0;animation:mo 1.2s 1.8s ease-in-out infinite alternate}@keyframes mo{to{opacity:1}}`)
};
})();
