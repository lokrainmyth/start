class IoWorld {
  constructor(player) {
    this.player = player;
    this.playlist = document.getElementById("playlist");

    this.letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  }

  init(tracks) {
    this.tracks = tracks;
    this.render();
  }

  render() {
    this.playlist.innerHTML = "";

    this.tracks.forEach((t, i) => {
      const el = document.createElement("div");
      el.className = "track";
      el.dataset.index = i;

      el.textContent = this.mask(t.title, i);

      el.onclick = () => this.play(i, el);

      this.playlist.appendChild(el);

      this.glitch(el, i);
    });
  }

  mask(text, seed) {
    if (seed === 0) return text;

    return text
      .split("")
      .map(c => (Math.random() > 0.7 ? c : this.letters[Math.floor(Math.random()*this.letters.length)]))
      .join("");
  }

  glitch(el, i) {
    if (i === 0) return;

    setInterval(() => {
      if (this.player.currentIndex >= i) return;

      el.textContent = this.mask(this.tracks[i].title, i);
    }, 120);
  }

  play(i, el) {
    if (i > this.player.currentIndex) return;

    this.player.currentIndex = i;
    this.player.loadTrack(i);
    this.player.play();

    el.classList.add("revealed");
    el.textContent = this.tracks[i].title;
  }
}
