/* =========================
   BOOT v0.1 — UI
   Project DAWN
   ========================= */

const UI = (() => {

  let trackContainer = null;
  let toastEl = null;

  /* ===== INIT ===== */

  function init() {
    trackContainer = document.getElementById("playerSection");
    toastEl = document.getElementById("toast");
  }

  /* ===== TOAST ===== */

  function showToast(message, duration = 2500) {
    if (!toastEl) return;

    toastEl.textContent = message;
    toastEl.classList.add("show");

    setTimeout(() => {
      toastEl.classList.remove("show");
    }, duration);
  }

  /* ===== TRACK RENDER ===== */

  function renderTracks(tracks, progress) {
    if (!trackContainer) return;

    trackContainer.innerHTML = "";

    tracks.forEach(track => {

      const el = document.createElement("div");
      el.classList.add("track");

      const isUnlocked = track.id <= progress.currentTrack;

      if (!isUnlocked) {
        el.classList.add("locked");
      } else if (progress.completedTracks.includes(track.id)) {
        el.classList.add("unlocked");
      }

      el.dataset.id = track.id;

      el.innerHTML = `
        <div class="num">${track.id}</div>
        <div class="title">${track.title}</div>
        <div class="status">
          ${progress.completedTracks.includes(track.id) ? "✓" : ""}
        </div>
      `;

      // click is intentionally disabled for locked tracks
      if (isUnlocked) {
        el.addEventListener("click", () => {
          document.dispatchEvent(new CustomEvent("track:selected", {
            detail: track
          }));
        });
      }

      trackContainer.appendChild(el);
    });
  }

  /* ===== UPDATE TRACK STATES ===== */

  function updateTrackState(trackId, state) {
    const el = document.querySelector(`[data-id="${trackId}"]`);
    if (!el) return;

    el.classList.remove("locked", "unlocked", "active");

    el.classList.add(state);
  }

  /* ===== LANGUAGE SWITCH VISUAL ===== */

  function setActiveLang(lang) {
    document.querySelectorAll(".lang").forEach(btn => {
      btn.classList.remove("active");
    });

    const btn = document.getElementById(lang + "Button");
    if (btn) btn.classList.add("active");
  }

  return {
    init,
    showToast,
    renderTracks,
    updateTrackState,
    setActiveLang
  };

})();
