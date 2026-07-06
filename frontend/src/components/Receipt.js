import React from "react";

function Receipt({ cart, total }) {
  return (
    <div id="receipt" style={{ padding: "20px", width: "300px" }}>
      <h2 style={{ textAlign: "center" }}>Restaurant POS</h2>
      <hr />

      <p>Date: {new Date().toLocaleString()}</p>

      <hr />

      {cart.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "8px",
          }}
        >
          <span>
            {item.name} x {item.quantity}
          </span>

          <span>
            ₹{item.price * item.quantity}
          </span>
        </div>
      ))}

      <hr />

      <h3>Total : ₹{total}</h3>

      <hr />

      <p style={{ textAlign: "center" }}>
        Thank You!
        <br />
        Visit Again
      </p>
    </div>
  );
}

export default Receipt;