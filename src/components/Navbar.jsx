import { useEffect, useRef, useState } from "react";

import {
  ShoppingCart,
  User,
  Menu,
  X,
} from "lucide-react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import logo from "../assets/logo.png";

const navLinks = [
  { label: "Home", href: "/" },

  { label: "Products", href: "/products" },

  { label: "About Us", href: "/about" },

  {
    label: "New Arrivals",
    href: "/new-arrivals",
  },

  { label: "Contact Us", href: "/contact" },
];

export default function Navbar({
  cartCount = 0,
  onCartClick = () => {},
}) {
  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [bump, setBump] = useState(false);

const prev = useRef(cartCount);

const firstLinkRef = useRef(null);

const navigate = useNavigate();

  /* CART BUMP */

  useEffect(() => {
    if (prev.current !== cartCount) {
      setBump(true);

      const t = setTimeout(() => {
        setBump(false);
      }, 400);

      prev.current = cartCount;

      return () => clearTimeout(t);
    }
  }, [cartCount]);

  /* ESC CLOSE */

  useEffect(() => {
    if (!mobileOpen) return;

    const onKey = (e) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
      }
    };

    window.addEventListener("keydown", onKey);

    firstLinkRef.current?.focus();

    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener(
        "keydown",
        onKey
      );

      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      {/* HEADER */}

      <header
        className="
          fixed top-0 left-0 z-[1000]

          w-full

          border-b border-gray-200

          bg-white/90

          backdrop-blur-md

          shadow-[0_4px_12px_rgba(0,0,0,0.06)]
        "
      >
        <div
          className="
            mx-auto

            flex
            h-[85px]
            max-w-[1280px]

            items-center
            justify-between

            gap-5

            px-6

            max-md:h-[78px]

            max-md:px-[18px]
          "
        >
          {/* LOGO */}

          <Link
            to="/"
            className="
              flex
              items-center

              no-underline
            "
          >
            <img
              src={logo}
              alt="CFOUR Logo"
              className="
                block

                w-[150px]

                cursor-pointer

                transition-transform
                duration-300

                hover:scale-105

                max-md:w-[120px]

                max-[480px]:w-[100px]
              "
            />
          </Link>

          {/* DESKTOP LINKS */}

          <nav
            className="
              hidden
              items-center

              gap-[34px]

              lg:flex
            "
          >
            {navLinks.map((l) => (
              <Link
                key={l.label}
                to={l.href}
                className="
                  inline-block

                  cursor-pointer

                  text-[15px]
                  font-medium

                  text-[#111]

                  transition-all
                  duration-300

                  hover:scale-105
                  hover:text-black
                "
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* DESKTOP ACTIONS */}

          <div
            className="
              hidden
              items-center

              gap-3

              lg:flex
            "
          >
            {/* CART */}

            <button
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
              "
              onClick={onCartClick}
              aria-label={`Open cart, ${cartCount} items`}
            >
              <ShoppingCart
                size={20}
                className="
                  transition-transform
                  duration-300

                  group-hover:-rotate-[15deg]
                "
              />

              <span>Cart</span>

              {cartCount > 0 && (
                <span
                  className={`
                    absolute
                    -right-[5px]
                    -top-[5px]

                    inline-flex
                    h-5
                    min-w-5

                    items-center
                    justify-center

                    rounded-full

                    border-2 border-white

                    bg-[#111]

                    px-[5px]

                    text-[10px]
                    font-bold

                    text-white

                    ${
                      bump
                        ? "animate-bounce"
                        : ""
                    }
                  `}
                >
                  {cartCount > 99
                    ? "99+"
                    : cartCount}
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
              "
            >
              <User size={16} />

              <span>Login / Register</span>
            </button>
          </div>

          {/* MOBILE */}

          <div
            className="
              flex
              items-center

              gap-[6px]

              lg:hidden
            "
          >
            {/* CART */}

            <button
  onClick={() => navigate("/login")}
              className="
                relative

                inline-flex
                items-center
                justify-center

                rounded-lg

                p-2

                text-[#111]

                transition-colors
                duration-300

                hover:bg-gray-100
              "
              onClick={onCartClick}
              aria-label="Open cart"
            >
              <ShoppingCart size={20} />

              {cartCount > 0 && (
                <span
                  className={`
                    absolute
                    -right-[3px]
                    -top-[3px]

                    inline-flex
                    h-4
                    min-w-4

                    items-center
                    justify-center

                    rounded-full

                    border border-white

                    bg-[#111]

                    px-1

                    text-[9px]
                    font-bold

                    text-white

                    ${
                      bump
                        ? "animate-bounce"
                        : ""
                    }
                  `}
                >
                  {cartCount > 99
                    ? "99+"
                    : cartCount}
                </span>
              )}
            </button>

            {/* MENU */}

            <button
              className="
                inline-flex
                items-center
                justify-center

                rounded-lg

                p-2

                text-[#111]

                transition-colors
                duration-300

                hover:bg-gray-100
              "
              onClick={() =>
                setMobileOpen(true)
              }
              aria-label="Open menu"
              aria-expanded={mobileOpen}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER */}

      {mobileOpen && (
        <div
          className="
            fixed inset-0 z-[1200]
          "
          role="dialog"
          aria-modal="true"
        >
          {/* OVERLAY */}

          <div
            className="
              absolute inset-0

              bg-black/45
            "
            onClick={() =>
              setMobileOpen(false)
            }
          />

          {/* PANEL */}

          <aside
            className="
              absolute
              right-0
              top-0
              bottom-0

              flex
              w-[85%]
              max-w-[360px]

              flex-col

              bg-white

              p-[22px]

              max-[480px]:w-full
              max-[480px]:max-w-full
            "
          >
            {/* HEADER */}

            <div
              className="
                flex
                items-center
                justify-between
              "
            >
              <span
                className="
                  text-[20px]
                  font-bold
                "
              >
                Menu
              </span>

              <button
                className="
                  inline-flex
                  items-center
                  justify-center

                  rounded-lg

                  p-2

                  text-[#111]

                  transition-colors
                  duration-300

                  hover:bg-gray-100
                "
                onClick={() =>
                  setMobileOpen(false)
                }
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            {/* LINKS */}

            <nav
              className="
                mt-[30px]

                flex
                flex-col

                gap-[6px]
              "
            >
              {navLinks.map((l, i) => (
                <Link
                  key={l.label}
                  to={l.href}
                  ref={
                    i === 0
                      ? firstLinkRef
                      : null
                  }
                  onClick={() =>
                    setMobileOpen(false)
                  }
                  className="
                    rounded-[10px]

                    px-[14px]
                    py-[14px]

                    text-[16px]
                    font-medium

                    text-[#111]

                    transition-all
                    duration-300

                    hover:translate-x-1
                    hover:bg-gray-100
                  "
                >
                  {l.label}
                </Link>
              ))}

              {/* LOGIN */}

              <button
                className="
                  mt-[14px]

                  inline-flex
                  items-center
                  justify-center

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