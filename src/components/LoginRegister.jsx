import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.webp";

export default function LoginRegister() {
  const navigate = useNavigate();
  const { login, register, user } = useAuth();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const [isRegister, setIsRegister] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    
    if (!email.trim() || (!isForgotPassword && !password)) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    if (isRegister && password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    setSubmitting(true);
    try {
      if (isForgotPassword) {
        // Recovery simulated placeholder
        setSuccessMsg("If your email exists, a recovery link will be sent.");
      } else if (isRegister) {
        await register(email, password, name);
        setSuccessMsg("Account created! Logging in...");
        setTimeout(async () => {
          try {
            await login(email, password, name);
            navigate("/");
          } catch (err) {
            setErrorMsg("Registration succeeded, but auto-login failed. Please log in manually.");
          }
        }, 1500);
      } else {
        await login(email, password);
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(err.response?.data?.error || err.response?.data?.message || "An authentication error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <div
      className="
        flex
        min-h-screen
        items-center
        justify-center

        bg-[#eeeeee]

        px-4
        py-10
      "
    >
      <div
        className="
          w-full
          max-w-[430px]
        "
      >
        {/* LOGO */}

        <div
          className="
            mb-5

            flex
            justify-center
          "
        >
          <img
            src={logo}
            alt="Logo"
            className="
              w-[105px]

              object-contain
            "
          />
        </div>

        {/* CARD */}

        <div
          className="
            rounded-[12px]

            border border-[#d8d8d8]

            bg-[#f8f8f8]

            px-6
            py-8

            shadow-[0_8px_24px_rgba(0,0,0,0.12)]
          "
        >
          {/* TITLE */}

          <h1
            className="
              text-center

              text-[20px]
              font-bold

              text-black
            "
          >
            {isForgotPassword
              ? "Password Recovery"
              : isRegister
                ? "Create Account"
                : "Login to Account"}
          </h1>

          {/* FORM */}
          {errorMsg && (
            <div className="mt-4 p-3 bg-red-100 border border-red-200 text-red-700 text-sm rounded-lg text-center font-medium">
              {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="mt-4 p-3 bg-green-100 border border-green-200 text-green-700 text-sm rounded-lg text-center font-medium">
              {successMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8">
            {/* EMAIL */}

            <div>
              <label
                className="
                  mb-2
                  block

                  text-[15px]
                  font-medium

                  text-black
                "
              >
                Enter Email / Mobile Number
              </label>

              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="
                  h-[42px]
                  w-full

                  rounded-[8px]

                  border border-[#cfcfcf]

                  bg-white

                  px-4

                  outline-none

                  transition-all
                  duration-300

                  focus:border-[#e31e24]
                "
              />
            </div>

            {/* NAME */}

            {isRegister && !isForgotPassword && (
              <div className="mt-5">
                <label
                  className="
                      mb-2
                      block

                      text-[15px]
                      font-medium

                      text-black
                    "
                >
                  Your Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="
                      h-[42px]
                      w-full

                      rounded-[8px]

                      border border-[#cfcfcf]

                      bg-white

                      px-4

                      outline-none

                      transition-all
                      duration-300

                      focus:border-[#e31e24]
                    "
                />
              </div>
            )}

            {/* PASSWORD */}

            {!isForgotPassword && (
              <div className="mt-5">
                <label
                  className="
                    mb-2
                    block

                    text-[15px]
                    font-medium

                    text-black
                  "
                >
                  Password
                </label>

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="
                    h-[42px]
                    w-full

                    rounded-[8px]

                    border border-[#cfcfcf]

                    bg-white

                    px-4

                    outline-none

                    transition-all
                    duration-300

                    focus:border-[#e31e24]
                  "
                />
              </div>
            )}

            {/* CONFIRM PASSWORD */}

            {isRegister && !isForgotPassword && (
              <div className="mt-5">
                <label
                  className="
                      mb-2
                      block

                      text-[15px]
                      font-medium

                      text-black
                    "
                >
                  Re-Enter Password
                </label>

                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="
                      h-[42px]
                      w-full

                      rounded-[8px]

                      border border-[#cfcfcf]

                      bg-white

                      px-4

                      outline-none

                      transition-all
                      duration-300

                      focus:border-[#e31e24]
                    "
                />
              </div>
            )}

            {/* LINKS */}

            <div
              className="
                mt-3

                flex
                items-center
                justify-between
              "
            >
              {!isRegister && !isForgotPassword ? (
                <>
                  <button
                    onClick={() => setIsForgotPassword(true)}
                    className="
                      cursor-pointer

                      text-[13px]

                      text-[#444]

                      transition-colors
                      duration-300

                      hover:text-black
                    "
                  >
                    Forgot Password?
                  </button>

                  <button
                    onClick={() => setIsRegister(true)}
                    className="
                      cursor-pointer

                      text-[13px]

                      text-[#444]

                      transition-colors
                      duration-300

                      hover:text-black
                    "
                  >
                    Create Account
                  </button>
                </>
              ) : isRegister ? (
                <button
                  onClick={() => setIsRegister(false)}
                  className="
                    cursor-pointer

                    text-[13px]

                    text-[#444]

                    transition-colors
                    duration-300

                    hover:text-black
                  "
                >
                  Already a Customer?
                </button>
              ) : (
                <button
                  onClick={() => setIsForgotPassword(false)}
                  className="
                    cursor-pointer

                    text-[13px]

                    text-[#444]

                    transition-colors
                    duration-300

                    hover:text-black
                  "
                >
                  Back to login
                </button>
              )}
            </div>

            {/* BUTTON */}

            <div
              className="
                mt-5

                flex
                justify-center
              "
            >
              <button
                type="submit"
                disabled={submitting}
                className="
                  cursor-pointer
                  h-[40px]
                  min-w-[120px]
                  rounded-[8px]
                  bg-[#e31e24]
                  px-6
                  text-[16px]
                  font-semibold
                  text-white
                  transition-all
                  duration-300
                  hover:bg-[#c9151b]
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                  flex items-center justify-center gap-2
                "
              >
                {submitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent animate-spin rounded-full" />
                    {isForgotPassword ? "Sending..." : isRegister ? "Registering..." : "Signing in..."}
                  </>
                ) : isForgotPassword ? (
                  "Send Link"
                ) : isRegister ? (
                  "Sign Up"
                ) : (
                  "Login"
                )}
              </button>
            </div>

            {/* SOCIAL LOGIN HIDE */}

            {!isForgotPassword && (
              <>
                {/* DIVIDER */}

                <div
                  className="
                    mt-5

                    flex
                    items-center

                    gap-3
                  "
                >
                  <div
                    className="
                      h-[1px]
                      flex-1

                      bg-[#c8c8c8]
                    "
                  />

                  <span
                    className="
                      text-[14px]
                      font-medium

                      text-[#777]
                    "
                  >
                    or
                  </span>

                  <div
                    className="
                      h-[1px]
                      flex-1

                      bg-[#c8c8c8]
                    "
                  />
                </div>

                {/* GOOGLE */}

                <button
                  className="
                    cursor-pointer

                    mt-5

                    flex
                    h-[48px]
                    w-full

                    items-center
                    justify-center

                    gap-3

                    rounded-[10px]

                    border border-[#c8c8c8]

                    bg-white

                    text-[15px]
                    font-semibold

                    text-[#222]

                    transition-all
                    duration-300

                    hover:bg-[#f3f3f3]
                  "
                >
                  <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="Google"
                    className="
                      h-[24px]
                      w-[24px]
                    "
                  />
                  Sign in with Google
                </button>

                {/* MICROSOFT */}

                <button
                  className="
                    cursor-pointer

                    mt-4

                    flex
                    h-[48px]
                    w-full

                    items-center
                    justify-center

                    gap-3

                    rounded-[10px]

                    border border-[#c8c8c8]

                    bg-white

                    text-[15px]
                    font-semibold

                    text-[#222]

                    transition-all
                    duration-300

                    hover:bg-[#f3f3f3]
                  "
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
                    alt="Microsoft"
                    className="
                      h-[20px]
                      w-[20px]
                    "
                  />
                  Sign in with Microsoft
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
