import React, { useState } from 'react';
import { LOOKBOOK_VIDEOS } from '../data/mockData';
import { LookbookVideo } from '../types';
import { Play, Film, X, ArrowRight } from 'lucide-react';

interface VideoGalleryProps {
  onViewMoreVideos?: () => void;
}

export const VideoGallery: React.FC<VideoGalleryProps> = ({ onViewMoreVideos }) => {
  const [activeVideo, setActiveVideo] = useState<LookbookVideo | null>(null);

  return (
    <section className="bg-slate-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
              <Film className="w-3.5 h-3.5" />
              রানওয়ে ও ফ্যাশন মুভমেন্ট
            </span>
            <h2
              className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1"
            >
              Astera ভিডিও গ্যালারি
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              আমাদের সিনেমাটিক ফ্যাশন লুকবুক, ডিজাইনের মূল ভাবনা ও নতুন ড্রপের নান্দনিক উপস্থাপনা উপভোগ করুন।
            </p>
          </div>

          <button
            type="button"
            onClick={onViewMoreVideos}
            className="text-xs sm:text-sm font-bold text-teal-400 hover:text-teal-300 flex items-center gap-1 self-start sm:self-auto cursor-pointer group"
          >
            <span>সবগুলো দেখুন</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* 3 Video Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {LOOKBOOK_VIDEOS.map((video) => (
            <div
              key={video.id}
              onClick={() => setActiveVideo(video)}
              className="group relative rounded-2xl overflow-hidden bg-slate-800/80 border border-slate-700/60 shadow-md cursor-pointer hover:border-teal-500/50 transition-all flex flex-col justify-between"
            >
              {/* Thumbnail Container */}
              <div className={`relative w-full aspect-video bg-gradient-to-br ${video.gradient} p-4 flex flex-col justify-between overflow-hidden`}>
                <div className="flex justify-between items-start">
                  <span className="px-2 py-0.5 bg-black/40 backdrop-blur-md rounded text-[10px] font-bold text-teal-300 uppercase tracking-wider">
                    {video.season}
                  </span>
                  <span className="px-2 py-0.5 bg-black/50 backdrop-blur-md rounded text-[10px] font-mono text-slate-300">
                    {video.duration}
                  </span>
                </div>

                {/* Center Play Button */}
                <div className="self-center my-auto w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-teal-500 group-hover:text-slate-950 transition-all shadow-lg">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </div>

                <p className="text-xs text-slate-300/80 font-medium">Directed by {video.director}</p>
              </div>

              {/* Text Info */}
              <div className="p-4 bg-slate-850">
                <h3 className="text-base font-bold text-white group-hover:text-teal-300 transition-colors">
                  {video.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  {video.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Player Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-teal-400 font-bold uppercase">{activeVideo.season}</span>
                <h3 className="text-lg font-bold text-white">{activeVideo.title}</h3>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className={`w-full aspect-video bg-gradient-to-br ${activeVideo.gradient} flex flex-col items-center justify-center p-8 text-center relative`}>
              <div className="w-16 h-16 rounded-full bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-teal-300 mb-4 animate-pulse">
                <Play className="w-8 h-8 fill-teal-400 text-teal-400 ml-1" />
              </div>
              <h4 className="text-xl font-extrabold text-white">Astera Lookbook Reel</h4>
              <p className="text-xs text-slate-300 max-w-md mt-2">
                Simulated video stream for {activeVideo.title}. High-definition editorial fashion showcase.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <span className="text-xs font-mono text-slate-400">Duration: {activeVideo.duration}</span>
                <span className="text-slate-600">·</span>
                <span className="text-xs text-teal-300 font-medium">{activeVideo.director}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
