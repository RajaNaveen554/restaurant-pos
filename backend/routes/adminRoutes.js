const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");

// Get all menu items (No login required)
router.get("/menu", adminController.getMenu);

// Protected Routes (Login Required)

// Add new menu item
router.post("/menu", authMiddleware, adminController.addMenuItem);

// Update menu item
router.put("/menu/:id", authMiddleware, adminController.updateMenuItem);

// Delete menu item
router.delete("/menu/:id", authMiddleware, adminController.deleteMenuItem);

module.exports = router;