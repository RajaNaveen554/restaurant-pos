const bcrypt = require("bcryptjs");

console.log("Admin:", bcrypt.hashSync("admin123", 10));
console.log("Cashier:", bcrypt.hashSync("cash123", 10));