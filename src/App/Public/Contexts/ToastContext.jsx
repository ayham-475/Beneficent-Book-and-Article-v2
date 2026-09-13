import React, { createContext, useContext, useState, useCallback } from 'react';
import ModernToast from '../Components/ModernToast';

export const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((type, message, title = '', duration = 4000) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    const newToast = { id, type, message, title, duration };

    setToasts((prev) => [...prev.slice(-3), newToast]); // Keep max 4 toasts simultaneously

    setTimeout(() => {
      dismissToast(id);
    }, duration);

    return id;
  }, [dismissToast]);

  // دالة متوافقة مع الكود القديم
  const showHideToast = useCallback((message, type = 'success') => {
    addToast(type, message);
  }, [addToast]);

  const toast = {
    success: (msg, title) => addToast('success', msg, title),
    error: (msg, title) => addToast('error', msg, title),
    warning: (msg, title) => addToast('warning', msg, title),
    info: (msg, title) => addToast('info', msg, title),
    dismiss: dismissToast
  };

  return (
    <ToastContext.Provider value={{ toast, showHideToast }}>
      {children}
      <ModernToast toasts={toasts} onDismiss={dismissToast} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    // Fallback if rendered outside provider
    return {
      toast: {
        success: (m) => console.log('Toast success:', m),
        error: (m) => console.error('Toast error:', m),
        warning: (m) => console.warn('Toast warning:', m),
        info: (m) => console.info('Toast info:', m),
      },
      showHideToast: (m) => console.log('Toast:', m)
    };
  }
  return context;
};
