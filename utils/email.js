const nodemailer = require("nodemailer");
const crypto = require("crypto");
const db = require("../db");

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

exports.sendVerificationEmail = (email, id) => {
    const code = generateCode();
    db.query("INSERT INTO codes (code) VALUES ($1)", [code]);
    transporter.sendMail({
        from: process.env.MAIL_USER,
        to: email,
        subject: "Please verify your email",
        html: `<a href='${process.env.PROTOCOL}://${process.env.HOST}/activate/${id}/${code}'>Activate</a>`
    });
};
