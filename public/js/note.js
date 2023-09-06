await titlePromise;
await bodyPromise;

if (localStorage.getItem("theme") === "dark") {
  document.querySelector("html").setAttribute("data-bs-theme", "dark-mode");
  document.querySelector("#themeSwitch").setAttribute("checked", true);
  for (let e of document.querySelectorAll(".micIconImg")) {
    e.setAttribute("src", "../public/img/miceWhite.svg");
  }
  document
    .querySelector(`.backBtnImg`)
    .setAttribute("src", "../public/img/backBtn.svg");
  document
    .querySelector(`.cogImg`)
    .setAttribute("src", "../public/img/cogDesktop.svg");
}

document.querySelector("#themeSwitch").addEventListener("click", () => {
  if (document.querySelector("#themeSwitch").checked) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
  document.querySelector("#saveBtnAction").click();
});

document.addEventListener("DOMContentLoaded", () => {
  var options = document.getElementById("category").options;
  const cat = new URLSearchParams(location.search).get("cat").toUpperCase();
  console.log(cat);
  for (var i = 0; i < options.length; i++) {
    if (options[i].text == cat) {
      options[i].selected = true;
      break;
    }
  }
});

const loadingScreenBtns = document.querySelectorAll(".triggersLoadingScreen");

for (let i = 0; i < loadingScreenBtns.length; i++) {
  loadingScreenBtns[i].addEventListener("click", (e) => {
    document
      .querySelector(".loadingOverlay")
      .classList.replace("d-none", "d-flex");
  });
}
