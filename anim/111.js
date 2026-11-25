/* سورة المسد: مشهد متحرك لكل آية، على معنى التفسير الميسر.
   النبي ﷺ لا يُرسم: يُشار إلى طريقه بالنور والكتابة فقط. الناس رسوم ظلية بلا ملامح. */
(function(){
'use strict';
const L=window.AAL;if(!L||!L.scene)return;
const A=window.AYAH_ANIM=window.AYAH_ANIM||{};
const SC=(id,bg,body,note,css)=>L.scene(111,id,bg,body,note,css);
// امرأة: رسم ظلّي بثوب طويل بلا ملامح
const woman=(x,y,s=1,fill='#0A0E18')=>`<g transform="translate(${x} ${y}) scale(${s})"><circle cy="-42" r="7.5" fill="${fill}"/><path d="M-6 -35 Q0 -38 6 -35 L13 0 H-13Z" fill="${fill}"/></g>`;
// رجل يمدّ ذراعيه (يداه منفصلتان لتذهبا)
const arms=(x,y,s=1,fill='#141018')=>`<g transform="translate(${x} ${y}) scale(${s})"><path d="M8 -26 L26 -36 M-8 -26 L-20 -14" stroke="${fill}" stroke-width="4.5" stroke-linecap="round"/></g>`;
// غصن شوك
const thorn=(x,y,s=1,c='#7A5A34')=>`<g transform="translate(${x} ${y}) scale(${s})"><path d="M-8 0 L8 -2 M-4 -1 l-3 -5 M0 -1 l2 -5 M4 -2 l4 -4 M-2 -1 l-2 4 M3 -1 l3 4" stroke="${c}" stroke-width="1.7" stroke-linecap="round" fill="none"/></g>`;
// حزمة حطب وشوك على الظهر
const bundle=(x,y,s=1)=>`<g transform="translate(${x} ${y}) scale(${s})">${[-6,-2,2,6].map((d,i)=>`<path d="M-18 ${d} L18 ${d-6+i}" stroke="#7A5A34" stroke-width="2.4" stroke-linecap="round"/>`).join('')}${[-12,-4,4,12].map(a=>`<path d="M${a} -6 l-3 -5 M${a+2} 4 l3 4" stroke="#9A7444" stroke-width="1.5" stroke-linecap="round"/>`).join('')}</g>`;
// حبل مفتول من ضفيرتين
const rope=(x,y0,y1)=>{let a=`M${x} ${y0}`,b=`M${x} ${y0}`;for(let y=y0,i=0;y<y1;y+=10,i++){const k=i%2?5:-5;a+=` q${k} 5 0 10`;b+=` q${-k} 5 0 10`}
  return `<path d="${a}" stroke="#B08A50" stroke-width="3" fill="none"/><path d="${b}" stroke="#7A5A30" stroke-width="3" fill="none"/>`};

A[111]={
/* ١ تبت يدا أبي لهب وتب: خسرت يداه وخسر هو بإيذائه رسولَ الله ﷺ */
1:SC(1,'dusk',
`${L.sand('#8A5A3A')}
${L.glow(300,118,44,'#FFF1C2','aq-glow')}${L.lamp(300,122)}${L.small(300,160,'دعوة الحق',12,'#FFF6D8','aq-fo',.6)}
${L.g('aq-dim',2.8,`${L.person(90,170,1.35,'#141018')}${L.g('aq-out',2.2,arms(90,170,1.35))}
${[0,1,2].map(i=>`<circle class="aq-fall" cx="125" cy="${118+i*3}" r="3.5" fill="#2A1E1A" style="--dx:${90+i*20}px;--dy:${48-i*4}px;--r:0deg;animation-delay:${.6+i*.45}s"/>`).join('')}`)}
${L.text(180,96,'تَبَّتْ: خَسِرَتْ وهَلَكَتْ',20,'#FFF1C8','aq-fo',2.6)}`,
'خسرت يدا أبي لهب، وتحقق خسرانه'),

/* ٢ ما أغنى عنه ماله وما كسب: لم ينفعه ماله ولا ولده من عذاب الله */
2:SC(2,'storm',
`${L.ground('#2A2630',172)}
${L.g('aq-fall',2.2,L.coins(118,170,6)+L.small(118,142,'مالُه',13,'#FFE7A0','aq-fo',.4),{'--dx':'-30px','--dy':'60px','--r':'0deg'})}
${L.g('aq-fall',2.4,L.coins(242,170,6)+L.small(242,142,'مالُه',13,'#FFE7A0','aq-fo',.4),{'--dx':'30px','--dy':'60px','--r':'0deg'})}
${L.g('aq-out',2.6,`${L.person(76,172,.8,'#141826')}${L.person(286,172,.8,'#141826')}${L.small(76,120,'ولدُه',13,'#FFE7A0','aq-fo',.7)}${L.small(286,120,'ولدُه',13,'#FFE7A0','aq-fo',.7)}`)}
${L.person(180,172,1.3,'#0E0A12')}
${L.g('aq-up',1.6,`${[40,110,180,250,320].map((x,i)=>L.fire(x,214,.9,i*.12)).join('')}`)}
${L.text(180,72,'مَا أَغْنَى: ما نَفَع',19,'#FFF1C8','aq-fo',3)}`,
'لم ينفعه ماله ولا ولده من عذاب الله'),

/* ٣ سيصلى نارًا ذات لهب: سيدخل نار جهنم ذات اللهب المشتعل */
3:SC(3,'hell',
`${L.g('aq-sink',1.4,`<g class="aq-dim" style="animation-delay:1.4s">${L.glow(292,104,30,'#FF9A4A')}${L.person(292,126,1.1,'#0A0404')}</g>`,{'--dy':'70px','--o':'0'})}
${L.fires(190,6,.9)}${L.embers(9,176)}
${L.text(170,64,'نارًا ذاتَ لَهَب',24,'#FFD9A0','aq-fo',.8)}
${L.small(170,90,'أبو لهب ← إلى نارٍ ذات لهب',13,'#FFE7A0','aq-fo',2.4)}`,
'سيدخل نار جهنم ذات اللهب المشتعل'),

/* ٤ وامرأته حمالة الحطب: كانت تحمل الشوك فتطرحه في طريق النبي ﷺ لتؤذيه */
4:SC(4,'night',
`${L.stars(16,9,110)}${L.moon(60,62,14,'#141C38')}
<path d="M0 182 Q180 166 360 182 V200 H0Z" fill="#4A3C2C"/>
<path d="M0 182 Q180 166 360 182" stroke="#FFE7A0" stroke-width="1.5" stroke-dasharray="3 7" opacity=".55"/>
${L.small(180,194,'طريق النبي ﷺ',11,'#FFE7A0','aq-fo',.2)}
${[300,250,200,150,100].map(x=>L.g('aq-pop',+(.3+(330-x)/250*3.4).toFixed(2),thorn(x,+(180-32*(x/360)*(1-x/360)).toFixed(1),1.2))).join('')}
${L.g('aq-run',.3,`${woman(330,176,1.15)}${bundle(338,128,.9)}`,{'--dx':'-250px'})}
${L.text(180,92,'حَمَّالَةَ الحَطَب: تحمل الشوك',18,'#FFF1C8','aq-fo',3.6)}`,
'تطرح الشوك في طريق النبي ﷺ لتؤذيه'),

/* ٥ في جيدها حبل من مسد: في عنقها حبل من ليف خشن محكم الفتل، ترفع به في النار ثم ترمى */
5:SC(5,'hell',
`${L.palm(52,176,1.05,'aq-sway',0)}
<path class="aq-draw" d="M62 120 Q74 112 86 118" stroke="#C9A06A" stroke-width="2" fill="none"/>
${L.arrow(90,118,128,118,'#FFE7A0')}
${L.small(60,192,'مَسَد: ليف النخل',12,'#FFE7A0','aq-fo',.5)}
<g class="ry">${rope(250,-90,96)}${L.glow(250,104,30,'#FF9A4A')}${woman(250,130,1,'#140606')}</g>
${[200,240,280,320,355].map((x,i)=>L.fire(x,204,.85,i*.11)).join('')}
${L.small(160,62,'حبلٌ من ليفٍ خشن',13,'#FFE7A0','aq-fo',1.4)}`,
'في عنقها حبل محكم الفتل من ليف خشن',
`.ry{animation:ry 3.6s 1s ease-in-out infinite}@keyframes ry{0%{transform:translateY(16px)}45%,58%{transform:translateY(-34px)}100%{transform:translateY(22px);opacity:.55}}`)
};
})();
