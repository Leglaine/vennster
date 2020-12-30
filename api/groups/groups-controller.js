exports.getGroups = (req, res, next) => {
    res.render("layout", { title: "Groups", main: "groups" });
};
