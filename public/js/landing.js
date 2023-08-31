const submitBtnArr = document.querySelectorAll(".submitBtn");

document.querySelector("#signUpForm").addEventListener("submit", () => {
  for (let i = 0; i < submitBtnArr.length; i++) {
    submitBtnArr[i].classList.add("spinner-border");
    submitBtnArr[i].classList.remove("btn");
    submitBtnArr[i].innerText = "";
  }
});

document.querySelector("#logInForm").addEventListener("submit", () => {
  for (let i = 0; i < submitBtnArr.length; i++) {
    submitBtnArr[i].classList.add("spinner-border");
    submitBtnArr[i].classList.remove("btn");
    submitBtnArr[i].innerText = "";
  }
});
