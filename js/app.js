/* =========================
   BOOT v0.1 — APP ENTRY
   Project DAWN
   ========================= */

(async () => {

  /* ===== LOAD DATA ===== */

  const tracksData = await fetch("data/tracks.json")
    .then(res => res.json());

  /* ===== INIT CORE SYSTEMS ===== */

  Storage.init();

  const lang = Storage.getSettings().lang;
  Translations.init(lang);

  UI.init();
  Player.init();
  Journey.init(tracksData);

  /* ===== APPLY LANGUAGE ===== */

  Translations.applyToDOM();
  UI.setActiveLang(lang);

  /* ===== RENDER TRACKS ===== */

  const progress = Storage.getProgress();
  UI.renderTracks(tracksData.tracks, progress);

  /* ===== EVENTS ===== */

  document.addEventListener("track:selected", (e) => {
    Journey.startTrack(e.detail);
  });

  document.addEventListener("track:ended", (e) => {
    Journey.onTrackEnded(e.detail);
  });

  document.addEventListener("myth:unlocked", () => {
    UI.showToast("Go deeper.");
  });

  /* ===== LANGUAGE SWITCH ===== */

  document.getElementById("enButton").addEventListener("click", () => {
    Translations.setLang("en");
    Storage.getSettings().lang = "en";
    localStorage.setItem("dawn_settings", JSON.stringify(Storage.getSettings()));

    Translations.applyToDOM();
    UI.setActiveLang("en");
  });

  document.getElementById("ruButton").addEventListener("click", () => {
    Translations.setLang("ru");
    Storage.getSettings().lang = "ru";
    localStorage.setItem("dawn_settings", JSON.stringify(Storage.getSettings()));

    Translations.applyToDOM();
    UI.setActiveLang("ru");
  });

  /* ===== CONSOLE EXPERIENCE ===== */

  console.log("%cBOOT SEQUENCE", "color:#c9b36a; font-size:12px; letter-spacing:2px;");
  console.log("Loading memories...");
  console.log("Searching for dawn...");
  console.log("The path continues.");

})();
