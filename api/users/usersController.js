const asyncHandler = require("../../utils/async");
const db = require("../../db");
const bcrypt = require("bcrypt");
const { Err } = require("../../utils/error");
const { DateTime } = require("luxon");

exports.createUser = asyncHandler(async (req, res, next) => {
  const {
    name,
    email,
    password,
    confirmation,
    birthYear,
    birthMonth,
    birthDate,
  } = req.body;

  if (!name) {
    throw new Err("Name is required", 403);
  }

  if (!email) {
    throw new Err("Email is required", 403);
  }

  if (!password) {
    throw new Err("Password is required", 403);
  }

  if (!confirmation) {
    throw new Err("Password confirmation is required", 403);
  }

  if (!birthYear) {
    throw new Err("Birth year is required", 403);
  }

  if (!birthMonth) {
    throw new Err("Birth month is required", 403);
  }

  if (!birthDate) {
    throw new Err("Birth date is required", 403);
  }

  const response = await db.query("SELECT * FROM auth WHERE email = $1", [
    email,
  ]);

  if (response["rows"].length > 0) {
    throw new Err("A user with that email already exists", 409);
  }

  if (confirmation !== password) {
    throw new Err("Password must match confirmation", 403);
  }

  const birthday = `${birthYear}-${birthMonth}-${birthDate}`;

  const age = DateTime.fromISO(birthday).diffNow("years");

  if (age < 13) {
    throw new Err("You must be at least 13 years old", 403);
  }

  // TODO: Send verification email

  const hash = await bcrypt.hash(password, 10);

  const client = await db.getClient();

  try {
    await client.query("BEGIN");
    const user = await client.query(
      "INSERT INTO users (name, birthday) VALUES ($1, $2) RETURNING id",
      [name, birthday]
    );

    const id = user["rows"][0]["id"];

    await client.query(
      "INSERT INTO auth (user_id, email, hash) VALUES ($1, $2, $3)",
      [id, email, hash]
    );

    await client.query("COMMIT");
    res.redirect("/login");
  } catch (err) {
    await client.query("ROLLBACK");
    next(err);
  } finally {
    client.release();
  }
});

exports.login = asyncHandler(async (req, res, next) => {
  delete req.session.user;
  const { email, password } = req.body;
  const response = await db.query("SELECT * FROM auth WHERE email = $1", [
    email,
  ]);

  // TODO: Ensure all required inputs were submitted

  if (response["rows"].length < 1) {
    throw new Err("Invalid email and/or password", 403);
  }

  const id = response["rows"][0]["user_id"];
  const hash = response["rows"][0]["hash"];
  const verified = response["rows"][0]["verified"];

  const matches = await bcrypt.compare(password, hash);

  if (!matches) {
    throw new Err("Invalid email and/or password", 403);
  }

  // if (!verified) {
  //   throw new Err("Please validate your email", 403);
  // }

  req.session.user = id;

  res.locals.user = req.session.user;

  res.redirect("/");
});
