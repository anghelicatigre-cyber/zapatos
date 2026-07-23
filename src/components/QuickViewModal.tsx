import React, { useState } from 'react';
import { Sneaker, ColorVariant } from '../types';
import { X, Star, ShoppingBag, ShieldCheck, Truck, Check, Heart, Sparkles } from 'lucide-react';

interface QuickViewModalProps {
  sneaker: Sneaker | null;
  onClose: () => void;
  onAddToCart: (sneaker: Sneaker, size: number, color: ColorVariant, quantity?: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (sneaker: Sneaker) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  sneaker,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  if (!sneaker) return null;

  const [selectedColor, setSelectedColor] = useState<ColorVariant>(
    sneaker.colorVariants[0] || { name: 'Standard', hex: '#FF1E27', image: sneaker.mainImage }
  );
  const [selectedSize, setSelectedSize] = useState<number>(sneaker.availableSizes[2] || 9);
  const [quantity, setQuantity] = useState<number>(1);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'reviews'>('details');

  const handleAdd = () => {
    onAddToCart(sneaker, selectedSize, selectedColor, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#1C1C1E] border border-white/10 rounded-3xl max-w-3xl w-full relative overflow-hidden shadow-2xl text-white my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          id="quickview-close-btn"
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-[#0B0B0B]/80 text-[#8E8E93] hover:text-white hover:bg-[#FF1E27] transition-colors border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left: Product Media Gallery */}
          <div className="bg-[#0B0B0B] p-6 flex flex-col justify-between items-center relative border-b md:border-b-0 md:border-r border-white/5">
            <div className="w-full flex justify-between items-center mb-4 text-xs">
              <span className="bg-[#FF1E27]/20 text-[#FF1E27] border border-[#FF1E27]/40 px-2.5 py-1 rounded-full font-bold uppercase font-mono">
                {sneaker.brand}
              </span>
              <span className="text-[#8E8E93] font-mono">SKU: {sneaker.sku}</span>
            </div>

            <div className="relative aspect-square w-full max-w-xs flex items-center justify-center my-4">
              <img
                src={selectedColor.image || sneaker.mainImage}
                alt={sneaker.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-2xl shadow-lg"
              />
            </div>

            {/* Thumbnail color selectors */}
            <div className="w-full pt-4 border-t border-white/5 flex items-center justify-center gap-2">
              <span className="text-[10px] text-[#8E8E93] uppercase font-mono mr-2">Colorways:</span>
              {sneaker.colorVariants.map((v) => (
                <button
                  key={v.name}
                  onClick={() => setSelectedColor(v)}
                  className={`p-1 rounded-full border transition-all ${
                    selectedColor.name === v.name ? 'border-[#FF1E27] scale-110' : 'border-white/10 opacity-60'
                  }`}
                  style={{ backgroundColor: v.hex }}
                  title={v.name}
                >
                  <span className="w-4 h-4 rounded-full block" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Customization & Checkout */}
          <div className="p-6 space-y-5 text-left flex flex-col justify-between">
            
            <div className="space-y-3">
              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex text-[#FF1E27]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-bold text-white">{sneaker.rating}</span>
                <span className="text-xs text-[#8E8E93]">({sneaker.reviewCount} reviews)</span>
              </div>

              {/* Title & Price */}
              <h2 className="text-2xl font-black text-white uppercase tracking-tight">{sneaker.name}</h2>

              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-black text-[#FF1E27]">${sneaker.price.toFixed(2)}</span>
                {sneaker.originalPrice && (
                  <span className="text-sm text-[#8E8E93] line-through font-mono">
                    ${sneaker.originalPrice.toFixed(2)}
                  </span>
                )}
                <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded">
                  In Stock ({sneaker.stockCount} left)
                </span>
              </div>

              {/* Description / Tabs */}
              <div className="flex gap-4 border-b border-white/10 text-xs font-bold pb-1">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`pb-1 ${activeTab === 'details' ? 'text-[#FF1E27] border-b-2 border-[#FF1E27]' : 'text-[#8E8E93]'}`}
                >
                  SPECIFICATIONS
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`pb-1 ${activeTab === 'reviews' ? 'text-[#FF1E27] border-b-2 border-[#FF1E27]' : 'text-[#8E8E93]'}`}
                >
                  REVIEWS ({sneaker.reviews?.length || 0})
                </button>
              </div>

              {activeTab === 'details' ? (
                <p className="text-xs text-[#8E8E93] leading-relaxed max-h-24 overflow-y-auto">
                  {sneaker.description}
                </p>
              ) : (
                <div className="space-y-2 max-h-24 overflow-y-auto text-xs">
                  {sneaker.reviews && sneaker.reviews.length > 0 ? (
                    sneaker.reviews.map((rev) => (
                      <div key={rev.id} className="bg-[#0B0B0B] p-2.5 rounded-xl border border-white/5 space-y-1">
                        <div className="flex justify-between items-center font-bold">
                          <span>{rev.userName}</span>
                          <span className="text-[10px] text-[#FF1E27] font-mono">★ {rev.rating}.0</span>
                        </div>
                        <p className="text-[#8E8E93] text-[11px]">{rev.comment}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-[#8E8E93] text-xs italic">No reviews yet. Be the first collector to review!</p>
                  )}
                </div>
              )}

              {/* Size Selector */}
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-xs font-bold font-mono">
                  <span>SELECT US SIZE:</span>
                  <span className="text-[#FF1E27]">{selectedSize} US</span>
                </div>
                <div className="grid grid-cols-6 gap-1.5">
                  {sneaker.availableSizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                        selectedSize === s
                          ? 'bg-[#FF1E27] text-white border-[#FF1E27]'
                          : 'bg-[#0B0B0B] text-[#8E8E93] border-white/5 hover:border-white/20'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Picker */}
              <div className="flex items-center gap-4 pt-2">
                <span className="text-xs font-bold font-mono text-[#8E8E93]">QTY:</span>
                <div className="flex items-center bg-[#0B0B0B] border border-white/10 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-white hover:bg-white/10 font-bold"
                  >
                    -
                  </button>
                  <span className="px-3 py-1.5 text-xs font-bold font-mono">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 text-white hover:bg-white/10 font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

            </div>

            {/* Action Row */}
            <div className="space-y-3 pt-4 border-t border-white/5">
              <div className="flex gap-3">
                <button
                  onClick={handleAdd}
                  className={`flex-1 font-bold text-xs py-3.5 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 uppercase tracking-wider ${
                    added ? 'bg-emerald-600 text-white' : 'bg-[#FF1E27] hover:bg-[#e01922] text-white'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Vault Cart</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Cart — ${(sneaker.price * quantity).toFixed(2)}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => onToggleWishlist(sneaker)}
                  className={`p-3.5 rounded-xl border transition-colors ${
                    isWishlisted ? 'bg-[#FF1E27] text-white border-[#FF1E27]' : 'bg-[#0B0B0B] text-[#8E8E93] hover:text-white border-white/10'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#8E8E93] pt-1 font-mono">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-[#FF1E27]" /> Free Express Shipping
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Authenticity Verified
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
