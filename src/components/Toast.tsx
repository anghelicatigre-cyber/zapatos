import React from 'react';
import { ToastMessage } from '../types';
import { ShoppingBag, Heart, Check, X } from 'lucide-react';

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 space-y-2 pointer-events-none max-w-sm w-full">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-[#1C1C1E] border border-white/10 rounded-2xl p-4 shadow-2xl text-white flex items-center justify-between gap-3 animate-in slide-in-from-bottom duration-200"
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl text-white ${
              toast.type === 'cart' ? 'bg-[#FF1E27]' : toast.type === 'wishlist' ? 'bg-pink-600' : 'bg-emerald-600'
            }`}>
              {toast.type === 'cart' ? (
                <ShoppingBag className="w-4 h-4" />
              ) : toast.type === 'wishlist' ? (
                <Heart className="w-4 h-4 fill-current" />
              ) : (
                <Check className="w-4 h-4" />
              )}
            </div>
            <div className="text-left">
              <h5 className="text-xs font-black uppercase">{toast.title}</h5>
              <p className="text-[11px] text-[#8E8E93]">{toast.message}</p>
            </div>
          </div>

          <button
            onClick={() => onDismiss(toast.id)}
            className="p-1 text-[#8E8E93] hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
