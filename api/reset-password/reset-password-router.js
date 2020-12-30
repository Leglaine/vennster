const router = require("express").Router();
const resetPasswordController = require("./reset-password-controller");

router.get("/", resetPasswordController.getResetPassword);
router.post("/", resetPasswordController.postResetPassword);

module.exports = router;
