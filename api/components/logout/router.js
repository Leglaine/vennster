const router = require("express").Router();
const controller = require("./controller");

router.get("/", controller.getLogout);

module.exports = router;
