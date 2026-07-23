export type Brand = 'All' | 'Nike' | 'Adidas' | 'Jordan' | 'Puma' | 'Reebok';

export type Category = 'All' | 'Men' | 'Women' | 'Unisex' | 'Limited Drop';

export interface ColorVariant {
  name: string;
  hex: string;
  image: string;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface Sneaker {
  id: string;
  name: string;
  brand: Brand;
  category: Category;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isSale?: boolean;
  isFeatured?: boolean;
  tagline?: string;
  description: string;
  mainImage: string;
  colorVariants: ColorVariant[];
  availableSizes: number[]; // e.g. [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12, 13]
  sku: string;
  stockCount: number;
  reviews?: Review[];
}

export interface CartItem {
  sneaker: Sneaker;
  selectedSize: number;
  selectedColor: ColorVariant;
  quantity: number;
}

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'cart' | 'wishlist' | 'info' | 'success';
}

export interface FilterState {
  brand: Brand;
  category: Category;
  searchQuery: string;
  minPrice: number;
  maxPrice: number;
  selectedSizes: number[];
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating' | 'newest';
  onlySale: boolean;
  onlyNew: boolean;
}
