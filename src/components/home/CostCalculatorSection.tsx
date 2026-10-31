import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Zap,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Check,
  Phone,
  RotateCcw,
  Award
} from 'lucide-react';
import { WhatsAppIcon } from '../common/WhatsAppButton';
import { openWhatsApp } from '../../utils/whatsapp';

export type ShiftScheduleType = '12h_shift' | '24h_livein' | 'post_op_cardiac' | 'short_visit' | 'physiotherapy';
export type DependencyLevelType = 'ambulatory' | 'semi_dependent' | 'bedridden';

interface ShiftRateInfo {
  name: string;
  hours: string;
  hourlyStarting?: number;
  baseRate: number;
  unit: string;
  rateDisplay: string;
  desc: string;
  paymentNotice: string;
}

const SHIFT_RATES: Record<ShiftScheduleType, ShiftRateInfo> = {
  '12h_shift': {
    name: '12-Hour Shift Nursing',
    hours: '12 Hours (Day or Night)',
    hourlyStarting: 60,
    baseRate: 720,
    unit: 'per 12h shift',
    rateDisplay: 'Starting @ ₹60 / hr (₹720 / shift)',
    desc: 'Professional bedside nursing care, vitals monitoring, medication administration, and post-operative recovery support.',
    paymentNotice: 'Advance Payment'
  },
  '24h_livein': {
    name: '24/7 Live-in Nursing Care',
    hours: '24 Hours Continuous',
    hourlyStarting: 49,
    baseRate: 1176,
    unit: 'per 24h day',
    rateDisplay: 'Starting @ ₹49 / hr (₹1,176 / day)',
    desc: 'Round-the-clock bedside nursing care, continuous vitals tracking, lateral turning every 2 hours, and compassionate dignity.',
    paymentNotice: 'Advance Payment'
  },
  'post_op_cardiac': {
    name: 'Post-Operative & Cardiac Care',
    hours: '24 Hours Live-In Care',
    hourlyStarting: 56,
    baseRate: 1344,
    unit: 'per 24h day',
    rateDisplay: 'Starting @ ₹56 / hr (₹1,344 / day)',
    desc: 'Specialized 24h live-in clinical nursing for surgical wound dressing, cardiac vitals charting, drain care, and early mobilization.',
    paymentNotice: 'Advance Payment'
  },
  'short_visit': {
    name: 'Short-Visit Clinical Procedures',
    hours: '45 to 60 Mins Visit',
    baseRate: 500,
    unit: 'per visit',
    rateDisplay: '₹500 / visit',
    desc: 'Single procedural home visits: sterile surgical dressings, IV/IM injections, catheter hygiene, or vitals assessment.',
    paymentNotice: 'Advance Payment'
  },
  'physiotherapy': {
    name: 'Physiotherapy at Home',
    hours: '1 Hour (60 Mins)',
    baseRate: 700,
    unit: 'per session',
    rateDisplay: '₹700 / session (1 hr)',
    desc: 'Evidence-based home physical therapy session for post-op joint rehab, stroke neuromuscular recovery, and gait training.',
    paymentNotice: 'Advance Payment'
  }
};

