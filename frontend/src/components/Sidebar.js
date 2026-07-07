import React from "react";

function Sidebar({
  setShowDashboard,
  setShowHistory,
  setShowAdmin,
  setIsLoggedIn,
  role,
}) {
  const buttonStyle = {
    padding: "12px",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    marginBottom: "10px",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "220px",
        gap: "10px",
      }}
    >
      <button
        style={{ ...buttonStyle, background: "green" }}
        onClick={() => {
          setShowDashboard(false);
          setShowHistory(false);
          setShowAdmin(false);
        }}
      >
        🍽 Menu
      </button>

      {role === "admin" && (
        <button
          style={{ ...buttonStyle, background: "#f59e0b" }}
          onClick={() => {
            setShowDashboard(true);
            setShowHistory(false);
            setShowAdmin(false);
          }}
        >
          📊 Dashboard
        </button>
      )}

      <button
        style={{ ...buttonStyle, background: "#16a34a" }}
        onClick={() => {
          setShowDashboard(false);
          setShowHistory(true);
          setShowAdmin(false);
        }}
      >
        📜 Order History
      </button>

      {role === "admin" && (
        <button
          style={{ ...buttonStyle, background: "#2563eb" }}
          onClick={() => {
            setShowDashboard(false);
            setShowHistory(false);
            setShowAdmin(true);
          }}
        >
          👨‍💼 Admin Panel
        </button>
      )}

      <button
        style={{ ...buttonStyle, background: "#dc2626" }}
        onClick={() => {
          localStorage.removeItem("token");
          setIsLoggedIn(false);
        }}
      >
        🚪 Logout
      </button>
    </div>
  );
}

export default Sidebar;
