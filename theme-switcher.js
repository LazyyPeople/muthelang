function checkTheme() {
  let theme = localStorage.getItem("theme");
  if (theme === null) {
    localStorage.setItem("theme", "light");
    theme = "light";
  }
  let dbLang = localStorage.getItem("lang");
  if(dbLang === null) {
    localStorage.setItem('lang', 'indonesia');
    dbLang = 'indonesia';
  }
  setInterval(() => {
    dbLang = localStorage.getItem("lang");
  }, 1000);
  // get html tag
  let html = document.querySelector("html");
  document
    .querySelector(".muthe")
    .addEventListener("keyup", (e) => changeBahasa(e, dbLang));
  document
    .querySelector(".id")
    .addEventListener("keyup", (e) => changeBahasa(e, dbLang));
  // if theme is set to dark then set the data-theme attribute to dark
  // if (theme === 'dark') {
  //     html.setAttribute('data-theme', 'dark');
  // } else {
  //     html.setAttribute('data-theme', 'light');
  // }
  let themeselect = document.querySelector(".theme");
  themeselect.value = theme;
  html.setAttribute("data-theme", theme);
}

function toggleTheme() {
  let storage_theme = localStorage.getItem("theme");
  let html = document.querySelector("html");
  let checkbox = document.getElementById("switcher");
  // if theme is light then set it to dark
  if (storage_theme === "light" || storage_theme === null) {
    html.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    html.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }
}
function changeTheme(e) {
  let value = e.value;
  console.log(value);
  let html = document.querySelector("html");
  html.setAttribute("data-theme", value);
  localStorage.setItem("theme", value);
}
