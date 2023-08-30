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
