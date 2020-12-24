const router = require("express").Router();
const signS3Controller = require("./signS3Controller");

router.get("/", signS3Controller.getSignS3);

module.exports = router;
