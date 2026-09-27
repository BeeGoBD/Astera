import React, { useState } from 'react';
import { CUSTOMER_REVIEWS } from '../data/mockData';
import { Star, ChevronLeft, ChevronRight, CheckCircle, Quote } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const [startIndex, setStartIndex] = useState(0);

  const nextReviews = () => {
    setStartIndex((prev) => (prev + 1) % CUSTOMER_REVIEWS.length);
  };

  const prevReviews = () => {
    setStartIndex((prev) => (prev - 1 + CUSTOMER_REVIEWS.length) % CUSTOMER_REVIEWS.length);
  };

  // Get 3 visible reviews in carousel window
  const visibleReviews = [
    CUSTOMER_REVIEWS[startIndex],
    CUSTOMER_REVIEWS[(startIndex + 1) % CUSTOMER_REVIEWS.length],
    CUSTOMER_REVIEWS[(startIndex + 2) % CUSTOMER_REVIEWS.length],
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-rose-600 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            Verified Customer Experiences
          </span>
          <h2
            className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1 uppercase"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            CUSTOMER REVIEWS
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Discover why thousands of style-forward customers across Bangladesh trust Astera for daily confidence.
          </p>
        </div>

        {/* Carousel Buttons */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={prevReviews}
            className="w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-700 shadow-2xs transition-colors cursor-pointer"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={nextReviews}
            className="w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-700 shadow-2xs transition-colors cursor-pointer"
            aria-label="Next review"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Reviews Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {visibleReviews.map((review) => (
          <div
            key={review.id}
            className="bg-white rounded-2xl border border-slate-100 p-6 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute top-4 right-4 text-slate-100 pointer-events-none">
              <Quote className="w-12 h-12 text-slate-100 fill-slate-50" />
            </div>

            <div>
              {/* Star Rating */}
              <div className="flex items-center gap-1 text-amber-400 mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-xs font-bold text-slate-400 ml-1.5">{review.date}</span>
              </div>

              {/* Review Comment */}
              <p className="text-sm text-slate-700 leading-relaxed font-normal italic relative z-10">
                "{review.comment}"
              </p>
            </div>

            {/* Author Profile */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
              <div
                className={`w-11 h-11 rounded-full ${review.avatarBg} text-white font-bold text-sm flex items-center justify-center shadow-xs shrink-0`}
              >
                {review.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-bold text-slate-900 truncate">{review.name}</h4>
                  {review.verifiedPurchase && (
                    <span className="inline-flex items-center text-teal-600" title="Verified Customer">
                      <CheckCircle className="w-3.5 h-3.5 fill-teal-100 text-teal-600" />
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 truncate">{review.location} · {review.tag}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
