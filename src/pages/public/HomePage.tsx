import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { HealthcareTexture } from '../../components/common/HealthcareTexture';
import {
  PulseSurface,
  PulseStatus,
  PulseLine
} from '../../components/common/PulseUI';
import { VISUAL_ASSETS } from '../../data/visualAssets';
import { RadarSearchModal } from '../../components/domain/RadarSearchModal';
import {
  MapPin,
  UserCheck,
  ArrowRight,
  Activity,
  ChevronRight,
  ClipboardCheck,
  ShieldCheck
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const [locationInput] = useState('');
  const [callbackModalOpen, setCallbackModalOpen] = useState(false);
  const [isRadarModalOpen, setIsRadarModalOpen] = useState(false);
  const [callbackName, setCallbackName] = useState('');
  const [callbackPhone, setCallbackPhone] = useState('');
  const [callbackNotes, setCallbackNotes] = useState('');
  const [callbackSubmitted, setCallbackSubmitted] = useState(false);
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCallbackSubmitted(true);
    setTimeout(() => {
      setCallbackModalOpen(false);
      setCallbackSubmitted(false);
    }, 2000);
  };

  const servicesList = [
    {
      num: '01',
      id: 'nursing',
      title: 'Clinical Home Nursing',
      tag: '24×7 Rotational Care',
      desc: 'Registered B.Sc/GNM nurses for sterile post-operative dressing, IV antibiotic administration, tracheostomy care, catheter flushing, and daily vitals charting.',
      path: '/services/home-nursing',
      image: VISUAL_ASSETS.homeFlagshipNursing?.url || '/assets/services/home-nursing/pulse-n-care-home-nursing-hero.jpg'
    },
    {
      num: '02',
      id: 'caregiver',
      title: 'Bedside Caregiver & Attendant',
      tag: '12h Day/Night or 24h Live-in',
      desc: 'Trained attendants for elder care, sponge baths, diaper changes, mobility assistance, feeding support, and bedsore prevention positioning.',
      path: '/services/12-hour-caregiver-attendant',
      image: VISUAL_ASSETS.personalBedside?.url || '/assets/services/home-nursing/pulse-n-care-bedside-support.webp'
    },
    {
      num: '03',
      id: 'physio',
      title: 'Physical Therapy & Rehabilitation',
      tag: 'Orthopedic & Neuro',
      desc: 'In-home physical therapy for knee replacement rehab, post-stroke motor recovery, gait training, and joint stiffness management.',
      path: '/services/orthopedic-joint-rehab-physio',
      image: VISUAL_ASSETS.servicePhysioOrthoHero?.url || '/assets/services/home-nursing/pulse-n-care-mobility.webp'
    },
    {
      num: '04',
      id: 'high-dependency',
      title: 'High-Dependency Nursing Care',
      tag: 'Tracheostomy & Ventilator Support',
      desc: 'Specialized high-dependency nurses for tracheostomy maintenance, ventilator monitoring, feeding tube management, and critical bedside nursing.',
      path: '/services/nursing-high-dependency',
      image: VISUAL_ASSETS.clinicalVitals?.url || '/assets/services/home-nursing/pulse-n-care-vitals.jpg'
    }
  ];

  return (
    <div className="space-y-24 pb-24 bg-canvas-primary text-text-primary text-left overflow-x-hidden">
      
      {/* ========================================================================= */}
      {/* SECTION 01 — HERO SECTION (ENHANCED VISUAL & TYPOGRAPHY QUALITY)          */}
      {/* ========================================================================= */}
      <section className="relative min-h-[560px] sm:min-h-[620px] bg-slate-950 border-b border-border-default overflow-hidden flex flex-col justify-center items-center py-16 sm:py-24">
        
        {/* Procedural Healthcare Micro Texture Overlay */}
        <HealthcareTexture type="medical-grid" opacity={0.06} className="z-2" />

        {/* Full-Width Background Campaign Image */}
        <img
          src="/assets/services/home-nursing/pulse-n-care-team-banner-9.jpg"
          alt="Pulse n Care Managed Healthcare Team Campaign"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-95 brightness-[0.95] contrast-[1.05] scale-100 transition-transform duration-1000"
        />

        {/* Brighter 0.4 Overlay Gradient Mask */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/40 to-slate-950/65 z-1" />

        {/* Hero Centered Content Container */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center flex flex-col items-center">
          
          {/* Enhanced Glass Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 text-teal-300 text-[11px] font-black tracking-[0.2em] uppercase border border-teal-400/40 backdrop-blur-xl shadow-[0_0_15px_rgba(20,184,166,0.25)] mb-5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span>HOME CARE • DELHI NCR</span>
          </div>

          {/* High-Impact Primary Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.04] drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] mb-5 max-w-4xl">
            Nurse care at <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-emerald-300 to-cyan-300 font-black underline decoration-teal-400/70 decoration-wavy decoration-2 whitespace-nowrap">doorstep.</span>
          </h1>

          {/* High-Quality Short Description */}
          <p className="text-base sm:text-xl text-slate-100 max-w-2xl leading-relaxed font-semibold drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)] mb-9">
            Qualified nurses and caregivers for post-hospital recovery, nursing support and daily care at home.
          </p>

          {/* Premium High-Contrast Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="primary"
              onClick={() => navigate('/client/booking/wizard?serviceId=srv-nursing-post-op')}
              rightIcon={<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
              className="bg-gradient-to-r from-teal-500 via-teal-600 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white font-extrabold text-sm sm:text-base px-9 py-4 rounded-full cursor-pointer shadow-[0_10px_30px_-5px_rgba(20,184,166,0.5)] border border-teal-300/40 h-13 whitespace-nowrap transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] group"
            >
              Request Care at Home
            </Button>

            <Button
              variant="outline"
              onClick={() => navigate('/services')}
              className="border border-white/40 text-white hover:bg-white/20 hover:border-white/70 font-extrabold text-sm sm:text-base px-8 py-4 rounded-full cursor-pointer bg-slate-900/60 backdrop-blur-xl h-13 whitespace-nowrap shadow-md transition-all duration-300 hover:scale-[1.02]"
            >
              Explore Care Services
            </Button>
          </div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* SECTION 02 — HORIZONTAL CARE OPERATIONS WORKFLOW TIMELINE                  */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <PulseSurface variant="raised" padding="lg" className="bg-pulse-dots space-y-6">
          <div className="flex items-center justify-between border-b border-border-light pb-4 flex-wrap gap-4">
            <div>
              <span className="text-2xs font-heading font-extrabold uppercase tracking-widest text-brand-teal block">
                CARE OPERATIONS TIMELINE / 01
              </span>
              <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-text-primary tracking-tight mt-0.5">
                How Your Care Is Arranged & Managed
              </h2>
            </div>
            <PulseStatus status="success" label="Active Dispatch Engine" size="sm" pulse />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative">
            {[
              { step: '01', title: 'Submit Request', desc: 'Specify patient needs, clinical context & schedule in Delhi NCR.', icon: <ClipboardCheck className="w-4 h-4 text-brand-teal" /> },
              { step: '02', title: 'Clinical Audit', desc: 'Central Operations evaluates discharge order & nurse specialty.', icon: <ShieldCheck className="w-4 h-4 text-brand-teal" /> },
              { step: '03', title: 'Staff Matching', desc: 'Algorithm matches council-verified nurse from regional care team.', icon: <UserCheck className="w-4 h-4 text-brand-teal" /> },
              { step: '04', title: 'On-Duty Arrival', desc: 'Nurse arrives with sterile medical kit & GPS check-in.', icon: <MapPin className="w-4 h-4 text-brand-teal" /> },
              { step: '05', title: 'Daily Charting', desc: 'Vitals, medication & shift handover logged for family & doctor.', icon: <Activity className="w-4 h-4 text-brand-teal" /> }
            ].map((st, idx) => (
              <PulseSurface key={idx} variant="flat" padding="md" className="space-y-2 border-border-default hover:border-brand-teal/40 transition-all">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-extrabold text-brand-teal bg-teal-50 px-2 py-0.5 rounded border border-brand-teal/20">
                    {st.step}
                  </span>
                  <div className="p-1.5 rounded-lg bg-teal-50/50">{st.icon}</div>
                </div>
                <h3 className="font-heading font-bold text-sm text-text-primary mt-1">{st.title}</h3>
                <p className="text-xs text-text-muted leading-relaxed font-sans">{st.desc}</p>
              </PulseSurface>
            ))}
          </div>

          <PulseLine variant="hero" animated />
        </PulseSurface>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 03 — EDITORIAL NUMBERED SERVICE SHOWCASE (NO 3-CARD REPETITION)   */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-end justify-between flex-wrap gap-4 border-b border-border-light pb-4">
          <div>
            <span className="text-2xs font-heading font-extrabold text-brand-teal uppercase tracking-widest block">
              SERVICE CATALOG / 02
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-text-primary tracking-tight">
              Clinical & Bedside Care Ecosystem
            </h2>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate('/services')}
            rightIcon={<ArrowRight className="w-4 h-4" />}
            className="rounded-full text-xs font-bold border-border-default hover:border-brand-teal"
          >
            Explore All Services
          </Button>
        </div>

        {/* Numbered Editorial Row Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Numbered Index */}
          <div className="lg:col-span-5 space-y-2">
            {servicesList.map((srv, idx) => {
              const isActive = activeServiceIndex === idx;
              return (
                <div
                  key={srv.id}
                  onClick={() => setActiveServiceIndex(idx)}
                  className={`p-4 rounded-xl cursor-pointer transition-all border flex items-center justify-between gap-4 ${
                    isActive
                      ? 'bg-white border-brand-teal shadow-card ring-1 ring-brand-teal/30'
                      : 'bg-surface-subtle/50 border-border-default hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`font-mono text-sm font-extrabold ${isActive ? 'text-brand-teal' : 'text-text-muted'}`}>
                      {srv.num}
                    </span>
                    <div>
                      <h3 className={`font-heading font-bold text-sm ${isActive ? 'text-text-primary font-black' : 'text-text-secondary'}`}>
                        {srv.title}
                      </h3>
                      <span className="text-[10px] font-bold text-text-muted">{srv.tag}</span>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'text-brand-teal translate-x-1' : 'text-text-muted'}`} />
                </div>
              );
            })}
          </div>

          {/* Right Preview Card */}
          <div className="lg:col-span-7">
            <PulseSurface variant="feature" pulseAccent="top" padding="lg" className="space-y-5">
              <div className="relative rounded-xl overflow-hidden aspect-video w-full">
                <img
                  src={servicesList[activeServiceIndex].image}
                  alt={servicesList[activeServiceIndex].title}
                  className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-brand-teal border border-brand-teal/20">
                  {servicesList[activeServiceIndex].tag}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-heading font-extrabold text-text-primary">
                  {servicesList[activeServiceIndex].title}
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-sans font-medium">
                  {servicesList[activeServiceIndex].desc}
                </p>

                <div className="pt-2 flex items-center justify-between">
                  <Button
                    variant="primary"
                    onClick={() => navigate(servicesList[activeServiceIndex].path)}
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                    className="bg-brand-teal text-white rounded-full text-xs font-bold px-6 py-2.5"
                  >
                    View Details & Rates
                  </Button>

                  <span className="text-xs font-bold text-brand-teal">
                    Verified Staff Allocation
                  </span>
                </div>
              </div>
            </PulseSurface>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 04 — ASYMMETRIC HUMAN CARE FEATURE SECTION                        */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PulseSurface variant="raised" padding="xl" className="bg-pulse-surface">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-floating border-4 border-white aspect-[4/3] sm:aspect-video w-full">
                <img
                  src={VISUAL_ASSETS.personalHygiene?.url || 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800&q=80'}
                  alt="Pulse n Care Clinical Rigor"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6 text-left">
              <div>
                <span className="text-2xs font-heading font-extrabold text-brand-teal uppercase tracking-widest block">
                  HUMAN CARE & CLINICAL RIGOR / 03
                </span>
                <h2 className="text-3xl font-heading font-extrabold text-text-primary tracking-tight mt-1">
                  Care that feels organized, personal, and profoundly reliable.
                </h2>
              </div>

              <div className="space-y-4 font-sans text-xs sm:text-sm text-text-secondary leading-relaxed">
                <p>
                  Pulse n Care does not operate as an open freelancer marketplace. Every nurse and caregiver on duty is an internal employee subject to background checks, council license audits, and continuous supervision by our Central Operations Desk.
                </p>
                
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-white border border-border-default space-y-1">
                    <span className="font-heading font-bold text-sm text-brand-teal block">100% Verified</span>
                    <span className="text-text-muted text-[11px]">DNC / INC Registered Nurses</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-border-default space-y-1">
                    <span className="font-heading font-bold text-sm text-brand-blue block">24×7 Operations</span>
                    <span className="text-text-muted text-[11px]">Live Vitals & Shift Handovers</span>
                  </div>
                </div>
              </div>

              <Button
                variant="primary"
                onClick={() => navigate('/client/booking/wizard')}
                className="bg-brand-teal hover:bg-brand-teal-hover text-white rounded-full font-bold text-xs px-7 py-3"
              >
                Arrange Home Care Today
              </Button>
            </div>
          </div>
        </PulseSurface>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 05 — DARK FEATURE SURFACE (#050F33 NAVY CANVAS)                   */}
      {/* ========================================================================= */}
      <section className="w-full bg-[#050F33] text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-y border-teal-900/30">
        <HealthcareTexture type="medical-grid" opacity={0.08} className="z-0" />
        
        <div className="max-w-7xl mx-auto space-y-10 relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 border-b border-teal-900/40 pb-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-300 text-xs font-heading font-bold uppercase tracking-wider border border-teal-400/20">
                <ShieldCheck className="w-3.5 h-3.5" />
                INSTITUTIONAL OPERATIONAL STANDARDS / 04
              </div>
              <h2 className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight">
                Care is human. Operations make it reliable.
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md font-sans leading-relaxed">
              Our central operations console coordinates shift dispatch, clinical escalation, and daily documentation for all home care shifts.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: '24×7 Operations Desk', value: '100% In-House', desc: 'Direct staff allocation & continuous supervision' },
              { label: 'Council Verification', value: '100% Audited', desc: 'DNC / INC license validation before first shift' },
              { label: 'Digital Vitals Charting', value: 'Live Telemetry', desc: 'Medication logs & shift handover notes' },
              { label: 'SLA Response Time', value: '< 10 Minutes', desc: 'Central Desk confirmation & nurse assignment' }
            ].map((op, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white/5 border border-teal-500/20 backdrop-blur-md space-y-2 hover:border-teal-400/40 transition-all">
                <span className="text-[10px] font-heading font-bold uppercase tracking-widest text-teal-400">{op.label}</span>
                <p className="text-xl font-heading font-extrabold text-white">{op.value}</p>
                <p className="text-xs text-slate-400 font-sans">{op.desc}</p>
              </div>
            ))}
          </div>

          <PulseLine variant="hero" animated />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 06 — OPERATIONAL REGIONAL COVERAGE MAP                             */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PulseSurface variant="raised" padding="lg" className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-left">
            <div className="inline-flex items-center gap-2 text-xs font-heading font-bold text-brand-teal uppercase tracking-widest">
              <MapPin className="w-4 h-4 text-brand-teal" /> Verified Clinical Care
            </div>
            <h3 className="text-2xl font-heading font-extrabold text-text-primary">Comprehensive Home Care Services</h3>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-medium font-sans">
              Pulse n Care provides managed clinical nursing, senior care, and rehabilitation directly at your doorstep. Enter your pincode during booking to verify immediate availability.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {['Post-Op Nursing', 'Senior Care', 'Bedside Hygiene', 'Physiotherapy', 'Physician Visit'].map((loc, idx) => (
                <span key={idx} className="bg-teal-50 text-brand-teal px-3 py-1 rounded-full text-xs font-bold border border-brand-teal/20">
                  ✓ {loc}
                </span>
              ))}
            </div>
          </div>
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate('/client/booking/wizard')}
            className="font-bold cursor-pointer shrink-0 bg-brand-teal text-white rounded-full text-xs px-6 py-3"
          >
            Check Service Availability
          </Button>
        </PulseSurface>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 07 — DARK SIGNATURE CONVERSION CTA SURFACE                        */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#050F33] via-slate-900 to-[#050F33] text-white p-8 sm:p-12 rounded-3xl shadow-floating space-y-6 text-center relative overflow-hidden border border-teal-500/20">
          <HealthcareTexture type="medical-halo" opacity={0.12} />
          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight">Need Medical Care at Home Today?</h2>
            <p className="text-sm text-teal-100 font-medium font-sans">
              Submit your care requirements in under 3 minutes. Our Central Operations Desk will assign qualified in-house staff.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                onClick={() => navigate('/client/booking/wizard')}
                className="bg-brand-teal text-white hover:bg-brand-teal-hover font-bold px-8 py-4 text-base cursor-pointer shadow-md rounded-full border border-teal-300/30"
              >
                Book Care Service Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/organizations')}
                className="border-white/40 text-white hover:bg-white/10 font-bold px-7 py-4 text-base cursor-pointer rounded-full"
              >
                For Organizations →
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Callback Modal */}
      {callbackModalOpen && (
        <Modal
          isOpen={callbackModalOpen}
          onClose={() => setCallbackModalOpen(false)}
          title="Talk to Care Concierge Desk"
        >
          <form onSubmit={handleCallbackSubmit} className="space-y-4 text-left text-xs font-sans">
            {callbackSubmitted ? (
              <div className="p-4 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold text-center">
                ✓ Callback request submitted! Our Care Concierge will phone you in ~5 minutes.
              </div>
            ) : (
              <>
                <div>
                  <label className="block text-xs font-bold text-text-primary mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={callbackName}
                    onChange={(e) => setCallbackName(e.target.value)}
                    placeholder="e.g. Ananya Sharma"
                    className="w-full px-3 py-2 rounded-xl border border-border-default text-xs font-medium focus:ring-2 focus:ring-brand-teal/30 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-text-primary mb-1">Phone Number (Delhi NCR) *</label>
                  <input
                    type="tel"
                    required
                    value={callbackPhone}
                    onChange={(e) => setCallbackPhone(e.target.value)}
                    placeholder="+91-98100-XXXXX"
                    className="w-full px-3 py-2 rounded-xl border border-border-default text-xs font-medium focus:ring-2 focus:ring-brand-teal/30 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-text-primary mb-1">Patient Care Context (Optional)</label>
                  <textarea
                    rows={2}
                    value={callbackNotes}
                    onChange={(e) => setCallbackNotes(e.target.value)}
                    placeholder="Describe patient condition (post-op dressing, 24h elder care, knee physio)..."
                    className="w-full px-3 py-2 rounded-xl border border-border-default text-xs font-medium focus:ring-2 focus:ring-brand-teal/30 focus:outline-none"
                  />
                </div>
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full bg-brand-teal text-white font-bold text-xs py-3 rounded-full shadow-md"
                >
                  Request Immediate Phone Call
                </Button>
              </>
            )}
          </form>
        </Modal>
      )}

      <RadarSearchModal
        isOpen={isRadarModalOpen}
        onClose={() => setIsRadarModalOpen(false)}
        serviceId="srv-nursing-post-op"
        location={locationInput}
      />
    </div>
  );
};
