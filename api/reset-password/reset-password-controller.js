exports.getResetPassword = (req, res, next) => {
    res.render("layout", { title: "Reset Password", main: "reset-password" });
};
