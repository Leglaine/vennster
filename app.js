const express = require("express");
const { Pool } = require("pg");

app = express();

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

module.exports = app;
