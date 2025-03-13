class Wallet {
  constructor(value = 0) {
    this.accountElement = document.querySelector(".account span");
    this.account = value;

    this.sound = new Sound();
  }

  formatValueWithSpaces(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  getAccountValue() {
    return this.account > 0
      ? `${this.formatValueWithSpaces(this.account)} PLN`
      : `Brak środków`;
  }

  checkIfEnoughMoney(money) {
    if (this.account < money) {
      this.sound.play(this.sound.alert);
      alert(
        "Możesz wydać tylko to co masz! Spróbuj wybrać coś innego, albo zarób trochę pieniędzy!"
      );
      return false;
    }
    return true;
  }

  addMoneyToAccount(money) {
    this.sound.play(this.sound.addMoney);

    this.account += money;

    this.render();
  }

  substractMoneyFromAccont(money) {
    this.sound.play(this.sound.spendMoney);

    this.account -= money;

    this.render();
  }

  render() {
    this.accountElement.textContent = this.getAccountValue();
  }
}
