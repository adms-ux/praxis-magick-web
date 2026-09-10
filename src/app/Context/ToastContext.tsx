"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

type ToastType = "success" | "error" | "info";

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  const showToast = (message: string, type: ToastType = "info") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500); // Desaparece solo a los 3.5 segundos
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-[300] transition-all duration-500 ease-out animate-bounce">
          <div className={`px-6 py-3 rounded-full border shadow-[0_0_20px_rgba(0,0,0,0.5)] text-sm font-sans flex items-center gap-3 backdrop-blur-xl
            ${toast.type === "error" ? "bg-red-950/90 border-red-500 text-red-200" : ""}
            ${toast.type === "success" ? "bg-green-950/90 border-green-500 text-green-200" : ""}
            ${toast.type === "info" ? "bg-purple-950/90 border-purple-500 text-purple-200" : ""}
          `}>
            {toast.type === "error" && <span>⚠️</span>}
            {toast.type === "success" && <span>✅</span>}
            {toast.type === "info" && <span>ℹ️</span>}
            {toast.message}
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast debe usarse dentro de ToastProvider");
  return context;
};