import { createContext, useContext, useState, useEffect } from "react";
import { getOrganizationConfig } from "../api/configApi";
import { useAuth } from "./AuthContext";

const ConfigContext = createContext(null);

export const ConfigProvider = ({ children }) => {
  const { user } = useAuth();
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchConfig = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getOrganizationConfig();
      const configData = res.data || res;
      console.log("[ConfigContext] Config loaded successfully from backend:", configData);
      setConfig(configData);
    } catch (err) {
      if (err.response?.status !== 404) {
        console.error("Failed to load organization configuration", err);
      }
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchConfig();
    } else {
      setConfig(null);
    }
  }, [user]);

  const calculateOrderCharges = (subtotal) => {
    if (!config) {
      // Fallback/Default charges if config is not loaded yet
      const fallbackTaxRate = 18;
      const fallbackShipping = subtotal >= 500 ? 0 : 50;
      const fallbackTax = Math.round(subtotal * (fallbackTaxRate / 100));
      return {
        shippingFee: fallbackShipping,
        taxAmount: fallbackTax,
        taxRate: fallbackTaxRate,
        platformFee: 0,
        handlingFee: 0,
        grandTotal: subtotal + fallbackShipping + fallbackTax,
      };
    }

    const {
      taxRate = 18,
      shippingFee = 50,
      freeShippingThreshold = 500,
      platformFee = 0,
      handlingFee = 0,
    } = config;

    const finalShipping = subtotal >= freeShippingThreshold ? 0 : shippingFee;
    const finalTax = Math.round(subtotal * (taxRate / 100));
    const grandTotal = subtotal + finalShipping + finalTax + platformFee + handlingFee;

    return {
      shippingFee: finalShipping,
      taxAmount: finalTax,
      taxRate,
      platformFee,
      handlingFee,
      grandTotal,
    };
  };

  return (
    <ConfigContext.Provider value={{ config, loading, error, calculateOrderCharges, refreshConfig: fetchConfig }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => useContext(ConfigContext);
