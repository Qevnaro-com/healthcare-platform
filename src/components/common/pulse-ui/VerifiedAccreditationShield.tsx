import React from 'react';

export interface VerifiedAccreditationShieldProps {
  size?: number | string;
  label?: string;
  sublabel?: string;
  variant?: 'badge' | 'icon-only' | 'pill';
  className?: string;
}

export const VerifiedAccreditationShield: React.FC<VerifiedAccreditationShieldProps> = ({
  size = 56,
  label = 'DNC & INC Registered',
  sublabel = 'Clinical Quality Verified',
  variant = 'badge',
  className = ''
}) => {
  return (
    <div
      className={`relative inline-flex items-center gap-3 select-none ${className}`}
      role="img"
      aria-label={`${label} - ${sublabel}`}
    >
      <style>{`
        @keyframes shield-check-draw {
          0% { stroke-dashoffset: 48; opacity: 0; }
          40% { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 1; }
        }
        @keyframes shield-sheen-sweep {
          0%, 60% { transform: translateX(-120%) rotate(25deg); opacity: 0; }
          70% { opacity: 0.5; }
          85% { transform: translateX(140%) rotate(25deg); opacity: 0; }
          100% { transform: translateX(140%) rotate(25deg); opacity: 0; }
        }
        .shield-check-path {
          stroke-dasharray: 48;
          stroke-dashoffset: 48;
          animation: shield-check-draw 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .shield-sheen-ray {
          animation: shield-sheen-sweep 4.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}</style>

      {/* Shield Vector Asset */}
      <div className="relative shrink-0 flex items-center justify-center" style={{ width: size, height: size }}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full overflow-hidden"
        >
          <defs>
            {/* Outer Rim Gradient */}
            <linearGradient id="shield-rim-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#015498" />
              <stop offset="50%" stopColor="#0E7CEE" />
              <stop offset="100%" stopColor="#004E8A" />
            </linearGradient>

            {/* Inner Shield Body Gradient */}
            <linearGradient id="shield-body-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#EFF6FF" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#DBEAFE" stopOpacity="0.8" />
            </linearGradient>

            {/* Clip path to constrain sheen inside shield */}
            <clipPath id="shield-inner-clip">
              <path d="M 50 14 C 68 14 82 20 88 28 C 88 62 70 82 50 92 C 30 82 12 62 12 28 C 18 20 32 14 50 14 Z" />
            </clipPath>

            {/* Sheen Glint Gradient */}
            <linearGradient id="shield-glint-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Outer Shield Outline */}
          <path
            d="M 50 10 C 72 10 88 18 94 26 C 94 66 74 88 50 98 C 26 88 6 66 6 26 C 12 18 28 10 50 10 Z"
            fill="none"
            stroke="url(#shield-rim-grad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Inner Shield Surface */}
          <path
            d="M 50 14 C 68 14 82 20 88 28 C 88 62 70 82 50 92 C 30 82 12 62 12 28 C 18 20 32 14 50 14 Z"
            fill="url(#shield-body-grad)"
            stroke="#93C5FD"
            strokeWidth="1"
            opacity="0.9"
          />

          {/* Glint Light Sheen Traversing Surface */}
          <g clipPath="url(#shield-inner-clip)">
            <rect
              x="-60"
              y="0"
              width="45"
              height="120"
              fill="url(#shield-glint-grad)"
              className="shield-sheen-ray pointer-events-none"
            />
          </g>

          {/* Subtle Heraldic Clinical Cross Decal */}
          <path
            d="M 50 25 V 33 M 46 29 H 54"
            stroke="#015498"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.4"
          />

          {/* Animated Clinical Checkmark */}
          <path
            d="M 33 52 L 45 64 L 67 40"
            fill="none"
            stroke="#015498"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="shield-check-path"
          />
        </svg>
      </div>

      {/* Typography */}
      {variant !== 'icon-only' && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-black tracking-tight text-slate-900 leading-tight">
              {label}
            </span>
            <span className="inline-flex items-center px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-blue-100 text-[#015498]">
              100%
            </span>
          </div>
          <span className="text-[11px] font-semibold text-slate-500 leading-tight">
            {sublabel}
          </span>
        </div>
      )}
    </div>
  );
};
