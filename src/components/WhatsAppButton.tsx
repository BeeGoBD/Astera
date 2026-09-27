import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [sentNotice, setSentNotice] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSentNotice(true);
    setTimeout(() => {
      setSentNotice(false);
      setMessage('');
      setIsOpen(false);
    }, 2000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* WhatsApp Chat Popup */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="bg-emerald-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-white">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-300 border-2 border-emerald-600 rounded-full" />
              </div>
              <div>
                <h4 className="font-bold text-sm">Astera WhatsApp Support</h4>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
                  Typically replies within 3 mins
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-emerald-700/60 text-white transition-colors"
              aria-label="Close WhatsApp chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-4 bg-[#ECE5DD] min-h-[160px] flex flex-col justify-end space-y-2 text-xs">
            <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-2xs max-w-[85%] text-slate-800">
              <p className="font-semibold text-teal-800 text-[11px] mb-0.5">Astera Concierge</p>
              <p>Assalamu Alaikum! How can we assist you with Astera fashion collections or sizes today?</p>
              <span className="text-[9px] text-slate-400 block text-right mt-1">Just now</span>
            </div>

            {sentNotice && (
              <div className="bg-emerald-100 text-emerald-900 p-2.5 rounded-xl text-center font-semibold text-[11px] animate-in fade-in">
                ✓ Message sent! Our team at 01700-000000 is replying on WhatsApp.
              </div>
            )}
          </div>

          {/* Quick Questions */}
          <div className="p-2 bg-slate-50 border-t border-slate-100 flex gap-1.5 overflow-x-auto text-[11px]">
            <button
              type="button"
              onClick={() => setMessage('Hi! What size fits chest 40 for Product 1?')}
              className="px-2.5 py-1 bg-white border border-slate-200 rounded-full hover:bg-slate-100 whitespace-nowrap text-slate-700"
            >
              Size recommendation?
            </button>
            <button
              type="button"
              onClick={() => setMessage('Can I pay Cash on Delivery outside Dhaka?')}
              className="px-2.5 py-1 bg-white border border-slate-200 rounded-full hover:bg-slate-100 whitespace-nowrap text-slate-700"
            >
              COD outside Dhaka?
            </button>
          </div>

          {/* Input Box */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
            <input
              type="text"
              placeholder="Type your WhatsApp inquiry..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-full text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
            <button
              type="submit"
              className="w-8 h-8 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shrink-0 transition-colors"
            >
              <Send className="w-4 h-4 ml-0.5" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Vibrant WhatsApp Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-xl shadow-emerald-500/30 transition-all hover:scale-105 active:scale-95 group cursor-pointer relative"
        aria-label="Chat on WhatsApp with Astera"
      >
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 border-2 border-white" />
        <MessageCircle className="w-7 h-7 fill-current" />
      </button>
    </div>
  );
};
