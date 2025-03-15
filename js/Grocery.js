class Grocery {
  constructor() {
    this.shopListContainer = document.getElementById("shop-list_container");
    this.items = [
      { name: "Woda", icon: "💧", fuel: 200, cost: 30, toDrink: true },
      { name: "Chleb", icon: "🍞", fuel: 500, cost: 90 },
      { name: "Jabłko", icon: "🍏", fuel: 150, cost: 20 },
      { name: "Banan", icon: "🍌", fuel: 250, cost: 35 },
      { name: "Ser", icon: "🧀", fuel: 600, cost: 120 },
      { name: "Mięso", icon: "🥩", fuel: 900, cost: 180 },
      { name: "Ryba", icon: "🐟", fuel: 750, cost: 150 },
      { name: "Sok", icon: "🥤", fuel: 300, cost: 50, toDrink: true },
      { name: "Ziemniaki", icon: "🥔", fuel: 400, cost: 60 },
      { name: "Marchewka", icon: "🥕", fuel: 180, cost: 25 },
      { name: "Pomidor", icon: "🍅", fuel: 200, cost: 30 },
      { name: "Jajka", icon: "🥚", fuel: 500, cost: 85 },
      { name: "Mleko", icon: "🥛", fuel: 300, cost: 50, toDrink: true },
      { name: "Kukurydza", icon: "🌽", fuel: 350, cost: 55 },
      { name: "Miód", icon: "🍯", fuel: 800, cost: 160 },
      { name: "Czekolada", icon: "🍫", fuel: 700, cost: 140 },
      { name: "Orzechy", icon: "🥜", fuel: 850, cost: 170 },
      { name: "Ryż", icon: "🍚", fuel: 550, cost: 100 },
      { name: "Makaron", icon: "🍝", fuel: 600, cost: 110 },
      { name: "Pizza", icon: "🍕", fuel: 1200, cost: 250 },
      { name: "Lody", icon: "🍦", fuel: 500, cost: 95 },
      { name: "Grzyby", icon: "🍄", fuel: 320, cost: 45 },
      { name: "Arbuz", icon: "🍉", fuel: 280, cost: 40 },
    ];

    document
      .querySelector(".close-shop-list_button")
      .addEventListener("click", () => this.closeShopWindow());
  }

  createItemElement({ icon, fuel, cost, type }, index) {
    const li = document.createElement("li");
    li.classList.add("shop-item");
    li.dataset.index = index;

    const pIcon = document.createElement("p");
    pIcon.classList.add("shop-item-icon");
    pIcon.textContent = icon;

    const pPrice = document.createElement("p");
    pPrice.classList.add("shop-item-price");
    pPrice.textContent = `${cost} zł`;

    const pFuel = document.createElement("p");
    pFuel.classList.add("shop-item-fuel");
    pFuel.textContent = type === "Drink" ? `${fuel} ml` : `${fuel} kcal`;

    li.appendChild(pIcon);
    li.appendChild(pPrice);
    li.appendChild(pFuel);

    return li;
  }

  addItemsToList() {
    const groceryList = document.getElementById("shop-list");
    groceryList.innerHTML = "";

    this.items.forEach((item, index) => {
      const li = this.createItemElement(item, index);
      groceryList.appendChild(li);
    });
  }

  showShopWindow() {
    this.shopListContainer.classList.remove("display-none");
  }

  closeShopWindow() {
    this.shopListContainer.classList.add("display-none");
  }
}
