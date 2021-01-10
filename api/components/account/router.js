const router = require("express").Router();
const { requireLogin } = require("../../helpers/login");
const controller = require("./controller");

router.get("/", requireLogin, controller.getAccount);

module.exports = router;