export const CostCalculatorSection: React.FC = () => {
  const [selectedShift, setSelectedShift] = useState<ShiftScheduleType>('12h_shift');
  const [dependencyLevel, setDependencyLevel] = useState<DependencyLevelType>('semi_dependent');
  const [durationDays, setDurationDays] = useState<number>(7);

  const currentRateObj = SHIFT_RATES[selectedShift];
  const grossTotal = currentRateObj.baseRate * durationDays;

  // Duration benefit rules for extended care plans
  const discountMultiplier = durationDays >= 30 ? 0.90 : durationDays >= 15 ? 0.93 : durationDays >= 7 ? 0.95 : 1;
  const netTotal = Math.round(grossTotal * discountMultiplier);
  const discountAmount = grossTotal - netTotal;
  const discountLabel =
    durationDays >= 30
      ? '10% Monthly Benefit'
      : durationDays >= 15
      ? '7% Fortnight Benefit'
      : durationDays >= 7
      ? '5% Weekly Benefit'
      : null;

  const dependencyLabels: Record<DependencyLevelType, string> = {
    ambulatory: 'Ambulatory / Independent Mobility',
    semi_dependent: 'Assisted Walking / Semi-Dependent',
    bedridden: 'Fully Bedridden / Total Bedside Support'
  };

  const handleWhatsAppBooking = () => {
    const message = `Hello Pulse n Care, I configured a care estimate:
• Service Plan: ${currentRateObj.name} (${currentRateObj.hours})
• Starting Rate: ${currentRateObj.rateDisplay}
• Billing Term: Advance Payment
• Patient Condition: ${dependencyLabels[dependencyLevel]}
• Duration: ${durationDays} Day(s)
• Estimated Amount: ₹${netTotal.toLocaleString('en-IN')}
Please verify available staff matching this schedule across Delhi NCR.`;
    openWhatsApp(message);
  };

  return (
    <section id="cost-calculator" className="py-12 sm:py-16 bg-white border-b border-slate-200/90 text-left relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 max-w-4xl">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/80 text-[#015498] text-[11px] font-extrabold uppercase tracking-wider border border-blue-200">
              <Zap className="w-3.5 h-3.5 text-[#015498]" />
              <span>TRANSPARENT STARTING RATES · ADVANCE PAYMENT BASIS</span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-900 tracking-[-0.02em] leading-tight">
              Honest Pricing &amp; Shift Cost Estimator
            </h2>

            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
              Every service is priced transparently on an <strong>Advance Payment</strong> basis prior to staff deployment. Backed by our 100% advance cancellation refund guarantee and free 24-hour staff replacement guarantee.
            </p>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-50 border border-blue-200 text-xs font-bold text-[#015498] self-start md:self-end">
            <ShieldCheck className="w-4 h-4 text-[#015498] shrink-0" />
            <span>Council-Registered Nurses · 98% On-Time Deployment</span>
          </div>
        </div>

        {/* 2-Column Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ======================================================================= */}
          {/* LEFT COLUMN: Configuration Controls (Col 7)                             */}
          {/* ======================================================================= */}
          <div className="lg:col-span-7 bg-slate-50/90 rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-sm space-y-7">
            
            {/* Step 1: Shift Schedule Selection */}
            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center justify-between">
                <span>1. Select Nursing / Healthcare Service:</span>
                <span className="text-[11px] text-[#015498] font-bold">5 Verified Starting Rates</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {(Object.keys(SHIFT_RATES) as ShiftScheduleType[]).map((key) => {
                  const item = SHIFT_RATES[key];
                  const isSelected = selectedShift === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedShift(key)}
                      className={`p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'bg-white border-[#015498] ring-2 ring-[#015498]/20 shadow-md'
                          : 'bg-white/80 hover:bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs font-black ${isSelected ? 'text-[#015498]' : 'text-slate-900'}`}>
                          {item.name}
                        </span>
                        <span className="text-[10px] font-black uppercase text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                          Advance
                        </span>
                      </div>
                      
                      <div className="text-xs font-extrabold text-[#015498] font-mono mb-1">
                        {item.rateDisplay}
                      </div>

                      <span className="text-[11px] text-slate-500 font-bold block mb-1">
                        ⏱ {item.hours}
                      </span>
                      <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                        {item.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Patient Dependency Level */}
            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-wider text-slate-700 block">
                2. Patient Care &amp; Mobility Level:
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {(['ambulatory', 'semi_dependent', 'bedridden'] as DependencyLevelType[]).map((dep) => {
                  const isSelected = dependencyLevel === dep;
                  return (
                    <button
                      key={dep}
                      type="button"
                      onClick={() => setDependencyLevel(dep)}
                      className={`p-3 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-blue-50 border-[#015498] text-[#015498] ring-1 ring-[#015498]'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-extrabold capitalize">{dep.replace('_', ' ')}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#015498]" />}
                      </div>
                      <p className="text-[11px] text-slate-500 font-normal leading-snug">
                        {dependencyLabels[dep]}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Duration Selection */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black uppercase tracking-wider text-slate-700">
                  3. Care Duration ({durationDays} {durationDays === 1 ? 'Day' : 'Days'}):
                </label>
                {discountLabel && (
                  <span className="text-[11px] font-black uppercase tracking-wide bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-300">
                    {discountLabel} Applied
                  </span>
                )}
              </div>

              {/* Quick Select Preset Buttons */}
              <div className="grid grid-cols-4 gap-2">
                {[1, 7, 15, 30].map((days) => (
                  <button
                    key={days}
                    type="button"
                    onClick={() => setDurationDays(days)}
                    className={`py-2 px-3 rounded-xl text-xs font-extrabold border transition-all cursor-pointer ${
                      durationDays === days
                        ? 'bg-[#015498] text-white border-[#015498]'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {days} {days === 1 ? 'Day' : 'Days'}
                  </button>
                ))}
              </div>

              {/* Range Slider for granular control */}
              <div className="pt-2">
                <input
                  type="range"
                  aria-label="Number of care days"
                  min="1"
                  max="60"
                  value={durationDays}
                  onChange={(e) => setDurationDays(Number(e.target.value))}
                  className="w-full accent-[#015498] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] font-bold text-slate-500 mt-1">
                  <span>1 Day</span>
                  <span>7 Days (Weekly)</span>
                  <span>15 Days</span>
                  <span>30 Days (Monthly)</span>
                </div>
              </div>
            </div>

          </div>

          {/* ======================================================================= */}
          {/* RIGHT COLUMN: Sticky Estimate Summary Card (Col 5)                      */}
          {/* ======================================================================= */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-5 sm:p-6 border-2 border-slate-200/90 shadow-[0_12px_36px_rgba(5,15,51,0.08)] space-y-6 lg:sticky lg:top-24">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <span className="text-xs font-black uppercase tracking-wider text-slate-500">
                Itemized Care Estimate
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider text-amber-900 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                <Award className="w-3 h-3 text-amber-600" />
                Advance Payment Basis
              </span>
            </div>

            {/* Selected Plan Details */}
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-black text-slate-900 leading-snug">
                    {currentRateObj.name}
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">
                    {currentRateObj.hours}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-slate-500 block">Starting Rate</span>
                  <span className="text-sm font-black text-[#015498] font-mono">
                    ₹{currentRateObj.baseRate.toLocaleString('en-IN')}/{currentRateObj.unit.replace('per ', '')}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs py-2 px-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-slate-600 font-semibold">Patient Mobility:</span>
                <span className="font-bold text-slate-900 capitalize">
                  {dependencyLevel.replace('_', ' ')}
                </span>
              </div>
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-2.5 pt-4 border-t border-slate-100 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Base Total ({durationDays} days × ₹{currentRateObj.baseRate}):</span>
                <span className="font-mono font-bold text-slate-800">₹{grossTotal.toLocaleString('en-IN')}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Duration Benefit ({discountLabel}):</span>
                  <span className="font-mono">- ₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-500 text-[11px]">
                <span>Payment Mode:</span>
                <span className="font-bold text-amber-800">100% Advance Prior to Deployment</span>
              </div>

              <div className="flex justify-between text-slate-500 text-[11px]">
                <span>Cancellation Protection:</span>
                <span className="font-bold text-emerald-600">100% Refund (≥24h notice)</span>
              </div>
            </div>

            {/* Total Estimated Price Display with Animated Counter Transition */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50/80 to-slate-50 border border-blue-200/80 space-y-1">
              <span className="text-[11px] uppercase font-black tracking-wider text-slate-500 block">
                Total Advance Payment Estimate
              </span>
              <div className="flex items-baseline gap-2">
                <motion.span
                  key={netTotal}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-3xl font-black text-[#015498] tracking-tight font-mono"
                >
                  ₹{netTotal.toLocaleString('en-IN')}
                </motion.span>
                <span className="text-xs text-slate-500 font-medium">for {durationDays} day(s)</span>
              </div>
              <p className="text-[11px] text-slate-500 pt-1 leading-snug">
                *Subject to initial clinical case assessment by our Central Care Desk. Includes free 24-hour staff replacement guarantee.
              </p>
            </div>

            {/* Tactile Booking Action */}
            <div className="space-y-2.5 pt-1">
              <button
                type="button"
                onClick={handleWhatsAppBooking}
                className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl btn-emerald-aura btn-shimmer text-white font-black text-sm sm:text-base cursor-pointer"
              >
                <WhatsAppIcon className="w-5 h-5 fill-white" />
                <span>Book This Estimate on WhatsApp</span>
              </button>

              <a
                href="tel:+919211765429"
                className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-2xl btn-glass-frost font-bold text-xs text-slate-800 cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-[#015498]" />
                <span>Call Central Operations: +91 921 176 5429</span>
              </a>
            </div>

            {/* Trust Inclusions */}
            <div className="space-y-1.5 pt-2 text-[11px] text-slate-500 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>98% On-Time Staff Deployment Record</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                <span>Free 24h Staff Replacement Guarantee</span>
              </div>
            </div>

          </div>

        </div>

        {/* ========================================================================= */}
        {/* CONSUMER SHIELD BANNER: 3-Pillar Refund & Replacement Policy              */}
        {/* ========================================================================= */}
        <div className="bg-gradient-to-r from-slate-900 via-[#050F33] to-[#0A192F] text-white rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <span className="text-[11px] font-black uppercase tracking-widest text-emerald-400 block mb-1">
                CONSUMER PROTECTION &amp; PEACE OF MIND
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Transparent Refund, Cancellation &amp; Replacement Policy
              </h3>
            </div>
            <span className="text-xs font-bold text-slate-300 bg-white/10 px-3 py-1.5 rounded-full border border-white/10 shrink-0 self-start sm:self-auto">
              Clear &amp; Enforceable Terms
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Pillar 1: Advance Cancellation */}
            <div className="bg-white/5 rounded-2xl p-4.5 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                <RotateCcw className="w-4 h-4 text-emerald-400" />
                <span className="uppercase tracking-wider">Advance Cancellation</span>
              </div>
              <h4 className="text-sm font-black text-white">100% Full Refund</h4>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                Full refund if service is canceled at least <strong>24 hours prior</strong> to staff deployment. Zero cancellation deductions.
              </p>
            </div>

            {/* Pillar 2: Mid-Service Discontinuation */}
            <div className="bg-white/5 rounded-2xl p-4.5 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-sky-400 font-bold text-xs">
                <ShieldCheck className="w-4 h-4 text-sky-400" />
                <span className="uppercase tracking-wider">Mid-Service Exit</span>
              </div>
              <h4 className="text-sm font-black text-white">Pro-Rata Refund</h4>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                Pro-rata refund calculated fairly for all unutilized days, minus a transparent <strong>2-day administrative transition fee</strong>.
              </p>
            </div>

            {/* Pillar 3: Replacement Guarantee */}
            <div className="bg-white/5 rounded-2xl p-4.5 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                <Clock className="w-4 h-4 text-amber-400" />
                <span className="uppercase tracking-wider">Satisfaction Shield</span>
              </div>
              <h4 className="text-sm font-black text-white">Free 24h Replacement</h4>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                Free replacement staff dispatched within <strong>24 hours</strong> if a client is unsatisfied with the assigned nurse or attendant.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
