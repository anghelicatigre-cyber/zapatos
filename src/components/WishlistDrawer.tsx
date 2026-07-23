import React from 'react';
import { Sneaker, ColorVariant } from '../types';
import { X, Heart, Trash2, ShoppingBag } from 'lucide-react';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistSneakers: Sneaker[];
  onRemoveWishlist: (sneaker: Sneaker) => void;
  onAddToCart: (sneaker: Sneaker, size: number, color: ColorVariant) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistSneakers,
  onRemoveWishlist,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
      
      <div className="flex-1 cursor-pointer" onClick={onClose} />

      <div className="bg-[#0B0B0B] border-l border-[#1C1C1E] w-full max-w-md h-full flex flex-col justify-between shadow-2xl text-white relative animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-5 border-b border-[#1C1C1E] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#FF1E27] fill-current" />
            <h2 className="text-lg font-black uppercase tracking-wider">SAVED GRAILS</h2>
            <span className="bg-[#1C1C1E] text-white text-xs font-bold px-2 py-0.5 rounded-full font-mono">
              {wishlistSneakers.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#1C1C1E] text-[#8E8E93] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {wishlistSneakers.length === 0 ? (
            <div className="text-center py-16 space-y-4 text-[#8E8E93]">
              <Heart className="w-12 h-12 mx-auto text-[#1C1C1E]" />
              <p className="text-sm font-bold text-white">Your Wishlist is empty</p>
              <p className="text-xs max-w-xs mx-auto">Tap the heart icon on any sneaker to save it to your personal vault favorites.</p>
            </div>
          ) : (
            wishlistSneakers.map((sneaker) => (
              <div
                key={sneaker.id}
                className="bg-[#1C1C1E] border border-white/5 p-3.5 rounded-2xl flex gap-3 items-center relative"
              >
                <img
                  src={sneaker.mainImage}
                  alt={sneaker.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 object-cover rounded-xl bg-[#0B0B0B]"
                />

                <div className="flex-1 min-w-0 text-left space-y-1">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-mono text-[#8E8E93] uppercase">{sneaker.brand}</span>
                    <button
                      onClick={() => onRemoveWishlist(sneaker)}
                      className="text-[#8E8E93] hover:text-[#FF1E27] p-1"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <h4 className="text-xs font-bold text-white truncate">{sneaker.name}</h4>
                  <div className="flex justify-between items-center pt-1">
                    <span className="text-xs font-black text-[#FF1E27]">${sneaker.price.toFixed(2)}</span>
                    <button
                      onClick={() => {
                        onAddToCart(sneaker, sneaker.availableSizes[2] || 9, sneaker.colorVariants[0]);
                        onRemoveWishlist(sneaker);
                      }}
                      className="bg-[#FF1E27] hover:bg-[#e01922] text-white text-[10px] font-bold py-1.5 px-3 rounded-lg uppercase tracking-wider flex items-center gap-1"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Move to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
