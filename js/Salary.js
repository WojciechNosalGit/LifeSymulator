class Salary {
  constructor() {
    this.curentSalaryElement = document.querySelector(".current-salary");

    this.currentJob = null;
    this.bonus = 0;

    this.currentSalary = 0;
  }

  setJob(job) {
    this.currentJob = job;
    this.calcSalary();
  }

  calcSalary() {
    if (!this.currentJob) {
      throw new Error("No job selected");
    }

    const salary = this.currentJob.salaryRange;
    const max = salary[1];
    const min = salary[0];

    const exponent = this.currentJob.higherSalary ? 0.6 : 1;

    let random = Math.random();
    let weightedRandom = Math.pow(random, exponent);

    let result = Math.floor(weightedRandom * (max - min + 1)) + min;

    this.currentSalary = result;

    this.displaySalary();
  }

  displaySalary() {
    this.curentSalaryElement.textContent = `Zarobisz ${this.currentSalary} zł`;
  }

  getSalary() {
    return this.currentSalary;
  }
}
