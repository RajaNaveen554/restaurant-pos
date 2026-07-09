import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";
import SalesChart from "./SalesChart";
import PaymentChart from "./PaymentChart";
import TopFoods from "./TopFoods";
import RecentOrders from "./RecentOrders";
import {
  FaShoppingCart,
  FaRupeeSign,
  FaUtensils,
  FaUsers,
} from "react-icons/fa";

function Dashboard() {
  const [summary, setSummary] = useState({
    totalOrders: 0,
    totalSales: 0,
    totalMenuItems: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/dashboard/summary")
      .then((res) => {
        setSummary(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="dashboard">
      <h1>📊 Restaurant Dashboard</h1>

      {/* Dashboard Cards */}
      <div className="dashboard-grid">
        <div className="dashboard-card orders">
          <div className="icon">
            <FaShoppingCart />
          </div>

          <div>
            <h2>{summary.totalOrders}</h2>
            <p>Total Orders</p>
          </div>
        </div>

        <div className="dashboard-card sales">
          <div className="icon">
            <FaRupeeSign />
          </div>

          <div>
            <h2>₹{summary.totalSales}</h2>
            <p>Total Sales</p>
          </div>
        </div>

        <div className="dashboard-card menu">
          <div className="icon">
            <FaUtensils />
          </div>

          <div>
            <h2>{summary.totalMenuItems}</h2>
            <p>Menu Items</p>
          </div>
        </div>

        <div className="dashboard-card users">
          <div className="icon">
            <FaUsers />
          </div>

          <div>
            <h2>{summary.totalUsers || 0}</h2>
            <p>Total Users</p>
          </div>
        </div>
      </div>

      {/* Weekly Sales Chart */}
      <div className="chart-section">
        <SalesChart />
      </div>
      <div className="bottom-dashboard">
        <PaymentChart />

        <TopFoods />
      </div>
      <RecentOrders />
    </div>
  );
}

export default Dashboard;
