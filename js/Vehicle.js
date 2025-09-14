class Vehicle {
  constructor() {
    this.vehicles = [
      {
        name: "Ford Mustang",
        price: 50000,
        image: "mustang.jpeg",
        description:
          "Legendarny amerykański muscle car o agresywnym wyglądzie i potężnym silniku.",
        features: ["5.0L V8", "Klasyczny design", "Sportowe zawieszenie"],
        jobTimeInMinutes: 7.5,
      },
      {
        name: "Tesla Model S",
        price: 80000,
        image: "tesla_model_s.jpeg",
        description:
          "Nowoczesny elektryczny sedan, który łączy luksus z niesamowitymi osiągami.",
        features: ["Autopilot", "Zasięg 600 km", "0-100 km/h w 2.1s"],
        jobTimeInMinutes:7.2,
      },
      {
        name: "Volkswagen Golf GTI",
        price: 35000,
        image: "golf_gti.jpeg",
        description:
          "Kompaktowy hot hatch, który oferuje świetne osiągi i codzienną praktyczność.",
        features: ["Turbo 2.0L", "Skrzynia DSG", "Sportowe fotele"],
        jobTimeInMinutes:7.7,
      },
      {
        name: "BMW M3",
        price: 70000,
        image: "bmw_m3.jpeg",
        description:
          "Sportowy sedan z niemiecką precyzją i mocnym silnikiem R6 turbo.",
        features: ["Drift Mode", "Moc 510 KM", "Carbonowe dodatki"],
        jobTimeInMinutes:6.4,
      },
      {
        name: "Audi R8",
        price: 150000,
        image: "audi_r8.jpeg",
        description:
          "Supersamochód z centralnie umieszczonym silnikiem V10 i napędem quattro.",
        features: ["V10 5.2L", "Napęd AWD", "Agresywny wygląd"],
        jobTimeInMinutes:6.38,
      },
      {
        name: "Lamborghini Aventador",
        price: 400000,
        image: "lamborghini_aventador.jpeg",
        description:
          "Ikona supersamochodów z potężnym silnikiem V12 i wyjątkowym designem.",
        features: ["6.5L V12", "Drzwi otwierane do góry", "Napęd AWD"],
        jobTimeInMinutes:2.3,
      },
      {
        name: "Porsche 911 Turbo S",
        price: 200000,
        image: "porsche_911.jpeg",
        description: "Perfekcyjna kombinacja luksusu, osiągów i technologii.",
        features: ["Silnik z tyłu", "Launch Control", "Aktywna aerodynamika"],
        jobTimeInMinutes:6.3,
      },
      {
        name: "Dodge Charger Hellcat",
        price: 85000,
        image: "dodge_charger.jpeg",
        description: "Muscle car z piekielnym V8 o mocy ponad 700 KM.",
        features: ["Supercharged V8", "Tryb driftu", "Głośny wydech"],
        jobTimeInMinutes:5.8,
      },
      {
        name: "Harley-Davidson Fat Boy",
        price: 25000,
        image: "harley_fatboy.jpeg",
        description: "Kultowy motocykl cruiser z niepowtarzalnym brzmieniem.",
        features: [
          "Silnik Milwaukee-Eight",
          "Chromowane elementy",
          "Szeroka tylna opona",
        ],
        jobTimeInMinutes:6.45,
      },
      {
        name: "Yamaha R1",
        price: 20000,
        image: "yamaha_r1.jpeg",
        description: "Motocykl sportowy o wysokich osiągach, idealny na tor.",
        features: ["Silnik 1000cc", "Kontrola trakcji", "Aktywne zawieszenie"],
        jobTimeInMinutes:5.9,
      },
      {
        name: "Kawasaki Ninja H2",
        price: 32000,
        image: "kawasaki_h2.jpeg",
        description:
          "Supercharged motocykl, który przekracza granice prędkości.",
        features: ["Doładowany silnik", "Rama trellis", "Ponad 300 KM"],
        jobTimeInMinutes:5.72,
      },
      {
        name: "Jeep Wrangler",
        price: 45000,
        image: "jeep_wrangler.jpeg",
        description:
          "Legendarny pojazd terenowy, stworzony do jazdy w najtrudniejszych warunkach.",
        features: ["Napęd 4x4", "Zdejmowany dach", "Blokady dyferencjałów"],
        jobTimeInMinutes:8.7,
      },
      {
        name: "Mercedes-Benz G63 AMG",
        price: 200000,
        image: "mercedes_g63.jpeg",
        description:
          "Luksusowy SUV o niesamowitych możliwościach terenowych i mocnym V8.",
        features: ["Napęd 4x4", "750 Nm momentu obrotowego", "Tryb terenowy"],
        jobTimeInMinutes:8.4,
      },
      {
        name: "John Deere 8R",
        price: 180000,
        image: "john_deere_8r.jpeg",
        description:
          "Nowoczesny traktor o dużej mocy, idealny do ciężkiej pracy w rolnictwie.",
        features: [
          "Silnik wysokoprężny",
          "GPS Auto-Steer",
          "Hydrauliczne zawieszenie",
        ],
        jobTimeInMinutes:9.9,
      },
      {
        name: "Claas Lexion 8900",
        price: 450000,
        image: "claas_lexion.jpeg",
        description:
          "Kombajn rolniczy o ogromnej wydajności i nowoczesnej technologii.",
        features: [
          "Automatyczne sterowanie",
          "System czyszczenia ziarna",
          "Wysoka wydajność",
        ],
        jobTimeInMinutes:9.9,
      },
      {
        name: "Toyota Land Cruiser",
        price: 90000,
        image: "toyota_land_cruiser.jpeg",
        description:
          "Niezawodna terenówka, używana na całym świecie do najtrudniejszych zadań.",
        features: ["Silnik V8", "Wytrzymałe zawieszenie", "Bogate wyposażenie"],
        jobTimeInMinutes:7.9,
      },
      {
        name: "Giant Trance E+",
        price: 5500,
        image: "giant_trance.jpeg",
        description: "Elektryczny rower górski do jazdy po trudnym terenie.",
        features: [
          "Silnik elektryczny",
          "Amortyzacja Fox",
          "Lekkie karbonowe ramy",
        ],
        jobTimeInMinutes:9,
      },
      {
        name: "Specialized Tarmac SL7",
        price: 12000,
        image: "specialized_tarmac.jpeg",
        description:
          "Profesjonalny rower szosowy, wykorzystywany w wyścigach kolarskich.",
        features: [
          "Rama karbonowa",
          "Hydrauliczne hamulce tarczowe",
          "Aerodynamiczna konstrukcja",
        ],
        jobTimeInMinutes:8.8,
      },
      {
        name: "Scania R500",
        price: 120000,
        image: "scania_r500.jpeg",
        description:
          "Ciężarówka dalekobieżna o potężnym silniku i komfortowej kabinie.",
        features: [
          "Silnik 13L",
          "Automatyczna skrzynia biegów",
          "System oszczędzania paliwa",
        ],
        jobTimeInMinutes:7.8,
      },
    ];

    this.sound = new Sound();

    this.selectedVehicle = null;

    this.vehicleList = document.querySelector(".vehicle-list_container");
    this.vehiclePopupWindow = document.querySelector(".vehicle-popup");

    this.initEvents();

    this.addVehicleElementsToList();
  }

  initEvents() {
    document
      .querySelector(".close-vehicle-list_button")
      .addEventListener("click", () => this.closeVehiclesWindow());

    document.addEventListener("click", (event) => {
      if (event.target.classList.contains("vehicle-popup_back")) {
        this.closeBigPictureVehicle();
      }
    });

    document.addEventListener("click", (event) => {
      if (event.target.classList.contains("vehicle-popup_img")) {
        this.showFullImg(event.target.src);
      }
    });

    document.addEventListener("click", (event) => {
      if (event.target.classList.contains("full-img-button")) {
        this.closeFullImg(event.target.parentElement);
      }
    });
  }

  formatValueWithSpaces(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  createVehicleElement({ name, price, image }) {
    const li = document.createElement("li");
    li.classList.add("vehicle");

    const img = document.createElement("img");
    img.src = `assets/images/${image}`;
    img.alt = image;

    const div = document.createElement("div");
    div.classList.add("text-content");

    const h2 = document.createElement("h2");
    h2.textContent = name;

    const paragraphCost = document.createElement("p");
    paragraphCost.classList.add("vehicle-cost");
    paragraphCost.textContent = `Cena: ${this.formatValueWithSpaces(
      price
    )} PLN`;

    div.appendChild(h2);
    div.appendChild(paragraphCost);

    li.appendChild(img);
    li.appendChild(div);

    document.getElementById("vehicle-list").appendChild(li);
  }

  addVehicleElementsToList() {
    document.getElementById("vehicle-list").textContent = "";
    this.vehicles.forEach((vehicle) => {
      this.createVehicleElement(vehicle);
    });
  }

  showVehiclesWindow() {
    this.vehicleList.classList.remove("display-none");
    this.setupVehicleSelectionHandlers();
  }

  closeVehiclesWindow() {
    this.vehicleList.classList.add("display-none");
  }

  setupVehicleSelectionHandlers() {
    const vehicles = [...document.querySelectorAll("li.vehicle")];
    vehicles.forEach((item, index) => {
      item.addEventListener("click", () => {
        this.showBigPictureVehicle(index);
      });
    });
  }

  showBigPictureVehicle(index, isInGarage = false, vehicleIndex) {
    this.sound.play(this.sound.click);

    const vehicle = isInGarage ? index : this.vehicles[index]; // if vehicle is in garage, index is passed as a parameter
    this.selectedVehicle = vehicle;

    this.vehiclePopupWindow.innerHTML = "";

    this.vehiclePopupWindow.classList.remove("display-none");

    this.vehiclePopupWindow.innerHTML = this.createVehiclePopupHTML(
      vehicle,
      isInGarage,
      vehicleIndex
    );
  }

  createVehiclePopupHTML(vehicle, isInGarage, vehicleIndex) {
    // console.log(vehicle);
    return `
        <div class="header vehicle-popup_header">
        ${
          isInGarage
            ? `<button class="button vehicle-drive" data-index=${vehicleIndex}>Śmigaj</button>`
            : ""
        }
          <img class="vehicle-popup_img" src="assets/images/${
            vehicle.image
          }" alt="${vehicle.name}" />
          <div class='vehicle-popup_text'>
            <div class="title ">${vehicle.name}</div>
            <div class="price">Cena: ${this.formatValueWithSpaces(
              vehicle.price
            )} PLN</div>
          </div>
        </div>
        <div class="description">
        ${vehicle.description}
        </div>
        <div class="features skills">
        ${vehicle.features.map((skill) => `<p>🚀 ${skill}</p>`).join("")}
        </div>
        
          <div class="button_container">
          <button class="vehicle-popup_back back-button button" >Cofnij</button>
          ${
            isInGarage
              ? `<button class="vehicle-popup_sell button" data-index=${vehicleIndex}>Sprzedaj</button>`
              : `    
              <button class="vehicle-popup_select select-button button">Wybierz</button>`
          }         
            </div>
      `;
  }

  closeBigPictureVehicle() {
    this.vehiclePopupWindow.classList.add("display-none");
    this.vehiclePopupWindow.innerHTML = "";
  }

  getSelectedVehicle() {
    console.log(this.selectedVehicle);
    return this.selectedVehicle;
  }

  showFullImg(imageSrc) {
    this.sound.play(this.sound.click);

    const div = document.createElement("div");
    div.classList.add("vehicle-full-img_container");

    const img = document.createElement("img");
    img.classList.add("vehicle-full-img");
    img.src = imageSrc;

    const buttonBack = document.createElement("button");
    buttonBack.classList.add("full-img-button");
    buttonBack.classList.add("button");
    buttonBack.innerHTML = "Wstecz";

    div.appendChild(img);
    div.appendChild(buttonBack);

    document.getElementById("app").appendChild(div);
  }

  closeFullImg(img) {
    img.remove();
  }

  increaseVehiclePrice() {
    this.vehicles.forEach((item) => {
      item.price += 1000;
    });
    this.addVehicleElementsToList();
  }

  //JSON
  toJSON() {
    return {
      vehicles: this.vehicles,
    };
  }

  static fromJSON(data) {
    const vehicle = new Vehicle();
    if (data) {
      vehicle.vehicles = data.vehicles || [];
      console.log(vehicle.vehicles);
    }
    return vehicle;
  }
}
