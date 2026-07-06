const db = require("../config/db");

exports.getOrders = (req, res) => {
  const sql = `
    SELECT id, total, order_date
    FROM orders
    ORDER BY order_date DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(results);
  });
};