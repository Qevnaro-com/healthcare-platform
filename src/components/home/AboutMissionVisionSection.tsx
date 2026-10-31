import React from 'react';
import { motion } from 'framer-motion';
import {
  Compass,
  Target,
  Eye,
  ShieldCheck,
  Building2,
  HeartHandshake,
  CheckCircle2,
  Clock,
  Sparkles
} from 'lucide-react';
import { revealUp, staggerContainer } from '../../lib/motion';

export const AboutMissionVisionSection: React.FC = () => {
  return (
    <section id="about-us" className="py-14 sm:py-20 bg-gradient-to-b from-white via-slate-50/60 to-white border-b border-slate-200/90 text-left relative overflow-hidden">
      {/* Ambient Spatial Lighting Spheres (Desktop only to prevent mobile GPU lag) */}
      <div className="hidden sm:block absolute top-10 left-1/4 w-[450px] h-[450px] bg-blue-100/30 rounded-full blur-[130px] pointer-events-none" />
      <div className="hidden sm:block absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-emerald-100/25 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-[#015498] text-[11px] font-extrabold uppercase tracking-wider border border-blue-200">
            <Compass className="w-3.5 h-3.5 text-[#015498]" />
            <span>ABOUT PULSE N CARE · MISSION &amp; VISION</span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-900 tracking-[-0.02em] leading-tight">
            Bridging Hospital Discharge to Complete Home Recovery
          </h2>

          <p className="text-slate-600 text-xs sm:text-base leading-relaxed font-medium">
            Founded in Delhi NCR and funded by an NRI through Foreign Direct Investment (FDI), Pulse n Care provides dependable doorstep nursing and bedside care anchored in patient dignity and ethical transparency.
          </p>
        </div>

        {/* Bento Grid: Story, Mission, Vision, and FDI Institutional Backing */}
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6"
        >
          
          {/* Card 1: Our Foundation Story (Col 7) */}
          <motion.div
            variants={revealUp}
            className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="w-12 h-12 rounded-2xl bg-blue-50 text-[#015498] flex items-center justify-center font-bold shadow-2xs">
                  <Building2 className="w-6 h-6" />
                </span>
                <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                  Delhi NCR Established
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                Trusted Home Non-Medical Healthcare Provider
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Founded in Delhi NCR, <strong>Pulse n Care</strong> is a trusted home non-medical healthcare provider dedicated to delivering nursing care directly to your doorstep. We bridge the gap between hospital discharge and complete home recovery by deploying verified, qualified, and compassionate healthcare professionals tailored to every family&apos;s unique needs.
              </p>

              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700 font-semibold">
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% Verified Caregivers</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Doctor Prescription Synced</span>
                </div>
              </div>
            </div>

            {/* NRI FDI Investor Footnote */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-amber-900 font-bold">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>NRI-Funded Startup via Foreign Direct Investment (FDI)</span>
              </div>
              <span className="text-slate-500 font-medium">Global Patient Care Standards</span>
            </div>
          </motion.div>

          {/* Card 2 & 3: Mission & Vision (Col 5) */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            
            {/* Mission Card */}
            <motion.div
              variants={revealUp}
              className="bg-gradient-to-br from-blue-50/70 via-white to-slate-50/80 rounded-3xl p-6 border border-blue-200/70 shadow-sm space-y-3 relative overflow-hidden"
            >
              <div className="flex items-center gap-2.5 text-[#015498]">
                <Target className="w-5 h-5 text-[#015498]" />
                <span className="text-xs font-black uppercase tracking-wider">Our Mission</span>
              </div>

              <h4 className="text-lg font-black text-slate-900 tracking-tight leading-snug">
                Empowering Families with Dignified Care
              </h4>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                To empower families across Delhi NCR with reliable, high-quality, and accessible home nursing services that preserve patient dignity, accelerate recovery, and provide absolute peace of mind.
              </p>
            </motion.div>

            {/* Vision Card */}
            <motion.div
              variants={revealUp}
              className="bg-gradient-to-br from-emerald-50/70 via-white to-slate-50/80 rounded-3xl p-6 border border-emerald-200/70 shadow-sm space-y-3 relative overflow-hidden"
            >
              <div className="flex items-center gap-2.5 text-emerald-700">
                <Eye className="w-5 h-5 text-emerald-700" />
                <span className="text-xs font-black uppercase tracking-wider">Our Vision</span>
              </div>

              <h4 className="text-lg font-black text-slate-900 tracking-tight leading-snug">
                Setting the Benchmark for Caregiving
              </h4>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                To become North India&apos;s most trusted home healthcare ecosystem, setting the benchmark for non-medical excellence, ethical caregiving, and patient monitoring.
              </p>
            </motion.div>

          </div>

        </motion.div>

        {/* 4 Bottom Operational Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-left">
          <div className="p-4.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-1.5">
            <div className="flex items-center gap-2 text-[#015498] font-bold text-xs">
              <Clock className="w-4 h-4 text-[#015498]" />
              <span>98% On-Time Deployment Rate</span>
            </div>
            <p className="text-xs text-slate-600 font-normal leading-relaxed">
              Punctual staff arrivals across Delhi, Gurugram, Noida, Faridabad, and Ghaziabad for short procedures and long-term stays.
            </p>
          </div>

          <div className="p-4.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-1.5">
            <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Advance Payment &amp; Cancellation Shield</span>
            </div>
            <p className="text-xs text-slate-600 font-normal leading-relaxed">
              Transparent upfront booking backed by a 100% refund for advance cancellations made 24 hours prior to deployment.
            </p>
          </div>

          <div className="p-4.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-1.5">
            <div className="flex items-center gap-2 text-rose-600 font-bold text-xs">
              <HeartHandshake className="w-4 h-4 text-rose-600" />
              <span>24h Free Replacement Guarantee</span>
            </div>
            <p className="text-xs text-slate-600 font-normal leading-relaxed">
              Committed to complete patient satisfaction with a free staff replacement dispatched within 24 hours if ever needed.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
