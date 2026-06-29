class IoWorld {
  constructor(player, storage) {
    this.player = player;
    this.storage = storage;
    this.playlist = document.getElementById("playlist");
    this.intervals = new Map();
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

      el.onclick = () => this.play(i, el);

      this.playlist.appendChild(el);

      this.startScramble(i, el);
    });
  }

  // ===== AIRPORT STYLE SCRAMBLE =====
  scrambleText(text, progress = 0) {
    const chars = "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩ";

    return text
      .split("")
      .map((c, i) => {
        if (c === " ") return " ";

        // постепенно “фиксируем” буквы слева направо
        if (i < progress) return c;

        return Math.random() > 0.5
          ? "_"
          : chars[Math.floor(Math.random() * chars.length)];
      })
      .join("");
  }

  startScramble(i, el) {
    let step = 0;

    const interval = setInterval(() => {
      const completed = this.storage.getCompleted();
      const title = this.tracks[i].title;

      if (completed.includes(i)) {
        clearInterval(interval);
        el.innerHTML = `${i + 1}. ${title}`;
        return;
      }

      step = (step + 1) % (title.length + 2);

      el.innerHTML = `${i + 1}. ${this.scrambleText(title, step)}`;
    }, 1000); // ← ВАЖНО: 1 раз в секунду

    this.intervals.set(i, interval);
  }

  play(i, el) {
    if (i > this.player.currentIndex) return;

    this.player.currentIndex = i;
    this.player.loadTrack(i);
    this.player.play();

    this.storage.saveIndex(i);
    this.storage.saveCompleted(i);

    const interval = this.intervals.get(i);
    if (interval) clearInterval(interval);

    el.innerHTML = `${i + 1}. ${this.tracks[i].title}`;
    el.classList.add("revealed");
  }
}
