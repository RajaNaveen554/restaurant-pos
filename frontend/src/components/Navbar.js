import React, { useEffect, useState } from "react";
import "./Navbar.css";
import {
  FaSearch,
  FaBell,
  FaUserCircle,
  FaUtensils,
  FaShoppingCart,
} from "react-icons/fa";

function Navbar({ role, sidebarOpen, showCart, setShowCart }) {
  const [time, setTime] = useState("");

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
      <div className="navbar-left">
        <div className="logo-circle">
          <FaUtensils />
        </div>

        <div>
          <h2>Restaurant POS</h2>
          <p>Management System</p>
        </div>
      </div>

      <div className="navbar-search">
        <FaSearch />
        <input
          type="text"
          placeholder="Search menu..."
        />
      </div>

      <div className="navbar-right">
        <div className="live-time">{time}</div>

        <button
          className="cart-icon-btn"
          onClick={() => setShowCart(!showCart)}
          title="Open Cart"
        >
          <FaShoppingCart />
        </button>

        <FaBell className="icon" />

        <div className="profile">
          <FaUserCircle size={34} />

          <div>
            <strong>{role}</strong>
            <p>Logged In</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;