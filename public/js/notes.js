document.addEventListener("DOMContentLoaded", () => {
  let tag = document.querySelectorAll(".tag");

  for (let i = 0; i < tag.length; i++) {
    if (tag[i].innerHTML.toUpperCase() == "PERSONAL") {
      tag[i].style.background = "#FB7777";
    } else if (tag[i].innerHTML.toUpperCase() == "PROFESSIONAL") {
      tag[i].style.background = "#2C9A4B";
    } else if (tag[i].innerHTML.toUpperCase() == "HEALTH") {
      tag[i].style.background = "#0FD5D8";
    } else if (tag[i].innerHTML.toUpperCase() == "SCHOOL") {
      tag[i].style.background = "#0FD5D8";
    } else if (tag[i].innerHTML.toUpperCase() == "TRAVEL") {
      tag[i].style.background = "#6410CF";
    } else if (tag[i].innerHTML.toUpperCase() == "ALL") {
      tag[i].style.background = "#373939";
    }
  }

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
