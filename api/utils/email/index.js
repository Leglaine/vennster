const nodemailer = require("nodemailer");
const crypto = require("crypto");
const db = require("../db");
const asyncHandler = require("express-async-handler");
const { hash } = require("bcrypt");

const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

generateCode = () => {
    return crypto.randomBytes(8).toString("hex");
};

exports.sendVerificationEmail = asyncHandler(async (email, id) => {
    const code = generateCode();
    await db.query("INSERT INTO codes (code) VALUES ($1)", [code]);
    transporter.sendMail({
        from: process.env.MAIL_USER,
        to: email,
        subject: "Please verify your email",
        html: `<a href='${process.env.PROTOCOL}://${process.env.HOST}/activate/${id}/${code}'>Activate</a>`
    });
});

exports.sendNewPassword = asyncHandler(async email => {
    const password = generateCode();
    const hashed = await hash(password, 10);
    await db.query("UPDATE auth SET hash = $1 WHERE email = $2", [
        hashed,
        email
    ]);
    transporter.sendMail({
        from: process.env.MAIL_USER,
        to: email,
        subject: "Password Reset",
        html: `<p>Your new password is: ${password}</p>`
    });
});
