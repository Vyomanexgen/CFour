import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "https://ecommerce-backend-iota-six.vercel.app";
const ORG_ID = import.meta.env.VITE_ORGANIZATION_ID || "default-org";

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
    // "x-organization-id": ORG_ID,
  },
});

let isRefreshing = false;
let refreshQueue = [];

const processQueue = (error, token = null) => {
  refreshQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });
  refreshQueue = [];
};

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    const isTargetEndpoint = config.url && (
      config.url.includes("/api/v1/cart") ||
      config.url.includes("/api/v1/orders") ||
      config.url.includes("/api/v1/users") ||
      config.url.includes("/api/v1/config") ||
      config.url.includes("/api/v1/payments")
    );
    if (isTargetEndpoint) {
      config.headers["x-organization-id"] = ORG_ID;
    }
    if (import.meta.env.DEV) {
      console.log(`[API Request] ${config.method.toUpperCase()} ${config.url}`, config.data || "");
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => {
    if (import.meta.env.DEV) {
      console.log(`[API Response] ${response.status} ${response.config.url}`, response.data);
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Global API Error Event Dispatch (except for initial retryable 401s and expected 404s)
    const isRetryable401 = error.response?.status === 401 && !originalRequest?._retry;
    const isExpected404 = error.response?.status === 404 && (
      originalRequest?.url?.includes("/api/v1/users/me") ||
      originalRequest?.url?.includes("/api/v1/config") ||
      originalRequest?.url?.includes("/api/v1/payments/gateways") ||
      originalRequest?.url?.includes("/api/v1/content/public/pages")
    );

    if (import.meta.env.DEV && !isExpected404) {
      console.error(`[API Error] ${error.response?.status || "Network"} ${originalRequest?.url}`, error.response?.data || error.message);
    }

    if (!isRetryable401 && !isExpected404) {
      const errMsg = error.response?.data?.error || error.response?.data?.message || error.message;
      const errStatus = error.response?.status;
      window.dispatchEvent(new CustomEvent("api-error", {
        detail: { message: errMsg, status: errStatus }
      }));
    }

    if (error.response?.status === 401 && !originalRequest._retry) {

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          refreshQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return apiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        isRefreshing = false;
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(`${API_URL}/api/v1/auth/refresh`, {
          refreshToken,
        }
        // }, {
        //   headers: { "x-organization-id": ORG_ID }});
      );

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data.data || response.data;
        
        localStorage.setItem("accessToken", newAccessToken);
        if (newRefreshToken) {
          localStorage.setItem("refreshToken", newRefreshToken);
        }

        processQueue(null, newAccessToken);
        isRefreshing = false;

        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        isRefreshing = false;
        
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.dispatchEvent(new Event("auth-expired"));
        
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;