import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookings } from '../../context/BookingContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { ServiceCard } from '../../components/domain/ServiceCard';
import { HealthcareTexture } from '../../components/common/HealthcareTexture';
import { EmptyState } from '../../components/common/EmptyState';
import { Skeleton } from '../../components/common/Skeleton';
import type { ServiceCategory, Service } from '../../types';
import {
  HeartPulse,
  UserCheck,
  Activity,
  Stethoscope,
  ShieldPlus,
  Search,
  ArrowRight,
  ShieldCheck,
  MapPin,
  ChevronDown,
  ChevronUp,
  Sparkles,
  PhoneCall,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';
import { clsx } from 'clsx';

export const ServicesPage: React.FC = () => {
  const navigate = useNavigate();
  const { services } = useBookings();
  const isLoading = false;
  const [activeCategory, setActiveCategory] = useState<ServiceCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const categories: { id: ServiceCategory | 'all'; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'All Care Needs', icon: <HeartPulse className="w-4 h-4" /> },
    { id: 'home_nursing', label: 'Clinical Nursing', icon: <Activity className="w-4 h-4" /> },
    { id: 'caregiver_attendant', label: 'Attendant & Daily Care', icon: <UserCheck className="w-4 h-4" /> },
    { id: 'physiotherapy', label: 'Physical Therapy', icon: <Activity className="w-4 h-4" /> },
    { id: 'doctor_visit', label: 'Doctor Visit', icon: <Stethoscope className="w-4 h-4" /> },
    { id: 'specialized_care', label: 'Specialized ICU Care', icon: <ShieldPlus className="w-4 h-4" /> }
  ];

  const featuredService = services.find((s) => s.featured) || services[0];

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
      q: 'Are these services available in my locality in Delhi NCR?',
      a: 'We operate across Delhi, Noida, Gurugram, and Faridabad. During booking Step 4, your address pincode is validated against active regional care hubs.'
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

  return (
    <div className="space-y-16 pb-20 text-left relative bg-white overflow-hidden">
      <HealthcareTexture type="medical-grid" opacity={0.03} />

      {/* 01. Hero Section — Care Concierge Persona */}
      <section className="bg-gradient-to-b from-slate-50 via-teal-50/20 to-white pt-12 pb-16 border-b border-border-default relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Storytelling Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-canvas-teal text-brand-teal px-3.5 py-1.5 rounded-full text-xs font-extrabold border border-teal-200 uppercase tracking-widest shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-brand-teal" /> In-House Managed Clinical Services • Delhi NCR
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-text-primary tracking-tight leading-[1.1]">
                Care Designed Around What You <span className="text-brand-teal">Really Need.</span>
              </h1>

              <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl font-medium">
                Explore hospital-grade home nursing, trained caregiver attendant care, physical rehabilitation, general physician visits, and 24/7 ICU support delivered by our verified care team.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button
                  size="lg"
                  variant="primary"
                  onClick={() => navigate('/client/booking/wizard')}
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                  className="bg-brand-teal hover:bg-brand-teal-hover text-white font-bold px-8 py-4 text-base cursor-pointer shadow-subtle"
                >
                  Schedule A Care Service
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/client/support')}
                  leftIcon={<PhoneCall className="w-4 h-4 text-brand-teal" />}
                  className="font-bold border-border-default cursor-pointer text-text-primary"
                >
                  Talk To Our Care Team
                </Button>
              </div>
            </div>

            {/* Right Visual Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border border-border-default shadow-card bg-white p-2">
                <img
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80"
                  alt="Pulse n Care Clinical Home Care"
                  className="w-full h-80 sm:h-96 object-cover rounded-2xl"
                />
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-teal-200 shadow-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 text-brand-teal flex items-center justify-center font-bold border border-teal-200">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-extrabold text-text-primary">100% Council Verified</p>
                      <p className="text-[11px] text-text-muted">In-house nurses & caregivers</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-extrabold text-brand-teal bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
                    Delhi NCR
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02. Search & Discovery Workspace */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="bg-canvas-secondary p-5 sm:p-6 rounded-3xl border border-border-default space-y-5 shadow-subtle">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-4 top-3.5 text-text-muted" />
              <input
                type="text"
                placeholder="What kind of care are you looking for? (e.g., wound dressing, elderly care, knee rehab)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-12 pr-4 text-sm font-semibold text-text-primary bg-white border border-border-default rounded-xl focus:outline-none focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20"
              />
            </div>
            <div className="text-xs font-bold text-text-muted bg-white px-4 py-3 rounded-xl border border-border-default shrink-0 text-center">
              Showing <span className="text-brand-teal">{filteredServices.length}</span> Services
            </div>
          </div>

          {/* Category Chips Navigation */}
          <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={clsx(
                    'flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all shrink-0 cursor-pointer border',
                    isActive
                      ? 'bg-brand-teal text-white border-brand-teal shadow-xs'
                      : 'bg-white text-text-secondary border-border-default hover:bg-canvas-tertiary hover:text-text-primary'
                  )}
                >
                  {cat.icon}
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 03. Featured Service Banner */}
      {featuredService && activeCategory === 'all' && searchQuery === '' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-6 sm:p-8 border-brand-teal bg-gradient-to-r from-teal-50/70 via-white to-blue-50/50 shadow-card relative overflow-hidden">
            <HealthcareTexture type="care-pathway" opacity={0.04} />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-1.5 bg-brand-teal text-white px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5" /> Featured Clinical Offering
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary">
                  {featuredService.name}
                </h2>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-medium">
                  {featuredService.fullDescription}
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {featuredService.keyInclusions.map((inc, idx) => (
                    <span key={idx} className="bg-white text-brand-teal px-3 py-1 rounded-lg text-xs font-bold border border-teal-200 shadow-2xs flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" /> {inc}
                    </span>
                  ))}
                </div>
                <div className="pt-2 flex items-center gap-4">
                  <Button
                    variant="primary"
                    onClick={() => navigate(`/services/${featuredService.slug || featuredService.id}`)}
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                    className="font-bold text-xs"
                  >
                    View Featured Service
                  </Button>
                  <span className="text-xs font-extrabold text-brand-teal">
                    From ₹{featuredService.pricing.basePrice} / visit
                  </span>
                </div>
              </div>
              <div className="lg:col-span-5">
                <img
                  src={featuredService.cardMedia || 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80'}
                  alt={featuredService.name}
                  className="w-full h-56 sm:h-64 object-cover rounded-2xl border border-teal-200 shadow-subtle"
                />
              </div>
            </div>
          </Card>
        </section>
      )}

      {/* 04. 3-Column Service Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-extrabold text-text-primary tracking-tight">Available Home Care Services</h2>
          <span className="text-xs font-bold text-text-muted">Delhi NCR Operational Areas</span>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white p-5 rounded-2xl border border-border-default space-y-4 animate-pulse">
                <Skeleton variant="card" className="h-40" />
                <Skeleton variant="text" className="w-3/4 h-5" />
                <Skeleton variant="text" className="w-full h-4" />
                <Skeleton variant="rectangular" className="h-10" />
              </div>
            ))}
          </div>
        ) : filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="We couldn't find that care service"
            description={`No clinical services matched your search "${searchQuery}". Try searching for another care type or browse all categories.`}
            actionLabel="View All Services"
            onAction={() => {
              setSearchQuery('');
              setActiveCategory('all');
            }}
          />
        )}
      </section>

      {/* 05. 4-Step Booking Pathway with Connecting SVG Line */}
      <section className="bg-canvas-secondary border-y border-border-default py-16 relative">
        <HealthcareTexture type="care-pathway" opacity={0.04} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-extrabold text-brand-teal uppercase tracking-widest">Care Concierge Process</span>
            <h2 className="text-3xl font-extrabold text-text-primary">How Booking A Service Works</h2>
            <p className="text-xs sm:text-sm text-text-secondary font-medium">
              We manage the entire care lifecycle — from your request to internal staff dispatch and live session tracking.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 relative">
            {[
              { step: '01', title: 'Choose Your Care', desc: 'Select a service and specify clinical requirements for your patient.' },
              { step: '02', title: 'Tell Us Location & Time', desc: 'Pick your address in Delhi NCR and select shift timings.' },
              { step: '03', title: 'We Arrange Your Staff', desc: 'Central Operations assigns a council-verified in-house professional.' },
              { step: '04', title: 'Care Begins at Home', desc: 'Staff arrives on time with real-time GPS tracking and digital logs.' }
            ].map((st, idx) => (
              <Card key={idx} className="p-6 border-border-default shadow-2xs space-y-3 relative bg-white">
                <span className="w-10 h-10 rounded-xl bg-teal-50 text-brand-teal font-extrabold flex items-center justify-center text-sm border border-teal-200">
                  {st.step}
                </span>
                <h3 className="font-extrabold text-text-primary text-base">{st.title}</h3>
                <p className="text-xs text-text-muted leading-relaxed">{st.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 06. Operational Service Coverage */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-3xl border border-border-default shadow-subtle flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-left">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold text-brand-teal uppercase tracking-widest">
              <MapPin className="w-4 h-4 text-brand-teal" /> Verified Service Coverage
            </div>
            <h3 className="text-2xl font-extrabold text-text-primary">Active Operational Regions</h3>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-medium">
              Pulse n Care currently operates dedicated clinical hubs across Delhi, Noida, Gurugram, and Faridabad. Pincodes are validated during booking.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {['New Delhi', 'South Delhi', 'Noida (Sec 15-128)', 'Gurugram (DLF 1-5)', 'Faridabad'].map((loc, idx) => (
                <span key={idx} className="bg-canvas-teal text-brand-teal px-3 py-1 rounded-full text-xs font-bold border border-teal-200">
                  ✓ {loc}
                </span>
              ))}
            </div>
          </div>
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate('/client/booking/wizard')}
            className="font-bold cursor-pointer shrink-0"
          >
            Check My Location Coverage
          </Button>
        </div>
      </section>

      {/* 07. FAQ Accordion Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-extrabold text-text-primary">Frequently Asked Questions</h2>
          <p className="text-xs text-text-muted">Everything you need to know about Pulse n Care services</p>
        </div>

        <div className="space-y-3">
          {catalogFaqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <Card
                key={idx}
                onClick={() => setOpenFaq(isOpen ? null : idx)}
                className="p-5 border-border-default shadow-2xs cursor-pointer space-y-2 hover:border-teal-300 transition-colors"
              >
                <div className="flex items-center justify-between gap-4">
                  <h4 className="font-extrabold text-text-primary text-sm sm:text-base flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-brand-teal shrink-0" /> {faq.q}
                  </h4>
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

      {/* 08. Final CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-teal-600 via-teal-700 to-blue-700 text-white p-8 sm:p-12 rounded-3xl shadow-card space-y-6 text-center relative overflow-hidden">
          <HealthcareTexture type="medical-halo" opacity={0.12} />
          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Need Medical Care at Home Today?</h2>
            <p className="text-sm text-teal-100 font-medium">
              Submit your care requirements in under 3 minutes. Our Central Operations Desk will assign qualified in-house staff.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                onClick={() => navigate('/client/booking/wizard')}
                className="bg-white text-brand-teal hover:bg-slate-100 font-extrabold px-8 py-4 text-base cursor-pointer shadow-md"
              >
                Book Care Service Now
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
