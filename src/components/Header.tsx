import React, { useState, useEffect, useRef } from 'react';
import { Search, ShoppingBag, User, Menu, X, ArrowRight, Phone, Sparkles } from 'lucide-react';
import { Logo } from './Logo';
import { CATEGORIES, PRODUCTS } from '../data/mockData';
import { Product } from '../types';

interface HeaderProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onOpenAuth: () => void;
  currentView: string;
  onNavigate: (view: string, param?: string) => void;
  selectedCategory?: string;
  onSelectCategory?: (categorySlug: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectProduct: (productId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  cartTotal,
  onOpenCart,
  onOpenAuth,
  currentView,
  onNavigate,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onSelectProduct,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close search suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter products for quick search dropdown
  const searchResults: Product[] = searchQuery.trim().length > 1
    ? PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate('shop');
      setSearchFocused(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
      {/* Top Announcement Bar (Falaq Food style Hotline + delivery info) */}
      <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-teal-400 font-medium">
              <Phone className="w-3.5 h-3.5" />
              হটলাইন: <strong className="text-white">01700-000000</strong> / <strong className="text-white">09613-888999</strong>
            </span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-300">সারা বাংলাদেশে দ্রুত ডেলিভারি (ঢাকায় ২৪ ঘণ্টায়)</span>
          </div>
          <div className="flex items-center gap-4 font-medium">
            <span className="text-amber-300 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> ৳২,৫০০ বা তদূর্ধ্ব অর্ডারে ফ্রি ডেলিভারি
            </span>
            <button
              onClick={() => onNavigate('contact')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              স্টোর লোকেশন
            </button>
            <button
              onClick={() => onNavigate('about')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              কেন Astera
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-3 md:gap-6">
          {/* Left: Astera Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('home')}
              className="focus:outline-none text-left"
              aria-label="Astera Home"
            >
              <Logo size="md" showTagline={false} />
            </button>
          </div>

          {/* Center: Search Bar (Rounded, Falaq Food signature search experience) */}
          <div
            ref={searchContainerRef}
            className="relative flex-1 max-w-xl hidden sm:block"
          >
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="টি-শার্ট, জিন্স, টপস, কুর্তি খুঁজুন... (যেমন 'Product 1')"
                value={searchQuery}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  setSearchFocused(true);
                }}
                onFocus={() => setSearchFocused(true)}
                className="w-full pl-11 pr-24 py-2.5 bg-slate-50 border border-slate-200/90 rounded-full text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all shadow-2xs"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded-full transition-colors shadow-xs"
              >
                খুঁজুন
              </button>
            </form>

            {/* Quick Live Search Dropdown */}
            {searchFocused && searchQuery.trim().length > 1 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="p-2 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center text-xs text-slate-500 px-3">
                  <span>অনুসন্ধানের ফলাফল: "{searchQuery}"</span>
                  <span>{searchResults.length} টি পাওয়া গেছে</span>
                </div>
                {searchResults.length > 0 ? (
                  <div className="divide-y divide-slate-50 max-h-72 overflow-y-auto">
                    {searchResults.map((product) => (
                      <button
                        key={product.id}
                        type="button"
                        onClick={() => {
                          onSelectProduct(product.id);
                          setSearchFocused(false);
                        }}
                        className="w-full px-3 py-2.5 flex items-center justify-between text-left hover:bg-teal-50/50 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-[10px] font-bold text-slate-600">
                            {product.name}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-800 group-hover:text-teal-700">
                              {product.name}
                            </p>
                            <p className="text-xs text-slate-400">{product.category}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-bold text-teal-600">
                            ৳{product.price.toLocaleString()}
                          </span>
                          <span className="text-xs text-slate-400 line-through ml-1.5">
                            ৳{product.originalPrice.toLocaleString()}
                          </span>
                        </div>
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        onNavigate('shop');
                        setSearchFocused(false);
                      }}
                      className="w-full py-2.5 text-center text-xs font-semibold text-teal-600 hover:text-teal-700 hover:bg-slate-50 transition-colors flex items-center justify-center gap-1"
                    >
                      শপে সবগুলো প্রোডাক্ট দেখুন <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="p-4 text-center text-sm text-slate-500">
                    "{searchQuery}" এর সাথে মিল রয়েছে এমন কোনো প্রোডাক্ট পাওয়া যায়নি।
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Center/Right Nav: Home | Shop | Blog | Combos | Offers (with bright red "NEW" badge) */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-700">
            <button
              onClick={() => onNavigate('home')}
              className={`transition-colors hover:text-teal-600 cursor-pointer ${
                currentView === 'home' ? 'text-teal-600 font-bold' : ''
              }`}
            >
              হোম
            </button>
            <button
              onClick={() => onNavigate('shop')}
              className={`transition-colors hover:text-teal-600 cursor-pointer ${
                currentView === 'shop' ? 'text-teal-600 font-bold' : ''
              }`}
            >
              শপ
            </button>
            <button
              onClick={() => onNavigate('combos')}
              className={`transition-colors hover:text-teal-600 cursor-pointer ${
                currentView === 'combos' ? 'text-teal-600 font-bold' : ''
              }`}
            >
              কম্বো
            </button>
            <button
              onClick={() => onNavigate('offers')}
              className="relative transition-colors hover:text-teal-600 flex items-center cursor-pointer"
            >
              <span>অফার</span>
              {/* Bright Red "NEW" Badge as required */}
              <span className="ml-1.5 px-1.5 py-0.5 text-[10px] font-extrabold uppercase bg-rose-600 text-white rounded-full tracking-wider animate-pulse">
                NEW
              </span>
            </button>
            <button
              onClick={() => onNavigate('blog')}
              className={`transition-colors hover:text-teal-600 cursor-pointer ${
                currentView === 'blog' ? 'text-teal-600 font-bold' : ''
              }`}
            >
              ব্লগ
            </button>
          </nav>

          {/* Right Actions: Cart Icon + Sign In */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Sign In Button */}
            <button
              onClick={onOpenAuth}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-teal-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              <User className="w-4 h-4 text-slate-600" />
              <span>সাইন ইন</span>
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-3 py-2 bg-teal-50 hover:bg-teal-100 text-teal-800 rounded-xl transition-all active:scale-95 shadow-2xs group"
              aria-label="View Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-teal-700 transition-transform group-hover:scale-110" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-rose-600 text-white rounded-full text-[10px] font-extrabold flex items-center justify-center ring-2 ring-white">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline font-bold text-xs text-teal-900">
                {cartTotal > 0 ? `৳${cartTotal.toLocaleString()}` : '৳0'}
              </span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-teal-600 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-2.5 sm:hidden">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="টি-শার্ট, জিন্স বা পোশাক খুঁজুন..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-16 py-2 bg-slate-50 border border-slate-200 rounded-full text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <button
              type="submit"
              className="absolute right-1 top-1/2 -translate-y-1/2 px-3 py-1 bg-teal-600 text-white text-[11px] font-semibold rounded-full"
            >
              খুঁজুন
            </button>
          </form>
        </div>
      </div>

      {/* Secondary Category Bar Below (Falaq Food signature subheader) */}
      <div className="bg-slate-50/90 border-t border-slate-100 overflow-x-auto no-scrollbar py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-1 sm:gap-2 min-w-max text-xs font-medium text-slate-600">
          <button
            onClick={() => {
              if (onSelectCategory) onSelectCategory('all');
              onNavigate('shop');
            }}
            className={`px-3 py-1 rounded-full transition-colors ${
              !selectedCategory || selectedCategory === 'all'
                ? 'bg-teal-600 text-white font-semibold shadow-xs'
                : 'hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            সবগুলো
          </button>
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  if (onSelectCategory) onSelectCategory(cat.slug);
                  onNavigate('shop');
                }}
                className={`px-3 py-1 rounded-full transition-colors whitespace-nowrap ${
                  isActive
                    ? 'bg-teal-600 text-white font-semibold shadow-xs'
                    : 'hover:text-slate-900 hover:bg-slate-200/60 text-slate-600'
                }`}
              >
                {cat.nameBn || cat.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white p-4 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-3 font-semibold text-slate-700 text-sm">
            <button
              onClick={() => {
                onNavigate('home');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 px-3 rounded-lg hover:bg-slate-50"
            >
              হোম
            </button>
            <button
              onClick={() => {
                onNavigate('shop');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 px-3 rounded-lg hover:bg-slate-50"
            >
              শপ ক্যাটালগ
            </button>
            <button
              onClick={() => {
                onNavigate('combos');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 px-3 rounded-lg hover:bg-slate-50"
            >
              ফ্যাশন কম্বো
            </button>
            <button
              onClick={() => {
                onNavigate('offers');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 px-3 rounded-lg hover:bg-slate-50 flex items-center justify-between"
            >
              <span>অফার ও ভাউচার</span>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-rose-600 text-white rounded-full">
                NEW
              </span>
            </button>
            <button
              onClick={() => {
                onNavigate('blog');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 px-3 rounded-lg hover:bg-slate-50"
            >
              স্টাইল গাইড ও ব্লগ
            </button>
            <button
              onClick={() => {
                onNavigate('about');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 px-3 rounded-lg hover:bg-slate-50"
            >
              Astera সম্পর্কে
            </button>
            <button
              onClick={() => {
                onNavigate('contact');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 px-3 rounded-lg hover:bg-slate-50"
            >
              যোগাযোগ ও স্টোর লোকেশন
            </button>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => {
                  onOpenAuth();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 py-2 text-teal-700 font-bold"
              >
                <User className="w-4 h-4" /> সাইন ইন / অ্যাকাউন্ট তৈরি করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
