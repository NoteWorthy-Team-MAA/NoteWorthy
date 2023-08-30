const express = require("express");
const es6Renderer = require("express-es6-template-engine");
const { getAllNotes, getNote } = require("./queries/db");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const session = require("express-session");
const helmet = require("helmet");
const { Users, Prefs, Notes } = require("./models");

const PORT = 3000;
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

// function checkAuth(req, res, next) {
//   if (req.session.user) {
//     next();
//   } else if (req.path == "/login") {
//     next();
//   } else {
//     res.redirect("/login");
//   }
// }

const checkAuth = (req, res, next) => {
  const pageNeedsLogIn = req.path === "/notes";
  const isLoggedIn = !!req.session.user;
  if (pageNeedsLogIn == isLoggedIn) {
    next();
  } else {
    res.redirect(isLoggedIn ? "/notes" : "/login");
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


app.get("/login", checkAuth, (req, res) => {
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  const user = await Users.findOne({
    where: { username },
  });
  if (user) {
    const isValid = bcrypt.compare(password, user.password);
    console.log("valid user...checking password");
    if (isValid) {
      console.log("password is good!");
      req.session.user = user;
      res.redirect("/notes");
    } else {
      console.log("but password is wrong");
      res.redirect("/login");
    }
  } else {
    console.log("not a valid user");
    res.redirect("/login");
  }
});

app.get("/new", (req, res) => {
});

app.post("/new", async (req, res) => {
  const { username, password, email } = req.body;
  if (username === "" || password === "" || email === "") {
    console.log("username, password or email is blank");
  } else {
    bcrypt.hash(password, saltRounds, function (err, hash) {
      try {
        const newUser = Users.create({
          username,
          email,
          password: hash,
        });
        res.redirect("/");
      } catch (e) {
        if (e.name === "SequelizeUniqueConstraintError") {
        }

        res.redirect("/new");
      }
    });
  }
});

app.get("/notes", checkAuth, async (req, res) => {
  res.render("notes", {
    locals: {
      allNotes: await getAllNotes(req.session.user.id),
    },
    partials: {
      noteCard: "partials/noteCard",
    },
  });
});

app.get("/notes/:note", async (req, res) => {
  const { note } = req.params;
  const { user } = req.session;
  res.render("note", {
    locals: {
      main: await getNote(note, user.id),
    },
  });
});


app.post('/notes', async (req, res) => {
  const { title, body, category, userId  } = req.body;
  const newNote = await Notes.create({
      title,
      body,
      category,
      userId
  });
  
  res.json({
      id: newNote.id
  });
})


app.delete("/notes/:note", async (req, res) => {
  const { note } = req.params;
  res.render("note", {
    locals: {
      main: await deleteNote(note, 1),
    },
  });
});


// app.delete('/notes/:note', async (req, res) => {
//   const { id } = req.params;
//   const deletedNote = await Notes.destroy({
//       where: {
//           id,
//           userId,
//       }
//   });
//   res.json(deletedNote);
// });


// app.delete('/notes/:note', async (req, res) => {
//   const { userId } = req.params;
  
//   try {
//       const deletedNote = await Notes.destroy({
//           where: {
//             id:param,
//               userId
//           }
//       });

//       res.json({
//           message: `${deletedNote} notes deleted for userId ${userId}`
//       });
//   } catch (error) {
//       res.status(500).json({
//           message: 'Error deleting notes',
//           error: error.message
//       });
//   }
// });





app.get("/logout", (req, res) => {
  req.session.destroy(function (err) {
    res.redirect("/");
  });
});

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
