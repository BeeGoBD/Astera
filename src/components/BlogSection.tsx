import React from 'react';
import { BLOG_POSTS } from '../data/mockData';
import { BlogPost } from '../types';
import { ArrowRight, BookOpen, Clock, Calendar } from 'lucide-react';

interface BlogSectionProps {
  onViewAllBlogs: () => void;
  onSelectBlog: (post: BlogPost) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({
  onViewAllBlogs,
  onSelectBlog,
}) => {
  return (
    <section className="bg-slate-50/70 border-y border-slate-150/60 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-teal-600 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              এডিটরিয়াল ও লুকবুক ইনসাইটস
            </span>
            <h2
              className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1"
            >
              আমাদের সর্বশেষ ফ্যাশন ও স্টাইল গাইড
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              পোশাকের সঠিক যত্ন, আধুনিক স্টাইলিং ও সিজনাল আউটফিট তৈরির প্রয়োজনীয় টিপস।
            </p>
          </div>

          <button
            type="button"
            onClick={onViewAllBlogs}
            className="text-xs sm:text-sm font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1 self-start sm:self-auto cursor-pointer group"
          >
            <span>সবগুলো ব্লগ দেখুন</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* 3 Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              onClick={() => onSelectBlog(post)}
              className="group bg-white rounded-2xl border border-slate-100 shadow-2xs hover:shadow-md transition-all p-5 flex flex-col justify-between cursor-pointer"
            >
              <div>
                {/* Visual Banner placeholder for Style Guide */}
                <div className="w-full h-44 rounded-xl bg-gradient-to-br from-slate-900 via-teal-950 to-slate-800 p-5 flex flex-col justify-between text-white relative overflow-hidden mb-4">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/20 rounded-full blur-xl pointer-events-none" />
                  <span className="relative z-10 px-2.5 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-md text-[10px] font-black uppercase tracking-wider text-teal-300 self-start">
                    {post.category}
                  </span>
                  <div className="relative z-10">
                    <p className="text-[11px] text-teal-200 font-semibold tracking-wide">Astera Journal</p>
                    <p className="text-sm font-bold text-white line-clamp-2 mt-0.5">{post.title}</p>
                  </div>
                </div>

                {/* Metadata */}
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

                <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-teal-600 group-hover:text-teal-700">
                <span>পুরো গাইড পড়ুন</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
