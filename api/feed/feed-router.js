const router = require("express").Router();
const feedController = require("./feed-controller");
const { requireLogin } = require("../../utils/login");

router.get("/", requireLogin, feedController.getFeed);

module.exports = router;
