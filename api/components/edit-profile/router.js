const router = require("express").Router();
const controller = require("./controller");
const { requireLogin } = require("../../helpers/login");

router.get("/", requireLogin, controller.getEditProfile);
router.post("/", requireLogin, controller.postEditProfile);

module.exports = router;
