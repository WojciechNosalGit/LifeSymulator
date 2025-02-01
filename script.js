const professions = [
  { name: "Policjant", salaryRange: [10000, 15000] },
  { name: "Strażak", salaryRange: [20000, 30000] },
  { name: "Medyk", salaryRange: [25000, 38000] },
  { name: "Holownik", salaryRange: [2000, 20000] },
  { name: "Taksówkarz", salaryRange: [300, 1000] },
  { name: "Nauczyciel", salaryRange: [2000, 5000], task: "Wystawianie ocen" },
  { name: "Inżynier", salaryRange: [4000, 8000] },
  { name: "Programista", salaryRange: [6000, 12000] },
  { name: "Pilot", salaryRange: [30000, 50000] },
  { name: "Artysta", salaryRange: [1000, 4000] },
  { name: "Kierowca autobusu", salaryRange: [1500, 3000] },
  { name: "Sprzedawca", salaryRange: [1000, 2000] },
  { name: "Mechanik", salaryRange: [2000, 6000] },
  { name: "Kucharz", salaryRange: [2500, 4000] },
  { name: "Prawnik", salaryRange: [10000, 20000] },
  { name: "Architekt", salaryRange: [8000, 15000] },
  { name: "Rolnik", salaryRange: [2000, 5000] },
  { name: "Księgowy", salaryRange: [4000, 7000] },
  { name: "Dziennikarz", salaryRange: [3000, 6000] },
  { name: "Naukowiec", salaryRange: [5000, 15000] },
  { name: "Kierowca karetki", salaryRange: [3000, 25000] },
  { name: "Lekarz", salaryRange: [20000, 50000] },
  { name: "Elektryk", salaryRange: [2000, 4000] },
  { name: "Hydraulik", salaryRange: [2000, 4000] },
  { name: "Strażnik", salaryRange: [2000, 3000] },
  { name: "Piekarz", salaryRange: [2000, 4000] },
  { name: "Technik IT", salaryRange: [4000, 8000] },
  { name: "Ogrodnik", salaryRange: [1500, 3000] },
  { name: "Zegarmistrz", salaryRange: [2000, 4000] },
  { name: "Fryzjer", salaryRange: [1500, 4000] },
  { name: "Kosmetolog", salaryRange: [2000, 5000] },
  { name: "Kierownik budowy", salaryRange: [8000, 15000] },
  { name: "Rzeźnik", salaryRange: [2000, 4000] },
  { name: "Sędzia", salaryRange: [20000, 30000] },
  { name: "Pilot dronów", salaryRange: [3000, 6000] },
  { name: "Analityk danych", salaryRange: [7000, 15000] },
  { name: "Astronom", salaryRange: [10000, 30000] },
  { name: "Pilot wycieczek", salaryRange: [2000, 4000] },
  { name: "Ratownik", salaryRange: [2000, 5000] },
  { name: "Instruktor jazdy", salaryRange: [3000, 6000] },
  { name: "Geolog", salaryRange: [5000, 10000] },
  { name: "Meteorolog", salaryRange: [7000, 15000] },
  { name: "Fotograf", salaryRange: [2000, 8000] },
  { name: "Filmowiec", salaryRange: [3000, 9000] },
  { name: "Reżyser", salaryRange: [10000, 50000] },
];

const products = [
  { name: "Chleb", price: 5 },
  { name: "Woda", price: 3 },
  { name: "Telefon", price: 1500 },
  { name: "Komputer", price: 4000 },
  { name: "Telewizor", price: 2000 },
  { name: "Rower", price: 800 },
  { name: "Książka", price: 30 },
  { name: "Kanapa", price: 2000 },
];

