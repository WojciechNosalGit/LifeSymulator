class Salary {
  constructor() {
    this.currentJob = null;
  }

  setJob(job) {
    console.log(job);
    this.currentJob = job;
    this.calcSalary();
  }

  calcSalary() {
    const salary = this.currentJob.salaryRange;
    const max = salary[1];
    const min = salary[0];

    const exponent = this.currentJob.higherSalary ? 0.6 : 1;

    let random = Math.random();
    let weightedRandom = Math.pow(random, exponent);

    let result = Math.floor(weightedRandom * (max - min + 1)) + min;

    console.log(result);
  }
}
