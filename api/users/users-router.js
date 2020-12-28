const router = require("express").Router();
const usersController = require("./users-controller");

router.get("/:id", usersController.getUser);

module.exports = router;
