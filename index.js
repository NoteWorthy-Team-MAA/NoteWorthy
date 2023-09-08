const express = require("express");
const es6Renderer = require("express-es6-template-engine");
const {
  getAllNotes,
  getNote,
  updateNote,
  allCategories,
  sortedCategories,
} = require("./queries/db");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const session = require("express-session");
const helmet = require("helmet");
const { Users, Prefs, Notes } = require("./models");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(helmet());
app.engine("html", es6Renderer);
app.set("view engine", "html");
app.use(express.json());
app.use(express.static(__dirname));

app.use(express.urlencoded({ extended: true }));

const SequelizeStore = require("connect-session-sequelize")(session.Store);
const store = new SequelizeStore({ db: Users.sequelize });

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: false,
      maxAge: 2592000000,
    },
  })
);
store.sync();

const checkAuth = (req, res, next) => {
  const pageNeedsLogIn = req.path === "/notes";
  const isLoggedIn = !!req.session.user;
  if (pageNeedsLogIn == isLoggedIn) {
    next();
  } else {
    res.redirect(isLoggedIn ? "/notes" : "/");
  }
};

app.get("/", checkAuth, (req, res) => {
  res.render("landing", {
    locals: {
      main: "This is the body text of the homepage",
    },
    partials: {
      secondary: "partials/button",
    },
  });
});

// app.get("/login", checkAuth, (req,res) =>{});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  const user = await Users.findOne({
    where: {
      username,
    },
  });
  if (user) {
    const isValid = await bcrypt.compare(password, user.password);
    console.log("valid user...checking password");
    if (isValid) {
      console.log("password is good!");
      req.session.user = user;
      res.redirect("/notes");
    } else {
      console.log("but password is wrong");
      res.redirect("/");
    }
  } else {
    console.log("not a valid user");
    res.redirect("/");
  }
});

app.post("/", async (req, res) => {
  const { username, password, email } = req.body;
  if (username === "" || password === "" || email === "") {
    console.log("username, password or email is blank");
  } else {
    bcrypt.hash(password, saltRounds, async function (err, hash) {
      try {
        const newUser = Users.create({
          username,
          email,
          password: hash,
        });
        req.session.user = await newUser;
        res.redirect("/notes");
      } catch (e) {
        if (e.name === "SequelizeUniqueConstraintError") {
        }

        res.redirect("/");
      }
    });
  }
});

app.get("/notes", checkAuth, async (req, res) => {
  let sort = req.query.sort;
  let category = req.query.category;
  const { user } = req.session;
  res.render("notes", {
    locals: {
      allNotes: category
        ? await sortedCategories(category, user.id)
        : await getAllNotes(sort, user.id),
      sortMessage:
        sort === "ASC"
          ? "Sort By Date (Ascending)"
          : "Sort By Date (Descending)",
      rotation: sort === "ASC" ? "rotated-icon" : "",
      allCategories: await allCategories(user.id),
    },
    partials: {
      noteCard: "partials/noteCard",
      removeFilterTag: category ? "partials/tag" : "partials/empty",
    },
  });
  // console.log(await allCategories(user.id));
});

app.get("/notes/:note", async (req, res) => {
  const save = req.query.save;
  let saveMessage = save ? "SAVED" : "";
  const { note } = req.params;
  const { user } = req.session;
  res.render("note", {
    locals: {
      main: await getNote(note, user.id),
      saveMessage,
      // allCategories: await allCategories(),
    },
  });
});

///CREATING NEW NOTE
app.post("/notes", async (req, res) => {
  const newNote = await Notes.create({
    title: "",
    body: "",
    userId: req.session.user.id,
  });
  res.redirect(`/notes/${newNote.id}?newNoteCreated=true`);
});

//UPDATING NOTE
app.post("/notes/:id", async (req, res) => {
  const { id } = req.params;
  const { title, category, body, autoSave } = req.body;
  await updateNote(title, category, body, id);
  autoSave
    ? res.sendStatus(200)
    : res.redirect(`/notes/${id}?save=success&cat=${category}`);
});

app.delete("/notes/:id", async (req, res) => {
  const { id } = req.params;
  const deletedNote = await Notes.destroy({
    where: {
      id,
    },
  });
  res.json(deletedNote);
});

app.post("/logout", (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
});

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
