import { useState, useRef } from "react";

import heroImg from "../assets/products/hero.png";
import allProductsTop from "../assets/products/allProducts-top.png";

/* PIPES */
import PvcPipes from "../assets/products/PvcPipes.png";
import CpvcPipes from "../assets/products/CpvcPipes.png";
import UpvcPipes from "../assets/products/UpvcPipes.png";
import HdpePipes from "../assets/products/HdpePipes.png";
import PipeFittings from "../assets/products/PipeFittings.png";

/* LIGHTS */
import CeilingLights from "../assets/products/CeilingLights.png";
import CeilingLights1 from "../assets/products/CeilingLights1.png";
import LedBulb from "../assets/products/LedBulb.png";
import LedLights from "../assets/products/LedLights.png";
import BedLights from "../assets/products/BedLights.png";

/* ALL PRODUCTS */
import image1 from "../assets/products/image1.png";
import image2 from "../assets/products/image2.png";
import image3 from "../assets/products/image3.png";
import image4 from "../assets/products/image4.png";
import image5 from "../assets/products/image5.png";
import image6 from "../assets/products/image6.png";
import image7 from "../assets/products/image7.png";
import image8 from "../assets/products/image8.png";
import image9 from "../assets/products/image9.png";
import image10 from "../assets/products/image10.png";
import image11 from "../assets/products/image11.png";
import image12 from "../assets/products/image12.png";
import image13 from "../assets/products/image13.png";
import image14 from "../assets/products/image14.png";

