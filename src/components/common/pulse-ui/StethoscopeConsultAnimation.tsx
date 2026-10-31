import React from 'react';

export interface StethoscopeConsultAnimationProps {
  size?: number | string;
  variant?: 'light' | 'dark' | 'transparent';
  className?: string;
  showAcousticWaves?: boolean;
}

export const StethoscopeConsultAnimation: React.FC<StethoscopeConsultAnimationProps> = ({
  size = 64,
  variant = 'transparent',
  className = '',
  showAcousticWaves = true
}) => {
  const bgClass = variant === 'dark' ? 'bg-[#050F33]' : variant === 'light' ? 'bg-white' : 'bg-transparent';
  const primaryBlue = '#015498';
  const pulseCrimson = '#C31725';

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none overflow-visible ${bgClass} ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label="Clinical Stethoscope Triage Animation"
    >
      <style>{`
        @keyframes acoustic-wave-expand {
          0% { r: 18px; opacity: 0.9; stroke-width: 2.5px; }
          60% { opacity: 0.4; }
          100% { r: 42px; opacity: 0; stroke-width: 0.8px; }
        }
        @keyframes stethoscope-diaphragm-thump {
          0%, 100% { transform: scale(1); }
          15% { transform: scale(1.08); }
          30% { transform: scale(0.96); }
          45% { transform: scale(1.04); }
          60% { transform: scale(1); }
        }
        @keyframes sound-particle-float {
          0% { transform: translateY(0) scale(0.8); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(-16px) scale(1.2); opacity: 0; }
        }
        .acoustic-ring-1 {
          animation: acoustic-wave-expand 2.2s cubic-bezier(0.1, 0.7, 0.3, 1) infinite;
        }
        .acoustic-ring-2 {
          animation: acoustic-wave-expand 2.2s cubic-bezier(0.1, 0.7, 0.3, 1) infinite 0.7s;
        }
        .diaphragm-core {
          transform-origin: 50px 50px;
          animation: stethoscope-diaphragm-thump 2.2s ease-in-out infinite;
        }
      `}</style>

      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        <defs>
          <linearGradient id="stetho-tube-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#015498" />
            <stop offset="100%" stopColor="#050F33" />
          </linearGradient>
          <radialGradient id="stetho-head-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="70%" stopColor="#F1F5F9" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </radialGradient>
        </defs>

        {/* Acoustic Sound Waves Radiating Out */}
        {showAcousticWaves && (
          <g>
            <circle cx="50" cy="50" r="18" fill="none" stroke={pulseCrimson} className="acoustic-ring-1" />
            <circle cx="50" cy="50" r="18" fill="none" stroke={primaryBlue} className="acoustic-ring-2" />
          </g>
        )}

        {/* Stethoscope Tubing Curve (Curving from Top Earpieces down to Chest Piece) */}
        <path
          d="M 28 20 C 28 36, 42 46, 42 60 C 42 70, 50 72, 50 56"
          stroke="url(#stetho-tube-grad)"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 72 20 C 72 36, 58 46, 58 60 C 58 70, 50 72, 50 56"
          stroke="url(#stetho-tube-grad)"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />

        {/* Earpieces */}
        <circle cx="28" cy="20" r="3.5" fill={primaryBlue} />
        <circle cx="72" cy="20" r="3.5" fill={primaryBlue} />

        {/* Central Diaphragm & Bell */}
        <g className="diaphragm-core">
          {/* Outer Chrome Rim */}
          <circle cx="50" cy="50" r="22" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5" />
          {/* Inner Resonator Surface */}
          <circle cx="50" cy="50" r="18" fill="url(#stetho-head-grad)" stroke={primaryBlue} strokeWidth="1.8" />
          {/* Medical Crimson Heart / Cross Symbol in Center */}
          <path
            d="M 50 42 V 58 M 42 50 H 58"
            stroke={pulseCrimson}
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          {/* Subtle Systolic Sparkle */}
          <circle cx="50" cy="50" r="3" fill="#FFFFFF" />
        </g>
      </svg>
    </div>
  );
};
