class Profession {
  constructor(salary) {
    this.profesionListContainer = document.querySelector(
      ".profession-list_container"
    );
    this.professionList = document.getElementById("profession-list");
    this.jobPopupWindow = document.querySelector(".job-popup");

    this.salary = salary;

    this.addJobElementsToList();
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
    paragraphSalary.textContent = `Pensja: ${salaryRange[0]} - ${salaryRange[1]} PLN`;

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
    this.profesionListContainer.classList.remove("display-none");
    this.pickCurrentJobFromList();
  }

  closeJobsWindow() {
    this.profesionListContainer.classList.add("display-none");
  }

  pickCurrentJobFromList() {
    const professions = [...document.querySelectorAll("li")];

    professions.forEach((item, index) => {
      item.addEventListener("click", () => {
        this.showBigPictureJob(index);
      });
    });
  }

  showBigPictureJob(index) {
    const job = professions[index];

    this.jobPopupWindow.classList.remove("display-none");

    const showSkils = () => {
      let text = ``;
      job.otherSkills.forEach((skill) => {
        text += `<p>${skill}</p>`;
      });
      return text;
    };

    this.jobPopupWindow.innerHTML = `
        <div class="header">
          <img src="assets/images/${job.image}" alt="${job.name}" />
          <div>
            <div class="title">${job.name}</div>
            <div class="salary">Pensja: ${job.salaryRange[0]} - ${
      job.salaryRange[1]
    } PLN</div>
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
          ${showSkils()}
        
      </div>
          <div class="button_container">
              <button class="job-popup_back button">Cofnij</button>
              <button class="job-popup_select button">Wybierz</button>
            </div>
      `;

    document.querySelector(".job-popup_back").addEventListener("click", (e) => {
      this.closeBigPictureJob();
    });

    document
      .querySelector(".job-popup_select")
      .addEventListener("click", () => {
        this.selectJob(job);
      });
  }

  closeBigPictureJob() {
    this.jobPopupWindow.classList.add("display-none");
  }

  selectJob(job) {
    this.salary.setJob(job);
    this.closeBigPictureJob();
    this.closeJobsWindow();
  }
}
