class IoWorld {
  constructor(player, storage) {
    this.player = player;
    this.storage = storage;

    this.tracks = [];
    this.state = "night";

    this.cover = document.getElementById("albumCover");
    this.playlist = document.getElementById("playlist");

    this.communication = document.getElementById("communication");

    this.mythUnlocked = false;
  }

  init(tracks) {
    this.tracks = tracks;
    this.renderPlaylist();
    this.bindGlobal();
  }

  renderPlaylist() {
    this.playlist.innerHTML = "";

    this.tracks.forEach((t, i) => {
      const el = document.createElement("div");
      el.className = "track locked";
      el.dataset.index = i;

      el.innerHTML = `
        <div>${String(i + 1).padStart(2, "0")} — ${this.getMaskedTitle(i)}</div>
      `;

      el.addEventListener("click", () => this.onTrackClick(i));
      this.playlist.appendChild(el);
    });
  }

  getMaskedTitle(i) {
    const revealed = this.storage.getCompleted();
    if (revealed.includes(i)) return this.tracks[i].title;

    return "•••";
  }

  onTrackClick(i) {
    if (i > this.player.currentIndex) {
      alert("Путь не завершён");
      return;
    }

    if (i < this.player.currentIndex) return;

    this.revealTrack(i);
  }

  revealTrack(i) {
    const el = this.playlist.querySelector(`[data-index="${i}"]`);
    el.classList.remove("locked");
    el.classList.add("revealed");

    el.innerText = `${String(i + 1).padStart(2, "0")} — ${this.tracks[i].title}`;
  }

  bindGlobal() {
    this.player.onTrackChange = (i) => {
      this.revealTrack(i);
      this.storage.saveIndex(i);
    };

    this.player.onFinish = () => {
      this.unlockMyth();
    };
  }

  unlockMyth() {
    this.mythUnlocked = true;

    const myth = document.getElementById("mythLayer");
    myth.classList.remove("hidden");
  }
}
