class Wallet {
  constructor(value = 0) {
    this.accountElement = document.querySelector(".account span");
    this.account = value;
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
      alert(
        "Możesz wydać tylko to co masz! Spróbuj wybrać coś innego, albo zarób trochę pieniędzy!"
      );
      return false;
    }
    return true;
  }

  addMoneyToAccount(money) {
    this.account += money;

    this.render();
  }

  substractMoneyFromAccont(money) {
    this.account -= money;

    this.render();
  }

  render() {
    this.accountElement.textContent = this.getAccountValue();
  }
}
