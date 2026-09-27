import React, { useState } from 'react';
import { CartItem } from '../types';
import { ProductPlaceholderImage } from '../components/ProductPlaceholderImage';
import {
  CheckCircle2,
  ShieldCheck,
  Truck,
  CreditCard,
  MapPin,
  ArrowRight,
  ArrowLeft,
  ShoppingBag,
} from 'lucide-react';

interface CheckoutPageProps {
  items: CartItem[];
  discountAmount: number;
  appliedCoupon: string | null;
  onClearCart: () => void;
  onNavigateHome: () => void;
  onNavigateShop: () => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  items,
  discountAmount,
  appliedCoupon,
  onClearCart,
  onNavigateHome,
  onNavigateShop,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    division: 'Dhaka',
    city: 'Dhaka',
    address: '',
    deliveryZone: 'inside-dhaka' as 'inside-dhaka' | 'outside-dhaka',
    paymentMethod: 'cod' as 'cod' | 'bkash' | 'nagad' | 'card',
    orderNotes: '',
  });

  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState('');

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryFee = subtotal >= 2500 ? 0 : formData.deliveryZone === 'inside-dhaka' ? 60 : 120;
  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryFee);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) return;

    const generatedId = `AST-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setOrderConfirmed(true);
    onClearCart();
  };

  if (orderConfirmed) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-100 animate-in zoom-in-95 duration-200">
          <div className="w-20 h-20 bg-teal-50 text-teal-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-md shadow-teal-500/10">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold uppercase tracking-wider">
            Order Placed Successfully
          </span>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-3">
            Thank you, {formData.name}!
          </h2>
          <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">
            Your Astera order <strong className="text-slate-900 font-mono">#{orderId}</strong> has been confirmed. Our Dhaka dispatch team will contact you shortly at <strong className="text-teal-700">{formData.phone}</strong> before shipping.
          </p>

          <div className="mt-8 p-5 bg-slate-50 rounded-2xl border border-slate-100 max-w-md mx-auto text-left text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-400">Order ID:</span>
              <span className="font-mono font-bold text-slate-800">#{orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Payment Mode:</span>
              <span className="font-bold text-slate-800 uppercase">{formData.paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Delivery Address:</span>
              <span className="font-medium text-slate-800 truncate max-w-[200px]">{formData.address}, {formData.city}</span>
            </div>
            <div className="flex justify-between border-t border-slate-200 pt-2 font-black text-sm text-slate-900">
              <span>Total Payable:</span>
              <span className="text-teal-700 tabular-nums">৳{grandTotal.toLocaleString()}</span>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <button
              onClick={onNavigateHome}
              className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
            >
              Back to Home
            </button>
            <button
              onClick={onNavigateShop}
              className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-900">Your bag is empty</h3>
        <p className="text-xs text-slate-500 mt-1">Please select items before proceeding to checkout.</p>
        <button
          onClick={onNavigateShop}
          className="mt-6 px-6 py-3 bg-teal-600 text-white font-bold text-xs rounded-xl shadow-xs"
        >
          Browse Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Checkout Title */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <button
            onClick={onNavigateShop}
            className="text-xs font-semibold text-teal-700 hover:underline flex items-center gap-1 mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Continue Shopping
          </button>
          <h1
            className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Express Checkout
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmitOrder}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Form: Details & Delivery (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Section 1: Contact Details */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-2xs space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h3 className="text-sm font-extrabold text-slate-900">Customer Information</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tanvir Hossain"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Phone Number (01XXXXXXXXX) <span className="text-rose-500">*</span>
                  </label>
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

              <div className="text-xs">
                <label className="block font-semibold text-slate-700 mb-1">
                  Email Address (Optional for order tracking)
                </label>
                <input
                  type="email"
                  placeholder="customer@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                />
              </div>
            </div>

            {/* Section 2: Delivery Address in Bangladesh */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-2xs space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h3 className="text-sm font-extrabold text-slate-900">Delivery Address</h3>
              </div>

              {/* Delivery Zone Selector */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <label
                  className={`p-3.5 rounded-xl border cursor-pointer flex flex-col justify-between transition-all ${
                    formData.deliveryZone === 'inside-dhaka'
                      ? 'border-teal-600 bg-teal-50/50 text-teal-900 ring-1 ring-teal-500'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold">Inside Dhaka</span>
                    <input
                      type="radio"
                      name="deliveryZone"
                      checked={formData.deliveryZone === 'inside-dhaka'}
                      onChange={() => setFormData({ ...formData, deliveryZone: 'inside-dhaka' })}
                      className="accent-teal-600"
                    />
                  </div>
                  <span className="text-[11px] text-slate-500">৳60 · Within 24 Hours</span>
                </label>

                <label
                  className={`p-3.5 rounded-xl border cursor-pointer flex flex-col justify-between transition-all ${
                    formData.deliveryZone === 'outside-dhaka'
                      ? 'border-teal-600 bg-teal-50/50 text-teal-900 ring-1 ring-teal-500'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold">Outside Dhaka</span>
                    <input
                      type="radio"
                      name="deliveryZone"
                      checked={formData.deliveryZone === 'outside-dhaka'}
                      onChange={() => setFormData({ ...formData, deliveryZone: 'outside-dhaka' })}
                      className="accent-teal-600"
                    />
                  </div>
                  <span className="text-[11px] text-slate-500">৳120 · 48-72 Hours</span>
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Division</label>
                  <select
                    value={formData.division}
                    onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  >
                    <option value="Dhaka">Dhaka Division</option>
                    <option value="Chittagong">Chittagong Division</option>
                    <option value="Rajshahi">Rajshahi Division</option>
                    <option value="Sylhet">Sylhet Division</option>
                    <option value="Khulna">Khulna Division</option>
                    <option value="Barisal">Barisal Division</option>
                    <option value="Rangpur">Rangpur Division</option>
                    <option value="Mymensingh">Mymensingh Division</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">District / City</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Uttara, Dhaka or GEC, Chittagong"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  />
                </div>
              </div>

              <div className="text-xs">
                <label className="block font-semibold text-slate-700 mb-1">
                  Full Street Address &amp; Landmarks <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="House No., Road No., Area, Nearby Landmark..."
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                />
              </div>
            </div>

            {/* Section 3: Payment Options */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-2xs space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <h3 className="text-sm font-extrabold text-slate-900">Payment Method</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {/* Cash on Delivery */}
                <label
                  className={`p-3.5 rounded-xl border cursor-pointer flex items-center gap-3 transition-all ${
                    formData.paymentMethod === 'cod'
                      ? 'border-teal-600 bg-teal-50/50 text-teal-900 ring-1 ring-teal-500'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                    className="accent-teal-600"
                  />
                  <div>
                    <p className="font-bold text-slate-900">Cash on Delivery (COD)</p>
                    <p className="text-[11px] text-slate-500">Pay when order arrives</p>
                  </div>
                </label>

                {/* bKash */}
                <label
                  className={`p-3.5 rounded-xl border cursor-pointer flex items-center gap-3 transition-all ${
                    formData.paymentMethod === 'bkash'
                      ? 'border-pink-500 bg-pink-50/50 text-pink-900 ring-1 ring-pink-500'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={formData.paymentMethod === 'bkash'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'bkash' })}
                    className="accent-pink-600"
                  />
                  <div>
                    <p className="font-bold text-slate-900">bKash Online</p>
                    <p className="text-[11px] text-slate-500">Instant merchant wallet</p>
                  </div>
                </label>

                {/* Nagad */}
                <label
                  className={`p-3.5 rounded-xl border cursor-pointer flex items-center gap-3 transition-all ${
                    formData.paymentMethod === 'nagad'
                      ? 'border-orange-500 bg-orange-50/50 text-orange-900 ring-1 ring-orange-500'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={formData.paymentMethod === 'nagad'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'nagad' })}
                    className="accent-orange-600"
                  />
                  <div>
                    <p className="font-bold text-slate-900">Nagad Payment</p>
                    <p className="text-[11px] text-slate-500">Post office digital pay</p>
                  </div>
                </label>

                {/* Credit/Debit Card */}
                <label
                  className={`p-3.5 rounded-xl border cursor-pointer flex items-center gap-3 transition-all ${
                    formData.paymentMethod === 'card'
                      ? 'border-blue-500 bg-blue-50/50 text-blue-900 ring-1 ring-blue-500'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={formData.paymentMethod === 'card'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'card' })}
                    className="accent-blue-600"
                  />
                  <div>
                    <p className="font-bold text-slate-900">Visa / Mastercard</p>
                    <p className="text-[11px] text-slate-500">Local &amp; international cards</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Summary: Order Items & Totals (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm sticky top-24 space-y-4">
              <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-3">
                Order Review ({items.length} items)
              </h3>

              {/* Items List */}
              <div className="max-h-64 overflow-y-auto divide-y divide-slate-100 pr-1">
                {items.map((item) => (
                  <div key={item.id} className="py-3 flex items-center justify-between text-xs gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white rounded-lg border border-slate-200 overflow-hidden shrink-0">
                        <ProductPlaceholderImage
                          label="Product"
                          showSubtitle={false}
                          size="sm"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">{item.product.name}</h4>
                        <p className="text-slate-400 text-[11px]">
                          Size: {item.selectedSize} · Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-slate-900 tabular-nums shrink-0">
                      ৳{(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Breakdown in ৳ */}
              <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-slate-900 tabular-nums">৳{subtotal.toLocaleString()}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-rose-600 font-semibold">
                    <span>Discount ({appliedCoupon})</span>
                    <span className="tabular-nums">-৳{discountAmount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Delivery Charge</span>
                  <span className="font-bold text-slate-900 tabular-nums">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-700">FREE</span>
                    ) : (
                      `৳${deliveryFee}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-base font-black text-slate-900 pt-3 border-t border-slate-200">
                  <span>Total Amount</span>
                  <span className="text-lg text-teal-700 tabular-nums">৳{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-sm rounded-xl transition-all shadow-md shadow-teal-600/20 active:scale-95 flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span>CONFIRM &amp; PLACE ORDER</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                <span>7-Day Return Guarantee &amp; Doorstep Verification</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
