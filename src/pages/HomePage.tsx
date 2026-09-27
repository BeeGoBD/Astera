import React from 'react';
import { Product, BlogPost } from '../types';
import { HeroSlider } from '../components/HeroSlider';
import { CategorySection } from '../components/CategorySection';
import { FeaturedProductsSection } from '../components/FeaturedProductsSection';
import { BlogSection } from '../components/BlogSection';
import { ReviewsSection } from '../components/ReviewsSection';
import { VideoGallery } from '../components/VideoGallery';
import { CorporateCta } from '../components/CorporateCta';

interface HomePageProps {
  products: Product[];
  onSelectProduct: (productId: string) => void;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  onSelectCategory: (slug: string) => void;
  onNavigate: (view: string, param?: string) => void;
  onSelectBlog: (post: BlogPost) => void;
  addedProductId?: string | null;
}

export const HomePage: React.FC<HomePageProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  onSelectCategory,
  onNavigate,
  onSelectBlog,
  addedProductId,
}) => {
  return (
    <div className="space-y-6 sm:space-y-10">
      {/* 2. Hero Section: Left Slider + Right Stacked Banners */}
      <HeroSlider onNavigate={onNavigate} />

      {/* 3. Shop by Category */}
      <CategorySection
        onSelectCategory={(slug) => {
          onSelectCategory(slug);
          onNavigate('shop');
        }}
        onViewAllCategories={() => onNavigate('shop')}
      />

      {/* 4. Featured Products (Strict compliance with Product 1..N and pure white placeholders) */}
      <FeaturedProductsSection
        products={products}
        onSelectProduct={onSelectProduct}
        onAddToCart={onAddToCart}
        onViewMore={() => onNavigate('shop')}
        addedProductId={addedProductId}
      />

      {/* 5. Additional Content Sections */}
      {/* Blog Teaser */}
      <BlogSection
        onViewAllBlogs={() => onNavigate('blog')}
        onSelectBlog={(post) => {
          onSelectBlog(post);
          onNavigate('blog');
        }}
      />

      {/* Customer Reviews Carousel */}
      <ReviewsSection />

      {/* Video Gallery */}
      <VideoGallery onViewMoreVideos={() => onNavigate('blog')} />

      {/* Corporate CTA Banner: Join 100+ Brands & Boutiques That Trust Astera */}
      <CorporateCta />
    </div>
  );
};
