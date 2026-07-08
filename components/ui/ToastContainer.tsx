"use client";

import { useToastStore } from "@/store/toastStore";
import { CheckCircle2, Info, XCircle, X } from "lucide-react";

export function ToastContainer() {
  const toasts = useToastStore((state) => state.toasts);
  const removeToast = useToastStore((state) => state.removeToast);

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast) => (
        <div 
          key={toast.id} 
          className="pointer-events-auto flex items-start gap-3 bg-white border border-gray-100 shadow-xl shadow-black/5 rounded-xl p-4 min-w-[280px] max-w-sm animate-in slide-in-from-bottom-5 fade-in duration-300"
        >
          {toast.type === 'success' && <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />}
          {toast.type === 'info' && <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />}
          {toast.type === 'error' && <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />}
          
          <p className="text-sm font-medium text-gray-800 flex-1 leading-snug">
            {toast.message}
          </p>
          
          <button 
            onClick={() => removeToast(toast.id)} 
            className="text-gray-400 hover:text-gray-600 transition-colors shrink-0"
            aria-label="Close notification"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
