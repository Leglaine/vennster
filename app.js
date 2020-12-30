const express = require("express");
const { handleError } = require("./utils/error");
const { requireLogin } = require("./utils/login");
const editProfileRouter = require("./api/edit-profile/edit-profile-router");
const signupRouter = require("./api/signup/signup-router");
const loginRouter = require("./api/login/login-router");
const logoutRouter = require("./api/logout/logout-router");
const signS3Router = require("./api/sign-s3/sign-s3-router");
const activateRouter = require("./api/activate/activate-router");
const accountRouter = require("./api/account/account-router");
const usersRouter = require("./api/users/users-router");
const searchRouter = require("./api/search/search-router");
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
app.use("/search", searchRouter);
app.use("/sign-s3", signS3Router);
app.use("/signup", signupRouter);
app.use("/users", usersRouter);

app.use("/public", express.static(__dirname + "/public"));

app.get("*", (_req, res, _next) => {
    res.render("layout", {
        title: "Error",
        main: "error",
        code: "404",
        message: "Not Found"
    });
});

app.use((err, _req, res, _next) => {
    handleError(err, res);
});

module.exports = app;
