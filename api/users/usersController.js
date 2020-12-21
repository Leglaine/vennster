const asyncHandler = require("../../utils/async");
const db = require("../../db");
const bcrypt = require("bcrypt");

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

  // TODO: Ensure all required fields were submitted
  // TODO: Ensure email doesn't already exist
  // TODO: Ensure password matches confirmation
  // TODO: Ensure user is at least 13 years old
  // TODO: Send verification email

  const birthday = `${birthYear}-${birthMonth}-${birthDate}`;

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
