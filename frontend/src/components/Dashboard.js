import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

function Dashboard() {
  const [summary, setSummary] = useState({
    totalOrders: 0,
    totalSales: 0,
    totalMenuItems: 0,
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/dashboard/summary")
      .then((res) => {
        setSummary(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="dashboard">
      <h1>📊 Dashboard</h1>

      <div className="cards">
        <div className="card-box">
          <h2>{summary.totalOrders}</h2>
          <p>Total Orders</p>
        </div>

        <div className="card-box">
          <h2>₹{summary.totalSales}</h2>
          <p>Total Sales</p>
        </div>

        <div className="card-box">
          <h2>{summary.totalMenuItems}</h2>
          <p>Menu Items</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;