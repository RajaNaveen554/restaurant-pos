import React, { useEffect, useState } from "react";
import "./Navbar.css";
import {
  FaSearch,
  FaBell,
  FaUserCircle,
  FaUtensils,
  FaShoppingCart,
} from "react-icons/fa";

function Navbar({
  role,
  sidebarOpen,
  showCart,
  setShowCart,
  cartCount,
}) {
  const [time, setTime] = useState("");

  // Get logged-in user details
  const name = localStorage.getItem("name") || "User";

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      setTime(
        now.toLocaleString("en-IN", {
          dateStyle: "medium",
          timeStyle: "short",
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className={`navbar ${sidebarOpen ? "sidebar-open" : ""}`}>
      {/* Left */}
      <div className="navbar-left">
        <div className="logo-circle">
          <FaUtensils />
        </div>

        <div>
          <h2>Restaurant POS</h2>
          <p>Management System</p>
        </div>
      </div>

      {/* Search */}
      <div className="navbar-search">
        <FaSearch />
        <input type="text" placeholder="Search menu..." />
      </div>

      {/* Right */}
      <div className="navbar-right">
        {/* Live Time */}
        <div className="live-time">{time}</div>

        {/* Cart */}
        <button
          className="cart-icon-btn"
          onClick={() => setShowCart(!showCart)}
          title={showCart ? "Close Cart" : "Open Cart"}
        >
          <FaShoppingCart />

          {cartCount > 0 && (
            <span className="cart-badge">
              {cartCount}
            </span>
          )}
        </button>

        {/* Notification */}
        <FaBell className="icon" />

        {/* Profile */}
        <div className="profile">
          <FaUserCircle size={34} />

          <div>
            <strong>{name}</strong>

            <p>
              {role === "admin"
                ? "Administrator"
                : "Cashier"}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;