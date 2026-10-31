import { LottieAnimation } from '../common/LottieAnimation';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  UserCheck,
  Clock,
  Stethoscope,
  Phone
} from 'lucide-react';
import { WhatsAppIcon } from '../common/WhatsAppButton';
import { openWhatsApp } from '../../utils/whatsapp';

interface ComparisonRow {
  criteria: string;
  agencyIssue: string;
  pulseStandard: string;
  proofBadge: string;
}

const COMPARISON_ROWS: ComparisonRow[] = [
  {
    criteria: 'Staff Nursing Qualifications',
    agencyIssue: 'Untrained domestic helpers or unregistered attendants without state medical council checks.',
    pulseStandard: '100% Council-Registered Nurses (GNM / B.Sc) and certified patient attendants.',
    proofBadge: 'DNC / INC Audited'
  },
  {
    criteria: 'Identity & Police KYC',
    agencyIssue: 'Unvetted phone contacts with zero residential or formal criminal background checks.',
    pulseStandard: 'Biometric Aadhaar KYC, verified residential address, and active local police verification.',
    proofBadge: 'Biometric Clearance'
  },
  {
    criteria: 'Bedside Documentation',
    agencyIssue: 'No vitals log, no fluid intake-output tracking, and no clinical handover between shifts.',
    pulseStandard: 'Standardized digital vitals ledger, medication tracking, and shift handover reports.',
    proofBadge: 'Daily Charting'
  },
  {
    criteria: 'Clinical Supervision',
    agencyIssue: 'Zero doctor oversight. Family is left completely on their own during complications.',
    pulseStandard: 'Supervised by an internal Duty Medical Officer (DMO) with case review protocols.',
    proofBadge: 'Doctor Protocol'
  },
  {
    criteria: 'Standby Replacement Policy',
    agencyIssue: 'Attendants leave unannounced, stranding bedridden patients without any backup.',
    pulseStandard: 'Central Operations Desk maintains an active regional roster with prompt replacement.',
    proofBadge: 'Guaranteed Reserve'
  },
  {
    criteria: 'Emergency Escalation Channel',
    agencyIssue: 'Brokers disappear when medical emergencies or sudden vitals fluctuations occur.',
    pulseStandard: '24×7 Central Care Desk escalation ladder connecting directly to clinical supervisors.',
    proofBadge: '24×7 Active Desk'
  }
];

