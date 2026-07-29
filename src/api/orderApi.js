import apiClient from "./apiClient";

export const checkoutOrder = async (payload) => {
  const response = await apiClient.post("/api/v1/orders/checkout", payload);
  return response.data;
};

export const updateProfileAddresses = async (addresses) => {
  const response = await apiClient.put("/api/v1/users/profile/addresses", addresses);
  return response.data;
};

export const getMyOrders = async (params = {}) => {
  const response = await apiClient.get("/api/v1/orders/my-orders", {
    params,
  });
  return response.data;
};

export const getOrderDetails = async (orderId) => {
  const response = await apiClient.get(`/api/v1/orders/${orderId}`);
  return response.data;
};

export const getPaymentGateways = async () => {
  const response = await apiClient.get("/api/v1/payments/gateways");
  return response.data;
};

export const verifyRazorpayPayment = async (payload) => {
  const response = await apiClient.post("/api/v1/payments/verify/razorpay", payload);
  return response.data;
};

