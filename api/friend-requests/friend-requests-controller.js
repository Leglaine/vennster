exports.getFriendRequests = (req, res, next) => {
    res.render("layout", { title: "Friend Requests", main: "friend-requests" });
};
