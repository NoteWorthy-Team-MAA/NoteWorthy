var options = document.getElementById("category").options;
for (var i = 0; i < options.length; i++) {
  if (options[i].text == "TRAVEL") {
    options[i].selected = true;
    break;
  }
}
