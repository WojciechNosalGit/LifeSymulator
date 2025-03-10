class Equipment {
  constructor() {
    this.items = [
      { name: "Jabłko", icon: "🍏", fuel: 150, cost: 20, amount: 1 },
    ];
    this.vehicles = [];
  }

  getItem(index) {
    return this.items[index];
  }

  addItem(item, type = "grocery") {
    const collection = type === "grocery" ? this.items : this.vehicles;
    //check if item already exists
    const existingItem = collection.find((i) => i.name === item.name);
    //if exists increase amount
    if (existingItem) {
      //only one vehicle
      if (type !== "grocery")
        return alert("Nie możesz mieć więcej niż jeden pojazd!");
      //max 8 items
      if (existingItem.amount >= 8) {
        //alert sound
        return alert(
          "Nie bądź zachłanny! Masz już maksymalną ilość tego przedmiotu!"
        );
      }
      existingItem.amount += 1;
    } else {
      //if not set to 1
      item.amount = 1;
      collection.push(item);
    }
    this.renderEquipment();
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
        image.src = `../assets/images/auto.png`;
        image.alt = this.vehicles[i].name;

        // const divAmount = document.createElement("div");
        // divAmount.classList.add("item-amount");
        // divAmount.textContent = this.vehicles[i].amount;

        div.appendChild(image);
        // div.appendChild(divAmount);
      }

      vehicleList.appendChild(div);
    }
  }
}
