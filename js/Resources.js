class Resources {
  constructor(startLevel) {
    this.waterLevelElement = document.querySelector(".water-level span");
    this.foodLevelElement = document.querySelector(".food-level span");

    this.sound = new Sound();

    this.waterContainer = 6000;
    this.foodContainer = 5000;

    this.waterRequirement = 2000; // demand for water
    this.foodRequirement = 2000; // demand for food

    this.startLevel = startLevel;
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
      this.sound.play(this.sound.alert);
      return alert("Jesteś wyczerpany! KONIEC GRY!");
    }

    this.render();
  }

  isFull(toDrink) {
    if (toDrink) {
      if (this.startWater === this.waterContainer) return true;
    } else {
      if (this.startFood === this.foodContainer) return true;
    }
    return false;
  }

  eat(amount, toDrink) {
    if (toDrink) {
      console.log(this.waterContainer, this.startWater);
      this.sound.play(this.sound.drink);
      this.startWater = Math.min(this.waterContainer, this.startWater + amount);
    } else {
      console.log(this.foodContainer, this.startFood);

      this.sound.play(this.sound.eat);
      this.startFood = Math.min(this.foodContainer, this.startFood + amount);
    }

    this.render();
  }

  render() {
    const waterPercentage = (this.startWater / this.waterContainer) * 100;
    const foodPercentage = (this.startFood / this.foodContainer) * 100;

    this.waterLevelElement.textContent = `${waterPercentage.toFixed()}%`;
    this.foodLevelElement.textContent = `${foodPercentage.toFixed()}%`;
  }
}
