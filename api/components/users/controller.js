const db = require("../../db");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const { Err } = require("../../helpers/error");
const { DateTime } = require("luxon");
const { sendVerificationEmail } = require("../../helpers/email");

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

exports.createUser = asyncHandler(async (req, res, _next) => {
    const {
        name,
        email,
        password,
        confirmation,
        birthYear,
        birthMonth,
        birthDate
    } = req.body;

    if (!name) {
        throw new Err("Name is required", 403);
    }

    if (!email) {
        throw new Err("Email is required", 403);
    }

    if (!password) {
        throw new Err("Password is required", 403);
    }

    if (!confirmation) {
        throw new Err("Password confirmation is required", 403);
    }

    if (!birthYear) {
        throw new Err("Birth year is required", 403);
    }

    if (!birthMonth) {
        throw new Err("Birth month is required", 403);
    }

    if (!birthDate) {
        throw new Err("Birth date is required", 403);
    }

    const response = await db.query("SELECT * FROM auth WHERE email = $1", [
        email
    ]);

    if (response["rows"].length > 0) {
        throw new Err("A user with that email already exists", 409);
    }

    if (confirmation !== password) {
        throw new Err("Password must match confirmation", 403);
    }

    const birthday = `${birthYear}-${birthMonth}-${birthDate}`;

    const format = {
        year: birthYear,
        month: birthMonth,
        day: birthDate
    };

    let age = await DateTime.fromObject(format).diffNow("years").years;

    age = -age;

    if (age < 13) {
        throw new Err("You must be at least 13 years old", 403);
    }

    const hash = await bcrypt.hash(password, 10);

    const client = await db.getClient();

    try {
        await client.query("BEGIN");
        const user = await client.query(
            "INSERT INTO users (name, birthday) VALUES ($1, $2) RETURNING id",
            [name, birthday]
        );

        const id = user["rows"][0]["id"];

        await client.query(
            "INSERT INTO auth (user_id, email, hash) VALUES ($1, $2, $3)",
            [id, email, hash]
        );

        await client.query("COMMIT");
        res.redirect("/login");
        sendVerificationEmail(email, id);
    } catch (err) {
        await client.query("ROLLBACK");
        next(err);
    } finally {
        client.release();
    }
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
