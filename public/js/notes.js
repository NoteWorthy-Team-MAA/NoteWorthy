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
