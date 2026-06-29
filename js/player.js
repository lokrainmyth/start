/* =========================
   player.js — Io First Light
   Core audio path system
   ========================= */

class IoPlayer {
  constructor() {
    this.audio = document.getElementById("audioEngine");

    this.tracks = [];
    this.currentIndex = 0;

    this.isPlaying = false;
    this.isLocked = true;

    this.state = "night";

    this.progressBar = document.getElementById("progressBar");
    this.currentTimeEl = document.getElementById("currentTime");
    this.totalTimeEl = document.getElementById("totalTime");

    this.trackNameEl = document.getElementById("trackName");
    this.trackNumberEl = document.getElementById("trackNumber");

    this.skipModal = document.getElementById("skipModal");
    this.warningModal = document.getElementById("warningModal");

    this.bindEvents();
  }

  load(tracks) {
    this.tracks = tracks;
    this.currentIndex = this.getSavedIndex() || 0;
    this.loadTrack(this.currentIndex);
  }

  bindEvents() {
    document.getElementById("playBtn").addEventListener("click", () => this.play());
    document.getElementById("pauseBtn").addEventListener("click", () => this.pause());
    document.getElementById("skipBtn").addEventListener("click", () => this.requestSkip());

    document.getElementById("confirmSkip").addEventListener("click", () => this.skip(true));
    document.getElementById("cancelSkip").addEventListener("click", () => this.closeModal());

    this.audio.addEventListener("timeupdate", () => this.updateProgress());
    this.audio.addEventListener("ended", () => this.next());
  }

  loadTrack(index) {
    const track = this.tracks[index];
    if (!track) return;

    this.audio.src = `./assets/music/${track.file}`;
    this.trackNameEl.textContent = track.title || "UNKNOWN";
    this.trackNumberEl.textContent = String(index + 1).padStart(2, "0");

    this.saveIndex(index);
  }

  play() {
    this.audio.play();
    this.isPlaying = true;
  }

  pause() {
    this.audio.pause();
    this.isPlaying = false;
  }

  requestSkip() {
    this.skipModal.classList.remove("hidden");
  }

  skip(force = false) {
    if (!force) return;

    this.markSkipped(this.currentIndex);

    this.currentIndex++;

    if (this.currentIndex >= this.tracks.length) {
      this.finishJourney();
      return;
    }

    this.loadTrack(this.currentIndex);
    this.play();

    this.closeModal();
  }

  next() {
    this.markCompleted(this.currentIndex);

    this.currentIndex++;

    if (this.currentIndex >= this.tracks.length) {
      this.finishJourney();
      return;
    }

    this.loadTrack(this.currentIndex);
    this.play();
  }

  updateProgress() {
    if (!this.audio.duration) return;

    const percent = (this.audio.currentTime / this.audio.duration) * 100;
    this.progressBar.style.width = `${percent}%`;

    this.currentTimeEl.textContent = this.formatTime(this.audio.currentTime);
    this.totalTimeEl.textContent = this.formatTime(this.audio.duration);
  }

  markCompleted(index) {
    const el = document.querySelector(`[data-track="${index}"]`);
    if (!el) return;

    el.classList.remove("locked");
    el.classList.add("completed");
    el.querySelector(".track-status").textContent = "☀";
  }

  markSkipped(index) {
    const el = document.querySelector(`[data-track="${index}"]`);
    if (!el) return;

    el.classList.add("skipped");
    el.querySelector(".track-status").textContent = "SKIP";
  }

  closeModal() {
    this.skipModal.classList.add("hidden");
    this.warningModal.classList.add("hidden");
  }

  finishJourney() {
    document.body.classList.add("state-morning");
    document.body.classList.remove("state-night");

    const myth = document.getElementById("mythLayer");
    myth.classList.remove("hidden");
  }

  formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }

  saveIndex(i) {
    localStorage.setItem("io_current_index", i);
  }

  getSavedIndex() {
    return parseInt(localStorage.getItem("io_current_index"));
  }
}

window.IoPlayer = IoPlayer;
