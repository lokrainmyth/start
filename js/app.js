class IoApp {
  async init() {

    const res = await fetch("./data/tracks.json");
    const tracks = await res.json();

    this.storage = new IoStorage();
    this.player = new IoPlayer();
    this.world = new IoWorld(this.player, this.storage);
    this.intro = new IoIntro();

    this.world.init(tracks);
    this.player.load(tracks);

    this.intro.init();
  }
}

window.addEventListener("DOMContentLoaded", () => {
  new IoApp().init();
});
