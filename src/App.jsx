import { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import NewArrivals from "./pages/NewArrivals";
import Contact from "./pages/Contact";
import Cart from "./components/Cart";

import LoginRegister from "./components/LoginRegister";

function Layout({ cartItems, setCartItems, addToCart }) {
  const location = useLocation();

  const hideLayout = location.pathname === "/login";

  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);

  return (
    <>
      {!hideLayout && <Navbar cartCount={cartCount} />}

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />

        <Route path="/products" element={<Products addToCart={addToCart} />} />

        <Route path="/new-arrivals" element={<NewArrivals />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/login" element={<LoginRegister />} />

        <Route
          path="/cart"
          element={<Cart cartItems={cartItems} setCartItems={setCartItems} />}
        />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
}

export default function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.title === product.title);
      if (existing) {
        return prev.map((i) =>
          i.title === product.title ? { ...i, qty: i.qty + 1 } : i,
        );
      }
      return [...prev, { ...product, qty: 1, price: 67 }];
    });
  };

  return (
    <BrowserRouter>
      <Layout
        cartItems={cartItems}
        setCartItems={setCartItems}
        addToCart={addToCart}
      />
    </BrowserRouter>
  );
}
