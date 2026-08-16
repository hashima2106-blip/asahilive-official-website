/* =========================================
   ASAHILIVE OFFICIAL WEBSITE
   APP.JS v2.0
   ========================================= */

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);


/* =========================================
   INITIALIZATION
   ========================================= */

window.addEventListener("load", () => {

  document.body.classList.add("loaded");

  setLanguage(currentLanguage());

  renderTalents();

  renderCommunity();

  renderNavigation();

  observeReveal();

});


/* =========================================
   HEADER SCROLL
   ========================================= */

window.addEventListener("scroll", () => {

  const header = $("#header");

  if (!header) return;

  header.classList.toggle(
    "scrolled",
    window.scrollY > 30
  );

});


/* =========================================
   LANGUAGE MENU
   ========================================= */

const langBtn = $("#langBtn");
const langMenu = $("#langMenu");

if (langBtn && langMenu) {

  langBtn.addEventListener("click", (event) => {

    event.stopPropagation();

    langMenu.classList.toggle("open");

  });

}


$$("[data-lang]").forEach((button) => {

  button.addEventListener("click", () => {

    const lang = button.dataset.lang;

    if (typeof setLanguage === "function") {
      setLanguage(lang);
    }

    if (langMenu) {
      langMenu.classList.remove("open");
    }

  });

});


document.addEventListener("click", (event) => {

  if (
    langMenu &&
    langBtn &&
    !langMenu.contains(event.target) &&
    !langBtn.contains(event.target)
  ) {

    langMenu.classList.remove("open");

  }

});


/* =========================================
   MOBILE MENU
   ========================================= */

const menuBtn = $("#menuBtn");

if (menuBtn) {

  menuBtn.addEventListener("click", () => {

    document.body.classList.toggle("menu-open");

  });

}


/* =========================================
   NAVIGATION
   ========================================= */

function renderNavigation() {

  const nav = $("#nav");

  if (!nav) return;

  nav.innerHTML = `
    <a href="#top">Home</a>
    <a href="#talents">Talents</a>
    <a href="#dawn">Project Dawn</a>
    <a href="#about">About</a>
    <a href="#guide">Universe Guide</a>
  `;

}


$$("a[href^='#']").forEach((link) => {

  link.addEventListener("click", () => {

    document.body.classList.remove("menu-open");

  });

});


/* =========================================
   TALENTS
   ========================================= */

function renderTalents() {

  const grid = $("#talentGrid");

  if (!grid) return;

  if (
    typeof ASAHI === "undefined" ||
    !Array.isArray(ASAHI.talents)
  ) {

    grid.innerHTML = `
      <p class="empty-message">
        Talent data is currently unavailable.
      </p>
    `;

    return;

  }


  const lang =
    typeof currentLanguage === "function"
      ? currentLanguage()
      : "ja";


  grid.innerHTML = ASAHI.talents.map((talent) => {

    const short =
      talent.short?.[lang] ||
      talent.short?.ja ||
      "";


    return `

      <article
        class="talent-card reveal"
        style="--accent:${talent.color || "#ffffff"}"
        data-id="${talent.id}"
      >

        <div class="talent-image">

          <img
            src="${talent.image}"
            alt="${talent.name}"
            loading="lazy"
          >

        </div>


        <div class="tc-copy">

          <div class="tc-type">

            ${talent.type || ""}

            ${talent.role ? " · " + talent.role : ""}

          </div>


          <h3>
            ${talent.name}
          </h3>


          <p>
            ${short}
          </p>


          <span class="profile-link">

            ${
              window.I18N?.[lang]?.viewProfile ||
              "View profile"
            }

            ↗

          </span>

        </div>


        <div class="tc-arrow">
          ↗
        </div>

      </article>

    `;

  }).join("");


  $$(".talent-card").forEach((card) => {

    card.addEventListener("click", () => {

      openTalent(card.dataset.id);

    });

  });


  observeReveal();

}


/* =========================================
   TALENT MODAL
   ========================================= */

