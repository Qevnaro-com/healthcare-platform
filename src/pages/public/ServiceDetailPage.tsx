import React, { useState } from 'react';
import { usePageMeta } from '../../hooks/usePageMeta';
import { submitCallbackLead } from '../../utils/leads';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useBookings } from '../../context/BookingContext';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { EmptyState } from '../../components/common/EmptyState';
import { WhatsAppIcon } from '../../components/common/WhatsAppButton';
import { openWhatsApp } from '../../utils/whatsapp';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ChevronUp,
  PhoneCall,
  Clock,
  MapPin,
  AlertCircle,
  Activity,
  HelpCircle,
  ChevronRight
} from 'lucide-react';
import type { Service, ServiceShiftOption } from '../../types';
import { clsx } from 'clsx';
import { HomeNursingServicePage } from './HomeNursingServicePage';

export const ServiceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { services } = useBookings();

  // Find service by ID or slug
  const service: Service | undefined = services.find((s) => s.id === id || s.slug === id);
  usePageMeta(service?.name ?? 'Service', service?.shortDescription);

  const [selectedShift, setSelectedShift] = useState<ServiceShiftOption | null>(
    service?.shiftOptions?.[0] || null
  );
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isCallbackModalOpen, setIsCallbackModalOpen] = useState(false);
  const [callbackName, setCallbackName] = useState('');
  const [callbackPhone, setCallbackPhone] = useState('');
  const [callbackNotes, setCallbackNotes] = useState('');
  const [callbackSubmitted, setCallbackSubmitted] = useState(false);

  // Hooks above must run on every render; only now is it safe to branch to the specialised page
  if (id === 'home-nursing' || id === 'home_nursing') {
    return <HomeNursingServicePage />;
  }

  // 404 Fallback if service not found
  if (!service) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <EmptyState
          icon={<AlertCircle className="w-12 h-12 text-rose-500" />}
          title="Service Not Found"
          description="We couldn't find the care service you were looking for. It may have been renamed or relocated."
          actionLabel="Browse All Services"
          onAction={() => navigate('/services')}
        />
      </div>
    );
  }

  // Active shift duration & price calculation
  const activeShift = selectedShift || service.shiftOptions?.[0] || {
    id: 'default',
    label: 'Standard Visit',
    durationLabel: service.estimatedDuration,
    hours: 2,
    priceMultiplier: 1.0
  };

  const calculatedPrice = Math.round(service.pricing.basePrice * activeShift.priceMultiplier);

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitCallbackLead({ name: callbackName, phone: callbackPhone, notes: callbackNotes, source: window.location.pathname });
    setCallbackSubmitted(true);
    setTimeout(() => {
      setIsCallbackModalOpen(false);
      setCallbackSubmitted(false);
      setCallbackName('');
      setCallbackPhone('');
      setCallbackNotes('');
    }, 2000);
  };

  const defaultFaqs = service.faqList || [
    {
      q: 'How does staff assignment work for this service?',
      a: 'Once you submit your booking requirements, our Central Operations Desk matches and assigns a qualified in-house staff member based on your clinical needs, location proximity, and requested time slot.'
    },
    {
      q: 'What equipment do I need to prepare at home?',
      a: 'Our staff bring standard clinical consumables (sterile gloves, BP monitor, pulse oximeter). For specialized procedures, surgeon discharge summary notes and prescribed medications should be available at home.'
    },
    {
      q: 'What is the cancellation policy?',
      a: 'Bookings are 100% refundable if cancelled up to 2 hours before the scheduled shift start time.'
    }
  ];

  return (
    <div className="space-y-16 pb-28 text-left relative bg-white overflow-hidden">

      {/* 01. Breadcrumb & Top Hero Header */}
      <section className="bg-gradient-to-b from-slate-50 via-teal-50/20 to-white border-b border-border-default pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-text-muted">
            <Link to="/" className="hover:text-brand-teal transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/services" className="hover:text-brand-teal transition-colors">Services</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-brand-teal font-extrabold">{service.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-canvas-teal text-brand-teal px-3.5 py-1.5 rounded-full text-xs font-extrabold border border-teal-200 uppercase tracking-widest shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-brand-teal" /> Verified In-House Clinical Service
              </div>

              <h1 className="text-4xl sm:text-5xl font-extrabold text-text-primary tracking-tight leading-tight">
                {service.name}
              </h1>

              <p className="text-base sm:text-lg text-text-secondary leading-relaxed font-medium">
                {service.fullDescription}
              </p>

              {/* Ideal for Tags */}
              {service.idealFor && (
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-xs font-bold text-text-muted uppercase tracking-wider block w-full">Recommended For:</span>
                  {service.idealFor.map((tag, idx) => (
                    <span key={idx} className="bg-white text-brand-teal px-3 py-1 rounded-lg text-xs font-bold border border-teal-200 shadow-2xs">
                      ✓ {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => openWhatsApp(`Hello Pulse n Care, I want to book ${service.name} (${activeShift.label}) at Rs. ${calculatedPrice}.`)}
                  className="flex items-center justify-center gap-2 sm:gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] font-extrabold text-white px-5 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base cursor-pointer shadow-md rounded-full transition-all hover:scale-105"
                >
                  <WhatsAppIcon className="w-5 h-5 fill-white" />
                  <span>Book via WhatsApp</span>
                </button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => setIsCallbackModalOpen(true)}
                  leftIcon={<PhoneCall className="w-4 h-4 text-brand-teal" />}
                  className="font-bold border-border-default cursor-pointer text-text-primary bg-white text-sm sm:text-base"
                >
                  Talk To Our Care Team
                </Button>
              </div>
            </div>

            {/* Right Media Display Card */}
            <div className="lg:col-span-5">
              <div className="bg-white p-6 rounded-3xl border border-border-default shadow-card space-y-4">
                <div className="aspect-video rounded-2xl bg-canvas-teal flex items-center justify-center border border-teal-200 overflow-hidden relative">
                  <img loading="lazy" decoding="async"
                    src={service.heroMedia || service.cardMedia || 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80'}
                    alt={service.name}
                    className="w-full h-full object-cover object-top"
                  />
                  <span className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-extrabold text-brand-teal border border-teal-200 shadow-2xs">
                    Starting ₹{service.pricing.basePrice} / {service.pricing.priceUnit.replace('per_', '')}
                  </span>
                </div>

                <div className="space-y-2 text-xs text-text-secondary pt-2">
                  <div className="flex items-center justify-between border-b border-border-light pb-2">
                    <span className="font-bold text-text-muted">Qualifications:</span>
                    <span className="font-extrabold text-text-primary">{service.requiredQualifications.join(', ')}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-border-light pb-2">
                    <span className="font-bold text-text-muted">Estimated Duration:</span>
                    <span className="font-extrabold text-brand-teal">{service.estimatedDuration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-text-muted">Service Region:</span>
                    <span className="font-extrabold text-emerald-600 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" /> Doorstep Service
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02. Who This Service Is For (Scenario Cards) */}
      {service.whoItsForList && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-extrabold text-brand-teal uppercase tracking-widest">Clinical Scenarios</span>
            <h2 className="font-display text-2xl font-semibold text-text-primary">Who This Care Service Is For</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {service.whoItsForList.map((item, idx) => (
              <Card key={idx} className="p-6 border-border-default shadow-2xs space-y-3 bg-white">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-brand-teal flex items-center justify-center font-bold border border-teal-200">
                  <Activity className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-text-primary text-base">{item.title}</h3>
                <p className="text-xs text-text-muted leading-relaxed font-medium">{item.desc}</p>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* 03. What We Provide (Categorized Inclusions) vs. What We Do NOT Provide */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* What We Provide */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-extrabold text-brand-teal uppercase tracking-widest">Clinical Scope</span>
              <h2 className="font-display text-2xl font-semibold text-text-primary">What We Provide</h2>
            </div>

            <Card className="p-6 border-border-default shadow-subtle space-y-4 bg-white">
              {service.keyInclusions.map((inclusion, idx) => (
                <div key={idx} className="flex items-start gap-3 text-sm text-text-primary font-semibold">
                  <CheckCircle2 className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                  <span>{inclusion}</span>
                </div>
              ))}
            </Card>
          </div>

          {/* What We Do NOT Provide (Factual Exclusions) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">Exclusions & Boundaries</span>
              <h2 className="font-display text-2xl font-semibold text-text-primary">What We Do Not Provide</h2>
            </div>

            <Card className="p-6 border-border-default shadow-subtle space-y-4 bg-slate-50/70">
              {(service.exclusions || [
                'Operating room surgical procedures',
                'General domestic maid work or family cooking',
                'Emergency ambulance transport without prior booking'
              ]).map((exclusion, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs text-text-muted font-medium">
                  <XCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <span>{exclusion}</span>
                </div>
              ))}
            </Card>
          </div>
        </div>
      </section>

      {/* 04. Selectable Shift & Duration Options Cards */}
      {service.shiftOptions && service.shiftOptions.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-extrabold text-brand-teal uppercase tracking-widest">Schedule Options</span>
            <h2 className="font-display text-2xl font-semibold text-text-primary">Select Available Shift Timing</h2>
            <p className="text-xs text-text-muted">Choose your preferred shift duration to calculate updated price estimates.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {service.shiftOptions.map((opt) => {
              const isSelected = activeShift.id === opt.id;
              const shiftPrice = Math.round(service.pricing.basePrice * opt.priceMultiplier);

              return (
                <Card
                  key={opt.id}
                  onClick={() => setSelectedShift(opt)}
                  className={clsx(
                    'p-5 border cursor-pointer transition-all space-y-3 relative',
                    isSelected
                      ? 'border-brand-teal ring-2 ring-brand-teal/20 bg-canvas-teal/20 shadow-md'
                      : 'border-border-default bg-white hover:border-teal-200 shadow-2xs'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-brand-teal flex items-center gap-1.5">
                      <Clock className="w-4 h-4" /> {opt.durationLabel}
                    </span>
                    {isSelected && <CheckCircle2 className="w-5 h-5 text-brand-teal" />}
                  </div>

                  <h3 className="font-extrabold text-text-primary text-base">{opt.label}</h3>

                  <div className="pt-2 border-t border-border-light flex items-center justify-between">
                    <span className="text-[10px] font-bold text-text-muted uppercase">Estimated Rate</span>
                    <span className="text-base font-extrabold text-brand-teal">₹{shiftPrice}</span>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>
      )}

      {/* 05. Operational Service Area Badge */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-canvas-teal/50 p-6 rounded-3xl border border-teal-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-white text-brand-teal flex items-center justify-center font-bold border border-teal-200 shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-text-primary">Service Availability Notice</h3>
              <p className="text-xs text-text-secondary">Available with 24/7 internal staff allocation & real-time scheduling.</p>
            </div>
          </div>
          <span className="text-xs font-extrabold text-brand-teal bg-white px-3 py-1.5 rounded-full border border-teal-200 shrink-0">
            Pincode Check at Checkout
          </span>
        </div>
      </section>

      {/* 06. Service-Specific FAQ Accordion */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="font-display text-2xl font-semibold text-text-primary">Service FAQs</h2>
          <p className="text-xs text-text-muted">Questions regarding {service.name}</p>
        </div>

        <div className="space-y-3">
          {defaultFaqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <Card
                key={idx}
                onClick={() => setOpenFaq(isOpen ? null : idx)}
                className="p-5 border-border-default shadow-2xs cursor-pointer space-y-2 hover:border-teal-300 transition-colors bg-white"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-extrabold text-text-primary text-sm sm:text-base flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-brand-teal shrink-0" /> {faq.q}
                  </h3>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-brand-teal shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-text-muted shrink-0" />
                  )}
                </div>
                {isOpen && (
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed pt-2 border-t border-border-light font-medium">
                    {faq.a}
                  </p>
                )}
              </Card>
            );
          })}
        </div>
      </section>

      {/* 07. Sticky Action Bar (Fixed Bottom Bar on Mobile/Desktop) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-border-default p-3 sm:p-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-floating">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 flex items-center justify-between gap-2 sm:gap-4">
          <div className="text-left min-w-0">
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider block">Selected Service & Shift</span>
            <p className="text-xs sm:text-base font-extrabold text-text-primary truncate max-w-[140px] sm:max-w-md">
              {service.name} • <span className="text-brand-teal">{activeShift.label}</span>
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="text-right hidden sm:block">
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider block">Est. Cost</span>
              <p className="text-lg font-extrabold text-brand-teal">₹{calculatedPrice}</p>
            </div>
            <button
              type="button"
              onClick={() => openWhatsApp(`Hello Pulse n Care, I want to book ${service.name} (${activeShift.label}) at Rs. ${calculatedPrice}.`)}
              className="flex items-center gap-1.5 sm:gap-2 bg-[#25D366] hover:bg-[#20bd5a] font-black text-white px-3.5 sm:px-8 py-2.5 sm:py-3 rounded-full cursor-pointer shadow-md transition-all hover:scale-105 text-xs sm:text-base shrink-0"
            >
              <WhatsAppIcon className="w-4 h-4 fill-white shrink-0" />
              <span>Book via WhatsApp</span>
            </button>
          </div>
        </div>
      </div>

      {/* 08. Callback Modal ("Talk to Care Team") */}
      <Modal
        isOpen={isCallbackModalOpen}
        onClose={() => setIsCallbackModalOpen(false)}
        title="Talk to Our Care Team"
        subtitle={`Request a call from our Central Operations Desk regarding ${service.name}`}
      >
        {callbackSubmitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-text-primary">Callback Request Received!</h3>
            <p className="text-xs text-text-muted">Our Care Concierge team will call you at {callbackPhone} promptly.</p>
          </div>
        ) : (
          <form onSubmit={handleCallbackSubmit} className="space-y-4">
            <Input
              label="Your Full Name"
              placeholder="e.g. Rahul Mehta"
              required
              value={callbackName}
              onChange={(e) => setCallbackName(e.target.value)}
            />
            <Input
              label="Phone Number (+91)"
              placeholder="e.g. 9876543210"
              required
              type="tel"
              value={callbackPhone}
              onChange={(e) => setCallbackPhone(e.target.value)}
            />
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Care Requirement Notes</label>
              <textarea
                rows={3}
                placeholder="Briefly describe what assistance or timing you need..."
                value={callbackNotes}
                onChange={(e) => setCallbackNotes(e.target.value)}
                className="w-full p-3 text-xs font-medium text-slate-900 border border-border-default rounded-xl focus:outline-none focus:border-brand-teal"
              />
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              By submitting, you agree to be contacted about your enquiry. See our{' '}
              <a href="/privacy-policy" className="text-[#015498] font-semibold underline underline-offset-2">Privacy Policy</a>.
            </p>
            <Button type="submit" variant="primary" className="w-full font-bold cursor-pointer">
              Submit Callback Request
            </Button>
          </form>
        )}
      </Modal>
    </div>
  );
};
