let tag = document.querySelectorAll(".tag");

for (let i = 0; i < tag.length; i++) {
  if (tag[i].innerHTML.toUpperCase() == "PERSONAL") {
    tag[i].style.background = "#FB7777";
  } else if (tag[i].innerHTML.toUpperCase() == "PROFESSIONAL") {
    tag[i].style.background = "blue";
  }
}
