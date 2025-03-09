class Sound {
  constructor() {
    this.click = document.getElementById("click");
  }
  play(sound) {
    sound.currentTime = 0;
    sound.play();
  }
}
