import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles, Tag, ShieldCheck, Zap } from 'lucide-react';
import { HeroArtwork } from './HeroArtwork';

interface HeroSliderProps {
  onNavigate: (view: string, param?: string) => void;
}

interface SlideItem {
  id: number;
  tag: string;
  headline: string;
  subheadline: string;
  discountBadge: string;
  ctaText: string;
  categoryTarget: string;
  bgGradient: string;
  accentBadgeColor: string;
  photoUrl: string;
  artworkType: 'summer' | 'denim' | 'festive';
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ onNavigate }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imgError, setImgError] = useState<Record<number, boolean>>({});

  const slides: SlideItem[] = [
    {
      id: 1,
      tag: 'NEW SUPREME TOP 2026',
      headline: 'New Supreme Top 2026: Vibrant Fits Everyday Confidence',
      subheadline: 'আধুনিক ঢাকার জীবনযাত্রার উপযোগী — ব্রিদেবল কম্বড কটন, নিখুঁত ড্র্যাপ এবং ট্রেন্ডি স্ট্রিট ফ্যাশন।',
      discountBadge: 'ফ্ল্যাট ৩৫% ছাড়',
      ctaText: 'কালেকশন দেখুন',
      categoryTarget: 't-shirts-tops',
      bgGradient: 'from-slate-950 via-teal-950 to-slate-900',
      accentBadgeColor: 'bg-rose-500',
      photoUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85',
      artworkType: 'summer',
    },
    {
      id: 2,
      tag: 'PREMIUM DENIM & TAILORED BOTTOMS',
      headline: 'প্রিমিয়াম ডেনিম ও নিখুঁত কাটিং',
      subheadline: '১২.৫ আউন্স জাপানিজ রিং-স্পান ডেনিম, আরামদায়ক ৪-ওয়ে স্ট্রেচ এবং স্থায়ী হেভি মেটাল হার্ডওয়্যার।',
      discountBadge: 'সর্বোচ্চ ৪০% পর্যন্ত ছাড়',
      ctaText: 'বটমস ও জিন্স দেখুন',
      categoryTarget: 'jeans-bottoms',
      bgGradient: 'from-slate-950 via-slate-900 to-indigo-950',
      accentBadgeColor: 'bg-teal-500',
      photoUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1200&q=85',
      artworkType: 'denim',
    },
    {
      id: 3,
      tag: 'FESTIVE ETHNIC FUSION',
      headline: 'আধুনিক আভিজাত্য ও ট্রেন্ডি স্টাইল',
      subheadline: 'দিনের উৎসব কিংবা জমকালো রাতের পার্টির জন্য তৈরি মোডাল সিল্ক ও আধুনিক জরি নেকলাইনের অপূর্ব সমন্বয়।',
      discountBadge: 'এক্সক্লুসিভ ড্রপ',
      ctaText: 'ড্রেস ও ফিউশন দেখুন',
      categoryTarget: 'dresses',
      bgGradient: 'from-teal-950 via-slate-900 to-rose-950',
      accentBadgeColor: 'bg-amber-500',
      photoUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85',
      artworkType: 'festive',
    },
  ];

  // Auto-advance slides every 5.5s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const slide = slides[currentSlide];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-8">
      {/* 2-Column Hero Layout matching Falaq Food (Left slider + Right stacked banners) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
        {/* Large Left Carousel / Slider (8 Cols on Desktop) */}
        <div className="lg:col-span-8 relative rounded-2xl md:rounded-3xl overflow-hidden shadow-lg border border-slate-100 min-h-[420px] sm:min-h-[460px] md:min-h-[500px] flex flex-col justify-between group">
          {/* Background Gradient */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${slide.bgGradient} transition-colors duration-700`}
          />

          {/* Decorative High-Fashion Atmospheric Lighting */}
          <div className="absolute inset-0 opacity-25 pointer-events-none mix-blend-screen">
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-400/30 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-10 w-80 h-80 bg-rose-500/20 rounded-full blur-3xl" />
          </div>

          {/* Super Premium Clothing Visual / Editorial Model Image on Right Side */}
          <div className="absolute right-0 bottom-0 top-0 w-7/12 sm:w-1/2 flex items-end justify-center pointer-events-none z-10 overflow-hidden">
            {!imgError[slide.id] ? (
              <div className="relative w-full h-full flex items-end justify-end">
                {/* Clean soft shadow behind model */}
                <img
                  src={slide.photoUrl}
                  alt={slide.headline}
                  onError={() => setImgError((prev) => ({ ...prev, [slide.id]: true }))}
                  className="w-full h-full object-cover object-center sm:object-right opacity-90 transition-transform duration-700 group-hover:scale-105 mask-radial"
                  style={{
                    maskImage: 'linear-gradient(to right, transparent 0%, black 25%, black 100%)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 25%, black 100%)',
                  }}
                />
                {/* Floating Tag */}
                <div className="absolute bottom-16 right-4 sm:right-8 bg-slate-900/80 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-xl shadow-lg hidden sm:flex items-center gap-2 text-white text-xs">
                  <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
                  <span className="font-bold">100% cotton</span>
                  <span className="text-teal-300 font-mono">· AST-2026</span>
                </div>
              </div>
            ) : (
              <HeroArtwork type={slide.artworkType} className="h-full max-h-[460px]" />
            )}
          </div>

          {/* Top Tag & Badge */}
          <div className="relative z-20 p-6 md:p-8 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs font-black tracking-wider text-teal-300 uppercase flex items-center gap-1.5 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                {slide.tag}
              </span>
            </div>
            <span
              className={`px-3.5 py-1.5 rounded-full text-xs font-black text-white shadow-md tracking-wider ${slide.accentBadgeColor}`}
            >
              {slide.discountBadge}
            </span>
          </div>

          {/* Main Content Area */}
          <div className="relative z-20 px-6 md:px-10 py-4 max-w-lg sm:max-w-xl">
            <h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.18]"
            >
              {slide.headline}
            </h1>
            <p className="mt-3 text-xs sm:text-sm md:text-base text-slate-200 font-normal leading-relaxed max-w-md drop-shadow-sm">
              {slide.subheadline}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate('shop', slide.categoryTarget)}
                className="px-6 py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-xs sm:text-sm rounded-xl transition-all shadow-md shadow-teal-500/25 active:scale-95 flex items-center gap-2 group/btn cursor-pointer"
              >
                <span>{slide.ctaText}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
              </button>
              <button
                onClick={() => onNavigate('offers')}
                className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm rounded-xl border border-white/20 backdrop-blur-sm transition-all cursor-pointer"
              >
                অফারসমূহ দেখুন
              </button>
            </div>
          </div>

          {/* Bottom Slider Nav & Pagination Dots */}
          <div className="relative z-20 p-6 md:p-8 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {slides.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    currentSlide === idx ? 'w-8 bg-teal-400' : 'w-2 bg-white/30 hover:bg-white/60'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors border border-white/15 cursor-pointer"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors border border-white/15 cursor-pointer"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Stacked Promotional Banners (4 Cols on Desktop) */}
        <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4">
          {/* Stacked Banner 1: New Arrivals / Urban Casuals Drop */}
          <div
            onClick={() => onNavigate('shop', 'mens-wear')}
            className="flex-1 relative rounded-2xl md:rounded-3xl overflow-hidden p-6 bg-gradient-to-br from-teal-950 via-slate-900 to-slate-950 text-white cursor-pointer group shadow-sm hover:shadow-md transition-all border border-teal-800/30 flex flex-col justify-between min-h-[220px]"
          >
            {/* Background Fashion Photo Blend */}
            <div className="absolute inset-0 opacity-40 mix-blend-overlay group-hover:opacity-50 transition-opacity">
              <img
                src="https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&w=800&q=85"
                alt="Urban Casual Drop"
                className="w-full h-full object-cover object-top"
              />
            </div>
            {/* Ambient Background Flare */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-teal-500/20 rounded-full blur-2xl pointer-events-none" />

            {/* Premium Clothing Graphic for Urban Casuals Drop */}
            <div className="absolute -right-1 -bottom-1 w-28 h-28 pointer-events-none opacity-85 group-hover:scale-105 transition-transform">
              <HeroArtwork type="urban" />
            </div>

            <div className="relative z-10 flex items-start justify-between">
              <span className="px-2.5 py-1 bg-teal-500/20 border border-teal-400/30 rounded-md text-[11px] font-black text-teal-300 uppercase tracking-wider flex items-center gap-1">
                <Tag className="w-3 h-3 text-teal-400" /> New Arrivals
              </span>
              <span className="px-2 py-0.5 bg-rose-600 text-white text-[10px] font-extrabold rounded-full">
                HOT
              </span>
            </div>

            <div className="relative z-10 mt-3 pr-16">
              <h3 className="text-xl font-extrabold text-white tracking-tight leading-tight group-hover:text-teal-300 transition-colors">
                Urban Casual Drop
              </h3>
              <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                হেভি নিট টি-শার্ট, কিউবান কলার শার্ট ও ট্রাউজার — শুরু মাত্র ৳৯৯০ থেকে।
              </p>
            </div>

            <div className="relative z-10 mt-4 flex items-center text-xs font-bold text-teal-300 group-hover:translate-x-1 transition-transform">
              <span>কালেকশন কিনুন</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>

          {/* Stacked Banner 2: Flat 40% Off Combo */}
          <div
            onClick={() => onNavigate('offers')}
            className="flex-1 relative rounded-2xl md:rounded-3xl overflow-hidden p-6 bg-gradient-to-br from-rose-950 via-slate-900 to-slate-950 text-white cursor-pointer group shadow-sm hover:shadow-md transition-all border border-rose-900/30 flex flex-col justify-between min-h-[220px]"
          >
            {/* Background Fashion Photo Blend */}
            <div className="absolute inset-0 opacity-40 mix-blend-overlay group-hover:opacity-50 transition-opacity">
              <img
                src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=800&q=85"
                alt="Flat 40% Off Combo"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Ambient Background Flare */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-rose-500/20 rounded-full blur-2xl pointer-events-none" />

            {/* Premium Clothing Graphic for 40% Off Combo */}
            <div className="absolute -right-1 -bottom-1 w-28 h-28 pointer-events-none opacity-85 group-hover:scale-105 transition-transform">
              <HeroArtwork type="combo" />
            </div>

            <div className="relative z-10 flex items-start justify-between">
              <span className="px-2.5 py-1 bg-rose-500/20 border border-rose-400/30 rounded-md text-[11px] font-black text-rose-300 uppercase tracking-wider flex items-center gap-1">
                <Zap className="w-3 h-3 text-rose-400" /> Flash Promo
              </span>
              <span className="text-xs font-extrabold text-amber-300">
                LIMITED RUN
              </span>
            </div>

            <div className="relative z-10 mt-3 pr-16">
              <h3 className="text-xl font-extrabold text-white tracking-tight leading-tight group-hover:text-rose-300 transition-colors">
                Flat 40% Off Combo
              </h3>
              <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                ম্যাচিং স্টাইল বান্ডিল এবং নিশ্চিত ডিসকাউন্ট প্যাকেজ — ডেলিভারি সারা বাংলাদেশে।
              </p>
            </div>

            <div className="relative z-10 mt-4 flex items-center text-xs font-bold text-rose-300 group-hover:translate-x-1 transition-transform">
              <span>অফার দেখুন</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges Strip (STRICT RULE: Keep exactly in English as requested) */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 bg-white p-4 rounded-2xl border border-slate-100 shadow-2xs text-xs">
        <div className="flex items-center gap-2.5 px-2 py-1">
          <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600 shrink-0">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold text-slate-800">24 to 48 hours delivery</p>
            <p className="text-[11px] text-slate-400">Inside Dhaka &amp; Nationwide</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 px-2 py-1">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold text-slate-800">100% cotton</p>
            <p className="text-[11px] text-slate-400">Pre-tested colorfast quality</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 px-2 py-1">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
            <Tag className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold text-slate-800">cash on delivery</p>
            <p className="text-[11px] text-slate-400">Check on arrival &amp; pay</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 px-2 py-1">
          <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center text-rose-600 shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold text-slate-800">7 days easy exchange</p>
            <p className="text-[11px] text-slate-400">Hassle-free size replacement</p>
          </div>
        </div>
      </div>
    </section>
  );
};


