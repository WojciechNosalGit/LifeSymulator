class Game {
  constructor() {
    this.pickJobButton = document.getElementById("pick-job");
    this.closeProfessionListButton = document.querySelector(
      ".close-profession-list_button"
    );
    this.salary = new Salary();
    this.profession = new Profession(this.salary);

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
