const router = require("express").Router();
const activateController = require("./activateController");

router.get("/:id/:code", activateController.getActivate);

module.exports = router;
