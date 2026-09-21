import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { DemoRoleSwitcher } from '../common/DemoRoleSwitcher';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';
import { HealthcareTexture } from '../common/HealthcareTexture';
import {
  Bell,
  ShieldCheck,
  Phone,
  Menu,
  X,
  MapPin,
  ChevronDown,
  Building2,
  Activity,
  UserCheck,
  ShieldPlus,
  ArrowRight,
  HeartPulse
} from 'lucide-react';
import { DELHI_NCR_SERVICE_HUBS } from '../../data/serviceAreaMatrix';

export const PublicLayout: React.FC = () => {
  const { currentRole } = useAuth();
  const { unreadCount } = useNotifications();
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [orgDropdownOpen, setOrgDropdownOpen] = useState(false);
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
    setOrgDropdownOpen(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const serviceCategories = [
    {
      title: 'Clinical Home Nursing',
      desc: 'Wound care, IV fluids, catheter & vital monitoring',
      icon: <Activity className="w-5 h-5 text-brand-teal" />,
      path: '/services/home-nursing',
      badge: 'Flagship'
    },
    {
      title: 'Caregiver / Attendant',
      desc: 'Bedside living support, bathing, mobility & feeding',
      icon: <UserCheck className="w-5 h-5 text-brand-teal" />,
      path: '/services/12-hour-caregiver-attendant'
    },
    {
      title: 'Physical Therapy',
      desc: 'Post-op orthopedic rehab, joint & stroke recovery',
      icon: <HeartPulse className="w-5 h-5 text-brand-teal" />,
      path: '/services/orthopedic-joint-rehab-physio'
    },
    {
      title: 'Senior Skilled Nursing Visit',
      desc: 'Insulin, vital monitoring & chronic care checks',
      icon: <HeartPulse className="w-5 h-5 text-brand-teal" />,
      path: '/services/senior-skilled-nursing-visit'
    },
    {
      title: '24-Hour Live-In Caregiver',
      desc: 'Round-the-clock continuous bedside care',
      icon: <ShieldPlus className="w-5 h-5 text-brand-teal" />,
      path: '/services/24-hour-live-in-caregiver'
    }
  ];

  const orgServices = [
    { name: 'Hospitals & Health Systems', desc: 'ICU & ward nurse shift requisitions' },
    { name: 'Specialty Clinics', desc: 'Procedure & clinical attendant support' },
    { name: 'Senior Living Communities', desc: 'Rotational nursing & caregiver rosters' },
    { name: 'Rehabilitation Centers', desc: 'Dedicated physical therapy staff' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-canvas-primary text-text-primary antialiased font-sans">
      {/* Top Demo Role Bar */}
      <DemoRoleSwitcher />

      {/* Primary Public Navigation Header — Rafly / Framer Style Floating Glass Pill Navbar */}
      <header
        className="sticky top-2 sm:top-4 z-50 px-2 sm:px-4 lg:px-6 max-w-7xl mx-auto w-full transition-all duration-300 relative"
      >
        {/* Floating Pill Header Capsule - Strict Fixed Height (h-14) */}
        <div
          className={`w-full h-14 rounded-full transition-all duration-300 flex items-center justify-between px-3 sm:px-4 lg:px-6 relative z-30 ${
            isScrolled
              ? 'bg-white/95 backdrop-blur-2xl shadow-[0_12px_36px_rgba(15,23,42,0.12)] border border-slate-200/90'
              : 'bg-white/90 backdrop-blur-xl shadow-[0_8px_24px_rgba(0,0,0,0.06)] border border-white/80'
          }`}
          style={{ backdropFilter: 'blur(20px) saturate(180%)' }}
        >
          <HealthcareTexture type="micro-dot-mesh" opacity={0.02} />

          <div className="w-full flex items-center justify-between gap-1.5 sm:gap-3 lg:gap-4 relative z-10">
            
            {/* Left: Master Brand Logo */}
            <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 shrink-0">
              <Link to="/" className="flex items-center gap-2 group shrink-0">
                <img
                  src="/assets/brand/pulse-n-care/pulse-n-care-logo.svg"
                  alt="Pulse n Care"
                  className="h-8 sm:h-9 lg:h-10 w-auto group-hover:scale-[1.02] transition-transform duration-200"
                />
              </Link>
            </div>

            {/* Center Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 relative shrink-0">
              
              <Link
                to="/"
                className={`px-3.5 py-1.5 text-[13px] tracking-tight font-medium rounded-full transition-all duration-200 relative whitespace-nowrap ${
                  location.pathname === '/' 
                    ? 'text-white bg-slate-900 font-semibold shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                Home
              </Link>

              {/* Services Mega-Menu Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setServicesDropdownOpen(true)}
                onMouseLeave={() => setServicesDropdownOpen(false)}
              >
                <button
                  onClick={() => navigate('/services')}
                  className={`flex items-center gap-1 px-3.5 py-1.5 text-[13px] tracking-tight font-medium rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    location.pathname.startsWith('/services') 
                      ? 'text-white bg-slate-900 font-semibold shadow-xs' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  <span className="whitespace-nowrap">Services</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-brand-teal' : 'text-slate-400'}`} />
                </button>

                {/* Mega-Menu Panel with Hover Bridge */}
                {servicesDropdownOpen && (
                  <div className="absolute top-full pt-2 left-1/2 -translate-x-1/2 w-[calc(100vw-2rem)] max-w-[660px] z-50 animate-fadeIn">
                    <div className="bg-white rounded-3xl shadow-[0_24px_60px_rgba(15,23,42,0.18)] border border-slate-200/90 p-5 grid grid-cols-12 gap-5 relative overflow-hidden">
                      <HealthcareTexture type="micro-dot-mesh" opacity={0.03} />

                      {/* Left Column: Care Services List */}
                      <div className="col-span-7 space-y-2 relative z-10">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                          <span className="text-[10px] font-extrabold text-brand-teal uppercase tracking-widest whitespace-nowrap">
                            Care Services Ecosystem
                          </span>
                          <Link to="/services" className="text-[11px] font-bold text-slate-500 hover:text-brand-teal whitespace-nowrap">
                            View All (11) →
                          </Link>
                        </div>

                        <div className="space-y-1 pt-1">
                          {serviceCategories.map((item) => (
                            <Link
                              key={item.title}
                              to={item.path}
                              className="flex items-start gap-3 p-2 rounded-2xl hover:bg-teal-50/70 transition-colors group"
                            >
                              <div className="p-2 rounded-xl bg-teal-50 border border-teal-200/70 group-hover:scale-105 transition-transform shrink-0">
                                {item.icon}
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <p className="text-xs font-bold text-slate-900 group-hover:text-brand-teal whitespace-nowrap">
                                    {item.title}
                                  </p>
                                  {item.badge && (
                                    <span className="text-[9px] font-black text-brand-teal bg-canvas-teal px-2 py-0.5 rounded-full border border-teal-200 uppercase whitespace-nowrap">
                                      {item.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] text-slate-500 leading-tight mt-0.5">
                                  {item.desc}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Right Column: Featured Flagship Showcase */}
                      <div className="col-span-5 bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 rounded-2xl p-4 text-white flex flex-col justify-between relative overflow-hidden shadow-inner">
                        <img
                          src="/assets/services/home-nursing/pulse-n-care-team-campaign-7-9.jpg"
                          alt="Pulse n Care Team"
                          className="absolute inset-0 w-full h-full object-cover opacity-30"
                        />
                        <div className="relative z-10 space-y-2">
                          <span className="text-[10px] font-black text-teal-300 uppercase tracking-widest bg-white/10 px-2.5 py-1 rounded-full border border-white/20 whitespace-nowrap">
                            24×7 Home Nursing
                          </span>
                          <h4 className="text-sm font-black text-white leading-tight">
                            Qualified Nurse Care at Doorstep
                          </h4>
                          <p className="text-[11px] text-teal-100/90 leading-relaxed">
                            Verified, trained nursing professionals managed by Central Ops.
                          </p>
                        </div>

                        <Link to="/services/home-nursing" className="relative z-10 pt-3">
                          <Button size="sm" className="w-full bg-brand-teal hover:bg-brand-teal-hover text-white font-extrabold text-xs rounded-full h-9 whitespace-nowrap shadow-sm">
                            Explore Home Nursing <ArrowRight className="w-3.5 h-3.5 ml-1" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <a
                href="/#how-it-works"
                className="px-3.5 py-1.5 text-[13px] tracking-tight font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 rounded-full transition-all duration-200 whitespace-nowrap"
              >
                How It Works
              </a>

              <Link
                to="/careers"
                className={`px-3.5 py-1.5 text-[13px] tracking-tight font-medium rounded-full transition-all duration-200 whitespace-nowrap ${
                  location.pathname === '/careers'
                    ? 'text-white bg-slate-900 font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                Careers
              </Link>

              {/* For Organizations Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setOrgDropdownOpen(true)}
                onMouseLeave={() => setOrgDropdownOpen(false)}
              >
                <button
                  onClick={() => navigate('/organizations')}
                  className={`flex items-center gap-1 px-3.5 py-1.5 text-[13px] tracking-tight font-medium rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    location.pathname === '/organizations' 
                      ? 'text-white bg-slate-900 font-semibold shadow-xs' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  <span className="whitespace-nowrap"><span className="hidden xl:inline">For </span>Organizations</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${orgDropdownOpen ? 'rotate-180 text-brand-teal' : 'text-slate-400'}`} />
                </button>

                {orgDropdownOpen && (
                  <div className="absolute top-full pt-2 left-1/2 -translate-x-1/2 w-80 z-50 animate-fadeIn">
                    <div className="bg-white rounded-3xl shadow-[0_24px_60px_rgba(15,23,42,0.18)] border border-slate-200/90 p-4 space-y-3">
                      <div className="flex items-center gap-2 px-2 pb-2 border-b border-slate-100">
                        <Building2 className="w-4 h-4 text-brand-teal" />
                        <span className="text-xs font-extrabold text-slate-900 whitespace-nowrap">B2B Facility Staffing</span>
                      </div>

                      <div className="space-y-1">
                        {orgServices.map((org) => (
                          <Link
                            key={org.name}
                            to="/organizations"
                            className="block p-2.5 rounded-xl hover:bg-teal-50/70 transition-colors"
                          >
                            <p className="text-xs font-bold text-slate-900 whitespace-nowrap">{org.name}</p>
                            <p className="text-[11px] text-slate-500">{org.desc}</p>
                          </Link>
                        ))}
                      </div>

                      <div className="pt-2 border-t border-slate-100">
                        <Link to="/organization/dashboard">
                          <Button size="sm" className="w-full bg-brand-teal text-white font-bold text-xs h-9 rounded-full whitespace-nowrap shadow-sm">
                            Access B2B Staffing Portal →
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Link
                to="/client/support"
                className={`px-3.5 py-1.5 text-[13px] tracking-tight font-medium rounded-full transition-all duration-200 whitespace-nowrap ${
                  location.pathname === '/client/support' 
                    ? 'text-white bg-slate-900 font-semibold shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                Support
              </Link>
            </nav>

            {/* Right Action Section */}
            <div className="hidden lg:flex items-center gap-2.5 shrink-0">
              
              {/* 24×7 Hotline Pill */}
              <a
                href="tel:+919876543210"
                className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100/90 hover:bg-slate-200/90 text-slate-700 text-xs font-semibold transition-all cursor-pointer whitespace-nowrap border border-slate-200/70"
              >
                <Phone className="w-3.5 h-3.5 text-brand-teal animate-pulse" />
                <span>+91 98765 43210</span>
              </a>

              {currentRole === 'client' && (
                <Link to="/client/notifications" className="relative p-2 text-slate-500 hover:text-slate-900 rounded-full hover:bg-slate-100 transition-colors">
                  <Bell className="w-4 h-4" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white" />
                  )}
                </Link>
              )}

              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate('/client/booking/wizard')}
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                className="bg-brand-teal hover:bg-brand-teal-hover text-white font-extrabold text-[12px] px-4.5 py-2 rounded-full shadow-xs hover:shadow-md hover:scale-[1.02] transition-all duration-200 whitespace-nowrap cursor-pointer h-9 shrink-0"
              >
                Book Care Now
              </Button>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-slate-900 cursor-pointer rounded-full hover:bg-slate-100"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border border-slate-200/90 bg-white/98 backdrop-blur-2xl p-4 mt-2 rounded-3xl space-y-4 shadow-2xl relative z-40 max-h-[calc(100vh-100px)] overflow-y-auto">
            {/* Mobile Operations Hotline */}
            <div className="pb-3 border-b border-slate-100">
              <a
                href="tel:+919876543210"
                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200"
              >
                <Phone className="w-3.5 h-3.5 text-brand-teal animate-pulse" />
                <span>24×7 Operations Hotline: +91 98765 43210</span>
              </a>
            </div>

            <div className="space-y-1">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-sm font-bold py-2 border-b border-slate-100 ${
                  location.pathname === '/' ? 'text-brand-teal' : 'text-slate-900 hover:text-brand-teal'
                }`}
              >
                Home
              </Link>
              <Link
                to="/services"
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-sm font-bold py-2 border-b border-slate-100 ${
                  location.pathname.startsWith('/services') ? 'text-brand-teal' : 'text-slate-900 hover:text-brand-teal'
                }`}
              >
                Services Catalog (11 Services)
              </Link>
              <div className="pl-3 space-y-1 pt-1 pb-2 border-b border-slate-100 bg-slate-50/50 rounded-xl p-2 my-1">
                {serviceCategories.slice(0, 4).map((sc) => (
                  <Link
                    key={sc.path}
                    to={sc.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 text-xs font-semibold text-slate-700 hover:text-brand-teal py-1"
                  >
                    <span>↳</span>
                    <span>{sc.title}</span>
                  </Link>
                ))}
              </div>
              <a
                href="/#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-bold text-slate-900 hover:text-brand-teal py-2 border-b border-slate-100"
              >
                How It Works
              </a>
              <Link
                to="/organizations"
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-sm font-bold py-2 border-b border-slate-100 ${
                  location.pathname === '/organizations' ? 'text-brand-teal' : 'text-slate-900 hover:text-brand-teal'
                }`}
              >
                For Organizations (B2B Staffing)
              </Link>
              <Link
                to="/client/support"
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-sm font-bold py-2 border-b border-slate-100 ${
                  location.pathname === '/client/support' ? 'text-brand-teal' : 'text-slate-900 hover:text-brand-teal'
                }`}
              >
                Support Hub
              </Link>
            </div>

            <div className="pt-2 space-y-2">
              <Link to="/client/booking/wizard" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="primary" className="w-full bg-brand-teal text-white font-extrabold h-10 rounded-full shadow-xs">
                  Book a Service Now
                </Button>
              </Link>
              <Link to="/client/bookings" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full font-bold h-10 rounded-full">
                  My Bookings
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Page Body */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Global Footer — Premium Navy Closing Surface (#050F33 + Textured Depth + Care Accent Line) */}
      <footer className="bg-surface-dark-textured text-white border-t border-white/10 relative overflow-hidden pt-16 pb-12">
        {/* Top Care Gradient Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-care" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
            
            {/* Col 1: Brand & Operational Governance */}
            <div className="md:col-span-2 space-y-4">
              <img
                src="/assets/brand/pulse-n-care/pulse-n-care-logo-dark.svg"
                alt="Pulse n Care"
                className="h-10 w-auto"
              />
              <p className="text-xs text-slate-300 leading-relaxed max-w-sm font-medium">
                Nurse care at doorstep. Managed home nursing, attendant care, physical therapy, and physician visits across Delhi NCR.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-teal-300 text-xs font-bold border border-white/15">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-teal-400" />
                <span>100% In-House Managed Workforce</span>
              </div>
            </div>

            {/* Col 2: Services */}
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold uppercase tracking-widest text-teal-300">Home Care Services</h4>
              <ul className="space-y-2 text-xs text-slate-300">
                <li><Link to="/services/post-operative-nursing-care" className="hover:text-teal-300 transition-colors">Post-Operative Nursing Care</Link></li>
                <li><Link to="/services/senior-skilled-nursing-visit" className="hover:text-teal-300 transition-colors">Senior Skilled Nursing Visit</Link></li>
                <li><Link to="/services/12-hour-caregiver-attendant" className="hover:text-teal-300 transition-colors">12-Hour Day / Night Caregiver</Link></li>
                <li><Link to="/services/24-hour-live-in-caregiver" className="hover:text-teal-300 transition-colors">24-Hour Live-In Caregiver</Link></li>
                <li><Link to="/services/high-dependency-nursing-care" className="hover:text-teal-300 transition-colors">High-Dependency Nursing Care</Link></li>
              </ul>
            </div>

            {/* Col 3: Delhi NCR Hub Coverage */}
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold uppercase tracking-widest text-teal-300">Service Coverage</h4>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-brand-teal-400" /> Delhi & NCR Regions</li>
                <li className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-brand-teal-400" /> Gurugram Care Zones</li>
                <li className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-brand-teal-400" /> Noida & Greater Noida</li>
                <li className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-brand-teal-400" /> Faridabad & Neighboring Areas</li>
              </ul>
            </div>

            {/* Col 4: Operations Contact & Support */}
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold uppercase tracking-widest text-teal-300">Central Operations</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                24/7 Operations Desk for emergency nursing requisitions & scheduling queries.
              </p>
              <div className="space-y-1.5 text-xs text-white font-bold">
                <p className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-brand-teal-400" /> +91-11-4920-8800</p>
                <p className="text-teal-200">support@pulsen-care.com</p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 text-center sm:flex sm:justify-between text-xs text-slate-400 font-medium">
            <p>© 2026 Pulse n Care — Nurse Care at Doorstep. All rights reserved.</p>
            <p className="mt-2 sm:mt-0">Managed Clinical Operations • Doorstep Healthcare Network</p>
          </div>
        </div>
      </footer>

      {/* Location Selector Modal */}
      <Modal
        isOpen={locationModalOpen}
        onClose={() => setLocationModalOpen(false)}
        title="Service Availability & Coverage"
        maxWidth="md"
      >
        <div className="space-y-4 text-left">
          <p className="text-xs text-text-secondary">
            Pulse n Care operates an internal, managed healthcare workforce. Select your primary service region below:
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
                    ? 'border-brand-teal bg-canvas-teal/50 shadow-2xs'
                    : 'border-border-default bg-white hover:border-teal-200'
                }`}
              >
                <p className="font-extrabold text-text-primary text-xs flex items-center justify-between">
                  <span>{hub.city}</span>
                  {selectedHub.id === hub.id && <span className="text-[10px] font-black text-brand-teal bg-white px-2 py-0.5 rounded-full border border-teal-200 uppercase">Selected</span>}
                </p>
                <p className="text-[11px] text-text-muted mt-1">{hub.name}</p>
                <p className="text-[10px] font-medium text-brand-teal mt-1.5">✓ {hub.pincodePrefixes.length} Pincode Zones Covered</p>
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-end">
            <Button size="sm" onClick={() => setLocationModalOpen(false)} className="bg-brand-teal text-white font-bold px-6">
              Confirm Location
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
