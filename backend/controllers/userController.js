const db = require("../config/db");
const bcrypt = require("bcryptjs");

// Get all users
exports.getUsers = (req, res) => {
  db.query(
    "SELECT id, username, role FROM users",
    (err, results) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Database Error",
        });
      }

      res.json(results);
    }
  );
};

// Add new user
exports.addUser = (req, res) => {
  const { username, password, role } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);

  db.query(
    "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
    [username, hashedPassword, role],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Failed to add user",
          error: err,
        });
      }

      res.json({
        success: true,
        message: "User added successfully",
      });
    }
  );
};