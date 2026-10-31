import React from 'react';
import { Button } from '../../common/Button';
import { HealthcareTexture } from '../../common/HealthcareTexture';
import { LottieAnimation } from '../../common/LottieAnimation';
import { WhatsAppIcon } from '../../common/WhatsAppButton';
import { openWhatsApp } from '../../../utils/whatsapp';
import { PhoneCall, Activity, Clock, CheckCircle2, MapPin } from 'lucide-react';

interface HeroVisualProps {
  onOpenCallback: () => void;
}

export const PulseNCareHeroVisual: React.FC<HeroVisualProps> = ({ onOpenCallback }) => {
  return (
    <section className="relative overflow-hidden bg-white pt-8 pb-12 border-b border-border-default">
      {/* 2-4% Pulse Wave Clinical Grid Texture */}
      <HealthcareTexture type="clinical-wave" opacity={0.03} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* LEFT 7 COLS: Typography & CTAs (Large Negative Space) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200">
              <span className="w-2 h-2 rounded-full bg-[#015498] animate-ping" />
              <span className="text-xs font-extrabold text-[#015498] uppercase tracking-widest">
                Pulse n Care • 24×7 Home Nursing
              </span>
              <span className="text-xs text-blue-300 hidden sm:inline">•</span>
              <span className="text-xs font-bold text-slate-700 hidden sm:flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#015498]" /> Delhi NCR Hub (Delhi, Noida, Gurugram, Faridabad)
              </span>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-[1.1]">
                Nurse care at doorstep
              </h1>
              <p className="text-base sm:text-lg text-slate-600 font-medium max-w-2xl leading-relaxed">
                24×7 professional nursing support for patients who need dependable, prescribed clinical care and observation at home.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => openWhatsApp('Hello Pulse n Care, I want to book 24x7 Home Nursing care for my patient at home in Delhi NCR.')}
                className="flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold px-8 py-3.5 rounded-2xl cursor-pointer text-sm shadow-[0_8px_25px_rgba(37,211,102,0.4)] transition-all hover:scale-105 active:scale-95"
              >
                <WhatsAppIcon className="w-4 h-4 fill-white" />
                <span>Book Home Nursing on WhatsApp</span>
              </button>

              <Button
                variant="outline"
                onClick={onOpenCallback}
                leftIcon={<PhoneCall className="w-4 h-4 text-[#015498]" />}
                className="font-bold border-border-default text-text-primary hover:border-[#015498] px-6 py-3.5 rounded-2xl cursor-pointer text-sm bg-white"
              >
                Talk to Our Care Team
              </Button>
            </div>

            {/* Supporting Trust Strip */}
            <div className="pt-4 border-t border-border-light flex flex-wrap items-center gap-4 text-xs font-bold text-slate-700">
              <span className="flex items-center gap-1.5 text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Day Care
              </span>
              <span className="flex items-center gap-1.5 text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Night Care
              </span>
              <span className="flex items-center gap-1.5 text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 12-Hour Shifts
              </span>
              <span className="flex items-center gap-1.5 text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 24-Hour Rotational Care
              </span>
            </div>
          </div>

          {/* RIGHT 5 COLS: Hero Photography with Uniform Brand Mark & Side UI Accents */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-border-default shadow-lg bg-canvas-secondary">
              <img loading="lazy" decoding="async"
                src="/assets/services/home-nursing/pulse-n-care-home-nursing-hero.webp"
                alt="Pulse n Care South Asian Female Home Nurse"
                className="w-full h-[400px] object-cover object-right"
              />

              {/* Master Logo Badge Overlaid on Hero Image */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-md border border-blue-200 flex items-center gap-2">
                <img loading="lazy" decoding="async" src="/assets/brand/pulse-n-care/pulse-n-care-mark.webp" alt="" className="w-6 h-6" />
                <div className="text-left">
                  <span className="font-extrabold text-slate-900 text-xs block leading-tight">Pulse n Care</span>
                  <span className="text-[9px] font-bold text-[#015498] block">OFFICIAL CARE TEAM</span>
                </div>
              </div>

              {/* Floating Side Accent 1: Care Coverage */}
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-subtle border border-border-default text-left max-w-[200px] space-y-1">
                <span className="text-[10px] font-extrabold text-[#015498] uppercase tracking-wider block flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#015498]" /> Care Coverage
                </span>
                <p className="text-xs font-bold text-text-primary">24×7 Rotational Support</p>
                <span className="text-[10px] text-text-muted block">12h / 24h Rotational Shifts</span>
              </div>

              {/* Floating Side Accent 2: Clinical Monitoring with Lottie ECG Waveform */}
              <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-subtle border border-border-default text-left max-w-[200px] space-y-1">
                <span className="text-[10px] font-extrabold text-[#015498] uppercase tracking-wider flex items-center justify-between">
                  <span className="flex items-center gap-1"><Activity className="w-3 h-3 text-[#015498]" /> Clinical Vitals</span>
                </span>
                <LottieAnimation type="vitals-heartbeat" className="w-full h-7" />
                <div className="flex flex-wrap gap-1 text-[10px] font-bold text-slate-700">
                  <span className="bg-slate-100 px-1.5 py-0.5 rounded">BP</span>
                  <span className="bg-slate-100 px-1.5 py-0.5 rounded">SpO₂</span>
                  <span className="bg-slate-100 px-1.5 py-0.5 rounded">Pulse</span>
                  <span className="bg-slate-100 px-1.5 py-0.5 rounded">Temp</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
