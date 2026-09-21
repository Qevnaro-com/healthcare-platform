import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { DemoRoleSwitcher } from '../common/DemoRoleSwitcher';
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileSpreadsheet,
  PlusCircle,
  Clock,
  Receipt,
  Building,
  HelpCircle,
  Bell,
  LogOut,
  ChevronRight,
  Menu,
  X,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { clsx } from 'clsx';
import { HealthcareTexture } from '../common/HealthcareTexture';

export const OrgLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Authenticated Organization Context Data
  const orgInfo = {
    name: 'Max Super Speciality Hospital, Saket',
    facilityCode: 'FAC-DEL-9921',
    city: 'Delhi NCR',
    primaryContact: 'Dr. Rakesh Sharma (Nursing Superintendent)',
  };

  const navGroups = [
    {
      title: 'OVERVIEW',
      items: [
        { label: 'Dashboard', path: '/organization/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
      ],
    },
    {
      title: 'WORKFORCE',
      items: [
        { label: 'Facility Roster', path: '/organization/roster', icon: <Users className="w-4 h-4" /> },
        { label: 'Shift Schedule', path: '/organization/schedule', icon: <Calendar className="w-4 h-4" /> },
      ],
    },
    {
      title: 'STAFFING',
      items: [
        { label: 'Requisitions', path: '/organization/requests', icon: <FileSpreadsheet className="w-4 h-4" /> },
        { label: 'New Request', path: '/organization/requests/new', icon: <PlusCircle className="w-4 h-4" /> },
      ],
    },
    {
      title: 'TIMESHEETS',
      items: [
        { label: 'Shift Timesheets', path: '/organization/timesheets', icon: <Clock className="w-4 h-4" /> },
      ],
    },
    {
      title: 'BILLING',
      items: [
        { label: 'Retainer Invoices', path: '/organization/invoices', icon: <Receipt className="w-4 h-4" /> },
      ],
    },
    {
      title: 'ORGANIZATION',
      items: [
        { label: 'Facility Profile', path: '/organization/profile', icon: <Building className="w-4 h-4" /> },
        { label: 'Support Desk', path: '/organization/support', icon: <HelpCircle className="w-4 h-4" /> },
      ],
    },
  ];

  const notifications = [
    {
      id: 'notif-1',
      title: 'Timesheets Pending Sign-Off',
      desc: '2 shift timesheets for Cardiac ICU Ward 4 require superintendent approval.',
      time: '15 mins ago',
      unread: true,
      path: '/organization/timesheets',
      icon: <Clock className="w-4 h-4 text-amber-500" />,
    },
    {
      id: 'notif-2',
      title: 'Staffing Request Update',
      desc: '4 ICU Day Nurses assigned to PNC-B2B-2026-041 by Operations.',
      time: '1 hour ago',
      unread: true,
      path: '/organization/requests/req-b2b-001',
      icon: <CheckCircle2 className="w-4 h-4 text-teal-600" />,
    },
    {
      id: 'notif-3',
      title: 'Clarification Requested',
      desc: 'Pulse n Care Operations requested clarification on ICU Night Shift ACLS requirements.',
      time: '3 hours ago',
      unread: false,
      path: '/organization/requests/req-b2b-001',
      icon: <AlertTriangle className="w-4 h-4 text-blue-600" />,
    },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/70 text-slate-900 font-sans antialiased pb-16 md:pb-0">
      <DemoRoleSwitcher />

      {/* TOP HEADER BAR */}
      <header className="bg-white border-b border-slate-200/80 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo & Facility Identity */}
          <div className="flex items-center gap-3">
            <Link to="/organization/dashboard" className="flex items-center gap-2.5 group">
              <img
                src="/assets/brand/pulse-n-care/pulse-n-care-logo.svg"
                alt="Pulse n Care"
                className="h-8 w-auto"
              />
              <span className="text-[10px] font-black text-blue-700 tracking-wider uppercase bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                Institutional Partner OS
              </span>
            </Link>

            <div className="h-6 w-px bg-slate-200 hidden md:block" />

            {/* Authenticated Org Tag */}
            <div className="flex items-center gap-2 bg-slate-100/80 px-3 py-1 rounded-full border border-slate-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-slate-800 truncate max-w-[200px] sm:max-w-[280px]">
                {orgInfo.name}
              </span>
              <span className="hidden lg:inline-flex text-[10px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded-full border border-slate-200">
                {orgInfo.city}
              </span>
            </div>
          </div>

          {/* Right Header Actions: Notifications & Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Notification Bell Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer border border-transparent hover:border-slate-200"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-amber-500 text-white text-[10px] font-black flex items-center justify-center ring-2 ring-white">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Drawer */}
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-50 space-y-3 text-left animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                        Facility Notifications
                      </h4>
                      <span className="text-[10px] font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                        {unreadCount} New
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setNotificationsOpen(false)}
                      className="text-slate-400 hover:text-slate-600 p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => {
                          setNotificationsOpen(false);
                          navigate(n.path);
                        }}
                        className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                          n.unread
                            ? 'bg-blue-50/40 border-blue-200 hover:bg-blue-50'
                            : 'bg-white border-slate-100 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          <div className="mt-0.5 shrink-0">{n.icon}</div>
                          <div className="space-y-0.5 flex-1 min-w-0">
                            <p className="text-xs font-bold text-slate-900 leading-snug">{n.title}</p>
                            <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">{n.desc}</p>
                            <span className="text-[10px] text-slate-400 font-medium block pt-1">{n.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-slate-100 text-center">
                    <button
                      type="button"
                      onClick={() => {
                        setNotificationsOpen(false);
                        navigate('/organization/support');
                      }}
                      className="text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
                    >
                      View Operations Support Tickets
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Action: New Request CTA */}
            <Link
              to="/organization/requests/new"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-2xs transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>New Staffing Request</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER (SIDEBAR + CONTENT) */}
      <div className="flex-1 max-w-[1600px] w-full mx-auto flex items-start">
        {/* DESKTOP SIDEBAR */}
        <aside className="hidden md:flex flex-col w-64 shrink-0 bg-white border-r border-slate-200/80 min-h-[calc(100vh-4rem)] p-4 space-y-6 text-left sticky top-16">
          <HealthcareTexture type="soft-cell" opacity={0.02} />

          {/* Nav Groups */}
          <div className="flex-1 space-y-6">
            {navGroups.map((group) => (
              <div key={group.title} className="space-y-1.5">
                <p className="px-3 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                  {group.title}
                </p>
                <div className="space-y-0.5">
                  {group.items.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={clsx(
                          'flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all group',
                          isActive
                            ? 'bg-blue-50/80 text-blue-700 border border-blue-200/80 shadow-2xs'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                        )}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className={isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'}>
                            {item.icon}
                          </span>
                          <span>{item.label}</span>
                        </div>
                        {isActive && <ChevronRight className="w-3.5 h-3.5 text-blue-600" />}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar Footer */}
          <div className="pt-4 border-t border-slate-100 space-y-1">
            <Link
              to="/organization/support"
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            >
              <HelpCircle className="w-4 h-4 text-slate-400" />
              <span>Help & Operations Desk</span>
            </Link>
            <button
              type="button"
              onClick={() => navigate('/organization/login')}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition-colors w-full text-left cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out Workspace</span>
            </button>
          </div>
        </aside>

        {/* PAGE CONTENT */}
        <main className="flex-1 w-full min-w-0 p-4 sm:p-6 lg:p-8 space-y-8">
          <Outlet />
        </main>
      </div>

      {/* MOBILE BOTTOM NAVIGATION */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-40 flex items-center justify-around h-16 px-1 shadow-lg">
        {[
          { label: 'Home', path: '/organization/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
          { label: 'Requests', path: '/organization/requests', icon: <FileSpreadsheet className="w-5 h-5" /> },
          { label: 'Roster', path: '/organization/roster', icon: <Users className="w-5 h-5" /> },
          { label: 'Timesheets', path: '/organization/timesheets', icon: <Clock className="w-5 h-5" /> },
          { label: 'More', path: '/organization/profile', icon: <Building className="w-5 h-5" /> },
        ].map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={clsx(
                'flex flex-col items-center justify-center w-full h-full text-[10px] font-bold gap-1 transition-colors px-1 text-center',
                isActive ? 'text-blue-600 font-extrabold' : 'text-slate-500 hover:text-slate-900'
              )}
            >
              {item.icon}
              <span className="truncate max-w-[64px]">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
