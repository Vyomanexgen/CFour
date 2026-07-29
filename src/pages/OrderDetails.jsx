import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOrderDetails, verifyRazorpayPayment, getPaymentGateways } from "../api/orderApi";
import { ArrowLeft, Calendar, ShieldCheck, MapPin, CreditCard, ChevronRight, AlertTriangle } from "lucide-react";
import { useToast } from "../context/ToastContext";

export default function OrderDetails() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [retryError, setRetryError] = useState(null);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getOrderDetails(orderId);
      if (res.success && res.data) {
        setOrder(res.data);
      } else {
        throw new Error(res.message || "Failed to load order details.");
      }
    } catch (err) {
      console.error("Fetch order details failed:", err);
      setError(err.response?.data?.message || err.message || "Could not retrieve order details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

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

  const handleRetryPayment = async () => {
    setRetryError(null);
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      setRetryError("Failed to load Razorpay SDK. Please check your internet connection.");
      return;
    }

    const paymentSession = order.paymentSession || {};
    const keyId = paymentSession.keyId || order.paymentInfo?.keyId;
    const razorpayOrderId = paymentSession.razorpayOrderId || order.paymentInfo?.razorpayOrderId || order.paymentInfo?.gatewayOrderId;
    const amount = paymentSession.amount || (order.pricing?.totalAmount || order.totalAmount) * 100;
    const currency = paymentSession.currency || "INR";

    if (!razorpayOrderId) {
      setRetryError("Razorpay Order ID is missing. Cannot retry payment.");
      return;
    }

    let finalKeyId = keyId;
    if (!finalKeyId) {
      try {
        const res = await getPaymentGateways();
        const gatewayList = res.data || res || [];
        const rzpGateway = gatewayList.find(g => g.provider?.toLowerCase() === "razorpay");
        if (rzpGateway && rzpGateway.keyId) {
          finalKeyId = rzpGateway.keyId;
        }
      } catch (err) {
        console.error("Failed to fetch gateway keyId during retry:", err);
      }
    }

    if (!finalKeyId) {
      setRetryError("Payment gateway Key ID is missing. Cannot initialize payment.");
      return;
    }

    const options = {
      key: finalKeyId,
      amount: amount,
      currency: currency,
      name: "Vyomanexgen CFour",
      description: `Payment for Order ${order.orderNumber || orderId}`,
      order_id: razorpayOrderId,
      handler: async function (response) {
        setIsVerifying(true);
        try {
          const verifyPayload = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          };
          const verifyRes = await verifyRazorpayPayment(verifyPayload);
          if (verifyRes.success || verifyRes.data?.success) {
            toast.success("Payment verified successfully! Thank you for your order.");
            fetchOrder();
          } else {
            throw new Error(verifyRes.error || "Verification failed.");
          }
        } catch (verifyErr) {
          console.error("Signature verification failed during retry:", verifyErr);
          setRetryError(verifyErr.response?.data?.error || verifyErr.message || "Payment verification failed.");
        } finally {
          setIsVerifying(false);
        }
      },
      prefill: {
        name: order.shippingAddress?.fullName || "",
        contact: order.shippingAddress?.phone || "",
      },
      theme: {
        color: "#EF4444",
      },
      modal: {
        ondismiss: function () {
          console.log("Razorpay checkout closed by user during retry");
          setRetryError("Payment was cancelled or abandoned.");
        }
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // Visual Stepper configuration for standard progression
  const steps = [
    { label: "Ordered", status: "pending_payment" },
    { label: "Paid", status: "paid" },
    { label: "Processing", status: "processing" },
    { label: "Shipped", status: "shipped" },
    { label: "Delivered", status: "delivered" },
  ];

  const getStepProgressIndex = (status) => {
    // If status is out_for_delivery, count it as Shipped
    if (status === "out_for_delivery") return 3;
    
    const index = steps.findIndex(s => s.status === status);
    if (index !== -1) return index;
    
    // For non-progression/exception states, return -1
    return -1;
  };

  const currentStepIndex = order ? getStepProgressIndex(order.status) : -1;
  const isExceptionStatus = order && ["cancelled", "return_requested", "returned", "refunded"].includes(order.status);

  const getFormattedDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const getEstimatedDeliveryDate = (dateStr) => {
    const d = new Date(dateStr);
    d.setDate(d.getDate() + 5);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "shipped":
      case "out_for_delivery":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "processing":
      case "paid":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "pending_payment":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "cancelled":
      case "refunded":
      case "returned":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] pt-28 px-4 pb-16">
      <div className="max-w-[900px] mx-auto text-left">
        {/* Back Button */}
        <button
          onClick={() => navigate("/orders")}
          className="mb-6 flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-black transition border-none bg-transparent cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Back to My Orders</span>
        </button>

        {loading ? (
          /* Skeleton Loader */
          <div className="space-y-6 animate-pulse">
            {/* Top Banner Skeleton */}
            <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm flex justify-between items-center">
              <div className="space-y-2">
                <div className="h-2 bg-gray-200 rounded w-16" />
                <div className="h-6 bg-gray-200 rounded w-48" />
                <div className="h-3 bg-gray-200 rounded w-32" />
              </div>
              <div className="h-8 bg-gray-200 rounded-full w-24" />
            </div>

            {/* Stepper Progress Skeleton */}
            <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
              <div className="h-3 bg-gray-200 rounded w-32 mb-6" />
              <div className="flex justify-between items-center px-4">
                {[1, 2, 3, 4, 5].map((idx) => (
                  <div key={idx} className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-gray-200" />
                    <div className="h-3 bg-gray-200 rounded w-16" />
                  </div>
                ))}
              </div>
            </div>

            {/* Info Cards Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-3">
                <div className="h-4 bg-gray-200 rounded w-28 border-b pb-2" />
                <div className="h-4 bg-gray-200 rounded w-40" />
                <div className="h-3 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
              </div>
              <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-3">
                <div className="h-4 bg-gray-200 rounded w-28 border-b pb-2" />
                <div className="h-4 bg-gray-200 rounded w-32" />
                <div className="h-3 bg-gray-200 rounded w-24" />
              </div>
            </div>

            {/* Items Card Skeleton */}
            <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
              <div className="h-4 bg-gray-200 rounded w-36 border-b pb-2 mb-6" />
              {[1, 2].map((i) => (
                <div key={i} className="flex gap-4 items-center py-2">
                  <div className="w-14 h-14 bg-gray-200 rounded-xl" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-48" />
                    <div className="h-3 bg-gray-200 rounded w-24" />
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-16" />
                </div>
              ))}
            </div>
          </div>
        ) : error ? (
          /* Error State */
          <div className="text-center py-16 px-6 bg-red-50 border border-red-150 rounded-3xl shadow-sm">
            <p className="text-red-700 font-bold text-lg mb-4">{error}</p>
            <button
              onClick={fetchOrder}
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2.5 rounded-full border-none cursor-pointer transition shadow-sm"
            >
              Try Again
            </button>
          </div>
        ) : !order ? (
          /* Not Found State */
          <div className="text-center py-16 px-6 bg-white border border-gray-200 rounded-3xl shadow-sm">
            <p className="text-gray-600 font-bold text-lg mb-4">Order not found.</p>
            <button
              onClick={() => navigate("/orders")}
              className="bg-black text-white font-bold px-6 py-2.5 rounded-full border-none cursor-pointer transition shadow-sm"
            >
              Go to Orders
            </button>
          </div>
        ) : (
          /* Order Detail Page */
          <div className="space-y-6">
            {/* Top Stats Banner */}
            <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Order Info</span>
                <h1 className="text-xl sm:text-2xl font-black text-gray-900 m-0">
                  {order.orderNumber || `ORD-${(order.id || order._id).substring(0, 8).toUpperCase()}`}
                </h1>
                <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-1">
                  <Calendar size={14} />
                  <span>Placed on {getFormattedDate(order.createdAt)}</span>
                </div>
              </div>
              <div>
                <span className={`px-4 py-2 rounded-full text-sm font-bold border capitalize ${getStatusBadgeClass(order.status)}`}>
                  {order.status?.replace("_", " ")}
                </span>
              </div>
            </div>

            {/* Stepper Timeline or Exception Alert */}
            {isExceptionStatus ? (
              /* Exception Banner */
              <div className="bg-red-50 border border-red-200 rounded-3xl p-5 flex items-start gap-4">
                <div className="p-3 bg-red-100 text-red-600 rounded-2xl">
                  <AlertTriangle size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-red-800 m-0 capitalize">
                    Order Status Alert: {order.status?.replace("_", " ")}
                  </h3>
                  <p className="text-sm text-red-700 mt-1.5 font-medium m-0">
                    This order was flagged with status: <strong>{order.status?.replace("_", " ").toUpperCase()}</strong> on {getFormattedDate(order.updatedAt)}. Please contact support if you believe this was an error.
                  </p>
                </div>
              </div>
            ) : (
              /* Standard Stepper */
              currentStepIndex !== -1 && (
                <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-6 m-0">
                    Delivery Progress
                  </h3>
                  
                  {/* Stepper Bar */}
                  <div className="relative flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-0 mt-4 px-2">
                    {/* Stepper Line */}
                    <div className="hidden sm:block absolute left-10 right-10 top-5 h-[3px] bg-gray-100 z-0">
                      <div
                        className="h-full bg-black transition-all duration-500"
                        style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
                      />
                    </div>
                    
                    {/* Step Nodes */}
                    {steps.map((step, idx) => {
                      const isCompleted = idx <= currentStepIndex;
                      const isActive = idx === currentStepIndex;
                      return (
                        <div key={idx} className="flex sm:flex-col items-center gap-3 sm:gap-2 z-10 w-full sm:w-auto">
                          {/* Circle indicator */}
                          <div
                            className={`
                              w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 border-2
                              ${isCompleted
                                ? "bg-black text-white border-black"
                                : "bg-white text-gray-400 border-gray-200"
                              }
                              ${isActive ? "ring-4 ring-black/10 scale-110" : ""}
                            `}
                          >
                            {isCompleted ? "✓" : idx + 1}
                          </div>
                          {/* Label */}
                          <div className="text-left sm:text-center">
                            <p className={`text-sm font-bold m-0 ${isCompleted ? "text-gray-900" : "text-gray-400"}`}>
                              {step.label}
                            </p>
                            {isActive && order.status !== "delivered" && (
                              <p className="text-[10px] text-amber-600 font-bold m-0 mt-0.5 uppercase tracking-wider">Active</p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {order.status !== "delivered" && (
                    <div className="mt-8 pt-4 border-t border-gray-100 text-center sm:text-left text-sm text-gray-500 font-medium">
                      Estimated Delivery: <strong className="text-gray-800">{getEstimatedDeliveryDate(order.createdAt)}</strong>
                    </div>
                  )}
                </div>
              )
            )}

            {/* Address & Payment Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Delivery Address Card */}
              <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-3">
                  <MapPin className="text-gray-400" size={18} />
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider m-0">
                    Shipping Address
                  </h3>
                </div>
                {order.shippingAddress ? (
                  <div className="text-gray-800 space-y-1.5">
                    <p className="font-bold text-gray-900 text-base">{order.shippingAddress.fullName}</p>
                    <p>{order.shippingAddress.addressLine1}</p>
                    {order.shippingAddress.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
                    <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}</p>
                    <p>{order.shippingAddress.country}</p>
                    <p className="text-xs text-gray-500 font-semibold mt-3">Phone: {order.shippingAddress.phone}</p>
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm">No shipping address recorded.</p>
                )}
              </div>

              {/* Payment details card */}
              <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-3">
                    <CreditCard className="text-gray-400" size={18} />
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider m-0">
                      Payment Details
                    </h3>
                  </div>
                  <div className="text-gray-800 space-y-1.5">
                    <p className="font-semibold">
                      Method: <span className="capitalize">{order.paymentInfo?.method === "cod" ? "Pay on Delivery (Cash/UPI)" : order.paymentInfo?.method || "Online"}</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Payment Status: <span className={`px-2 py-0.5 rounded text-xs font-bold ${order.status === "pending_payment" ? "bg-orange-100 text-orange-800" : "bg-green-100 text-green-805"}`}>{order.status === "pending_payment" ? "UNPAID" : "PAID"}</span>
                    </p>
                    {order.status === "pending_payment" && (
                      <div className="mt-4 space-y-2">
                        <button
                          onClick={handleRetryPayment}
                          disabled={isVerifying}
                          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-xl border-none cursor-pointer transition text-sm flex items-center justify-center gap-2"
                        >
                          {isVerifying ? (
                            <>
                              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              <span>Verifying...</span>
                            </>
                          ) : (
                            <span>Pay Now / Retry Payment</span>
                          )}
                        </button>
                        {retryError && (
                          <p className="text-xs text-red-600 font-semibold m-0 mt-1">{retryError}</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Secure checkout seal */}
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-3 mt-4 flex items-center gap-2.5">
                  <ShieldCheck className="text-green-600 flex-shrink-0" size={20} />
                  <span className="text-[11px] text-gray-500 font-medium leading-normal">
                    This transaction is encrypted and secured by Cfour verification system.
                  </span>
                </div>
              </div>
            </div>

            {/* Products & Pricing Card */}
            <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-6 pb-3 border-b border-gray-100 m-0">
                Items In Order
              </h3>
              
              <div className="space-y-4">
                {order.items?.map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-center py-2 border-b border-gray-50 last:border-none">
                    <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center font-bold text-gray-300 border border-gray-100 flex-shrink-0">
                      #
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-900 truncate text-base m-0">{item.nameAtPurchase}</h4>
                      <p className="text-xs text-gray-400 font-medium m-0 mt-0.5">SKU/Variant: {(item.variantId || "").substring(0, 8)}</p>
                      <p className="text-sm text-gray-500 m-0 mt-1">Qty: {item.quantity} × ₹{item.offerPriceAtPurchase || item.originalPriceAtPurchase}</p>
                    </div>
                    <div className="text-right font-bold text-gray-900">
                      ₹{item.quantity * (item.offerPriceAtPurchase || item.originalPriceAtPurchase)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals Summary Table */}
              <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                <div className="w-full sm:w-[320px] space-y-2.5 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-semibold text-gray-800">₹{order.pricing?.subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping Fee:</span>
                    <span className="font-semibold text-gray-850">
                      {order.pricing?.shippingFee > 0 ? `₹${order.pricing.shippingFee}` : "FREE"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (Estimated):</span>
                    <span className="font-semibold text-gray-800">₹{order.pricing?.tax}</span>
                  </div>
                  {order.pricing?.platformFee > 0 && (
                    <div className="flex justify-between">
                      <span>Platform Fee:</span>
                      <span className="font-semibold text-gray-800">₹{order.pricing?.platformFee}</span>
                    </div>
                  )}
                  {order.pricing?.handlingFee > 0 && (
                    <div className="flex justify-between">
                      <span>Handling Fee:</span>
                      <span className="font-semibold text-gray-800">₹{order.pricing?.handlingFee}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-bold text-gray-900 pt-3 border-t border-gray-100">
                    <span>Grand Total:</span>
                    <span>₹{order.pricing?.totalAmount || order.totalAmount}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
