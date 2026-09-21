import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import {
  PulsePanel,
  PulseStatus,
  PulseLine,
  PulseAvatar
} from '../../components/common/PulseUI';
import {
  Clock,
  MapPin,
  Phone,
  MessageSquare,
  Navigation,
  ChevronRight,
  Calendar,
  Building2,
  FileCheck2,
} from 'lucide-react';
import { MOCK_DUTIES, MOCK_STAFF_PROFILES } from '../../data/mockStaffData';
import { MOCK_FACILITY_ROSTER_SLOTS, MOCK_FACILITY_TIMESHEETS } from '../../data/mockB2BData';

export const StaffDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const staff = MOCK_STAFF_PROFILES[0]; // Sunita Sharma, RN / PNC-EMP-0042
  const [dutyContext, setDutyContext] = useState<'home_care' | 'facility_roster'>('home_care');

  const homeDuty = MOCK_DUTIES[0];
  const facilitySlot = MOCK_FACILITY_ROSTER_SLOTS[0];
  const facilityTimesheet = MOCK_FACILITY_TIMESHEETS[0];

  return (
    <div className="space-y-6 pb-8 text-left relative min-h-screen bg-canvas-primary p-4 sm:p-6 lg:p-8">
      {/* Welcome Banner */}
      <div className="flex items-center justify-between bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden border border-brand-teal/20">
        <div className="space-y-1 relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-teal-300 bg-white/10 px-2.5 py-0.5 rounded-full border border-white/20">
              Verified Care Team
            </span>
            <span className="text-[10px] font-mono text-teal-400">{staff.employeeId}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-heading font-extrabold">Good morning, {staff.displayName}</h1>
          <p className="text-xs text-slate-300 font-medium font-sans">
            Role: <strong className="text-white">{staff.roleCategory.replace('_', ' ').toUpperCase()}</strong> • Status: Active Duty
          </p>
        </div>

        <div className="hidden sm:block relative z-10">
          <PulseAvatar name={staff.fullName} size="xl" status="active" />
        </div>

        <div className="absolute inset-x-0 bottom-0 opacity-20 pointer-events-none">
          <PulseLine variant="hero" animated />
        </div>
      </div>

      {/* Duty Context Toggle Switch */}
      <div className="flex items-center gap-2 border-b border-border-light pb-3">
        <button
          onClick={() => setDutyContext('home_care')}
          className={`px-4 py-2.5 rounded-full text-xs font-heading font-bold cursor-pointer border transition-all flex items-center gap-2 ${
            dutyContext === 'home_care'
              ? 'bg-brand-teal text-white border-brand-teal shadow-xs'
              : 'bg-white text-text-secondary border-border-default hover:bg-slate-100'
          }`}
        >
          <Clock className="w-4 h-4" /> Home Care Visits (1-on-1)
        </button>

        <button
          onClick={() => setDutyContext('facility_roster')}
          className={`px-4 py-2.5 rounded-full text-xs font-heading font-bold cursor-pointer border transition-all flex items-center gap-2 ${
            dutyContext === 'facility_roster'
              ? 'bg-brand-blue text-white border-brand-blue shadow-xs'
              : 'bg-white text-text-secondary border-border-default hover:bg-slate-100'
          }`}
        >
          <Building2 className="w-4 h-4" /> Hospital Facility Roster
        </button>
      </div>

      {/* HOME CARE DUTY CARD */}
      {dutyContext === 'home_care' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-heading font-extrabold uppercase tracking-wider text-text-muted flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-brand-teal" /> Today's Scheduled Home Patient Visit
            </h2>
            <PulseStatus status="info" label="HOME CARE" size="sm" />
          </div>

          {/* PREMIUM NEXT DUTY VISUAL ANCHOR CARD (#050F33 + Subtle Teal Glow) */}
          <div className="bg-surface-dark-textured text-white p-6 sm:p-7 rounded-surface shadow-floating border border-white/15 relative overflow-hidden space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="px-3.5 py-2 rounded-card bg-brand-teal-900/80 border border-teal-400/30 text-center shrink-0">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-teal-300 block">Scheduled</span>
                  <span className="text-sm font-extrabold text-white tabular-nums">{homeDuty.scheduledStartTime}</span>
                </div>
                <div>
                  <span className="text-[10px] font-extrabold text-teal-300 uppercase tracking-widest block">
                    {homeDuty.bookingId} • Post-Op Nursing
                  </span>
                  <h3 className="text-lg font-extrabold text-white leading-snug">
                    {homeDuty.patientName} ({homeDuty.patientAge}y)
                  </h3>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-brand-teal text-white shadow-subtle self-start sm:self-center">
                ACTIVE DUTY
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium">
              <div className="flex items-start gap-2.5 p-3 rounded-card bg-white/5 border border-white/10">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-bold text-slate-300 uppercase block">Care Location</span>
                  <p className="font-semibold text-white leading-relaxed">{homeDuty.address.line1}, {homeDuty.address.city}</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-card bg-white/5 border border-white/10">
                <Phone className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-bold text-slate-300 uppercase block">Emergency Contact</span>
                  <p className="font-semibold text-white">{homeDuty.clientPhone}</p>
                </div>
              </div>
            </div>

            {/* Location & Navigation */}
            <div className="p-4 rounded-xl bg-surface-subtle border border-border-default space-y-3">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" />
                <div className="space-y-0.5 text-xs">
                  <p className="font-heading font-bold text-text-primary">
                    {homeDuty.address.line1}, {homeDuty.address.city}
                  </p>
                  <p className="text-text-muted">
                    Pincode: {homeDuty.address.pincode} • Distance:{' '}
                    <strong className="text-text-primary font-bold">{homeDuty.travelDistanceKm} km</strong> (~
                    {homeDuty.estimatedTravelMins} mins)
                  </p>
                </div>
              </div>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  `${homeDuty.address.line1}, ${homeDuty.address.city}, ${homeDuty.address.pincode}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
              >
                <Navigation className="w-4 h-4 text-teal-400" /> Open Turn-by-Turn Navigation (Google Maps)
              </a>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <a
                href={`tel:${homeDuty.clientPhone}`}
                className="p-3 rounded-full bg-teal-50 border border-brand-teal/30 hover:bg-teal-100 text-brand-teal text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer text-center"
              >
                <Phone className="w-4 h-4 text-brand-teal" /> Call Client
              </a>

              <a
                href={`https://wa.me/${homeDuty.clientPhone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer text-center"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" /> WhatsApp
              </a>

              <Button
                onClick={() => navigate(`/staff/duties/${homeDuty.id}`)}
                className="col-span-2 sm:col-span-1 bg-brand-teal hover:bg-brand-teal-hover text-white font-bold text-xs h-11 rounded-full shadow-xs"
              >
                Open Duty Checklist <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* HOSPITAL FACILITY ROSTER CARD */}
      {dutyContext === 'facility_roster' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-heading font-extrabold uppercase tracking-wider text-text-muted flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-brand-blue" /> Today's Hospital Shift Placement
            </h2>
            <PulseStatus status="active" label="FACILITY SHIFT" size="sm" />
          </div>

          <PulsePanel variant="raised" pulseAccent="top" padding="lg" className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border-light">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-brand-blue text-white flex items-center justify-center font-bold shrink-0">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-heading font-extrabold text-text-primary">{facilitySlot.organizationName}</h3>
                  <p className="text-xs text-text-muted font-medium">
                    Dept: <strong className="text-text-primary">{facilitySlot.department}</strong> • Daily Rate:{' '}
                    <strong className="text-brand-teal">₹{facilitySlot.dailyRate}</strong>
                  </p>
                </div>
              </div>

              <PulseStatus status="success" label={facilitySlot.status} size="md" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-surface-subtle p-4 rounded-xl border border-border-default">
              <div className="space-y-1">
                <p className="text-text-muted font-medium">Shift Timings:</p>
                <p className="font-heading font-extrabold text-text-primary text-sm">
                  {facilitySlot.startTime} - {facilitySlot.endTime} (12h Day Shift)
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-text-muted font-medium">Hospital Nursing Superintendent:</p>
                <p className="font-heading font-extrabold text-text-primary text-sm">Sr. Mary Kurien (+91-98112-99012)</p>
              </div>
            </div>

            {/* Shift Timesheet Actions */}
            <div className="border-t border-border-light pt-4 space-y-3">
              <h4 className="text-xs font-bold text-text-secondary">Digital Shift Timesheet Log:</h4>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 rounded-xl bg-teal-50/50 border border-brand-teal/20 text-xs">
                <div>
                  <p className="font-heading font-bold text-text-primary">Timesheet #{facilityTimesheet.timesheetNumber}</p>
                  <p className="text-text-muted">
                    Status: <strong className="text-emerald-700 uppercase">{facilityTimesheet.approvalStatus.replace(/_/g, ' ')}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="primary"
                    leftIcon={<FileCheck2 className="w-3.5 h-3.5" />}
                    className="bg-brand-blue hover:bg-brand-blue/90 text-white font-bold cursor-pointer text-xs rounded-full"
                  >
                    View Shift Timesheet
                  </Button>
                </div>
              </div>
            </div>
          </PulsePanel>
        </div>
      )}

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <button
          onClick={() => navigate('/staff/schedule')}
          className="p-4 rounded-xl bg-white border border-border-default hover:border-brand-teal/40 shadow-2xs text-left space-y-2 cursor-pointer transition-all hover:shadow-card"
        >
          <Calendar className="w-5 h-5 text-brand-teal" />
          <div>
            <p className="text-xs font-heading font-bold text-text-primary">Shift Calendar</p>
            <p className="text-[11px] text-text-muted">View upcoming roster</p>
          </div>
        </button>

        <button
          onClick={() => navigate('/staff/availability')}
          className="p-4 rounded-xl bg-white border border-border-default hover:border-brand-teal/40 shadow-2xs text-left space-y-2 cursor-pointer transition-all hover:shadow-card"
        >
          <Clock className="w-5 h-5 text-brand-teal" />
          <div>
            <p className="text-xs font-heading font-bold text-text-primary">Availability & Leaves</p>
            <p className="text-[11px] text-text-muted">Update working days</p>
          </div>
        </button>

        <a
          href="tel:+911149208800"
          className="col-span-2 sm:col-span-1 p-4 rounded-xl bg-slate-900 text-white shadow-card text-left space-y-2 cursor-pointer transition-all block"
        >
          <Phone className="w-5 h-5 text-teal-400" />
          <div>
            <p className="text-xs font-heading font-bold text-white">Ops Control Room</p>
            <p className="text-[11px] text-slate-400">24/7 Escalation Desk</p>
          </div>
        </a>
      </div>
    </div>
  );
};
