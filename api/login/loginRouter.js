const router = require("express").Router();
const loginController = require("./loginController");

router.get("/", loginController.getLogin);
router.post("/", loginController.postLogin);

module.exports = router;
