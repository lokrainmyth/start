class IoApp {
  async init() {
    const res = await fetch("./data/tracks.json");
    const tracks = await res.json();

    this.storage = new IoStorage();
    this.player = new IoPlayer();
    this.world = new IoWorld(this.player, this.storage);

    this.player.load(tracks);
    this.world.init(tracks);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  new IoApp().init();
});
