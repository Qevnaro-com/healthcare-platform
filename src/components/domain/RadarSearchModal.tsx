import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LottieAnimation } from '../common/LottieAnimation';
import { HealthcareTexture } from '../common/HealthcareTexture';
import { MapPin, Activity, Sparkles, UserCheck } from 'lucide-react';
import { MOCK_PROFESSIONALS } from '../../data/mockData';

interface RadarSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceId: string;
  location: string;
}

export const RadarSearchModal: React.FC<RadarSearchModalProps> = ({
  isOpen,
  onClose,
  serviceId,
  location
}) => {
  const navigate = useNavigate();
  const [scanStep, setScanStep] = useState(0);
  const [visibleAvatars, setVisibleAvatars] = useState<number[]>([]);

  useEffect(() => {
    if (!isOpen) {
      setScanStep(0);
      setVisibleAvatars([]);
      return;
    }

    const timer1 = setTimeout(() => {
      setScanStep(1);
      setVisibleAvatars([0]);
    }, 600);

    const timer2 = setTimeout(() => {
      setScanStep(2);
      setVisibleAvatars([0, 1]);
    }, 1200);

    const timer3 = setTimeout(() => {
      setScanStep(3);
      setVisibleAvatars([0, 1, 2, 3]);
    }, 1800);

    const timer4 = setTimeout(() => {
      onClose();
      const locQuery = location ? `&location=${encodeURIComponent(location)}` : '';
      const srvQuery = serviceId ? `&serviceId=${encodeURIComponent(serviceId)}` : '';
      navigate(`/client/search?${srvQuery}${locQuery}`);
    }, 2400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [isOpen, serviceId, location, navigate, onClose]);

  if (!isOpen) return null;

  const samplePros = MOCK_PROFESSIONALS.slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-2xl animate-fade-in text-left">
      <HealthcareTexture type="medical-grid" opacity={0.12} className="z-0" />

      <div className="bg-slate-900/90 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-teal-500/30 space-y-6 text-center relative overflow-hidden text-white backdrop-blur-xl z-10">
        {/* Top Animated Pulse Glow */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-400 via-emerald-400 to-blue-500 animate-pulse" />

        {/* Header HUD Status */}
        <div className="flex items-center justify-between border-b border-teal-500/20 pb-4 text-xs font-bold text-teal-300">
          <span className="flex items-center gap-1.5 uppercase tracking-widest text-[10px]">
            <Activity className="w-4 h-4 text-teal-400 animate-pulse" /> Live Telemetry Scan
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-200 border border-teal-400/30 text-[10px] font-mono">
            DELHI NCR NET
          </span>
        </div>

        {/* Central High-Tech Radar Ring Scanner with Floating Avatars */}
        <div className="relative w-64 h-64 mx-auto flex items-center justify-center my-2">
          {/* Outer Pulsing Rings */}
          <div className="absolute inset-0 rounded-full border border-teal-400/20 animate-ping opacity-40" />
          <div className="absolute inset-4 rounded-full border-2 border-dashed border-teal-400/30 animate-spin" style={{ animationDuration: '6s' }} />
          <div className="absolute inset-8 rounded-full border border-teal-300/40 bg-teal-500/5 backdrop-blur-sm" />

          {/* Central Lottie Radar Radar */}
          <LottieAnimation type="radar-beacon" className="w-48 h-48 z-10 relative" />

          {/* Floating Pro Avatars Pop Up in Scan */}
          {samplePros.map((pro, idx) => {
            if (!visibleAvatars.includes(idx)) return null;

            const positions = [
              'top-1 left-2',
              'top-2 right-2',
              'bottom-2 left-4',
              'bottom-1 right-2'
            ];

            return (
              <div
                key={pro.id}
                className={`absolute ${positions[idx]} z-20 flex items-center gap-2 p-1.5 bg-slate-900/95 border border-teal-400/60 rounded-2xl shadow-xl animate-in zoom-in duration-300 scale-90 sm:scale-100`}
              >
                <img
                  src={pro.profilePhoto}
                  alt={pro.displayName}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&q=80';
                  }}
                  className="w-8 h-8 rounded-full object-cover border border-teal-300"
                />
                <div className="text-left leading-none pr-1">
                  <span className="text-[10px] font-extrabold text-white block truncate max-w-[90px]">
                    {pro.displayName.split(',')[0]}
                  </span>
                  <span className="text-[9px] font-bold text-teal-300 block">
                    ★ {pro.rating} • ₹{pro.hourlyRate}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Scanning Status Headlines */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 text-teal-300 text-[11px] font-black uppercase tracking-widest border border-teal-400/30">
            <Sparkles className="w-3.5 h-3.5 text-teal-300" /> Pulse n Care Clinical Match Engine
          </div>

          <h3 className="text-xl sm:text-2xl font-heading font-black text-white tracking-tight leading-tight">
            {scanStep === 0 && 'Connecting to Delhi NCR Care Network...'}
            {scanStep === 1 && 'Scanning Available B.Sc Nurses & Attendants...'}
            {scanStep === 2 && 'Auditing Council Verification & Schedules...'}
            {scanStep === 3 && 'Matched Verified Care Professionals!'}
          </h3>

          <div className="p-3.5 bg-slate-800/80 rounded-2xl border border-teal-500/20 text-xs text-slate-300 space-y-1.5 backdrop-blur-md">
            <div className="flex items-center justify-center gap-1.5 font-bold text-teal-200">
              <MapPin className="w-4 h-4 text-teal-400" />
              <span>{location || 'Defence Colony, New Delhi'}</span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">
              {scanStep === 0 && 'Locating registered clinical nurses within 15km radius...'}
              {scanStep === 1 && 'Verifying background checks, council license & shift availability...'}
              {scanStep === 2 && 'Filtering by top client ratings and clinical specialties...'}
              {scanStep === 3 && 'Found top-rated care team members! Opening match profiles...'}
            </p>
          </div>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-3 gap-2 pt-1 text-left">
          <div className="p-2.5 bg-slate-800/60 rounded-xl border border-teal-500/20 text-center">
            <span className="text-[10px] font-bold text-slate-400 block uppercase">Network Size</span>
            <span className="text-sm font-black text-teal-300">240+ Pros</span>
          </div>
          <div className="p-2.5 bg-slate-800/60 rounded-xl border border-teal-500/20 text-center">
            <span className="text-[10px] font-bold text-slate-400 block uppercase">Nearby Match</span>
            <span className="text-sm font-black text-emerald-400">18 Active</span>
          </div>
          <div className="p-2.5 bg-slate-800/60 rounded-xl border border-teal-500/20 text-center">
            <span className="text-[10px] font-bold text-slate-400 block uppercase">Avg Arrival</span>
            <span className="text-sm font-black text-teal-300">30-45 Mins</span>
          </div>
        </div>

        {/* Progress Bar Indicators */}
        <div className="grid grid-cols-4 gap-1.5 pt-1">
          <div className={`h-1.5 rounded-full transition-all duration-300 ${scanStep >= 0 ? 'bg-teal-400 shadow-sm shadow-teal-400' : 'bg-slate-800'}`} />
          <div className={`h-1.5 rounded-full transition-all duration-300 ${scanStep >= 1 ? 'bg-teal-400 shadow-sm shadow-teal-400' : 'bg-slate-800'}`} />
          <div className={`h-1.5 rounded-full transition-all duration-300 ${scanStep >= 2 ? 'bg-teal-400 shadow-sm shadow-teal-400' : 'bg-slate-800'}`} />
          <div className={`h-1.5 rounded-full transition-all duration-300 ${scanStep >= 3 ? 'bg-teal-400 shadow-sm shadow-teal-400' : 'bg-slate-800'}`} />
        </div>

        <div className="flex items-center justify-center gap-2 text-[11px] font-extrabold text-teal-300">
          <UserCheck className="w-4 h-4 text-emerald-400" />
          <span>100% In-House Verified Clinical Workforce</span>
        </div>
      </div>
    </div>
  );
};
