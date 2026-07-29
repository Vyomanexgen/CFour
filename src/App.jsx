import { useState, lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import LoginRegister from "./components/LoginRegister";
import ProtectedRoute from "./components/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// LAZY LOAD ALL PAGES
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Products = lazy(() => import("./pages/Products"));
const NewArrivals = lazy(() => import("./pages/NewArrivals"));
const Contact = lazy(() => import("./pages/Contact"));
const MyOrders = lazy(() => import("./pages/MyOrders"));
const OrderDetails = lazy(() => import("./pages/OrderDetails"));
const AddressManagement = lazy(() => import("./pages/AddressManagement"));
const Profile = lazy(() => import("./pages/Profile"));


// SCROLL TO TOP ON EVERY ROUTE CHANGE
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}

import { useCart } from "./context/CartContext";
import { useAuth } from "./context/AuthContext";

function Layout() {
  const location = useLocation();
  const { cartItems } = useCart();

  const hideLayout = location.pathname === "/login";
  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);

  return (
    <>
      <ScrollToTop />

      {!hideLayout && <Navbar cartCount={cartCount} />}

      <Suspense
        fallback = {
          <div className="flex h-screen w-full items-center justify-center bg-black">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-white border-t-transparent" />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/new-arrivals" element={<NewArrivals />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<LoginRegister />} />

          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <MyOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders/:orderId"
            element={
              <ProtectedRoute>
                <OrderDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/addresses"
            element={
              <ProtectedRoute>
                <AddressManagement />
              </ProtectedRoute>
            }
          />

        </Routes>
      </Suspense>

      {!hideLayout && <Footer />}
    </>
  );
}

export default function App() {
  const { user } = useAuth();
  const { mergeGuestCart } = useCart();

  useEffect(() => {
    if (user) {
      mergeGuestCart();
    }
  }, [user]);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </QueryClientProvider>
  );
}