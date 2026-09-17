import React from 'react';
import { Card } from '../../common/Card';
import { Heart, ShieldAlert, Activity, CheckCircle2 } from 'lucide-react';

export const PersonalCareSection: React.FC = () => {
  return (
    <section className="py-12 bg-white border-b border-border-default">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-left">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-extrabold text-brand-teal uppercase tracking-widest block">
            Patient Support & Hygiene
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-text-primary tracking-tight">
            Beyond clinical care: Dignified personal support.
          </h2>
          <p className="text-sm text-text-secondary">
            Home nursing often includes helping patients stay comfortable, supported, and safely cared for through daily routines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Bedridden Care & Positioning */}
          <Card className="p-5 space-y-3 border-border-default bg-canvas-secondary shadow-subtle flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-canvas-teal text-brand-teal flex items-center justify-center font-bold">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-text-primary text-sm">Bedridden Care & Positioning</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Repositioning scheduled at clinically appropriate intervals (including 2-hour repositioning routines where prescribed), pressure injury prevention, and circulation support.
              </p>
            </div>
            <div className="rounded-xl overflow-hidden h-36 border border-border-default mt-2">
              <img src="/assets/services/home-nursing/pulse-n-care-bedside-support.webp" alt="Bedside Support" className="w-full h-full object-cover" />
            </div>
            <div className="p-2.5 bg-white rounded-xl border border-teal-200/80 text-[11px] font-bold text-teal-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0" />
              <span>Pressure Injury & Ulcer Prevention Protocol</span>
            </div>
          </Card>

          {/* Personal Grooming */}
          <Card className="p-5 space-y-3 border-border-default bg-canvas-secondary shadow-subtle flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-canvas-teal text-brand-teal flex items-center justify-center font-bold">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-text-primary text-sm">Personal Grooming & Hygiene</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Sponge / bed bath support, oral hygiene, hair care, diaper changes, and fresh clothing maintenance with full respect for patient dignity.
              </p>
            </div>
            <div className="rounded-xl overflow-hidden h-36 border border-border-default mt-2">
              <img src="/assets/services/home-nursing/pulse-n-care-nurse-portrait.webp" alt="Grooming & Hygiene Support" className="w-full h-full object-cover" />
            </div>
            <div className="p-2.5 bg-white rounded-xl border border-teal-200/80 text-[11px] font-bold text-teal-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0" />
              <span>Dignified Hygiene & Bed Bath Support</span>
            </div>
          </Card>

          {/* Mobility & Exercise Assistance */}
          <Card className="p-5 space-y-3 border-border-default bg-canvas-secondary shadow-subtle flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-canvas-teal text-brand-teal flex items-center justify-center font-bold">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-text-primary text-sm">Mobility & Exercise Assistance</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Walking support, bed-to-wheelchair transfers, and coordination with prescribed physiotherapy care plans to ensure safe movement.
              </p>
            </div>
            <div className="rounded-xl overflow-hidden h-36 border border-border-default mt-2">
              <img src="/assets/services/home-nursing/pulse-n-care-mobility.webp" alt="Mobility Support" className="w-full h-full object-cover" />
            </div>
            <div className="p-2.5 bg-white rounded-xl border border-teal-200/80 text-[11px] font-bold text-teal-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0" />
              <span>Safe Transfer & Ambulatory Support</span>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