export const ClinicalGovernanceSection: React.FC = () => {
  const [showAllRows, setShowAllRows] = useState(false);
  return (
    <section id="why-us" className="py-12 sm:py-16 bg-[#050F33] text-white relative overflow-hidden border-b border-white/10">
      
      {/* Top Brand Accent Line */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#C31725] via-[#015498] to-[#25D366]" />

      {/* Ambient Lighting Spheres (Desktop only to prevent mobile GPU lag) */}
      <div className="hidden sm:block absolute top-1/4 -left-32 w-96 h-96 bg-[#015498]/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="hidden sm:block absolute bottom-1/4 -right-32 w-96 h-96 bg-[#C31725]/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left space-y-8">
        <div className="hidden lg:flex absolute right-8 top-0 w-44 h-44 items-center justify-center rounded-[2rem] bg-white shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] pointer-events-none" aria-hidden="true">
          <LottieAnimation type="verified-badge" className="w-36 h-36" />
        </div>
        
        {/* Section Heading & Context */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/80 text-rose-300 text-[11px] font-black tracking-wider uppercase border border-rose-500/30">
            <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
            <span>CLINICAL GOVERNANCE &amp; PATIENT SAFETY</span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-white tracking-[-0.02em] leading-tight">
            Supervised Clinical Standards vs. Unverified Domestic Agencies
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl font-normal">
            Delicate patient recovery requires verified clinical competence. Review how our governed medical framework protects your loved ones compared to unverified maid bureaus and commission brokers.
          </p>
        </div>

        {/* 4 Executive Institutional Proof Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-black uppercase tracking-wider text-sky-400">01 • LICENSING</span>
              <UserCheck className="w-4 h-4 text-sky-400" />
            </div>
            <h3 className="text-sm font-black text-white">100% Council Registered</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every staff nurse holds active Delhi Nursing Council (DNC) or INC credentials.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-black uppercase tracking-wider text-emerald-400">02 • INTEGRITY</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <h3 className="text-sm font-black text-white">Biometric Police KYC</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Strict Aadhaar authentication and permanent residential police background check.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-black uppercase tracking-wider text-rose-400">03 • SUPERVISION</span>
              <Stethoscope className="w-4 h-4 text-rose-400" />
            </div>
            <h3 className="text-sm font-black text-white">Duty Medical Officer Sync</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Physician-reviewed daily vitals logging and instant clinical escalation protocols.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-black uppercase tracking-wider text-amber-400">04 • CONTINUITY</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <h3 className="text-sm font-black text-white">Guaranteed Standby Roster</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Central reserve desk dispatches verified backup promptly if a caregiver falls sick.
            </p>
          </div>
        </div>

        {/* Structured Comparison Table Layout */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.45 }}
          className="border border-white/15 rounded-2xl overflow-hidden bg-slate-950/70 backdrop-blur-xl shadow-2xl"
        >
          {/* Table Header */}
          <div className="grid grid-cols-1 md:grid-cols-12 bg-white/5 border-b border-white/10 text-xs font-black uppercase tracking-wider text-slate-300 p-4 sm:p-5">
            <div className="md:col-span-3">Governance Domain</div>
            <div className="md:col-span-4 text-rose-300 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-rose-400" />
              <span>Unverified Agency / Open Broker</span>
            </div>
            <div className="md:col-span-5 text-emerald-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Pulse n Care Managed Roster</span>
            </div>
          </div>

          {/* Table Comparison Rows */}
          <div className="divide-y divide-white/10">
            {(showAllRows ? COMPARISON_ROWS : COMPARISON_ROWS.slice(0, 4)).map((row, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 md:grid-cols-12 p-4 sm:p-5 gap-3 md:gap-4 text-xs items-start hover:bg-white/[0.03] transition-colors"
              >
                {/* Domain Title */}
                <div className="md:col-span-3 font-bold text-white flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                  <span>{row.criteria}</span>
                </div>

                {/* Agency Problem */}
                <div className="md:col-span-4 text-slate-400 flex items-start gap-2 leading-relaxed">
                  <span className="text-rose-400 font-bold shrink-0 mt-0.5">✕</span>
                  <span>{row.agencyIssue}</span>
                </div>

                {/* Pulse n Care Standard */}
                <div className="md:col-span-5 text-slate-200 flex items-start gap-2 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white">{row.pulseStandard}</span>
                    <span className="inline-block ml-2 px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[11px] font-bold border border-emerald-500/30">
                      {row.proofBadge}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {COMPARISON_ROWS.length > 4 && (
            <button
              type="button"
              onClick={() => setShowAllRows((v) => !v)}
              aria-expanded={showAllRows}
              className="w-full py-3.5 border-t border-white/10 text-xs font-bold text-sky-300 hover:text-white hover:bg-white/[0.04] transition-colors cursor-pointer"
            >
              {showAllRows ? 'Show fewer standards' : `See all ${COMPARISON_ROWS.length} standards`}
            </button>
          )}

          {/* Bottom Audit Strip */}
          <div className="p-4 sm:p-6 bg-slate-900/90 border-t border-white/10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <strong className="text-white font-bold">Need to verify staff registration? </strong>
              Our Care Desk shares nurse council certificates and police clearances upon requisition.
            </div>

            <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 shrink-0">
              <a
                href="tel:+919211765429"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 active:bg-white/25 text-white font-bold text-xs sm:text-sm border border-white/20 transition-all whitespace-nowrap text-center shrink-0"
              >
                <Phone className="w-3.5 h-3.5 text-sky-300 shrink-0" />
                <span className="font-mono whitespace-nowrap">+91 92117 65429</span>
              </a>

              <button
                type="button"
                onClick={() => openWhatsApp('Hello Pulse n Care, I want to review credentials and verify nurse availability for home care.')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl btn-emerald-aura btn-shimmer text-white text-xs sm:text-sm font-black cursor-pointer shadow-lg whitespace-nowrap text-center shrink-0"
              >
                <WhatsAppIcon className="w-4 h-4 fill-white shrink-0" />
                <span className="whitespace-nowrap">Verify Staff on WhatsApp</span>
                <ArrowRight className="w-3.5 h-3.5 text-white ml-0.5 shrink-0" />
              </button>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
