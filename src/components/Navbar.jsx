import { useEffect, useRef, useState } from "react";
import { 
  ShoppingCart, User, Menu, X, Search,
  Cylinder, Lightbulb, ToggleRight, Cable, 
  Zap, Wrench, Plug, Sprout, Factory, Droplets, LayoutGrid,
  ChevronDown, ChevronRight
} from "lucide-react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.webp";
import { useAuth } from "../context/AuthContext";

import { useStore } from "../context/StoreContext";

/* ICON MAPPER STRATEGY */
const getCategoryIcon = (slug) => {
  const iconMap = {
    "pipes": Cylinder,
    "lights": Lightbulb,
    "switches": ToggleRight,
    "wires": Cable,
    "mcbs": Zap,
    "plumbing": Wrench,
    "accessories": Plug,
    "agriculture": Sprout,
    "industrial": Factory,
    "drainage": Droplets,
    "all": LayoutGrid
  };
  return iconMap[slug.toLowerCase()] || LayoutGrid; // Generic fallback icon
};

export default function Navbar({ cartCount = 0 }) {
  const { user, logout } = useAuth();
  const { categories: dynamicCategories, navItems } = useStore();
  const navigate = useNavigate();
  const location = useLocation();

  // Mobile Drawer State
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileOpenMenu, setMobileOpenMenu] = useState(null); // Track which top-level accordion is open
  const [mobileAccordion, setMobileAccordion] = useState(null); // track expanded sub-category id
  
  // Cart bump animation
  const [bump, setBump] = useState(false);
  const prev = useRef(cartCount);

  // Search
  const [search, setSearch] = useState("");

  // Desktop Mega Menu State
  const [openDropdown, setOpenDropdown] = useState(null);
  const [activeFlyout, setActiveFlyout] = useState(null);
  
  // Timers for hover delay
  const enterTimer = useRef(null);
  const leaveTimer = useRef(null);

  // Focus management
  const megaMenuRef = useRef(null);
  const firstLinkRef = useRef(null);
  const searchInputRef = useRef(null);

  // BUILD DYNAMIC MENU
  // Convert API categories to the expected format. If empty, fallback to just "All Products"
  const megaMenuCategories = dynamicCategories?.length > 0 
    ? [
        ...dynamicCategories.map(c => ({
          title: c.name,
          category: c.slug,
          icon: getCategoryIcon(c.slug),
          sub: [] // API doesn't have subcategories yet, so we leave empty
        })),
        { title: "All Products", category: "all", icon: LayoutGrid, sub: [] }
      ]
    : [
        { title: "All Products", category: "all", icon: LayoutGrid, sub: [] }
      ];

  /* BREADCRUMB */
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
    const onKey = (e) => {
      if (e.key === "Escape") {
        if (mobileOpen) setMobileOpen(false);
        if (openDropdown) {
          setOpenDropdown(null);
          setActiveFlyout(null);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen, openDropdown]);

  /* LOCK BODY SCROLL FOR MOBILE MENU */
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      firstLinkRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  /* SEARCH */
  const handleSearch = () => {
    if (!search.trim()) return;
    navigate(`/products?search=${search}`);
    setMobileOpen(false);
  };
  const handleSearchKey = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  /* MEGA MENU HOVER DELAY LOGIC */
  const handleMouseEnter = (dropdownName) => {
    clearTimeout(leaveTimer.current);
    enterTimer.current = setTimeout(() => {
      setOpenDropdown(dropdownName);
    }, 150);
  };
  const handleMouseLeave = () => {
    clearTimeout(enterTimer.current);
    leaveTimer.current = setTimeout(() => {
      setOpenDropdown(null);
      setActiveFlyout(null); // close flyouts too
    }, 150);
  };

  /* KEYBOARD NAVIGATION FOR MEGA MENU */
  const handleMegaMenuKeyDown = (e) => {
    if (!openDropdown) return;
    
    // Simplistic arrow key support for accessibility
    const items = Array.from(megaMenuRef.current?.querySelectorAll('button[role="menuitem"]') || []);
    if (!items.length) return;
    
    const currentIndex = items.indexOf(document.activeElement);
    
    if (e.key === "ArrowRight") {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % items.length;
      items[nextIndex]?.focus();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prevIndex = (currentIndex - 1 + items.length) % items.length;
      items[prevIndex]?.focus();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      // approximate next row (jump by 6 columns on desktop)
      const cols = window.innerWidth >= 1280 ? 6 : 4;
      const nextIndex = (currentIndex + cols) % items.length;
      items[nextIndex]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const cols = window.innerWidth >= 1280 ? 6 : 4;
      const prevIndex = (currentIndex - cols + items.length) % items.length;
      items[prevIndex]?.focus();
    }
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

  return (
    <>
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
        {/* NO BREADCRUMB AS PER USER REQUEST */}

        <div className="mx-auto flex h-[85px] max-w-[1400px] items-center justify-between gap-4 px-6">
          {/* LOGO */}
          <Link to="/" className="flex items-center no-underline flex-shrink-0" aria-label="Go to homepage">
            <img src={logo} alt="CFOUR Logo" className="block w-[150px] transition-transform duration-300 hover:scale-105" />
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-8 h-full">
            {(navItems?.length > 0 ? navItems : [
              { name: "Home", url: "/" },
              { name: "Products", url: "/products" },
              { name: "About Us", url: "/about" },
              { name: "New Arrivals", url: "/new-arrivals" },
              { name: "Contact Us", url: "/contact" }
            ]).map((item) => {
              if (item.subItems && item.subItems.length > 0) {
                const isOpen = openDropdown === item.name;
                return (
                  <div 
                    key={item.name}
                    className="group flex items-center h-full"
                    onMouseEnter={() => handleMouseEnter(item.name)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button 
                      onClick={() => navigate(item.url)}
                      onKeyDown={(e) => { if(e.key === "Enter") navigate(item.url); }}
                      className={`
                        relative inline-flex items-center text-[15px] font-medium pb-[6px] 
                        transition-all duration-300 hover:text-[#8b0000] cursor-pointer border-none bg-transparent
                        after:absolute after:left-0 after:-bottom-[4px] after:h-[3px] 
                        after:rounded-full after:bg-[#8b0000] after:transition-all after:duration-300 
                        after:ease-out after:origin-left outline-none
                        ${isOpen ? "text-[#8b0000] after:w-full" : "text-[#111] after:w-0"}
                      `}
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                    >
                      {item.name}
                    </button>

                    {/* DESKTOP/TABLET MEGA MENU DROPDOWN */}
                    <div
                      ref={megaMenuRef}
                      onKeyDown={handleMegaMenuKeyDown}
                      className={`
                        absolute
                        left-0 right-0 mx-auto
                        top-full
                        w-[90vw]
                        max-w-[1100px]
                        bg-white
                        rounded-b-2xl
                        shadow-[0_10px_40px_rgba(0,0,0,0.1)]
                        border-t
                        border-gray-100
                        transition-all
                        duration-300
                        ease-out
                        z-50
                        flex flex-col
                        ${isOpen 
                          ? "opacity-100 visible translate-y-0" 
                          : "opacity-0 invisible -translate-y-2"}
                      `}
                    >
                      <div className="p-8 xl:p-10 pb-12 w-full">
                        {/* Grid layout: 4 cols on tablet (lg), 11 cols on desktop (xl) to make a single row */}
                        <div className="grid grid-cols-4 lg:grid-cols-6 xl:grid-cols-11 gap-x-2 gap-y-10" role="menu">
                          {item.subItems.map((subItem) => {
                            const isFlyoutOpen = activeFlyout === subItem.name;

                            return (
                              <div 
                                key={subItem.name} 
                                className="flex flex-col items-center group/item"
                                onMouseEnter={() => setActiveFlyout(subItem.name)}
                                onClick={() => {
                                  if (subItem.subItems && subItem.subItems.length > 0 && activeFlyout !== subItem.name) {
                                    setActiveFlyout(subItem.name);
                                  } else {
                                    navigate(subItem.url);
                                    setOpenDropdown(null);
                                  }
                                }}
                              >
                                <button
                                  role="menuitem"
                                  className="
                                    flex flex-col items-center justify-center gap-4
                                    w-full transition-all duration-300
                                    focus:outline-none cursor-pointer border-none bg-transparent
                                  "
                                >
                                  <div className="
                                    w-[60px] h-[60px] xl:w-[64px] xl:h-[64px] rounded-2xl flex items-center justify-center
                                    transition-transform duration-300 group-hover/item:scale-[1.1] 
                                    group-focus/item:scale-[1.1]
                                  ">
                                    {subItem.icon && (subItem.icon.startsWith("http") || subItem.icon.startsWith("data:")) ? (
                                      <img src={subItem.icon} alt={subItem.name} className="w-8 h-8 object-contain" />
                                    ) : (
                                      <LayoutGrid size={32} strokeWidth={1.5} className="text-gray-700 group-hover/item:text-red-600 group-focus/item:text-red-600 transition-colors" />
                                    )}
                                  </div>
                                  <div className="relative">
                                    <span className="text-[12px] xl:text-[13px] font-semibold text-center text-gray-800 group-hover/item:text-red-700 group-focus/item:text-red-700 transition-colors whitespace-nowrap">
                                      {subItem.name}
                                    </span>
                                    {/* Animated Red Underline */}
                                    <span className={`
                                      absolute left-1/2 -bottom-2 h-[2px] bg-red-600 -translate-x-1/2 transition-all duration-300 
                                      ${isFlyoutOpen ? 'w-full' : 'w-0 group-hover/item:w-full group-focus/item:w-full'}
                                    `}></span>
                                  </div>
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* DYNAMIC SUBCATEGORY PANEL */}
                      {activeFlyout && item.subItems.find(c => c.name === activeFlyout)?.subItems?.length > 0 && (
                        <div className="border-t border-gray-100 bg-gray-50/80 rounded-b-2xl p-6 px-10 transition-all duration-300">
                          <div className="flex items-center justify-center gap-6 flex-wrap">
                            {item.subItems.find(c => c.name === activeFlyout)?.subItems?.map((nestedItem) => (
                              <Link
                                key={nestedItem.name}
                                to={nestedItem.url}
                                onClick={() => {
                                  setOpenDropdown(null);
                                  setActiveFlyout(null);
                                }}
                                className="
                                  px-6 py-2.5 text-sm font-semibold text-gray-700 hover:text-red-600 
                                  hover:bg-white rounded-full transition-all shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-transparent hover:border-gray-200 focus:outline-none focus:border-red-600
                                  no-underline bg-white
                                "
                              >
                                {nestedItem.name}
                              </Link>
                            ))}
                            <Link
                              to={item.subItems.find(c => c.name === activeFlyout)?.url}
                              onClick={() => {
                                setOpenDropdown(null);
                                setActiveFlyout(null);
                              }}
                              className="px-6 py-2.5 text-sm font-bold text-white bg-[#8b0000] hover:bg-[#6b0000] rounded-full transition-all shadow-sm focus:outline-none no-underline flex items-center gap-1"
                            >
                              View All {activeFlyout} <ChevronRight size={16} />
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              }
              return (
                <NavLink key={item.name} to={item.url} className={navLinkStyle}>{item.name}</NavLink>
              );
            })}
          </nav>

          {/* RIGHT SIDE TOOLS */}
          <div className="hidden lg:flex items-center gap-3">
            {/* SEARCH */}
            <div className="flex items-center bg-gray-100 rounded-full px-4 py-2.5 transition-colors focus-within:bg-gray-200">
              <Search size={18} className="text-gray-500 mr-2 shrink-0" strokeWidth={2} />
              <input
                ref={searchInputRef}
                type="search"
                placeholder="Search products..."
                aria-label="Search products"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleSearchKey}
                className="w-[200px] bg-transparent outline-none text-[14px] text-black placeholder-gray-500 border-none p-0 focus:w-[240px] transition-all duration-300"
              />
            </div>

            {/* CART */}
            <button
              onClick={() => navigate("/cart")}
              aria-label={`Cart with ${cartCount} items`}
              className="group relative inline-flex items-center gap-2 rounded-full bg-transparent px-[18px] py-[10px] text-[14px] font-medium text-[#111] transition-all duration-300 hover:-translate-y-[2px] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 cursor-pointer border-none"
            >
              <ShoppingCart size={20} className="transition-all duration-300 group-hover:-rotate-12" />
              <span className="font-medium">Cart</span>
              {cartCount > 0 && (
                <span className={`absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-[10px] font-bold text-white ${bump ? "animate-bounce" : ""}`} aria-live="polite">
                  {cartCount}
                </span>
              )}
            </button>

            {/* LOGIN / LOGOUT */}
            {user ? (
              <div className="relative group z-[1100]">
                <button className="inline-flex items-center gap-2 rounded-full bg-[#111] px-5 py-[10px] text-[14px] font-medium text-white transition-all duration-300 hover:-translate-y-[2px] hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-400 cursor-pointer border-none">
                  <User size={16} />
                  <span>Hello, {user.firstName || user.email?.split("@")[0]}</span>
                </button>
                <div className="absolute right-0 top-full mt-2 w-[220px] rounded-2xl border border-gray-150 bg-white py-3 shadow-xl opacity-0 invisible translate-y-2 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 z-[1200]">
                  <div className="px-4 py-2 border-b border-gray-100 mb-2 text-left">
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider m-0">Account</p>
                    <p className="text-sm font-bold text-gray-800 truncate m-0" title={user.email}>{user.email}</p>
                  </div>
                  <button onClick={() => navigate("/orders")} className="flex w-full items-center px-4 py-2.5 text-[14px] text-gray-700 hover:bg-gray-50 transition font-medium text-left cursor-pointer border-none bg-transparent">My Orders</button>
                  <button onClick={() => navigate("/profile")} className="flex w-full items-center px-4 py-2.5 text-[14px] text-gray-700 hover:bg-gray-50 transition font-medium text-left cursor-pointer border-none bg-transparent">My Profile</button>
                  <button onClick={() => navigate("/profile/addresses")} className="flex w-full items-center px-4 py-2.5 text-[14px] text-gray-700 hover:bg-gray-50 transition font-medium text-left cursor-pointer border-none bg-transparent">Saved Addresses</button>
                  <div className="border-t border-gray-100 mt-2 pt-2">
                    <button onClick={logout} className="flex w-full items-center px-4 py-2.5 text-[14px] text-red-600 hover:bg-red-50 transition font-semibold text-left cursor-pointer border-none bg-transparent">Logout</button>
                  </div>
                </div>
              </div>
            ) : (
              <button onClick={() => navigate("/login")} className="inline-flex items-center gap-2 rounded-full bg-[#111] px-5 py-[10px] text-[14px] font-medium text-white transition-all duration-300 hover:-translate-y-[2px] hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-400 cursor-pointer border-none">
                <User size={16} />
                <span>Login / Register</span>
              </button>
            )}
          </div>

          {/* MOBILE RIGHT */}
          <div className="flex items-center gap-2 lg:hidden">
            <button onClick={() => navigate("/cart")} aria-label="Cart" className="relative rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-gray-400 min-h-[44px] min-w-[44px] flex items-center justify-center border-none bg-transparent cursor-pointer">
              <ShoppingCart size={22} />
              {cartCount > 0 && <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-black px-1 text-[9px] text-white" aria-live="polite">{cartCount}</span>}
            </button>
            <button onClick={() => setMobileOpen(true)} aria-label="Open navigation menu" aria-expanded={mobileOpen} className="rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-gray-400 min-h-[44px] min-w-[44px] flex items-center justify-center border-none bg-transparent cursor-pointer">
              <Menu size={26} />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[1200] lg:hidden">
          {/* OVERLAY */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setMobileOpen(false)} aria-hidden="true" />

          {/* PANEL */}
          <aside 
            role="dialog" 
            aria-modal="true" 
            aria-label="Navigation menu"
            className="absolute right-0 top-0 h-full w-[85vw] max-w-[400px] bg-white flex flex-col shadow-2xl transition-transform overflow-y-auto"
          >
            {/* TOP (X BUTTON ONLY) */}
            <div className="flex justify-end p-4 shrink-0">
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu" className="p-2 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 bg-transparent border-none cursor-pointer text-gray-600">
                <X size={36} strokeWidth={1} />
              </button>
            </div>

            {/* SEARCH */}
            <div className="px-6 md:px-8 mb-4 shrink-0">
              <div className="flex items-center bg-gray-100 rounded-xl px-4 py-3.5 transition-colors focus-within:bg-gray-200">
                <Search size={18} className="text-gray-500 mr-3 shrink-0" strokeWidth={2} />
                <input 
                  type="search" 
                  placeholder="Search products..." 
                  aria-label="Search products" 
                  value={search} 
                  onChange={(e) => setSearch(e.target.value)} 
                  onKeyDown={handleSearchKey} 
                  className="flex-1 bg-transparent outline-none text-[15px] text-black placeholder-gray-500 border-none p-0" 
                />
              </div>
            </div>

            {/* LINKS */}
            <nav className="flex flex-col flex-1" aria-label="Mobile navigation">
              
              {(navItems?.length > 0 ? navItems : [
                { name: "Home", url: "/" },
                { name: "Products", url: "/products" },
                { name: "About Us", url: "/about" },
                { name: "New Arrivals", url: "/new-arrivals" },
                { name: "Contact Us", url: "/contact" }
              ]).map((item, index) => {
                
                if (item.subItems && item.subItems.length > 0) {
                  const isMenuOpen = mobileOpenMenu === item.name;
                  return (
                    <div key={item.name} className="flex flex-col border-b border-gray-300 shrink-0">
                      <button
                        onClick={() => setMobileOpenMenu(isMenuOpen ? null : item.name)}
                        className="flex items-center justify-between w-full px-6 md:px-8 py-4 bg-transparent border-none cursor-pointer"
                        aria-expanded={isMenuOpen}
                      >
                        <div className="relative inline-block text-left">
                          <span className={`text-[16px] font-normal transition-colors duration-300 ${isMenuOpen ? "text-red-600" : "text-black"}`}>
                            {item.name}
                          </span>
                          <div className={`absolute -bottom-[18px] left-0 h-[2px] bg-red-600 transition-all duration-300 ${isMenuOpen ? "w-full" : "w-0"}`} />
                        </div>
                        <ChevronDown size={20} className={`transition-transform duration-300 ${isMenuOpen ? "rotate-180 text-black" : "text-gray-500"}`} strokeWidth={1.5} />
                      </button>

                      {/* NESTED CATEGORIES */}
                      <div className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out bg-[#f4f4f4] ${isMenuOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                        <div className="overflow-hidden">
                          <div className="flex flex-col py-2">
                            <Link
                              to={item.url}
                              onClick={() => setMobileOpen(false)}
                              className="w-full flex items-center px-6 md:px-8 py-3.5 text-[16px] font-medium text-black hover:text-red-600 no-underline transition-colors border-b border-gray-300/50"
                            >
                              View All {item.name}
                            </Link>
                            
                            {item.subItems.map((subItem) => {
                              const isExpanded = mobileAccordion === subItem.name;
                              const hasSub = subItem.subItems && subItem.subItems.length > 0;

                              return (
                                <div key={subItem.name} className="flex flex-col border-b border-gray-300/50 last:border-none">
                                  <button
                                    onClick={() => {
                                      if (hasSub) {
                                        setMobileAccordion(isExpanded ? null : subItem.name);
                                      } else {
                                        navigate(subItem.url);
                                        setMobileOpen(false);
                                      }
                                    }}
                                    className="w-full flex items-center justify-between px-6 md:px-8 py-4 bg-transparent border-none cursor-pointer"
                                  >
                                    <div className="flex items-center gap-4">
                                      <div className="w-6 flex justify-center">
                                        {subItem.icon && (subItem.icon.startsWith("http") || subItem.icon.startsWith("data:")) ? (
                                          <img src={subItem.icon} alt={subItem.name} className="w-5 h-5 object-contain" />
                                        ) : (
                                          <LayoutGrid size={22} strokeWidth={1.2} className="text-black" />
                                        )}
                                      </div>
                                      <div className="relative flex flex-col items-start">
                                        <span className="text-[17px] font-normal text-black">
                                          {subItem.name}
                                        </span>
                                        <div className={`h-[2px] bg-red-600 absolute -bottom-[17px] left-0 transition-all duration-300 ${isExpanded ? "w-full" : "w-0"}`} />
                                      </div>
                                    </div>
                                    {hasSub && (
                                      <ChevronDown size={20} strokeWidth={1.5} className={`transition-transform duration-300 text-black ${isExpanded ? "rotate-180" : ""}`} />
                                    )}
                                  </button>

                                  {/* SUB-CATEGORIES ACCORDION CONTENT */}
                                  {hasSub && (
                                    <div className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                                      <div className="overflow-hidden">
                                        <div className="flex flex-col pl-[4.5rem] pr-4 pb-4 pt-1 gap-5">
                                          {subItem.subItems.map((nestedItem) => (
                                            <Link
                                              key={nestedItem.name}
                                              to={nestedItem.url}
                                              onClick={() => setMobileOpen(false)}
                                              className="flex items-center gap-4 text-[15px] font-normal text-black hover:text-red-600 transition-colors no-underline"
                                            >
                                              <div className="w-5 h-5 flex items-center justify-center shrink-0">
                                                <div className="w-3.5 h-3.5 border border-gray-400 rounded-sm" />
                                              </div>
                                              {nestedItem.name}
                                            </Link>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={item.name} className={`${index === 0 ? 'border-t ' : ''}border-b border-gray-300`}>
                    <Link ref={index === 0 ? firstLinkRef : null} to={item.url} onClick={() => setMobileOpen(false)} className="flex items-center w-full px-6 md:px-8 py-4 text-[16px] font-normal text-black no-underline hover:text-red-600 transition-colors">
                      {item.name}
                    </Link>
                  </div>
                );
              })}

            </nav>

            {/* USER PROFILE INFO OR LOGIN */}
            <div className="shrink-0 mt-auto px-6 md:px-8 pt-6 pb-12">
              {user ? (
                <div className="flex flex-col gap-1 text-left">
                  <div className="py-2 mb-2">
                    <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider m-0">Account</p>
                    <p className="text-[15px] font-medium text-black truncate m-0 mt-1">{user.email}</p>
                  </div>
                  <Link to="/orders" onClick={() => setMobileOpen(false)} className="py-3 text-[16px] font-normal hover:text-red-600 text-black no-underline border-b border-gray-200">My Orders</Link>
                  <Link to="/profile" onClick={() => setMobileOpen(false)} className="py-3 text-[16px] font-normal hover:text-red-600 text-black no-underline border-b border-gray-200">My Profile</Link>
                  <Link to="/profile/addresses" onClick={() => setMobileOpen(false)} className="py-3 text-[16px] font-normal hover:text-red-600 text-black no-underline border-b border-gray-200">Saved Addresses</Link>
                  <button onClick={() => { logout(); setMobileOpen(false); }} className="mt-6 flex items-center justify-center gap-2 rounded-full bg-red-600 px-5 py-3 text-white min-h-[44px] focus:outline-none focus:ring-2 focus:ring-red-400 w-full font-bold cursor-pointer border-none shadow-md">Logout</button>
                </div>
              ) : (
                <button onClick={() => { navigate("/login"); setMobileOpen(false); }} className="mt-4 flex items-center justify-center gap-2 rounded-full bg-black px-5 py-3 text-white min-h-[44px] focus:outline-none focus:ring-2 focus:ring-gray-400 w-full font-bold cursor-pointer border-none shadow-md">
                  <User size={18} /> Login / Register
                </button>
              )}
            </div>
          </aside>
        </div>
      )}
    </>
  );
}