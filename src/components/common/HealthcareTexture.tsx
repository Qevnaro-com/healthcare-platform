import React from 'react';
import { clsx } from 'clsx';

export type TextureType =
  | 'medical-grid'
  | 'anatomical-geometry'
  | 'care-pathway'
  | 'location-mesh'
  | 'clinical-wave'
  | 'micro-dot-mesh'
  | 'material-grain'
  | 'medical-halo'
  | 'soft-cell'
  | 'cross-grid';

interface HealthcareTextureProps {
  type: TextureType;
  opacity?: number; // Default 0.04 (4%)
  className?: string;
}

// Inline SVG Data URIs for 10 procedural healthcare textures (Pulse Blue %230060A8 & Care Red %23C81E27)
const INLINE_TEXTURE_SVGS: Record<TextureType, string> = {
  'medical-grid': `data:image/svg+xml;utf8,<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg"><path d="M40 0H0v40h40V0zM39 1v38H1V1h38z" fill="%230060A8" fill-opacity="0.25"/><circle cx="20" cy="20" r="1" fill="%23C81E27" fill-opacity="0.4"/></svg>`,
  'anatomical-geometry': `data:image/svg+xml;utf8,<svg width="60" height="60" xmlns="http://www.w3.org/2000/svg"><polygon points="30,5 55,50 5,50" stroke="%23C81E27" stroke-width="1" fill="none" opacity="0.3"/><circle cx="30" cy="30" r="8" stroke="%230060A8" stroke-width="1" fill="none" opacity="0.3"/></svg>`,
  'care-pathway': `data:image/svg+xml;utf8,<svg width="80" height="40" xmlns="http://www.w3.org/2000/svg"><path d="M0 20 Q 20 5, 40 20 T 80 20" stroke="%23C81E27" stroke-width="1.5" fill="none" opacity="0.35"/><circle cx="40" cy="20" r="3" fill="%230060A8" opacity="0.5"/></svg>`,
  'location-mesh': `data:image/svg+xml;utf8,<svg width="50" height="50" xmlns="http://www.w3.org/2000/svg"><circle cx="25" cy="25" r="20" stroke="%230060A8" stroke-width="1" fill="none" opacity="0.25"/><circle cx="25" cy="25" r="10" stroke="%23C81E27" stroke-width="1" fill="none" stroke-dasharray="2,2" opacity="0.35"/></svg>`,
  'clinical-wave': `data:image/svg+xml;utf8,<svg width="100" height="30" xmlns="http://www.w3.org/2000/svg"><path d="M0 15 Q 25 0, 50 15 T 100 15" stroke="%230060A8" stroke-width="1" fill="none" opacity="0.3"/><path d="M0 15 Q 25 30, 50 15 T 100 15" stroke="%23C81E27" stroke-width="1" fill="none" opacity="0.25"/></svg>`,
  'micro-dot-mesh': `data:image/svg+xml;utf8,<svg width="16" height="16" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="1.2" fill="%230060A8" opacity="0.30"/></svg>`,
  'material-grain': `data:image/svg+xml;utf8,<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><rect width="2" height="2" x="4" y="4" fill="%230060A8" opacity="0.15"/><rect width="2" height="2" x="14" y="12" fill="%23C81E27" opacity="0.2"/></svg>`,
  'medical-halo': `data:image/svg+xml;utf8,<svg width="120" height="120" xmlns="http://www.w3.org/2000/svg"><circle cx="60" cy="60" r="50" fill="%23C81E27" opacity="0.08"/><circle cx="60" cy="60" r="30" fill="%230060A8" opacity="0.06"/></svg>`,
  'soft-cell': `data:image/svg+xml;utf8,<svg width="48" height="48" xmlns="http://www.w3.org/2000/svg"><path d="M24 4 C35 4, 44 13, 44 24 C44 35, 35 44, 24 44 C13 44, 4 35, 4 24 C4 13, 13 4, 24 4 Z" stroke="%23C81E27" stroke-width="1" fill="none" opacity="0.25"/></svg>`,
  'cross-grid': `data:image/svg+xml;utf8,<svg width="32" height="32" xmlns="http://www.w3.org/2000/svg"><path d="M16 10v12M10 16h12" stroke="%230060A8" stroke-width="1.5" opacity="0.35"/></svg>`
};

export const HealthcareTexture: React.FC<HealthcareTextureProps> = ({
  type,
  opacity = 0.04,
  className
}) => {
  const inlineSvgData = INLINE_TEXTURE_SVGS[type] || INLINE_TEXTURE_SVGS['medical-grid'];

  return (
    <div
      className={clsx('absolute inset-0 pointer-events-none select-none z-0', className)}
      style={{
        backgroundImage: `url("${inlineSvgData}")`,
        backgroundRepeat: 'repeat',
        opacity: opacity
      }}
      aria-hidden="true"
    />
  );
};
