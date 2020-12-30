const router = require("express").Router();
const groupsController = require("./groups-controller");

router.get("/", groupsController.getGroups);

module.exports = router;
