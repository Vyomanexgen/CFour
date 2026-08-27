import apiClient from "./apiClient";

const ORG_ID = import.meta.env.VITE_ORGANIZATION_ID || "default-org";

export const getOrganizationConfig = async () => {
  const response = await apiClient.get("/api/v1/storefront/init", {
    params: { organizationId: ORG_ID },
  });
  // Anna migrated the config into the storefront/init payload under `data.config`
  return response.data?.data?.config || response.data?.config || response.data;
};
