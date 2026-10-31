import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star, MapPin, HeartHandshake, ShieldCheck, CheckCircle2, Sparkles, Phone, Mail } from 'lucide-react';
import { WhatsAppIcon } from '../common/WhatsAppButton';
import { openWhatsApp } from '../../utils/whatsapp';

interface FamilyStory {
  id: string;
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

const FAMILY_STORIES: FamilyStory[] = [
  {
    id: 'post-stroke-gurgaon',
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
    id: 'elderly-bedridden',
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
    id: 'tracheostomy-care',
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
  }
];

export const TestimonialsSection: React.FC = () => {
  const featured = FAMILY_STORIES[0];
  const supporting = FAMILY_STORIES.slice(1);

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-[#F8FAFC] to-white border-b border-slate-200/90 text-left relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 max-w-4xl">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-[#015498] text-[11px] font-extrabold uppercase tracking-wider border border-blue-200">
              <HeartHandshake className="w-3.5 h-3.5 text-[#015498]" />
              <span>PATIENT CARE RECOVERY</span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl lg:text-3xl font-semibold text-slate-900 tracking-[-0.02em] leading-tight">
              Documented Family Care Experiences
            </h2>

            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium max-w-2xl">
              Read verified feedback from families across Delhi NCR who trusted our managed nursing and bedside care teams during acute post-hospital recovery and chronic elder care.
            </p>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200/90 shadow-2xs text-xs font-bold text-slate-700 self-start md:self-end">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>98% On-Time Deployment Rate · Verified Reviews</span>
          </div>
        </div>

        {/* Editorial Layout: 1 Featured Highlight + 2 Supporting Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Main Featured Editorial Card (Col 7) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-7 bg-white rounded-2xl p-5 sm:p-7 border border-slate-200/90 shadow-[0_8px_30px_rgba(5,15,51,0.06)] flex flex-col justify-center gap-6 relative overflow-hidden"
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

            <div className="pt-6 mt-8 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
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

          {/* 2 Supporting Cards Stack (Col 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            {supporting.map((story, sIdx) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (sIdx + 1) * 0.15 }}
                className="bg-white rounded-2xl p-6 sm:p-5 border border-slate-200/90 shadow-[0_4px_20px_rgba(5,15,51,0.04)] flex flex-col justify-between flex-1 space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black uppercase tracking-wider text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-md">
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
                    <span>{story.recoveryOutcome}</span>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed font-normal">
                    "{story.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-full ${story.initialsColor} font-black text-xs flex items-center justify-center`}>
                      {story.initials}
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block">{story.clientName}</span>
                      <span className="text-slate-500">{story.relationship}</span>
                    </div>
                  </div>
                  <span className="text-slate-500 font-medium">{story.location}</span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

        {/* Founder & CEO Clinical Leadership Guarantee & Bilingual Review */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="bg-gradient-to-br from-[#050F33] via-[#015498] to-[#071746] rounded-2xl p-5 sm:p-6 text-white shadow-xl relative overflow-hidden border border-white/10 flex flex-col md:flex-row items-center gap-6"
        >
          <div className="relative shrink-0">
            <img loading="lazy" decoding="async"
              src="/assets/images/founder/smt-ishwari-ceo-portrait.webp"
              alt="Smt. Ishwari - Founder & CEO"
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover object-top border-2 border-amber-300/80 shadow-2xl ring-4 ring-amber-400/20"
            />
            <div className="absolute -bottom-2 -right-2 bg-[#25D366] text-white p-1 rounded-full shadow-md border border-white/20">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>

          <div className="space-y-2 text-center md:text-left flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-sky-200 text-[11px] font-black uppercase tracking-wider border border-white/15">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>FOUNDER & CEO CLINICAL DIRECTIVE • 20+ YEARS EXPERIENCE</span>
            </div>

            <h3 className="text-lg sm:text-xl font-black text-white">
              Smt. Ishwari | श्रीमती ईश्वरी
            </h3>

            <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-medium">
              “पैलिएटिव केयर, हॉस्पिस केयर, विशेष देखभाल वाले मरीजों और नवजात शिशु एवं माता की देखभाल में 20 से अधिक वर्षों के अनुभव के साथ एक समर्पित विशेषज्ञ। श्रीमती ईश्वरी अस्पतालों और घर पर चौबीसों घंटे विश्वसनीय देखभाल व अटेंडेंट सेवाएं देती हैं, जिससे मरीजों को आराम और परिवारों को पूर्ण सुरक्षा व निश्चिंतता मिलती है।”
            </p>

            <p className="text-[11px] text-sky-200/90 italic">
              “Two decades of excellence in palliative, hospice, special needs, and mother-and-newborn care ensuring comfort, safety, and peace of mind for every family.”
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row md:flex-col gap-2.5 w-full md:w-auto">
            <button
              type="button"
              onClick={() => openWhatsApp('Hello Smt. Ishwari and Pulse n Care Team, I would like to consult directly regarding patient care.')}
              className="flex items-center justify-center gap-2 btn-emerald-aura btn-shimmer text-white font-black text-xs sm:text-sm px-7 py-3.5 rounded-xl cursor-pointer"
            >
              <WhatsAppIcon className="w-4 h-4 text-white fill-white shrink-0" />
              <span>WhatsApp Desk</span>
            </button>

            <a
              href="tel:+919211765429"
              className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-5 py-2.5 rounded-xl border border-white/20 transition-all text-center"
            >
              <Phone className="w-3.5 h-3.5 text-sky-300" />
              <span>+91 92117 65429</span>
            </a>

            <a
              href="mailto:pulsencare@gmail.com"
              className="flex items-center justify-center gap-1.5 text-slate-300 hover:text-white font-medium text-[11px] py-1 transition-all text-center"
            >
              <Mail className="w-3 h-3 text-rose-400" />
              <span>pulsencare@gmail.com</span>
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
