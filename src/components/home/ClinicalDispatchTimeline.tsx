import React from 'react';
import { motion } from 'framer-motion';
import {
  MessageSquareHeart,
  Phone,
  UserCheck,
  ShieldCheck,
  Clock,
  Sparkles
} from 'lucide-react';
import { WhatsAppIcon } from '../common/WhatsAppButton';
import { openWhatsApp } from '../../utils/whatsapp';
import { LottieAnimation } from '../common/LottieAnimation';

export const ClinicalDispatchTimeline: React.FC = () => {
  return (
    <section id="how-it-works" className="relative py-12 sm:py-16 bg-gradient-to-b from-slate-50/80 via-white to-slate-50/80 border-b border-slate-200/90 overflow-hidden bg-medical-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-16 gap-4">
          <div className="max-w-2xl text-left space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-[#015498] text-[11px] font-extrabold uppercase tracking-wider border border-blue-200">
              <Sparkles className="w-3.5 h-3.5 text-[#015498]" />
              <span>CLINICAL DISPATCH TIMELINE</span>
            </div>
            
            <h2 className="font-display text-2xl sm:text-3xl lg:text-3xl font-semibold text-slate-900 tracking-[-0.02em] leading-tight">
              How Doorstep Healthcare is Arranged
            </h2>
            
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-xl font-medium">
              A transparent, doctor-supervised care coordination pathway designed to place verified medical professionals at your home with zero broker interference.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-white px-4 py-2.5 rounded-xl border border-slate-200/90 shadow-sm self-start md:self-end">
            <Clock className="w-4 h-4 text-[#015498]" />
            <span>Central Operations Desk: Active Coordination</span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* DESKTOP TIMELINE (3 RICH INTERACTIVE STEP CARDS WITH TANGIBLE ARTIFACTS)  */}
        {/* ========================================================================= */}
        <div className="hidden lg:grid grid-cols-3 gap-6 relative items-stretch">
          
          {/* Animated Connecting SVG Line */}
          <div className="absolute top-12 left-[16%] right-[16%] h-6 z-0 pointer-events-none">
            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 24">
              <motion.path
                d="M 0 12 L 1000 12"
                fill="none"
                stroke="#015498"
                strokeWidth="2.5"
                strokeDasharray="6 6"
                initial={{ pathLength: 0, opacity: 0.3 }}
                whileInView={{ pathLength: 1, opacity: 0.8 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
              />
            </svg>
          </div>

          {/* STEP 01: INTAKE WITH PRESCRIPTION TRIAGE ARTIFACT */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4 }}
            className="bg-white/95 backdrop-blur-xl rounded-2xl p-5 border border-slate-200/90 shadow-[0_8px_30px_rgba(5,15,51,0.05)] hover:shadow-[0_16px_40px_rgba(1,84,152,0.12)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group relative z-10"
          >
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-white border-2 border-[#015498] shadow-sm flex items-center justify-center font-black text-lg text-[#015498] group-hover:scale-105 transition-transform">
                  01
                </div>

                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#015498] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                  CLINICAL INTAKE
                </span>
              </div>

              <div>
                <h3 className="text-lg font-black text-slate-900 mb-1.5 leading-snug tracking-tight">
                  Share Patient Requirements
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Submit the patient’s clinical diagnosis, doctor’s prescription, and required shift duration (12h Day, 12h Night, or 24h Live-in) directly to our Central Care Desk on WhatsApp.
                </p>
              </div>

              <div className="flex justify-center rounded-xl bg-gradient-to-b from-slate-50 to-white border border-slate-200/70 py-2">
                <LottieAnimation type="doctor-online" className="w-28 h-28" />
              </div>
            </div>

            <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold text-slate-600">Via WhatsApp or Hotline</span>
              <MessageSquareHeart className="w-4 h-4 text-[#25D366]" />
            </div>
          </motion.div>

          {/* STEP 02: NURSE VERIFICATION CARD ARTIFACT */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="bg-white/95 backdrop-blur-xl rounded-2xl p-5 border-2 border-[#015498]/50 shadow-[0_10px_35px_rgba(1,84,152,0.10)] hover:shadow-[0_20px_45px_rgba(1,84,152,0.16)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group relative z-10 ring-4 ring-[#015498]/10"
          >
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#015498] text-white shadow-sm flex items-center justify-center font-black text-lg group-hover:scale-105 transition-transform">
                  02
                </div>

                <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  STAFF AUDIT &amp; MATCH
                </span>
              </div>

              <div>
                <h3 className="text-lg font-black text-slate-900 mb-1.5 leading-snug tracking-tight">
                  Council Verification &amp; Assignment
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Our Duty Operations Officer audits case complexity and matches an internal council-registered nurse (GNM / B.Sc) or police-verified caregiver tailored to your patient.
                </p>
              </div>

              <div className="flex justify-center rounded-xl bg-gradient-to-b from-slate-50 to-white border border-slate-200/70 py-2">
                <LottieAnimation type="verified-badge" className="w-28 h-28" />
              </div>
            </div>

            <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold text-slate-600">Standby Reserve on Call</span>
              <UserCheck className="w-4 h-4 text-[#015498]" />
            </div>
          </motion.div>

          {/* STEP 03: BEDSIDE CARE & DIGITAL HANDOVER ARTIFACT */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-white/95 backdrop-blur-xl rounded-2xl p-5 border border-slate-200/90 shadow-[0_8px_30px_rgba(5,15,51,0.05)] hover:shadow-[0_16px_40px_rgba(1,84,152,0.12)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group relative z-10"
          >
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-white border-2 border-[#C31725] shadow-sm flex items-center justify-center font-black text-lg text-[#C31725] group-hover:scale-105 transition-transform">
                  03
                </div>

                <span className="text-[11px] font-extrabold uppercase tracking-wider text-rose-800 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                  BEDSIDE EXECUTION
                </span>
              </div>

              <div>
                <h3 className="text-lg font-black text-slate-900 mb-1.5 leading-snug tracking-tight">
                  Doorstep Care with Handover
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Your assigned healthcare professional reports in uniform with credentials, conducts baseline vitals, reviews treatment routines, and initiates structured daily shift documentation.
                </p>
              </div>

              <div className="flex justify-center rounded-xl bg-gradient-to-b from-slate-50 to-white border border-slate-200/70 py-2">
                <LottieAnimation type="heartbeat-heart" className="w-28 h-28" />
              </div>
            </div>

            <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold text-slate-600">Daily Digital Report</span>
              <ShieldCheck className="w-4 h-4 text-[#C31725]" />
            </div>
          </motion.div>

        </div>

        {/* ========================================================================= */}
        {/* MOBILE TIMELINE (VERTICAL CONNECTED COLUMN WITH ENRICHED CARDS)           */}
        {/* ========================================================================= */}
        <div className="lg:hidden relative pl-6 space-y-6 text-left">
          <div className="absolute top-4 bottom-4 left-3 w-0.5 bg-blue-300" />

          {/* Mobile Card 1 */}
          <div className="relative bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm space-y-3">
            <div className="absolute -left-[30px] top-4 w-7 h-7 rounded-full bg-[#015498] text-white font-black text-xs flex items-center justify-center border-2 border-white shadow-sm">
              01
            </div>
            <span className="text-[11px] font-extrabold text-[#015498] uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              CLINICAL INTAKE
            </span>
            <h3 className="text-base font-black text-slate-900">Share Care Requirements</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Submit patient diagnosis and shift requirements via WhatsApp to our Central Care Desk.
            </p>
          </div>

          {/* Mobile Card 2 */}
          <div className="relative bg-white rounded-2xl p-5 border-2 border-[#015498]/40 shadow-sm space-y-3">
            <div className="absolute -left-[30px] top-4 w-7 h-7 rounded-full bg-[#015498] text-white font-black text-xs flex items-center justify-center border-2 border-white shadow-sm">
              02
            </div>
            <span className="text-[11px] font-extrabold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              STAFF AUDIT &amp; MATCH
            </span>
            <h3 className="text-base font-black text-slate-900">Council Verification &amp; Assignment</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Matched with internal council-registered (DNC/INC) nurse or police-verified attendant.
            </p>
          </div>

          {/* Mobile Card 3 */}
          <div className="relative bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm space-y-3">
            <div className="absolute -left-[30px] top-4 w-7 h-7 rounded-full bg-[#C31725] text-white font-black text-xs flex items-center justify-center border-2 border-white shadow-sm">
              03
            </div>
            <span className="text-[11px] font-extrabold text-rose-800 uppercase tracking-wider bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
              BEDSIDE EXECUTION
            </span>
            <h3 className="text-base font-black text-slate-900">Doorstep Care with Handover</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Staff arrives in uniform with credentials, logs vitals, and sends daily reports.
            </p>
          </div>
        </div>

        {/* WhatsApp & Phone Consultation Actions */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => openWhatsApp('Hello Pulse n Care, I want to initiate care coordination for my family member.')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl btn-emerald-aura btn-shimmer text-white font-black text-xs sm:text-sm cursor-pointer"
          >
            <WhatsAppIcon className="w-5 h-5 fill-white" />
            <span>Start Care Coordination on WhatsApp</span>
          </button>

          <a
            href="tel:+919211765429"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl btn-glass-frost font-bold text-xs sm:text-sm text-slate-800 cursor-pointer"
          >
            <Phone className="w-4 h-4 text-[#015498]" />
            <span>Call Hotline: +91 92117 65429</span>
          </a>
        </div>

      </div>
    </section>
  );
};
