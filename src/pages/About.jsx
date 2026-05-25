import { useEffect, useRef, useState } from "react";

import topImg from "../assets/aboutus/top.webp";

import leftImg from "../assets/aboutus/left-image.webp";

import rightImg1 from "../assets/aboutus/right-image1.webp";
import rightImg2 from "../assets/aboutus/right-image2.webp";
import rightImg3 from "../assets/aboutus/right-image3.webp";

function Counter({ end, suffix = "", duration = 2000, startAnimation }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startAnimation) return;

    let startTimestamp = null;

    const animate = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;

      const progress = Math.min((timestamp - startTimestamp) / duration, 1);

      // SMOOTH EASE OUT

      const easeOut = 1 - Math.pow(1 - progress, 3);

      setCount(Math.floor(easeOut * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [startAnimation, end, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  const statsRef = useRef(null);

  const [startCount, setStartCount] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCount(true);
        }
      },
      {
        threshold: 0.3,
      },
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  return (
    <div
      className="
        w-full

        bg-black
        text-white

        pt-[85px]
      "
    >
      {/* TOP BANNER */}

      <section className="relative w-full overflow-hidden">
        <img
          src={topImg}
          alt="About Banner"
          className="
            h-[150px]
            w-full

            object-cover

            md:h-[180px]

            lg:h-[210px]
          "
        />

        <div
          className="
            absolute
            inset-0

            flex
            flex-col
            items-center
            justify-center

            px-4
            text-center
          "
        >
          <h1
            className="
              font-['Oswald']
              text-[32px]
              font-bold
              uppercase

              text-white

              md:text-[44px]

              lg:text-[56px]
            "
          >
            ABOUT US
          </h1>

          <p
            className="
              mt-2

              text-[14px]
              font-medium

              text-white

              md:text-[20px]

              lg:text-[26px]
            "
          >
            “Powering everyday spaces with innovation, quality, and trust.”
          </p>
        </div>
      </section>

      {/* CONTENT */}

      <section
        className="
          mx-auto
          max-w-[1600px]

          px-6
          py-10

          lg:px-10
          lg:py-14
        "
      >
        <div
          className="
            grid
            gap-10

            lg:grid-cols-2
          "
        >
          {/* LEFT */}

          <div>
            <p
              className="
                text-[24px]
                font-semibold

                text-gray-400
              "
            >
              Our Story
            </p>

            {/* TITLE */}

            <div
              className="
                mt-6

                flex
                items-start

                gap-5
              "
            >
              <div
                className="
                  mt-2

                  h-[95px]
                  w-[8px]

                  rounded-full

                  bg-gradient-to-b
                  from-[#ff7b7b]
                  to-[#d4003f]
                "
              />

              <div>
                <h2
                  className="
                    text-[34px]
                    font-bold
                    leading-tight

                    text-white

                    lg:text-[48px]
                  "
                >
                  Your Vision. Our Expertise.
                </h2>

                <h2
                  className="
                    text-[30px]
                    font-bold
                    leading-tight

                    text-white

                    lg:text-[44px]
                  "
                >
                  Powering Smarter Electrical Living.
                </h2>

                <p
                  className="
                    mt-2

                    text-[24px]
                    font-bold

                    text-[#ff2e63]
                  "
                >
                  Powering Smarter Living
                </p>
              </div>
            </div>

            {/* LARGE IMAGE */}

            <div className="mt-8 overflow-hidden rounded-[24px]">
              <img
                src={leftImg}
                alt="Living Room"
                className="
                  h-full
                  w-full

                  object-cover
                "
              />
            </div>
          </div>

          {/* RIGHT */}

          <div>
            {/* TOP IMAGES */}

            <div
              className="
                grid
                gap-4

                md:grid-cols-2
              "
            >
              <div
                className="
                  overflow-hidden
                  rounded-[24px]
                "
              >
                <img
                  src={rightImg1}
                  alt="Switch"
                  className="
                    h-full
                    w-full

                    object-cover
                  "
                />
              </div>

              <div
                className="
                  flex
                  flex-col

                  gap-4
                "
              >
                <div
                  className="
                    overflow-hidden
                    rounded-[24px]
                  "
                >
                  <img
                    src={rightImg2}
                    alt="Electrician"
                    className="
                      h-full
                      w-full

                      object-cover
                    "
                  />
                </div>

                <div
                  className="
                    overflow-hidden
                    rounded-[24px]
                  "
                >
                  <img
                    src={rightImg3}
                    alt="Switches"
                    className="
                      h-full
                      w-full

                      object-cover
                    "
                  />
                </div>
              </div>
            </div>

            {/* TEXT */}

            <div className="mt-6">
              <p
                className="
                  text-[18px]
                  leading-[1.8]

                  text-gray-200

                  lg:text-[22px]
                "
              >
                At <span className="font-bold text-[#ff2e63]">C⚡FOUR</span>, we
                specialize in delivering high-quality electrical products
                designed for safety, performance, and durability. From
                residential to commercial needs, our solutions are crafted to
                meet modern demands while ensuring reliability you can count on.
              </p>
            </div>

            {/* STATS */}

            <div
              ref={statsRef}
              className="
                mt-10

                grid
                grid-cols-2

                gap-8

                md:grid-cols-4
              "
            >
              <div>
                <h3
                  className="
                    text-[34px]
                    font-bold

                    text-white
                  "
                >
                  <Counter end={10} suffix="K+" startAnimation={startCount} />
                </h3>

                <p
                  className="
                    text-[14px]

                    text-gray-300
                  "
                >
                  Products Delivered
                </p>
              </div>

              <div>
                <h3
                  className="
                    text-[34px]
                    font-bold

                    text-white
                  "
                >
                  <Counter end={15} suffix="K+" startAnimation={startCount} />
                </h3>

                <p
                  className="
                    text-[14px]

                    text-gray-300
                  "
                >
                  Happy Customers
                </p>
              </div>

              <div>
                <h3
                  className="
                    text-[34px]
                    font-bold

                    text-white
                  "
                >
                  <Counter
                    end={10}
                    suffix="+ yrs"
                    startAnimation={startCount}
                  />
                </h3>

                <p
                  className="
                    text-[14px]

                    text-gray-300
                  "
                >
                  Industry Experience
                </p>
              </div>

              <div>
                <h3
                  className="
                    text-[34px]
                    font-bold

                    text-white
                  "
                >
                  <Counter end={40} suffix="+" startAnimation={startCount} />
                </h3>

                <p
                  className="
                    text-[14px]

                    text-gray-300
                  "
                >
                  Trusted Brands
                </p>
              </div>
            </div>

            {/* DOTS */}

            <div
              className="
                mt-10

                flex
                items-center

                gap-2
              "
            >
              <div
                className="
                  h-[22px]
                  w-[22px]

                  rounded-full

                  bg-white
                "
              />

              <div
                className="
                  h-[22px]
                  w-[22px]

                  rounded-full

                  bg-white/70
                "
              />

              <div
                className="
                  h-[22px]
                  w-[22px]

                  rounded-full

                  bg-white/50
                "
              />

              <div
                className="
                  h-[22px]
                  w-[22px]

                  rounded-full

                  bg-white/30
                "
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
