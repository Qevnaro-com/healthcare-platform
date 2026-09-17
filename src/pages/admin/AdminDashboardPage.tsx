import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useBookings } from '../../context/BookingContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { BookingStatusBadge } from '../../components/common/Badge';
import { MetricCard } from '../../components/common/CardPrimitives';
import { HealthcareTexture } from '../../components/common/HealthcareTexture';
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
    <div className="space-y-8 text-left relative">
      <HealthcareTexture type="micro-dot-mesh" opacity={0.03} />

      {/* Operations Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10 bg-white p-6 rounded-2xl border border-border-default shadow-subtle bg-texture-dots">
        <div>
          <span className="text-xs font-bold text-brand-teal uppercase tracking-widest block">
            Healthcare Operations Command Center
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-text-primary tracking-tight">
            Operations Overview
          </h1>
          <p className="text-xs text-text-muted mt-0.5">{currentDate}</p>
        </div>
        
        <div className="flex items-center gap-2.5 shrink-0">
          <Link to="/admin/kyc">
            <Button variant="outline" size="sm" leftIcon={<ShieldAlert className="w-4 h-4 text-amber-500" />} className="bg-white border-border-default">
              KYC Queue ({pendingKYC.length})
            </Button>
          </Link>
          <Link to="/admin/matching">
            <Button variant="primary" size="sm" leftIcon={<CalendarCheck className="w-4 h-4" />} className="bg-brand-teal text-white font-bold">
              Dispatch & Eligibility
            </Button>
          </Link>
        </div>
      </div>

      {/* OPERATIONS PULSE STATUS STRIPS */}
      <div className="bg-white p-5 rounded-2xl border border-border-default shadow-subtle space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-extrabold text-text-muted uppercase tracking-widest">
            Operations Pulse & SLA Compliance
          </h3>
          <span className="text-xs font-bold text-brand-teal">System Operational SLA: 98.4%</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* Assignments % */}
          <div className="p-3.5 bg-canvas-secondary rounded-xl border border-border-default space-y-2">
            <div className="flex items-center justify-between font-bold">
              <span className="text-text-secondary">Workforce Assignments</span>
              <span className="text-emerald-700 font-extrabold tabular-nums">94%</span>
            </div>
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-600 rounded-full" style={{ width: '94%' }} />
            </div>
            <span className="text-[11px] text-text-muted">47 of 50 shifts assigned today</span>
          </div>

          {/* Attendance % */}
          <div className="p-3.5 bg-canvas-secondary rounded-xl border border-border-default space-y-2">
            <div className="flex items-center justify-between font-bold">
              <span className="text-text-secondary">Staff Check-in Attendance</span>
              <span className="text-brand-teal font-extrabold tabular-nums">91%</span>
            </div>
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-brand-teal rounded-full" style={{ width: '91%' }} />
            </div>
            <span className="text-[11px] text-text-muted">On-time GPS arrival verification</span>
          </div>

          {/* Timesheets % */}
          <div className="p-3.5 bg-canvas-secondary rounded-xl border border-border-default space-y-2">
            <div className="flex items-center justify-between font-bold">
              <span className="text-text-secondary">Timesheets Processed</span>
              <span className="text-indigo-600 font-extrabold tabular-nums">78%</span>
            </div>
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-600 rounded-full" style={{ width: '78%' }} />
            </div>
            <span className="text-[11px] text-text-muted">Sign-off pending superintendent review</span>
          </div>
        </div>
      </div>

      {/* TOP METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Today's Active Duties"
          value={activeBookings.length}
          change="+12.4%"
          changeType="positive"
          subtitle="vs yesterday"
          icon={<Activity className="w-5 h-5 text-brand-teal" />}
          badge="LIVE"
          onClick={() => navigate('/admin/bookings')}
        />

        <MetricCard
          label="Unassigned Positions"
          value="03"
          change="3 Gaps"
          changeType="negative"
          subtitle="Needs Ops match"
          icon={<AlertTriangle className="w-5 h-5 text-amber-600" />}
          onClick={() => navigate('/admin/matching')}
        />

        <MetricCard
          label="Pending Timesheets"
          value="05"
          subtitle="Awaiting sign-off"
          icon={<Clock className="w-5 h-5 text-purple-600" />}
          onClick={() => navigate('/admin/organization-requests')}
        />

        <MetricCard
          label="Outstanding Billing"
          value="₹14.5L"
          change="+24.8%"
          changeType="positive"
          subtitle="Monthly volume"
          icon={<IndianRupee className="w-5 h-5 text-emerald-600" />}
          onClick={() => navigate('/admin/payments')}
        />
      </div>

      {/* EXCEPTIONS / NEEDS ATTENTION STRIP */}
      <div className="bg-amber-50/90 border border-amber-300 p-4 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-subtle">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold shrink-0 mt-0.5">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-black text-amber-950 uppercase tracking-wider">
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
            className="bg-white hover:bg-amber-100 px-3 py-1.5 rounded-xl border border-amber-300 text-xs font-bold text-amber-950 flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-amber-600" /> Pending KYC ({pendingKYC.length})
          </button>
          <button
            onClick={() => navigate('/admin/matching')}
            className="bg-white hover:bg-amber-100 px-3 py-1.5 rounded-xl border border-amber-300 text-xs font-bold text-amber-950 flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <Activity className="w-3.5 h-3.5 text-brand-teal" /> Dispatch Queue (1)
          </button>
          <button
            onClick={() => navigate('/admin/support')}
            className="bg-white hover:bg-amber-100 px-3 py-1.5 rounded-xl border border-amber-300 text-xs font-bold text-amber-950 flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <Clock className="w-3.5 h-3.5 text-blue-600" /> Support Tickets (1)
          </button>
        </div>
      </div>

      {/* LIVE CARE VISIT FEED TABLE */}
      <Card className="p-6 border-border-default shadow-subtle space-y-4 bg-white rounded-surface">
        <div className="flex items-center justify-between border-b border-border-default pb-3">
          <div>
            <h3 className="text-base font-extrabold text-text-primary">Live Care Visit Feed</h3>
            <p className="text-xs text-text-muted">Real-time telemetry of active home care & institutional shifts</p>
          </div>
          <Link to="/admin/bookings" className="text-xs font-bold text-brand-teal flex items-center gap-1 hover:underline">
            View All Bookings <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="divide-y divide-border-default">
          {bookings.slice(0, 5).map((booking) => (
            <div key={booking.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-text-primary text-sm">{booking.serviceName}</span>
                  <BookingStatusBadge status={booking.status} />
                </div>
                <p className="text-text-muted">
                  Code: <strong className="text-text-secondary">{booking.bookingCode}</strong> • Patient: {booking.patientProfile.firstName} {booking.patientProfile.lastName}
                </p>
              </div>
              <div className="flex items-center gap-4 text-right shrink-0">
                <div>
                  <span className="font-black text-text-primary block tabular-nums">₹{booking.priceBreakdown.totalPrice}</span>
                  <span className="text-[11px] text-text-muted block">{booking.scheduledDate}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/admin/bookings')}
                  className="text-xs font-bold border-border-default"
                >
                  Inspect
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
