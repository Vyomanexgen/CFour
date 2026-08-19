import { useStore } from "../context/StoreContext";
import { Link } from "react-router-dom";
import {
  RiInstagramLine,
  RiLinkedinBoxFill,
  RiTwitterXLine,
  RiFacebookCircleFill,
  RiYoutubeFill,
  RiMapPinLine,
  RiPhoneLine,
  RiMailLine,
  RiTimeLine,
} from "@remixicon/react";

import logo from "../assets/logo.webp";

export default function Footer() {
  const { footerData, categories, socialLinks } = useStore();
  
  return (
    <footer
      className="
        relative z-[10]

        w-full

        overflow-hidden

        bg-[#f3f3f3]

        px-6
        py-10

        lg:px-12
      "
    >
      {/* BACKGROUND */}

      <div
        className="
          pointer-events-none

          absolute
          inset-0

          opacity-30
        "
      >
        <div
          className="
            absolute
            bottom-0
            left-0

            h-full
            w-full

            bg-[radial-gradient(circle_at_bottom_left,#d9d9d9,transparent_60%)]
          "
        />
      </div>

      {/* MAIN */}

      <div
        className="
          relative z-10

          mx-auto
          max-w-[1500px]

          grid
          gap-10

          md:grid-cols-2

          lg:grid-cols-4
        "
      >
        {/* LEFT */}

        <div>
          <img
            src={logo}
            alt="Logo"
            className="
              mb-5

              w-[170px]

              object-contain
            "
          />

          <p
            className="
              max-w-[320px]

              text-[16px]
              leading-[1.5]

              text-black

              lg:text-[18px]
            "
          >
            {footerData?.description || "At Cfour, we provide innovative and dependable electrical products that power homes and businesses with confidence."}
          </p>

          {/* SOCIAL */}

          <div
            className="
              mt-6

              flex
              items-center

              gap-4
            "
          >
            {socialLinks?.length > 0 ? (
              socialLinks.map((social, idx) => {
                let Icon = RiInstagramLine;
                if (social.platform === "Facebook") Icon = RiFacebookCircleFill;
                if (social.platform === "Twitter") Icon = RiTwitterXLine;
                if (social.platform === "LinkedIn") Icon = RiLinkedinBoxFill;
                if (social.platform === "YouTube") Icon = RiYoutubeFill;

                return (
                  <a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-red-600 transition"
                  >
                    <Icon size={28} />
                  </a>
                );
              })
            ) : (
              <>
                <RiInstagramLine size={28} />
                <RiLinkedinBoxFill size={28} />
                <RiTwitterXLine size={28} />
                <RiFacebookCircleFill size={28} />
              </>
            )}
          </div>
        </div>

        {/* QUICK LINKS */}

        <div>
          <h3
            className="
              mb-5

              text-[24px]
              font-semibold

              text-black
            "
          >
            Quick Links
          </h3>

          <ul
            className="
              space-y-4

              text-[18px]

              text-black
            "
          >
            {footerData?.quickLinks?.length > 0 ? (
              footerData.quickLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.url}
                    className="cursor-pointer hover:text-red-600 transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))
            ) : (
              <>
                <li>
                  <Link
                    to="/"
                    className="cursor-pointer hover:text-red-600 transition"
                  >
                    Home
                  </Link>
                </li>

                <li>
                  <Link
                    to="/products"
                    className="cursor-pointer hover:text-red-600 transition"
                  >
                    Products
                  </Link>
                </li>

                <li>
                  <Link
                    to="/about"
                    className="cursor-pointer hover:text-red-600 transition"
                  >
                    About Us
                  </Link>
                </li>

                <li>
                  <Link
                    to="/new-arrivals"
                    className="cursor-pointer hover:text-red-600 transition"
                  >
                    New Arrivals
                  </Link>
                </li>

                <li>
                  <Link
                    to="/contact"
                    className="cursor-pointer hover:text-red-600 transition"
                  >
                    Contact Us
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* CATEGORIES */}

        <div>
          <h3
            className="
              mb-5

              text-[24px]
              font-semibold

              text-black
            "
          >
            Categories
          </h3>

          <ul
            className="
              space-y-4

              text-[18px]

              text-black
            "
          >
            {categories && categories.length > 0 ? (
              categories.slice(0, 5).map((cat) => (
                <li key={cat._id || cat.slug}>
                  <Link
                    to={`/products?category=${cat.slug || cat.name.toLowerCase()}`}
                    className="cursor-pointer hover:text-red-600 transition capitalize"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))
            ) : (
              <>
                <li>
                  <Link
                    to="/products?category=pipes"
                    className="cursor-pointer hover:text-red-600 transition"
                  >
                    Pipes
                  </Link>
                </li>

                <li>
                  <Link
                    to="/products?category=lights"
                    className="cursor-pointer hover:text-red-600 transition"
                  >
                    Lights
                  </Link>
                </li>

                <li>
                  <Link
                    to="/products?category=switch"
                    className="cursor-pointer hover:text-red-600 transition"
                  >
                    Switches
                  </Link>
                </li>

                <li>Modular Plates</li>

                <li>Sockets</li>
              </>
            )}
          </ul>
        </div>

        {/* CONTACT */}

        <div>
          <h3
            className="
              mb-5

              text-[24px]
              font-semibold

              text-black
            "
          >
            Contact Us
          </h3>

          <div
            className="
              space-y-5

              text-[18px]

              text-black
            "
          >
            <div className="flex items-center gap-3">
              <RiMapPinLine size={22} />

              <span>{footerData?.contactUs?.address || "Gachibowli, Hyderabad, India"}</span>
            </div>

            <a
              href={`tel:${footerData?.contactUs?.phone || "+917867789876"}`}
              className="flex items-center gap-3 hover:text-red-700 transition-colors duration-200"
            >
              <RiPhoneLine size={22} />
              <span>{footerData?.contactUs?.phone || "+91 7867789876"}</span>
            </a>

            <a
              href={`mailto:${footerData?.contactUs?.email || "contact@cfour.com"}`}
              className="flex items-center gap-3 hover:text-red-700 transition-colors duration-200"
            >
              <RiMailLine size={22} />
              <span>{footerData?.contactUs?.email || "contact@cfour.com"}</span>
            </a>

            <div className="flex items-center gap-3">
              <RiTimeLine size={22} />

              <span>{footerData?.contactUs?.hours || "Mon–Sun | 10AM–7PM"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM */}

      <div
        className="
          relative z-10

          mt-12

          border-t border-black/10

          pt-6

          text-center

          text-[14px]
          font-medium
          leading-[1.6]

          text-black

          lg:text-[16px]
        "
      >
        <p>{footerData?.copyrightText || `© ${new Date().getFullYear()} C⚡FOUR. All Rights Reserved.`}</p>
      </div>
    </footer>
  );
}
