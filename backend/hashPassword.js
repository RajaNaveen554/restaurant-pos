const bcrypt = require("bcryptjs");

// Change this to the password you want
const password = "user123";

const hash = bcrypt.hashSync(password, 10);

console.log("Hashed Password:");
console.log(hash);