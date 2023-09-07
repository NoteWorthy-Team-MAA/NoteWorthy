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
const iframe = document.querySelector("iframe#body_ifr");
const doc = iframe.contentWindow.document;

doc.body.onkeydown = function () {
  var time = this._time;
  var timestamp = new Date().getTime();
  let timeElapsed = timestamp - time;
  if (timeElapsed > 2000) {
    fetch(``, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: document.getElementById("titleArea").value,
        category: document.getElementById("category").value,
        body: document.getElementById("body").value,
      }),
    }).then((res) => {
      console.log("data saved");
    });
  }
  this._time = timestamp;
};

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
