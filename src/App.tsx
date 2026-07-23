import { useState, useMemo, useEffect } from 'react';
import { SNEAKERS } from './data/sneakers';
import { Sneaker, CartItem, FilterState, Brand, ColorVariant, ToastMessage } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BrandSelector } from './components/BrandSelector';
import { FilterBar } from './components/FilterBar';
import { ProductGrid } from './components/ProductGrid';
import { PromoBanner } from './components/PromoBanner';
import { QuickViewModal } from './components/QuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';

export default function App() {
  // State management
  const [activeBrand, setActiveBrand] = useState<Brand>('All');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistSneakers, setWishlistSneakers] = useState<Sneaker[]>([SNEAKERS[1]]); // pre-saved 1 favorite
  const [quickViewSneaker, setQuickViewSneaker] = useState<Sneaker | null>(null);
  
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    brand: 'All',
    category: 'All',
    searchQuery: '',
    minPrice: 0,
    maxPrice: 300,
    selectedSizes: [],
    sortBy: 'featured',
    onlySale: false,
    onlyNew: false,
  });

  // Sync active brand with filter
  const handleSelectBrand = (brand: Brand) => {
    setActiveBrand(brand);
    setFilters((prev) => ({ ...prev, brand }));
  };

  const handleSelectCategory = (category: string) => {
    if (category === 'New') {
      setFilters((prev) => ({ ...prev, onlyNew: true, category: 'All' }));
    } else if (category === 'Sale') {
      setFilters((prev) => ({ ...prev, onlySale: true, category: 'All' }));
    } else {
      setFilters((prev) => ({ ...prev, category: category as FilterState['category'] }));
    }
  };

  const handleUpdateFilters = (updated: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...updated }));
  };

  const handleResetFilters = () => {
    setActiveBrand('All');
    setFilters({
      brand: 'All',
      category: 'All',
      searchQuery: '',
      minPrice: 0,
      maxPrice: 300,
      selectedSizes: [],
      sortBy: 'featured',
      onlySale: false,
      onlyNew: false,
    });
  };

  // Toast Notification helper
  const addToast = (title: string, message: string, type: ToastMessage['type'] = 'cart') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  // Cart Handlers
  const handleAddToCart = (
    sneaker: Sneaker, 
    size: number, 
    color: ColorVariant, 
    quantity: number = 1
  ) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) =>
          item.sneaker.id === sneaker.id &&
          item.selectedSize === size &&
          item.selectedColor.name === color.name
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      }

      return [...prev, { sneaker, selectedSize: size, selectedColor: color, quantity }];
    });

    addToast('Vault Cart Updated', `${sneaker.name} (US ${size}) added to your cart.`, 'cart');
  };

  const handleUpdateCartQty = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(index);
      return;
    }
    setCartItems((prev) => {
      const updated = [...prev];
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const handleRemoveCartItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  // Wishlist Handlers
  const handleToggleWishlist = (sneaker: Sneaker) => {
    const exists = wishlistSneakers.some((s) => s.id === sneaker.id);
    if (exists) {
      setWishlistSneakers((prev) => prev.filter((s) => s.id !== sneaker.id));
      addToast('Removed from Vault', `${sneaker.name} removed from saved grails.`, 'info');
    } else {
      setWishlistSneakers((prev) => [...prev, sneaker]);
      addToast('Saved to Wishlist', `${sneaker.name} added to your grails list.`, 'wishlist');
    }
  };

  // Keyboard shortcut for Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Compute brand sneaker counts
  const sneakerCountsByBrand = useMemo(() => {
    const counts: Record<string, number> = {};
    SNEAKERS.forEach((s) => {
      counts[s.brand] = (counts[s.brand] || 0) + 1;
    });
    return counts;
  }, []);

  // Filter & Sort logic
  const filteredSneakers = useMemo(() => {
    return SNEAKERS.filter((sneaker) => {
      // Brand filter
      if (filters.brand !== 'All' && sneaker.brand !== filters.brand) return false;

      // Category filter
      if (filters.category !== 'All') {
        if (filters.category === 'Limited Drop' && sneaker.category !== 'Limited Drop') return false;
        if (filters.category !== 'Limited Drop' && sneaker.category !== filters.category) return false;
      }

      // Search query filter
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase();
        const matchName = sneaker.name.toLowerCase().includes(q);
        const matchBrand = sneaker.brand.toLowerCase().includes(q);
        const matchSku = sneaker.sku.toLowerCase().includes(q);
        const matchDesc = sneaker.description.toLowerCase().includes(q);
        if (!matchName && !matchBrand && !matchSku && !matchDesc) return false;
      }

      // Size filter
      if (filters.selectedSizes.length > 0) {
        const hasSize = filters.selectedSizes.some((sz) => sneaker.availableSizes.includes(sz));
        if (!hasSize) return false;
      }

      // Sale filter
      if (filters.onlySale && !sneaker.isSale) return false;

      // New filter
      if (filters.onlyNew && !sneaker.isNew) return false;

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-low') return a.price - b.price;
      if (filters.sortBy === 'price-high') return b.price - a.price;
      if (filters.sortBy === 'rating') return b.rating - a.rating;
      if (filters.sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return 0; // featured default
    });
  }, [filters]);

  const featuredSneaker = SNEAKERS[0]; // Air Max Pulse
  const dropSneaker = SNEAKERS[1]; // Air Jordan 1 Chicago Drop

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white font-sans antialiased selection:bg-[#FF1E27] selection:text-white">
      
      {/* Top Bar & Navigation */}
      <Navbar
        activeBrand={activeBrand}
        onSelectBrand={handleSelectBrand}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        wishlistCount={wishlistSneakers.length}
        onOpenCart={() => setCartOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
        onSelectCategory={handleSelectCategory}
      />

      {/* Hero Showcase Section */}
      <Hero
        featuredSneaker={featuredSneaker}
        onAddToCart={handleAddToCart}
        onExploreClick={() => {
          const el = document.getElementById('catalog-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Brand Selector Strip */}
      <BrandSelector
        activeBrand={activeBrand}
        onSelectBrand={handleSelectBrand}
        sneakerCountsByBrand={sneakerCountsByBrand}
      />

      {/* Main Catalog Section */}
      <main id="catalog-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Section Header */}
        <div className="text-left mb-6">
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight font-sans">
            AUTHENTIC <span className="text-[#FF1E27]">SNEAKER VAULT</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#8E8E93] mt-1">
            Browse verified deadstock models from Nike, Adidas, Jordan, Puma, and Reebok.
          </p>
        </div>

        {/* Filter & Sort Bar */}
        <FilterBar
          filters={filters}
          onUpdateFilters={handleUpdateFilters}
          onResetFilters={handleResetFilters}
          totalResults={filteredSneakers.length}
        />

        {/* Product Grid */}
        <ProductGrid
          sneakers={filteredSneakers}
          wishlistIds={wishlistSneakers.map((s) => s.id)}
          onToggleWishlist={handleToggleWishlist}
          onQuickView={(s) => setQuickViewSneaker(s)}
          onAddToCart={handleAddToCart}
          onResetFilters={handleResetFilters}
        />

      </main>

      {/* Promo Banner Section */}
      <PromoBanner
        dropSneaker={dropSneaker}
        onAddToCart={handleAddToCart}
        onQuickView={(s) => setQuickViewSneaker(s)}
      />

      {/* Footer */}
      <Footer />

      {/* Drawers & Modals */}
      <QuickViewModal
        sneaker={quickViewSneaker}
        onClose={() => setQuickViewSneaker(null)}
        onAddToCart={handleAddToCart}
        isWishlisted={quickViewSneaker ? wishlistSneakers.some((s) => s.id === quickViewSneaker.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={() => setCartItems([])}
      />

      <WishlistDrawer
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        wishlistSneakers={wishlistSneakers}
        onRemoveWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
      />

      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        sneakers={SNEAKERS}
        onSelectSneaker={(s) => setQuickViewSneaker(s)}
      />

      {/* Interactive Toast Notifications */}
      <Toast
        toasts={toasts}
        onDismiss={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))}
      />

    </div>
  );
}
