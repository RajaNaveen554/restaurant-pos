import React, { useEffect, useState } from "react";
import axios from "axios";
import "./RecentOrders.css";

function RecentOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/dashboard/recent-orders")
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="recent-orders-card">
      <h2>📋 Recent Orders</h2>

      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Total</th>
            <th>Payment</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No Orders Found
              </td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>₹{order.total}</td>
                <td>{order.payment_method}</td>
                <td>
                  {new Date(order.order_date).toLocaleString("en-IN")}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default RecentOrders;