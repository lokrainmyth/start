class IoPlayer {
  constructor() {
    this.audio = document.getElementById("audio");
    this.currentIndex = 0;

    this.onChange = null;
    this.onEnd = null;

    this.bar = document.getElementById("bar");

    this.bind();
  }

  bind() {
    document.getElementById("play").onclick = () => this.audio.play();
    document.getElementById("pause").onclick = () => this.audio.pause();
    document.getElementById("skip").onclick = () => this.next();

    this.audio.ontimeupdate = () => this.update();
    this.audio.onended = () => this.next();
  }

  loadTrack(i) {
    this.audio.src = "./" + this.tracks[i].file;
    this.audio.load();

    if (this.onChange) this.onChange(i);
  }

  load(tracks) {
    this.tracks = tracks;
    this.loadTrack(0);
  }

  play() {
    this.audio.play();
  }

  next() {
    this.currentIndex++;

    if (this.currentIndex >= this.tracks.length) {
      if (this.onEnd) this.onEnd();
      return;
    }

    this.loadTrack(this.currentIndex);
    this.play();
  }

  update() {
    if (!this.audio.duration) return;
    const p = (this.audio.currentTime / this.audio.duration) * 100;
    this.bar.style.width = p + "%";
  }
}
