const router = require("express").Router();
const friendRequestsController = require("./friend-requests-controller");

router.get("/", friendRequestsController.getFriendRequests);

module.exports = router;
