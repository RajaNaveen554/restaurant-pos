import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminPanel.css";
import { FaSearch, FaPlus, FaEdit, FaTrash } from "react-icons/fa";

import AddFoodModal from "./AddFoodModal";
import EditFoodModal from "./EditFoodModal";

function AdminPanel() {
  const [menu, setMenu] = useState([]);
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);

  useEffect(() => {
    loadMenu();
  }, []);

  // Load Menu
  const loadMenu = () => {
    axios
      .get("http://localhost:5000/menu")
      .then((res) => setMenu(res.data))
      .catch((err) => console.log(err));
  };

 // Toggle Available / Unavailable
const toggleAvailability = async (item) => {
  try {
    const response = await axios.patch(
      `http://localhost:5000/admin/menu/${item.id}/status`,
      {
        available: item.available ? 0 : 1,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    alert(response.data.message);

    loadMenu();
  } catch (err) {
    console.error(err);

    if (err.response) {
      alert(err.response.data.message);
    } else {
      alert("Failed to update availability");
    }
  }
};

  // Delete Food
  const deleteFood = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this food?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/admin/menu/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Food Deleted Successfully");

      loadMenu();
    } catch (err) {
      console.error(err);

      if (err.response) {
        alert(err.response.data.message);
      } else {
        alert("Delete Failed");
      }
    }
  };

  return (
    <div className="admin-container">

      {/* Header */}
      <div className="admin-header">
        <h1>👨‍💼 Admin Panel</h1>

        <button
          className="add-btn"
          onClick={() => setShowModal(true)}
        >
          <FaPlus />
          <span>Add Food</span>
        </button>
      </div>

      {/* Search */}
      <div className="search-box-admin">
        <FaSearch />

        <input
          type="text"
          placeholder="Search food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
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
              item.name.toLowerCase().includes(search.toLowerCase())
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
                  <button
                    className={
                      item.available
                        ? "status available"
                        : "status unavailable"
                    }
                    onClick={() => toggleAvailability(item)}
                  >
                    {item.available ? "Available" : "Unavailable"}
                  </button>
                </td>

                <td>

                  {/* Edit */}
                  <button
                    className="edit-btn"
                    title="Edit Food"
                    onClick={() => {
                      setSelectedFood(item);
                      setShowEditModal(true);
                    }}
                  >
                    <FaEdit />
                  </button>

                  {/* Delete */}
                  <button
                    className="delete-btn"
                    title="Delete Food"
                    onClick={() => deleteFood(item.id)}
                  >
                    <FaTrash />
                  </button>

                </td>

              </tr>
            ))}
        </tbody>
      </table>

      {/* Add Food Modal */}
      <AddFoodModal
        show={showModal}
        onClose={() => setShowModal(false)}
        loadMenu={loadMenu}
      />

      {/* Edit Food Modal */}
      <EditFoodModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        food={selectedFood}
        loadMenu={loadMenu}
      />

    </div>
  );
}

export default AdminPanel;