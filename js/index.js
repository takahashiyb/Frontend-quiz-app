import { sendThemePageExit } from "./general.js";

loadCategories();

function loadCategories() {
  fetch("./data.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const quizzes = data.quizzes;

      quizzes.forEach((quiz) => {
        const title = quiz.title;
        const icon = quiz.icon;

        const container = document.getElementById("container-display-category");

        container.innerHTML += `
      <section class="button-choice"
      id="category-${title.toLowerCase()}" 
      class="wrapper-display-category" 
      role="link" 
      data-category="${title.toLowerCase()}">
        <img src="${icon}" alt="icon ${title.toLowerCase()}" />
        <span class="font-color-1">${title}</span>
      </section>
      `;
      });

      quizzes.forEach((quiz) => {
        const title = quiz.title;

        const section = document.getElementById(
          `category-${title.toLowerCase()}`
        );

        section.addEventListener("click", () => {
          window.location.href = `./html/quiz-page.html?key=${title.toLowerCase()}&theme=${sendThemePageExit()}`;
        });
      });
    });
}
