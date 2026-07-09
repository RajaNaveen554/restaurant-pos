import React, { useState } from "react";
import "./Sidebar.css";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaUtensils,
  FaClipboardList,
  FaUsers,
  FaUserShield,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar({
  setShowDashboard,
  setShowHistory,
  setShowAdmin,
  setShowUsers,
  setIsLoggedIn,
  role,
  sidebarOpen,
  setSidebarOpen,
}) {
  const [active, setActive] = useState("Menu");

  const closeSidebar = () => setSidebarOpen(false);

  const handleMenu = () => {
    setActive("Menu");
    setShowDashboard(false);
    setShowHistory(false);
    setShowAdmin(false);
    setShowUsers(false);
    closeSidebar();
  };

  const handleDashboard = () => {
    setActive("Dashboard");
    setShowDashboard(true);
    setShowHistory(false);
    setShowAdmin(false);
    setShowUsers(false);
    closeSidebar();
  };

  const handleHistory = () => {
    setActive("Order History");
    setShowDashboard(false);
    setShowHistory(true);
    setShowAdmin(false);
    setShowUsers(false);
    closeSidebar();
  };

  const handleAdmin = () => {
    setActive("Admin Panel");
    setShowDashboard(false);
    setShowHistory(false);
    setShowAdmin(true);
    setShowUsers(false);
    closeSidebar();
  };

  const handleUsers = () => {
    setActive("Users");
    setShowDashboard(false);
    setShowHistory(false);
    setShowAdmin(false);
    setShowUsers(true);
    closeSidebar();
  };

  const logout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  };

  return (
    <>
      {/* Hamburger Button */}
      {!sidebarOpen && (
        <button className="menu-btn" onClick={() => setSidebarOpen(true)}>
          <FaBars />
        </button>
      )}

      {/* Overlay */}
      {sidebarOpen && <div className="overlay" onClick={closeSidebar}></div>}

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "show" : ""}`}>
        {/* Header */}
        <div className="sidebar-header">
          <div className="logo-section">
            <div className="logo">🍽</div>

            <div>
              <h2>Restaurant POS</h2>
              <p>{role === "admin" ? "Administrator" : "Cashier"}</p>
            </div>
          </div>

          <button className="close-btn" onClick={closeSidebar}>
            <FaTimes />
          </button>
        </div>

        {/* Navigation */}

        <button
          className={`nav-btn ${active === "Menu" ? "active" : ""}`}
          onClick={handleMenu}
        >
          <FaUtensils />
          <span>Menu</span>
        </button>

        {role === "admin" && (
          <button
            className={`nav-btn ${active === "Dashboard" ? "active" : ""}`}
            onClick={handleDashboard}
          >
            <FaHome />
            <span>Dashboard</span>
          </button>
        )}

        <button
          className={`nav-btn ${active === "Order History" ? "active" : ""}`}
          onClick={handleHistory}
        >
          <FaClipboardList />
          <span>Order History</span>
        </button>

        {role === "admin" && (
          <button
            className={`nav-btn ${active === "Admin Panel" ? "active" : ""}`}
            onClick={handleAdmin}
          >
            <FaUserShield />
            <span>Admin Panel</span>
          </button>
        )}

        {role === "admin" && (
          <button
            className={`nav-btn ${active === "Users" ? "active" : ""}`}
            onClick={handleUsers}
          >
            <FaUsers />
            <span>Users</span>
          </button>
        )}

        {/* Footer */}
        <div className="sidebar-footer">
          <button className="logout-btn" onClick={logout}>
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
