import React from 'react';

export interface DispatchRadarBeaconProps {
  size?: number | string;
  hubLabel?: string;
  showNodes?: boolean;
  variant?: 'light' | 'dark' | 'transparent';
  className?: string;
}

export const DispatchRadarBeacon: React.FC<DispatchRadarBeaconProps> = ({
  size = 180,
  hubLabel,
  showNodes = true,
  variant = 'transparent',
  className = ''
}) => {
  const ringColor = '#015498';
  const crimsonBeacon = '#C31725';
  const bgClass = variant === 'dark' ? 'bg-[#050F33]' : variant === 'light' ? 'bg-white' : 'bg-transparent';

  return (
    <div
      className={`relative inline-flex flex-col items-center justify-center select-none ${bgClass} ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label="24x7 Doorstep Care Dispatch Radar Pulse Beacon"
    >
      <style>{`
        @keyframes radar-beam-rotation {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes radar-beacon-ripple {
          0% { r: 12px; opacity: 0.8; }
          100% { r: 72px; opacity: 0; }
        }
        @keyframes caregiver-node-ping {
          0%, 20% { transform: scale(1); opacity: 0.3; }
          30% { transform: scale(1.6); opacity: 1; }
          45% { transform: scale(1); opacity: 0.4; }
          100% { transform: scale(1); opacity: 0.3; }
        }
        .radar-sweep-cone {
          transform-origin: 100px 100px;
          animation: radar-beam-rotation 3.8s linear infinite;
        }
        .radar-wave-1 {
          animation: radar-beacon-ripple 2.8s cubic-bezier(0.1, 0.6, 0.4, 1) infinite;
        }
        .radar-wave-2 {
          animation: radar-beacon-ripple 2.8s cubic-bezier(0.1, 0.6, 0.4, 1) infinite;
          animation-delay: 1.4s;
        }
        .caregiver-ping-1 {
          transform-origin: 146px 64px;
          animation: caregiver-node-ping 3.8s ease-in-out infinite;
          animation-delay: 0.5s;
        }
        .caregiver-ping-2 {
          transform-origin: 62px 138px;
          animation: caregiver-node-ping 3.8s ease-in-out infinite;
          animation-delay: 2.2s;
        }
        .caregiver-ping-3 {
          transform-origin: 154px 136px;
          animation: caregiver-node-ping 3.8s ease-in-out infinite;
          animation-delay: 3.1s;
        }
      `}</style>

      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        <defs>
          {/* Radar Sweep Radial Wedge Gradient */}
          <radialGradient id="radar-sweep-wedge" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#015498" stopOpacity="0.28" />
            <stop offset="60%" stopColor="#0E7CEE" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#015498" stopOpacity="0" />
          </radialGradient>

          {/* Center Beacon Pin Gradient */}
          <linearGradient id="center-pin-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#015498" />
            <stop offset="100%" stopColor="#003B6D" />
          </linearGradient>
        </defs>

        {/* Concentric GPS Range Rings (5km, 10km, 15km) */}
        <circle cx="100" cy="100" r="92" stroke={ringColor} strokeWidth="1" strokeDasharray="4 3" opacity="0.25" />
        <circle cx="100" cy="100" r="66" stroke={ringColor} strokeWidth="1.2" opacity="0.35" />
        <circle cx="100" cy="100" r="38" stroke={ringColor} strokeWidth="1" strokeDasharray="2 3" opacity="0.45" />

        {/* Crosshair Cardinal Coordinate Guides */}
        <line x1="8" y1="100" x2="192" y2="100" stroke={ringColor} strokeWidth="1" opacity="0.2" />
        <line x1="100" y1="8" x2="100" y2="192" stroke={ringColor} strokeWidth="1" opacity="0.2" />

        {/* Sonar Radiating Wave Rings */}
        <circle cx="100" cy="100" fill="none" stroke={ringColor} strokeWidth="1.5" className="radar-wave-1" />
        <circle cx="100" cy="100" fill="none" stroke={ringColor} strokeWidth="1.5" className="radar-wave-2" />

        {/* Rotating Radar Sweep Cone Sector */}
        <g className="radar-sweep-cone">
          <path
            d="M 100 100 L 100 8 A 92 92 0 0 1 178 54 Z"
            fill="url(#radar-sweep-wedge)"
          />
          <line
            x1="100"
            y1="100"
            x2="178"
            y2="54"
            stroke="#0E7CEE"
            strokeWidth="1.75"
            strokeLinecap="round"
            opacity="0.85"
          />
        </g>

        {/* Satellite Active Caregiver Pings (Noida, Gurugram, South Delhi) */}
        {showNodes && (
          <g>
            {/* Node 1: Gurugram Hub */}
            <circle cx="146" cy="64" r="7" fill="none" stroke={crimsonBeacon} strokeWidth="1.2" className="caregiver-ping-1" />
            <circle cx="146" cy="64" r="3" fill={crimsonBeacon} />

            {/* Node 2: South Delhi Hub */}
            <circle cx="62" cy="138" r="7" fill="none" stroke="#0E7CEE" strokeWidth="1.2" className="caregiver-ping-2" />
            <circle cx="62" cy="138" r="3" fill="#015498" />

            {/* Node 3: Noida Hub */}
            <circle cx="154" cy="136" r="7" fill="none" stroke={crimsonBeacon} strokeWidth="1.2" className="caregiver-ping-3" />
            <circle cx="154" cy="136" r="3" fill={crimsonBeacon} />
          </g>
        )}

        {/* Center Hub Dispatch Pin */}
        <g>
          <circle cx="100" cy="100" r="14" fill="#FFFFFF" stroke={ringColor} strokeWidth="2" />
          <circle cx="100" cy="100" r="8" fill="url(#center-pin-grad)" />
          {/* Active Dispatch Crimson Micro-LED */}
          <circle cx="100" cy="100" r="3" fill={crimsonBeacon} />
        </g>
      </svg>

      {/* Modern Pill Caption */}
      {hubLabel && (
        <div className="mt-1 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-900/90 text-white border border-slate-700/60 shadow-sm text-[9px] font-mono tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C31725] animate-pulse" />
          <span>{hubLabel}</span>
        </div>
      )}
    </div>
  );
};
