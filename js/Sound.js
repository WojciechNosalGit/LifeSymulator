class Sound {
  constructor() {
    this.click = document.getElementById("click");
    this.eat = document.getElementById("eat");
    this.drink = document.getElementById("drink");
    this.spendMoney = document.getElementById("spend-money");
    this.addMoney = document.getElementById("add-money");
    this.alert = document.getElementById("alert");
  }
  play(sound) {
    sound.currentTime = 0;
    sound.play();
  }
}
