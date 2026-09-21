import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import {
  PulseMetric,
  PulseSurface,
  PulsePanel,
  PulseStatus,
  PulseLine,
  PulseProgress
} from '../../components/common/PulseUI';
import {
  MOCK_B2B_REQUESTS,
  MOCK_FACILITY_ROSTER_SLOTS,
  MOCK_FACILITY_TIMESHEETS,
  MOCK_B2B_CLARIFICATIONS,
} from '../../data/mockB2BData';
import {
  Building2,
  PlusCircle,
  Users,
  FileSpreadsheet,
  ChevronRight,
  ArrowUpRight
} from 'lucide-react';

export const OrgDashboardPage: React.FC = () => {
  const navigate = useNavigate();

  const orgName = 'Max Super Speciality Hospital, Saket';

  // Derived Metrics
  const activeRequests = MOCK_B2B_REQUESTS.filter((r) => r.status !== 'completed' && r.status !== 'cancelled');
  const pendingTimesheets = MOCK_FACILITY_TIMESHEETS.filter((t) => t.approvalStatus === 'submitted');
  const pendingClarifications = MOCK_B2B_CLARIFICATIONS.filter((c) => c.status === 'pending_response');

  return (
    <div className="space-y-8 text-left relative min-h-screen bg-canvas-primary p-4 sm:p-6 lg:p-8">
      
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-[#050F33] via-slate-900 to-[#050F33] p-6 sm:p-8 rounded-3xl text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10 overflow-hidden border border-teal-500/20">
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 text-teal-300 text-xs font-heading font-black uppercase tracking-widest border border-teal-400/20">
            <Building2 className="w-3.5 h-3.5" />
            Institutional Workforce Command Dashboard
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold tracking-tight">
            Good morning, {orgName}
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm font-medium font-sans">
            Live shift coverage, staffing requisitions, and timesheet logs across your facility wards.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 relative z-10">
          <Button
            variant="primary"
            onClick={() => navigate('/organization/requests/new')}
            leftIcon={<PlusCircle className="w-4 h-4" />}
            className="bg-brand-teal hover:bg-brand-teal-hover text-white font-bold text-xs py-2.5 px-5 rounded-full cursor-pointer shadow-md border border-teal-400/30"
          >
            + New Staffing Requisition
          </Button>
        </div>

        <div className="absolute inset-x-0 bottom-0 opacity-20 pointer-events-none">
          <PulseLine variant="hero" animated />
        </div>
      </div>

      {/* WORKFORCE COVERAGE HORIZONTAL TIME AXIS (RULE 28 COMPLIANCE) */}
      <PulsePanel
        title="Today's Workforce Shift Timeline & Department Coverage"
        subtitle="Horizontal 24h shift placement axis across hospital units"
        texture="blueprint"
        actions={
          <Link
            to="/organization/roster"
            className="text-xs font-bold text-brand-teal hover:underline flex items-center gap-1"
          >
            <span>Full Roster</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        }
      >
        <div className="space-y-4 pt-2">
          {/* Timeline Axis Headers */}
          <div className="hidden md:flex items-center justify-between text-2xs font-mono font-bold text-text-muted border-b border-border-light pb-2 px-4">
            <span className="w-40 shrink-0">DEPARTMENT / UNIT</span>
            <div className="flex-1 flex justify-between px-4">
              <span>08:00</span>
              <span>10:00</span>
              <span>12:00</span>
              <span>14:00</span>
              <span>16:00</span>
              <span>18:00</span>
              <span>20:00</span>
            </div>
            <span className="w-24 text-right shrink-0">STATUS</span>
          </div>

          {/* Department Timeline Rows */}
          {[
            {
              unit: 'Cardiac ICU Ward 4',
              role: 'ICU / Cardiac Critical Care Nurse',
              timeStr: '08:00 – 20:00 (Day Shift)',
              offset: '0%',
              width: '100%',
              assigned: 3,
              required: 4,
              status: 'gap'
            },
            {
              unit: 'Cardiac ICU Ward 4',
              role: 'ICU / Critical Care Nurse',
              timeStr: '20:00 – 08:00 (Night Shift)',
              offset: '50%',
              width: '50%',
              assigned: 4,
              required: 4,
              status: 'covered'
            },
            {
              unit: 'Physiotherapy & Rehab Unit',
              role: 'Physiotherapist Specialist',
              timeStr: '09:00 – 18:00 (General Shift)',
              offset: '8%',
              width: '75%',
              assigned: 2,
              required: 2,
              status: 'covered'
            }
          ].map((row, idx) => (
            <div
              key={idx}
              onClick={() => navigate('/organization/roster')}
              className="p-4 rounded-xl border border-border-default bg-white hover:border-brand-teal/40 transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs"
            >
              <div className="w-full md:w-48 shrink-0">
                <span className="text-xs font-heading font-extrabold text-text-primary block">{row.unit}</span>
                <span className="text-[11px] text-text-muted font-sans block">{row.role}</span>
              </div>

              {/* Visual Shift Bar */}
              <div className="flex-1 bg-slate-100 h-8 rounded-lg relative overflow-hidden flex items-center px-3 border border-border-default">
                <div
                  className={`h-6 rounded-md text-white text-[10px] font-bold flex items-center px-2 shadow-xs transition-all ${
                    row.status === 'gap' ? 'bg-amber-500' : 'bg-brand-teal'
                  }`}
                  style={{ width: row.width }}
                >
                  <span className="truncate">{row.timeStr} • ({row.assigned}/{row.required} Staff)</span>
                </div>
              </div>

              <div className="w-full md:w-28 text-right shrink-0 flex items-center justify-between md:justify-end gap-2">
                <PulseStatus
                  status={row.status === 'gap' ? 'warning' : 'success'}
                  label={row.status === 'gap' ? '1 Gap' : 'Covered'}
                  size="sm"
                  pulse={row.status === 'gap'}
                />
                <ChevronRight className="w-4 h-4 text-text-muted" />
              </div>
            </div>
          ))}
        </div>
      </PulsePanel>

      {/* SECONDARY OPERATIONAL STRIP (KPIS + ACTION QUEUE) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        {/* LEFT 7 COLS: ACTION QUEUE & ACTIVE REQUESTS */}
        <div className="lg:col-span-7 space-y-6">
          <PulsePanel
            title="Institutional Action Queue"
            badge={<PulseStatus status="warning" label="Immediate Items" size="sm" pulse />}
          >
            <div className="space-y-3">
              {pendingTimesheets.length > 0 && (
                <div className="p-4 rounded-xl bg-amber-50/70 border-l-4 border-l-amber-500 border border-amber-200 flex items-center justify-between gap-3 text-left">
                  <div className="space-y-0.5">
                    <p className="text-xs font-heading font-bold text-amber-950">
                      {pendingTimesheets.length} Shift Timesheets Awaiting Approval
                    </p>
                    <p className="text-[11px] text-amber-800 font-medium font-sans">
                      Superintendent sign-off required for ICU shift completion.
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate('/organization/timesheets')}
                    className="border-amber-600 text-amber-900 hover:bg-amber-100 font-bold text-xs cursor-pointer shrink-0 rounded-full"
                  >
                    Approve
                  </Button>
                </div>
              )}

              {pendingClarifications.length > 0 && (
                <div className="p-4 rounded-xl bg-teal-50/70 border-l-4 border-l-brand-teal border border-brand-teal/30 flex items-center justify-between gap-3 text-left">
                  <div className="space-y-0.5">
                    <p className="text-xs font-heading font-bold text-teal-950">
                      Operations Requested Clarification
                    </p>
                    <p className="text-[11px] text-teal-800 font-medium font-sans">
                      Question regarding ACLS certification for PNC-B2B-2026-041.
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate('/organization/requests/req-b2b-001')}
                    className="border-brand-teal text-brand-teal hover:bg-teal-100 font-bold text-xs cursor-pointer shrink-0 rounded-full"
                  >
                    Respond
                  </Button>
                </div>
              )}

              <div className="p-4 rounded-xl bg-surface-subtle border border-border-default flex items-center justify-between gap-3 text-left">
                <div className="space-y-0.5">
                  <p className="text-xs font-heading font-bold text-text-primary">
                    1 Staffing Gap Requires Attention
                  </p>
                  <p className="text-[11px] text-text-muted font-medium font-sans">
                    Cardiac ICU Ward 4 Day Shift has 1 open slot.
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => navigate('/organization/roster')}
                  className="border-border-default text-text-primary hover:bg-white font-bold text-xs cursor-pointer shrink-0 rounded-full"
                >
                  View Roster
                </Button>
              </div>
            </div>
          </PulsePanel>

          {/* ACTIVE REQUISITIONS */}
          <PulsePanel
            title="Active Requisitions & Fulfillment Progress"
            subtitle="Live status of institutional workforce requests"
            actions={
              <Link
                to="/organization/requests"
                className="text-xs font-bold text-brand-teal hover:underline flex items-center gap-1"
              >
                <span>View All Requests</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            }
          >
            <div className="space-y-4">
              {activeRequests.map((req) => {
                const pct = Math.round((req.totalStaffAssigned / req.totalStaffRequired) * 100);
                return (
                  <PulseSurface
                    key={req.id}
                    variant="raised"
                    padding="md"
                    className="space-y-3 border-border-default hover:border-brand-teal/40 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-brand-teal bg-teal-50 px-2 py-0.5 rounded border border-brand-teal/20">
                            {req.requestNumber}
                          </span>
                          <PulseStatus
                            status={
                              req.status === 'fulfilled'
                                ? 'success'
                                : req.status === 'partially_fulfilled'
                                ? 'warning'
                                : 'info'
                            }
                            label={req.status.replace(/_/g, ' ')}
                            size="sm"
                          />
                        </div>
                        <h4 className="text-sm font-heading font-extrabold text-text-primary pt-1">
                          {req.facilityLocation.department} Staffing Requisition
                        </h4>
                      </div>

                      <Link
                        to={`/organization/requests/${req.id}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-brand-teal/10 hover:bg-brand-teal/20 text-brand-teal text-xs font-bold transition-colors cursor-pointer shrink-0"
                      >
                        <span>Inspect Requisition</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                    <PulseProgress
                      value={pct}
                      label={`${req.totalStaffAssigned} / ${req.totalStaffRequired} Staff Positions Assigned`}
                      color="gradient"
                    />
                  </PulseSurface>
                );
              })}
            </div>
          </PulsePanel>
        </div>

        {/* RIGHT 5 COLS: SUPPORTING KPIS & UPCOMING SHIFTS */}
        <div className="lg:col-span-5 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <PulseMetric
              label="Active Requests"
              value={activeRequests.length.toString().padStart(2, '0')}
              subvalue="Live requisitions"
              icon={<FileSpreadsheet className="w-4 h-4" />}
              status="info"
              onClick={() => navigate('/organization/requests')}
            />
            <PulseMetric
              label="Assigned Staff"
              value={MOCK_FACILITY_ROSTER_SLOTS.filter((s) => s.status === 'assigned' || s.status === 'acknowledged').length.toString().padStart(2, '0')}
              subvalue="3 Wards"
              icon={<Users className="w-4 h-4" />}
              status="success"
              onClick={() => navigate('/organization/roster')}
            />
          </div>

          <PulsePanel
            title="Upcoming Facility Shifts"
            actions={
              <Link
                to="/organization/schedule"
                className="text-xs font-bold text-brand-teal hover:underline flex items-center gap-1"
              >
                <span>Calendar</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            }
          >
            <div className="space-y-2.5">
              {[
                { date: '18 Sep', time: '08:00–20:00', dept: 'Cardiac ICU', role: 'Registered Nurse', staff: 'Sunita Sharma, RN', status: 'Confirmed' },
                { date: '18 Sep', time: '20:00–08:00', dept: 'Cardiac ICU', role: 'Critical Care Nurse', staff: 'Pooja Verma, RN', status: 'Confirmed' },
                { date: '19 Sep', time: '08:00–20:00', dept: 'Cardiac ICU', role: 'Registered Nurse', staff: 'Rajesh Kumar, RN', status: 'Confirmed' },
                { date: '19 Sep', time: '09:00–18:00', dept: 'Physiotherapy', role: 'Physiotherapist', staff: 'Dr. Alok Verma, PT', status: 'Confirmed' },
              ].map((shift, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl border border-border-light bg-surface-subtle/40 flex items-center justify-between text-left text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-brand-teal">{shift.date}</span>
                      <span className="text-text-muted font-sans">{shift.time}</span>
                    </div>
                    <p className="font-heading font-bold text-text-primary">{shift.role} • {shift.dept}</p>
                    <p className="text-[11px] text-text-muted font-sans">Assigned: {shift.staff}</p>
                  </div>
                  <PulseStatus status="success" label={shift.status} size="sm" pulse={false} />
                </div>
              ))}
            </div>
          </PulsePanel>

          <PulsePanel title="Quick Actions">
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                onClick={() => navigate('/organization/requests/new')}
                className="justify-start text-xs font-bold border-border-default hover:border-brand-teal/40 hover:bg-teal-50/50 text-text-primary rounded-xl"
              >
                + New Requisition
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/organization/roster')}
                className="justify-start text-xs font-bold border-border-default hover:border-brand-teal/40 hover:bg-teal-50/50 text-text-primary rounded-xl"
              >
                View Roster
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/organization/timesheets')}
                className="justify-start text-xs font-bold border-border-default hover:border-brand-teal/40 hover:bg-teal-50/50 text-text-primary rounded-xl"
              >
                Timesheets
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/organization/support')}
                className="justify-start text-xs font-bold border-border-default hover:border-brand-teal/40 hover:bg-teal-50/50 text-text-primary rounded-xl"
              >
                Ops Support
              </Button>
            </div>
          </PulsePanel>
        </div>
      </div>
    </div>
  );
};
