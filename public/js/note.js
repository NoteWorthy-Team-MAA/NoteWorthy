var options = document.getElementById("category").options;
const cat = new URLSearchParams(location.search).get("cat").toUpperCase();
console.log(cat);
for (var i = 0; i < options.length; i++) {
  if (options[i].text == cat) {
    options[i].selected = true;
    break;
  }
}
