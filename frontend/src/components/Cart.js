import React from "react";
import "./Cart.css";
import {
  FaPlus,
  FaMinus,
  FaTrash,
  FaPrint,
  FaMoneyBillWave,
} from "react-icons/fa";
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
  const gst = (total * 0.05).toFixed(2);
  const grandTotal = (Number(total) + Number(gst)).toFixed(2);

  return (
    <div className="cart-container">
      <h2>🛒 Current Order</h2>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <h3>Your cart is empty</h3>
          <p>Add food items to begin.</p>
        </div>
      ) : (
        <>
          {cart.map((item) => (
            <div className="cart-card" key={item.id}>
              <div className="cart-info">
                <h3>{item.name}</h3>
                <p>₹{item.price}</p>
              </div>

              <div className="qty-section">
                <button onClick={() => decreaseQty(item.id)}>
                  <FaMinus />
                </button>

                <span>{item.quantity}</span>

                <button onClick={() => increaseQty(item.id)}>
                  <FaPlus />
                </button>

                <button
                  className="delete-btn"
                  onClick={() => removeItem(item.id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}

          <div className="summary">
            <div>
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>

            <div>
              <span>GST (5%)</span>
              <span>₹{gst}</span>
            </div>

            <div className="grand-total">
              <span>Total</span>
              <span>₹{grandTotal}</span>
            </div>
          </div>

          <div className="payment-box">
            <FaMoneyBillWave />

            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="Cash">Cash</option>
              <option value="UPI">UPI</option>
              <option value="Card">Card</option>
            </select>
          </div>

          <button className="place-btn" onClick={placeOrder}>
            ✅ Place Order
          </button>

          <button className="print-btn" onClick={handlePrint}>
            <FaPrint /> Print Bill
          </button>
        </>
      )}

      <div style={{ display: "none" }}>
        <div ref={receiptRef}>
          <Receipt cart={cart} total={grandTotal} />
        </div>
      </div>
    </div>
  );
}

export default Cart;