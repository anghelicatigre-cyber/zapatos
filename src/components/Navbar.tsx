import React, { useState } from 'react';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  Flame, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { Brand } from '../types';

interface NavbarProps {
  activeBrand: Brand;
  onSelectBrand: (brand: Brand) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onSelectCategory: (category: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeBrand,
  onSelectBrand,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onSelectCategory,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountModalOpen, setAccountModalOpen] = useState(false);

  const navLinks: { label: string; brand?: Brand; category?: string; badge?: string }[] = [
    { label: 'Home', brand: 'All' },
    { label: 'Nike', brand: 'Nike' },
    { label: 'Adidas', brand: 'Adidas' },
    { label: 'Jordan', brand: 'Jordan', badge: 'HOT' },
    { label: 'Puma', brand: 'Puma' },
    { label: 'New Arrivals', category: 'New' },
    { label: 'Sale', category: 'Sale', badge: 'OFF' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0B0B0B]/95 backdrop-blur-md border-b border-[#1C1C1E]">
      {/* Top Announcement Bar */}
      <div className="bg-[#FF1E27] text-white text-xs font-semibold py-1.5 px-4 text-center tracking-wide flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 animate-pulse" />
        <span>FREE EXPRESS SHIPPING ON ORDERS OVER $150 | USE CODE <span className="underline font-bold">KICK20</span> FOR 20% OFF</span>
        <Flame className="w-3.5 h-3.5 fill-current" />
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Left: Store Logo */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => {
              onSelectBrand('All');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            id="store-logo-btn"
            className="flex items-center gap-2.5 group focus:outline-none text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-[#FF1E27] flex items-center justify-center shadow-lg shadow-[#FF1E27]/25 group-hover:scale-105 transition-transform duration-200">
              {/* Custom SVG Sneaker / Wing Icon */}
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="3.29 7 12 12 20.71 7"></polyline>
                <line x1="12" y1="22" x2="12" y2="12"></line>
              </svg>
            </div>
            <div>
              <span className="text-xl font-black tracking-wider text-white uppercase block leading-none font-sans">
                KICK<span className="text-[#FF1E27]">VAULT</span>
              </span>
              <span className="text-[10px] text-[#8E8E93] tracking-widest font-mono uppercase block mt-1">
                AUTHENTIC SNEAKER LAB
              </span>
            </div>
          </button>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const isActive = link.brand ? activeBrand === link.brand : false;
            return (
              <button
                key={link.label}
                id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => {
                  if (link.brand) {
                    onSelectBrand(link.brand);
                  } else if (link.category) {
                    onSelectCategory(link.category);
                  }
                }}
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold tracking-wide transition-all duration-200 relative flex items-center gap-1.5 ${
                  isActive 
                    ? 'text-white bg-[#1C1C1E]' 
                    : 'text-[#8E8E93] hover:text-white hover:bg-[#1C1C1E]/50'
                }`}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded ${
                    link.badge === 'HOT' ? 'bg-[#FF1E27] text-white' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  }`}>
                    {link.badge}
                  </span>
                )}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#FF1E27] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Action Icons & Search */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            id="nav-search-btn"
            className="hidden sm:flex items-center gap-2 bg-[#1C1C1E] text-[#8E8E93] hover:text-white hover:bg-[#2C2C2E] px-3.5 py-2 rounded-xl text-xs font-medium transition-all duration-200 border border-white/5"
          >
            <Search className="w-4 h-4 text-[#8E8E93]" />
            <span className="hidden xl:inline">Search Nike, Air Jordan...</span>
            <kbd className="bg-[#0B0B0B] text-[10px] px-1.5 py-0.5 rounded text-[#8E8E93] border border-white/10 font-mono">⌘K</kbd>
          </button>

          <button
            onClick={onOpenSearch}
            id="nav-search-mobile-btn"
            className="sm:hidden p-2.5 rounded-xl bg-[#1C1C1E] text-[#8E8E93] hover:text-white transition-colors"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Wishlist Icon */}
          <button
            onClick={onOpenWishlist}
            id="nav-wishlist-btn"
            className="p-2.5 rounded-xl bg-[#1C1C1E] text-white hover:bg-[#2C2C2E] transition-colors relative border border-white/5"
            aria-label="Favorites"
          >
            <Heart className="w-5 h-5 text-white/90" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#FF1E27] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#0B0B0B] animate-pulse">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Account Icon */}
          <button
            onClick={() => setAccountModalOpen(true)}
            id="nav-account-btn"
            className="p-2.5 rounded-xl bg-[#1C1C1E] text-white hover:bg-[#2C2C2E] transition-colors border border-white/5"
            aria-label="Account"
          >
            <User className="w-5 h-5 text-white/90" />
          </button>

          {/* Cart Icon with Counter */}
          <button
            onClick={onOpenCart}
            id="nav-cart-btn"
            className="flex items-center gap-2.5 bg-[#FF1E27] hover:bg-[#e01922] text-white px-4 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 shadow-lg shadow-[#FF1E27]/20 active:scale-95"
            aria-label="Shopping Cart"
          >
            <div className="relative flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-[#FF1E27] text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden md:inline font-sans uppercase tracking-wider text-xs">Cart</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="nav-mobile-toggle"
            className="lg:hidden p-2.5 rounded-xl bg-[#1C1C1E] text-white hover:bg-[#2C2C2E] transition-colors border border-white/5 menu-icon"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0B0B0B] border-b border-[#1C1C1E] px-4 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => {
                  if (link.brand) {
                    onSelectBrand(link.brand);
                  } else if (link.category) {
                    onSelectCategory(link.category);
                  }
                  setMobileMenuOpen(false);
                }}
                className={`p-3 rounded-xl text-left font-semibold text-sm flex items-center justify-between ${
                  link.brand === activeBrand
                    ? 'bg-[#FF1E27] text-white'
                    : 'bg-[#1C1C1E] text-white hover:bg-[#2C2C2E]'
                }`}
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-white/50" />
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-[#1C1C1E] flex justify-between items-center text-xs text-[#8E8E93]">
            <span>Authentic Sneakers • 100% Guaranteed</span>
            <span className="text-[#FF1E27] font-bold">KICKVAULT VIP</span>
          </div>
        </div>
      )}

      {/* Account Info Modal */}
      {accountModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1C1C1E] border border-white/10 rounded-2xl p-6 max-w-md w-full relative space-y-4 text-white shadow-2xl">
            <button
              onClick={() => setAccountModalOpen(false)}
              className="absolute top-4 right-4 text-[#8E8E93] hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#FF1E27] flex items-center justify-center font-black text-xl">
                KV
              </div>
              <div>
                <h3 className="font-bold text-lg">VIP Collector Account</h3>
                <p className="text-xs text-[#8E8E93]">Sneakerhead Level 3 • 4,250 Points</p>
              </div>
            </div>
            <div className="bg-[#0B0B0B] p-4 rounded-xl space-y-2 border border-white/5 text-xs text-[#8E8E93]">
              <div className="flex justify-between text-white font-medium">
                <span>Free Express Shipping Eligible</span>
                <span className="text-[#FF1E27] font-bold">Active</span>
              </div>
              <p>Exclusive access to limited drops and early Jordan release queues.</p>
            </div>
            <button
              onClick={() => setAccountModalOpen(false)}
              className="w-full bg-[#FF1E27] hover:bg-[#e01922] text-white font-bold py-3 rounded-xl transition-colors uppercase text-xs tracking-wider"
            >
              Close VIP Dashboard
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
