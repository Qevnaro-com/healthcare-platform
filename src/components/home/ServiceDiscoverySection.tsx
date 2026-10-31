import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Stethoscope,
  UserCheck,
  HeartPulse,
  Activity,
  ShieldPlus,
  Check,
  Clock,
  ArrowRight,
  ShieldCheck,
  Award,
  Sparkles,
  PhoneCall,
  RotateCcw,
  Zap,
  ChevronRight,
} from 'lucide-react';
import { WhatsAppIcon } from '../common/WhatsAppButton';
import { openWhatsApp, OFFICIAL_PHONE } from '../../utils/whatsapp';

export interface ShiftTier {
  id: string;
  name: string;
  duration: string;
  price: string;
  priceUnit: string;
}

export interface ServiceCategoryItem {
  id: string;
  category: string;
  tag: string;
  title: string;
  subtitle: string;
  badge: string;
  price: string;
  priceUnit: string;
  hourlyHighlight: string;
  whoItIsFor: string;
  desc: string;
  path: string;
  image: string;
  objectPosition: string;
  inclusions: string[];
  equipmentCarried: string[];
  shifts: string[];
  shiftTiers: ShiftTier[];
  icon: React.ReactNode;
}

export const SERVICE_CATEGORIES: ServiceCategoryItem[] = [
  {
    id: 'patient-attendants',
    category: '12h Shift Nursing & Attendant',
    tag: 'Starting @ ₹60/hr',
    title: 'General Patient Attendants & 12h Shift Care',
    subtitle: 'Verified & trained non-medical healthcare staff for bedside hygiene, sponge baths, diaper changing, and mobility assistance.',
    badge: 'Starting @ ₹60/hr (Advance Payment)',
    price: '₹720',
    priceUnit: 'per 12h shift (@₹60/hr, Advance)',
    hourlyHighlight: '₹60 / hour',
    whoItIsFor: 'Bedridden, semi-dependent, or convalescent patients needing daily personal hygiene, bed-bound care, and attentive non-medical support.',
    desc: 'Compassionate male and female attendants ensuring dignified hygiene, warm bed-baths, sponge bathing, diaper care, safe repositioning, and walking assistance.',
    path: '/services/general-patient-attendants',
    image: '/assets/services/core/service-patient-attendant.webp',
    objectPosition: 'object-center',
    inclusions: [
      'Daily personal hygiene, bed baths & sponge baths',
      'Timely diaper changing, bedpan hygiene & skin care',
      'Bed rotation & positioning to prevent pressure sores',
      'Mobility assistance, wheelchair transfer & walking aid'
    ],
    equipmentCarried: ['Anti-Slip Transfer Sheet', 'Hygiene Support Kit', 'Daily Routine Log'],
    shifts: ['12h Day Shift (8 AM - 8 PM)', '12h Night Shift (8 PM - 8 AM)', '24h Live-in Attendant'],
    shiftTiers: [
      { id: '12h-day', name: '12h Day Attendant (8AM-8PM)', duration: '12 Hours', price: '₹720', priceUnit: 'per 12h (@₹60/hr, Advance)' },
      { id: '12h-night', name: '12h Night Attendant (8PM-8AM)', duration: '12 Hours', price: '₹720', priceUnit: 'per 12h (@₹60/hr, Advance)' },
      { id: '24h', name: '24h Full Live-In Attendant', duration: '24 Hours', price: '₹1,176', priceUnit: 'per 24h (@₹49/hr, Advance)' },
    ],
    icon: <UserCheck className="w-4 h-4 text-[#015498]" />
  },
  {
    id: 'chronic-palliative',
    category: '24/7 Live-in Nursing Care',
    tag: 'Starting @ ₹49/hr',
    title: '24/7 Live-In & Palliative Nursing Care',
    subtitle: 'Round-the-clock bedside nursing for post-stroke rehabilitation, oncology comfort, advanced diabetes, and neuro-care.',
    badge: 'Starting @ ₹49/hr (Advance Payment)',
    price: '₹1,176',
    priceUnit: 'per 24h continuous (@₹49/hr, Advance)',
    hourlyHighlight: '₹49 / hour',
    whoItIsFor: 'Patients and families navigating post-stroke neurological recovery, bedridden support, and continuous bedside care.',
    desc: 'Round-the-clock bedside nursing care, continuous vital sign oversight, patient comfort, and total family peace of mind across Delhi NCR.',
    path: '/services/chronic-disease-palliative-care',
    image: '/assets/services/core/service-chronic-palliative.webp',
    objectPosition: 'object-center',
    inclusions: [
      '24/7 Continuous live-in bedside nursing care',
      'Post-stroke neuromuscular rehabilitation support',
      'Blood glucose charting, insulin & oral medications',
      'Continuous vitals monitoring & doctor escalation'
    ],
    equipmentCarried: ['Digital Vitals Monitor (BP & SpO2)', 'Glucometer Kit', 'Palliative Comfort Log'],
    shifts: ['24h Continuous Live-In', '12h Day Shift', '12h Night Shift', 'Short Clinical Visit'],
    shiftTiers: [
      { id: '24h', name: '24/7 Continuous Live-In Care', duration: '24 Hours', price: '₹1,176', priceUnit: 'per 24h (@₹49/hr, Advance)' },
      { id: '12h-day', name: '12h Day Shift Nursing', duration: '12 Hours', price: '₹720', priceUnit: 'per 12h (@₹60/hr, Advance)' },
      { id: '12h-night', name: '12h Night Shift Nursing', duration: '12 Hours', price: '₹720', priceUnit: 'per 12h (@₹60/hr, Advance)' },
      { id: 'visit', name: 'Short-Visit Procedure', duration: '45-60 Mins', price: '₹500', priceUnit: 'per visit (Advance)' },
    ],
    icon: <HeartPulse className="w-4 h-4 text-[#C31725]" />
  },
  {
    id: 'post-op-recovery',
    category: 'Post-Operative & Cardiac Care',
    tag: 'Starting @ ₹56/hr',
    title: 'Post-Operative & Cardiac Care',
    subtitle: 'Clinical support for orthopaedic recoveries (knee/hip replacement), cardiac rehab, and post-surgical monitoring.',
    badge: 'Starting @ ₹56/hr for 24h Live-in',
    price: '₹1,344',
    priceUnit: 'per 24h (@₹56/hr, Advance)',
    hourlyHighlight: '₹56 / hour',
    whoItIsFor: 'Patients discharged after total knee/hip arthroplasty, bypass / cardiac surgery, abdominal procedures, or major trauma.',
    desc: 'Council-registered staff nurses providing sterile wound dressing, early mobilization assistance, surgical drain monitoring, and post-op cardiac vitals tracking.',
    path: '/services/post-operative-recovery',
    image: '/assets/services/core/service-post-op-recovery.webp',
    objectPosition: 'object-center',
    inclusions: [
      'Aseptic surgical incision dressing & drain care',
      'Orthopedic walker-guided ambulation & gait support',
      'Cardiac vital signs & medication adherence logging',
      'Post-surgical pain management & infection check'
    ],
    equipmentCarried: ['Autoclaved Dressing Tray', 'Mobility Assist Belt', 'Clinical Recovery Journal'],
    shifts: ['24h Continuous Live-In', '12h Day Shift', '12h Night Shift', 'Short-Visit Dressing'],
    shiftTiers: [
      { id: '24h', name: '24h Post-Op & Cardiac Live-In', duration: '24 Hours', price: '₹1,344', priceUnit: 'per 24h (@₹56/hr, Advance)' },
      { id: '12h-day', name: '12h Day Recovery Nursing', duration: '12 Hours', price: '₹720', priceUnit: 'per 12h (@₹60/hr, Advance)' },
      { id: '12h-night', name: '12h Night Recovery Watch', duration: '12 Hours', price: '₹720', priceUnit: 'per 12h (@₹60/hr, Advance)' },
      { id: 'visit', name: 'Short-Visit Dressing & Procedures', duration: '45-60 Mins', price: '₹500', priceUnit: 'per visit (Advance)' },
    ],
    icon: <Activity className="w-4 h-4 text-[#015498]" />
  },
  {
    id: 'physiotherapy',
    category: 'Physiotherapy at Home',
    tag: '₹700 / Session (1 Hour)',
    title: 'Physiotherapy at Home',
    subtitle: 'Certified physiotherapists delivering customized rehabilitation for stroke recovery, joint replacement, and mobility restoration.',
    badge: '₹700 / Session (1 Hour, Advance)',
    price: '₹700',
    priceUnit: 'per 1-hour session (Advance)',
    hourlyHighlight: '₹700 / session',
    whoItIsFor: 'Post-stroke patients regaining limb function, joint replacement rehabilitation, elderly mobility recovery, and sports injury relief.',
    desc: 'Qualified physiotherapists bringing clinical modalities, therapeutic exercise bands, and targeted joint mobilization techniques directly to your home.',
    path: '/services',
    image: '/assets/services/home-nursing/pulse-n-care-mobility.webp',
    objectPosition: 'object-center',
    inclusions: [
      'Comprehensive musculoskeletal & neuro assessment',
      'Passive & active range-of-motion (ROM) exercises',
      'Post-knee/hip replacement gait & ambulation training',
      'Customized daily exercise regimen for family caregivers'
    ],
    equipmentCarried: ['Therabands & Resistance Loops', 'Goniometer', 'TENS / Muscle Stimulator (on request)'],
    shifts: ['Single 1-Hour Session', 'Weekly Package (6 Sessions)', 'Monthly Comprehensive Rehab'],
    shiftTiers: [
      { id: 'single', name: '1-Hour Physiotherapy Session', duration: '1 Hour', price: '₹700', priceUnit: 'per session (Advance)' },
      { id: 'weekly', name: '6-Session Recovery Bundle', duration: '6 Sessions', price: '₹3,900', priceUnit: '₹650/session (Advance)' },
      { id: 'neuro', name: 'Neuro & Stroke Specialized Rehab', duration: '1 Hour', price: '₹850', priceUnit: 'per session (Advance)' },
    ],
    icon: <Activity className="w-4 h-4 text-[#C31725]" />
  },
  {
    id: 'short-procedures',
    category: 'Short-Visit Procedures',
    tag: '₹500 / Visit',
    title: 'Short-Visit Clinical Nursing Procedures',
    subtitle: 'Doorstep visits by verified staff nurses for injections, aseptic wound dressing, catheter insertion/removal, and vitals check.',
    badge: '₹500 / Visit (Advance Payment)',
    price: '₹500',
    priceUnit: 'per procedure visit (Advance)',
    hourlyHighlight: '₹500 / visit',
    whoItIsFor: 'Patients requiring quick clinical procedures without waiting in crowded OPD queues or paying high hospital visit charges.',
    desc: 'Sterile doorstep clinical interventions performed by registered nurses adhering strictly to hospital asepsis protocols across Delhi NCR.',
    path: '/services',
    image: '/assets/services/home-nursing/pulse-n-care-wound-care.webp',
    objectPosition: 'object-center',
    inclusions: [
      'Sterile IV / IM / SC injection administration',
      'Surgical wound dressing & suture / staple inspection',
      'Foley catheter insertion, removal, or bladder wash',
      'Ryle\'s tube / feeding tube insertion & verification'
    ],
    equipmentCarried: ['Autoclaved Sterile Dressing Pack', 'BP, SpO2 & Glucometer Kit', 'Sharps Disposal Container'],
    shifts: ['Single Clinical Procedure (45-60 mins)', 'Morning Dressing Visit', 'Evening Injection Administration'],
    shiftTiers: [
      { id: 'single-proc', name: 'Short-Visit Procedure (Injection / Vitals)', duration: '45 Mins', price: '₹500', priceUnit: 'per visit (Advance)' },
      { id: 'dressing', name: 'Aseptic Surgical Wound Dressing', duration: '45 Mins', price: '₹500', priceUnit: 'per visit (Advance)' },
      { id: 'catheter', name: 'Catheter / Ryle\'s Tube Insertion', duration: '60 Mins', price: '₹600', priceUnit: 'per visit (Advance)' },
    ],
    icon: <Stethoscope className="w-4 h-4 text-[#015498]" />
  },
  {
    id: 'elderly-care',
    category: 'Elderly Care Assistance',
    tag: 'Starting @ ₹60/hr',
    title: 'Elderly Care Assistance & Fall Prevention',
    subtitle: 'Dedicated companions to manage medication schedules, aid in walking, prevent falls, and assist with toilet routine.',
    badge: 'Starting @ ₹60/hr (Advance Payment)',
    price: '₹720',
    priceUnit: 'per 12h shift (@₹60/hr, Advance)',
    hourlyHighlight: '₹60 / hour',
    whoItIsFor: 'Aging parents and seniors who need warm companionship, fall prevention, medication oversight, and daily mobility confidence at home.',
    desc: 'Empathetic companions dedicated to elderly comfort, helping seniors safely navigate their home, maintain timely medication routines, stay active, and assist with washroom safety.',
    path: '/services/elderly-care-assistance',
    image: '/assets/services/core/service-elderly-care.webp',
    objectPosition: 'object-center',
    inclusions: [
      'Strict medication schedule oversight & reminders',
      'Walking support & dedicated fall prevention vigilance',
      'Washroom & toilet routine assistance with dignity',
      'Engaging companionship, cognitive chats & calm presence'
    ],
    equipmentCarried: ['Pill Organizer & Reminder', 'Fall Prevention Support Belt', 'Emergency Escalation Card'],
    shifts: ['12h Day Companionship', '12h Night Fall Watch', '24h Resident Care'],
    shiftTiers: [
      { id: '12h-day', name: '12h Day Senior Companion', duration: '12 Hours', price: '₹720', priceUnit: 'per 12h (@₹60/hr, Advance)' },
      { id: '12h-night', name: '12h Senior Fall Watch (Night)', duration: '12 Hours', price: '₹720', priceUnit: 'per 12h (@₹60/hr, Advance)' },
      { id: '24h', name: '24h Resident Senior Care', duration: '24 Hours', price: '₹1,176', priceUnit: 'per 24h (@₹49/hr, Advance)' },
    ],
    icon: <ShieldPlus className="w-4 h-4 text-[#C31725]" />
  }
];

