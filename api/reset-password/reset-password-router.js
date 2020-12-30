const router = require("express").Router();
const resetPasswordController = require("./reset-password-controller");

router.get("/", resetPasswordController.getResetPassword);

module.exports = router;