function openTalent(id) {

  if (
    typeof ASAHI === "undefined" ||
    !Array.isArray(ASAHI.talents)
  ) {
    return;
  }


  const talent =
    ASAHI.talents.find(
      (item) => item.id === id
    );


  if (!talent) return;


  const lang =
    typeof currentLanguage === "function"
      ? currentLanguage()
      : "ja";


  const modal = $("#talentModal");

  if (!modal) return;


  const modalImg = $("#modalImg");
  const modalName = $("#modalName");
  const modalType = $("#modalType");
  const modalRole = $("#modalRole");
  const modalShort = $("#modalShort");
  const modalLore = $("#modalLore");
  const modalTags = $("#modalTags");


  if (modalImg) {

    modalImg.src = talent.image;
    modalImg.alt = talent.name;

  }


  if (modalName) {

    modalName.textContent =
      talent.name || "";

  }


  if (modalType) {

    modalType.textContent =
      talent.type || "";

  }


  if (modalRole) {

    modalRole.textContent =
      talent.role || "";

  }


  if (modalShort) {

    modalShort.textContent =
      talent.short?.[lang] ||
      talent.short?.ja ||
      "";

  }


  if (modalLore) {

    modalLore.textContent =
      talent.lore?.[lang] ||
      talent.lore?.ja ||
      "";

  }


  if (modalTags) {

    modalTags.innerHTML =
      (talent.tags || [])
        .map(
          (tag) =>
            `<span>${tag}</span>`
        )
        .join("");

  }


  modal.classList.add("open");

  document.body.style.overflow = "hidden";

}


/* =========================================
   CLOSE MODAL
   ========================================= */

$$("[data-close]").forEach((element) => {

  element.addEventListener("click", closeTalent);

});


function closeTalent() {

  const modal = $("#talentModal");

  if (!modal) return;

  modal.classList.remove("open");

  document.body.style.overflow = "";

}


document.addEventListener("keydown", (event) => {

  if (event.key === "Escape") {

    closeTalent();

  }

});


/* =========================================
   PROJECT DAWN LORE
   ========================================= */

const loreBtn = $("#loreBtn");

if (loreBtn) {

  loreBtn.addEventListener("click", () => {

    const lang =
      typeof currentLanguage === "function"
        ? currentLanguage()
        : "ja";


    const lore =
      ASAHI?.projectDawn?.lore?.[lang] ||
      ASAHI?.projectDawn?.lore?.ja ||
      "Project Dawn";


    toast(lore);

  });

}


/* =========================================
   COMMUNITY
   ========================================= */

function renderCommunity() {

  if (
    typeof ASAHI === "undefined"
  ) {
    return;
  }


  const fans =
    ASAHI.fans || {};


  const fanName =
    $("#fanName");

  const fanMark =
    $("#fanMark");

  const colorDots =
    $("#colorDots");


  if (fanName) {

    fanName.textContent =
      fans.name || "Dawnkeepers";

  }


  if (fanMark) {

    fanMark.textContent =
      fans.mark || "✦🌅";

  }


  if (colorDots) {

    const colors =
      fans.colors ||
      fans.officialColors ||
      [];


    if (Array.isArray(colors)) {

      colorDots.innerHTML =
        colors.map((color) => `

          <span
            class="color-dot"
            style="
              background:${color};
            "
            title="${color}"
          ></span>

        `).join("");

    }

  }

}


/* =========================================
   UNIVERSE GUIDE
   ========================================= */

