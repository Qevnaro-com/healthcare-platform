import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookings } from '../../context/BookingContext';
import { Button } from '../../components/common/Button';
import { HealthcareTexture } from '../../components/common/HealthcareTexture';
import {
  PulseSurface,
  PulseEmptyState,
  PulseStatus
} from '../../components/common/PulseUI';
import { VISUAL_ASSETS } from '../../data/visualAssets';
import type { ServiceCategory, Service } from '../../types';
import {
  HeartPulse,
  UserCheck,
  Activity,
  ShieldPlus,
  Search,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  PhoneCall,
  CheckCircle2,
  HelpCircle,
  ChevronRight
} from 'lucide-react';
import { clsx } from 'clsx';

export const ServicesPage: React.FC = () => {
  const navigate = useNavigate();
  const { services } = useBookings();
  const [activeCategory, setActiveCategory] = useState<ServiceCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredServiceId, setHoveredServiceId] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const categories: { id: ServiceCategory | 'all'; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'All Care Needs', icon: <HeartPulse className="w-4 h-4" /> },
    { id: 'home_nursing', label: 'Clinical Nursing', icon: <Activity className="w-4 h-4" /> },
    { id: 'caregiver_attendant', label: 'Attendant & Daily Care', icon: <UserCheck className="w-4 h-4" /> },
    { id: 'specialized_care', label: 'High-Dependency Nursing', icon: <ShieldPlus className="w-4 h-4" /> }
  ];

  const filteredServices = services.filter((s: Service) => {
    const matchesCat = activeCategory === 'all' || s.category === activeCategory;
    const matchesQuery =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.idealFor && s.idealFor.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCat && matchesQuery;
  });

  const catalogFaqs = [
    {
      q: 'Which service is right for my family patient?',
      a: 'If your loved one requires sterile wound dressing, IV injections, or catheter monitoring, choose Clinical Nursing. For assistance with bathing, mobility, feeding, and bedside supervision, choose Caregiver / Attendant. For post-op joint or stroke recovery, select Physical Therapy.'
    },
    {
      q: 'Are these services available in my locality?',
      a: 'We operate an internal managed clinical workforce. During booking, your address pincode is validated for immediate service allocation.'
    },
    {
      q: 'How are clinical staff members assigned?',
      a: 'Pulse n Care owns and manages its internal clinical workforce. Once you submit a care request, Central Operations assigns a qualified, council-verified nurse or caregiver matching your clinical needs and requested schedule.'
    },
    {
      q: 'Can I request a 10-hour night shift or 24-hour live-in care?',
      a: 'Yes! Both 10-hour night shifts (10:00 PM to 08:00 AM next day) and 24-hour live-in care options are fully supported with transparent pricing.'
    }
  ];

  const activeService = services.find((s) => s.id === hoveredServiceId) || filteredServices[0] || services[0];

  return (
    <div className="space-y-16 pb-20 text-left relative bg-canvas-primary overflow-hidden">
      <HealthcareTexture type="medical-grid" opacity={0.03} />

      {/* 01. Hero Section — Asymmetric Editorial Layout */}
      <section className="bg-gradient-to-b from-slate-50 via-teal-50/20 to-white pt-12 pb-16 border-b border-border-default relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-teal-50 text-brand-teal px-3.5 py-1.5 rounded-full text-xs font-heading font-extrabold border border-brand-teal/20 uppercase tracking-widest shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-brand-teal" /> CLINICAL CATALOG & SERVICE INDEX / 01
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-text-primary tracking-tight leading-[1.1]">
                Hospital-grade care, delivered at <span className="text-brand-teal">home.</span>
              </h1>

              <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl font-medium font-sans">
                Browse our internal clinical nursing, bedside attendant, orthopedic rehabilitation, general physician, and critical ICU offerings managed across Delhi NCR.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button
                  size="lg"
                  variant="primary"
                  onClick={() => navigate('/client/booking/wizard')}
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                  className="bg-brand-teal hover:bg-brand-teal-hover text-white font-bold px-8 py-4 text-base cursor-pointer shadow-subtle rounded-full"
                >
                  Schedule Care Service
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/client/support')}
                  leftIcon={<PhoneCall className="w-4 h-4 text-brand-teal" />}
                  className="font-bold border-border-default cursor-pointer text-text-primary rounded-full bg-white"
                >
                  Talk To Care Concierge
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <PulseSurface variant="feature" padding="none" pulseAccent="top" className="p-2">
                <div className="relative rounded-xl overflow-hidden aspect-video w-full">
                  <img
                    src={VISUAL_ASSETS.servicePostOpHero?.url || 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80'}
                    alt="Pulse n Care Clinical Services"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3 rounded-xl border border-brand-teal/30 shadow-floating flex items-center justify-between">
                    <div>
                      <p className="text-xs font-heading font-extrabold text-text-primary">Managed Clinical Roster</p>
                      <p className="text-[11px] text-text-muted">100% Council Verified Staff</p>
                    </div>
                    <PulseStatus status="success" label="Delhi NCR" size="sm" />
                  </div>
                </div>
              </PulseSurface>
            </div>
          </div>
        </div>
      </section>

      {/* 02. Search & Category Filter Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <PulseSurface variant="raised" padding="lg" className="space-y-5 bg-pulse-blueprint">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-4 top-3.5 text-text-muted" />
              <input
                type="text"
                placeholder="Search by procedure, care type, or clinical requirement (e.g. post-op, catheter, knee rehab)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-12 pr-4 text-sm font-sans font-medium text-text-primary bg-white border border-border-default rounded-xl focus:outline-none focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20"
              />
            </div>
            <div className="text-xs font-bold text-text-muted bg-white px-4 py-3 rounded-xl border border-border-default shrink-0 text-center font-heading">
              <span className="text-brand-teal font-extrabold">{filteredServices.length}</span> Clinical Services Available
            </div>
          </div>

          <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={clsx(
                    'flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-heading font-bold transition-all shrink-0 cursor-pointer border',
                    isActive
                      ? 'bg-brand-teal text-white border-brand-teal shadow-xs'
                      : 'bg-white text-text-secondary border-border-default hover:bg-slate-100 hover:text-text-primary'
                  )}
                >
                  {cat.icon}
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </PulseSurface>
      </section>

      {/* 03. NUMBERED EDITORIAL SERVICE INDEX (RULE 26 COMPLIANCE - NO GENERIC 3-CARD REPETITION) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between border-b border-border-light pb-4">
          <div>
            <span className="text-2xs font-heading font-extrabold uppercase tracking-widest text-brand-teal block">
              SERVICE INDEX & INTERACTIVE PREVIEW / 02
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-text-primary tracking-tight">
              Interactive Care Offerings Directory
            </h2>
          </div>
          <span className="text-xs font-bold text-text-muted">Hover row to inspect clinical scope</span>
        </div>

        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Numbered Service Index Rows */}
            <div className="lg:col-span-6 space-y-3">
              {filteredServices.map((service, idx) => {
                const isHovered = (hoveredServiceId || activeService.id) === service.id;
                const num = (idx + 1).toString().padStart(2, '0');

                return (
                  <div
                    key={service.id}
                    onMouseEnter={() => setHoveredServiceId(service.id)}
                    onClick={() => navigate(`/services/${service.slug || service.id}`)}
                    className={clsx(
                      'p-4 sm:p-5 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-4 group',
                      isHovered
                        ? 'bg-white border-brand-teal shadow-card ring-1 ring-brand-teal/30'
                        : 'bg-surface-subtle/40 border-border-default hover:bg-white hover:border-slate-300'
                    )}
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <span className={clsx('font-mono text-base font-black shrink-0', isHovered ? 'text-brand-teal' : 'text-text-muted')}>
                        {num}
                      </span>
                      <div className="min-w-0">
                        <h3 className={clsx('font-heading font-bold text-base tracking-tight truncate', isHovered ? 'text-brand-teal' : 'text-text-primary')}>
                          {service.name}
                        </h3>
                        <p className="text-xs text-text-muted font-sans line-clamp-1 mt-0.5">
                          {service.shortDescription}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="hidden sm:inline-block font-mono text-xs font-bold text-brand-teal bg-teal-50 px-2.5 py-1 rounded border border-brand-teal/20">
                        ₹{service.pricing.basePrice}
                      </span>
                      <ChevronRight className={clsx('w-5 h-5 transition-transform', isHovered ? 'text-brand-teal translate-x-1' : 'text-text-muted')} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Dynamic Preview Surface */}
            <div className="lg:col-span-6 sticky top-8">
              <PulseSurface variant="feature" pulseAccent="top" padding="lg" className="space-y-5">
                <div className="relative rounded-xl overflow-hidden aspect-video w-full">
                  <img
                    src={activeService.cardMedia || 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80'}
                    alt={activeService.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-brand-teal border border-brand-teal/20">
                    Category: {activeService.category.replace('_', ' ').toUpperCase()}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-heading font-extrabold text-text-primary">
                      {activeService.name}
                    </h3>
                    <span className="font-heading font-black text-brand-teal text-base">
                      From ₹{activeService.pricing.basePrice}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-sans font-medium">
                    {activeService.fullDescription}
                  </p>

                  <div className="space-y-2 pt-2">
                    <h4 className="text-2xs font-heading font-extrabold uppercase tracking-widest text-text-muted">Key Inclusions & Clinical Scope</h4>
                    <div className="flex flex-wrap gap-2">
                      {activeService.keyInclusions.map((inc, i) => (
                        <span key={i} className="bg-teal-50 text-brand-teal px-2.5 py-1 rounded-md text-xs font-bold border border-brand-teal/20 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> {inc}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between border-t border-border-light">
                    <Button
                      variant="primary"
                      onClick={() => navigate(`/services/${activeService.slug || activeService.id}`)}
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                      className="bg-brand-teal text-white rounded-full text-xs font-bold px-6 py-2.5"
                    >
                      Book {activeService.name}
                    </Button>

                    <span className="text-xs text-text-muted font-sans font-medium">
                      24×7 Central Operations
                    </span>
                  </div>
                </div>
              </PulseSurface>
            </div>
          </div>
        ) : (
          <PulseEmptyState
            title="No matching services found"
            description={`No clinical services matched your criteria. Try resetting search or category.`}
            action={
              <Button
                variant="primary"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="bg-brand-teal text-white rounded-full text-xs font-bold"
              >
                Reset Search Filters
              </Button>
            }
          />
        )}
      </section>

      {/* 04. FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-heading font-extrabold text-text-primary">Frequently Asked Questions</h2>
          <p className="text-xs text-text-muted font-sans">Everything you need to know about Pulse n Care service booking</p>
        </div>

        <div className="space-y-3">
          {catalogFaqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <PulseSurface
                key={idx}
                variant="flat"
                padding="md"
                onClick={() => setOpenFaq(isOpen ? null : idx)}
                className="cursor-pointer space-y-2 hover:border-brand-teal/40 transition-colors"
              >
                <div className="flex items-center justify-between gap-4">
                  <h4 className="font-heading font-bold text-text-primary text-sm sm:text-base flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-brand-teal shrink-0" /> {faq.q}
                  </h4>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-brand-teal shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-text-muted shrink-0" />
                  )}
                </div>
                {isOpen && (
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed pt-2 border-t border-border-light font-medium font-sans">
                    {faq.a}
                  </p>
                )}
              </PulseSurface>
            );
          })}
        </div>
      </section>
    </div>
  );
};
