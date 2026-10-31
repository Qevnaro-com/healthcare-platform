import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useBookings } from '../../context/BookingContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { BookingStatusBadge } from '../../components/common/Badge';
import { HealthcareTexture } from '../../components/common/HealthcareTexture';
import {
  Heart,
  Plus,
  Calendar,
  Users,
  MapPin,
  MessageSquare,
  ShieldCheck,
  ArrowRight,
  Clock,
  PhoneCall,
  Activity,
  Star,
  Building2,
  Sparkles
} from 'lucide-react';
import { DELHI_NCR_SERVICE_HUBS } from '../../data/serviceAreaMatrix';

export const ClientDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { bookings, getProfessionalById } = useBookings();

  const activeBooking = bookings.find(
    (b) => b.status === 'ASSIGNED' || b.status === 'ACCEPTED' || b.status === 'ON_THE_WAY' || b.status === 'IN_PROGRESS' || b.status === 'REQUESTED'
  ) || bookings[0];

  const assignedPro = activeBooking?.professionalId ? getProfessionalById(activeBooking.professionalId) : null;
  const hub = DELHI_NCR_SERVICE_HUBS[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left relative bg-white">
      <HealthcareTexture type="care-pathway" opacity={0.03} />

      {/* Welcome Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-teal-900 via-brand-teal to-teal-800 text-white shadow-lg relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <HealthcareTexture type="clinical-wave" opacity={0.15} />

        <div className="space-y-2 relative z-10">
          <span className="text-xs font-extrabold uppercase tracking-widest text-teal-200 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-300" /> Care Concierge Dashboard
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Welcome back, {currentUser?.firstName || 'Rahul'} 👋
          </h1>
          <p className="text-xs text-teal-100 max-w-xl leading-relaxed">
            Your managed home care requests, assigned internal staff, and family patient records in Delhi NCR.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => navigate('/client/booking/wizard')}
          leftIcon={<Plus className="w-4 h-4" />}
          className="bg-white text-brand-teal hover:bg-teal-50 font-extrabold text-sm py-3 px-6 rounded-2xl cursor-pointer shrink-0 shadow-md border border-white/20 relative z-10"
        >
          Schedule Care Service
        </Button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 8 Columns: Active Care Hero & Recent Requests */}
        <div className="lg:col-span-8 space-y-8">
          {/* Active Care Hero Card */}
          {activeBooking && (
            <Card className="p-6 border-brand-teal bg-canvas-teal/20 shadow-subtle space-y-5 relative">
              <div className="flex items-center justify-between border-b border-teal-200 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold text-brand-teal uppercase tracking-wider flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-brand-teal animate-pulse" /> Active Care Request
                  </span>
                  <BookingStatusBadge status={activeBooking.status} />
                </div>
                <span className="text-xs font-mono font-bold text-text-muted">
                  Code: {activeBooking.bookingCode || 'BKG-2026-9042'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-2">
                  <h3 className="text-base font-extrabold text-text-primary">{activeBooking.serviceName}</h3>
                  <div className="space-y-1 text-text-secondary">
                    <p className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-brand-teal shrink-0" />
                      <span className="font-bold text-text-primary">{activeBooking.scheduledDate}</span> ({activeBooking.scheduledTimeSlot})
                    </p>
                    <p className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-brand-teal shrink-0" />
                      <span>{activeBooking.address.line1}, {activeBooking.address.city}</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-brand-teal shrink-0" />
                      <span>Patient: {activeBooking.patientProfile.firstName} {activeBooking.patientProfile.lastName} ({activeBooking.patientProfile.relationship})</span>
                    </p>
                  </div>
                </div>

                {/* Assigned Staff Preview */}
                {assignedPro ? (
                  <div className="p-3.5 bg-white rounded-2xl border border-teal-200 space-y-2 flex flex-col justify-between">
                    <div className="flex items-center gap-3">
                      <img src={assignedPro.profilePhoto} alt="" className="w-12 h-12 rounded-xl object-cover border border-teal-300 shrink-0" />
                      <div>
                        <span className="font-extrabold text-text-primary text-xs flex items-center gap-1">
                          {assignedPro.displayName} <ShieldCheck className="w-3.5 h-3.5 text-brand-teal" />
                        </span>
                        <span className="text-[11px] text-text-muted block">{assignedPro.qualification}</span>
                        <span className="text-[10px] text-brand-teal font-mono font-bold">ID: {assignedPro.employeeId || 'EMP-1042'}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] border-t border-border-light pt-2">
                      <span className="text-emerald-700 font-extrabold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        COUNCIL VERIFIED
                      </span>
                      <span className="text-amber-600 font-bold flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-500" /> {assignedPro.rating}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 space-y-1.5 flex flex-col justify-between">
                    <div>
                      <span className="font-extrabold flex items-center gap-1 text-amber-950">
                        <Clock className="w-3.5 h-3.5 text-amber-600 animate-spin" /> Operations Review Active
                      </span>
                      <p className="text-[11px] mt-1">Pulse n Care Operations is confirming internal staff availability in Delhi NCR.</p>
                    </div>
                    <span className="text-[10px] font-bold text-amber-700">ETA: ~15 mins confirmation</span>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-teal-200 flex justify-between items-center">
                <span className="text-xs text-text-muted font-medium">Est. Amount: ₹{activeBooking.priceBreakdown.totalPrice}</span>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate(`/client/bookings/${activeBooking.id}`)}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  className="bg-brand-teal hover:bg-brand-teal-hover text-white font-bold cursor-pointer text-xs"
                >
                  View Care Booking Timeline
                </Button>
              </div>
            </Card>
          )}

          {/* Quick Action Cards Grid (4 Cards) */}
          <div className="space-y-3">
            <h3 className="text-sm font-extrabold text-text-primary uppercase tracking-wider">
              Care Concierge Workspaces
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link to="/client/booking/wizard" className="group">
                <Card className="p-4 border-border-default hover:border-brand-teal transition-all shadow-subtle hover:-translate-y-0.5 bg-white space-y-2 text-left h-full">
                  <div className="w-10 h-10 rounded-xl bg-canvas-teal text-brand-teal flex items-center justify-center font-bold">
                    <Plus className="w-5 h-5" />
                  </div>
                  <h4 className="font-extrabold text-text-primary text-xs group-hover:text-brand-teal transition-colors">
                    Schedule Home Care
                  </h4>
                  <p className="text-[11px] text-text-muted">10-Step guided wizard for nursing & physio.</p>
                </Card>
              </Link>

              <Link to="/client/patients" className="group">
                <Card className="p-4 border-border-default hover:border-brand-teal transition-all shadow-subtle hover:-translate-y-0.5 bg-white space-y-2 text-left h-full">
                  <div className="w-10 h-10 rounded-xl bg-canvas-teal text-brand-teal flex items-center justify-center font-bold">
                    <Heart className="w-5 h-5" />
                  </div>
                  <h4 className="font-extrabold text-text-primary text-xs group-hover:text-brand-teal transition-colors">
                    Saved Family Patients
                  </h4>
                  <p className="text-[11px] text-text-muted">Manage patient records & medical notes.</p>
                </Card>
              </Link>

              <Link to="/client/addresses" className="group">
                <Card className="p-4 border-border-default hover:border-brand-teal transition-all shadow-subtle hover:-translate-y-0.5 bg-white space-y-2 text-left h-full">
                  <div className="w-10 h-10 rounded-xl bg-canvas-teal text-brand-teal flex items-center justify-center font-bold">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <h4 className="font-extrabold text-text-primary text-xs group-hover:text-brand-teal transition-colors">
                    Saved Addresses & Locations
                  </h4>
                  <p className="text-[11px] text-text-muted">Manage your care delivery addresses.</p>
                </Card>
              </Link>

              <Link to="/client/support" className="group">
                <Card className="p-4 border-border-default hover:border-brand-teal transition-all shadow-subtle hover:-translate-y-0.5 bg-white space-y-2 text-left h-full">
                  <div className="w-10 h-10 rounded-xl bg-canvas-teal text-brand-teal flex items-center justify-center font-bold">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <h4 className="font-extrabold text-text-primary text-xs group-hover:text-brand-teal transition-colors">
                    Operations Support Desk
                  </h4>
                  <p className="text-[11px] text-text-muted">24/7 hotline & instant callback.</p>
                </Card>
              </Link>
            </div>
          </div>

          {/* Recent Bookings List */}
          <Card className="p-6 border-border-default shadow-subtle bg-white space-y-4">
            <div className="flex items-center justify-between border-b border-border-light pb-3">
              <h3 className="font-extrabold text-text-primary text-sm">Recent Care Requests</h3>
              <Link to="/client/bookings" className="text-xs font-bold text-brand-teal hover:underline flex items-center gap-1">
                View All Bookings <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {bookings.slice(0, 3).map((b) => (
                <div
                  key={b.id}
                  onClick={() => navigate(`/client/bookings/${b.id}`)}
                  className="p-3.5 rounded-2xl border border-border-default hover:border-brand-teal/40 transition-all flex items-center justify-between text-xs cursor-pointer bg-canvas-secondary/50"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-text-primary">{b.serviceName}</span>
                      <BookingStatusBadge status={b.status} />
                    </div>
                    <p className="text-[11px] text-text-muted">
                      {b.scheduledDate} • {b.address.line1}, {b.address.city}
                    </p>
                  </div>

                  <span className="font-extrabold text-brand-teal text-sm">
                    ₹{b.priceBreakdown.totalPrice}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right 4 Columns: Regional Operations & Quick Support */}
        <div className="lg:col-span-4 space-y-6">
          {/* Active Regional Operations Center Banner */}
          <Card className="p-5 space-y-3 border-border-default shadow-subtle bg-white">
            <h4 className="font-extrabold text-text-primary text-xs uppercase tracking-wider flex items-center gap-1.5 border-b border-border-light pb-2">
              <Building2 className="w-4 h-4 text-brand-teal" /> Regional Operations Center
            </h4>

            <div className="p-3 bg-canvas-teal rounded-xl border border-teal-200 space-y-1.5 text-xs">
              <span className="font-extrabold text-teal-950 block">{hub.name}</span>
              <p className="text-[11px] text-teal-800">{hub.hubAddress}</p>
              <div className="flex items-center justify-between text-[10px] font-bold text-teal-900 pt-1 border-t border-teal-200">
                <span>{hub.activeStaffCount} Internal Staff On Duty</span>
                <span className="text-emerald-700 font-extrabold">ETA {hub.avgDispatchTimeMinutes}</span>
              </div>
            </div>
          </Card>

          {/* Care Concierge Support Hotline */}
          <Card className="p-5 space-y-3 border-border-default shadow-subtle bg-white text-xs">
            <h4 className="font-extrabold text-text-primary text-xs uppercase tracking-wider flex items-center gap-1.5 border-b border-border-light pb-2">
              <PhoneCall className="w-4 h-4 text-brand-teal" /> Operations Hotline
            </h4>
            <p className="text-text-secondary">
              Need immediate assistance or emergency shift changes? Contact our 24/7 Operations Command Center in Delhi NCR.
            </p>
            <div className="p-3 bg-canvas-secondary rounded-xl border border-border-default text-brand-teal font-extrabold text-sm flex items-center justify-between">
              <span>+91 921 176 5429</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-900 font-bold px-2 py-0.5 rounded">24/7 ACTIVE</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