const cars = [
  { name: "Toyota Corolla", price: 95000 },
  { name: "Toyota Camry", price: 120000 },
  { name: "Honda Civic", price: 110000 },
  { name: "Honda Accord", price: 130000 },
  { name: "BMW 3 Series", price: 150000 },
  { name: "BMW X5", price: 250000 },
  { name: "Audi A4", price: 140000 },
  { name: "Audi Q7", price: 220000 },
  { name: "Mercedes-Benz C-Class", price: 160000 },
  { name: "Mercedes-Benz E-Class", price: 180000 },
  { name: "Volkswagen Golf", price: 90000 },
  { name: "Volkswagen Passat", price: 110000 },
  { name: "Ford Focus", price: 95000 },
  { name: "Ford Fiesta", price: 85000 },
  { name: "Chevrolet Malibu", price: 100000 },
  { name: "Chevrolet Cruze", price: 85000 },
  { name: "Nissan Altima", price: 115000 },
  { name: "Nissan Sentra", price: 85000 },
  { name: "Hyundai Elantra", price: 90000 },
  { name: "Hyundai Sonata", price: 105000 },
  { name: "Kia Optima", price: 110000 },
  { name: "Kia Sorento", price: 135000 },
  { name: "Mazda 3", price: 95000 },
  { name: "Mazda CX-5", price: 125000 },
  { name: "Subaru Impreza", price: 95000 },
  { name: "Subaru Outback", price: 125000 },
  { name: "Lexus RX", price: 200000 },
  { name: "Lexus ES", price: 150000 },
  { name: "Jaguar XF", price: 180000 },
  { name: "Jaguar F-PACE", price: 250000 },
  { name: "Porsche 911", price: 450000 },
  { name: "Porsche Cayenne", price: 350000 },
  { name: "Land Rover Range Rover", price: 300000 },
  { name: "Land Rover Discovery", price: 270000 },
  { name: "Chrysler Pacifica", price: 130000 },
  { name: "Chrysler 300", price: 110000 },
  { name: "Dodge Charger", price: 150000 },
  { name: "Dodge Durango", price: 170000 },
  { name: "Ram 1500", price: 200000 },
  { name: "Jeep Grand Cherokee", price: 190000 },
  { name: "Jeep Wrangler", price: 180000 },
  { name: "Tesla Model 3", price: 250000 },
  { name: "Tesla Model S", price: 350000 },
  { name: "Tesla Model X", price: 400000 },
  { name: "Tesla Model Y", price: 280000 },
  { name: "Volvo XC90", price: 230000 },
  { name: "Volvo XC60", price: 200000 },
  { name: "Mitsubishi Outlander", price: 120000 },
  { name: "Mitsubishi Eclipse Cross", price: 110000 },
  { name: "Alfa Romeo Giulia", price: 160000 },
  { name: "Alfa Romeo Stelvio", price: 180000 },
];

const myProducts = [];

let currentJob = null;
let totalEarnings = 10;
let jobTimer = null;
const workTime = 1000 * 60 * 10; // ostatnia watrość to minuty (1000 * 60 * 10)

const energyTime = 1000 * 30; // ostatnia wartość to sekundy
let foodLevel = 100;
let waterLevel = 100;

let intervalId = null;

const professionList = document.getElementById("profession-list");
const startJobBtn = document.getElementById("start-job");
const quitJobBtn = document.getElementById("quit-job");
const earningsDisplay = document.getElementById("earnings-display");
const currentJobDisplay = document.getElementById("current-job-display");

const productList = document.getElementById("product-list");
const carList = document.getElementById("car-list");
const myProdactsList = document.getElementById("myProducts");

const buyProductBtn = document.getElementById("buy-product");
const buyCarBtn = document.getElementById("buy-car");

earningsDisplay.textContent = `Łączne zarobki: ${totalEarnings} zł`;

professions.forEach((profession, index) => {
  const option = document.createElement("option");
  option.value = index;
  option.textContent = profession.name;
  professionList.appendChild(option);
});

products.forEach((product, index) => {
  const option = document.createElement("option");
  option.value = index;
  option.textContent = `${product.name} - ${product.price} zł`;
  productList.appendChild(option);
});

cars.forEach((car, index) => {
  const option = document.createElement("option");
  option.value = index;
  option.textContent = `${car.name} - ${car.price} zł`;
  carList.appendChild(option);
});

professionList.addEventListener("change", () => {
  startJobBtn.disabled = false;
});

productList.addEventListener("change", () => {
  buyProductBtn.disabled = false;
});

buyProductBtn.addEventListener("click", () => {
  const selectedIndex = productList.value;
  const product = products[selectedIndex];

  if (totalEarnings >= product.price) {
    totalEarnings -= product.price;
    addToMyProdukts(product);
    earningsDisplay.textContent = `Łączne zarobki: ${totalEarnings} zł`;
  } else {
    alert(`Masz za mało pieniędzy, żeby kupić ${product.name}`);
  }
});

carList.addEventListener("change", () => {
  buyCarBtn.disabled = false;
});

