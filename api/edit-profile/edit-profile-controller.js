const db = require("../../db");

exports.getEditProfile = (req, res, next) => {
  res.render("layout", { title: "Edit Profile", main: "edit-profile" });
};

exports.postEditProfile = (req, res, next) => {
  const url = req.body["profile-image"];
  db.query("UPDATE users SET profile_image = $1 WHERE id = $2", [
    url,
    req.session.user,
  ]);
  res.redirect("/edit-profile");
};
