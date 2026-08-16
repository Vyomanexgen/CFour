import { useState, useRef, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import heroImg from "../assets/products/hero.webp";
import allProductsTop from "../assets/products/allProducts-top.webp";

/* PIPES */
import PvcPipes from "../assets/products/PvcPipes.webp";
import CpvcPipes from "../assets/products/CpvcPipes.webp";
import UpvcPipes from "../assets/products/UpvcPipes.webp";
import HdpePipes from "../assets/products/HdpePipes.webp";
import PipeFittings from "../assets/products/PipeFittings.webp";

/* PIPES & FITTINGS DETAILED */
import pf1 from "../assets/PIPES & FITTINGS/image1.webp";
import pf2 from "../assets/PIPES & FITTINGS/image2.webp";
import pf3 from "../assets/PIPES & FITTINGS/image3.webp";
import pf4 from "../assets/PIPES & FITTINGS/image4.webp";
import pf5 from "../assets/PIPES & FITTINGS/image5.webp";
import pf6 from "../assets/PIPES & FITTINGS/image6.webp";
import pf7 from "../assets/PIPES & FITTINGS/image7.webp";
import pf8 from "../assets/PIPES & FITTINGS/image8.webp";
import pf9 from "../assets/PIPES & FITTINGS/image9.webp";
import pf10 from "../assets/PIPES & FITTINGS/image10.webp";
import pf11 from "../assets/PIPES & FITTINGS/image11.webp";

/* LIGHTS CARDS */
import CeilingLights from "../assets/products/CeilingLights.webp";
import CeilingLights1 from "../assets/products/CeilingLights1.webp";
import LedBulb from "../assets/products/LedBulb.webp";
import LedLights from "../assets/products/LedLights.webp";
import BedLights from "../assets/products/BedLights.webp";

/* LIGHTS DETAILED */
import lt1 from "../assets/lights/image1.webp";
import lt2 from "../assets/lights/image2.webp";
import lt3 from "../assets/lights/image3.webp";
import lt4 from "../assets/lights/image4.webp";
import lt5 from "../assets/lights/image5.webp";
import lt6 from "../assets/lights/image6.webp";
import lt7 from "../assets/lights/image7.webp";
import lt8 from "../assets/lights/image8.webp";
import lt9 from "../assets/lights/image9.webp";
import lt10 from "../assets/lights/image10.webp";
import lt11 from "../assets/lights/image11.webp";
import lt12 from "../assets/lights/image12.webp";
import lt13 from "../assets/lights/image13.webp";
import lt14 from "../assets/lights/image14.webp";
import lt15 from "../assets/lights/image15.webp";
import lt16 from "../assets/lights/image16.webp";
import lt17 from "../assets/lights/image17.webp";
import lt18 from "../assets/lights/image18.webp";
import lt19 from "../assets/lights/image19.webp";
import lt20 from "../assets/lights/image20.webp";
import lt21 from "../assets/lights/image21.webp";
import lt22 from "../assets/lights/image22.webp";
import lt23 from "../assets/lights/image23.webp";
import lt24 from "../assets/lights/image24.webp";
import lt25 from "../assets/lights/image25.webp";

/* PROTECTION */
import SpnDoor from "../assets/home/image1.webp";
import TpnDoor from "../assets/home/image2.webp";
import Basbar from "../assets/home/image3.webp";

/* PLUMBING (West Pipe & Teflon Tape) */
import westPipeImg from "../assets/pipe.webp";
import teflonTapeImg from "../assets/tape.webp";

/* SWITCH / SURFACE BOX */
import surface1 from "../assets/surface/image1.webp";
import surface2 from "../assets/surface/image2.webp";
import surface3 from "../assets/surface/image3.webp";

/* ALL PRODUCTS */
import image1 from "../assets/products/image1.webp";
import image2 from "../assets/products/image2.webp";
import image3 from "../assets/products/image3.webp";
import image4 from "../assets/products/image4.webp";
import image5 from "../assets/products/image5.webp";
import image6 from "../assets/products/image6.webp";
import image7 from "../assets/products/image7.webp";
import image8 from "../assets/products/image8.webp";
import image9 from "../assets/products/image9.webp";
import image10 from "../assets/products/image10.webp";
import image11 from "../assets/products/image11.webp";
import image12 from "../assets/products/image12.webp";
import image13 from "../assets/products/image13.webp";
import image14 from "../assets/products/image14.webp";

/* ── SKELETON LOADER ── */
function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 animate-pulse">
      <div className="bg-gray-200 h-[220px] w-full" />
      <div className="p-4 space-y-3">
        <div className="h-5 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="h-4 bg-gray-200 rounded w-2/3" />
        <div className="flex gap-2 mt-4">
          <div className="h-9 bg-gray-200 rounded-full w-24" />
          <div className="h-9 bg-gray-200 rounded-full w-24" />
        </div>
      </div>
    </div>
  );
}

/* ── WISHLIST BUTTON ── */
function WishlistBtn({ productId, wishlisted, onToggle }) {
  return (
    <button
      aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
      onClick={(e) => {
        e.stopPropagation();
        onToggle(productId);
      }}
      className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-red-400 cursor-pointer"
    >
      <svg
        viewBox="0 0 24 24"
        className={`w-5 h-5 ${wishlisted ? "fill-red-500 stroke-red-500" : "fill-none stroke-gray-500"}`}
        strokeWidth="2"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  );
}

/* ── QUICK VIEW MODAL ── */
function QuickViewModal({ product, onClose, onAddToCart }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Quick view: ${product.title}`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 cursor-pointer"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          aria-label="Close quick view"
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
        >
          ✕
        </button>
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-56 object-contain bg-gray-50 rounded-xl mb-4"
          onError={(e) => {
            e.target.src = "https://placehold.co/400x300?text=No+Image";
          }}
        />
        <h3 className="text-xl font-bold mb-1">{product.title}</h3>
        <div
          className="flex text-yellow-400 text-sm mb-2"
          aria-label={`${product.rating} out of 5 stars`}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i}>{i < (product.rating || 4) ? "★" : "☆"}</span>
          ))}
          <span className="text-gray-400 ml-2 text-xs">
            ({product.reviews || 128})
          </span>
        </div>
        <p className="text-gray-500 text-sm mb-2">
          Size: 19MM · Length: 20ft · Material: PVC
        </p>
        {product.inStock !== undefined && (
          <span
            className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 ${product.inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
          >
            {product.inStock ? "✓ In Stock" : "✗ Out of Stock"}
          </span>
        )}
        <div className="flex gap-3 mt-2">
          <button
            onClick={() => {
              onAddToCart(product);
              onClose();
            }}
            className="flex-1 bg-red-500 text-white py-2 rounded-full text-sm font-semibold hover:bg-red-600 transition focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
          >
            Add to Cart
          </button>
          <button
            onClick={onClose}
            className="flex-1 border border-gray-300 py-2 rounded-full text-sm font-semibold hover:bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-gray-400 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── VARIANT DETAILS MODAL (size/spec dropdown) ── */
function VariantDetailsModal({
  groupTitle,
  image,
  variants,
  onClose,
  onAddToCart,
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = variants[selectedIndex];

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const numericPrice =
    parseFloat(String(selected.price).replace(/[^\d.]/g, "")) || 0;
  const mrp = Math.round(numericPrice * 1.4);
  const discount = mrp > 0 ? Math.round(((mrp - numericPrice) / mrp) * 100) : 0;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Details: ${groupTitle}`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 cursor-pointer"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          aria-label="Close details"
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
        >
          ✕
        </button>

        <div className="bg-gray-50 rounded-xl mb-4 h-56 overflow-hidden">
          <img
            src={image}
            alt={groupTitle}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "https://placehold.co/400x300?text=No+Image";
            }}
          />
        </div>

        <h3 className="text-xl font-bold mb-3">{groupTitle}</h3>

        {/* SIZE / SPEC DROPDOWN — only shown because variants.length > 1 (caller guarantees this) */}
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select Size / Specification
        </label>
        <select
          value={selectedIndex}
          onChange={(e) => setSelectedIndex(Number(e.target.value))}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-red-400 cursor-pointer"
        >
          {variants.map((v, i) => (
            <option key={i} value={i}>
              {v.description || v.name || v.label}
              {v.packing ? ` (${v.packing})` : ""}
            </option>
          ))}
        </select>

        {selected.code && (
          <p className="text-xs text-gray-500 mb-2">Code: {selected.code}</p>
        )}

        <div className="mb-2 flex items-baseline gap-2 flex-wrap">
          <span className="text-2xl font-bold text-gray-900">
            ₹{numericPrice.toLocaleString("en-IN")}
          </span>
          <span className="text-sm text-gray-400 line-through">
            ₹{mrp.toLocaleString("en-IN")}
          </span>
          <span className="text-sm text-green-700 font-semibold">
            ({discount}% off)
          </span>
        </div>

        <p className="text-xs text-gray-600 mb-4">
          {selected.packing ? `Packing: ${selected.packing} · ` : ""}
          <span className="font-medium">FREE delivery</span> in 2-4 days
        </p>

        <div className="flex gap-3 mt-2">
          <button
            onClick={() => {
              onAddToCart({
                description:
                  selected.description || selected.name || selected.label,
                price: selected.price,
                code: selected.code,
                packing: selected.packing,
              });
              onClose();
            }}
            className="flex-1 bg-[#FFD814] hover:bg-[#F7CA00] text-black py-2 rounded-full text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-yellow-400 cursor-pointer"
          >
            Add to Cart
          </button>
          <button
            onClick={onClose}
            className="flex-1 border border-gray-300 py-2 rounded-full text-sm font-semibold hover:bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-gray-400 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── AMAZON-STYLE GROUP CARD (one card per product, dropdown if multiple variants) ── */
