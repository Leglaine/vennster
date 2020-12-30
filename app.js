const express = require("express");
const { handleError } = require("./utils/error");
const session = require("./session");

const accountRouter = require("./api/account/account-router");
const activateRouter = require("./api/activate/activate-router");
const editProfileRouter = require("./api/edit-profile/edit-profile-router");
const feedRouter = require("./api/feed/feed-router");
const friendRequestsRouter = require("./api/friend-requests/friend-requests-router");
const groupsRouter = require("./api/groups/groups-router");
const loginRouter = require("./api/login/login-router");
const logoutRouter = require("./api/logout/logout-router");
const resetPasswordRouter = require("./api/reset-password/reset-password-router");
const searchRouter = require("./api/search/search-router");
const signS3Router = require("./api/sign-s3/sign-s3-router");
const signupRouter = require("./api/signup/signup-router");
const usersRouter = require("./api/users/users-router");

app = express();
app.set("view engine", "ejs");
app.set("views", [
    __dirname + "/views",
    __dirname + "/api/account",
    __dirname + "/api/login",
    __dirname + "/api/search",
    __dirname + "/api/signup",
    __dirname + "/api/users",
    __dirname + "/api/reset-password",
    __dirname + "/api/edit-profile",
    __dirname + "/api/friend-requests",
    __dirname + "/api/groups",
    __dirname + "/api/feed"
]);

// Allow express to parse form input
app.use(express.urlencoded({ extended: true }));

app.use(session.start());

app.use((req, res, next) => {
    res.locals.user = req.session.user;
    next();
});

app.use("/", feedRouter);
app.use("/account", accountRouter);
app.use("/activate", activateRouter);
app.use("/edit-profile", editProfileRouter);
app.use("/friend-requests", friendRequestsRouter);
app.use("/groups", groupsRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/reset-password", resetPasswordRouter);
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
