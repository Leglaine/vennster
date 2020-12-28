const asyncHandler = require("../../utils/async");
const db = require("../../db");
const bcrypt = require("bcrypt");
const { Err } = require("../../utils/error");

exports.getLogin = (req, res, _next) => {
  delete req.session.user;
  res.locals.user = null;
  res.render("layout", { title: "Log In", main: "login" });
};

exports.postLogin = asyncHandler(async (req, res, next) => {
  delete req.session.user;
  const { email, password } = req.body;

  if (!email) {
    throw new Err("Email is required", 403);
  }

  if (!password) {
    throw new Err("Password is required", 403);
  }

  const response = await db.query("SELECT * FROM auth WHERE email = $1", [
    email,
  ]);

  if (response["rows"].length < 1) {
    throw new Err("Invalid email and/or password", 403);
  }

  const id = response["rows"][0]["user_id"];
  const hash = response["rows"][0]["hash"];

  const matches = await bcrypt.compare(password, hash);

  if (!matches) {
    throw new Err("Invalid email and/or password", 403);
  }

  req.session.user = id;

  res.locals.user = req.session.user;

  res.redirect("/");
});
