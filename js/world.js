class IoWorld {
  constructor(player, storage) {
    this.player = player;
    this.storage = storage;

    this.playlist = document.getElementById("playlist");

    this.scrambleIntervals = new Map();
  }

  init(tracks) {
    this.tracks = tracks;
    this.render();
  }

  render() {
    this.playlist.innerHTML = "";

    this.tracks.forEach((t, i) => {
      const el = document.createElement("div");
      el.className = "track locked";
      el.dataset.index = i;

      el.innerHTML = this.getScrambledTitle(i);

      el.onclick = () => this.onClick(i, el);

      this.playlist.appendChild(el);

      this.startScramble(i, el);
    });
  }

  getScrambledTitle(i) {
    const completed = this.storage.getCompleted();

    if (completed.includes(i)) {
      return `${i + 1}. ${this.tracks[i].title}`;
    }

    return `${i + 1}. ${this.scramble(this.tracks[i].title)}`;
  }

  scramble(text) {
    const chars = "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ0123456789";
    return text
      .split("")
      .map((c) => {
        if (Math.random() < 0.3) return c;
        if (c === " ") return " ";
        return chars[Math.floor(Math.random() * chars.length)];
      })
      .join("");
  }

  startScramble(i, el) {
    const interval = setInterval(() => {
      const completed = this.storage.getCompleted();

      if (completed.includes(i)) {
        clearInterval(interval);
        el.innerHTML = `${i + 1}. ${this.tracks[i].title}`;
        return;
      }

      el.innerHTML = `${i + 1}. ${this.scramble(this.tracks[i].title)}`;
    }, 120);

    this.scrambleIntervals.set(i, interval);
  }

  onClick(i, el) {
    if (i > this.player.currentIndex) return;

    // фиксируем трек
    this.player.currentIndex = i;
    this.player.loadTrack(i);
    this.player.play();

    this.storage.saveIndex(i);
    this.storage.saveCompleted(i);

    el.innerHTML = `${i + 1}. ${this.tracks[i].title}`;
    el.classList.add("revealed");

    const interval = this.scrambleIntervals.get(i);
    if (interval) clearInterval(interval);
  }
}
