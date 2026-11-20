/* محرّك أحكام التجويد — يقرأ نص الآية (الرسم الإملائي المشكول، رواية حفص) ويستخرج أحكامها.
   يُستعمل في كتب مكتبة الحفظ وفي صفحة تعلّم التجويد. */
(function(root){
'use strict';
const RULES={
  ikhfa:{n:'إخفاء حقيقي',c:'g',lesson:'noon',how:'أخفي النون بغنّة مقدار حركتين، ولا يلمس اللسان مخرج النون.'},
  idgham_g:{n:'إدغام بغنّة',c:'g',lesson:'noon',how:'أدخلي النون في الحرف التالي مع غنّة مقدار حركتين.'},
  idgham_n:{n:'إدغام بلا غنّة',c:'s',lesson:'noon',how:'لا تنطقي النون، وانتقلي مباشرة إلى اللام أو الراء المشددة بلا غنّة.'},
  iqlab:{n:'إقلاب',c:'g',lesson:'noon',how:'اقلبي النون ميمًا مخفاة بغنّة مقدار حركتين، مع إطباق خفيف للشفتين.'},
  izhar:{n:'إظهار حلقي',c:'',lesson:'noon',how:'انطقي النون واضحة دون غنّة زائدة.'},
  izhar_m:{n:'إظهار مطلق',c:'',lesson:'noon',how:'النون والحرف بعدها في كلمة واحدة، فتُظهر النون.'},
  ikhfa_sh:{n:'إخفاء شفوي',c:'g',lesson:'meem',how:'أخفي الميم عند الباء بغنّة مقدار حركتين، مع إطباق خفيف للشفتين.'},
  idgham_sh:{n:'إدغام شفوي',c:'g',lesson:'meem',how:'أدغمي الميم الساكنة في الميم التالية بغنّة مقدار حركتين.'},
  izhar_sh:{n:'إظهار شفوي',c:'',lesson:'meem',how:'انطقي الميم ساكنة واضحة، وخاصة قبل الواو والفاء.'},
  ghunna:{n:'غنّة مشدّدة',c:'g',lesson:'ghunna',how:'النون أو الميم المشددة: غنّة كاملة مقدار حركتين.'},
  qalqala:{n:'قلقلة صغرى',c:'q',lesson:'qalqala',how:'حرف القلقلة ساكن: اقلقليه بنبرة خفيفة دون أن تحرّكيه.'},
  qalqala_k:{n:'قلقلة كبرى',c:'q',lesson:'qalqala',how:'عند الوقف على حرف القلقلة تكون القلقلة أوضح.'},
  madd_lazim:{n:'مد لازم',c:'m6',lesson:'madd',how:'مدّي ست حركات دائمًا.'},
  madd_harfi:{n:'مد لازم حرفي',c:'m6',lesson:'madd',how:'الحروف المقطعة: تُمد ست حركات في الحروف التي هجاؤها ثلاثة أحرف أوسطها حرف مد.'},
  madd_muttasil:{n:'مد متصل',c:'m4',lesson:'madd',how:'حرف المد وبعده همزة في الكلمة نفسها: مدّي أربع أو خمس حركات.'},
  madd_munfasil:{n:'مد منفصل',c:'m4',lesson:'madd',how:'حرف المد في آخر الكلمة والهمزة في أول الكلمة التالية: أربع أو خمس حركات.'},
  madd_arid:{n:'مد عارض للسكون',c:'m2',lesson:'madd',how:'عند الوقف على آخر الآية: يجوز ٢ أو ٤ أو ٦ حركات، والتزمي مقدارًا واحدًا.'},
  madd_leen:{n:'مد اللين',c:'m2',lesson:'madd',how:'واو أو ياء ساكنة قبلها فتح، عند الوقف: ٢ أو ٤ أو ٦ حركات.'},
  madd_badal:{n:'مد بدل',c:'mb',lesson:'madd',how:'همزة بعدها حرف مد: حركتان.'},
  lam_shams:{n:'لام شمسية',c:'s',lesson:'lam',how:'اللام لا تُنطق، ويُشدَّد الحرف الذي بعدها.'},
  lam_qamar:{n:'لام قمرية',c:'',lesson:'lam',how:'اللام تُنطق ساكنة واضحة.'},
  idgham_x:{n:'إدغام متجانسين أو متقاربين',c:'s',lesson:'idgham',how:'الحرف الأول لا يُنطق، ويُنطق الحرف الثاني مشددًا.'},
  sakt:{n:'سكت',c:'q',lesson:'waqf',how:'اسكتي سكتة لطيفة بلا تنفّس، ثم أكملي.'}
};
const ORDER=['madd_lazim','madd_harfi','madd_muttasil','madd_munfasil','madd_arid','madd_leen','madd_badal','ghunna','ikhfa','idgham_g','iqlab','idgham_n','izhar','izhar_m','ikhfa_sh','idgham_sh','izhar_sh','qalqala','qalqala_k','lam_shams','lam_qamar','idgham_x','sakt'];
const MARK=/[ؐ-ًؚ-ٰٟۖ-ۭ]/;
const WAQF=/^[ۖ-ۛ]$/;
const HAMZA='ءأإؤئآ';
const QALQ='قطبجد';
const IZHAR='ءأإؤئآهعحغخ';
const IDG_G='ينمو', IDG_N='لر';
const IKHFA='تثجدذزسشصضطظفقك';
const MUQ={'الم':1,'المص':1,'الر':1,'المر':1,'كهيعص':1,'طه':0,'طسم':1,'طس':1,'يس':1,'ص':1,'حم':1,'عسق':1,'ق':1,'ن':1};
const strip=w=>w.replace(/[ً-ٰٟۖ-ۭ]/g,'');
function clusters(w){const out=[];for(const ch of w){if(MARK.test(ch)&&out.length)out[out.length-1].m+=ch;else out.push({c:ch,m:''})}return out}
const has=(x,ch)=>x.m.indexOf(ch)>=0;
const SUK='ْ',SHD='ّ',FAT='َ',DAM='ُ',KAS='ِ',SUP='ٰ';
const vowel=x=>/[ً-ِٰ]/.test(x.m);
const bare=x=>!/[ً-ْٰ]/.test(x.m);
const tanween=x=>/[ً-ٍ]/.test(x.m);

/* analyze(text) → {words:[{t, segs:[{t,r}], rules:[keys]}], found:{key:[wordIndex,…]}}
   النص: كلمات الآية مفصولة بمسافات، وعلامات الوقف كلمات مستقلة تُتجاهل. */
function analyze(text,opt){
  opt=opt||{};
  const toks=text.split(' ').filter(t=>t&&!WAQF.test(t));
  const W=toks.map(t=>({t,cl:clusters(t)}));
  const L=[];W.forEach((w,wi)=>w.cl.forEach((x,ci)=>{x.w=wi;x.ci=ci;x.r=null;x.last=ci===w.cl.length-1;L.push(x)}));
  const found={};
  const tag=(x,r)=>{if(!x)return;if(!x.r||ORDER.indexOf(r)<ORDER.indexOf(x.r))x.r=r;(found[r]=found[r]||[]);if(found[r].indexOf(x.w)<0)found[r].push(x.w)};
  const isFariqa=x=>x&&x.c==='ا'&&bare(x)&&x.last&&x.ci>0&&W[x.w].cl[x.ci-1].c==='و';
  // الحرف المنطوق التالي (يتخطى ألف التفريق وهمزة الوصل)
  function next(j){
    let k=j+1;
    while(k<L.length&&(isFariqa(L[k])||(L[k].c==='ى'&&bare(L[k])&&L[k-1].w===L[k].w&&tanween(L[k-1]))||(L[k].c==='ا'&&bare(L[k])&&L[k].w===L[j].w&&tanween(L[j]))))k++;
    if(k>=L.length)return null;
    const y=L[k];
    if(y.w!==L[j].w&&y.ci===0&&y.c==='ا'&&bare(y))return {wasl:true,x:y};
    return {x:y,same:y.w===L[j].w};
  }
  const lastPron=wi=>{const cl=W[wi].cl;let k=cl.length-1;while(k>0&&(isFariqa(cl[k])||(cl[k].c==='ا'&&bare(cl[k])&&tanween(cl[k-1]))||(cl[k].c==='ى'&&bare(cl[k])&&tanween(cl[k-1]))))k--;return k};
  const lastW=W.length-1;
  // الحروف المقطعة
  W.forEach((w,wi)=>{const s=strip(w.t);if(wi===0&&s in MUQ&&w.cl.every(x=>bare(x)||has(x,SUP)||has(x,'ٓ'))){w.muq=true;if(MUQ[s])w.cl.forEach(x=>tag(x,'madd_harfi'))}});
  for(let j=0;j<L.length;j++){
    const x=L[j];if(W[x.w].muq)continue;
    const isEndOfAyah=x.w===lastW&&x.ci>=lastPron(lastW);
    if(has(x,'ۜ')&&x.ci===W[x.w].cl.length-1){tag(x,'sakt')}
    // النون الساكنة والتنوين
    const ns=x.c==='ن'&&(has(x,SUK)||bare(x))&&!(x.w===0&&strip(W[0].t)==='ن');
    if((ns||tanween(x))&&!isEndOfAyah&&!has(x,'ۜ')){
      const n=next(j);
      if(n&&!n.wasl){const y=n.x,c=y.c;
        if(ns&&n.same&&'يو'.includes(c))tag(x,'izhar_m');
        else if(IZHAR.includes(c))tag(x,'izhar');
        else if(IDG_G.includes(c)){tag(x,'idgham_g');tag(y,'idgham_g')}
        else if(IDG_N.includes(c)){tag(x,'idgham_n');tag(y,'idgham_n')}
        else if(c==='ب')tag(x,'iqlab');
        else if(IKHFA.includes(c))tag(x,'ikhfa');
      }
    }
    // الميم الساكنة
    if(x.c==='م'&&(has(x,SUK)||bare(x))&&!isEndOfAyah){
      const n=next(j);
      if(n&&!n.wasl){if(n.x.c==='ب')tag(x,'ikhfa_sh');else if(n.x.c==='م'){tag(x,'idgham_sh');tag(n.x,'idgham_sh')}else if(has(x,SUK))tag(x,'izhar_sh')}
    }
    // الغنة المشددة
    if((x.c==='ن'||x.c==='م')&&has(x,SHD))tag(x,'ghunna');
    // القلقلة
    if(QALQ.includes(x.c)){
      if(x.w===lastW&&x.ci===lastPron(lastW)&&!bare(x))tag(x,'qalqala_k');
      else if(has(x,SUK))tag(x,'qalqala');
    }
    // اللام الشمسية والقمرية، والإدغام
    if(x.c==='ل'&&x.ci>0){
      const p=W[x.w].cl[x.ci-1],y=L[j+1];
      const sk=strip(W[x.w].t).replace(/^[وفب]/,'');
      const jalala=/^(ال|ل)له$/.test(sk)||sk==='للهم'||/^ال?لهم$/.test(sk);
      const isAl=(p.c==='ا'&&bare(p)&&(x.ci===1||(x.ci===2&&'وفبك'.includes(W[x.w].cl[0].c))))||(p.c==='ل'&&has(p,KAS)&&(x.ci===1||(x.ci===2&&'وف'.includes(W[x.w].cl[0].c))));
      if(isAl&&y&&y.w===x.w){
        if(!jalala){if(bare(x)&&has(y,SHD))tag(x,'lam_shams');else if(has(x,SUK))tag(x,'lam_qamar')}
        continue;
      }
    }
    // إدغام المتجانسين والمتقاربين والمتماثلين: حرف بلا حركة بعده حرف مشدد
    if(bare(x)&&!'اويىنمء'.includes(x.c)&&!(x.ci===0)){
      const y=L[j+1];
      if(y&&has(y,SHD)&&!(x.c==='ل'&&x.ci===1&&W[x.w].cl[0].c==='ا')){tag(x,'idgham_x')}
    }
  }
  // المدود
  const isMaddAt=(cl,k)=>{const x=cl[k],p=cl[k-1];
    if(!x)return false;
    if(has(x,SUP)&&x.c!=='ى')return 'sup';
    if(!p)return false;
    if(x.c==='ا'&&bare(x)&&has(p,FAT)&&!tanween(p)){
      // همزة الوصل بعد الواو أو الفاء: «وَالَّذِينَ»، «فَاسْتَقِمْ» ليست مدًّا
      const y=cl[k+1];if(k===1&&'وف'.includes(p.c)&&y&&(has(y,SUK)||has(y,SHD)||(y.c==='ل'&&bare(y))))return false;
      return 'a'}
    if(x.c==='ى'&&(bare(x)||has(x,SUP))&&has(p,FAT)&&!tanween(p))return 'a';
    if(x.c==='و'&&(bare(x)||has(x,SUK))&&has(p,DAM)&&!(p.c==='أ'&&cl[k+1]&&cl[k+1].c==='ل'))return 'w';
    if(x.c==='ي'&&(bare(x)||has(x,SUK))&&has(p,KAS)&&!has(x,SHD))return 'y';
    return false};
  W.forEach((w,wi)=>{
    if(w.muq)return;
    const cl=w.cl,sk=strip(w.t);
    for(let k=0;k<cl.length;k++){
      const x=cl[k];
      // الألف الممدودة «آ» = همزة ثم ألف
      if(x.c==='آ'){const y=cl[k+1];
        if(y&&(has(y,SUK)||(bare(y)&&cl[k+2]&&has(cl[k+2],SHD))||has(y,SHD)))tag(x,'madd_lazim');else tag(x,'madd_badal');continue}
      const t=isMaddAt(cl,k);if(!t)continue;
      const tgt=t==='sup'?x:x;
      const y=cl[k+1];
      if(y&&HAMZA.includes(y.c)&&!(t==='sup'&&/^(ي|)ها?ؤل/.test(sk))){tag(tgt,'madd_muttasil');continue}
      if(y&&(has(y,SHD)||(has(y,SUK)&&y.c!=='ا'))&&t!=='sup'){tag(tgt,'madd_lazim');continue}
      const lp=lastPron(wi);
      if(k===lp||(t==='sup'&&k===lp)){
        if(wi<lastW){const nx=W[wi+1].cl[0];
          if(nx&&HAMZA.includes(nx.c)&&!/^[وف]?أنا$/.test(sk)){tag(tgt,'madd_munfasil');continue}}
      }
      if(wi===lastW&&k===lp-1){tag(tgt,'madd_arid');continue}
      const p=cl[k-1];
      if(p&&HAMZA.includes(p.c)&&t!=='sup'){tag(tgt,'madd_badal');continue}
    }
    // اللين العارض للسكون
    if(wi===lastW){const lp=lastPron(wi),y=cl[lp-1],p=cl[lp-2];
      if(y&&p&&(y.c==='و'||y.c==='ي')&&has(y,SUK)&&has(p,FAT))tag(y,'madd_leen')}
  });
  const words=W.map((w,wi)=>{
    const segs=[];w.cl.forEach(x=>{const r=x.r&&RULES[x.r].c?x.r:null;const t=x.c+x.m;if(segs.length&&segs[segs.length-1].r===r)segs[segs.length-1].t+=t;else segs.push({t,r})});
    const rules=[...new Set(w.cl.map(x=>x.r).filter(Boolean))];
    return {t:w.t,segs,rules};
  });
  // الأحكام الظاهرة غير الملوّنة تُسجَّل للقائمة فقط
  return {words,found};
}
function colorHTML(word){return word.segs.map(s=>s.r?`<span class="tj tj-${RULES[s.r].c}" data-r="${s.r}">${s.t}</span>`:s.t).join('')}
root.TAJWEED={RULES,ORDER,analyze,colorHTML,strip};
})(typeof window!=='undefined'?window:globalThis);
