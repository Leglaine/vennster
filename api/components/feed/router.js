const router = require("express").Router();
const controller = require("./controller");
const { requireLogin } = require("../../helpers/login");

router.get("/", requireLogin, controller.getFeed);

module.exports = router;
