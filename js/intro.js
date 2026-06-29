class IoIntro {
  constructor() {
    this.entry = document.getElementById("entry");
    this.app = document.getElementById("app");

    this.audio = new Audio("./wind-lokrain.mp3");
    this.audio.loop = true;
    this.audio.volume = 0.35;

    this.started = false;
  }

  init() {
    const start = () => this.start();

    window.addEventListener("keydown", start);
    window.addEventListener("click", start);
    window.addEventListener("touchstart", start);
  }

  async start() {
    if (this.started) return;
    this.started = true;

    // проверка DOM (чтобы ты сразу видел проблему, если она есть)
    if (!this.entry || !this.app) {
      console.log("ENTRY or APP missing in HTML");
      return;
    }

    try {
      await this.audio.play();
    } catch (e) {
      console.log("Audio blocked (gesture required)");
    }

    this.entry.style.transition = "opacity 1s ease";
    this.entry.style.opacity = "0";

    setTimeout(() => {
      this.entry.style.display = "none";
      this.app.classList.remove("hidden");
    }, 1000);
  }
}
