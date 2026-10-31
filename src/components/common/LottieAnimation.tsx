import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
// lottie-react (and the animation JSON) load on demand so they stay out of the main bundle
const LottiePlayer = lazy(() => import('./LottiePlayer'));
// LottieFiles (Lottie Simple License) — credits in src/assets/lottie/CREDITS.md

import { ClinicalECGHeartbeat } from './pulse-ui/ClinicalECGHeartbeat';
import { DispatchRadarBeacon } from './pulse-ui/DispatchRadarBeacon';
import { VerifiedAccreditationShield } from './pulse-ui/VerifiedAccreditationShield';
import { StethoscopeConsultAnimation } from './pulse-ui/StethoscopeConsultAnimation';
import { RapidAmbulanceDispatchAnimation } from './pulse-ui/RapidAmbulanceDispatchAnimation';

// Safely imported Lottie from lottie-react

export type LottieAnimationType =
  | 'clinical-ecg'
  | 'vitals-heartbeat'
  | 'dispatch-radar'
  | 'radar-beacon'
  | 'verified-shield'
  | 'success-check'
  | 'active-caregiver'
  | 'caregiver-pill'
  | 'healthcare-cross'
  | 'ambulance-dispatch'
  | 'nursing-care'
  | 'medical-team'
  | 'nurse-clipboard'
  | 'doctor-online'
  | 'heartbeat-heart'
  | 'verified-badge'
  | 'success-badge';

type LottieLoader = () => Promise<{ default: object }>;

const radarLoader: LottieLoader = () => import('../../assets/lottie/radar-pin.json');
const verifiedLoader: LottieLoader = () => import('../../assets/lottie/verified-badge.json');
const successLoader: LottieLoader = () => import('../../assets/lottie/success-badge.json');

const LOTTIE_LOADERS: Record<string, LottieLoader> = {
  'dispatch-radar': radarLoader,
  'radar-beacon': radarLoader,
  'verified-shield': verifiedLoader,
  'verified-badge': verifiedLoader,
  'success-check': successLoader,
  'success-badge': successLoader,
  'heartbeat-heart': () => import('../../assets/lottie/heartbeat-heart.json'),
  'doctor-online': () => import('../../assets/lottie/doctor-online.json'),
  'medical-team': () => import('../../assets/lottie/medical-team.json'),
  'nurse-clipboard': () => import('../../assets/lottie/nurse-clipboard.json')
};

export interface LottieAnimationProps {
  type?: LottieAnimationType;
  mode?: 'lottie' | 'vector' | 'auto';
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
  style?: React.CSSProperties;
}

export const LottieAnimation: React.FC<LottieAnimationProps> = ({
  type = 'dispatch-radar',
  mode = 'auto',
  className = 'w-16 h-16',
  loop = true,
  autoplay = true,
  style
}) => {
  const loader = LOTTIE_LOADERS[type] as LottieLoader | undefined;
  const [lottieData, setLottieData] = useState<object | null>(null);

  const holderRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  // Only start loading the animation once it is close to the viewport
  useEffect(() => {
    const el = holderRef.current;
    if (!el || visible) return;
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: '300px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [visible]);

  useEffect(() => {
    if (!loader || mode === 'vector' || !visible) return;
    let cancelled = false;
    loader().then((m) => {
      if (!cancelled) setLottieData(m.default);
    });
    return () => {
      cancelled = true;
    };
  }, [loader, mode, visible]);

  // If Lottie JSON exists and mode is not forced to pure vector, render the Bodymovin Lottie animation
  if (loader && mode !== 'vector') {
    return (
      <div
        ref={holderRef}
        className={`relative inline-flex items-center justify-center select-none overflow-hidden ${className}`}
        style={style}
      >
        {lottieData && (
          <Suspense fallback={null}>
            <LottiePlayer src={lottieData} loop={loop} autoplay={autoplay} />
          </Suspense>
        )}
      </div>
    );
  }

  // Pure High-Definition Vector Fallbacks (Smooth, No external runtimes, Apple Health aesthetic)
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none overflow-hidden ${className}`}
      style={style}
    >
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        {(type === 'dispatch-radar' || type === 'radar-beacon') && (
          <DispatchRadarBeacon size="100%" showNodes={true} />
        )}

        {(type === 'clinical-ecg' || type === 'vitals-heartbeat') && (
          <ClinicalECGHeartbeat height="100%" showGrid={false} showTelemetry={false} />
        )}

        {(type === 'verified-shield' || type === 'success-check') && (
          <VerifiedAccreditationShield variant="icon-only" size={64} />
        )}

        {type === 'healthcare-cross' && (
          <StethoscopeConsultAnimation size="100%" />
        )}

        {type === 'ambulance-dispatch' && (
          <RapidAmbulanceDispatchAnimation size="100%" />
        )}

        {(type === 'active-caregiver' || type === 'caregiver-pill') && (
          <div className="relative w-full h-full flex items-center justify-center">
            <span className="relative flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500" />
            </span>
          </div>
        )}

        {type === 'nursing-care' && (
          <div className="relative w-full h-full flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
              <circle cx="50" cy="50" r="38" fill="#FEE2E2" opacity="0.6" />
              <path
                d="M 50 72 C 30 58, 20 46, 20 34 C 20 24, 28 18, 38 18 C 44 18, 48 22, 50 26 C 52 22, 56 18, 62 18 C 72 18, 80 24, 80 34 C 80 46, 70 58, 50 72 Z"
                fill="#C31725"
              />
              <circle cx="50" cy="42" r="8" fill="#FFFFFF" opacity="0.9" />
              <path d="M 50 38 V 46 M 46 42 H 54" stroke="#C31725" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};
