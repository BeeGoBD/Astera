import React, { useState } from 'react';
import { BLOG_POSTS } from '../data/mockData';
import { BlogPost } from '../types';
import { BookOpen, Clock, Calendar, ArrowRight, X, User } from 'lucide-react';

interface BlogPageProps {
  onNavigateShop: () => void;
  initialSelectedBlog?: BlogPost | null;
}

export const BlogPage: React.FC<BlogPageProps> = ({
  onNavigateShop,
  initialSelectedBlog = null,
}) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(initialSelectedBlog);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 p-8 sm:p-12 text-white relative overflow-hidden shadow-xl border border-teal-800/30 mb-10">
        <div className="relative z-10 max-w-2xl">
          <span className="px-3 py-1 bg-teal-500/20 text-teal-300 rounded-full text-xs font-black uppercase tracking-wider inline-flex items-center gap-1.5 border border-teal-400/30 mb-3">
            <BookOpen className="w-3.5 h-3.5" /> Astera Journal &amp; Style Lab
          </span>
          <h1
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Style Guides &amp; Fashion Advice
          </h1>
          <p className="mt-2 text-sm text-slate-300">
            Expert insights on fabric longevity, Dhaka streetwear trends, and mastering seasonal dressing with confidence.
          </p>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {BLOG_POSTS.map((post) => (
          <article
            key={post.id}
            onClick={() => setSelectedPost(post)}
            className="bg-white rounded-3xl border border-slate-100 shadow-2xs hover:shadow-md transition-all p-6 flex flex-col justify-between cursor-pointer group"
          >
            <div>
              <div className="w-full h-48 rounded-2xl bg-gradient-to-br from-slate-900 via-teal-950 to-emerald-950 p-6 flex flex-col justify-between text-white relative overflow-hidden mb-4">
                <span className="px-2.5 py-1 bg-white/10 backdrop-blur-md rounded-md text-[10px] font-black uppercase tracking-wider text-teal-300 self-start border border-white/20">
                  {post.category}
                </span>
                <h4 className="text-base font-bold text-white line-clamp-2">{post.title}</h4>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {post.readTime}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {post.date}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors leading-snug">
                {post.title}
              </h3>

              <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                {post.excerpt}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-teal-600 group-hover:text-teal-700">
              <span>Read Full Article</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </article>
        ))}
      </div>

      {/* Reader Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-xs font-bold uppercase tracking-wider">
              {selectedPost.category}
            </span>

            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mt-3">
              {selectedPost.title}
            </h2>

            <div className="flex items-center gap-4 text-xs text-slate-400 mt-2 pb-4 border-b border-slate-100">
              <span className="flex items-center gap-1 font-medium text-slate-600">
                <User className="w-3.5 h-3.5 text-teal-600" />
                {selectedPost.author}
              </span>
              <span>·</span>
              <span>{selectedPost.date}</span>
              <span>·</span>
              <span>{selectedPost.readTime}</span>
            </div>

            <div className="mt-5 space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <p className="font-semibold text-slate-800 text-sm">
                {selectedPost.excerpt}
              </p>
              {selectedPost.content.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap gap-2">
              {selectedPost.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
