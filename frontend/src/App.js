import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import "./App.css";
import OrderHistory from "./components/OrderHistory";
import AdminPanel from "./components/AdminPanel";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import Menu from "./components/Menu";
import Cart from "./components/Cart";

function App() {
  const [menu, setMenu] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [showHistory, setShowHistory] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const role = localStorage.getItem("role");
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
        paymentMethod,
      });

      alert(response.data.message);
      setCart([]);
    } catch (error) {
      console.error(error);
      alert("Failed to place order");
    }
  };
  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="container">
      <Sidebar
        setShowDashboard={setShowDashboard}
        setShowHistory={setShowHistory}
        setShowAdmin={setShowAdmin}
        setIsLoggedIn={setIsLoggedIn}
        role={role}
      />

      {showDashboard ? (
        <Dashboard />
      ) : showAdmin ? (
        <AdminPanel />
      ) : showHistory ? (
        <OrderHistory />
      ) : (
        <>
          <Menu
            menu={menu}
            addToCart={addToCart}
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
          />

          <Cart
            cart={cart}
            total={total}
            increaseQty={increaseQty}
            decreaseQty={decreaseQty}
            removeItem={removeItem}
            placeOrder={placeOrder}
            handlePrint={handlePrint}
            receiptRef={receiptRef}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />
        </>
      )}
    </div>
  );
}
export default App;
