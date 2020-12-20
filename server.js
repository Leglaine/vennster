const app = require("./app");

const protocol = process.env.PROTOCOL;
const host = process.env.HOST;
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is now running at ${protocol}://${host}:${port}`);
});
