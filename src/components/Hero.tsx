import React, { useState } from 'react';
import { ShoppingBag, ArrowRight, Star, ShieldCheck, Flame, Check, Zap } from 'lucide-react';
import { Sneaker, ColorVariant } from '../types';

interface HeroProps {
  featuredSneaker: Sneaker;
  onAddToCart: (sneaker: Sneaker, size: number, color: ColorVariant) => void;
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  featuredSneaker,
  onAddToCart,
  onExploreClick,
}) => {
  const [selectedColor, setSelectedColor] = useState<ColorVariant>(
    featuredSneaker.colorVariants[0] || { name: 'Cyber Red', hex: '#FF1E27', image: featuredSneaker.mainImage }
  );
  const [selectedSize, setSelectedSize] = useState<number>(10);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(featuredSneaker, selectedSize, selectedColor);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <section className="relative overflow-hidden bg-[#0B0B0B] pt-8 pb-16 lg:py-20 border-b border-[#1C1C1E]">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#FF1E27]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-20 right-10 w-[350px] h-[350px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Bold Tagline & Details */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 bg-[#1C1C1E] border border-[#FF1E27]/30 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#FF1E27] tracking-wider uppercase">
              <Flame className="w-4 h-4 fill-[#FF1E27]" />
              <span>NEW DROP 2026 • LIMITED STOCK</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white uppercase tracking-tight leading-none font-sans">
                STEP INTO <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF1E27] via-red-500 to-white">
                  THE FUTURE
                </span>
              </h1>
              <p className="text-base sm:text-lg text-[#8E8E93] max-w-xl font-normal leading-relaxed pt-2">
                {featuredSneaker.description}
              </p>
            </div>

            {/* Price & Rating Row */}
            <div className="flex items-center gap-6 pt-2">
              <div>
                <span className="text-xs text-[#8E8E93] uppercase tracking-widest block font-mono">Vault Price</span>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-black text-white">${featuredSneaker.price.toFixed(2)}</span>
                  {featuredSneaker.originalPrice && (
                    <span className="text-lg text-[#8E8E93] line-through font-mono">
                      ${featuredSneaker.originalPrice.toFixed(2)}
                    </span>
                  )}
                  <span className="bg-[#FF1E27]/20 text-[#FF1E27] border border-[#FF1E27]/40 text-xs font-black px-2 py-0.5 rounded">
                    SAVE 15%
                  </span>
                </div>
              </div>

              <div className="h-10 w-px bg-[#1C1C1E]" />

              <div>
                <span className="text-xs text-[#8E8E93] uppercase tracking-widest block font-mono">Rating</span>
                <div className="flex items-center gap-1.5 mt-1">
                  <div className="flex text-[#FF1E27]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-white">4.9</span>
                  <span className="text-xs text-[#8E8E93]">({featuredSneaker.reviewCount})</span>
                </div>
              </div>
            </div>

            {/* Color Variant Chooser */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold text-white uppercase tracking-widest block font-mono">
                COLORWAY: <span className="text-[#FF1E27]">{selectedColor.name}</span>
              </span>
              <div className="flex items-center gap-3">
                {featuredSneaker.colorVariants.map((variant) => (
                  <button
                    key={variant.name}
                    onClick={() => setSelectedColor(variant)}
                    className={`p-1 rounded-full transition-all duration-200 border-2 ${
                      selectedColor.name === variant.name ? 'border-[#FF1E27] scale-110' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                    title={variant.name}
                  >
                    <span
                      className="w-6 h-6 rounded-full block shadow-inner"
                      style={{ backgroundColor: variant.hex }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Size Selector */}
            <div className="space-y-2 pt-1">
              <div className="flex justify-between items-center max-w-md">
                <span className="text-xs font-bold text-white uppercase tracking-widest font-mono">SELECT SIZE (US MEN)</span>
                <span className="text-xs text-[#8E8E93] underline cursor-pointer hover:text-white">Size Guide</span>
              </div>
              <div className="flex flex-wrap gap-2 max-w-md">
                {featuredSneaker.availableSizes.slice(0, 8).map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-10 h-10 rounded-xl font-bold text-xs transition-all duration-200 border ${
                      selectedSize === size
                        ? 'bg-[#FF1E27] text-white border-[#FF1E27] shadow-md shadow-[#FF1E27]/30'
                        : 'bg-[#1C1C1E] text-white/80 border-white/5 hover:border-white/20'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA Buttons Row */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={handleAddToCart}
                id="hero-add-to-cart-btn"
                className={`flex-1 sm:flex-initial px-8 py-4 rounded-xl font-black text-sm tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-3 shadow-xl ${
                  added 
                    ? 'bg-emerald-600 text-white shadow-emerald-600/30' 
                    : 'bg-[#FF1E27] hover:bg-[#e01922] text-white shadow-[#FF1E27]/30 active:scale-95'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Added To Cart</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>Shop Collection — ${featuredSneaker.price.toFixed(2)}</span>
                  </>
                )}
              </button>

              <button
                onClick={onExploreClick}
                id="hero-explore-btn"
                className="px-6 py-4 rounded-xl bg-[#1C1C1E] hover:bg-[#2C2C2E] text-white font-bold text-sm tracking-wider uppercase border border-white/10 flex items-center justify-center gap-2 transition-colors"
              >
                <span>Browse All Sneakers</span>
                <ArrowRight className="w-4 h-4 text-[#8E8E93]" />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-[#1C1C1E]">
              <div className="flex items-center gap-2 text-xs text-[#8E8E93]">
                <ShieldCheck className="w-4 h-4 text-[#FF1E27]" />
                <span>100% Authentic Pair</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#8E8E93]">
                <Zap className="w-4 h-4 text-[#FF1E27]" />
                <span>Express Dispatch</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#8E8E93]">
                <Flame className="w-4 h-4 text-[#FF1E27]" />
                <span>30-Day Easy Returns</span>
              </div>
            </div>

          </div>

          {/* Right Column: High Impact Sneaker Display */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            
            {/* Visual Backdrop Card */}
            <div className="relative w-full max-w-lg bg-gradient-to-b from-[#1C1C1E] to-[#0B0B0B] p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl group">
              
              {/* Floating Badges */}
              <div className="absolute top-6 left-6 z-20 bg-[#0B0B0B]/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-xs font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF1E27] animate-ping" />
                <span>NIKE AIR MAX PULSE</span>
              </div>

              <div className="absolute top-6 right-6 z-20 bg-[#FF1E27] text-white text-[11px] font-black px-3 py-1 rounded-full shadow-lg tracking-wider">
                FLAGSHIP DROP
              </div>

              {/* Main Image with floating hover effect */}
              <div className="relative my-6 aspect-4/3 flex items-center justify-center overflow-hidden rounded-2xl bg-black/40 border border-white/5">
                <img
                  src={selectedColor.image || featuredSneaker.mainImage}
                  alt={featuredSneaker.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Bottom Specs Strip */}
              <div className="bg-[#0B0B0B]/90 p-4 rounded-2xl border border-white/5 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[#8E8E93] block font-mono text-[10px]">CUSHIONING</span>
                  <span className="font-bold text-white">Point-Loaded Air System</span>
                </div>
                <div className="text-right">
                  <span className="text-[#8E8E93] block font-mono text-[10px]">SKU CODE</span>
                  <span className="font-bold text-[#FF1E27] font-mono">{featuredSneaker.sku}</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
