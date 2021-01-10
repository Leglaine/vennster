const express = require("express");
const { handleError } = require("./api/helpers/error");
const session = require("./api/helpers/session");

const accountRouter = require("./api/components/account/router");
const activateRouter = require("./api/components/activate/router");
const editProfileRouter = require("./api/components/edit-profile/router");
const feedRouter = require("./api/components/feed/router");
const friendRequestsRouter = require("./api/components/friend-requests/router");
const groupsRouter = require("./api/components/groups/router");
const loginRouter = require("./api/components/login/router");
const logoutRouter = require("./api/components/logout/router");
const resetPasswordRouter = require("./api/components/reset-password/router");
const signS3Router = require("./api/components/sign-s3/router");
const signupRouter = require("./api/components/signup/router");
const usersRouter = require("./api/components/users/router");

app = express();
app.set("view engine", "ejs");
app.set("views", `${__dirname}/client/views`);

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
app.use("/sign-s3", signS3Router);
app.use("/signup", signupRouter);
app.use("/users", usersRouter);

app.use("/public", express.static(`${__dirname}/client/public`));

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
