import React from 'react';
import { CATEGORIES } from '../data/mockData';
import { ArrowRight } from 'lucide-react';

interface CategorySectionProps {
  onSelectCategory: (slug: string) => void;
  onViewAllCategories: () => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  onSelectCategory,
  onViewAllCategories,
}) => {
  // Category artwork rendering
  const renderCategoryArtwork = (slug: string) => {
    switch (slug) {
      case 'mens-wear':
        return (
          <svg className="w-12 h-12 text-teal-600" viewBox="0 0 48 48" fill="none">
            <path d="M14 8L20 16L24 12L28 16L34 8L42 16L36 22L33 19V42H15V19L12 22L6 16L14 8Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.15" />
            <path d="M24 18V42" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
          </svg>
        );
      case 'womens-wear':
        return (
          <svg className="w-12 h-12 text-rose-500" viewBox="0 0 48 48" fill="none">
            <path d="M16 8C16 8 20 14 24 14C28 14 32 8 32 8L38 16L31 22V42H17V22L10 16L16 8Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.15" />
            <path d="M20 22C20 22 24 26 28 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case 'kids':
        return (
          <svg className="w-12 h-12 text-amber-500" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="2.5" fill="currentColor" fillOpacity="0.12" />
            <circle cx="19" cy="21" r="2" fill="currentColor" />
            <circle cx="29" cy="21" r="2" fill="currentColor" />
            <path d="M18 28C20 31 28 31 30 28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        );
      case 't-shirts-tops':
        return (
          <svg className="w-12 h-12 text-cyan-600" viewBox="0 0 48 48" fill="none">
            <path d="M15 8L20 13H28L33 8L41 15L35 21L33 19V40H15V19L13 21L7 15L15 8Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.15" />
            <path d="M20 13C20 15.5 21.8 17.5 24 17.5C26.2 17.5 28 15.5 28 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case 'jeans-bottoms':
        return (
          <svg className="w-12 h-12 text-indigo-600" viewBox="0 0 48 48" fill="none">
            <path d="M14 6H34L37 42H26L24 20L22 42H11L14 6Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.15" />
            <path d="M14 12H34" stroke="currentColor" strokeWidth="2" />
            <path d="M24 12V18" stroke="currentColor" strokeWidth="2" />
          </svg>
        );
      case 'dresses':
        return (
          <svg className="w-12 h-12 text-fuchsia-600" viewBox="0 0 48 48" fill="none">
            <path d="M18 6L24 11L30 6L33 14L28 20L37 42H11L20 20L15 14L18 6Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.15" />
            <path d="M19 22H29" stroke="currentColor" strokeWidth="2" />
          </svg>
        );
      case 'accessories':
        return (
          <svg className="w-12 h-12 text-emerald-600" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="10" stroke="currentColor" strokeWidth="2.5" fill="currentColor" fillOpacity="0.15" />
            <path d="M20 6H28V14H20V6Z" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.15" />
            <path d="M20 34H28V42H20V34Z" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.15" />
            <path d="M24 20V24L27 27" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case 'footwear':
      default:
        return (
          <svg className="w-12 h-12 text-slate-700" viewBox="0 0 48 48" fill="none">
            <path d="M8 28L14 18H24L26 22H36L41 28V36H8V28Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.15" />
            <path d="M8 32H41" stroke="currentColor" strokeWidth="2" />
          </svg>
        );
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Section Header */}
      <div className="flex items-end justify-between mb-6">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-teal-600 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-teal-500" />
            Curated Collections
          </span>
          <h2
            className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Shop by Category
          </h2>
        </div>

        <button
          onClick={onViewAllCategories}
          className="text-xs sm:text-sm font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1 transition-colors group cursor-pointer"
        >
          <span>View All</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* Grid of Circular/Rounded Category Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
        {CATEGORIES.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => onSelectCategory(category.slug)}
            className="group flex flex-col items-center p-3 sm:p-4 rounded-2xl bg-white border border-slate-100/90 shadow-2xs hover:shadow-md hover:border-teal-200 transition-all text-center cursor-pointer active:scale-95"
          >
            {/* Category Icon Capsule */}
            <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-slate-50 group-hover:bg-teal-50/80 flex items-center justify-center transition-all duration-300 group-hover:scale-105 border border-slate-100 group-hover:border-teal-200">
              {renderCategoryArtwork(category.slug)}
            </div>

            {/* Category Title */}
            <span className="mt-3 text-xs sm:text-sm font-bold text-slate-800 group-hover:text-teal-700 transition-colors line-clamp-1">
              {category.name}
            </span>

            {/* Item Count */}
            <span className="text-[11px] font-medium text-slate-400 mt-0.5">
              {category.itemCount} items
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};
