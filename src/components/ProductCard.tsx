import React from 'react';
import { Product } from '../types';
import { ProductPlaceholderImage } from './ProductPlaceholderImage';
import { ShoppingBag, Star, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelect: (productId: string) => void;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  isAdded?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onAddToCart,
  isAdded = false,
}) => {
  return (
    <div
      onClick={() => onSelect(product.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onSelect(product.id);
        }
      }}
      className="group relative flex flex-col bg-white rounded-2xl border border-slate-100/90 shadow-2xs hover:shadow-md transition-shadow duration-200 overflow-hidden cursor-pointer select-none"
    >
      {/* Product Image Area - STRICT: pure white background square with centered dark gray text */}
      <div className="relative w-full aspect-square bg-white overflow-hidden">
        <ProductPlaceholderImage
          label="Product"
          showSubtitle={true}
          size="md"
        />

        {/* Bright Red Discount Badge as instructed */}
        {product.discount > 0 && (
          <div className="absolute top-2.5 left-2.5 z-20">
            <span className="px-2 py-0.5 text-xs font-black tracking-wider uppercase bg-rose-600 text-white rounded-md shadow-xs">
              -{product.discount}%
            </span>
          </div>
        )}

        {/* Stock / New Indicator */}
        {product.isNew && (
          <div className="absolute top-2.5 right-2.5 z-20">
            <span className="px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-slate-900 text-white rounded-md">
              NEW
            </span>
          </div>
        )}
      </div>

      {/* Product Info Section */}
      <div className="p-4 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Category kicker */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-medium tracking-tight uppercase text-[11px] text-teal-600 font-semibold">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-amber-500 font-semibold text-xs">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
            </div>
          </div>

          {/* Product Name - STRICT: named only as Product 1, Product 2, Product 3... */}
          <h3
            className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {product.name}
          </h3>

          {/* Available Sizes Quick Tag */}
          <div className="flex items-center gap-1 mt-1.5 text-[11px] text-slate-400">
            <span>সাইজ:</span>
            <span className="text-slate-600 font-medium">
              {product.sizes.slice(0, 3).join(', ')}
              {product.sizes.length > 3 ? '...' : ''}
            </span>
          </div>
        </div>

        {/* Price & Action Button */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          {/* Bangladeshi Taka ৳ Price */}
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-black text-slate-900 tabular-nums">
              ৳{product.price.toLocaleString()}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-slate-400 line-through tabular-nums -mt-0.5">
                ৳{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Vibrant Add to Cart Button */}
          <button
            type="button"
            onClick={(e) => onAddToCart(product, e)}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95 ${
              isAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-teal-600 hover:bg-teal-700 text-white shadow-teal-600/20'
            }`}
            aria-label={`Add ${product.name} to cart`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>যুক্ত হয়েছে</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>অর্ডার করুন</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
