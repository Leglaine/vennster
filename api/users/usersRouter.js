const router = require("express").Router();
const usersController = require("./usersController");

router.post("/", usersController.createUser);
router.post("/login", usersController.login);

module.exports = router;
