import { useEffect, useRef, useState } from "react";
import { ShoppingCart, User, Menu, X, Search } from "lucide-react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.webp";

export default function Navbar({ cartCount = 0 }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bump, setBump] = useState(false);
  const [search, setSearch] = useState("");

  const prev = useRef(cartCount);
  const firstLinkRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  /* ── BREADCRUMB from URL ── */
  const params = new URLSearchParams(location.search);
  const activeCategory = params.get("category");
  const isProductsPage = location.pathname.includes("/products");

  /* CART BUMP */
  useEffect(() => {
    if (prev.current !== cartCount) {
      setBump(true);
      const t = setTimeout(() => setBump(false), 400);
      prev.current = cartCount;
      return () => clearTimeout(t);
    }
  }, [cartCount]);

  /* ESC CLOSE */
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e) => { if (e.key === "Escape") setMobileOpen(false); };
    window.addEventListener("keydown", onKey);
    firstLinkRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  /* SEARCH */
  const handleSearch = () => {
    if (!search.trim()) return;
    navigate(`/products?search=${search}`);
  };

  const handleSearchKey = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  /* NAV LINK STYLE */
  const navLinkStyle = ({ isActive }) =>
    `
    relative
    inline-flex
    items-center
    text-[15px]
    font-medium
    pb-[6px]
    transition-all
    duration-300
    hover:text-[#8b0000]

    after:absolute
    after:left-0
    after:-bottom-[4px]
    after:h-[3px]
    after:rounded-full
    after:bg-[#8b0000]
    after:transition-all
    after:duration-300
    after:ease-out
    after:origin-left

    ${isActive ? "text-[#8b0000] after:w-full" : "text-[#111] after:w-0 hover:after:w-full"}
  `;

  /* MEGA MENU CATEGORIES */
  const megaMenuCategories = [
    { title: "Pipes", category: "pipes", sub: ["PVC Pipes", "CPVC Pipes", "HDPE Pipes", "UPVC Pipes"] },
    { title: "Lights", category: "lights", sub: ["LED Bulbs", "Ceiling Lights", "Panel Lights", "Outdoor Lights"] },
    { title: "Switches", category: "switches", sub: ["Modular Switches", "Touch Switches", "Smart Switches"] },
    { title: "Wires", category: "wires", sub: ["Copper Wire", "Flexible Wire", "Industrial Wire"] },
    { title: "MCBS & DBS", category: "mcbs", sub: ["MCB", "Distribution Boards"] },
    { title: "Plumbing", category: "plumbing", sub: ["Pipe Fittings", "Valves", "Connectors"] },
    { title: "Accessories", category: "accessories", sub: ["Adapters", "Sockets", "Holders"] },
    { title: "Agriculture", category: "agriculture", sub: ["Sprinklers", "Pumps", "Pipe Systems"] },
    { title: "Industrial", category: "industrial", sub: ["Heavy Pipes", "Industrial Fittings"] },
    { title: "Drainage", category: "drainage", sub: ["Drain Pipes", "Drain Covers"] },
    { title: "All Products", category: "all", sub: [] },
  ];

  return (
    <>
      {/* HEADER */}
      <header
        className="
          fixed
          top-0
          left-0
          z-[1000]
          w-full
          border-b
          border-gray-200
          bg-white/90
          backdrop-blur-md
          shadow-[0_4px_12px_rgba(0,0,0,0.06)]
        "
      >
        {/* ── BREADCRUMB BAR (shows on products page) ── */}
        {isProductsPage && (
          <div className="bg-gray-50 border-b border-gray-100 px-6 py-1.5">
            <nav aria-label="Breadcrumb" className="max-w-[1400px] mx-auto flex items-center gap-1.5 text-xs text-gray-500">
              <Link to="/" className="hover:text-gray-800 transition">Home</Link>
              <span>/</span>
              <Link to="/products" className="hover:text-gray-800 transition">Products</Link>
              {activeCategory && (
                <>
                  <span>/</span>
                  <span className="capitalize font-semibold text-gray-800">{activeCategory}</span>
                </>
              )}
            </nav>
          </div>
        )}

        <div
          className="
            mx-auto
            flex
            h-[85px]
            max-w-[1400px]
            items-center
            justify-between
            gap-4
            px-6
          "
        >
          {/* LOGO */}
          <Link to="/" className="flex items-center no-underline flex-shrink-0">
            <img
              src={logo}
              alt="CFOUR Logo"
              className="block w-[150px] transition-transform duration-300 hover:scale-105"
            />
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-8">
            {/* HOME */}
            <NavLink to="/" className={navLinkStyle}>Home</NavLink>

            {/* PRODUCTS */}
            <div className="relative group flex items-center">
              <NavLink to="/products" className={navLinkStyle}>Products</NavLink>

              {/* MEGA MENU */}
              <div
                className="
                  absolute
                  left-0
                  top-full
                  z-50
                  opacity-0
                  invisible
                  translate-y-3
                  transition-all
                  duration-300
                  ease-out
                  group-hover:opacity-100
                  group-hover:visible
                  group-hover:translate-y-0
                "
              >
                <div className="flex overflow-visible rounded-b-2xl shadow-2xl pt-5">
                  {/* LEFT CATEGORY */}
                  <div className="w-[250px] bg-[#ef1c25] text-white py-4 rounded-l-2xl">
                    {megaMenuCategories.map((item) => (
                      <div key={item.title} className="relative group/item">
                        <Link
                          to={`/products?category=${item.category}`}
                          className={`
                            flex
                            items-center
                            justify-between
                            px-5
                            py-3
                            text-[18px]
                            font-semibold
                            cursor-pointer
                            transition-all
                            duration-200
                            text-white
                            no-underline
                            ${activeCategory === item.category ? "bg-red-700" : "hover:bg-red-600"}
                          `}
                        >
                          <span>{item.title}</span>
                          {item.sub.length > 0 && <span>›</span>}
                        </Link>

                        {/* SUBMENU */}
                        {item.sub.length > 0 && (
                          <div
                            className="
                              absolute
                              left-[100%]
                              top-0
                              pl-1
                              opacity-0
                              invisible
                              translate-x-3
                              transition-all
                              duration-300
                              ease-out
                              group-hover/item:opacity-100
                              group-hover/item:visible
                              group-hover/item:translate-x-0
                            "
                          >
                            <div className="w-[240px] bg-[#ef1c25] text-white py-4 rounded-r-2xl shadow-2xl border-l border-red-400">
                              {item.sub.map((subItem) => (
                                <Link
                                  key={subItem}
                                  to={`/products?category=${item.category}`}
                                  className="
                                    block
                                    px-5
                                    py-3
                                    text-[17px]
                                    font-semibold
                                    hover:bg-red-600
                                    transition-all
                                    duration-200
                                    hover:pl-7
                                    text-white
                                    no-underline
                                  "
                                >
                                  {subItem}
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ABOUT */}
            <NavLink to="/about" className={navLinkStyle}>About Us</NavLink>

            {/* NEW ARRIVALS */}
            <NavLink to="/new-arrivals" className={navLinkStyle}>New Arrivals</NavLink>

            {/* CONTACT */}
            <NavLink to="/contact" className={navLinkStyle}>Contact Us</NavLink>
          </nav>

          {/* RIGHT SIDE */}
          <div className="hidden lg:flex items-center gap-3">
            {/* SEARCH */}
            <div
              className="
                flex
                items-center
                overflow-hidden
                rounded-full
                border
                border-gray-300
                bg-white
              "
            >
              <input
                type="search"
                placeholder="Search products..."
                aria-label="Search products"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleSearchKey}
                className="w-[200px] px-4 py-2.5 text-sm outline-none focus:w-[240px] transition-all duration-300"
              />
              <button
                onClick={handleSearch}
                aria-label="Submit search"
                className="bg-black px-4 py-2.5 text-white hover:bg-gray-800 transition focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-400"
              >
                <Search size={18} />
              </button>
            </div>

            {/* CART */}
            <button
              onClick={() => navigate("/cart")}
              aria-label={`Cart with ${cartCount} items`}
              className="
                group
                relative
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-transparent
                px-[18px]
                py-[10px]
                text-[14px]
                font-medium
                text-[#111]
                transition-all
                duration-300
                hover:-translate-y-[2px]
                hover:bg-gray-100
                focus:outline-none
                focus:ring-2
                focus:ring-gray-400
              "
            >
              <ShoppingCart
                size={20}
                className="transition-all duration-300 group-hover:-rotate-12"
              />
              <span className="font-medium">Cart</span>
              {cartCount > 0 && (
                <span
                  className={`
                    absolute
                    -right-1
                    -top-1
                    flex
                    h-5
                    min-w-5
                    items-center
                    justify-center
                    rounded-full
                    bg-black
                    px-1
                    text-[10px]
                    font-bold
                    text-white
                    ${bump ? "animate-bounce" : ""}
                  `}
                  aria-live="polite"
                >
                  {cartCount}
                </span>
              )}
            </button>

            {/* LOGIN */}
            <button
              onClick={() => navigate("/login")}
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-[#111]
                px-5
                py-[10px]
                text-[14px]
                font-medium
                text-white
                transition-all
                duration-300
                hover:-translate-y-[2px]
                hover:bg-black
                focus:outline-none
                focus:ring-2
                focus:ring-gray-400
              "
            >
              <User size={16} />
              <span>Login / Register</span>
            </button>
          </div>

          {/* MOBILE RIGHT */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* CART */}
            <button
              onClick={() => navigate("/cart")}
              aria-label={`Cart with ${cartCount} items`}
              className="relative rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-gray-400 min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span
                  className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-black px-1 text-[9px] text-white"
                  aria-live="polite"
                >
                  {cartCount}
                </span>
              )}
            </button>

            {/* MENU */}
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              className="rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-gray-400 min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <Menu size={26} />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[1200]">
          {/* OVERLAY */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />

          {/* PANEL */}
          <aside
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="absolute right-0 top-0 h-full w-[85%] max-w-[360px] bg-white p-6 overflow-y-auto"
          >
            {/* TOP */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Menu</h2>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <X size={24} />
              </button>
            </div>

            {/* SEARCH */}
            <div className="mt-6 flex items-center overflow-hidden rounded-full border border-gray-300">
              <input
                type="search"
                placeholder="Search products..."
                aria-label="Search products"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleSearchKey}
                className="flex-1 px-4 py-3 outline-none text-sm focus:outline-none"
              />
              <button
                onClick={handleSearch}
                aria-label="Submit search"
                className="bg-black px-4 py-3 text-white min-h-[44px] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-400"
              >
                <Search size={18} />
              </button>
            </div>

            {/* LINKS */}
            <nav className="mt-8 flex flex-col gap-1" aria-label="Mobile navigation">
              <Link
                ref={firstLinkRef}
                to="/"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-4 py-3 hover:bg-gray-100 font-medium focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-400 min-h-[44px] flex items-center"
              >
                Home
              </Link>

              <Link
                to="/products"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-4 py-3 hover:bg-gray-100 font-medium focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-400 min-h-[44px] flex items-center"
              >
                Products
              </Link>

              {/* MOBILE CATEGORY LINKS — highlight active */}
              {[
                { to: "/products?category=pipes", label: "└ Pipes", cat: "pipes" },
                { to: "/products?category=lights", label: "└ Lights", cat: "lights" },
                { to: "/products?category=protection", label: "└ Protection", cat: "protection" },
                { to: "/products?category=plumbing", label: "└ Plumbing", cat: "plumbing" },
                { to: "/products?category=switch", label: "└ Surface Box", cat: "switch" },
                { to: "/products?category=all", label: "└ All Products", cat: "all" },
              ].map(({ to, label, cat }) => (
                <Link
                  key={cat}
                  to={to}
                  onClick={() => setMobileOpen(false)}
                  className={`
                    rounded-lg
                    px-4
                    py-3
                    pl-8
                    text-sm
                    hover:bg-gray-100
                    focus:outline-none
                    focus:ring-2
                    focus:ring-inset
                    focus:ring-gray-400
                    min-h-[44px]
                    flex
                    items-center
                    ${activeCategory === cat ? "text-red-600 font-semibold bg-red-50" : "text-gray-600"}
                  `}
                >
                  {label}
                </Link>
              ))}

              <Link
                to="/about"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-4 py-3 hover:bg-gray-100 font-medium focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-400 min-h-[44px] flex items-center"
              >
                About Us
              </Link>

              <Link
                to="/new-arrivals"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-4 py-3 hover:bg-gray-100 font-medium focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-400 min-h-[44px] flex items-center"
              >
                New Arrivals
              </Link>

              <Link
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-4 py-3 hover:bg-gray-100 font-medium focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-400 min-h-[44px] flex items-center"
              >
                Contact Us
              </Link>

              {/* LOGIN */}
              <button
                onClick={() => { navigate("/login"); setMobileOpen(false); }}
                className="
                  mt-4
                  flex
                  items-center
                  justify-center
                  gap-2
                  rounded-full
                  bg-black
                  px-5
                  py-3
                  text-white
                  min-h-[44px]
                  focus:outline-none
                  focus:ring-2
                  focus:ring-gray-400
                "
              >
                <User size={16} />
                Login / Register
              </button>
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}