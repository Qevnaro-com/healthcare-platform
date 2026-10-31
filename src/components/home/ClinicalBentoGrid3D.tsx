import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  HeartPulse,
  Activity,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Thermometer,
  Layers,
  Info,
  Clock,
  FileCheck
} from 'lucide-react';
import { openWhatsApp } from '../../utils/whatsapp';

export const ClinicalBentoGrid3D: React.FC = () => {
  const [activeVitalTab, setActiveVitalTab] = useState<'ecg' | 'spo2' | 'bp'>('ecg');

  return (
    <section className="py-12 sm:py-16 relative bg-[#F8FAFC] border-b border-slate-200/90 overflow-hidden text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-7 sm:space-y-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 max-w-4xl">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/80 text-[#015498] text-[11px] font-extrabold uppercase tracking-wider border border-blue-200">
              <Sparkles className="w-3.5 h-3.5 text-[#015498]" />
              <span>CLINICAL CAPABILITIES &amp; PROTOCOLS</span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl lg:text-3xl font-semibold text-slate-900 tracking-[-0.02em] leading-tight">
              Hospital Protocols Administered in Your Home
            </h2>

            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium max-w-2xl">
              We bring clinical discipline from hospital wards to bedside recovery: standardized vitals ledgers, council-verified credentials, sterile consumables, and emergency supervision.
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* EDITORIAL ASYMMETRIC BENTO GRID COMPOSITION                               */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* ======================================================================= */}
          {/* TILE 01 (Col 7) — ILLUSTRATIVE CLINICAL VITALS SIMULATION               */}
          {/* ======================================================================= */}
          <div className="lg:col-span-7 bg-[#050F33] text-white rounded-2xl p-5 sm:p-6 border border-slate-800 shadow-[0_16px_40px_rgba(5,15,51,0.2)] flex flex-col justify-between overflow-hidden relative group">
            
            <div className="space-y-6 relative z-10">
              {/* Tile Header & Mandatory Disclaimer */}
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 text-[11px] font-black border border-emerald-500/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  BEDSIDE CHARTING PROTOCOL
                </span>
                
                <span className="inline-flex items-center gap-1 text-[11px] text-slate-400 bg-slate-900/90 px-2.5 py-0.5 rounded-md border border-slate-700">
                  <Info className="w-3 h-3 text-sky-400" />
                  Illustrative Protocol Simulation
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
                  Standardized Daily Vitals &amp; Handover Ledger
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-normal mt-1.5 max-w-lg leading-relaxed">
                  Every duty nurse maintains a structured bedside chart: baseline vitals, fluid intake-output, medication compliance, and escalation alerts reviewed by our Duty Medical Officer.
                </p>
              </div>

              {/* Interactive Vitals Tab Selector */}
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                <button
                  type="button"
                  onClick={() => setActiveVitalTab('ecg')}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                    activeVitalTab === 'ecg'
                      ? 'bg-blue-600/30 border-blue-400/80 shadow-inner'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span className="text-[11px] sm:text-[11px] font-bold uppercase">Heart Rate</span>
                    <HeartPulse className="w-3.5 h-3.5 text-rose-400" />
                  </div>
                  <div className="text-base sm:text-2xl font-black text-white flex items-baseline gap-1">
                    <span>74</span>
                    <span className="text-[11px] text-slate-400 font-bold">BPM</span>
                  </div>
                  <p className="text-[11px] text-emerald-400 font-semibold mt-0.5">Normal Sinus</p>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveVitalTab('spo2')}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                    activeVitalTab === 'spo2'
                      ? 'bg-blue-600/30 border-blue-400/80 shadow-inner'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span className="text-[11px] sm:text-[11px] font-bold uppercase">Blood Oxygen</span>
                    <Activity className="w-3.5 h-3.5 text-sky-400" />
                  </div>
                  <div className="text-base sm:text-2xl font-black text-white flex items-baseline gap-1">
                    <span>99</span>
                    <span className="text-[11px] text-slate-400 font-bold">% SpO2</span>
                  </div>
                  <p className="text-[11px] text-emerald-400 font-semibold mt-0.5">Optimal Range</p>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveVitalTab('bp')}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                    activeVitalTab === 'bp'
                      ? 'bg-blue-600/30 border-blue-400/80 shadow-inner'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span className="text-[11px] sm:text-[11px] font-bold uppercase">Blood Pressure</span>
                    <Thermometer className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div className="text-base sm:text-2xl font-black text-white flex items-baseline gap-1">
                    <span>118/78</span>
                    <span className="text-[11px] text-slate-400 font-bold">mmHg</span>
                  </div>
                  <p className="text-[11px] text-emerald-400 font-semibold mt-0.5">Normotensive</p>
                </button>
              </div>

              {/* Animated Waveform Canvas Container */}
              <div className="bg-slate-950/80 border border-slate-800/90 rounded-2xl p-4 sm:p-5 relative overflow-hidden">
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono mb-2">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    BEDSIDE MONITOR STREAM
                  </span>
                  <span>CALIBRATION: 25 mm/s • 10 mm/mV</span>
                </div>

                <div className="w-full h-16 sm:h-20 flex items-center justify-center relative">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 600 70" preserveAspectRatio="none">
                    <motion.path
                      d="M 0 35 L 80 35 L 90 32 L 95 38 L 100 35 L 140 35 L 148 10 L 156 60 L 164 25 L 172 38 L 178 35 L 240 35 L 250 35 L 260 32 L 265 38 L 270 35 L 310 35 L 318 8 L 326 62 L 334 22 L 342 38 L 348 35 L 420 35 L 430 35 L 440 32 L 445 38 L 450 35 L 490 35 L 498 12 L 506 58 L 514 26 L 522 38 L 528 35 L 600 35"
                      fill="none"
                      stroke={activeVitalTab === 'ecg' ? '#38BDF8' : activeVitalTab === 'spo2' ? '#34D399' : '#F43F5E'}
                      strokeWidth="2.5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
                    />
                  </svg>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 font-bold pt-2 border-t border-slate-800">
                  <span>Duty Nurse: Registered GNM</span>
                  <span className="text-slate-400">Escalation Trigger: Systolic &gt; 150 / SpO2 &lt; 92%</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
              <span className="font-medium">Every reading logged into patient daily records</span>
              <button
                type="button"
                onClick={() => openWhatsApp('Hello Pulse n Care, I want to book home care with daily vitals tracking.')}
                className="text-sky-300 hover:text-white font-bold flex items-center gap-1 transition-colors"
              >
                <span>Inquire About Care</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* ======================================================================= */}
          {/* TILE 02 (Col 5) — 100% COUNCIL ACCREDITATION CHECKLIST                  */}
          {/* ======================================================================= */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-[0_8px_30px_rgba(5,15,51,0.06)] flex flex-col justify-center gap-4">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-blue-50 text-[#015498] text-[11px] font-black uppercase tracking-wider border border-blue-200">
                  CLINICAL RIGOR
                </span>
                <ShieldCheck className="w-5 h-5 text-[#015498]" />
              </div>

              <div>
                <h3 className="text-xl font-black text-slate-900 leading-snug">
                  Council-Registered &amp; Biometrically Verified
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  We verify professional licensure with state nursing councils before admitting any nurse into active duty rotation.
                </p>
              </div>

              {/* Credential Verification Checklist */}
              <div className="space-y-2.5">
                {[
                  { label: 'Delhi Nursing Council (DNC) Registration', status: 'Mandatory Audit' },
                  { label: 'Indian Nursing Council (INC) Affiliation', status: 'GNM / B.Sc' },
                  { label: 'Aadhaar Biometric & Police Verification', status: '100% Cleared' },
                  { label: 'Basic Life Support (BLS) Clinical Training', status: 'Certified' },
                  { label: 'Uniform & Official Digital Badge', status: 'Standardized' }
                ].map((item, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span className="font-bold text-slate-800">{item.label}</span>
                    </div>
                    <span className="text-[11px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold">Zero Unverified Freelancers</span>
              <span className="text-[#015498] font-bold">Audited Weekly</span>
            </div>
          </div>

          {/* ======================================================================= */}
          {/* TILE 03 (Col 4) — STERILE INFECTION-CONTROL CONSUMABLES                  */}
          {/* ======================================================================= */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-[0_4px_24px_rgba(5,15,51,0.04)] flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-[#C31725]">
                <Layers className="w-5 h-5 text-[#C31725]" />
              </div>

              <h3 className="text-base font-black text-slate-900 leading-snug">
                Sterile Infection-Control &amp; Dressing Trays
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed">
                Nurses carry autoclaved dressing instruments, sterile surgical gloves, povidone-iodine, Dynaplast, and micro-pore tapes to ensure zero cross-contamination.
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {['Autoclaved Trays', 'Sterile Gauze', 'Surgical Gloves', 'Betadine Swabs'].map((tag, tIdx) => (
                  <span key={tIdx} className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 text-[11px] font-bold text-slate-400">
              Strict Hospital Aseptic Technique
            </div>
          </div>

          {/* ======================================================================= */}
          {/* TILE 04 (Col 4) — 24×7 CENTRAL OPERATIONS & REPLACEMENT                */}
          {/* ======================================================================= */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-[0_4px_24px_rgba(5,15,51,0.04)] flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#015498]">
                <Clock className="w-5 h-5 text-[#015498]" />
              </div>

              <h3 className="text-base font-black text-slate-900 leading-snug">
                Standby Replacement Roster &amp; Care Desk
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed">
                If an assigned caregiver falls ill, our active regional reserve provides a qualified backup promptly, so bedridden family members are never stranded.
              </p>

              <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-100 text-xs text-[#015498] font-bold">
                ✓ Guaranteed Emergency Backup Continuity
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 text-[11px] font-bold text-slate-400">
              Central Roster Oversight 24×7
            </div>
          </div>

          {/* ======================================================================= */}
          {/* TILE 05 (Col 4) — DOCTOR SYNC & DIGITAL SHIFT HANDOVER                 */}
          {/* ======================================================================= */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-[0_4px_24px_rgba(5,15,51,0.04)] flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                <FileCheck className="w-5 h-5 text-emerald-600" />
              </div>

              <h3 className="text-base font-black text-slate-900 leading-snug">
                Doctor Coordination &amp; Family Tele-Sync
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed">
                Clinical summaries are compiled at the end of each shift and shared with family members and attending doctors via WhatsApp for transparent continuity.
              </p>

              <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100 text-xs text-emerald-800 font-bold">
                ✓ Daily Digital Handover PDF Available
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 text-[11px] font-bold text-slate-400">
              Complete Documentation Trail
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
