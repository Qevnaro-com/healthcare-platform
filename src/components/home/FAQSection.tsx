import { LottieAnimation } from '../common/LottieAnimation';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HelpCircle,
  ChevronDown,
  Phone, Mail,
  CheckCircle2,
  Stethoscope
} from 'lucide-react';
import { WhatsAppIcon } from '../common/WhatsAppButton';
import { openWhatsApp, WHATSAPP_DISPLAY_PHONE } from '../../utils/whatsapp';

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'verify-qualifications',
    category: 'Staff Qualifications & Licensing',
    question: 'How do you verify the credentials of your nurses and attendants?',
    answer:
      'Every clinical nurse is audited against their active State Nursing Council registration (DNC/INC) with degree verification (GNM or B.Sc Nursing). Bedside attendants undergo biometric Aadhaar verification, permanent residential address audits, and local police verification. Credentials and registration IDs are shared with families prior to care initiation.'
  },
  {
    id: 'replacement-policy',
    category: 'Operational Continuity & Reserves',
    question: 'What happens if our assigned nurse or caregiver falls sick or takes leave?',
    answer:
      'Pulse n Care operates an active regional standby roster across Delhi NCR. If an assigned caregiver is unavailable due to an emergency or illness, our Central Care Desk immediately dispatches an equally qualified, council-audited replacement from our reserve roster so your patient is never left stranded.'
  },
  {
    id: 'shifts-flexibility',
    category: 'Shift Schedules & Custom Care',
    question: 'What shift durations can we select for our patient?',
    answer:
      'We offer flexible schedules tailored to your patient’s dependency: Single clinical procedure visits (1–2 hours for sterile wound debridement, IV cannulation, or catheter change), 12-Hour Day Shifts (08:00 AM – 08:00 PM), 12-Hour Night Shifts (08:00 PM – 08:00 AM), and 24-Hour Continuous Live-In Care with rotational duty coverage.'
  },
  {
    id: 'doctor-coordination',
    category: 'Medical Supervision & Doctor Sync',
    question: 'Does your team follow our hospital discharge summary and treating doctor’s instructions?',
    answer:
      'Yes, strictly. Before commencing bedside care, our Duty Medical Officer (DMO) reviews the treating physician’s or surgeon’s discharge summary. The nurse follows the prescribed medication timings, surgical dressing protocols, and escalation parameters, logging all vitals into a structured digital ledger.'
  },
  {
    id: 'medical-equipment',
    category: 'ICU & Medical Devices',
    question: 'Can your nurses manage medical equipment like Oxygen Concentrators, Suction, or BiPAP at home?',
    answer:
      'Yes. Our ICU-certified home nurses are trained in operating and troubleshooting multipara monitors, BiPAP/CPAP ventilation, tracheostomy suctioning machines, syringe pumps, and enteral feeding tubes (Ryle’s tube and PEG tube feeding) under clinical asepsis.'
  },
  {
    id: 'billing-transparency',
    category: 'Transparent Billing & Zero Brokerage',
    question: 'Are there hidden agency commissions or upfront security deposits?',
    answer:
      'None. Unlike domestic maid bureaus that demand hefty broker commissions and locked deposits, Pulse n Care operates a direct managed healthcare roster. You pay only for verified shifts with zero agency commission and zero advance security deposit.'
  },
  {
    id: 'emergency-dispatch',
    category: 'Emergency Dispatch & Timelines',
    question: 'How quickly can home nursing be arranged for a same-day hospital discharge?',
    answer:
      'For emergency discharges across Delhi NCR, our Central Care Desk can arrange nurse or attendant dispatch promptly once the patient discharge summary is shared on WhatsApp. Our Duty Desk operates 24×7 to coordinate bedside handovers seamlessly.'
  }
];

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('verify-qualifications');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'Staff Qualifications & Licensing', label: 'Licensing & KYC' },
    { id: 'Operational Continuity & Reserves', label: 'Standby Roster' },
    { id: 'Shift Schedules & Custom Care', label: 'Shifts & Rates' },
    { id: 'Medical Supervision & Doctor Sync', label: 'Doctor Oversight' }
  ];

  const filteredItems = selectedCategory === 'all'
    ? FAQ_ITEMS
    : FAQ_ITEMS.filter((item) => item.category === selectedCategory);

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faqs" className="py-12 sm:py-16 bg-white border-b border-slate-200/90 text-left relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-16 relative z-10">
        
        {/* ======================================================================= */}
        {/* SECTION HEADER                                                          */}
        {/* ======================================================================= */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/80 text-[#015498] text-[11px] font-extrabold uppercase tracking-wider border border-blue-200">
            <HelpCircle className="w-3.5 h-3.5 text-[#015498]" />
            <span>TRANSPARENT ANSWERS</span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl lg:text-3xl font-semibold text-slate-900 tracking-[-0.02em] leading-tight">
            Clear, Honest Answers to Patient &amp; Family Questions
          </h2>

          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium max-w-2xl">
            Navigating bedside recovery or chronic elderly care is critical. Review verified details on nurse licensing, emergency standby rosters, hospital discharge sync, and honest pricing.
          </p>
        </div>

        {/* ======================================================================= */}
        {/* 2-COLUMN EDITORIAL ACCORDION + CLINICAL ASSISTANCE DESK LAYOUT           */}
        {/* ======================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
          
          {/* ===================================================================== */}
          {/* LEFT COLUMN: Sticky Clinical Support Card (Span 5)                   */}
          {/* ===================================================================== */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            
            {/* Clinical Assistance Box */}
            <div className="bg-[#050F33] text-white rounded-2xl p-5 sm:p-6 border border-slate-800 shadow-[0_16px_40px_rgba(5,15,51,0.18)] relative overflow-hidden">
              {/* Subtle Ambient Radial Glow */}
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#015498]/30 rounded-full blur-[60px] pointer-events-none" />
              
              <div className="relative z-10 space-y-5">
                <div className="flex justify-center rounded-2xl bg-white/95 py-2">
                  <LottieAnimation type="doctor-online" className="w-44 h-36" />
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 text-[11px] font-black uppercase tracking-wider border border-emerald-500/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>CENTRAL CARE DESK ACTIVE</span>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
                    Need Guidance for a Specific Patient Case?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 font-normal mt-2 leading-relaxed">
                    Every patient’s condition is unique. Speak directly with our Duty Nursing Officer to review your hospital discharge summary and verify qualified staff availability.
                  </p>
                </div>

                {/* Key Desk Commitments */}
                <div className="space-y-2.5 pt-1">
                  <div className="flex items-center gap-2.5 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Average WhatsApp response: Under 5 minutes</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Free clinical case assessment before booking</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>100% Council-registered DNC / INC nurses</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 space-y-3">
                  <button
                    type="button"
                    onClick={() => openWhatsApp('Hello Pulse n Care, I have questions regarding patient care arrangements and staff credentials.')}
                    className="w-full flex items-center justify-center gap-2 btn-emerald-aura btn-shimmer text-white font-black text-xs sm:text-sm py-3.5 px-6 rounded-2xl cursor-pointer"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-white shrink-0" />
                    <span>Ask Clinical Desk on WhatsApp</span>
                  </button>

                  <a
                    href="tel:+919211765429"
                    className="w-full flex items-center justify-center gap-2 btn-sapphire-clinical font-bold text-xs py-3 px-5 rounded-2xl cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5 text-sky-300" />
                    <span>Direct Helpline: {WHATSAPP_DISPLAY_PHONE}</span>
                  </a>

                  <a
                    href="mailto:pulsencare@gmail.com"
                    className="w-full flex items-center justify-center gap-2 text-slate-300 hover:text-white font-semibold text-xs py-2 transition-all"
                  >
                    <Mail className="w-3.5 h-3.5 text-rose-400" />
                    <span>pulsencare@gmail.com</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Stats Pill Strip */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 flex items-center justify-between text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Stethoscope className="w-4 h-4 text-[#015498]" />
                <span className="font-bold text-slate-800">Medical Council Audited</span>
              </div>
              <span className="text-[11px] font-bold text-[#015498] bg-blue-100/60 px-2 py-0.5 rounded-full border border-blue-200">
                100% Verified
              </span>
            </div>

          </div>

          {/* ===================================================================== */}
          {/* RIGHT COLUMN: Interactive Categorized Accordion (Span 7)              */}
          {/* ===================================================================== */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-[#015498] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Accordion Items List */}
            <div className="space-y-3">
              {filteredItems.map((item) => {
                const isOpen = openId === item.id;
                return (
                  <div
                    key={item.id}
                    className={`rounded-2xl border transition-all duration-200 ${
                      isOpen
                        ? 'bg-blue-50/40 border-[#015498]/40 shadow-sm ring-1 ring-[#015498]/10'
                        : 'bg-white border-slate-200/90 hover:border-slate-300 shadow-xs'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleItem(item.id)}
                      aria-expanded={isOpen}
                      className="w-full p-5 sm:p-6 flex items-start justify-between text-left gap-4 cursor-pointer focus:outline-none"
                    >
                      <div className="space-y-1.5">
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#015498] block">
                          {item.category}
                        </span>
                        <h3 className={`text-sm sm:text-base font-black transition-colors leading-snug ${
                          isOpen ? 'text-[#015498]' : 'text-slate-900'
                        }`}>
                          {item.question}
                        </h3>
                      </div>

                      <div
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center shrink-0 transition-transform duration-200 mt-0.5 ${
                          isOpen
                            ? 'bg-[#015498] text-white border-[#015498] rotate-180'
                            : 'bg-slate-50 text-slate-500 border-slate-200'
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 border-t border-slate-200/40 mt-1">
                            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                              {item.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
