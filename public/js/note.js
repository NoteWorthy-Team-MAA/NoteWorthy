var options = document.getElementById("category").options;
for (var i = 0; i < options.length; i++) {
  if (options[i].text == "TRAVEL") {
    options[i].selected = true;
    break;
  }
}

const loadingScreenBtns = document.querySelectorAll(".triggersLoadingScreen");

for (let i = 0; i < loadingScreenBtns.length; i++) {
  loadingScreenBtns[i].addEventListener("click", (e) => {
    document
      .querySelector(".loadingOverlay")
      .classList.replace("d-none", "d-flex");
  });
}
