const asyncHandler = require("../../utils/async");
const db = require("../../db");

exports.createUser = asyncHandler(async (req, res, next) => {
  let {
    name,
    email,
    password,
    confirmation,
    birthYear,
    birthMonth,
    birthDate,
  } = req.body;
  let birthday = `${birthYear}-${birthMonth}-${birthDate}`;
  let result = await db.query("SELECT * FROM users");
  res.send(result);
});
