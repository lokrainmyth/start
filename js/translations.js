/* =========================
   BOOT v0.1 — TRANSLATIONS
   Project DAWN
   ========================= */

const Translations = (() => {

  const dictionary = {

    en: {
      album: "Album",
      release: "Release",
      artist: "ARTIST",

      intro1: "Io is the final chapter of a fifteen-year journey through night to dawn.",
      intro2: "Listen from beginning to end.",
      intro3: "The path continues beyond the last track.",

      welcome: "Welcome",
      path: "The path continues.",

      locked: "Locked",
      completed: "Completed",

      mythEnter: "Go deeper",
      return: "Return to dawn",

      communication: "Communication"
    },

    ru: {
      album: "Альбом",
      release: "Релиз",
      artist: "АРТИСТ",

      intro1: "Io — финальная глава пятнадцатилетнего пути через ночь к рассвету.",
      intro2: "Прослушай альбом от начала до конца.",
      intro3: "Путь продолжается за пределами последнего трека.",

      welcome: "Добро пожаловать",
      path: "Путь продолжается.",

      locked: "Закрыто",
      completed: "Прослушано",

      mythEnter: "Глубже",
      return: "Вернуться к рассвету",

      communication: "Связь"
    }

  };

  let currentLang = "en";

  function init(lang = "en") {
    currentLang = lang;
  }

  function setLang(lang) {
    currentLang = lang;
  }

  function getLang() {
    return currentLang;
  }

  function t(key) {
    return dictionary[currentLang][key] || key;
  }

  function applyToDOM() {
    const elements = document.querySelectorAll("[data-i18n]");
    elements.forEach(el => {
      const key = el.getAttribute("data-i18n");
      el.textContent = t(key);
    });
  }

  return {
    init,
    setLang,
    getLang,
    t,
    applyToDOM
  };

})();
