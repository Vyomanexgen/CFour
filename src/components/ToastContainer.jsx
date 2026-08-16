import { useState, useEffect, useRef } from "react";
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from "lucide-react";

export default function ToastContainer({ toasts, removeToast }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="
        fixed top-4 right-0 left-0 sm:left-auto sm:right-6 sm:top-6
        z-[9999] flex flex-col gap-2.5
        w-full max-w-sm px-4 sm:px-0 mx-auto sm:mx-0
        pointer-events-none
      "
    >
      {toasts.slice(-3).map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
}

function ToastItem({ toast, onClose, duration = 4000 }) {
  const { message, type } = toast;
  const [isPaused, setIsPaused] = useState(false);
  const remainingTimeRef = useRef(duration);
  const timerStartRef = useRef(Date.now());
  const timerRef = useRef(null);

  // Semantic styles seamlessly matching the C/FOUR design system
  const config = {
    success: {
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />,
      badgeBg: "bg-emerald-50 border border-emerald-200/70",
      accentBorder: "border-l-4 border-l-emerald-500",
      progressBg: "bg-emerald-500",
      title: "Success",
    },
    error: {
      icon: <XCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />,
      badgeBg: "bg-rose-50 border border-rose-200/70",
      accentBorder: "border-l-4 border-l-rose-500",
      progressBg: "bg-rose-500",
      title: "Error",
    },
    warning: {
      icon: <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />,
      badgeBg: "bg-amber-50 border border-amber-200/70",
      accentBorder: "border-l-4 border-l-amber-500",
      progressBg: "bg-amber-500",
      title: "Notice",
    },
    info: {
      icon: <Info className="w-5 h-5 text-[#e31e24] flex-shrink-0" />,
      badgeBg: "bg-red-50 border border-red-200/70",
      accentBorder: "border-l-4 border-l-[#e31e24]",
      progressBg: "bg-[#e31e24]",
      title: "Info",
    },
  }[type] || {
    icon: <Info className="w-5 h-5 text-[#e31e24] flex-shrink-0" />,
    badgeBg: "bg-red-50 border border-red-200/70",
    accentBorder: "border-l-4 border-l-[#e31e24]",
    progressBg: "bg-[#e31e24]",
    title: "Notification",
  };

  // Timer logic with hover pause/resume support
  useEffect(() => {
    timerStartRef.current = Date.now();

    timerRef.current = setTimeout(() => {
      onClose();
    }, remainingTimeRef.current);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [onClose]);

  const handleMouseEnter = () => {
    setIsPaused(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    const elapsed = Date.now() - timerStartRef.current;
    remainingTimeRef.current = Math.max(200, remainingTimeRef.current - elapsed);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    timerStartRef.current = Date.now();
    timerRef.current = setTimeout(() => {
      onClose();
    }, remainingTimeRef.current);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`
        pointer-events-auto
        w-full
        bg-white/95 backdrop-blur-xl
        border border-neutral-200/80 ${config.accentBorder}
        rounded-2xl p-3.5 sm:p-4
        shadow-[0_12px_32px_-4px_rgba(0,0,0,0.12),0_4px_12px_rgba(0,0,0,0.04)]
        transform transition-all duration-300
        relative overflow-hidden group
      `}
      style={{
        animation: "cfourToastSlide 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      }}
    >
      <div className="flex items-start gap-3">
        {/* Icon Chip */}
        <div className={`p-1.5 rounded-xl ${config.badgeBg} flex items-center justify-center`}>
          {config.icon}
        </div>

        {/* Content Area */}
        <div className="flex-1 pr-6 text-left">
          <p className="text-[13px] sm:text-sm font-medium text-neutral-800 leading-snug">
            {message}
          </p>
        </div>

        {/* Dismiss Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close notification"
          className="
            absolute top-3 right-3
            p-1 rounded-lg
            text-neutral-400 hover:text-neutral-700
            hover:bg-neutral-100
            transition-colors duration-200
            cursor-pointer border-none bg-transparent
            flex items-center justify-center
          "
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Countdown Progress Bar with Pause on Hover */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-neutral-100/90 overflow-hidden">
        <div
          className={`h-full ${config.progressBg} rounded-full`}
          style={{
            animation: `cfourToastProgress ${duration}ms linear forwards`,
            animationPlayState: isPaused ? "paused" : "running",
          }}
        />
      </div>

      {/* Embedded Animations */}
      <style>{`
        @keyframes cfourToastSlide {
          from {
            transform: translateY(-20px) scale(0.96);
            opacity: 0;
          }
          to {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }
        @keyframes cfourToastProgress {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
}
