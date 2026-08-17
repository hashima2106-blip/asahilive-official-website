/* =========================================================
   ASAHILIVE OFFICIAL WEBSITE
   APP.JS — CLEAN & SAFE VERSION
   ========================================================= */

(() => {
  "use strict";

  /* =========================================================
     BASIC HELPERS
     ========================================================= */

  const $ = (selector, parent = document) => {
    try {
      return parent.querySelector(selector);
    } catch {
      return null;
    }
  };

  const $$ = (selector, parent = document) => {
    try {
      return Array.from(parent.querySelectorAll(selector));
    } catch {
      return [];
    }
  };


  /* =========================================================
     PRELOADER SAFETY
     ========================================================= */

  function removePreloader() {
    try {
      document.body.classList.add("loaded");

      const preloader = $("#preloader");

      if (preloader) {
        preloader.classList.add("loaded");

        setTimeout(() => {
          try {
            preloader.style.pointerEvents = "none";
            preloader.style.opacity = "0";
            preloader.style.visibility = "hidden";
          } catch {}
        }, 300);
      }
    } catch (error) {
      console.warn("Preloader error:", error);
    }
  }


  /*
   * IMPORTANT:
   * Never allow the splash screen to stay forever.
   */

  const preloaderSafetyTimer = setTimeout(() => {
    removePreloader();
  }, 1500);


  /* =========================================================
     LANGUAGE
     ========================================================= */

  function getLanguage() {
    try {
      if (
        window.AsahiLiveI18n &&
        typeof window.AsahiLiveI18n.getLanguage === "function"
      ) {
        return window.AsahiLiveI18n.getLanguage();
      }

      if (typeof window.currentLanguage === "function") {
        return window.currentLanguage();
      }
    } catch (error) {
      console.warn("Language detection failed:", error);
    }

    return "ja";
  }


  function setLanguageSafe(language) {
    try {
      if (typeof window.setLanguage === "function") {
        window.setLanguage(language);
        return;
      }

      if (
        window.AsahiLiveI18n &&
        typeof window.AsahiLiveI18n.setLanguage === "function"
      ) {
        window.AsahiLiveI18n.setLanguage(language);
      }
    } catch (error) {
      console.warn("Language change failed:", error);
    }
  }


  /* =========================================================
     TALENT DATA
     ========================================================= */

  function getTalents() {
    try {
      if (
        typeof window.ASAHI === "undefined" ||
        !Array.isArray(window.ASAHI.talents)
      ) {
        console.warn("ASAHI talent data unavailable.");
        return [];
      }

      return window.ASAHI.talents;
    } catch (error) {
      console.error("Talent data error:", error);
      return [];
    }
  }


  /* =========================================================
     SAFE TEXT
     ========================================================= */

  function escapeHTML(value) {
    if (value === null || value === undefined) {
      return "";
    }

    const div = document.createElement("div");
    div.textContent = String(value);

    return div.innerHTML;
  }


  /* =========================================================
     NAVIGATION
     ========================================================= */

  function renderNavigation() {
    const nav = $("#nav");

    if (!nav) {
      return;
    }

    try {
      nav.innerHTML = `
        <a href="#top">Home</a>
        <a href="#talents">Talents</a>
        <a href="#dawn">Project Dawn</a>
        <a href="#about">About</a>
        <a href="#guide">Universe Guide</a>
      `;
    } catch (error) {
      console.warn("Navigation rendering failed:", error);
    }
  }


  function setupNavigation() {
    $$("#nav a, a[href^='#']").forEach((link) => {
      link.addEventListener("click", () => {
        document.body.classList.remove("menu-open");

        const langMenu = $("#langMenu");

        if (langMenu) {
          langMenu.classList.remove("open");
        }
      });
    });
  }


  /* =========================================================
     HEADER
     ========================================================= */

  function setupHeader() {
    const header = $("#header");

    if (!header) {
      return;
    }

    window.addEventListener(
      "scroll",
      () => {
        try {
          header.classList.toggle(
            "scrolled",
            window.scrollY > 30
          );
        } catch {}
      },
      { passive: true }
    );
  }


  /* =========================================================
     MOBILE MENU
     ========================================================= */

  function setupMobileMenu() {
    const menuBtn = $("#menuBtn");

    if (!menuBtn) {
      return;
    }

    menuBtn.addEventListener("click", () => {
      document.body.classList.toggle("menu-open");
    });
  }


  /* =========================================================
     LANGUAGE MENU
     ========================================================= */

  function setupLanguageMenu() {
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
        const language = button.dataset.lang;

        if (language) {
          setLanguageSafe(language);
        }

        if (langMenu) {
          langMenu.classList.remove("open");
        }
      });
    });

    document.addEventListener("click", (event) => {
      if (!langMenu || !langBtn) {
        return;
      }

      if (
        !langMenu.contains(event.target) &&
        !langBtn.contains(event.target)
      ) {
        langMenu.classList.remove("open");
      }
    });
  }


  /* =========================================================
     TALENTS
     ========================================================= */

  function renderTalents() {
    const grid = $("#talentGrid");

    if (!grid) {
      return;
    }

    try {
      const talents = getTalents();

      if (!talents.length) {
        grid.innerHTML = `
          <p class="empty-message">
            Talent data is currently unavailable.
          </p>
        `;

        return;
      }

      const language = getLanguage();

      grid.innerHTML = talents
        .map((talent) => {
          const short =
            talent.short?.[language] ||
            talent.short?.ja ||
            "";

          const name =
            talent.name || "";

          const type =
            talent.type || "";

          const role =
            talent.role || "";

          const image =
            talent.image || "";

          const color =
            talent.color || "#ffffff";

          const id =
            talent.id || "";

          const viewProfile =
            window.I18N?.[language]?.viewProfile ||
            "View profile";

          return `
            <article
              class="talent-card reveal"
              data-id="${escapeHTML(id)}"
              style="--accent:${escapeHTML(color)}"
            >

              <div class="talent-image">
                <img
                  src="${escapeHTML(image)}"
                  alt="${escapeHTML(name)}"
                  loading="lazy"
                >
              </div>

              <div class="tc-copy">

                <div class="tc-type">
                  ${escapeHTML(type)}
                  ${
                    role
                      ? " · " + escapeHTML(role)
                      : ""
                  }
                </div>

                <h3>
                  ${escapeHTML(name)}
                </h3>

                <p>
                  ${escapeHTML(short)}
                </p>

                <span class="profile-link">
                  ${escapeHTML(viewProfile)}
                  ↗
                </span>

              </div>

              <div class="tc-arrow">
                ↗
              </div>

            </article>
          `;
        })
        .join("");

      $$(".talent-card").forEach((card) => {
        card.addEventListener("click", () => {
          const id = card.dataset.id;

          if (id) {
            openTalent(id);
          }
        });
      });

      observeReveal();

    } catch (error) {
      console.error("Talent rendering failed:", error);

      grid.innerHTML = `
        <p class="empty-message">
          Unable to load talents.
        </p>
      `;
    }
  }


  /* =========================================================
     TALENT MODAL
     ========================================================= */

  function openTalent(id) {
    try {
      const talents = getTalents();

      const talent = talents.find(
        (item) =>
          String(item.id) === String(id)
      );

      if (!talent) {
        console.warn("Talent not found:", id);
        return;
      }

      const modal = $("#talentModal");

      if (!modal) {
        console.warn("#talentModal not found.");
        return;
      }

      const language = getLanguage();

      const modalImg = $("#modalImg");
      const modalName = $("#modalName");
      const modalType = $("#modalType");
      const modalRole = $("#modalRole");
      const modalShort = $("#modalShort");
      const modalLore = $("#modalLore");
      const modalTags = $("#modalTags");


      /* IMAGE */

      if (modalImg) {
        modalImg.src = talent.image || "";
        modalImg.alt = talent.name || "";
      }


      /* NAME */

      if (modalName) {
        modalName.textContent =
          talent.name || "";
      }


      /* TYPE */

      if (modalType) {
        modalType.textContent =
          talent.type || "";
      }


      /* ROLE */

      if (modalRole) {
        modalRole.textContent =
          talent.role || "";
      }


      /* SHORT */

      if (modalShort) {
        modalShort.textContent =
          talent.short?.[language] ||
          talent.short?.ja ||
          "";
      }


      /* LORE */

      if (modalLore) {
        modalLore.textContent =
          talent.lore?.[language] ||
          talent.lore?.ja ||
          "";
      }


      /* TAGS */

      if (modalTags) {
        const tags =
          Array.isArray(talent.tags)
            ? talent.tags
            : [];

        modalTags.innerHTML =
          tags
            .map(
              (tag) => `
                <span>
                  ${escapeHTML(tag)}
                </span>
              `
            )
            .join("");
      }


      /* OFFICIAL SOCIAL LINK */

      const modalCopy =
        $(".modal-copy", modal);

      if (modalCopy) {

        const oldSocial =
          $(".talent-social-links", modalCopy);

        if (oldSocial) {
          oldSocial.remove();
        }


        const socialBox =
          document.createElement("div");

        socialBox.className =
          "talent-social-links";


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
              href="${escapeHTML(talent.social.url)}"
              target="_blank"
              rel="noopener noreferrer"
            >

              <span class="social-icon">
                ↗
              </span>

              <span class="social-label">
                ${escapeHTML(label)}
              </span>

              <small>
                ${escapeHTML(platform)}
              </small>

              <b>
                →
              </b>

            </a>
          `;
        }


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


      modal.classList.add("open");

      document.body.style.overflow =
        "hidden";

    } catch (error) {
      console.error(
        "Opening talent failed:",
        error
      );
    }
  }


  /* =========================================================
     CLOSE TALENT MODAL
     ========================================================= */

  function closeTalent() {
    const modal =
      $("#talentModal");

    if (!modal) {
      return;
    }

    modal.classList.remove("open");

    document.body.style.overflow = "";
  }


  function setupModal() {

    $$("[data-close]").forEach(
      (element) => {
        element.addEventListener(
          "click",
          closeTalent
        );
      }
    );


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


    document.addEventListener(
      "click",
      (event) => {

        if (
          event.target &&
          event.target.classList &&
          event.target.classList.contains(
            "modal-backdrop"
          )
        ) {
          closeTalent();
        }

      }
    );
  }


  /* =========================================================
     PROJECT DAWN LORE
     ========================================================= */

  function showProjectDawnLore() {
    try {

      const language =
        getLanguage();

      const lore =
        window.ASAHI?.projectDawn?.lore?.[language] ||
        window.ASAHI?.projectDawn?.lore?.ja ||
        "Project Dawn";


      showToast(lore);

    } catch (error) {
      console.warn(
        "Project Dawn lore failed:",
        error
      );
    }
  }


  function setupLoreButton() {
    const loreBtn =
      $("#loreBtn");

    if (!loreBtn) {
      return;
    }

    loreBtn.addEventListener(
      "click",
      showProjectDawnLore
    );
  }


  /* =========================================================
     COMMUNITY
     ========================================================= */

  function renderCommunity() {
    try {

      if (
        typeof window.ASAHI ===
        "undefined"
      ) {
        return;
      }


      const fans =
        window.ASAHI.fans || {};


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


        if (
          Array.isArray(colors)
        ) {

          colorDots.innerHTML =
            colors
              .map(
                (color) => `
                  <span
                    class="color-dot"
                    style="background:${escapeHTML(color)}"
                    title="${escapeHTML(color)}"
                  ></span>
                `
              )
              .join("");
        }
      }

    } catch (error) {
      console.warn(
        "Community rendering failed:",
        error
      );
    }
  }


  /* =========================================================
     UNIVERSE GUIDE
     ========================================================= */

  const GUIDE = {

    ja: [
      [
        "project dawn",
        "Project DawnはAsahiLive Generation 0のグループです。Amamiya Ren、Yuna Nanami、Kagami Akiraの三人が、それぞれの光を持って一つの夜明けを作ります。"
      ],
      [
        "ren",
        "Amamiya RenはFuzzyな個性を持つ、Project DawnのThe Heart of Dawnです。"
      ],
      [
        "yuna",
        "Yuna NanamiはFluffyな個性を持つ、The Dream of Dawnです。"
      ],
      [
        "akira",
        "Kagami AkiraはChaoticな個性を持つ、The Spark of Dawnです。"
      ],
      [
        "fan",
        "Project DawnのファンネームはDawnkeepers、公式ファンマークは✦🌅です。"
      ]
    ],

    id: [
      [
        "project dawn",
        "Project Dawn adalah grup AsahiLive Generation 0. Amamiya Ren, Yuna Nanami, dan Kagami Akira adalah tiga cahaya berbeda yang membentuk satu fajar."
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
        "Nama fan Project Dawn adalah Dawnkeepers dan fan mark resminya adalah ✦🌅."
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
        "The Project Dawn fan name is Dawnkeepers and the official fan mark is ✦🌅."
      ]
    ]

  };


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


    const language =
      getLanguage();


    const list =
      GUIDE[language] ||
      GUIDE.ja;


    let answer = "";


    for (
      const item of list
    ) {

      const keyword =
        item[0];

      const response =
        item[1];


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

      if (language === "ja") {

        answer =
          "Project Dawn、Ren、Yuna、Akira、ファンコミュニティについて質問できます。";

      } else if (
        language === "id"
      ) {

        answer =
          "Coba tanyakan tentang Project Dawn, Ren, Yuna, Akira, atau fan community.";

      } else {

        answer =
          "Try asking about Project Dawn, Ren, Yuna, Akira, or the fan community.";

      }
    }


    answerBox.textContent =
      answer;

    input.value = "";
  }


  function setupGuide() {

    const askBtn =
      $("#askBtn");

    const input =
      $("#guideInput");


    if (askBtn) {

      askBtn.addEventListener(
        "click",
        askGuide
      );
    }


    if (input) {

      input.addEventListener(
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
  }


  /* =========================================================
     TOAST
     ========================================================= */

  function showToast(message) {

    const toast =
      $("#toast");

    if (!toast) {
      return;
    }


    toast.textContent =
      message;


    toast.classList.add(
      "show"
    );


    clearTimeout(
      window.__asahiliveToast
    );


    window.__asahiliveToast =
      setTimeout(
        () => {

          toast.classList.remove(
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
          threshold: 0.08
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
     IMAGE ERROR HANDLING
     ========================================================= */

  function setupImageErrors() {

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
  }


  /* =========================================================
     LANGUAGE CHANGE REFRESH
     ========================================================= */

  function setupLanguageRefresh() {

    document.addEventListener(
      "asahilive:languagechange",
      () => {

        try {
          renderTalents();
          renderCommunity();
          observeReveal();
        } catch (error) {
          console.warn(
            "Language refresh failed:",
            error
          );
        }

      }
    );
  }


  /* =========================================================
     INITIALIZATION
     ========================================================= */

  function initialize() {

    /*
     * FIRST:
     * Remove loading screen immediately.
     */
    removePreloader();


    /*
     * Clear safety timer.
     */
    clearTimeout(
      preloaderSafetyTimer
    );


    /*
     * Render website.
     * Every feature is isolated so one
     * error cannot stop the entire site.
     */

    try {
      renderNavigation();
    } catch (error) {
      console.warn(
        "Navigation failed:",
        error
      );
    }


    try {
      renderTalents();
    } catch (error) {
      console.warn(
        "Talents failed:",
        error
      );
    }


    try {
      renderCommunity();
    } catch (error) {
      console.warn(
        "Community failed:",
        error
      );
    }


    try {
      setupNavigation();
    } catch (error) {
      console.warn(
        "Navigation events failed:",
        error
      );
    }


    try {
      setupHeader();
    } catch (error) {
      console.warn(
        "Header failed:",
        error
      );
    }


    try {
      setupMobileMenu();
    } catch (error) {
      console.warn(
        "Mobile menu failed:",
        error
      );
    }


    try {
      setupLanguageMenu();
    } catch (error) {
      console.warn(
        "Language menu failed:",
        error
      );
    }


    try {
      setupModal();
    } catch (error) {
      console.warn(
        "Modal failed:",
        error
      );
    }


    try {
      setupLoreButton();
    } catch (error) {
      console.warn(
        "Lore button failed:",
        error
      );
    }


    try {
      setupGuide();
    } catch (error) {
      console.warn(
        "Guide failed:",
        error
      );
    }


    try {
      setupImageErrors();
    } catch (error) {
      console.warn(
        "Image handler failed:",
        error
      );
    }


    try {
      setupLanguageRefresh();
    } catch (error) {
      console.warn(
        "Language refresh failed:",
        error
      );
    }


    try {
      observeReveal();
    } catch (error) {
      console.warn(
        "Reveal animation failed:",
        error
      );
    }


    /*
     * FINAL PRELOADER RELEASE
     */

    setTimeout(
      removePreloader,
      100
    );
  }


  /* =========================================================
     GLOBAL ERROR SAFETY
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
       * Even if another script fails,
       * NEVER leave the user trapped
       * on the splash screen.
       */

      removePreloader();

    }
  );


  window.addEventListener(
    "unhandledrejection",
    (event) => {

      console.error(
        "AsahiLive Promise error:",
        event.reason
      );

      removePreloader();

    }
  );


  /* =========================================================
     START
     ========================================================= */

  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      initialize,
      {
        once: true
      }
    );

  } else {

    initialize();

  }


  /* =========================================================
     PUBLIC FUNCTIONS
     ========================================================= */

  window.renderTalents =
    renderTalents;

  window.openTalent =
    openTalent;

  window.closeTalent =
    closeTalent;

  window.askGuide =
    askGuide;

  window.observeReveal =
    observeReveal;

  window.showToast =
    showToast;


})();  /* =======================================================
     PRELOADER SAFETY
     ======================================================= */

  function removePreloader() {

    document.body.classList.add("loaded");

    const preloader = $("#preloader");

    if (preloader) {
      preloader.classList.add("loaded");
    }

  }


  /*
   * Run as early as possible.
   */

  if (document.readyState === "loading") {

    document.addEventListener(
      "DOMContentLoaded",
      () => {
        removePreloader();
        init();
      },
      { once: true }
    );

  } else {

    removePreloader();
    init();

  }


  /*
   * Extra safety.
   */

  window.addEventListener(
    "load",
    removePreloader,
    { once: true }
  );


  /* =======================================================
     HEADER
     ======================================================= */

  function initHeader() {

    const header = $("#header");

    if (!header) {
      return;
    }

    const updateHeader = () => {

      header.classList.toggle(
        "scrolled",
        window.scrollY > 30
      );

    };

    updateHeader();

    window.addEventListener(
      "scroll",
      updateHeader,
      { passive: true }
    );

  }


  /* =======================================================
     NAVIGATION
     ======================================================= */

  function renderNavigation() {

    const nav = $("#nav");

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


  function closeMobileMenu() {

    document.body.classList.remove(
      "menu-open"
    );

  }


  /* =======================================================
     MOBILE MENU
     ======================================================= */

  function initMobileMenu() {

    const menuButton = $("#menuBtn");

    if (!menuButton) {
      return;
    }

    menuButton.addEventListener(
      "click",
      () => {

        document.body.classList.toggle(
          "menu-open"
        );

      }
    );


    document.addEventListener(
      "click",
      (event) => {

        const link =
          event.target.closest(
            "a[href^='#']"
          );

        if (link) {
          closeMobileMenu();
        }

      }
    );

  }


  /* =======================================================
     LANGUAGE MENU
     ======================================================= */

  function initLanguageMenu() {

    const button = $("#langBtn");
    const menu = $("#langMenu");

    if (!button || !menu) {
      return;
    }


    button.addEventListener(
      "click",
      (event) => {

        event.stopPropagation();

        menu.classList.toggle("open");

      }
    );


    $$("[data-lang]").forEach(
      (languageButton) => {

        languageButton.addEventListener(
          "click",
          () => {

            const language =
              languageButton.dataset.lang;

            try {

              if (
                typeof setLanguage ===
                "function"
              ) {

                setLanguage(language);

              }

            } catch (error) {

              console.warn(
                "Language change failed:",
                error
              );

            }

            menu.classList.remove("open");

          }
        );

      }
    );


    document.addEventListener(
      "click",
      (event) => {

        if (
          !menu.contains(event.target) &&
          !button.contains(event.target)
        ) {

          menu.classList.remove(
            "open"
          );

        }

      }
    );

  }


  /* =======================================================
     TALENT CARDS
     ======================================================= */

  function renderTalents() {

    const grid = $("#talentGrid");

    if (!grid) {
      return;
    }


    const talents = getTalents();

    if (!talents.length) {

      grid.innerHTML = `
        <p class="empty-message">
          Talent data is currently unavailable.
        </p>
      `;

      return;
    }


    const language = getLanguage();


    grid.innerHTML = talents
      .map((talent) => {

        const shortDescription =
          talent.short?.[language] ||
          talent.short?.ja ||
          "";


        return `
          <article
            class="talent-card reveal"
            data-id="${escapeHTML(talent.id || "")}"
            style="--accent:${escapeHTML(
              talent.color || "#ffffff"
            )}"
          >

            <div class="talent-image">

              <img
                src="${escapeHTML(
                  talent.image || ""
                )}"
                alt="${escapeHTML(
                  talent.name || ""
                )}"
                loading="lazy"
              >

            </div>


            <div class="tc-copy">

              <div class="tc-type">

                ${escapeHTML(
                  talent.type || ""
                )}

                ${
                  talent.role
                    ? " · " +
                      escapeHTML(
                        talent.role
                      )
                    : ""
                }

              </div>


              <h3>
                ${escapeHTML(
                  talent.name || ""
                )}
              </h3>


              <p>
                ${escapeHTML(
                  shortDescription
                )}
              </p>


              <span class="profile-link">
                ${
                  window.I18N?.[
                    language
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

      })
      .join("");


    /*
     * Talent card events
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


  /* =======================================================
     TALENT MODAL
     ======================================================= */

  function openTalent(id) {

    const talents = getTalents();

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


    const modal =
      $("#talentModal");

    if (!modal) {
      return;
    }


    const language =
      getLanguage();


    /*
     * Modal elements
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
     * Image
     */

    if (modalImg) {

      modalImg.src =
        talent.image || "";

      modalImg.alt =
        talent.name || "";

    }


    /*
     * Name
     */

    if (modalName) {

      modalName.textContent =
        talent.name || "";

    }


    /*
     * Type
     */

    if (modalType) {

      modalType.textContent =
        talent.type || "";

    }


    /*
     * Role
     */

    if (modalRole) {

      modalRole.textContent =
        talent.role || "";

    }


    /*
     * Short description
     */

    if (modalShort) {

      modalShort.textContent =
        talent.short?.[language] ||
        talent.short?.ja ||
        "";

    }


    /*
     * Lore
     */

    if (modalLore) {

      modalLore.textContent =
        talent.lore?.[language] ||
        talent.lore?.ja ||
        "";

    }


    /*
     * Tags
     */

    if (modalTags) {

      const tags =
        Array.isArray(talent.tags)
          ? talent.tags
          : [];

      modalTags.innerHTML =
        tags
          .map(
            (tag) => `
              <span>
                ${escapeHTML(tag)}
              </span>
            `
          )
          .join("");

    }


    /*
     * Social link
     */

    renderTalentSocialLink(
      modal,
      talent
    );


    /*
     * Open modal
     */

    modal.classList.add("open");

    document.body.style.overflow =
      "hidden";

  }


  /* =======================================================
     TALENT SOCIAL LINK
     ======================================================= */

  function renderTalentSocialLink(
    modal,
    talent
  ) {

    const modalCopy =
      $(".modal-copy", modal);

    if (!modalCopy) {
      return;
    }


    /*
     * Remove old social link
     */

    const old =
      $(".talent-social-links", modal);

    if (old) {
      old.remove();
    }


    /*
     * Create new social box
     */

    const socialBox =
      document.createElement("div");

    socialBox.className =
      "talent-social-links";


    /*
     * No social link
     */

    if (
      !talent.social ||
      !talent.social.url
    ) {

      return;

    }


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
        href="${escapeHTML(
          talent.social.url
        )}"
        target="_blank"
        rel="noopener noreferrer"
      >

        <span class="social-icon">
          ↗
        </span>

        <span class="social-label">
          ${escapeHTML(label)}
        </span>

        <small>
          ${escapeHTML(platform)}
        </small>

        <b>
          →
        </b>

      </a>

    `;


    /*
     * Put social link after lore
     */

    const lore =
      $("#modalLore", modal);

    if (lore) {

      lore.insertAdjacentElement(
        "afterend",
        socialBox
      );

    } else {

      modalCopy.appendChild(
        socialBox
      );

    }

  }


  /* =======================================================
     MODAL EVENTS
     ======================================================= */

  function initModal() {

    $$("[data-close]").forEach(
      (element) => {

        element.addEventListener(
          "click",
          closeTalent
        );

      }
    );


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

  }


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


  /* =======================================================
     PROJECT DAWN LORE
     ======================================================= */

  function initLoreButton() {

    const button =
      $("#loreBtn");

    if (!button) {
      return;
    }


    button.addEventListener(
      "click",
      () => {

        const language =
          getLanguage();


        const lore =
          ASAHI?.projectDawn?.lore?.[
            language
          ] ||
          ASAHI?.projectDawn?.lore?.ja ||
          "Project Dawn";


        showToast(lore);

      }
    );

  }


  /* =======================================================
     COMMUNITY
     ======================================================= */

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
     * Fan name
     */

    if (fanName) {

      fanName.textContent =
        fans.name ||
        "Dawnkeepers";

    }


    /*
     * Fan mark
     */

    if (fanMark) {

      fanMark.textContent =
        fans.mark ||
        "✦🌅";

    }


    /*
     * Official colors
     */

    if (colorDots) {

      const colors =
        Array.isArray(fans.colors)
          ? fans.colors
          : [];


      colorDots.innerHTML =
        colors
          .map(
            (color) => `
              <span
                class="color-dot"
                style="background:${escapeHTML(
                  color
                )}"
                title="${escapeHTML(
                  color
                )}"
              ></span>
            `
          )
          .join("");

    }

  }


  /* =======================================================
     UNIVERSE GUIDE
     ======================================================= */

  const guideData = {

    ja: [

      [
        [
          "project dawn",
          "Project DawnはAsahiLive Generation 0のグループです。Amamiya Ren、Yuna Nanami、Kagami Akiraの三人が、それぞれの光を持ったまま一つの夜明けを作ります。"
        ],

        [
          "ren",
          "Amamiya RenはFuzzyな個性を持つ「The Heart of Dawn」。穏やかで掴みどころのない存在です。"
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
          "Project DawnのファンネームはDawnkeepers、公式ファンマークは✦🌅です。"
        ]

      ]
    ],

    id: [

      [
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
          "Nama fan Project Dawn adalah Dawnkeepers dan fan mark resminya adalah ✦🌅."
        ]

      ]
    ],

    en: [

      [
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
    ]

  };


  function initGuide() {

    const button =
      $("#askBtn");

    const input =
      $("#guideInput");


    if (button) {

      button.addEventListener(
        "click",
        askGuide
      );

    }


    if (input) {

      input.addEventListener(
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

  }


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


    const language =
      getLanguage();


    const data =
      guideData[language] ||
      guideData.ja;


    let answer = "";


    /*
     * Search keywords
     */

    for (
      const [keyword, response]
      of data[0]
    ) {

      if (
        question.includes(
          keyword
        )
      ) {

        answer = response;

        break;

      }

    }


    /*
     * Default answer
     */

    if (!answer) {

      if (language === "ja") {

        answer =
          "Project Dawn、Ren、Yuna、Akira、またはファンコミュニティについて質問できます。";

      }

      else if (
        language === "id"
      ) {

        answer =
          "Kamu bisa bertanya tentang Project Dawn, Ren, Yuna, Akira, atau fan community.";

      }

      else {

        answer =
          "You can ask about Project Dawn, Ren, Yuna, Akira, or the fan community.";

      }

    }


    answerBox.textContent =
      answer;


    input.value = "";

  }


  /* =======================================================
     TOAST
     ======================================================= */

  function showToast(message) {

    const element =
      $("#toast");

    if (!element) {
      return;
    }


    element.textContent =
      message;


    element.classList.add(
      "show"
    );


    clearTimeout(
      window.__asahiliveToast
    );


    window.__asahiliveToast =
      setTimeout(
        () => {

          element.classList.remove(
            "show"
          );

        },
        5000
      );

  }


  /* =======================================================
     REVEAL ANIMATION
     ======================================================= */

  function observeReveal() {

    const elements =
      $$(".reveal");


    if (!elements.length) {
      return;
    }


    /*
     * Browser without IntersectionObserver
     */

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


  /* =======================================================
     LANGUAGE CHANGE
     ======================================================= */

  window.addEventListener(
    "languageChanged",
    () => {

      renderTalents();
      renderCommunity();
      observeReveal();

    }
  );


  /* =======================================================
     HTML ESCAPE
     ======================================================= */

  function escapeHTML(value) {

    return String(value)
      .replace(
        /&/g,
        "&amp;"
      )
      .replace(
        /</g,
        "&lt;"
      )
      .replace(
        />/g,
        "&gt;"
      )
      .replace(
        /"/g,
        "&quot;"
      )
      .replace(
        /'/g,
        "&#039;"
      );

  }

})();
