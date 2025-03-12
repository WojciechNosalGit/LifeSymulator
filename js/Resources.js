class Resources {
  constructor() {
    this.waterLevelElement = document.querySelector(".water-level span");
    this.foodLevelElement = document.querySelector(".food-level span");

    this.waterContainer = 6000;
    this.foodContainer = 5000;

    this.waterRequirement = 2000; // demand for water
    this.foodRequirement = 2000; // demand for food

    this.startLevel = 50;
    this.startWater = this.waterContainer * (this.startLevel / 100);
    this.startFood = this.foodContainer * (this.startLevel / 100);

    this.updateConsumptionRate();
  }

  updateConsumptionRate(
    waterRequirement = this.waterRequirement,
    foodRequirement = this.foodRequirement
  ) {
    this.waterRequirement = waterRequirement;
    this.foodRequirement = foodRequirement;

    this.consumptionRate = {
      water: (this.waterRequirement / 2000) * 20,
      food: (this.foodRequirement / 2000) * 8,
    };
  }

  reduceResources() {
    this.startWater = Math.max(0, this.startWater - this.consumptionRate.water);
    this.startFood = Math.max(0, this.startFood - this.consumptionRate.food);

    if (this.startWater === 0 || this.startFood === 0) {
      return alert("Jesteś wyczerpany! KONIEC GRY!");
    }

    this.render();
  }

  eat(amount, type) {
    if (type === "Drink") {
      if (this.startWater === this.waterContainer) {
        return alert("Więcej nie wypijesz! Będziesz sikał co chwilę!");
      }
      this.startWater = Math.min(this.waterContainer, this.startWater + amount);
    } else {
      if (this.startFood === this.foodContainer) {
        return alert("Jesteś już zapchany! Nie bądź grubą świnia!");
      }
      this.startFood = Math.min(this.foodContainer, this.startFood + amount);
    }

    console.log(this.startWater, this.startFood);

    this.render();
  }

  render() {
    const waterPercentage = (this.startWater / this.waterContainer) * 100;
    const foodPercentage = (this.startFood / this.foodContainer) * 100;

    this.waterLevelElement.textContent = `${waterPercentage.toFixed()}%`;
    this.foodLevelElement.textContent = `${foodPercentage.toFixed()}%`;
  }
}
