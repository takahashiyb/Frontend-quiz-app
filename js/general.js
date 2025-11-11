const query = window.location.search;

const param = new URLSearchParams(query);

const theme = param.get("theme");

export function displayCategoryHeader(object) {
  const title = document.querySelector("h1");

  title.innerHTML = object.title;

  const header = document.getElementById("wrapper-display-category");

  header.classList.add(object.title.toLowerCase());

  const titleImage = document.querySelector(".header-page img");

  titleImage.src = `.${object.icon}`;
}

displayTheme(theme);

function displayTheme(theme) {
  if (theme === "dark") {
    document.querySelector("body").classList.add(theme);
  }
}

const switchTheme = document.getElementById("wrapper-switch-color-mode");

switchTheme.addEventListener("click", () => {
  toggleSwitchTheme();
});

function toggleSwitchTheme() {
  const element = document.querySelector("body");

  element.classList.toggle("dark");
}

export function sendThemePageExit() {
  const body = document.querySelector("body");
  let theme = "";
  if (body.classList.contains("dark")) {
    theme = "dark";
  }

  return theme;
}
