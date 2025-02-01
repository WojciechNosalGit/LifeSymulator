class Game {
  constructor() {
    this.pickJobButton = document.getElementById("pick-job");
    this.closeProfessionListButton = document.querySelector(
      ".close-profession-list_button"
    );
    this.profession = new Profession();

    this.initEvents();
  }

  initEvents() {
    this.pickJobButton.addEventListener("click", () =>
      this.profession.showJobsWindow()
    );

    this.closeProfessionListButton.addEventListener("click", () =>
      this.profession.closeJobsWindow()
    );
  }
}

const game = new Game();
