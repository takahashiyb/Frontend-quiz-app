const query = window.location.search;

const params = new URLSearchParams(query);

const key = params.get("key");
const theme = params.get("theme");

console.log(key);
console.log(theme);

let current = 0;

let questionsArray = [];

loadPage();

function shuffle(array) {
  // Make a copy if you don’t want to mutate the original
  const arr = array.slice();

  for (let i = arr.length - 1; i > 0; i--) {
    // Pick a random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));

    // Swap elements arr[i] and arr[j]
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}

function loadPage() {
  fetch("../data.json")
    .then((response) => {
      const data = response.json();
      return data;
    })
    .then((data) => {
      const object = data.quizzes.find(
        (object) => object.title.toLowerCase() === key
      );

      console.log(object);

      const title = document.querySelector("h1");

      title.innerHTML = object.title;

      const titleImage = document.querySelector(".header-page img");

      titleImage.src = `.${object.icon}`;

      const questions = object.questions;

      const copyQuestions = [...questions];

      questionsArray = shuffle(copyQuestions);
    })
    .then(() => {
      const indicatorCurrent = document.getElementById("question-current");
      indicatorCurrent.innerHTML = current + 1;

      const indicatorTotal = document.getElementById("question-count");
      indicatorTotal.innerHTML = questionsArray.length;

      const questionDetail = document.querySelector("h2");
      questionDetail.innerHTML = questionsArray[current].question;

      const options = questionsArray[current].options;

      let copyOptions = [...options];

      copyOptions = shuffle(copyOptions);

      for (let i = 0; i < 4; i++) {
        const button = document.getElementById(`button-choice-${i}`);

        button.value = copyOptions[i];

        const info = document.querySelector(`#button-choice-${i} .choice-info`);
        info.innerHTML = copyOptions[i];

        button.addEventListener("click", function () {
          const fieldset = document.getElementById("wrapper-button-choice");

          const previousName = fieldset.dataset.choice;

          if (previousName) {
            const previous = document.getElementById(previousName);

            previous.dataset.selected = "false";
          }

          fieldset.dataset.choice = this.id;

          this.dataset.selected = "true";
        });
      }
    });
}

assignButtonSubmitAnswer();

function assignButtonSubmitAnswer() {}
