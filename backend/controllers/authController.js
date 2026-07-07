const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const users = [
  {
    id: 1,
    username: "admin",
    password: bcrypt.hashSync("admin123", 10),
    role: "admin",
  },
  {
    id: 2,
    username: "cashier",
    password: bcrypt.hashSync("cash123", 10),
    role: "cashier",
  },
];

exports.login = (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid Username or Password",
    });
  }

  const isMatch = bcrypt.compareSync(password, user.password);

  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: "Invalid Username or Password",
    });
  }

  // Generate JWT Token
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "2h",
    },
  );
  res.json({
    success: true,
    message: "Login Successful",
    token,
    role: user.role,
  });
};
