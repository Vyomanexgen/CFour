import apiClient from "./apiClient";

const ORG_ID = import.meta.env.VITE_ORGANIZATION_ID || "default-org";

export const getProductReviews = async (productId, params = {}) => {
  const response = await apiClient.get(`/api/v1/reviews/product/${productId}`, {
    params: {
      organizationId: ORG_ID,
      ...params
    }
  });
  const resData = response.data || {};
  let reviews = [];
  if (Array.isArray(resData.data)) {
    reviews = resData.data;
  } else if (Array.isArray(resData)) {
    reviews = resData;
  }
  const total = resData.total || reviews.length || 0;
  return { reviews, total };
};

export const submitReview = async (reviewData) => {
  const response = await apiClient.post("/api/v1/reviews", reviewData, {
    headers: { "x-organization-id": ORG_ID },
  });
  return response.data?.data || response.data;
};
