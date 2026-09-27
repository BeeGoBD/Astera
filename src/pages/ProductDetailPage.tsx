import React, { useState } from 'react';
import { Product } from '../types';
import { ProductPlaceholderImage } from '../components/ProductPlaceholderImage';
import { ProductCard } from '../components/ProductCard';
import {
  Star,
  ShoppingBag,
  Zap,
  Truck,
  RotateCcw,
  ShieldCheck,
  Check,
  ChevronRight,
  Ruler,
  HelpCircle,
  Share2,
} from 'lucide-react';

interface ProductDetailPageProps {
  product: Product;
  allProducts: Product[];
  onSelectProduct: (productId: string) => void;
  onAddToCart: (product: Product, size: string, color: string, qty: number) => void;
  onBuyNow: (product: Product, size: string, color: string, qty: number) => void;
  onNavigateHome: () => void;
  onNavigateShop: (categorySlug?: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  allProducts,
  onSelectProduct,
  onAddToCart,
  onBuyNow,
  onNavigateHome,
  onNavigateShop,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || 'Standard');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'shipping' | 'reviews'>('details');
  const [isAddedToast, setIsAddedToast] = useState<boolean>(false);
  const [showSizeGuide, setShowSizeGuide] = useState<boolean>(false);

  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAdd = () => {
    onAddToCart(product, selectedSize, selectedColor, quantity);
    setIsAddedToast(true);
    setTimeout(() => setIsAddedToast(false), 2000);
  };

