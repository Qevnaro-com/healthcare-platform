import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { DemoRoleSwitcher } from '../common/DemoRoleSwitcher';
import {
  Home,
  Calendar,
  UserCheck,
  PhoneCall,
  LogOut,
  Clock
} from 'lucide-react';

export const StaffLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { switchRole } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased font-sans pb-20 md:pb-6">
      
      {/* Top Demo Role Switcher */}
      <DemoRoleSwitcher />

      {/* Staff Header */}
      <header className="bg-slate-900 text-white sticky top-0 z-40 shadow-md">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/staff" className="flex items-center gap-2">
            <img
              src="/assets/brand/pulse-n-care/pulse-n-care-logo-horizontal-dark.webp"
              alt="Pulse n Care Staff"
              className="h-8 w-auto"
            />
            <span className="text-[10px] font-black uppercase tracking-widest text-teal-400 bg-white/10 px-2 py-0.5 rounded-full border border-white/20">
              Staff Portal
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <a
              href="tel:+919211765429"
              className="px-2.5 py-1 rounded-full bg-teal-500/20 text-teal-300 text-[11px] font-extrabold border border-teal-500/30 flex items-center gap-1"
            >
              <PhoneCall className="w-3 h-3 animate-pulse" /> Operations Desk
            </a>

            <button
              onClick={() => {
                switchRole('client');
                navigate('/staff/login');
              }}
              className="text-slate-400 hover:text-white p-1"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Duty Body */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 pt-4">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 shadow-2xl py-2 px-6 flex items-center justify-around md:hidden">
        <Link
          to="/staff/dashboard"
          className={`flex flex-col items-center gap-1 text-[10px] font-bold transition-colors ${
            location.pathname === '/staff/dashboard' || location.pathname === '/staff'
              ? 'text-brand-teal'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Home className="w-5 h-5" />
          <span>Duties</span>
        </Link>

        <Link
          to="/staff/duties"
          className={`flex flex-col items-center gap-1 text-[10px] font-bold transition-colors ${
            location.pathname === '/staff/duties'
              ? 'text-brand-teal'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Calendar className="w-5 h-5" />
          <span>Schedule</span>
        </Link>

        <Link
          to="/staff/availability"
          className={`flex flex-col items-center gap-1 text-[10px] font-bold transition-colors ${
            location.pathname === '/staff/availability'
              ? 'text-brand-teal'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Clock className="w-5 h-5" />
          <span>Availability</span>
        </Link>

        <Link
          to="/staff/security"
          className={`flex flex-col items-center gap-1 text-[10px] font-bold transition-colors ${
            location.pathname === '/staff/security'
              ? 'text-brand-teal'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <UserCheck className="w-5 h-5" />
          <span>Account</span>
        </Link>
      </nav>
    </div>
  );
};
