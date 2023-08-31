document.getElementById("deleteBtn").addEventListener("click", () => {
  fetch("", {
    method: "DELETE",
  })
    .then((res) => window.location.href="/notes")
});

