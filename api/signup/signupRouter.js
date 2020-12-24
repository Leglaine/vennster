const router = require("express").Router();
const signupController = require("./signupController");

router.get("/", signupController.getSignup);
router.post("/", signupController.postSignup);

module.exports = router;
