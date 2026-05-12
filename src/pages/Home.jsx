import { useEffect, useState } from "react";

import switchImg from "../assets/switch.png";
import diningImg from "../assets/dining.png";
import pipesImg from "../assets/pipes.png";
import wireImg from "../assets/wires.png";
import protectionImg from "../assets/protection.png";

import image1 from "../assets/trending-products/image1.png";
import image2 from "../assets/trending-products/image2.png";
import image3 from "../assets/trending-products/image3.png";

import offer1 from "../assets/Offer Product/image1.png";
import offer2 from "../assets/Offer Product/image2.png";
import offer3 from "../assets/Offer Product/image3.png";

function ProductCard({ image, large = false, alt }) {
  return (
    <div
      className={`
        flex
        shrink-0
        items-center
        justify-center

        ${
          large
            ? "h-[320px] w-[320px] lg:h-[420px] lg:w-[420px]"
            : "h-[240px] w-[240px] lg:h-[300px] lg:w-[300px]"
        }
      `}
    >
      <img
        src={image}
        alt={alt}
        className="
          w-full
          h-full
          object-contain

          transition-all
          duration-500
          ease-in-out
        "
      />
    </div>
  );
}

function ProductSlider({ items, intervalTime = 2000, alt }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % items.length);

        setFade(true);
      }, 300);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [items.length, intervalTime]);

  const leftImage = items[(activeIndex + 0) % items.length];

  const centerImage = items[(activeIndex + 1) % items.length];

  const rightImage = items[(activeIndex + 2) % items.length];

  return (
    <div
      className="
        mx-auto

        flex
        flex-col
        items-center
        justify-center

        gap-10

        md:flex-row
        md:gap-8

        lg:gap-14
      "
    >
      {/* LEFT */}

      <div
        className={`
          transition-opacity
          duration-500
          ease-in-out

          ${fade ? "opacity-100" : "opacity-0"}
        `}
      >
        <ProductCard image={leftImage} alt={alt} />
      </div>

      {/* CENTER */}

      <div
        className={`
          transition-opacity
          duration-500
          ease-in-out

          ${fade ? "opacity-100" : "opacity-0"}
        `}
      >
        <ProductCard image={centerImage} alt={alt} large />
      </div>

      {/* RIGHT */}

      <div
        className={`
          transition-opacity
          duration-500
          ease-in-out

          ${fade ? "opacity-100" : "opacity-0"}
        `}
      >
        <ProductCard image={rightImage} alt={alt} />
      </div>
    </div>
  );
}

function StickySection({
  zIndex,
  bg,
  title,
  image,
  imageClass,
  buttonDark = false,
}) {
  return (
    <section
      className={`
        sticky top-0 ${zIndex}

        flex h-screen w-full
        flex-col items-center justify-center

        overflow-hidden

        ${bg}

        px-5 py-[80px]
      `}
    >
      <h2
        className={`
          mb-10

          px-5

          text-center

          font-['Oswald']
          text-[28px]
          font-medium
          uppercase
          leading-tight

          md:text-[38px]
          lg:text-[54px]

          ${buttonDark ? "text-black" : "text-white"}
        `}
      >
        {title}
      </h2>

      <img src={image} alt={title} className={imageClass} />

      <button
        className={`
          mt-10

          rounded-full
          border-2

          px-[26px]
          py-[10px]

          text-[16px]

          transition-all
          duration-300

          sm:px-[42px]
          sm:py-[14px]
          sm:text-[22px]

          ${
            buttonDark
              ? `
                border-black
                text-black

                hover:bg-black
                hover:text-white
              `
              : `
                border-white
                text-white

                hover:bg-white
                hover:text-black
              `
          }
        `}
      >
        Discover More
      </button>
    </section>
  );
}

