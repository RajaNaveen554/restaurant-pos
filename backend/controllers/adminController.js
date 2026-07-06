const db = require("../config/db");

// Get all menu items
exports.getMenu = (req, res) => {
  db.query("SELECT * FROM menu_items", (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json(results);
  });
};

// Add new menu item
exports.addMenuItem = (req, res) => {
  const { name, category, price } = req.body;

  db.query(
    "INSERT INTO menu_items (name, category, price) VALUES (?, ?, ?)",
    [name, category, price],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Menu item added successfully!"
      });
    }
  );
};

// Update menu item
exports.updateMenuItem = (req, res) => {
  const { id } = req.params;
  const { name, category, price } = req.body;

  db.query(
    "UPDATE menu_items SET name=?, category=?, price=? WHERE id=?",
    [name, category, price, id],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Menu item updated successfully!"
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
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Menu item deleted successfully!"
      });
    }
  );
};