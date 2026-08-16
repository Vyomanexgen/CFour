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

function MarqueeProductCard({ product, onClick }) {
  const image = product.images?.[0]?.url || product.images?.[0] || product.image || "https://placehold.co/300x200?text=No+Image";
  const name = product.name || product.title || "Product";
  
  // Robust price calculation across variants / defaultVariant / direct properties
  const variant = product.variants?.[0] || product.defaultVariant || {};
  const originalPrice = Number(variant.originalPrice ?? product.originalPrice ?? product.price ?? 0);
  const offerPrice = Number(variant.offerPrice ?? product.offerPrice ?? 0);
  
  const price = (offerPrice > 0 && (originalPrice === 0 || offerPrice < originalPrice))
    ? offerPrice
    : (originalPrice > 0 ? originalPrice : (offerPrice > 0 ? offerPrice : Number(product.price || 0)));
    
  const discount = (originalPrice > price && price > 0)
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;
  
  return (
    <div 
      onClick={() => onClick(product._id || product.id)}
      className="bg-white rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-2xl hover:border-red-100 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col h-full group relative cursor-pointer mx-3 sm:mx-4 shrink-0 w-[240px] sm:w-[270px] md:w-[300px] border border-neutral-100/90 select-none"
    >
      {/* Discount Badge */}
      {discount > 0 && (
        <div className="absolute top-3 left-3 z-10 bg-[#e31e24] text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
          {discount}% OFF
        </div>
      )}

      {/* Quick View Button (overlay) */}
      <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-all duration-200">
        <div className="bg-white/95 backdrop-blur-sm p-2 rounded-full shadow-md text-neutral-600 hover:text-[#e31e24] hover:scale-110 transition-transform">
           <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
        </div>
      </div>

      {/* Unified Aspect Ratio Image Container */}
      <div className="w-full aspect-[4/3] bg-neutral-50/70 relative overflow-hidden flex items-center justify-center p-4 sm:p-5 rounded-t-2xl border-b border-neutral-100/60">
        <div className="absolute inset-0 bg-gradient-to-t from-black/[0.02] to-transparent pointer-events-none" />
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-sm" 
          onError={(e) => {
            e.target.src = "https://placehold.co/300x200?text=No+Image";
          }}
        />
      </div>

      {/* Typography & Pricing */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between bg-white text-left relative z-20">
        <h3 className="text-sm sm:text-[15px] font-semibold text-neutral-800 leading-snug line-clamp-2 group-hover:text-[#e31e24] transition-colors duration-200">
          {name}
        </h3>
        
        <div className="mt-3 flex items-center justify-between">
           <div className="flex flex-col">
             {price < originalPrice && originalPrice > 0 && (
               <span className="text-[11px] text-neutral-400 line-through mb-0.5">₹{originalPrice.toLocaleString('en-IN')}</span>
             )}
             <span className="text-base sm:text-lg font-bold text-[#e31e24] leading-none">
               {price > 0 ? `₹${price.toLocaleString('en-IN')}` : "Request Quote"}
             </span>
           </div>
           
           <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center group-hover:bg-[#e31e24] transition-colors duration-300 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#e31e24] group-hover:text-white transition-colors"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
           </div>
        </div>
      </div>
    </div>
  );
}

function MarqueeSlider({
  items,
  speed = 18,
  dark = false,
  onItemClick
}) {
  const track = [...items, ...items, ...items];

  return (
    <div className="relative w-full overflow-hidden py-4">
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
        {track.map((item, i) => (
          <MarqueeProductCard key={i} product={item} onClick={onItemClick} />
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
              cursor-pointer
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

import { useStore } from "../context/StoreContext";
import { Link } from "react-router-dom";

export default function Home() {
  const { banners, newArrivals, offerProducts, loading, error } = useStore();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-black">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-white border-t-transparent" />
      </div>
    );
  }

  const activeBanners = banners && banners.length > 0 ? banners.filter(b => b.status === "active" || b.isActive !== false) : [];
  const featuredBanner = activeBanners[0];

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
        style={featuredBanner?.imageUrl || featuredBanner?.image ? {
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${featuredBanner.imageUrl || featuredBanner.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        } : undefined}
      >
        <div className="text-center max-w-[800px] px-6 text-white">
          <h1
            style={{ fontFamily: "'Great Vibes', cursive" }}
            className={`
              text-[48px]
              font-semibold
              ${featuredBanner?.image ? "text-white" : "text-[#111]"}

              md:text-[64px]

              lg:text-[86px]
            `}
          >
            {featuredBanner?.title || "Welcome to CFOUR"}
          </h1>

          <p
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
            className={`
              mt-5

              text-[22px]
              font-semibold
              italic
              ${featuredBanner?.image ? "text-gray-200" : "text-[#555]"}

              md:text-[28px]

              lg:text-[36px]
            `}
          >
            {featuredBanner?.subtitle || "Premium Electrical & Piping Solutions"}
          </p>
          
          {featuredBanner?.link && (
            <Link to={featuredBanner.link}>
              <button 
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
                className="mt-8 rounded-full bg-white px-10 py-4 text-[18px] font-semibold uppercase tracking-[2px] text-black transition-all hover:-translate-y-1 hover:bg-gray-200"
              >
                {featuredBanner?.ctaText || "SHOP NOW"}
              </button>
            </Link>
          )}
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

      {/* NEW ARRIVALS (Slider) */}

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
          New Arrivals
        </h2>

        {newArrivals && newArrivals.length > 0 ? (
          <MarqueeSlider
            items={newArrivals}
            speed={18}
            dark={false}
            onItemClick={(id) => navigate(`/products?productId=${id}`)}
          />
        ) : (
          <p className="text-gray-500 text-lg">No New Arrivals available at the moment.</p>
        )}
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

        {offerProducts && offerProducts.length > 0 ? (
          <MarqueeSlider
            items={offerProducts.filter(p => p !== null && p !== undefined)}
            speed={20}
            dark={true}
            onItemClick={(id) => navigate(`/products?productId=${id}`)}
          />
        ) : (
           <div className="text-center text-gray-400 mt-4">
             <p className="text-xl mb-4">No active promotional offers right now.</p>
           </div>
        )}
      </section>
    </>
  );
}