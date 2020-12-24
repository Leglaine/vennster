const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const sessionPool = require("pg").Pool;

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

module.exports = {
  start() {
    return session(sessionConfig);
  },
};
