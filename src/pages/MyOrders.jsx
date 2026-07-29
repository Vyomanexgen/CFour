import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMyOrders } from "../api/orderApi";
import { ArrowRight, ShoppingBag, Calendar, CreditCard, ChevronLeft, ChevronRight } from "lucide-react";

export default function MyOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, totalPages: 1 });
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const tabs = [
    { id: "all", label: "All Orders", statusParam: null },
    { id: "pending", label: "Unpaid", statusParam: "pending_payment" },
    { id: "processing", label: "Processing", statusParam: "processing" },
    { id: "shipped", label: "Shipped", statusParam: "shipped" },
    { id: "delivered", label: "Delivered", statusParam: "delivered" },
    { id: "cancelled", label: "Cancelled", statusParam: "cancelled" },
  ];

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const tab = tabs.find(t => t.id === activeTab);
      const params = {
        page: currentPage,
        limit: 5, // smaller limit for easier pagination demonstration
      };
      if (tab && tab.statusParam) {
        params.status = tab.statusParam;
      }
      
      const res = await getMyOrders(params);
      
      if (res.success) {
        setOrders(res.orders || []);
        if (res.pagination) {
          setPagination(res.pagination);
        }
      } else {
        throw new Error(res.message || "Failed to fetch orders.");
      }
    } catch (err) {
      console.error("Fetch orders failed:", err);
      setError(err.response?.data?.message || err.message || "Something went wrong while fetching orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [currentPage, activeTab]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setCurrentPage(1);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-50 text-green-700 border-green-200";
      case "shipped":
      case "out_for_delivery":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "processing":
      case "paid":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "pending_payment":
        return "bg-orange-50 text-orange-700 border-orange-200";
      case "cancelled":
      case "refunded":
      case "returned":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getFormattedDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-[#fafafa] pt-28 px-4 pb-16">
      <div className="max-w-[1000px] mx-auto text-left">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-black text-white rounded-2xl">
            <ShoppingBag size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight m-0">My Orders</h1>
            <p className="text-gray-500 font-medium m-0 mt-1">Track and manage your recent purchases</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-hide border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`
                px-5 py-2.5 rounded-full text-sm font-bold border-none transition-all cursor-pointer whitespace-nowrap
                ${activeTab === tab.id
                  ? "bg-black text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        {loading ? (
          /* Skeleton Loader */
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-3xl p-5 sm:p-6 shadow-sm animate-pulse"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-gray-100">
                  <div className="space-y-2 w-32">
                    <div className="h-2 bg-gray-200 rounded w-16" />
                    <div className="h-4 bg-gray-200 rounded w-28" />
                  </div>
                  <div className="flex items-center gap-3 w-40 sm:justify-end">
                    <div className="h-3 bg-gray-200 rounded w-20" />
                    <div className="h-6 bg-gray-200 rounded-full w-20" />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pt-5">
                  <div className="flex-1 space-y-2 w-full">
                    <div className="h-2 bg-gray-200 rounded w-24 mb-3" />
                    <div className="h-3 bg-gray-200 rounded w-2/3" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                  </div>
                  <div className="flex items-center justify-between md:justify-end gap-8 w-full md:w-auto pt-4 md:pt-0">
                    <div className="space-y-2 w-20">
                      <div className="h-2 bg-gray-200 rounded w-16" />
                      <div className="h-5 bg-gray-200 rounded w-20" />
                    </div>
                    <div className="h-10 w-28 bg-gray-200 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          /* Error State */
          <div className="text-center py-16 px-6 bg-red-50 border border-red-150 rounded-3xl shadow-sm">
            <p className="text-red-700 font-bold text-lg mb-4">{error}</p>
            <button
              onClick={fetchOrders}
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2.5 rounded-full border-none cursor-pointer transition shadow-sm"
            >
              Try Again
            </button>
          </div>
        ) : orders.length === 0 ? (
          /* Empty State */
          <div className="text-center py-20 bg-white border border-gray-200 rounded-3xl shadow-sm px-6">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
              <ShoppingBag className="text-gray-300" size={36} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No orders found</h3>
            <p className="text-gray-500 font-medium max-w-sm mx-auto mb-6">
              Looks like you haven't placed any orders matching this category yet.
            </p>
            <button
              onClick={() => navigate("/products")}
              className="bg-black hover:bg-gray-900 text-white font-bold px-8 py-3 rounded-full border-none cursor-pointer transition shadow-sm"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          /* Orders List */
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id || order._id}
                className="bg-white border border-gray-200 rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-md transition duration-300"
              >
                {/* Order Meta Info */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-gray-100">
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">Order ID</span>
                    <span className="font-bold text-gray-800">{order.orderNumber || `ORD-${(order.id || order._id).substring(0, 8).toUpperCase()}`}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                      <Calendar size={14} />
                      <span className="font-medium">{getFormattedDate(order.createdAt)}</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border capitalize ${getStatusColor(order.status)}`}>
                      {order.status?.replace("_", " ")}
                    </span>
                  </div>
                </div>

                {/* Items & Total Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pt-5">
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">Items Purchased</span>
                    <div className="text-gray-700 space-y-1">
                      {order.items?.slice(0, 2).map((item, idx) => (
                        <p key={idx} className="font-semibold truncate text-sm">
                          • {item.nameAtPurchase} <span className="text-gray-400 font-medium">({item.quantity}x)</span>
                        </p>
                      ))}
                      {order.items?.length > 2 && (
                        <p className="text-xs text-blue-600 font-bold">+ {order.items.length - 2} more item(s)</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-8 w-full md:w-auto border-t md:border-none pt-4 md:pt-0">
                    <div className="text-left md:text-right space-y-1">
                      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">Total Amount</span>
                      <span className="text-xl font-black text-gray-900">₹{order.pricing?.totalAmount || order.totalAmount}</span>
                    </div>
                    <button
                      onClick={() => navigate(`/orders/${order.id || order._id}`)}
                      className="bg-black hover:bg-gray-900 text-white font-bold p-3 sm:px-6 sm:py-3 rounded-full flex items-center justify-center gap-2 border-none cursor-pointer transition shadow-sm"
                    >
                      <span className="hidden sm:inline">Order Details</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Pagination Controls */}
            {pagination.totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-8 pt-4">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  className="p-2.5 rounded-full bg-white border border-gray-200 text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 cursor-pointer shadow-sm"
                >
                  <ChevronLeft size={20} />
                </button>
                <span className="text-sm font-bold text-gray-600">
                  Page {currentPage} of {pagination.totalPages}
                </span>
                <button
                  disabled={currentPage === pagination.totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, pagination.totalPages))}
                  className="p-2.5 rounded-full bg-white border border-gray-200 text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 cursor-pointer shadow-sm"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
