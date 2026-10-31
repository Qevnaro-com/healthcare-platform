import React from 'react';

export interface ClinicalECGHeartbeatProps {
  variant?: 'light' | 'dark' | 'transparent';
  showGrid?: boolean;
  showTelemetry?: boolean;
  bpm?: number;
  className?: string;
  height?: number | string;
}

export const ClinicalECGHeartbeat: React.FC<ClinicalECGHeartbeatProps> = ({
  variant = 'transparent',
  showGrid = true,
  showTelemetry = true,
  bpm = 72,
  className = '',
  height = 90
}) => {
  const isDark = variant === 'dark';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(1, 84, 152, 0.05)';
  const baseBg = variant === 'transparent' ? 'transparent' : isDark ? '#050F33' : '#FFFFFF';
  const strokeBlue = '#015498';
  const strokeCrimson = '#C31725';

  return (
    <div
      className={`relative inline-flex flex-col items-center justify-center overflow-hidden rounded-2xl select-none ${className}`}
      style={{ backgroundColor: baseBg }}
    >
      <style>{`
        @keyframes ecg-sweep-line {
          0% { stroke-dashoffset: 600; }
          100% { stroke-dashoffset: -600; }
        }
        @keyframes ecg-systole-ping {
          0%, 65% { transform: scale(0.8); opacity: 0; }
          70% { transform: scale(1); opacity: 0.9; }
          85% { transform: scale(2.4); opacity: 0; }
          100% { transform: scale(0.8); opacity: 0; }
        }
        @keyframes ecg-dot-pulse {
          0%, 65% { opacity: 0.3; transform: scale(0.9); }
          72% { opacity: 1; transform: scale(1.2); }
          82% { opacity: 0.3; transform: scale(0.9); }
          100% { opacity: 0.3; transform: scale(0.9); }
        }
        .ecg-trace-sweep {
          stroke-dasharray: 140 460;
          animation: ecg-sweep-line 2.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .ecg-ping-ring {
          transform-origin: 122px 14px;
          animation: ecg-systole-ping 2.2s ease-out infinite;
        }
        .ecg-core-dot {
          transform-origin: 122px 14px;
          animation: ecg-dot-pulse 2.2s ease-out infinite;
        }
      `}</style>

      {/* Telemetry Header Bar */}
      {showTelemetry && (
        <div className="w-full flex items-center justify-between px-3 pt-2 text-[10px] font-mono tracking-wider">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C31725] animate-pulse" />
            <span className="font-bold text-[#015498]">LEAD II</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500 font-medium">NSR 0.12s</span>
          </div>
          <div className="flex items-center gap-1 font-bold text-slate-800">
            <span className="text-xs font-black text-[#015498]">{bpm}</span>
            <span className="text-[9px] text-slate-400">BPM</span>
          </div>
        </div>
      )}

      {/* ECG Waveform SVG */}
      <svg
        viewBox="0 0 400 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto overflow-visible"
        style={{ height }}
        role="img"
        aria-label="Clinical ECG Heartbeat Monitor Waveform"
      >
        <defs>
          {/* Subtle Hospital Telemetry Grid Pattern */}
          {showGrid && (
            <pattern id="ecg-grid" width="16" height="16" patternUnits="userSpaceOnUse">
              <path d="M 16 0 L 0 0 0 16" fill="none" stroke={gridColor} strokeWidth="1" />
            </pattern>
          )}

          {/* Clinical Gradient along the trace */}
          <linearGradient id="ecg-trace-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={strokeBlue} stopOpacity="0.15" />
            <stop offset="25%" stopColor={strokeBlue} stopOpacity="0.9" />
            <stop offset="31%" stopColor={strokeCrimson} stopOpacity="1" />
            <stop offset="36%" stopColor={strokeBlue} stopOpacity="0.9" />
            <stop offset="100%" stopColor={strokeBlue} stopOpacity="0.15" />
          </linearGradient>

          {/* Sweep Gradient */}
          <linearGradient id="ecg-beam-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={strokeBlue} stopOpacity="0" />
            <stop offset="70%" stopColor={strokeBlue} stopOpacity="0.8" />
            <stop offset="90%" stopColor={strokeCrimson} stopOpacity="1" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* Optional Hospital Grid Surface */}
        {showGrid && (
          <rect x="0" y="0" width="400" height="100" fill="url(#ecg-grid)" rx="8" />
        )}

        {/* Faint Baseline Wire */}
        <line x1="0" y1="60" x2="400" y2="60" stroke={strokeBlue} strokeWidth="1" strokeDasharray="3 3" opacity="0.15" />

        {/* Static Background Guide ECG Trace (P-Q-R-S-T) */}
        <path
          d="M 0 60 L 50 60 C 58 60 62 48 68 48 C 74 48 78 60 86 60 L 105 60 L 112 68 L 122 14 L 132 94 L 139 60 L 160 60 C 172 60 178 46 188 46 C 198 46 204 60 216 60 L 250 60 C 258 60 262 48 268 48 C 274 48 278 60 286 60 L 305 60 L 312 68 L 322 14 L 332 94 L 339 60 L 360 60 C 372 60 378 46 388 46 C 398 46 400 60 400 60"
          stroke="url(#ecg-trace-grad)"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.35"
        />

        {/* Animated Sweep Lead Trace */}
        <path
          d="M 0 60 L 50 60 C 58 60 62 48 68 48 C 74 48 78 60 86 60 L 105 60 L 112 68 L 122 14 L 132 94 L 139 60 L 160 60 C 172 60 178 46 188 46 C 198 46 204 60 216 60 L 250 60 C 258 60 262 48 268 48 C 274 48 278 60 286 60 L 305 60 L 312 68 L 322 14 L 332 94 L 339 60 L 360 60 C 372 60 378 46 388 46 C 398 46 400 60 400 60"
          stroke="url(#ecg-beam-grad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="ecg-trace-sweep"
        />

        {/* Systolic R-Peak Ping Effect (Heartbeat Micro-Blip) */}
        <circle cx="122" cy="14" r="9" fill="none" stroke={strokeCrimson} strokeWidth="1.5" className="ecg-ping-ring" />
        <circle cx="122" cy="14" r="3.5" fill={strokeCrimson} className="ecg-core-dot" />
        <circle cx="122" cy="14" r="1.5" fill="#FFFFFF" />
      </svg>
    </div>
  );
};