export default function Products({ addToCart }) {
  const [selectedCategory, setSelectedCategory] = useState("products");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("Specifications");
  const [selectedColor, setSelectedColor] = useState("green");

  const pipesRef = useRef(null);
  const lightsRef = useRef(null);
  const allProductsRef = useRef(null);
  const detailRef = useRef(null);

  /* PIPES */

  const pipeProducts = [
    { image: PvcPipes },
    { image: CpvcPipes },
    { image: UpvcPipes },
    { image: HdpePipes },
    { image: PipeFittings },
  ];

  /* LIGHTS */

  const lightProducts = [
    { image: CeilingLights },
    { image: LedBulb },
    { image: LedLights },
    { image: CeilingLights1 },
    { image: BedLights },
  ];

  /* ALL PRODUCTS - PAGE 1 */

  const allProductsPage1 = [
    {
      image: image1,
      title: "CFOUR PVC Pipes",
    },
    {
      image: image2,
      title: "CFOUR Conduit Bends",
    },
    {
      image: image3,
      title: "CFOUR T-Bow Fittings",
    },
    {
      image: image4,
      title: "CFOUR Bow Fittings",
    },
    {
      image: image5,
      title: "CFOUR L-Bow Fittings",
    },
    {
      image: image6,
      title: "CFOUR Pipe",
    },
  ];

  /* ALL PRODUCTS - PAGE 2 */

  const allProductsPage2 = [
    {
      image: image7,
      title: "CFOUR PVC Pipes",
    },
    {
      image: image8,
      title: "CFOUR Conduit Bends",
    },
    {
      image: image9,
      title: "CFOUR T-Bow Fittings",
    },
    {
      image: image10,
      title: "CFOUR Bow Fittings",
    },
    {
      image: image11,
      title: "CFOUR L-Bow Fittings",
    },
    {
      image: image12,
      title: "CFOUR Pipe",
    },
  ];

  /* ALL PRODUCTS - PAGE 3 */

  const allProductsPage3 = [
    {
      image: image13,
      title: "CFOUR PVC Pipes",
    },
    {
      image: image14,
      title: "CFOUR Conduit Bends",
    },
  ];

  /* GET CURRENT PAGE PRODUCTS */

  const getCurrentPageProducts = () => {
    if (currentPage === 1) return allProductsPage1;
    if (currentPage === 2) return allProductsPage2;
    if (currentPage === 3) return allProductsPage3;
    return allProductsPage1;
  };

  /* HANDLE PAGE CHANGE */

  const handlePageChange = (page) => {
    setCurrentPage(page);

    allProductsRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  /* HANDLE VIEW DETAILS */

  const handleViewDetails = (item) => {
    setSelectedProduct(item);
    setActiveTab("Specifications");
    setSelectedColor("green");

    setTimeout(() => {
      detailRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  /* HANDLE BACK */

  const handleBack = () => {
    setSelectedProduct(null);

    allProductsRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  /* RELATED PRODUCTS */

  const relatedProducts = getCurrentPageProducts();

  return (
    <>
      {/* SEARCH BAR */}

      <section className="w-full bg-[#f5f5f5] pt-24 pb-6 px-6">
        <div
          className="
          max-w-5xl
          mx-auto
          flex
          items-center
          bg-white
          rounded-full
          overflow-hidden
          shadow-lg
          border
          border-gray-200
          "
        >
          {/* CATEGORY */}

          <select
            value={selectedCategory}
            onChange={(e) => {
              const value = e.target.value;

              setSelectedCategory(value);
              setCurrentPage(1);
              setSelectedProduct(null);

              setTimeout(() => {
                if (value === "pipes") {
                  pipesRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }

                if (value === "lights") {
                  lightsRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }

                if (value === "all") {
                  allProductsRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
                }
              }, 100);
            }}
            className="
            px-6
            py-4
            text-lg
            font-medium
            bg-transparent
            outline-none
            border-r
            border-gray-200
            text-gray-700
            min-w-[180px]
            "
          >
            <option value="products">Products</option>
            <option value="pipes">Pipes</option>
            <option value="lights">Lights</option>
            <option value="all">All Products</option>
          </select>

          {/* INPUT */}

          <input
            type="text"
            placeholder="Search products here..."
            className="
            flex-1
            px-6
            py-4
            text-lg
            outline-none
            text-gray-700
            placeholder:text-gray-400
            "
          />

          {/* BUTTON */}

          <button
            className="
            bg-black
            text-white
            px-8
            py-4
            text-xl
            hover:bg-gray-800
            transition
            "
          >
            🔍
          </button>
        </div>
      </section>

      {/* HERO IMAGE */}

      {selectedCategory !== "all" && (
        <section className="w-full bg-black overflow-hidden">
          <img
            src={heroImg}
            alt="Products Hero"
            className="
            w-full
            object-cover
            object-top
            "
          />
        </section>
      )}

      {/* DEFAULT PRODUCTS PAGE */}

      {selectedCategory === "products" && (
        <>
          {/* PIPES */}

          <section
            ref={pipesRef}
            className="
            w-full
            py-10
            bg-[#d9d9d9]
            overflow-hidden
            "
          >
            <div className="px-6">
              <h2 className="text-4xl font-semibold mb-8">Pipes</h2>

              <div
                className="
                flex
                gap-6
                overflow-x-auto
                pb-4
                no-scrollbar
                "
              >
                {pipeProducts.map((item, index) => (
                  <div
                    key={index}
                    className="
                    min-w-[280px]
                    bg-[#f5f5f5]
                    rounded-md
                    p-5
                    flex-shrink-0
                    shadow-md
                    "
                  >
                    <img
                      src={item.image}
                      alt="pipe"
                      className="
                      w-full
                      h-[320px]
                      object-contain
                      scale-110
                      "
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* LIGHTS */}

          <section
            ref={lightsRef}
            className="
            w-full
            py-10
            bg-[#d9d9d9]
            overflow-hidden
            "
          >
            <div className="px-6">
              <h2 className="text-4xl font-semibold mb-8">Lights</h2>

              <div
                className="
                flex
                gap-6
                overflow-x-auto
                pb-4
                no-scrollbar
                "
              >
                {lightProducts.map((item, index) => (
                  <div
                    key={index}
                    className="
                    min-w-[280px]
                    bg-[#f5f5f5]
                    rounded-md
                    p-5
                    flex-shrink-0
                    shadow-md
                    "
                  >
                    <img
                      src={item.image}
                      alt="light"
                      className="
                      w-full
                      h-[320px]
                      object-contain
                      scale-110
                      "
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* ONLY PIPES */}

      {selectedCategory === "pipes" && (
        <section
          ref={pipesRef}
          className="
          w-full
          py-10
          bg-[#d9d9d9]
          overflow-hidden
          "
        >
          <div className="px-6">
            <h2 className="text-4xl font-semibold mb-8">Pipes</h2>

            <div
              className="
              flex
              gap-6
              overflow-x-auto
              pb-4
              no-scrollbar
              "
            >
              {pipeProducts.map((item, index) => (
                <div
                  key={index}
                  className="
                  min-w-[280px]
                  bg-[#f5f5f5]
                  rounded-md
                  p-5
                  flex-shrink-0
                  shadow-md
                  "
                >
                  <img
                    src={item.image}
                    alt="pipe"
                    className="
                    w-full
                    h-[320px]
                    object-contain
                    scale-110
                    "
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ONLY LIGHTS */}

      {selectedCategory === "lights" && (
        <section
          ref={lightsRef}
          className="
          w-full
          py-10
          bg-[#d9d9d9]
          overflow-hidden
          "
        >
          <div className="px-6">
            <h2 className="text-4xl font-semibold mb-8">Lights</h2>

            <div
              className="
              flex
              gap-6
              overflow-x-auto
              pb-4
              no-scrollbar
              "
            >
              {lightProducts.map((item, index) => (
                <div
                  key={index}
                  className="
                  min-w-[280px]
                  bg-[#f5f5f5]
                  rounded-md
                  p-5
                  flex-shrink-0
                  shadow-md
                  "
                >
                  <img
                    src={item.image}
                    alt="light"
                    className="
                    w-full
                    h-[320px]
                    object-contain
                    scale-110
                    "
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ALL PRODUCTS */}

      {selectedCategory === "all" && (
        <>
          {/* ======================== */}
          {/* PRODUCT DETAIL FULL VIEW */}
          {/* ======================== */}

          {selectedProduct && (
            <section
              ref={detailRef}
              className="
              w-full
              bg-[#efefef]
              py-10
              px-6
              "
            >
              <div className="max-w-7xl mx-auto">
                {/* BREADCRUMB */}

                <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                  <button
                    onClick={handleBack}
                    className="
                    hover:text-black
                    transition
                    "
                  >
                    All Products
                  </button>

                  <span>/</span>

                  <span className="text-black font-medium">
                    {selectedProduct.title}
                  </span>
                </div>

                {/* DETAIL CONTENT */}

                <div className="flex gap-10">
                  {/* LEFT - THUMBNAILS + MAIN IMAGE */}

                  <div className="flex gap-4">
                    {/* THUMBNAILS */}

                    <div className="flex flex-col gap-3">
                      {[0, 1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="
                          w-16
                          h-16
                          bg-gray-200
                          rounded-md
                          border
                          border-gray-300
                          flex-shrink-0
                          "
                        />
                      ))}
                    </div>

                    {/* MAIN IMAGE */}

                    <div
                      className="
                      w-[340px]
                      h-[340px]
                      bg-gray-200
                      rounded-md
                      border
                      border-gray-300
                      flex
                      items-center
                      justify-center
                      "
                    >
                      <img
                        src={selectedProduct.image}
                        alt={selectedProduct.title}
                        className="
                        w-full
                        h-full
                        object-contain
                        p-4
                        "
                      />
                    </div>
                  </div>

                  {/* RIGHT - PRODUCT INFO */}

                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2">
                      {selectedProduct.title}
                    </h2>

                    {/* RATING */}

                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex text-yellow-400 text-lg">★★★★☆</div>

                      <span className="text-sm text-gray-500">
                        4 (128 Review)
                      </span>
                    </div>

                    {/* SPECS */}

                    <div className="space-y-1 text-gray-700 mb-4">
                      <p>
                        <span className="font-semibold">Size:</span>{" "}
                        {selectedProduct?.size || "19MM"}
                      </p>

                      <p>
                        <span className="font-semibold">Length:</span> 20ft
                      </p>

                      <p>
                        <span className="font-semibold">Code:</span> CF 001
                      </p>

                      <p>
                        <span className="font-semibold">Colour:</span> Green
                      </p>

                      <p>
                        <span className="font-semibold">Material:</span> PVC
                      </p>
                    </div>

                    {/* PRICE + BUTTONS */}

                    <div className="flex items-center gap-6 mb-6">
                      <span className="text-2xl font-bold">
                        ₹67.00
                        <span className="text-sm font-normal text-gray-500">
                          /piece
                        </span>
                      </span>

                      <div className="flex flex-col gap-2">
                        {/* ✅ DETAIL VIEW - ADD TO CART */}
                        <button
                          onClick={() => addToCart(selectedProduct)}
                          className="
                          bg-red-500
                          text-white
                          px-6
                          py-2
                          rounded-full
                          text-sm
                          hover:bg-red-600
                          transition
                          "
                        >
                          Add to Cart
                        </button>

                        <button
                          className="
                          border
                          border-red-500
                          text-red-500
                          px-6
                          py-2
                          rounded-full
                          text-sm
                          hover:bg-red-500
                          hover:text-white
                          transition
                          "
                        >
                          Request Quote
                        </button>
                      </div>
                    </div>

                    {/* COLOR SWATCHES */}

                    <div className="flex gap-3 mb-6">
                      <button
                        onClick={() => setSelectedColor("green")}
                        className={`
                        w-8
                        h-8
                        rounded-full
                        bg-green-600
                        ${selectedColor === "green" ? "ring-2 ring-offset-2 ring-green-600" : ""}
                        `}
                      />

                      <button
                        onClick={() => setSelectedColor("black")}
                        className={`
                        w-8
                        h-8
                        rounded-full
                        bg-black
                        ${selectedColor === "black" ? "ring-2 ring-offset-2 ring-black" : ""}
                        `}
                      />

                      <button
                        onClick={() => setSelectedColor("purple")}
                        className={`
                        w-8
                        h-8
                        rounded-full
                        bg-purple-600
                        ${selectedColor === "purple" ? "ring-2 ring-offset-2 ring-purple-600" : ""}
                        `}
                      />
                    </div>

                    {/* TABS */}

                    <div className="border-b border-gray-300 mb-4">
                      <div className="flex gap-6">
                        {[
                          "Specifications",
                          "Datasheets",
                          "Certifications",
                          "Applications",
                        ].map((tab) => (
                          <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`
                            pb-2
                            text-sm
                            font-medium
                            border-b-2
                            transition
                            ${
                              activeTab === tab
                                ? "border-red-500 text-red-500"
                                : "border-transparent text-gray-500 hover:text-black"
                            }
                            `}
                          >
                            {tab}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* TAB CONTENT - SPECIFICATIONS */}

                    {activeTab === "Specifications" && (
                      <table className="w-full text-sm border border-gray-200">
                        <tbody>
                          {[
                            { label: "Outer Diameter (mm)", value: "110" },
                            { label: "Wall Thickness (mm)", value: "4.2" },
                            { label: "Nominal Pressure (PN)", value: "16" },
                            { label: "Standard", value: "ISO 1452-2" },
                            { label: "Tensile Strength", value: "50 MPa" },
                            { label: "Impact Strength", value: "5 kJ/m²" },
                            {
                              label: "Chemical Resistance",
                              value: "Excellent",
                            },
                          ].map((row, i) => (
                            <tr key={i} className="border-b border-gray-200">
                              <td className="py-2 px-3 text-gray-600 bg-gray-50 w-1/2">
                                {row.label}
                              </td>

                              <td className="py-2 px-3">{row.value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}

                    {/* TAB CONTENT - DATASHEETS */}

                    {activeTab === "Datasheets" && (
                      <div className="text-sm text-gray-600 py-4">
                        Datasheet content will be available here.
                      </div>
                    )}

                    {/* TAB CONTENT - CERTIFICATIONS */}

                    {activeTab === "Certifications" && (
                      <div className="text-sm text-gray-600 py-4">
                        Certification details will be available here.
                      </div>
                    )}

                    {/* TAB CONTENT - APPLICATIONS */}

                    {activeTab === "Applications" && (
                      <div className="text-sm text-gray-600 py-4">
                        Application details will be available here.
                      </div>
                    )}
                  </div>
                </div>

                {/* RELATED PRODUCTS */}

                <div className="mt-16">
                  <h3 className="text-3xl font-bold mb-8">Related Products</h3>

                  <div className="relative flex items-center justify-center w-full">
                    {/* LEFT BUTTON */}

                    <button
                      className="
                      absolute
                      left-0
                      z-20
                      w-10
                      h-10
                      rounded-full
                      bg-white
                      border
                      border-gray-300
                      shadow-md
                      flex
                      items-center
                      justify-center
                      hover:bg-gray-100
                      transition
                      cursor-pointer
                      "
                    >
                      ‹
                    </button>

                    {/* PRODUCTS */}

                    <div
                      className="
                      flex
                      items-start
                      justify-center
                      gap-6
                      overflow-x-auto
                      no-scrollbar
                      w-full
                      px-16
                      py-2
                      scroll-smooth
                      "
                    >
                      {relatedProducts.map((item, index) => (
                        <div
                          key={index}
                          onClick={() => handleViewDetails(item)}
                          className="
                          min-w-[170px]
                          max-w-[170px]
                          flex
                          flex-col
                          items-center
                          text-center
                          cursor-pointer
                          group
                          "
                        >
                          {/* IMAGE */}

                          <div
                            className="
                            w-[170px]
                            h-[150px]
                            bg-[#e5e5e5]
                            rounded-md
                            border
                            border-gray-300
                            flex
                            items-center
                            justify-center
                            overflow-hidden
                            transition
                            duration-300
                            group-hover:shadow-xl
                            "
                          >
                            <img
                              src={item.image}
                              alt={item.title}
                              className="
                              w-full
                              h-full
                              object-contain
                              p-3
                              transition
                              duration-300
                              group-hover:scale-105
                              "
                            />
                          </div>

                          {/* TITLE */}

                          <p
                            className="
                            mt-4
                            text-lg
                            font-medium
                            leading-snug
                            transition
                            group-hover:text-red-500
                            "
                          >
                            {item.title}
                          </p>

                          {/* PRICE */}

                          <p className="text-gray-600 text-lg mt-1">
                            {item.price || "₹67.00"}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* RIGHT BUTTON */}

                    <button
                      className="
                      absolute
                      right-0
                      z-20
                      w-10
                      h-10
                      rounded-full
                      bg-white
                      border
                      border-gray-300
                      shadow-md
                      flex
                      items-center
                      justify-center
                      hover:bg-gray-100
                      transition
                      cursor-pointer
                      "
                    >
                      ›
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ====================== */}
          {/* ALL PRODUCTS GRID VIEW */}
          {/* ====================== */}

          {!selectedProduct && (
            <section
              className="
              w-full
              bg-[#efefef]
              py-10
              "
            >
              {/* TOP IMAGE */}

              <div className="px-6 mb-10">
                <img
                  src={allProductsTop}
                  alt="All Products"
                  className="
                  w-full
                  rounded-md
                  shadow-lg
                  "
                />
              </div>

              {/* PRODUCTS */}

              <div className="max-w-7xl mx-auto flex gap-6 px-6">
                {/* SIDEBAR */}

                <div
                  className="
                  w-[260px]
                  bg-white
                  p-5
                  rounded-md
                  shadow-md
                  h-fit
                  "
                >
                  <h2 className="text-xl font-bold mb-5">
                    Product Catalog & Filters
                  </h2>

                  {/* CATEGORY */}

                  <div className="mb-6">
                    <h3 className="font-bold text-lg mb-3">
                      Browse by Category
                    </h3>

                    {/* PIPE TYPE */}

                    <div className="mb-5">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold">Pipe Type</h4>

                        <span>⌃</span>
                      </div>

                      <ul className="space-y-1 text-gray-700 text-sm pl-4">
                        <li>• PVC Pipes</li>
                        <li>• UPVC Pipes</li>
                        <li>• CPVC Pipes</li>
                        <li>• HDPE Pipes</li>
                      </ul>
                    </div>

                    {/* DIAMETER */}

                    <div className="mb-5">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold">Diameter</h4>

                        <span>⌃</span>
                      </div>

                      <ul className="space-y-1 text-gray-700 text-sm pl-4">
                        <li>• 1/2 inch</li>
                        <li>• 1 inch</li>
                        <li>• 2 inch</li>
                        <li>• 4 inch</li>
                        <li>• 6+ inch</li>
                      </ul>
                    </div>

                    {/* SCHEDULE */}

                    <div className="mb-5">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold">Schedule</h4>

                        <span>⌃</span>
                      </div>

                      <ul className="space-y-1 text-gray-700 text-sm pl-4">
                        <li>• Schedule 40</li>
                        <li>• Schedule 80</li>
                        <li>• Metric</li>
                      </ul>
                    </div>

                    {/* MATERIAL */}

                    <div className="mb-5">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold">Material</h4>

                        <span>⌃</span>
                      </div>

                      <ul className="space-y-1 text-gray-700 text-sm pl-4">
                        <li>• PVC</li>
                        <li>• UPVC</li>
                        <li>• CPVC</li>
                      </ul>
                    </div>

                    {/* FITTINGS */}

                    <div className="mb-5">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold">Fittings</h4>

                        <span>⌄</span>
                      </div>

                      <ul className="space-y-1 text-gray-700 text-sm pl-4">
                        <li>• Elbows</li>
                        <li>• Tees</li>
                        <li>• Couplings</li>
                        <li>• Flanges</li>
                      </ul>
                    </div>

                    {/* REFINE SEARCH */}

                    <div className="mt-8">
                      <h3 className="font-bold text-lg mb-4">Refine Search</h3>

                      {/* SIZE */}

                      <div className="mb-6">
                        <h4 className="font-semibold mb-2">Size Range (mm)</h4>

                        <input type="range" className="w-full" />

                        <div className="flex gap-2 mt-2">
                          <input
                            type="text"
                            className="
                            w-full
                            border
                            rounded
                            px-2
                            py-1
                            text-sm
                            "
                          />

                          <input
                            type="text"
                            className="
                            w-full
                            border
                            rounded
                            px-2
                            py-1
                            text-sm
                            "
                          />
                        </div>
                      </div>

                      {/* MATERIAL */}

                      <div className="mb-6">
                        <h4 className="font-semibold mb-2">Material</h4>

                        <div className="space-y-1 text-sm">
                          <label className="flex items-center gap-2">
                            <input type="checkbox" />
                            PVC
                          </label>

                          <label className="flex items-center gap-2">
                            <input type="checkbox" />
                            UPVC
                          </label>

                          <label className="flex items-center gap-2">
                            <input type="checkbox" />
                            CPVC
                          </label>
                        </div>
                      </div>

                      {/* APPLICATION */}

                      <div className="mb-6">
                        <h4 className="font-semibold mb-2">Application</h4>

                        <div className="space-y-1 text-sm">
                          <label className="flex items-center gap-2">
                            <input type="checkbox" />
                            Plumbing
                          </label>

                          <label className="flex items-center gap-2">
                            <input type="checkbox" />
                            Irrigation
                          </label>

                          <label className="flex items-center gap-2">
                            <input type="checkbox" />
                            Industrial
                          </label>

                          <label className="flex items-center gap-2">
                            <input type="checkbox" />
                            Drainage
                          </label>
                        </div>
                      </div>

                      {/* PRICE */}

                      <div className="mb-6">
                        <h4 className="font-semibold mb-2">Price Range ($)</h4>

                        <input type="range" className="w-full" />

                        <div className="flex gap-2 mt-2">
                          <input
                            type="text"
                            className="
                            w-full
                            border
                            rounded
                            px-2
                            py-1
                            text-sm
                            "
                          />

                          <input
                            type="text"
                            className="
                            w-full
                            border
                            rounded
                            px-2
                            py-1
                            text-sm
                            "
                          />
                        </div>
                      </div>

                      {/* CERTIFICATION */}

                      <div>
                        <h4 className="font-semibold mb-2">Certification</h4>

                        <div className="space-y-1 text-sm">
                          <label className="flex items-center gap-2">
                            <input type="checkbox" />
                            ISO
                          </label>

                          <label className="flex items-center gap-2">
                            <input type="checkbox" />
                            ASTM
                          </label>

                          <label className="flex items-center gap-2">
                            <input type="checkbox" />
                            NSF
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* PRODUCT GRID */}

                <div className="flex-1">
                  <h2 ref={allProductsRef} className="text-4xl font-bold mb-8">
                    All Products
                  </h2>

                  <div
                    className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    lg:grid-cols-3
                    gap-6
                    "
                  >
                    {getCurrentPageProducts().map((item, index) => (
                      <div
                        key={index}
                        className="
                        bg-white
                        rounded-md
                        overflow-hidden
                        shadow-md
                        border
                        "
                      >
                        <div className="bg-black">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="
                            w-full
                            h-[260px]
                            object-contain
                            "
                          />
                        </div>

                        <div className="p-4">
                          <h3 className="text-xl font-bold mb-3">
                            {item.title}
                          </h3>

                          <div className="space-y-1 text-gray-700">
                            <p>
                              <span className="font-semibold">Size:</span> 19MM
                            </p>
                            <p>
                              <span className="font-semibold">Length:</span>{" "}
                              20ft
                            </p>
                            <p>
                              <span className="font-semibold">Code:</span> CF001
                            </p>
                            <p>
                              <span className="font-semibold">Colour:</span>{" "}
                              Green
                            </p>
                            <p>
                              <span className="font-semibold">Material:</span>{" "}
                              PVC
                            </p>
                          </div>

                          <div className="flex gap-2 mt-5 flex-wrap">
                            <button
                              onClick={() => handleViewDetails(item)}
                              className="
                              border
                              border-red-500
                              text-red-500
                              px-3
                              py-1
                              rounded-full
                              text-sm
                              hover:bg-red-500
                              hover:text-white
                              transition
                              "
                            >
                              View Details
                            </button>

                            <button
                              className="
                              border
                              border-red-500
                              text-red-500
                              px-3
                              py-1
                              rounded-full
                              text-sm
                              hover:bg-red-500
                              hover:text-white
                              transition
                              "
                            >
                              Add to Quote
                            </button>

                            {/* ✅ GRID - ADD TO CART */}
                            <button
                              onClick={() => addToCart(item)}
                              className="
                              bg-red-500
                              text-white
                              px-3
                              py-1
                              rounded-full
                              text-sm
                              hover:bg-red-600
                              transition
                              "
                            >
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* PAGINATION */}

                  <div className="flex justify-center gap-3 mt-10">
                    {/* PREV BUTTON */}

                    <button
                      onClick={() => {
                        if (currentPage > 1) handlePageChange(currentPage - 1);
                      }}
                      disabled={currentPage === 1}
                      className="
                      w-12
                      h-12
                      border
                      bg-white
                      hover:bg-gray-200
                      disabled:opacity-40
                      disabled:cursor-not-allowed
                      "
                    >
                      &lt;
                    </button>

                    {/* PAGE 1 */}

                    <button
                      onClick={() => handlePageChange(1)}
                      className={`
                      w-12
                      h-12
                      border
                      ${currentPage === 1 ? "bg-red-500 text-white" : "bg-white hover:bg-gray-200"}
                      `}
                    >
                      1
                    </button>

                    {/* PAGE 2 */}

                    <button
                      onClick={() => handlePageChange(2)}
                      className={`
                      w-12
                      h-12
                      border
                      ${currentPage === 2 ? "bg-red-500 text-white" : "bg-white hover:bg-gray-200"}
                      `}
                    >
                      2
                    </button>

                    {/* PAGE 3 */}

                    <button
                      onClick={() => handlePageChange(3)}
                      className={`
                      w-12
                      h-12
                      border
                      ${currentPage === 3 ? "bg-red-500 text-white" : "bg-white hover:bg-gray-200"}
                      `}
                    >
                      3
                    </button>

                    {/* NEXT BUTTON */}

                    <button
                      onClick={() => {
                        if (currentPage < 3) handlePageChange(currentPage + 1);
                      }}
                      disabled={currentPage === 3}
                      className="
                      w-12
                      h-12
                      border
                      bg-white
                      hover:bg-gray-200
                      disabled:opacity-40
                      disabled:cursor-not-allowed
                      "
                    >
                      &gt;
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
}
