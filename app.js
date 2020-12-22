const express = require("express");
const { handleError, Err } = require("./utils/error");
const usersRouter = require("./api/users/usersRouter");
const session = require("express-session");
const { requireLogin } = require("./utils/login");
const db = require("./db");
const asyncHandler = require("./utils/async");

app = express();
app.set("view engine", "ejs");

// Allow express to parse form input
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

app.use("/api/v1/users", usersRouter);

app.get("/", requireLogin, (req, res, next) => {
  res.render("layout", { title: "Home", main: "index" });
});

app.get("/signup", (req, res, next) => {
  res.render("layout", { title: "Sign Up", main: "signup" });
});

app.get("/login", (req, res, next) => {
  delete req.session.user;
  res.locals.user = null;
  res.render("layout", { title: "Log In", main: "login" });
});

app.get(
  "/activate/:id/:code",
  asyncHandler(async (req, res, next) => {
    const response = await db.query("SELECT * FROM codes WHERE code = $1", [
      req.params.code,
    ]);
    if (response["rows"].length < 1) {
      throw new Err("Could not activate account");
    }
    db.query("UPDATE auth SET verified = true WHERE user_id = $1", [
      req.params.id,
    ]);
    db.query("DELETE FROM codes WHERE code = $1", [req.params.code]);
    res.redirect("/login");
  })
);

app.use("/public", express.static(__dirname + "/public"));

app.get("*", (req, res, next) => {
  res.render("layout", {
    title: "Error",
    main: "error",
    code: "404",
    message: "Not Found",
  });
});

app.use((err, req, res, next) => {
  handleError(err, res);
});

module.exports = app;
