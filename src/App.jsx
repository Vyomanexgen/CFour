import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
// import Products from "./pages/Products";
// import NewArrivals from "./pages/NewArrivals";
import Contact from "./pages/Contact";

import LoginRegister from "./components/LoginRegister";

function Layout() {
  const location = useLocation();

  const hideLayout =
    location.pathname === "/login";

  return (
    <>
      {!hideLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />

        {/* <Route
          path="/products"
          element={<Products />}
        />

        <Route
          path="/new-arrivals"
          element={<NewArrivals />}
        /> */}

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/login"
          element={<LoginRegister />}
        />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}