/* =========================
   BOOT v0.1 — JOURNEY
   Project DAWN
   ========================= */

const Journey = (() => {

  let tracks = [];
  let progress = null;
  let isCompleted = false;

  /* ===== INIT ===== */

  function init(trackData) {
    tracks = trackData.tracks;
    progress = Storage.getProgress();

    checkCompletion();
  }

  /* ===== START TRACK ===== */

  function startTrack(track) {

    if (!Storage.isTrackUnlocked(track.id)) {
      return;
    }

    UI.updateTrackState(track.id, "active");

    Player.play(track);
  }

  /* ===== COMPLETE TRACK ===== */

  function completeTrack(track) {

    Storage.completeTrack(track.id);

    UI.updateTrackState(track.id, "unlocked");

    UI.showToast("The path continues.");

    checkCompletion();
  }

  /* ===== TRACK END HANDLER ===== */

  function onTrackEnded(track) {

    completeTrack(track);

    const nextTrackId = track.id + 1;
    const nextTrack = tracks.find(t => t.id === nextTrackId);

    if (nextTrack) {
      setTimeout(() => {
        startTrack(nextTrack);
      }, 1500);
    } else {
      unlockMyth();
    }
  }

  /* ===== MYTH ===== */

  function unlockMyth() {

    Storage.unlockMyth();

    isCompleted = true;

    UI.showToast("Go deeper.");

    document.dispatchEvent(new Event("myth:unlocked"));
  }

  /* ===== COMPLETION CHECK ===== */

  function checkCompletion() {

    const progress = Storage.getProgress();

    const allDone = tracks.every(t =>
      progress.completedTracks.includes(t.id)
    );

    if (allDone && !isCompleted) {
      unlockMyth();
    }
  }

  /* ===== PUBLIC ===== */

  return {
    init,
    startTrack,
    onTrackEnded,
    unlockMyth
  };

})();
