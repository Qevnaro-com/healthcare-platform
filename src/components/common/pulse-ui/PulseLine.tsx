import React from 'react';
import { clsx } from 'clsx';

export interface PulseLineProps {
  variant?: 'divider' | 'timeline' | 'hero' | 'pulse' | 'glow' | 'accent' | 'mini';
  color?: 'teal' | 'gradient' | 'muted' | 'blue' | 'crimson' | 'royal' | 'green';
  animated?: boolean;
  className?: string;
  height?: number;
}

export const PulseLine: React.FC<PulseLineProps> = ({
  variant = 'divider',
  color = 'gradient',
  animated = false,
  className,
  height = 24
}) => {
  const colorMap: Record<string, string> = {
    crimson: '#C31725',
    royal: '#015498',
    blue: '#015498',
    teal: '#015498',
    green: '#25D366',
    muted: '#94A3B8',
    gradient: 'url(#pulse-line-gradient)'
  };

  const selectedColor = colorMap[color] || colorMap.gradient;

  if (variant === 'mini') {
    return (
      <svg
        className={clsx('inline-block overflow-visible', animated && 'animate-pulse', className)}
        width="48"
        height="12"
        viewBox="0 0 48 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="pulse-mini-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#015498" />
            <stop offset="50%" stopColor="#C31725" />
            <stop offset="100%" stopColor="#015498" />
          </linearGradient>
        </defs>
        <path
          d="M0 6 H14 L18 2 L22 10 L26 4 L30 8 L34 6 H48"
          stroke={color === 'gradient' ? 'url(#pulse-mini-grad)' : selectedColor}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (variant === 'hero') {
    return (
      <div className={clsx('relative w-full overflow-hidden select-none pointer-events-none', className)}>
        <svg
          className="w-full h-auto overflow-visible"
          viewBox="0 0 1200 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="pulse-hero-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#015498" stopOpacity="0.05" />
              <stop offset="30%" stopColor="#015498" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#C31725" stopOpacity="1" />
              <stop offset="70%" stopColor="#015498" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#C31725" stopOpacity="0.05" />
            </linearGradient>
            <filter id="glow-hero" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Base stroke */}
          <path
            d="M0 30 H480 L495 30 L505 10 L515 50 L525 18 L535 38 L545 26 L555 30 H1200"
            stroke="url(#pulse-hero-grad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glow-hero)"
          />

          {/* Animated signal dot */}
          {animated && (
            <circle r="4.5" fill="#C31725">
              <animateMotion
                path="M0 30 H480 L495 30 L505 10 L515 50 L525 18 L535 38 L545 26 L555 30 H1200"
                dur="3.5s"
                repeatCount="indefinite"
              />
            </circle>
          )}
        </svg>
      </div>
    );
  }

  // Standard Divider / Accent Pulse Line
  return (
    <div className={clsx('relative w-full flex items-center justify-center my-2', className)}>
      <svg
        className="w-full h-auto max-w-full overflow-visible"
        height={height}
        viewBox="0 0 600 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="pulse-line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#015498" stopOpacity="0.1" />
            <stop offset="30%" stopColor="#015498" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#C31725" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#015498" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#C31725" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        <path
          d="M0 12 H240 L248 12 L254 4 L260 20 L266 7 L272 15 L278 10 L284 12 H600"
          stroke={selectedColor}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.85"
        />

        {animated && (
          <path
            d="M0 12 H240 L248 12 L254 4 L260 20 L266 7 L272 15 L278 10 L284 12 H600"
            stroke="#C31725"
            strokeWidth="2.5"
            strokeDasharray="40 200"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="240"
              to="-400"
              dur="2.5s"
              repeatCount="indefinite"
            />
          </path>
        )}
      </svg>
    </div>
  );
};
