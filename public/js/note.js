
await titlePromise;
await bodyPromise;

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

if (
  document.querySelector(`html`).getAttribute("data-bs-theme") == `dark-mode`
) {
  const iframeArr = document.querySelectorAll(`iframe`);
  for (const e of iframeArr) {
    e.contentDocument
      .querySelector(`html`)
      .setAttribute("data-bs-theme", "dark-mode");
  }
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
