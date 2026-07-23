import React, { useState } from 'react';
import { Sneaker } from '../types';
import { Search, X, TrendingUp, ChevronRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  sneakers: Sneaker[];
  onSelectSneaker: (sneaker: Sneaker) => void;
}

const QUICK_TAGS = ['Air Jordan 1', 'Nike Dunk Low', 'Ultraboost', 'Puma RS-X', 'Air Max Pulse', 'Panda'];

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  sneakers,
  onSelectSneaker,
}) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');

  const filtered = query.trim()
    ? sneakers.filter(
        (s) =>
          s.name.toLowerCase().includes(query.toLowerCase()) ||
          s.brand.toLowerCase().includes(query.toLowerCase()) ||
          s.sku.toLowerCase().includes(query.toLowerCase()) ||
          s.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-start justify-center pt-16 sm:pt-24 px-4">
      
      <div className="bg-[#1C1C1E] border border-white/10 rounded-3xl max-w-2xl w-full text-white shadow-2xl relative overflow-hidden animate-in fade-in duration-200">
        
        {/* Search Header */}
        <div className="p-4 border-b border-white/10 flex items-center gap-3">
          <Search className="w-5 h-5 text-[#FF1E27]" />
          <input
            type="text"
            autoFocus
            placeholder="Search Nike, Air Jordan, Yeezy style, Dunk, Samba..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm font-medium text-white placeholder-[#8E8E93] focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-[#0B0B0B] text-[#8E8E93] hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Tag Pills */}
        <div className="p-4 bg-[#0B0B0B] border-b border-white/5 space-y-2">
          <div className="flex items-center gap-1.5 text-xs text-[#8E8E93] font-mono">
            <TrendingUp className="w-3.5 h-3.5 text-[#FF1E27]" />
            <span>POPULAR SEARCHES:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {QUICK_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="bg-[#1C1C1E] hover:bg-white/10 text-white/90 text-xs px-3 py-1 rounded-xl border border-white/5 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Results List */}
        <div className="p-4 max-h-96 overflow-y-auto space-y-2">
          {!query.trim() ? (
            <div className="text-center py-8 text-[#8E8E93] text-xs font-mono">
              Start typing model, brand, or colorway to query the vault.
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-8 text-[#8E8E93] text-xs font-mono">
              No sneakers found for "{query}". Try "Jordan", "Nike", or "Red".
            </div>
          ) : (
            filtered.map((sneaker) => (
              <div
                key={sneaker.id}
                onClick={() => {
                  onSelectSneaker(sneaker);
                  onClose();
                }}
                className="bg-[#0B0B0B] hover:bg-[#2C2C2E] p-3 rounded-2xl border border-white/5 flex items-center justify-between cursor-pointer group transition-colors"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={sneaker.mainImage}
                    alt={sneaker.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 object-cover rounded-xl"
                  />
                  <div className="text-left">
                    <span className="text-[10px] font-mono text-[#FF1E27] uppercase">{sneaker.brand}</span>
                    <h4 className="text-xs font-bold text-white group-hover:text-[#FF1E27] transition-colors">
                      {sneaker.name}
                    </h4>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-black text-white">${sneaker.price.toFixed(2)}</span>
                  <ChevronRight className="w-4 h-4 text-[#8E8E93] group-hover:text-white" />
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
