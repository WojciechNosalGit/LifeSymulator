class Salary {
  constructor(salary = 0) {
    this.curentSalaryElement = document.querySelector(".current-salary");

    this.currentJob = null;
    this.bonus = 0;

    this.currentSalary = salary;
    this.displaySalary();
  }

  formatValueWithSpaces(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
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
    console.log(this.currentSalary);
    if (this.currentSalary === 0) {
      this.curentSalaryElement.textContent = `Nic nie zarabiasz`;
    } else {
      this.curentSalaryElement.textContent = `Zarobisz ${this.formatValueWithSpaces(
        this.currentSalary
      )} zł`;
    }
  }

  getSalary() {
    return this.currentSalary;
  }

  toJSON() {
    return {
      currentSalary: this.currentSalary,
    };
  }

  // **ReRender from localStorage**
  static fromJSON(data) {
    console.log(data.currentSalary);
    return new Salary(data.currentSalary);
  }
}
