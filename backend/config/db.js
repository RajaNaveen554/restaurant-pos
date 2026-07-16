const mysql = require("mysql2");

console.log("Trying to connect...");

const db = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "",
  database: "restaurant_pos",
  connectTimeout: 5000,
});

db.connect((err) => {
  if (err) {
    console.log("Connection Error:");
    console.log(err);
    return;
  }

  console.log("✅ Connected Successfully");
});

module.exports = db;