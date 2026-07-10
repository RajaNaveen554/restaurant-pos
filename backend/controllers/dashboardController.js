const db = require("../config/db");

exports.getSummary = (req, res) => {
  const summary = {};

  // Total Orders & Sales
  db.query(
    "SELECT COUNT(*) AS totalOrders, SUM(total) AS totalSales FROM orders",
    (err, orderResult) => {
      if (err) {
        return res.status(500).json(err);
      }

      summary.totalOrders = orderResult[0].totalOrders;
      summary.totalSales = orderResult[0].totalSales || 0;

      // Total Menu Items
      db.query(
        "SELECT COUNT(*) AS totalMenuItems FROM menu_items",
        (err, menuResult) => {
          if (err) {
            return res.status(500).json(err);
          }

          summary.totalMenuItems = menuResult[0].totalMenuItems;

          // Total Users
          db.query(
            "SELECT COUNT(*) AS totalUsers FROM users",
            (err, userResult) => {
              if (err) {
                return res.status(500).json(err);
              }

              summary.totalUsers = userResult[0].totalUsers;

              res.json(summary);
            }
          );
        }
      );
    }
  );
};
// Get Recent Orders
exports.getRecentOrders = (req, res) => {
  const sql = `
    SELECT
      id,
      total,
      payment_method,
      order_date
    FROM orders
    ORDER BY order_date DESC
    LIMIT 5
  `;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(results);
  });
};