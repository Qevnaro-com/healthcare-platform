import React from 'react';
import { motion } from 'framer-motion';
import { UserCheck, FileCheck2, Clock, CheckCircle2 } from 'lucide-react';
import { CountUp } from '../common/CountUp';

const STATS = [
  { to: 98, suffix: '%', label: 'On-time deployment rate' },
  { to: 100, suffix: '%', label: 'Council-verified nurses' },
  { to: 24, suffix: '×7', label: 'Central care operations' },
  { to: 5, suffix: '', label: 'Delhi NCR core cities' }
];

interface TrustItem {
  id: string;
  badge: string;
  badgeColor: string;
  icon: React.ReactNode;
  label: string;
  detail: string;
  proof: string;
}

const TRUST_ITEMS: TrustItem[] = [
  {
    id: 'clinical-governance',
    badge: 'DNC/INC REGISTERED',
    badgeColor: 'bg-blue-50 text-[#015498] border-blue-200/80',
    icon: <CheckCircle2 className="w-5 h-5 text-[#015498]" />,
    label: 'Council-Registered Nurses',
    detail: 'Licensed under Delhi Nursing Council (DNC) and Indian Nursing Council (INC), delivering verified clinical care at home.',
    proof: 'Verified Licenses'
  },
  {
    id: 'on-time-dispatch',
    badge: '98% ON-TIME RATE',
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
    icon: <Clock className="w-5 h-5 text-emerald-600" />,
    label: '98% On-Time Deployment',
    detail: 'Consistently reliable on-time staff arrival across Delhi NCR for short procedural visits and 24/7 live-in nursing.',
    proof: 'Punctual Dispatch'
  },
  {
    id: 'replacement-guarantee',
    badge: '24H REPLACEMENT',
    badgeColor: 'bg-blue-50 text-[#015498] border-blue-200/80',
    icon: <UserCheck className="w-5 h-5 text-[#015498]" />,
    label: 'Free 24h Replacement',
    detail: 'Complimentary staff replacement within 24 hours if a family is unsatisfied with the assigned nurse or attendant.',
    proof: 'Free Replacement'
  },
  {
    id: 'advance-refund',
    badge: '100% ADVANCE REFUND',
    badgeColor: 'bg-purple-50 text-purple-800 border-purple-200/80',
    icon: <FileCheck2 className="w-5 h-5 text-purple-700" />,
    label: 'Advance Refund Shield',
    detail: 'Full 100% refund for advance cancellations (≥24h before deployment) and fair pro-rata unused days calculation.',
    proof: 'Transparent Policy'
  }
];

export const CredibilityStrip: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-[#F4F8FB] via-white to-white border-b border-slate-200/90 py-8 sm:py-14 relative z-20 overflow-hidden">
      <div className="hidden sm:block absolute -top-24 left-1/2 -translate-x-1/2 w-[900px] h-[300px] bg-[#015498]/[0.06] rounded-full blur-[90px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Subtle Top Bar Label */}
        <div className="flex items-center justify-between pb-3 sm:pb-4 mb-4 border-b border-slate-200/70 text-[11px] font-bold text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-slate-800 uppercase tracking-wider font-black">
              Council-Registered Healthcare Network
            </span>
            <span className="text-slate-500 hidden sm:inline">• 98% On-Time Deployment Across Delhi NCR</span>
          </div>

          <div className="hidden md:flex items-center gap-2 text-[#015498]">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>100% Governed Medical Workforce</span>
          </div>
        </div>

        {/* Animated trust numbers */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200/70 rounded-2xl overflow-hidden border border-slate-200/80 shadow-[0_20px_50px_-24px_rgba(5,15,51,0.25)] mb-8 sm:mb-7">
          {STATS.map((st) => (
            <div key={st.label} className="bg-white/95 px-3 py-5 sm:px-5 sm:py-8 text-center">
              <div className="font-display text-3xl sm:text-5xl font-semibold text-[#050F33] tracking-tight">
                <CountUp to={st.to} suffix={st.suffix} />
              </div>
              <div className="mt-1 sm:mt-2 text-[10px] sm:text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                {st.label}
              </div>
            </div>
          ))}
        </div>

        {/* 4 Rich Accreditation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {TRUST_ITEMS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.7, delay: idx * 0.09, ease: [0.16, 1, 0.3, 1] }}
              className="bg-gradient-to-br from-white via-white to-slate-50/60 rounded-2xl p-5 border border-slate-200/90 shadow-[0_4px_20px_rgba(5,15,51,0.04)] hover:shadow-[0_14px_36px_rgba(1,84,152,0.10)] hover:border-[#015498]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Top Hover Ambient Accent Line */}
              <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-[#015498] via-[#38BDF8] to-[#25D366] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-2xs">
                    {item.icon}
                  </div>

                  <span className={`text-[11px] font-black tracking-wider uppercase px-2.5 py-0.5 rounded-full border ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                </div>

                <div>
                  <h2 className="text-sm font-black text-slate-900 tracking-tight leading-snug group-hover:text-[#015498] transition-colors">
                    {item.label}
                  </h2>
                  <p className="text-xs text-slate-500 font-normal leading-relaxed mt-1">
                    {item.detail}
                  </p>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-500">
                <span className="text-emerald-700 font-extrabold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                  {item.proof}
                </span>
                <span className="text-slate-300">#0{idx + 1}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