const qa = {

  ja: [

    [
      "project dawn",

      "Project DawnはAsahiLive Generation 0のグループです。異なる個性を持つAmamiya Ren、Yuna Nanami、Kagami Akiraの三人が、それぞれの光を持ったまま一つの夜明けを作ります。"
    ],

    [
      "ren",

      "Amamiya RenはFuzzyな個性を持つ、Project Dawnの「The Heart of Dawn」。穏やかで掴みどころのない存在です。"
    ],

    [
      "yuna",

      "Yuna NanamiはFluffyな個性を持つ「The Dream of Dawn」。夢と温かさを届ける存在です。"
    ],

    [
      "akira",

      "Kagami AkiraはChaoticな個性を持つ「The Spark of Dawn」。予測不能なエネルギーで物語を動かします。"
    ],

    [
      "fan",

      "Project Dawn / AsahiLiveのファンネームはDawnkeepers、公式ファンマークは✦🌅です。"
    ]

  ],


  id: [

    [
      "project dawn",

      "Project Dawn adalah grup AsahiLive dari Generation 0. Terdiri dari Amamiya Ren, Yuna Nanami, dan Kagami Akira—tiga cahaya berbeda yang membentuk satu fajar."
    ],

    [
      "ren",

      "Amamiya Ren memiliki kepribadian Fuzzy dan berperan sebagai The Heart of Dawn."
    ],

    [
      "yuna",

      "Yuna Nanami memiliki kepribadian Fluffy dan berperan sebagai The Dream of Dawn."
    ],

    [
      "akira",

      "Kagami Akira memiliki kepribadian Chaotic dan berperan sebagai The Spark of Dawn."
    ],

    [
      "fan",

      "Nama fan adalah Dawnkeepers dan fan mark resminya adalah ✦🌅."
    ]

  ],


  en: [

    [
      "project dawn",

      "Project Dawn is AsahiLive's Generation 0 group. Amamiya Ren, Yuna Nanami, and Kagami Akira each carry a different light while creating one shared dawn."
    ],

    [
      "ren",

      "Amamiya Ren has a Fuzzy personality and is The Heart of Dawn."
    ],

    [
      "yuna",

      "Yuna Nanami has a Fluffy personality and is The Dream of Dawn."
    ],

    [
      "akira",

      "Kagami Akira has a Chaotic personality and is The Spark of Dawn."
    ],

    [
      "fan",

      "The fan name is Dawnkeepers and the official fan mark is ✦🌅."
    ]

  ]

};


function askGuide() {

  const input =
    $("#guideInput");

  const answerBox =
    $("#chatAnswer");


  if (!input || !answerBox) {
    return;
  }


  const question =
    input.value
      .trim()
      .toLowerCase();


  if (!question) {
    return;
  }


  const lang =
    typeof currentLanguage === "function"
      ? currentLanguage()
      : "ja";


  const list =
    qa[lang] || qa.ja;


  let answer = null;


  for (const [keyword, response] of list) {

    if (question.includes(keyword)) {

      answer = response;

      break;

    }

  }


  if (!answer) {

    if (lang === "ja") {

      answer =
        "Project Dawn、タレント、Lore、Fan Communityについて質問できます。";

    }

    else if (lang === "id") {

      answer =
        "Coba tanyakan tentang Project Dawn, Ren, Yuna, Akira, atau fan community.";

    }

    else {

      answer =
        "Try asking about Project Dawn, Ren, Yuna, Akira, or the fan community.";

    }

  }


  answerBox.textContent = answer;

  input.value = "";

}


const askBtn =
  $("#askBtn");


if (askBtn) {

  askBtn.addEventListener(
    "click",
    askGuide
  );

}


const guideInput =
  $("#guideInput");


if (guideInput) {

  guideInput.addEventListener(
    "keydown",
    (event) => {

      if (event.key === "Enter") {

        askGuide();

      }

    }
  );

}


/* =========================================
   TOAST
   ========================================= */

function toast(message) {

  const toastElement =
    $("#toast");


  if (!toastElement) {
    return;
  }


  toastElement.textContent =
    message;


  toastElement.classList.add("show");


  clearTimeout(
    window.__asahiliveToast
  );


  window.__asahiliveToast =
    setTimeout(() => {

      toastElement.classList.remove(
        "show"
      );

    }, 5000);

}


/* =========================================
   REVEAL ANIMATION
   ========================================= */

function observeReveal() {

  const elements =
    $$(".reveal");


  if (!elements.length) {
    return;
  }


  if (
    !("IntersectionObserver" in window)
  ) {

    elements.forEach((element) => {

      element.classList.add(
        "visible"
      );

    });

    return;

  }


  const observer =
    new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              "visible"
            );

            observer.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold: 0.12
      }
    );


  elements.forEach((element) => {

    observer.observe(element);

  });

}


/* =========================================
   LANGUAGE CHANGE REFRESH
   ========================================= */

window.addEventListener(
  "languageChanged",
  () => {

    renderTalents();

    renderCommunity();

    observeReveal();

  }
);
