/* =========================
   BOOT v0.1 — STORAGE
   Project DAWN
   ========================= */

const Storage = (() => {

  const KEYS = {
    JOURNEY: "dawn_journey",
    PROGRESS: "dawn_progress",
    SETTINGS: "dawn_settings"
  };

  /* ===== INIT ===== */

  function init() {
    if (!localStorage.getItem(KEYS.JOURNEY)) {
      localStorage.setItem(KEYS.JOURNEY, JSON.stringify({
        started: Date.now(),
        visits: 1,
        mythUnlocked: false
      }));
    } else {
      const data = JSON.parse(localStorage.getItem(KEYS.JOURNEY));
      data.visits += 1;
      localStorage.setItem(KEYS.JOURNEY, JSON.stringify(data));
    }

    if (!localStorage.getItem(KEYS.PROGRESS)) {
      localStorage.setItem(KEYS.PROGRESS, JSON.stringify({
        currentTrack: 1,
        completedTracks: []
      }));
    }

    if (!localStorage.getItem(KEYS.SETTINGS)) {
      localStorage.setItem(KEYS.SETTINGS, JSON.stringify({
        lang: "en"
      }));
    }
  }

  /* ===== GETTERS ===== */

  function getJourney() {
    return JSON.parse(localStorage.getItem(KEYS.JOURNEY));
  }

  function getProgress() {
    return JSON.parse(localStorage.getItem(KEYS.PROGRESS));
  }

  function getSettings() {
    return JSON.parse(localStorage.getItem(KEYS.SETTINGS));
  }

  /* ===== PROGRESS ===== */

  function completeTrack(id) {
    const progress = getProgress();

    if (!progress.completedTracks.includes(id)) {
      progress.completedTracks.push(id);
    }

    progress.currentTrack = id + 1;

    localStorage.setItem(KEYS.PROGRESS, JSON.stringify(progress));
  }

  function isTrackUnlocked(id) {
    const progress = getProgress();
    return id <= progress.currentTrack;
  }

  /* ===== MYTH ===== */

  function unlockMyth() {
    const journey = getJourney();
    journey.mythUnlocked = true;
    localStorage.setItem(KEYS.JOURNEY, JSON.stringify(journey));
  }

  function isMythUnlocked() {
    return getJourney().mythUnlocked;
  }

  /* ===== RESET (for dev) ===== */

  function reset() {
    localStorage.removeItem(KEYS.JOURNEY);
    localStorage.removeItem(KEYS.PROGRESS);
    localStorage.removeItem(KEYS.SETTINGS);
  }

  return {
    init,
    getJourney,
    getProgress,
    getSettings,
    completeTrack,
    isTrackUnlocked,
    unlockMyth,
    isMythUnlocked,
    reset
  };

})();
