const db = require("../config/db");

// Get all menu items
const getMenu = (req, res) => {
  const sql = "SELECT * FROM menu_items";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Database Error",
        error: err,
      });
    }

    res.json(results);
  });
};

// Search menu items
const searchMenu = (req, res) => {
  const { name } = req.query;

  const sql = "SELECT * FROM menu_items WHERE name LIKE ?";

  db.query(sql, [`%${name}%`], (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Database Error",
        error: err,
      });
    }

    res.json(results);
  });
};

module.exports = {
  getMenu,
  searchMenu,
};