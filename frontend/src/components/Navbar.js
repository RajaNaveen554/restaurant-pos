import React from "react";
import "./Navbar.css";
import {
  FaSearch,
  FaBell,
  FaUserCircle,
} from "react-icons/fa";

function Navbar({ role }) {
  return (
    <div className="navbar">
      <div className="navbar-title">
        🍽 Restaurant POS
      </div>

      <div className="navbar-search">
        <FaSearch />

        <input
          type="text"
          placeholder="Search menu..."
        />
      </div>

      <div className="navbar-right">
        <FaBell className="icon" />

        <div className="profile">
          <FaUserCircle size={30} />

          <span>{role}</span>
        </div>
      </div>
    </div>
  );
}

export default Navbar;