import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { name: "Cash", value: 45 },
  { name: "UPI", value: 40 },
  { name: "Card", value: 15 },
];

const COLORS = ["#22c55e", "#3b82f6", "#f59e0b"];

function PaymentChart() {
  return (
    <div className="payment-card">
      <h2>💳 Payment Methods</h2>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={90}
            dataKey="value"
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PaymentChart;