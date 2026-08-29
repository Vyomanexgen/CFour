import apiClient from "./apiClient";

const ORG_ID = import.meta.env.VITE_ORGANIZATION_ID || "default-org";

export const getCart = async () => {
  const response = await apiClient.get("/api/v1/cart", {
    params: { organizationId: ORG_ID }
  });
  return response.data;
};

export const addCartItem = async (productId, variantId, quantity = 1) => {
  const response = await apiClient.post("/api/v1/cart", {
    productId,
    variantId,
    quantity,
    organizationId: ORG_ID,
  });
  return response.data;
};

export const updateCartItemQty = async (variantId, quantity) => {
  const response = await apiClient.put(`/api/v1/cart/${variantId}`, {
    quantity,
    organizationId: ORG_ID,
  });
  return response.data;
};

export const removeCartItem = async (variantId) => {
  const response = await apiClient.delete(`/api/v1/cart/${variantId}`, {
    params: { organizationId: ORG_ID }
  });
  return response.data;
};

export const clearCart = async () => {
  const response = await apiClient.delete("/api/v1/cart", {
    params: { organizationId: ORG_ID }
  });
  return response.data;
};

export const applyCoupon = async (code) => {
  const response = await apiClient.post('/api/v1/cart/apply-coupon', { 
    couponCode: code,
    organizationId: ORG_ID
  });
  return response.data;
};

export const removeCoupon = async () => {
  const response = await apiClient.delete('/api/v1/cart/remove-coupon', {
    params: { organizationId: ORG_ID }
  });
  return response.data;
};
