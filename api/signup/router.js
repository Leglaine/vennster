const router = require("express").Router();
const controller = require("./controller");

router.get("/", controller.getSignup);
router.post("/", controller.postSignup);

module.exports = router;
