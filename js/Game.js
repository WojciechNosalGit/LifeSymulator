class Game {
  constructor() {
    this.selectJobButton = document.getElementById("pick-job");
    this.quitJobButton = document.getElementById("quit-job");
    this.closeProfessionListButton = document.querySelector(
      ".close-profession-list_button"
    );
    this.accountElement = document.querySelector(".account span");
    this.charakterNameElement = document.querySelector(".character-info h1");
    this.waterLevelElement = document.querySelector(".water-level span");
    this.foodLevelElement = document.querySelector(".food-level span");

    this.currentSalaryElement = document.querySelector(".current-salary");

    this.groceryItems = [
      new Grocery("Woda", 0, 5, 1000), // Woda: 0 kcal, 5 zł, 1000 ml
      new Grocery("Mięso", 500, 20), // Mięso: 500 kcal, 20 zł
      new Grocery("Bułki", 200, 3), // Bułki: 200 kcal, 3 zł
    ];

    this.salary = new Salary();
    this.profession = new Profession();
    this.wallet = new Wallet();
    this.gracery = new Grocery();
    this.equipment = new Equipment();

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

    this.renderGrocery();
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

    document.addEventListener("click", (event) => {
      if (event.target.classList.contains("job-popup_select")) {
        this.currentJob = this.profession.getSelectedJob();
        this.startJob(this.currentJob);
      }
    });

    this.quitJobButton.addEventListener("click", () => {
      console.log("działa");
      clearInterval(this.jobTimerIndex);
      this.render();
    });
    //grocery
    document.addEventListener("click", (event) => {
      if (event.target.classList.contains("grocery-item")) {
        const itemIndex = event.target.dataset.index;
        this.buyItem(itemIndex);
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

  //grocery
  renderGrocery() {
    const groceryElement = document.getElementById("grocery-list");
    if (groceryElement) {
      groceryElement.innerHTML = this.groceryItems
        .map(
          (item, index) =>
            `<li class="grocery-item" data-index="${index}">${item.getInfo()}</li>`
        )
        .join("");
    }
  }

  // Kup przedmiot i dodaj go do ekwipunku
  buyItem(index) {
    const item = this.groceryItems[index];
    if (item) {
      this.equipment.addItem(item);
      this.equipment.displayEquipment();
    }
  }

  render() {
    this.isAtWork = false;
    this.jobButtonsHandler();

    clearInterval(this.resourcesIntervalIndex);
    this.updateResurces(
      this.waterLevel,
      this.foodLevel,
      this.basicWaterRequirement,
      this.basicFoodRequirement
    );

    this.accountElement.textContent = this.wallet.getAccountValue();
    this.currentSalaryElement.textContent = !this.isAtWork
      ? `Nic nie zarabiasz`
      : this.currentSalary;
    this.charakterNameElement.textContent = `Weź się do roboty!`;
  }
}
