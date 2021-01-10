const router = require("express").Router();
const controller = require("./controller");

router.get("/", controller.getFriendRequests);

module.exports = router;
