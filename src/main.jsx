import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ToastProvider } from "./context/ToastContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ConfigProvider } from "./context/ConfigContext.jsx";
import { StoreProvider } from "./context/StoreContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";

import { GoogleOAuthProvider } from '@react-oauth/google';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <ToastProvider>
        <AuthProvider>
          <ConfigProvider>
            <StoreProvider>
              <CartProvider>
                <App />
              </CartProvider>
            </StoreProvider>
          </ConfigProvider>
        </AuthProvider>
      </ToastProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
);