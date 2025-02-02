class Equipment {
  constructor() {
    this.items = [];
  }

  addItem(item) {
    this.items.push(item);
    console.log(`Dodano do ekwipunku: ${item.getInfo()}`);
  }

  getItems() {
    return this.items;
  }

  displayEquipment() {
    const equipmentElement = document.getElementById("equipment-list");
    if (equipmentElement) {
      equipmentElement.innerHTML = this.items
        .map((item) => `<li>${item.getInfo()}</li>`)
        .join("");
    }
  }
}
