import React from "react";

function Menu({
  menu,
  addToCart,
  search,
  setSearch,
  category,
  setCategory,
}) {
  return (
    <div className="menu">
      <h1>🍽 Restaurant POS</h1>

      <input
        type="text"
        placeholder="🔍 Search Menu..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "15px",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />

      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setCategory("All")}>All</button>
        <button onClick={() => setCategory("Biryani")}>Biryani</button>
        <button onClick={() => setCategory("Starter")}>Starter</button>
        <button onClick={() => setCategory("Drinks")}>Drinks</button>
        <button onClick={() => setCategory("Dessert")}>Dessert</button>
      </div>

      {menu
        .filter((item) => {
          const matchesSearch = item.name
            .toLowerCase()
            .includes(search.toLowerCase());

          const matchesCategory =
            category === "All" || item.category === category;

          return matchesSearch && matchesCategory;
        })
        .map((item) => (
          <div className="card" key={item.id}>
            <h3>{item.name}</h3>

            <p>Category: {item.category}</p>

            <p>Price: ₹{item.price}</p>

            <button onClick={() => addToCart(item)}>
              Add to Cart
            </button>
          </div>
        ))}
    </div>
  );
}

export default Menu;