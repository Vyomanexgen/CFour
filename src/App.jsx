import { useState, lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import LoginRegister from "./components/LoginRegister";

// LAZY LOAD ALL PAGES
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Products = lazy(() => import("./pages/Products"));
const NewArrivals = lazy(() => import("./pages/NewArrivals"));
const Contact = lazy(() => import("./pages/Contact"));

// SCROLL TO TOP ON EVERY ROUTE CHANGE
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}

function Layout({ cartItems, setCartItems, addToCart }) {
  const location = useLocation();

  const hideLayout = location.pathname === "/login";

  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);

  return (
    <>
      <ScrollToTop />

      {!hideLayout && <Navbar cartCount={cartCount} />}

      <Suspense
        fallback={
          <div className="flex h-screen w-full items-center justify-center bg-black">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-white border-t-transparent" />
          </div>
        }
      >
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
      </Suspense>

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