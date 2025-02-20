"use client";
import { useToast } from "@/app/context/ToastContext";

/**
 * Component to display toast messages.
 *
 * This component displays a list of toast messages which can be
 * removed by clicking on the "X" button.
 *
 * @returns {JSX.Element} A JSX element representing the toast messages.
 */
const Toast = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed top-5 right-5 flex flex-col gap-3 z-50">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="bg-gray-800 text-white px-4 py-3 rounded-lg shadow-md flex items-center justify-between w-80 animate-slide-in"
        >
          <div>
            <strong className="block">{toast.title}</strong>
            <p className="text-sm">{toast.message}</p>
          </div>
          <button onClick={() => removeToast(toast.id)} className="ml-4">
            X
          </button>
        </div>
      ))}
    </div>
  );
};

export default Toast;
