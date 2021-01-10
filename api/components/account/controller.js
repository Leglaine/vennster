exports.getAccount = (_req, res, _next) => {
    res.render("layout", { title: "Account", main: "account" });
};
