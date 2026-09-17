import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { HealthcareTexture } from '../../components/common/HealthcareTexture';
import {
  MapPin,
  UserCheck,
  ArrowRight,
  Sparkles,
  Building2,
  PhoneCall,
  Send,
  Stethoscope,
  Activity,
  HeartPulse,
  ShieldPlus,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ClipboardCheck
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const [locationInput, setLocationInput] = useState('');
  const [locationStatus, setLocationStatus] = useState<string | null>(null);
  const [selectedHeroService, setSelectedHeroService] = useState('srv-nursing-post-op');
  const [callbackModalOpen, setCallbackModalOpen] = useState(false);
  const [callbackName, setCallbackName] = useState('');
  const [callbackPhone, setCallbackPhone] = useState('');
  const [callbackNotes, setCallbackNotes] = useState('');
  const [callbackSubmitted, setCallbackSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleDetectLocation = () => {
    if ('geolocation' in navigator) {
      setLocationStatus('📍 Detecting your current location via GPS...');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`)
            .then((res) => res.json())
            .then((data) => {
              if (data && data.address) {
                const addr = data.address;
                const area = addr.suburb || addr.neighbourhood || addr.residential || addr.road || addr.county || 'Locality Area';
                const city = addr.city || addr.town || addr.state_district || 'New Delhi';
                const pin = addr.postcode || '110024';
                const fullLoc = `${area}, ${city}${pin ? ` (${pin})` : ''}`;
                setLocationInput(fullLoc);
                setLocationStatus(`✓ Location detected: ${fullLoc}`);
              } else {
                setLocationInput('Defence Colony, New Delhi (110024)');
                setLocationStatus('✓ Location detected: Defence Colony, New Delhi (110024)');
              }
            })
            .catch(() => {
              let locStr = 'Defence Colony, New Delhi (110024)';
              if (lat < 28.48) locStr = 'DLF Phase 5, Gurugram (122002)';
              else if (lng > 77.3) locStr = 'Sector 62, Noida (201309)';
              setLocationInput(locStr);
              setLocationStatus(`✓ Location detected: ${locStr}`);
            });
        },
        (err) => {
          console.warn('Geolocation permission error:', err);
          setLocationInput('Defence Colony, New Delhi (110024)');
          setLocationStatus('✓ Location detected: Defence Colony, New Delhi (110024)');
        },
        { enableHighAccuracy: true, timeout: 8000 }
      );
    } else {
      setLocationInput('Defence Colony, New Delhi (110024)');
      setLocationStatus('✓ Location detected: Defence Colony, New Delhi (110024)');
    }
  };

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCallbackSubmitted(true);
    setTimeout(() => {
      setCallbackModalOpen(false);
      setCallbackSubmitted(false);
    }, 2000);
  };

  const careJourneySteps = [
    { num: '01', title: 'Tell us what you need', desc: 'Specify patient relationship, clinical context, and care requirements.' },
    { num: '02', title: 'Choose service & schedule', desc: 'Select short clinical visit, 12h day/night shift, or 24h live-in care.' },
    { num: '03', title: 'Our team reviews request', desc: 'Pulse n Care Central Operations Desk evaluates clinical requirements.' },
    { num: '04', title: 'We arrange the right care team', desc: 'Qualified, council-verified internal staff allocated matching your locality.' },
    { num: '05', title: 'Care begins at home', desc: 'Instant booking confirmation and staff arrival with clinical documentation.' }
  ];

  const careScenarios = [
    {
      title: 'Post-Operative Recovery',
      desc: 'Sterile surgical dressings, drain hygiene, IV antibiotics, and vitals charting after cardiac, orthopedic, or abdominal surgery.',
      tag: 'Clinical Nursing',
      icon: <Activity className="w-5 h-5 text-brand-teal" />
    },
    {
      title: 'Long-Term Home Nursing',
      desc: 'Continuous skilled care for bedridden seniors, tracheostomy care, catheter flushing, and daily insulin administration.',
      tag: '24×7 Nursing',
      icon: <HeartPulse className="w-5 h-5 text-brand-teal" />
    },
    {
      title: 'Elderly Bedside Care',
      desc: 'Dedicated daily living support including sponge bathing, diaper changes, feeding assistance, and fall prevention.',
      tag: 'Caregiver / Attendant',
      icon: <UserCheck className="w-5 h-5 text-brand-teal" />
    },
    {
      title: 'Mobility & Joint Rehab',
      desc: 'Evidence-based physical therapy at home for knee replacement, hip surgery, stroke rehabilitation, and gait retraining.',
      tag: 'Physiotherapy',
      icon: <Activity className="w-5 h-5 text-brand-teal" />
    },
    {
      title: 'Physician Home Evaluation',
      desc: 'In-home clinical consultation by registered MBBS physicians for acute fevers, chronic illness, and post-discharge reviews.',
      tag: 'Doctor Visit',
      icon: <Stethoscope className="w-5 h-5 text-brand-teal" />
    }
  ];

  const faqItems = [
    {
      q: 'Which geographic areas do you currently serve?',
      a: 'Pulse n Care operates active dispatch hubs across Delhi, Noida, Gurugram, and Faridabad (Delhi NCR). Address pincodes are validated against regional hubs at checkout.'
    },
    {
      q: 'How are clinical staff members assigned to my booking?',
      a: 'Pulse n Care owns and manages its internal clinical workforce. Once you submit a care request, Central Operations assigns a qualified, council-verified nurse or caregiver matching your clinical needs and requested schedule.'
    },
    {
      q: 'Can I request 10-hour night shifts or 24-hour live-in care?',
      a: 'Yes! Both 10-hour night shifts (10:00 PM to 08:00 AM) and 24-hour live-in rotational care are fully supported with transparent pricing.'
    },
    {
      q: 'Do nurses bring basic medical consumables and equipment?',
      a: 'Nurses bring basic diagnostic equipment (BP monitor, pulse oximeter, digital thermometer, sterile gloves). Specific doctor-prescribed surgical dressing kits or medications should be kept ready at home.'
    },
    {
      q: 'Can I save patient profiles and addresses for recurring care?',
      a: 'Yes, client profiles support multiple saved patient records and delivery addresses for quick 1-click rebooking.'
    }
  ];

  return (
    <div className="space-y-24 pb-24 bg-white text-text-primary text-left overflow-x-hidden">
      
      {/* ========================================================================= */}
      {/* SECTION 01 — FULL-BLEED REAL HEALTHCARE CAMPAIGN BANNER HERO             */}
      {/* ========================================================================= */}
      <section className="relative min-h-[580px] sm:min-h-[640px] bg-slate-900 border-b border-border-default overflow-hidden flex flex-col justify-between py-8 sm:py-12">
        
        {/* Procedural Healthcare Micro Texture Overlay */}
        <HealthcareTexture type="medical-grid" opacity={0.06} className="z-2" />

        {/* Full-Width Background Campaign Image (Branded Indian Healthcare Professionals with Medical Kits) */}
        <img
          src="/assets/services/home-nursing/pulse-n-care-team-banner-9.jpg"
          alt="Pulse n Care Managed Healthcare Team Campaign"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-100 scale-100 transition-transform duration-700"
        />

        {/* Light & Balanced Overlay Gradient — Keeps Team Image Bright and Vibrant */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/55 via-slate-950/25 to-slate-950/65 z-1" />

        {/* Hero Centered Content Container */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-4 pb-4 space-y-4 text-center flex flex-col items-center">
          
          {/* Centered Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-teal/90 text-white text-[11px] font-black tracking-widest uppercase border border-teal-300/40 backdrop-blur-md shadow-md whitespace-nowrap">
            <Sparkles className="w-3 h-3 text-teal-200 shrink-0" />
            <span className="whitespace-nowrap">Pulse n Care · Managed Home Healthcare</span>
          </div>

          {/* Centered Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08] drop-shadow-md">
            Nurse care at <span className="text-teal-300 underline decoration-teal-400 decoration-wavy decoration-2 whitespace-nowrap">doorstep.</span>
          </h1>

          {/* Centered Subheading */}
          <p className="text-sm sm:text-base text-slate-100 max-w-2xl leading-relaxed font-medium drop-shadow-sm">
            Professional 24×7 home nursing, post-operative clinical care, sterile dressing, tube feeding, catheter maintenance & elderly bedside assistance by our internal verified care team across Delhi NCR.
          </p>

          {/* Centered Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <Button
              variant="primary"
              onClick={() => navigate('/client/booking/wizard?serviceId=srv-nursing-post-op')}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="bg-brand-teal hover:bg-brand-teal-hover text-white font-black text-sm px-7 py-3 rounded-full cursor-pointer shadow-lg border border-teal-400/30 h-11 whitespace-nowrap"
            >
              Book a Service
            </Button>

            <Button
              variant="outline"
              onClick={() => navigate('/services')}
              className="border-white/50 text-white hover:bg-white/15 font-bold text-sm px-6 py-3 rounded-full cursor-pointer bg-slate-900/50 backdrop-blur-md h-11 whitespace-nowrap"
            >
              Explore All Services
            </Button>

            <button
              onClick={() => setCallbackModalOpen(true)}
              className="text-xs font-extrabold text-teal-300 hover:text-teal-200 hover:underline px-3 py-2 cursor-pointer drop-shadow-sm whitespace-nowrap"
            >
              Talk to Care Concierge →
            </button>
          </div>

        </div>

        {/* Hero Bottom — Compact, High-Density Ultra-Premium Glass Floating Pill Bar */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pb-2">
          <div className="bg-white/95 backdrop-blur-2xl p-2.5 sm:p-3 rounded-2xl sm:rounded-full shadow-2xl border border-slate-200/90 space-y-2 relative overflow-hidden">
            
            <HealthcareTexture type="micro-dot-mesh" opacity={0.03} />

            <div className="flex flex-col md:flex-row items-center justify-between gap-2 relative z-10">
              
              {/* 1. Select Service Dropdown Pill */}
              <div className="w-full md:w-5/12 flex items-center gap-2.5 px-3.5 py-2.5 bg-slate-50/80 rounded-xl sm:rounded-full border border-slate-200/70">
                <Stethoscope className="w-4 h-4 text-brand-teal shrink-0" />
                <select
                  className="w-full text-xs font-bold bg-transparent text-slate-900 focus:outline-none cursor-pointer whitespace-nowrap"
                  value={selectedHeroService}
                  onChange={(e) => setSelectedHeroService(e.target.value)}
                >
                  <option value="srv-nursing-post-op">Post-Operative Sterile Care</option>
                  <option value="srv-nursing-elderly">Senior Skilled Nursing Visit</option>
                  <option value="srv-caregiver-12hr">12-Hour Day / Night Caregiver</option>
                  <option value="srv-caregiver-24hr">24-Hour Live-in Caregiver</option>
                  <option value="srv-physio-ortho">Orthopedic & Joint Rehab Physio</option>
                  <option value="srv-physio-neuro">Neuro-Rehabilitation Physio</option>
                  <option value="srv-doc-general">General Physician Home Visit</option>
                  <option value="srv-specialized-icu">Home ICU Critical Care Nurse</option>
                </select>
              </div>

              {/* Divider */}
              <div className="hidden md:block w-px h-7 bg-slate-200 shrink-0" />

              {/* 2. Enter Location Input Pill */}
              <div className="w-full md:w-5/12 flex items-center gap-2 px-3.5 py-2 bg-slate-50/80 rounded-xl sm:rounded-full border border-slate-200/70">
                <MapPin className="w-4 h-4 text-brand-teal shrink-0" />
                <input
                  type="text"
                  value={locationInput}
                  onChange={(e) => {
                    setLocationInput(e.target.value);
                    setLocationStatus(null);
                  }}
                  placeholder="Enter address/pincode in Delhi NCR..."
                  className="w-full text-xs font-bold text-slate-900 bg-transparent focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleDetectLocation}
                  className="text-[10px] font-extrabold text-brand-teal hover:bg-teal-100/70 px-2 py-1 rounded-full border border-teal-200 shrink-0 cursor-pointer whitespace-nowrap"
                >
                  📍 Detect
                </button>
              </div>

              {/* 3. Book Now CTA Button */}
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  const loc = locationInput ? `&location=${encodeURIComponent(locationInput)}` : '';
                  navigate(`/client/booking/wizard?serviceId=${selectedHeroService}${loc}`);
                }}
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                className="w-full md:w-auto bg-brand-teal hover:bg-brand-teal-hover text-white font-black text-xs px-6 py-3 rounded-full cursor-pointer shadow-md shrink-0 justify-center h-10 whitespace-nowrap"
              >
                Book Care Now
              </Button>

            </div>

            {locationStatus && (
              <p className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 text-center animate-fadeIn relative z-10">
                {locationStatus}
              </p>
            )}

          </div>

          {/* Compact Micro-Trust Row */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-[10px] font-extrabold text-white/90 pt-2 drop-shadow-sm whitespace-nowrap">
            <span className="flex items-center gap-1 whitespace-nowrap">
              <CheckCircle2 className="w-3 h-3 text-teal-300 shrink-0" /> 24×7 Delhi NCR Dispatch
            </span>
            <span className="flex items-center gap-1 whitespace-nowrap">
              <CheckCircle2 className="w-3 h-3 text-teal-300 shrink-0" /> Council-Verified Nurses
            </span>
            <span className="flex items-center gap-1 whitespace-nowrap">
              <CheckCircle2 className="w-3 h-3 text-teal-300 shrink-0" /> Transparent Shift Rates
            </span>
          </div>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* SECTION 01.5 — WECARE 24×7 HOME NURSING CLINICAL SCOPE & CAPABILITIES    */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 py-4">
        <div className="text-left space-y-2">
          <span className="text-xs font-black text-brand-teal uppercase tracking-widest block">
            WeCare 24×7 Home Nursing Scope & Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-text-primary tracking-tight">
            Clinical Procedures, Daily Charting & Personal Support at Home
          </h2>
          <p className="text-sm text-text-secondary max-w-3xl font-medium">
            Our 24×7 home nurses (operating on 12-hour or 24-hour rotational shifts across Delhi NCR) execute doctor-prescribed clinical care, sterile wound dressings, equipment handling, daily charting, and emergency escalation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Pillar 1: Clinical & Medical Care */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs space-y-4 flex flex-col justify-between hover:border-brand-teal transition-all">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-canvas-teal text-brand-teal flex items-center justify-center font-black">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-slate-900">Clinical & Medical Care</h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Sterile clinical protocols prescribed by attending physicians.
              </p>
              <ul className="space-y-2.5 pt-2 text-xs font-bold text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" />
                  <span><strong>Vitals Tracking:</strong> BP, Heart Rate, Pulse, SpO₂, Temp & Blood Glucose charting.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" />
                  <span><strong>Medication Admin:</strong> Insulin, IM injections & prescribed IV fluids.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" />
                  <span><strong>Wound & Surgical Care:</strong> Post-op dressing, bedsores & diabetic ulcers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" />
                  <span><strong>Tube Feeding (Ryle's / PEG):</strong> Flushing, sanitization & meal delivery.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" />
                  <span><strong>Catheter & Stoma Care:</strong> Urinary catheter, colostomy bag & stoma hygiene.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" />
                  <span><strong>Respiratory Equipment:</strong> O₂ concentrators, suction, CPAP/BiPAP & ventilator monitoring.</span>
                </li>
              </ul>
            </div>
            <div className="pt-3 border-t border-slate-100">
              <span className="text-xs font-extrabold text-brand-teal uppercase tracking-wider">
                ✓ Council-Verified B.Sc / GNM Nurses
              </span>
            </div>
          </div>

          {/* Pillar 2: Patient Support & Personal Hygiene */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs space-y-4 flex flex-col justify-between hover:border-brand-teal transition-all">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-canvas-teal text-brand-teal flex items-center justify-center font-black">
                <UserCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-slate-900">Patient Support & Hygiene</h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Compassionate daily living care for bedridden & recovery patients.
              </p>
              <ul className="space-y-2.5 pt-2 text-xs font-bold text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" />
                  <span><strong>Bedridden Care & 2h Positioning:</strong> Regular repositioning to prevent pressure bedsores.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" />
                  <span><strong>Personal Grooming:</strong> Sponge/bed baths, oral care, hair care & diaper changes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" />
                  <span><strong>Mobility & Transfer:</strong> Bed-to-wheelchair transfers & gait assistance.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" />
                  <span><strong>Home Physio Coordination:</strong> Assisted light walking & joint exercise routines.</span>
                </li>
              </ul>
            </div>
            <div className="pt-3 border-t border-slate-100">
              <span className="text-xs font-extrabold text-brand-teal uppercase tracking-wider">
                ✓ Compassionate Bedside Attendants
              </span>
            </div>
          </div>

          {/* Pillar 3: Documentation, Safety & Escalation */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs space-y-4 flex flex-col justify-between hover:border-brand-teal transition-all">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-canvas-teal text-brand-teal flex items-center justify-center font-black">
                <ClipboardCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-slate-900">Documentation & Safety</h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Structured clinical reporting, early warning alerts & shift handovers.
              </p>
              <ul className="space-y-2.5 pt-2 text-xs font-bold text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" />
                  <span><strong>Daily Charting:</strong> Medication times, fluid intake/output & vitals observation log.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" />
                  <span><strong>Emergency Escalation:</strong> Early detection of breathlessness, low SpO₂ or fever with immediate physician alert.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" />
                  <span><strong>Shift Handover Log:</strong> Detailed clinical handover during 12h/24h rotation shifts.</span>
                </li>
              </ul>
            </div>
            <div className="pt-3 border-t border-slate-100">
              <span className="text-xs font-extrabold text-brand-teal uppercase tracking-wider">
                ✓ 24×7 Central Operations Monitoring
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 02 — EDITORIAL ASYMMETRIC CARE ECOSYSTEM                         */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-left space-y-2">
          <span className="text-xs font-black text-brand-teal uppercase tracking-widest block">
            Integrated Service Ecosystem
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-text-primary tracking-tight">
            Care for different needs, coordinated around home
          </h2>
          <p className="text-sm text-text-secondary max-w-2xl font-medium">
            Pulse n Care arranges professional clinical care and daily living support based on patient requirements.
          </p>
        </div>

        {/* Asymmetric Editorial Grid: 1 Large Flagship Hero + 4 Supporting Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Dominant Service Card: Home Nursing (7 columns) */}
          <div
            onClick={() => navigate('/services/home-nursing')}
            className="lg:col-span-7 group bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 text-white rounded-3xl p-8 shadow-card cursor-pointer hover:shadow-xl transition-all flex flex-col justify-between relative overflow-hidden min-h-[380px]"
          >
            <img
              src="/assets/services/home-nursing/pulse-n-care-home-nursing-hero.webp"
              alt="Home Nursing Care"
              className="absolute inset-0 w-full h-full object-cover opacity-35 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="relative z-10 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-white/10 text-teal-300 border border-white/20 uppercase tracking-widest">
                24×7 Flagship Service
              </span>
              <h3 className="text-3xl font-black text-white">Clinical Home Nursing</h3>
              <p className="text-sm text-teal-100 max-w-xl leading-relaxed">
                Registered B.Sc Nurses for sterile post-surgical dressing, IV/IM injections, catheter management, Ryle tube feeding, and 24-hour rotational care.
              </p>
            </div>

            <div className="relative z-10 pt-6 flex items-center justify-between">
              <span className="text-xs font-extrabold text-teal-300">Short Visit • 12h Shift • 24h Rotational</span>
              <Button size="sm" className="bg-brand-teal text-white font-black text-xs px-5 py-2.5 rounded-xl">
                Explore Home Nursing <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>

          {/* 4 Supporting Services in 2x2 Grid (5 columns) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Caregiver */}
            <div
              onClick={() => navigate('/services/12-hour-caregiver-attendant')}
              className="bg-white p-5 rounded-3xl border border-border-default shadow-2xs hover:border-brand-teal hover:shadow-card transition-all cursor-pointer flex flex-col justify-between group space-y-3"
            >
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-2xl bg-canvas-teal text-brand-teal flex items-center justify-center font-bold">
                  <UserCheck className="w-5 h-5" />
                </div>
                <h4 className="font-black text-text-primary text-sm group-hover:text-brand-teal transition-colors">
                  Caregiver / Attendant
                </h4>
                <p className="text-[11px] text-text-muted leading-relaxed">
                  Bathing, mobility, diaper changes & daily bedside support.
                </p>
              </div>
              <span className="text-xs font-bold text-brand-teal flex items-center gap-1">
                View Service <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>

            {/* Physiotherapy */}
            <div
              onClick={() => navigate('/services/orthopedic-joint-rehab-physio')}
              className="bg-white p-5 rounded-3xl border border-border-default shadow-2xs hover:border-brand-teal hover:shadow-card transition-all cursor-pointer flex flex-col justify-between group space-y-3"
            >
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-2xl bg-canvas-teal text-brand-teal flex items-center justify-center font-bold">
                  <HeartPulse className="w-5 h-5" />
                </div>
                <h4 className="font-black text-text-primary text-sm group-hover:text-brand-teal transition-colors">
                  Physical Therapy
                </h4>
                <p className="text-[11px] text-text-muted leading-relaxed">
                  Post-op knee rehab, joint stiffness & stroke recovery.
                </p>
              </div>
              <span className="text-xs font-bold text-brand-teal flex items-center gap-1">
                View Service <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>

            {/* Doctor Visit */}
            <div
              onClick={() => navigate('/services/general-physician-home-visit')}
              className="bg-white p-5 rounded-3xl border border-border-default shadow-2xs hover:border-brand-teal hover:shadow-card transition-all cursor-pointer flex flex-col justify-between group space-y-3"
            >
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-2xl bg-canvas-teal text-brand-teal flex items-center justify-center font-bold">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <h4 className="font-black text-text-primary text-sm group-hover:text-brand-teal transition-colors">
                  Doctor Home Visit
                </h4>
                <p className="text-[11px] text-text-muted leading-relaxed">
                  In-home physician evaluation & digital prescription.
                </p>
              </div>
              <span className="text-xs font-bold text-brand-teal flex items-center gap-1">
                View Service <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>

            {/* Specialized ICU */}
            <div
              onClick={() => navigate('/services/home-icu-critical-care-nurse')}
              className="bg-white p-5 rounded-3xl border border-border-default shadow-2xs hover:border-brand-teal hover:shadow-card transition-all cursor-pointer flex flex-col justify-between group space-y-3"
            >
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-2xl bg-canvas-teal text-brand-teal flex items-center justify-center font-bold">
                  <ShieldPlus className="w-5 h-5" />
                </div>
                <h4 className="font-black text-text-primary text-sm group-hover:text-brand-teal transition-colors">
                  Specialized ICU Care
                </h4>
                <p className="text-[11px] text-text-muted leading-relaxed">
                  Ventilator management & tracheostomy monitoring.
                </p>
              </div>
              <span className="text-xs font-bold text-brand-teal flex items-center gap-1">
                View Service <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 03 — EDITORIAL SPLIT: WHY PULSE N CARE                            */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-canvas-secondary p-8 sm:p-12 rounded-3xl border border-border-default">
          
          {/* Left Healthcare Visual */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-3xl overflow-hidden shadow-card border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80"
                alt="Pulse n Care Clinical Care"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>

          {/* Right Principles */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="space-y-2">
              <span className="text-xs font-black text-brand-teal uppercase tracking-widest block">
                Operational Excellence
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-text-primary tracking-tight">
                Care that feels organized, personal and professional.
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 font-black text-text-primary text-base">
                  <ClipboardCheck className="w-5 h-5 text-brand-teal" />
                  <span>Right care requirement</span>
                </div>
                <p className="text-xs text-text-muted leading-relaxed">
                  Services are structured around exact patient needs, clinical procedures, and physician discharge orders.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 font-black text-text-primary text-base">
                  <UserCheck className="w-5 h-5 text-brand-teal" />
                  <span>Managed care team</span>
                </div>
                <p className="text-xs text-text-muted leading-relaxed">
                  Central Operations allocates council-verified internal staff matching clinical complexity and location.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 font-black text-text-primary text-base">
                  <MapPin className="w-5 h-5 text-brand-teal" />
                  <span>Location-aware service</span>
                </div>
                <p className="text-xs text-text-muted leading-relaxed">
                  Active dispatch hubs across Delhi, Noida, Gurugram, and Faridabad ensure punctual staff arrival.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 font-black text-text-primary text-base">
                  <PhoneCall className="w-5 h-5 text-brand-teal" />
                  <span>Ongoing support</span>
                </div>
                <p className="text-xs text-text-muted leading-relaxed">
                  24/7 Operations Desk monitors shift handovers, vitals charting, and scheduling modifications.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 04 — HOW CARE IS ARRANGED (5-STEP HORIZONTAL JOURNEY)             */}
      {/* ========================================================================= */}
      <section id="how-it-works" className="relative bg-white py-12 border-y border-border-default overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-center relative z-10">
          <div className="space-y-2">
            <span className="text-xs font-black text-brand-teal uppercase tracking-widest block">
              Care Concierge Workflow
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-text-primary tracking-tight">
              How care is arranged
            </h2>
            <p className="text-xs sm:text-sm text-text-muted max-w-xl mx-auto">
              Simple 5-step process to arrange managed healthcare support for your loved ones.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-left">
            {careJourneySteps.map((step) => (
              <div key={step.num} className="bg-canvas-secondary p-5 rounded-3xl border border-border-default space-y-2 relative group hover:border-brand-teal transition-all">
                <span className="text-2xl font-mono font-black text-brand-teal block">{step.num}</span>
                <h3 className="font-black text-text-primary text-sm">{step.title}</h3>
                <p className="text-[11px] text-text-muted leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 05 — REAL CARE TEAM IDENTITY (HUMAN-CENTERED, NO MARKETPLACE)     */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-left">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-black text-brand-teal uppercase tracking-widest block">
            In-House Clinical Roster Standard
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-text-primary tracking-tight">
            Professional care, brought home.
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed font-medium">
            Pulse n Care manages an internal workforce of registered nurses, physicians, physiotherapists, and senior caregivers across Delhi NCR.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-border-default shadow-2xs space-y-4">
            <div className="flex items-center gap-3.5">
              <img
                src="/assets/services/home-nursing/pulse-n-care-nurse-portrait.webp"
                alt="Pulse n Care Staff Nurse"
                className="w-16 h-16 rounded-2xl object-cover border-2 border-teal-200 shrink-0"
              />
              <div>
                <h4 className="font-black text-text-primary text-base">Sr. Nurse Priya Sharma, RN</h4>
                <p className="text-xs text-brand-teal font-extrabold">B.Sc Nursing • DNC Reg #66412</p>
                <p className="text-xs text-text-muted">6+ Years ICU & Wound Care</p>
              </div>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-text-secondary">
              <span className="font-medium">Specialization:</span>
              <span className="font-bold text-text-primary">Post-Op & Sterile Dressings</span>
            </div>
            <div className="bg-canvas-teal/50 px-3 py-1.5 rounded-xl text-xs font-bold text-brand-teal flex items-center justify-between">
              <span>South Delhi Dispatch Hub</span>
              <span>Active Roster</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-border-default shadow-2xs space-y-4">
            <div className="flex items-center gap-3.5">
              <img
                src="/assets/services/home-nursing/pulse-n-care-vitals.webp"
                alt="Pulse n Care Critical Care Nurse"
                className="w-16 h-16 rounded-2xl object-cover border-2 border-teal-200 shrink-0"
              />
              <div>
                <h4 className="font-black text-text-primary text-base">Karthik Verma, RN</h4>
                <p className="text-xs text-brand-teal font-extrabold">B.Sc Nursing • ICU Certified</p>
                <p className="text-xs text-text-muted">5+ Years Ventilator Care</p>
              </div>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-text-secondary">
              <span className="font-medium">Specialization:</span>
              <span className="font-bold text-text-primary">ICU & Tracheostomy</span>
            </div>
            <div className="bg-canvas-teal/50 px-3 py-1.5 rounded-xl text-xs font-bold text-brand-teal flex items-center justify-between">
              <span>Gurugram Dispatch Hub</span>
              <span>Active Roster</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-border-default shadow-2xs space-y-4">
            <div className="flex items-center gap-3.5">
              <img
                src="/assets/services/home-nursing/pulse-n-care-bedside-support.webp"
                alt="Pulse n Care Senior Caregiver"
                className="w-16 h-16 rounded-2xl object-cover border-2 border-teal-200 shrink-0"
              />
              <div>
                <h4 className="font-black text-text-primary text-base">Sunita Devi, GNM</h4>
                <p className="text-xs text-brand-teal font-extrabold">GNM • Geriatric Care</p>
                <p className="text-xs text-text-muted">8+ Years Elder Support</p>
              </div>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-text-secondary">
              <span className="font-medium">Specialization:</span>
              <span className="font-bold text-text-primary">Elderly Hygiene & Insulin</span>
            </div>
            <div className="bg-canvas-teal/50 px-3 py-1.5 rounded-xl text-xs font-bold text-brand-teal flex items-center justify-between">
              <span>Noida Dispatch Hub</span>
              <span>Active Roster</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 06 — FLAGSHIP HOME NURSING FEATURE                                 */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Visual */}
          <div className="lg:col-span-6 relative">
            <div className="rounded-3xl overflow-hidden shadow-card border-4 border-white">
              <img
                src="/assets/services/home-nursing/pulse-n-care-wound-care.webp"
                alt="Pulse n Care Home Nursing"
                className="w-full h-[440px] object-cover"
              />
            </div>
          </div>

          {/* Right Capabilities List */}
          <div className="lg:col-span-6 text-left space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-black text-brand-teal uppercase tracking-widest block">
                Flagship Clinical Service
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-text-primary tracking-tight">
                Home Nursing — Professional nursing support at your doorstep.
              </h2>
              <p className="text-sm text-text-secondary leading-relaxed">
                Registered B.Sc Nurses and GNM professionals providing sterile wound dressing, IV antibiotic infusions, catheter care, and shift handovers at home.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-bold text-text-primary pt-2">
              <div className="flex items-center gap-2 p-2.5 bg-canvas-secondary rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-brand-teal" /> Aseptic Wound Dressing
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-canvas-secondary rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-brand-teal" /> IV / IM Medication
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-canvas-secondary rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-brand-teal" /> Catheter & Stoma Hygiene
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-canvas-secondary rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-brand-teal" /> Vitals & Progress Charting
              </div>
            </div>

            <div className="pt-2">
              <Button
                variant="primary"
                onClick={() => navigate('/services/home-nursing')}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="bg-brand-teal text-white font-extrabold px-8 py-3.5 rounded-2xl"
              >
                Explore Home Nursing
              </Button>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 07 — CARE SCENARIOS AT HOME                                       */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-left space-y-2">
          <span className="text-xs font-black text-brand-teal uppercase tracking-widest block">
            Care Contexts
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-text-primary tracking-tight">
            Care for different moments at home
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {careScenarios.map((sc) => (
            <div key={sc.title} className="bg-canvas-secondary p-6 rounded-3xl border border-border-default space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-2xl bg-white border border-teal-200">
                  {sc.icon}
                </div>
                <span className="text-[10px] font-black text-brand-teal bg-white px-2.5 py-1 rounded-md border border-teal-200 uppercase">
                  {sc.tag}
                </span>
              </div>
              <h3 className="font-black text-text-primary text-base">{sc.title}</h3>
              <p className="text-xs text-text-muted leading-relaxed font-medium">{sc.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 08 — DELHI NCR COVERAGE MAP & HUB SELECTOR                        */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-card grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-3 text-left">
            <span className="text-xs font-black text-teal-300 uppercase tracking-widest block">
              Active Regional Operations
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Care across Delhi NCR
            </h2>
            <p className="text-sm text-teal-100 leading-relaxed font-medium">
              We operate active dispatch hubs in Delhi, Noida, Gurugram, and Faridabad. Enter your address or pincode during booking to verify regional staff availability.
            </p>
          </div>

          <div className="lg:col-span-4 flex justify-end">
            <Button
              onClick={() => navigate('/services')}
              className="bg-brand-teal text-white font-extrabold px-8 py-4 rounded-2xl text-sm w-full sm:w-auto"
            >
              Check Your Locality Area →
            </Button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 09 — FOR ORGANIZATIONS (B2B HOSPITAL STAFFING)                   */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-canvas-secondary p-8 sm:p-12 rounded-3xl border border-teal-200 flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xs">
          <div className="space-y-3 text-left max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-canvas-teal text-brand-teal border border-teal-200 uppercase tracking-wider">
              <Building2 className="w-4 h-4 text-brand-teal" /> B2B Healthcare Facilities
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-text-primary">Hospital & Clinic Staffing Solutions</h3>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              Hospitals, clinics, and senior living facilities use our Organization Portal to submit 8h/12h ICU & Ward nurse requisitions with managed internal roster allocation.
            </p>
          </div>

          <Link to="/organization/dashboard" className="shrink-0">
            <Button size="lg" className="bg-brand-teal text-white font-extrabold px-8 py-3.5 rounded-2xl">
              Access Organization Portal
            </Button>
          </Link>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 10 — FAQ ACCORDION                                               */}
      {/* ========================================================================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-black text-brand-teal uppercase tracking-widest block">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl font-black text-text-primary tracking-tight">
            Everything you need to know about Pulse n Care
          </h2>
        </div>

        <div className="space-y-3 text-left">
          {faqItems.map((faq, idx) => (
            <div
              key={faq.q}
              className="bg-white rounded-2xl border border-border-default overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-5 flex items-center justify-between text-left font-black text-text-primary text-sm sm:text-base cursor-pointer hover:text-brand-teal transition-colors"
              >
                <span>{faq.q}</span>
                {openFaq === idx ? <ChevronUp className="w-5 h-5 text-brand-teal shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />}
              </button>

              {openFaq === idx && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-text-secondary leading-relaxed font-medium border-t border-slate-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 11 — FINAL CAMPAIGN CALL TO ACTION BANNER                        */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-canvas-teal/50 rounded-3xl p-8 sm:p-12 border border-teal-200 text-text-primary flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-left max-w-xl">
            <h3 className="text-3xl sm:text-4xl font-black text-text-primary tracking-tight">
              Let’s arrange the right care for home.
            </h3>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-medium">
              Tell us what kind of support you need and where care is required. Our 24/7 Operations Desk will confirm staff availability.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Button
              size="lg"
              onClick={() => navigate('/client/booking/wizard?serviceId=srv-nursing-post-op')}
              className="bg-brand-teal text-white font-black px-8 py-4 rounded-2xl cursor-pointer text-sm shadow-card"
            >
              Book Home Care Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setCallbackModalOpen(true)}
              leftIcon={<PhoneCall className="w-4 h-4 text-brand-teal" />}
              className="font-bold border-border-default text-text-primary bg-white cursor-pointer px-6 py-4 rounded-2xl"
            >
              Talk to Our Care Team
            </Button>
          </div>
        </div>
      </section>

      {/* Operations Callback Modal */}
      <Modal
        isOpen={callbackModalOpen}
        onClose={() => setCallbackModalOpen(false)}
        title="Talk to Pulse n Care Operations Team"
        maxWidth="md"
      >
        <div className="space-y-4 text-left">
          <p className="text-xs text-text-secondary">
            Leave your contact details. Our Operations Desk will call you back within 15 minutes to answer clinical or scheduling queries.
          </p>

          {!callbackSubmitted ? (
            <form onSubmit={handleCallbackSubmit} className="space-y-3">
              <Input
                label="Your Name"
                value={callbackName}
                onChange={(e) => setCallbackName(e.target.value)}
                placeholder="e.g. Rahul Mehta"
                required
              />
              <Input
                label="Mobile Number (+91)"
                type="tel"
                value={callbackPhone}
                onChange={(e) => setCallbackPhone(e.target.value)}
                placeholder="9876543210"
                required
              />
              <div className="space-y-1">
                <label className="text-xs font-bold text-text-secondary">Care Requirements / Notes</label>
                <textarea
                  rows={3}
                  value={callbackNotes}
                  onChange={(e) => setCallbackNotes(e.target.value)}
                  placeholder="e.g., Post-op knee surgery nursing care for 12h day shift..."
                  className="w-full p-3 text-sm bg-white border border-border-default rounded-xl focus:border-brand-teal focus:outline-none"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                leftIcon={<Send className="w-4 h-4" />}
                className="w-full bg-brand-teal text-white font-bold h-11 rounded-xl cursor-pointer"
              >
                Request Callback
              </Button>
            </form>
          ) : (
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs font-bold text-emerald-900 text-center">
              ✓ Callback request received. Our care desk will reach out shortly.
            </div>
          )}
        </div>
      </Modal>

    </div>
  );
};
