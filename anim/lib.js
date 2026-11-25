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
window.AAL=L;
})();
