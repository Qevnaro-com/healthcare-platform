import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award,
  ShieldCheck,
  Sparkles,
  ChevronRight,
  Languages,
  Phone,
  Mail
} from 'lucide-react';
import { WhatsAppIcon } from '../common/WhatsAppButton';
import { openWhatsApp } from '../../utils/whatsapp';

export const FounderCeoSpotlight: React.FC = () => {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [photoView, setPhotoView] = useState<'executive' | 'caregiver'>('executive');
  const [activeDirective, setActiveDirective] = useState<number>(0);

  const clinicalDirectives = [
    {
      titleEn: 'Aseptic Bed-Bath & Skin Hygiene',
      titleHi: 'व्यक्तिगत स्वच्छता व स्पंज बाथ प्रोटोकॉल',
      descEn: 'Meticulous 2-hour repositioning routines and daily anti-septic sponge baths to maintain complete skin integrity and completely prevent bed-sores in bedridden patients.',
      descHi: 'बेडरिडन मरीजों में बेड-सोर से पूर्ण बचाव के लिए हर 2 घंटे में करवट बदलना, नियमित स्पंज बाथ और त्वचा की वैज्ञानिक सुरक्षा।',
      tag: 'Directive 01'
    },
    {
      titleEn: 'Palliative Comfort & Vitals Escalation',
      titleHi: 'पैलिएटिव पीड़ा निवारण व वाइटल्स मॉनिटरिंग',
      descEn: 'Doctor-synced symptom relief and continuous digital monitoring of BP, SpO2, and glucose, ensuring immediate medical officer escalation if readings deviate.',
      descHi: 'डॉक्टर की पर्ची अनुसार समय पर दवाइयों का प्रबंधन, वाइटल्स (बीपी, शुगर, ऑक्सीजन) की निगरानी और इमरजेंसी में तुरंत डॉक्टर से संपर्क।',
      tag: 'Directive 02'
    },
    {
      titleEn: 'Senior Fall Prevention & Mobility Aid',
      titleHi: 'बुजुर्गों की सुरक्षा व गिरने से बचाव',
      descEn: 'Dedicated companion support during every bathroom visit and walking routine, eliminating slip hazards and restoring senior movement confidence.',
      descHi: 'शौचालय जाने व चलने में सहारा, फिसलने के जोखिम को खत्म करना और बुजुर्गों के साथ सम्मानजनक व आत्मीय साथी की तरह रहना।',
      tag: 'Directive 03'
    },
    {
      titleEn: 'Infant Massage & Postpartum Recovery',
      titleHi: 'शिशु मालिश व प्रसवोपरांत माता की सेवा',
      descEn: 'Traditional yet scientifically guided infant massage, gentle baby bathing, feeding posture guidance, and soothing nutritional care for new mothers.',
      descHi: 'नवजात शिशु की वैज्ञानिक व पारंपरिक मालिश, सुरक्षित स्नान, फीडिंग में मदद और नई माता की प्रसवोपरांत रिकवरी में विशेष देखभाल।',
      tag: 'Directive 04'
    }
  ];

  const photoUrl =
    photoView === 'executive'
      ? '/assets/images/founder/smt-ishwari-ceo-portrait.webp'
      : '/assets/images/founder/smt-ishwari-caregiver-uniform.webp';

  return (
    <section id="founder-ceo" className="py-12 sm:py-16 bg-gradient-to-b from-white via-slate-50 to-[#F8FAFC] border-b border-slate-200/90 text-left relative overflow-hidden">
      {/* Background Spatial Atmosphere (Desktop only to prevent mobile GPU lag) */}
      <div className="hidden sm:block absolute top-0 right-1/4 w-[480px] h-[480px] bg-sky-100/40 rounded-full blur-[130px] pointer-events-none" />
      <div className="hidden sm:block absolute bottom-0 left-1/4 w-[420px] h-[420px] bg-rose-100/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        
        {/* Top Header & Bilingual Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-slate-200/60">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-[#015498] text-xs font-black uppercase tracking-wider border border-blue-200">
              <Award className="w-4 h-4 text-[#015498]" />
              <span>LEADERSHIP & CLINICAL DIRECTIVE</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-900 tracking-[-0.02em] leading-tight">
              {language === 'en' ? (
                <>
                  Care with Heart. Led by <span className="text-[#015498]">Experience.</span>
                </>
              ) : (
                <>
                  समर्पण और अनुभव से सिंचित <span className="text-[#015498]">सच्ची देखभाल।</span>
                </>
              )}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base font-medium max-w-2xl">
              {language === 'en'
                ? 'Meet the heart, founder, and chief driving force behind Pulse n Care’s patient-first bedside ethos.'
                : 'पल्स एन केयर (Pulse n Care) की संस्थापक व मुख्य कार्यकारी अधिकारी, जिनका 20 वर्षों का अनुभव हर मरीज को सुरक्षा देता है।'}
            </p>
          </div>

          {/* Language Toggle Control */}
          <div className="flex items-center gap-2 p-1.5 bg-white border border-slate-200 rounded-2xl shadow-xs self-start md:self-auto">
            <span className="text-xs font-bold text-slate-500 pl-2 pr-1 flex items-center gap-1.5">
              <Languages className="w-3.5 h-3.5 text-[#015498]" />
              <span>Language:</span>
            </span>
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-3 py-1.5 text-xs font-black rounded-xl transition-all cursor-pointer ${
                language === 'en'
                  ? 'bg-[#015498] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => setLanguage('hi')}
              className={`px-3 py-1.5 text-xs font-black rounded-xl transition-all cursor-pointer ${
                language === 'hi'
                  ? 'bg-[#C31725] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              हिंदी (Hindi)
            </button>
          </div>
        </div>

        {/* Hero Leadership Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/90 shadow-xl relative overflow-hidden">
          
          {/* Left Column: Authentic Photography with Badge (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-[290px] group">
              {/* Decorative Frame Glow */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#015498]/20 via-sky-300/30 to-[#C31725]/20 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition duration-500" />

              <div className="relative rounded-2xl overflow-hidden border-2 border-amber-300/70 ring-4 ring-amber-400/20 shadow-2xl bg-slate-900 aspect-[4/5]">
                <img loading="lazy" decoding="async"
                  src={photoUrl}
                  alt="Smt. Ishwari - Founder & CEO of Pulse n Care"
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-102"
                />

                {/* Branded Watermark Emblem */}
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-md flex items-center gap-2">
                  <img loading="lazy" decoding="async"
                    src="/assets/brand/pulse-n-care/pulse-n-care-favicon-32.png"
                    alt="Pulse n Care"
                    className="w-4 h-4 object-contain"
                  />
                  <span className="text-[11px] font-black tracking-wider text-[#015498]">PULSE N CARE</span>
                </div>

                {/* 20+ Years Verified Pill */}
                <div className="absolute bottom-3 inset-x-3 bg-slate-950/85 backdrop-blur-md rounded-xl p-3 border border-white/15 text-white flex items-center justify-between shadow-xl">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center text-[#25D366]">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-white">20+ Years Experience</div>
                      <div className="text-[11px] text-slate-300 font-medium">Hospice, Palliative & Newborn Care</div>
                    </div>
                  </div>
                  <div className="h-2 w-2 rounded-full bg-[#25D366] animate-pulse" />
                </div>
              </div>

              {/* Portrait Toggle Controls */}
              <div className="flex items-center justify-center gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setPhotoView('executive')}
                  className={`text-[11px] font-bold px-3 py-1 rounded-lg border transition-all cursor-pointer ${
                    photoView === 'executive'
                      ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  Founder & CEO
                </button>
                <button
                  type="button"
                  onClick={() => setPhotoView('caregiver')}
                  className={`text-[11px] font-bold px-3 py-1 rounded-lg border transition-all cursor-pointer ${
                    photoView === 'caregiver'
                      ? 'bg-[#015498] text-white border-[#015498] shadow-2xs'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  Lead Care Specialist
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Bio, Review & Mission (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Title & Role */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-black border border-emerald-200">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>FOUNDER & CHIEF EXECUTIVE OFFICER (CEO)</span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-3xl font-black text-slate-950 tracking-tight">
                {language === 'en' ? 'Smt. Ishwari' : 'श्रीमती ईश्वरी'}
              </h3>

              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#015498]">
                <span>
                  {language === 'en'
                    ? '20+ Years of Compassionate Caregiving Excellence'
                    : '20 से अधिक वर्षों का समर्पित एवं करुणामयी देखभाल अनुभव'}
                </span>
              </div>
            </div>

            {/* Official Review / Bio Quote */}
            <AnimatePresence mode="wait">
              {language === 'en' ? (
                <motion.div
                  key="en-content"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <blockquote className="text-slate-800 text-sm sm:text-base leading-relaxed font-medium bg-blue-50/50 p-5 rounded-2xl border-l-4 border-[#015498]">
                    “A highly experienced specialist with two decades of excellence in palliative, hospice, special needs, and mother-and-newborn care. Smt. Ishwari provides reliable, around-the-clock patient assistance and hospital/home bystander services, ensuring comfort, safety, and peace of mind for every family.”
                  </blockquote>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Under her personal vision, Pulse n Care was built not merely as an agency, but as an empathetic clinical family. Every caregiver, nurse, and attendant is trained in her time-tested principles of patient dignity, meticulous bed-bath hygiene, fall prevention, and respectful bedside communication.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="hi-content"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <blockquote className="text-slate-900 text-sm sm:text-base leading-relaxed font-semibold bg-rose-50/50 p-5 rounded-2xl border-l-4 border-[#C31725]">
                    “पैलिएटिव केयर, हॉस्पिस केयर, विशेष देखभाल वाले मरीजों और नवजात शिशु एवं माता की देखभाल में 20 से अधिक वर्षों के अनुभव के साथ एक समर्पित विशेषज्ञ। श्रीमती ईश्वरी अस्पतालों और घर पर चौबीसों घंटे विश्वसनीय देखभाल व अटेंडेंट सेवाएं देती हैं, जिससे मरीजों को आराम और परिवारों को पूर्ण सुरक्षा व निश्चिंतता मिलती है।”
                  </blockquote>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    उनके व्यक्तिगत मार्गदर्शन में, पल्स एन केयर हर मरीज को अपने परिवार का सदस्य मानकर सेवा प्रदान करता है। व्यक्तिगत स्वच्छता, स्पंज बाथ, बेड-सोर से बचाव, समय पर दवाइयों का प्रबंधन और करुणामयी देखभाल उनकी सर्वोच्च प्राथमिकता है।
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 11/10 Interactive Clinical Directives System */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                <span className="flex items-center gap-1.5 text-[#015498]">
                  <Sparkles className="w-3.5 h-3.5 text-[#015498]" />
                  <span>{language === 'en' ? "Founder's 4 Bedside Clinical Directives:" : 'संस्थापक के 4 मुख्य देखभाल सिद्धांत:'}</span>
                </span>
                <span className="text-[11px] font-mono text-slate-500">
                  {activeDirective + 1} / 4
                </span>
              </div>

              {/* Directive Selector Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                {clinicalDirectives.map((d, dIdx) => {
                  const isActive = dIdx === activeDirective;
                  return (
                    <button
                      key={d.tag}
                      type="button"
                      onClick={() => setActiveDirective(dIdx)}
                      className={`px-2.5 py-1.5 rounded-lg text-left border transition-all cursor-pointer text-[11px] font-bold truncate ${
                        isActive
                          ? 'bg-[#015498] text-white border-[#015498] shadow-xs'
                          : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200/70'
                      }`}
                    >
                      <span>{language === 'en' ? d.titleEn.split(' ')[0] + ' ' + (d.titleEn.split(' ')[1] || '') : d.titleHi.split(' ')[0] + ' ' + (d.titleHi.split(' ')[1] || '')}</span>
                    </button>
                  );
                })}
              </div>

              {/* Active Directive Display Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50/70 via-white to-slate-50 border border-blue-200/70 space-y-1.5 shadow-2xs">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold text-[#015498]">
                    {language === 'en' ? clinicalDirectives[activeDirective].titleEn : clinicalDirectives[activeDirective].titleHi}
                  </span>
                  <span className="text-[11px] font-mono font-bold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {clinicalDirectives[activeDirective].tag}
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-normal">
                  {language === 'en' ? clinicalDirectives[activeDirective].descEn : clinicalDirectives[activeDirective].descHi}
                </p>
              </div>
            </div>

            {/* Direct Executive Contact Strip */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 p-3.5 rounded-2xl bg-gradient-to-r from-blue-50/70 via-slate-50 to-rose-50/50 border border-slate-200/90 text-xs text-slate-700">
              <span className="font-extrabold text-[#015498] text-[11px] uppercase tracking-wider">
                Direct Desk:
              </span>
              <a
                href="tel:+919211765429"
                className="inline-flex items-center gap-1.5 font-black text-slate-900 hover:text-[#015498] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#25D366]" />
                <span>+91 92117 65429</span>
              </a>
              <span className="text-slate-300 hidden sm:inline">•</span>
              <a
                href="mailto:pulsencare@gmail.com"
                className="inline-flex items-center gap-1.5 font-bold text-slate-700 hover:text-[#C31725] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-rose-500" />
                <span>pulsencare@gmail.com</span>
              </a>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3">
              <button
                type="button"
                onClick={() =>
                  openWhatsApp(
                    language === 'en'
                      ? 'Hello Smt. Ishwari and Pulse n Care Team, I would like to consult regarding home caregiving assistance for my family member.'
                      : 'नमस्ते श्रीमती ईश्वरी जी एवं Pulse n Care टीम, मुझे अपने मरीज/परिवार के सदस्य की होम केयर के लिए परामर्श चाहिए।'
                  )
                }
                className="flex items-center justify-center gap-2.5 btn-emerald-aura btn-shimmer text-white font-black text-sm px-7 py-3.5 rounded-xl cursor-pointer"
              >
                <WhatsAppIcon className="w-5 h-5 text-white fill-white shrink-0" />
                <span>
                  {language === 'en' ? 'Consult with Care Team on WhatsApp' : 'व्हाट्सएप पर सीधी सलाह लें'}
                </span>
              </button>

              <a
                href="#core-services"
                className="flex items-center justify-center gap-2 btn-glass-frost font-bold text-sm px-6 py-3.5 rounded-xl cursor-pointer"
              >
                <span>{language === 'en' ? 'View 5 Core Services' : '5 प्रमुख सेवाएं देखें'}</span>
                <ChevronRight className="w-4 h-4 text-slate-600" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
