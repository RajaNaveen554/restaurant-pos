import React from "react";
import "./TopFoods.css";

const foods = [
  {
    name: "Chicken Biryani",
    orders: 120,
  },
  {
    name: "Veg Fried Rice",
    orders: 95,
  },
  {
    name: "Chicken 65",
    orders: 80,
  },
  {
    name: "Paneer Butter Masala",
    orders: 65,
  },
  {
    name: "Butter Naan",
    orders: 50,
  },
];

function TopFoods() {
  return (
    <div className="top-foods-card">
      <h2>🔥 Top Selling Foods</h2>

      {foods.map((food, index) => (
        <div className="food-row" key={index}>
          <div>
            <strong>{food.name}</strong>
            <p>{food.orders} Orders</p>
          </div>

          <div className="food-progress">
            <div
              className="food-progress-fill"
              style={{
                width: `${food.orders / 1.2}%`,
              }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TopFoods;