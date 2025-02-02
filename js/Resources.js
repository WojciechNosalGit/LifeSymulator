class Resources {
  constructor(waterLevel, foodLevel) {
    this.waterLevel = waterLevel;
    this.foodLevel = foodLevel;
    this.changeLevelParameter = 2;

    this.reduceResources();
  }

  reduceResources(waterFactor = 1, foodFaktor = 1) {
    this.waterLevel -= this.changeLevelParameter * waterFactor;
    this.foodLevel -= this.changeLevelParameter * foodFaktor;
  }

  getResources() {
    return [this.waterLevel, this.foodLevel];
  }
}
