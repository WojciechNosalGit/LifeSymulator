class Equipment {
  constructor() {
    this.items = [
      { name: "Jabłko", icon: "🍏", fuel: 150, cost: 20, amount: 3 },
      { name: "Chleb", icon: "🍞", fuel: 500, cost: 90, amount: 2 },
      { name: "Woda", icon: "💧", fuel: 200, cost: 30, amount: 2 },
    ];
  }

  getItem(index) {
    return this.items[index];
  }

  addItem(item) {
    //check if item already exists
    const existingItem = this.items.find((i) => i.icon === item.icon);
    //if exists increase amount
    if (existingItem) {
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
      this.items.push(item);
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

    // console.log(this.items[index]);
    return this.items[index];
  }

  renderEquipment() {
    const equipmentList = document.querySelector(".equipment-grocery-items");
    equipmentList.innerHTML = "";

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
  }

  createActiveItemElement({ icon, amount }, index) {
    const div = document.createElement("div");

    div.classList.add("grocery-item_active");
    div.dataset.index = index;

    const pIcon = document.createElement("p");
    pIcon.classList.add("item-icon");
    pIcon.textContent = icon;

    const divAmount = document.createElement("div");
    divAmount.classList.add("item-amount");
    divAmount.textContent = amount;

    div.appendChild(pIcon);
    div.appendChild(divAmount);

    return div;
  }
}
