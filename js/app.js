/* =========================
   app.js — Io First Light
   Bootstrap / world init
   ========================= */

class IoApp {
  constructor() {
    this.player = null;
    this.journey = null;
    this.storage = new IoStorage();

    this.tracks = [];
  }

  async init() {
    await this.loadTracks();

    this.player = new IoPlayer();
    this.journey = new IoJourney(this.player);

    this.player.load(this.tracks);
    this.journey.init();

    this.restoreWorld();
    this.bindGlobalState();
  }

  async loadTracks() {
    const res = await fetch("./data/tracks.json");
    this.tracks = await res.json();
  }

  restoreWorld() {
    const index = this.storage.getIndex();
    const state = this.storage.getState();

    this.player.currentIndex = index;
    this.player.loadTrack(index);

    document.body.classList.remove(
      "state-night",
      "state-deep-night",
      "state-pre-dawn",
      "state-dawn",
      "state-morning"
    );

    document.body.classList.add(`state-${state}`);

    const indicator = document.getElementById("stateIndicator");
    if (indicator) {
      indicator.textContent = state.toUpperCase();
    }
  }

  bindGlobalState() {
    // sync player → storage
    this.player.saveIndex = (i) => {
      this.storage.saveIndex(i);
    };

    this.player.getSavedIndex = () => {
      return this.storage.getIndex();
    };

    // hook completion
    const originalCompleted = this.player.markCompleted.bind(this.player);
    this.player.markCompleted = (index) => {
      this.storage.saveCompleted(index);
      originalCompleted(index);
    };

    // hook skip
    const originalSkip = this.player.markSkipped.bind(this.player);
    this.player.markSkipped = (index) => {
      this.storage.saveSkipped(index);
      originalSkip(index);
    };

    // hook state save (from journey)
    const originalUpdateState = this.journey.updateWorldState.bind(this.journey);
    this.journey.updateWorldState = (index) => {
      const state = this.journey.getStateByIndex(index);
      this.storage.saveState(state);
      originalUpdateState(index);
    };
  }
}

/* =========================
   BOOTSTRAP
   ========================= */

window.addEventListener("DOMContentLoaded", () => {
  const app = new IoApp();
  app.init();
});
