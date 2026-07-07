import React from "react";
import Receipt from "./Receipt";
function Cart({
  cart,
  total,
  increaseQty,
  decreaseQty,
  removeItem,
  placeOrder,
  handlePrint,
  receiptRef,
  paymentMethod,
  setPaymentMethod,
}) {
  return (
    <div className="cart">
      <h2>🛒 Cart</h2>

      {cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        cart.map((item) => (
          <div className="cart-item" key={item.id}>
            <h4>{item.name}</h4>

            <p>
              ₹{item.price} × {item.quantity} = ₹
              {Number(item.price) * item.quantity}
            </p>

            <button onClick={() => decreaseQty(item.id)}>-</button>

            <span style={{ margin: "0 10px" }}>{item.quantity}</span>

            <button onClick={() => increaseQty(item.id)}>+</button>

            <button
              onClick={() => removeItem(item.id)}
              style={{
                marginLeft: "10px",
                background: "red",
                color: "white",
                border: "none",
                padding: "6px 10px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Remove
            </button>

            <hr />
          </div>
        ))
      )}
      <h3>Payment Method</h3>

      <select
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
        }}
      >
        <option value="Cash">💵 Cash</option>
        <option value="UPI">📱 UPI</option>
        <option value="Card">💳 Card</option>
      </select>

      <h2>Total: ₹{total}</h2>

      <button
        onClick={placeOrder}
        style={{
          width: "100%",
          padding: "12px",
          background: "green",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "10px",
          fontSize: "16px",
        }}
      >
        ✅ Place Order
      </button>

      <button
        onClick={handlePrint}
        style={{
          width: "100%",
          padding: "12px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "10px",
          fontSize: "16px",
        }}
      >
        🖨️ Print Bill
      </button>

      <div style={{ display: "none" }}>
        <div ref={receiptRef}>
          <Receipt cart={cart} total={total} />
        </div>
      </div>
    </div>
  );
}

export default Cart;
