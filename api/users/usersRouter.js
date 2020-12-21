const router = require("express").Router();
const usersController = require("./usersController");

router.post("/", usersController.createUser);

module.exports = router;