function AmazonStyleGroupCard({ image, title, variants, onAddToCart, product, onQuickView, onViewDetails }) {
  const [showDetails, setShowDetails] = useState(false);
  const hasMultipleVariants = variants.length > 1;
  const first = variants[0];

  const numericPrice =
    parseFloat(String(first.price).replace(/[^\d.]/g, "")) || 0;
  const mrp = Math.round(numericPrice * 1.4);
  const discount = mrp > 0 ? Math.round(((mrp - numericPrice) / mrp) * 100) : 0;
  const displayDesc = first.description || first.name || first.label;

  return (
    <>
      {showDetails && (
        <VariantDetailsModal
          groupTitle={title}
          image={image}
          variants={variants}
          onClose={() => setShowDetails(false)}
          onAddToCart={(picked) =>
            onAddToCart({
              ...(product || {}), // Include product ID and details
              image,
              title: `${title} — ${picked.description}`,
              price: picked.price,
              code: picked.code,
              packing: picked.packing,
            })
          }
        />
      )}

      <div
        className="
          bg-white
          rounded-xl
          border
          border-gray-200
          shadow-sm
          hover:shadow-lg
          transition-all
          duration-300
          overflow-hidden
          flex
          flex-col
          h-full
          group
          relative
        "
      >
        {/* IMAGE — fills the box */}
        <div className="bg-[#3a3a3a] h-[200px] overflow-hidden relative">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              e.target.src = "https://placehold.co/300x200?text=No+Image";
            }}
          />
          {/* QUICK VIEW OVERLAY */}
          {onQuickView && product && (
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 z-10">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onQuickView(product);
                }}
                className="
                  bg-white
                  text-gray-800
                  text-xs
                  font-semibold
                  px-4
                  py-2
                  rounded-full
                  shadow-lg
                  hover:bg-red-500
                  hover:text-white
                  transition
                  focus:outline-none
                  focus:ring-2
                  focus:ring-red-400
                  cursor-pointer
                "
              >
                Quick View
              </button>
            </div>
          )}
        </div>

        {/* INFO */}
        <div className="p-4 flex flex-col flex-1">
          <h3 className="text-sm font-medium text-gray-900 leading-snug mb-1 line-clamp-2">
            {hasMultipleVariants ? title : `${title} — ${displayDesc}`}
          </h3>

          {!hasMultipleVariants && first.code && (
            <p className="text-xs text-gray-500 mb-2 line-clamp-1">
              Code: {first.code}
            </p>
          )}

          {hasMultipleVariants && (
            <p className="text-xs text-gray-500 mb-2">
              {variants.length} sizes available
            </p>
          )}

          {/* RATING */}
          <div className="flex items-center gap-1 mb-2">
            <span className="flex items-center gap-0.5 bg-green-700 text-white text-[11px] font-semibold px-1.5 py-0.5 rounded">
              4.0
              <svg
                className="w-2.5 h-2.5 fill-white ml-0.5"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </span>
            <span className="text-xs text-blue-600 underline">(50+)</span>
          </div>

          {/* PRICE */}
          <div className="mb-1 flex items-baseline gap-2 flex-wrap">
            <span className="text-lg font-bold text-gray-900">
              {hasMultipleVariants ? "From " : ""}₹
              {numericPrice.toLocaleString("en-IN")}
            </span>
            <span className="text-xs text-gray-400 line-through">
              ₹{mrp.toLocaleString("en-IN")}
            </span>
            <span className="text-xs text-green-700 font-semibold">
              ({discount}% off)
            </span>
          </div>

          {/* DELIVERY INFO */}
          <p className="text-xs text-gray-600 mb-3">
            {first.packing && !hasMultipleVariants
              ? `Packing: ${first.packing} · `
              : ""}
            <span className="text-gray-700 font-medium">FREE delivery</span>{" "}
            <span className="text-gray-500">in 2-4 days</span>
          </p>

          {/* VIEW DETAILS — ALWAYS SHOW */}
          <button
            onClick={() => {
              if (onViewDetails) {
                onViewDetails(product);
              }
            }}
            className="
              w-full
              border
              border-gray-300
              text-gray-700
              text-sm
              font-medium
              py-2
              rounded-full
              hover:bg-gray-50
              hover:border-gray-400
              transition
              focus:outline-none
              focus:ring-2
              focus:ring-gray-300
              min-h-[40px]
              cursor-pointer
              mb-2
            "
          >
            View Details
          </button>

          {/* CTA */}
          <button
            onClick={() => {
              if (hasMultipleVariants) {
                setShowDetails(true);
              } else {
                onAddToCart({
                  ...(product || {}), // Pass full product data so cart handles ID correctly
                  image,
                  title: `${title} — ${displayDesc}`,
                  price: first.price,
                  code: first.code,
                  packing: first.packing,
                });
              }
            }}
            aria-label={`Add ${title} to cart`}
            className="
              mt-auto
              w-full
              bg-[#FFD814]
              hover:bg-[#F7CA00]
              text-black
              text-sm
              font-semibold
              py-2
              rounded-full
              border
              border-[#FCD200]
              transition
              focus:outline-none
              focus:ring-2
              focus:ring-yellow-400
              min-h-[40px]
              cursor-pointer
            "
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
}

import { getStorefrontProducts, searchStorefrontProducts } from "../api/storefrontApi";
import { getProductReviews, submitReview } from "../api/reviewsApi";
import { getProductDetails } from "../api/storefrontApi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { useAuth } from "../context/AuthContext";
import { useStore } from "../context/StoreContext";

export default function Products() {
  const { addToCart: contextAddToCart, isCartUpdating } = useCart();
  const { user } = useAuth();
  const { categories: dynamicCategories, loading: isCategoriesLoading } = useStore();
  const toast = useToast();
  const queryClient = useQueryClient();
  const [addingProductIds, setAddingProductIds] = useState({});
  
  const addToCart = async (product, quantity = 1) => {
    const productId = product._id || product.productId;
    if (!productId) return;
    
    setAddingProductIds(prev => ({ ...prev, [productId]: true }));
    try {
      const res = await contextAddToCart(product, quantity);
      if (res && res.success) {
        toast.success(`"${product.name || product.title || "Item"}" added to cart successfully!`);
      } else {
        toast.error(res?.error || "Failed to add product to cart.");
      }
    } catch (err) {
      toast.error("Failed to add product to cart. Please try again.");
    } finally {
      setAddingProductIds(prev => ({ ...prev, [productId]: false }));
    }
  };


  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const selectedCategory = params.get("category") || "all";
  const searchQuery = params.get("search") || "";

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("Specifications");
  const [selectedColor, setSelectedColor] = useState("green");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const deepLinkProductId = params.get("productId");

  useEffect(() => {
    if (deepLinkProductId) {
      const fetchDeepLinkProduct = async () => {
        try {
          const res = await getProductDetails(deepLinkProductId);
          const product = res.data || res;
          if (product && (product._id || product.id)) {
            setSelectedProduct(product);
          }
        } catch (err) {
          console.error("Failed to fetch deep linked product:", err);
        }
      };
      fetchDeepLinkProduct();
    }
  }, [deepLinkProductId]);

  /* ── NEW STATE ── */
  const [productsList, setProductsList] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("default");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [wishlist, setWishlist] = useState([]);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [imgErrors, setImgErrors] = useState({});

  const [showDiameter, setShowDiameter] = useState(true);
  const [showMaterial, setShowMaterial] = useState(true);
  const [showFittings, setShowFittings] = useState(true);

  const [selectedDiameter, setSelectedDiameter] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedFittings, setSelectedFittings] = useState([]);

  const pipesRef = useRef(null);
  const lightsRef = useRef(null);
  const allProductsRef = useRef(null);
  const detailRef = useRef(null);
  const protectionRef = useRef(null);
  const plumbingRef = useRef(null);
  const switchRef = useRef(null);

  const { data: reviewsData, isLoading: reviewsLoading } = useQuery({
    queryKey: ["reviews", selectedProduct?._id || selectedProduct?.productId],
    queryFn: () => getProductReviews(selectedProduct?._id || selectedProduct?.productId),
    enabled: !!(selectedProduct?._id || selectedProduct?.productId),
  });

  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "" });
  
  const submitReviewMutation = useMutation({
    mutationFn: (data) => submitReview(data),
    onSuccess: () => {
      toast.success("Your review has been submitted and is awaiting approval.");
      setReviewForm({ rating: 5, comment: "" });
      // We don't invalidate because it is pending and won't show anyway
    },
    onError: () => {
      toast.error("Failed to submit review.");
    }
  });

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("You must be logged in to submit a review.");
      return;
    }
    if (!reviewForm.rating || !reviewForm.comment.trim()) {
      toast.error("Please provide a rating and a comment.");
      return;
    }
    submitReviewMutation.mutate({
      productId: selectedProduct._id || selectedProduct.productId,
      rating: reviewForm.rating,
      comment: reviewForm.comment
    });
  };

  const [apiError, setApiError] = useState(false);
  const legacySlugs = ["pipes", "lights", "protection", "plumbing", "switch", "products"];
  
  const matchedCategory = selectedCategory !== "all" 
    ? dynamicCategories?.find(c => c.slug === selectedCategory) 
    : null;
    
  const categoryId = matchedCategory?._id || matchedCategory?.id;
  const isLegacyCategory = legacySlugs.includes(selectedCategory);

  /* ── FETCH REAL DB PRODUCTS ── */
  useEffect(() => {
    let active = true;
    if (isCategoriesLoading) return; // Wait for categories to load

    const loadProducts = async () => {
      try {
        setIsLoading(true);
        setApiError(false);

        // If category is not "all" and not matched to a DB category, don't fetch products
        if (selectedCategory !== "all" && !matchedCategory) {
          setProductsList([]);
          setTotalPages(1);
          setIsLoading(false);
          return;
        }

        let res;
        if (searchQuery) {
          res = await searchStorefrontProducts(searchQuery, {
            page: currentPage,
            limit: 12,
          });
        } else {
          const queryParams = {
            page: currentPage,
            limit: 12,
          };
          if (categoryId) {
            queryParams.categoryId = categoryId; // Pass dynamic category ID
          }
          if (sortBy !== "default") {
            queryParams.sortBy = sortBy === "newest" ? "createdAt" : "name";
            queryParams.sortOrder = sortBy === "price-desc" ? "desc" : "asc";
          }
          res = await getStorefrontProducts(queryParams);
        }
        if (active) {
          const payload = res.data || res;
          setProductsList(payload.products || []);
          setTotalPages(payload.pagination?.totalPages || 1);
        }
      } catch (err) {
        console.error("Failed to fetch products list from backend", err);
        if (active) setApiError(true);
      } finally {
        if (active) setIsLoading(false);
      }
    };

    loadProducts();
    return () => {
      active = false;
    };
  }, [selectedCategory, currentPage, sortBy, searchQuery, isCategoriesLoading, categoryId, matchedCategory]);

  /* RESET & SCROLL WHEN CATEGORY CHANGES */
  useEffect(() => {
    setSelectedProduct(null);
    setCurrentPage(1);
    setSortBy("default");

    const timer = setTimeout(() => {
      if (selectedCategory === "pipes") {
        pipesRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      } else if (selectedCategory === "lights") {
        lightsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      } else if (selectedCategory === "all") {
        allProductsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      } else if (selectedCategory === "protection") {
        protectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      } else if (selectedCategory === "plumbing") {
        plumbingRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      } else if (selectedCategory === "switch") {
        switchRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [selectedCategory]);

  /* ── WISHLIST TOGGLE ── */
  const toggleWishlist = useCallback((id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }, []);

  /* ── IMAGE ERROR ── */
  const handleImgError = useCallback((id) => {
    setImgErrors((prev) => ({ ...prev, [id]: true }));
  }, []);

  /* PIPES */
  const pipeProducts = [
    { image: PvcPipes, title: "PVC Pipes" },
    { image: CpvcPipes, title: "CPVC Pipes" },
    { image: UpvcPipes, title: "UPVC Pipes" },
    { image: HdpePipes, title: "HDPE Pipes" },
    { image: PipeFittings, title: "Pipe Fittings" },
  ];

  // PIPES & FITTINGS detailed products
  const pipesFittingsProducts = [
    {
      image: pf1,
      title: "CFOUR PVC PIPES",
      specs: [
        { code: "CF 001", description: "19MM 1.0 GREEN", price: "67.00" },
        { code: "CF 002", description: "19MM 1.5 BLACK", price: "88.00" },
        { code: "CF 003", description: "19MM 2.0 BLUE", price: "117.00" },
        { code: "CF 004", description: "25MM 1.0 GREEN", price: "103.00" },
        { code: "CF 005", description: "25MM 1.5 BLACK", price: "118.00" },
        { code: "CF 006", description: "25MM 2.0 BLUE", price: "171.00" },
      ],
    },
    {
      image: pf2,
      title: "CFOUR CONDUIT BENDS",
      specs: [
        { code: "CF 007", description: "19MM 1.5", price: "8.00" },
        { code: "CF 008", description: "25MM 1.5", price: "10.00" },
        { code: "CF 009", description: "19MM 2.0", price: "12.00" },
        { code: "CF 010", description: "25MM 2.0", price: "14.00" },
      ],
    },
    {
      image: pf3,
      title: "CFOUR T & L BOW FITTINGS",
      specs: [
        { code: "CF 011", description: "19MM L. BOW", price: "4.00" },
        { code: "CF 012", description: "25MM L. BOW", price: "5.00" },
        { code: "CF 013", description: "19MM T", price: "5.00" },
        { code: "CF 014", description: "25MM T", price: "6.00" },
        { code: "CF 015", description: "19MM COUPLER", price: "4.00" },
        { code: "CF 016", description: "25MM COUPLER", price: "5.00" },
      ],
    },
    {
      image: pf4,
      title: "CFOUR JUNCTION BOXES",
      specs: [
        {
          code: "CF 017",
          description: "19MM 1-WAY JUNCTION BOX",
          price: "14.00",
        },
        {
          code: "CF 018",
          description: "19MM 2-WAY JUNCTION BOX",
          price: "14.00",
        },
        {
          code: "CF 019",
          description: "19MM 3-WAY JUNCTION BOX",
          price: "14.00",
        },
        {
          code: "CF 020",
          description: "19MM 4-WAY JUNCTION BOX",
          price: "14.00",
        },
        {
          code: "CF 021",
          description: "25MM 1-WAY JUNCTION BOX",
          price: "15.00",
        },
        {
          code: "CF 022",
          description: "25MM 2-WAY JUNCTION BOX",
          price: "15.00",
        },
        {
          code: "CF 023",
          description: "25MM 3-WAY JUNCTION BOX",
          price: "15.00",
        },
        {
          code: "CF 024",
          description: "25MM 4-WAY JUNCTION BOX",
          price: "15.00",
        },
      ],
    },
    {
      image: pf5,
      title: "CFOUR DEEP BOXES",
      specs: [
        { code: "CF 025", description: "19MM 1-WAY DEEP BOX", price: "20.00" },
        { code: "CF 026", description: "19MM 2-WAY DEEP BOX", price: "20.00" },
        { code: "CF 027", description: "19MM 3-WAY DEEP BOX", price: "20.00" },
        { code: "CF 028", description: "19MM 4-WAY DEEP BOX", price: "20.00" },
        { code: "CF 029", description: "25MM 1-WAY DEEP BOX", price: "21.00" },
        { code: "CF 030", description: "25MM 2-WAY DEEP BOX", price: "21.00" },
        { code: "CF 031", description: "25MM 3-WAY DEEP BOX", price: "21.00" },
        { code: "CF 032", description: "25MM 4-WAY DEEP BOX", price: "21.00" },
      ],
    },
    {
      image: pf6,
      title: "CFOUR FLEXIBLE PIPES",
      specs: [
        {
          code: "CF 033",
          description: "16MM FLEXIBLE PIPE (WHITE) 50Mtr",
          price: "420.00",
        },
        {
          code: "CF 034",
          description: "20MM FLEXIBLE PIPE (WHITE) 50Mtr",
          price: "550.00",
        },
        {
          code: "CF 035",
          description: "25MM FLEXIBLE PIPE (WHITE) 25Mtr",
          price: "420.00",
        },
      ],
    },
    {
      image: pf7,
      title: "CFOUR PIPE DUMMIES",
      specs: [
        { code: "CF 036", description: "19MM PIPE DUMMY", price: "2.00" },
        { code: "CF 037", description: "25MM PIPE DUMMY", price: "3.00" },
      ],
    },
    {
      image: pf8,
      title: "CFOUR CABLE TIES",
      specs: [
        {
          code: "CF 038",
          description: "100*2.6 NYLON CABLE TIE",
          price: "32.00",
        },
        {
          code: "CF 039",
          description: "150*3.6 NYLON CABLE TIE",
          price: "76.00",
        },
        {
          code: "CF 040",
          description: "200*3.6 NYLON CABLE TIE",
          price: "96.00",
        },
        {
          code: "CF 041",
          description: "250*3.6 NYLON CABLE TIE",
          price: "126.00",
        },
        {
          code: "CF 042",
          description: "300*3.6 NYLON CABLE TIE",
          price: "154.00",
        },
        {
          code: "CF 043",
          description: "350*3.6 NYLON CABLE TIE",
          price: "190.00",
        },
        {
          code: "CF 044",
          description: "400*3.6 NYLON CABLE TIE",
          price: "238.00",
        },
        {
          code: "CF 045",
          description: "450*5.0 NYLON CABLE TIE",
          price: "368.00",
        },
      ],
    },
    {
      image: pf9,
      title: "CFOUR TAPE ROLL",
      specs: [{ code: "CF 046", description: "TAPE ROLL", price: "16.00" }],
    },
    {
      image: pf10,
      title: "CFOUR DUMMY SHEET",
      specs: [
        { code: "CF 047", description: "2 MODULE DUMMY", price: "45.00" },
        { code: "CF 048", description: "3 MODULE DUMMY", price: "50.00" },
        { code: "CF 049", description: "4 MODULE DUMMY", price: "70.00" },
      ],
    },
    {
      image: pf11,
      title: "CFOUR FOOT LIGHT",
      specs: [
        { code: "CF 050", description: "3 / 4 FOOT LIGHT", price: "180.00" },
      ],
    },
  ];

  /* LIGHTS */
  const lightProducts = [
    { image: CeilingLights },
    { image: LedBulb },
    { image: LedLights },
    { image: CeilingLights1 },
    { image: BedLights },
  ];

  // LIGHTS DETAILED products
  const lightsDetailedProducts = [
    {
      image: lt1,
      title: "CEILING LIGHT",
      tableType: "watt-colour-price-box",
      columns: ["WATT", "COLOUR", "PRICE", "BOX"],
      rows: [
        { watt: "8W", colour: "WH,WW", price: "351/-", box: "60" },
        { watt: "15W", colour: "WH,WW", price: "492/-", box: "40" },
        { watt: "22W", colour: "WH,WW", price: "690/-", box: "20" },
      ],
    },
    {
      image: lt2,
      title: "SURFACE PANEL LIGHT",
      tableType: "watt-colour-price-box",
      columns: ["WATT", "COLOUR", "PRICE", "BOX"],
      rows: [
        { watt: "15W", colour: "WH", price: "760/-", box: "40" },
        { watt: "22W", colour: "WH", price: "925/-", box: "40" },
      ],
    },
    {
      image: lt3,
      title: "ROUND COB SPOT LIGHT",
      tableType: "watt-colour-price-box",
      columns: ["WATT", "COLOUR", "PRICE", "BOX"],
      rows: [
        { watt: "3W", colour: "WH,WW", price: "200/-", box: "100" },
        { watt: "3W", colour: "PK,BL,GR", price: "200/-", box: "100" },
        { watt: "3W", colour: "MULTI, 3 IN 1", price: "220/-", box: "100" },
      ],
    },
    {
      image: lt4,
      title: "MINI COB SPOT LIGHT / PIN LIGHT",
      tableType: "watt-colour-price-box",
      columns: ["WATT", "COLOUR", "PRICE", "BOX"],
      rows: [
        { watt: "1W", colour: "WH,WW", price: "136/-", box: "100" },
        { watt: "1W", colour: "PK,BL,GR", price: "136/-", box: "100" },
        { watt: "2W", colour: "WH,WW", price: "115/-", box: "100" },
        { watt: "2W", colour: "PK,BL,GR", price: "120/-", box: "100" },
        { watt: "3W", colour: "WW", price: "188/-", box: "100" },
      ],
    },
    {
      image: lt5,
      title: "BLACK COB SPOT LIGHT",
      tableType: "watt-colour-price-box",
      columns: ["WATT", "COLOUR", "PRICE", "BOX"],
      rows: [
        { watt: "1W", colour: "WW", price: "200/-", box: "100" },
        { watt: "3W", colour: "WW", price: "293/-", box: "100" },
      ],
    },
    {
      image: lt6,
      title: "ROSE GOLD COB SPOT LIGHT",
      tableType: "watt-colour-price-box",
      columns: ["WATT", "COLOUR", "PRICE", "BOX"],
      rows: [{ watt: "3W", colour: "WW", price: "293/-", box: "100" }],
    },
    {
      image: lt7,
      title: "SPOT LIGHT (BLACK) 5W",
      tableType: "watt-colour-price-box",
      columns: ["WATT", "COLOUR", "PRICE", "BOX"],
      rows: [{ watt: "5W", colour: "WW", price: "398/-", box: "100" }],
    },
    {
      image: lt8,
      title: "DOUBLE COLOUR CEILING LIGHT",
      tableType: "watt-colour-price-box",
      columns: ["WATT", "COLOUR", "PRICE", "BOX"],
      rows: [
        { watt: "3+3W", colour: "PGB", price: "258/-", box: "100" },
        { watt: "6+3W", colour: "PGB", price: "527/-", box: "40" },
      ],
    },
    {
      image: lt9,
      title: "LED POWER SUPPLY",
      tableType: "watt-amp-price-box",
      columns: ["WATT", "AMP.", "PRICE", "BOX"],
      rows: [
        { watt: "60", amp: "5", price: "445/-", box: "140" },
        { watt: "120", amp: "10", price: "562/-", box: "120" },
        { watt: "200", amp: "16.5", price: "761/-", box: "60" },
        { watt: "250", amp: "25", price: "901/-", box: "60" },
      ],
    },
    {
      image: lt10,
      title: "LED STRIP LIGHT",
      tableType: "model-mts-colour-price-pkg",
      columns: ["MODEL", "MTS", "COLOUR", "PRICE", "PKG"],
      rows: [
        {
          model: "240",
          mts: "5 Mts",
          colour: "WW,NW,WH",
          price: "936/-",
          pkg: "250 MTS",
        },
      ],
    },
    {
      image: lt11,
      title: "STREET LIGHT",
      tableType: "watt-price-box",
      columns: ["WATT", "PRICE", "BOX"],
      rows: [
        { watt: "24W", price: "842/-", box: "40" },
        { watt: "36W", price: "1287/-", box: "30" },
        { watt: "50W", price: "1521/-", box: "30" },
      ],
    },
    {
      image: lt12,
      title: "FLOOD LIGHT",
      tableType: "watt-colour-price-box",
      columns: ["WATT", "COLOUR", "PRICE", "BOX"],
      rows: [
        { watt: "50W", colour: "WH", price: "1521/-", box: "20" },
        { watt: "100W", colour: "WH", price: "2457/-", box: "14" },
      ],
    },
    {
      image: lt13,
      title: "WALL LIGHT (Model 198)",
      tableType: "model-watt-colour-price-box",
      columns: ["MODEL", "WATT", "COLOUR", "PRICE", "BOX"],
      rows: [
        {
          model: "198/2",
          watt: "2W",
          colour: "WW / A-RGB",
          price: "422/- / 492/-",
          box: "50",
        },
        {
          model: "198/4",
          watt: "4W",
          colour: "WW / A-RGB",
          price: "562/- / 656/-",
          box: "50",
        },
      ],
    },
    {
      image: lt14,
      title: "WALL LIGHT (Model 188)",
      tableType: "model-watt-colour-price-box",
      columns: ["MODEL", "WATT", "COLOUR", "PRICE", "BOX"],
      rows: [
        {
          model: "188/2",
          watt: "2W",
          colour: "WW / ARGB",
          price: "398/- / 527/-",
          box: "50",
        },
        {
          model: "188/4",
          watt: "4W",
          colour: "WW / ARGB",
          price: "548/- / 667/-",
          box: "50",
        },
        {
          model: "188/6",
          watt: "6W",
          colour: "WW / ARGB",
          price: "686/- / 866/-",
          box: "50",
        },
      ],
    },
    {
      image: lt15,
      title: "WALL LIGHT (Model 9058)",
      tableType: "model-watt-colour-price-box",
      columns: ["MODEL", "WATT", "COLOUR", "PRICE", "BOX"],
      rows: [
        {
          model: "9058/4",
          watt: "4W",
          colour: "RGB / ARGB",
          price: "975/- / 1205/-",
          box: "50",
        },
        {
          model: "9058/6",
          watt: "6W",
          colour: "RGB / ARGB",
          price: "1195/- / 1486/-",
          box: "50",
        },
      ],
    },
    {
      image: lt16,
      title: "BULKHEAD LIGHT",
      tableType: "watt-colour-price-box",
      columns: ["WATT", "COLOUR", "PRICE", "BOX"],
      rows: [{ watt: "20W", colour: "WHITE", price: "305/-", box: "50" }],
    },
    {
      image: lt17,
      title: "ROPE LIGHT",
      tableType: "colour-price-box",
      columns: ["COLOUR", "PRICE", "BOX"],
      rows: [
        {
          colour: "WW,BL,GR,PK,AMBER,ICE BLUE",
          price: "125/- Pr mtr",
          box: "200 Mtr.",
        },
        { colour: "RGB", price: "176/- Pr mtr", box: "200 Mtr." },
      ],
    },
    {
      image: lt18,
      title: "RGB ADAPTER",
      tableType: "name-price",
      columns: ["NAME", "PRICE"],
      rows: [{ name: "ADAPTER", price: "95/-" }],
    },
    {
      image: lt19,
      title: "RGB MULTI ADAPTER",
      tableType: "name-price",
      columns: ["NAME", "PRICE"],
      rows: [{ name: "MULTI ADAPTER", price: "410/-" }],
    },
    {
      image: lt20,
      title: "SURFACE SPOT LIGHT",
      tableType: "bodycolour-watt-colour-price-box",
      columns: ["BODY COLOUR", "WATT", "COLOUR", "PRICE", "BOX"],
      rows: [
        {
          bodycolour: "White",
          watt: "3W",
          colour: "WH,WW / BL,PK,GR",
          price: "200/- / 210/-",
          box: "50",
        },
        {
          bodycolour: "Black",
          watt: "3W",
          colour: "WW",
          price: "220/-",
          box: "50",
        },
      ],
    },
    {
      image: lt21,
      title: "CONNECTOR",
      tableType: "amp-price",
      columns: ["AMP", "PRICE"],
      rows: [
        { amp: "5 AMP", price: "8/-" },
        { amp: "10 AMP", price: "16/-" },
        { amp: "Heavy Connector Gray", price: "50/-" },
      ],
    },
    {
      image: lt22,
      title: "FLOOD LIGHT CHOCK",
      tableType: "watt-price",
      columns: ["WATT", "PRICE"],
      rows: [
        { watt: "50 W", price: "400/-" },
        { watt: "100 W", price: "865/-" },
      ],
    },
    {
      image: lt23,
      title: "PANEL LIGHT CHOCK",
      tableType: "watt-price",
      columns: ["WATT", "PRICE"],
      rows: [
        { watt: "8 - 24 W", price: "130/-" },
        { watt: "24 - 50 W", price: "350/-" },
      ],
    },
    {
      image: lt24,
      title: "STRIP CONNECTOR",
      tableType: "model-price",
      columns: ["MODEL", "PRICE"],
      rows: [
        { model: "CONNECTOR", price: "26/-" },
        { model: "L-CONNECTOR", price: "30/-" },
        { model: "WIRE-CONNECTOR", price: "40/-" },
      ],
    },
    {
      image: lt25,
      title: "ROPE CONNECTOR",
      tableType: "model-price",
      columns: ["MODEL", "PRICE"],
      rows: [{ model: "CONNECTOR", price: "30/-" }],
    },
  ];

  const renderRow = (row) => Object.values(row);

  // protection products with price/packing data
  const protectionProducts = [
    {
      image: SpnDoor,
      title: "SPN D/DOOR",
      variants: [
        { name: "4WAY SPN D/DOOR", price: "1150/-", packing: "10 Nos" },
        { name: "6WAY SPN D/DOOR", price: "1240/-", packing: "10 Nos" },
        { name: "8WAY SPN D/DOOR", price: "1400/-", packing: "10 Nos" },
        { name: "12WAY SPN D/DOOR", price: "1700/-", packing: "10 Nos" },
        { name: "16WAY SPN D/DOOR", price: "2265/-", packing: "6 Nos" },
      ],
    },
    {
      image: TpnDoor,
      title: "TPN D/DOOR",
      variants: [
        { name: "4 TPN D/DOOR", price: "2840/-", packing: "5 Nos" },
        { name: "6 TPN D/DOOR", price: "3350/-", packing: "4 Nos" },
      ],
    },
    {
      image: Basbar,
      title: "BASBAR",
      variants: [
        { name: "63A BASBAR", price: "4250/-", packing: "4 Nos" },
        { name: "100A BASBAR", price: "6040/-", packing: "3 Nos" },
        { name: "200A BASBAR", price: "9475/-", packing: "2 Nos" },
      ],
    },
  ];

  // PLUMBING products
  const plumbingProducts = [
    {
      image: teflonTapeImg,
      title: "TEFLON TAPE",
      specs: [
        {
          code: "CF 063",
          description: "TEFLON TAPE",
          price: "30.00",
          packing: "1000 Pcs",
        },
      ],
    },
    {
      image: westPipeImg,
      title: "WEST PIPE",
      specs: [
        {
          code: "CF 064",
          description: "WEST PIPE",
          price: "89.00",
          packing: "300 Pcs",
        },
      ],
    },
  ];

  // SWITCH / SURFACE BOX products
  const switchProducts = [
    {
      image: surface1,
      title: "CFOUR SPIKE",
      specs: [
        { code: "CF 051", description: "2 MTR. SPIKE", price: "490.00" },
        { code: "CF 052", description: "5 MTR. SPIKE", price: "590.00" },
      ],
    },
    {
      image: surface2,
      title: "CFOUR MCB JUNCTION BOX",
      specs: [
        {
          code: "CF 053",
          description: "1 / 2 MCB JUNCTION BOX",
          price: "37.00",
        },
        {
          code: "CF 054",
          description: "3 / 4 MCB JUNCTION BOX",
          price: "60.00",
        },
      ],
    },
    {
      image: surface3,
      title: "CFOUR SURFACE BOX",
      specs: [
        { code: "CF 055", description: "2 MODULE SURFACE BOX", price: "53.00" },
        { code: "CF 056", description: "3 MODULE SURFACE BOX", price: "65.00" },
        { code: "CF 057", description: "4 MODULE SURFACE BOX", price: "72.00" },
        { code: "CF 058", description: "6 MODULE SURFACE BOX", price: "96.00" },
        {
          code: "CF 059",
          description: "8 MODULE SURFACE BOX",
          price: "122.00",
        },
        {
          code: "CF 060",
          description: "12 MODULE SURFACE BOX",
          price: "134.00",
        },
        {
          code: "CF 061",
          description: "16 MODULE SURFACE BOX",
          price: "192.00",
        },
        {
          code: "CF 062",
          description: "18 MODULE SURFACE BOX",
          price: "220.00",
        },
      ],
    },
  ];

  /* ALL PRODUCTS DATA — enriched with filter fields */
  const allProductsRaw = [
    /* PIPES & FITTINGS */
    {
      image: image1,
      title: "CFOUR PVC Pipes",
      price: 67,
      brand: "CFOUR",
      color: "green",
      inStock: true,
      rating: 4,
      reviews: 128,
      isNew: false,
      popularity: 95,
    },
    {
      image: image2,
      title: "CFOUR Conduit Bends",
      price: 8,
      brand: "CFOUR",
      color: "white",
      inStock: true,
      rating: 4,
      reviews: 85,
      isNew: false,
      popularity: 80,
    },
    {
      image: image3,
      title: "CFOUR T-Bow Fittings",
      price: 5,
      brand: "CFOUR",
      color: "white",
      inStock: true,
      rating: 5,
      reviews: 60,
      isNew: true,
      popularity: 70,
    },
    {
      image: image4,
      title: "CFOUR Bow Fittings",
      price: 4,
      brand: "CFOUR",
      color: "white",
      inStock: false,
      rating: 3,
      reviews: 40,
      isNew: false,
      popularity: 55,
    },
    {
      image: image5,
      title: "CFOUR L-Bow Fittings",
      price: 4,
      brand: "CFOUR",
      color: "white",
      inStock: true,
      rating: 4,
      reviews: 75,
      isNew: false,
      popularity: 65,
    },
    {
      image: image6,
      title: "CFOUR Pipe",
      price: 103,
      brand: "CFOUR",
      color: "green",
      inStock: true,
      rating: 5,
      reviews: 200,
      isNew: false,
      popularity: 99,
    },
    {
      image: image7,
      title: "CFOUR Junction Box",
      price: 14,
      brand: "CFOUR",
      color: "white",
      inStock: true,
      rating: 4,
      reviews: 55,
      isNew: true,
      popularity: 60,
    },
    {
      image: image8,
      title: "CFOUR Deep Box",
      price: 20,
      brand: "CFOUR",
      color: "white",
      inStock: true,
      rating: 3,
      reviews: 30,
      isNew: false,
      popularity: 45,
    },
    {
      image: image9,
      title: "CFOUR Flexible Pipe",
      price: 420,
      brand: "CFOUR",
      color: "white",
      inStock: false,
      rating: 4,
      reviews: 90,
      isNew: false,
      popularity: 75,
    },
    {
      image: image10,
      title: "CFOUR Pipe Dummy",
      price: 2,
      brand: "CFOUR",
      color: "white",
      inStock: true,
      rating: 3,
      reviews: 20,
      isNew: false,
      popularity: 30,
    },
    {
      image: image11,
      title: "CFOUR Cable Tie",
      price: 32,
      brand: "CFOUR",
      color: "black",
      inStock: true,
      rating: 5,
      reviews: 180,
      isNew: false,
      popularity: 90,
    },
    {
      image: image12,
      title: "CFOUR Tape Roll",
      price: 16,
      brand: "CFOUR",
      color: "white",
      inStock: true,
      rating: 4,
      reviews: 110,
      isNew: false,
      popularity: 85,
    },
    {
      image: image13,
      title: "CFOUR Dummy Sheet",
      price: 45,
      brand: "CFOUR",
      color: "white",
      inStock: true,
      rating: 4,
      reviews: 45,
      isNew: true,
      popularity: 50,
    },
    {
      image: image14,
      title: "CFOUR Foot Light",
      price: 180,
      brand: "CFOUR",
      color: "white",
      inStock: false,
      rating: 4,
      reviews: 65,
      isNew: false,
      popularity: 72,
    },

    /* LIGHTS */
    {
      image: lt1,
      title: "Ceiling Light 8W",
      price: 351,
      brand: "CFOUR",
      color: "white",
      inStock: true,
      rating: 4,
      reviews: 95,
      isNew: false,
      popularity: 88,
    },
    {
      image: lt2,
      title: "Surface Panel Light 15W",
      price: 760,
      brand: "CFOUR",
      color: "white",
      inStock: true,
      rating: 4,
      reviews: 72,
      isNew: false,
      popularity: 82,
    },
    {
      image: lt3,
      title: "Round COB Spot Light 3W",
      price: 200,
      brand: "CFOUR",
      color: "white",
      inStock: true,
      rating: 5,
      reviews: 110,
      isNew: true,
      popularity: 91,
    },
    {
      image: lt4,
      title: "Mini COB Spot Light 1W",
      price: 136,
      brand: "CFOUR",
      color: "white",
      inStock: true,
      rating: 4,
      reviews: 88,
      isNew: false,
      popularity: 76,
    },
    {
      image: lt5,
      title: "Black COB Spot Light 1W",
      price: 200,
      brand: "CFOUR",
      color: "black",
      inStock: true,
      rating: 4,
      reviews: 60,
      isNew: false,
      popularity: 70,
    },
    {
      image: lt6,
      title: "Rose Gold COB Spot Light 3W",
      price: 293,
      brand: "CFOUR",
      color: "white",
      inStock: true,
      rating: 5,
      reviews: 45,
      isNew: true,
      popularity: 65,
    },
    {
      image: lt7,
      title: "Spot Light Black 5W",
      price: 398,
      brand: "CFOUR",
      color: "black",
      inStock: true,
      rating: 4,
      reviews: 55,
      isNew: false,
      popularity: 68,
    },
    {
      image: lt8,
      title: "Double Colour Ceiling Light",
      price: 258,
      brand: "CFOUR",
      color: "white",
      inStock: true,
      rating: 4,
      reviews: 78,
      isNew: false,
      popularity: 74,
    },
    {
      image: lt9,
      title: "LED Power Supply 60W",
      price: 445,
      brand: "CFOUR",
      color: "white",
      inStock: true,
      rating: 4,
      reviews: 92,
      isNew: false,
      popularity: 80,
    },
    {
      image: lt10,
      title: "LED Strip Light 5Mts",
      price: 936,
      brand: "CFOUR",
      color: "white",
      inStock: true,
      rating: 5,
      reviews: 130,
      isNew: false,
      popularity: 93,
    },
    {
      image: lt11,
      title: "Street Light 24W",
      price: 842,
      brand: "CFOUR",
      color: "white",
      inStock: true,
      rating: 4,
      reviews: 67,
      isNew: false,
      popularity: 71,
    },
    {
      image: lt12,
      title: "Flood Light 50W",
      price: 1521,
      brand: "CFOUR",
      color: "white",
      inStock: false,
      rating: 4,
      reviews: 50,
      isNew: false,
      popularity: 66,
    },
    {
      image: lt16,
      title: "Bulkhead Light 20W",
      price: 305,
      brand: "CFOUR",
      color: "white",
      inStock: true,
      rating: 3,
      reviews: 38,
      isNew: false,
      popularity: 55,
    },
    {
      image: lt17,
      title: "Rope Light WW",
      price: 125,
      brand: "CFOUR",
      color: "white",
      inStock: true,
      rating: 4,
      reviews: 145,
      isNew: false,
      popularity: 87,
    },

    /* PROTECTION */
    {
      image: SpnDoor,
      title: "4WAY SPN D/DOOR",
      price: 1150,
      brand: "CFOUR",
      color: "white",
      inStock: true,
      rating: 4,
      reviews: 42,
      isNew: false,
      popularity: 60,
    },
    {
      image: SpnDoor,
      title: "8WAY SPN D/DOOR",
      price: 1400,
      brand: "CFOUR",
      color: "white",
      inStock: true,
      rating: 4,
      reviews: 38,
      isNew: false,
      popularity: 58,
    },
    {
      image: TpnDoor,
      title: "4 TPN D/DOOR",
      price: 2840,
      brand: "CFOUR",
      color: "white",
      inStock: true,
      rating: 5,
      reviews: 30,
      isNew: false,
      popularity: 62,
    },
    {
      image: Basbar,
      title: "63A BASBAR",
      price: 4250,
      brand: "CFOUR",
      color: "white",
      inStock: true,
      rating: 4,
      reviews: 25,
      isNew: false,
      popularity: 55,
    },
    {
      image: Basbar,
      title: "100A BASBAR",
      price: 6040,
      brand: "CFOUR",
      color: "white",
      inStock: false,
      rating: 4,
      reviews: 20,
      isNew: false,
      popularity: 50,
    },

    /* PLUMBING */
    {
      image: teflonTapeImg,
      title: "Teflon Tape",
      price: 30,
      brand: "CFOUR",
      color: "white",
      inStock: true,
      rating: 5,
      reviews: 210,
      isNew: false,
      popularity: 96,
    },
    {
      image: westPipeImg,
      title: "West Pipe",
      price: 89,
      brand: "CFOUR",
      color: "white",
      inStock: true,
      rating: 4,
      reviews: 88,
      isNew: false,
      popularity: 79,
    },

    /* SURFACE BOX / SWITCH */
    {
      image: surface1,
      title: "CFOUR Spike 2Mtr",
      price: 490,
      brand: "CFOUR",
      color: "white",
      inStock: true,
      rating: 4,
      reviews: 65,
      isNew: false,
      popularity: 72,
    },
    {
      image: surface1,
      title: "CFOUR Spike 5Mtr",
      price: 590,
      brand: "CFOUR",
      color: "white",
      inStock: true,
      rating: 4,
      reviews: 48,
      isNew: false,
      popularity: 68,
    },
    {
      image: surface2,
      title: "MCB Junction Box 2Way",
      price: 37,
      brand: "CFOUR",
      color: "white",
      inStock: true,
      rating: 4,
      reviews: 120,
      isNew: false,
      popularity: 84,
    },
    {
      image: surface3,
      title: "Surface Box 2 Module",
      price: 53,
      brand: "CFOUR",
      color: "white",
      inStock: true,
      rating: 4,
      reviews: 95,
      isNew: false,
      popularity: 78,
    },
    {
      image: surface3,
      title: "Surface Box 4 Module",
      price: 72,
      brand: "CFOUR",
      color: "white",
      inStock: true,
      rating: 4,
      reviews: 85,
      isNew: true,
      popularity: 76,
    },
    {
      image: surface3,
      title: "Surface Box 8 Module",
      price: 122,
      brand: "CFOUR",
      color: "white",
      inStock: true,
      rating: 5,
      reviews: 70,
      isNew: false,
      popularity: 73,
    },
    {
      image: surface3,
      title: "Surface Box 12 Module",
      price: 134,
      brand: "CFOUR",
      color: "white",
      inStock: false,
      rating: 4,
      reviews: 55,
      isNew: false,
      popularity: 67,
    },
  ];

  /* ── FILTER + SORT LOGIC ── */
  const filteredAndSortedProducts = (() => {
    let list = [...productsList];
    if (selectedBrands.length > 0)
      list = list.filter((p) => selectedBrands.includes(p.brand));
    if (selectedColors.length > 0)
      list = list.filter((p) => selectedColors.includes(p.color));
    
    if (availabilityFilter === "instock") {
      list = list.filter((p) => (p.variants?.[0]?.stockQuantity || 0) > 0);
    } else if (availabilityFilter === "outofstock") {
      list = list.filter((p) => (p.variants?.[0]?.stockQuantity || 0) <= 0);
    }

    list = list.filter((p) => {
      const defaultVariant = p.variants?.[0];
      const priceVal = defaultVariant?.offerPrice || defaultVariant?.originalPrice || p.price || 0;
      return priceVal >= priceRange[0] && priceVal <= priceRange[1];
    });

    if (sortBy === "price-asc") {
      list.sort((a, b) => {
        const pA = a.variants?.[0]?.offerPrice || a.variants?.[0]?.originalPrice || a.price || 0;
        const pB = b.variants?.[0]?.offerPrice || b.variants?.[0]?.originalPrice || b.price || 0;
        return pA - pB;
      });
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => {
        const pA = a.variants?.[0]?.offerPrice || a.variants?.[0]?.originalPrice || a.price || 0;
        const pB = b.variants?.[0]?.offerPrice || b.variants?.[0]?.originalPrice || b.price || 0;
        return pB - pA;
      });
    } else if (sortBy === "newest") {
      list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    return list;
  })();

  /* GET CURRENT PAGE PRODUCTS */
  const getCurrentPageProducts = () => {
    return filteredAndSortedProducts;
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
    const defaultVariant = item.variants?.[0];
    const priceVal = defaultVariant?.offerPrice || defaultVariant?.originalPrice || item.price || 0;
    const imgVal = item.images?.[0] || item.image || "https://placehold.co/400x300?text=No+Image";
    const skuVal = defaultVariant?.sku || item.code || "";
    
    const attributes = defaultVariant?.attributes || [];
    const sizeVal = attributes.find(a => a.key.toLowerCase() === "size")?.value || item.size || "";
    const colorVal = attributes.find(a => a.key.toLowerCase() === "colour" || a.key.toLowerCase() === "color")?.value || item.color || "";
    const materialVal = attributes.find(a => a.key.toLowerCase() === "material")?.value || item.material || "";
    const inStockVal = defaultVariant ? (defaultVariant.stockQuantity > 0) : (item.inStock !== false);

    const normalized = {
      ...item,
      title: item.name || item.title || "",
      image: imgVal,
      price: priceVal,
      code: skuVal,
      size: sizeVal,
      color: colorVal,
      material: materialVal,
      inStock: inStockVal,
      attributes: attributes,
    };

    setSelectedProduct(normalized);
    setActiveImageIndex(0);
    setActiveTab("Specifications");
    setSelectedColor(colorVal || "green");
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  /* HANDLE BACK */
  const handleBack = () => {
    setSelectedProduct(null);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 50);
  };

  /* PRODUCT COLORS FOR SELECTED PRODUCT */
  const productColors = (() => {
    if (!selectedProduct) return [];
    const colors = new Set();
    
    // 1. Collect from variants
    selectedProduct.variants?.forEach(v => {
      const col = v.attributes?.find(a => a.key.toLowerCase() === "colour" || a.key.toLowerCase() === "color")?.value;
      if (col) colors.add(col);
    });
    
    // 2. Collect from main product field
    if (selectedProduct.color) {
      colors.add(selectedProduct.color);
    }
    
    return Array.from(colors);
  })();

  /* RELATED PRODUCTS */
  const relatedProducts = (() => {
    if (!selectedProduct) return [];
    
    // Helper to normalize product format for the carousel UI
    const normalizeProduct = (p) => {
      if (p.title && p.image) return p;
      
      const defaultVariant = p.variants?.[0];
      const priceVal = defaultVariant?.offerPrice || defaultVariant?.originalPrice || p.price || 0;
      const imgVal = p.images?.[0] || "https://placehold.co/200x200?text=No+Image";
      
      return {
        ...p,
        title: p.name || "",
        image: imgVal,
        price: priceVal,
      };
    };

    // 1. Get products in the same category from productsList
    let list = productsList.filter(
      (p) => (p._id || p.id) !== (selectedProduct._id || selectedProduct.id) && 
             p.categoryId === selectedProduct.categoryId
    );
    
    // 2. If we need more, get other products from productsList
    if (list.length < 6) {
      const remaining = productsList.filter(
        (p) => (p._id || p.id) !== (selectedProduct._id || selectedProduct.id) && 
               p.categoryId !== selectedProduct.categoryId
      );
      list = [...list, ...remaining];
    }
    return list.map(normalizeProduct).slice(0, 6);
  })();

  const allBrands = ["CFOUR"];
  const allColors = ["green", "white", "black"];

  const FilterPanel = () => (
    <div className="w-full bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row flex-wrap items-center justify-between gap-4 mb-6">
      
      {/* FILTER CONTROLS GROUP */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 w-full md:w-auto">
        
        {/* SORT */}
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm text-gray-700 whitespace-nowrap">Sort By:</span>
          <select
            aria-label="Sort products"
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-red-400 cursor-pointer bg-white"
          >
            <option value="default">Default</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="newest">Newest First</option>
            <option value="popularity">Most Popular</option>
          </select>
        </div>

        {/* PRICE RANGE */}
        <div className="flex items-center gap-3">
          <span className="font-semibold text-sm text-gray-700 whitespace-nowrap">Max Price (₹{priceRange[1]}):</span>
          <div className="w-24 flex items-center">
            <input
              type="range"
              min="0"
              max="10000"
              step="1"
              value={priceRange[1]}
              onChange={(e) => {
                setPriceRange([priceRange[0], Number(e.target.value)]);
                setCurrentPage(1);
              }}
              className="w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-red-500 bg-gray-200"
            />
          </div>
        </div>

        {/* BRAND */}
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm text-gray-700 whitespace-nowrap">Brand:</span>
          <div className="flex items-center gap-3">
            {allBrands.map((brand) => (
              <label key={brand} className="flex items-center gap-1.5 cursor-pointer text-sm">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => {
                    setSelectedBrands((prev) =>
                      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
                    );
                    setCurrentPage(1);
                  }}
                  className="accent-red-500 w-3.5 h-3.5 cursor-pointer"
                />
                {brand}
              </label>
            ))}
          </div>
        </div>

        {/* COLOUR */}
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm text-gray-700 whitespace-nowrap">Colour:</span>
          <div className="flex gap-1.5">
            {allColors.map((c) => (
              <button
                key={c}
                aria-label={`Filter by colour ${c}`}
                onClick={() => {
                  setSelectedColors((prev) =>
                    prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
                  );
                  setCurrentPage(1);
                }}
                className={`w-5 h-5 rounded-full border focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-400 cursor-pointer transition-all ${
                  selectedColors.includes(c) ? "border-red-500 ring-1 ring-red-500 scale-110" : "border-gray-300"
                }`}
                style={{
                  backgroundColor:
                    c === "green" ? "#16a34a" : c === "black" ? "#111" : "#f3f4f6",
                }}
              />
            ))}
          </div>
        </div>

        {/* AVAILABILITY */}
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm text-gray-700 whitespace-nowrap">Availability:</span>
          <select
            aria-label="Filter by availability"
            value={availabilityFilter}
            onChange={(e) => {
              setAvailabilityFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-red-400 cursor-pointer bg-white"
          >
            <option value="all">All</option>
            <option value="instock">In Stock</option>
            <option value="outofstock">Out of Stock</option>
          </select>
        </div>

      </div>

      {/* CLEAR ALL BUTTON */}
      <button
        onClick={() => {
          setSelectedBrands([]);
          setSelectedColors([]);
          setPriceRange([0, 10000]);
          setAvailabilityFilter("all");
          setSortBy("default");
          setCurrentPage(1);
        }}
        className="text-xs font-semibold text-red-500 hover:text-red-600 hover:underline focus:outline-none whitespace-nowrap"
      >
        Clear All Filters
      </button>
    </div>
  );

  const shouldShowLegacyMock = isLegacyCategory && !isLoading && !isCategoriesLoading && !apiError && productsList.length === 0;

  return (
    <>
      {/* QUICK VIEW MODAL */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={addToCart}
        />
      )}

      {/* WISHLIST DRAWER */}
      {wishlist.length > 0 && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={() => setWishlistOpen(true)}
            aria-label={`View wishlist (${wishlist.length} items)`}
            className="
        flex
        items-center
        gap-2
        bg-white
        border
        border-red-200
        shadow-xl
        px-4
        py-3
        rounded-full
        text-sm
        font-semibold
        text-red-500
        hover:bg-red-50
        transition-all
        duration-200
        cursor-pointer
      "
          >
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 fill-red-500 stroke-red-500"
              strokeWidth="2"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            Wishlist ({wishlist.length})
          </button>
        </div>
      )}

      {/* WISHLIST MODAL */}
      {wishlistOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={() => setWishlistOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col overflow-hidden"
            style={{ maxHeight: "calc(100vh - 120px)", marginTop: "85px" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* HEADER */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-xl font-bold">
                My Wishlist
                <span className="ml-2 text-sm font-normal text-gray-400">
                  ({wishlist.length} item{wishlist.length !== 1 ? "s" : ""})
                </span>
              </h2>
              <button
                onClick={() => setWishlistOpen(false)}
                aria-label="Close wishlist"
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* ITEMS */}
            <div className="overflow-y-auto flex-1 px-6 py-4">
              {wishlist.length === 0 ? (
                <div className="text-center py-16 text-gray-400">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-16 h-16 mx-auto mb-4 fill-none stroke-gray-300"
                    strokeWidth="1.5"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                  <p className="text-lg font-semibold">
                    Your wishlist is empty
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {allProductsRaw
                    .filter((p) => wishlist.includes(p.title))
                    .map((item, index) => (
                      <div
                        key={index}
                        className="flex gap-3 bg-gray-50 rounded-xl p-3 border border-gray-100"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-20 h-20 object-contain rounded-lg bg-white border border-gray-200 flex-shrink-0"
                          onError={(e) => {
                            e.target.src =
                              "https://placehold.co/80x80?text=No+Image";
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold leading-snug mb-1 truncate">
                            {item.title}
                          </p>
                          <p className="text-base font-bold text-gray-900 mb-2">
                            ₹{item.price}.00
                          </p>
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                addToCart(item);
                                toggleWishlist(item.title);
                              }}
                              disabled={!item.inStock || isCartUpdating || addingProductIds[item._id || item.productId]}
                              className="
                          flex-1
                          bg-red-500
                          text-white
                          py-1.5
                          rounded-lg
                          text-xs
                          font-semibold
                          hover:bg-red-600
                          transition
                          disabled:opacity-50
                          disabled:cursor-not-allowed
                          cursor-pointer
                          min-h-[32px]
                          flex items-center justify-center
                        "
                            >
                              {addingProductIds[item._id || item.productId] ? (
                                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent animate-spin rounded-full" />
                              ) : item.inStock ? (
                                "Add to Cart"
                              ) : (
                                "Unavailable"
                              )}
                            </button>
                            <button
                              onClick={() => toggleWishlist(item.title)}
                              aria-label="Remove from wishlist"
                              className="
                          w-8
                          h-8
                          rounded-lg
                          border
                          border-gray-200
                          flex
                          items-center
                          justify-center
                          hover:bg-red-50
                          hover:border-red-300
                          transition
                          cursor-pointer
                          flex-shrink-0
                        "
                            >
                              <svg
                                viewBox="0 0 24 24"
                                className="w-4 h-4 fill-red-400 stroke-red-400"
                                strokeWidth="2"
                              >
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>

            {/* FOOTER */}
            {wishlist.length > 0 && (
              <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                <button
                  onClick={() => setWishlist([])}
                  className="text-sm text-gray-400 hover:text-red-500 transition cursor-pointer"
                >
                  Clear all
                </button>
                <button
                  onClick={() => setWishlistOpen(false)}
                  className="bg-gray-100 text-gray-700 px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition cursor-pointer"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SPECIFIC CATEGORY VIEW (UNIFIED GRID) */}
      {selectedCategory !== "all" && !selectedProduct && (
        <>
          <section className="w-full bg-black overflow-hidden pt-[85px]">
            <img
              src={heroImg}
              alt="Products Hero"
              className="w-full h-[250px] object-cover object-center"
            />
          </section>
          <section className="w-full bg-[#efefef] pt-10 pb-10 min-h-[60vh]">
           <div className="max-w-7xl mx-auto px-6">
             <div className="flex items-center justify-center mb-8 text-center">
               <h2 
                 className="text-3xl sm:text-4xl font-semibold uppercase"
                 style={{ fontFamily: "'Cormorant Garamond', serif" }}
               >
                 {matchedCategory ? matchedCategory.name : selectedCategory}
               </h2>
             </div>

             {isLoading || isCategoriesLoading ? (
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                   {Array.from({ length: 8 }).map((_, i) => (
                     <SkeletonCard key={i} />
                   ))}
                 </div>
             ) : productsList.length > 0 ? (
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                   {productsList.map((product, index) => {
                     const variants = product.variants?.length > 0 ? product.variants.map(v => ({
                         description: v.sku || v.attributes?.packing || product.name,
                         price: v.offerPrice || v.originalPrice || product.price || 0,
                         packing: v.attributes?.packing || ""
                     })) : [{ description: product.name || "Standard", price: product.price || 0, packing: "" }];
                     
                     return (
                       <AmazonStyleGroupCard
                         key={index}
                         image={product.images?.[0] || product.image || "https://placehold.co/400x300?text=No+Image"}
                         title={product.name || product.title}
                         variants={variants}
                         onAddToCart={addToCart}
                         product={product}
                         onQuickView={setQuickViewProduct}
                         onViewDetails={() => handleViewDetails(product)}
                       />
                     );
                   })}
                 </div>
             ) : shouldShowLegacyMock ? (
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                   {(selectedCategory === "pipes" || selectedCategory === "products") && pipesFittingsProducts.map((p, i) => (
                       <AmazonStyleGroupCard key={`pipe-${i}`} image={p.image} title={p.title} variants={p.specs} onAddToCart={addToCart} product={{...p, _id: p.id || p.title}} onQuickView={setQuickViewProduct} />
                   ))}
                   {(selectedCategory === "lights" || selectedCategory === "products") && lightsDetailedProducts.map((p, i) => {
                       const normalizedVariants = p.rows.map(row => ({
                           label: renderRow(row)[0],
                           description: p.columns.slice(0, -1).map((col, idx) => `${col}: ${renderRow(row)[idx]}`).join(" · "),
                           price: row.price || "0"
                       }));
                       return <AmazonStyleGroupCard key={`light-${i}`} image={p.image} title={p.title} variants={normalizedVariants} onAddToCart={addToCart} product={{...p, _id: p.id || p.title}} onQuickView={setQuickViewProduct} />
                   })}
                   {selectedCategory === "protection" && protectionProducts.map((p, i) => {
                       const normalizedVariants = p.variants.map(v => ({ description: v.name, price: v.price, packing: v.packing }));
                       return <AmazonStyleGroupCard key={`prot-${i}`} image={p.image} title={p.title} variants={normalizedVariants} onAddToCart={addToCart} product={{...p, _id: p.id || p.title}} onQuickView={setQuickViewProduct} />
                   })}
                   {selectedCategory === "plumbing" && plumbingProducts.map((p, i) => (
                       <AmazonStyleGroupCard key={`plum-${i}`} image={p.image} title={p.title} variants={p.specs} onAddToCart={addToCart} product={{...p, _id: p.id || p.title}} onQuickView={setQuickViewProduct} />
                   ))}
                   {selectedCategory === "switch" && switchProducts.map((p, i) => (
                       <AmazonStyleGroupCard key={`sw-${i}`} image={p.image} title={p.title} variants={p.specs} onAddToCart={addToCart} product={{...p, _id: p.id || p.title}} onQuickView={setQuickViewProduct} />
                   ))}
                 </div>
             ) : (
                 <div className="text-center py-20 text-gray-500">
                   <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                   </svg>
                   <p className="text-xl font-semibold mb-2">No products found</p>
                   <p className="text-sm">The category "{selectedCategory}" does not have any products yet.</p>
                 </div>
             )}
           </div>
         </section>
        </>
      )}

      {/* PRODUCT DETAIL FULL VIEW */}
      {selectedProduct && (
            <section
              ref={detailRef}
              className="w-full bg-[#efefef] pt-[120px] pb-10 px-6"
            >
              <div className="max-w-7xl mx-auto">
                {/* BREADCRUMB */}
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                  <button
                    onClick={handleBack}
                    className="hover:text-black transition focus:outline-none focus:underline cursor-pointer"
                  >
                    {matchedCategory ? matchedCategory.name : (selectedCategory === 'all' ? 'All Products' : selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1))}
                  </button>
                  <span>/</span>
                  <span className="text-black font-medium">
                    {selectedProduct.title}
                  </span>
                </div>

                {/* DETAIL CONTENT */}
                <div className="flex flex-col gap-10 lg:flex-row">
                  {/* LEFT - THUMBNAILS + MAIN IMAGE */}
                  <div className="flex gap-4">
                    {/* THUMBNAILS */}
                    <div className="flex flex-col gap-3">
                      {selectedProduct.images && selectedProduct.images.length > 0 ? (
                        selectedProduct.images.map((img, i) => (
                          <button
                            key={i}
                            onClick={() => setActiveImageIndex(i)}
                            className={`w-16 h-16 bg-white rounded-md border flex-shrink-0 cursor-pointer overflow-hidden p-1 transition ${activeImageIndex === i ? "border-red-500 ring-1 ring-red-500" : "border-gray-300 hover:border-gray-400"}`}
                          >
                            <img src={img} alt={`thumbnail-${i}`} className="w-full h-full object-contain" />
                          </button>
                        ))
                      ) : (
                        <div className="w-16 h-16 bg-white rounded-md border border-red-500 ring-1 ring-red-500 flex-shrink-0 p-1">
                          <img src={selectedProduct.image} alt="thumbnail-default" className="w-full h-full object-contain" />
                        </div>
                      )}
                    </div>

                    {/* MAIN IMAGE */}
                    <div
                      className="
                        w-full
                        max-w-[340px]
                        h-[280px]
                        sm:h-[340px]
                        bg-gray-200
                        rounded-xl
                        border
                        border-gray-300
                        flex
                        items-center
                        justify-center
                        overflow-hidden
                      "
                    >
                      <img
                        src={(selectedProduct.images && selectedProduct.images[activeImageIndex]) || selectedProduct.image}
                        alt={selectedProduct.title}
                        className="w-full h-full object-contain p-4"
                        onError={(e) => {
                          e.target.src =
                            "https://placehold.co/400x400?text=No+Image";
                        }}
                      />
                    </div>
                  </div>

                  {/* RIGHT - PRODUCT INFO */}
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2">
                      {selectedProduct.title}
                    </h2>

                    {/* RATING */}
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className="flex text-yellow-400 text-lg"
                        aria-label="4 out of 5 stars"
                      >
                        ★★★★☆
                      </div>
                      <span className="text-sm text-gray-500">
                        4 ({selectedProduct.reviews && selectedProduct.reviews.length > 0 
                          ? `${selectedProduct.reviews.length} Review${selectedProduct.reviews.length !== 1 ? 's' : ''}` 
                          : "128 Reviews"})
                      </span>
                    </div>

                    {/* STOCK BADGE */}
                    {selectedProduct.inStock !== undefined && (
                      <span
                        className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 ${selectedProduct.inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                      >
                        {selectedProduct.inStock
                          ? "✓ In Stock"
                          : "✗ Out of Stock"}
                      </span>
                    )}

                    {/* DESCRIPTION */}
                    {selectedProduct.description && (
                      <div className="text-gray-600 text-sm mb-4 leading-relaxed text-left">
                        {selectedProduct.description}
                      </div>
                    )}

                    {/* SPECS - Summary */}
                    <div className="space-y-1 text-gray-700 mb-4 text-left">
                      {selectedProduct.code && (
                        <p>
                          <span className="font-semibold">Code / SKU:</span> {selectedProduct.code}
                        </p>
                      )}
                      {selectedProduct.size && (
                        <p>
                          <span className="font-semibold">Size:</span> {selectedProduct.size}
                        </p>
                      )}
                      {selectedProduct.color && (
                        <p>
                          <span className="font-semibold">Colour:</span> <span className="capitalize">{selectedProduct.color}</span>
                        </p>
                      )}
                      {selectedProduct.material && (
                        <p>
                          <span className="font-semibold">Material:</span> <span className="capitalize">{selectedProduct.material}</span>
                        </p>
                      )}
                    </div>

                    {/* PRICE + BUTTONS */}
                    <div className="mb-6">
                      <p className="text-2xl font-bold mb-3 flex items-center gap-2">
                        <span className="text-gray-900">
                           ₹{((selectedProduct.variants?.[0] || selectedProduct.defaultVariant)?.offerPrice || (selectedProduct.variants?.[0] || selectedProduct.defaultVariant)?.originalPrice || selectedProduct.price || 0).toLocaleString("en-IN")}
                        </span>
                        <span className="text-sm font-normal text-gray-500 ml-1">
                          /piece
                        </span>
                      </p>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <button
                          onClick={() => addToCart(selectedProduct)}
                          disabled={isCartUpdating || addingProductIds[selectedProduct?._id || selectedProduct?.productId]}
                          className="
                          bg-red-500
                          text-white
                          px-6
                          py-2
                          rounded-full
                          text-sm
                          font-semibold
                          hover:bg-red-600
                          transition
                          disabled:opacity-50
                          disabled:cursor-not-allowed
                          focus:ring-2
                          focus:ring-red-400
                          min-h-[44px]
                          cursor-pointer
                          w-full
                          sm:w-auto
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
                          font-semibold
                          hover:bg-red-500
                          hover:text-white
                          transition
                          focus:outline-none
                          focus:ring-2
                          focus:ring-red-400
                          min-h-[44px]
                          cursor-pointer
                          w-full
                          sm:w-auto
                        "
                        >
                          Request Quote
                        </button>
                      </div>
                    </div>

                    {/* COLOR SWATCHES */}
                    {productColors.length > 0 && (
                      <div className="flex gap-3 mb-6">
                        {productColors.map((color, idx) => (
                          <button
                            key={idx}
                            aria-label={`Select ${color} colour`}
                            onClick={() => setSelectedColor(color)}
                            className={`w-8 h-8 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 cursor-pointer ${selectedColor === color ? "ring-2 ring-offset-2 ring-red-500" : ""}`}
                            style={{ 
                              background: color.toLowerCase() === 'rgb' 
                                ? 'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)' 
                                : color.toLowerCase() 
                            }}
                          />
                        ))}
                      </div>
                    )}

                    {/* TABS */}
                    <div className="border-b border-gray-300 mb-4 overflow-x-auto no-scrollbar">
                      <div className="flex gap-4 min-w-max">
                        {[
                          "Specifications",
                          "Reviews"
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
                              whitespace-nowrap
                              focus:outline-none
                              cursor-pointer
                              ${activeTab === tab ? "border-red-500 text-red-500" : "border-transparent text-gray-500 hover:text-black"}
                            `}
                          >
                            {tab}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* TAB CONTENT - SPECIFICATIONS */}
                    {activeTab === "Specifications" && (
                      <div className="mb-4">
                        {selectedProduct.attributes && selectedProduct.attributes.filter(row => row.key.toLowerCase() !== 'default').length > 0 ? (
                          <table className="w-full text-sm border border-gray-200">
                            <tbody>
                              {selectedProduct.attributes.filter(row => row.key.toLowerCase() !== 'default').map((row, i) => (
                                <tr key={i} className="border-b border-gray-200">
                                  <td className="py-2 px-3 text-gray-600 bg-gray-50 w-1/2 capitalize">
                                    {row.key}
                                  </td>
                                  <td className="py-2 px-3">{row.value}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        ) : (
                          <p className="text-sm text-gray-500 py-4">No detailed specifications available for this product.</p>
                        )}
                      </div>
                    )}
                    
                    {activeTab === "Reviews" && (
                      <div className="py-4">
                        {reviewsLoading ? (
                           <div className="text-sm text-gray-500">Loading reviews...</div>
                        ) : (
                           <div className="space-y-6">
                             {reviewsData?.reviews?.length > 0 ? (
                               reviewsData.reviews.map(r => (
                                 <div key={r._id} className="border-b pb-4">
                                   <div className="flex items-center gap-2 mb-1">
                                      <span className="font-semibold">{r.userName || "Customer"}</span>
                                      <span className="text-xs text-gray-400">{new Date(r.createdAt).toLocaleDateString()}</span>
                                   </div>
                                   <div className="text-yellow-400 text-sm mb-2">
                                     {Array.from({ length: 5 }).map((_, i) => (
                                       <span key={i}>{i < r.rating ? "★" : "☆"}</span>
                                     ))}
                                   </div>
                                   <p className="text-sm text-gray-700">{r.comment}</p>
                                 </div>
                               ))
                             ) : (
                               <p className="text-sm text-gray-500">No reviews yet. Be the first to review this product!</p>
                             )}
                             
                             <div className="mt-8 bg-gray-50 p-6 rounded-xl border border-gray-100">
                               <h4 className="font-bold text-lg mb-4">Write a Review</h4>
                               {user ? (
                                 <form onSubmit={handleReviewSubmit} className="space-y-4 max-w-lg">
                                   <div>
                                     <label className="block text-sm font-medium mb-1">Rating</label>
                                     <select 
                                       value={reviewForm.rating} 
                                       onChange={e => setReviewForm(prev => ({...prev, rating: Number(e.target.value)}))}
                                       className="w-full border p-2 rounded"
                                     >
                                       <option value="5">5 Stars</option>
                                       <option value="4">4 Stars</option>
                                       <option value="3">3 Stars</option>
                                       <option value="2">2 Stars</option>
                                       <option value="1">1 Star</option>
                                     </select>
                                   </div>
                                   <div>
                                     <label className="block text-sm font-medium mb-1">Review</label>
                                     <textarea 
                                       rows="3" 
                                       required
                                       value={reviewForm.comment}
                                       onChange={e => setReviewForm(prev => ({...prev, comment: e.target.value}))}
                                       className="w-full border p-2 rounded" 
                                       placeholder="What did you like or dislike?"
                                     />
                                   </div>
                                   <button 
                                     type="submit" 
                                     disabled={submitReviewMutation.isPending}
                                     className="bg-red-500 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-red-600 disabled:opacity-50"
                                   >
                                     {submitReviewMutation.isPending ? "Submitting..." : "Submit Review"}
                                   </button>
                                 </form>
                               ) : (
                                 <div className="text-sm text-gray-600 bg-white p-4 border rounded">
                                   You must be logged in to leave a review. <a href="/login" className="text-red-500 font-semibold hover:underline">Log in here</a>
                                 </div>
                               )}
                             </div>
                           </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* RELATED PRODUCTS */}
                <div className="mt-16">
                  <h3 className="text-3xl font-bold mb-8">Related Products</h3>
                  <div className="relative flex items-center justify-center w-full">
                    <button
                      aria-label="Previous related products"
                      onClick={() => {
                        document
                          .getElementById("related-scroll")
                          .scrollBy({ left: -200, behavior: "smooth" });
                      }}
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
                      focus:outline-none
                      focus:ring-2
                      focus:ring-gray-400
                    "
                    >
                      ‹
                    </button>

                    <div
                      id="related-scroll"
                      className="
                      flex
                      items-start
                      justify-start
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
                          <div
                            className="
                              w-[170px]
                              h-[150px]
                              bg-[#e5e5e5]
                              rounded-xl
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
                              className="w-full h-full object-contain p-3 transition duration-300 group-hover:scale-105"
                              onError={(e) => {
                                e.target.src =
                                  "https://placehold.co/200x200?text=No+Image";
                              }}
                            />
                          </div>
                          <p className="mt-4 text-lg font-medium leading-snug transition group-hover:text-red-500">
                            {item.title}
                          </p>
                          <p className="text-gray-600 text-lg mt-1">
                            ₹{item.price || "67.00"}
                          </p>
                        </div>
                      ))}
                    </div>

                    <button
                      aria-label="Next related products"
                      onClick={() => {
                        document
                          .getElementById("related-scroll")
                          .scrollBy({ left: 200, behavior: "smooth" });
                      }}
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
                      focus:outline-none
                      focus:ring-2
                      focus:ring-gray-400
                    "
                    >
                      ›
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}

      {/* ALL PRODUCTS GRID VIEW */}
      {selectedCategory === "all" && !selectedProduct && (
            <section className="w-full bg-[#efefef] pt-[105px] pb-10">
              {/* TOP IMAGE */}
              <div className="px-6 mb-10">
                <img
                  src={allProductsTop}
                  alt="All Products"
                  className="w-full rounded-xl shadow-lg"
                />
              </div>

              {/* PRODUCTS */}
              <div className="max-w-7xl mx-auto flex flex-col gap-6 px-6">
                
                {/* FILTER PANEL (HORIZONTAL) */}
                <FilterPanel />

                {/* PRODUCT LIST */}
                <div className="w-full">
                  <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
                    <h2 ref={allProductsRef} className="text-4xl font-bold">
                      {searchQuery ? `Search Results for "${searchQuery}"` : "All Products"}
                    </h2>
                    <span className="text-sm text-gray-500">
                      {filteredAndSortedProducts.length} product
                      {filteredAndSortedProducts.length !== 1 ? "s" : ""} found
                    </span>
                  </div>

                  {isLoading ? (
                    /* ── CHANGED: 4-col grid for skeletons matching product grid ── */
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <SkeletonCard key={i} />
                      ))}
                    </div>
                  ) : filteredAndSortedProducts.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">
                      <svg
                        className="w-16 h-16 mx-auto mb-4 text-gray-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                      <p className="text-xl font-semibold mb-2">
                        {searchQuery ? "No search results found" : "No products found"}
                      </p>
                      <p className="text-sm">
                        {searchQuery 
                          ? `No products matched your search query "${searchQuery}".` 
                          : "Try adjusting your filters."}
                      </p>
                    </div>
                  ) : (
                    /* ── CHANGED: 1 col mobile / 2 col tablet / 4 col desktop ── */
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {filteredAndSortedProducts.map((item, index) => {
                        const defaultVariant = item.variants?.[0];
                        const priceVal = defaultVariant?.offerPrice || defaultVariant?.originalPrice || item.price || 0;
                        const inStockVal = (defaultVariant?.stockQuantity || 0) > 0;
                        const itemImage = item.images?.[0] || "https://placehold.co/400x300?text=No+Image";

                        return (
                          <div
                            key={index}
                            className="
                              bg-white
                              rounded-xl
                              overflow-hidden
                              shadow-md
                              border
                              border-gray-100
                              hover:-translate-y-2
                              hover:shadow-2xl
                              transition-all
                              duration-300
                              group
                              relative
                              flex
                              flex-col
                            "
                          >
                            {/* WISHLIST */}
                            <WishlistBtn
                              productId={item._id}
                              wishlisted={wishlist.includes(item._id)}
                              onToggle={toggleWishlist}
                            />

                            {/* BADGES */}
                            <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
                              {item.isNewArrival && (
                                <span className="bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                  NEW
                                </span>
                              )}
                              {!inStockVal && (
                                <span className="bg-gray-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                  OUT OF STOCK
                                </span>
                              )}
                            </div>

                            {/* IMAGE */}
                            <div 
                              className="bg-gray-50 relative overflow-hidden cursor-pointer"
                              onClick={() => handleViewDetails(item)}
                            >
                              <img
                                src={itemImage}
                                alt={item.name}
                                className="
                                  w-full
                                  h-[200px]
                                  object-contain
                                  p-3
                                  transition-transform
                                  duration-300
                                  group-hover:scale-105
                                "
                                onError={(e) => { e.target.src = "https://placehold.co/400x300?text=No+Image"; }}
                                loading="lazy"
                              />
                              {/* QUICK VIEW OVERLAY */}
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setQuickViewProduct(item);
                                  }}
                                  className="
                                    bg-white
                                    text-gray-800
                                    text-xs
                                    font-semibold
                                    px-4
                                    py-2
                                    rounded-full
                                    shadow-lg
                                    hover:bg-red-500
                                    hover:text-white
                                    transition
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-red-400
                                    cursor-pointer
                                  "
                                >
                                  Quick View
                                </button>
                              </div>
                            </div>

                            <div className="p-3 flex flex-col flex-1">
                              <h3 className="text-sm font-bold mb-1 leading-snug">
                                {item.name}
                              </h3>

                              {/* RATING STARS */}
                              <div className="flex items-center gap-0.5 mb-2">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <svg
                                    key={i}
                                    className={`w-3 h-3 ${i < 4 ? "text-yellow-400" : "text-gray-300"}`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    aria-hidden="true"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                                <span className="text-xs text-gray-400 ml-1">
                                  (12)
                                </span>
                              </div>

                              <div className="space-y-0.5 text-gray-600 text-xs mb-2">
                                <p>
                                  <span className="font-semibold">SKU:</span>{" "}
                                  {defaultVariant?.sku || "N/A"}
                                </p>
                                <p>
                                  <span className="font-semibold">Stock:</span>{" "}
                                  {defaultVariant?.stockQuantity || 0} left
                                </p>
                              </div>

                              <div className="mt-auto">
                                <p className="text-base font-bold text-gray-900 mb-2">
                                  ₹{priceVal.toLocaleString("en-IN")}
                                </p>

                                <div className="grid grid-cols-1 gap-1.5">
                                  <button
                                    onClick={() => {
                                      if (inStockVal && defaultVariant) {
                                        addToCart({
                                          ...item,
                                          title: item.name,
                                          price: priceVal,
                                          image: itemImage,
                                          variantId: defaultVariant._id,
                                          productId: item._id,
                                        });
                                      }
                                    }}
                                    disabled={!inStockVal || isCartUpdating || addingProductIds[item._id]}
                                    aria-label={`Add ${item.name} to cart`}
                                    className="
                                      w-full
                                      bg-red-500
                                      text-white
                                      px-2
                                      py-1.5
                                      rounded-lg
                                      text-xs
                                      font-semibold
                                      hover:bg-red-600
                                      transition-all
                                      duration-200
                                      disabled:opacity-50
                                      disabled:cursor-not-allowed
                                      focus:outline-none
                                      focus:ring-2
                                      focus:ring-red-400
                                      min-h-[36px]
                                      cursor-pointer
                                      flex items-center justify-center gap-1.5
                                    "
                                  >
                                    {addingProductIds[item._id] ? (
                                      <>
                                        <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent animate-spin rounded-full" />
                                        Adding...
                                      </>
                                    ) : inStockVal ? (
                                      "Add to Cart"
                                    ) : (
                                      "Out of Stock"
                                    )}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* PAGINATION */}
                  {!isLoading && totalPages > 1 && (
                    <div className="flex justify-center gap-2 mt-10 flex-wrap">
                      <button
                        onClick={() => {
                          if (currentPage > 1)
                            handlePageChange(currentPage - 1);
                        }}
                        disabled={currentPage === 1}
                        aria-label="Previous page"
                        className="
                          w-12
                          h-12
                          border
                          bg-white
                          hover:bg-gray-200
                          disabled:opacity-40
                          disabled:cursor-not-allowed
                          rounded-lg
                          focus:outline-none
                          focus:ring-2
                          focus:ring-red-400
                          min-h-[44px]
                          min-w-[44px]
                          cursor-pointer
                        "
                      >
                        &lt;
                      </button>

                      {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                          key={i}
                          onClick={() => handlePageChange(i + 1)}
                          aria-label={`Page ${i + 1}`}
                          aria-current={
                            currentPage === i + 1 ? "page" : undefined
                          }
                          className={`
                            w-12
                            h-12
                            border
                            rounded-lg
                            font-semibold
                            focus:outline-none
                            focus:ring-2
                            focus:ring-red-400
                            min-h-[44px]
                            min-w-[44px]
                            cursor-pointer
                            ${currentPage === i + 1 ? "bg-red-500 text-white" : "bg-white hover:bg-gray-200"}
                          `}
                        >
                          {i + 1}
                        </button>
                      ))}

                      <button
                        onClick={() => {
                          if (currentPage < totalPages)
                            handlePageChange(currentPage + 1);
                        }}
                        disabled={currentPage === totalPages}
                        aria-label="Next page"
                        className="
                          w-12
                          h-12
                          border
                          bg-white
                          hover:bg-gray-200
                          disabled:opacity-40
                          disabled:cursor-not-allowed
                          rounded-lg
                          focus:outline-none
                          focus:ring-2
                          focus:ring-red-400
                          min-h-[44px]
                          min-w-[44px]
                          cursor-pointer
                        "
                      >
                        &gt;
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}
    </>
  );
}
