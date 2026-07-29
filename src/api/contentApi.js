import apiClient from "./apiClient";

const ORG_ID = import.meta.env.VITE_ORGANIZATION_ID || "default-org";

export const getPublicPage = async (slug) => {
  const response = await apiClient.get(`/api/v1/content/public/pages/${slug}`, {
    headers: { "x-organization-id": ORG_ID },
  });
  return response.data?.data || response.data;
};

export const getPublicFaq = async () => {
  const response = await apiClient.get("/api/v1/content/public/faq", {
    headers: { "x-organization-id": ORG_ID },
  });
  return response.data?.data || response.data || [];
};

export const getPublicPolicies = async (slug) => {
  const response = await apiClient.get(`/api/v1/content/public/policies/${slug}`, {
    headers: { "x-organization-id": ORG_ID },
  });
  return response.data?.data || response.data;
};
