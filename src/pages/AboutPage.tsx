import React from 'react';
import { Logo } from '../components/Logo';
import { ShieldCheck, Heart, Sparkles, Award, ArrowRight } from 'lucide-react';

interface AboutPageProps {
  onNavigateShop: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigateShop }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Hero */}
      <div className="rounded-3xl bg-gradient-to-r from-teal-950 via-slate-900 to-slate-950 p-8 sm:p-14 text-white relative overflow-hidden shadow-xl mb-12">
        <div className="relative z-10 max-w-2xl">
          <span className="px-3 py-1 bg-teal-500/20 text-teal-300 rounded-full text-xs font-black uppercase tracking-wider inline-flex items-center gap-1.5 border border-teal-400/30 mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Our Story &amp; Philosophy
          </span>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Crafting Confidence Through Everyday Fashion
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
            Astera was born in Dhaka to solve a simple challenge: providing contemporary international streetwear silhouettes tailored specifically for South Asian weather, without sacrificing fabric durability or affordability.
          </p>
        </div>
      </div>

      {/* Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-2xs">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mb-4">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Zero Fabric Compromise</h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
            We use 100% compact combed cotton, high-density ring-spun denim, and pre-shrunk washes tested up to 50 laundry cycles.
          </p>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-2xs">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Designed for Dhaka Life</h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
            From humidity-defying breathable cuts to flexible stretch denim, each Astera piece empowers you through active commutes and social weekends.
          </p>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-2xs">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">100+ Boutiques Trust Us</h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
            Astera partners with over a hundred independent retailers and boutiques across Bangladesh as a trusted wholesale and retail brand.
          </p>
        </div>
      </div>

      {/* CTA Box */}
      <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200/80 text-center max-w-2xl mx-auto">
        <h3 className="text-xl font-bold text-slate-900">Ready to Upgrade Your Daily Wardrobe?</h3>
        <p className="text-xs text-slate-500 mt-1">
          Explore our latest collection with Cash on Delivery across Bangladesh.
        </p>
        <button
          onClick={onNavigateShop}
          className="mt-5 px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors inline-flex items-center gap-2"
        >
          <span>Explore Collections</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
