const router = require("express").Router();
const logoutController = require("./logout-controller");

router.get("/", logoutController.getLogout);

module.exports = router;
