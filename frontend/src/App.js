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
import UserManagement from "./components/UserManagement";
import Navbar from "./components/Navbar";

function App() {
  const [menu, setMenu] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [showHistory, setShowHistory] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
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

    // Automatically open the cart after adding an item
    setShowCart(true);
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
      setShowCart(false);
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
      <Navbar
        role={role}
        sidebarOpen={sidebarOpen}
        showCart={showCart}
        setShowCart={setShowCart}
        cartCount={cart.length}
      />

      <Sidebar
        setShowDashboard={setShowDashboard}
        setShowHistory={setShowHistory}
        setShowAdmin={setShowAdmin}
        setShowUsers={setShowUsers}
        setIsLoggedIn={setIsLoggedIn}
        role={role}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className={`main-content ${sidebarOpen ? "sidebar-open" : ""}`}>
        {showDashboard ? (
          <Dashboard />
        ) : showAdmin ? (
          <AdminPanel />
        ) : showUsers ? (
          <UserManagement />
        ) : showHistory ? (
          <OrderHistory />
        ) : (
          <div className="pos-layout">
            <div className="menu-container">
              <Menu
                menu={menu}
                addToCart={addToCart}
                search={search}
                setSearch={setSearch}
                category={category}
                setCategory={setCategory}
              />
            </div>
            <div className={showCart ? "cart" : "cart cart-hidden"}>
              {showCart && (
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
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
