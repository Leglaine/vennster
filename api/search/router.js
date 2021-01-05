const router = require("express").Router();
const controller = require("./controller");

router.get("/", controller.getSearch);

module.exports = router;
