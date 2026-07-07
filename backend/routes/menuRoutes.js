const express = require("express");
const router = express.Router();

const menuController = require("../controllers/menuController");

router.get("/search", menuController.searchMenu);
router.get("/", menuController.getMenu);

module.exports = router;