class IoPlayer {
  constructor() {
    this.audio = document.getElementById("audioEngine");

    this.tracks = [];
    this.currentIndex = 0;

    this.onTrackChange = null;
    this.onFinish = null;

    this.progressBar = document.getElementById("progressBar");
    this.currentTimeEl = document.getElementById("currentTime");
    this.totalTimeEl = document.getElementById("totalTime");

    this.bind();
  }

  bind() {
    document.getElementById("playBtn").onclick = () => this.play();
    document.getElementById("pauseBtn").onclick = () => this.pause();
    document.getElementById("skipBtn").onclick = () => this.next();

    this.audio.addEventListener("timeupdate", () => this.update());
    this.audio.addEventListener("ended", () => this.next());
  }

  load(tracks) {
    this.tracks = tracks;
    this.loadTrack(this.currentIndex);
  }

  loadTrack(i) {
    const t = this.tracks[i];
    if (!t) return;

    this.audio.src = `./${t.file}`;
    this.audio.load();

    if (this.onTrackChange) this.onTrackChange(i);
  }

  play() {
    this.audio.play();
  }

  pause() {
    this.audio.pause();
  }

  next() {
    this.currentIndex++;

    if (this.currentIndex >= this.tracks.length) {
      if (this.onFinish) this.onFinish();
      return;
    }

    this.loadTrack(this.currentIndex);
    this.play();
  }

  update() {
    if (!this.audio.duration) return;

    const p = (this.audio.currentTime / this.audio.duration) * 100;
    this.progressBar.style.width = p + "%";

    this.currentTimeEl.textContent = this.format(this.audio.currentTime);
    this.totalTimeEl.textContent = this.format(this.audio.duration);
  }

  format(t) {
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
  }
}
