document.addEventListener("DOMContentLoaded", () => {
  let tag = document.querySelectorAll(".tag");
  for (let i = 0; i < tag.length; i++) {
    let cat = document.querySelectorAll(".tag .category");
    for (let j = 0; j < cat.length; j++) {
      if (cat[i].innerHTML.toUpperCase() == "PERSONAL") {
        tag[i].style.background = "#FB7777";
      } else if (cat[i].innerHTML.toUpperCase() == "PROFESSIONAL") {
        tag[i].style.background = "#2C9A4B";
      } else if (cat[i].innerHTML.toUpperCase() == "HEALTH") {
        tag[i].style.background = "#0FD5D8";
      } else if (cat[i].innerHTML.toUpperCase() == "SCHOOL") {
        tag[i].style.background = "#ff00dc";
      } else if (cat[i].innerHTML.toUpperCase() == "TRAVEL") {
        tag[i].style.background = "#6410CF";
      } else if (cat[i].innerHTML.toUpperCase() == "NO CATEGORY") {
        tag[i].style.background = "#ff7e00";
      }
    }
  }

  if (document.querySelector(`.noteLink`) == null) {
    document.querySelector(`#filterRow`).classList.add("d-none");
  } else {
    document.querySelector(`#filterRow`).classList.remove("d-none");
  }

  window.addEventListener("pageshow", () => {
    document
      .querySelector(".loadingOverlay")
      .classList.replace("d-flex", "d-none");
  });

  document.querySelector(".logoutBtn").addEventListener("click", (e) => {
    document
      .querySelector(".loadingOverlay")
      .classList.replace("d-none", "d-flex");
    document.querySelector(".btn-close").click();
  });

  const loadingScreenBtns = document.querySelectorAll(".triggersLoadingScreen");

  for (let i = 0; i < loadingScreenBtns.length; i++) {
    loadingScreenBtns[i].addEventListener("click", (e) => {
      document
        .querySelector(".loadingOverlay")
        .classList.replace("d-none", "d-flex");
    });
  }

  // Correcting the last updated format
  const lastUpdated = document.querySelectorAll(".lastUpdated");

  for (let i = 0; i < lastUpdated.length; i++) {
    const newDate = new Date(lastUpdated[i].textContent)
      .toLocaleString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      })
      .toUpperCase();
    lastUpdated[i].textContent = newDate;
  }
});

document.querySelector("#filterByDateText").addEventListener("click", (e) => {
  document.querySelector("#filterByDate").classList.toggle("rotated-icon");
  fetch("", {
    method: "GET",
  }).then((res) => {
    if (window.location.search === "?sort=ASC") {
      window.location.href = `/notes?sort=DESC`;
    } else {
      window.location.href = `/notes?sort=ASC`;
    }
  });
});

if (
  document.querySelector(`html`).getAttribute("data-bs-theme") == `dark-mode`
) {
  document
    .querySelector(`#addBtnImg`)
    .setAttribute(`src`, "../public/img/addBtnWhite.svg");
  document
    .querySelector(`#mobileSearchImg`)
    .setAttribute(`src`, "../public/img/desktopSearch.svg");
  document
    .querySelector(`#optionsMobileImg`)
    .setAttribute(`src`, "../public/img/cogDesktop.svg");
  document
    .querySelector(`#addBtnDesktop`)
    .setAttribute(`src`, "../public/img/addBtnWhite.svg");
  document
    .querySelector(`#headerWrapOffcanvas`)
    .querySelector(`button`)
    .classList.add("btn-close-white");
}

if (localStorage.getItem("theme") === "dark") {
  document.querySelector("html").setAttribute("data-bs-theme", "dark-mode");
  document.querySelector("#themeSwitch").setAttribute("checked", true);
  for (let e of document.querySelectorAll(".addBtnIconImg")) {
    e.setAttribute("src", "../public/img/addBtnWhite.svg");
  }
  document
    .querySelector(`#mobileSearchImg`)
    .setAttribute("src", "../public/img/desktopSearch.svg");
  document
    .querySelector(`#optionsMobileImg`)
    .setAttribute("src", "../public/img/cogDesktop.svg");
}

document.querySelector("#themeSwitch").addEventListener("click", () => {
  if (document.querySelector("#themeSwitch").checked) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
  location.reload();
});
