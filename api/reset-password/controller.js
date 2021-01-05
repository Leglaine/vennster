const { sendNewPassword } = require("../utils/email");

exports.getResetPassword = (req, res, next) => {
    res.render("layout", { title: "Reset Password", main: "reset-password" });
};

exports.postResetPassword = (req, res, next) => {
    const email = req.body.email;
    sendNewPassword(email);
    res.redirect("/login");
};
