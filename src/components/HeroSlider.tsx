import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles, Tag, ShieldCheck, Zap } from 'lucide-react';

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
  patternStyle: string;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ onNavigate }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: SlideItem[] = [
    {
      id: 1,
      tag: 'NEW SUMMER DROP 2026',
      headline: 'Vibrant Fits. Everyday Confidence.',
      subheadline: 'Engineered for modern Dhaka living — breathable combed cotton, tailored drape, and bold street aesthetics.',
      discountBadge: 'FLAT 35% OFF',
      ctaText: 'Explore Summer Drop',
      categoryTarget: 't-shirts-tops',
      bgGradient: 'from-slate-900 via-teal-950 to-emerald-900',
      accentBadgeColor: 'bg-rose-500',
      patternStyle: 'radial-teal',
    },
    {
      id: 2,
      tag: 'PREMIUM DENIM & TAILORED BOTTOMS',
      headline: 'Heavyweight Fabrics, Sculptural Cuts.',
      subheadline: '12.5 oz Japanese-inspired ring-spun denim with comfortable 4-way stretch and reinforced brass hardware.',
      discountBadge: 'UP TO 40% OFF',
      ctaText: 'Shop Bottoms & Denim',
      categoryTarget: 'jeans-bottoms',
      bgGradient: 'from-slate-950 via-slate-900 to-indigo-950',
      accentBadgeColor: 'bg-teal-500',
      patternStyle: 'radial-indigo',
    },
    {
      id: 3,
      tag: 'FESTIVE ETHNIC FUSION',
      headline: 'Effortless Grace, Contemporary Cuts.',
      subheadline: 'From daytime brunches to celebratory evening galas — crafted in modal silk with artisanal necklines.',
      discountBadge: 'EXCLUSIVE DROP',
      ctaText: 'Browse Dresses & Ethnic',
      categoryTarget: 'dresses',
      bgGradient: 'from-teal-950 via-slate-900 to-rose-950',
      accentBadgeColor: 'bg-amber-500',
      patternStyle: 'radial-rose',
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
        <div className="lg:col-span-8 relative rounded-2xl md:rounded-3xl overflow-hidden shadow-lg border border-slate-100 min-h-[360px] sm:min-h-[420px] md:min-h-[460px] flex flex-col justify-between group">
          {/* Background Gradient & Vector Ambient Graphic */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${slide.bgGradient} transition-colors duration-700`}
          />

          {/* Decorative High-Fashion Graphic Silhouettes & Grids */}
          <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="heroGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#heroGrid)" />
              <circle cx="85%" cy="30%" r="180" fill="rgba(20, 184, 166, 0.25)" filter="blur(40px)" />
              <circle cx="20%" cy="80%" r="140" fill="rgba(244, 63, 94, 0.2)" filter="blur(50px)" />
            </svg>
          </div>

          {/* Top Tag & Badge */}
          <div className="relative z-10 p-6 md:p-8 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs font-bold tracking-wider text-teal-300 uppercase flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                {slide.tag}
              </span>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-black text-white shadow-md tracking-wider ${slide.accentBadgeColor}`}
            >
              {slide.discountBadge}
            </span>
          </div>

          {/* Main Content Area */}
          <div className="relative z-10 px-6 md:px-10 py-4 max-w-xl">
            <h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {slide.headline}
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
              {slide.subheadline}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate('shop', slide.categoryTarget)}
                className="px-6 py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-md shadow-teal-500/20 active:scale-95 flex items-center gap-2 group/btn cursor-pointer"
              >
                <span>{slide.ctaText}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
              </button>
              <button
                onClick={() => onNavigate('offers')}
                className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm rounded-xl border border-white/20 backdrop-blur-sm transition-all"
              >
                View Promo Deals
              </button>
            </div>
          </div>

          {/* Bottom Slider Nav & Pagination Dots */}
          <div className="relative z-10 p-6 md:p-8 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {slides.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentSlide === idx ? 'w-8 bg-teal-400' : 'w-2 bg-white/30 hover:bg-white/60'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors border border-white/15"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors border border-white/15"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Stacked Promotional Banners (4 Cols on Desktop) */}
        <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4">
          {/* Stacked Banner 1: New Arrivals */}
          <div
            onClick={() => onNavigate('shop', 'mens-wear')}
            className="flex-1 relative rounded-2xl md:rounded-3xl overflow-hidden p-6 bg-gradient-to-br from-teal-900 to-slate-900 text-white cursor-pointer group shadow-sm hover:shadow-md transition-all border border-teal-800/30 flex flex-col justify-between min-h-[195px]"
          >
            <div className="absolute top-0 right-0 w-36 h-36 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10 flex items-start justify-between">
              <span className="px-2.5 py-1 bg-teal-500/20 border border-teal-400/30 rounded-md text-[11px] font-extrabold text-teal-300 uppercase tracking-wider flex items-center gap-1">
                <Tag className="w-3 h-3 text-teal-400" /> New Arrivals
              </span>
              <span className="px-2 py-0.5 bg-rose-600 text-white text-[10px] font-extrabold rounded-full">
                HOT
              </span>
            </div>

            <div className="relative z-10 mt-3">
              <h3 className="text-xl font-extrabold text-white tracking-tight leading-tight group-hover:text-teal-300 transition-colors">
                Urban Casuals Drop
              </h3>
              <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                Heavy knit tees, cuban shirts &amp; comfort trousers starting from ৳990.
              </p>
            </div>

            <div className="relative z-10 mt-4 flex items-center text-xs font-bold text-teal-300 group-hover:translate-x-1 transition-transform">
              <span>Shop Collection</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>

          {/* Stacked Banner 2: Flat 40% Off */}
          <div
            onClick={() => onNavigate('offers')}
            className="flex-1 relative rounded-2xl md:rounded-3xl overflow-hidden p-6 bg-gradient-to-br from-rose-950 via-slate-900 to-slate-900 text-white cursor-pointer group shadow-sm hover:shadow-md transition-all border border-rose-900/30 flex flex-col justify-between min-h-[195px]"
          >
            <div className="absolute top-0 right-0 w-36 h-36 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10 flex items-start justify-between">
              <span className="px-2.5 py-1 bg-rose-500/20 border border-rose-400/30 rounded-md text-[11px] font-extrabold text-rose-300 uppercase tracking-wider flex items-center gap-1">
                <Zap className="w-3 h-3 text-rose-400" /> Flash Promo
              </span>
              <span className="text-xs font-extrabold text-amber-300">
                LIMITED RUN
              </span>
            </div>

            <div className="relative z-10 mt-3">
              <h3 className="text-xl font-extrabold text-white tracking-tight leading-tight group-hover:text-rose-300 transition-colors">
                Flat 40% Off Combos
              </h3>
              <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                Curated style bundles with instant multi-product discounts across Bangladesh.
              </p>
            </div>

            <div className="relative z-10 mt-4 flex items-center text-xs font-bold text-rose-300 group-hover:translate-x-1 transition-transform">
              <span>View Offers</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges Strip (Falaq Food customer assurance feature) */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 bg-white p-4 rounded-2xl border border-slate-100 shadow-2xs text-xs">
        <div className="flex items-center gap-2.5 px-2 py-1">
          <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600 shrink-0">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold text-slate-800">24-48h Delivery</p>
            <p className="text-[11px] text-slate-400">Inside Dhaka &amp; Nationwide</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 px-2 py-1">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold text-slate-800">100% Cotton &amp; Fabric</p>
            <p className="text-[11px] text-slate-400">Pre-tested colorfast quality</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 px-2 py-1">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
            <Tag className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold text-slate-800">Cash on Delivery</p>
            <p className="text-[11px] text-slate-400">Check on arrival &amp; pay</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 px-2 py-1">
          <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center text-rose-600 shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold text-slate-800">7-Day Easy Exchange</p>
            <p className="text-[11px] text-slate-400">Hassle-free size replacement</p>
          </div>
        </div>
      </div>
    </section>
  );
};
