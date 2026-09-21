import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useBookings } from '../../context/BookingContext';
import { Button } from '../../components/common/Button';
import { BookingStatusBadge } from '../../components/common/Badge';
import {
  PulseHeader,
  PulseMetric,
  PulseSurface,
  PulsePanel,
  PulseProgress
} from '../../components/common/PulseUI';
import {
  Activity,
  ShieldAlert,
  CalendarCheck,
  IndianRupee,
  ArrowRight,
  AlertTriangle,
  Clock
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { bookings, professionals } = useBookings();

  const pendingKYC = professionals.filter((p) => p.kycStatus === 'under_review' || p.kycStatus === 'reupload_required');
  const activeBookings = bookings.filter((b) => ['MATCHING', 'ASSIGNED', 'ACCEPTED', 'ON_THE_WAY', 'CHECKED_IN', 'IN_PROGRESS'].includes(b.status));

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="space-y-8 text-left relative min-h-screen bg-canvas-primary p-4 sm:p-6 lg:p-8">
      
      {/* Operations Header */}
      <PulseHeader
        tag="Healthcare Operations Command Center"
        title="Operations Overview"
        subtitle={currentDate}
        statusLabel="Operational SLA: 98.4%"
        statusType="success"
        actions={
          <div className="flex items-center gap-2.5 shrink-0">
            <Link to="/admin/kyc">
              <Button variant="outline" size="sm" leftIcon={<ShieldAlert className="w-4 h-4 text-amber-500" />} className="bg-white border-border-default rounded-full">
                KYC Queue ({pendingKYC.length})
              </Button>
            </Link>
            <Link to="/admin/matching">
              <Button variant="primary" size="sm" leftIcon={<CalendarCheck className="w-4 h-4" />} className="bg-brand-teal text-white font-bold rounded-full">
                Dispatch & Eligibility
              </Button>
            </Link>
          </div>
        }
      />

      {/* OPERATIONS PULSE STATUS STRIPS */}
      <PulsePanel title="Operations Pulse & SLA Compliance" texture="dots">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* Assignments % */}
          <div className="p-4 bg-white rounded-xl border border-border-default space-y-2 shadow-2xs">
            <div className="flex items-center justify-between font-bold">
              <span className="text-text-secondary">Workforce Assignments</span>
              <span className="text-emerald-700 font-heading font-bold tabular-nums">94%</span>
            </div>
            <PulseProgress value={94} color="emerald" showValue={false} size="sm" />
            <span className="text-[11px] text-text-muted">47 of 50 shifts assigned today</span>
          </div>

          {/* Attendance % */}
          <div className="p-4 bg-white rounded-xl border border-border-default space-y-2 shadow-2xs">
            <div className="flex items-center justify-between font-bold">
              <span className="text-text-secondary">Staff Check-in Attendance</span>
              <span className="text-brand-teal font-heading font-bold tabular-nums">91%</span>
            </div>
            <PulseProgress value={91} color="teal" showValue={false} size="sm" />
            <span className="text-[11px] text-text-muted">On-time GPS arrival verification</span>
          </div>

          {/* Timesheets % */}
          <div className="p-4 bg-white rounded-xl border border-border-default space-y-2 shadow-2xs">
            <div className="flex items-center justify-between font-bold">
              <span className="text-text-secondary">Timesheets Processed</span>
              <span className="text-brand-blue font-heading font-bold tabular-nums">78%</span>
            </div>
            <PulseProgress value={78} color="blue" showValue={false} size="sm" />
            <span className="text-[11px] text-text-muted">Sign-off pending superintendent review</span>
          </div>
        </div>
      </PulsePanel>

      {/* TOP METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <PulseMetric
          label="Today's Active Duties"
          value={activeBookings.length}
          change={12.4}
          trend="up"
          changeLabel="vs yesterday"
          icon={<Activity className="w-4 h-4" />}
          status="info"
          onClick={() => navigate('/admin/bookings')}
        />

        <PulseMetric
          label="Unassigned Positions"
          value="03"
          change={-3}
          trend="down"
          changeLabel="Needs Ops match"
          icon={<AlertTriangle className="w-4 h-4" />}
          status="warning"
          onClick={() => navigate('/admin/matching')}
        />

        <PulseMetric
          label="Pending Timesheets"
          value="05"
          changeLabel="Awaiting sign-off"
          icon={<Clock className="w-4 h-4" />}
          status="pending"
          onClick={() => navigate('/admin/organization-requests')}
        />

        <PulseMetric
          label="Outstanding Billing"
          value="₹14.5L"
          change={24.8}
          trend="up"
          changeLabel="Monthly volume"
          icon={<IndianRupee className="w-4 h-4" />}
          status="success"
          onClick={() => navigate('/admin/payments')}
        />
      </div>

      {/* EXCEPTIONS / NEEDS ATTENTION STRIP */}
      <PulseSurface variant="highlight" pulseAccent="top" padding="md" className="space-y-3">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold shrink-0 mt-0.5">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-heading font-extrabold text-amber-950 uppercase tracking-wider">
                Exceptions / Needs Attention (3 Immediate Items)
              </h4>
              <p className="text-xs text-amber-900 font-medium mt-0.5">
                Workforce gaps, pending KYC documents, and organization clarification requests needing intervention.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap shrink-0">
            <button
              onClick={() => navigate('/admin/kyc')}
              className="bg-white hover:bg-amber-100 px-3 py-1.5 rounded-full border border-amber-300 text-xs font-bold text-amber-950 flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-amber-600" /> Pending KYC ({pendingKYC.length})
            </button>
            <button
              onClick={() => navigate('/admin/matching')}
              className="bg-white hover:bg-amber-100 px-3 py-1.5 rounded-full border border-amber-300 text-xs font-bold text-amber-950 flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Activity className="w-3.5 h-3.5 text-brand-teal" /> Dispatch Queue (1)
            </button>
            <button
              onClick={() => navigate('/admin/support')}
              className="bg-white hover:bg-amber-100 px-3 py-1.5 rounded-full border border-amber-300 text-xs font-bold text-amber-950 flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Clock className="w-3.5 h-3.5 text-brand-blue" /> Support Tickets (1)
            </button>
          </div>
        </div>
      </PulseSurface>

      {/* LIVE CARE VISIT FEED TABLE */}
      <PulsePanel
        title="Live Care Visit Feed"
        subtitle="Real-time telemetry of active home care & institutional shifts"
        actions={
          <Link to="/admin/bookings" className="text-xs font-bold text-brand-teal flex items-center gap-1 hover:underline">
            View All Bookings <ArrowRight className="w-4 h-4" />
          </Link>
        }
      >
        <div className="divide-y divide-border-light">
          {bookings.slice(0, 5).map((booking) => (
            <div key={booking.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs hover:bg-teal-50/20 px-2 rounded-lg transition-colors">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-heading font-bold text-text-primary text-sm">{booking.serviceName}</span>
                  <BookingStatusBadge status={booking.status} />
                </div>
                <p className="text-text-muted">
                  Code: <strong className="text-text-secondary font-mono">{booking.bookingCode}</strong> • Patient: {booking.patientProfile.firstName} {booking.patientProfile.lastName}
                </p>
              </div>
              <div className="flex items-center gap-4 text-right shrink-0">
                <div>
                  <span className="font-heading font-extrabold text-text-primary block tabular-nums">₹{booking.priceBreakdown.totalPrice}</span>
                  <span className="text-[11px] text-text-muted block">{booking.scheduledDate}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/admin/bookings')}
                  className="text-xs font-bold border-border-default rounded-full"
                >
                  Inspect
                </Button>
              </div>
            </div>
          ))}
        </div>
      </PulsePanel>
    </div>
  );
};
