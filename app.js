const express = require("express");
const { handleError } = require("./utils/error");
const usersRouter = require("./api/users/usersRouter");
const session = require("express-session");
const { requireLogin } = require("./utils/login");

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
