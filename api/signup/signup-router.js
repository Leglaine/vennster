const router = require("express").Router();
const signupController = require("./signup-controller");

router.get("/", signupController.getSignup);
router.post("/", signupController.postSignup);

module.exports = router;
