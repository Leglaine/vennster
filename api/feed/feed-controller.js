exports.getFeed = (req, res, next) => {
    res.render("layout", { title: "Feed", main: "feed" });
};
