import React from "react";
import "./Menu.css";
import { FaSearch, FaStar, FaShoppingCart } from "react-icons/fa";

function Menu({
  menu,
  addToCart,
  search,
  setSearch,
  category,
  setCategory,
}) {
  const categories = [
    "All",
    "Biryani",
    "Bread",
    "Curry",
    "Starter",
    "Rice",
    "Drinks",
    "Dessert",
  ];

  const filteredMenu = menu.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || item.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="menu-container">
      <h1 className="menu-title">🍽 Restaurant Menu</h1>

      {/* Search */}
      <div className="search-box">
        <FaSearch />

        <input
          type="text"
          placeholder="Search food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Categories */}
      <div className="category-buttons">
        {categories.map((cat) => (
          <button
            key={cat}
            className={category === cat ? "active-category" : ""}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Food Cards */}
      <div className="menu-grid">
        {filteredMenu.map((item) => (
          <div className="food-card" key={item.id}>
            <img
              src={item.image || "/images/no-image.jpg"}
              alt={item.name}
              className="food-image"
            />

            <div className="food-content">
              <h3>{item.name}</h3>

              <span className="badge">{item.category}</span>

              <div className="rating">
                <FaStar color="gold" />
                <span>4.8</span>
              </div>

              <h2>₹{item.price}</h2>

              <button
                className="cart-btn"
                onClick={() => addToCart(item)}
              >
                <FaShoppingCart />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;