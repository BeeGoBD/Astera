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
          Customer Care &amp; Support
        </span>
        <h1
          className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          We're Here to Help You
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-slate-500">
          Have queries about sizes, delivery status, or bulk orders? Reach out through phone, WhatsApp or visit our Dhaka office.
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
            <h3 className="font-bold text-slate-900 text-sm">Headquarters &amp; Experience Center</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Level 7, Astera Fashion Tower, Road 11, Block D, Banani / Gulshan-2, Dhaka 1212, Bangladesh
            </p>
          </div>

          {/* Card 2: Phone */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-3">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Phone Hotlines</h3>
            <div className="mt-2 space-y-1 text-xs">
              <p className="text-slate-700">
                <span className="font-semibold text-slate-900">Customer Support:</span> 01700-000000
              </p>
              <p className="text-slate-700">
                <span className="font-semibold text-slate-900">Telesales &amp; Bulk:</span> 09613-888999
              </p>
              <p className="text-slate-700">
                <span className="font-semibold text-slate-900">WhatsApp Concierge:</span> 01800-000000
              </p>
            </div>
          </div>

          {/* Card 3: Email & Hours */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Email &amp; Support Hours</h3>
            <p className="text-xs text-slate-600 mt-1">support@astera-fashion.com</p>
            <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-400">
              <Clock className="w-3.5 h-3.5 text-teal-600" />
              <span>Available 9:00 AM – 10:00 PM (7 days a week)</span>
            </div>
          </div>
        </div>

        {/* Message Form (7 Cols) */}
        <div className="lg:col-span-7">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-lg font-extrabold text-slate-900 mb-1">Send a Message</h3>
            <p className="text-xs text-slate-500 mb-5">
              Fill out the form below and an Astera support specialist will get back to you within 2 business hours.
            </p>

            {submitted ? (
              <div className="py-12 text-center">
                <div className="w-14 h-14 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-base font-bold text-slate-900">Message Received!</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Thank you, <strong>{formData.name}</strong>. We will contact you at <strong>{formData.phone || formData.email}</strong> shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-5 px-5 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mehnaz Karim"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Mobile (01XXXXXXXXX)</label>
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
                    <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Subject</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sizing Advice / Order Query"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="How can our customer care team assist you today?"
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
                  <span>Submit Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
