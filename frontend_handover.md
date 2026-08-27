# Complete Frontend API Integration Guide

This document is a comprehensive guide to all the new features, endpoints, and logic changes recently implemented on the backend. Please review each section carefully as some features require specific UI flows (like 2FA and Google Auth).

---

## 1. Google Authentication

We have fully implemented Google Authentication for users to sign up and log in securely.

### **Endpoint:** `POST /api/v1/auth/google`
- **Description:** Takes a Google ID token (received from the Google Sign-In SDK on the frontend), verifies it securely, and either creates a new user or logs them into their existing account.
- **Headers Required:** None (Public route)
- **Request Body:**
  ```json
  {
    "idToken": "eyJhbGciOiJSUzI1NiIs..." // The token from Google's frontend SDK
  }
  ```
- **Response (Success - 200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "user": {
        "id": "cuid...",
        "email": "user@gmail.com",
        "firstName": "John",
        "lastName": "Doe",
        "role": "member"
      },
      "accessToken": "...",
      "refreshToken": "..."
    },
    "message": "Google login successful"
  }
  ```
- **Frontend Action:** Use the standard Google OAuth React packages (like `@react-oauth/google`) to prompt the user to sign in, grab the `credential` (which is the `idToken`), and pass it to this endpoint. Treat the response exactly like a standard email/password login.

---

## 2. 2-Step Verification (TOTP / Authenticator App)

We have implemented an industry-standard 2FA system. This uses Time-Based One-Time Passwords (TOTP), meaning the user scans a QR code using an app like Google Authenticator or Authy. **No SMS or email is required.**

### **A. Setting Up 2FA (Settings Page)**

**Step 1: Generate the Secret & QR Code**
- **Endpoint:** `POST /api/v1/auth/2fa/generate`
- **Headers:** `Authorization: Bearer <accessToken>`
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "secret": "JBSWY3DPEHPK3PXP", 
      "qrCodeUrl": "data:image/png;base64,iVBORw0K..." 
    }
  }
  ```
- **Frontend Action:** Display the `qrCodeUrl` as an `<img />` tag so the user can scan it with their phone.

**Step 2: Verify and Enable**
- **Endpoint:** `POST /api/v1/auth/2fa/verify-and-enable`
- **Headers:** `Authorization: Bearer <accessToken>`
- **Request Body:**
  ```json
  {
    "token": "123456" // The 6 digits they see on their app
  }
  ```
- **Frontend Action:** If this returns 200 OK, 2FA is officially enabled for this user.

**Step 3: Disabling 2FA**
- **Endpoint:** `POST /api/v1/auth/2fa/disable`
- **Headers:** `Authorization: Bearer <accessToken>`
- **Response:** 200 OK. Completely removes 2FA from the account.

---

### **B. The New Login Flow (CRITICAL)**

Because of 2FA, the standard login endpoint has changed its behavior. 

**Endpoint:** `POST /api/v1/auth/login`
If a user inputs their correct email and password, **but they have 2FA enabled**, the backend will **NOT** return the `accessToken`. Instead, it will return a temporary token:

- **Response (When 2FA is required):**
  ```json
  {
    "success": true,
    "data": {
      "requires2FA": true,
      "tempToken": "eyJhbGciOiJIUzI1NiIsInR..."
    },
    "message": "2-Step Verification required"
  }
  ```

**Frontend Action:**
1. Check if `data.requires2FA` is true.
2. If true, do **NOT** redirect to the dashboard. Hide the password field and show a new input asking for their 6-digit Authenticator code.
3. Send that 6-digit code alongside the `tempToken` to the final verification endpoint:

**Endpoint:** `POST /api/v1/auth/2fa/login-verify` (Public route)
- **Request Body:**
  ```json
  {
    "tempToken": "eyJhbGciOiJIUzI1NiIsInR...",
    "token": "123456" // From their app
  }
  ```
- **Response:** Returns the standard `user`, `accessToken`, and `refreshToken` payload. Log them in!

---

## 3. Admin Orders API Fixes & Additions

The Admin Action buttons (like Mark as Fulfilled, Refund, etc.) are now fully unblocked.

### **A. View Single Order Details (Added)**
- **Endpoint:** `GET /api/v1/orders/admin/:id`
- **Headers:** `Authorization: Bearer <adminAccessToken>`, `x-organization-id: <orgId>`
- **Description:** Fetches all granular details for a specific order (including pricing, purchased items, return requests, and the customer's basic info).

### **B. Update Order Status (Fixed)**
- **Endpoint:** `PATCH /api/v1/orders/admin/:id/status`
- **Headers:** `Authorization: Bearer <adminAccessToken>`, `x-organization-id: <orgId>`
- **Request Body:**
  ```json
  {
    "status": "shipped" 
  }
  ```
- **Valid Statuses:** `pending_payment`, `paid`, `processing`, `shipped`, `out_for_delivery`, `delivered`, `cancelled`, `return_requested`, `returned`, `refunded`.
- **Note:** The backend validation bug causing the 404 error here has been resolved.

### **C. Update Order Tracking Info**
- **Endpoint:** `PATCH /api/v1/orders/admin/:id/tracking`
- **Headers:** `Authorization: Bearer <adminAccessToken>`, `x-organization-id: <orgId>`
- **Request Body:**
  ```json
  {
    "trackingNumber": "AWB123456789",
    "courierName": "FedEx",
    "trackingUrl": "https://fedex.com/track/...",
    "adminNotes": "Dispatched early."
  }
  ```

---

## 4. Coupons & Cart Discounts

The coupon system is entirely functional and handles mathematical calculations dynamically on the backend.

### **A. Apply Coupon**
- **Endpoint:** `POST /api/v1/cart/apply-coupon`
- **Headers:** `Authorization: Bearer <accessToken>`, `x-organization-id: <orgId>`
- **Request Body:**
  ```json
  {
    "couponCode": "SUMMER20"
  }
  ```
- **Description:** The backend automatically validates if the coupon is active, if the current date is within the start/end limits, if the `minOrderAmount` is met, and if usage limits have been reached. It then recalculates the cart's final total.

### **B. Remove Coupon**
- **Endpoint:** `DELETE /api/v1/cart/remove-coupon`
- **Headers:** `Authorization: Bearer <accessToken>`, `x-organization-id: <orgId>`
- **Description:** Strips the coupon from the cart and resets the totals back to their standard price.

---

## 5. Token Fallbacks (Under the Hood)
We have implemented a `req.currentUser` fallback logic on the backend. If your frontend occasionally sends the legacy `userId` payload inside JWT tokens instead of `id`, the backend now automatically falls back and processes it correctly. You should experience significantly fewer generic "Unauthorized" or 400 errors during checkout and cart manipulations.
