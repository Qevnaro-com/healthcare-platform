import { LottieAnimation } from '../common/LottieAnimation';
import React from 'react';
import { motion } from 'framer-motion';
import { PulseLine } from '../common/PulseUI';
import { revealUp, staggerContainer } from '../../lib/motion';
import { PhoneCall, Mail, ShieldCheck, Clock, Stethoscope, MapPin } from 'lucide-react';
import { WhatsAppIcon } from '../common/WhatsAppButton';
import { openWhatsApp, WHATSAPP_DISPLAY_PHONE } from '../../utils/whatsapp';

interface ClosingCTASectionProps {
  onOpenCallback: () => void;
}

export const ClosingCTASection: React.FC<ClosingCTASectionProps> = ({ onOpenCallback }) => {
  return (
    <section className="py-14 sm:py-20 mesh-navy grain text-white relative overflow-hidden border-b border-white/10">
      
      {/* Top Brand Accent Gradient Bar */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#C31725] via-[#015498] to-[#25D366]" />

      {/* Luminous Spatial Radiance (Desktop only to prevent mobile lag) */}
      <div className="hidden sm:block absolute top-1/2 left-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-[#015498]/25 rounded-full blur-[140px] pointer-events-none" />
      <div className="hidden sm:block absolute top-1/2 right-1/4 -translate-y-1/2 w-[450px] h-[450px] bg-[#C31725]/15 rounded-full blur-[130px] pointer-events-none" />

      <motion.div
        variants={staggerContainer(0.12)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-7"
      >
        
        <motion.div variants={revealUp} className="flex justify-center -mb-4">
          <LottieAnimation type="heartbeat-heart" className="w-28 h-28" />
        </motion.div>

        {/* Live Operational Status Banner */}
        <motion.div variants={revealUp} className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-premium text-white text-xs font-bold tracking-[0.16em] uppercase">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Active Central Operations Desk • Delhi NCR Care Network</span>
        </motion.div>

        {/* Executive Headline & Subhead */}
        <motion.div variants={revealUp} className="space-y-4 max-w-3xl mx-auto">
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-white tracking-[-0.02em] leading-[1.06]">
            Need hospital-grade care <span className="italic text-sky-200">at your doorstep?</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed font-normal">
            Connect directly with our Duty Operations Officer on WhatsApp. We assess your patient’s diagnosis, verify council nurse availability, and arrange doorstep nursing care promptly.
          </p>
        </motion.div>

        {/* 3 Executive Trust Pillars */}
        <motion.div variants={revealUp} className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto text-left">
          <div className="p-5 rounded-2xl glass-premium space-y-1.5">
            <div className="flex items-center gap-2 text-sky-400 font-bold text-xs">
              <Stethoscope className="w-4 h-4 text-sky-400" />
              <span>Council Verified Nurses</span>
            </div>
            <p className="text-xs text-slate-300 font-normal">
              100% active state nursing council (DNC/INC) audited credentials for every procedure.
            </p>
          </div>

          <div className="p-5 rounded-2xl glass-premium space-y-1.5">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Biometric Background KYC</span>
            </div>
            <p className="text-xs text-slate-300 font-normal">
              Zero unvetted freelancers. Strict Aadhaar and police verification for patient attendants.
            </p>
          </div>

          <div className="p-5 rounded-2xl glass-premium space-y-1.5">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-xs">
              <Clock className="w-4 h-4 text-rose-400" />
              <span>Standby Replacement Desk</span>
            </div>
            <p className="text-xs text-slate-300 font-normal">
              Continuous 24×7 backup support so recovering and elderly family members are never stranded.
            </p>
          </div>
        </motion.div>

        {/* Dual High-Contrast Actions */}
        <motion.div variants={revealUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 max-w-xl mx-auto">
          <button
            type="button"
            onClick={() =>
              openWhatsApp('Hello Pulse n Care, I want to book verified home nursing care in Delhi NCR.')
            }
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-3 btn-emerald-aura btn-shimmer text-white font-black text-sm sm:text-base px-8 py-4 rounded-2xl cursor-pointer"
          >
            <WhatsAppIcon className="w-5 h-5 fill-white" />
            <span>Connect on WhatsApp</span>
          </button>

          <button
            type="button"
            onClick={onOpenCallback}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 glass-premium hover:bg-white/15 text-white font-bold text-sm sm:text-base px-7 py-4 rounded-2xl transition-all cursor-pointer"
          >
            <PhoneCall className="w-4 h-4 text-sky-300" />
            <span>Request Urgent Callback</span>
          </button>
        </motion.div>

        {/* Hotlines & Service Region Footer */}
        <motion.div variants={revealUp} className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium">
          <span className="flex items-center gap-1.5 text-slate-300">
            <MapPin className="w-4 h-4 text-[#015498]" />
            Coverage: Delhi NCR, Gurugram, Noida, Faridabad &amp; Ghaziabad
          </span>
          <span className="text-slate-600">•</span>
          <a href="tel:+919211765429" className="text-slate-300 hover:text-white transition-colors">
            24×7 Clinical Hotline: <strong className="text-white">{WHATSAPP_DISPLAY_PHONE}</strong>
          </a>
          <span className="text-slate-600">•</span>
          <a href="mailto:pulsencare@gmail.com" className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors">
            <Mail className="w-3.5 h-3.5 text-rose-400" />
            <span>pulsencare@gmail.com</span>
          </a>
        </motion.div>

      </motion.div>

      <div className="absolute bottom-0 inset-x-0 z-[3] pointer-events-none opacity-40">
        <PulseLine variant="hero" animated={true} />
      </div>
    </section>
  );
};
