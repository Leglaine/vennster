const router = require("express").Router();
const usersController = require("./users-controller");
const { requireLogin } = require("../../utils/login");

router.get("/:id", requireLogin, usersController.getUser);

module.exports = router;
