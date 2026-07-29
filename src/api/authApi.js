import apiClient from "./apiClient";

const ORG_ID = import.meta.env.VITE_ORGANIZATION_ID || "default-org";

export const registerUser = async (email, password) => {
  const response = await apiClient.post("/api/v1/auth/register", {
    email,
    password,
    role: "member",
    organizationId: ORG_ID,
  });
  return response.data;
};

export const loginUser = async (email, password) => {
  const response = await apiClient.post("/api/v1/auth/login", {
    email,
    password,
  });
  return response.data;
};

export const getCurrentUserProfile = async () => {
  const response = await apiClient.get("/api/v1/users/me");
  return response.data;
};

export const createUserProfile = async (firstName, lastName) => {
  const response = await apiClient.post("/api/v1/users/profile", {
    firstName,
    lastName,
  });
  return response.data;
};

export const logoutUser = async () => {
  const response = await apiClient.post("/api/v1/auth/logout");
  return response.data;
};

export const updateCurrentUserProfile = async (profileData) => {
  const response = await apiClient.patch("/api/v1/users/me", profileData);
  return response.data;
};

