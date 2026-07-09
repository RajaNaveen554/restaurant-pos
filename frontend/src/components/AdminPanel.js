import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminPanel.css";
import {
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

function AdminPanel() {
  const [menu, setMenu] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadMenu();
  }, []);

  const loadMenu = () => {
    axios
      .get("http://localhost:5000/menu")
      .then((res) => setMenu(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="admin-container">

      <div className="admin-header">
        <h1>👨‍💼 Admin Panel</h1>

        <button className="add-btn">
          <FaPlus />
          Add Food
        </button>
      </div>

      <div className="search-box-admin">
        <FaSearch />

        <input
          type="text"
          placeholder="Search food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Food</th>
            <th>Category</th>
            <th>Price</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {menu
            .filter((item) =>
              item.name
                .toLowerCase()
                .includes(search.toLowerCase())
            )
            .map((item) => (
              <tr key={item.id}>

                <td>
                  <img
                    className="food-img"
                    src={`http://localhost:5000/uploads/${item.image}`}
                    alt={item.name}
                    onError={(e) => {
                      e.target.src =
                        "https://placehold.co/60x60?text=Food";
                    }}
                  />
                </td>

                <td>{item.name}</td>

                <td>{item.category}</td>

                <td>₹{item.price}</td>

                <td>
                  <span
                    className={
                      item.available
                        ? "status available"
                        : "status unavailable"
                    }
                  >
                    {item.available ? "Available" : "Unavailable"}
                  </span>
                </td>

                <td>
                  <button className="edit-btn">
                    <FaEdit />
                  </button>

                  <button className="delete-btn">
                    <FaTrash />
                  </button>
                </td>

              </tr>
            ))}
        </tbody>
      </table>

    </div>
  );
}

export default AdminPanel;