import React from 'react';

interface ProductPlaceholderImageProps {
  label?: 'Product' | 'Need to add product / Product upload needed';
  showSubtitle?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const ProductPlaceholderImage: React.FC<ProductPlaceholderImageProps> = ({
  label = 'Product',
  showSubtitle = true,
  className = '',
  size = 'md',
}) => {
  return (
    <div
      className={`relative w-full aspect-square bg-white flex flex-col items-center justify-center border border-slate-100/90 select-none overflow-hidden ${className}`}
      style={{ backgroundColor: '#FFFFFF' }}
    >
      {/* Subtle architectural framing lines for a refined catalog look */}
      <div className="absolute inset-3 border border-slate-100/60 pointer-events-none rounded-lg" />
      
      {/* Centered Dark Gray Text per exact user rule */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-2">
        <span
          className={`font-semibold tracking-wider uppercase text-slate-700 ${
            size === 'sm'
              ? 'text-xs'
              : size === 'lg'
              ? 'text-lg md:text-xl font-bold'
              : size === 'xl'
              ? 'text-2xl md:text-3xl font-extrabold'
              : 'text-sm md:text-base'
          }`}
        >
          {label}
        </span>
        
        {showSubtitle && (
          <span
            className={`mt-1 font-medium text-slate-500 tracking-tight ${
              size === 'sm' ? 'text-[10px]' : size === 'lg' || size === 'xl' ? 'text-xs md:text-sm' : 'text-xs'
            }`}
          >
            Need to add product / Product upload needed
          </span>
        )}
      </div>

      {/* Clean minimal corner guide markers */}
      <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-slate-200 pointer-events-none" />
      <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-slate-200 pointer-events-none" />
      <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-slate-200 pointer-events-none" />
      <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-slate-200 pointer-events-none" />
    </div>
  );
};
