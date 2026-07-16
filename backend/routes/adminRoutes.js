const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

// Get Menu
router.get("/menu", adminController.getMenu);

// Add Food
router.post(
  "/menu",
  authMiddleware,
  upload.single("image"),
  adminController.addMenuItem
);

// Update Food
router.put(
  "/menu/:id",
  authMiddleware,
  upload.single("image"),
  adminController.updateMenuItem
);

// Delete Food
router.delete(
  "/menu/:id",
  authMiddleware,
  adminController.deleteMenuItem
);
router.patch(
  "/menu/:id/status",
  authMiddleware,
  adminController.toggleAvailability
);

module.exports = router;