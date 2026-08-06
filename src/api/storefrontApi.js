import apiClient from "./apiClient";

const ORG_ID = import.meta.env.VITE_ORGANIZATION_ID || "default-org";

export const getStorefrontInit = async () => {
  const response = await apiClient.get("/api/v1/storefront/init", {
    params: { organizationId: ORG_ID },
  });
  return response.data;
};

export const getStorefrontProducts = async (params = {}) => {
  const response = await apiClient.get("/api/v1/storefront/products", {
    params: {
      organizationId: ORG_ID,
      ...params,
    },
  });
  return response.data;
};

export const searchStorefrontProducts = async (queryStr, params = {}) => {
  const response = await apiClient.get("/api/v1/storefront/products/search", {
    params: {
      organizationId: ORG_ID,
      q: queryStr,
      ...params,
    },
  });
  return response.data;
};

export const getProductDetails = async (id) => {
  const response = await apiClient.get(`/api/v1/storefront/products/${id}`, {
    params: { organizationId: ORG_ID },
  });
  return response.data;
};

export const submitContactUsForm = async (data) => {
  const response = await apiClient.post("/api/v1/storefront/contact-us", data, {
    params: { organizationId: ORG_ID },
  });
  return response.data;
};
