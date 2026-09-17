import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PulseNCareHeader } from '../../components/domain/pulse-n-care/PulseNCareHeader';
import { PulseNCareHeroVisual } from '../../components/domain/pulse-n-care/PulseNCareHeroVisual';
import { ClinicalCareGrid } from '../../components/domain/pulse-n-care/ClinicalCareGrid';
import { PersonalCareSection } from '../../components/domain/pulse-n-care/PersonalCareSection';
import { DailyChartPreview } from '../../components/domain/pulse-n-care/DailyChartPreview';
import { RealDelhiNCRMap } from '../../components/domain/RealDelhiNCRMap';
import { CareDurationSelector } from '../../components/domain/pulse-n-care/CareDurationSelector';
import { PulseNCareFAQ } from '../../components/domain/pulse-n-care/PulseNCareFAQ';
import { StickyBookingBar } from '../../components/domain/pulse-n-care/StickyBookingBar';
import { LocationPicker } from '../../components/domain/LocationPicker';
import type { LocationData } from '../../components/domain/LocationPicker';
import { Modal } from '../../components/common/Modal';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { HealthcareTexture } from '../../components/common/HealthcareTexture';
import {
  ShieldCheck,
  PhoneCall,
  Calendar,
  Heart,
  Send,
  AlertTriangle,
  RefreshCw,
  UserCheck,
  Clock
} from 'lucide-react';

