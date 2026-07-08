require("dotenv").config();
const express = require("express");
const cors = require("cors");

const menuRoutes = require("./routes/menuRoutes");
const orderRoutes = require("./routes/orderRoutes");
const historyRoutes = require("./routes/historyRoutes");
const adminRoutes = require("./routes/adminRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/menu", menuRoutes);
app.use("/orders", orderRoutes);
app.use("/history", historyRoutes);
app.use("/admin", adminRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

// Home Route
app.get("/", (req, res) => {
  res.send("Restaurant POS Backend is Running...");
});

// Start Server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});