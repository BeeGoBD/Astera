import React, { useState } from 'react';
import { X, Lock, Phone, User, CheckCircle2 } from 'lucide-react';
import { Logo } from './Logo';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (userName: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [tab, setTab] = useState<'signin' | 'register'>('signin');
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      onLoginSuccess(name || 'Customer');
      setIsSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="flex justify-center mb-2">
            <Logo size="md" />
          </div>
          <p className="text-xs text-slate-500">
            Astera-তে স্বাগতম। আপনার অর্ডার ট্র্যাক ও দ্রুত চেকআউট করুন।
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex bg-slate-100 p-1 rounded-xl mb-5 text-xs font-bold">
          <button
            type="button"
            onClick={() => setTab('signin')}
            className={`flex-1 py-2 rounded-lg transition-all cursor-pointer ${
              tab === 'signin'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            সাইন ইন
          </button>
          <button
            type="button"
            onClick={() => setTab('register')}
            className={`flex-1 py-2 rounded-lg transition-all cursor-pointer ${
              tab === 'register'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            নতুন অ্যাকাউন্ট
          </button>
        </div>

        {isSuccess ? (
          <div className="text-center py-6">
            <CheckCircle2 className="w-12 h-12 text-teal-600 mx-auto mb-2 animate-bounce" />
            <h4 className="text-lg font-bold text-slate-900">সফলভাবে সাইন ইন হয়েছে</h4>
            <p className="text-xs text-slate-500 mt-1">আপনাকে শপিংয়ে ফিরিয়ে নেওয়া হচ্ছে...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            {tab === 'register' && (
              <div>
                <label className="block font-semibold text-slate-700 mb-1">পূর্ণ নাম</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="যেমন: তানভীর হোসেন"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                মোবাইল নম্বর অথবা ইমেইল
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="01XXXXXXXXX বা email@example.com"
                  value={phoneOrEmail}
                  onChange={(e) => setPhoneOrEmail(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-semibold text-slate-700">পাসওয়ার্ড</label>
                {tab === 'signin' && (
                  <button type="button" className="text-teal-600 hover:underline text-[11px] cursor-pointer">
                    পাসওয়ার্ড ভুলে গেছেন?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl transition-all shadow-md shadow-teal-600/20 cursor-pointer active:scale-95 mt-2"
            >
              {tab === 'signin' ? 'Astera-তে সাইন ইন করুন' : 'ফ্রি অ্যাকাউন্ট খুলুন'}
            </button>

            <p className="text-center text-[11px] text-slate-400 mt-3">
              এগিয়ে যাওয়ার মাধ্যমে আপনি Astera-র শর্তাবলী ও গোপনীয়তা নীতি মেনে নিচ্ছেন।
            </p>
          </form>
        )}
      </div>
    </div>
  );
};
