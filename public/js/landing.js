document.querySelector("#signUpForm").addEventListener("submit", () => {
  document
    .querySelector("#signupSpinner")
    .classList.replace(`d-none`, `d-flex`);
  document.querySelector("#signupSubBtn").classList.add(`d-none`);
});

document.querySelector("#logInForm").addEventListener("submit", () => {
  document.querySelector("#loginSpinner").classList.replace(`d-none`, `d-flex`);
  document.querySelector("#loginSubBtn").classList.add(`d-none`);
});

if (document.querySelector(".incorrectPassPop") == undefined) {
  document.querySelector(`#logoWrap`).classList.replace("col-lg-4", "col-lg-9");
  document.querySelector(`#logoWrap`).classList.replace("col-md-4", "col-md-7");
}
