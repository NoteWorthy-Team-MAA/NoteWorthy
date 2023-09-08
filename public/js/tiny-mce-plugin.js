const noteTheme = localStorage.getItem("theme");

const titlePromise = tinymce.init({
  id: "titleArea",
  selector: "textarea#titleArea",
  skin: noteTheme === "dark" ? "oxide-dark" : "oxide",
  height: "7vh",
  plugins: "lists code table codesample link",
  content_css:
    noteTheme === "dark"
      ? ["../public/css/note.css", "dark"]
      : "../public/css/note.css",
  toolbar: false,
  menubar: false,
  statusbar: false,
});

const bodyPromise = tinymce.init({
  id: "bodyArea",
  selector: "textarea#body",
  skin: noteTheme === "dark" ? "oxide-dark" : "oxide",
  plugins: "lists code table codesample link",
  content_css:
    noteTheme === "dark"
      ? ["../public/css/note.css", "dark"]
      : "../public/css/note.css",
  toolbar:
    "blocks | bold italic underline strikethrough bullist link codesample image",
  menubar: false,
  statusbar: false,
});
