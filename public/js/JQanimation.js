$(document).ready(() => {
  if ($(".message-popup") !== undefined) {
    setTimeout(() => {
      $(".message-popup").animate({
        top: "-200px",
        opacity: 0,
        display: "none",
      });
    }, 1500);
  }
});
