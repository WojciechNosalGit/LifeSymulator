class Profession {
  constructor() {
    this.professionListContainer = document.querySelector(
      ".profession-list_container"
    );
    this.professionList = document.getElementById("profession-list");
    this.jobPopupWindow = document.querySelector(".job-popup");

    this.sound = new Sound();

    this.selectedJob = null;

    this.addJobElementsToList();
  }

  formatValueWithSpaces(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  createJobElement({ name, salaryRange, image }) {
    const li = document.createElement("li");
    li.classList.add("profession");

    const img = document.createElement("img");
    img.src = `assets/images/${image}`;
    img.alt = image;

    const div = document.createElement("div");
    div.classList.add("text-content");

    const h2 = document.createElement("h2");
    h2.textContent = name;

    const paragraphSalary = document.createElement("p");
    paragraphSalary.classList.add("salary");

    const salaryText = `Pensja: ${this.formatValueWithSpaces(
      salaryRange[0]
    )} - ${this.formatValueWithSpaces(salaryRange[1])} PLN`;

    paragraphSalary.textContent = salaryText;

    div.appendChild(h2);
    div.appendChild(paragraphSalary);

    li.appendChild(img);
    li.appendChild(div);

    this.professionList.appendChild(li);
  }

  addJobElementsToList() {
    professions.forEach((job) => {
      this.createJobElement(job);
    });
  }

  showJobsWindow() {
    this.professionListContainer.classList.remove("display-none");
    this.setupJobSelectionHandlers();
  }

  closeJobsWindow() {
    this.professionListContainer.classList.add("display-none");
  }

  setupJobSelectionHandlers() {
    const professions = [...document.querySelectorAll("li.profession")];

    professions.forEach((item, index) => {
      item.addEventListener("click", () => {
        this.showBigPictureJob(index);
      });
    });
  }

  showBigPictureJob(index) {
    this.sound.play(this.sound.click);

    const job = professions[index]; //jobList.js
    this.selectedJob = job;

    this.jobPopupWindow.innerHTML = "";

    this.jobPopupWindow.classList.remove("display-none");

    this.jobPopupWindow.innerHTML = this.createJobPopupHTML(job);

    document.querySelector(".job-popup_back").addEventListener("click", (e) => {
      this.closeBigPictureJob();
    });
  }

  createJobPopupHTML(job) {
    const salaryText = `Pensja: ${this.formatValueWithSpaces(
      job.salaryRange[0]
    )} - ${this.formatValueWithSpaces(job.salaryRange[1])} PLN`;

    return `
        <div class="header">
          <img src="assets/images/${job.image}" alt="${job.name}" />
          <div>
            <div class="title">${job.name}</div>
            <div class="salary">${salaryText} PLN</div>
          </div>
        </div>
        <div class="description">
        ${job.description}
        </div>
        <div class="resources">
          <p><span>💧</span> ${job.water} litry dziennie</p>
          <p><span>🍖</span> ${job.food} kcal dziennie</p>
        </div>
        <div class="skills">
          <p><span>🍀</span> Szansa na bonus: <span class="bonus">${
            job.bonusChance
          }%</span></p>
           ${job.otherSkills.map((skill) => `<p>${skill}</p>`).join("")}
        
      </div>
          <div class="button_container">
              <button class="job-popup_back button">Cofnij</button>
              <button class="job-popup_select button">Wybierz</button>
            </div>
      `;
  }

  closeBigPictureJob() {
    this.jobPopupWindow.classList.add("display-none");
    this.jobPopupWindow.innerHTML = "";
  }

  getSelectedJob() {
    return this.selectedJob;
  }
}
