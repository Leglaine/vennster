exports.getLogout = (req, res, _next) => {
    delete req.session.user;
    res.locals.user = null;
    res.redirect("/login");
};
