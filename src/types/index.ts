export interface Product {
  id: string;
  name: string; // Strictly "Product 1", "Product 2", etc.
  category: string;
  price: number;
  originalPrice: number;
  discount: number; // percentage
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  isFeatured: boolean;
  isNew?: boolean;
  description: string;
  features: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  sku: string;
}

export interface CartItem {
  id: string; // unique item key (productId + size + color)
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface Category {
  id: string;
  name: string;
  nameBn?: string;
  slug: string;
  itemCount: number;
  description: string;
  accentColor: string;
  iconName: string;
}

export interface CustomerReview {
  id: string;
  name: string;
  location: string;
  verifiedPurchase: boolean;
  rating: number;
  date: string;
  comment: string;
  tag: string;
  initials: string;
  avatarBg: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  excerpt: string;
  content: string[];
  tags: string[];
}

export interface LookbookVideo {
  id: string;
  title: string;
  season: string;
  duration: string;
  director: string;
  description: string;
  videoUrl?: string;
  gradient: string;
}

export interface ComboDeal {
  id: string;
  title: string;
  subtitle: string;
  productsIncluded: string[]; // e.g., ["Product 1", "Product 4", "Product 7"]
  bundlePrice: number;
  regularPrice: number;
  savings: number;
  badge: string;
  description: string;
}

export interface PromoCoupon {
  code: string;
  title: string;
  discountDescription: string;
  minSpend: number;
  discountAmountOrPercent: string;
  expiryDate: string;
  isHot?: boolean;
}
