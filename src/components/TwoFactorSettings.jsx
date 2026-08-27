import { useState } from "react";
import { generate2FA, verifyAndEnable2FA, disable2FA } from "../api/authApi";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { Shield, ShieldAlert, Key } from "lucide-react";

export default function TwoFactorSettings() {
  const { user, setUser } = useAuth();
  const toast = useToast();

  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [secret, setSecret] = useState("");
  const [token, setToken] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isDisabling, setIsDisabling] = useState(false);

  // We assume user.has2FA is passed by backend, or we can just derive it if they have it
  const is2FAEnabled = user?.has2FA === true;

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const data = await generate2FA();
      const payload = data.data || data;
      setQrCodeUrl(payload.qrCodeUrl);
      setSecret(payload.secret);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to generate 2FA");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleVerify = async () => {
    if (token.length < 6) return toast.error("Enter a valid 6-digit code");
    setIsVerifying(true);
    try {
      await verifyAndEnable2FA(token);
      toast.success("2-Step Verification Enabled!");
      setQrCodeUrl("");
      setSecret("");
      setToken("");
      // Update local user object
      setUser((prev) => ({ ...prev, has2FA: true }));
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid Authenticator Code");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleDisable = async () => {
    if (!window.confirm("Are you sure you want to disable 2-Step Verification?")) return;
    setIsDisabling(true);
    try {
      await disable2FA();
      toast.success("2-Step Verification Disabled");
      setUser((prev) => ({ ...prev, has2FA: false }));
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to disable 2FA");
    } finally {
      setIsDisabling(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 mt-6">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-xl ${is2FAEnabled ? "bg-emerald-100 text-emerald-600" : "bg-neutral-100 text-neutral-600"}`}>
          <Shield size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">2-Step Verification</h2>
          <p className="text-sm text-gray-500">Protect your account with an Authenticator app</p>
        </div>
      </div>

      <div className="border-t border-gray-100 pt-6">
        {is2FAEnabled ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 border border-emerald-100 p-4 rounded-xl">
              <Shield size={20} />
              <span className="font-semibold text-sm">2-Step Verification is currently ON</span>
            </div>
            <button
              onClick={handleDisable}
              disabled={isDisabling}
              className="bg-red-50 hover:bg-red-100 text-red-600 font-bold py-2.5 px-6 rounded-full border-none cursor-pointer transition shadow-sm disabled:opacity-50"
            >
              {isDisabling ? "Disabling..." : "Turn Off 2FA"}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-amber-600 bg-amber-50 border border-amber-100 p-4 rounded-xl">
              <ShieldAlert size={20} />
              <span className="font-semibold text-sm">2-Step Verification is currently OFF</span>
            </div>

            {!qrCodeUrl ? (
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="bg-black hover:bg-gray-900 text-white font-bold py-2.5 px-6 rounded-full border-none cursor-pointer transition shadow-sm disabled:opacity-50"
              >
                {isGenerating ? "Loading..." : "Setup 2FA"}
              </button>
            ) : (
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 space-y-4">
                <p className="text-sm font-semibold text-gray-700">1. Scan this QR code with Google Authenticator or Authy</p>
                <div className="bg-white p-4 inline-block rounded-xl shadow-sm border border-gray-200">
                  <img src={qrCodeUrl} alt="2FA QR Code" className="w-48 h-48" />
                </div>
                <p className="text-xs text-gray-500">Manual Code: <span className="font-mono font-bold text-black bg-gray-200 px-2 py-1 rounded">{secret}</span></p>
                
                <p className="text-sm font-semibold text-gray-700 pt-4 border-t border-gray-200">2. Enter the 6-digit code to verify</p>
                <div className="flex gap-3 max-w-sm">
                  <input
                    type="text"
                    value={token}
                    onChange={(e) => setToken(e.target.value.replace(/\D/g, '').slice(0,6))}
                    placeholder="123456"
                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-center tracking-widest font-mono font-bold focus:border-black focus:ring-1 focus:ring-black outline-none"
                  />
                  <button
                    onClick={handleVerify}
                    disabled={isVerifying || token.length < 6}
                    className="bg-black hover:bg-gray-900 text-white font-bold py-2.5 px-6 rounded-xl border-none cursor-pointer transition shadow-sm disabled:opacity-50"
                  >
                    Verify
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
