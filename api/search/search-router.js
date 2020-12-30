const router = require("express").Router();
const searchController = require("./search-controller");

router.get("/", searchController.getSearch);

module.exports = router;
