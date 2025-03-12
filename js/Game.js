class Game {
  constructor() {
    this.selectJobButton = document.getElementById("pick-job");
    this.quitJobButton = document.getElementById("quit-job");
    this.closeProfessionListButton = document.querySelector(
      ".close-profession-list_button"
    );
    this.showShopButton = document.getElementById("buy-grocery");
    this.showVehiclesButton = document.getElementById("buy-vehicle");

    this.accountElement = document.querySelector(".account span");
    this.charakterNameElement = document.querySelector(".character-info h1");

    this.currentSalaryElement = document.querySelector(".current-salary");

    this.salary = new Salary();
    this.profession = new Profession();
    this.wallet = new Wallet(20000);
    this.grocery = new Grocery();
    this.vehicle = new Vehicle();
    this.equipment = new Equipment();
    this.resources = new Resources();
    this.sound = new Sound();

    this.currentJob = null;
    this.currentVehicle = null;
    this.currentSalary = 0;
    this.jobTime = 1000 * 60 * 10; //milisec*sec*min

    this.jobTimerIndex = null;
    this.progressBarIndex = null;

    this.isAtWork = false;

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

    this.showVehiclesButton.addEventListener("click", () => {
      this.vehicle.showVehiclesWindow();
    });

    document.addEventListener("click", (event) => {
      if (event.target.classList.contains("job-popup_select")) {
        this.currentJob = this.profession.getSelectedJob();
        this.startJob(this.currentJob);
      }
    });

    this.quitJobButton.addEventListener("click", () => {
      clearInterval(this.jobTimerIndex);
      this.stopProgress();
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

    // shop - vehicle
    document.addEventListener("click", (event) => {
      if (event.target.classList.contains("vehicle-popup_select")) {
        this.currentVehicle = this.vehicle.getSelectedVehicle();
        this.buyVehicle(this.currentVehicle);
      }
    });

    document.addEventListener("click", (event) => {
      const vehicle = event.target.closest(".vehicle-item_active");
      if (vehicle) {
        const index = vehicle.dataset.index;
        const clickedVehicle = this.equipment.vehicles[index];
        this.vehicle.showBigPictureVehicle(clickedVehicle, true, index);
      }
    });

    //sell vehicle
    document.addEventListener("click", (event) => {
      if (event.target.classList.contains("vehicle-popup_sell")) {
        const index = event.target.dataset.index;
        this.sellVehicle(index);
      }
    });
  }

  startJob(job) {
    this.isAtWork = true;

    clearInterval(this.resourcesIntervalIndex);
    this.updateResources(job.water * 1000, job.food);

    this.profession.closeBigPictureJob();
    this.profession.closeJobsWindow();

    this.salary.setJob(job);
    this.currentSalary = this.salary.getSalary();

    this.charakterNameElement.textContent = `Pracujesz jako ${this.currentJob.name}`;
    this.jobButtonsHandler();

    this.startProgress(this.jobTime);

    this.jobTimerIndex = setTimeout(() => {
      this.stopJob();
    }, this.jobTime);
  }

  stopJob() {
    this.isAtWork = false;
    this.wallet.addMoneyToAccount(this.currentSalary);

    this.stopProgress();

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

  startProgress(workTime) {
    let progressBar = document.getElementById("progressBar");

    let width = 0;
    let step = (100 / workTime) * 1000;

    function update() {
      if (width < 100) {
        width += step;
        progressBar.style.width = width + "%";
      }
    }
    this.progressBarIndex = setInterval(update, 1000);
  }

  stopProgress() {
    let progressBar = document.getElementById("progressBar");
    clearInterval(this.progressBarIndex);
    progressBar.style.width = "0%";
  }

  updateResources(waterConsumption, foodConsumption) {
    this.resources.updateConsumptionRate(waterConsumption, foodConsumption);
    this.resourcesIntervalIndex = setInterval(() => {
      this.resources.reduceResources();
    }, this.reduceResourcesTime);
  }

  // //grocery
  buyGroceryFromShop(item) {
    this.sound.play(this.sound.click);

    if (this.wallet.checkIfEnoughMoney(item.cost)) {
      this.wallet.substractMoneyFromAccont(item.cost);
      this.equipment.addItem(item);
    }
  }

  useGroceryItem(index) {
    this.sound.play(this.sound.click);
    const item = this.equipment.getItem(index);

    this.equipment.useItem(index);
    this.resources.eat(item.fuel, item.type);
  }

  //vehicle
  buyVehicle(vehicle) {
    this.sound.play(this.sound.click);
    if (this.wallet.checkIfEnoughMoney(vehicle.price)) {
      this.wallet.substractMoneyFromAccont(vehicle.price);
      this.equipment.addItem(vehicle, "vehicle");
      this.vehicle.closeVehiclesWindow();
      this.vehicle.closeBigPictureVehicle();
    }
  }

  sellVehicle(index) {
    this.sound.play(this.sound.click);
    const vehicle = this.equipment.vehicles[index];
    this.wallet.addMoneyToAccount(vehicle.price * 0.7);
    this.equipment.sellVehicle(index);
    this.vehicle.closeBigPictureVehicle();
  }

  render() {
    this.isAtWork = false;
    this.jobButtonsHandler();

    this.equipment.renderEquipment();
    this.wallet.render();

    clearInterval(this.resourcesIntervalIndex);
    this.updateResources();

    this.currentSalaryElement.textContent = !this.isAtWork
      ? `Nic nie zarabiasz`
      : this.currentSalary;
    this.charakterNameElement.textContent = `Weź się do roboty!`;
  }
}
