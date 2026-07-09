import React from "react";
import Cart from "../components/Cart";

function CartPage(props) {
  return (
    <div style={{ padding: "20px" }}>
      <h1>🛒 Shopping Cart</h1>

      <Cart {...props} />
    </div>
  );
}

export default CartPage;