const db = require("../../db");
const asyncHandler = require("express-async-handler");

exports.getSearch = asyncHandler(async (req, res, next) => {
    const q = req.query.q;
    const results = await db.query("SELECT * FROM users WHERE name ILIKE $1", [
        q
    ]);
    const rows = results["rows"];
    res.render("layout", {
        title: "Search",
        main: "search",
        results: rows
    });
});
