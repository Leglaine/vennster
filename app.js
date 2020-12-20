const express = require("express");
const { Pool } = require("pg");

app = express();
app.set("view engine", "ejs");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.connect((err) => {
  if (err) throw err;
  console.log("Database connection successfully established");
});

app.get("/", (req, res, next) => {
  res.render("index");
});

app.use("/public", express.static(__dirname + "/public"));

app.get("*", (req, res, next) => {
  res.render("error", { code: "404", message: "Not Found" });
});

module.exports = app;
