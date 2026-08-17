/* =========================================================
   ASAHILIVE OFFICIAL WEBSITE
   APP.JS v3.0
   FULL REPLACEMENT
   ========================================================= */


/* =========================================================
   BASIC HELPERS
   ========================================================= */

const $ = (selector) => {
  return document.querySelector(selector);
};


const $$ = (selector) => {
  return document.querySelectorAll(selector);
};


/* =========================================================
   SAFE LANGUAGE
   ========================================================= */

function getLanguage() {

  try {

    if (typeof currentLanguage === "function") {
      return currentLanguage();
    }

  } catch (error) {

    console.warn(
      "Language detection failed:",
      error
    );

  }

  return "ja";
}


/* =========================================================
   INITIALIZATION
   ========================================================= */

window.addEventListener("load", () => {

  /*
   * Reveal website from splash/loading screen.
   */
  document.body.classList.add("loaded");


  /*
   * Language
   */
  try {

    if (
      typeof setLanguage === "function"
    ) {

      setLanguage(
        getLanguage()
      );

    }

  } catch (error) {

    console.warn(
      "Language initialization failed:",
      error
    );

  }


  /*
   * Main rendering
   */
  renderTalents();

  renderCommunity();

  renderNavigation();


  /*
   * Reveal animation
   */
  observeReveal();


  /*
   * Make sure loading state is removed.
   */
  setTimeout(() => {

    document.body.classList.add("loaded");

  }, 100);

});


/* =========================================================
   HEADER SCROLL
   ========================================================= */

window.addEventListener(
  "scroll",
  () => {

    const header =
      $("#header");


    if (!header) {
      return;
    }


    header.classList.toggle(
      "scrolled",
      window.scrollY > 30
    );

  }
);


/* =========================================================
   LANGUAGE MENU
   ========================================================= */

const langBtn =
  $("#langBtn");

const langMenu =
  $("#langMenu");


if (
  langBtn &&
  langMenu
) {

  langBtn.addEventListener(
    "click",
    (event) => {

      event.stopPropagation();

      langMenu.classList.toggle(
        "open"
      );

    }
  );

}


$$("[data-lang]").forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const lang =
          button.dataset.lang;


        if (
          typeof setLanguage === "function"
        ) {

          try {

            setLanguage(lang);

          } catch (error) {

            console.warn(
              "Language change failed:",
              error
            );

          }

        }


        if (langMenu) {

          langMenu.classList.remove(
            "open"
          );

        }

      }
    );

  }
);


document.addEventListener(
  "click",
  (event) => {

    if (
      langMenu &&
      langBtn &&
      !langMenu.contains(
        event.target
      ) &&
      !langBtn.contains(
        event.target
      )
    ) {

      langMenu.classList.remove(
        "open"
      );

    }

  }
);


/* =========================================================
   MOBILE MENU
   ========================================================= */

const menuBtn =
  $("#menuBtn");


if (menuBtn) {

  menuBtn.addEventListener(
    "click",
    () => {

      document.body.classList.toggle(
        "menu-open"
      );

    }
  );

}


/* =========================================================
   NAVIGATION
   ========================================================= */

function renderNavigation() {

  const nav =
    $("#nav");


  if (!nav) {
    return;
  }


  nav.innerHTML = `
    <a href="#top">Home</a>
    <a href="#talents">Talents</a>
    <a href="#dawn">Project Dawn</a>
    <a href="#about">About</a>
    <a href="#guide">Universe Guide</a>
  `;

}


/* =========================================================
   NAVIGATION CLICK
   ========================================================= */

$$("a[href^='#']").forEach(
  (link) => {

    link.addEventListener(
      "click",
      () => {

        document.body.classList.remove(
          "menu-open"
        );

      }
    );

  }
);


/* =========================================================
   TALENT DATA CHECK
   ========================================================= */

function getTalents() {

  if (
    typeof ASAHI === "undefined"
  ) {

    console.error(
      "ASAHI data is not available."
    );

    return [];

  }


  if (
    !Array.isArray(
      ASAHI.talents
    )
  ) {

    console.error(
      "ASAHI.talents is not an array."
    );

    return [];

  }


  return ASAHI.talents;

}


