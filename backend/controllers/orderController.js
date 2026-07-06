const db = require("../config/db");

exports.placeOrder = (req, res) => {
  const { cart, total } = req.body;

  db.query(
    "INSERT INTO orders (total) VALUES (?)",
    [total],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      const orderId = result.insertId;

      const values = cart.map((item) => [
        orderId,
        item.id,
        item.quantity,
        item.price,
      ]);

      db.query(
        "INSERT INTO order_items (order_id, menu_item_id, quantity, price) VALUES ?",
        [values],
        (err2) => {
          if (err2) {
            return res.status(500).json(err2);
          }

          res.json({
            message: "Order placed successfully!",
          });
        }
      );
    }
  );
};