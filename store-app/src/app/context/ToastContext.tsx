"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ToastData {
  id: number;
  title: string;
  message: string;
}

interface ToastContextType {
  toasts: ToastData[];
  showToast: (title: string, message: string, duration?: number) => void;
  removeToast: (id: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

/**
 * The ToastProvider component wraps the children in a ToastContext.Provider
 * and renders the children.
 *
 * The ToastProvider component is used to provide a ToastContext to
 * components that need to show toast messages.
 *
 * @example
 * <ToastProvider>
 *   <MyComponent />
 * </ToastProvider>
 * @prop {ReactNode} children The children to be rendered.
 */
export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const showToast = (title: string, message: string, duration = 3000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, title, message }]);

    setTimeout(() => removeToast(id), duration);
  };


  /**
   * Removes a toast message from the list of toast messages to be shown.
   * @param {number} id The id of the toast message to be removed.
   */
  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};

/**
 * Hook to get the current toast messages and functions to show and hide them.
 *
 * @returns {{ toasts: ToastData[]; showToast: (title: string, message: string, duration?: number) => void; removeToast: (id: number) => void }}
 * @throws {Error} If this hook is used outside of a ToastProvider.
 */
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
