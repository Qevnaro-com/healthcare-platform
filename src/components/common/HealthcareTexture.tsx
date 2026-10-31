import React from 'react';
import { clsx } from 'clsx';

export type TextureType =
  | 'medical-grid'
  | 'medical-hex-cross'
  | 'anatomical-geometry'
  | 'care-pathway'
  | 'location-mesh'
  | 'clinical-wave'
  | 'micro-dot-mesh'
  | 'material-grain'
  | 'medical-halo'
  | 'soft-cell'
  | 'cross-grid'
  | 'ecg-pulse'
  | 'hospital-cross'
  | 'ambient-mesh';

interface HealthcareTextureProps {
  type: TextureType;
  opacity?: number; // Default 0.04 (4%)
  animated?: boolean;
  invert?: boolean;
  size?: string;
  className?: string;
}

// Inline SVG Data URIs for procedural healthcare textures (Pulse Royal Blue %23015498 & Medical Crimson %23C31725)
const INLINE_TEXTURE_SVGS: Record<TextureType, string> = {
  'medical-grid': `data:image/svg+xml;utf8,<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg"><path d="M40 0H0v40h40V0zM39 1v38H1V1h38z" fill="%23015498" fill-opacity="0.15"/><circle cx="20" cy="20" r="1.2" fill="%23C31725" fill-opacity="0.3"/></svg>`,
  'medical-hex-cross': `/assets/textures/medical-hex-cross.png`,
  'anatomical-geometry': `data:image/svg+xml;utf8,<svg width="60" height="60" xmlns="http://www.w3.org/2000/svg"><polygon points="30,5 55,50 5,50" stroke="%23C31725" stroke-width="1" fill="none" opacity="0.25"/><circle cx="30" cy="30" r="8" stroke="%23015498" stroke-width="1" fill="none" opacity="0.25"/></svg>`,
  'care-pathway': `data:image/svg+xml;utf8,<svg width="80" height="40" xmlns="http://www.w3.org/2000/svg"><path d="M0 20 Q 20 5, 40 20 T 80 20" stroke="%23C31725" stroke-width="1.5" fill="none" opacity="0.3"/><circle cx="40" cy="20" r="3" fill="%23015498" opacity="0.45"/></svg>`,
  'location-mesh': `data:image/svg+xml;utf8,<svg width="50" height="50" xmlns="http://www.w3.org/2000/svg"><circle cx="25" cy="25" r="20" stroke="%23015498" stroke-width="1" fill="none" opacity="0.2"/><circle cx="25" cy="25" r="10" stroke="%23C31725" stroke-width="1" fill="none" stroke-dasharray="2,2" opacity="0.3"/></svg>`,
  'clinical-wave': `data:image/svg+xml;utf8,<svg width="100" height="30" xmlns="http://www.w3.org/2000/svg"><path d="M0 15 Q 25 0, 50 15 T 100 15" stroke="%23015498" stroke-width="1" fill="none" opacity="0.25"/><path d="M0 15 Q 25 30, 50 15 T 100 15" stroke="%23C31725" stroke-width="1" fill="none" opacity="0.2"/></svg>`,
  'micro-dot-mesh': `data:image/svg+xml;utf8,<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="1.2" fill="%23015498" opacity="0.25"/><circle cx="0" cy="0" r="0.8" fill="%23C31725" opacity="0.15"/></svg>`,
  'material-grain': `data:image/svg+xml;utf8,<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><rect width="2" height="2" x="4" y="4" fill="%23015498" opacity="0.15"/><rect width="2" height="2" x="14" y="12" fill="%23C31725" opacity="0.18"/></svg>`,
  'medical-halo': `data:image/svg+xml;utf8,<svg width="120" height="120" xmlns="http://www.w3.org/2000/svg"><circle cx="60" cy="60" r="50" fill="%23C31725" opacity="0.06"/><circle cx="60" cy="60" r="30" fill="%23015498" opacity="0.05"/></svg>`,
  'soft-cell': `data:image/svg+xml;utf8,<svg width="48" height="48" xmlns="http://www.w3.org/2000/svg"><path d="M24 4 C35 4, 44 13, 44 24 C44 35, 35 44, 24 44 C13 44, 4 35, 4 24 C4 13, 13 4, 24 4 Z" stroke="%23C31725" stroke-width="1" fill="none" opacity="0.2"/></svg>`,
  'cross-grid': `data:image/svg+xml;utf8,<svg width="36" height="36" xmlns="http://www.w3.org/2000/svg"><path d="M18 10v16M10 18h16" stroke="%23015498" stroke-width="1.5" stroke-linecap="round" opacity="0.25"/><circle cx="18" cy="18" r="1" fill="%23C31725" opacity="0.4"/></svg>`,
  'ecg-pulse': `data:image/svg+xml;utf8,<svg width="120" height="30" xmlns="http://www.w3.org/2000/svg"><path d="M0 15 H45 L50 15 L54 6 L58 24 L62 10 L66 18 L70 15 H120" stroke="%23C31725" stroke-width="1.25" fill="none" opacity="0.35"/><circle cx="62" cy="10" r="1.5" fill="%23015498" opacity="0.5"/></svg>`,
  'hospital-cross': `data:image/svg+xml;utf8,<svg width="32" height="32" xmlns="http://www.w3.org/2000/svg"><rect x="14" y="8" width="4" height="16" rx="1" fill="%23015498" opacity="0.2"/><rect x="8" y="14" width="16" height="4" rx="1" fill="%23015498" opacity="0.2"/><circle cx="16" cy="16" r="1.2" fill="%23C31725" opacity="0.35"/></svg>`,
  'ambient-mesh': `data:image/svg+xml;utf8,<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="32" r="28" stroke="%23015498" stroke-width="0.75" fill="none" opacity="0.15"/><polygon points="32,12 48,44 16,44" stroke="%23C31725" stroke-width="0.75" fill="none" opacity="0.12"/></svg>`
};

export const HealthcareTexture: React.FC<HealthcareTextureProps> = ({
  type,
  opacity = 0.16,
  animated = false,
  invert = false,
  size,
  className
}) => {
  const isFixed = className?.includes('fixed');

  if (type === 'medical-hex-cross') {
    const bgUrl = invert
      ? '/assets/textures/medical-hex-cross-white.png'
      : '/assets/textures/medical-hex-cross.png';
    return (
      <div
        className={clsx(
          isFixed ? 'fixed' : 'absolute',
          'inset-0 pointer-events-none select-none z-0',
          animated && 'animate-texture-drift',
          className
        )}
        style={{
          backgroundImage: `url("${bgUrl}")`,
          backgroundRepeat: 'repeat',
          backgroundPosition: 'top left',
          backgroundSize: size || '740px 370px',
          opacity: opacity
        }}
        aria-hidden="true"
      />
    );
  }

  const inlineSvgData = INLINE_TEXTURE_SVGS[type] || INLINE_TEXTURE_SVGS['medical-grid'];

  return (
    <div
      className={clsx(
        isFixed ? 'fixed' : 'absolute',
        'inset-0 pointer-events-none select-none z-0',
        animated && 'animate-texture-drift',
        invert && 'filter invert',
        className
      )}
      style={{
        backgroundImage: `url("${inlineSvgData}")`,
        backgroundRepeat: 'repeat',
        backgroundPosition: 'top left',
        backgroundSize: size || undefined,
        opacity: opacity
      }}
      aria-hidden="true"
    />
  );
};
