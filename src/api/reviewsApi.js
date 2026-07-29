import apiClient from "./apiClient";

const ORG_ID = import.meta.env.VITE_ORGANIZATION_ID || "default-org";

export const getProductReviews = async (productId, params = {}) => {
  const response = await apiClient.get(`/api/v1/reviews/product/${productId}`, {
    params: {
      organizationId: ORG_ID,
      ...params
    }
  });
  return response.data?.data || response.data || { reviews: [], total: 0 };
};

export const submitReview = async (reviewData) => {
  const response = await apiClient.post("/api/v1/reviews", reviewData, {
    headers: { "x-organization-id": ORG_ID },
  });
  return response.data?.data || response.data;
};
