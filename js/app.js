class IoApp {
  async init() {

    const res = await fetch("./data/tracks.json");
    const tracks = await res.json();

    this.storage = new IoStorage();
    this.player = new IoPlayer();
    this.world = new IoWorld(this.player, this.storage);

    this.world.init(tracks);
    this.player.load(tracks);

    this.bindEntry();

  }

  bindEntry() {
    const entry = document.getElementById("entry");
    const app = document.getElementById("app");

    window.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        entry.classList.add("hidden");
        app.classList.remove("hidden");
      }
    });
  }
}

window.addEventListener("DOMContentLoaded", () => {
  new IoApp().init();
});
