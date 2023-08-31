document.addEventListener("DOMContentLoaded", () => {
  let tag = document.querySelectorAll(".tag");

  for (let i = 0; i < tag.length; i++) {
    if (tag[i].innerHTML.toUpperCase() == "PERSONAL") {
      tag[i].style.background = "#FB7777";
    } else if (tag[i].innerHTML.toUpperCase() == "PROFESSIONAL") {
      tag[i].style.background = "#2C9A4B";
    } else if (tag[i].innerHTML.toUpperCase() == "ALL") {
      tag[i].style.background = "#B977FB";
    }
  }

  let sorting = 'ASC'

  document.querySelector("#addBtnWrap").addEventListener("click", (e) => {
    document
      .querySelector(".loadingOverlay")
      .classList.replace("d-none", "d-flex");
  });

  document.querySelector(".logoutBtn").addEventListener("click", (e) => {
    document
      .querySelector(".loadingOverlay")
      .classList.replace("d-none", "d-flex");
    document.querySelector(".btn-close").click();
  });

  const allNoteArr = document.querySelectorAll(".noteLink");

  for (let i = 0; allNoteArr.length > i; i++) {
    allNoteArr[i].addEventListener("click", () => {
      document
        .querySelector(".loadingOverlay")
        .classList.replace("d-none", "d-flex");
    });
  }


  document.querySelector("#filterByDateText").addEventListener("click", (e) => {
    if (e.target.innerText == "Sort By Date (Descending)") {
      e.target.innerText = "Sort By Date (Ascending)";
      sorting = 'ASC'
    } else {
      e.target.innerText = "Sort By Date (Descending)";
      sorting = 'DESC'
    }
    document.querySelector("#filterByDate").classList.toggle("rotated-icon");
    fetch("", {
      method: "GET",
    })
      .then((res) => window.location.href=`/notes?sort=${sorting}`)
  });
});


