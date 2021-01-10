const router = require("express").Router();
const controller = require("./controller");

router.get("/:id/:code", controller.getActivate);

module.exports = router;
