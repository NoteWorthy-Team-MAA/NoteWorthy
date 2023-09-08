document.addEventListener("DOMContentLoaded", () => {
  var options = document.getElementById("category").options;
  const cat = new URLSearchParams(location.search).get("cat").toUpperCase();
  for (var i = 0; i < options.length; i++) {
    if (options[i].text == cat) {
      options[i].selected = true;
      break;
    }
  }
});

await titlePromise;
await bodyPromise;

let iframe = document.querySelector("iframe#body_ifr");
let doc = iframe.contentWindow.document;

let timeout;
const handleKeyUp = (ev) => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    let title = tinymce.get("titleArea").getContent();
    let bodyText = tinymce.get("body").getContent();

    fetch(``, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        category: document.getElementById("category").value,
        body: bodyText,
        autoSave: true,
      }),
    }).then((res) => {});
  }, 2000);
};

const autoSaveSwitch = document.querySelector("#autoSaveSwitch");

let autoSaveValue = parseInt(localStorage.getItem("auto-save"));
if (autoSaveValue === 1) {
  autoSaveSwitch.setAttribute("checked", true);
  doc.addEventListener("keyup", handleKeyUp);
}

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

autoSaveSwitch.addEventListener("click", () => {
  autoSaveValue = parseInt(localStorage.getItem("auto-save"));
  if (!autoSaveValue) {
    localStorage.setItem("auto-save", 1);

    executeAutoSave();
    doc.addEventListener("keyup", handleKeyUp);
  } else {
    localStorage.setItem("auto-save", 0);

    doc.removeEventListener("keyup", handleKeyUp);
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
