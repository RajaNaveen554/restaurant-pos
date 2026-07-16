const bcrypt = require("bcryptjs");

// Password you want to use
const password = "admin123";

const hash = bcrypt.hashSync(password, 10);

console.log("Hashed Password:");
console.log(hash);