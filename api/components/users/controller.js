const db = require("../../db");
const asyncHandler = require("express-async-handler");

exports.getUsers = asyncHandler(async (req, res, _next) => {
    const name = req.query.name;
    const results = await db.query("SELECT * FROM users WHERE name ILIKE $1", [
        name
    ]);
    const rows = results["rows"];
    res.render("layout", {
        title: "Search",
        main: "search",
        results: rows
    });
});

exports.getUser = asyncHandler(async (req, res, _next) => {
    const id = req.params.id;

    const response = await db.query("SELECT * FROM users WHERE id = $1", [id]);

    const name = response["rows"][0]["name"];
    const profileImage = response["rows"][0]["profile_image"];
    const coverImage = response["rows"][0]["cover_image"];
    const bio = response["rows"][0]["bio"];

    res.render("layout", {
        title: name,
        main: "profile",
        profileImage: profileImage,
        coverImage: coverImage,
        bio: bio,
        id: id
    });
});
