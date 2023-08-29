const express = require("express");
const es6Renderer = require("express-es6-template-engine");
const { getAllNotes, getNote } = require("./queries/db");

const PORT = 3000;
const app = express();

app.engine("html", es6Renderer);
app.set("view engine", "html");
app.use(express.json());
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("landing", {
    locals: {
      main: "This is the body text of the homepage",
    },
    partials: {
      secondary: "partials/button",
    },
  });
});

app.get("/notes", async (req, res) => {
  res.render("notes", {
    locals: {
      allNotes: await getAllNotes(),
    },
    partials: {
      noteCard: "partials/noteCard",
    },
  });
});

app.get("/notes/:note", async (req, res) => {
  const { note } = req.params;
  res.render("note", {
    locals: {
      main: await getNote(note, 1),
    },
  });
});

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
