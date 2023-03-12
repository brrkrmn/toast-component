import React from "react";
import useKeydown from "../../hooks/use-keydown";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  const handleEscape = React.useCallback(() => {
    setToasts([]);
  })

  useKeydown('Escape', handleEscape);

  function createToast(message, variant) {
    const nextToast = {message, variant, id: crypto.randomUUID(),};
    const nextToasts = [...toasts, nextToast];
    setToasts(nextToasts);
  }

  function handleDismiss(id) {
    const nextToasts = toasts.filter(toast => {
      return (toast.id !== id);
    })
    setToasts(nextToasts);
  }
  
  return (
    <ToastContext.Provider value={{ toasts, createToast, handleDismiss }}>
      {children}
    </ToastContext.Provider>
  )
}

export default ToastProvider;
