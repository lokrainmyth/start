/* =========================
   journey.js — Io First Light
   World awakening system
   ========================= */

class IoJourney {
  constructor(player) {
    this.player = player;

    this.about = document.getElementById("aboutSection");
    this.lyrics = document.getElementById("lyricsSection");
    this.communication = document.getElementById("communicationSection");

    this.stateIndicator = document.getElementById("stateIndicator");

    this.revealMap = {
      2: "about",
      5: "lyrics",
      7: "communication"
    };
  }

  init() {
    this.bindTrackEvents();
  }

  bindTrackEvents() {
    const items = document.querySelectorAll(".track-item");

    items.forEach((item) => {
      item.addEventListener("click", (e) => {
        const index = Number(item.dataset.track);
        this.handleTrackTap(index);
      });
    });
  }

  handleTrackTap(index) {
    if (index > this.player.currentIndex) {
      this.showLockedFeedback();
      return;
    }

    if (index < this.player.currentIndex) {
      return;
    }

    this.updateWorldState(index);
    this.revealInterface(index);
  }

  updateWorldState(index) {
    const state = this.getStateByIndex(index);

    document.body.classList.remove(
      "state-night",
      "state-deep-night",
      "state-pre-dawn",
      "state-dawn",
      "state-morning"
    );

    document.body.classList.add(`state-${state}`);

    this.stateIndicator.textContent = state.toUpperCase();
  }

  getStateByIndex(index) {
    if (index <= 1) return "night";
    if (index <= 3) return "deep-night";
    if (index <= 5) return "pre-dawn";
    if (index <= 7) return "dawn";
    return "morning";
  }

  revealInterface(index) {
    const key = this.revealMap[index];
    if (!key) return;

    if (key === "about") this.unlock(this.about);
    if (key === "lyrics") this.unlock(this.lyrics);
    if (key === "communication") this.unlock(this.communication);
  }

  unlock(el) {
    if (!el) return;

    el.classList.remove("locked");
    el.classList.add("revealed");
  }

  showLockedFeedback() {
    const warning = document.getElementById("warningModal");
    warning.classList.remove("hidden");
  }
}

window.IoJourney = IoJourney;
