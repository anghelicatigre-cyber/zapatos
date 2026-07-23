import React, { useState } from 'react';
import { Sneaker, ColorVariant } from '../types';
import { Star, Heart, Eye, ShoppingBag, Check } from 'lucide-react';

interface ProductCardProps {
  sneaker: Sneaker;
  isWishlisted: boolean;
  onToggleWishlist: (sneaker: Sneaker) => void;
  onQuickView: (sneaker: Sneaker) => void;
  onAddToCart: (sneaker: Sneaker, size: number, color: ColorVariant) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  sneaker,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
}) => {
  const [selectedColor, setSelectedColor] = useState<ColorVariant>(
    sneaker.colorVariants[0] || { name: 'Standard', hex: '#FF1E27', image: sneaker.mainImage }
  );
  const [selectedSize, setSelectedSize] = useState<number>(sneaker.availableSizes[2] || 9);
  const [sizePickerOpen, setSizePickerOpen] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(sneaker, selectedSize, selectedColor);
    setAdded(true);
    setSizePickerOpen(false);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div 
      id={`product-card-${sneaker.id}`}
      className="bg-[#1C1C1E] rounded-2xl border border-white/5 overflow-hidden flex flex-col justify-between group hover:border-[#FF1E27]/40 transition-all duration-300 hover:shadow-xl hover:shadow-[#FF1E27]/5 relative"
    >
      
      {/* Top Image Container */}
      <div 
        onClick={() => onQuickView(sneaker)}
        className="relative aspect-4/3 bg-[#0B0B0B] p-4 flex items-center justify-center overflow-hidden cursor-pointer"
      >
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
          <span className="bg-[#0B0B0B]/80 backdrop-blur-md text-[#8E8E93] group-hover:text-white border border-white/10 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider font-mono">
            {sneaker.brand}
          </span>
          {sneaker.isNew && (
            <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-black px-2 py-0.5 rounded uppercase">
              NEW DROP
            </span>
          )}
          {sneaker.isSale && (
            <span className="bg-[#FF1E27] text-white text-[10px] font-black px-2 py-0.5 rounded uppercase shadow-md">
              SALE
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(sneaker);
          }}
          className={`absolute top-3 right-3 z-10 p-2 rounded-xl transition-all duration-200 border ${
            isWishlisted
              ? 'bg-[#FF1E27] text-white border-[#FF1E27]'
              : 'bg-[#0B0B0B]/80 text-[#8E8E93] hover:text-white border-white/10 hover:bg-[#1C1C1E]'
          }`}
          aria-label="Add to Wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Shoe Image */}
        <img
          src={selectedColor.image || sneaker.mainImage}
          alt={sneaker.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
        />

        {/* Quick View Hover Trigger */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center p-4 backdrop-blur-[2px]">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(sneaker);
            }}
            className="bg-white/90 hover:bg-white text-black font-bold text-xs py-2.5 px-4 rounded-xl flex items-center gap-2 uppercase tracking-wider shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-200"
          >
            <Eye className="w-4 h-4" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3 text-left">
        
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1 mb-1">
            <div className="flex text-[#FF1E27]">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(sneaker.rating) ? 'fill-current' : 'text-zinc-700'
                  }`}
                />
              ))}
            </div>
            <span className="text-[11px] font-bold text-white ml-1">{sneaker.rating}</span>
            <span className="text-[10px] text-[#8E8E93]">({sneaker.reviewCount})</span>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onQuickView(sneaker)}
            className="text-sm font-bold text-white group-hover:text-[#FF1E27] transition-colors line-clamp-1 cursor-pointer"
          >
            {sneaker.name}
          </h3>

          {/* Price */}
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-base font-black text-white">${sneaker.price.toFixed(2)}</span>
            {sneaker.originalPrice && (
              <span className="text-xs text-[#8E8E93] line-through font-mono">
                ${sneaker.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        {/* Color Variant Dots */}
        <div className="flex items-center justify-between pt-1 border-t border-white/5">
          <div className="flex items-center gap-1.5">
            {sneaker.colorVariants.map((variant) => (
              <button
                key={variant.name}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedColor(variant);
                }}
                className={`w-4 h-4 rounded-full border transition-transform ${
                  selectedColor.name === variant.name ? 'border-[#FF1E27] scale-125' : 'border-white/20 opacity-70'
                }`}
                style={{ backgroundColor: variant.hex }}
                title={variant.name}
              />
            ))}
          </div>

          <span className="text-[10px] text-[#8E8E93] font-mono">
            {sneaker.stockCount < 10 ? (
              <span className="text-[#FF1E27] font-bold">Only {sneaker.stockCount} left</span>
            ) : (
              'In Stock'
            )}
          </span>
        </div>

        {/* Size Picker Dropdown or Quick Add */}
        <div className="pt-2 relative">
          {sizePickerOpen ? (
            <div className="bg-[#0B0B0B] border border-white/10 p-2.5 rounded-xl space-y-2 animate-in fade-in duration-150">
              <div className="flex justify-between items-center text-[10px] font-bold text-[#8E8E93] font-mono">
                <span>SELECT SIZE:</span>
                <button 
                  onClick={() => setSizePickerOpen(false)}
                  className="text-white hover:text-[#FF1E27]"
                >
                  ✕
                </button>
              </div>
              <div className="grid grid-cols-4 gap-1">
                {sneaker.availableSizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`py-1 rounded text-[10px] font-bold border transition-colors ${
                      selectedSize === sz
                        ? 'bg-[#FF1E27] text-white border-[#FF1E27]'
                        : 'bg-[#1C1C1E] text-white/80 border-white/5 hover:border-white/20'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
              <button
                onClick={handleAdd}
                className="w-full bg-[#FF1E27] hover:bg-[#e01922] text-white text-xs font-bold py-2 rounded-lg transition-colors uppercase tracking-wider flex items-center justify-center gap-1"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Confirm US {selectedSize} — Add</span>
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => setSizePickerOpen(true)}
                className="bg-[#0B0B0B] hover:bg-black text-[#8E8E93] hover:text-white border border-white/10 px-2.5 py-2 rounded-xl text-xs font-mono font-bold transition-colors"
                title="Change Size"
              >
                US {selectedSize}
              </button>
              <button
                onClick={handleAdd}
                className={`flex-1 font-bold text-xs py-2 px-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 uppercase tracking-wider ${
                  added
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#FF1E27] hover:bg-[#e01922] text-white active:scale-95 shadow-md shadow-[#FF1E27]/20'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Added</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add To Cart</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
