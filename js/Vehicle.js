class Vehicle {
  constructor() {
    this.vehicles = [
      {
        name: "Samochód",
        price: 5000,
        image: "car.png",
        description:
          "Samochód to jedno z podstawowych środków transportu. Umożliwia szybkie przemieszczanie się z miejsca na miejsce.",
      },
      {
        name: "Motocykl",
        price: 2000,
        image: "motorcycle.png",
        description:
          "Motocykl to jednoślad, który pozwala na szybkie przemieszczanie się z miejsca na miejsce.",
      },
      {
        name: "Rower",
        price: 500,
        image: "bike.png",
        description:
          "Rower to pojazd, który pozwala na szybkie przemieszczanie się z miejsca na miejsce.",
      },
    ];

    this.selectedVehicle = null;

    this.vehicleList = document.querySelector(".vehicle-list_container");
    this.vehiclePopupWindow = document.querySelector(".vehicle-popup");

    document
      .querySelector(".close-vehicle-list_button")
      .addEventListener("click", () => this.closeVehiclesWindow());

    this.addVehicleElementsToList();
  }

  createVehicleElement({ name, price, image }) {
    const li = document.createElement("li");
    li.classList.add("vehicle");

    const img = document.createElement("img");
    img.src = `assets/images/auto.png`;
    img.alt = image;

    const div = document.createElement("div");
    div.classList.add("text-content");

    const h2 = document.createElement("h2");
    h2.textContent = name;

    const paragraphCost = document.createElement("p");
    paragraphCost.classList.add("vehicle-cost");
    paragraphCost.textContent = `Cena: ${price} PLN`;

    div.appendChild(h2);
    div.appendChild(paragraphCost);

    li.appendChild(img);
    li.appendChild(div);

    this.vehicleList.appendChild(li);
  }

  addVehicleElementsToList() {
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

  showBigPictureVehicle(index) {
    const vehicle = this.vehicles[index];
    this.selectedVehicle = vehicle;

    this.vehiclePopupWindow.innerHTML = "";

    this.vehiclePopupWindow.classList.remove("display-none");

    this.vehiclePopupWindow.innerHTML = this.createJobPopupHTML(vehicle);

    document
      .querySelector(".vehicle-popup_back")
      .addEventListener("click", () => {
        this.closeBigPictureVehicle();
      });
  }

  createJobPopupHTML(vehicle) {
    return `
        <div class="header">
          <img src="assets/images/auto.png" alt="${vehicle.name}" />
          <div>
            <div class="title">${vehicle.name}</div>
            <div class="salary">Cena: ${vehicle.price} PLN</div>
          </div>
        </div>
        <div class="description">
        ${vehicle.description}
        </div>
        <div class="features skills">
          <p><span>🚀</span>  Na zakrętach nie ma sobie równych</p>
          <p><span>🚀</span>  Szerroki kapeć</p>
        </div>
        
          <div class="button_container">
              <button class="vehicle-popup_back back-button button">Cofnij</button>
              <button class="vehicle-popup_select select-button button">Wybierz</button>
            </div>
      `;
  }

  closeBigPictureVehicle() {
    this.vehiclePopupWindow.classList.add("display-none");
    this.vehiclePopupWindow.innerHTML = "";
  }

  getSelectedVehicle() {
    return this.selectedVehicle;
  }
}
