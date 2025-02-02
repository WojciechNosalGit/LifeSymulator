class Game {
  constructor() {
    this.pickJobButton = document.getElementById("pick-job");
    this.closeProfessionListButton = document.querySelector(
      ".close-profession-list_button"
    );
    this.salary = new Salary();
    this.profession = new Profession(this.salary);

    this.currentJob = null;

    this.initEvents();
  }

  initEvents() {
    this.pickJobButton.addEventListener("click", () =>
      this.profession.showJobsWindow()
    );

    this.closeProfessionListButton.addEventListener("click", () =>
      this.profession.closeJobsWindow()
    );

    document.addEventListener("click", (event) => {
      if (event.target.classList.contains("job-popup_select")) {
        this.currentJob = this.profession.getSelectedJob();
        this.startJob(this.currentJob);
      }
    });
  }

  startJob(job) {
    this.salary.setJob(job);
    this.profession.closeBigPictureJob();
    this.profession.closeJobsWindow();
  }

  render() {}
}
