/* =========================================================
   ASAHILIVE-ID
   INTERNATIONALIZATION SYSTEM
   i18n.js
   Version 2.0
   ========================================================= */

(function () {
  "use strict";

  /* =========================================================
     CONFIGURATION
     ========================================================= */

  const STORAGE_KEY = "asahilive-language";

  const DEFAULT_LANGUAGE = "ja";

  const SUPPORTED_LANGUAGES = ["ja", "id", "en"];


  /* =========================================================
     TRANSLATION DICTIONARY
     ========================================================= */

  window.I18N = {

    /* =======================================================
       JAPANESE
       ======================================================= */

    ja: {

      heroEyebrow:
        "ASAHILIVE VIRTUAL ENTERTAINMENT",

      heroTitle:
        "異なる光、ひとつの宇宙。",

      heroSub:
        "それぞれの物語が交差する場所。",

      explore:
        "世界へ入る",

      talents:
        "TALENTS",

      talentsSub:
        "Project Dawn — Generation 0",

      viewProfile:
        "プロフィールを見る",

      dawn:
        "PROJECT DAWN",

      dawnSub:
        "GENERATION 0",

      dawnLead:
        "三つの光が、ひとつの夜明けをつくる。",

      readLore:
        "物語を読む",

      universe:
        "ASAHILIVE UNIVERSE",

      universeText:
        "個性、物語、そしてライブエンターテインメント。ここから新しい物語が始まります。",

      news:
        "NEWS & EVENTS",

      about:
        "ABOUT ASAHILIVE",

      aboutText:
        "異なる個性を尊重し、ひとつの宇宙で新しい物語を創るバーチャルエンターテインメント。",

      fans:
        "FAN COMMUNITY",

      fanName:
        "ファンネーム",

      fanMark:
        "ファンマーク",

      officialColors:
        "公式カラー",

      guide:
        "UNIVERSE GUIDE",

      guideIntro:
        "AsahiLiveやProject Dawnについて質問してください。",

      guidePlaceholder:
        "例：Project Dawnとは？",

      ask:
        "質問する",

      close:
        "閉じる",

      jpPrimary:
        "日本語をメイン言語として表示中。",

      footer:
        "© ASAHILIVE. All rights reserved.",

      menu:
        "メニュー",

      socials:
        "SOCIALS",

      auditions:
        "AUDITIONS",

      auditionsText:
        "新しい物語を一緒につくる仲間を募集中。",

      learnMore:
        "詳しく見る",

      guideAnswer:
        "Project Dawn、タレント、ファンコミュニティについて質問できます。"
    },


    /* =======================================================
       INDONESIAN
       ======================================================= */

    id: {

      heroEyebrow:
        "ASAHILIVE VIRTUAL ENTERTAINMENT",

      heroTitle:
        "Cahaya yang berbeda, satu semesta.",

      heroSub:
        "Tempat berbagai cerita bertemu.",

      explore:
        "Masuk ke Universe",

      talents:
        "TALENTS",

      talentsSub:
        "Project Dawn — Generation 0",

      viewProfile:
        "Lihat profil",

      dawn:
        "PROJECT DAWN",

      dawnSub:
        "GENERATION 0",

      dawnLead:
        "Tiga cahaya, satu fajar.",

      readLore:
        "Baca lore",

      universe:
        "ASAHILIVE UNIVERSE",

      universeText:
        "Kepribadian, cerita, dan live entertainment. Sebuah cerita baru dimulai dari sini.",

      news:
        "NEWS & EVENTS",

      about:
        "ABOUT ASAHILIVE",

      aboutText:
        "Hiburan virtual yang merayakan perbedaan dan menciptakan cerita baru dalam satu semesta.",

      fans:
        "FAN COMMUNITY",

      fanName:
        "Nama Fan",

      fanMark:
        "Fan Mark",

      officialColors:
        "Warna Resmi",

      guide:
        "UNIVERSE GUIDE",

      guideIntro:
        "Tanyakan tentang AsahiLive atau Project Dawn.",

      guidePlaceholder:
        "Contoh: Apa itu Project Dawn?",

      ask:
        "Tanya",

      close:
        "Tutup",

      jpPrimary:
        "Bahasa utama: Jepang",

      footer:
        "© ASAHILIVE. Seluruh hak dilindungi.",

      menu:
        "Menu",

      socials:
        "SOSIAL",

      auditions:
        "AUDISI",

      auditionsText:
        "Kami mencari talenta baru untuk menciptakan cerita bersama.",

      learnMore:
        "Selengkapnya",

      guideAnswer:
        "Tanyakan tentang Project Dawn, Ren, Yuna, Akira, atau fan community."
    },


    /* =======================================================
       ENGLISH
       ======================================================= */

    en: {

      heroEyebrow:
        "ASAHILIVE VIRTUAL ENTERTAINMENT",

      heroTitle:
        "Different lights, one universe.",

      heroSub:
        "Where different stories cross paths.",

      explore:
        "Enter the Universe",

      talents:
        "TALENTS",

      talentsSub:
        "Project Dawn — Generation 0",

      viewProfile:
        "View profile",

      dawn:
        "PROJECT DAWN",

      dawnSub:
        "GENERATION 0",

      dawnLead:
        "Three lights. One dawn.",

      readLore:
        "Read lore",

      universe:
        "ASAHILIVE UNIVERSE",

      universeText:
        "Personality, stories, and live entertainment. A new story begins here.",

      news:
        "NEWS & EVENTS",

      about:
        "ABOUT ASAHILIVE",

      aboutText:
        "Virtual entertainment that celebrates individuality and creates new stories within one universe.",

      fans:
        "FAN COMMUNITY",

      fanName:
        "Fan name",

      fanMark:
        "Fan mark",

      officialColors:
        "Official colors",

      guide:
        "UNIVERSE GUIDE",

      guideIntro:
        "Ask anything about AsahiLive or Project Dawn.",

      guidePlaceholder:
        "Example: What is Project Dawn?",

      ask:
        "Ask",

      close:
        "Close",

      jpPrimary:
        "Primary language: Japanese",

      footer:
        "© ASAHILIVE. All rights reserved.",

      menu:
        "Menu",

      socials:
        "SOCIALS",

      auditions:
        "AUDITIONS",

      auditionsText:
        "We are looking for new talents to create stories together.",

      learnMore:
        "Learn more",

      guideAnswer:
        "Try asking about Project Dawn, Ren, Yuna, Akira, or the fan community."
    }

  };


  /* =========================================================
     LANGUAGE DETECTION
     ========================================================= */

  function detectBrowserLanguage() {

    const browserLanguage = (
      navigator.language ||
      navigator.userLanguage ||
      DEFAULT_LANGUAGE
    ).toLowerCase();


    /* Indonesian */

    if (browserLanguage.startsWith("id")) {
      return "id";
    }


    /* English */

    if (browserLanguage.startsWith("en")) {
      return "en";
    }


    /* Japanese */

    if (browserLanguage.startsWith("ja")) {
      return "ja";
    }


    /* Everything else → Japanese */

    return DEFAULT_LANGUAGE;
  }


  /* =========================================================
     GET CURRENT LANGUAGE
     ========================================================= */

  function getCurrentLanguage() {

    const savedLanguage =
      localStorage.getItem(STORAGE_KEY);


    if (
      savedLanguage &&
      SUPPORTED_LANGUAGES.includes(savedLanguage)
    ) {
      return savedLanguage;
    }


    return detectBrowserLanguage();
  }


  /* =========================================================
     TRANSLATE TEXT
     ========================================================= */

  function translateText(language) {

    const dictionary =
      window.I18N[language];


    if (!dictionary) {
      console.warn(
        "[i18n] Translation dictionary not found:",
        language
      );

      return;
    }


    /* -------------------------------------------------------
       TEXT CONTENT
       ------------------------------------------------------- */

    document
      .querySelectorAll("[data-i18n]")
      .forEach(function (element) {

        const key =
          element.getAttribute("data-i18n");


        if (
          Object.prototype.hasOwnProperty.call(
            dictionary,
            key
          )
        ) {

          element.textContent =
            dictionary[key];

        }

      });


    /* -------------------------------------------------------
       PLACEHOLDER
       ------------------------------------------------------- */

    document
      .querySelectorAll("[data-i18n-placeholder]")
      .forEach(function (element) {

        const key =
          element.getAttribute(
            "data-i18n-placeholder"
          );


        if (
          Object.prototype.hasOwnProperty.call(
            dictionary,
            key
          )
        ) {

          element.placeholder =
            dictionary[key];

        }

      });


    /* -------------------------------------------------------
       TITLE ATTRIBUTE
       ------------------------------------------------------- */

    document
      .querySelectorAll("[data-i18n-title]")
      .forEach(function (element) {

        const key =
          element.getAttribute(
            "data-i18n-title"
          );


        if (
          Object.prototype.hasOwnProperty.call(
            dictionary,
            key
          )
        ) {

          element.title =
            dictionary[key];

        }

      });


    /* -------------------------------------------------------
       HTML LANGUAGE
       ------------------------------------------------------- */

    document.documentElement.lang =
      language;


    /* -------------------------------------------------------
       LANGUAGE BUTTON
       ------------------------------------------------------- */

    updateLanguageButton(language);


    /* -------------------------------------------------------
       GUIDE ANSWER
       ------------------------------------------------------- */

    updateGuideAnswer(language);


    /* -------------------------------------------------------
       TALENT CARDS
       ------------------------------------------------------- */

    if (
      typeof window.renderTalents === "function"
    ) {

      try {

        window.renderTalents();

      } catch (error) {

        console.warn(
          "[i18n] renderTalents() failed:",
          error
        );

      }

    }


    /* -------------------------------------------------------
       EVENT
       ------------------------------------------------------- */

    document.dispatchEvent(
      new CustomEvent(
        "asahilive:languagechange",
        {
          detail: {
            language: language
          }
        }
      )
    );

  }


  /* =========================================================
     LANGUAGE BUTTON
     ========================================================= */

  function updateLanguageButton(language) {

    const langButton =
      document.querySelector("#langBtn");


    if (!langButton) {
      return;
    }


    const labels = {

      ja: "JP",

      id: "ID",

      en: "EN"

    };


    langButton.innerHTML =
      labels[language] +
      ' <span>⌄</span>';

  }


  /* =========================================================
     GUIDE ANSWER
     ========================================================= */

  function updateGuideAnswer(language) {

    const chatAnswer =
      document.querySelector("#chatAnswer");


    if (!chatAnswer) {
      return;
    }


    const dictionary =
      window.I18N[language];


    if (
      dictionary &&
      dictionary.guideAnswer
    ) {

      chatAnswer.textContent =
        dictionary.guideAnswer;

    }

  }


  /* =========================================================
     SET LANGUAGE
     ========================================================= */

  function setLanguage(language) {

    /* -------------------------------------------------------
       Validate language
       ------------------------------------------------------- */

    if (
      !SUPPORTED_LANGUAGES.includes(language)
    ) {

      console.warn(
        "[i18n] Unsupported language:",
        language
      );

      language =
        DEFAULT_LANGUAGE;

    }


    /* -------------------------------------------------------
       Save language
       ------------------------------------------------------- */

    localStorage.setItem(
      STORAGE_KEY,
      language
    );


    /* -------------------------------------------------------
       Apply translation
       ------------------------------------------------------- */

    translateText(language);

  }


  /* =========================================================
     PUBLIC API
     ========================================================= */

  window.AsahiLiveI18n = {

    setLanguage: setLanguage,

    getLanguage: getCurrentLanguage,

    detectLanguage: detectBrowserLanguage,

    translate: translateText,

    supportedLanguages:
      SUPPORTED_LANGUAGES.slice(),

    defaultLanguage:
      DEFAULT_LANGUAGE

  };


  /* =========================================================
     BACKWARD COMPATIBILITY
     ========================================================= */

  /*
     File lain di website kamu mungkin masih memanggil:

     window.currentLanguage()

     atau

     window.setLanguage()

     Jadi kita tetap menyediakan keduanya.
     Tetapi sumber sistemnya hanya satu.
  */

  window.currentLanguage =
    getCurrentLanguage;


  window.setLanguage =
    setLanguage;


  /* =========================================================
     LANGUAGE BUTTON EVENTS
     ========================================================= */

  document.addEventListener(
    "click",
    function (event) {

      const target =
        event.target.closest(
          "[data-language]"
        );


      if (!target) {
        return;
      }


      const language =
        target.getAttribute(
          "data-language"
        );


      if (
        SUPPORTED_LANGUAGES.includes(
          language
        )
      ) {

        setLanguage(language);

      }

    }
  );


  /* =========================================================
     INITIALIZATION
     ========================================================= */

  function initializeI18n() {

    const language =
      getCurrentLanguage();


    console.log(
      "[AsahiLive i18n] Language:",
      language
    );


    translateText(language);

  }


  /* =========================================================
     DOM READY
     ========================================================= */

  if (
    document.readyState === "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      initializeI18n
    );

  } else {

    initializeI18n();

  }


})();
