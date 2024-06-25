const noteTheme = localStorage.getItem("theme");

const max_length = 37;
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
  setup: function (ed) {
    ed.on("keypress", function (event) {
      const content = tinymce.activeEditor
        .getContent()
        .replace(/(<([^>]+)>)/gi, "");
      if (content.length >= max_length) {
        return false;
      }
    });
  },
});

const mx_length = 10000;
const bodyPromise = tinymce.init({
  id: "bodyArea",
  selector: "textarea#body",
  skin: noteTheme === "dark" ? "oxide-dark" : "oxide",
  content_css:
    noteTheme === "dark"
      ? ["../public/css/note.css", "dark"]
      : "../public/css/note.css",
  toolbar:
    "blocks | bold italic underline strikethrough bullist link codesample image",
  menubar: false,
  statusbar: false,
  setup: function (ed) {
    ed.on("keypress", function (event) {
      const content = tinymce.activeEditor
        .getContent()
        .replace(/(<([^>]+)>)/gi, "");
      if (content.length >= mx_length) {
        return false;
      }
    });
  },
});