buyCarBtn.addEventListener("click", () => {
  const selectedIndex = carList.value;
  const car = cars[selectedIndex];

  if (totalEarnings >= car.price) {
    totalEarnings -= car.price;
    addToMyProdukts(car);
    earningsDisplay.textContent = `Łączne zarobki: ${totalEarnings} zł`;
  } else {
    alert(`Masz za mało pieniędzy, żeby kupić ${car.name}`);
  }
});
// Add to my products list

function addToMyProdukts(item) {
  myProducts.push(item);
  const div = document.createElement("div");
  div.classList.add("my-list-item");
  div.textContent = `${item.name}`;

  // Dodane: Przyciski dla aut
  if (cars.some((car) => car.name === item.name)) {
    const repairBtn = document.createElement("button");
    repairBtn.style.backgroundColor = "red";
    repairBtn.textContent = "Naprawa auta (20000)";
    div.appendChild(repairBtn);

    repairBtn.addEventListener("click", () => {
      repairCar(item);
    });
  }
  if (item.name === "Chleb") {
    const btn = document.createElement("button");
    btn.id = "breadId";
    btn.textContent = "Zjedz";
    div.appendChild(btn);

    btn.addEventListener("click", () => {
      eatBread(item);
    });
  }
  if (item.name === "Woda") {
    const btn = document.createElement("button");
    btn.id = "waterId";
    btn.textContent = "Napij się";
    div.appendChild(btn);

    btn.addEventListener("click", () => {
      drinkWater(item);
    });
  }
  myProdactsList.appendChild(div);
}

// Eat bread
function eatBread(item) {
  const index = myProducts.indexOf(item);
  // remowe item
  if (index !== -1) {
    myProducts.splice(index, 1);
  }

  const button = document.getElementById("breadId");
  if (button) {
    const parentDiv = button.parentElement;
    if (parentDiv) {
      parentDiv.remove();
    }
  }

  //change food
  clearInterval(intervalId);
  foodLevel += 40;
  changeLevels();
  intervalId = setInterval(changeLevels, energyTime);
}

// drink water
function drinkWater(item) {
  const index = myProducts.indexOf(item);
  // remowe item
  if (index !== -1) {
    myProducts.splice(index, 1);
  }

  const button = document.getElementById("waterId");
  if (button) {
    const parentDiv = button.parentElement;
    if (parentDiv) {
      parentDiv.remove();
    }
  }

  //change water
  clearInterval(intervalId);
  waterLevel += 40;
  changeLevels();
  intervalId = setInterval(changeLevels, energyTime);
}

// Start
startJobBtn.addEventListener("click", () => {
  if (jobTimer) return;
  const selectedIndex = professionList.value;
  currentJob = professions[selectedIndex];
  const salary = getRandomSalary(currentJob.salaryRange);

  currentJobDisplay.textContent = `Obecna praca: ${currentJob.name} (zarobek: ${salary} zł)`;

  jobTimer = setTimeout(() => {
    totalEarnings += salary;
    alert(`Praca ${currentJob.name} zakończona! Zarobek: ${salary} zł.`);
    earningsDisplay.textContent = `Łączne zarobki: ${totalEarnings} zł`;
    jobTimer = null;
    startJobBtn.disabled = false;
    quitJobBtn.disabled = true;
  }, workTime);

  startJobBtn.disabled = true;
  quitJobBtn.disabled = false;
});

// Quit
quitJobBtn.addEventListener("click", () => {
  if (jobTimer) {
    clearTimeout(jobTimer);
    jobTimer = null;
  }
  currentJob = null;
  currentJobDisplay.textContent = "";
  startJobBtn.disabled = false;
  quitJobBtn.disabled = true;
});

function getRandomSalary([min, max]) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// status bars

const statusDisplay = document.createElement("div");
statusDisplay.id = "status-display";

const foodDisplay = document.createElement("div");
foodDisplay.id = "food-display";
foodDisplay.textContent = `Jedzenie: ${foodLevel}%`;

const waterDisplay = document.createElement("div");
waterDisplay.id = "water-display";
waterDisplay.textContent = `Picie: ${waterLevel}%`;

statusDisplay.appendChild(foodDisplay);
statusDisplay.appendChild(waterDisplay);
app.appendChild(statusDisplay);

// Aktualizacja jedzenia i picia

intervalId = setInterval(changeLevels, energyTime);

