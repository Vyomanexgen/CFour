import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { getCart as getCartApi, addCartItem as addCartApi, updateCartItemQty as updateCartQtyApi, removeCartItem as removeCartApi, clearCart as clearCartApi } from "../api/cartApi";
import { useToast } from "./ToastContext";


const CartContext = createContext(null);

const mapBackendCartToFrontend = (backendCart) => {
  if (!backendCart || !backendCart.items) return [];
  return backendCart.items.map((item) => {
    const variant = item.variant;
    const product = item.product;
    const priceVal = variant?.offerPrice || variant?.originalPrice || product?.price || 0;
    const itemImage = product?.images?.[0] || "https://placehold.co/400x300?text=No+Image";
    return {
      productId: item.productId,
      variantId: item.variantId,
      qty: item.quantity,
      title: product?.name || "Product",
      price: priceVal,
      image: itemImage,
      sku: variant?.sku || "N/A",
      stockQuantity: typeof variant?.stockQuantity === "number" ? variant.stockQuantity : 999,
    };
  });
};

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const toast = useToast();
  const [cartItems, setCartItems] = useState([]);
  const [isCartLoading, setIsCartLoading] = useState(false);
  const [isCartUpdating, setIsCartUpdating] = useState(false);
  const [cartError, setCartError] = useState(null);

  // Initialize/Restore Cart
  const restoreCart = async () => {
    if (user) {
      try {
        setIsCartLoading(true);
        setCartError(null);
        const data = await getCartApi();
        const cartData = data.data || data;
        setCartItems(mapBackendCartToFrontend(cartData));
      } catch (err) {
        console.error("Failed to fetch user cart from backend", err);
        setCartError("Failed to load your cart from server.");
      } finally {
        setIsCartLoading(false);
      }
    } else {
      // Guest restore
      try {
        const saved = localStorage.getItem("guestCart");
        setCartItems(saved ? JSON.parse(saved) : []);
      } catch (err) {
        console.error("Failed to restore guest cart", err);
        setCartItems([]);
      }
    }
  };

  useEffect(() => {
    restoreCart();
  }, [user]);

  // Sync guest cart to local storage
  useEffect(() => {
    if (!user) {
      localStorage.setItem("guestCart", JSON.stringify(cartItems));
    }
  }, [cartItems, user]);

  // Add to cart action
  const addToCart = async (product, quantity = 1) => {
    setCartError(null);
    // Normalize product and variant parameters
    const productId = product.productId || product._id || product.id;
    const defaultVariant = product.variants?.[0];
    const variantId = product.variantId || defaultVariant?._id || defaultVariant?.id;
    
    if (!productId || !variantId) {
      const err = "Product ID and Variant ID are required.";
      setCartError(err);
      return { success: false, error: err };
    }

    const existingItem = cartItems.find((i) => i.variantId === variantId);
    const currentQty = existingItem ? existingItem.qty : 0;
    const newQty = currentQty + quantity;
    
    const maxStock = product.stockQuantity || defaultVariant?.stockQuantity || 999;
    const priceVal = product.price || defaultVariant?.offerPrice || defaultVariant?.originalPrice || 0;
    const titleVal = product.title || product.name || "Product";
    const imageVal = product.image || product.images?.[0] || "https://placehold.co/400x300?text=No+Image";
    const skuVal = product.sku || defaultVariant?.sku || "N/A";

    if (newQty > maxStock) {
      const err = `Only ${maxStock} items available in stock.`;
      setCartError(err);
      return { success: false, error: err };
    }

    if (user) {
      if (isCartUpdating) return { success: false, error: "Cart update in progress..." };
      try {
        setIsCartUpdating(true);
        const res = await addCartApi(productId, variantId, quantity);
        const cartData = res.data || res;
        setCartItems(mapBackendCartToFrontend(cartData));
        return { success: true };
      } catch (err) {
        console.error("Add to cart API failed", err);
        const msg = err.response?.data?.error || "Failed to add item to server cart.";
        setCartError(msg);
        return { success: false, error: msg };
      } finally {
        setIsCartUpdating(false);
      }
    } else {
      // Local guest cart add
      setCartItems((prev) => {
        const existing = prev.find((i) => i.variantId === variantId);
        if (existing) {
          return prev.map((i) =>
            i.variantId === variantId ? { ...i, qty: i.qty + quantity } : i
          );
        }
        return [...prev, {
          productId,
          variantId,
          qty: quantity,
          title: titleVal,
          price: priceVal,
          image: imageVal,
          sku: skuVal,
          stockQuantity: maxStock
        }];
      });
      return { success: true };
    }
  };

  // Update item quantity action
  const updateCartQty = async (variantId, quantity) => {
    setCartError(null);
    const targetItem = cartItems.find((i) => i.variantId === variantId);
    if (!targetItem) return { success: false, error: "Item not found in cart." };

    // Enforce quantity floor
    if (quantity < 1) {
      return removeCartItem(variantId);
    }

    // Stock validation
    if (quantity > targetItem.stockQuantity) {
      const err = `Only ${targetItem.stockQuantity} items available in stock.`;
      setCartError(err);
      return { success: false, error: err };
    }

    if (user) {
      if (isCartUpdating) return { success: false, error: "Cart update in progress..." };
      try {
        setIsCartUpdating(true);
        const res = await updateCartQtyApi(variantId, quantity);
        const cartData = res.data || res;
        setCartItems(mapBackendCartToFrontend(cartData));
        toast.success("Cart updated successfully.");
        return { success: true };
      } catch (err) {
        console.error("Update cart API failed", err);
        const msg = err.response?.data?.error || "Failed to update item quantity.";
        setCartError(msg);
        return { success: false, error: msg };
      } finally {
        setIsCartUpdating(false);
      }
    } else {
      setCartItems((prev) =>
        prev.map((i) => (i.variantId === variantId ? { ...i, qty: quantity } : i))
      );
      toast.success("Cart updated successfully.");
      return { success: true };
    }
  };

  // Remove item action
  const removeCartItem = async (variantId) => {
    setCartError(null);
    if (user) {
      if (isCartUpdating) return { success: false, error: "Cart update in progress..." };
      try {
        setIsCartUpdating(true);
        const res = await removeCartApi(variantId);
        const cartData = res.data || res;
        setCartItems(mapBackendCartToFrontend(cartData));
        toast.success("Item removed successfully.");
        return { success: true };
      } catch (err) {
        console.error("Remove cart item API failed", err);
        const msg = err.response?.data?.error || "Failed to remove item.";
        setCartError(msg);
        return { success: false, error: msg };
      } finally {
        setIsCartUpdating(false);
      }
    } else {
      setCartItems((prev) => prev.filter((i) => i.variantId !== variantId));
      toast.success("Item removed successfully.");
      return { success: true };
    }
  };

  // Clear cart action
  const clearCart = async () => {
    setCartError(null);
    if (user) {
      if (isCartUpdating) return { success: false, error: "Cart update in progress..." };
      try {
        setIsCartUpdating(true);
        const res = await clearCartApi();
        const cartData = res.data || res;
        setCartItems(mapBackendCartToFrontend(cartData));
        toast.success("Cart cleared successfully.");
        return { success: true };
      } catch (err) {
        console.error("Clear cart API failed", err);
        const msg = err.response?.data?.error || "Failed to clear cart.";
        setCartError(msg);
        return { success: false, error: msg };
      } finally {
        setIsCartUpdating(false);
      }
    } else {
      setCartItems([]);
      toast.success("Cart cleared successfully.");
      return { success: true };
    }
  };

  // Resilient guest to user cart merging upon login
  const mergeGuestCart = async () => {
    const saved = localStorage.getItem("guestCart");
    const guestCart = saved ? JSON.parse(saved) : [];
    if (guestCart.length === 0) return;

    setIsCartUpdating(true);
    setCartError(null);

    // Get current backend items first
    let backendItems = [];
    try {
      const backendCartRes = await getCartApi();
      const backendCart = backendCartRes.data || backendCartRes;
      backendItems = backendCart.items || [];
    } catch (err) {
      console.error("Could not fetch current backend cart for merge", err);
    }

    const mergeTasks = guestCart.map(async (guestItem) => {
      // Validate product/variant availability
      const maxStock = guestItem.stockQuantity || 999;
      if (maxStock <= 0) {
        throw new Error(`Product ${guestItem.title} is out of stock.`);
      }

      const existingBackend = backendItems.find((bi) => bi.variantId === guestItem.variantId);
      if (existingBackend) {
        const newQty = Math.min(existingBackend.quantity + guestItem.qty, maxStock);
        await updateCartQtyApi(guestItem.variantId, newQty);
      } else {
        await addCartApi(guestItem.productId, guestItem.variantId, guestItem.qty);
      }
      return guestItem.variantId; // Return success variant ID
    });

    const results = await Promise.allSettled(mergeTasks);
    
    // Determine failed items and successful ones
    const successfulVariantIds = [];
    const failedItems = [];

    results.forEach((res, index) => {
      if (res.status === "fulfilled") {
        successfulVariantIds.push(res.value);
      } else {
        console.error("Merge item failed:", res.reason);
        failedItems.push(guestCart[index]);
      }
    });

    // Update guest cart with failed items only (preserves failed items in localStorage)
    if (failedItems.length > 0) {
      localStorage.setItem("guestCart", JSON.stringify(failedItems));
      setCartError("Some guest items could not be merged due to stock or API issues.");
    } else {
      localStorage.removeItem("guestCart");
    }

    // Refresh final cart
    try {
      const finalRes = await getCartApi();
      const finalCart = finalRes.data || finalRes;
      setCartItems(mapBackendCartToFrontend(finalCart));
    } catch (err) {
      console.error("Final cart refresh failed", err);
    } finally {
      setIsCartUpdating(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartLoading,
        isCartUpdating,
        cartError,
        setCartError,
        restoreCart,
        addToCart,
        updateCartQty,
        removeCartItem,
        clearCart,
        mergeGuestCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