export const ServiceDiscoverySection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedShiftIdx, setSelectedShiftIdx] = useState(0);
  const current = SERVICE_CATEGORIES[activeIndex];
  const activeShift = current.shiftTiers[selectedShiftIdx] || current.shiftTiers[0];

  const handleSelectService = (index: number) => {
    setActiveIndex(index);
    setSelectedShiftIdx(0);
  };

  return (
    <section id="core-services" className="py-14 sm:py-20 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-b border-slate-200/90 text-left relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10 relative z-10">
        
        {/* ======================================================================= */}
        {/* MARKETING-FIRST HEADER & VALUE PROPOSITION                              */}
        {/* ======================================================================= */}
        <div className="space-y-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-black uppercase tracking-wider border border-emerald-300 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 fill-emerald-500" />
            <span>TRANSPARENT IN-HOME NURSING &amp; RECOVERY TARIFFS</span>
          </div>
          
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-[-0.02em] leading-tight">
            Hospital-Grade In-Home Healthcare Offerings
          </h2>
          
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
            Save up to 80% compared to private hospital day charges. We deploy verified, council-registered nursing staff and trained patient attendants directly to your doorstep on a transparent <strong className="text-slate-900">Advance Payment Basis</strong> backed by a 100% money-back cancellation guarantee.
          </p>
        </div>

        {/* ======================================================================= */}
        {/* PRICE TRANSPARENCY MATRIX (5 FAST-CLICK CARDS HIGHLIGHTING LOW AMOUNTS) */}
        {/* ======================================================================= */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-1">
          {[
            { idx: 0, title: '12h Nursing / Attendant', rate: '@₹60 / hr', sub: '₹720 per 12h shift', badge: 'Advance' },
            { idx: 1, title: '24/7 Live-in Nursing', rate: '@₹49 / hr', sub: '₹1,176 per 24h', badge: 'Advance' },
            { idx: 2, title: 'Post-Op & Cardiac', rate: '@₹56 / hr', sub: '₹1,344 per 24h live-in', badge: 'Advance' },
            { idx: 3, title: 'Physiotherapy', rate: '₹700 / session', sub: '1-Hour certified rehab', badge: 'Advance' },
            { idx: 4, title: 'Short Clinical Visit', rate: '₹500 / visit', sub: 'Dressing / Injections', badge: 'Advance' },
          ].map((item) => {
            const isSelected = activeIndex === item.idx;
            return (
              <button
                key={item.idx}
                type="button"
                onClick={() => handleSelectService(item.idx)}
                className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer relative overflow-hidden group ${
                  item.idx === 4 ? 'col-span-2 sm:col-span-1' : ''
                } ${
                  isSelected
                    ? 'bg-gradient-to-br from-teal-900 to-slate-900 text-white border-teal-700 shadow-lg shadow-teal-900/20 scale-[1.02]'
                    : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200 shadow-xs hover:border-teal-400'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    isSelected ? 'bg-amber-400 text-slate-950' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {item.badge}
                  </span>
                  <span className={`text-[11px] font-bold ${isSelected ? 'text-teal-300' : 'text-slate-400'}`}>
                    Tap to View
                  </span>
                </div>
                <p className={`text-xs font-black truncate ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                  {item.title}
                </p>
                <div className={`text-sm sm:text-base font-black font-mono mt-1 ${isSelected ? 'text-amber-300' : 'text-emerald-700'}`}>
                  {item.rate}
                </div>
                <div className={`text-[10px] font-medium mt-0.5 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                  {item.sub}
                </div>
              </button>
            );
          })}
        </div>

        {/* ======================================================================= */}
        {/* 3-PILLAR ADVANCE PAYMENT & REFUND SHIELD STRIP                           */}
        {/* ======================================================================= */}
        <div className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 font-black text-[#015498]">
            <ShieldCheck className="w-5 h-5 text-[#015498] shrink-0" />
            <span className="uppercase tracking-wider text-[11px]">Advance Payment Consumer Shield:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full md:w-auto text-slate-700 font-semibold">
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
              <strong>100% Refund</strong> if canceled 24h prior
            </span>
            <span className="flex items-center gap-1.5">
              <RotateCcw className="w-3.5 h-3.5 text-blue-600" />
              <strong>24h Free Replacement</strong> if unsatisfied
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-600" />
              <strong>98% On-Time</strong> staff deployment
            </span>
          </div>
        </div>

        {/* ======================================================================= */}
        {/* MOBILE VIEW: ALL SERVICES DISPLAYED ONE-BY-ONE SEQUENTIALLY (lg:hidden) */}
        {/* ======================================================================= */}
        <div className="block lg:hidden space-y-4 pt-1">
          <div className="flex items-center justify-between pb-1">
            <span className="text-xs font-black uppercase tracking-wider text-slate-700">
              All Clinical Offerings ({SERVICE_CATEGORIES.length})
            </span>
            <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
              Council Verified
            </span>
          </div>

          {SERVICE_CATEGORIES.map((s) => (
            <div
              key={s.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-md overflow-hidden flex flex-col"
            >
              {/* Image Banner with Live Pricing Badges */}
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  loading="lazy"
                  decoding="async"
                  src={s.image}
                  alt={s.title}
                  className={`w-full h-full object-cover ${s.objectPosition}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/15 to-transparent pointer-events-none" />

                {/* Badge top-left */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 text-slate-900 text-[10px] font-black shadow-sm">
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                    <span>{s.category}</span>
                  </span>
                </div>

                {/* Pricing bottom-left */}
                <div className="absolute bottom-2.5 left-3 right-3 z-10 flex items-end justify-between text-white">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-amber-300 block mb-0.5">Starting Rate</span>
                    <span className="text-xl font-black font-mono text-white leading-none">{s.hourlyHighlight}</span>
                  </div>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded bg-slate-900/80 border border-amber-400/40 text-amber-300">
                    Advance Payment
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 space-y-3.5">
                <div>
                  <h3 className="text-base font-black text-slate-900 leading-tight">
                    {s.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {s.subtitle}
                  </p>
                </div>

                {/* Clinical inclusions */}
                <div className="space-y-1.5 pt-1 border-t border-slate-100">
                  {s.inclusions.slice(0, 3).map((inc, i) => (
                    <div key={i} className="flex items-start gap-2 text-[11px] font-semibold text-slate-700">
                      <div className="w-3.5 h-3.5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5 text-emerald-700">
                        <Check className="w-2 h-2 stroke-[3]" />
                      </div>
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => openWhatsApp(`Hello Pulse n Care, I want to book ${s.category} (${s.hourlyHighlight}) at home.`)}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-black text-xs py-2.5 px-3 rounded-xl cursor-pointer shadow-sm transition-all active:scale-[0.98]"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5 fill-white" />
                    <span>Book on WhatsApp</span>
                  </button>

                  <Link
                    to={s.path}
                    className="flex items-center justify-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs py-2.5 px-3 rounded-xl border border-slate-200 transition-colors"
                  >
                    <span>Full Details</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ======================================================================= */}
        {/* DESKTOP VIEW: MASTER EDITORIAL 2-COLUMN SHOWCASE (hidden lg:grid)       */}
        {/* ======================================================================= */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-6 lg:gap-6 items-start">
          
          {/* ======================================================================= */}
          {/* LEFT SELECTOR STACK (Col 5)                                             */}
          {/* ======================================================================= */}
          <div className="hidden lg:flex flex-col space-y-2.5 lg:col-span-5">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 block mb-1">
              Select Care Discipline:
            </span>

            {SERVICE_CATEGORIES.map((s, index) => {
              const isSelected = index === activeIndex;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => handleSelectService(index)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between group relative overflow-hidden ${
                    isSelected
                      ? 'bg-white border-teal-600 shadow-[0_8px_24px_rgba(13,148,136,0.15)] ring-2 ring-teal-600/30'
                      : 'bg-white/80 hover:bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-teal-600" />
                  )}

                  <div className="flex items-center gap-3.5 pl-1">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-teal-700 text-white'
                          : 'bg-slate-100 text-slate-600 group-hover:text-teal-700 group-hover:bg-teal-50'
                      }`}
                    >
                      {s.icon}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3
                          className={`text-xs sm:text-sm font-black transition-colors ${
                            isSelected ? 'text-teal-900' : 'text-slate-900 group-hover:text-slate-950'
                          }`}
                        >
                          {s.category}
                        </h3>
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-1">{s.subtitle}</p>
                    </div>
                  </div>

                  <div className="text-right shrink-0 ml-3">
                    <span className="text-xs font-black text-emerald-700 block font-mono">
                      {s.hourlyHighlight}
                    </span>
                    <span className="text-[10px] text-amber-700 font-extrabold block">
                      Advance Basis
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* ======================================================================= */}
          {/* RIGHT SHOWCASE CARD (Col 7)                                             */}
          {/* ======================================================================= */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="flex flex-col"
              >
                {/* 1. Aspect-Ratio Photo Frame with Floating Badges */}
                <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/10] overflow-hidden bg-slate-100 border-b border-slate-200/80">
                  <img loading="lazy" decoding="async"
                    src={current.image}
                    alt={current.title}
                    className={`w-full h-full object-cover ${current.objectPosition} transition-transform duration-500 hover:scale-[1.02]`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent pointer-events-none" />

                  {/* Top Left Floating Credential Badge */}
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-10 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/95 text-teal-900 text-[10px] sm:text-[11px] font-black tracking-wide shadow-md border border-slate-200/90 backdrop-blur-md">
                      <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                      <span>{current.badge}</span>
                    </span>
                  </div>

                  {/* Bottom Price & Verified Roster Bar on Image */}
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-2 text-white">
                    <div>
                      <span className="text-[10px] sm:text-[11px] uppercase font-bold tracking-wider text-amber-300 block mb-0.5">
                        Selected Shift Advance Rate
                      </span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl sm:text-3xl font-black text-white font-mono">{activeShift.price}</span>
                        <span className="text-xs text-slate-200 font-semibold">{activeShift.priceUnit}</span>
                      </div>
                    </div>

                    <div className="inline-flex items-center self-start sm:self-auto gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-slate-900/90 border border-amber-400/40 text-amber-300 text-[10px] sm:text-[11px] font-black backdrop-blur-md shadow-md">
                      <Award className="w-3.5 h-3.5 text-amber-400" />
                      <span>Advance Payment Basis</span>
                    </div>
                  </div>
                </div>

                {/* 2. Structured Information Body */}
                <div className="p-5 sm:p-7 space-y-6">
                  {/* Title & Who It Is For */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-black uppercase tracking-wider text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-200">
                        {current.category}
                      </span>
                      <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200">
                        {current.tag}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                      {current.title}
                    </h3>
                    
                    <p className="text-xs sm:text-sm font-semibold text-teal-800">
                      {current.subtitle}
                    </p>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      <strong className="text-slate-900 font-bold">Ideal for: </strong>
                      {current.whoItIsFor}
                    </p>
                  </div>

                  {/* Standard Clinical Inclusions */}
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 block mb-2.5">
                      Standard Care Inclusions:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {current.inclusions.slice(0, 4).map((inc, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs font-semibold text-slate-700">
                          <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5 text-emerald-700">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                          <span>{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shift Selection & Rate Configurator */}
                  <div className="pt-3 border-t border-slate-100 space-y-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-extrabold text-slate-900 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-teal-600" />
                        <span>Select Shift Duration (Advance Payment Terms):</span>
                      </span>
                      <span className="text-[11px] font-mono text-teal-700 font-bold">
                        {activeShift.duration}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {current.shiftTiers.map((tier, tIdx) => {
                        const isTierActive = tIdx === selectedShiftIdx;
                        return (
                          <button
                            key={tier.id}
                            type="button"
                            onClick={() => setSelectedShiftIdx(tIdx)}
                            className={`p-3 rounded-2xl text-left border transition-all cursor-pointer relative overflow-hidden ${
                              isTierActive
                                ? 'bg-teal-50 border-teal-600 text-slate-900 shadow-xs ring-1 ring-teal-600/40'
                                : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                            }`}
                          >
                            {isTierActive && (
                              <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-teal-600 rounded-bl" />
                            )}
                            <div className="text-xs font-black truncate">{tier.name}</div>
                            <div className="flex items-center justify-between mt-1 text-[11px]">
                              <span className="font-mono font-bold text-teal-800">{tier.price}</span>
                              <span className="text-slate-500 font-medium">{tier.duration}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Hospital Savings Callout Box */}
                  <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-3.5 flex items-center justify-between text-xs">
                    <span className="text-emerald-900 font-bold">
                      💡 Hospital Room vs Home Care Comparison:
                    </span>
                    <span className="text-emerald-800 font-extrabold">
                      Save ₹5,000–₹8,000/day at home
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        openWhatsApp(
                          `Hello Pulse n Care Desk,\n\nI want to book *${current.title}* for *${activeShift.name}* (${activeShift.duration}) at *${activeShift.price}* (Advance Payment Basis).\n\nPlease check staff deployment availability in Delhi NCR.`
                        )
                      }
                      className="flex-1 flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs sm:text-sm font-black px-6 py-4 rounded-2xl cursor-pointer shadow-lg shadow-emerald-600/20 hover:scale-[1.02] transition-all"
                    >
                      <WhatsAppIcon className="w-4 h-4 fill-white" />
                      <span>Book on WhatsApp (Instant Desk)</span>
                    </button>

                    <a
                      href={`tel:${OFFICIAL_PHONE.replace(/\s+/g, '')}`}
                      className="inline-flex items-center justify-center gap-2 px-5 py-4 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm transition-all"
                    >
                      <PhoneCall className="w-4 h-4 text-teal-600" />
                      <span>Call Clinical Lead</span>
                    </a>

                    <Link
                      to={current.path}
                      className="inline-flex items-center justify-center gap-1.5 text-teal-800 hover:text-teal-950 font-bold text-xs sm:text-sm px-3 py-3 transition-colors"
                    >
                      <span>Full Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};
