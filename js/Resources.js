class Resources {
  constructor(waterlevel, foodLevel, waterRequirement, foodRequirement) {
    this.waterRequirement = waterRequirement * 1000;
    this.foodRequirement = foodRequirement;

    this.waterLevel = waterlevel;
    this.foodLevel = foodLevel;

    this.watherParameter = 0.3;
    this.foodParameter = 0.1;

    this.reduceResources();
  }

  reduceResources() {
    this.waterLevel -= (this.waterRequirement / 1000) * this.watherParameter;
    this.foodLevel -= (this.foodRequirement / 1000) * this.foodParameter;
  }

  increaseWaterLevel(water) {
    console.log("zwiększam poziom wody");
  }

  getResources() {
    return [this.waterLevel, this.foodLevel];
  }
}
