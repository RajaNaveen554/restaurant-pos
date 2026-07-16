import React, { useState } from "react";
import axios from "axios";

function AddFoodModal({ show, onClose, loadMenu }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Biryani");
  const [price, setPrice] = useState("");
  const [available, setAvailable] = useState(true);
  const [image, setImage] = useState(null);

  if (!show) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("available", available ? 1 : 0);

    if (image) {
      formData.append("image", image);
    }

    try {
      await axios.post(
        "http://localhost:5000/admin/menu",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Food Added Successfully");

      loadMenu();
      onClose();

      setName("");
      setCategory("Biryani");
      setPrice("");
      setAvailable(true);
      setImage(null);

    } catch (err) {
      console.error(err);

      if (err.response) {
        alert(err.response.data.message);
      } else {
        alert("Failed to add food");
      }
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">

        <h2>Add Food</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Food Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Biryani</option>
            <option>Bread</option>
            <option>Curry</option>
            <option>Starter</option>
            <option>Rice</option>
            <option>Drinks</option>
            <option>Dessert</option>
          </select>

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />

          <label>
            <input
              type="checkbox"
              checked={available}
              onChange={(e) => setAvailable(e.target.checked)}
            />
            &nbsp;Available
          </label>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "20px",
            }}
          >
            <button type="submit">
              Save
            </button>

            <button
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}

export default AddFoodModal;