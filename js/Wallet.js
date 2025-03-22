class Wallet {
  constructor(value = 0) {
    this.accountElement = document.querySelector(".account span");
    this.account = value;
    this.sound = new Sound();

    // tax thresholds
    this.taxThresholds = [
      { threshold: 30000, tax: 5000 },
      { threshold: 60000, tax: 10000 },
      { threshold: 100000, tax: 15000 },
      { threshold: 150000, tax: 20000 },
    ];

    // save paid taxes
    this.paidTaxes = new Set();
  }

  formatValueWithSpaces(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  getAccountValue() {
    return this.account > 0
      ? `${this.formatValueWithSpaces(this.account)} PLN`
      : `Brak środków`;
  }

  checkIfEnoughMoney(money, penalty) {
    if (this.account < money) {
      if (penalty) return false;

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
    this.applyTaxes(); // check if taxes should be applied
    this.render();
  }

  substractMoneyFromAccont(money) {
    this.sound.play(this.sound.spendMoney);
    this.account -= money;
    this.render();
  }

  applyTaxes() {
    for (const { threshold, tax } of this.taxThresholds) {
      if (this.account >= threshold && !this.paidTaxes.has(threshold)) {
        alert(
          `Przekroczyłeś próg ${this.formatValueWithSpaces(
            threshold
          )} PLN! Pobieram podatek ${this.formatValueWithSpaces(tax)} PLN.`
        );
        this.account -= tax;
        this.paidTaxes.add(threshold); // mark threshold as paid
      }
    }
  }

  render() {
    this.accountElement.textContent = this.getAccountValue();
  }
}
