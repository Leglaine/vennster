const router = require("express").Router();
const controller = require("./controller");

router.get("/", controller.getSignS3);

module.exports = router;
