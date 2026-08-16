
const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
window.addEventListener("load",()=>{document.body.classList.add("loaded");setLanguage(currentLanguage());renderTalents();observeReveal();});
window.addEventListener("scroll",()=>$("#header").classList.toggle("scrolled",scrollY>30));
$("#langBtn").onclick=()=>$("#langMenu").classList.toggle("open");
$$("[data-lang]").forEach(b=>b.onclick=()=>{$("#langMenu").classList.remove("open");setLanguage(b.dataset.lang)});
$("#menuBtn").onclick=()=>{document.body.classList.toggle("menu-open"); toast("Use the section links below to explore the universe.")};
function renderTalents(){
 const grid=$("#talentGrid");
 grid.innerHTML=ASAHI.talents.map((t,i)=>`<article class="talent-card reveal" style="--accent:${t.color}" data-id="${t.id}">
   <img src="${t.image}" alt="${t.name}" loading="lazy">
   <div class="tc-copy"><div class="tc-type">${t.type} · ${t.role}</div><h3>${t.name}</h3><p>${t.short[currentLanguage()]}</p></div>
   <div class="tc-arrow">↗</div>
 </article>`).join("");
 $$(".talent-card").forEach(c=>c.onclick=()=>openTalent(c.dataset.id));
}
function openTalent(id){
 const t=ASAHI.talents.find(x=>x.id===id); if(!t)return;
 $("#modalImg").src=t.image;$("#modalName").textContent=t.name;$("#modalType").textContent=t.type;
 $("#modalRole").textContent=t.role;$("#modalShort").textContent=t.short[currentLanguage()];
 $("#modalLore").textContent=t.lore[currentLanguage()];
 $("#modalTags").innerHTML=t.tags.map(x=>`<span>${x}</span>`).join("");
 $("#talentModal").classList.add("open");document.body.style.overflow="hidden";
}
$$("[data-close]").forEach(x=>x.onclick=()=>{$("#talentModal").classList.remove("open");document.body.style.overflow=""});
$("#loreBtn").onclick=()=>{toast(ASAHI.projectDawn.lore[currentLanguage()])};
function toast(msg){const t=$("#toast");t.textContent=msg;t.classList.add("show");clearTimeout(window.__toast);window.__toast=setTimeout(()=>t.classList.remove("show"),5000)}
const qa={
 ja:[
  ["project dawn","Project DawnはAsahiLive Generation 0のグループです。異なる個性を持つAmamiya Ren、Yuna Nanami、Kagami Akiraの三人が、それぞれの光を持ったまま一つの夜明けを作ります。"],
  ["ren","Amamiya RenはFuzzyな個性を持つ、Project Dawnの「The Heart of Dawn」。穏やかで掴みどころのない存在です。"],
  ["yuna","Yuna NanamiはFluffyな個性を持つ「The Dream of Dawn」。夢と温かさを届ける存在です。"],
  ["akira","Kagami AkiraはChaoticな個性を持つ「The Spark of Dawn」。予測不能なエネルギーで物語を動かします。"],
  ["fan","Project Dawn / AsahiLiveのファンネームはDawnkeepers、公式ファンマークは✦🌅です。"]
 ],
 id:[
  ["project dawn","Project Dawn adalah grup AsahiLive dari Generation 0. Terdiri dari Amamiya Ren, Yuna Nanami, dan Kagami Akira—tiga cahaya berbeda yang membentuk satu fajar."],
  ["ren","Amamiya Ren memiliki kepribadian Fuzzy dan berperan sebagai The Heart of Dawn."],
  ["yuna","Yuna Nanami memiliki kepribadian Fluffy dan berperan sebagai The Dream of Dawn."],
  ["akira","Kagami Akira memiliki kepribadian Chaotic dan berperan sebagai The Spark of Dawn."],
  ["fan","Nama fan adalah Dawnkeepers dan fan mark resminya adalah ✦🌅."]
 ],
 en:[
  ["project dawn","Project Dawn is AsahiLive's Generation 0 group. Amamiya Ren, Yuna Nanami, and Kagami Akira each carry a different light while creating one shared dawn."],
  ["ren","Amamiya Ren has a Fuzzy personality and is The Heart of Dawn."],
  ["yuna","Yuna Nanami has a Fluffy personality and is The Dream of Dawn."],
  ["akira","Kagami Akira has a Chaotic personality and is The Spark of Dawn."],
  ["fan","The fan name is Dawnkeepers and the official fan mark is ✦🌅."]
 ]
};
function askGuide(){
 const q=$("#guideInput").value.trim().toLowerCase(); if(!q)return;
 const arr=qa[currentLanguage()]||qa.ja;let answer;
 for(const [k,v] of arr){if(q.includes(k)||((k==="project dawn")&&(q.includes("dawn")||q.includes("project")))){answer=v;break}}
 if(!answer){
   const lang=currentLanguage();
   answer=lang==="ja"?"Project Dawn、タレント、Lore、Fan Communityについて質問できます。":lang==="id"?"Coba tanyakan tentang Project Dawn, Ren, Yuna, Akira, atau fan community.":"Try asking about Project Dawn, Ren, Yuna, Akira, or the fan community.";
 }
 $("#chatAnswer").textContent=answer;
}
$("#askBtn").onclick=askGuide;$("#guideInput").addEventListener("keydown",e=>{if(e.key==="Enter")askGuide()});
function observeReveal(){
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.12});
 $$(".reveal").forEach(x=>io.observe(x));
}
