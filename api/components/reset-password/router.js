const router = require("express").Router();
const controller = require("./controller");

router.get("/", controller.getResetPassword);
router.post("/", controller.postResetPassword);

module.exports = router;
