const db = require("../../db");
const asyncHandler = require("../../utils/async");

exports.getUser = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  const response = await db.query("SELECT * FROM users WHERE id = $1", [id]);

  const name = response["rows"][0]["name"];
  const profileImage = response["rows"][0]["profile_image"];

  res.render("layout", {
    title: name,
    main: "profile",
    profileImage: profileImage,
  });
});
