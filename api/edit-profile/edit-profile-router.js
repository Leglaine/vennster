const router = require("express").Router();
const editProfileController = require("./edit-profile-controller");

router.get("/", editProfileController.getEditProfile);
router.post("/", editProfileController.postEditProfile);

module.exports = router;
