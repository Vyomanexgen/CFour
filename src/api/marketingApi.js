import apiClient from "./apiClient";

const ORG_ID = import.meta.env.VITE_ORGANIZATION_ID || "default-org";

export const getPublicBanners = async () => {
  const response = await apiClient.get("/api/v1/marketing/public/banners", {
    headers: { "x-organization-id": ORG_ID },
  });
  return response.data?.data || response.data || [];
};

export const getPublicCampaigns = async () => {
  const response = await apiClient.get("/api/v1/marketing/public/campaigns", {
    headers: { "x-organization-id": ORG_ID },
  });
  return response.data?.data || response.data || [];
};
