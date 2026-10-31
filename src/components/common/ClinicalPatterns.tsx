import React from 'react';

interface PatternProps {
  className?: string;
  opacity?: number;
}

/**
 * Subtle clinical dot grid pattern for technical / clinical sections.
 * Uses fine SVG dots with customizable opacity and zero raster blur.
 */
export const ClinicalDotPattern: React.FC<PatternProps> = ({
  className = '',
  opacity = 0.25
}) => {
  return (
    <svg
      className={`absolute inset-0 w-full h-full pointer-events-none select-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="clinical-dot-pattern"
          x="0"
          y="0"
          width="24"
          height="24"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="1" fill="#015498" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#clinical-dot-pattern)" />
    </svg>
  );
};

/**
 * Subtle technical micro-grid line pattern for telemetry and bento sections.
 */
export const ClinicalGridPattern: React.FC<PatternProps & { inverted?: boolean }> = ({
  className = '',
  opacity = 0.2,
  inverted = false
}) => {
  const strokeColor = inverted ? '#E0F2FE' : '#94A3B8';
  return (
    <svg
      className={`absolute inset-0 w-full h-full pointer-events-none select-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
      aria-hidden="true"
    >
      <defs>
        <pattern
          id={`clinical-grid-${inverted ? 'inv' : 'reg'}`}
          x="0"
          y="0"
          width="36"
          height="36"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 36 0 L 0 0 0 36"
            fill="none"
            stroke={strokeColor}
            strokeWidth="0.75"
            strokeDasharray="2 4"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#clinical-grid-${inverted ? 'inv' : 'reg'})`} />
    </svg>
  );
};

/**
 * Crisp SVG Electrocardiogram (ECG) waveform divider.
 */
export const ECGDivider: React.FC<{
  className?: string;
  color?: string;
  animated?: boolean;
}> = ({
  className = '',
  color = '#015498',
  animated = false
}) => {
  return (
    <div className={`w-full overflow-hidden flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 800 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-4xl h-7"
        preserveAspectRatio="none"
      >
        <path
          d="M0 18 H320 L330 18 L336 6 L342 30 L348 10 L354 22 L360 18 H440 L450 18 L456 6 L462 30 L468 10 L474 22 L480 18 H800"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={animated ? 'animate-pulse' : ''}
          opacity="0.4"
        />
      </svg>
    </div>
  );
};
