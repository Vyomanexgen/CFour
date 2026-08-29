import { createContext, useContext, useState, useEffect } from "react";
import { getStorefrontInit } from "../api/storefrontApi";

const StoreContext = createContext(null);

export const StoreProvider = ({ children }) => {
  const [banners, setBanners] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [offerProducts, setOfferProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [aboutUs, setAboutUs] = useState(null);
  const [footerData, setFooterData] = useState(null);
  const [socialLinks, setSocialLinks] = useState([]);
  const [navItems, setNavItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [storeLoaded, setStoreLoaded] = useState(false);
  const [error, setError] = useState(null);

  const fetchStorefrontData = async () => {
    if (storeLoaded) return;
    try {
      setLoading(true);
      const res = await getStorefrontInit();
      const raw = res.data || res;
      
      if (raw.navItems) {
        // Recursively sort nav items and their sub-items by order
        const sortNavItems = (items) => {
          if (!items || !Array.isArray(items)) return [];
          return [...items].sort((a, b) => a.order - b.order).map(item => ({
            ...item,
            subItems: sortNavItems(item.subItems)
          }));
        };
        setNavItems(sortNavItems(raw.navItems));
      }
      if (raw.hero?.banners) {
        setBanners(raw.hero.banners);
      }
      if (raw.hero?.featuredProducts) {
        setFeaturedProducts(raw.hero.featuredProducts);
      }
      if (raw.categories) {
        setCategories(raw.categories);
      }
      if (raw.newArrivals) {
        setNewArrivals(raw.newArrivals);
      }
      if (raw.offerProducts) {
        setOfferProducts(raw.offerProducts);
      }
      if (raw.aboutUs) {
        setAboutUs(raw.aboutUs);
      }
      if (raw.footer) {
        setFooterData(raw.footer);
      }
      if (raw.socialLinks) {
        setSocialLinks(raw.socialLinks);
      }
      
      setStoreLoaded(true);
    } catch (err) {
      console.error("Failed to load storefront data", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStorefrontData();
  }, []);

  return (
    <StoreContext.Provider value={{
      navItems,
      banners,
      categories,
      newArrivals,
      offerProducts,
      featuredProducts,
      aboutUs,
      footerData,
      socialLinks,
      loading,
      error,
      refreshStore: () => {
        setStoreLoaded(false);
        fetchStorefrontData();
      }
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
