import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Quote,
  Star,
  MapPin,
  HeartHandshake,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Phone,
  Building2,
  ArrowRight
} from 'lucide-react';
import { WhatsAppIcon } from '../common/WhatsAppButton';
import { openWhatsApp } from '../../utils/whatsapp';

export interface FamilyStory {
  id: string;
  category: 'post-op' | 'elderly' | 'critical' | 'maternity';
  categoryLabel: string;
  patientCondition: string;
  recoveryOutcome: string;
  quote: string;
  clientName: string;
  relationship: string;
  location: string;
  duration: string;
  rating: number;
  initials: string;
  initialsColor: string;
}

export const FAMILY_STORIES: FamilyStory[] = [
  {
    id: 'post-stroke-gurgaon',
    category: 'elderly',
    categoryLabel: 'Elder & Palliative',
    patientCondition: 'Post-Stroke 24/7 Live-In Bedside Care',
    recoveryOutcome: '98% On-Time Staff Deployment & Punctual Care',
    quote:
      'The 24/7 nursing care provided for my father post-stroke was exceptional. The staff was professional, punctual, and truly caring. Having reliable round-the-clock vitals monitoring and compassionate assistance gave our family complete peace of mind.',
    clientName: 'Yogesh Sharma',
    relationship: 'Son of patient',
    location: 'Gurgaon, Delhi NCR',
    duration: '24/7 Live-In Nursing Care',
    rating: 5,
    initials: 'YS',
    initialsColor: 'bg-[#015498] text-white'
  },
  {
    id: 'post-tkr',
    category: 'post-op',
    categoryLabel: 'Post-Operative',
    patientCondition: 'Post-TKR Bilateral Knee Replacement Care',
    recoveryOutcome: 'Full Independent Ambulation Restored in 21 Days',
    quote:
      'Finding a council-registered nurse who actually adhered to surgical sterile protocols for daily wound dressings was our biggest priority. Sister Anita from Pulse n Care was punctual, gentle with my mother, and logged vitals every single shift. Zero infection and smooth mobilization.',
    clientName: 'Rajiv Khanna',
    relationship: 'Son of patient (Age 68)',
    location: 'DLF Phase 4, Gurugram',
    duration: '21 Days Post-Op Nursing',
    rating: 5,
    initials: 'RK',
    initialsColor: 'bg-blue-600 text-white'
  },
  {
    id: 'hospital-discharge-vasantkunj',
    category: 'post-op',
    categoryLabel: 'Post-Operative',
    patientCondition: 'Post-CABG Cardiac Surgical Recovery at Home',
    recoveryOutcome: 'Sterile Sternal Dressing & Seamless Hospital Discharge',
    quote:
      'When my mother was discharged post cardiac bypass, managing chest drain monitoring and sternal dressing at home felt overwhelming. Alka Suman and the operations desk coordinated directly with our hospital discharge team. The assigned nurse arrived within 2 hours of ambulance arrival. Flawless care.',
    clientName: 'Ananya Deshmukh',
    relationship: 'Daughter of patient',
    location: 'Vasant Kunj, South Delhi',
    duration: '28 Days 24/7 Cardiac Care',
    rating: 5,
    initials: 'AD',
    initialsColor: 'bg-rose-600 text-white'
  },
  {
    id: 'elderly-bedridden',
    category: 'elderly',
    categoryLabel: 'Elder & Palliative',
    patientCondition: 'Elderly Bedridden & Stroke Mobility Care',
    recoveryOutcome: 'Zero Bedsore Incidents Across 6 Months Bedside Care',
    quote:
      'After my 82-year-old father suffered an ischemic stroke, we needed a continuous attendant who understood 2-hourly lateral turning and skin care. Attendant Ramesh took care of him with immense dignity. Having a central desk on WhatsApp for shift coordination gave us complete peace of mind.',
    clientName: 'Dr. Sunita Mehra',
    relationship: 'Daughter of patient (Age 82)',
    location: 'Greater Kailash II, New Delhi',
    duration: '6 Months 12h Day Attendant',
    rating: 5,
    initials: 'SM',
    initialsColor: 'bg-emerald-600 text-white'
  },
  {
    id: 'palliative-dementia-dwarka',
    category: 'elderly',
    categoryLabel: 'Elder & Palliative',
    patientCondition: 'Advanced Dementia & Compassionate Palliative Support',
    recoveryOutcome: 'Gentle De-escalation & Zero Patient Fall Incidents',
    quote:
      'Care for dementia patients demands extraordinary patience and psychological training. The male attendant deployed by Pulse n Care never lost his calm, assisted my father with respectful sponge baths, and kept his medication strictly on schedule. Sachin Gautam’s team truly lives their patient safety ethos.',
    clientName: 'Col. R. S. Bhatia',
    relationship: 'Son of patient (Age 86)',
    location: 'Sector 12, Dwarka, New Delhi',
    duration: '5 Months Live-In Care',
    rating: 5,
    initials: 'RB',
    initialsColor: 'bg-amber-600 text-white'
  },
  {
    id: 'tracheostomy-care',
    category: 'critical',
    categoryLabel: 'Hospital & Critical',
    patientCondition: 'Tracheostomy & Critical Recovery at Home',
    recoveryOutcome: 'Safe Weaning & Zero Aspiration Emergencies',
    quote:
      'Transitioning from the ICU to home was frightening. The ICU nurse sent by Pulse n Care handled suctioning, BiPAP synchronization, and tube hygiene with complete hospital-grade competence. Highly structured daily digital handover reports.',
    clientName: 'Vikram Singhania',
    relationship: 'Family Caregiver',
    location: 'Sector 50, Noida',
    duration: '45 Days ICU Home Support',
    rating: 5,
    initials: 'VS',
    initialsColor: 'bg-purple-600 text-white'
  },
  {
    id: 'institutional-partner-gurugram',
    category: 'critical',
    categoryLabel: 'Hospital & Critical',
    patientCondition: 'Physician Endorsement & Hospital Handover',
    recoveryOutcome: 'Verified Nursing Council Roster & Timely Vitals Escalation',
    quote:
      'As a consulting physician, my primary concern when referring home care is medication accuracy and timely escalation if vitals deviate. Alka Suman’s operational coordination ensures verified nurses with updated chartings and transparent doctor sync. Pulse n Care has become our trusted discharge partner.',
    clientName: 'Dr. Arvind Nanda',
    relationship: 'Consulting Physician & Partner',
    location: 'Cyber City, Gurugram',
    duration: 'Institutional Referral Partner',
    rating: 5,
    initials: 'AN',
    initialsColor: 'bg-sky-700 text-white'
  },
  {
    id: 'mother-newborn-noida',
    category: 'maternity',
    categoryLabel: 'Mother & Baby',
    patientCondition: 'Mother & Newborn Postpartum Recovery',
    recoveryOutcome: 'Hygienic Infant Care & Soothing Postpartum Nutrition',
    quote:
      'After my C-section, having an experienced mother-and-baby nurse made a world of difference. She assisted with gentle newborn massages, feeding latch guidance, and sterile wound care for myself. Reliable, hygienic, and very polite.',
    clientName: 'Pooja & Sameer Verma',
    relationship: 'New Parents',
    location: 'Sector 62, Noida',
    duration: '30 Days Postpartum Care',
    rating: 5,
    initials: 'PV',
    initialsColor: 'bg-teal-600 text-white'
  }
];

