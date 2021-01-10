const router = require("express").Router();
const controller = require("./controller");

router.get("/", controller.getGroups);

module.exports = router;
