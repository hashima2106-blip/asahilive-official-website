/* =========================================
   ASAHILIVE INTERNATIONALIZATION SYSTEM
   JP / ID / EN
   ========================================= */

window.I18N = {

  /* =======================================
     JAPANESE
     ======================================= */

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
      "AsahiLiveとProject Dawnについて質問してください。",

    guidePlaceholder:
      "例：Project Dawnとは？",

    ask:
      "質問する",

    close:
      "閉じる",

    jpPrimary:
      "日本語をメイン言語として表示中",

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
      "詳しく見る"

  },


  /* =======================================
     INDONESIAN
     ======================================= */

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
      "Selengkapnya"

  },


  /* =======================================
     ENGLISH
     ======================================= */

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
      "Learn more"

  }

};


/* =========================================
   LANGUAGE SYSTEM
   ========================================= */

(function () {

  const STORAGE_KEY = "asahilive-language";

  const SUPPORTED_LANGUAGES = [
    "ja",
    "id",
    "en"
  ];


  /* -----------------------------------------
     Detect browser language
     ----------------------------------------- */

  function detectBrowserLanguage() {

    const browserLanguage =
      (
        navigator.language ||
        navigator.userLanguage ||
        "ja"
      ).toLowerCase();

    if (browserLanguage.startsWith("id")) {
      return "id";
    }

    if (browserLanguage.startsWith("en")) {
      return "en";
    }

    return "ja";
  }


  /* -----------------------------------------
     Current language
     ----------------------------------------- */

  window.currentLanguage = function () {

    const saved =
      localStorage.getItem(STORAGE_KEY);

    if (
      saved &&
      SUPPORTED_LANGUAGES.includes(saved)
    ) {
      return saved;
    }

    return detectBrowserLanguage();

  };


  /* -----------------------------------------
     Apply translations
     ----------------------------------------- */

  window.setLanguage = function (language) {

    if (
      !SUPPORTED_LANGUAGES.includes(language)
    ) {
      language = "ja";
    }


    localStorage.setItem(
      STORAGE_KEY,
      language
    );


    const dictionary =
      window.I18N[language];


    if (!dictionary) {
      return;
    }


    /* HTML language */

    document.documentElement.lang =
      language;


    /* Text translations */

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


    /* Placeholder translations */

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


    /* Language button */

    const langButton =
      document.querySelector("#langBtn");

    if (langButton) {

      const labels = {
        ja: "JP",
        id: "ID",
        en: "EN"
      };

      langButton.innerHTML =
        labels[language] + " <span>⌄</span>";

    }


    /* Update talent cards */

    if (
      typeof window.renderTalents === "function"
    ) {
      window.renderTalents();
    }

  };


  /* -----------------------------------------
     Initialize language
     ----------------------------------------- */

  window.addEventListener(
    "DOMContentLoaded",
    function () {

      setLanguage(
        currentLanguage()
      );

    }
  );

})();