function changeLevels() {
  if (foodLevel > 0) foodLevel -= 3;
  if (waterLevel > 0) waterLevel -= 4;

  foodLevel > 100 ? (foodLevel = 100) : foodLevel;
  waterLevel > 100 ? (waterLevel = 100) : waterLevel;

  foodDisplay.textContent = `Jedzenie: ${foodLevel > 0 ? foodLevel : 0}%`;
  waterDisplay.textContent = `Picie: ${waterLevel > 0 ? waterLevel : 0}%`;

  if (foodLevel <= 0 || waterLevel <= 0) {
    alert("Uwaga! Twój poziom jedzenia lub picia jest na zerowym poziomie!");
  }
}

// Local Storage
const saveGameButton = document.getElementById("save-game");
const loadGameButton = document.getElementById("load-game");
const clearSaveButton = document.getElementById("clear-save");

const saveNameInput = document.getElementById("save-name");
const savesList = document.getElementById("saves-list");

// Reset
function resetGameState() {
  currentJob = null;
  totalEarnings = 10; // lub jakaś wartość początkowa
  myProducts.length = 0;
  foodLevel = 100;
  waterLevel = 100;

  earningsDisplay.textContent = `Łączne zarobki: ${totalEarnings} zł`;
  foodDisplay.textContent = `Jedzenie: ${foodLevel}%`;
  waterDisplay.textContent = `Picie: ${waterLevel}%`;

  currentJobDisplay.textContent = "";

  myProdactsList.innerHTML = "";
}

// Funkcja odświeżania listy zapisów
function refreshSavesList() {
  savesList.innerHTML = "";
  const allSaves = Object.keys(localStorage).filter((key) =>
    key.startsWith("gameSave:")
  );

  allSaves.forEach((saveKey) => {
    const saveName = saveKey.replace("gameSave:", "");
    const listItem = document.createElement("li");
    listItem.textContent = saveName;

    const loadButton = document.createElement("button");
    loadButton.textContent = "Wczytaj";
    loadButton.addEventListener("click", () => loadGame(saveName));

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Usuń";
    deleteButton.addEventListener("click", () => deleteSave(saveName));

    listItem.appendChild(loadButton);
    listItem.appendChild(deleteButton);
    savesList.appendChild(listItem);
  });
}

// Funkcja zapisywania gry
saveGameButton.addEventListener("click", () => {
  const saveName = saveNameInput.value.trim();
  if (!saveName) {
    alert("Podaj nazwę zapisu!");
    return;
  }

  const gameState = {
    currentJob,
    totalEarnings,
    myProducts,
    foodLevel,
    waterLevel,
  };
  localStorage.setItem(`gameSave:${saveName}`, JSON.stringify(gameState));
  alert(`Gra została zapisana jako "${saveName}"!`);
  saveNameInput.value = "";
  refreshSavesList();
});

// Funkcja wczytywania gry
function loadGame(saveName) {
  const savedGame = localStorage.getItem(`gameSave:${saveName}`);

  if (savedGame) {
    resetGameState();

    const gameState = JSON.parse(savedGame);
    currentJob = gameState.currentJob;
    totalEarnings = gameState.totalEarnings;
    foodLevel = gameState.foodLevel;
    waterLevel = gameState.waterLevel;

    // Odtwarzanie produktów
    myProducts.length = 0;
    gameState.myProducts.forEach((item) => addToMyProdukts(item));

    earningsDisplay.textContent = `Łączne zarobki: ${totalEarnings} zł`;
    foodDisplay.textContent = `Jedzenie: ${foodLevel}%`;
    waterDisplay.textContent = `Picie: ${waterLevel}%`;

    if (currentJob) {
      currentJobDisplay.textContent = `Obecna praca: ${currentJob.name}`;
    }

    alert(`Gra została wczytana z zapisu "${saveName}"!`);
  } else {
    alert("Nie znaleziono zapisanego stanu gry!");
  }
}

// Funkcja usuwania zapisu
function deleteSave(saveName) {
  localStorage.removeItem(`gameSave:${saveName}`);
  alert(`Zapis "${saveName}" został usunięty!`);
  refreshSavesList();
}

// Inicjalizacja listy zapisów
refreshSavesList();

function repairCar(car) {
  if (totalEarnings >= 20000) {
    totalEarnings -= 20000;
    earningsDisplay.textContent = `Łączne zarobki: ${totalEarnings} zł`;
    alert(`${car.name} został naprawiony!`);
  } else {
    alert("Masz za mało pieniędzy na naprawę auta!");
  }
}