  const handleBuy = () => {
    onBuyNow(product, selectedSize, selectedColor, quantity);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-6 overflow-x-auto no-scrollbar">
        <button
          onClick={onNavigateHome}
          className="hover:text-slate-900 transition-colors shrink-0"
        >
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5 shrink-0 text-slate-400" />
        <button
          onClick={() => onNavigateShop()}
          className="hover:text-slate-900 transition-colors shrink-0"
        >
          Shop
        </button>
        <ChevronRight className="w-3.5 h-3.5 shrink-0 text-slate-400" />
        <button
          onClick={() => onNavigateShop(product.category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-'))}
          className="hover:text-slate-900 transition-colors shrink-0 text-teal-700 font-semibold"
        >
          {product.category}
        </button>
        <ChevronRight className="w-3.5 h-3.5 shrink-0 text-slate-400" />
        <span className="text-slate-800 font-bold shrink-0">{product.name}</span>
      </nav>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left: Gallery (Image placeholder pure white background square per strict rules) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="relative rounded-3xl overflow-hidden border border-slate-100 shadow-md bg-white">
            {/* Pure white background square with centered dark gray text */}
            <ProductPlaceholderImage
              label="Product"
              showSubtitle={true}
              size="xl"
              className="min-h-[380px] sm:min-h-[480px]"
            />

            {/* Discount Badge */}
            {product.discount > 0 && (
              <div className="absolute top-4 left-4 z-20">
                <span className="px-3 py-1 text-xs font-black uppercase bg-rose-600 text-white rounded-lg shadow-sm">
                  -{product.discount}% OFF
                </span>
              </div>
            )}

            {/* Share action */}
            <button
              onClick={() => navigator.clipboard?.writeText(window.location.href)}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/90 hover:bg-white text-slate-600 hover:text-slate-900 shadow-sm border border-slate-100 transition-colors"
              title="Copy product link"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          {/* Thumbnail Gallery (3 preview placeholders) */}
          <div className="grid grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`relative rounded-xl overflow-hidden border-2 cursor-pointer transition-all bg-white aspect-square ${
                  i === 1 ? 'border-teal-500 shadow-xs' : 'border-slate-100 hover:border-slate-300'
                }`}
              >
                <ProductPlaceholderImage
                  label="Product"
                  showSubtitle={false}
                  size="sm"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Contiguous Purchase Module */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            {/* Kicker & Rating */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-teal-600">
                {product.category} · SKU: {product.sku}
              </span>
              <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-md text-amber-700 text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{product.rating}</span>
                <span className="text-slate-400 font-normal">({product.reviewsCount} reviews)</span>
              </div>
            </div>

            {/* Product Title (STRICT: named only as Product 1, Product 2, ...) */}
            <h1
              className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {product.name}
            </h1>

            {/* Price in ৳ Bangladeshi Taka */}
            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-3xl font-black text-slate-900 tabular-nums">
                ৳{product.price.toLocaleString()}
              </span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-lg text-slate-400 line-through tabular-nums">
                    ৳{product.originalPrice.toLocaleString()}
                  </span>
                  <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
                    Save ৳{(product.originalPrice - product.price).toLocaleString()}
                  </span>
                </>
              )}
            </div>

            {/* Stock status */}
            <div className="mt-3 flex items-center gap-2 text-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-semibold text-emerald-700">In Stock Ready for Dispatch</span>
              <span className="text-slate-400">· Fast Shipping across Bangladesh</span>
            </div>

            <p className="mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
              {product.description}
            </p>

            {/* Color Selector */}
            <div className="mt-6 pt-5 border-t border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-800">
                  Select Color: <strong className="text-teal-700">{selectedColor}</strong>
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setSelectedColor(c.name)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      selectedColor === c.name
                        ? 'border-teal-600 bg-teal-50/50 text-teal-900 shadow-2xs ring-1 ring-teal-500'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-slate-300 shrink-0"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="mt-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-800">
                  Select Size: <strong className="text-teal-700">{selectedSize}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => setShowSizeGuide(true)}
                  className="text-xs font-semibold text-teal-700 hover:underline flex items-center gap-1"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size Chart</span>
                </button>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`py-2.5 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                      selectedSize === size
                        ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                        : 'bg-white text-slate-800 border-slate-200 hover:border-slate-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Stepper */}
            <div className="mt-5 flex items-center gap-4">
              <span className="text-xs font-bold text-slate-800">Quantity:</span>
              <div className="flex items-center border border-slate-200 rounded-xl bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 hover:bg-slate-100 text-slate-600 transition-colors font-bold text-sm"
                >
                  -
                </button>
                <span className="px-4 text-xs font-black text-slate-900 tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 hover:bg-slate-100 text-slate-600 transition-colors font-bold text-sm"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart & Buy Now Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleAdd}
                className="flex-1 py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs sm:text-sm rounded-xl transition-all shadow-md shadow-teal-600/20 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isAddedToast ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>Added to Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>ADD TO CART</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleBuy}
                className="flex-1 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Zap className="w-4 h-4 text-amber-300" />
                <span>BUY NOW (COD / ONLINE)</span>
              </button>
            </div>
          </div>

          {/* Delivery & Assurance Card */}
          <div className="mt-8 p-4 rounded-2xl bg-slate-50 border border-slate-150/70 space-y-2.5 text-xs text-slate-600">
            <div className="flex items-center gap-2.5">
              <Truck className="w-4 h-4 text-teal-600 shrink-0" />
              <span>
                <strong>Dhaka Delivery:</strong> ৳60 (within 24 hours). <strong>Outside Dhaka:</strong> ৳120 (48-72 hours).
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <RotateCcw className="w-4 h-4 text-teal-600 shrink-0" />
              <span>
                <strong>7-Day Easy Exchange:</strong> Size mismatch or fabric preference replaced at doorstep.
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
              <span>
                <strong>Authentic Quality Guaranteed:</strong> Pre-shrunk, combed yarn tested for high wash resistance.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Description, Specs, Shipping, Reviews */}
      <div className="mt-14 border-t border-slate-200 pt-8">
        <div className="flex items-center gap-4 border-b border-slate-200 pb-3 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('details')}
            className={`pb-2 text-sm font-bold transition-all relative ${
              activeTab === 'details'
                ? 'text-teal-700'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Product Features
            {activeTab === 'details' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-2 text-sm font-bold transition-all relative ${
              activeTab === 'specs'
                ? 'text-teal-700'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Fabric &amp; Care Specifications
            {activeTab === 'specs' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('shipping')}
            className={`pb-2 text-sm font-bold transition-all relative ${
              activeTab === 'shipping'
                ? 'text-teal-700'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Delivery &amp; COD Policy
            {activeTab === 'shipping' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-2 text-sm font-bold transition-all relative ${
              activeTab === 'reviews'
                ? 'text-teal-700'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Verified Reviews ({product.reviewsCount})
            {activeTab === 'reviews' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600" />
            )}
          </button>
        </div>

        <div className="py-6 text-xs sm:text-sm text-slate-700 leading-relaxed max-w-4xl">
          {activeTab === 'details' && (
            <div>
              <h4 className="font-bold text-slate-900 mb-3 text-base">Key Highlights of {product.name}</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {product.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[11px] text-slate-400 block">Material Composition</span>
                  <span className="font-bold text-slate-800">100% Combed Compact Cotton</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[11px] text-slate-400 block">Weave / Weight</span>
                  <span className="font-bold text-slate-800">Heavy Knit 220-240 GSM</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[11px] text-slate-400 block">Pre-Shrinkage</span>
                  <span className="font-bold text-slate-800">Pre-washed 0% Dimensional Loss</span>
                </div>
              </div>
              <p className="text-slate-500 pt-2">
                Machine wash cold inside-out with like colors. Avoid bleach and direct sunlight drying to preserve reactive color radiance.
              </p>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="space-y-3">
              <p>
                Astera delivers through trusted courier partners (Steadfast, Pathao, Paperfly) across all 64 districts in Bangladesh.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl border border-slate-200">
                  <h5 className="font-bold text-slate-900">Inside Dhaka Metropolitan</h5>
                  <p className="text-slate-500 mt-1">৳60 shipping fee. Next day delivery (24 hours). Cash on delivery available.</p>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200">
                  <h5 className="font-bold text-slate-900">Outside Dhaka &amp; Suburbs</h5>
                  <p className="text-slate-500 mt-1">৳120 shipping fee. Delivery within 48 to 72 hours. Cash on delivery available.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-teal-50 p-4 rounded-2xl">
                <div className="text-3xl font-black text-teal-800">{product.rating}</div>
                <div>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-teal-900 font-medium mt-0.5">
                    Based on {product.reviewsCount} verified purchase customer ratings
                  </p>
                </div>
              </div>
              <p className="text-slate-500 text-xs italic">
                "Product fits true to size and color has not faded after 5 washes. Worth every taka!" — Verified Astera buyer from Dhaka.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="mt-14 pt-8 border-t border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-black uppercase text-teal-600">Complete the Look</span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                You May Also Like
              </h3>
            </div>
            <button
              onClick={() => onNavigateShop(product.category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-'))}
              className="text-xs font-bold text-teal-700 hover:underline"
            >
              View More in {product.category}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((relProduct) => (
              <ProductCard
                key={relProduct.id}
                product={relProduct}
                onSelect={onSelectProduct}
                onAddToCart={(p, e) => {
                  e.stopPropagation();
                  onAddToCart(p, p.sizes[0], p.colors[0]?.name || 'Standard', 1);
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Ruler className="w-5 h-5 text-teal-600" />
                <h4 className="text-base font-bold text-slate-900">Astera Sizing Chart (Inches)</h4>
              </div>
              <button
                onClick={() => setShowSizeGuide(false)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold"
              >
                Close
              </button>
            </div>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-xs text-left text-slate-700">
                <thead className="bg-slate-50 text-slate-900 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="p-2.5">Size</th>
                    <th className="p-2.5">Chest</th>
                    <th className="p-2.5">Length</th>
                    <th className="p-2.5">Shoulder</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="p-2.5 font-bold">S</td>
                    <td className="p-2.5">38"</td>
                    <td className="p-2.5">27"</td>
                    <td className="p-2.5">17.5"</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">M</td>
                    <td className="p-2.5">40"</td>
                    <td className="p-2.5">28"</td>
                    <td className="p-2.5">18.5"</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">L</td>
                    <td className="p-2.5">42"</td>
                    <td className="p-2.5">29"</td>
                    <td className="p-2.5">19.5"</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">XL</td>
                    <td className="p-2.5">44"</td>
                    <td className="p-2.5">30"</td>
                    <td className="p-2.5">20.5"</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">XXL</td>
                    <td className="p-2.5">46"</td>
                    <td className="p-2.5">31"</td>
                    <td className="p-2.5">21.5"</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-[11px] text-slate-500">
              *All measurements are in inches. If you prefer a loose relaxed streetwear drape, size up by one level.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
