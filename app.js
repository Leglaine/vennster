const express = require("express");
const { handleError, Err } = require("./utils/error");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const sessionPool = require("pg").Pool;
const { requireLogin } = require("./utils/login");
const db = require("./db");
const asyncHandler = require("./utils/async");
const signupRouter = require("./api/signup/signupRouter");
const loginRouter = require("./api/login/loginRouter");
const signS3Router = require("./api/sign-s3/signS3Router");

app = express();
app.set("view engine", "ejs");

const sessionDBaccess = new sessionPool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    sslmode: "require",
    rejectUnauthorized: false,
  },
});

const sessionConfig = {
  store: new pgSession({
    pool: sessionDBaccess,
    tableName: "sessions",
  }),
  name: "SID",
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    sameSite: true,
    secure: false,
  },
};

// Allow express to parse form input
app.use(express.urlencoded({ extended: true }));

app.use(session(sessionConfig));

app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

app.get("/", requireLogin, (_req, res, _next) => {
  res.render("layout", { title: "Home", main: "index" });
});

app.use("/sign-s3", signS3Router);

app.use("/signup", signupRouter);

app.use("/login", loginRouter);

app.get("/logout", (req, res, _next) => {
  delete req.session.user;
  res.locals.user = null;
  res.redirect("/login");
});

app.get("/account", requireLogin, (_req, res, _next) => {
  res.render("layout", { title: "Account", main: "account" });
});

app.get(
  "/activate/:id/:code",
  asyncHandler(async (req, res, _next) => {
    const response = await db.query("SELECT * FROM codes WHERE code = $1", [
      req.params.code,
    ]);
    if (response["rows"].length < 1) {
      throw new Err("Could not activate account");
    }
    db.query("UPDATE auth SET verified = true WHERE user_id = $1", [
      req.params.id,
    ]);
    db.query("DELETE FROM codes WHERE code = $1", [req.params.code]);
    res.redirect("/login");
  })
);

app.use("/public", express.static(__dirname + "/public"));

app.get("*", (_req, res, _next) => {
  res.render("layout", {
    title: "Error",
    main: "error",
    code: "404",
    message: "Not Found",
  });
});

app.use((err, _req, res, _next) => {
  handleError(err, res);
});

module.exports = app;
