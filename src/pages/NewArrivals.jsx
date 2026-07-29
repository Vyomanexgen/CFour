import { useEffect } from "react";

import rightPanel from "../assets/newArrivals/right-img.webp";

import product1 from "../assets/newArrivals/product1.webp";
import product2 from "../assets/newArrivals/product2.webp";
import product3 from "../assets/newArrivals/product3.webp";

import { useQuery } from "@tanstack/react-query";
import { getStorefrontProducts } from "../api/storefrontApi";
import { useNavigate } from "react-router-dom";

export default function NewArrivals() {
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ["products", "new-arrivals"],
    queryFn: () => getStorefrontProducts({ sortBy: "createdAt", sortOrder: "desc", limit: 9 }),
  });

  const productsList = data?.data?.products || data?.products || [];

  return (
    <>
      {/* TOP BANNER */}
      <section className="w-full bg-[#ffffff] overflow-hidden">
        <div
          className="relative w-full flex flex-col md:flex-row items-center"
          style={{ aspectRatio: "956 / 345" }}
        >
          {/* LEFT CONTENT */}
          <div className="relative z-10 w-full md:w-[45%] pl-6 md:pl-14 pr-6 py-10 md:py-0 order-1">
            <h2 className="text-2xl md:text-4xl font-bold text-black leading-tight">
              Discover Our
            </h2>

            <h1 className="text-4xl md:text-6xl font-extrabold text-[#C8102E] leading-none mt-2">
              New Arrivals
            </h1>

            <p className="text-gray-700 mt-4 text-sm md:text-[16px] max-w-md leading-relaxed">
              Explore the latest in smart electrical solutions designed for
              modern living powering smarter living starts here.
            </p>

            <button 
              onClick={() => navigate("/products?sort=newest")}
              className="mt-6 bg-[#C8102E] hover:bg-[#a50d26] transition-all duration-300 text-white font-semibold px-7 py-3 rounded-full shadow-md text-lg cursor-pointer"
            >
              Shop Now
            </button>
          </div>

          {/* RIGHT IMAGE */}
          <div className="w-full md:absolute md:right-0 md:top-0 md:h-full md:w-[62%] overflow-hidden flex items-start justify-center order-2">
            <img
              src={rightPanel}
              alt="New arrivals banner"
              className="w-full h-auto mt-0 md:mt-[12px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section className="w-full bg-black py-10 px-4 md:px-10">
        {/* HEADING */}
        <div className="text-center">
          <h2 className="text-white text-3xl md:text-5xl font-bold">
            What’s new at <span className="text-[#e10600]">C⚡FOUR</span>
          </h2>

          <p className="text-white text-sm md:text-base mt-3 max-w-[850px] mx-auto leading-relaxed">
            Discover the latest in smart electrical solutions designed for
            modern living. Powering Smarter Living starts here.
          </p>
        </div>

        {/* PRODUCTS GRID */}
        {isLoading ? (
          <div className="flex justify-center mt-10">
            <div className="animate-pulse flex space-x-4">
              <div className="h-64 w-64 bg-gray-700 rounded-lg"></div>
              <div className="h-64 w-64 bg-gray-700 rounded-lg"></div>
              <div className="h-64 w-64 bg-gray-700 rounded-lg"></div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10 max-w-[1200px] mx-auto">
            {productsList.length > 0 ? productsList.map((item) => (
              <div
                key={item._id || item.id}
                className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col"
              >
                {/* IMAGE */}
                <div className="relative">
                  <img
                    src={item.images?.[0]?.url || item.images?.[0] || item.image || "https://placehold.co/300x280?text=No+Image"}
                    alt={item.name || item.title}
                    className="w-full h-[280px] object-cover"
                    onError={(e) => {
                      e.target.src = "https://placehold.co/300x280?text=No+Image";
                    }}
                  />

                  {/* TAG */}
                  <span className="absolute top-3 left-3 bg-[#f5eaea] text-[#d01a00] text-xs px-3 py-1 rounded-md font-medium">
                    New Arrival
                  </span>
                </div>

                {/* CONTENT */}
                <div className="px-4 py-5 text-center flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-3xl font-bold text-black">{item.name || item.title}</h3>
                    <p className="text-sm text-[#333] leading-[20px] mt-2 line-clamp-2">
                      {item.description || "Elegant design with long-lasting performance."}
                    </p>
                  </div>
                  <button 
                    onClick={() => navigate(`/products?id=${item._id || item.id}`)}
                    className="mt-4 bg-[#d01a00] hover:bg-[#b81600] text-white text-xl font-semibold px-5 py-1 rounded-full transition-all duration-300 w-fit mx-auto cursor-pointer"
                  >
                    View Details
                  </button>
                </div>
              </div>
            )) : (
              <p className="text-white text-center col-span-full">No new arrivals found.</p>
            )}
          </div>
        )}
      </section>
    </>
  );
}
