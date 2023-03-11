import React from "react";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  React.useEffect(() => {
    function handleKeyDown(event) {
      if (event.code === 'Escape') {
        setToasts([]);
      }
    }
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [])

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
