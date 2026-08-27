import apiClient from "./apiClient";

export const getCart = async () => {
  const response = await apiClient.get("/api/v1/cart");
  return response.data;
};

export const addCartItem = async (productId, variantId, quantity = 1) => {
  const response = await apiClient.post("/api/v1/cart", {
    productId,
    variantId,
    quantity,
  });
  return response.data;
};

export const updateCartItemQty = async (variantId, quantity) => {
  const response = await apiClient.put(`/api/v1/cart/${variantId}`, {
    quantity,
  });
  return response.data;
};

export const removeCartItem = async (variantId) => {
  const response = await apiClient.delete(`/api/v1/cart/${variantId}`);
  return response.data;
};

export const clearCart = async () => {
  const response = await apiClient.delete("/api/v1/cart");
  return response.data;
};

export const applyCoupon = async (code) => {
  const response = await apiClient.post('/api/v1/cart/apply-coupon', { code });
  return response.data;
};

export const removeCoupon = async () => {
  const response = await apiClient.delete('/api/v1/cart/remove-coupon');
  return response.data;
};
