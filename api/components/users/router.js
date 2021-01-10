const router = require("express").Router();
const controller = require("./controller");
const { requireLogin } = require("../../helpers/login");

router.get("/", requireLogin, controller.getUsers);
router.get("/:id", requireLogin, controller.getUser);

module.exports = router;
