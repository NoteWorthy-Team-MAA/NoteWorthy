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
  const { error } = req.query;
  const { exists } = req.query;
  let existsMessage = exists
    ? `<div class="position-absolute translate-middle-x start-50 mt-5" style="z-index: 10;">
    <p class="mb-0 bg-info rounded-3 p-3 text-black shadow-lg">Username&nbsp;Already&nbsp;Exists!</p>
  </div>`
    : "";
  let errorMessage = error
    ? `<div class="position-absolute translate-middle-x start-50 mt-5" style="z-index: 10;">
    <p class="mb-0 bg-info rounded-3 p-3 text-black shadow-lg">Username or Password is Incorrect!</p>
  </div>`
    : "";
  res.render("landing", {
    locals: {
      main: "This is the body text of the homepage",
      errorMessage,
      existsMessage,
    },
    partials: {
      secondary: "partials/button",
    },
  });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.findOne({
    where: {
      username,
    },
  });
  if (user) {
    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
      req.session.user = user;
      res.redirect("/notes");
    } else {
      res.redirect("/?error=true");
    }
  } else {
    res.redirect("/?error=true");
  }
});

app.post("/", async (req, res) => {
  const { username, password, email } = req.body;
  if (username === "" || password === "" || email === "") {
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

        res.redirect("/?exists=true");
      }
    });
  }
});

app.get("/notes", checkAuth, async (req, res) => {
  let sort = req.query.sort;
  let category = req.query.category;
  const { user } = req.session;
  const notes = await getAllNotes(sort, user.id);
  notes.map((note) => {
    // console.log(
    //   new Intl.DateTimeFormat("en-US", {
    //     hour: "numeric",
    //     minute: "2-digit",
    //     month: "short",
    //     year: "numeric",
    //     weekday: "short",
    //     day: "numeric",
    //     hour12: true,
    //   })
    //     .format(note.updatedAt)
    //     .toUpperCase()
    // );
    console.log(note.updatedAt.toLocaleString());
  });
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
});

app.get("/notes/:note", async (req, res) => {
  const save = req.query.save;
  const newNote = req.query.newNoteCreated;
  let saveMessage = save
    ? `<div id="savedPopUp" class="shadow-lg position-absolute translate-middle-x start-50 mt-5" style="z-index: 10;">
  <p class="mb-0 bg-success-subtle rounded-3 p-3 text-black ">Note Saved ✓</p>
</div>`
    : "";
  let newNoteMessage = newNote
    ? `<div id="createdPopUp" class="shadow-lg position-absolute translate-middle-x start-50 mt-5" style="z-index: 10;">
    <p class="mb-0 bg-white rounded-3 p-3 text-black ">Note Created!</p>
  </div>`
    : "";
  const { note } = req.params;
  const { user } = req.session;
  res.render("note", {
    locals: {
      main: await getNote(note, user.id),
      saveMessage,
      newNoteMessage,
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
    } else {
      res.redirect("/");
    }
  });
});

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
