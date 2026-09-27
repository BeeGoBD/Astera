import React, { useState } from 'react';
import { Briefcase, ArrowRight, CheckCircle2, Shield, Calendar, X } from 'lucide-react';

export const CorporateCta: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    contactPerson: '',
    phone: '',
    email: '',
    inquiryType: 'Boutique Wholesale',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-teal-900 via-emerald-900 to-slate-900 text-white p-8 sm:p-12 shadow-xl border border-teal-800/40">
          {/* Ambient Lighting & Pattern */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-teal-400/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 -mb-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider text-teal-300 border border-white/15 mb-4">
              <Briefcase className="w-3.5 h-3.5 text-teal-400" />
              B2B Partnerships &amp; Wholesale
            </div>

            {/* Exact wording from brief */}
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Join 100+ Brands &amp; Boutiques That Trust Astera
            </h2>

            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-normal">
              Whether you are an established retail chain, an independent boutique, or sourcing corporate employee apparel, Astera supplies certified premium fabric, fast customization, and guaranteed delivery timelines across Bangladesh.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              {/* Exact CTA text from brief */}
              <button
                type="button"
                onClick={() => {
                  setModalOpen(true);
                  setFormSubmitted(false);
                }}
                className="px-6 py-3.5 bg-rose-500 hover:bg-rose-400 text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase rounded-xl transition-all shadow-lg shadow-rose-500/30 active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <span>LET’S SCHEDULE A MEETING</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-4 text-xs text-slate-300">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-400" /> Bulk Pricing Tier
                </span>
                <span className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-teal-400" /> Certified QA
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Meeting Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {formSubmitted ? (
              <div className="text-center py-6">
                <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Meeting Scheduled!</h3>
                <p className="text-xs text-slate-500 mt-2 max-w-sm mx-auto">
                  Thank you, <strong>{formData.contactPerson || 'Partner'}</strong>. Our Corporate B2B Account Manager will call you at <strong>{formData.phone || '01XXXXXXXXX'}</strong> within 2 hours to confirm your meeting slot.
                </p>
                <button
                  onClick={() => setModalOpen(false)}
                  className="mt-6 px-6 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800"
                >
                  Done
                </button>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 text-teal-700 text-xs font-bold uppercase tracking-wider mb-1">
                  <Calendar className="w-4 h-4" /> B2B Consultation
                </div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  Schedule a Corporate Meeting
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Connect with our head of wholesale and production in Dhaka.
                </p>

                <form onSubmit={handleSubmit} className="mt-5 space-y-3.5 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Boutique / Brand Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apex Threads Ltd. / Studio Dhaka"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Contact Person</label>
                      <input
                        type="text"
                        required
                        placeholder="Your Name"
                        value={formData.contactPerson}
                        onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
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

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Inquiry Type</label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white"
                    >
                      <option value="Boutique Wholesale">Boutique Wholesale / Stockist</option>
                      <option value="Corporate Custom Merch">Corporate Uniforms / Merchandise</option>
                      <option value="White Label Manufacturing">White Label Garment Production</option>
                      <option value="Retail Franchise">Retail Franchise Partnership</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Requirements Note</label>
                    <textarea
                      rows={2}
                      placeholder="Expected volume, timeline or specific category of interest..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl transition-colors shadow-md shadow-teal-600/20 mt-2"
                  >
                    Confirm Meeting Request
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
