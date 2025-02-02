class Wallet {
  constructor(value = 0) {
    this.account = value;
  }

  getAccountValue() {
    return this.account > 0 ? `${this.account} zł` : `Brak środków`;
  }

  addMoneyToAccount(money) {
    this.account += money;
  }

  substractMoneyFromAccont(money) {
    //chech if can substract
    this.account -= money;
  }
}
