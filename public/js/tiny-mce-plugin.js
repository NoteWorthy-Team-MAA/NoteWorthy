// // tinymce.init({
// //   selector: "#mytextarea",
// //   skin: "naked",
// // });

// const dfreeHeaderConfig = {
//   selector: ".dfree-header",
//   menubar: false,
//   inline: true,
//   toolbar: false,
//   plugins: ["quickbars"],
//   quickbars_insert_toolbar: "undo redo",
//   quickbars_selection_toolbar: "italic underline",
// };

// const dfreeBodyConfig = {
//   selector: ".dfree-body",
//   menubar: false,
//   inline: true,
//   plugins: [
//     "autolink",
//     "codesample",
//     "link",
//     "lists",
//     "media",
//     "table",
//     "image",
//     "quickbars",
//     "codesample",
//     "help",
//   ],
//   file_picker_types: "file image media",
//   toolbar: false,
//   quickbars_insert_toolbar: "quicktable image media codesample",
//   quickbars_selection_toolbar:
//     "bold italic underline | blocks | blockquote quicklink",
//   contextmenu: "undo redo | inserttable | cell row column deletetable | help",
//   powerpaste_word_import: "clean",
//   powerpaste_html_import: "clean",
// };

// tinymce.init(dfreeHeaderConfig);
// tinymce.init(dfreeBodyConfig);

const titlePromise = tinymce.init({
  selector: "textarea#titleArea",
  skin: "oxide",
  height: "7vh",
  plugins: "lists code table codesample link",
  content_css: ["../public/css/note.css", "dark"],
  toolbar: false,
  menubar: false,
  statusbar: false,
});

const noteTheme = document.querySelector(`html`).getAttribute("data-bs-theme");

const bodyPromise = tinymce.init({
  selector: "textarea#body",
  skin: noteTheme === "dark-mode" ? "oxide-dark" : "oxide",
  plugins: "lists code table codesample link",
  content_css:
    noteTheme === "dark-mode"
      ? ["../public/css/note.css", "dark"]
      : "../public/css/note.css",
  toolbar:
    "blocks | bold italic underline strikethrough bullist link codesample image",
  menubar: false,
  statusbar: false,
});
