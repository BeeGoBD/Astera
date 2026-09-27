import React from 'react';

interface HeroArtworkProps {
  type: 'summer' | 'denim' | 'festive' | 'urban' | 'combo';
  className?: string;
}

export const HeroArtwork: React.FC<HeroArtworkProps> = ({ type, className = '' }) => {
  if (type === 'summer') {
    return (
      <div className={`relative w-full h-full overflow-hidden select-none pointer-events-none ${className}`}>
        {/* Soft studio backdrop lighting */}
        <div className="absolute inset-0 bg-radial from-teal-400/20 via-transparent to-transparent opacity-80" />
        <svg
          viewBox="0 0 540 640"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.5)]"
        >
          <defs>
            <linearGradient id="summerJacket" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#14B8A6" />
              <stop offset="50%" stopColor="#0D9488" />
              <stop offset="100%" stopColor="#0F766E" />
            </linearGradient>
            <linearGradient id="innerTee" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#E2E8F0" />
            </linearGradient>
            <linearGradient id="coralAccent" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FB7185" />
              <stop offset="100%" stopColor="#E11D48" />
            </linearGradient>
            <linearGradient id="cargoPants" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
          </defs>

          {/* Model Stylized Silhouette & Fashion Form */}
          {/* Head & Hat */}
          <circle cx="270" cy="110" r="42" fill="#E2E8F0" fillOpacity="0.25" />
          <path d="M225 105 C225 80, 315 80, 315 105 C325 105, 335 112, 330 120 C300 126, 240 126, 210 120 C205 112, 215 105, 225 105 Z" fill="#0F172A" />
          
          {/* Inner White Structured Tee */}
          <path d="M242 165 C255 178, 285 178, 298 165 L320 280 L220 280 Z" fill="url(#innerTee)" />
          <path d="M255 174 C263 182, 277 182, 285 174" stroke="#CBD5E1" strokeWidth="3" fill="none" />

          {/* Outer Tailored Summer Streetwear Jacket */}
          {/* Left Side */}
          <path d="M240 162 L155 210 L120 370 L175 385 L195 270 L235 410 L260 410 L250 250 L240 162 Z" fill="url(#summerJacket)" />
          {/* Right Side */}
          <path d="M300 162 L385 210 L420 370 L365 385 L345 270 L305 410 L280 410 L290 250 L300 162 Z" fill="url(#summerJacket)" />

          {/* Lapels / Collar */}
          <path d="M240 162 L268 250 L248 260 L225 195 Z" fill="#042F2E" />
          <path d="M300 162 L272 250 L292 260 L315 195 Z" fill="#042F2E" />

          {/* Vibrant Coral Accent Utility Strap & Astera Tag */}
          <path d="M195 240 L200 350 L212 350 L207 240 Z" fill="url(#coralAccent)" />
          <rect x="193" y="275" width="16" height="28" rx="4" fill="#FFE4E6" />
          <path d="M197 282 L205 296 M205 282 L197 296" stroke="#E11D48" strokeWidth="2" strokeLinecap="round" />

          {/* Front Zip & Pocket Details */}
          <line x1="165" y1="260" x2="200" y2="275" stroke="#042F2E" strokeWidth="4" strokeLinecap="round" />
          <line x1="375" y1="260" x2="340" y2="275" stroke="#042F2E" strokeWidth="4" strokeLinecap="round" />

          {/* Streetwear Pants Form */}
          <path d="M225 410 L190 600 L250 600 L268 470 L286 600 L346 600 L315 410 Z" fill="url(#cargoPants)" />
          {/* Cargo Pocket flaps */}
          <rect x="180" y="460" width="35" height="42" rx="4" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
          <rect x="325" y="460" width="35" height="42" rx="4" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />

          {/* Sneaker bases */}
          <path d="M180 595 L175 625 L255 625 L250 595 Z" fill="#FFFFFF" />
          <path d="M175 620 L255 620" stroke="#0D9488" strokeWidth="4" />
          <path d="M285 595 L280 625 L360 625 L355 595 Z" fill="#FFFFFF" />
          <path d="M280 620 L360 620" stroke="#0D9488" strokeWidth="4" />

          {/* Floating Fashion Editorial Geometry */}
          <circle cx="430" cy="160" r="6" fill="#F43F5E" />
          <circle cx="455" cy="180" r="14" stroke="#14B8A6" strokeWidth="3" strokeDasharray="4 4" />
          <circle cx="100" cy="280" r="22" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
        </svg>
      </div>
    );
  }

  if (type === 'denim') {
    return (
      <div className={`relative w-full h-full overflow-hidden select-none pointer-events-none ${className}`}>
        <div className="absolute inset-0 bg-radial from-indigo-500/25 via-transparent to-transparent opacity-75" />
        <svg
          viewBox="0 0 540 640"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.5)]"
        >
          <defs>
            <linearGradient id="denimShade" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="45%" stopColor="#1D4ED8" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
            <linearGradient id="washedJacket" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#1E3A8A" />
            </linearGradient>
            <linearGradient id="goldBrass" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDE047" />
              <stop offset="100%" stopColor="#CA8A04" />
            </linearGradient>
          </defs>

          {/* Torso: Heavy Oversized Trucker Denim Jacket */}
          <path d="M270 140 L210 170 L140 220 L115 380 L170 395 L190 280 L215 400 L325 400 L350 280 L370 395 L425 380 L400 220 L330 170 Z" fill="url(#washedJacket)" />

          {/* Contrast Golden Stitching Lines */}
          <path d="M210 170 L215 400" stroke="#FBBF24" strokeWidth="2" strokeDasharray="5 3" />
          <path d="M330 170 L325 400" stroke="#FBBF24" strokeWidth="2" strokeDasharray="5 3" />
          <path d="M140 220 L210 240 L270 240 L330 240 L400 220" stroke="#FBBF24" strokeWidth="2.5" />

          {/* Trucker Flap Pockets with Brass Rivets */}
          <rect x="225" y="255" width="38" height="42" rx="4" fill="#1E3A8A" stroke="#FBBF24" strokeWidth="1.5" />
          <circle cx="244" cy="265" r="4" fill="url(#goldBrass)" />
          <rect x="277" y="255" width="38" height="42" rx="4" fill="#1E3A8A" stroke="#FBBF24" strokeWidth="1.5" />
          <circle cx="296" cy="265" r="4" fill="url(#goldBrass)" />

          {/* Center Brass Buttons */}
          <circle cx="270" cy="285" r="5" fill="url(#goldBrass)" />
          <circle cx="270" cy="325" r="5" fill="url(#goldBrass)" />
          <circle cx="270" cy="365" r="5" fill="url(#goldBrass)" />

          {/* Japanese Selvedge Raw Jeans Lower Body */}
          <path d="M215 400 L175 610 L245 610 L265 470 L285 610 L355 610 L325 400 Z" fill="url(#denimShade)" />
          
          {/* Selvedge Cuff Details (Red Line) */}
          <rect x="175" y="585" width="70" height="25" fill="#E2E8F0" />
          <line x1="240" y1="585" x2="240" y2="610" stroke="#EF4444" strokeWidth="3" />
          <rect x="285" y="585" width="70" height="25" fill="#E2E8F0" />
          <line x1="290" y1="585" x2="290" y2="610" stroke="#EF4444" strokeWidth="3" />

          {/* Whisker fading effects */}
          <path d="M225 435 C240 445, 255 440, 260 435" stroke="rgba(255,255,255,0.3)" strokeWidth="5" strokeLinecap="round" />
          <path d="M315 435 C300 445, 285 440, 280 435" stroke="rgba(255,255,255,0.3)" strokeWidth="5" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  if (type === 'festive') {
    return (
      <div className={`relative w-full h-full overflow-hidden select-none pointer-events-none ${className}`}>
        <div className="absolute inset-0 bg-radial from-rose-500/25 via-transparent to-transparent opacity-75" />
        <svg
          viewBox="0 0 540 640"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.5)]"
        >
          <defs>
            <linearGradient id="festiveSilk" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#BE123C" />
              <stop offset="60%" stopColor="#881337" />
              <stop offset="100%" stopColor="#4C0519" />
            </linearGradient>
            <linearGradient id="zariGold" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="50%" stopColor="#FDE68A" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
          </defs>

          {/* Flowing Festive Anarkali / Kurti Modern Silhouette */}
          <path d="M270 145 C245 155, 215 190, 200 230 L160 320 L195 330 L220 270 L140 590 L400 590 L320 270 L345 330 L380 320 L340 230 C325 190, 295 155, 270 145 Z" fill="url(#festiveSilk)" />

          {/* Artisanal Neckline with Intricate Zari Work */}
          <path d="M245 170 C245 220, 295 220, 295 170 L285 240 L255 240 Z" fill="url(#zariGold)" />
          <circle cx="270" cy="205" r="4" fill="#991B1B" />
          <circle cx="270" cy="225" r="4" fill="#991B1B" />

          {/* Golden Zari Hem Border */}
          <path d="M140 560 L400 560 L400 590 L140 590 Z" fill="url(#zariGold)" />
          <line x1="140" y1="575" x2="400" y2="575" stroke="#92400E" strokeWidth="2" strokeDasharray="6 4" />

          {/* Dupatta Drape Across Shoulder */}
          <path d="M210 180 C210 260, 280 360, 390 440 L410 420 C310 340, 230 250, 230 180 Z" fill="rgba(245, 158, 11, 0.45)" stroke="url(#zariGold)" strokeWidth="1.5" />
        </svg>
      </div>
    );
  }

  if (type === 'urban') {
    return (
      <div className={`relative w-full h-full overflow-hidden select-none pointer-events-none ${className}`}>
        <svg
          viewBox="0 0 240 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)]"
        >
          {/* T-Shirt and Jacket Combo Graphic for Small Banner */}
          <path d="M70 50 L120 70 L170 50 L205 90 L180 120 L165 105 L165 195 L75 195 L75 105 L60 120 L35 90 Z" fill="#0F766E" />
          <path d="M100 62 C108 80, 132 80, 140 62 L150 120 L90 120 Z" fill="#FFFFFF" />
          <line x1="120" y1="85" x2="120" y2="195" stroke="#134E4A" strokeWidth="4" />
          <circle cx="185" cy="50" r="18" fill="#F43F5E" />
          <path d="M180 50 L190 50 M185 45 L185 55" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  // Combos Pack
  return (
    <div className={`relative w-full h-full overflow-hidden select-none pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 240 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)]"
      >
        {/* Layered Combo Graphic: Tee + Pants + Bag */}
        <rect x="50" y="45" width="85" height="100" rx="10" fill="#E11D48" />
        <rect x="105" y="80" width="85" height="110" rx="10" fill="#0D9488" stroke="#FFFFFF" strokeWidth="3" />
        <circle cx="145" cy="130" r="22" fill="#FBBF24" />
        <text x="145" y="136" textAnchor="middle" fill="#0F172A" fontSize="16" fontWeight="bold">
          40%
        </text>
      </svg>
    </div>
  );
};
