exports.getEditProfile = (req, res, next) => {
  res.render("layout", { title: "Edit Profile", main: "editProfile" });
};
