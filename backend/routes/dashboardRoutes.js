const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/dashboardController");

router.get("/summary", dashboardController.getSummary);
router.get("/recent-orders", dashboardController.getRecentOrders);

module.exports = router;