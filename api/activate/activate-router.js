const router = require("express").Router();
const activateController = require("./activate-controller");

router.get("/:id/:code", activateController.getActivate);

module.exports = router;
