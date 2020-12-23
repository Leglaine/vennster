const app = require("./app");

const protocol = process.env.PROTOCOL;
const host = process.env.HOST;

/*
The port is set here instead of in the
.env file in order to mimic the production
environment as closely as possible, as
Heroku sets it automatically.
*/

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is now running at ${protocol}://${host}:${port}`);
});
