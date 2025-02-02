class Grocery {
  constructor(name, calories, cost, waterContent = 0) {
    this.name = name;
    this.calories = calories;
    this.cost = cost;
    this.waterContent = waterContent;
  }

  getInfo() {
    return `${this.name} - ${this.calories} kcal, ${this.cost} zł, ${this.waterContent} ml wody`;
  }
}
