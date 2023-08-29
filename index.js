const express = require("express");
const es6Renderer = require("express-es6-template-engine");
const { getAllNotes, getNote } = require("./queries/db");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const session = require("express-session");

const { Users, Prefs, Notes } = require("./models");

const PORT = 3000;
const app = express();

app.engine("html", es6Renderer);
app.set("view engine", "html");
app.use(express.json());
app.use(express.static(__dirname + "/public"));


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

function checkAuth(req, res, next) {
  if (req.session.user) {
    next();
  } else if (req.path == "/login") {
    next();
  } else {
    res.redirect("/login");
  }
}


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

app.get("/login", (req, res) => {
  res.send(`
<h1>Log in</h1>
<form method="POST">
  <label>
    Username:
    <input name="username" type="text" autofocus />
  </label>
  <label>
    Password:
    <input name="password" type="password" />
  </label> 
 <input type="submit" value="do it!" />
</form>
    `);
});


app.post("/login", async (req, res) => {
  const { username, password } = req.body;
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
  res.send(`
<h1>Sign up</h1>
<form method="POST">
  <label>
    Username:
  <input type="text" id="username" name="username" required />
  </label>
  <label>
    Password:
    <input type="text" id="password" name="password" required />
  </label> 
 <input type="submit" value="do it!" />
</form>
    `);
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
        res.redirect("/login");
      } catch (e) {
        if (e.name === "SequelizeUniqueConstraintError") {
        }

        res.redirect("/new");
      }
    });
  }
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


app.get("/logout", (req, res) => {
  req.session.destroy(function (err) {
    res.redirect("/");
  });
});

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
