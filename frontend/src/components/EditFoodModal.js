import React, { useEffect, useState } from "react";
import axios from "axios";
import "./EditFoodModal.css";
function EditFoodModal({ show, onClose, food, loadMenu }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [available, setAvailable] = useState(true);
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (food) {
      setName(food.name);
      setCategory(food.category);
      setPrice(food.price);
      setAvailable(Boolean(food.available));
      setImage(null);
    }
  }, [food]);

  if (!show || !food) return null;

  const handleUpdate = async (e) => {
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
      await axios.put(`http://localhost:5000/admin/menu/${food.id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Food Updated Successfully");

      loadMenu();
      onClose();
    } catch (err) {
      console.error(err);

      if (err.response) {
        alert(err.response.data.message);
      } else {
        alert("Update Failed");
      }
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Edit Food</h2>

        <form onSubmit={handleUpdate}>
          <input
            type="text"
            value={name}
            placeholder="Food Name"
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
            value={price}
            placeholder="Price"
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <label>
            <input
              type="checkbox"
              checked={available}
              onChange={(e) => setAvailable(e.target.checked)}
            />
            &nbsp;Available
          </label>

          <div className="modal-buttons">
            <button type="submit" className="update-btn">
              Update Food
            </button>

            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditFoodModal;
