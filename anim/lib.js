/* أدوات مشتركة لرسم المشاهد المتحركة لكل آية. */
(function(){
'use strict';
const scope=(pre,css)=>{const names=[...css.matchAll(/@keyframes\s+([\w-]+)/g)].map(m=>m[1]);
  const c=css.replace(/@keyframes\s+([\w-]+)/g,(m,n)=>`@keyframes k${pre}${n}`).replace(/animation:([^;}]+)/g,(m,v)=>'animation:'+v.replace(/[\w-]+/g,w=>names.includes(w)?`k${pre}${w}`:w));
  let r='',i=0;while(i<c.length){const j=c.indexOf('{',i);if(j<0)break;const sel=c.slice(i,j).trim();let d=1,k=j+1;while(d&&k<c.length){if(c[k]==='{')d++;else if(c[k]==='}')d--;k++}
    const body=c.slice(j,k);r+=sel.startsWith('@')?sel+body:sel.split(',').map(x=>`.a${pre} ${x.trim()}`).join(',')+body;i=k}
  return r};
const L={};
L.svg=(su,id,defs,body,css)=>{const pre=`${su}_${id}`;return `<svg viewBox="0 0 360 200" xmlns="http://www.w3.org/2000/svg" class="aa a${pre}" role="img"><defs>${(defs||'').replace(/id="/g,`id="${pre}`).replace(/url\(#/g,`url(#${pre}`)}</defs><style>${scope(pre,css||'')}</style>${(body||'').replace(/url\(#/g,`url(#${pre}`)}</svg>`};
L.lin=(id,a,b,vert=true)=>`<linearGradient id="${id}" x1="0" y1="0" x2="${vert?0:1}" y2="${vert?1:0}"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`;
L.rad=(id,c,o=1)=>`<radialGradient id="${id}"><stop offset="0" stop-color="${c}" stop-opacity="${o}"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient>`;
L.person=(x,y,s=1,fill='#2B3A4F')=>`<g transform="translate(${x} ${y}) scale(${s})"><circle cy="-40" r="7.5" fill="${fill}"/><path d="M-10 0 V-22 Q-10 -31 0 -31 Q10 -31 10 -22 V0Z" fill="${fill}"/></g>`;
// شخص يرفع يديه بالدعاء
L.praying=(x,y,s=1,fill='#2B3A4F')=>`<g transform="translate(${x} ${y}) scale(${s})"><circle cy="-40" r="7.5" fill="${fill}"/><path d="M-10 0 V-22 Q-10 -31 0 -31 Q10 -31 10 -22 V0Z" fill="${fill}"/><path d="M-8 -26 L-15 -44 M8 -26 L15 -44" stroke="${fill}" stroke-width="4.5" stroke-linecap="round"/></g>`;
// ساجد
L.sujud=(x,y,s=1,fill='#2B3A4F')=>`<g transform="translate(${x} ${y}) scale(${s})"><path d="M-26 0 H-12 L-18 -17 Q-6 -24 6 -10" fill="none" stroke="${fill}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 -11 L11 0" stroke="${fill}" stroke-width="4" stroke-linecap="round"/><circle cx="12" cy="-6" r="5.5" fill="${fill}"/></g>`;
L.stars=(n,seed,h=150,cls='tw')=>{let r=seed,o='';for(let i=0;i<n;i++){r=(r*9301+49297)%233280;const x=r/233280*360;r=(r*9301+49297)%233280;const y=r/233280*h;o+=`<circle class="${cls}" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(0.6+(i%3)*0.5).toFixed(1)}" fill="#FFF6D8" style="animation-delay:${(i%7)*0.3}s"/>`}return o};
L.hills=(c='#121826')=>`<path d="M0 172 Q60 152 120 166 T240 160 T360 168 V200 H0Z" fill="${c}"/>`;
L.label=(x,y,t,size=14,fill='#FFD36B',cls='')=>`<text class="${cls}" x="${x}" y="${y}" text-anchor="middle" font-family="Amiri Quran, Reem Kufi, Noto Naskh Arabic, sans-serif" font-size="${size}" font-weight="700" fill="${fill}" direction="rtl">${t}</text>`;
L.note=(x,y,t,size=12,fill='#FFE7A0',cls='')=>`<text class="${cls}" x="${x}" y="${y}" text-anchor="middle" font-family="Reem Kufi, Noto Naskh Arabic, sans-serif" font-size="${size}" font-weight="700" fill="${fill}" direction="rtl">${t}</text>`;
// نجمة ثمانية إسلامية
L.star8=(x,y,r,stroke='#FFD36B',cls='')=>`<g class="${cls}" fill="none" stroke="${stroke}" stroke-width="1.6"><rect x="${x-r}" y="${y-r}" width="${2*r}" height="${2*r}"/><rect x="${x-r}" y="${y-r}" width="${2*r}" height="${2*r}" transform="rotate(45 ${x} ${y})"/></g>`;
// خيوط الوسوسة الداكنة
L.wisp=(d,cls='',dl=0)=>`<path class="${cls}" d="${d}" fill="none" stroke="#5B4A6E" stroke-width="3" stroke-linecap="round" opacity=".85" style="animation-delay:${dl}s"/>`;
L.tw='.tw{animation:tw 2.4s ease-in-out infinite}@keyframes tw{50%{opacity:.25}}';
L.fo='.fo{opacity:0;animation:fo .9s forwards}@keyframes fo{to{opacity:1}}';
/* ===== مكوّنات المشاهد (الإصدار ٢): أنماط عامة تُضاف مرة واحدة، ومكوّنات قصيرة ===== */
const GCSS=`
.aa .aq-fo{opacity:0;animation:aqfo .9s ease-out forwards}
.aa .aq-rise{opacity:0;animation:aqrise 1s ease-out forwards}
.aa .aq-up{transform:translateY(46px);animation:aqup 2.2s ease-out forwards}
.aa .aq-fall{animation:aqfall 2.6s ease-in forwards}
.aa .aq-fly{animation:aqfly 2.6s ease-in-out forwards}
.aa .aq-drift{animation:aqdrift 5s ease-in-out infinite alternate}
.aa .aq-sway{transform-box:fill-box;transform-origin:50% 100%;animation:aqsway 2.8s ease-in-out infinite alternate}
.aa .aq-pulse{transform-box:fill-box;transform-origin:center;animation:aqpulse 1.8s ease-in-out infinite alternate}
.aa .aq-grow{transform-box:fill-box;transform-origin:50% 100%;transform:scale(0);animation:aqgrow 1.1s cubic-bezier(.3,1.4,.5,1) forwards}
.aa .aq-pop{transform-box:fill-box;transform-origin:center;transform:scale(0);animation:aqgrow .8s cubic-bezier(.3,1.4,.5,1) forwards}
.aa .aq-shake{animation:aqshake .3s linear infinite}
.aa .aq-flk{transform-box:fill-box;transform-origin:50% 100%;animation:aqflk .7s ease-in-out infinite alternate}
.aa .aq-draw{stroke-dasharray:400;stroke-dashoffset:400;animation:aqdraw 2s ease-out forwards}
.aa .aq-tw{animation:aqtw 2.4s ease-in-out infinite}
.aa .aq-sink{animation:aqsink 2.6s ease-in forwards}
.aa .aq-spin{transform-box:fill-box;transform-origin:center;animation:aqspin 9s linear infinite}
.aa .aq-flow{stroke-dasharray:10 14;animation:aqflow 1.4s linear infinite}
.aa .aq-dim{animation:aqdim 3s ease-in forwards}
.aa .aq-out{animation:aqout 2.4s ease-in forwards}
.aa .aq-crumble{transform-box:fill-box;transform-origin:50% 100%;animation:aqcrumble 3s ease-in forwards}
.aa .aq-glow{animation:aqglow 2.2s ease-in-out infinite alternate}
.aa .aq-rain{animation:aqrain 1s linear infinite}
.aa .aq-run{animation:aqrun 3.4s linear forwards}
.aa .aq-bob{animation:aqbob 1.2s ease-in-out infinite alternate}
@keyframes aqfo{to{opacity:1}}
@keyframes aqrise{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
@keyframes aqup{to{transform:none}}
@keyframes aqfall{to{transform:translate(var(--dx,0px),var(--dy,170px)) rotate(var(--r,60deg));opacity:.15}}
@keyframes aqfly{to{transform:translate(var(--dx,0px),var(--dy,0px))}}
@keyframes aqdrift{to{transform:translateX(var(--dx,24px))}}
@keyframes aqsway{from{transform:rotate(-3deg)}to{transform:rotate(3deg)}}
@keyframes aqpulse{from{transform:scale(.85);opacity:.6}to{transform:scale(1.12);opacity:1}}
@keyframes aqgrow{to{transform:scale(1)}}
@keyframes aqshake{25%{transform:translate(2px,-1px)}75%{transform:translate(-2px,1px)}}
@keyframes aqflk{from{transform:scaleY(.86) skewX(-3deg)}to{transform:scaleY(1.08) skewX(3deg)}}
@keyframes aqdraw{to{stroke-dashoffset:0}}
@keyframes aqtw{50%{opacity:.25}}
@keyframes aqsink{to{transform:translateY(var(--dy,60px));opacity:var(--o,.2)}}
@keyframes aqspin{to{transform:rotate(360deg)}}
@keyframes aqflow{to{stroke-dashoffset:-48}}
@keyframes aqdim{to{opacity:.12;filter:grayscale(1)}}
@keyframes aqout{to{opacity:0}}
@keyframes aqcrumble{30%{transform:translateY(2px)}100%{transform:scaleY(.08) scaleX(1.25);opacity:.35}}
@keyframes aqglow{from{opacity:.45}to{opacity:1}}
@keyframes aqrain{from{transform:translateY(-20px);opacity:0}30%{opacity:1}to{transform:translateY(40px);opacity:0}}
@keyframes aqrun{to{transform:translateX(var(--dx,-260px))}}
@keyframes aqbob{to{transform:translateY(-4px)}}
@media (prefers-reduced-motion:reduce){.aa *{animation-duration:.01s!important;animation-iteration-count:1!important}}
`;
if(!document.getElementById('aq-css')){const st=document.createElement('style');st.id='aq-css';st.textContent=GCSS;document.head.appendChild(st)}
const BG={
 night:['#0B1024','#2A3456','#FFE7A0'],dusk:['#2B3D66','#C98F6A','#FFF6D8'],dawn:['#3A4A7A','#FCD9A0','#FFF6D8'],day:['#8FC3E0','#F6E3B4','#1E2A3A'],
 desert:['#E9B872','#F8E3B8','#4A2A10'],hell:['#1A0606','#5A120A','#FFD9A0'],garden:['#BFE6F2','#FFF2CC','#1E4A2A'],sea:['#1A3150','#4A7A9A','#E8F4FF'],
 storm:['#20242E','#4A4F5A','#FFE7A0'],plain:['#0E1326','#3B2A44','#FFE7A0'],dark:['#05070F','#161B2C','#FFE7A0'],space:['#050816','#1E1446','#FFE7A0'],
 teal:['#0F2A33','#2F6B6A','#E6FFF2'],rose:['#2A1E3A','#5A3A5A','#FFF1C8'],morning:['#FFD6A0','#FFF4DC','#5A2E10']
};
// مشهد عام: خلفية جاهزة + محتوى + عبارة قصيرة أعلى المشهد
L.scene=(su,id,bg,body,note,css)=>{const b=BG[bg]||BG.night;
  return L.svg(su,id,L.lin('bg',b[0],b[1]),`<rect width="360" height="200" fill="url(#bg)"/>${body}${note?(()=>{const n=[...note].length,w=n>34?336:280,fs=n>34?Math.max(10.5,Math.min(13.5,318/(n*.5))):13.5;return `<g class="aq-fo" style="animation-delay:.4s"><rect x="${180-w/2}" y="8" width="${w}" height="28" rx="14" fill="${bg==='day'||bg==='garden'||bg==='desert'||bg==='morning'?'#FFFFFF':'#000000'}" opacity=".28"/>${L.note(180,27+fs*.06,note,+fs.toFixed(1),b[2])}</g>`})():''}`,css||'')};
const D=(dl)=>dl?` style="animation-delay:${dl}s"`:'';
const V=(o)=>{const s=Object.entries(o).filter(([k,v])=>v!==undefined&&v!=='').map(([k,v])=>`${k}:${v}`).join(';');return s?` style="${s}"`:''};
L.D=D;L.V=V;
L.g=(cls,dl,inner,vars)=>`<g class="${cls||''}"${V(Object.assign({'animation-delay':dl!=null?dl+'s':undefined},vars||{}))}>${inner}</g>`;
L.ground=(c='#2A2630',y=172)=>`<path d="M0 ${y} H360 V200 H0Z" fill="${c}"/>`;
L.sand=(c='#D9A866')=>`<path d="M0 168 Q70 150 140 166 T280 160 T360 164 V200 H0Z" fill="${c}"/>`;
L.grass=(c='#4E9A5A')=>`<path d="M0 166 Q90 150 180 164 T360 160 V200 H0Z" fill="${c}"/>`;
L.glow=(x,y,r,c='#FFE7A0',cls='',dl)=>L.g(cls,dl,[1,.66,.4].map((k,i)=>`<circle cx="${x}" cy="${y}" r="${r*k}" fill="${c}" opacity="${[.12,.18,.3][i]}"/>`).join(''));
L.sun=(x,y,r=22,cls='',dl)=>L.g(cls,dl,`<circle cx="${x}" cy="${y}" r="${r*1.8}" fill="#FFD36B" opacity=".2"/><circle cx="${x}" cy="${y}" r="${r}" fill="#FFC94A"/>`);
L.moon=(x,y,r=16,bgc='#1A2240',cls='',dl)=>L.g(cls,dl,`<circle cx="${x}" cy="${y}" r="${r}" fill="#F2EBD0"/><circle cx="${x+r*.45}" cy="${y-r*.3}" r="${r*.85}" fill="${bgc}"/>`);
L.fullmoon=(x,y,r=16,cls='',dl)=>L.g(cls,dl,`<circle cx="${x}" cy="${y}" r="${r*1.6}" fill="#F2EBD0" opacity=".15"/><circle cx="${x}" cy="${y}" r="${r}" fill="#F2EBD0"/>`);
L.cloud=(x,y,s=1,c='#E8EEF5',cls='',dl)=>L.g(cls,dl,`<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="0" rx="26" ry="11" fill="${c}"/><circle cx="-10" cy="-6" r="11" fill="${c}"/><circle cx="8" cy="-9" r="13" fill="${c}"/></g>`);
L.rain=(x0,x1,y0=60,c='#9FD3F0')=>{let o='';for(let x=x0,i=0;x<=x1;x+=14,i++)o+=`<path class="aq-rain" d="M${x} ${y0+(i%3)*12} l-3 10" stroke="${c}" stroke-width="2" stroke-linecap="round" style="animation-delay:${(i%5)*.2}s"/>`;return o};
L.mountain=(x,y,w,h,c='#6A7A8A',cls='',dl)=>L.g(cls,dl,`<path d="M${x-w/2} ${y} L${x-w*.12} ${y-h} L${x+w*.05} ${y-h*.82} L${x+w*.18} ${y-h*.95} L${x+w/2} ${y}Z" fill="${c}"/><path d="M${x-w*.12} ${y-h} L${x-w*.04} ${y-h*.84} L${x+w*.05} ${y-h*.82}Z" fill="#FFFFFF" opacity=".35"/>`);
L.tree=(x,y,s=1,c='#2F8A4A',fruit,cls='aq-sway',dl)=>L.g(cls,dl,`<g transform="translate(${x} ${y}) scale(${s})"><rect x="-3" y="-30" width="6" height="30" fill="#7A5232"/><circle cy="-42" r="19" fill="${c}"/>${fruit?[[-8,-44],[6,-36],[2,-50]].map(([a,b])=>`<circle cx="${a}" cy="${b}" r="3.5" fill="${fruit}"/>`).join(''):''}</g>`);
L.palm=(x,y,s=1,cls='aq-sway',dl,dates)=>L.g(cls,dl,`<g transform="translate(${x} ${y}) scale(${s})"><path d="M-2 0 Q-4 -30 2 -58 L6 -58 Q2 -30 4 0Z" fill="#8A6A42"/>${[-60,-25,10,40,75,110].map(a=>`<path d="M4 -58 q${Math.cos(a*Math.PI/180)*20} ${-Math.sin(a*Math.PI/180)*8-6} ${Math.cos(a*Math.PI/180)*34} ${Math.abs(Math.sin(a*Math.PI/180))*4+8}" stroke="#3E8E4A" stroke-width="5" fill="none" stroke-linecap="round"/>`).join('')}${dates?`<circle cx="0" cy="-52" r="3" fill="#B5651D"/><circle cx="8" cy="-50" r="3" fill="#B5651D"/><circle cx="4" cy="-47" r="3" fill="#B5651D"/>`:''}</g>`);
L.plant=(x,y,s=1,c='#4CAF50',cls='aq-grow',dl)=>L.g(cls,dl,`<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0 V-22" stroke="${c}" stroke-width="2.5"/><path d="M0 -12 q-10 -4 -12 -12 q10 0 12 8Z M0 -18 q10 -4 12 -12 q-10 0 -12 8Z" fill="${c}"/></g>`);
L.grain=(x,y,s=1,c='#D9B24A',cls='aq-sway',dl)=>L.g(cls,dl,`<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0 V-40" stroke="#9A8A3A" stroke-width="2"/>${[0,1,2,3].map(i=>`<ellipse cx="${i%2?3.5:-3.5}" cy="${-40+i*6}" rx="3" ry="5" fill="${c}"/>`).join('')}</g>`);
L.flower=(x,y,c='#E86A8A',cls='aq-grow',dl)=>L.g(cls,dl,`<path d="M${x} ${y} V${y-14}" stroke="#3E8E4A" stroke-width="2"/>${[0,72,144,216,288].map(a=>`<circle cx="${x+Math.cos(a*Math.PI/180)*4}" cy="${y-16+Math.sin(a*Math.PI/180)*4}" r="3" fill="${c}"/>`).join('')}<circle cx="${x}" cy="${y-16}" r="2" fill="#FFD36B"/>`);
L.river=(y=178,c='#7FD3F2')=>`<path d="M0 ${y} Q60 ${y-12} 120 ${y} T240 ${y-2} T360 ${y}" stroke="${c}" stroke-width="10" fill="none" stroke-linecap="round"/><path class="aq-flow" d="M0 ${y} Q60 ${y-12} 120 ${y} T240 ${y-2} T360 ${y}" stroke="#E6FAFF" stroke-width="2" fill="none"/>`;
L.sea=(y=130,c='#2E7CB8',cls='',dl)=>L.g(cls,dl,`<path d="M-60 ${y} Q-30 ${y-10} 0 ${y} T60 ${y} T120 ${y} T180 ${y} T240 ${y} T300 ${y} T360 ${y} T420 ${y} V260 H-60Z" fill="${c}"/><path class="aq-drift" d="M-60 ${y+14} Q-30 ${y+6} 0 ${y+14} T60 ${y+14} T120 ${y+14} T180 ${y+14} T240 ${y+14} T300 ${y+14} T360 ${y+14}" stroke="#BFE6FF" stroke-width="2" fill="none" opacity=".6"/>`);
L.fire=(x,y,s=1,dl=0)=>`<g transform="translate(${x} ${y}) scale(${s})"><g class="aq-flk" style="animation-delay:${dl}s"><path d="M0 0 C-22 -8 -24 -38 -6 -62 C-4 -44 6 -46 4 -70 C22 -52 26 -20 14 -4 Q8 2 0 0Z" fill="#E2451E"/><path d="M0 0 C-10 -6 -12 -24 -2 -38 C0 -28 6 -30 6 -40 C14 -28 14 -10 8 -2Z" fill="#FFC23D"/></g></g>`;
L.fires=(y=176,n=5,s=1.2)=>Array.from({length:n},(_,i)=>L.fire(30+i*(300/(n-1)),y,s*(i%2?1.25:1),i*.13)).join('');
L.embers=(n=8,y=170)=>Array.from({length:n},(_,i)=>`<circle class="aq-fly" cx="${20+i*42}" cy="${y}" r="2" fill="#FFB347" style="--dx:${(i%3-1)*14}px;--dy:-150px;animation-duration:2.6s;animation-delay:${i*.3}s;animation-iteration-count:infinite"/>`).join('');
L.smoke=(x,y,s=1,c='#3A3440')=>L.g('aq-drift',0,`<g transform="translate(${x} ${y}) scale(${s})">${[[0,0,14],[8,-14,12],[-4,-28,10],[6,-40,8]].map(([a,b,r])=>`<circle cx="${a}" cy="${b}" r="${r}" fill="${c}" opacity=".6"/>`).join('')}</g>`,{'--dx':'10px'});
L.camel=(x,y,s=1,c='#B5844A',cls='',dl)=>L.g(cls,dl,`<g transform="translate(${x} ${y}) scale(${s})"><path d="M-24 -30 Q-20 -48 -8 -40 Q0 -54 10 -40 Q18 -34 18 -28 L28 -46 Q32 -52 38 -48 L40 -44 L34 -44 L26 -24 Q24 -18 16 -18 L-18 -18 Q-26 -20 -24 -30Z" fill="${c}"/><path d="M-18 -18 V0 M-10 -18 V0 M10 -18 V0 M16 -18 V0" stroke="${c}" stroke-width="4"/></g>`);
L.horse=(x,y,s=1,c='#5A3A22',cls='',dl)=>L.g(cls,dl,`<g transform="translate(${x} ${y}) scale(${s})"><path d="M-26 -30 Q-28 -40 -14 -40 L14 -40 Q20 -50 26 -56 L34 -52 L30 -46 L36 -40 L30 -36 L22 -38 Q22 -28 16 -24 L-20 -24 Q-26 -24 -26 -30Z" fill="${c}"/><path d="M-26 -34 q-10 2 -12 12" stroke="${c}" stroke-width="4" fill="none"/><path class="aq-shake" d="M-20 -24 L-28 -6 M-12 -24 L-6 -4 M10 -24 L2 -6 M16 -24 L26 -6" stroke="${c}" stroke-width="4" stroke-linecap="round"/><path d="M14 -40 Q18 -46 26 -54" stroke="#2A1A10" stroke-width="3" fill="none"/></g>`);
L.elephant=(x,y,s=1,c='#7A7F8A',cls='',dl)=>L.g(cls,dl,`<g transform="translate(${x} ${y}) scale(${s})"><path d="M-34 -10 Q-38 -50 0 -52 Q30 -52 34 -30 Q44 -30 44 -14 Q44 -4 40 6 L34 6 Q38 -6 36 -14 Q34 -10 30 -10 L30 0 L20 0 L20 -10 L-14 -10 L-14 0 L-24 0 L-24 -10Z" fill="${c}"/><circle cx="24" cy="-36" r="2.5" fill="#1A1A1A"/><path d="M14 -46 Q4 -30 16 -22" fill="${c}" stroke="#5A5F6A" stroke-width="1.5"/></g>`);
L.bird=(x,y,s=1,c='#2A2A2A',cls='aq-bob',dl)=>L.g(cls,dl,`<path d="M${x-10*s} ${y} Q${x-5*s} ${y-8*s} ${x} ${y} Q${x+5*s} ${y-8*s} ${x+10*s} ${y}" stroke="${c}" stroke-width="${2.4*s}" fill="none" stroke-linecap="round"/>`);
L.moth=(x,y,s=1,c='#D9C9A8',cls='',dl,vars)=>L.g(cls,dl,`<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="-5" cy="0" rx="6" ry="4" fill="${c}"/><ellipse cx="5" cy="0" rx="6" ry="4" fill="${c}"/><rect x="-1" y="-4" width="2" height="8" fill="#5A4A3A"/></g>`,vars);
L.house=(x,y,w=40,c='#E8D9B8',lit,cls='',dl)=>L.g(cls,dl,`<rect x="${x-w/2}" y="${y-w*.7}" width="${w}" height="${w*.7}" fill="${c}"/><path d="M${x-w/2-4} ${y-w*.7} L${x} ${y-w*1.1} L${x+w/2+4} ${y-w*.7}Z" fill="#8A5A3A"/><rect x="${x-w*.1}" y="${y-w*.35}" width="${w*.2}" height="${w*.35}" fill="${lit?'#FFE7A0':'#6A4A30'}"/>`);
L.city=(y=172,c='#3A4560',lit=true,cls='',dl)=>L.g(cls,dl,[[10,44],[46,30],[80,58],[118,36],[150,48],[190,32],[222,62],[262,40],[296,52],[330,34]].map(([x,h])=>`<rect x="${x}" y="${y-h}" width="28" height="${h}" fill="${c}"/>${lit?`<rect x="${x+10}" y="${y-h+8}" width="7" height="8" fill="#FFE7A0" opacity=".85"/>`:''}`).join(''));
L.columns=(x0,y,n=6,gap=26,h=90,c='#C9B08A',cls='',dl)=>L.g(cls,dl,`<rect x="${x0-8}" y="${y-h-12}" width="${(n-1)*gap+26}" height="12" fill="${c}"/>`+Array.from({length:n},(_,i)=>`<rect x="${x0+i*gap}" y="${y-h}" width="10" height="${h}" fill="${c}"/><rect x="${x0+i*gap-3}" y="${y-h}" width="16" height="5" fill="${c}"/>`).join(''));
L.rocks=(x,y,s=1,c='#8A7A6A',cls='',dl)=>L.g(cls,dl,`<g transform="translate(${x} ${y}) scale(${s})"><path d="M-40 0 L-36 -40 L-20 -56 L0 -50 L10 -60 L30 -44 L40 0Z" fill="${c}"/><rect x="-26" y="-30" width="12" height="22" rx="6" fill="#3A2E24"/><rect x="6" y="-34" width="12" height="26" rx="6" fill="#3A2E24"/></g>`);
L.book=(x,y,w=80,cls='',dl)=>L.g(cls,dl,`<path d="M${x} ${y-w*.45} Q${x-w*.3} ${y-w*.55} ${x-w*.6} ${y-w*.48} V${y+w*.05} Q${x-w*.3} ${y-w*.02} ${x} ${y+w*.08}Z" fill="#F7EFD9"/><path d="M${x} ${y-w*.45} Q${x+w*.3} ${y-w*.55} ${x+w*.6} ${y-w*.48} V${y+w*.05} Q${x+w*.3} ${y-w*.02} ${x} ${y+w*.08}Z" fill="#FBF5E4"/><path d="M${x} ${y-w*.45} V${y+w*.08}" stroke="#C8B48A" stroke-width="1.5"/>${[0,1,2,3].map(i=>`<path class="aq-draw" d="M${x+w*.5} ${y-w*.35+i*w*.1} H${x+w*.08}" stroke="#5A4A2A" stroke-width="1.6" style="animation-delay:${(dl||0)+.6+i*.3}s"/><path class="aq-draw" d="M${x-w*.08} ${y-w*.35+i*w*.1} H${x-w*.5}" stroke="#5A4A2A" stroke-width="1.6" style="animation-delay:${(dl||0)+.8+i*.3}s"/>`).join('')}`);
L.scroll=(x,y,w=120,h=70,cls='',dl)=>L.g(cls,dl,`<rect x="${x-w/2}" y="${y-h/2}" width="${w}" height="${h}" rx="4" fill="#F7EFD9"/><rect x="${x-w/2-6}" y="${y-h/2-4}" width="10" height="${h+8}" rx="5" fill="#D9C597"/><rect x="${x+w/2-4}" y="${y-h/2-4}" width="10" height="${h+8}" rx="5" fill="#D9C597"/>${[0,1,2,3].map(i=>`<path class="aq-draw" d="M${x+w/2-12} ${y-h/2+14+i*13} H${x-w/2+12+(i%2)*14}" stroke="#4A3A20" stroke-width="2" style="animation-delay:${(dl||0)+.5+i*.4}s"/>`).join('')}`);
L.scale=(x,y,tilt=0,c='#FFD36B',cls='',dl)=>L.g(cls,dl,`<path d="M${x} ${y} V${y-62} M${x-22} ${y} H${x+22}" stroke="${c}" stroke-width="3"/><g transform="rotate(${tilt} ${x} ${y-62})"><path d="M${x-44} ${y-62} H${x+44}" stroke="${c}" stroke-width="3"/><path d="M${x-44} ${y-62} L${x-56} ${y-38} M${x-44} ${y-62} L${x-32} ${y-38} M${x+44} ${y-62} L${x+32} ${y-38} M${x+44} ${y-62} L${x+56} ${y-38}" stroke="${c}" stroke-width="1.2"/><path d="M${x-58} ${y-38} H${x-30} Q${x-44} ${y-28} ${x-58} ${y-38}Z M${x+30} ${y-38} H${x+58} Q${x+44} ${y-28} ${x+30} ${y-38}Z" fill="${c}"/></g>`);
L.coins=(x,y,n=5,cls='',dl)=>L.g(cls,dl,Array.from({length:n},(_,i)=>`<ellipse cx="${x+(i%3-1)*12}" cy="${y-Math.floor(i/3)*6-(i%2)*2}" rx="9" ry="4" fill="#E8B84A" stroke="#B8862A" stroke-width="1"/>`).join(''));
L.cup=(x,y,s=1,cls='',dl)=>L.g(cls,dl,`<g transform="translate(${x} ${y}) scale(${s})"><path d="M-10 -24 H10 L7 -8 Q0 -4 -7 -8Z" fill="#F2D27A"/><rect x="-1.5" y="-8" width="3" height="7" fill="#F2D27A"/><rect x="-7" y="-2" width="14" height="2.5" rx="1" fill="#F2D27A"/><ellipse cx="0" cy="-23" rx="9" ry="2" fill="#E6FAFF"/></g>`);
L.couch=(x,y,w=70,c='#2E7D6A',cls='',dl)=>L.g(cls,dl,`<rect x="${x-w/2}" y="${y-18}" width="${w}" height="14" rx="5" fill="${c}"/><rect x="${x-w/2}" y="${y-34}" width="${w}" height="18" rx="6" fill="${c}" opacity=".8"/><rect x="${x-w/2-4}" y="${y-26}" width="10" height="22" rx="4" fill="${c}"/><rect x="${x+w/2-6}" y="${y-26}" width="10" height="22" rx="4" fill="${c}"/><rect x="${x-w/2+4}" y="${y-4}" width="5" height="4" fill="#C9A23A"/><rect x="${x+w/2-9}" y="${y-4}" width="5" height="4" fill="#C9A23A"/>`);
L.cushions=(x,y,n=4,cls='',dl)=>L.g(cls,dl,Array.from({length:n},(_,i)=>`<rect x="${x+i*26}" y="${y-14}" width="22" height="14" rx="5" fill="${['#C0504D','#4F81BD','#9BBB59','#F2B33D'][i%4]}"/>`).join(''));
L.carpet=(x,y,w=120,cls='',dl)=>L.g(cls,dl,`<path d="M${x-w/2} ${y} L${x-w/2+20} ${y-22} H${x+w/2+20} L${x+w/2} ${y}Z" fill="#9A2A2A"/><path d="M${x-w/2+10} ${y-4} L${x-w/2+24} ${y-18} H${x+w/2+12} L${x+w/2-2} ${y-4}Z" fill="none" stroke="#F2B33D" stroke-width="1.5"/>`);
L.fountain=(x,y,cls='',dl)=>L.g(cls,dl,`<ellipse cx="${x}" cy="${y}" rx="30" ry="7" fill="#7FB8D8"/><path d="M${x-30} ${y} V${y+6} Q${x} ${y+14} ${x+30} ${y+6} V${y}" fill="#C9D8E0"/>${[-1,0,1].map(k=>`<path class="aq-flow" d="M${x} ${y-4} Q${x+k*14} ${y-34} ${x+k*26} ${y-2}" stroke="#BFE6FF" stroke-width="2.5" fill="none"/>`).join('')}`);
L.kaaba=(x,y,w=70,cls='',dl)=>L.g(cls,dl,`<rect x="${x-w/2}" y="${y-w*.8}" width="${w}" height="${w*.8}" fill="#141414"/><rect x="${x-w/2}" y="${y-w*.62}" width="${w}" height="${w*.09}" fill="#C9A23A"/><rect x="${x+w*.12}" y="${y-w*.4}" width="${w*.16}" height="${w*.3}" fill="#C9A23A" opacity=".8"/>`);
L.lamp=(x,y,cls='aq-glow',dl)=>L.g(cls,dl,`<circle cx="${x}" cy="${y}" r="14" fill="#FFE7A0" opacity=".3"/><path d="M${x-6} ${y+6} Q${x} ${y-12} ${x+6} ${y+6}Z" fill="#FFD36B"/>`);
L.crown=(x,y,s=1,cls='',dl)=>L.g(cls,dl,`<path transform="translate(${x} ${y}) scale(${s})" d="M-14 0 L-16 -16 L-7 -8 L0 -20 L7 -8 L16 -16 L14 0Z" fill="#E8B84A"/>`);
L.throne=(x,y,cls='',dl)=>L.g(cls,dl,`<rect x="${x-20}" y="${y-60}" width="40" height="44" rx="6" fill="#8A2A2A"/><rect x="${x-26}" y="${y-22}" width="52" height="10" fill="#C9A23A"/><rect x="${x-22}" y="${y-12}" width="6" height="12" fill="#C9A23A"/><rect x="${x+16}" y="${y-12}" width="6" height="12" fill="#C9A23A"/>`);
L.grave=(x,y,cls='',dl)=>L.g(cls,dl,`<ellipse cx="${x}" cy="${y}" rx="26" ry="10" fill="#6A5038"/><rect x="${x-3}" y="${y-24}" width="6" height="18" fill="#8A7A6A"/>`);
L.heart=(x,y,s=1,c='#E86A7A',cls='',dl)=>L.g(cls,dl,`<path transform="translate(${x} ${y}) scale(${s})" d="M0 6 C-14 -4 -10 -16 0 -9 C10 -16 14 -4 0 6Z" fill="${c}"/>`);
L.hand=(x,y,s=1,c='#E0AC69',cls='',dl)=>L.g(cls,dl,`<path transform="translate(${x} ${y}) scale(${s})" d="M-18 0 Q-18 -8 -8 -8 H10 Q16 -8 16 -4 Q16 0 10 0 H4 Q12 2 12 6 Q12 10 4 10 H-12 Q-18 10 -18 4Z" fill="${c}"/>`);
L.orbs=(x0,y,n=5,gap=40,cls='aq-pulse',dl=0)=>Array.from({length:n},(_,i)=>`<g class="${cls}" style="animation-delay:${dl+i*.2}s">${L.glow(x0+i*gap,y,16,'#EAF6FF')}</g>`).join('');
L.rays=(x,y,n=7,c='#FFF1C2',o=.18)=>`<g class="aq-glow">${Array.from({length:n},(_,i)=>{const a=(-60+i*120/(n-1))*Math.PI/180;return `<path d="M${x} ${y} L${x+Math.sin(a)*260-12} ${y+Math.cos(a)*260} L${x+Math.sin(a)*260+12} ${y+Math.cos(a)*260}Z" fill="${c}" opacity="${o}"/>`}).join('')}</g>`;
L.people=(n,x0,gap,y,s=1,c='#141826',kind='person',cls='aq-rise',dl0=.2,step=.12)=>Array.from({length:n},(_,i)=>L.g(cls,dl0+i*step,L[kind](x0+i*gap,y,s*(i%3===1?.9:1),c))).join('');
L.gate=(x,y,w=60,h=70,c='#3A3A42',cls='',dl)=>L.g(cls,dl,`<path d="M${x-w/2} ${y} V${y-h+w/2} A${w/2} ${w/2} 0 0 1 ${x+w/2} ${y-h+w/2} V${y}Z" fill="${c}"/>`);
L.wall=(x0,x1,y,h=60,c='#4A4A52')=>`<rect x="${x0}" y="${y-h}" width="${x1-x0}" height="${h}" fill="${c}"/>${Array.from({length:Math.floor((x1-x0)/24)},(_,i)=>`<rect x="${x0+i*24}" y="${y-h-8}" width="14" height="8" fill="${c}"/>`).join('')}`;
L.chain=(x0,y0,x1,y1)=>`<path d="M${x0} ${y0} L${x1} ${y1}" stroke="#8A8A92" stroke-width="4" stroke-dasharray="6 3"/>`;
L.spring=(x,y,cls='',dl)=>L.g(cls,dl,`<ellipse cx="${x}" cy="${y}" rx="22" ry="6" fill="#7FD3F2"/>${[-1,0,1].map(k=>`<path class="aq-flow" d="M${x+k*6} ${y-2} q${k*6} -16 ${k*12} -2" stroke="#E6FAFF" stroke-width="2" fill="none"/>`).join('')}`);
L.arrow=(x0,y0,x1,y1,c='#FFE7A0')=>`<path class="aq-draw" d="M${x0} ${y0} L${x1} ${y1}" stroke="${c}" stroke-width="2.5"/><circle cx="${x1}" cy="${y1}" r="3.5" fill="${c}"/>`;
L.ship=(x,y,s=1,cls='aq-bob',dl)=>L.g(cls,dl,`<g transform="translate(${x} ${y}) scale(${s})"><path d="M-30 0 H30 L22 12 H-22Z" fill="#7A5232"/><path d="M0 0 V-40 L22 -6Z" fill="#F2EBD0"/></g>`);
L.text=(x,y,t,size=20,fill='#FFF1C8',cls='aq-fo',dl)=>`<g class="${cls}"${D(dl)}>${L.label(x,y,t,size,fill)}</g>`;
L.small=(x,y,t,size=12,fill='#FFE7A0',cls='aq-fo',dl)=>`<g class="${cls}"${D(dl)}>${L.note(x,y,t,size,fill)}</g>`;

window.AAL=L;
})();
