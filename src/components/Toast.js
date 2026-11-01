import React, { useEffect } from 'react';
import { IconUndo } from './icons';

// Small message at the bottom-right. Disappears after 5 seconds.
function Toast({ toast, onDismiss }) {
  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(onDismiss, 5000);
    return () => clearTimeout(timer);
  }, [toast, onDismiss]);

  if (!toast) return null;

  return (
    <div className="toast" role="status">
      <span>{toast.message}</span>
      {toast.onAction && (
        <button
          type="button"
          className="toast-action"
          onClick={() => {
            toast.onAction();
            onDismiss();
          }}
        >
          <IconUndo />
          {toast.actionLabel}
        </button>
      )}
    </div>
  );
}

export default Toast;
