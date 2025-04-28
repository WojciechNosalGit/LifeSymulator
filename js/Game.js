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
    this.wallet = new Wallet(20);
    this.grocery = new Grocery();
    this.vehicle = new Vehicle();
    this.equipment = new Equipment();
    this.resources = new Resources(50);
    this.sound = new Sound();
    this.localStorageManager = new LocalStorageManager();

    this.currentVehicle = null;
    this.currentSalary = 0;

    this.currentJob = null;
    this.jobTime = 1000 * 60 * 10; //milisec*sec*min
    this.jobProgress = 0;

    this.jobTimerIndex = null;
    this.progressBarIndex = null;

    this.isAtWork = false;

    this.resourcesIntervalIndex = null;
    this.reduceResourcesTime = 3000;

    this.initEvents();

    this.render();
  }

  formatValueWithSpaces(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
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
      this.quitJob();
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

    //drive vehicle
    document.addEventListener("click", (event) => {
      if (event.target.classList.contains("vehicle-drive")) {
        const index = event.target.dataset.index;
        this.driveCar(index);
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
        this.showLoadGameModal();
      });
  }
  // LocalStorageManager
  saveGame() {
    const saveName = prompt("Podaj nazwę zapisu gry:");
    if (!saveName) return alert("Zapis gry anulowany.");

    const gameState = {
      wallet: this.wallet.account,
      equipment: this.equipment.toJSON(),
      resources: this.resources.toJSON(),

      salary: this.currentSalary,
      currentJob: this.currentJob,
      currentVehicle: this.currentVehicle,
      isAtWork: this.isAtWork,
      jobProgress: this.jobProgress,
      jobTime: this.jobTime,
    };

    let saves = JSON.parse(localStorage.getItem("gameSaves")) || {};
    saves[saveName] = gameState;
    localStorage.setItem("gameSaves", JSON.stringify(saves));

    alert(`Gra zapisana jako "${saveName}"`);
  }

  loadGame(saveName) {
    let saves = JSON.parse(localStorage.getItem("gameSaves")) || {};
    let gameState = saves[saveName];

    if (!gameState) return alert("Nie znaleziono zapisu.");

    this.wallet.account = gameState.wallet ?? 200;
    this.equipment = Equipment.fromJSON(gameState.equipment ?? {});
    this.resources = Resources.fromJSON(gameState.resources ?? {});

    this.currentSalary = gameState.salary ?? 0;
    this.currentJob = gameState.currentJob ?? null;
    this.currentVehicle = gameState.currentVehicle ?? null;
    this.isAtWork = gameState.isAtWork ?? false;
    this.jobProgress = gameState.jobProgress ?? 0;
    this.jobTime = gameState.jobTime ?? 1000 * 10 * 1;

    alert(`Gra "${saveName}" wczytana!`);

    document.getElementById("loadGameModal").style.display = "none";
    this.render();
  }

  showLoadGameModal() {
    let saves = JSON.parse(localStorage.getItem("gameSaves")) || {};
    let saveNames = Object.keys(saves);

    if (saveNames.length === 0) {
      return alert("Brak zapisanych gier.");
    }

    let saveList = document.getElementById("saveList");
    saveList.innerHTML = "";

    saveNames.forEach((saveName) => {
      let listItem = document.createElement("li");
      listItem.addEventListener("click", () => this.loadGame(saveName));

      const p = document.createElement("span");
      p.textContent = saveName;

      const bin = document.createElement("span");
      bin.textContent = "🗑️";
      bin.classList.add("bin");
      bin.addEventListener("click", (event) => {
        event.stopPropagation();
        delete saves[saveName];
        localStorage.setItem("gameSaves", JSON.stringify(saves));
        this.showLoadGameModal();
      });

      listItem.appendChild(p);
      listItem.appendChild(bin);

      saveList.appendChild(listItem);
    });

    document.getElementById("loadGameModal").style.display = "block";

    document.querySelector(".close").addEventListener("click", () => {
      document.getElementById("loadGameModal").style.display = "none";
    });
  }

  //App
  startJob(job) {
    if (!job) return;
    this.sound.play(this.sound.startWork);

    this.isAtWork = true;

    clearInterval(this.jobTimerIndex);
    clearInterval(this.resourcesIntervalIndex);
    this.updateResources(job.water * 1000, job.food);

    this.profession.closeBigPictureJob();
    this.profession.closeJobsWindow();

    if (this.currentSalary === 0) {
      this.salary.calcSalary(job);
      this.currentSalary = this.salary.getSalary();
    }

    this.jobButtonsHandler();

    this.startProgress(this.jobTime, this.jobProgress);

    this.charakterState();
  }

  quitJob() {
    this.sound.play(this.sound.stopWork);

    //pay for break job
    let penalty = this.currentSalary * 0.2;

    if (!this.wallet.checkIfEnoughMoney(penalty, true))
      penalty = this.wallet.account;

    this.wallet.substractMoneyFromAccont(penalty);

    alert(
      "Przerwa w pracy, zapłacono 20% pensji lub wartość konta jeśli nie było środków. Kara: " +
        penalty +
        " PLN"
    );

    clearInterval(this.jobTimerIndex);
    this.stopProgress();

    this.render();
  }

  doneJob() {
    this.sound.play(this.sound.doneWork);

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

  //Progress bar

  startProgress(totalTime = this.jobTime, fromProgress = this.jobProgress) {
    this.jobProgress = fromProgress;
    this.startTime = Date.now();

    clearInterval(this.progressBarIndex);

    this.progressBarIndex = setInterval(() => {
      const elapsedTime = Date.now() - this.startTime;
      this.jobProgress = fromProgress + (elapsedTime / totalTime) * 100;

      if (this.jobProgress >= 100) {
        this.jobProgress = 100;
        clearInterval(this.progressBarIndex);
        this.doneJob();
      }

      this.updateProgressBar();
    }, 1000);
  }

  updateProgressBar() {
    let progressBar = document.getElementById("progressBar");
    if (progressBar) {
      progressBar.style.width = `${this.jobProgress}%`;
    }
  }

  stopProgress() {
    this.jobProgress = 0;
    this.isAtWork = false;
    this.currentSalary = 0;
    this.currentJob = null;

    clearInterval(this.progressBarIndex);
    let progressBar = document.getElementById("progressBar");
    progressBar.style.width = `${this.jobProgress}%`;
  }

  //Resources

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
      const added = this.equipment.addItem(item);
      if (added) {
        this.wallet.substractMoneyFromAccont(item.cost);
      }
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
      const added = this.equipment.addItem(vehicle, "vehicle");
      if (added) {
        this.wallet.substractMoneyFromAccont(vehicle.price);
        this.vehicle.closeVehiclesWindow();
        this.vehicle.closeBigPictureVehicle();
      }
    }
  }

  sellVehicle(index) {
    this.sound.play(this.sound.click);
    const vehicle = this.equipment.vehicles[index];

    alert(`Sprzedano ${vehicle.name} za ${vehicle.price * 0.7} PLN`);

    this.wallet.addMoneyToAccount(vehicle.price * 0.7);
    this.equipment.sellVehicle(index);
    this.vehicle.closeBigPictureVehicle();
  }

  driveCar(index) {
    //sound
    const vehicle = this.equipment.vehicles[index];
    console.log(`jedziesz ${vehicle.name}`);
  }

  //charakter state
  charakterState() {
    if (this.isAtWork) {
      this.charakterNameElement.textContent = `Pracujesz jako ${this.currentJob.name}`;
      this.currentSalaryElement.textContent = `Zarobisz ${this.formatValueWithSpaces(
        this.currentSalary
      )} zł`;
    } else {
      this.charakterNameElement.textContent = "Weź się do roboty";
      this.currentSalaryElement.textContent = `Nic nie zarabiasz`;

      this.stopProgress();
    }
  }

  render() {
    this.jobButtonsHandler();

    this.startJob(this.currentJob);
    this.charakterState();

    this.equipment.renderEquipment();
    this.wallet.render();

    clearInterval(this.resourcesIntervalIndex);
    this.updateResources();
  }
}
