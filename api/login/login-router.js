const router = require("express").Router();
const loginController = require("./login-controller");

router.get("/", loginController.getLogin);
router.post("/", loginController.postLogin);

module.exports = router;
