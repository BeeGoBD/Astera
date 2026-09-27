import React, { useState, useMemo } from 'react';
import { Product, Category } from '../types';
import { ProductCard } from '../components/ProductCard';
import { CATEGORIES } from '../data/mockData';
import { Filter, SlidersHorizontal, ArrowUpDown, X, Sparkles } from 'lucide-react';

interface ShopPageProps {
  products: Product[];
  selectedCategorySlug?: string;
  onSelectCategory: (slug: string) => void;
  onSelectProduct: (productId: string) => void;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  searchQuery: string;
  onClearSearch: () => void;
  addedProductId?: string | null;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  products,
  selectedCategorySlug = 'all',
  onSelectCategory,
  onSelectProduct,
  onAddToCart,
  searchQuery,
  onClearSearch,
  addedProductId,
}) => {
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'discount' | 'rating'>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(4000);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategorySlug && selectedCategorySlug !== 'all') {
          const matchCat = CATEGORIES.find((c) => c.slug === selectedCategorySlug);
          if (matchCat && p.category !== matchCat.name) return false;
        }

        // Search query filter
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          const match =
            p.name.toLowerCase().includes(query) ||
            p.category.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query);
          if (!match) return false;
        }

        // Price filter
        if (p.price > maxPrice) return false;

        // Stock filter
        if (onlyInStock && !p.inStock) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'discount') return b.discount - a.discount;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // featured order
      });
  }, [products, selectedCategorySlug, searchQuery, maxPrice, onlyInStock, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-900 to-slate-900 rounded-3xl p-6 sm:p-10 text-white mb-8 relative overflow-hidden shadow-lg border border-teal-800/30">
        <div className="relative z-10 max-w-xl">
          <span className="px-3 py-1 bg-teal-500/20 text-teal-300 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 border border-teal-400/30 mb-3">
            <Sparkles className="w-3.5 h-3.5" /> All Collections Catalog
          </span>
          <h1
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Astera Fashion Store
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-300">
            Browse contemporary street essentials, everyday cotton wear, ethnic elegance, and comfortable denim with delivery across Bangladesh.
          </p>
        </div>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="lg:hidden px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold flex items-center gap-2 shadow-2xs"
          >
            <Filter className="w-4 h-4 text-teal-600" />
            <span>Filters</span>
          </button>

          <span className="text-xs font-semibold text-slate-500">
            Showing <strong className="text-slate-900">{filteredProducts.length}</strong> products
          </span>

          {searchQuery && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-teal-50 text-teal-800 rounded-lg text-xs font-medium">
              <span>Search: "{searchQuery}"</span>
              <button onClick={onClearSearch} className="hover:text-rose-600">
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <ArrowUpDown className="w-4 h-4 text-slate-400" />
          <span className="text-xs text-slate-500 font-medium">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
          >
            <option value="featured">Featured First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="discount">Biggest Discount</option>
            <option value="rating">Top Customer Rated</option>
          </select>
        </div>
      </div>

      {/* 2-Column Layout: Sidebar + Product Grid */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Filters (Desktop + Mobile slide) */}
        <aside
          className={`lg:col-span-3 space-y-6 ${
            mobileFilterOpen ? 'block' : 'hidden lg:block'
          }`}
        >
          {/* Categories */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-2xs space-y-3">
            <h3 className="font-extrabold text-sm text-slate-900 flex items-center justify-between">
              <span>Categories</span>
              <SlidersHorizontal className="w-4 h-4 text-teal-600" />
            </h3>
            <div className="space-y-1 text-xs">
              <button
                type="button"
                onClick={() => onSelectCategory('all')}
                className={`w-full text-left px-3 py-2 rounded-xl transition-colors font-medium flex items-center justify-between ${
                  !selectedCategorySlug || selectedCategorySlug === 'all'
                    ? 'bg-teal-50 text-teal-800 font-bold'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span>All Categories</span>
                <span className="text-slate-400">{products.length}</span>
              </button>
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategorySlug === cat.slug;
                const catProductCount = products.filter((p) => p.category === cat.name).length;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => onSelectCategory(cat.slug)}
                    className={`w-full text-left px-3 py-2 rounded-xl transition-colors font-medium flex items-center justify-between ${
                      isSelected
                        ? 'bg-teal-50 text-teal-800 font-bold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-slate-400">{catProductCount}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-2xs space-y-3">
            <h3 className="font-extrabold text-sm text-slate-900">Maximum Price (৳)</h3>
            <div className="space-y-2">
              <input
                type="range"
                min="900"
                max="4000"
                step="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-teal-600"
              />
              <div className="flex justify-between text-xs text-slate-600 font-bold tabular-nums">
                <span>৳900</span>
                <span className="text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                  Up to ৳{maxPrice.toLocaleString()}
                </span>
                <span>৳4,000</span>
              </div>
            </div>
          </div>

          {/* Availability */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-2xs space-y-3">
            <h3 className="font-extrabold text-sm text-slate-900">Availability</h3>
            <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="rounded text-teal-600 focus:ring-teal-500 w-4 h-4"
              />
              <span>In Stock for Immediate Delivery (64 Districts)</span>
            </label>
          </div>
        </aside>

        {/* Product Grid Area (9 Cols) */}
        <div className="lg:col-span-9">
          {filteredProducts.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl border border-slate-100 text-center">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-3">
                <Filter className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-slate-800 text-base">No products match your criteria</h4>
              <p className="text-xs text-slate-500 mt-1">
                Try widening your price range or clearing category filters.
              </p>
              <button
                type="button"
                onClick={() => {
                  onSelectCategory('all');
                  setMaxPrice(4000);
                  setOnlyInStock(false);
                  onClearSearch();
                }}
                className="mt-4 px-5 py-2.5 bg-teal-600 text-white font-bold text-xs rounded-xl shadow-xs"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={onSelectProduct}
                  onAddToCart={onAddToCart}
                  isAdded={addedProductId === product.id}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
