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
            <Sparkles className="w-3.5 h-3.5" /> আমাদের গল্প ও লক্ষ্য
          </span>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight"
          >
            প্রতিদিনের ফ্যাশনে নতুন আত্মবিশ্বাস
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
            Astera-র যাত্রা শুরু ঢাকার বুকে এক অনন্য লক্ষ্য নিয়ে — আন্তর্জাতিক ট্রেন্ডি স্ট্রিটওয়্যার ও আধুনিক লাইফস্টাইল পোশাক আমাদের দেশের আবহাওয়ার উপযোগী প্রিমিয়াম ফেব্রিকে সবার নাগালে পৌঁছে দেওয়া।
          </p>
        </div>
      </div>

      {/* Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-2xs">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mb-4">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">100% cotton প্রিমিয়াম ফেব্রিক</h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
            আমরা ব্যবহার করি খাঁটি কম্বড কটন, হাই-ডেনসিটি রিং-স্পান ডেনিম এবং দীর্ঘস্থায়ী কালারফাস্ট ওয়াশ যা ৫০টি লন্ড্রি ওয়াশের পরও থাকে অটুট।
          </p>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-2xs">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">আধুনিক জীবনযাত্রার উপযোগী</h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
            গরমে আরামদায়ক হালকা সুতা ও স্ট্রেচেবল ডেনিমের কাটিং আপনাকে অফিস, ভার্সিটি কিংবা আড্ডায় সবসময় রাখবে ফ্রেশ ও স্টাইলিশ।
          </p>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-2xs">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">১০০+ রিটেইলারদের আস্থা</h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
            সারাদেশের বিশ্বস্ত বুটিক ও ফ্যাশন রিটেইলারদের নিকট Astera একটি নির্ভরযোগ্য হোলসেল এবং রিটেইল লাইফস্টাইল ব্র্যান্ড।
          </p>
        </div>
      </div>

      {/* CTA Box */}
      <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200/80 text-center max-w-2xl mx-auto">
        <h3 className="text-xl font-bold text-slate-900">আপনার ওয়ারড্রোবকে সাজান নতুন স্টাইলে</h3>
        <p className="text-xs text-slate-500 mt-1">
          সারাদেশে cash on delivery ও দ্রুত ডেলিভারির সাথে নতুন কালেকশন উপভোগ করুন।
        </p>
        <button
          onClick={onNavigateShop}
          className="mt-5 px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors inline-flex items-center gap-2 cursor-pointer"
        >
          <span>কালেকশন দেখুন</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
