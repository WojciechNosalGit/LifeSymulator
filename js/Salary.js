class Salary {
  constructor() {
    this.currentJob = null;
    this.bonus = 0;

    this.currentSalary = 0;
  }

  calcSalary(job) {
    this.currentJob = job;
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
  }

  getSalary() {
    return this.currentSalary;
  }
}
