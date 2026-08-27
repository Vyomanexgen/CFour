import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUserProfile, createUserProfile, loginUser as loginApi, registerUser as registerApi, logoutUser as logoutApi } from "../api/authApi";
import { useToast } from "./ToastContext";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const fetchProfile = async (fallbackName = null) => {
    try {
      const data = await getCurrentUserProfile();
      setUser(data.data || data);
    } catch (err) {
      const status = err.response?.status;
      const isProfileNotFound = status === 404;

      if (isProfileNotFound) {
        try {
          let fName = "Member";
          let lName = "User";
          
          if (fallbackName) {
            const parts = fallbackName.trim().split(/\s+/);
            fName = parts[0] || "Member";
            lName = parts.slice(1).join(" ") || "User";
          } else {
            const token = localStorage.getItem("accessToken");
            if (token) {
              try {
                const payload = JSON.parse(atob(token.split(".")[1]));
                if (payload.email) {
                  const emailName = payload.email.split("@")[0];
                  fName = emailName || "Member";
                  lName = "User";
                }
              } catch (e) {
                console.error("Failed to decode token for name", e);
              }
            }
          }
          
          const createData = await createUserProfile(fName, lName);
          setUser(createData.data || createData);
          return;
        } catch (createErr) {
          console.error("Auto-creating profile failed", createErr);
        }
      }

      // Only logout on auth errors (401, 403) or if profile is missing and cannot be created (404)
      if (status === 401 || status === 403 || isProfileNotFound) {
        logoutLocal();
      } else {
        // For network/server errors, fallback to basic user info from token to avoid logging out
        const token = localStorage.getItem("accessToken");
        if (token) {
          try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            setUser({
              id: payload.userId || payload.id,
              email: payload.email,
              role: payload.role,
              organizationId: payload.organizationId,
              isTemporarySession: true
            });
          } catch (decodeErr) {
            logoutLocal();
          }
        } else {
          logoutLocal();
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSuccess = async (payload, fallbackName = null) => {
    localStorage.setItem("accessToken", payload.accessToken);
    if (payload.refreshToken) {
      localStorage.setItem("refreshToken", payload.refreshToken);
    }
    await fetchProfile(fallbackName);
    toast.success("Login successful. Welcome back!");
    return payload;
  };

  const login = async (email, password, fallbackName = null) => {
    const data = await loginApi(email, password);
    const payload = data.data || data;
    
    // Check if 2FA is required
    if (payload.requires2FA) {
      return payload; // Return so the UI can prompt for code
    }
    
    return await handleLoginSuccess(payload, fallbackName);
  };

  const loginWith2FA = async (tempToken, token, fallbackName = null) => {
    const { verify2FALogin } = await import("../api/authApi");
    const data = await verify2FALogin(tempToken, token);
    const payload = data.data || data;
    return await handleLoginSuccess(payload, fallbackName);
  };

  const loginWithGoogle = async (idToken, fallbackName = null) => {
    const { googleAuth } = await import("../api/authApi");
    const data = await googleAuth(idToken);
    const payload = data.data || data;
    return await handleLoginSuccess(payload, fallbackName);
  };

  const register = async (email, password, fullName = null) => {
    const data = await registerApi(email, password);
    toast.success("Account created successfully!");
    return data.data || data;
  };

  const logoutLocal = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
  };

  const logout = async () => {
    try {
      await logoutApi();
    } catch (err) {
      console.error("Server logout error", err);
    } finally {
      logoutLocal();
      toast.success("Logged out successfully.");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      fetchProfile();
    } else {
      setLoading(false);
    }

    const handleAuthExpired = () => {
      logoutLocal();
    };

    window.addEventListener("auth-expired", handleAuthExpired);
    return () => {
      window.removeEventListener("auth-expired", handleAuthExpired);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, loginWith2FA, loginWithGoogle, register, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
