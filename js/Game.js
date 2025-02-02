class Game {
  constructor() {
    this.selectJobButton = document.getElementById("pick-job");
    this.quitJobButton = document.getElementById("quit-job");
    this.closeProfessionListButton = document.querySelector(
      ".close-profession-list_button"
    );
    this.accountElement = document.querySelector(".account span");
    this.charakterNameElement = document.querySelector(".character-info h1");
    this.waterLevelElement = document.querySelector(".water-level span");
    this.foodLevelElement = document.querySelector(".food-level span");

    this.currentSalaryElement = document.querySelector(".current-salary");

    this.salary = new Salary();
    this.profession = new Profession();
    this.wallet = new Wallet();

    this.currentJob = null;
    this.currentSalary = 0;
    this.jobTime = 1000 * 5; //milisec*sec*min
    this.jobTimerIndex = null;
    this.isAtWork = false;
    this.waterLevel = 50;
    this.foodLevel = 50;

    this.initEvents();

    this.render();
  }

  initEvents() {
    this.selectJobButton.addEventListener("click", () =>
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

    this.quitJobButton.addEventListener("click", () => {
      console.log("działa");
      clearInterval(this.jobTimerIndex);
      this.render();
    });
  }

  startJob(job) {
    this.isAtWork = true;

    this.profession.closeBigPictureJob();
    this.profession.closeJobsWindow();

    this.salary.setJob(job);
    this.currentSalary = this.salary.getSalary();

    this.charakterNameElement.textContent = `Pracujesz jako ${this.currentJob.name}`;
    this.jobButtonsHandler();

    this.jobTimerIndex = setTimeout(() => {
      this.stopJob();
    }, this.jobTime);
  }

  stopJob() {
    this.isAtWork = false;
    this.wallet.addMoneyToAccount(this.currentSalary);

    this.render();
  }

  jobButtonsHandler() {
    if (this.isAtWork) {
      this.selectJobButton.classList.add("display-none");
      this.quitJobButton.classList.remove("display-none");
    } else {
      this.selectJobButton.classList.remove("display-none");
      this.quitJobButton.classList.add("display-none");
    }
  }

  render() {
    this.isAtWork = false;
    this.jobButtonsHandler();

    this.accountElement.textContent = this.wallet.getAccountValue();
    this.currentSalaryElement.textContent = !this.isAtWork
      ? `Nic nie zarabiasz`
      : this.currentSalary;
    this.charakterNameElement.textContent = `Weź się do roboty!`;
  }
}
