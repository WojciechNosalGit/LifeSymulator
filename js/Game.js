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
    this.jobTime = 1000 * 60 * 10; //milisec*sec*min (1000 * 60 * 10)
    this.jobProgress = 0;

    this.jobTimerIndex = null;
    this.progressBarIndex = null;

    this.isAtWork = false;

    //drive
    this.driveProgress = 0;
    this.driveProgressIndex = null;
    this.driveTime = 1000 * 60 * 5; // 5 minut (1000 * 60 * 5)

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
      this.vehicle.addVehicleElementsToList();
      this.vehicle.showVehiclesWindow();
    });

    // job
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
      grocery: this.grocery.toJSON(),
      vehicle: this.vehicle.toJSON(),

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

    this.wallet.account = gameState.wallet ?? 20;
    this.equipment = Equipment.fromJSON(gameState.equipment ?? {});
    this.resources = Resources.fromJSON(gameState.resources ?? {});
    this.grocery = Grocery.fromJSON(gameState.grocery);
    this.vehicle = Vehicle.fromJSON(gameState.vehicle);

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
  //Job
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

    // Oblicz czas pracy na podstawie pojazdu w ekwipunku
  let workTime = this.jobTime; // domyślnie 10 minut
  
  if (this.equipment.vehicles.length > 0) {
    // Znajdź najszybszy pojazd (z najmniejszym jobTime)
    const fastestVehicle = this.equipment.vehicles.reduce((fastest, vehicle) => {
      return vehicle.jobTimeInMinutes < fastest.jobTimeInMinutes ? vehicle : fastest;
    });
    
    workTime = fastestVehicle.jobTimeInMinutes * 60 * 1000; // konwertuj minuty na milisekundy
  }

  this.jobButtonsHandler();

  this.startProgress(workTime, this.jobProgress);
  console.log(workTime)

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
    this.randomChanseToIncresePrice();
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

  randomChanseToIncresePrice() {
    if (Math.random() < 0.35) {
      this.vehicle.increaseVehiclePrice();
      console.log("Ceny aut w górę");
    }
    if (Math.random() < 0.25) {
      this.grocery.increaseGroceryPrice();
      console.log("Ceny żarcia w górę");
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
      if (this.resources.reduceResources() === true) {
        document.body.innerHTML = "<h1 class='gameOver'>umarłeś!</h1>";
        clearInterval(this.resourcesIntervalIndex);
        //sound game over
      }
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
    if (this.driveProgress > 0)
      return alert("Musisz wrócić z trasy żebu sprzedać pojazdy");

    this.sound.play(this.sound.click);
    const vehicle = this.equipment.vehicles[index];

    alert(`Sprzedano ${vehicle.name} za ${vehicle.price * 0.7} PLN`);

    this.wallet.addMoneyToAccount(vehicle.price * 0.7);
    this.equipment.sellVehicle(index);
    this.vehicle.closeBigPictureVehicle();
  }

  driveCar(index) {
    //sound

    if (this.driveProgress > 0) return alert("juz jedziesz");
    const vehicle = this.equipment.vehicles[index];

    clearInterval(this.driveProgressIndex);
    this.driveProgress = 0;

    this.startDriveProgress(vehicle, this.driveTime);

    this.vehicle.closeBigPictureVehicle();
  }

  startDriveProgress(vehicle, totalTime) {
    const driveProgressBar = document.getElementById("progressDrive");

    let carIcon = document.getElementById("carIcon");
    if (!carIcon) {
      carIcon = document.createElement("span");
      carIcon.id = "carIcon";
      carIcon.textContent = "🚗";
      carIcon.style.position = "absolute";
      carIcon.style.top = "0";
      carIcon.style.left = "0";
      carIcon.style.transform = "translate(-20%,-50%) rotateY(180deg)";
      carIcon.style.transition = "left 1s linear"; // płynne przesuwanie
      document.querySelector(".progress-container-drive").appendChild(carIcon);
    }

    const containerWidth = document.querySelector(
      ".progress-container-drive"
    ).offsetWidth;

    this.startDriveTime = Date.now();

    this.driveProgressIndex = setInterval(() => {
      const elapsedTime = Date.now() - this.startDriveTime;
      this.driveProgress = (elapsedTime / totalTime) * 100;

      if (this.driveProgress >= 100) {
        this.driveProgress = 100;
        // koniec jazdy - możesz coś zrobić np. alert
        this.doneDrive(vehicle);
      }

      driveProgressBar.style.width = `${this.driveProgress}%`;

      // Przesuwanie ikonki auta
      const moveDistance = (containerWidth - 30) * (this.driveProgress / 100); // 30 = poprawka wielkości auta
      carIcon.style.left = `${moveDistance}px`;
    }, 1000);
  }

  updateDriveProgressBar() {
    let progressBar = document.getElementById("progressDrive");
    if (progressBar) {
      progressBar.style.width = `${this.driveProgress}%`;
    }
  }

  doneDrive(vehicle) {
    // this.sound.play(this.sound.doneWork); klakson
    this.driveProgress = 0;
    clearInterval(this.driveProgressIndex);

    this.updateDriveProgressBar();
    this.wallet.addMoneyToAccount(vehicle.drivePrice);
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
