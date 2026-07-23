import React from 'react';
import { Sneaker, ColorVariant } from '../types';
import { ProductCard } from './ProductCard';
import { PackageX } from 'lucide-react';

interface ProductGridProps {
  sneakers: Sneaker[];
  wishlistIds: string[];
  onToggleWishlist: (sneaker: Sneaker) => void;
  onQuickView: (sneaker: Sneaker) => void;
  onAddToCart: (sneaker: Sneaker, size: number, color: ColorVariant) => void;
  onResetFilters: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  sneakers,
  wishlistIds,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
  onResetFilters,
}) => {
  if (sneakers.length === 0) {
    return (
      <div className="bg-[#1C1C1E] border border-white/5 rounded-3xl p-12 text-center my-8 max-w-lg mx-auto space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#0B0B0B] text-[#FF1E27] flex items-center justify-center mx-auto border border-white/10">
          <PackageX className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-white">No Sneakers Found</h3>
        <p className="text-xs text-[#8E8E93] leading-relaxed">
          We couldn't find any pair matching your exact search or active filters. Try adjusting your brand, size, or category parameters.
        </p>
        <button
          onClick={onResetFilters}
          className="bg-[#FF1E27] hover:bg-[#e01922] text-white font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition-colors inline-block"
        >
          Reset All Filters
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-6">
      {sneakers.map((sneaker) => (
        <ProductCard
          key={sneaker.id}
          sneaker={sneaker}
          isWishlisted={wishlistIds.includes(sneaker.id)}
          onToggleWishlist={onToggleWishlist}
          onQuickView={onQuickView}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};
