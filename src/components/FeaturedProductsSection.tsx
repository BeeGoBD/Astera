import React, { useState } from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { ArrowRight, Flame } from 'lucide-react';

interface FeaturedProductsSectionProps {
  products: Product[];
  onSelectProduct: (productId: string) => void;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  onViewMore: () => void;
  addedProductId?: string | null;
}

export const FeaturedProductsSection: React.FC<FeaturedProductsSectionProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  onViewMore,
  addedProductId,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'men' | 'women' | 'tees' | 'denim'>('all');

  const filteredProducts = products.filter((p) => {
    if (activeTab === 'men') return p.category === "Men's Wear";
    if (activeTab === 'women') return p.category === "Women's Wear" || p.category === 'Dresses';
    if (activeTab === 'tees') return p.category === 'T-Shirts & Tops';
    if (activeTab === 'denim') return p.category === 'Jeans & Bottoms';
    return true;
  });

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-black text-rose-600 uppercase tracking-widest">
            <Flame className="w-4 h-4 fill-rose-600 text-rose-600 animate-pulse" />
            <span>বাংলাদেশে এই সপ্তাহের ট্রেন্ডিং কালেকশন</span>
          </div>
          {/* Large Vibrant Heading as required */}
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-1"
          >
            FEATURED PRODUCTS
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            প্রতিদিনের আত্মবিশ্বাস ও দীর্ঘস্থায়ী আরামের জন্য বিশেষভাবে নির্বাচিত আধুনিক পোশাক।
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar bg-slate-100 p-1.5 rounded-xl border border-slate-200/60 self-start md:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'all'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            সবগুলো
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('men')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'men'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Men's
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('women')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'women'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Women's
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('tees')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'tees'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            T-Shirts &amp; Tops
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('denim')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'denim'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Jeans &amp; Bottoms
          </button>
        </div>
      </div>

      {/* Responsive Product Grid: 4 columns desktop, 2 tablet, 1 mobile as required */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {filteredProducts.slice(0, 8).map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onSelect={onSelectProduct}
            onAddToCart={onAddToCart}
            isAdded={addedProductId === product.id}
          />
        ))}
      </div>

      {/* "View More" Button Linking to /shop */}
      <div className="mt-10 flex justify-center">
        <button
          type="button"
          onClick={onViewMore}
          className="px-8 py-3.5 bg-slate-900 hover:bg-teal-700 text-white font-bold text-sm rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center gap-2 cursor-pointer group"
        >
          <span>আরও প্রোডাক্ট দেখুন</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-teal-400 group-hover:text-white" />
        </button>
      </div>
    </section>
  );
};
