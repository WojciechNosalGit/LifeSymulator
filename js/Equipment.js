class Equipment {
  constructor() {
    this.items = [
      { name: "Jabłko", icon: "🍏", fuel: 150, cost: 20, amount: 1 },
      {
        name: "Woda",
        icon: "💧",
        fuel: 200,
        cost: 30,
        amount: 1,
        toDrink: true,
      },
    ];
    this.vehicles = [
      {
        name: "Segway Ninebot MAX",
        price: 800,
        image: "segway_ninebot.jpeg",
        description:
          "Elektryczna hulajnoga o dużym zasięgu, idealna do miejskiej mobilności.",
        features: [
          "Zasięg 65 km",
          "Składana konstrukcja",
          "Amortyzacja przedniego koła",
        ],
      },
    ];

    this.sound = new Sound();
  }

  getItem(index) {
    console.log(index);
    return this.items[index];
  }

  addItem(item, type = "grocery") {
    const collection = type === "grocery" ? this.items : this.vehicles;
    //check if item already exists
    const existingItem = collection.find((i) => i.name === item.name);
    //if exists increase amount
    if (existingItem) {
      //only one vehicle
      if (type !== "grocery") {
        this.sound.play(this.sound.alert);
        alert("Nie możesz mieć więcej niż jeden taki pojazd!");
        return false;
      }
      //max 8 items
      if (existingItem.amount >= 8) {
        this.sound.play(this.sound.alert);
        alert("Nie bądź zachłanny! Masz już maksymalną ilość tego przedmiotu!");
        return false;
      }
      existingItem.amount += 1;
      this.renderEquipment();
      return true;
    } else {
      //if not set to 1
      item.amount = 1;
      collection.push(item);
      this.renderEquipment();
      return true;
    }
  }

  useItem(index) {
    if (this.items[index].amount > 0) {
      this.items[index].amount -= 1;
    }

    if (this.items[index].amount === 0) {
      this.items.splice(index, 1);
    }

    this.renderEquipment();

    return this.items[index];
  }

  sellVehicle(index) {
    this.vehicles.splice(index, 1);
    this.renderEquipment();
  }

  renderEquipment() {
    const equipmentList = document.querySelector(".equipment-grocery-items");
    const vehicleList = document.querySelector(".equipment-vehicle-items");
    equipmentList.innerHTML = "";
    vehicleList.innerHTML = "";

    for (let i = 0; i < 14; i++) {
      const div = document.createElement("div");
      div.classList.add("grocery-item");

      if (this.items[i]) {
        div.classList.add("grocery-item_active");
        div.dataset.index = i;

        const pIcon = document.createElement("p");
        pIcon.classList.add("item-icon");
        pIcon.textContent = this.items[i].icon;

        const divAmount = document.createElement("div");
        divAmount.classList.add("item-amount");
        divAmount.textContent = this.items[i].amount;

        div.appendChild(pIcon);
        div.appendChild(divAmount);
      }

      equipmentList.appendChild(div);
    }

    for (let i = 0; i < 7; i++) {
      const div = document.createElement("div");
      div.classList.add("vehicle-item");

      if (this.vehicles[i]) {
        div.classList.add("vehicle-item_active");
        div.dataset.index = i;

        const image = document.createElement("img");
        image.classList.add("vehicle-item-img");
        image.src = `assets/images/${this.vehicles[i].image}`;
        image.alt = this.vehicles[i].name;

        div.appendChild(image);
      }

      vehicleList.appendChild(div);
    }
  }

  toJSON() {
    return {
      items: this.items,
      vehicles: this.vehicles,
    };
  }

  static fromJSON(data) {
    const equipment = new Equipment();
    if (data) {
      equipment.items = data.items || [];
      equipment.vehicles = data.vehicles || [];
    }
    return equipment;
  }
}
