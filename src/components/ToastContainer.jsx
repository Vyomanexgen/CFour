import { useEffect } from "react";
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from "lucide-react";

export default function ToastContainer({ toasts, removeToast }) {
  return (
    <div className="fixed top-24 right-4 z-[9999] flex flex-col gap-3 w-full max-w-sm pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
}

function ToastItem({ toast, onClose }) {
  const { message, type } = toast;

  // Premium dark-glassmorphism and color-accented side borders matching the Cfour brand theme
  const config = {
    success: {
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />,
      border: "border-t border-b border-r border-neutral-800/80 border-l-4 border-l-emerald-500",
      bg: "bg-[#161616]/95",
      text: "text-white",
      progressBg: "bg-emerald-500",
    },
    error: {
      icon: <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />,
      border: "border-t border-b border-r border-neutral-800/80 border-l-4 border-l-rose-500",
      bg: "bg-[#161616]/95",
      text: "text-white",
      progressBg: "bg-rose-500",
    },
    warning: {
      icon: <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />,
      border: "border-t border-b border-r border-neutral-800/80 border-l-4 border-l-amber-500",
      bg: "bg-[#161616]/95",
      text: "text-white",
      progressBg: "bg-amber-500",
    },
    info: {
      icon: <Info className="w-5 h-5 text-red-500 flex-shrink-0" />,
      border: "border-t border-b border-r border-neutral-800/80 border-l-4 border-l-red-600",
      bg: "bg-[#161616]/95",
      text: "text-white",
      progressBg: "bg-red-655",
    },
  }[type] || config.info;

  return (
    <div
      className={`
        pointer-events-auto
        flex items-start gap-3.5
        w-full p-4 rounded-2xl
        ${config.border} ${config.bg} ${config.text}
        backdrop-blur-md shadow-2xl
        transform transition-all duration-300 translate-x-0 opacity-100
        animate-slide-in
        relative overflow-hidden
      `}
      style={{
        animation: "toastSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      }}
    >
      {/* Icon */}
      <div className="mt-0.5">{config.icon}</div>

      {/* Message */}
      <div className="flex-1 text-sm font-medium leading-relaxed pr-6 text-left">
        {message}
      </div>

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-3.5 right-3.5 p-0.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-current opacity-60 hover:opacity-100 cursor-pointer border-none bg-transparent flex items-center justify-center"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Progress Bar Animation */}
      <div className="absolute bottom-0 left-0 h-1 w-full bg-black/5">
        <div
          className={`h-full ${config.progressBg} transition-all ease-linear`}
          style={{
            animation: "toastProgress 4s linear forwards",
          }}
        />
      </div>

      {/* Embedded slide-in animation styles */}
      <style>{`
        @keyframes toastSlideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes toastProgress {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
}
