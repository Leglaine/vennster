const router = require("express").Router();
const controller = require("./controller");
const { requireLogin } = require("../utils/login");

router.get("/", requireLogin, controller.getFeed);

module.exports = router;