export const HomeNursingServicePage: React.FC = () => {
  const navigate = useNavigate();
  const [callbackModalOpen, setCallbackModalOpen] = useState(false);
  const [callbackName, setCallbackName] = useState('');
  const [callbackPhone, setCallbackPhone] = useState('');
  const [callbackNotes, setCallbackNotes] = useState('');
  const [callbackSubmitted, setCallbackSubmitted] = useState(false);

  const [locationData, setLocationData] = useState<LocationData>({
    addressType: 'Home Apartment',
    line1: 'A-124, Defence Colony',
    line2: 'Near Lajpat Nagar Metro Station',
    landmark: 'Opposite Flyover Pillar 14',
    city: 'New Delhi',
    state: 'Delhi NCR',
    pincode: '110024',
    accessNotes: 'Elevator active 24/7',
    isVerified: true
  });

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCallbackSubmitted(true);
    setTimeout(() => {
      setCallbackModalOpen(false);
      setCallbackSubmitted(false);
    }, 2000);
  };

  const journeySteps = [
    { num: '01', title: 'Tell us what care is needed', desc: 'Select home nursing requirements & specific clinical duties.' },
    { num: '02', title: 'Share patient details', desc: 'Provide patient relationship, age, allergies & medical history.' },
    { num: '03', title: 'Choose timing', desc: 'Select 12h, 24h, or night shift with overnight date rollover.' },
    { num: '04', title: 'Operations team arranges staff', desc: 'Pulse n Care Operations assigns qualified internal staff in Delhi NCR.' },
    { num: '05', title: 'Care is confirmed', desc: 'Receive instant confirmation & assigned nurse credentials.' },
    { num: '06', title: 'Nurse arrives', desc: 'Council-verified nurse arrives at doorstep with clinical kit.' },
    { num: '07', title: 'Care begins', desc: 'Vitals logged, medication administered, prescribed routines fulfilled.' },
    { num: '08', title: 'Shift handover / completion', desc: 'Structured handover to next shift or family briefing.' }
  ];

  return (
    <div className="min-h-screen bg-white text-text-primary text-left relative pb-20">
      <HealthcareTexture type="clinical-wave" opacity={0.02} />

      {/* 01. Pulse n Care Header */}
      <PulseNCareHeader />

      {/* 02. Hero Experience */}
      <PulseNCareHeroVisual onOpenCallback={() => setCallbackModalOpen(true)} />

      {/* 03. Service Introduction & Shift Modes */}
      <section className="py-10 bg-white border-b border-border-default">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-canvas-teal text-brand-teal text-xs font-extrabold border border-teal-200 uppercase tracking-widest">
            <ShieldCheck className="w-3.5 h-3.5" /> 24×7 Home Nursing Support
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-text-primary tracking-tight max-w-3xl">
            Professional nursing support delivered at the patient's home.
          </h2>
          <p className="text-sm text-text-secondary max-w-3xl leading-relaxed font-medium">
            Pulse n Care provides home nursing for patients requiring continuous or scheduled care at home. Services include 12-hour day/night shifts, 24-hour rotational care, short clinical visits, post-operative recovery, and long-term care management.
          </p>
        </div>
      </section>

      {/* 04. Clinical & Medical Care */}
      <ClinicalCareGrid />

      {/* 05. Patient Support & Hygiene */}
      <PersonalCareSection />

      {/* 06. Daily Charting Preview */}
      <DailyChartPreview />

      {/* 07 & 08. Safety Escalation & 24×7 Shift Handover Protocol */}
      <section className="py-12 bg-white border-b border-border-default">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-left">
          {/* Emergency Escalation */}
          <div className="space-y-4">
            <div className="max-w-3xl space-y-1">
              <span className="text-xs font-extrabold text-amber-700 uppercase tracking-widest block">
                Safety Protocol
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-text-primary tracking-tight">
                Recognize changes. Escalate early.
              </h3>
              <p className="text-xs text-text-muted">
                Our nursing staff identify subtle clinical changes (fever, low SpO₂, breathlessness) and follow an early escalation protocol with family and attending physicians.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-200 space-y-2">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
                  <AlertTriangle className="w-4 h-4 text-amber-700" />
                  <span>Early Symptom Detection</span>
                </div>
                <p className="text-[11px] text-amber-800 leading-snug">
                  Immediate logging of abnormal BP spikes, temperature drops, or respiratory distress.
                </p>
              </div>
              <div className="p-4 bg-teal-50/60 rounded-2xl border border-teal-200 space-y-2">
                <div className="flex items-center gap-2 text-teal-900 font-bold text-xs">
                  <UserCheck className="w-4 h-4 text-brand-teal" />
                  <span>Family & Physician Briefing</span>
                </div>
                <p className="text-[11px] text-teal-800 leading-snug">
                  Structured call to primary emergency contacts and attending hospital doctor.
                </p>
              </div>
              <div className="p-4 bg-blue-50/60 rounded-2xl border border-blue-200 space-y-2">
                <div className="flex items-center gap-2 text-blue-900 font-bold text-xs">
                  <Clock className="w-4 h-4 text-blue-700" />
                  <span>24×7 Ops Escalation Desk</span>
                </div>
                <p className="text-[11px] text-blue-800 leading-snug">
                  Pulse n Care operations dispatch back-up nursing or ambulance transport if needed.
                </p>
              </div>
            </div>
          </div>

          {/* Shift Handover Protocol */}
          <div className="space-y-4 pt-4 border-t border-border-light">
            <div className="max-w-3xl space-y-1">
              <span className="text-xs font-extrabold text-brand-teal uppercase tracking-widest block">
                Continuous 24×7 Rotational Care
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-text-primary tracking-tight">
                Continuous care across every shift handover.
              </h3>
              <p className="text-xs text-text-muted">
                When care is arranged in rotational shifts, outgoing nurses provide a structured 15-minute clinical briefing to incoming nurses.
              </p>
            </div>
            
            <div className="p-5 bg-canvas-secondary rounded-2xl border border-border-default space-y-3">
              <div className="flex items-center gap-2 text-xs font-extrabold text-text-primary">
                <RefreshCw className="w-4 h-4 text-brand-teal" />
                <span>Standardized 15-Minute Nurse Shift Handover Protocol</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 bg-white rounded-xl border border-border-light">
                  <span className="text-[10px] font-mono font-bold text-brand-teal block">STEP 1</span>
                  <span className="font-extrabold text-text-primary">Vitals Review</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-border-light">
                  <span className="text-[10px] font-mono font-bold text-brand-teal block">STEP 2</span>
                  <span className="font-extrabold text-text-primary">Medication Status</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-border-light">
                  <span className="text-[10px] font-mono font-bold text-brand-teal block">STEP 3</span>
                  <span className="font-extrabold text-text-primary">Incision / Dressing Audit</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-border-light">
                  <span className="text-[10px] font-mono font-bold text-brand-teal block">STEP 4</span>
                  <span className="font-extrabold text-text-primary">Sign-off & Digital Log</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 09. Care Journey (8-Step Timeline) */}
      <section className="py-12 bg-canvas-secondary border-b border-border-default">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-left">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-extrabold text-brand-teal uppercase tracking-widest block">
              Care Journey
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-text-primary tracking-tight">
              From booking to bedside care.
            </h2>
            <p className="text-sm text-text-secondary">
              A transparent, guided process keeping families fully informed at every stage.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {journeySteps.map((step) => (
              <div key={step.num} className="p-4 bg-white rounded-2xl border border-border-default shadow-2xs space-y-2 relative">
                <span className="text-xs font-mono font-black text-brand-teal block">{step.num}</span>
                <h4 className="font-extrabold text-text-primary text-xs">{step.title}</h4>
                <p className="text-[11px] text-text-muted leading-tight">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Duration Selector & Overnight Date Rollover */}
      <CareDurationSelector />

      {/* 11 & 12. Delhi NCR Service Area Verification & Vector Map */}
      <section className="py-12 bg-canvas-secondary border-b border-border-default">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-left">
          <div className="text-center space-y-2">
            <span className="text-xs font-extrabold text-brand-teal uppercase tracking-widest block">
              Service Area Verification
            </span>
            <h2 className="text-2xl font-black text-text-primary tracking-tight">
              Check Home Nursing Availability in Delhi NCR
            </h2>
            <p className="text-xs text-text-muted">
              Verify if Pulse n Care internal dispatch hubs active in Delhi, Noida, Gurugram, or Faridabad serve your locality.
            </p>
          </div>

          {/* Real Leaflet Map of Delhi NCR with Lottie Radar Scan Overlay */}
          <div className="space-y-4">
            <RealDelhiNCRMap
              selectedCity={locationData.city}
              latitude={locationData.latitude}
              longitude={locationData.longitude}
              locationName={locationData.line1 || 'Care Destination'}
              height="380px"
            />
          </div>

          <div className="bg-white p-6 rounded-3xl border border-border-default shadow-subtle">
            <LocationPicker
              value={locationData}
              onChange={(updated) => setLocationData(updated)}
            />
          </div>
        </div>
      </section>

      {/* 13. Clinical & Service FAQ */}
      <PulseNCareFAQ />

      {/* 14. Final Call to Action */}
      <section className="py-16 bg-gradient-to-r from-teal-900 via-brand-teal to-teal-800 text-white border-b border-border-default relative overflow-hidden text-center">
        <HealthcareTexture type="care-pathway" opacity={0.1} />
        <div className="max-w-3xl mx-auto px-4 space-y-6 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mx-auto border border-white/20">
            <Heart className="w-7 h-7 text-teal-200" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Need nursing care at home?
          </h2>

          <p className="text-sm text-teal-100 max-w-xl mx-auto leading-relaxed">
            Tell us what care your patient needs, when it is needed, and where care will happen. Our care operations team will review the request and arrange suitable support based on availability.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button
              variant="primary"
              onClick={() => navigate('/client/booking/wizard?serviceId=srv-nursing-post-op')}
              leftIcon={<Calendar className="w-4 h-4" />}
              className="bg-white text-brand-teal hover:bg-teal-50 font-extrabold px-8 py-3.5 rounded-2xl cursor-pointer text-sm shadow-md"
            >
              Book Home Nursing
            </Button>

            <Button
              variant="outline"
              onClick={() => setCallbackModalOpen(true)}
              leftIcon={<PhoneCall className="w-4 h-4 text-white" />}
              className="font-bold border-white/30 text-white hover:bg-white/10 px-6 py-3.5 rounded-2xl cursor-pointer text-sm"
            >
              Talk to Our Care Team
            </Button>
          </div>
        </div>
      </section>

      {/* 15. Desktop & Mobile Sticky Booking Bar */}
      <StickyBookingBar onOpenCallback={() => setCallbackModalOpen(true)} />

      {/* Operations Callback Modal */}
      <Modal
        isOpen={callbackModalOpen}
        onClose={() => setCallbackModalOpen(false)}
        title="Talk to Pulse n Care Team"
        maxWidth="md"
      >
        <div className="space-y-4 text-left">
          <p className="text-xs text-text-secondary">
            Leave your contact details. Our Delhi NCR Operations Desk will call you back within 15 minutes to answer clinical or scheduling queries.
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
                Request Operations Callback
              </Button>
            </form>
          ) : (
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs font-bold text-emerald-900 text-center">
              ✓ Callback request received. Our care desk will reach out to +91-{callbackPhone} shortly.
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};
