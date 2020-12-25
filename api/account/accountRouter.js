const router = require("express").Router();
const { requireLogin } = require("../../utils/login");
const accountController = require("./accountController");

router.get("/", requireLogin, accountController.getAccount);

module.exports = router;