export const TestimonialsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'post-op' | 'elderly' | 'critical' | 'maternity'>('all');
  const [expandedView, setExpandedView] = useState(false);

  const filteredStories = activeFilter === 'all'
    ? FAMILY_STORIES
    : FAMILY_STORIES.filter((s) => s.category === activeFilter);

  const featured = filteredStories[0] || FAMILY_STORIES[0];
  const supporting = filteredStories.slice(1);
  const displayedSupporting = expandedView ? supporting : supporting.slice(0, 3);

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-[#F8FAFC] to-white border-b border-slate-200/90 text-left relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 max-w-5xl">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-[#015498] text-[11px] font-extrabold uppercase tracking-wider border border-blue-200">
              <HeartHandshake className="w-3.5 h-3.5 text-[#015498]" />
              <span>PATIENT CARE RECOVERY · VERIFIED EXPERIENCES</span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-900 tracking-[-0.02em] leading-tight">
              Documented Family &amp; Clinical Care Experiences
            </h2>

            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium max-w-2xl">
              Read verified feedback from families and consulting physicians across Delhi NCR who trusted Pulse n Care for post-operative recovery, elder care, ICU home support, and maternity care.
            </p>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200/90 shadow-2xs text-xs font-bold text-slate-700 self-start md:self-end">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>98% On-Time Deployment Rate · 5.0 ★ Rated</span>
          </div>
        </div>

        {/* Filter Category Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {[
            { id: 'all', label: `All Reviews (${FAMILY_STORIES.length})` },
            { id: 'post-op', label: 'Post-Operative Care' },
            { id: 'elderly', label: 'Elder & Palliative Care' },
            { id: 'critical', label: 'Hospital & Critical Care' },
            { id: 'maternity', label: 'Mother & Newborn' }
          ].map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveFilter(tab.id as typeof activeFilter);
                  setExpandedView(false);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#015498] text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Editorial Layout: 1 Featured Highlight + Supporting Cards Stack */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Main Featured Editorial Card (Col 7) */}
          <motion.div
            key={featured.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-[0_8px_30px_rgba(5,15,51,0.06)] flex flex-col justify-between gap-6 relative overflow-hidden"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-[#015498] bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200">
                  {featured.patientCondition}
                </span>

                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(featured.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
              </div>

              {/* Recovery Milestone Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Documented Clinical Outcome: {featured.recoveryOutcome}</span>
              </div>

              <div className="relative">
                <Quote className="w-12 h-12 text-blue-100 absolute -top-4 -left-3 -z-0" />
                <p className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed relative z-10 pl-6 border-l-2 border-[#015498]">
                  "{featured.quote}"
                </p>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-full ${featured.initialsColor} font-black text-sm flex items-center justify-center shadow-sm`}>
                  {featured.initials}
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">{featured.clientName}</h3>
                  <p className="text-xs text-slate-500 font-medium">{featured.relationship}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#015498]" />
                  {featured.location}
                </span>
                <span className="text-slate-300">•</span>
                <span className="font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
                  {featured.duration}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Supporting Cards Stack (Col 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            {displayedSupporting.map((story, sIdx) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: sIdx * 0.1 }}
                className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-[0_4px_20px_rgba(5,15,51,0.04)] flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-md">
                      {story.patientCondition}
                    </span>
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[...Array(story.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                  </div>

                  <div className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-100 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span className="truncate">{story.recoveryOutcome}</span>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed font-normal line-clamp-3">
                    "{story.quote}"
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-full ${story.initialsColor} font-black text-xs flex items-center justify-center`}>
                      {story.initials}
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block leading-tight">{story.clientName}</span>
                      <span className="text-slate-500 text-[10px]">{story.relationship}</span>
                    </div>
                  </div>
                  <span className="text-slate-500 font-medium text-[10px]">{story.location}</span>
                </div>
              </motion.div>
            ))}

            {supporting.length > 3 && (
              <button
                type="button"
                onClick={() => setExpandedView(!expandedView)}
                className="w-full py-2.5 px-4 text-xs font-bold text-[#015498] bg-blue-50/70 hover:bg-blue-100/70 border border-blue-200/70 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>{expandedView ? 'Show Fewer Reviews' : `View All ${filteredStories.length} Reviews`}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>

        {/* Executive Leadership Commitment Banner (Sachin Gautam, Smt. Ishwari & Alka Suman) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="bg-gradient-to-br from-[#050F33] via-[#015498] to-[#071746] rounded-3xl p-4 sm:p-8 text-white shadow-xl relative overflow-hidden border border-white/10 flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6"
        >
          {/* 3 Leadership Avatars */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0 w-full lg:w-auto">
            <div className="flex -space-x-3 sm:-space-x-4 shrink-0">
              <div className="relative">
                <img
                  loading="lazy"
                  decoding="async"
                  src="/assets/images/team/sachin-gautam-founder-ceo.jpg"
                  alt="Sachin Gautam - Founder & CEO"
                  className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl object-cover object-top border-2 border-amber-300/80 shadow-2xl ring-2 sm:ring-4 ring-amber-400/20"
                />
                <span className="absolute -bottom-1 -right-1 bg-[#25D366] text-white p-0.5 rounded-full border border-white/20">
                  <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </span>
              </div>
              <div className="relative">
                <img
                  loading="lazy"
                  decoding="async"
                  src="/assets/images/founder/smt-ishwari-ceo-portrait.webp"
                  alt="Smt. Ishwari - Co-Founder & Chief Care Specialist"
                  className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl object-cover object-top border-2 border-rose-300/80 shadow-2xl ring-2 sm:ring-4 ring-rose-400/20"
                />
                <span className="absolute -bottom-1 -right-1 bg-rose-500 text-white p-0.5 rounded-full border border-white/20">
                  <HeartHandshake className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </span>
              </div>
              <div className="relative">
                <img
                  loading="lazy"
                  decoding="async"
                  src="/assets/images/team/alka-suman-operations-manager.jpg"
                  alt="Alka Suman - Operations Manager"
                  className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl object-cover object-top border-2 border-sky-300/80 shadow-2xl ring-2 sm:ring-4 ring-sky-400/20"
                />
                <span className="absolute -bottom-1 -right-1 bg-[#015498] text-white p-0.5 rounded-full border border-white/20">
                  <Building2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </span>
              </div>
            </div>
            
            <div className="text-left min-w-0">
              <div className="text-xs sm:text-sm font-black text-white truncate">Sachin, Ishwari &amp; Alka</div>
              <div className="text-[11px] sm:text-xs text-sky-200 font-medium truncate">Core Leadership &amp; Care Team</div>
              <div className="text-[10px] text-slate-300 mt-0.5 hidden sm:block">Founder &amp; CEO · Co-Founder · Operations &amp; BD</div>
            </div>
          </div>

          <div className="space-y-2 text-center lg:text-left flex-1 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-sky-200 text-[11px] font-black uppercase tracking-wider border border-white/15">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>DIRECT EXECUTIVE PATIENT SAFETY &amp; HOSPITAL STANDARDS</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-medium">
              “Every nurse and caregiver at Pulse n Care is deployed with verified council credentials, doctor prescription sync, and 24x7 operational coordination. We personally stand behind the recovery, dignity, and comfort of your family members.”
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-2.5 w-full lg:w-auto">
            <button
              type="button"
              onClick={() => openWhatsApp('Hello Sachin Gautam, Smt. Ishwari and Alka Suman, I would like to consult directly regarding home nursing assistance for my family member.')}
              className="flex items-center justify-center gap-2 btn-emerald-aura btn-shimmer text-white font-black text-xs sm:text-sm px-6 py-3 rounded-xl cursor-pointer"
            >
              <WhatsAppIcon className="w-4 h-4 text-white fill-white shrink-0" />
              <span>WhatsApp Duty Desk</span>
            </button>

            <a
              href="tel:+919211765429"
              className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-5 py-2.5 rounded-xl border border-white/20 transition-all text-center"
            >
              <Phone className="w-3.5 h-3.5 text-sky-300" />
              <span>+91 921 176 5429</span>
            </a>

            <a
              href="#founder-ceo"
              className="text-center text-xs font-bold text-sky-200 hover:text-white underline pt-0.5"
            >
              Read Full Leadership Profiles →
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
