const db = require("../../db");
const asyncHandler = require("../../utils/async");

exports.getEditProfile = asyncHandler(async (req, res, _next) => {
  const user = await db.query("SELECT * FROM users WHERE id = $1", [
    req.session.user,
  ]);

  const profileImage = user["rows"][0]["profile_image"];

  res.render("layout", {
    title: "Edit Profile",
    main: "edit-profile",
    profileImage: profileImage,
  });
});

exports.postEditProfile = asyncHandler(async (req, res, _next) => {
  const profileImage = req.body["profile-image"];
  await db.query("UPDATE users SET profile_image = $1 WHERE id = $2", [
    profileImage,
    req.session.user,
  ]);
  res.redirect("/edit-profile");
});
