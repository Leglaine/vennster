const router = require("express").Router();
const editProfileController = require("./editProfileController");

router.get("/", editProfileController.getEditProfile);

module.exports = router;
