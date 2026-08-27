import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.webp";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Zap,
  TrendingUp,
  Wrench,
} from "lucide-react";

export default function LoginRegister() {
  const navigate = useNavigate();
  const { login, loginWith2FA, loginWithGoogle, register, user } = useAuth();

  const [isRegister, setIsRegister] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form states (email & name persist across sliding view changes)
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // 2FA states
  const [requires2FA, setRequires2FA] = useState(false);
  const [twoFATempToken, setTwoFATempToken] = useState("");
  const [twoFACode, setTwoFACode] = useState("");

  const firstInputRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  // Mode switch handlers
  const handleModeSwitch = (toRegister) => {
    setIsRegister(toRegister);
    setIsForgotPassword(false);
    setErrorMsg("");
    setSuccessMsg("");
    setTimeout(() => {
      if (firstInputRef.current) {
        firstInputRef.current.focus();
      }
    }, 120);
  };

  const handleForgotPasswordSwitch = (toForgot) => {
    setIsForgotPassword(toForgot);
    setErrorMsg("");
    setSuccessMsg("");
    setTimeout(() => {
      if (firstInputRef.current) {
        firstInputRef.current.focus();
      }
    }, 120);
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setSubmitting(true);
      setErrorMsg("");
      const payload = await loginWithGoogle(credentialResponse.credential);
      if (payload?.requires2FA) {
        setRequires2FA(true);
        setTwoFATempToken(payload.tempToken);
        setSuccessMsg("Please enter the 6-digit code from your Authenticator app.");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(
        err.response?.data?.error || err.response?.data?.message || "Google authentication failed."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleError = () => {
    setErrorMsg("Google Sign-In was cancelled or failed.");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setErrorMsg("Please enter your email address.");
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    if (!isForgotPassword && !password) {
      setErrorMsg("Please enter your password.");
      return;
    }

    if (isRegister) {
      if (!name.trim()) {
        setErrorMsg("Please enter your full name.");
        return;
      }
      if (password.length < 6) {
        setErrorMsg("Password must be at least 6 characters long.");
        return;
      }
      if (password !== confirmPassword) {
        setErrorMsg("Passwords do not match. Please re-enter.");
        return;
      }
    }

    setSubmitting(true);
    try {
      if (isForgotPassword) {
        setSuccessMsg("If an account with that email exists, password reset instructions have been sent.");
      } else if (requires2FA) {
        if (!twoFACode || twoFACode.length < 6) {
          setErrorMsg("Please enter the 6-digit Authenticator code.");
          setSubmitting(false);
          return;
        }
        await loginWith2FA(twoFATempToken, twoFACode);
        navigate("/");
      } else if (isRegister) {
        await register(trimmedEmail, password, name.trim());
        setIsRegister(false);
        setSuccessMsg("Account created successfully! Please log in.");
        setConfirmPassword("");
        setName("");
        setTimeout(() => {
          if (firstInputRef.current) {
            firstInputRef.current.focus();
          }
        }, 120);
      } else {
        const payload = await login(trimmedEmail, password);
        if (payload?.requires2FA) {
          setRequires2FA(true);
          setTwoFATempToken(payload.tempToken);
          setSuccessMsg("Please enter the 6-digit code from your Authenticator app.");
        } else {
          navigate("/");
        }
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Authentication failed. Please check your credentials and try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white flex flex-col md:flex-row relative overflow-x-hidden md:overflow-hidden select-none">
      {/* ================================================================== */}
      {/* DESKTOP: DYNAMIC FULL-HEIGHT SLIDING BRAND OVERLAY PANEL           */}
      {/* ================================================================== */}
      <div
        className={`
          hidden md:flex absolute top-0 bottom-0 w-1/2 z-20
          bg-gradient-to-br from-[#e31e24] via-[#c9151b] to-[#991b1b]
          text-white p-10 lg:p-16 flex-col justify-between
          transition-all duration-500 ease-in-out
          overflow-hidden shadow-2xl
          ${
            isRegister
              ? "translate-x-full md:rounded-l-[100px] lg:rounded-l-[140px]"
              : "translate-x-0 md:rounded-r-[100px] lg:rounded-r-[140px]"
          }
        `}
      >
        {/* Subtle Glow Spheres */}
        <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 rounded-full bg-black/25 blur-3xl pointer-events-none" />

        {/* Top Logo Container */}
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg">
            <img
              src={logo}
              alt="C/FOUR Logo"
              className="h-8 lg:h-9 w-auto object-contain"
            />
          </div>
        </div>

        {/* ================================================================ */}
        {/* CENTER COPY STRATEGY (DYNAMIC BASED ON STATE)                     */}
        {/* ================================================================ */}
        <div className="relative z-10 my-auto py-8 max-w-lg mx-auto w-full space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 text-xs font-semibold tracking-wide uppercase text-white/95 backdrop-blur-sm shadow-sm">
            <Zap className="w-4 h-4 text-white" />
            Complete Electric Zone
          </div>

          {isForgotPassword ? (
            // FORGOT PASSWORD HERO STATE
            <div className="space-y-4 animate-fadeIn">
              <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                Need Help?
              </h2>
              <p className="text-white/85 text-base lg:text-lg leading-relaxed">
                Remember your password? Switch back to sign in and continue managing your account.
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => handleForgotPasswordSwitch(false)}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full border-2 border-white/90 text-white font-semibold text-base hover:bg-white hover:text-[#c9151b] transition-all duration-300 transform active:scale-95 shadow-md cursor-pointer"
                >
                  Back to Sign In
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          ) : isRegister ? (
            // REGISTRATION HERO STATE (HIGH-CONVERTING VALUE PROPOSITIONS)
            <div className="space-y-4 animate-fadeIn text-left">
              <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                Empower Your Space.
              </h2>
              <div className="space-y-3.5 pt-2">
                <div className="flex items-start gap-3 text-sm lg:text-base text-white/90">
                  <span className="p-1.5 rounded-lg bg-white/20 text-white flex-shrink-0 mt-0.5 shadow-sm">
                    <Zap className="w-4 h-4" />
                  </span>
                  <div>
                    <strong className="text-white font-semibold block text-base">Instant Ordering</strong>
                    <span className="text-white/80 text-sm">Track premium electrical hardware and components seamlessly.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-sm lg:text-base text-white/90">
                  <span className="p-1.5 rounded-lg bg-white/20 text-white flex-shrink-0 mt-0.5 shadow-sm">
                    <TrendingUp className="w-4 h-4" />
                  </span>
                  <div>
                    <strong className="text-white font-semibold block text-base">Wholesale Tier Benefits</strong>
                    <span className="text-white/80 text-sm">Unlock dynamic business pricing and contract quotes.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-sm lg:text-base text-white/90">
                  <span className="p-1.5 rounded-lg bg-white/20 text-white flex-shrink-0 mt-0.5 shadow-sm">
                    <Wrench className="w-4 h-4" />
                  </span>
                  <div>
                    <strong className="text-white font-semibold block text-base">Project Hub</strong>
                    <span className="text-white/80 text-sm">Save, configure, and manage custom project blueprints.</span>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => handleModeSwitch(false)}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full border-2 border-white/90 text-white font-semibold text-base hover:bg-white hover:text-[#c9151b] transition-all duration-300 transform active:scale-95 shadow-md cursor-pointer"
                >
                  Sign In
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          ) : (
            // LOGIN HERO STATE
            <div className="space-y-4 animate-fadeIn text-left">
              <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                Hello, Welcome!
              </h2>
              <p className="text-white/85 text-base lg:text-lg leading-relaxed">
                Don't have an account yet? Register now to experience lightning fast orders and exclusive perks.
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => handleModeSwitch(true)}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full border-2 border-white/90 text-white font-semibold text-base hover:bg-white hover:text-[#c9151b] transition-all duration-300 transform active:scale-95 shadow-md cursor-pointer"
                >
                  Register
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Security / Trust Badges */}
        <div className="relative z-10 pt-6 border-t border-white/20 flex items-center justify-between text-xs lg:text-sm text-white/85 font-medium max-w-lg mx-auto w-full">
          <span className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-white" />
            100% Secure Checkout
          </span>
          <span className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-white" />
            Verified Genuine
          </span>
        </div>
      </div>

      {/* ================================================================== */}
      {/* DESKTOP 2-COLUMN SLOTS (LEFT: REGISTER | RIGHT: LOGIN)             */}
      {/* ================================================================== */}
      
      {/* LEFT COLUMN: REGISTRATION FORM (Visible when isRegister is true) */}
      <div
        className={`
          w-full md:w-1/2 min-h-screen p-6 sm:p-10 lg:p-16 flex flex-col justify-center
          transition-opacity duration-300 bg-white
          ${isRegister ? "md:opacity-100 md:pointer-events-auto" : "md:opacity-0 md:pointer-events-none hidden md:flex"}
        `}
      >
        <div className="w-full max-w-md mx-auto">
          {/* Mobile Brand Header */}
          <div className="md:hidden mb-6 flex flex-col items-center text-center">
            <div className="inline-flex items-center justify-center p-2.5 bg-neutral-50 rounded-2xl border border-neutral-200 shadow-sm mb-2">
              <img src={logo} alt="C/FOUR Logo" className="h-8 w-auto object-contain" />
            </div>
            <p className="text-xs text-neutral-500 font-semibold tracking-wider uppercase">Complete Electric Zone</p>
          </div>

          {/* Mobile Segmented Switcher */}
          <div className="md:hidden mb-6">
            <div
              role="tablist"
              aria-label="Authentication Modes"
              className="grid grid-cols-2 p-1.5 bg-neutral-100 rounded-2xl border border-neutral-200"
            >
              <button
                type="button"
                role="tab"
                aria-selected={!isRegister}
                onClick={() => handleModeSwitch(false)}
                className="py-2.5 text-sm font-semibold rounded-xl text-neutral-500 hover:text-neutral-900 cursor-pointer"
              >
                Sign In
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={isRegister}
                onClick={() => handleModeSwitch(true)}
                className="py-2.5 text-sm font-semibold rounded-xl bg-white text-neutral-900 shadow-sm cursor-pointer"
              >
                Sign Up
              </button>
            </div>
          </div>

          <div className="mb-6 text-left">
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-neutral-900">
              Create Account
            </h1>
            <p className="text-sm text-neutral-500 mt-1.5">
              Join C/FOUR to access wholesale pricing and lightning checkout.
            </p>
          </div>

          {errorMsg && isRegister && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm font-medium flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-500 mt-0.5" />
              <span className="text-left">{errorMsg}</span>
            </div>
          )}
          {successMsg && isRegister && (
            <div className="mb-5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-500 mt-0.5" />
              <span className="text-left">{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                Email Address
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  autoComplete="email"
                  className="block w-full pl-11 pr-4 py-3 text-sm rounded-xl border border-neutral-300 bg-neutral-50/60 text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:border-[#e31e24] focus:ring-2 focus:ring-[#e31e24]/15 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                Your Full Name
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                  <User className="h-5 w-5" />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  autoComplete="name"
                  className="block w-full pl-11 pr-4 py-3 text-sm rounded-xl border border-neutral-300 bg-neutral-50/60 text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:border-[#e31e24] focus:ring-2 focus:ring-[#e31e24]/15 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                Password
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className="block w-full pl-11 pr-11 py-3 text-sm rounded-xl border border-neutral-300 bg-neutral-50/60 text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:border-[#e31e24] focus:ring-2 focus:ring-[#e31e24]/15 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-400 hover:text-neutral-600 cursor-pointer border-none bg-transparent"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                Re-Enter Password
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className="block w-full pl-11 pr-11 py-3 text-sm rounded-xl border border-neutral-300 bg-neutral-50/60 text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:border-[#e31e24] focus:ring-2 focus:ring-[#e31e24]/15 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-400 hover:text-neutral-600 cursor-pointer border-none bg-transparent"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                disabled={submitting}
                className="w-full h-12 rounded-xl bg-gradient-to-r from-[#e31e24] to-[#c9151b] hover:from-[#c9151b] hover:to-[#a91217] text-white font-semibold text-base shadow-lg shadow-red-500/25 transition-all duration-300 active:scale-[0.99] disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer border-none"
              >
                {submitting ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white border-t-transparent animate-spin rounded-full" />
                    <span>Creating Account...</span>
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-3 text-neutral-400 font-semibold tracking-wider">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google OAuth Button */}
            <div className="flex justify-center mt-4">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                text="signup_with"
                size="large"
                width="100%"
              />
            </div>

            {/* Mobile-only toggle footer */}
            <div className="md:hidden pt-4 text-center">
              <p className="text-sm text-neutral-600">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => handleModeSwitch(false)}
                  className="font-bold text-[#e31e24] hover:underline cursor-pointer border-none bg-transparent"
                >
                  Sign In
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* RIGHT COLUMN: LOGIN & FORGOT PASSWORD (Visible when isRegister is false) */}
      <div
        className={`
          w-full md:w-1/2 min-h-screen p-6 sm:p-10 lg:p-16 flex flex-col justify-center
          transition-opacity duration-300 bg-white
          ${!isRegister ? "md:opacity-100 md:pointer-events-auto" : "md:opacity-0 md:pointer-events-none hidden md:flex"}
        `}
      >
        <div className="w-full max-w-md mx-auto">
          {/* Mobile Brand Header */}
          <div className="md:hidden mb-6 flex flex-col items-center text-center">
            <div className="inline-flex items-center justify-center p-2.5 bg-neutral-50 rounded-2xl border border-neutral-200 shadow-sm mb-2">
              <img src={logo} alt="C/FOUR Logo" className="h-8 w-auto object-contain" />
            </div>
            <p className="text-xs text-neutral-500 font-semibold tracking-wider uppercase">Complete Electric Zone</p>
          </div>

          {/* Mobile Segmented Switcher */}
          {!isForgotPassword && (
            <div className="md:hidden mb-6">
              <div
                role="tablist"
                aria-label="Authentication Modes"
                className="grid grid-cols-2 p-1.5 bg-neutral-100 rounded-2xl border border-neutral-200"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={!isRegister}
                  onClick={() => handleModeSwitch(false)}
                  className="py-2.5 text-sm font-semibold rounded-xl bg-white text-neutral-900 shadow-sm cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={isRegister}
                  onClick={() => handleModeSwitch(true)}
                  className="py-2.5 text-sm font-semibold rounded-xl text-neutral-500 hover:text-neutral-900 cursor-pointer"
                >
                  Sign Up
                </button>
              </div>
            </div>
          )}

          <div className="mb-6 text-left">
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-neutral-900">
              {isForgotPassword ? "Reset Password" : "Login"}
            </h1>
            <p className="text-sm text-neutral-500 mt-1.5">
              {isForgotPassword
                ? "Enter your email to receive recovery instructions."
                : "Welcome back! Please enter your credentials to proceed."}
            </p>
          </div>

          {errorMsg && !isRegister && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm font-medium flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-500 mt-0.5" />
              <span className="text-left">{errorMsg}</span>
            </div>
          )}
          {successMsg && !isRegister && (
            <div className="mb-5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-500 mt-0.5" />
              <span className="text-left">{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            {!requires2FA && (
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Email Address
                </label>
                <div className="relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                    <Mail className="h-5 w-5" />
                  </div>
                  <input
                    ref={firstInputRef}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    autoComplete="email"
                    className="block w-full pl-11 pr-4 py-3 text-sm rounded-xl border border-neutral-300 bg-neutral-50/60 text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:border-[#e31e24] focus:ring-2 focus:ring-[#e31e24]/15 transition-all"
                  />
                </div>
              </div>
            )}

            {requires2FA && (
              <div className="animate-fadeIn">
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Authenticator Code (6 digits)
                </label>
                <div className="relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                    <Lock className="h-5 w-5" />
                  </div>
                  <input
                    type="text"
                    value={twoFACode}
                    onChange={(e) => setTwoFACode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="123456"
                    className="block w-full pl-11 pr-4 py-3 text-sm rounded-xl border border-neutral-300 bg-neutral-50/60 text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:border-[#e31e24] focus:ring-2 focus:ring-[#e31e24]/15 transition-all text-center tracking-widest text-lg font-mono"
                  />
                </div>
              </div>
            )}

            {!isForgotPassword && !requires2FA && (
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Password
                </label>
                <div className="relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                    <Lock className="h-5 w-5" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    className="block w-full pl-11 pr-11 py-3 text-sm rounded-xl border border-neutral-300 bg-neutral-50/60 text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:border-[#e31e24] focus:ring-2 focus:ring-[#e31e24]/15 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-400 hover:text-neutral-600 cursor-pointer border-none bg-transparent"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-1">
              {!isForgotPassword ? (
                <>
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-neutral-300 text-[#e31e24] focus:ring-[#e31e24] accent-[#e31e24]"
                    />
                    <span className="text-sm text-neutral-600 font-medium">Remember me</span>
                  </label>

                  <button
                    type="button"
                    onClick={() => handleForgotPasswordSwitch(true)}
                    className="text-sm font-semibold text-[#c9151b] hover:text-[#991b1b] hover:underline cursor-pointer border-none bg-transparent transition-colors"
                  >
                    Forgot Password?
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => handleForgotPasswordSwitch(false)}
                  className="text-sm font-semibold text-[#c9151b] hover:text-[#991b1b] hover:underline cursor-pointer border-none bg-transparent transition-colors"
                >
                  Back to Sign In
                </button>
              )}
            </div>

            <div className="pt-3">
              <button
                type="submit"
                disabled={submitting}
                className="w-full h-12 rounded-xl bg-gradient-to-r from-[#e31e24] to-[#c9151b] hover:from-[#c9151b] hover:to-[#a91217] text-white font-semibold text-base shadow-lg shadow-red-500/25 transition-all duration-300 active:scale-[0.99] disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer border-none"
              >
                {submitting ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white border-t-transparent animate-spin rounded-full" />
                    <span>{isForgotPassword ? "Sending..." : "Authenticating..."}</span>
                  </>
                ) : isForgotPassword ? (
                  "Send Reset Link"
                ) : requires2FA ? (
                  "Verify & Login"
                ) : (
                  "Sign In"
                )}
              </button>
            </div>

            {!isForgotPassword && (
              <>
                {/* Divider */}
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-neutral-200" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-3 text-neutral-400 font-semibold tracking-wider">
                      Or continue with
                    </span>
                  </div>
                </div>

                {/* Google OAuth Button */}
                <div className="flex justify-center mt-4">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleError}
                    text="signin_with"
                    size="large"
                    width="100%"
                  />
                </div>
              </>
            )}

            {/* Mobile-only toggle footer */}
            <div className="md:hidden pt-4 text-center">
              {!isForgotPassword && (
                <p className="text-sm text-neutral-600">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => handleModeSwitch(true)}
                    className="font-bold text-[#e31e24] hover:underline cursor-pointer border-none bg-transparent"
                  >
                    Sign Up
                  </button>
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
