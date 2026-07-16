exports.login = (req, res) => {
  const { username, password } = req.body;

  console.log("Username:", username);
  console.log("Password:", password);

  db.query(
    "SELECT * FROM users WHERE username=?",
    [username],
    (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Database Error" });
      }

      console.log("DB Result:", results);

      if (results.length === 0) {
        return res.status(401).json({
          message: "Invalid Username or Password",
        });
      }

      const user = results[0];

      console.log("Stored Hash:", user.password);

      const isMatch = bcrypt.compareSync(password, user.password);

      console.log("Password Match:", isMatch);

      if (!isMatch) {
        return res.status(401).json({
          message: "Invalid Username or Password",
        });
      }

      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
          role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "2h" }
      );

      res.json({
        success: true,
        token,
        role: user.role,
        name: user.username,
      });
    }
  );
};