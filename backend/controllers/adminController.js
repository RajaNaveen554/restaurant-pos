const db = require("../config/db");

// Get all menu items
exports.getMenu = (req, res) => {
  db.query("SELECT * FROM menu_items", (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Database Error",
      });
    }

    res.json(results);
  });
};

// Add new menu item
exports.addMenuItem = (req, res) => {
  const { name, category, price, available } = req.body;

  // Validation
  if (!name || name.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Menu name is required",
    });
  }

  if (!category || category.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Category is required",
    });
  }

  if (!price || price <= 0) {
    return res.status(400).json({
      success: false,
      message: "Price must be greater than 0",
    });
  }

  const isAvailable = available ?? 1;

  db.query(
    "INSERT INTO menu_items (name, category, price, available) VALUES (?, ?, ?, ?)",
    [name, category, price, isAvailable],
    (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Database Error",
        });
      }

      res.json({
        success: true,
        message: "Menu item added successfully!",
      });
    }
  );
};

// Update menu item
exports.updateMenuItem = (req, res) => {
  const { id } = req.params;
  const { name, category, price, available } = req.body;

  // Validation
  if (!name || name.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Menu name is required",
    });
  }

  if (!category || category.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Category is required",
    });
  }

  if (!price || price <= 0) {
    return res.status(400).json({
      success: false,
      message: "Price must be greater than 0",
    });
  }

  const isAvailable = available ?? 1;

  db.query(
    "UPDATE menu_items SET name=?, category=?, price=?, available=? WHERE id=?",
    [name, category, price, isAvailable, id],
    (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Database Error",
        });
      }

      res.json({
        success: true,
        message: "Menu item updated successfully!",
      });
    }
  );
};

// Delete menu item
exports.deleteMenuItem = (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM menu_items WHERE id=?",
    [id],
    (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Database Error",
        });
      }

      res.json({
        success: true,
        message: "Menu item deleted successfully!",
      });
    }
  );
};