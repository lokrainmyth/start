class IoApp {
  async init() {
    const res = await fetch("./data/tracks.json");
    const tracks = await res.json();

    this.player = new IoPlayer();
    this.world = new IoWorld(this.player);

    this.player.load(tracks);
    this.world.init(tracks);
  }
}

window.onload = () => {
  new IoApp().init();
};
