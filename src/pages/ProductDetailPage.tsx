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
          className="hover:text-slate-900 transition-colors shrink-0 cursor-pointer"
        >
          হোম
        </button>
        <ChevronRight className="w-3.5 h-3.5 shrink-0 text-slate-400" />
        <button
          onClick={() => onNavigateShop()}
          className="hover:text-slate-900 transition-colors shrink-0 cursor-pointer"
        >
          শপ
        </button>
        <ChevronRight className="w-3.5 h-3.5 shrink-0 text-slate-400" />
        <button
          onClick={() => onNavigateShop(product.category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-'))}
          className="hover:text-slate-900 transition-colors shrink-0 text-teal-700 font-semibold cursor-pointer"
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
                  -{product.discount}% ছাড়
                </span>
              </div>
            )}

            {/* Share action */}
            <button
              onClick={() => navigator.clipboard?.writeText(window.location.href)}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/90 hover:bg-white text-slate-600 hover:text-slate-900 shadow-sm border border-slate-100 transition-colors cursor-pointer"
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
                <span className="text-slate-400 font-normal">({product.reviewsCount} রিভিউ)</span>
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
                    সেভ ৳{(product.originalPrice - product.price).toLocaleString()}
                  </span>
                </>
              )}
            </div>

            {/* Stock status */}
            <div className="mt-3 flex items-center gap-2 text-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-semibold text-emerald-700">স্টকে রয়েছে (তাত্ক্ষণিক ডেলিভারি)</span>
              <span className="text-slate-400">· সারা বাংলাদেশে দ্রুত ডেলিভারি</span>
            </div>

            <p className="mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
              {product.description}
            </p>

            {/* Color Selector */}
            <div className="mt-6 pt-5 border-t border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-800">
                  রং নির্বাচন করুন: <strong className="text-teal-700">{selectedColor}</strong>
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
                  সাইজ নির্বাচন করুন: <strong className="text-teal-700">{selectedSize}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => setShowSizeGuide(true)}
                  className="text-xs font-semibold text-teal-700 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>সাইজ চার্ট</span>
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
              <span className="text-xs font-bold text-slate-800">পরিমাণ:</span>
              <div className="flex items-center border border-slate-200 rounded-xl bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 hover:bg-slate-100 text-slate-600 transition-colors font-bold text-sm cursor-pointer"
                >
                  -
                </button>
                <span className="px-4 text-xs font-black text-slate-900 tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 hover:bg-slate-100 text-slate-600 transition-colors font-bold text-sm cursor-pointer"
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
                    <span>ব্যাগে যোগ হয়েছে!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>ব্যাগে যোগ করুন</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleBuy}
                className="flex-1 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Zap className="w-4 h-4 text-amber-300" />
                <span>এখনই কিনুন (cash on delivery)</span>
              </button>
            </div>
          </div>

          {/* Delivery & Assurance Card (With exact required English phrases) */}
          <div className="mt-8 p-4 rounded-2xl bg-slate-50 border border-slate-150/70 space-y-2.5 text-xs text-slate-600">
            <div className="flex items-center gap-2.5">
              <Truck className="w-4 h-4 text-teal-600 shrink-0" />
              <span>
                <strong>24 to 48 hours delivery:</strong> ঢাকায় ২৪ ঘণ্টা (৳৬০), ঢাকার বাইরে ৪৮ ঘণ্টার মধ্যে (৳১২০) ডেলিভারি।
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <RotateCcw className="w-4 h-4 text-teal-600 shrink-0" />
              <span>
                <strong>7 days easy exchange:</strong> সাইজ পরিবর্তন বা পছন্দের ক্ষেত্রে ৭ দিনের মধ্যে সহজে এক্সচেঞ্জ সুবিধা।
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
              <span>
                <strong>100% cotton:</strong> প্রিমিয়াম কম্বড কটন, প্রি-ওয়াশড এবং টেকসই দীর্ঘস্থায়ী কালারফাস্ট কোয়ালিটি।
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
              <span>
                <strong>cash on delivery:</strong> সারাদেশে হোম ডেলিভারিতে পণ্য দেখে মূল্য পরিশোধ করার নিশ্চয়তা।
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
            className={`pb-2 text-sm font-bold transition-all relative cursor-pointer ${
              activeTab === 'details'
                ? 'text-teal-700'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            প্রোডাক্ট বৈশিষ্ট্য
            {activeTab === 'details' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-2 text-sm font-bold transition-all relative cursor-pointer ${
              activeTab === 'specs'
                ? 'text-teal-700'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            ফেব্রিক ও যত্নবিধি
            {activeTab === 'specs' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('shipping')}
            className={`pb-2 text-sm font-bold transition-all relative cursor-pointer ${
              activeTab === 'shipping'
                ? 'text-teal-700'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            ডেলিভারি ও ক্যাশ অন ডেলিভারি
            {activeTab === 'shipping' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-2 text-sm font-bold transition-all relative cursor-pointer ${
              activeTab === 'reviews'
                ? 'text-teal-700'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            ভেরিফায়েড রিভিউ ({product.reviewsCount})
            {activeTab === 'reviews' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600" />
            )}
          </button>
        </div>

        <div className="py-6 text-xs sm:text-sm text-slate-700 leading-relaxed max-w-4xl">
          {activeTab === 'details' && (
            <div>
              <h4 className="font-bold text-slate-900 mb-3 text-base">{product.name} এর বিশেষ সুবিধাসমূহ</h4>
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
                  <span className="text-[11px] text-slate-400 block">উপাদান</span>
                  <span className="font-bold text-slate-800">100% cotton (কম্বড কটন)</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[11px] text-slate-400 block">ফেব্রিক ঘনত্ব</span>
                  <span className="font-bold text-slate-800">হেভি নিট ২২০-২৪০ জিএসএম</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[11px] text-slate-400 block">প্রি-ওয়াশড</span>
                  <span className="font-bold text-slate-800">প্রি-শ্রাঙ্ক, সাইজ অপরিবর্তিত থাকে</span>
                </div>
              </div>
              <p className="text-slate-500 pt-2">
                মৃদু ডিটারজেন্ট এবং স্বাভাবিক তাপমাত্রার পানিতে ধোয়ার পরামর্শ দেওয়া হচ্ছে। সরাসরি কড়া রোদে বেশিক্ষণ না শুকিয়ে ছায়ায় শুকালে পোশাকের উজ্জ্বলতা দীর্ঘস্থায়ী হয়।
              </p>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="space-y-3">
              <p>
                Astera বিশ্বস্ত কুরিয়ার পার্টনারদের মাধ্যমে সমগ্র বাংলাদেশে নিরাপদে এবং দ্রুত হোম ডেলিভারি পৌঁছে দেয়।
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl border border-slate-200">
                  <h5 className="font-bold text-slate-900">ঢাকা মহানগরের ভেতরে</h5>
                  <p className="text-slate-500 mt-1">ডেলিভারি চার্জ মাত্র ৳৬০। ২৪ ঘণ্টার মধ্যে হোম ডেলিভারি ও cash on delivery সুবিধা।</p>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200">
                  <h5 className="font-bold text-slate-900">ঢাকার বাইরে ও অন্যান্য জেলা</h5>
                  <p className="text-slate-500 mt-1">ডেলিভারি চার্জ মাত্র ৳১২০। ৪৮ থেকে ৭২ ঘণ্টার মধ্যে ডেলিভারি ও cash on delivery সুবিধা।</p>
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
              <span className="text-xs font-black uppercase text-teal-600">কমপ্লিট দ্য লুক</span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                আপনার পছন্দের আরও কালেকশন
              </h3>
            </div>
            <button
              onClick={() => onNavigateShop(product.category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-'))}
              className="text-xs font-bold text-teal-700 hover:underline cursor-pointer"
            >
              {product.category} এর আরও দেখুন
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
                <h4 className="text-base font-bold text-slate-900">Astera সাইজ চার্ট (ইঞ্চি)</h4>
              </div>
              <button
                onClick={() => setShowSizeGuide(false)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold cursor-pointer"
              >
                বন্ধ করুন
              </button>
            </div>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-xs text-left text-slate-700">
                <thead className="bg-slate-50 text-slate-900 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="p-2.5">সাইজ</th>
                    <th className="p-2.5">বুক (Chest)</th>
                    <th className="p-2.5">লম্বা (Length)</th>
                    <th className="p-2.5">কাঁধ (Shoulder)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="p-2.5 font-bold">S</td>
                    <td className="p-2.5">৩৮"</td>
                    <td className="p-2.5">২৭"</td>
                    <td className="p-2.5">১৭.৫"</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">M</td>
                    <td className="p-2.5">৪০"</td>
                    <td className="p-2.5">২৮"</td>
                    <td className="p-2.5">১৮.৫"</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">L</td>
                    <td className="p-2.5">৪২"</td>
                    <td className="p-2.5">২৯"</td>
                    <td className="p-2.5">১৯.৫"</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">XL</td>
                    <td className="p-2.5">৪৪"</td>
                    <td className="p-2.5">৩০"</td>
                    <td className="p-2.5">২০.৫"</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">XXL</td>
                    <td className="p-2.5">৪৬"</td>
                    <td className="p-2.5">৩১"</td>
                    <td className="p-2.5">২১.৫"</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-[11px] text-slate-500">
              *সকল পরিমাপ ইঞ্চিতে দেওয়া হয়েছে। আপনি যদি কিছুটা ঢিলেঢালা রিল্যাক্সড ফিট পছন্দ করেন, তবে এক সাইজ বড় নির্বাচন করার পরামর্শ দেওয়া হচ্ছে।
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
