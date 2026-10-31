import React, { useState, useEffect } from 'react';
import { ScrollProgress } from '../common/ScrollProgress';
import { track } from '../../utils/track';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';
import { WhatsAppIcon, WhatsAppFloatingButton } from '../common/WhatsAppButton';
import { openWhatsApp, WHATSAPP_DISPLAY_PHONE } from '../../utils/whatsapp';
import { ClinicalECGHeartbeat } from '../common/PulseUI';
import {
  ShieldCheck,
  Phone,
  Mail,
  Menu,
  X,
  MapPin,
  ChevronDown,
  Activity,
  UserCheck,
  ShieldPlus,
  HeartPulse,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { DELHI_NCR_SERVICE_HUBS } from '../../data/serviceAreaMatrix';

export const PublicLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [hoveredNavItem, setHoveredNavItem] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedHub, setSelectedHub] = useState(DELHI_NCR_SERVICE_HUBS[0]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns on route change
  useEffect(() => {
    setServicesDropdownOpen(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Count phone-call taps (any tel: link on the site)
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest('a[href^="tel:"]');
      if (a) track('call_click', { page: window.location.pathname });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  // Scroll to hash targets once the routed page has rendered
  useEffect(() => {
    if (!location.hash) return;
    const id = decodeURIComponent(location.hash.slice(1));
    // Sections above the target mount lazily and shift the layout, so re-align a few times
    const timers = [100, 600, 1400].map((delay, i) =>
      window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: i === 0 ? 'smooth' : 'auto', block: 'start' });
      }, delay)
    );
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [location.pathname, location.hash]);

  const navItems = [
    { id: 'home', label: 'Home', href: '/', isRoute: true },
    { id: 'services', label: 'Services', href: '/services', isRoute: true, hasDropdown: true },
    { id: 'about-us', label: 'About & Mission', href: '/#about-us', isRoute: false },
    { id: 'pricing', label: 'Pricing & Rates', href: '/#cost-calculator', isRoute: false },
    { id: 'careers', label: 'Careers', href: '/careers', isRoute: true, badge: '₹10k Bonus' },
    { id: 'faqs', label: 'FAQs', href: '/#faqs', isRoute: false }
  ];

  const serviceCategories = [
    {
      title: 'Hospital Bystander & Patient Attendants',
      desc: 'Non-medical hygiene, bed-baths, sponge baths & 24/7 bedside companion',
      icon: <UserCheck className="w-5 h-5 text-current transition-colors" />,
      path: '/services/general-patient-attendants',
      badge: 'Bystander',
      isRose: false
    },
    {
      title: 'Post Operative Patients Care',
      desc: 'Orthopaedic knee/hip replacement, surgical recovery & wound support',
      icon: <Activity className="w-5 h-5 text-current transition-colors" />,
      path: '/services/post-operative-recovery',
      badge: 'Post-Op',
      isRose: false
    },
    {
      title: 'Newly born & Mother Care',
      desc: 'Postpartum mother care, infant massage, bathing & feeding assistance',
      icon: <HeartPulse className="w-5 h-5 text-current transition-colors" />,
      path: '/services/newborn-mother-care',
      badge: 'Mother & Baby',
      isRose: true
    },
    {
      title: 'Chronic Disease & Palliative Care',
      desc: 'Oncology, stroke rehabilitation, advanced diabetes & vitals monitoring',
      icon: <HeartPulse className="w-5 h-5 text-current transition-colors" />,
      path: '/services/chronic-disease-palliative-care',
      badge: 'Palliative',
      isRose: true
    },
    {
      title: 'Elderly / Disabled Care',
      desc: 'Medication management, walking assistance, fall prevention & toilet routine',
      icon: <ShieldPlus className="w-5 h-5 text-current transition-colors" />,
      path: '/services/elderly-care-assistance',
      badge: 'Elderly / Disabled',
      isRose: false
    },
    {
      title: 'Hospice Care Support',
      desc: 'Compassionate, dignified comfort care and relief for end-of-life patients',
      icon: <HeartPulse className="w-5 h-5 text-current transition-colors" />,
      path: '/services/chronic-disease-palliative-care',
      badge: 'Hospice',
      isRose: true
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased font-sans selection:bg-[#015498] selection:text-white relative overflow-x-hidden w-full max-w-full">
      <a href="#main" className="skip-link">Skip to main content</a>
      <ScrollProgress />
      {/* ========================================================================= */}
      {/* ========================================================================= */}
      {/* LUXURY TOP ANNOUNCEMENT & VERIFIED CLINICAL HOTLINE STRIP                 */}
      {/* ========================================================================= */}
      <div className="bg-[#050F33] text-white border-b border-white/10 text-[11px] sm:text-xs py-2 px-4 sm:px-6 lg:px-8 relative z-50">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 font-medium">
          <div className="flex items-center gap-3 overflow-hidden">
            <span className="inline-flex items-center gap-2 font-bold text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              24/7 Clinical Helpline Active
            </span>
            <span className="hidden sm:inline text-white/30">•</span>
            <span className="hidden md:inline text-slate-300">
              Council-Registered Nurses (DNC/INC) · Rates from ₹35/hr (Advance Payment) · 100% 24h Money-Back
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-5 sm:gap-7 font-bold shrink-0">
            <button
              type="button"
              onClick={() => setLocationModalOpen(true)}
              className="hidden lg:inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              <span>{selectedHub.city}</span>
            </button>
            <a
              href="tel:+919211765429"
              className="inline-flex items-center gap-1.5 text-sky-300 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#25D366]" />
              <span>+91 92117 65429</span>
            </a>
            <a
              href="mailto:pulsencare@gmail.com"
              className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-rose-400" />
              <span>pulsencare@gmail.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* MASTER HEALTHCARE EXECUTIVE NAVBAR (SINGLE HORIZONTAL TIER, ZERO OVERFLOW) */}
      {/* ========================================================================= */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 bg-white/95 backdrop-blur-xl border-b border-slate-200/90 ${
          isScrolled
            ? 'h-16 shadow-[0_4px_24px_rgba(5,15,51,0.08)]'
            : 'h-16 sm:h-20 shadow-[0_1px_4px_rgba(0,0,0,0.03),0_6px_20px_rgba(1,84,152,0.03)]'
        }`}
      >
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Brand Logo with Calibrated Proportions & Trust Badge */}
          <div className="flex items-center shrink-0">
            <Link to="/" className="flex items-center group">
              <img
                src="/assets/brand/pulse-n-care/pulse-n-care-logo-horizontal.webp"
                alt="Pulse n Care — Nurse Care at Doorstep"
                className="h-10 sm:h-11 w-auto transition-transform duration-200 group-hover:scale-[1.03] filter drop-shadow-[0_2px_8px_rgba(1,84,152,0.12)]"
              />
            </Link>
          </div>

          {/* Center Desktop Navigation Menu - Exact Single Horizontal Line, Crystal Clear */}
          <nav
            className="hidden xl:flex items-center gap-1 xl:gap-2 relative h-full"
            onMouseLeave={() => setHoveredNavItem(null)}
          >
            {navItems.map((item) => {
              const isItemActive = item.isRoute
                ? (item.href === '/' ? location.pathname === '/' : location.pathname.startsWith(item.href))
                : false;
              const isHovered = hoveredNavItem === item.id;

              if (item.hasDropdown) {
                return (
                  <div
                    key={item.id}
                    className="relative flex items-center h-full"
                    onMouseEnter={() => {
                      setHoveredNavItem(item.id);
                      setServicesDropdownOpen(true);
                    }}
                    onMouseLeave={() => {
                      setServicesDropdownOpen(false);
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => navigate(item.href)}
                      className={`relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13.5px] font-semibold transition-all duration-150 cursor-pointer whitespace-nowrap z-10 ${
                        isItemActive ? 'text-[#015498] font-bold' : 'text-slate-600 hover:text-slate-950'
                      }`}
                    >
                      {/* Active / Hover Background Pill */}
                      {isHovered ? (
                        <motion.div
                          layoutId="nav-hover-pill"
                          className="absolute inset-0 rounded-full bg-slate-100 -z-1"
                          transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                        />
                      ) : isItemActive ? (
                        <div className="absolute inset-0 rounded-full bg-blue-50/80 border border-blue-200/60 -z-1 shadow-2xs" />
                      ) : null}

                      <span>{item.label}</span>
                    {(item as any).badge && (
                      <span className="ml-1.5 text-[10px] font-black text-amber-800 bg-amber-100/90 px-1.5 py-0.5 rounded-full border border-amber-300 tracking-tight shadow-2xs">
                        {(item as any).badge}
                      </span>
                    )}
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          servicesDropdownOpen ? 'rotate-180 text-[#015498]' : 'text-slate-400'
                        }`}
                      />
                    </button>

                    {/* Mega Dropdown Animated with AnimatePresence & Framer Motion */}
                    <AnimatePresence>
                      {servicesDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.99 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.99 }}
                          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute top-full pt-2 left-1/2 -translate-x-1/2 w-[680px] z-50 pointer-events-auto"
                        >
                          <div className="bg-white/98 backdrop-blur-2xl rounded-3xl shadow-[0_24px_60px_rgba(5,15,51,0.14)] border border-slate-200 p-6 space-y-4 text-left overflow-hidden relative">
                            {/* Top Mega Menu Header */}
                            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
                              <div>
                                <span className="text-[11px] font-black uppercase tracking-widest text-[#C31725] block">
                                  HOSPITAL-GRADE HOMECARE DISCIPLINES
                                </span>
                                <h3 className="text-sm font-extrabold text-slate-900">100% In-House Managed Clinical Staff</h3>
                              </div>
                              <Link
                                to="/services"
                                className="text-xs font-black text-[#015498] hover:text-[#C31725] transition-colors flex items-center gap-1"
                              >
                                <span>Browse Full Directory (11+)</span>
                                <span>→</span>
                              </Link>
                            </div>

                            {/* 2-Column Mega Content Grid */}
                            <div className="grid grid-cols-12 gap-5 pt-1">
                              {/* Left Column: 5 Services (7 Cols) */}
                              <div className="col-span-7 space-y-2">
                                {serviceCategories.map((cat) => (
                                  <Link
                                    key={cat.title}
                                    to={cat.path}
                                    className="flex items-start gap-3 p-2.5 rounded-2xl hover:bg-slate-50 transition-all group border border-transparent hover:border-slate-200/80"
                                  >
                                    <div
                                      className={`p-2 rounded-xl border transition-all shrink-0 flex items-center justify-center ${
                                        cat.isRose
                                          ? 'bg-rose-50 border-rose-100 text-[#C31725] group-hover:bg-[#C31725] group-hover:!text-white group-hover:border-[#C31725]'
                                          : 'bg-blue-50 border-blue-100 text-[#015498] group-hover:bg-[#015498] group-hover:!text-white group-hover:border-[#015498]'
                                      } group-hover:scale-105 [&>svg]:group-hover:!text-white [&>svg]:group-hover:!stroke-white`}
                                    >
                                      {cat.icon}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center justify-between">
                                        <p className="text-xs font-bold text-slate-900 group-hover:text-[#015498] truncate">
                                          {cat.title}
                                        </p>
                                        {cat.badge && (
                                          <span className="text-[11px] font-black text-[#C31725] bg-rose-50 px-1.5 py-0.2 rounded border border-rose-200 uppercase">
                                            {cat.badge}
                                          </span>
                                        )}
                                      </div>
                                      <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                                        {cat.desc}
                                      </p>
                                    </div>
                                  </Link>
                                ))}
                              </div>

                              {/* Right Column: Direct WhatsApp Triage Spotlight Card (5 Cols) */}
                              <div className="col-span-5 bg-[#050F33] rounded-2xl p-5 text-white flex flex-col justify-between border border-slate-800 shadow-inner relative overflow-hidden">
                                <div className="space-y-3 relative z-10">
                                  <div className="flex items-center justify-between">
                                    <span className="text-[11px] font-black uppercase tracking-wider text-rose-300">
                                      Emergency Triage
                                    </span>
                                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                  </div>

                                  <div className="w-full h-10 overflow-hidden rounded-xl bg-slate-900/90 border border-white/10 p-1">
                                    <ClinicalECGHeartbeat variant="dark" height={32} showGrid={false} showTelemetry={false} className="w-full h-full" />
                                  </div>

                                  <div>
                                    <h5 className="text-xs font-black text-white">Unsure what care is needed?</h5>
                                    <p className="text-[11px] text-slate-300 leading-snug mt-1">
                                      Share doctor prescription on WhatsApp. We promptly match qualified nursing staff for your patient.
                                    </p>
                                  </div>
                                </div>

                                <button
                                  type="button"
                                  onClick={() => openWhatsApp('Hello Pulse n Care, please guide me on which healthcare service is best for my patient.')}
                                  className="w-full mt-4 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-extrabold text-xs py-2.5 rounded-xl cursor-pointer shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
                                >
                                  <WhatsAppIcon className="w-3.5 h-3.5 text-white" />
                                  <span>Talk to Desk (Instant)</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              // Standard Navigation Link - Fixed single line, exact height
              const Component = item.isRoute ? Link : 'a';
              const linkProps = item.isRoute ? { to: item.href } : { href: item.href };

              return (
                <div
                  key={item.id}
                  className="relative flex items-center h-full"
                  onMouseEnter={() => setHoveredNavItem(item.id)}
                >
                  <Component
                    {...(linkProps as any)}
                    className={`relative inline-flex items-center px-3 py-1.5 rounded-full text-[13.5px] font-semibold transition-all duration-150 whitespace-nowrap z-10 ${
                      isItemActive ? 'text-[#015498] font-bold' : 'text-slate-600 hover:text-slate-950'
                    }`}
                  >
                    {/* Active / Hover Background Pill */}
                    {isHovered ? (
                      <motion.div
                        layoutId="nav-hover-pill"
                        className="absolute inset-0 rounded-full bg-slate-100 -z-1"
                        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                      />
                    ) : isItemActive ? (
                      <div className="absolute inset-0 rounded-full bg-blue-50/80 border border-blue-200/60 -z-1 shadow-2xs" />
                    ) : null}

                    <span>{item.label}</span>
                    {(item as any).badge && (
                      <span className="ml-1.5 text-[10px] font-black text-amber-800 bg-amber-100/90 px-1.5 py-0.5 rounded-full border border-amber-300 tracking-tight shadow-2xs">
                        {(item as any).badge}
                      </span>
                    )}
                  </Component>
                </div>
              );
            })}
          </nav>

          {/* Right Action Group - Crisp, Clean, Zero Overflow, Subtle Luxury */}
          <div className="hidden xl:flex items-center gap-2.5 xl:gap-3 shrink-0">
            {/* Direct Calling Button */}
            <a
              href="tel:+919211765429"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full btn-glass-frost text-slate-800 text-xs font-bold transition-all group whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-[#015498] group-hover:rotate-12 transition-transform" />
              <span>+91 92117 65429</span>
            </a>

            {/* Standout Premium WhatsApp CTA Button with Tactile Aura */}
            <button
              type="button"
              onClick={() => openWhatsApp('Hello Pulse n Care, I want to book home healthcare / nurse services.')}
              className="inline-flex items-center gap-2 btn-emerald-aura btn-shimmer text-white font-black text-xs sm:text-[13px] px-4.5 py-2 rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 text-white shrink-0" />
              <span className="tracking-tight">Book on WhatsApp</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-slate-800 hover:text-[#015498] rounded-xl hover:bg-slate-100 cursor-pointer"
            aria-label="Toggle Mobile Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Slide-down Drawer Animated with AnimatePresence */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="xl:hidden bg-white border-y border-slate-200 p-5 space-y-4 shadow-2xl text-left overflow-hidden z-50 relative max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-500">Service Area:</span>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setLocationModalOpen(true);
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#015498]"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#C31725]" />
                  <span>{selectedHub.city} (Change)</span>
                </button>
              </div>

              <div className="space-y-1">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-2.5 px-3 rounded-xl text-sm font-bold ${
                    location.pathname === '/' ? 'bg-slate-100 text-[#015498]' : 'text-slate-800'
                  }`}
                >
                  Home
                </Link>
                <Link
                  to="/services"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-2.5 px-3 rounded-xl text-sm font-bold ${
                    location.pathname.startsWith('/services') ? 'bg-slate-100 text-[#015498]' : 'text-slate-800'
                  }`}
                >
                  Services (All 11+ Disciplines)
                </Link>
                <a
                  href="/#about-us"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2.5 px-3 rounded-xl text-sm font-bold text-slate-800 hover:bg-slate-50"
                >
                  About & Mission
                </a>
                <a
                  href="/#cost-calculator"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2.5 px-3 rounded-xl text-sm font-bold text-slate-800 hover:bg-slate-50"
                >
                  Pricing & Rates
                </a>
                <Link
                  to="/careers"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between py-2.5 px-3 rounded-xl text-sm font-bold ${
                    location.pathname === '/careers' ? 'bg-slate-100 text-[#015498]' : 'text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  <span>Careers</span>
                  <span className="text-[10px] font-black text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300">
                    ✨ ₹10k Bonus
                  </span>
                </Link>
                <a
                  href="/#faqs"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2.5 px-3 rounded-xl text-sm font-bold text-slate-800 hover:bg-slate-50"
                >
                  FAQs
                </a>
              </div>

              <div className="pt-2 space-y-2.5 border-t border-slate-100">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openWhatsApp('Hello Pulse n Care, I want to book a doorstep nurse.');
                  }}
                  className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold h-12 rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <WhatsAppIcon className="w-5 h-5 fill-white" />
                  <span>Chat on WhatsApp Now</span>
                </button>

                <a
                  href="tel:+919211765429"
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold h-11 rounded-xl flex items-center justify-center gap-2 text-xs border border-slate-200 transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#015498]" />
                  <span>Call Desk: {WHATSAPP_DISPLAY_PHONE}</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content Body */}
      <main id="main" tabIndex={-1} className="flex-1 pb-16 md:pb-0 outline-none">
        <Outlet />
      </main>

      {/* Global Floating Sticky WhatsApp CTA (Desktop only: md+) */}
      <WhatsAppFloatingButton />

      {/* Global Mobile Floating Action Dock (Mobile only: < md, hidden on service detail / custom bar pages) */}
      <div
        className={`md:hidden fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur-xl border-t border-slate-200/90 shadow-[0_-8px_30px_rgba(5,15,51,0.14)] px-3 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] flex items-center justify-between gap-2.5 ${
          location.pathname.startsWith('/services/') || location.pathname === '/services/home-nursing' ? 'hidden' : ''
        }`}
      >
        <a
          href="tel:+919211765429"
          className="flex-1 flex items-center justify-center gap-2 btn-sapphire-clinical text-xs font-black py-3 px-3 rounded-xl cursor-pointer"
        >
          <Phone className="w-3.5 h-3.5 text-sky-300" />
          <span>Call 92117 65429</span>
        </a>

        <button
          type="button"
          onClick={() => openWhatsApp('Hello Pulse n Care, I want to book verified nurse and caregiver care at home.')}
          className="flex-1 flex items-center justify-center gap-2 btn-emerald-aura btn-shimmer text-xs font-black py-3 px-3 rounded-xl cursor-pointer"
        >
          <WhatsAppIcon className="w-4 h-4 fill-white shrink-0" />
          <span>WhatsApp Care</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* EXECUTIVE HOSPITALITY & CLINICAL FOOTER                                  */}
      {/* ========================================================================= */}
      <footer className="bg-[#050F33] text-white border-t border-white/10 relative overflow-hidden pt-16 pb-20 sm:pb-24 lg:pb-16 text-left">
        {/* Dual Brand Accent Line (Crimson Red + Royal Blue) */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#C31725] via-[#015498] to-[#25D366]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
          
          {/* Top WhatsApp High-Conversion Callout Banner (Shown on inner pages; homepage has dedicated ClosingCTASection) */}
          {location.pathname !== '/' && (
            <div className="bg-gradient-to-r from-[#0B2447] via-[#050F33] to-[#0A192F] rounded-3xl p-6 sm:p-9 border border-blue-400/20 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
              <div className="space-y-2 text-center lg:text-left relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-300 text-xs font-bold border border-rose-500/30">
                  <Sparkles className="w-3.5 h-3.5 text-[#C31725]" />
                  <span>Immediate Healthcare Assistance Available</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Looking for Verified Care at Home?
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl font-normal">
                  Chat directly with our Central Care Desk on WhatsApp. We confirm verified nurse availability, share transparent shift pricing, and arrange care promptly at your doorstep.
                </p>
              </div>
              
              <button
                onClick={() => openWhatsApp('Hello Pulse n Care, I want to arrange doorstep healthcare.')}
                className="w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-3.5 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 sm:gap-2.5 shadow-sm hover:shadow transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer relative z-10 border border-emerald-400/40"
              >
                <WhatsAppIcon className="w-4 h-4 text-white shrink-0" />
                <span>Connect on WhatsApp ({WHATSAPP_DISPLAY_PHONE})</span>
              </button>
            </div>
          )}

          {/* Main Footer Links Columns */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
            {/* Col 1 & 2: Brand Identity & Rigor */}
            <div className="md:col-span-2 space-y-4">
              <Link to="/" className="inline-block group">
                <img
                  src="/assets/brand/pulse-n-care/pulse-n-care-logo-horizontal-dark.webp"
                  alt="Pulse n Care - Nurse Care at Doorstep"
                  className="h-11 sm:h-12 w-auto object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] group-hover:brightness-125 group-hover:scale-[1.02] transition-all"
                />
              </Link>
              <p className="text-xs text-slate-300 leading-relaxed max-w-sm font-medium">
                Pulse n Care is a trusted home non-medical healthcare and doorstep nursing care provider founded in Delhi NCR, delivering verified clinical nursing and caregiver care directly to family residences.
              </p>
              <div className="space-y-2 pt-1">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 text-slate-300 text-xs font-medium border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>98% On-Time Deployment Rate Across NCR</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 text-slate-300 text-xs font-medium border border-white/10">
                  <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Council-Registered Nurses • 24×7 Central Care Desk</span>
                </div>
              </div>
            </div>

            {/* Col 3: Core Healthcare Services */}
            <div className="space-y-3">
              <h2 className="text-xs font-black uppercase tracking-wider text-rose-400">Home Care Services</h2>
              <ul className="space-y-2 text-xs text-slate-300">
                <li><Link to="/services/chronic-disease-palliative-care" onClick={() => window.scrollTo(0, 0)} className="hover:text-white transition-colors">1. Chronic Disease &amp; Palliative Care</Link></li>
                <li><Link to="/services/post-operative-recovery" onClick={() => window.scrollTo(0, 0)} className="hover:text-white transition-colors">2. Post-Operative Recovery</Link></li>
                <li><Link to="/services/general-patient-attendants" onClick={() => window.scrollTo(0, 0)} className="hover:text-white transition-colors">3. General Patient Attendants</Link></li>
                <li><Link to="/services/elderly-care-assistance" onClick={() => window.scrollTo(0, 0)} className="hover:text-white transition-colors">4. Elderly Care Assistance</Link></li>
                <li><Link to="/services/newborn-mother-care" onClick={() => window.scrollTo(0, 0)} className="hover:text-white transition-colors">5. Newborn &amp; Mother Care</Link></li>
                <li><Link to="/careers" className="hover:text-amber-300 font-bold text-amber-400 transition-colors">✨ We're Hiring Nurses (₹10,000 Bonus) →</Link></li>
                <li><a href="/#about-us" className="hover:text-emerald-400 font-bold text-emerald-400 transition-colors">Our Mission & Clinical Vision →</a></li>
              </ul>
            </div>

            {/* Col 4: Clinical Governance & Safety Protocols */}
            <div className="space-y-3">
              <h2 className="text-xs font-black uppercase tracking-wider text-blue-400">Clinical Standards</h2>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> DNC & INC Verified Licenses</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> Biometric Background Verification</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> Medical Officer Protocol Compliance</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> Sterile ICU & Wound Care Standards</li>
              </ul>
            </div>

            {/* Col 5: Operations Contact */}
            <div className="space-y-3">
              <h2 className="text-xs font-black uppercase tracking-wider text-emerald-400">Central Care Desk</h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                Connect with our duty officer for emergency nursing requisitions, shift matching, and patient status updates.
              </p>
              <div className="space-y-2 text-xs text-white font-bold">
                <button
                  onClick={() => openWhatsApp('Hello Pulse n Care, I need support from Central Care Desk.')}
                  className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 cursor-pointer"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-emerald-400" />
                  <span>WhatsApp: {WHATSAPP_DISPLAY_PHONE}</span>
                </button>
                <a
                  href="tel:+919211765429"
                  className="flex items-center gap-2 text-slate-200 hover:text-white transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-sky-400" />
                  <span>Call: +91 92117 65429</span>
                </a>
                <a
                  href="mailto:pulsencare@gmail.com"
                  className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors text-xs"
                >
                  <Mail className="w-3.5 h-3.5 text-rose-400" />
                  <span>pulsencare@gmail.com</span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Copyright, Credits & Disclaimer */}
          <div className="pt-8 pb-32 sm:pb-24 md:pb-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-5 text-xs text-slate-300 font-medium relative z-20">
            <div className="space-y-1.5 text-center md:text-left">
              <p className="text-slate-400">© 2026 Pulse n Care — Home Healthcare &amp; Doorstep Nurse Care Network. All rights reserved.</p>
              <p className="text-[11.5px] text-slate-400 flex items-center justify-center md:justify-start gap-1.5">
                <span>Developed with</span>
                <span className="text-rose-400 text-xs">❤️</span>
                <span>by</span>
                <a
                  href="https://www.qevnaro.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-teal-300 hover:text-white transition-colors underline-offset-2 hover:underline tracking-tight"
                >
                  www.qevnaro.in
                </a>
              </p>
            </div>
            <nav aria-label="Legal" className="flex flex-wrap items-center justify-center md:justify-end gap-2 sm:gap-x-4 text-slate-300 font-semibold text-[11px] sm:text-xs">
              <Link to="/privacy-policy" className="hover:text-white underline-offset-4 hover:underline py-1.5 px-2.5 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white underline-offset-4 hover:underline py-1.5 px-2.5 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-colors">Terms &amp; Refund Policy</Link>
              <Link to="/medical-disclaimer" className="hover:text-white underline-offset-4 hover:underline py-1.5 px-2.5 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-colors">Medical Disclaimer</Link>
            </nav>
          </div>
        </div>
      </footer>

      {/* Region Selector Modal */}
      <Modal
        isOpen={locationModalOpen}
        onClose={() => setLocationModalOpen(false)}
        title="Delhi NCR Service Availability"
        maxWidth="md"
      >
        <div className="space-y-4 text-left">
          <p className="text-xs text-text-secondary">
            Pulse n Care operates an active clinical nursing roster across all major zones in Delhi NCR. Select your city to check immediate shift dispatch:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {DELHI_NCR_SERVICE_HUBS.map((hub) => (
              <button
                key={hub.id}
                onClick={() => {
                  setSelectedHub(hub);
                  setLocationModalOpen(false);
                }}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  selectedHub.id === hub.id
                    ? 'border-[#015498] bg-blue-50/60 shadow-xs ring-1 ring-[#015498]/30'
                    : 'border-border-default bg-white hover:border-blue-200'
                }`}
              >
                <p className="font-extrabold text-text-primary text-xs flex items-center justify-between">
                  <span>{hub.city}</span>
                  {selectedHub.id === hub.id && (
                    <span className="text-[11px] font-black text-[#015498] bg-white px-2 py-0.5 rounded-full border border-blue-200 uppercase">
                      Selected
                    </span>
                  )}
                </p>
                <p className="text-[11px] text-text-muted mt-1">{hub.name}</p>
                <p className="text-[11px] font-bold text-emerald-700 mt-1.5">✓ {hub.pincodePrefixes.length} Pincode Sectors Active</p>
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-end">
            <Button
              size="sm"
              onClick={() => setLocationModalOpen(false)}
              className="bg-[#015498] hover:bg-[#004276] text-white font-bold px-6 rounded-full"
            >
              Confirm Service Region
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
