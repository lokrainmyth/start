class IoWorld {
  constructor(player, storage) {
    this.player = player;
    this.storage = storage;

    this.playlist = document.getElementById("playlist");
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

      el.innerHTML = `•••`;

      el.onclick = () => this.click(i, el);

      this.playlist.appendChild(el);
    });
  }

  click(i, el) {
    if (i > this.player.currentIndex) return;

    this.player.currentIndex = i;
    this.player.loadTrack(i);
    this.player.play();

    el.classList.add("revealed");
    el.innerHTML = `${i + 1}. ${this.tracks[i].title}`;

    this.storage.saveIndex(i);
    this.storage.saveCompleted(i);
  }
}
