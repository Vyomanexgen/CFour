import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useConfig } from "../context/ConfigContext";
import { useToast } from "../context/ToastContext";
import { Trash2 } from "lucide-react";
import {
  checkoutOrder,
  getOrderDetails,
  updateProfileAddresses,
  getPaymentGateways,
  verifyRazorpayPayment,
} from "../api/orderApi";
import { applyCoupon, removeCoupon } from "../api/cartApi";

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function Cart() {
  const navigate = useNavigate();
  const nameInputRef = useRef(null);
  const toast = useToast();


  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const { cartItems, updateCartQty, removeCartItem, clearCart, restoreCart, isCartUpdating, cartError, setCartError } = useCart();
  const { user, setUser } = useAuth();
  const { calculateOrderCharges } = useConfig();

  const [showCheckout, setShowCheckout] = useState(false);
  const [showPlaceOrder, setShowPlaceOrder] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);
  const [showTrackingPage, setShowTrackingPage] = useState(false);
  const [showFinalOrderDetails, setShowFinalOrderDetails] = useState(false);
  const [showCancelPage, setShowCancelPage] = useState(false);
  const [cancelItem, setCancelItem] = useState(null);
  const [showCancellationSuccess, setShowCancellationSuccess] = useState(false);
  const [orderedItems, setOrderedItems] = useState([]);
  const [placedOrder, setPlacedOrder] = useState(null);
  const [saveToProfile, setSaveToProfile] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  // Address and Checkout state
  const [addressForm, setAddressForm] = useState({
    fullName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState(null);
  const [createdOrderNumber, setCreatedOrderNumber] = useState("");

  const [isSelectedSavedAddress, setIsSelectedSavedAddress] = useState(false);

  // Coupon state
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");

  // Payment Gateways Integration State
  const [gateways, setGateways] = useState([]);
  const [loadingGateways, setLoadingGateways] = useState(false);
  const [isVerifyingPayment, setIsVerifyingPayment] = useState(false);
  const [paymentCancelledOrder, setPaymentCancelledOrder] = useState(null);

  // Fetch active gateways when checkout starts
  useEffect(() => {
    if (showCheckout && user) {
      const fetchGateways = async () => {
        setLoadingGateways(true);
        try {
          const res = await getPaymentGateways();
          setGateways(res.data || res || []);
        } catch (err) {
          if (err.response?.status !== 404) {
            console.error("Failed to load payment gateways:", err);
          }
          setGateways([]);
        } finally {
          setLoadingGateways(false);
        }
      };
      fetchGateways();
    }
  }, [showCheckout, user]);

  // Reset checkout states when entering checkout
  useEffect(() => {
    if (showCheckout) {
      setAddressForm({
        fullName: "",
        phone: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        postalCode: "",
        country: "India",
      });
      setIsSelectedSavedAddress(false);
      setCheckoutError(null);
      setPaymentCancelledOrder(null);
      setPaymentMethod("cod");
    }
  }, [showCheckout]);

  const handleUseSavedAddress = () => {
    if (user && user.shippingAddress) {
      setAddressForm({
        fullName: user.shippingAddress.fullName || "",
        phone: user.shippingAddress.phone || "",
        addressLine1: user.shippingAddress.addressLine1 || "",
        addressLine2: user.shippingAddress.addressLine2 || "",
        city: user.shippingAddress.city || "",
        state: user.shippingAddress.state || "",
        postalCode: user.shippingAddress.postalCode || "",
        country: user.shippingAddress.country || "India",
      });
      setIsSelectedSavedAddress(true);
      setCheckoutError(null);
    }
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponError("Please enter a coupon code");
      return;
    }
    setCouponError("");
    toast.info("Verifying coupon...");
    
    try {
      const res = await applyCoupon(couponCode);
      const cartData = res.data || res;
      const discount = cartData?.discountTotal || cartData?.coupon?.discountAmount || 0;
      setAppliedCoupon({ code: couponCode, discountAmount: discount });
      toast.success(`Coupon applied! You saved ₹${discount}`);
    } catch (err) {
      const errMsg = err.response?.data?.message || err.response?.data?.error || "Invalid or expired coupon code";
      setCouponError(errMsg);
      toast.error(errMsg);
      setAppliedCoupon(null);
    }
  };

  const handleRemoveCoupon = async () => {
    try {
      await removeCoupon();
      setAppliedCoupon(null);
      setCouponCode("");
      toast.success("Coupon removed successfully.");
    } catch (err) {
      toast.error("Failed to remove coupon.");
    }
  };

  const handleClearForm = () => {
    setAddressForm({
      fullName: "",
      phone: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "India",
    });
    setIsSelectedSavedAddress(false);
  };

  const handleAddNewAddress = () => {
    handleClearForm();
    setIsSelectedSavedAddress(false);
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  };

  const updateAddressField = (field, value) => {
    setAddressForm((prev) => ({ ...prev, [field]: value }));
    setIsSelectedSavedAddress(false);
  };

  const getActiveGateways = () => {
    if (!gateways) return [];
    if (Array.isArray(gateways)) {
      return gateways.filter(g => g.isActive).map(g => g.provider.toLowerCase());
    }
    if (typeof gateways === "object") {
      const list = [];
      for (const [key, val] of Object.entries(gateways)) {
        if (val === true || (val && val.isActive === true)) {
          list.push(key.toLowerCase());
        }
      }
      return list;
    }
    return [];
  };

  const activeProviders = getActiveGateways();
  const isRazorpayActive = activeProviders.includes("razorpay") || activeProviders.length === 0;
  const isCashfreeActive = activeProviders.includes("cashfree");
  const isStripeActive = activeProviders.includes("stripe");



  const updateQty = async (variantId, delta) => {
    const item = cartItems.find((i) => i.variantId === variantId);
    if (item) {
      const res = await updateCartQty(variantId, item.qty + delta);
      if (res && !res.success) {
        toast.error(res.error);
      }
    }
  };

  const getFormattedDate = (offset = 0) => {
    const d = new Date();
    d.setDate(d.getDate() + offset);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Pricing calculations using dynamic configuration context
  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  const charges = calculateOrderCharges(subtotal);
  const shipping = cartItems.length > 0 ? charges.shippingFee : 0;
  const gst = cartItems.length > 0 ? charges.taxAmount : 0;
  const grandTotal = cartItems.length > 0 ? charges.grandTotal - (appliedCoupon?.discountAmount || 0) : 0;
  const related = cartItems.slice(0, 4);

  // Success page pricing details
  const orderedSubtotal = placedOrder?.pricing?.subtotal || orderedItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  const orderedShipping = placedOrder?.pricing?.shippingFee !== undefined ? placedOrder.pricing.shippingFee : (orderedItems.length > 0 ? charges.shippingFee : 0);
  const orderedGst = placedOrder?.pricing?.tax !== undefined ? placedOrder.pricing.tax : (orderedItems.length > 0 ? charges.taxAmount : 0);
  const orderedGrandTotal = placedOrder?.pricing?.totalAmount || (orderedSubtotal + orderedShipping + orderedGst);

  const openCancelPage = (item) => {
    setCancelItem(item);
    setShowFinalOrderDetails(false);
    setShowTrackingPage(false);
    setShowCancelPage(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePlaceOrder = async () => {
    if (isCheckingOut) return;
    setCheckoutError(null);
    setIsCheckingOut(true);

    try {
      const trimmedAddress = {
        fullName: addressForm.fullName.trim(),
        phone: addressForm.phone.trim(),
        addressLine1: addressForm.addressLine1.trim(),
        addressLine2: addressForm.addressLine2.trim() || "",
        city: addressForm.city.trim(),
        state: addressForm.state.trim(),
        postalCode: addressForm.postalCode.trim(),
        country: addressForm.country.trim(),
      };

      const payload = {
        shippingAddress: trimmedAddress,
        billingAddress: trimmedAddress,
        paymentMethod: paymentMethod,
      };

      // 1. Opt-in Profile Address Update
      if (saveToProfile) {
        try {
          const profileAddresses = {
            shippingAddress: trimmedAddress,
            billingAddress: trimmedAddress,
          };
          const profileRes = await updateProfileAddresses(profileAddresses);
          if (setUser && profileRes.success) {
            setUser(prev => ({
              ...prev,
              shippingAddress: trimmedAddress,
              billingAddress: trimmedAddress,
            }));
          }
        } catch (profErr) {
          console.error("Profile address update failed during checkout", profErr);
        }
      }

      // 2. Checkout
      const res = await checkoutOrder(payload);
      const orderData = res.data?.order || res.order || res.data;
      const paymentSession = res.data?.paymentSession || res.paymentSession;
      
      if (!orderData || !(orderData.id || orderData._id)) {
        throw new Error("Order creation failed - no order reference generated.");
      }

      const orderId = orderData.id || orderData._id;
      const orderNum = orderData.orderNumber || "ORD-" + orderId.substring(orderId.length - 8).toUpperCase();
      
      // If payment method is Razorpay, open Razorpay popup
      if (paymentMethod === "razorpay" && paymentSession) {
        // Load script
        const scriptLoaded = await loadRazorpayScript();
        if (!scriptLoaded) {
          throw new Error("Failed to load Razorpay SDK. Please check your internet connection.");
        }

        // We clear cart locally as backend cart is already cleared upon checkoutOrder success
        await clearCart();
        await restoreCart();

        const options = {
          key: paymentSession.keyId,
          amount: paymentSession.amount,
          currency: paymentSession.currency,
          name: "Vyomanexgen CFour",
          description: `Payment for Order ${orderNum}`,
          order_id: paymentSession.razorpayOrderId,
          handler: async function (response) {
            setIsCheckingOut(true);
            setIsVerifyingPayment(true);
            setCheckoutError(null);
            try {
              const verifyPayload = {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              };
              
              const verifyRes = await verifyRazorpayPayment(verifyPayload);
              if (verifyRes.success || verifyRes.data?.success) {
                // Success!
                setCreatedOrderNumber(orderNum);
                setOrderedItems([...cartItems]);
                
                try {
                  const detailRes = await getOrderDetails(orderId);
                  setPlacedOrder(detailRes.data || detailRes);
                } catch (detailErr) {
                  setPlacedOrder({
                    ...orderData,
                    status: "paid",
                    paymentInfo: { method: "razorpay", status: "paid" }
                  });
                }

                setShowSuccessAnimation(true);
                window.scrollTo({ top: 0, behavior: "smooth" });
                setTimeout(() => {
                  setShowSuccessAnimation(false);
                  setShowPlaceOrder(false);
                  setShowCheckout(false);
                  setShowOrderSuccess(true);
                  setIsCheckingOut(false);
                  setIsVerifyingPayment(false);
                  setPaymentCancelledOrder(null);
                }, 5000);
              } else {
                throw new Error(verifyRes.error || "Payment signature verification failed.");
              }
            } catch (verifyErr) {
              console.error("Signature verification failed:", verifyErr);
              setCheckoutError(verifyErr.response?.data?.error || verifyErr.message || "Payment verification failed. Please contact customer support.");
              setIsCheckingOut(false);
              setIsVerifyingPayment(false);
            }
          },
          prefill: {
            name: orderData.shippingAddress.fullName,
            contact: orderData.shippingAddress.phone,
            email: user?.email || "",
          },
          theme: {
            color: "#EF4444",
          },
          modal: {
            ondismiss: function () {
              console.log("Razorpay checkout closed by user");
              setCheckoutError("Payment was cancelled or abandoned. You can retry paying for this order below, or find it in your My Orders page.");
              setPaymentCancelledOrder({
                order: orderData,
                paymentSession: paymentSession
              });
              setIsCheckingOut(false);
            }
          }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else if (paymentMethod === "cod") {
        // COD order
        setCreatedOrderNumber(orderNum);
        setOrderedItems([...cartItems]);

        try {
          const detailRes = await getOrderDetails(orderId);
          setPlacedOrder(detailRes.data || detailRes);
        } catch (detailErr) {
          setPlacedOrder({
            ...orderData,
            orderNumber: orderNum,
            items: cartItems.map(item => ({
              productId: item.productId,
              variantId: item.variantId,
              quantity: item.qty,
              offerPriceAtPurchase: item.price,
              nameAtPurchase: item.title,
            })),
            pricing: {
              subtotal,
              shippingFee: shipping,
              tax: gst,
              totalAmount: grandTotal,
            },
            shippingAddress: trimmedAddress,
            paymentInfo: { method: paymentMethod }
          });
        }

        await clearCart();
        await restoreCart();

        setShowSuccessAnimation(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
        setTimeout(() => {
          setShowSuccessAnimation(false);
          setShowPlaceOrder(false);
          setShowCheckout(false);
          setShowOrderSuccess(true);
          setIsCheckingOut(false);
        }, 5000);
      } else {
        // COD or other offline payment
        setCreatedOrderNumber(orderNum);
        setOrderedItems([...cartItems]);

        try {
          const detailRes = await getOrderDetails(orderId);
          setPlacedOrder(detailRes.data || detailRes);
        } catch (detailErr) {
          setPlacedOrder({
            ...orderData,
            orderNumber: orderNum,
            items: cartItems.map(item => ({
              productId: item.productId,
              variantId: item.variantId,
              quantity: item.qty,
              offerPriceAtPurchase: item.price,
              nameAtPurchase: item.title,
            })),
            pricing: {
              subtotal,
              shippingFee: shipping,
              tax: gst,
              totalAmount: grandTotal,
            },
            shippingAddress: trimmedAddress,
            paymentInfo: { method: paymentMethod }
          });
        }

        await clearCart();
        await restoreCart();

        if (paymentMethod !== "cod") {
          toast.info(`Order placed successfully with pending payment (${paymentMethod.toUpperCase()}).`);
        }

        setShowSuccessAnimation(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
        setTimeout(() => {
          setShowSuccessAnimation(false);
          setShowPlaceOrder(false);
          setShowCheckout(false);
          setShowOrderSuccess(true);
          setIsCheckingOut(false);
        }, 5000);
      }
    } catch (err) {
      console.error("Place order failed:", err);
      setCheckoutError(err.response?.data?.message || err.message || "Failed to place order. Please try again.");
      setIsCheckingOut(false);
    }
  };

  const handleRetryPayment = async () => {
    if (!paymentCancelledOrder) return;
    const { order, paymentSession } = paymentCancelledOrder;

    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      setCheckoutError("Failed to load Razorpay SDK. Please check your internet connection.");
      return;
    }

    setIsCheckingOut(true);
    setCheckoutError(null);

    const options = {
      key: paymentSession.keyId,
      amount: paymentSession.amount,
      currency: paymentSession.currency,
      name: "Vyomanexgen CFour",
      description: `Payment for Order ${order.orderNumber}`,
      order_id: paymentSession.razorpayOrderId,
      handler: async function (response) {
        setIsCheckingOut(true);
        setIsVerifyingPayment(true);
        try {
          const verifyPayload = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          };
          
          const verifyRes = await verifyRazorpayPayment(verifyPayload);
          if (verifyRes.success || verifyRes.data?.success) {
            setCreatedOrderNumber(order.orderNumber);
            setOrderedItems(order.items || [...cartItems]);
            
            try {
              const detailRes = await getOrderDetails(order.id || order._id);
              setPlacedOrder(detailRes.data || detailRes);
            } catch (detailErr) {
              setPlacedOrder({
                ...order,
                status: "paid",
                paymentInfo: { method: "razorpay", status: "paid" }
              });
            }

            setShowSuccessAnimation(true);
            window.scrollTo({ top: 0, behavior: "smooth" });
            setTimeout(() => {
              setShowSuccessAnimation(false);
              setShowPlaceOrder(false);
              setShowCheckout(false);
              setShowOrderSuccess(true);
              setIsCheckingOut(false);
              setIsVerifyingPayment(false);
              setPaymentCancelledOrder(null);
            }, 5000);
          } else {
            throw new Error(verifyRes.error || "Payment signature verification failed.");
          }
        } catch (verifyErr) {
          console.error("Signature verification failed during retry:", verifyErr);
          setCheckoutError(verifyErr.response?.data?.error || verifyErr.message || "Payment verification failed. Please contact customer support.");
          setIsCheckingOut(false);
          setIsVerifyingPayment(false);
        }
      },
      prefill: {
        name: order.shippingAddress.fullName,
        contact: order.shippingAddress.phone,
        email: user?.email || "",
      },
      theme: {
        color: "#EF4444",
      },
      modal: {
        ondismiss: function () {
          console.log("Razorpay checkout closed by user during retry");
          setCheckoutError("Payment was cancelled or abandoned. You can retry paying for this order below, or find it in your My Orders page.");
          setIsCheckingOut(false);
        }
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };


  const handleGoToPlaceOrder = () => {
    setCheckoutError(null);
    const fullName = addressForm.fullName.trim();
    const phone = addressForm.phone.trim();
    const addressLine1 = addressForm.addressLine1.trim();
    const city = addressForm.city.trim();
    const state = addressForm.state.trim();
    const postalCode = addressForm.postalCode.trim();
    const country = addressForm.country.trim();
    
    if (!cartItems || cartItems.length === 0) {
      setCheckoutError("Your cart is empty.");
      return;
    }

    if (!fullName || !phone || !addressLine1 || !city || !state || !postalCode || !country) {
      setCheckoutError("Please fill out all required shipping address fields. Whitespace-only values are not allowed.");
      return;
    }

    // Phone: exactly 10 digits
    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length !== 10 || phone !== phoneDigits) {
      setCheckoutError("Please enter a valid 10-digit phone number (digits only, e.g. 9876543210).");
      return;
    }

    // Pincode: exactly 6 digits
    const zipDigits = postalCode.replace(/\D/g, "");
    if (zipDigits.length !== 6 || postalCode !== zipDigits) {
      setCheckoutError("Please enter a valid 6-digit postal code / pincode (digits only, e.g. 500032).");
      return;
    }

    setShowPlaceOrder(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ========================= PAYMENT VERIFICATION LOADER ========================== */

  if (isVerifyingPayment) {
    return (
      <div className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
        <div className="bg-white p-8 rounded-3xl border border-gray-100 flex flex-col items-center max-w-sm text-center shadow-2xl">
          <div className="h-14 w-14 animate-spin rounded-full border-4 border-red-500 border-t-transparent mb-6" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Verifying Payment</h2>
          <p className="text-sm text-gray-500 font-medium leading-relaxed">
            We are confirming your payment transaction with the server. Please do not close this window, refresh the page, or navigate away.
          </p>
        </div>
      </div>
    );
  }

  /* ========================= SUCCESS ANIMATION ========================== */

  if (showSuccessAnimation) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <style>{`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(24px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          @keyframes scaleIn {
            from { opacity: 0; transform: scale(0.7); }
            to   { opacity: 1; transform: scale(1); }
          }
          @keyframes drawCircle {
            from { stroke-dashoffset: 314; }
            to   { stroke-dashoffset: 0; }
          }
          @keyframes drawCheck {
            from { stroke-dashoffset: 100; opacity: 0; }
            to   { stroke-dashoffset: 0; opacity: 1; }
          }
          @keyframes barFill {
            from { width: 0%; }
            to   { width: 28%; }
          }
          @keyframes dotPop {
            0%   { transform: scale(0); opacity: 0; }
            70%  { transform: scale(1.2); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
          }
          .anim-circle   { animation: drawCircle 1s cubic-bezier(.4,0,.2,1) forwards 0.1s; }
          .anim-check    { animation: drawCheck 0.5s ease forwards 1s; }
          .anim-title    { animation: fadeInUp 0.6s ease forwards 1.2s; opacity: 0; }
          .anim-sub      { animation: fadeInUp 0.6s ease forwards 1.5s; opacity: 0; }
          .anim-divider  { animation: fadeInUp 0.5s ease forwards 1.7s; opacity: 0; }
          .anim-step1    { animation: dotPop 0.4s ease forwards 1.9s; opacity: 0; }
          .anim-step2    { animation: dotPop 0.4s ease forwards 2.1s; opacity: 0; }
          .anim-step3    { animation: dotPop 0.4s ease forwards 2.3s; opacity: 0; }
          .anim-step4    { animation: dotPop 0.4s ease forwards 2.5s; opacity: 0; }
          .anim-bar      { animation: barFill 1s ease forwards 2.0s; width: 0%; }
          .anim-label    { animation: fadeInUp 0.5s ease forwards 2.8s; opacity: 0; }
        `}</style>

        <div className="flex flex-col items-center text-center px-6 w-full max-w-sm">

          {/* SVG CIRCLE + CHECK */}
          <div className="relative w-28 h-28 mb-8">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              {/* TRACK */}
              <circle
                cx="50" cy="50" r="46"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="4"
              />
              {/* ANIMATED RING */}
              <circle
                cx="50" cy="50" r="46"
                fill="none"
                stroke="#16a34a"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="314"
                strokeDashoffset="314"
                className="anim-circle"
              />
            </svg>
            {/* CHECK MARK */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg viewBox="0 0 52 52" className="w-12 h-12">
                <polyline
                  points="10,28 22,40 42,16"
                  fill="none"
                  stroke="#16a34a"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="100"
                  strokeDashoffset="100"
                  className="anim-check"
                />
              </svg>
            </div>
          </div>

          {/* TITLE */}
          <h2 className="anim-title text-3xl font-bold text-gray-900 mb-2">
            Order Confirmed
          </h2>

          {/* SUBTITLE */}
          <p className="anim-sub text-gray-500 text-base mb-8">
            Thank you! Your order is on its way.
          </p>

          {/* DIVIDER */}
          <div className="anim-divider w-full h-px bg-gray-200 mb-8" />

          {/* PROGRESS TRACK */}
          <div className="anim-divider w-full mb-2">
            <div className="flex justify-between text-xs text-gray-400 mb-3">
              <span>Confirmed</span>
              <span>Processing</span>
              <span>Shipped</span>
              <span>Delivered</span>
            </div>

            {/* BAR */}
            <div className="relative w-full h-1 bg-gray-200 rounded-full mb-4">
              <div
                className="anim-bar absolute top-0 left-0 h-1 bg-green-600 rounded-full"
              />
            </div>

            {/* DOTS */}
            <div className="flex justify-between">
              <div className="anim-step1 flex flex-col items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-green-600" />
              </div>
              <div className="anim-step2 flex flex-col items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-gray-300" />
              </div>
              <div className="anim-step3 flex flex-col items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-gray-300" />
              </div>
              <div className="anim-step4 flex flex-col items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-gray-300" />
              </div>
            </div>
          </div>

          {/* BOTTOM LABEL */}
          <p className="anim-label text-xs text-gray-400 mt-6">
            We'll notify you when your order ships
          </p>

        </div>
      </div>
    );
  }

  /* ========================= CANCELLATION SUCCESS PAGE ========================== */

  if (showCancellationSuccess) {
    return (
      <div className="min-h-screen bg-[#f3f3f3] pt-24 px-3 pb-10">
        <div className="max-w-[1200px] mx-auto bg-white border border-gray-300 rounded-2xl p-6">
          {/* SUCCESS HEADER */}
          <div className="flex items-center gap-2 mb-6">
            <span className="text-green-500 text-2xl">✅</span>
            <h2 className="text-2xl font-bold text-green-600">
              Cancellation Successful
            </h2>
          </div>

          {/* CANCELLATION SUMMARY */}
          <h3 className="text-xl font-bold mb-4">Cancellation Summary</h3>

          {cancelItem && (
            <div className="flex gap-4">
              <div className="w-28 h-28 bg-gray-300 rounded-xl overflow-hidden flex-shrink-0">
                {cancelItem.image && (
                  <img
                    src={cancelItem.image}
                    alt={cancelItem.title}
                    className="w-full h-full object-contain"
                  />
                )}
              </div>
              <div>
                <h2 className="text-lg font-bold mb-1">{cancelItem.title}</h2>
                <div className="space-y-0.5 text-sm">
                  <p>
                    <span className="font-bold">Size:</span> 19MM
                  </p>
                  <p>
                    <span className="font-bold">Length:</span> 20ft
                  </p>
                  <p>
                    <span className="font-bold">Code:</span> CF001
                  </p>
                  <p>
                    <span className="font-bold">Colour:</span> Green
                  </p>
                  <p>
                    <span className="font-bold">Material:</span> PVC
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* BACK TO CART */}
        <div className="max-w-[1200px] mx-auto mt-4">
          <button
            onClick={() => {
              setShowCancellationSuccess(false);
              setCancelItem(null);
              setShowOrderSuccess(false);
              setShowFinalOrderDetails(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-[#4b3bbd] font-medium hover:underline cursor-pointer"
          >
            Back to Cart
          </button>
        </div>
      </div>
    );
  }

  /* ========================= CANCEL PAGE ========================== */

  if (showCancelPage) {
    const itemsToCancel = cancelItem ? [cancelItem] : orderedItems;

    return (
      <div className="min-h-screen bg-[#f3f3f3] pt-24 px-3 pb-10">
        <div className="max-w-[1200px] mx-auto bg-white border border-gray-300 rounded-2xl p-6">
          <button
            onClick={() => {
              setShowCancelPage(false);
              setCancelItem(null);
              setShowFinalOrderDetails(true);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="mb-4 flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-black transition w-fit cursor-pointer"
          >
            ← Back to Order Details
          </button>

          <h2 className="text-3xl font-bold mb-6">Cancel Item</h2>

          {itemsToCancel.map((item, index) => (
            <div
              key={index}
              className={
                index !== itemsToCancel.length - 1
                  ? "mb-8 pb-8 border-b border-gray-300"
                  : ""
              }
            >
              <div className="flex flex-col lg:flex-row justify-between gap-8">
                <div className="flex gap-5">
                  <div className="w-32 h-32 bg-gray-300 rounded-xl overflow-hidden flex-shrink-0">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-contain"
                      />
                    )}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
                    <div className="space-y-1 text-base">
                      <p>
                        <span className="font-bold">Size:</span> 19MM
                      </p>
                      <p>
                        <span className="font-bold">Length:</span> 20ft
                      </p>
                      <p>
                        <span className="font-bold">Code:</span> CF001
                      </p>
                      <p>
                        <span className="font-bold">Colour:</span> Green
                      </p>
                      <p>
                        <span className="font-bold">Material:</span> PVC
                      </p>
                    </div>
                  </div>
                </div>

                {/* ← UPDATED: onClick now shows cancellation success */}
                <div className="flex items-center">
                  <button
                    onClick={() => {
                      setShowCancelPage(false);
                      setShowCancellationSuccess(true);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="bg-red-500 text-white px-10 py-3 rounded-lg text-xl font-bold hover:bg-red-600 transition cursor-pointer"
                  >
                    Request Cancellation
                  </button>
                </div>
              </div>

              <div className="mt-6">
                <input
                  type="text"
                  placeholder="Reason"
                  className="w-full max-w-[600px] border border-gray-400 rounded-lg px-5 py-3 text-xl outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ========================= FINAL ORDER DETAILS ========================== */

  if (showFinalOrderDetails) {
    return (
      <div className="min-h-screen bg-[#f3f3f3] pt-24 px-3 pb-10">
        <div className="max-w-[1200px] mx-auto bg-white border border-gray-300 rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-2">Order Details</h2>
          <p className="text-xl mb-6">Order placed {getFormattedDate()}</p>

          {orderedItems.map((item, index) => (
            <div
              key={index}
              className={`mb-14 pb-10 ${index !== orderedItems.length - 1 ? "border-b border-gray-300" : ""}`}
            >
              <div className="flex flex-col lg:flex-row justify-between gap-8">
                <div className="flex gap-5">
                  <div className="w-36 h-36 bg-gray-300 rounded-xl overflow-hidden flex-shrink-0">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-contain"
                      />
                    )}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-3">{item.title}</h2>
                    <div className="space-y-1 text-base">
                      <p>
                        <span className="font-bold">Size:</span> 19MM
                      </p>
                      <p>
                        <span className="font-bold">Length:</span> 20ft
                      </p>
                      <p>
                        <span className="font-bold">Code:</span> CF001
                      </p>
                      <p>
                        <span className="font-bold">Colour:</span> Green
                      </p>
                      <p>
                        <span className="font-bold">Material:</span> PVC
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4 min-w-[220px]">
                  <button
                    onClick={() => {
                      setShowFinalOrderDetails(false);
                      setShowTrackingPage(true);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="bg-red-500 text-white py-3 rounded-lg text-xl font-bold hover:bg-red-600 transition cursor-pointer"
                  >
                    Track Order
                  </button>
                  <button
                    onClick={() => openCancelPage(item)}
                    className="border-2 border-gray-400 text-gray-500 py-3 rounded-lg text-lg font-bold cursor-pointer"
                  >
                    Cancel Order
                  </button>
                </div>
              </div>

              <div className="border-t border-gray-300 my-8"></div>

              <div className="grid md:grid-cols-3 gap-16 mt-2">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Shipping to</h2>
                  <div className="space-y-2 text-xl">
                    <p>{addressForm.fullName}</p>
                    <p>{addressForm.addressLine1}{addressForm.addressLine2 ? `, ${addressForm.addressLine2}` : ""}</p>
                    <p>{addressForm.city}, {addressForm.state} {addressForm.postalCode}, {addressForm.country}</p>
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-4">Payment Method</h2>
                  <p className="text-2xl">
                    {paymentMethod === "cod" ? "Pay on Delivery" : `Online Payment (${paymentMethod.toUpperCase()})`}
                  </p>
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
                  <div className="space-y-3 text-xl">
                    <div className="flex justify-between">
                      <span>Total:</span>
                      <span>₹{orderedSubtotal.toLocaleString("en-IN")}.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping:</span>
                      <span>₹{orderedShipping.toLocaleString("en-IN")}.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>GST:</span>
                      <span>₹{orderedGst.toLocaleString("en-IN")}.00</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span>Order Total:</span>
                      <span>₹{orderedGrandTotal.toLocaleString("en-IN")}.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ========================= TRACKING PAGE ========================== */

  if (showTrackingPage) {
    return (
      <div className="min-h-screen bg-[#f3f3f3] pt-24 px-3 pb-10">
        <div className="max-w-[1200px] mx-auto bg-white border border-gray-300 rounded-2xl p-5">
          <h2 className="text-4xl font-bold mb-6">Order Tracker</h2>

          {orderedItems.map((item, index) => (
            <div key={index}>
              <div className="flex flex-col sm:flex-row gap-5">
                <div className="w-28 h-28 bg-gray-300 rounded-xl overflow-hidden flex-shrink-0">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{item.title}</h2>
                  <div className="mt-2 space-y-1">
                    <p>
                      <span className="font-bold">Size:</span> 19MM
                    </p>
                    <p>
                      <span className="font-bold">Length:</span> 20ft
                    </p>
                    <p>
                      <span className="font-bold">Code:</span> CF001
                    </p>
                    <p>
                      <span className="font-bold">Colour:</span> Green
                    </p>
                    <p>
                      <span className="font-bold">Material:</span> PVC
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-300 my-8"></div>

              <div className="mt-10">
                <h2 className="text-[32px] font-bold text-center mb-10">
                  Ordered
                </h2>
                <div className="relative w-full">
                  <div className="absolute top-[11px] left-0 w-full h-[3px] bg-gray-300"></div>
                  <div className="absolute top-[11px] left-0 h-[3px] bg-blue-500 w-[2%]"></div>
                  <div className="flex justify-between relative z-10">
                    <div className="flex flex-col items-center">
                      <div className="w-6 h-6 rounded-full bg-blue-500 border-[3px] border-white"></div>
                      <p className="mt-3 text-[14px] font-semibold">Ordered</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-6 h-6 rounded-full bg-white border-2 border-gray-400"></div>
                      <p className="mt-3 text-[14px] text-gray-500">Shipped</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-6 h-6 rounded-full bg-white border-2 border-gray-400"></div>
                      <p className="mt-3 text-[14px] text-gray-500">
                        Out for delivery
                      </p>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-6 h-6 rounded-full bg-white border-2 border-gray-400"></div>
                      <p className="mt-3 text-[14px] text-gray-500">
                        Delivered
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mt-10">
                <div className="border-2 border-gray-300 p-5 rounded">
                  <h2 className="text-2xl font-bold mb-4">Delivery Info</h2>
                  <button className="text-cyan-600 font-medium">
                    ✎ Update delivery instructions
                  </button>
                </div>
                <div className="border-2 border-gray-300 p-5 rounded">
                  <h2 className="text-2xl font-bold mb-4">Shipping Address</h2>
                  <div className="space-y-2 text-lg">
                    <p>{addressForm.fullName}</p>
                    <p>{addressForm.addressLine1}{addressForm.addressLine2 ? `, ${addressForm.addressLine2}` : ""}</p>
                    <p>{addressForm.city}, {addressForm.state} {addressForm.postalCode}, {addressForm.country}</p>
                  </div>
                </div>
                <div className="border-2 border-gray-300 p-5 rounded">
                  <h2 className="text-2xl font-bold mb-4">Order Info</h2>
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => {
                        setShowTrackingPage(false);
                        setShowFinalOrderDetails(true);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="text-[#4b3bbd] font-medium text-left cursor-pointer"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => openCancelPage(item)}
                      className="text-[#4b3bbd] font-medium text-left cursor-pointer"
                    >
                      Cancel Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ========================= ORDER SUCCESS PAGE ========================== */

  const getItemImage = (item) => {
    if (item.image) return item.image;
    const match = orderedItems.find(oi => oi.variantId === item.variantId);
    return match?.image || "";
  };

  if (showOrderSuccess) {
    const shippingInfo = placedOrder?.shippingAddress || addressForm;
    const displayItems = placedOrder?.items || [];

    return (
      <div className="min-h-screen bg-[#f3f3f3] pt-28 px-4 pb-10">
        <div className="max-w-[800px] mx-auto bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="text-center border-b border-gray-100 pb-6 mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-4">
              <span className="text-3xl font-bold">✓</span>
            </div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-2">
              Order Placed, Thank You!
            </h2>
            <p className="text-gray-500 font-medium">
              We've received your order. You can track its status in your order history.
            </p>
            {createdOrderNumber && (
              <div className="mt-4 inline-block bg-blue-50 text-blue-700 font-bold px-4 py-2 rounded-full text-sm">
                Order Number: {createdOrderNumber}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-gray-100 pb-6">
            {/* Delivery Details */}
            <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
                Delivery Address
              </h3>
              <div className="text-gray-800 space-y-1">
                <p className="font-bold text-gray-900 text-base">{shippingInfo.fullName}</p>
                <p>{shippingInfo.addressLine1}</p>
                {shippingInfo.addressLine2 && <p>{shippingInfo.addressLine2}</p>}
                <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.postalCode}</p>
                <p>{shippingInfo.country}</p>
                <p className="text-sm text-gray-500 mt-2 font-medium">Phone: {shippingInfo.phone}</p>
              </div>
            </div>

            {/* Payment Details */}
            <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
                Payment Info
              </h3>
              <div className="text-gray-800 space-y-1 text-left">
                <p className="font-semibold capitalize">
                  Method: {placedOrder?.paymentInfo?.method === "cod" ? "Pay on Delivery (COD)" : "Online Payment"}
                </p>
                <p className="text-sm text-gray-500">Status: <span className="font-bold text-amber-600 capitalize">{placedOrder?.status?.replace("_", " ")}</span></p>
                
                {/* Total Charges Summary */}
                <div className="mt-4 pt-3 border-t border-gray-105 space-y-1.5">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Items Subtotal:</span>
                    <span>₹{orderedSubtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Shipping Fee:</span>
                    <span>{orderedShipping > 0 ? `₹${orderedShipping}` : "FREE"}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Estimated Tax (GST):</span>
                    <span>₹{orderedGst}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-gray-900 pt-1.5 border-t border-gray-100">
                    <span>Order Total:</span>
                    <span>₹{orderedGrandTotal}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Items Section */}
          <div className="mt-6 text-left">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
              Ordered Items
            </h3>
            <div className="space-y-4">
              {displayItems.map((item, index) => {
                const img = getItemImage(item);
                return (
                  <div key={index} className="flex gap-4 items-center bg-gray-50 p-3 rounded-2xl border border-gray-100">
                    <div className="w-16 h-16 bg-white border border-gray-200 rounded-xl overflow-hidden flex-shrink-0 p-1 flex items-center justify-center">
                      {img ? (
                        <img
                          src={img}
                          alt={item.nameAtPurchase}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="text-gray-300 text-xl font-bold">#</div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-900 truncate text-base">{item.nameAtPurchase}</h4>
                      <p className="text-sm text-gray-500 m-0">Qty: {item.quantity} × ₹{item.offerPriceAtPurchase || item.originalPriceAtPurchase}</p>
                    </div>
                    <div className="text-right font-bold text-gray-900">
                      ₹{item.quantity * (item.offerPriceAtPurchase || item.originalPriceAtPurchase)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => {
                navigate(`/orders/${placedOrder?.id || placedOrder?._id}`);
                setShowOrderSuccess(false);
              }}
              className="flex-1 bg-black text-white py-3.5 px-6 rounded-full font-bold text-center hover:bg-gray-900 transition cursor-pointer border-none shadow-sm"
            >
              View Order Details
            </button>
            <button
              onClick={() => {
                navigate("/products");
                setShowOrderSuccess(false);
              }}
              className="flex-1 bg-gray-100 text-gray-800 py-3.5 px-6 rounded-full font-bold text-center hover:bg-gray-200 transition cursor-pointer border-none"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ========================= PLACE ORDER PAGE ========================== */

  if (showPlaceOrder) {
    return (
      <div className="min-h-screen bg-[#f3f3f3] pt-24 px-2 sm:px-4 pb-10">
        <div className="max-w-[1400px] mx-auto flex flex-col xl:flex-row gap-4">
          <div className="flex-1 flex flex-col gap-4">
            <button
              onClick={() => setShowPlaceOrder(false)}
              className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-black transition w-fit cursor-pointer"
            >
              ← Back to Payment
            </button>

            <div className="bg-[#f8f8f8] border border-gray-300 rounded-2xl p-5">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold mb-3">
                    Delivering to {addressForm.fullName}
                  </h2>
                  <p className="text-lg text-gray-700">
                    {addressForm.addressLine1}
                    {addressForm.addressLine2 ? `, ${addressForm.addressLine2}` : ""}
                    , {addressForm.city}, {addressForm.state} {addressForm.postalCode}, {addressForm.country}
                  </p>
                  <button className="mt-3 text-[#4b3bbd] font-medium">
                    Add Delivery Instructions
                  </button>
                </div>
                <button onClick={() => setShowPlaceOrder(false)} className="text-[#4b3bbd] font-medium">Change</button>
              </div>
            </div>

            <div className="bg-[#f8f8f8] border border-gray-300 rounded-2xl p-5 flex justify-between items-center">
              <h2 className="text-2xl font-bold">
                {paymentMethod === "cod" ? "Pay on Delivery (Cash/UPI)" : `Online Payment (${paymentMethod.toUpperCase()})`}
              </h2>
              <button
                onClick={() => setShowPlaceOrder(false)}
                className="text-[#4b3bbd] font-medium"
              >
                Change
              </button>
            </div>

            {cartItems.map((item, index) => (
              <div
                key={index}
                className="bg-[#f8f8f8] border border-gray-300 rounded-2xl p-5"
              >
                <h2 className="text-2xl font-bold mb-5">Arriving by {getFormattedDate(5)}</h2>
                <div className="flex flex-col sm:flex-row gap-5">
                  <div className="w-[160px] h-[160px] bg-gray-300 rounded-2xl overflow-hidden flex-shrink-0">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-contain"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
                    <div className="flex items-center gap-1 mb-3">
                      <span className="text-yellow-400">★★★★☆</span>
                      <span className="text-sm text-blue-600 underline">
                        4 (128 Reviews)
                      </span>
                    </div>
                    <div className="space-y-1 text-base">
                      <p>
                        <span className="font-bold">Size:</span> 19MM
                      </p>
                      <p>
                        <span className="font-bold">Length:</span> 20ft
                      </p>
                      <p>
                        <span className="font-bold">Code:</span>{" "}
                        {item.code || "CF001"}
                      </p>
                      <p>
                        <span className="font-bold">Colour:</span> Green
                      </p>
                      <p>
                        <span className="font-bold">Material:</span> PVC
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full xl:w-[340px] bg-[#f8f8f8] border border-gray-300 rounded-2xl p-5 h-fit">
            <h2 className="text-2xl font-bold text-center mb-6">
              Order Summary
            </h2>
            <div className="space-y-4 text-lg">
              <div className="flex justify-between">
                <span className="font-semibold">Total:</span>
                <span>₹{subtotal.toLocaleString("en-IN")}.00</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Shipping:</span>
                <span>₹{shipping.toLocaleString("en-IN")}.00</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">GST:</span>
                <span>₹{gst.toLocaleString("en-IN")}.00</span>
              </div>
            </div>
            
            {appliedCoupon && (
              <div className="flex justify-between text-emerald-600 font-semibold mb-2">
                <span>Discount ({appliedCoupon.code}):</span>
                <span>-₹{appliedCoupon.discountAmount.toLocaleString("en-IN")}.00</span>
              </div>
            )}

            <div className="mb-6 border-t border-gray-200 pt-5 mt-4">
              <p className="text-sm font-semibold mb-2">Have a coupon code?</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter code"
                  disabled={!!appliedCoupon}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-red-500 outline-none uppercase disabled:bg-gray-100 disabled:text-gray-500"
                />
                {appliedCoupon ? (
                  <button
                    onClick={handleRemoveCoupon}
                    className="bg-red-50 text-red-600 border border-red-200 px-4 py-2 rounded text-sm font-semibold hover:bg-red-100 transition"
                  >
                    Remove
                  </button>
                ) : (
                  <button
                    onClick={handleApplyCoupon}
                    className="bg-black text-white px-4 py-2 rounded text-sm font-semibold hover:bg-gray-800 transition"
                  >
                    Apply
                  </button>
                )}
              </div>
              {couponError && <p className="text-red-500 text-xs mt-1.5">{couponError}</p>}
            </div>

            <div className="border-t border-gray-300 pt-4 flex justify-between font-bold text-2xl">
              <span>Order Total:</span>
              <span>₹{grandTotal.toLocaleString("en-IN")}.00</span>
            </div>
            {checkoutError && (
              <div className="bg-red-100 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-center font-medium text-sm mt-4">
                {checkoutError}
              </div>
            )}
            <button
              onClick={handlePlaceOrder}
              disabled={isCheckingOut}
              className="mt-5 w-full bg-red-500 text-white py-3 rounded-full text-base font-bold hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCheckingOut ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ========================= CHECKOUT PAGE ========================== */

  if (showCheckout) {
    if (cartItems.length === 0) {
      setShowCheckout(false);
      return null;
    }
    return (
      <div className="min-h-screen bg-[#f7f7f7] pt-24 px-3 sm:px-4 md:px-6 pb-10">
        <div className="max-w-[1300px] mx-auto flex flex-col lg:flex-row gap-4">
          <div className="flex-1 flex flex-col gap-4">
            <button
              onClick={() => setShowCheckout(false)}
              className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-black transition w-fit cursor-pointer"
            >
              ← Back to Cart
            </button>

            {checkoutError && (
              <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-center font-medium">
                {checkoutError}
              </div>
            )}

            <div className="bg-white border border-gray-300 rounded-xl p-4 sm:p-5">
              <div className="flex justify-between items-center border-b border-gray-100 pb-3 mb-4">
                <h2 className="text-xl font-bold m-0">Delivery Address</h2>
                {(addressForm.fullName || addressForm.addressLine1 || addressForm.phone) && (
                  <button
                    type="button"
                    onClick={handleClearForm}
                    className="text-sm font-bold text-red-600 hover:text-red-700 transition border-none bg-transparent cursor-pointer"
                  >
                    Clear Form
                  </button>
                )}
              </div>

              {/* Saved Address Card */}
              {user && user.shippingAddress && user.shippingAddress.fullName && (
                <div className="mb-6 bg-gray-50 border border-gray-200 rounded-2xl p-4 transition-all duration-300 relative text-left">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5 m-0">
                    Saved Shipping Address
                  </h3>
                  <div
                    className={`
                      border rounded-xl p-4 transition-all duration-300 relative
                      ${isSelectedSavedAddress
                        ? "border-green-500 bg-green-50/10 shadow-sm"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                      }
                    `}
                  >
                    {isSelectedSavedAddress && (
                      <span className="absolute right-4 top-4 bg-green-100 text-green-700 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                        ✓ Selected
                      </span>
                    )}
                    <div className="text-gray-800 space-y-1 text-sm">
                      <p className="font-bold text-gray-900 text-base m-0">{user.shippingAddress.fullName}</p>
                      <p className="m-0">{user.shippingAddress.addressLine1}</p>
                      {user.shippingAddress.addressLine2 && <p className="m-0">{user.shippingAddress.addressLine2}</p>}
                      <p className="m-0">{user.shippingAddress.city}, {user.shippingAddress.state} {user.shippingAddress.postalCode}</p>
                      <p className="m-0">{user.shippingAddress.country}</p>
                      <p className="text-gray-500 mt-2 font-medium m-0">Phone: {user.shippingAddress.phone}</p>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={handleUseSavedAddress}
                        className={`
                          px-4 py-2 rounded-full text-xs font-bold border transition cursor-pointer
                          ${isSelectedSavedAddress
                            ? "bg-green-600 text-white border-green-600 cursor-default"
                            : "bg-black text-white border-black hover:bg-gray-900"
                          }
                        `}
                      >
                        {isSelectedSavedAddress ? "Using This Address" : "Use This Address"}
                      </button>

                      <button
                        type="button"
                        onClick={handleAddNewAddress}
                        className="px-4 py-2 rounded-full text-xs font-bold bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 transition cursor-pointer"
                      >
                        + Add New Address
                      </button>

                      {(addressForm.fullName || addressForm.addressLine1 || addressForm.phone) && (
                        <button
                          type="button"
                          onClick={handleClearForm}
                          className="px-4 py-2 rounded-full text-xs font-bold bg-white text-rose-600 border border-rose-200 hover:bg-rose-50 transition cursor-pointer"
                        >
                          Clear Form
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Input Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">Full Name</label>
                  <input
                    ref={nameInputRef}
                    type="text"
                    value={addressForm.fullName}
                    onChange={(e) => updateAddressField("fullName", e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-red-500 outline-none"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={addressForm.phone}
                    onChange={(e) => updateAddressField("phone", e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-red-500 outline-none"
                    placeholder="9876543210"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold mb-1">Address Line 1</label>
                  <input
                    type="text"
                    value={addressForm.addressLine1}
                    onChange={(e) => updateAddressField("addressLine1", e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-red-500 outline-none"
                    placeholder="Flat, House no., Building, Company, Apartment"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold mb-1">Address Line 2 (Optional)</label>
                  <input
                    type="text"
                    value={addressForm.addressLine2}
                    onChange={(e) => updateAddressField("addressLine2", e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-red-500 outline-none"
                    placeholder="Area, Street, Sector, Village"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Town/City</label>
                  <input
                    type="text"
                    value={addressForm.city}
                    onChange={(e) => updateAddressField("city", e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-red-500 outline-none"
                    placeholder="Mumbai"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">State</label>
                  <input
                    type="text"
                    value={addressForm.state}
                    onChange={(e) => updateAddressField("state", e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-red-500 outline-none"
                    placeholder="Maharashtra"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Postal Code (PIN)</label>
                  <input
                    type="text"
                    value={addressForm.postalCode}
                    onChange={(e) => updateAddressField("postalCode", e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-red-500 outline-none"
                    placeholder="400001"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Country</label>
                  <input
                    type="text"
                    value={addressForm.country}
                    onChange={(e) => updateAddressField("country", e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-red-500 outline-none"
                    placeholder="India"
                  />
                </div>
              </div>
              {user && (
                <div className="mt-4 pt-4 border-t border-gray-200 text-left">
                  <label className="flex items-center gap-2.5 text-sm text-gray-700 cursor-pointer select-none font-medium">
                    <input
                      type="checkbox"
                      checked={saveToProfile}
                      onChange={(e) => setSaveToProfile(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500 cursor-pointer"
                    />
                    <span>Save as default shipping & billing address in my profile</span>
                  </label>
                </div>
              )}

              <div className="bg-white border border-gray-300 rounded-xl p-4 mt-6">
                <h2 className="text-2xl font-bold mb-6">Payment Method</h2>
              
              {loadingGateways ? (
                <div className="flex flex-col items-center py-6 gap-2">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-red-500 border-t-transparent" />
                  <p className="text-xs text-gray-500 font-medium">Loading payment gateways...</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Dynamic Gateways */}
                  {isRazorpayActive && (
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="payment"
                        className="mt-1"
                        checked={paymentMethod === "razorpay"}
                        onChange={() => setPaymentMethod("razorpay")}
                      />
                      <div>
                        <p className="font-semibold text-base">
                          Online Payment (Razorpay)
                        </p>
                        <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                          Pay securely using Cards, UPI, Net Banking, or Wallets via Razorpay.
                        </p>
                      </div>
                    </label>
                  )}

                  {isStripeActive && (
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="payment"
                        className="mt-1"
                        checked={paymentMethod === "stripe"}
                        onChange={() => setPaymentMethod("stripe")}
                      />
                      <div>
                        <p className="font-semibold text-base">
                          Online Payment (Stripe)
                        </p>
                        <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                          Pay securely using Credit/Debit cards via Stripe.
                        </p>
                      </div>
                    </label>
                  )}

                  {isCashfreeActive && (
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="payment"
                        className="mt-1"
                        checked={paymentMethod === "cashfree"}
                        onChange={() => setPaymentMethod("cashfree")}
                      />
                      <div>
                        <p className="font-semibold text-base">
                          Online Payment (Cashfree)
                        </p>
                        <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                          Pay using Cashfree secure checkout gateway.
                        </p>
                      </div>
                    </label>
                  )}

                  {/* Cash on Delivery / default option */}
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      className="mt-1"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                    />
                    <div>
                      <p className="font-semibold text-base">
                        Cash on Delivery/Pay on Delivery
                      </p>
                      <p className="text-xs text-gray-500 leading-relaxed mt-1">
                        Pay with Cash, UPI or Cards at the time of delivery.
                      </p>
                    </div>
                  </label>
                </div>
              )}
            </div>

              <div className="flex justify-center mt-8">
                <button
                  onClick={handleGoToPlaceOrder}
                  disabled={isCartUpdating}
                  className="bg-red-500 text-white px-10 sm:px-14 py-2.5 rounded-full text-lg font-bold hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[340px] bg-white border border-gray-300 rounded-xl p-5 h-fit">
            <h2 className="text-2xl font-bold text-center mb-6">
              Order Summary
            </h2>
            <div className="space-y-4 text-lg">
              <div className="flex justify-between">
                <span className="font-semibold">Total:</span>
                <span>₹{subtotal.toLocaleString("en-IN")}.00</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Shipping:</span>
                <span>₹{shipping.toLocaleString("en-IN")}.00</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">GST:</span>
                <span>₹{gst.toLocaleString("en-IN")}.00</span>
              </div>
              <div className="border-t border-gray-300 pt-4 flex justify-between font-bold text-2xl">
                <span>Order Total:</span>
                <span>₹{grandTotal.toLocaleString("en-IN")}.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ========================= CART PAGE ========================== */

  return (
    <div className="min-h-screen bg-[#f3f3f3] pt-24 px-2 sm:px-4 pb-10">
      <h1 className="text-2xl font-bold text-red-500 mb-6 px-4 sm:px-6 py-3 bg-[#ffe9e9]">
        Shopping Cart
      </h1>

      {cartError && (
        <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-center font-medium max-w-[1400px] mx-auto relative">
          <span>{cartError}</span>
          <button
            onClick={() => setCartError(null)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-red-700 hover:text-red-900 font-bold"
          >
            ×
          </button>
        </div>
      )}

      <div className="flex flex-col xl:flex-row gap-4 max-w-[1400px] mx-auto">
        <div className="flex-1 overflow-x-auto">
          <div className="hidden md:grid grid-cols-4 text-center font-bold text-lg text-black mb-4 px-8 min-w-[800px]">
            <span className="text-left">Products</span>
            <span>Quantity</span>
            <span>Unit Price</span>
            <span>Total</span>
          </div>

          {cartItems.length === 0 ? (
            <div className="text-center text-gray-400 py-20 text-base">
              Your cart is empty.
            </div>
          ) : (
            <div className="flex flex-col gap-4 min-w-[800px] xl:min-w-0">
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className="bg-[#f8f8f8] rounded-2xl border border-gray-300 p-4 sm:p-5 grid grid-cols-4 items-center text-center min-h-[85px]"
                >
                  <div className="flex items-center gap-4 text-left">
                    <div className="w-14 h-14 bg-gray-300 rounded-xl flex-shrink-0 overflow-hidden">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-contain"
                        />
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-sm leading-tight">
                        {item.title}
                      </p>
                      <p className="text-xs text-black">
                        Code: {item.code || "CF001"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => updateQty(item.variantId, -1)}
                      disabled={isCartUpdating}
                      className="w-8 h-8 border border-gray-400 bg-[#d9d9d9] rounded flex items-center justify-center text-base hover:bg-gray-300 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      −
                    </button>
                    <span className="w-8 text-center font-bold text-sm">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => updateQty(item.variantId, 1)}
                      disabled={isCartUpdating}
                      className="w-8 h-8 border border-gray-400 bg-[#d9d9d9] rounded flex items-center justify-center text-base hover:bg-gray-300 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      +
                    </button>
                  </div>

                  <span className="font-bold text-lg">₹{item.price}.00</span>
                  <div className="font-bold text-lg flex items-center justify-center gap-4">
                    <span>₹{(item.price * item.qty).toLocaleString("en-IN")}.00</span>
                    <button
                      type="button"
                      onClick={() => setConfirmDeleteId(item.variantId)}
                      disabled={isCartUpdating}
                      className="text-gray-400 hover:text-red-650 transition cursor-pointer p-1.5 rounded-full hover:bg-red-50 flex items-center justify-center disabled:opacity-50 border-none bg-transparent"
                      title="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
              
              {cartItems.length > 0 && (
                <div className="flex justify-end mt-4 px-2">
                  <button
                    type="button"
                    onClick={() => setShowConfirmClear(true)}
                    disabled={isCartUpdating}
                    className="text-xs font-bold text-red-600 hover:text-red-750 transition cursor-pointer flex items-center gap-1.5 border border-red-200 hover:border-red-300 rounded-full px-4 py-2 bg-white disabled:opacity-50 shadow-sm"
                  >
                    <Trash2 size={13} />
                    Clear Cart
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="w-full xl:w-[260px] flex flex-col gap-4">
          <div className="bg-[#f8f8f8] rounded-2xl border border-gray-300 p-4">
            <h2 className="text-xl font-bold mb-4 text-center">
              Order Summary
            </h2>
            <div className="space-y-4 text-base">
              <div className="flex justify-between">
                <span className="text-gray-700">Total:</span>
                <span className="font-medium">
                  ₹{subtotal.toLocaleString("en-IN")}.00
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Shipping:</span>
                <span className="font-medium">
                  ₹{shipping.toLocaleString("en-IN")}.00
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">GST:</span>
                <span className="font-medium">
                  ₹{gst.toLocaleString("en-IN")}.00
                </span>
              </div>
            </div>
            
            {appliedCoupon && (
              <div className="flex justify-between text-emerald-600 text-sm font-semibold mb-2 mt-4">
                <span>Discount ({appliedCoupon.code}):</span>
                <span>-₹{appliedCoupon.discountAmount.toLocaleString("en-IN")}.00</span>
              </div>
            )}

            <div className="mb-4 mt-4 border-t border-gray-200 pt-4">
              <p className="text-xs font-semibold mb-2 text-gray-700">Have a coupon code?</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter code"
                  disabled={!!appliedCoupon}
                  className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-xs focus:border-red-500 outline-none uppercase disabled:bg-gray-100 disabled:text-gray-500"
                />
                {appliedCoupon ? (
                  <button
                    onClick={handleRemoveCoupon}
                    className="bg-red-50 text-red-600 border border-red-200 px-3 py-1.5 rounded text-xs font-semibold hover:bg-red-100 transition"
                  >
                    Remove
                  </button>
                ) : (
                  <button
                    onClick={handleApplyCoupon}
                    className="bg-black text-white px-3 py-1.5 rounded text-xs font-semibold hover:bg-gray-800 transition"
                  >
                    Apply
                  </button>
                )}
              </div>
              {couponError && <p className="text-red-500 text-[10px] mt-1">{couponError}</p>}
            </div>

            <div className="flex justify-between font-bold text-xl pt-4 border-t border-gray-300">
              <span>Grand Total:</span>
              <span>₹{grandTotal.toLocaleString("en-IN")}.00</span>
            </div>
            <button
              onClick={() => setShowCheckout(true)}
              disabled={cartItems.length === 0 || isCartUpdating}
              className="mt-5 w-full bg-red-500 text-white py-3 rounded-full text-base font-bold hover:bg-red-600 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Checkout
            </button>
          </div>

          <div className="bg-[#f8f8f8] rounded-2xl border border-gray-300 p-4">
            <h2 className="text-xl font-bold mb-4 text-center">Related</h2>
            <div className="flex flex-col gap-4">
              {(related.length > 0 ? related : Array(4).fill(null)).map(
                (item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <div className="w-12 h-12 bg-gray-300 rounded-xl flex-shrink-0 overflow-hidden">
                      {item?.image && (
                        <img
                          src={item.image}
                          alt={item?.title}
                          className="w-full h-full object-contain"
                        />
                      )}
                    </div>
                    <div>
                      <p className="text-xs font-bold leading-tight">
                        {item?.title || "n-inch PVC Pipe-length"}
                      </p>
                      <p className="text-[11px] text-gray-600">
                        Code: {item?.code || "CF001"}
                      </p>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Delete Item Confirmation Modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full mx-4 shadow-2xl border border-gray-100 text-center">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Remove Item?</h3>
            <p className="text-sm text-gray-500 font-medium mb-6">Remove this item from your shopping cart?</p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded-full text-sm font-bold transition cursor-pointer border-none"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  const id = confirmDeleteId;
                  setConfirmDeleteId(null);
                  await removeCartItem(id);
                }}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-full text-sm font-bold transition cursor-pointer border-none"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Clear Cart Confirmation Modal */}
      {showConfirmClear && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full mx-4 shadow-2xl border border-gray-100 text-center">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Clear Cart?</h3>
            <p className="text-sm text-gray-500 font-medium mb-6">Are you sure you want to clear your entire cart?</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmClear(false)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded-full text-sm font-bold transition cursor-pointer border-none"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  setShowConfirmClear(false);
                  await clearCart();
                }}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-full text-sm font-bold transition cursor-pointer border-none"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}