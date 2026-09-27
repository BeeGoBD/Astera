import React, { useState } from 'react';
import { PROMO_COUPONS } from '../data/mockData';
import { Tag, Sparkles, Copy, Check, ArrowRight, Clock, ShieldCheck } from 'lucide-react';

interface OffersPageProps {
  onNavigateShop: () => void;
  onApplyPromoCode: (code: string) => void;
}

export const OffersPage: React.FC<OffersPageProps> = ({
  onNavigateShop,
  onApplyPromoCode,
}) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    onApplyPromoCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-rose-950 via-slate-900 to-teal-950 p-8 sm:p-12 text-white relative overflow-hidden shadow-xl border border-rose-900/30 mb-10">
        <div className="relative z-10 max-w-2xl">
          <span className="px-3 py-1 bg-rose-600/30 text-rose-300 rounded-full text-xs font-black uppercase tracking-wider inline-flex items-center gap-1.5 border border-rose-500/40 mb-3">
            <Sparkles className="w-3.5 h-3.5" /> বিশেষ ডিসকাউন্ট ভাউচার
          </span>
          <h1
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
          >
            অফার ও প্রোমো কোড
          </h1>
          <p className="mt-2 text-sm text-slate-300">
            নিচের যেকোনো সক্রিয় কুপন কোড কপি করুন এবং চেকআউটের সময় ব্যবহার করে অতিরিক্ত ছাড় উপভোগ করুন।
          </p>
        </div>
      </div>

      {/* Coupons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PROMO_COUPONS.map((coupon) => (
          <div
            key={coupon.code}
            className="bg-white rounded-2xl border border-slate-100 shadow-2xs hover:shadow-md transition-all p-6 flex flex-col justify-between relative overflow-hidden group"
          >
            {/* Hot Badge */}
            {coupon.isHot && (
              <div className="absolute top-0 right-0">
                <span className="px-3 py-1 bg-rose-600 text-white text-[10px] font-black uppercase rounded-bl-xl tracking-wider">
                  হট অফার
                </span>
              </div>
            )}

            <div>
              <div className="flex items-center gap-2 text-teal-600 font-bold text-xs uppercase mb-1">
                <Tag className="w-4 h-4" />
                <span>{coupon.title}</span>
              </div>

              <h3 className="text-2xl font-black text-slate-900 mt-1">
                {coupon.discountAmountOrPercent}
              </h3>

              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {coupon.discountDescription}
              </p>

              <div className="mt-4 flex items-center gap-4 text-xs text-slate-400">
                <span>সর্বনিম্ন কেনাকাটা: <strong>৳{coupon.minSpend.toLocaleString()}</strong></span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {coupon.expiryDate}
                </span>
              </div>
            </div>

            {/* Voucher Code Box */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <div className="px-3.5 py-2 bg-slate-50 border border-dashed border-teal-500 rounded-xl font-mono text-sm font-black text-teal-800 tracking-wider">
                {coupon.code}
              </div>

              <button
                type="button"
                onClick={() => handleCopy(coupon.code)}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95 ${
                  copiedCode === coupon.code
                    ? 'bg-emerald-600 text-white'
                    : 'bg-teal-600 hover:bg-teal-700 text-white'
                }`}
              >
                {copiedCode === coupon.code ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>কপি ও সক্রিয় হয়েছে!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>কোড কপি করুন</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Terms Strip */}
      <div className="mt-12 p-6 rounded-2xl bg-slate-50 border border-slate-200/70 text-xs text-slate-600 space-y-2">
        <h4 className="font-bold text-slate-900 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-teal-600" /> Astera ভাউচার ব্যবহারের নিয়মাবলী ও পলিসি
        </h4>
        <p>
          • প্রতি অর্ডারে একটি কুপন কোড ব্যবহার করা যাবে। বিশেষ ক্লিয়ারেন্স বা স্পেশাল কম্বো অফারে এটি প্রযোজ্য নাও হতে পারে।
        </p>
        <p>
          • যেকোনো অর্ডারে মোট মূল্য ৳২,৫০০ বা তার বেশি হলে কোনো কোড ছাড়াই স্বয়ংক্রিয়ভাবে ফ্রি ডেলিভারি সক্রিয় হবে।
        </p>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={onNavigateShop}
          className="px-8 py-3.5 bg-slate-900 hover:bg-teal-700 text-white font-bold text-sm rounded-xl transition-colors inline-flex items-center gap-2 cursor-pointer"
        >
          <span>ডিসকাউন্ট সহ কেনাকাটা শুরু করুন</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
