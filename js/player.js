/* =========================
   BOOT v0.1 — PLAYER
   Project DAWN
   ========================= */

const Player = (() => {

  let audio = null;
  let currentTrack = null;
  let isPlaying = false;

  /* ===== INIT ===== */

  function init() {
    audio = new Audio();
    audio.preload = "auto";

    bindEvents();
  }

  /* ===== EVENTS ===== */

  function bindEvents() {

    audio.addEventListener("ended", () => {
      onTrackEnd();
    });

  }

  /* ===== LOAD TRACK ===== */

  function load(track) {
    if (!track) return;

    currentTrack = track;
    audio.src = track.file;
  }

  /* ===== PLAY ===== */

  function play(track) {

    if (track) {
      load(track);
    }

    if (!audio.src) return;

    audio.play();
    isPlaying = true;

    updateMediaSession(currentTrack);
  }

  /* ===== STOP ===== */

  function stop() {
    audio.pause();
    isPlaying = false;
  }

  /* ===== END LOGIC ===== */

  function onTrackEnd() {
    isPlaying = false;

    document.dispatchEvent(new CustomEvent("track:ended", {
      detail: currentTrack
    }));
  }

  /* ===== MEDIA SESSION (lock screen support) ===== */

  function updateMediaSession(track) {

    if (!("mediaSession" in navigator)) return;

    navigator.mediaSession.metadata = new MediaMetadata({
      title: track.title,
      artist: "Lo.Krain",
      album: "Io",
      artwork: [
        { src: "cover.jpeg", sizes: "512x512", type: "image/jpeg" }
      ]
    });

    navigator.mediaSession.setActionHandler("play", () => play());
    navigator.mediaSession.setActionHandler("pause", () => stop());

    // intentionally NO next/previous controls
    navigator.mediaSession.setActionHandler("nexttrack", null);
    navigator.mediaSession.setActionHandler("previoustrack", null);
  }

  /* ===== GET STATE ===== */

  function getCurrent() {
    return currentTrack;
  }

  function getAudio() {
    return audio;
  }

  return {
    init,
    play,
    stop,
    load,
    getCurrent,
    getAudio
  };

})();
