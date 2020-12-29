const router = require("express").Router();
const editProfileController = require("./edit-profile-controller");
const { requireLogin } = require("../../utils/login");

router.get("/", requireLogin, editProfileController.getEditProfile);
router.post("/", requireLogin, editProfileController.postEditProfile);

module.exports = router;