export default function Home() {
  return (
    <>
      {/* HERO */}

      <section
        className="
          sticky top-0 z-[1]

          flex h-screen w-full
          flex-col items-center justify-center

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

            rotate-90

            text-[28px]
            text-[#777]

            animate-bounce

            lg:text-[42px]
          "
        >
          ❯❯
        </div>
      </section>

      {/* SWITCH */}

      <StickySection
        zIndex="z-[2]"
        bg="bg-black"
        title="ELEVATING SPACES, ONE SWITCH AT A TIME"
        image={switchImg}
        imageClass="
          w-[260px]
          max-w-full

          object-contain

          sm:w-[380px]

          lg:w-[520px]
        "
      />

      {/* DINING */}

      <StickySection
        zIndex="z-[3]"
        bg="bg-[#e8e3dc]"
        title="CRAFTED TO GLOW BEAUTIFULLY"
        image={diningImg}
        imageClass="
          w-[300px]
          max-w-full

          object-contain

          md:w-[480px]

          lg:w-[700px]
        "
        buttonDark
      />

      {/* PIPES */}

      <StickySection
        zIndex="z-[4]"
        bg="bg-[radial-gradient(circle,#2d3440,#111827)]"
        title="RELIABLE FLOW, LASTING STRENGTH"
        image={pipesImg}
        imageClass="
          w-[260px]
          max-w-full

          object-contain

          md:w-[340px]

          lg:w-[650px]
        "
      />

      {/* WIRES */}

      <section
        className="
    sticky top-0 z-[5]

    flex h-screen w-full
    items-center justify-center

    overflow-hidden

    bg-[#b3aaa2]
  "
      >
        {/* HEADING */}

        <h2
          className="
      absolute
      top-6
      left-1/2
      z-20

      w-full

      -translate-x-1/2

      px-4

      text-center

      font-['Oswald']
      text-[18px]
      font-semibold
      uppercase
      leading-tight

      text-black

      sm:text-[24px]

      md:text-[34px]

      lg:text-[46px]
    "
        >
          RELIABLE PROTECTION FOR CRITICAL SYSTEMS
        </h2>

        {/* IMAGE */}

        <img
          src={wireImg}
          alt="Wires"
          className="
      relative

      -left-[4%]

      w-[68%]
      max-w-[1300px]

      object-contain
    "
        />

        {/* BUTTON */}

        <button
          className="
      absolute
      bottom-[7%]
      left-1/2
      z-20

      -translate-x-1/2

      rounded-full
      border-2 border-black

      px-6
      py-2

      text-[14px]
      font-medium
      text-black

      transition-all
      duration-300

      hover:bg-black
      hover:text-white

      md:px-8
      md:py-3
      md:text-[18px]
    "
        >
          Discover More
        </button>
      </section>

      {/* PROTECTION */}

      <StickySection
        zIndex="z-[6]"
        bg="bg-[radial-gradient(circle,#3f8745,#0b3d0f)]"
        title="RELIABLE PROTECTION FOR CRITICAL SYSTEMS"
        image={protectionImg}
        imageClass="
          w-[320px]
          max-w-full

          object-contain

          md:w-[460px]

          lg:w-[700px]
        "
      />

      {/* TRENDING PRODUCTS */}

      <section
        className="
          sticky top-0 z-[7]

          flex h-screen w-full
          flex-col items-center justify-center

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

        <ProductSlider
          items={[image1, image2, image3]}
          intervalTime={2500}
          alt="Trending Product"
        />
      </section>

      {/* OFFER PRODUCTS */}

      <section
        className="
          sticky top-0 z-[8]

          flex h-screen w-full
          flex-col items-center justify-center

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

        <ProductSlider
          items={[offer1, offer2, offer3]}
          intervalTime={2600}
          alt="Offer Product"
        />
      </section>

      {/* RECOMMENDATIONS */}

      <section
        className="
    sticky top-0 z-[9]

    flex h-screen w-full
    flex-col items-center justify-center

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

        <ProductSlider
          items={[image1, image2, image3]}
          intervalTime={2400}
          alt="Recommended Product"
        />
      </section>

    </>
  );
}


