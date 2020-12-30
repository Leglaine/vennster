const asyncHandler = require("../../utils/async");
const { Err } = require("../../utils/error");
const db = require("../../db");

exports.getActivate = asyncHandler(async (req, res, _next) => {
    const response = await db.query("SELECT * FROM codes WHERE code = $1", [
        req.params.code
    ]);
    if (response["rows"].length < 1) {
        throw new Err("Could not activate account");
    }
    db.query("UPDATE auth SET verified = true WHERE user_id = $1", [
        req.params.id
    ]);
    db.query("DELETE FROM codes WHERE code = $1", [req.params.code]);
    res.redirect("/login");
});
