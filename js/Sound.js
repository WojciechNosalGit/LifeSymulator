class Sound {
  constructor() {
    this.click = document.getElementById("click");
    this.eat = document.getElementById("eat");
    this.drink = document.getElementById("drink");
    this.spendMoney = document.getElementById("spend-money");
    this.addMoney = document.getElementById("add-money");
    this.alert = document.getElementById("alert");
    this.startWork = document.getElementById("start-work");
    this.stopWork = document.getElementById("stop-work");
    this.doneWork = document.getElementById("done-work");
  }
  play(sound) {
    sound.currentTime = 0;
    sound.play();
  }
}
