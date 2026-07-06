import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import "./App.css";
import OrderHistory from "./components/OrderHistory";
import Receipt from "./components/Receipt";
import AdminPanel from "./components/AdminPanel";

function App() {
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const receiptRef = useRef(null);

  const handlePrint = useReactToPrint({
    contentRef: receiptRef,
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/menu")
      .then((response) => {
        setMenu(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        ),
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const increaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decreaseQty = (id) => {
    setCart(
      cart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0,
  );

  const placeOrder = async () => {
    if (cart.length === 0) {
      alert("Cart is empty!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/orders", {
        cart,
        total,
      });

      alert(response.data.message);
      setCart([]);
    } catch (error) {
      console.error(error);
      alert("Failed to place order");
    }
  };

  return (
    <div className="container">
      {/* Navigation Buttons */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          width: "200px",
          marginBottom: "25px",
        }}
      >
        <button
          onClick={() => {
            setShowHistory(false);
            setShowAdmin(false);
          }}
          style={{
            padding: "12px",
            background: "green",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          🍽 Menu
        </button>
        <button
          onClick={() => {
            setShowHistory(true);
            setShowAdmin(false);
          }}
          style={{
            padding: "12px",
            background: "green",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          📜 Order History
        </button>
        <button
          onClick={() => {
            setShowHistory(false);
            setShowAdmin(true);
          }}
          style={{
            padding: "12px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          👨‍💼 Admin Panel
        </button>
      </div>

      {showAdmin ? (
        <AdminPanel />
      ) : showHistory ? (
        <OrderHistory />
      ) : (
        <>
          {/* Menu */}
          <div className="menu">
            <h1>🍽 Restaurant POS</h1>

            {menu.map((item) => (
              <div className="card" key={item.id}>
                <h3>{item.name}</h3>

                <p>Category: {item.category}</p>

                <p>Price: ₹{item.price}</p>

                <button onClick={() => addToCart(item)}>Add to Cart</button>
              </div>
            ))}
          </div>

          {/* Cart */}
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
        </>
      )}
    </div>
  );
}

export default App;
