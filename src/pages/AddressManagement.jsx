import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { updateProfileAddresses } from "../api/orderApi";
import { MapPin, Phone, CheckCircle, Home, Save } from "lucide-react";
import { useToast } from "../context/ToastContext";

export default function AddressManagement() {
  const { user, setUser } = useAuth();
  const toast = useToast();

  const [shippingForm, setShippingForm] = useState({
    fullName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
  });

  const [billingForm, setBillingForm] = useState({
    fullName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
  });

  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (user) {
      if (user.shippingAddress) {
        setShippingForm({
          fullName: user.shippingAddress.fullName || "",
          phone: user.shippingAddress.phone || "",
          addressLine1: user.shippingAddress.addressLine1 || "",
          addressLine2: user.shippingAddress.addressLine2 || "",
          city: user.shippingAddress.city || "",
          state: user.shippingAddress.state || "",
          postalCode: user.shippingAddress.postalCode || "",
          country: user.shippingAddress.country || "India",
        });
      } else {
        const name = [user.firstName, user.lastName].filter(Boolean).join(" ");
        if (name) {
          setShippingForm(prev => ({ ...prev, fullName: name }));
        }
      }

      if (user.billingAddress) {
        setBillingForm({
          fullName: user.billingAddress.fullName || "",
          phone: user.billingAddress.phone || "",
          addressLine1: user.billingAddress.addressLine1 || "",
          addressLine2: user.billingAddress.addressLine2 || "",
          city: user.billingAddress.city || "",
          state: user.billingAddress.state || "",
          postalCode: user.billingAddress.postalCode || "",
          country: user.billingAddress.country || "India",
        });
        // Check if billing address is different from shipping address
        const ship = user.shippingAddress || {};
        const bill = user.billingAddress;
        const isSame = 
          bill.fullName === ship.fullName &&
          bill.phone === ship.phone &&
          bill.addressLine1 === ship.addressLine1 &&
          bill.addressLine2 === ship.addressLine2 &&
          bill.city === ship.city &&
          bill.state === ship.state &&
          bill.postalCode === ship.postalCode &&
          bill.country === ship.country;
        setSameAsShipping(isSame);
      } else {
        setSameAsShipping(true);
      }
    }
  }, [user]);

  // Automatically sync billing form when shipping form changes and "sameAsShipping" is active
  useEffect(() => {
    if (sameAsShipping) {
      setBillingForm({ ...shippingForm });
    }
  }, [shippingForm, sameAsShipping]);

  const validateForm = (form) => {
    const fullName = form.fullName.trim();
    const phone = form.phone.trim();
    const addressLine1 = form.addressLine1.trim();
    const city = form.city.trim();
    const state = form.state.trim();
    const postalCode = form.postalCode.trim();
    const country = form.country.trim();

    if (!fullName || !phone || !addressLine1 || !city || !state || !postalCode || !country) {
      return "All required fields must be filled out. Spaces-only values are not permitted.";
    }

    // Phone: exactly 10 digits
    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length !== 10 || phone !== phoneDigits) {
      return "Phone number must be exactly 10 digits (digits only).";
    }

    // Pincode: exactly 6 digits
    const zipDigits = postalCode.replace(/\D/g, "");
    if (zipDigits.length !== 6 || postalCode !== zipDigits) {
      return "Postal code / Pincode must be exactly 6 digits (digits only).";
    }

    return null;
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const shipErr = validateForm(shippingForm);
    if (shipErr) {
      toast.error(`Shipping Address error: ${shipErr}`);
      return;
    }

    const targetBilling = sameAsShipping ? shippingForm : billingForm;
    const billErr = validateForm(targetBilling);
    if (billErr) {
      toast.error(`Billing Address error: ${billErr}`);
      return;
    }

    setIsSaving(true);
    try {
      const payload = {
        shippingAddress: {
          fullName: shippingForm.fullName.trim(),
          phone: shippingForm.phone.trim(),
          addressLine1: shippingForm.addressLine1.trim(),
          addressLine2: shippingForm.addressLine2.trim() || "",
          city: shippingForm.city.trim(),
          state: shippingForm.state.trim(),
          postalCode: shippingForm.postalCode.trim(),
          country: shippingForm.country.trim(),
        },
        billingAddress: {
          fullName: targetBilling.fullName.trim(),
          phone: targetBilling.phone.trim(),
          addressLine1: targetBilling.addressLine1.trim(),
          addressLine2: targetBilling.addressLine2.trim() || "",
          city: targetBilling.city.trim(),
          state: targetBilling.state.trim(),
          postalCode: targetBilling.postalCode.trim(),
          country: targetBilling.country.trim(),
        }
      };

      const res = await updateProfileAddresses(payload);
      if (res.success) {
        toast.success("Addresses updated successfully!");
        // Update user state globally in AuthContext
        if (setUser) {
          setUser(prev => ({
            ...prev,
            shippingAddress: payload.shippingAddress,
            billingAddress: payload.billingAddress,
          }));
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        throw new Error(res.message || "Failed to update profile addresses.");
      }
    } catch (err) {
      console.error("Save profile addresses failed:", err);
      // Fallback message handled by global error event, but we can also display a specific message
      toast.error(err.response?.data?.message || err.message || "Something went wrong while saving addresses.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] pt-28 px-4 pb-16">
      <div className="max-w-[850px] mx-auto text-left">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-black text-white rounded-2xl">
            <Home size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight m-0">Address Management</h1>
            <p className="text-gray-500 font-medium m-0 mt-1">Manage your default shipping and billing destinations</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Shipping Address Form */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-3">
              <MapPin className="text-gray-400" size={18} />
              <h2 className="text-lg font-black text-gray-800 m-0">Default Shipping Address</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Full Name *</label>
                <input
                  type="text"
                  value={shippingForm.fullName}
                  onChange={(e) => setShippingForm({ ...shippingForm, fullName: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-black focus:ring-1 focus:ring-black outline-none transition"
                  placeholder="Supriya Dev"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Phone Number *</label>
                <input
                  type="text"
                  value={shippingForm.phone}
                  onChange={(e) => setShippingForm({ ...shippingForm, phone: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-black focus:ring-1 focus:ring-black outline-none transition"
                  placeholder="9876543210"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Address Line 1 *</label>
                <input
                  type="text"
                  value={shippingForm.addressLine1}
                  onChange={(e) => setShippingForm({ ...shippingForm, addressLine1: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-black focus:ring-1 focus:ring-black outline-none transition"
                  placeholder="Flat, House no., Building, Company"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Address Line 2 (Optional)</label>
                <input
                  type="text"
                  value={shippingForm.addressLine2}
                  onChange={(e) => setShippingForm({ ...shippingForm, addressLine2: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-black focus:ring-1 focus:ring-black outline-none transition"
                  placeholder="Area, Street, Sector, Village"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Town/City *</label>
                <input
                  type="text"
                  value={shippingForm.city}
                  onChange={(e) => setShippingForm({ ...shippingForm, city: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-black focus:ring-1 focus:ring-black outline-none transition"
                  placeholder="Hyderabad"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">State *</label>
                <input
                  type="text"
                  value={shippingForm.state}
                  onChange={(e) => setShippingForm({ ...shippingForm, state: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-black focus:ring-1 focus:ring-black outline-none transition"
                  placeholder="Telangana"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Postal Code (PIN) *</label>
                <input
                  type="text"
                  value={shippingForm.postalCode}
                  onChange={(e) => setShippingForm({ ...shippingForm, postalCode: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-black focus:ring-1 focus:ring-black outline-none transition"
                  placeholder="500032"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Country *</label>
                <input
                  type="text"
                  value={shippingForm.country}
                  onChange={(e) => setShippingForm({ ...shippingForm, country: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-black focus:ring-1 focus:ring-black outline-none transition"
                  placeholder="India"
                  required
                />
              </div>
            </div>
          </div>

          {/* Sync Checkbox */}
          <div className="bg-gray-100 border border-gray-200 rounded-3xl p-5 flex items-center">
            <label className="flex items-center gap-3 cursor-pointer select-none font-bold text-gray-700 text-sm">
              <input
                type="checkbox"
                checked={sameAsShipping}
                onChange={(e) => setSameAsShipping(e.target.checked)}
                className="h-5 w-5 rounded border-gray-300 text-black focus:ring-black cursor-pointer"
              />
              <span>Billing Address is the same as Shipping Address</span>
            </label>
          </div>

          {/* Billing Address Form (only visible if sameAsShipping is false) */}
          {!sameAsShipping && (
            <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-3">
                <MapPin className="text-gray-400" size={18} />
                <h2 className="text-lg font-black text-gray-800 m-0">Default Billing Address</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Full Name *</label>
                  <input
                    type="text"
                    value={billingForm.fullName}
                    onChange={(e) => setBillingForm({ ...billingForm, fullName: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-black focus:ring-1 focus:ring-black outline-none transition"
                    placeholder="Supriya Dev"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Phone Number *</label>
                  <input
                    type="text"
                    value={billingForm.phone}
                    onChange={(e) => setBillingForm({ ...billingForm, phone: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-black focus:ring-1 focus:ring-black outline-none transition"
                    placeholder="9876543210"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Address Line 1 *</label>
                  <input
                    type="text"
                    value={billingForm.addressLine1}
                    onChange={(e) => setBillingForm({ ...billingForm, addressLine1: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-black focus:ring-1 focus:ring-black outline-none transition"
                    placeholder="Flat, House no., Building, Company"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Address Line 2 (Optional)</label>
                  <input
                    type="text"
                    value={billingForm.addressLine2}
                    onChange={(e) => setBillingForm({ ...billingForm, addressLine2: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-black focus:ring-1 focus:ring-black outline-none transition"
                    placeholder="Area, Street, Sector, Village"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Town/City *</label>
                  <input
                    type="text"
                    value={billingForm.city}
                    onChange={(e) => setBillingForm({ ...billingForm, city: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-black focus:ring-1 focus:ring-black outline-none transition"
                    placeholder="Hyderabad"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">State *</label>
                  <input
                    type="text"
                    value={billingForm.state}
                    onChange={(e) => setBillingForm({ ...billingForm, state: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-black focus:ring-1 focus:ring-black outline-none transition"
                    placeholder="Telangana"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Postal Code (PIN) *</label>
                  <input
                    type="text"
                    value={billingForm.postalCode}
                    onChange={(e) => setBillingForm({ ...billingForm, postalCode: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-black focus:ring-1 focus:ring-black outline-none transition"
                    placeholder="500032"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Country *</label>
                  <input
                    type="text"
                    value={billingForm.country}
                    onChange={(e) => setBillingForm({ ...billingForm, country: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-black focus:ring-1 focus:ring-black outline-none transition"
                    placeholder="India"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="bg-black hover:bg-gray-900 text-white font-bold py-3.5 px-8 rounded-full flex items-center justify-center gap-2 border-none cursor-pointer transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={18} />
              <span>{isSaving ? "Saving Changes..." : "Save Addresses"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
