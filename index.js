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
  res.render("index", {
    locals: {
      main: "This is the body text of the homepage",
    },
    partials: {
      secondary: "partials/button",
    },
  });
});

app.get("/notes", (req, res) => {
  res.render("notes", {
    partials: {
      noteCard: "partials/noteCard",
    },
  });
});

const mockData = {
  title: "Yes",
  category: "Personal",
  body: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
};

app.get("/notes/:note", async (req, res) => {
  res.render("note", {
    locals: {
      main: mockData,
    },
  });
});

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
