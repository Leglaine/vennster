const express = require("express");
const { handleError } = require("./utils/error");
const usersRouter = require("./api/users/usersRouter");

app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/users", usersRouter);

app.get("/", (req, res, next) => {
  res.render("index");
});

app.get("/signup", (req, res, next) => {
  res.render("signup");
});

app.get("/login", (req, res, next) => {
  res.render("login");
});

app.use("/public", express.static(__dirname + "/public"));

app.get("*", (req, res, next) => {
  res.render("error", { code: "404", message: "Not Found" });
});

app.use((err, req, res, next) => {
  handleError(err, res);
});

module.exports = app;
