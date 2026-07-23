import React from 'react';
import { FilterState, Category } from '../types';
import { SlidersHorizontal, RotateCcw, Search } from 'lucide-react';

interface FilterBarProps {
  filters: FilterState;
  onUpdateFilters: (updated: Partial<FilterState>) => void;
  onResetFilters: () => void;
  totalResults: number;
}

const CATEGORIES: Category[] = ['All', 'Men', 'Women', 'Unisex', 'Limited Drop'];
const SIZES = [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13];

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onUpdateFilters,
  onResetFilters,
  totalResults,
}) => {
  const toggleSize = (size: number) => {
    const current = filters.selectedSizes;
    if (current.includes(size)) {
      onUpdateFilters({ selectedSizes: current.filter((s) => s !== size) });
    } else {
      onUpdateFilters({ selectedSizes: [...current, size] });
    }
  };

  const isFiltered =
    filters.category !== 'All' ||
    filters.searchQuery !== '' ||
    filters.selectedSizes.length > 0 ||
    filters.onlySale ||
    filters.onlyNew ||
    filters.maxPrice < 300;

  return (
    <div className="bg-[#1C1C1E] border border-white/5 rounded-2xl p-4 sm:p-6 mb-8 space-y-5 shadow-xl">
      
      {/* Top Header & Search Input */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between border-b border-white/5 pb-4">
        
        {/* Search Field */}
        <div className="relative flex-1 w-full max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8E8E93]" />
          <input
            type="text"
            placeholder="Search model, colorway, SKU (e.g. Air Jordan, Dunk)..."
            value={filters.searchQuery}
            onChange={(e) => onUpdateFilters({ searchQuery: e.target.value })}
            className="w-full bg-[#0B0B0B] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-[#8E8E93] focus:outline-none focus:border-[#FF1E27] transition-colors font-medium"
          />
        </div>

        {/* Results Counter & Sort */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
          <div className="text-xs text-[#8E8E93]">
            Showing <span className="text-white font-bold">{totalResults}</span> pairs
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-[#FF1E27]" />
            <select
              value={filters.sortBy}
              onChange={(e) => onUpdateFilters({ sortBy: e.target.value as FilterState['sortBy'] })}
              className="bg-[#0B0B0B] border border-white/10 text-white text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none focus:border-[#FF1E27] font-mono cursor-pointer"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest Drops</option>
            </select>
          </div>
        </div>

      </div>

      {/* Category Pills & Quick Toggles */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        
        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onUpdateFilters({ category: cat })}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                filters.category === cat
                  ? 'bg-[#FF1E27] text-white shadow-md shadow-[#FF1E27]/20'
                  : 'bg-[#0B0B0B] text-[#8E8E93] hover:text-white border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sale / New Badges */}
        <div className="flex items-center gap-2 text-xs">
          <label className={`cursor-pointer px-3 py-1.5 rounded-xl border font-bold flex items-center gap-1.5 transition-colors ${
            filters.onlySale ? 'bg-[#FF1E27]/20 border-[#FF1E27] text-[#FF1E27]' : 'bg-[#0B0B0B] border-white/5 text-[#8E8E93]'
          }`}>
            <input
              type="checkbox"
              checked={filters.onlySale}
              onChange={(e) => onUpdateFilters({ onlySale: e.target.checked })}
              className="sr-only"
            />
            <span>On Sale</span>
          </label>

          <label className={`cursor-pointer px-3 py-1.5 rounded-xl border font-bold flex items-center gap-1.5 transition-colors ${
            filters.onlyNew ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' : 'bg-[#0B0B0B] border-white/5 text-[#8E8E93]'
          }`}>
            <input
              type="checkbox"
              checked={filters.onlyNew}
              onChange={(e) => onUpdateFilters({ onlyNew: e.target.checked })}
              className="sr-only"
            />
            <span>New Releases</span>
          </label>

          {isFiltered && (
            <button
              onClick={onResetFilters}
              className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs flex items-center gap-1 font-mono transition-colors ml-2"
              title="Reset Filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}
        </div>

      </div>

      {/* Sizes Strip */}
      <div className="pt-2 border-t border-white/5 flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-bold text-[#8E8E93] uppercase font-mono mr-2">US Size:</span>
        {SIZES.map((size) => {
          const selected = filters.selectedSizes.includes(size);
          return (
            <button
              key={size}
              onClick={() => toggleSize(size)}
              className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                selected
                  ? 'bg-[#FF1E27] text-white border border-[#FF1E27]'
                  : 'bg-[#0B0B0B] text-[#8E8E93] hover:text-white border border-white/5'
              }`}
            >
              {size}
            </button>
          );
        })}
      </div>

    </div>
  );
};
