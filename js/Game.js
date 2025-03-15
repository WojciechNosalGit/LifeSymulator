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
    this.wallet = new Wallet(200);
    this.grocery = new Grocery();
    this.vehicle = new Vehicle();
    this.equipment = new Equipment();
    this.resources = new Resources(95);
    this.sound = new Sound();
    this.localStorageManager = new LocalStorageManager();

    this.currentVehicle = null;
    this.currentSalary = 0;

    this.currentJob = null;
    this.jobTime = 1000 * 10 * 1; //milisec*sec*min
    this.jobProgress = 0;

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
      this.quitJobHendler();
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

    //click sound for buttons
    document.addEventListener("click", (event) => {
      if (event.target.classList.contains("close-x")) {
        this.sound.play(this.sound.click);
      }
    });

    document.addEventListener("click", (event) => {
      if (event.target.classList.contains("button")) {
        this.sound.play(this.sound.click);
      }
    });

    //localStorage
    document
      .getElementById("save-game-button")
      .addEventListener("click", () => {
        this.saveGame();
      });

    document
      .getElementById("load-game-button")
      .addEventListener("click", () => {
        this.loadGame();
      });

    // document
    //   .getElementById("clear-save-button")
    //   .addEventListener("click", () => {
    //     this.clearSavedGame();
    //   });
  }
  // LocalStorageManager
  saveGame() {
    const gameState = {
      wallet: this.wallet.account,
      equipment: this.equipment.toJSON(),
      resources: this.resources.toJSON(),
      salary: this.salary.toJSON(),

      currentJob: this.currentJob,
      currentVehicle: this.currentVehicle,
      isAtWork: this.isAtWork,
      jobProgress: this.jobProgress,
      jobTime: this.jobTime,
    };

    this.localStorageManager.saveGameState(gameState);

    console.log(gameState);
  }

  loadGame() {
    const gameState = this.localStorageManager.loadGameState();
    if (!gameState) return;

    this.wallet.account = gameState.wallet;
    this.equipment = Equipment.fromJSON(gameState.equipment);
    this.resources = Resources.fromJSON(gameState.resources);
    this.salary = Salary.fromJSON(gameState.salary);

    this.currentJob = gameState.currentJob;
    this.currentVehicle = gameState.currentVehicle;
    this.isAtWork = gameState.isAtWork;
    this.jobProgress = gameState.jobProgress;
    this.jobTime = gameState.jobTime;

    console.log("Gra wczytana!", gameState);

    this.render();
  }

  //App
  startJob(job) {
    console.log(job);
    this.sound.play(this.sound.startWork);

    this.isAtWork = true;

    clearInterval(this.resourcesIntervalIndex);
    this.updateResources(job.water * 1000, job.food);

    this.profession.closeBigPictureJob();
    this.profession.closeJobsWindow();

    this.salary.setJob(job);
    this.currentSalary = this.salary.getSalary();

    this.charakterNameElement.textContent = `Pracujesz jako ${this.currentJob.name}`;
    this.jobButtonsHandler();

    this.startProgress(this.jobTime, this.jobProgress);

    this.jobTimerIndex = setTimeout(() => {
      this.doneJob();
    }, this.jobTime);
  }

  quitJobHendler() {
    this.sound.play(this.sound.stopWork);

    this.isAtWork = false;

    clearInterval(this.jobTimerIndex);
    this.stopProgress();
    this.render();
  }

  doneJob() {
    this.sound.play(this.sound.doneWork);

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

  startProgress(workTime, jobProgress) {
    clearInterval(this.progressBarIndex);

    let progressBar = document.getElementById("progressBar");

    let width = jobProgress;
    let step = (100 / workTime) * 1000;

    const update = () => {
      if (width < 100) {
        width += step;
        progressBar.style.width = width + "%";

        this.jobProgress = width;
        this.jobTime -= 1000;

        console.log(step, this.jobTime);
      }
    };
    this.progressBarIndex = setInterval(update, 1000);
  }

  stopProgress() {
    let progressBar = document.getElementById("progressBar");
    clearInterval(this.progressBarIndex);
    progressBar.style.width = "0%";

    // this.salary.displaySalary();
  }

  updateResources(waterConsumption, foodConsumption) {
    this.resources.updateConsumptionRate(waterConsumption, foodConsumption);

    this.resources.reduceResources();

    this.resourcesIntervalIndex = setInterval(() => {
      this.resources.reduceResources();
    }, this.reduceResourcesTime);
  }

  // //grocery
  buyGroceryFromShop(item) {
    if (this.wallet.checkIfEnoughMoney(item.cost)) {
      this.wallet.substractMoneyFromAccont(item.cost);
      this.equipment.addItem(item);
    }
  }

  useGroceryItem(index) {
    const item = this.equipment.getItem(index);

    if (this.resources.isFull(item.toDrink)) {
      return alert("już dość");
    } else {
      this.equipment.useItem(index);
      this.resources.eat(item.fuel, item.toDrink);
    }
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
    this.jobButtonsHandler();

    this.isAtWork
      ? this.startJob(this.currentJob)
      : (this.charakterNameElement.textContent = "Weź się do roboty");

    this.equipment.renderEquipment();
    this.wallet.render();

    clearInterval(this.resourcesIntervalIndex);
    this.updateResources();
  }
}
