const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");

// Get all menu items
router.get("/menu", adminController.getMenu);

// Add new menu item
router.post("/menu", adminController.addMenuItem);

// Update menu item
router.put("/menu/:id", adminController.updateMenuItem);

// Delete menu item
router.delete("/menu/:id", adminController.deleteMenuItem);

module.exports = router;