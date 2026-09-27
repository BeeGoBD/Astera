import React, { useState } from 'react';
import { COMBO_DEALS, PRODUCTS } from '../data/mockData';
import { ComboDeal, Product } from '../types';
import { ProductPlaceholderImage } from '../components/ProductPlaceholderImage';
import { Layers, Sparkles, Check, ShoppingBag, ArrowRight } from 'lucide-react';

interface CombosPageProps {
  onAddComboToCart: (combo: ComboDeal) => void;
  onSelectProduct: (productId: string) => void;
}

export const CombosPage: React.FC<CombosPageProps> = ({
  onAddComboToCart,
  onSelectProduct,
}) => {
  const [addedComboId, setAddedComboId] = useState<string | null>(null);

  const handleAdd = (combo: ComboDeal) => {
    onAddComboToCart(combo);
    setAddedComboId(combo.id);
    setTimeout(() => setAddedComboId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-teal-950 via-slate-900 to-indigo-950 p-8 sm:p-12 text-white relative overflow-hidden shadow-xl border border-teal-800/40 mb-10">
        <div className="relative z-10 max-w-2xl">
          <span className="px-3 py-1 bg-teal-500/20 text-teal-300 rounded-full text-xs font-black uppercase tracking-wider inline-flex items-center gap-1.5 border border-teal-400/30 mb-3">
            <Layers className="w-3.5 h-3.5" /> Curated Wardrobe Bundles
          </span>
          <h1
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Astera Fashion Combos
          </h1>
          <p className="mt-2 text-sm text-slate-300">
            Pre-styled matching outfits combined into single discounted packages. Save up to ৳1,800 on complete head-to-toe styling.
          </p>
        </div>
      </div>

      {/* Combo Cards */}
      <div className="space-y-8">
        {COMBO_DEALS.map((combo) => {
          const comboProducts = PRODUCTS.filter((p) => combo.productsIncluded.includes(p.name));
          return (
            <div
              key={combo.id}
              className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                {/* Left Info */}
                <div className="lg:max-w-md">
                  <span className="px-2.5 py-1 bg-rose-50 text-rose-600 rounded-md text-xs font-black tracking-wider uppercase">
                    {combo.badge}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2">
                    {combo.title}
                  </h3>
                  <p className="text-xs font-semibold text-teal-700 mt-0.5">
                    {combo.subtitle}
                  </p>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {combo.description}
                  </p>

                  <div className="mt-4 flex items-baseline gap-3">
                    <span className="text-2xl font-black text-slate-900 tabular-nums">
                      ৳{combo.bundlePrice.toLocaleString()}
                    </span>
                    <span className="text-sm text-slate-400 line-through tabular-nums">
                      ৳{combo.regularPrice.toLocaleString()}
                    </span>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      Instant Save ৳{combo.savings.toLocaleString()}
                    </span>
                  </div>

                  <div className="mt-5">
                    <button
                      type="button"
                      onClick={() => handleAdd(combo)}
                      className={`px-6 py-3 text-xs font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-md active:scale-95 ${
                        addedComboId === combo.id
                          ? 'bg-emerald-600 text-white'
                          : 'bg-teal-600 hover:bg-teal-700 text-white shadow-teal-600/20'
                      }`}
                    >
                      {addedComboId === combo.id ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Combo Added to Bag!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4" />
                          <span>ADD COMBO TO CART</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Right: Products included thumbnails */}
                <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {comboProducts.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => onSelectProduct(p.id)}
                      className="group/item bg-slate-50 p-3 rounded-2xl border border-slate-100 cursor-pointer hover:border-teal-200 transition-colors"
                    >
                      <div className="w-full aspect-square bg-white rounded-xl overflow-hidden border border-slate-200 mb-2">
                        <ProductPlaceholderImage
                          label="Product"
                          showSubtitle={false}
                          size="sm"
                        />
                      </div>
                      <p className="text-xs font-bold text-slate-800 group-hover/item:text-teal-700 transition-colors">
                        {p.name}
                      </p>
                      <p className="text-[11px] text-slate-400">{p.category}</p>
                      <p className="text-xs font-black text-slate-900 mt-1 tabular-nums">
                        ৳{p.price.toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
