// const professions = [
//   { name: "Policjant", salaryRange: [10000, 15000] },
//   { name: "Strażak", salaryRange: [20000, 30000] },
//   { name: "Medyk", salaryRange: [25000, 38000] },
//   { name: "Holownik", salaryRange: [2000, 20000] },
//   { name: "Taksówkarz", salaryRange: [300, 1000] },
//   { name: "Nauczyciel", salaryRange: [2000, 5000], task: "Wystawianie ocen" },
//   { name: "Inżynier", salaryRange: [4000, 8000] },
//   { name: "Programista", salaryRange: [6000, 12000] },
//   { name: "Pilot", salaryRange: [30000, 50000] },
//   { name: "Artysta", salaryRange: [1000, 4000] },
//   { name: "Kierowca autobusu", salaryRange: [1500, 3000] },
//   { name: "Sprzedawca", salaryRange: [1000, 2000] },
//   { name: "Mechanik", salaryRange: [2000, 6000] },
//   { name: "Kucharz", salaryRange: [2500, 4000] },
//   { name: "Prawnik", salaryRange: [10000, 20000] },
//   { name: "Architekt", salaryRange: [8000, 15000] },
//   { name: "Rolnik", salaryRange: [2000, 5000] },
//   { name: "Księgowy", salaryRange: [4000, 7000] },
//   { name: "Dziennikarz", salaryRange: [3000, 6000] },
//   { name: "Naukowiec", salaryRange: [5000, 15000] },
//   { name: "Kierowca karetki", salaryRange: [3000, 25000] },
//   { name: "Lekarz", salaryRange: [20000, 50000] },
//   { name: "Elektryk", salaryRange: [2000, 4000] },
//   { name: "Hydraulik", salaryRange: [2000, 4000] },
//   { name: "Strażnik", salaryRange: [2000, 3000] },
//   { name: "Piekarz", salaryRange: [2000, 4000] },
//   { name: "Technik IT", salaryRange: [4000, 8000] },
//   { name: "Ogrodnik", salaryRange: [1500, 3000] },
//   { name: "Zegarmistrz", salaryRange: [2000, 4000] },
//   { name: "Fryzjer", salaryRange: [1500, 4000] },
//   { name: "Kosmetolog", salaryRange: [2000, 5000] },
//   { name: "Kierownik budowy", salaryRange: [8000, 15000] },
//   { name: "Rzeźnik", salaryRange: [2000, 4000] },
//   { name: "Sędzia", salaryRange: [20000, 30000] },
//   { name: "Pilot dronów", salaryRange: [3000, 6000] },
//   { name: "Analityk danych", salaryRange: [7000, 15000] },
//   { name: "Astronom", salaryRange: [10000, 30000] },
//   { name: "Pilot wycieczek", salaryRange: [2000, 4000] },
//   { name: "Ratownik", salaryRange: [2000, 5000] },
//   { name: "Instruktor jazdy", salaryRange: [3000, 6000] },
//   { name: "Geolog", salaryRange: [5000, 10000] },
//   { name: "Meteorolog", salaryRange: [7000, 15000] },
//   { name: "Fotograf", salaryRange: [2000, 8000] },
//   { name: "Filmowiec", salaryRange: [3000, 9000] },
//   { name: "Reżyser", salaryRange: [10000, 50000] },
// ];

const professions = [
  {
    name: "Policjant",
    salaryRange: [10000, 15000],
    image: "policeman.jpg",
    description: "Stróż prawa dbający o bezpieczeństwo na ulicach.",
    water: 3,
    food: 3000,
    bonusChance: 20,
    otherSkills: ["<span>📈</span> Szansa na większy zarobek"],
  },
  {
    name: "YouTuber",
    salaryRange: [1000, 150000],
    image: "youtuber.jpg",
    description: "Nagrywa i montuje filmy. Lubi dostawać suby i łapki w górę.",
    water: 3,
    food: 2000,
    bonusChance: 30,
    otherSkills: ["<span>🖤</span> Większa utrata zdrowia"],
  },
  {
    name: "Strażak",
    salaryRange: [9000, 14000],
    image: "fireman.jpg",
    description: "Ratownik gaszący pożary i ratujący ludzi.",
    water: 4,
    food: 3500,
    bonusChance: 10,
    otherSkills: ["<span>🔥</span> większa odporność na ogień"],
  },
  {
    name: "Lekarz",
    salaryRange: [18000, 22000],
    image: "doctor.jpg",
    description: "Specjalista zajmujący się leczeniem pacjentów.",
    water: 2,
    food: 3500,
    bonusChance: 5,
    otherSkills: ["<span>❤️</span> +5% do regeneracji zdrowia"],
  },
  {
    name: "Nauczyciel",
    salaryRange: [7000, 10000],
    image: "teacher.jpg",
    description: "Przekazuje wiedzę kolejnym pokoleniom.",
    water: 2,
    food: 2000,
    bonusChance: 30,
    otherSkills: ["<span>🖤</span> Większa utrata zdrowia"],
  },
  {
    name: "Mechanik",
    salaryRange: [8000, 12000],
    image: "mechanic.jpg",
    description: "Naprawia i konserwuje pojazdy.",
    water: 2,
    food: 2800,
    bonusChance: 5,
    otherSkills: ["<span>🚙</span> -10% do zakupu samochodów"],
  },
  {
    name: "Inżynier",
    salaryRange: [13000, 19000],
    image: "engineer.jpg",
    description: "Projektuje i buduje nowoczesne technologie.",
    water: 3,
    food: 3200,
    bonusChance: 25,
    otherSkills: ["<span>📈</span> Szansa na większy zarobek"],
  },
  {
    name: "Rolnik",
    salaryRange: [6000, 9000],
    image: "farmer.jpg",
    description: "Uprawia ziemię i hoduje zwierzęta.",
    water: 5,
    food: 4000,
    bonusChance: 10,
    otherSkills: [`<span>🥦</span> -25% do cen żywności`],
  },
  {
    name: "Kierowca ciężarówki",
    salaryRange: [9000, 13000],
    image: "truck-driver.jpg",
    description: "Transportuje towary na duże odległości.",
    water: 2,
    food: 3500,
    bonusChance: 20,
    otherSkills: ["<span>🚙</span> -5% do zakupu samochodów"],
  },
  {
    name: "Programista",
    salaryRange: [14000, 20000],
    image: "programmer.jpg",
    description: "Pisze i rozwija oprogramowanie.",
    water: 1,
    food: 1800,
    bonusChance: 35,
    otherSkills: ["<span>🖤</span> Większa utrata zdrowia"],
  },
  {
    name: "Kucharz",
    salaryRange: [7000, 11000],
    image: "cook.jpg",
    description: "Przygotowuje pyszne posiłki dla klientów.",
    water: 3,
    food: 2800,
    bonusChance: 40,
    otherSkills: ["<span>🥦</span> -20% do cen żywności"],
  },
];
