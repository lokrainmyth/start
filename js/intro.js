class IoIntro {
  constructor() {
    this.entry = document.getElementById("entry");
    this.app = document.getElementById("app");
    this.audio = new Audio("./wind-lokrain.mp3");

    this.started = false;
  }

  init() {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Enter") this.start();
    });
  }

  start() {
    if (this.started) return;
    this.started = true;

    this.audio.volume = 0.4;
    this.audio.loop = true;
    this.audio.play();

    this.entry.style.opacity = "0";

    setTimeout(() => {
      this.entry.classList.add("hidden");
      this.app.classList.remove("hidden");
    }, 1200);
  }
}

window.IoIntro = IoIntro;
