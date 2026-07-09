import React from "react";
import "./RecentOrders.css";

const orders = [
  {
    id: "#1001",
    customer: "Raja",
    amount: "₹450",
    payment: "UPI",
    status: "Paid",
  },
  {
    id: "#1002",
    customer: "Naveen",
    amount: "₹680",
    payment: "Cash",
    status: "Paid",
  },
  {
    id: "#1003",
    customer: "Rahul",
    amount: "₹250",
    payment: "Card",
    status: "Pending",
  },
  {
    id: "#1004",
    customer: "Kiran",
    amount: "₹390",
    payment: "UPI",
    status: "Paid",
  },
];

function RecentOrders() {
  return (
    <div className="recent-orders-card">
      <h2>📋 Recent Orders</h2>

      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Amount</th>
            <th>Payment</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer}</td>
              <td>{order.amount}</td>
              <td>{order.payment}</td>
              <td>
                <span
                  className={
                    order.status === "Paid"
                      ? "paid"
                      : "pending"
                  }
                >
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecentOrders;