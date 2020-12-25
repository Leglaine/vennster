const router = require("express").Router();
const logoutController = require("./logoutController");

router.get("/", logoutController.getLogout);

module.exports = router;
