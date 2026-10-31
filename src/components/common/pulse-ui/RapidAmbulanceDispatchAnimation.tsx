import React from 'react';

export interface RapidAmbulanceDispatchAnimationProps {
  size?: number | string;
  variant?: 'light' | 'dark' | 'transparent';
  className?: string;
  showMotionLines?: boolean;
}

export const RapidAmbulanceDispatchAnimation: React.FC<RapidAmbulanceDispatchAnimationProps> = ({
  size = 72,
  variant = 'transparent',
  className = '',
  showMotionLines = true
}) => {
  const primaryBlue = '#015498';
  const emergencyRed = '#C31725';
  const bgClass = variant === 'dark' ? 'bg-[#050F33]' : variant === 'light' ? 'bg-white' : 'bg-transparent';

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none overflow-visible ${bgClass} ${className}`}
      style={{ width: size, height: typeof size === 'number' ? size * 0.65 : size }}
      role="img"
      aria-label="Rapid Nurse Dispatch Response Animation"
    >
      <style>{`
        @keyframes emergency-siren-flash {
          0%, 100% { fill: #EF4444; filter: drop-shadow(0 0 8px #EF4444); }
          50% { fill: #3B82F6; filter: drop-shadow(0 0 8px #3B82F6); }
        }
        @keyframes ambulance-speed-vibe {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-1.5px); }
        }
        @keyframes road-motion-streak {
          0% { stroke-dashoffset: 100; opacity: 0; }
          40% { opacity: 0.9; }
          100% { stroke-dashoffset: -100; opacity: 0; }
        }
        .siren-beacon-left {
          animation: emergency-siren-flash 0.8s ease-in-out infinite;
        }
        .siren-beacon-right {
          animation: emergency-siren-flash 0.8s ease-in-out infinite 0.4s;
        }
        .ambulance-chassis {
          animation: ambulance-speed-vibe 0.4s ease-in-out infinite;
        }
        .motion-trail {
          stroke-dasharray: 20 60;
          animation: road-motion-streak 1.1s linear infinite;
        }
      `}</style>

      <svg
        viewBox="0 0 160 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        <defs>
          <linearGradient id="amb-body-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F1F5F9" />
          </linearGradient>
        </defs>

        {/* Speed Wind Streaks */}
        {showMotionLines && (
          <g>
            <line x1="5" y1="35" x2="35" y2="35" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" className="motion-trail" />
            <line x1="0" y1="52" x2="28" y2="52" stroke={primaryBlue} strokeWidth="2.5" strokeLinecap="round" className="motion-trail" style={{ animationDelay: '0.3s' }} />
            <line x1="10" y1="70" x2="42" y2="70" stroke="#C31725" strokeWidth="2" strokeLinecap="round" className="motion-trail" style={{ animationDelay: '0.6s' }} />
          </g>
        )}

        <g className="ambulance-chassis">
          {/* Siren Beacon on Roof */}
          <circle cx="82" cy="22" r="5" className="siren-beacon-left" />
          <circle cx="98" cy="22" r="5" className="siren-beacon-right" />
          <rect x="80" y="25" width="20" height="4" rx="2" fill="#475569" />

          {/* Vehicle Body Shell */}
          <path
            d="M 38 72 V 34 C 38 30, 42 27, 46 27 H 110 C 114 27, 118 30, 120 34 L 136 50 C 139 53, 142 58, 142 63 V 72 H 38 Z"
            fill="url(#amb-body-grad)"
            stroke="#050F33"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Cab Front Windshield & Side Window */}
          <path
            d="M 116 35 H 122 L 134 49 H 116 V 35 Z"
            fill="#38BDF8"
            opacity="0.85"
            stroke="#050F33"
            strokeWidth="2.5"
          />
          <rect x="52" y="35" width="24" height="15" rx="3" fill="#E2E8F0" stroke="#050F33" strokeWidth="2" />
          <rect x="82" y="35" width="24" height="15" rx="3" fill="#E2E8F0" stroke="#050F33" strokeWidth="2" />

          {/* Clinical Red Stripe with Heartbeat ECG on Door */}
          <rect x="39" y="55" width="102" height="7" fill={emergencyRed} />
          <path
            d="M 68 58.5 L 72 58.5 L 74 54 L 77 63 L 80 56 L 82 58.5 L 86 58.5"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Medical Red Cross Badge */}
          <g transform="translate(98, 54)">
            <rect x="0" y="3" width="9" height="3" fill="#FFFFFF" />
            <rect x="3" y="0" width="3" height="9" fill="#FFFFFF" />
          </g>

          {/* Wheels with Spinning Hubcaps */}
          <g>
            <circle cx="62" cy="74" r="11" fill="#1E293B" stroke="#050F33" strokeWidth="3" />
            <circle cx="62" cy="74" r="5" fill="#94A3B8" />
            <circle cx="120" cy="74" r="11" fill="#1E293B" stroke="#050F33" strokeWidth="3" />
            <circle cx="120" cy="74" r="5" fill="#94A3B8" />
          </g>
        </g>
      </svg>
    </div>
  );
};
