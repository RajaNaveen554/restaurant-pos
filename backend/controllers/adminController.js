const db = require("../config/db");

// =========================
// Get All Menu Items
// =========================
exports.getMenu = (req, res) => {
  db.query("SELECT * FROM menu_items", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "Database Error",
      });
    }

    res.json(results);
  });
};

// =========================
// Add New Menu Item
// =========================
exports.addMenuItem = (req, res) => {
  const { name, category, price } = req.body;

  const available = Number(req.body.available);
  const image = req.file ? req.file.filename : null;

  if (!name || !category || !price) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  db.query(
    `INSERT INTO menu_items
    (name, category, price, available, image)
    VALUES (?, ?, ?, ?, ?)`,
    [
      name,
      category,
      price,
      available,
      image,
    ],
    (err) => {
      if (err) {
        console.error(err);

        return res.status(500).json({
          success: false,
          message: "Database Error",
        });
      }

      res.json({
        success: true,
        message: "Food Added Successfully",
      });
    }
  );
};

// =========================
// Update Menu Item
// =========================
exports.updateMenuItem = (req, res) => {
  const { id } = req.params;
  const { name, category, price } = req.body;

  const available = Number(req.body.available);
  const image = req.file ? req.file.filename : null;

  if (!name || !category || !price) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  let sql =
    "UPDATE menu_items SET name=?, category=?, price=?, available=?";

  let values = [
    name,
    category,
    price,
    available,
  ];

  // Update image only if a new image is uploaded
  if (image) {
    sql += ", image=?";
    values.push(image);
  }

  sql += " WHERE id=?";
  values.push(id);

  db.query(sql, values, (err) => {
    if (err) {
      console.error(err);

      return res.status(500).json({
        success: false,
        message: "Database Error",
      });
    }

    res.json({
      success: true,
      message: "Food Updated Successfully",
    });
  });
};

// =========================
// Delete Menu Item
// =========================
exports.deleteMenuItem = (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM menu_items WHERE id=?",
    [id],
    (err) => {
      if (err) {
        console.error(err);

        return res.status(500).json({
          success: false,
          message: "Database Error",
        });
      }

      res.json({
        success: true,
        message: "Food Deleted Successfully",
      });
    }
  );
};

// =========================
// Toggle Availability
// =========================
exports.toggleAvailability = (req, res) => {
  const { id } = req.params;
  const { available } = req.body;

  db.query(
    "UPDATE menu_items SET available=? WHERE id=?",
    [available, id],
    (err) => {
      if (err) {
        console.error(err);

        return res.status(500).json({
          success: false,
          message: "Database Error",
        });
      }

      res.json({
        success: true,
        message: "Availability Updated Successfully",
      });
    }
  );
};