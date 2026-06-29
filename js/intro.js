class IoIntro {
  constructor() {
    this.entry = document.getElementById("entry");
    this.app = document.getElementById("app");

    this.audio = new Audio("./wind-lokrain.mp3");
    this.audio.loop = true;
    this.audio.volume = 0.35;

    this.started = false;

    this.start = this.start.bind(this);
  }

  init() {
    // САМЫЙ СТАБИЛЬНЫЙ ТРИГГЕР (mobile + desktop)
    document.addEventListener("pointerdown", this.start, { once: true });
    document.addEventListener("keydown", this.start, { once: true });
  }

  async start() {
    if (this.started) return;
    this.started = true;

    try {
      await this.audio.play();
    } catch (e) {
      console.log("Audio blocked:", e);
    }

    this.entry.style.opacity = "0";

    setTimeout(() => {
      this.entry.style.display = "none";
      this.app.classList.remove("hidden");
    }, 900);
  }
}
