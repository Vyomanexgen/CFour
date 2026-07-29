import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { updateCurrentUserProfile } from "../api/authApi";
import { User, Phone, CheckCircle, Save, Camera, AlertTriangle, ArrowLeft } from "lucide-react";
import { useToast } from "../context/ToastContext";

export default function Profile() {
  const { user, setUser, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    avatar: "",
  });

  const [initialProfile, setInitialProfile] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    avatar: "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  // Sync profile details when user state changes
  useEffect(() => {
    if (!authLoading) {
      if (user) {
        const data = {
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          phone: user.phone || "",
          avatar: user.avatar || "",
        };
        setProfile(data);
        setInitialProfile(data);
      }
      setLoading(false);
    }
  }, [user, authLoading]);

  // Dirty form detection
  const isDirty =
    profile.firstName !== initialProfile.firstName ||
    profile.lastName !== initialProfile.lastName ||
    profile.phone !== initialProfile.phone ||
    profile.avatar !== initialProfile.avatar;

  // Unsaved changes browser prompt
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "You have unsaved changes. Are you sure you want to leave?";
        return e.returnValue;
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  const handleChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleCancel = () => {
    if (isDirty) {
      const confirmDiscard = window.confirm(
        "You have unsaved changes. Are you sure you want to discard them?"
      );
      if (!confirmDiscard) return;
    }
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedFirstName = profile.firstName.trim();
    const trimmedLastName = profile.lastName.trim();
    const trimmedPhone = profile.phone.trim();
    const trimmedAvatar = profile.avatar.trim();

    // 1. Better Validation
    if (!trimmedFirstName) {
      toast.error("First Name is required. Spaces-only values are not permitted.");
      return;
    }

    if (!trimmedLastName) {
      toast.error("Last Name is required. Spaces-only values are not permitted.");
      return;
    }

    // Phone: optional, but if entered, must be exactly 10 digits
    if (trimmedPhone) {
      const phoneDigits = trimmedPhone.replace(/\D/g, "");
      if (phoneDigits.length !== 10 || trimmedPhone !== phoneDigits) {
        toast.error("Phone number must be exactly 10 digits (digits only).");
        return;
      }
    }

    // Avatar URL: optional, but if entered, must be a valid URL
    if (trimmedAvatar) {
      try {
        new URL(trimmedAvatar);
      } catch (err) {
        toast.error("Please enter a valid URL for the profile avatar image.");
        return;
      }
    }

    setIsSaving(true);
    try {
      const payload = {
        firstName: trimmedFirstName,
        lastName: trimmedLastName,
        phone: trimmedPhone || "",
      };
      if (trimmedAvatar) {
        payload.avatar = trimmedAvatar;
      }

      const res = await updateCurrentUserProfile(payload);
      const updatedUser = res.data || res;
      
      toast.success("Profile updated successfully!");
      if (setUser) {
        setUser(updatedUser);
      }
      
      const newProfileData = {
        firstName: updatedUser.firstName || "",
        lastName: updatedUser.lastName || "",
        phone: updatedUser.phone || "",
        avatar: updatedUser.avatar || "",
      };
      
      setProfile(newProfileData);
      setInitialProfile(newProfileData);
    } catch (err) {
      console.error("Save profile details failed:", err);
      toast.error(
        err.response?.data?.message ||
          err.message ||
          "Failed to save profile changes. Please try again."
      );
    } finally {
      setIsSaving(false);
    }
  };

  // Initials for avatar preview fallback
  const initials = (
    (profile.firstName?.[0] || "") + (profile.lastName?.[0] || "")
  ).toUpperCase() || "U";

  // Check if avatar url is loaded or invalid
  const [avatarError, setAvatarError] = useState(false);
  useEffect(() => {
    setAvatarError(false);
  }, [profile.avatar]);

  if (loading || authLoading) {
    /* ── SKELETON LOADER UI ── */
    return (
      <div className="min-h-screen bg-[#fafafa] pt-28 px-4 pb-16">
        <div className="max-w-[700px] mx-auto text-left space-y-6">
          <div className="flex items-center gap-3 animate-pulse">
            <div className="w-12 h-12 bg-gray-200 rounded-2xl" />
            <div className="space-y-2">
              <div className="h-6 bg-gray-200 rounded w-48" />
              <div className="h-4 bg-gray-200 rounded w-64" />
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 animate-pulse">
            <div className="flex flex-col items-center py-4 space-y-3">
              <div className="w-32 h-32 bg-gray-200 rounded-full" />
              <div className="h-4 bg-gray-200 rounded w-28" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-20" />
                  <div className="h-10 bg-gray-200 rounded-xl w-full" />
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <div className="w-24 h-10 bg-gray-200 rounded-full" />
              <div className="w-36 h-10 bg-gray-200 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] pt-28 px-4 pb-16">
      <div className="max-w-[700px] mx-auto text-left">
        {/* Back Link */}
        <button
          onClick={handleCancel}
          className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-black mb-6 border-none bg-transparent cursor-pointer transition-all"
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-black text-white rounded-2xl">
            <User size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight m-0">
              My Profile
            </h1>
            <p className="text-gray-500 font-medium m-0 mt-1">
              Manage your personal information and profile picture
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm">
            {/* Avatar Preview Section */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative group w-32 h-32 rounded-full overflow-hidden border border-gray-200 bg-gray-50 shadow-md flex items-center justify-center">
                {profile.avatar && !avatarError ? (
                  <img
                    src={profile.avatar}
                    alt="Profile Avatar Preview"
                    className="w-full h-full object-cover"
                    onError={() => setAvatarError(true)}
                  />
                ) : (
                  <div className="text-3xl font-black text-gray-400 tracking-wider">
                    {initials}
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Camera className="text-white" size={24} />
                </div>
              </div>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mt-3">
                Avatar Preview
              </p>
            </div>

            {/* Input Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                  First Name *
                </label>
                <input
                  type="text"
                  value={profile.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-black focus:ring-1 focus:ring-black outline-none transition"
                  placeholder="Supriya"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                  Last Name *
                </label>
                <input
                  type="text"
                  value={profile.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-black focus:ring-1 focus:ring-black outline-none transition"
                  placeholder="Dev"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                  Phone Number (Optional)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-gray-400 text-sm font-semibold select-none">
                    +91
                  </span>
                  <input
                    type="text"
                    value={profile.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className="w-full border border-gray-200 rounded-xl pl-12 pr-4 py-3 text-sm focus:border-black focus:ring-1 focus:ring-black outline-none transition"
                    placeholder="9876543210"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                  Avatar Image URL (Optional)
                </label>
                <input
                  type="text"
                  value={profile.avatar}
                  onChange={(e) => handleChange("avatar", e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-black focus:ring-1 focus:ring-black outline-none transition"
                  placeholder="https://example.com/path/to/avatar.jpg"
                />
              </div>
            </div>

            {/* Warn Unsaved changes */}
            {isDirty && (
              <div className="mt-5 p-3 bg-amber-50 border border-amber-200 rounded-2xl flex items-center gap-2 text-amber-800 text-xs font-semibold">
                <AlertTriangle size={16} />
                <span>You have unsaved changes in your profile details.</span>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-100">
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-full border-none cursor-pointer transition shadow-sm"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={!isDirty || isSaving}
                className="bg-black hover:bg-gray-900 text-white font-bold py-3 px-8 rounded-full flex items-center justify-center gap-2 border-none cursor-pointer transition shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Save size={18} />
                <span>{isSaving ? "Saving..." : "Save Changes"}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
