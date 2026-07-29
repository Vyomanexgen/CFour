import { createContext, useContext, useState, useEffect, useCallback } from "react";
import ToastContainer from "../components/ToastContainer";

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((message, type = "info") => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    
    // Auto-dismiss after 4 seconds
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  }, [removeToast]);

  const toast = {
    success: useCallback((msg) => addToast(msg, "success"), [addToast]),
    error: useCallback((msg) => addToast(msg, "error"), [addToast]),
    warning: useCallback((msg) => addToast(msg, "warning"), [addToast]),
    info: useCallback((msg) => addToast(msg, "info"), [addToast]),
  };

  // Listen to global API errors
  useEffect(() => {
    const handleApiError = (e) => {
      const { message, status } = e.detail || {};
      let toastMessage = message;

      if (status === 401) {
        toastMessage = "Session expired. Please log in again.";
      } else if (status === 403) {
        toastMessage = "Access denied. You do not have permission.";
      } else if (status === 404) {
        toastMessage = "Requested resource not found.";
      } else if (status === 500) {
        toastMessage = "Internal Server Error. Please try again later.";
      } else if (!status) {
        // Only trigger generic network error if it looks like a network failure (no status)
        toastMessage = message || "Network error. Please check your internet connection.";
      }

      toast.error(toastMessage);
    };

    window.addEventListener("api-error", handleApiError);
    return () => {
      window.removeEventListener("api-error", handleApiError);
    };
  }, [toast.error]);

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
