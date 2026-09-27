/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Product, CartItem, BlogPost, ComboDeal } from './types';
import { PRODUCTS } from './data/mockData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { CartDrawer } from './components/CartDrawer';
import { AuthModal } from './components/AuthModal';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OffersPage } from './pages/OffersPage';
import { CombosPage } from './pages/CombosPage';
import { BlogPage } from './pages/BlogPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  // Navigation & View state
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedProductId, setSelectedProductId] = useState<string>('product-1');
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);

  // Cart & Orders state
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('astera_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [cartDrawerOpen, setCartDrawerOpen] = useState<boolean>(false);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [addedProductIdToast, setAddedProductIdToast] = useState<string | null>(null);

  // Auth modal state
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [userName, setUserName] = useState<string | null>(null);

  // Persist cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('astera_cart', JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  // Recalculate discount whenever cart items or coupon change
  useEffect(() => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    if (!appliedCoupon) {
      setDiscountAmount(0);
      return;
    }
    if (appliedCoupon === 'ASTERA10') {
      setDiscountAmount(Math.round(subtotal * 0.1));
    } else if (appliedCoupon === 'FASHION40') {
      setDiscountAmount(subtotal >= 3500 ? 400 : 0);
    } else if (appliedCoupon === 'COMBO25') {
      setDiscountAmount(subtotal >= 3000 ? Math.round(subtotal * 0.15) : 0);
    } else if (appliedCoupon === 'FREESHIP') {
      setDiscountAmount(0); // Free shipping handled in checkout calculation
    }
  }, [cartItems, appliedCoupon]);

  // Scroll to top on navigation
  const navigateTo = (view: string, param?: string) => {
    setCurrentView(view);
    if (view === 'shop' && param) {
      setSelectedCategorySlug(param);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add product to cart handler
  const handleAddToCart = (
    product: Product,
    selectedSize: string = 'M',
    selectedColor: string = 'Standard',
    quantity: number = 1
  ) => {
    const itemKey = `${product.id}-${selectedSize}-${selectedColor}`;
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === itemKey);
      if (existing) {
        return prev.map((item) =>
          item.id === itemKey ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: itemKey,
          product,
          quantity,
          selectedSize: selectedSize || product.sizes[0] || 'M',
          selectedColor: selectedColor || product.colors[0]?.name || 'Standard',
        },
      ];
    });

    setAddedProductIdToast(product.id);
    setTimeout(() => setAddedProductIdToast(null), 1800);
  };

  // Quick card add (uses default first size & color)
  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    handleAddToCart(product, product.sizes[0] || 'M', product.colors[0]?.name || 'Standard', 1);
  };

  // Add Combo package to cart
  const handleAddComboToCart = (combo: ComboDeal) => {
    const matchingProducts = PRODUCTS.filter((p) => combo.productsIncluded.includes(p.name));
    matchingProducts.forEach((prod) => {
      handleAddToCart(prod, prod.sizes[0] || 'M', prod.colors[0]?.name || 'Standard', 1);
    });
    setCartDrawerOpen(true);
  };

  const handleUpdateCartQuantity = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(itemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveCartItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleApplyCoupon = (code: string): boolean => {
    const validCodes = ['ASTERA10', 'FREESHIP', 'FASHION40', 'COMBO25'];
    if (validCodes.includes(code)) {
      setAppliedCoupon(code);
      return true;
    }
    return false;
  };

  const handleSelectProduct = (productId: string) => {
    setSelectedProductId(productId);
    navigateTo('product-detail');
  };

  // Selected product object
  const currentProduct =
    PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);
  const totalCartAmount = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-slate-800 antialiased">
      {/* 1. Top Sticky Header & Subcategory Bar */}
      <Header
        cartCount={totalCartCount}
        cartTotal={totalCartAmount}
        onOpenCart={() => setCartDrawerOpen(true)}
        onOpenAuth={() => setAuthModalOpen(true)}
        currentView={currentView}
        onNavigate={navigateTo}
        selectedCategory={selectedCategorySlug}
        onSelectCategory={(slug) => {
          setSelectedCategorySlug(slug);
          navigateTo('shop');
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSelectProduct={handleSelectProduct}
      />

      {/* Main Page Content Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomePage
            products={PRODUCTS}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleQuickAdd}
            onSelectCategory={(slug) => {
              setSelectedCategorySlug(slug);
              navigateTo('shop');
            }}
            onNavigate={navigateTo}
            onSelectBlog={(blog) => {
              setSelectedBlog(blog);
              navigateTo('blog');
            }}
            addedProductId={addedProductIdToast}
          />
        )}

        {currentView === 'shop' && (
          <ShopPage
            products={PRODUCTS}
            selectedCategorySlug={selectedCategorySlug}
            onSelectCategory={setSelectedCategorySlug}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleQuickAdd}
            searchQuery={searchQuery}
            onClearSearch={() => setSearchQuery('')}
            addedProductId={addedProductIdToast}
          />
        )}

        {currentView === 'product-detail' && (
          <ProductDetailPage
            product={currentProduct}
            allProducts={PRODUCTS}
            onSelectProduct={handleSelectProduct}
            onAddToCart={(prod, size, color, qty) => {
              handleAddToCart(prod, size, color, qty);
              setCartDrawerOpen(true);
            }}
            onBuyNow={(prod, size, color, qty) => {
              handleAddToCart(prod, size, color, qty);
              navigateTo('checkout');
            }}
            onNavigateHome={() => navigateTo('home')}
            onNavigateShop={(catSlug) => {
              if (catSlug) setSelectedCategorySlug(catSlug);
              navigateTo('shop');
            }}
          />
        )}

        {currentView === 'checkout' && (
          <CheckoutPage
            items={cartItems}
            discountAmount={discountAmount}
            appliedCoupon={appliedCoupon}
            onClearCart={() => setCartItems([])}
            onNavigateHome={() => navigateTo('home')}
            onNavigateShop={() => navigateTo('shop')}
          />
        )}

        {currentView === 'offers' && (
          <OffersPage
            onNavigateShop={() => navigateTo('shop')}
            onApplyPromoCode={(code) => {
              handleApplyCoupon(code);
              setCartDrawerOpen(true);
            }}
          />
        )}

        {currentView === 'combos' && (
          <CombosPage
            onAddComboToCart={handleAddComboToCart}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentView === 'blog' && (
          <BlogPage
            onNavigateShop={() => navigateTo('shop')}
            initialSelectedBlog={selectedBlog}
          />
        )}

        {currentView === 'about' && (
          <AboutPage onNavigateShop={() => navigateTo('shop')} />
        )}

        {currentView === 'contact' && <ContactPage />}
      </main>

      {/* 6. Footer (Full Width, Multi-Column) */}
      <Footer onNavigate={navigateTo} />

      {/* 7. Floating WhatsApp Support Button */}
      <WhatsAppButton />

      {/* Slide-in Mini Cart Drawer */}
      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => navigateTo('checkout')}
        appliedCoupon={appliedCoupon}
        onApplyCoupon={handleApplyCoupon}
        discountAmount={discountAmount}
      />

      {/* Sign In / Register Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={(name) => setUserName(name)}
      />
    </div>
  );
}
