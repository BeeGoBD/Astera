import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', showTagline = false }) => {
  const iconSize = size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-12 h-12' : 'w-9 h-9';
  const textSize = size === 'sm' ? 'text-xl' : size === 'lg' ? 'text-3xl' : 'text-2xl';

  return (
    <div className={`flex items-center gap-2.5 cursor-pointer select-none group ${className}`}>
      {/* Stylized "A" Monogram */}
      <div
        className={`${iconSize} rounded-xl bg-gradient-to-br from-teal-500 via-teal-600 to-emerald-600 flex items-center justify-center shadow-md shadow-teal-500/20 text-white font-extrabold transition-transform duration-200 group-hover:scale-105`}
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          className="w-5/6 h-5/6"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Geometric stylized modern 'A' monogram */}
          <path
            d="M16 5L8 26H12.5L14.2 21H17.8L19.5 26H24L16 5Z"
            fill="currentColor"
          />
          <path
            d="M16 11.5L14.8 17H17.2L16 11.5Z"
            fill="#0F172A"
          />
          <circle cx="23.5" cy="8.5" r="2.5" fill="#F43F5E" />
        </svg>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col">
        <div className="flex items-center">
          <span
            className={`font-extrabold tracking-tight text-slate-900 ${textSize}`}
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Astera
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 ml-1 inline-block" />
        </div>
        {showTagline && (
          <span className="text-[11px] font-medium tracking-wider text-slate-400 uppercase -mt-0.5">
            Fashion &amp; Clothing
          </span>
        )}
      </div>
    </div>
  );
};
