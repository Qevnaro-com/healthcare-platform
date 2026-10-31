import React, { Suspense, lazy, useState } from 'react';
import { LazySection } from '../../components/common/LazySection';
import { usePageMeta } from '../../hooks/usePageMeta';
import { submitCallbackLead } from '../../utils/leads';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { PulseLine } from '../../components/common/PulseUI';
import { WhatsAppIcon } from '../../components/common/WhatsAppButton';
import { openWhatsApp } from '../../utils/whatsapp';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

// Newly Engineered Modular Clinical Sections
import { CredibilityStrip } from '../../components/home/CredibilityStrip';
const AboutMissionVisionSection = lazy(() => import('../../components/home/AboutMissionVisionSection').then((m) => ({ default: m.AboutMissionVisionSection })));
const ServiceDiscoverySection = lazy(() => import('../../components/home/ServiceDiscoverySection').then((m) => ({ default: m.ServiceDiscoverySection })));
const FounderCeoSpotlight = lazy(() => import('../../components/home/FounderCeoSpotlight').then((m) => ({ default: m.FounderCeoSpotlight })));
const ClinicalDispatchTimeline = lazy(() => import('../../components/home/ClinicalDispatchTimeline').then((m) => ({ default: m.ClinicalDispatchTimeline })));
const ClinicalGovernanceSection = lazy(() => import('../../components/home/ClinicalGovernanceSection').then((m) => ({ default: m.ClinicalGovernanceSection })));
const ClinicalBentoGrid3D = lazy(() => import('../../components/home/ClinicalBentoGrid3D').then((m) => ({ default: m.ClinicalBentoGrid3D })));
const CostCalculatorSection = lazy(() => import('../../components/home/CostCalculatorSection').then((m) => ({ default: m.CostCalculatorSection })));
const TestimonialsSection = lazy(() => import('../../components/home/TestimonialsSection').then((m) => ({ default: m.TestimonialsSection })));
const FAQSection = lazy(() => import('../../components/home/FAQSection').then((m) => ({ default: m.FAQSection })));
const ClosingCTASection = lazy(() => import('../../components/home/ClosingCTASection').then((m) => ({ default: m.ClosingCTASection })));

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  usePageMeta('');

  // Callback Modal State
  const [callbackModalOpen, setCallbackModalOpen] = useState(false);
  const [callbackName, setCallbackName] = useState('');
  const [callbackPhone, setCallbackPhone] = useState('');
  const [callbackNotes, setCallbackNotes] = useState('');
  const [callbackSubmitted, setCallbackSubmitted] = useState(false);

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitCallbackLead({ name: callbackName, phone: callbackPhone, notes: callbackNotes, source: window.location.pathname });
    setCallbackSubmitted(true);
    setTimeout(() => {
      setCallbackModalOpen(false);
      setCallbackSubmitted(false);
      setCallbackName('');
      setCallbackPhone('');
      setCallbackNotes('');
    }, 2000);
  };

  return (
    <div className="pb-0 bg-white text-slate-900 text-left overflow-x-hidden selection:bg-[#C31725] selection:text-white relative">
      
      {/* ========================================================================= */}
      {/* SECTION 01 — FULL-WIDTH CAMPAIGN HERO                                     */}
      {/* ========================================================================= */}
      <section className="relative min-h-[500px] sm:min-h-[560px] lg:min-h-[600px] bg-[#050F33] overflow-hidden flex flex-col justify-end items-center pb-8 sm:pb-10 pt-28 sm:pt-32 border-b border-white/10 grain">
        
        {/* Full-Width Official Team Campaign Photo — Dedicated Nurses & Caregivers with Official Pulse n Care Uniform Badges */}
        <img
          src="/assets/services/home-nursing/pulse-n-care-homecare-nurses-hero.webp?v=uniform-logos"
          alt="Pulse n Care Dedicated Homecare Nurses and Attendants in Official Uniform"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-[center_20%] opacity-90 brightness-[1.03] contrast-[1.05] saturate-[1.06] md:ken-burns"
        />

        {/* Ambient Spatial Lighting Spheres (Hidden on Mobile to prevent lag & overflow) */}
        <div className="hidden sm:block absolute top-12 left-1/4 w-[350px] lg:w-[500px] h-[350px] lg:h-[500px] bg-[#015498]/20 rounded-full blur-[90px] lg:blur-[140px] pointer-events-none z-1" />
        <div className="hidden sm:block absolute bottom-12 right-1/4 w-[300px] lg:w-[450px] h-[300px] lg:h-[450px] bg-[#C31725]/15 rounded-full blur-[80px] lg:blur-[130px] pointer-events-none z-1" />

        {/* Balanced Soft Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050F33] via-[#050F33]/70 via-55% to-transparent z-1" />

        {/* Centered High-Contrast Content Container (Positioned in Lower Half) */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center flex flex-col items-center pt-4 sm:pt-6">
          
          {/* Display headline — 3-line luxury editorial typography with ambient texture & depth */}
          <div className="relative mb-4 sm:mb-5 w-full max-w-4xl mx-auto">
            {/* Luminous Ambient Light Texture Glow behind headline */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[620px] lg:w-[760px] h-[180px] sm:h-[240px] bg-gradient-to-r from-[#015498]/30 via-teal-400/20 to-[#C31725]/20 rounded-full blur-[60px] sm:blur-[90px] pointer-events-none -z-1" />

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="font-display text-[2.2rem] sm:text-5xl md:text-6xl lg:text-[4.3rem] font-semibold text-white tracking-[-0.025em] leading-[1.12] sm:leading-[1.05]"
            >
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-slate-100 to-sky-100 font-medium text-[0.82em] sm:text-[0.85em] tracking-tight filter drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] pb-1">
                Providing Non-Medical
              </span>
              <span className="block font-bold tracking-tight text-white filter drop-shadow-[0_4px_18px_rgba(0,0,0,0.95)] [text-shadow:0_2px_4px_rgba(0,0,0,0.9),0_8px_32px_rgba(1,84,152,0.45)] py-0.5">
                Home Nursing Care
              </span>
              <span className="relative inline-block mt-0.5">
                <span className="italic font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-200 via-white to-sky-200 filter drop-shadow-[0_4px_22px_rgba(37,211,102,0.4)]">
                  at Your Doorstep.
                </span>
                {/* Micro-Accent Glowing Horizon Line */}
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-28 sm:w-44 h-[2px] bg-gradient-to-r from-transparent via-teal-400/80 to-transparent rounded-full shadow-[0_0_12px_rgba(45,212,191,0.8)]" />
              </span>
            </motion.h1>
          </div>

          {/* 6 Core Disciplines Interactive Grid */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5 max-w-3xl w-full mb-4 sm:mb-5 text-left"
          >
            {[
              { id: '1', title: 'Hospital Bystander', desc: 'Bedside support in hospital & transition', path: '/services/general-patient-attendants' },
              { id: '2', title: 'Post Operative Patients Care', desc: 'Surgical recovery & mobility assist', path: '/services/post-operative-recovery' },
              { id: '3', title: 'Newly born & Mother Care', desc: 'Postpartum care & infant handling', path: '/services/newborn-mother-care' },
              { id: '4', title: 'Chronic Disease & Palliative Care', desc: 'Oncology, stroke & vitals care', path: '/services/chronic-disease-palliative-care' },
              { id: '5', title: 'Elderly / Disabled Care', desc: 'Fall prevention & daily hygiene', path: '/services/elderly-care-assistance' },
              { id: '6', title: 'Hospice Care', desc: 'Dignified comfort & supportive care', path: '/services/chronic-disease-palliative-care' },
            ].map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className="group p-2.5 sm:p-3 rounded-xl bg-slate-900/80 hover:bg-slate-900/95 border border-white/15 hover:border-teal-400/60 backdrop-blur-md transition-all flex items-start gap-2 sm:gap-2.5 shadow-lg hover:scale-[1.02]"
              >
                <span className="w-5 h-5 rounded-md bg-teal-500/20 text-teal-300 text-[11px] font-black flex items-center justify-center shrink-0 border border-teal-400/30 group-hover:bg-teal-500 group-hover:text-white transition-colors">
                  {item.id}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-[11.5px] sm:text-xs font-bold text-white group-hover:text-teal-300 transition-colors leading-snug">
                    {item.title}
                  </div>
                  <div className="text-[10px] text-slate-300 line-clamp-1 mt-0.5 hidden sm:block">
                    {item.desc}
                  </div>
                </div>
              </Link>
            ))}
          </motion.div>

          {/* Transparent Starting Rates Pill Strip */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-5"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 border border-teal-400/40 text-teal-300 text-xs font-black backdrop-blur-md shadow-md">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              12h Nursing from <strong className="text-white font-mono">₹60/hr</strong>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 border border-amber-400/40 text-amber-300 text-xs font-black backdrop-blur-md shadow-md">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              24/7 Live-In @ <strong className="text-white font-mono">₹49/hr</strong>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 border border-emerald-400/40 text-emerald-300 text-xs font-black backdrop-blur-md shadow-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Advance Payment Basis
            </span>
          </motion.div>

          {/* High-Contrast Clean Dual Actions */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto"
          >
            <button
              type="button"
              onClick={() => openWhatsApp('Hello Pulse n Care, I want to book verified non-medical home nursing care and patient attendant support.')}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 btn-emerald-aura btn-shimmer text-white font-black text-sm sm:text-base px-8 py-4 rounded-xl cursor-pointer shadow-[0_10px_35px_rgba(37,211,102,0.55)]"
            >
              <WhatsAppIcon className="w-5 h-5 text-white fill-white shrink-0" />
              <span>Book on WhatsApp</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/services')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 glass-premium hover:bg-white/15 text-white font-bold text-sm sm:text-base px-8 py-4 rounded-xl transition-all duration-200 cursor-pointer"
            >
              <span>Explore Services</span>
              <ArrowRight className="w-4 h-4 text-slate-300" />
            </button>
          </motion.div>

        </div>

        {/* Animated ECG Pulse Line across bottom border */}
        <div className="absolute bottom-0 inset-x-0 z-10 pointer-events-none opacity-60">
          <PulseLine variant="hero" animated={true} />
        </div>
      </section>
      {/* ========================================================================= */}
      {/* SECTION 02 — COMPACT CREDIBILITY TRUST STRIP                              */}
      {/* ========================================================================= */}
      <CredibilityStrip />

      {/* ========================================================================= */}
      {/* SECTION 02.5 — ABOUT PULSE N CARE: MISSION & VISION                       */}
      {/* ========================================================================= */}
      <LazySection id="about-us" minHeight={800}>
        <Suspense fallback={null}>
          <AboutMissionVisionSection />
        </Suspense>
      </LazySection>

      {/* ========================================================================= */}
      {/* SECTION 03 — EDITORIAL SERVICE DISCOVERY SYSTEM                           */}
      {/* ========================================================================= */}
      <LazySection id="core-services" minHeight={1300}>
        <Suspense fallback={null}>
          <ServiceDiscoverySection />
        </Suspense>
      </LazySection>

      {/* ========================================================================= */}
      {/* SECTION 03.5 — FOUNDER & CEO LEADERSHIP SPOTLIGHT (SMT. ISHWARI)         */}
      {/* ========================================================================= */}
      <LazySection id="founder-ceo" minHeight={1100}>
        <Suspense fallback={null}>
          <FounderCeoSpotlight />
        </Suspense>
      </LazySection>

      {/* ========================================================================= */}
      {/* SECTION 04 — CONNECTED 3-STEP CLINICAL DISPATCH TIMELINE                  */}
      {/* ========================================================================= */}
      <LazySection id="how-it-works" minHeight={850}>
        <Suspense fallback={null}>
          <ClinicalDispatchTimeline />
        </Suspense>
      </LazySection>

      {/* ========================================================================= */}
      {/* SECTION 05 — SAFETY & CLINICAL GOVERNANCE COMPARISON PANEL                */}
      {/* ========================================================================= */}
      <LazySection id="why-us" minHeight={1100}>
        <Suspense fallback={null}>
          <ClinicalGovernanceSection />
        </Suspense>
      </LazySection>

      {/* ========================================================================= */}
      {/* SECTION 06 — 12-COLUMN EDITORIAL CLINICAL BENTO GRID                      */}
      {/* ========================================================================= */}
      <LazySection minHeight={1200}>
        <Suspense fallback={null}>
          <ClinicalBentoGrid3D />
        </Suspense>
      </LazySection>

      {/* ========================================================================= */}
      {/* SECTION 07 — PROFESSIONAL HEALTHCARE COST ESTIMATOR CALCULATOR            */}
      {/* ========================================================================= */}
      <LazySection minHeight={1000}>
        <Suspense fallback={null}>
          <CostCalculatorSection />
        </Suspense>
      </LazySection>

      {/* ========================================================================= */}
      {/* SECTION 08 — CALM EDITORIAL FAMILY CARE STORIES                           */}
      {/* ========================================================================= */}
      <LazySection minHeight={1000}>
        <Suspense fallback={null}>
          <TestimonialsSection />
        </Suspense>
      </LazySection>

      {/* ========================================================================= */}
      {/* SECTION 09 — CATEGORIZED FREQUENTLY ASKED QUESTIONS                       */}
      {/* ========================================================================= */}
      <LazySection id="faqs" minHeight={1200}>
        <Suspense fallback={null}>
          <FAQSection />
        </Suspense>
      </LazySection>

      {/* ========================================================================= */}
      {/* SECTION 10 — SIGNATURE CLOSING CONVERSION BANNER                          */}
      {/* ========================================================================= */}
      <LazySection minHeight={800}>
        <Suspense fallback={null}>
          <ClosingCTASection onOpenCallback={() => setCallbackModalOpen(true)} />
        </Suspense>
      </LazySection>

      {/* ========================================================================= */}
      {/* URGENT CALLBACK REQUEST MODAL                                             */}
      {/* ========================================================================= */}
      <Modal
        isOpen={callbackModalOpen}
        onClose={() => setCallbackModalOpen(false)}
        title="Request an Urgent Clinical Callback"
        maxWidth="md"
      >
        {callbackSubmitted ? (
          <div className="text-center py-6 space-y-3">
            <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-600">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-base font-black text-slate-900">Callback Request Received!</h4>
            <p className="text-xs text-slate-500">
              Your details are with our Duty Desk (a WhatsApp chat may have opened to confirm). We will call you back promptly at {callbackPhone}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleCallbackSubmit} className="space-y-4 pt-2">
            <p className="text-xs text-slate-500 leading-relaxed">
              Enter your contact details below. Our Duty Desk will call you back promptly to understand your patient’s care plan.
            </p>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Your Full Name</label>
              <input
                type="text"
                required
                value={callbackName}
                onChange={(e) => setCallbackName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#015498] focus:ring-1 focus:ring-[#015498]"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Phone Number</label>
              <input
                type="tel"
                required
                value={callbackPhone}
                onChange={(e) => setCallbackPhone(e.target.value)}
                placeholder="e.g. +91 98765 43210"
                className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#015498] focus:ring-1 focus:ring-[#015498]"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Patient Condition / Needs (Optional)</label>
              <textarea
                rows={2}
                value={callbackNotes}
                onChange={(e) => setCallbackNotes(e.target.value)}
                placeholder="e.g. Post knee surgery, elderly parent 12h day attendant, catheter care..."
                className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#015498] focus:ring-1 focus:ring-[#015498]"
              />
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              By submitting, you agree to be contacted about your enquiry. See our{' '}
              <a href="/privacy-policy" className="text-[#015498] font-semibold underline underline-offset-2">Privacy Policy</a>.
            </p>
            <div className="pt-2 flex items-center justify-end gap-3">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setCallbackModalOpen(false)}
                className="text-xs"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#015498] hover:bg-[#004e8a] text-white text-xs font-bold"
              >
                Request Callback
              </Button>
            </div>
          </form>
        )}
      </Modal>

    </div>
  );
};
