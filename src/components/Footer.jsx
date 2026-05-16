import {
  RiInstagramLine,
  RiLinkedinBoxFill,
  RiTwitterXLine,
  RiFacebookCircleFill,
  RiMapPinLine,
  RiPhoneLine,
  RiMailLine,
  RiTimeLine,
} from "@remixicon/react";

import logo from "../assets/logo.png";

export default function Footer() {
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
            At Cfour, we provide innovative and dependable electrical products
            that power homes and businesses with confidence.
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
            <RiInstagramLine size={28} />

            <RiLinkedinBoxFill size={28} />

            <RiTwitterXLine size={28} />

            <RiFacebookCircleFill size={28} />
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
            <li>Home</li>

            <li>Products</li>

            <li>About Us</li>

            <li>New Arrivals</li>

            <li>Contact Us</li>
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
            <li>Pipes</li>

            <li>Lights</li>

            <li>Switches</li>

            <li>Modular Plates</li>

            <li>Sockets</li>
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

              <span>xyz street</span>
            </div>

            <div className="flex items-center gap-3">
              <RiPhoneLine size={22} />

              <span>+91 8678979878</span>
            </div>

            <div className="flex items-center gap-3">
              <RiMailLine size={22} />

              <span>cfour@gmail.com</span>
            </div>

            <div className="flex items-center gap-3">
              <RiTimeLine size={22} />

              <span>Mon–Sun | 10AM–7PM</span>
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

          text-[16px]
          font-medium
          leading-[1.6]

          text-black

          lg:text-[20px]
        "
      >
        <p>© 2026 C ⚡ FOUR. All Rights Reserved.</p>

        <p>Designed for smarter living.</p>
      </div>
    </footer>
  );
}