/* =========================================================
   TALENTS
   ========================================================= */

function renderTalents() {

  const grid =
    $("#talentGrid");


  if (!grid) {
    return;
  }


  const talents =
    getTalents();


  if (!talents.length) {

    grid.innerHTML = `
      <p class="empty-message">
        Talent data is currently unavailable.
      </p>
    `;

    return;

  }


  const lang =
    getLanguage();


  grid.innerHTML =
    talents.map(
      (talent) => {

        const short =
          talent.short?.[lang] ||
          talent.short?.ja ||
          "";


        return `
          <article
            class="talent-card reveal"
            style="--accent:${talent.color || "#ffffff"}"
            data-id="${talent.id || ""}"
          >

            <div class="talent-image">

              <img
                src="${talent.image || ""}"
                alt="${talent.name || ""}"
                loading="lazy"
              >

            </div>


            <div class="tc-copy">

              <div class="tc-type">

                ${talent.type || ""}

                ${
                  talent.role
                    ? " · " + talent.role
                    : ""
                }

              </div>


              <h3>
                ${talent.name || ""}
              </h3>


              <p>
                ${short}
              </p>


              <span class="profile-link">

                ${
                  window.I18N?.[
                    lang
                  ]?.viewProfile ||
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

      }
    ).join("");


  /*
   * Talent card click
   */

  $$(".talent-card").forEach(
    (card) => {

      card.addEventListener(
        "click",
        () => {

          const id =
            card.dataset.id;


          if (id) {

            openTalent(id);

          }

        }
      );

    }
  );


  observeReveal();

}


/* =========================================================
   TALENT MODAL
   ========================================================= */

function openTalent(id) {

  const talents =
    getTalents();


  if (!talents.length) {
    return;
  }


  const talent =
    talents.find(
      (item) =>
        String(item.id) ===
        String(id)
    );


  if (!talent) {

    console.warn(
      "Talent not found:",
      id
    );

    return;

  }


  const lang =
    getLanguage();


  const modal =
    $("#talentModal");


  if (!modal) {

    console.warn(
      "#talentModal was not found."
    );

    return;

  }


  /*
   * Existing modal elements
   */

  const modalImg =
    $("#modalImg");


  const modalName =
    $("#modalName");


  const modalType =
    $("#modalType");


  const modalRole =
    $("#modalRole");


  const modalShort =
    $("#modalShort");


  const modalLore =
    $("#modalLore");


  const modalTags =
    $("#modalTags");


  /*
   * IMAGE
   */

  if (modalImg) {

    modalImg.src =
      talent.image || "";

    modalImg.alt =
      talent.name || "";

  }


  /*
   * NAME
   */

  if (modalName) {

    modalName.textContent =
      talent.name || "";

  }


  /*
   * TYPE
   */

  if (modalType) {

    modalType.textContent =
      talent.type || "";

  }


  /*
   * ROLE
   */

  if (modalRole) {

    modalRole.textContent =
      talent.role || "";

  }


  /*
   * SHORT DESCRIPTION
   */

  if (modalShort) {

    modalShort.textContent =
      talent.short?.[lang] ||
      talent.short?.ja ||
      "";

  }


  /*
   * LORE
   */

  if (modalLore) {

    modalLore.textContent =
      talent.lore?.[lang] ||
      talent.lore?.ja ||
      "";

  }


  /*
   * TAGS
   */

  if (modalTags) {

    const tags =
      Array.isArray(
        talent.tags
      )
        ? talent.tags
        : [];


    modalTags.innerHTML =
      tags
        .map(
          (tag) => {

            return `
              <span>
                ${tag}
              </span>
            `;

          }
        )
        .join("");

  }


  /* =======================================================
     OFFICIAL TALENT SOCIAL LINK
     ======================================================= */

  /*
   * Find modal content container.
   */

  const modalCopy =
    modal.querySelector(
      ".modal-copy"
    );


  if (modalCopy) {

    /*
     * Remove previously generated
     * social link box.
     */

    const oldSocialBox =
      modalCopy.querySelector(
        ".talent-social-links"
      );


    if (oldSocialBox) {

      oldSocialBox.remove();

    }


    /*
     * Create new social box.
     */

    const socialBox =
      document.createElement(
        "div"
      );


    socialBox.className =
      "talent-social-links";


    /*
     * Check talent social data.
     */

    if (
      talent.social &&
      talent.social.url
    ) {

      const platform =
        talent.social.platform ||
        "Official Link";


      const label =
        talent.social.label ||
        `Follow ${talent.name}`;


      /*
       * Build official link.
       */

      socialBox.innerHTML = `

        <div class="social-heading">
          OFFICIAL LINKS
        </div>


        <a
          class="talent-social-btn"
          href="${talent.social.url}"
          target="_blank"
          rel="noopener noreferrer"
        >

          <span class="social-icon">
            ↗
          </span>


          <span class="social-label">
            ${label}
          </span>


          <small>
            ${platform}
          </small>


          <b>
            →
          </b>

        </a>

      `;

    }


    /*
     * Put social box after lore.
     */

    if (modalLore) {

      modalLore.insertAdjacentElement(
        "afterend",
        socialBox
      );

    } else {

      modalCopy.appendChild(
        socialBox
      );

    }

  }


  /*
   * Open modal
   */

  modal.classList.add(
    "open"
  );


  document.body.style.overflow =
    "hidden";

}


/* =========================================================
   CLOSE MODAL
   ========================================================= */

function closeTalent() {

  const modal =
    $("#talentModal");


  if (!modal) {
    return;
  }


  modal.classList.remove(
    "open"
  );


  document.body.style.overflow =
    "";

}


/* =========================================================
   CLOSE BUTTONS
   ========================================================= */

$$("[data-close]").forEach(
  (element) => {

    element.addEventListener(
      "click",
      closeTalent
    );

  }
);


/* =========================================================
   ESCAPE KEY
   ========================================================= */

document.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === "Escape"
    ) {

      closeTalent();

    }

  }
);


/* =========================================================
   PROJECT DAWN LORE
   ========================================================= */

const loreBtn =
  $("#loreBtn");


if (loreBtn) {

  loreBtn.addEventListener(
    "click",
    () => {

      const lang =
        getLanguage();


      const lore =
        ASAHI?.projectDawn?.lore?.[
          lang
        ] ||
        ASAHI?.projectDawn?.lore?.ja ||
        "Project Dawn";


      toast(lore);

    }
  );

}


/* =========================================================
   COMMUNITY
   ========================================================= */

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


  /*
   * FAN NAME
   */

  if (fanName) {

    fanName.textContent =
      fans.name ||
      "Dawnkeepers";

  }


  /*
   * FAN MARK
   */

  if (fanMark) {

    fanMark.textContent =
      fans.mark ||
      "✦🌅";

  }


  /*
   * OFFICIAL COLORS
   */

  if (colorDots) {

    const colors =
      fans.colors ||
      fans.officialColors ||
      [];


    if (
      Array.isArray(colors)
    ) {

      colorDots.innerHTML =
        colors
          .map(
            (color) => {

              return `
                <span
                  class="color-dot"
                  style="background:${color}"
                  title="${color}"
                ></span>
              `;

            }
          )
          .join("");

    }

  }

}


/* =========================================================
   UNIVERSE GUIDE
   ========================================================= */

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


/* =========================================================
   UNIVERSE GUIDE FUNCTION
   ========================================================= */

function askGuide() {

  const input =
    $("#guideInput");


  const answerBox =
    $("#chatAnswer");


  if (
    !input ||
    !answerBox
  ) {

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
    getLanguage();


  const list =
    qa[lang] ||
    qa.ja;


  let answer =
    null;


  for (
    const [
      keyword,
      response
    ] of list
  ) {

    if (
      question.includes(
        keyword
      )
    ) {

      answer =
        response;

      break;

    }

  }


  if (!answer) {

    if (
      lang === "ja"
    ) {

      answer =
        "Project Dawn、タレント、Lore、Fan Communityについて質問できます。";

    }

    else if (
      lang === "id"
    ) {

      answer =
        "Coba tanyakan tentang Project Dawn, Ren, Yuna, Akira, atau fan community.";

    }

    else {

      answer =
        "Try asking about Project Dawn, Ren, Yuna, Akira, or the fan community.";

    }

  }


  answerBox.textContent =
    answer;


  input.value =
    "";

}


/* =========================================================
   GUIDE BUTTON
   ========================================================= */

const askBtn =
  $("#askBtn");


if (askBtn) {

  askBtn.addEventListener(
    "click",
    askGuide
  );

}


/* =========================================================
   GUIDE ENTER KEY
   ========================================================= */

const guideInput =
  $("#guideInput");


if (guideInput) {

  guideInput.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key === "Enter"
      ) {

        event.preventDefault();

        askGuide();

      }

    }
  );

}


/* =========================================================
   TOAST
   ========================================================= */

function toast(message) {

  const toastElement =
    $("#toast");


  if (!toastElement) {
    return;
  }


  toastElement.textContent =
    message;


  toastElement.classList.add(
    "show"
  );


  clearTimeout(
    window.__asahiliveToast
  );


  window.__asahiliveToast =
    setTimeout(
      () => {

        toastElement.classList.remove(
          "show"
        );

      },
      5000
    );

}


/* =========================================================
   REVEAL ANIMATION
   ========================================================= */

function observeReveal() {

  const elements =
    $$(".reveal");


  if (
    !elements.length
  ) {

    return;

  }


  /*
   * Browser doesn't support
   * IntersectionObserver.
   */

  if (
    !(
      "IntersectionObserver"
      in window
    )
  ) {

    elements.forEach(
      (element) => {

        element.classList.add(
          "visible"
        );

      }
    );

    return;

  }


  const observer =
    new IntersectionObserver(
      (
        entries
      ) => {

        entries.forEach(
          (entry) => {

            if (
              entry.isIntersecting
            ) {

              entry.target.classList.add(
                "visible"
              );


              observer.unobserve(
                entry.target
              );

            }

          }
        );

      },
      {
        threshold: 0.12
      }
    );


  elements.forEach(
    (element) => {

      observer.observe(
        element
      );

    }
  );

}


/* =========================================================
   LANGUAGE CHANGE
   ========================================================= */

window.addEventListener(
  "languageChanged",
  () => {

    renderTalents();

    renderCommunity();

    observeReveal();

  }
);


/* =========================================================
   MODAL BACKDROP SAFETY
   ========================================================= */

document.addEventListener(
  "click",
  (event) => {

    const modal =
      $("#talentModal");


    if (!modal) {
      return;
    }


    /*
     * Clicking directly on the
     * backdrop closes modal.
     */

    if (
      event.target.classList &&
      event.target.classList.contains(
        "modal-backdrop"
      )
    ) {

      closeTalent();

    }

  }
);


/* =========================================================
   IMAGE ERROR HANDLING
   ========================================================= */

document.addEventListener(
  "error",
  (event) => {

    const target =
      event.target;


    if (
      target &&
      target.tagName === "IMG"
    ) {

      target.classList.add(
        "image-error"
      );

    }

  },
  true
);


/* =========================================================
   FINAL SAFETY
   ========================================================= */

window.addEventListener(
  "error",
  (event) => {

    console.error(
      "AsahiLive JavaScript error:",
      event.error ||
      event.message
    );


    /*
     * Never allow a JavaScript
     * error to leave the splash
     * screen permanently active.
     */

    document.body.classList.add(
      "loaded"
    );

  }
);


/* =========================================================
   END OF APP.JS
   ========================================================= */  menuBtn.addEventListener("click", () => {

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


  /*
    =========================================
    OFFICIAL TALENT LINK
    =========================================
  */

  let socialBox =
    modal.querySelector(".talent-social-links");


  if (!socialBox) {

    socialBox =
      document.createElement("div");

    socialBox.className =
      "talent-social-links";


    const modalCopy =
      modal.querySelector(".modal-copy");


    if (modalCopy) {

      modalCopy.appendChild(
        socialBox
      );

    }

  }


  if (
    talent.social &&
    talent.social.url
  ) {

    const platform =
      talent.social.platform ||
      "Official Link";


    const label =
      talent.social.label ||
      `Follow ${talent.name}`;


    socialBox.innerHTML = `

      <div class="social-heading">
        OFFICIAL LINKS
      </div>

      <a
        class="talent-social-btn"
        href="${talent.social.url}"
        target="_blank"
        rel="noopener noreferrer"
      >

        <span>
          🔗
        </span>

        <span>
          ${label}
        </span>

        <small>
          ${platform}
        </small>

        <b>
          ↗
        </b>

      </a>

    `;

  }

  else {

    socialBox.innerHTML = "";

  }


  modal.classList.add("open");

  document.body.style.overflow = "hidden";

}


/* =========================================
   CLOSE MODAL
   ========================================= */

$$("[data-close]").forEach((element) => {

  element.addEventListener(
    "click",
    closeTalent
  );

});


function closeTalent() {

  const modal =
    $("#talentModal");

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

const loreBtn =
  $("#loreBtn");

if (loreBtn) {

  loreBtn.addEventListener(
    "click",
    () => {

      const lang =
        typeof currentLanguage === "function"
          ? currentLanguage()
          : "ja";


      const lore =
        ASAHI?.projectDawn?.lore?.[lang] ||
        ASAHI?.projectDawn?.lore?.ja ||
        "Project Dawn";


      toast(lore);

    }
  );

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
      fans.name ||
      "Dawnkeepers";

  }


  if (fanMark) {

    fanMark.textContent =
      fans.mark ||
      "✦🌅";

  }


  if (colorDots) {

    const colors =
      fans.colors ||
      fans.officialColors ||
      [];


    if (Array.isArray(colors)) {

      colorDots.innerHTML =
        colors
          .map(
            (color) => `

              <span
                class="color-dot"
                style="background:${color};"
                title="${color}"
              ></span>

            `
          )
          .join("");

    }

  }

}


/* =========================================
   OFFICIAL ASAHILIVE SOCIAL MEDIA
   ========================================= */

function renderOfficialSocials() {

  if (
    typeof ASAHI === "undefined" ||
    !ASAHI.socials
  ) {
    return;
  }


  /*
    Kita cari container yang sudah ada
    terlebih dahulu.
  */

  let container =
    $("#officialSocials");


  /*
    Jika belum ada di index.html,
    kita buat otomatis di footer.
  */

  if (!container) {

    const footer =
      $("#footer");

    if (!footer) return;


    container =
      document.createElement("div");

    container.id =
      "officialSocials";

    container.className =
      "official-socials";


    const footerTop =
      footer.querySelector(
        ".footer-top"
      );


    if (footerTop) {

      footerTop.appendChild(
        container
      );

    }

  }


  const socials =
    ASAHI.socials;


  const items = [];


  if (socials.x?.url) {

    items.push({

      name: "X",

      url: socials.x.url,

      icon: "𝕏"

    });

  }


  if (socials.tiktok?.url) {

    items.push({

      name: "TikTok",

      url: socials.tiktok.url,

      icon: "♪"

    });

  }


  if (socials.youtube?.url) {

    items.push({

      name: "YouTube",

      url: socials.youtube.url,

      icon: "▶"

    });

  }


  container.innerHTML = `

    <div class="official-social-title">
      ASAHILIVE OFFICIAL
    </div>

    <div class="official-social-list">

      ${

        items.map(
          (item) => `

            <a
              href="${item.url}"
              target="_blank"
              rel="noopener noreferrer"
              class="official-social-link"
            >

              <span>
                ${item.icon}
              </span>

              <span>
                ${item.name}
              </span>

              <b>
                ↗
              </b>

            </a>

          `
        ).join("")

      }

    </div>

  `;

}


/* =========================================
   CONTACT / COLLABORATION
   ========================================= */

function renderContact() {

  if (
    typeof ASAHI === "undefined" ||
    !ASAHI.contact
  ) {
    return;
  }


  let container =
    $("#officialContact");


  /*
    Jika belum tersedia di HTML,
    buat otomatis di footer.
  */

  if (!container) {

    const footer =
      $("#footer");

    if (!footer) return;


    container =
      document.createElement("div");

    container.id =
      "officialContact";

    container.className =
      "official-contact";


    footer.appendChild(
      container
    );

  }


  const email =
    ASAHI.contact.email;


  if (!email) return;


  const lang =
    typeof currentLanguage === "function"
      ? currentLanguage()
      : "ja";


  let title =
    "CONTACT & COLLABORATION";


  let description =
    "Business inquiries, collaborations, partnerships & media requests.";


  if (lang === "ja") {

    title =
      "CONTACT & COLLABORATION";

    description =
      "コラボレーション、ビジネス、メディアに関するお問い合わせはこちら。";

  }


  if (lang === "id") {

    title =
      "CONTACT & COLLABORATION";

    description =
      "Hubungi kami untuk kolaborasi, bisnis, partnership, dan media.";

  }


  container.innerHTML = `

    <div class="contact-title">
      ${title}
    </div>

    <p class="contact-description">
      ${description}
    </p>

    <a
      class="contact-email"
      href="mailto:${email}"
    >

      <span>
        ✉
      </span>

      <span>
        ${email}
      </span>

      <b>
        ↗
      </b>

    </a>

  `;

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


  for (
    const [keyword, response]
    of list
  ) {

    if (
      question.includes(keyword)
    ) {

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


  answerBox.textContent =
    answer;

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

      if (
        event.key === "Enter"
      ) {

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


  toastElement.classList.add(
    "show"
  );


  clearTimeout(
    window.__asahiliveToast
  );


  window.__asahiliveToast =
    setTimeout(
      () => {

        toastElement.classList.remove(
          "show"
        );

      },
      5000
    );

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

    elements.forEach(
      (element) => {

        element.classList.add(
          "visible"
        );

      }
    );

    return;

  }


  const observer =
    new IntersectionObserver(
      (entries) => {

        entries.forEach(
          (entry) => {

            if (
              entry.isIntersecting
            ) {

              entry.target.classList.add(
                "visible"
              );

              observer.unobserve(
                entry.target
              );

            }

          }
        );

      },
      {
        threshold: 0.12
      }
    );


  elements.forEach(
    (element) => {

      observer.observe(
        element
      );

    }
  );

}


/* =========================================
   LANGUAGE CHANGE
   ========================================= */

window.addEventListener(
  "languageChanged",
  () => {

    renderTalents();

    renderCommunity();

    renderOfficialSocials();

    renderContact();

    observeReveal();

  }
);if (menuBtn) {

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

  const grid = document.getElementById("talentGrid");

  if (!grid) {
    console.error("ASAHILIVE: #talentGrid tidak ditemukan.");
    return;
  }

  // Pastikan data.js berhasil dimuat
  if (
    !window.ASAHI ||
    !Array.isArray(window.ASAHI.talents)
  ) {

    console.error(
      "ASAHILIVE: Data talent tidak ditemukan.",
      window.ASAHI
    );

    grid.innerHTML = `
      <div class="empty-message">
        <p>Talent data is currently unavailable.</p>
      </div>
    `;

    return;
  }

  const talents = window.ASAHI.talents;

  if (talents.length === 0) {

    grid.innerHTML = `
      <div class="empty-message">
        <p>No talents available.</p>
      </div>
    `;

    return;
  }

  const lang =
    typeof currentLanguage === "function"
      ? currentLanguage()
      : "ja";


  grid.innerHTML = talents.map((talent) => {

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
            onerror="this.style.display='none'"
          >

        </div>


        <div class="tc-copy">

          <div class="tc-type">
            ${talent.type || ""}
            ${talent.role ? " · " + talent.role : ""}
          </div>


          <h3>
            ${talent.name || ""}
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


  document
    .querySelectorAll(".talent-card")
    .forEach((card) => {

      card.addEventListener("click", () => {

        openTalent(card.dataset.id);

      });

    });


  observeReveal();

  console.log(
    "ASAHILIVE: Talent berhasil dirender:",
    talents
  );

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
