class Resources {
  constructor(waterlevel, foodLevel, waterRequirement, foodRequirement) {
    this.waterRequirement = waterRequirement * 1000;
    this.foodRequirement = foodRequirement;

    this.waterLevel = waterlevel; // % of water
    this.foodLevel = foodLevel; // % of food

    this.watherParameter = 0.3;
    this.foodParameter = 0.1;

    this.reduceResources();
  }

  getResources() {
    return [this.waterLevel, this.foodLevel];
  }

  reduceResources() {
    this.waterLevel -= (this.waterRequirement / 1000) * this.watherParameter;
    this.foodLevel -= (this.foodRequirement / 1000) * this.foodParameter;

    console.log(this.waterRequirement, this.foodRequirement);
  }

  increaseResources(water, food) {}
}
