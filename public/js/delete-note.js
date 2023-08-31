document.getElementById("deleteBtn").addEventListener("click", () => {
  fetch("", {
    method: "DELETE",
  })
    .then((res) => window.location.href="/notes")
});


// const notes = await Notes.findAll({
//   order: [['updatedAt', 'DESC']]
// });



// Notes.findAll({ order: [['updatedAt', 'DESC']]});




// fetch("", {
//   method: "POST",
// })
// .then((res) => {
//   Notes.findAll({ order: [['updatedAt', 'ASC']]});
// })