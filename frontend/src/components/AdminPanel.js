import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminPanel() {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    loadMenu();
  }, []);

  const loadMenu = () => {
    axios
      .get("http://localhost:5000/menu")
      .then((res) => {
        setMenu(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div style={{ flex: 1, padding: "20px" }}>
      <h1>👨‍💼 Admin Panel</h1>

      <table
        border="1"
        cellPadding="10"
        style={{
          borderCollapse: "collapse",
          width: "100%",
          marginTop: "20px",
        }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Item</th>
            <th>Category</th>
            <th>Price</th>
            <th>Available</th>
          </tr>
        </thead>

        <tbody>
          {menu.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>₹{item.price}</td>
              <td>{item.available ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPanel;

