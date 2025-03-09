class Game {
  constructor() {
    this.selectJobButton = document.getElementById("pick-job");
    this.quitJobButton = document.getElementById("quit-job");
    this.closeProfessionListButton = document.querySelector(
      ".close-profession-list_button"
    );
    this.showShopButton = document.getElementById("buy-grocery");

    this.accountElement = document.querySelector(".account span");
    this.charakterNameElement = document.querySelector(".character-info h1");
    this.waterLevelElement = document.querySelector(".water-level span");
    this.foodLevelElement = document.querySelector(".food-level span");

    this.currentSalaryElement = document.querySelector(".current-salary");

    this.groceryContainer = document.getElementById("grocery");
    this.equipmentContainer = document.getElementById("equipment");

    this.salary = new Salary();
    this.profession = new Profession();
    this.wallet = new Wallet(200);
    this.grocery = new Grocery();
    this.equipment = new Equipment();
    this.sound = new Sound();

    this.currentJob = null;
    this.currentSalary = 0;
    this.jobTime = 1000 * 5; //milisec*sec*min
    this.jobTimerIndex = null;
    this.isAtWork = false;

    this.waterLevel = 80;
    this.foodLevel = 80;
    this.basicWaterRequirement = 2; //l
    this.basicFoodRequirement = 2000; //kcal
    this.resourcesIntervalIndex = null;
    this.reduceResourcesTime = 3000;

    this.initEvents();

    this.render();
  }

  initEvents() {
    this.selectJobButton.addEventListener("click", () =>
      this.profession.showJobsWindow()
    );

    this.closeProfessionListButton.addEventListener("click", () =>
      this.profession.closeJobsWindow()
    );

    this.showShopButton.addEventListener("click", () => {
      this.grocery.addItemsToList();
      this.grocery.showShopWindow();
    });

    document.addEventListener("click", (event) => {
      if (event.target.classList.contains("job-popup_select")) {
        this.currentJob = this.profession.getSelectedJob();
        this.startJob(this.currentJob);
      }
    });

    this.quitJobButton.addEventListener("click", () => {
      clearInterval(this.jobTimerIndex);
      this.render();
    });

    // shop - grocery
    document.addEventListener("click", (event) => {
      const shopItem = event.target.closest(".shop-item");

      if (shopItem) {
        const itemIndex = shopItem.dataset.index;
        const item = this.grocery.items[itemIndex];
        this.buyGroceryFromShop(item);
      }
    });

    document.addEventListener("click", (event) => {
      const groceryItem = event.target.closest(".grocery-item_active");
      if (groceryItem) {
        const itemIndex = groceryItem.dataset.index;
        this.useGroceryItem(itemIndex);
      }
    });
  }

  startJob(job) {
    this.isAtWork = true;

    clearInterval(this.resourcesIntervalIndex);
    this.updateResurces(
      this.waterLevel,
      this.foodLevel,
      this.currentJob.water,
      this.currentJob.food
    );

    this.profession.closeBigPictureJob();
    this.profession.closeJobsWindow();

    this.salary.setJob(job);
    this.currentSalary = this.salary.getSalary();

    this.charakterNameElement.textContent = `Pracujesz jako ${this.currentJob.name}`;
    this.jobButtonsHandler();

    this.jobTimerIndex = setTimeout(() => {
      this.stopJob();
    }, this.jobTime);
  }

  stopJob() {
    this.isAtWork = false;
    this.wallet.addMoneyToAccount(this.currentSalary);

    this.render();
  }

  jobButtonsHandler() {
    if (this.isAtWork) {
      this.selectJobButton.classList.add("display-none");
      this.quitJobButton.classList.remove("display-none");
    } else {
      this.selectJobButton.classList.remove("display-none");
      this.quitJobButton.classList.add("display-none");
    }
  }

  updateResurces(waterLevel, foodLevel, waterRequirement, foodRequirement) {
    this.resources = new Resources(
      waterLevel,
      foodLevel,
      waterRequirement,
      foodRequirement
    );

    this.setResources();

    this.resourcesIntervalIndex = setInterval(() => {
      this.resources.reduceResources();

      [this.waterLevel, this.foodLevel] = this.resources.getResources();

      this.setResources();
    }, this.reduceResourcesTime);
  }

  setResources() {
    this.waterLevelElement.textContent = `${Math.floor(this.waterLevel)}%`;
    this.foodLevelElement.textContent = `${Math.floor(this.foodLevel)}%`;
  }

  // //grocery
  buyGroceryFromShop(item) {
    this.sound.play(this.sound.click);
    this.equipment.addItem(item);
  }

  useGroceryItem(index) {
    this.sound.play(this.sound.click);
    const item = this.equipment.getItem(index);

    if (this.wallet.checkIfEnoughMoney(item.cost)) {
      this.equipment.useItem(index);
      this.wallet.substractMoneyFromAccont(item.cost);
    }
  }

  render() {
    this.isAtWork = false;
    this.jobButtonsHandler();

    this.equipment.renderEquipment();

    clearInterval(this.resourcesIntervalIndex);
    this.updateResurces(
      this.waterLevel,
      this.foodLevel,
      this.basicWaterRequirement,
      this.basicFoodRequirement
    );

    this.wallet.render();

    this.currentSalaryElement.textContent = !this.isAtWork
      ? `Nic nie zarabiasz`
      : this.currentSalary;
    this.charakterNameElement.textContent = `Weź się do roboty!`;
  }
}
