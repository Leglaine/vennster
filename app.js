const express = require("express");
const { handleError } = require("./utils/error");
const { requireLogin } = require("./utils/login");
const editProfileRouter = require("./api/edit-profile/editProfileRouter");
const signupRouter = require("./api/signup/signupRouter");
const loginRouter = require("./api/login/loginRouter");
const logoutRouter = require("./api/logout/logoutRouter");
const signS3Router = require("./api/sign-s3/signS3Router");
const activateRouter = require("./api/activate/activateRouter");
const accountRouter = require("./api/account/accountRouter");
const usersRouter = require("./api/users/usersRouter");
const session = require("./session");

app = express();
app.set("view engine", "ejs");

// Allow express to parse form input
app.use(express.urlencoded({ extended: true }));

app.use(session.start());

app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

app.get("/", requireLogin, (_req, res, _next) => {
  res.render("layout", { title: "Home", main: "index" });
});

app.use("/account", accountRouter);
app.use("/activate", activateRouter);
app.use("/edit-profile", editProfileRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/sign-s3", signS3Router);
app.use("/signup", signupRouter);
app.use("/users", usersRouter);

app.use("/public", express.static(__dirname + "/public"));

app.get("*", (_req, res, _next) => {
  res.render("layout", {
    title: "Error",
    main: "error",
    code: "404",
    message: "Not Found",
  });
});

app.use((err, _req, res, _next) => {
  handleError(err, res);
});

module.exports = app;
