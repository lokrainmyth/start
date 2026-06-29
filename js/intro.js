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
    // тап + клик + enter = одно поведение
    window.addEventListener("keydown", (e) => {
      if (e.key === "Enter") this.start();
    });

    window.addEventListener("click", () => this.start());
    window.addEventListener("touchstart", () => this.start());
  }

  async start() {
    if (this.started) return;
    this.started = true;

    try {
      await this.audio.play();
    } catch (e) {
      console.log("Audio blocked until gesture");
    }

    this.entry.classList.add("fade-out");

    setTimeout(() => {
      this.entry.classList.add("hidden");
      this.app.classList.remove("hidden");
    }, 1000);
  }
}
