import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-xs font-black uppercase tracking-wider inline-block mb-2">
          কাস্টমার সাপোর্ট ও হেল্পডেস্ক
        </span>
        <h1
          className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight"
        >
          আমরা আপনাকে সাহায্য করতে প্রস্তুত
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-slate-500">
          সাইজ সিলেকশন, ডেলিভারি স্ট্যাটাস বা পাইকারি অর্ডার সংক্রান্ত যেকোনো তথ্যের জন্য সরাসরি কল, হোয়াটসঅ্যাপ কিংবা আমাদের ঢাকা অফিসে যোগাযোগ করতে পারেন।
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contact Info (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Card 1: Office */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-3">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">হেডকোয়ার্টার্স ও এক্সপেরিয়েন্স সেন্টার</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              লেভেল ৭, Astera ফ্যাশন টাওয়ার, রোড ১১, ব্লক ডি, বনানী / গুলশান-২, ঢাকা ১২১২, বাংলাদেশ
            </p>
          </div>

          {/* Card 2: Phone */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-3">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">হটলাইন নম্বরসমূহ</h3>
            <div className="mt-2 space-y-1 text-xs">
              <p className="text-slate-700">
                <span className="font-semibold text-slate-900">কাস্টমার কেয়ার:</span> 01700-000000
              </p>
              <p className="text-slate-700">
                <span className="font-semibold text-slate-900">টেলিসেলস ও বাল্ক অর্ডার:</span> 09613-888999
              </p>
              <p className="text-slate-700">
                <span className="font-semibold text-slate-900">WhatsApp সাপোর্ট:</span> 01800-000000
              </p>
            </div>
          </div>

          {/* Card 3: Email & Hours */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">ইমেইল ও সহায়তার সময়</h3>
            <p className="text-xs text-slate-600 mt-1">support@astera-fashion.com</p>
            <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-400">
              <Clock className="w-3.5 h-3.5 text-teal-600" />
              <span>সকাল ৯:০০ – রাত ১০:০০ (সপ্তাহের ৭ দিন খোলা)</span>
            </div>
          </div>
        </div>

        {/* Message Form (7 Cols) */}
        <div className="lg:col-span-7">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-lg font-extrabold text-slate-900 mb-1">আমাদের মেসেজ পাঠান</h3>
            <p className="text-xs text-slate-500 mb-5">
              নিচের ফর্মটি পূরণ করুন, Astera প্রতিনিধি দ্রুত আপনার সাথে যোগাযোগ করবেন।
            </p>

            {submitted ? (
              <div className="py-12 text-center">
                <div className="w-14 h-14 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-base font-bold text-slate-900">মেসেজ সফলভাবে পাঠানো হয়েছে!</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  ধন্যবাদ, <strong>{formData.name}</strong>। আমরা দ্রুত আপনার দেওয়া মোবাইল নম্বর <strong>{formData.phone}</strong>-এ যোগাযোগ করব।
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-5 px-5 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800 cursor-pointer"
                >
                  আরেকটি মেসেজ পাঠান
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">আপনার নাম</label>
                    <input
                      type="text"
                      required
                      placeholder="যেমন: তানভীর হোসেন"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">মোবাইল নম্বর (01XXXXXXXXX)</label>
                    <input
                      type="tel"
                      required
                      placeholder="01XXXXXXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">ইমেইল এড্রেস</label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">বিষয়</label>
                    <input
                      type="text"
                      required
                      placeholder="যেমন: সাইজ পরামর্শ / অর্ডার অনুসন্ধান"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">আপনার বার্তা</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="আপনার প্রশ্ন বা মতামত বিস্তারিত লিখুন..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl transition-all shadow-md shadow-teal-600/20 flex items-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>মেসেজ পাঠান</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
