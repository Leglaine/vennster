const router = require("express").Router();
const signS3Controller = require("./sign-s3-controller");

router.get("/", signS3Controller.getSignS3);

module.exports = router;
