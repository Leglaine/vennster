const router = require("express").Router();
const controller = require("./controller");

router.get("/", controller.getLogin);
router.post("/", controller.postLogin);

module.exports = router;
