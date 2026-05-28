import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import switchImg from "../assets/switch.webp";
import spikeImg from "../assets/spike.webp";
import diningImg from "../assets/dining.webp";
import pipesImg from "../assets/pipes.webp";
import pipeImg from "../assets/pipe.webp";
import protectionImg from "../assets/protection.webp";

import image1 from "../assets/trending-products/image1.webp";
import image2 from "../assets/trending-products/image2.webp";
import image3 from "../assets/trending-products/image3.webp";

import offer1 from "../assets/Offer Product/image1.webp";
import offer2 from "../assets/Offer Product/image2.webp";
import offer3 from "../assets/Offer Product/image3.webp";

function MarqueeSlider({
  items,
  speed = 18,
  dark = false,
  cardSize = "square",
}) {
  const track = [...items, ...items, ...items];

  const sizeClass =
    cardSize === "card"
      ? "h-[280px] w-[220px] sm:h-[320px] sm:w-[260px] md:h-[380px] md:w-[300px] lg:h-[420px] lg:w-[340px]"
      : "h-[160px] w-[160px] sm:h-[200px] sm:w-[200px] md:h-[240px] md:w-[240px] lg:h-[280px] lg:w-[280px]";

  return (
    <div className="relative w-full overflow-hidden">
      {/* FADE LEFT */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-24"
        style={{
          background: dark
            ? "linear-gradient(to right, #111827, transparent)"
            : "linear-gradient(to right, #f2f2f2, transparent)",
        }}
      />

      {/* FADE RIGHT */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-24"
        style={{
          background: dark
            ? "linear-gradient(to left, #111827, transparent)"
            : "linear-gradient(to left, #f2f2f2, transparent)",
        }}
      />

      {/* TRACK */}
      <div
        className="flex w-max items-center"
        style={{ animation: `marqueeScroll ${speed}s linear infinite` }}
      >
        {track.map((src, i) => (
          <div key={i} className={`mx-4 shrink-0 ${sizeClass}`}>
            <img
              src={src}
              alt={`product-${i}`}
              className="
                h-full
                w-full
                object-cover
                transition-transform
                duration-300
                hover:scale-105
              "
            />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marqueeScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  );
}

function PremiumSection({
  zIndex,
  bg,
  smallTitle,
  title,
  description,
  image,
  dark = true,
  reverse = false,
  productKey,
}) {
  const navigate = useNavigate();

  const handleDiscover = () => {
    if (productKey) {
      navigate(`/products?category=${productKey}`);
    }
  };

  return (
    <section
      className={`
        relative
        sticky
        top-0
        ${zIndex}

        flex
        min-h-screen
        w-full
        items-center
        justify-center

        overflow-hidden

        ${bg}

        px-6
        py-20
      `}
    >
      {/* GLOW */}

      <div
        className="
        pointer-events-none
          absolute
          left-1/2
          top-1/2

          h-[500px]
          w-[500px]

          -translate-x-1/2
          -translate-y-1/2

          rounded-full

          bg-white/5

          blur-3xl
        "
      />

      {/* CONTENT */}

      <div
        className={`
          relative
          z-10

          mx-auto

          flex
          max-w-[1400px]
          flex-col
          items-center
          justify-between

          gap-16

          lg:flex-row

          ${reverse ? "lg:flex-row-reverse" : "lg:flex-row"}
        `}
      >
        {/* TEXT */}

        <div
          className="
            flex
            max-w-[620px]
            flex-col
            items-start

            text-left
          "
        >
          <p
            className="
              mb-4

              text-[14px]
              font-medium
              uppercase
              tracking-[4px]

              text-red-500
            "
          >
            {smallTitle}
          </p>

          <h1
            className={`
              font-['Oswald']

              text-[42px]
              font-semibold
              uppercase
              leading-[1.05]

              md:text-[58px]

              lg:text-[76px]

              ${dark ? "text-white" : "text-black"}
            `}
          >
            {title}
          </h1>

          <p
            className={`
              mt-8
              max-w-[520px]

              text-[16px]
              leading-[1.8]

              md:text-[18px]

              ${dark ? "text-gray-300" : "text-gray-700"}
            `}
          >
            {description}
          </p>

          {/* BUTTON */}

          <button
            onClick={handleDiscover}
            className={`
              mt-10

              rounded-full
              border

              px-8
              py-4

              text-[16px]
              font-medium
              uppercase
              tracking-wide

              transition-all
              duration-300

              hover:-translate-y-[3px]

              ${
                dark
                  ? `
                    border-white
                    text-white

                    hover:bg-white
                    hover:text-black
                  `
                  : `
                    border-black
                    text-black

                    hover:bg-black
                    hover:text-white
                  `
              }
            `}
          >
            Discover More
          </button>
        </div>

        {/* IMAGE */}

        <div
          className="
            relative

            flex
            items-center
            justify-center
          "
        >
          {/* IMAGE GLOW */}

          <div
            className="
             pointer-events-none
              absolute

              h-[420px]
              w-[420px]

              rounded-full

              bg-white/10

              blur-3xl
            "
          />

          <img
            src={image}
            alt={title}
            className="
              relative
              z-10

              w-[280px]

              object-contain

              drop-shadow-[0_25px_45px_rgba(255,255,255,0.18)]

              transition-all
              duration-500

              hover:-translate-y-2
              hover:scale-[1.02]

              sm:w-[420px]

              lg:w-[620px]
            "
          />
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      {/* HERO */}

      <section
        className="
          sticky
          top-0
          z-[1]

          flex
          h-screen
          w-full
          flex-col
          items-center
          justify-center

          overflow-hidden

          bg-[#d9d9d9]
        "
      >
        <div className="text-center">
          <h1
            className="
              text-[34px]
              font-bold
              text-[#111]

              md:text-[48px]

              lg:text-[58px]
            "
          >
            Banner
          </h1>

          <p
            className="
              mt-5

              text-[24px]
              font-semibold
              text-[#111]

              md:text-[34px]

              lg:text-[52px]
            "
          >
            1728 × 800
          </p>
        </div>

        <div
          className="
            absolute
            bottom-[30px]

            animate-bounce

            flex
            flex-col
            items-center

            text-[#777]
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-40"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="-mt-3"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </section>

      {/* SWITCH — text left, image right */}
      <PremiumSection
        zIndex="z-[2]"
        bg="bg-black"
        smallTitle="PREMIUM SURFACE BOX COLLECTION"
        title="MODULAR DESIGN FOR MODERN INSTALLATIONS"
        description="Durable CFOUR Surface Boxes crafted for clean installations, flexible module configurations, and seamless modern electrical setups."
        image={spikeImg}
        reverse={false}
        productKey="switch"
      />

      {/* LIGHTS — image left, text right */}
      <PremiumSection
        zIndex="z-[3]"
        bg="bg-[#b3aaa2]"
        smallTitle="Premium Lighting Collection"
        title="MODERN LIGHTING FOR ELEGANT SPACES"
        description="Premium ceiling lights and decorative lighting solutions crafted to elevate interiors with modern style and efficient illumination."
        image={diningImg}
        dark={false}
        reverse={true}
        productKey="lights"
      />

      {/* PIPES — text left, image right */}
      <PremiumSection
        zIndex="z-[4]"
        bg="bg-[radial-gradient(circle,#2d3440,#111827)]"
        smallTitle="Industrial Pipe Systems"
        title="RELIABLE FLOW, LASTING STRENGTH"
        description="Engineered piping solutions delivering durability, reliability, and consistent performance across residential and industrial projects."
        image={pipesImg}
        reverse={false}
        productKey="pipes"
      />

      {/* PLUMBING — image left, text right */}
      <PremiumSection
        zIndex="z-[5]"
        bg="bg-[#d8cec5]"
        smallTitle="ADVANCED PIPE SOLUTIONS"
        title="RELIABLE FLOW FOR MODERN PLUMBING"
        description="Durable West Pipes designed for efficient water flow, superior strength, and dependable performance across residential and commercial projects."
        image={pipeImg}
        dark={false}
        reverse={true}
        productKey="plumbing"
      />

      {/* PROTECTION — text left, image right */}
      <PremiumSection
        zIndex="z-[6]"
        bg="bg-[radial-gradient(circle,#3f8745,#0b3d0f)]"
        smallTitle="Advanced Protection Systems"
        title="ADVANCED SAFETY FOR MODERN INFRASTRUCTURE"
        description="Reliable circuit protection systems built to safeguard critical electrical networks with uncompromising safety."
        image={protectionImg}
        reverse={false}
        productKey="protection"
      />

      {/* TRENDING PRODUCTS */}

      <section
        className="
          sticky
          top-0
          z-[7]

          flex
          h-screen
          w-full
          flex-col
          items-center
          justify-center

          overflow-hidden

          bg-[#f2f2f2]

          px-6
          py-24
        "
      >
        <h2
          className="
            mb-20

            text-center

            font-['Oswald']
            text-[34px]
            font-semibold
            uppercase

            text-black

            md:text-[44px]

            lg:text-[52px]
          "
        >
          Trending Products
        </h2>

        <MarqueeSlider
          items={[image1, image2, image3]}
          speed={18}
          dark={false}
          cardSize="square"
        />
      </section>

      {/* OFFER PRODUCTS */}

      <section
        className="
          sticky
          top-0
          z-[8]

          flex
          h-screen
          w-full
          flex-col
          items-center
          justify-center

          overflow-hidden

          bg-[radial-gradient(circle_at_top,#2f3b4d,#111827)]

          px-6
          py-24
        "
      >
        <h2
          className="
            mb-20

            text-center

            font-['Oswald']
            text-[34px]
            font-semibold
            uppercase

            text-white

            md:text-[44px]

            lg:text-[52px]
          "
        >
          Offer Product
        </h2>

        <MarqueeSlider
          items={[offer1, offer2, offer3]}
          speed={20}
          dark={true}
          cardSize="card"
        />
      </section>

      {/* RECOMMENDATIONS */}

      <section
        className="
          sticky
          top-0
          z-[9]

          flex
          h-screen
          w-full
          flex-col
          items-center
          justify-center

          overflow-hidden

          bg-[#f7f7f7]

          px-6
          py-24
        "
      >
        <h2
          className="
            mb-20

            text-center

            font-['Oswald']
            text-[34px]
            font-semibold
            uppercase

            text-black

            md:text-[44px]

            lg:text-[52px]
          "
        >
          Recommendations
        </h2>

        <MarqueeSlider
          items={[image1, image2, image3]}
          speed={16}
          dark={false}
          cardSize="square"
        />
      </section>
    </>
  );
}
