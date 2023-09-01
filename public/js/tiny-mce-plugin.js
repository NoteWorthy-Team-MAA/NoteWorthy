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

tinymce.init({
  selector: "textarea#title",
  skin: "oxide",
  height: "7vh",
  plugins: "lists code table codesample link",
  content_css: "/public/css/note.css",
  toolbar: false,
  menubar: false,
  statusbar: false,
});

tinymce.init({
  selector: "textarea#body",
  skin: "oxide",
  plugins: "lists code table codesample link",

  toolbar:
    "blocks | bold italic underline strikethrough bullist link codesample image",
  menubar: false,
  statusbar: false,
});
