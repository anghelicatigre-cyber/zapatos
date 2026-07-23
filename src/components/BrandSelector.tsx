import React from 'react';
import { Brand } from '../types';
import { BRANDS } from '../data/sneakers';
import { Layers } from 'lucide-react';

interface BrandSelectorProps {
  activeBrand: Brand;
  onSelectBrand: (brand: Brand) => void;
  sneakerCountsByBrand: Record<string, number>;
}

export const BrandSelector: React.FC<BrandSelectorProps> = ({
  activeBrand,
  onSelectBrand,
  sneakerCountsByBrand,
}) => {
  return (
    <section className="bg-[#0B0B0B] py-8 border-b border-[#1C1C1E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#FF1E27]" />
            <h2 className="text-sm font-bold text-white uppercase tracking-widest font-mono">
              OFFICIAL BRAND VAULT
            </h2>
          </div>
          <p className="text-xs text-[#8E8E93]">Filter verified pairs by brand edition</p>
        </div>

        {/* Brand Badges Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {BRANDS.map((brandObj) => {
            const isActive = activeBrand === brandObj.name;
            const count = brandObj.name === 'All' 
              ? Object.values(sneakerCountsByBrand).reduce((a: number, b: number) => a + b, 0)
              : sneakerCountsByBrand[brandObj.name] || 0;

            return (
              <button
                key={brandObj.name}
                id={`brand-badge-${brandObj.name.toLowerCase()}`}
                onClick={() => onSelectBrand(brandObj.name)}
                className={`p-4 rounded-2xl border transition-all duration-200 text-left relative overflow-hidden group flex flex-col justify-between h-28 ${
                  isActive
                    ? 'bg-[#1C1C1E] border-[#FF1E27] shadow-lg shadow-[#FF1E27]/10'
                    : 'bg-[#1C1C1E]/50 border-white/5 hover:border-white/20 hover:bg-[#1C1C1E]'
                }`}
              >
                {/* Active Indicator Strip */}
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#FF1E27]" />
                )}

                <div className="flex justify-between items-start">
                  <span className={`text-lg font-black tracking-wider uppercase font-sans ${
                    isActive ? 'text-white' : 'text-[#8E8E93] group-hover:text-white'
                  }`}>
                    {brandObj.logoText}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full font-mono ${
                    isActive ? 'bg-[#FF1E27] text-white' : 'bg-[#0B0B0B] text-[#8E8E93]'
                  }`}>
                    {count}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] text-[#8E8E93] block truncate font-medium group-hover:text-white/80 transition-colors">
                    {brandObj.slogan}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
