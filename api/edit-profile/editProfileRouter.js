const router = require("express").Router();
const editProfileController = require("./editProfileController");

router.get("/", editProfileController.getEditProfile);
router.post("/", editProfileController.postEditProfile);

module.exports = router;
