import React, { useState } from 'react';
import { Button } from '../../components/common/Button';
import {
  PulseTableContainer,
  PulseTableHeader,
  PulseTableRow,
  PulseStatus,
  PulseSurface,
  PulseModal
} from '../../components/common/PulseUI';
import { MOCK_FACILITY_TIMESHEETS } from '../../data/mockB2BData';
import type { FacilityTimesheet } from '../../types';
import {
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
} from 'lucide-react';

export const OrgTimesheetsPage: React.FC = () => {
  const [timesheets, setTimesheets] = useState<FacilityTimesheet[]>(MOCK_FACILITY_TIMESHEETS);
  const [activeTab, setActiveTab] = useState<'submitted' | 'approved_by_facility' | 'rejected' | 'all'>('submitted');
  const [selectedTimesheet, setSelectedTimesheet] = useState<FacilityTimesheet | null>(null);

  // Rejection Form State
  const [rejectionReason, setRejectionReason] = useState('');
  const [isRejecting, setIsRejecting] = useState(false);
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);

  const filteredTimesheets = timesheets.filter((t) => {
    if (activeTab === 'all') return true;
    return t.approvalStatus === activeTab;
  });

  const handleApproveTimesheet = (id: string) => {
    setTimesheets((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          return {
            ...t,
            approvalStatus: 'approved_by_facility',
            approvedAt: new Date().toISOString(),
          };
        }
        return t;
      })
    );
    setActionSuccessMsg(`Timesheet ${selectedTimesheet?.timesheetNumber || id} approved for billing!`);
    setTimeout(() => {
      setActionSuccessMsg(null);
      setSelectedTimesheet(null);
      setIsRejecting(false);
    }, 1500);
  };

  const handleRejectTimesheet = (id: string) => {
    if (!rejectionReason.trim()) return;

    setTimesheets((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          return {
            ...t,
            approvalStatus: 'rejected',
            rejectionReason: rejectionReason,
          };
        }
        return t;
      })
    );
    setActionSuccessMsg(`Timesheet rejected. Sent to Operations for correction.`);
    setTimeout(() => {
      setActionSuccessMsg(null);
      setSelectedTimesheet(null);
      setIsRejecting(false);
      setRejectionReason('');
    }, 1500);
  };

  return (
    <div className="space-y-8 text-left relative min-h-screen bg-canvas-primary p-4 sm:p-6 lg:p-8">

      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 p-6 sm:p-8 rounded-3xl text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10 border border-brand-teal/20">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-teal/20 text-teal-300 text-xs font-heading font-black uppercase tracking-wider border border-brand-teal/30">
            <Clock className="w-3.5 h-3.5" />
            Shift Verification & Superintendent Sign-Off
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold tracking-tight">
            Digital Shift Timesheets
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm font-medium font-sans">
            Review actual clock-in/out hours logged by internal staff for institutional retainer billing.
          </p>
        </div>

        <div className="bg-white/10 px-4 py-2 rounded-xl border border-white/20 text-center">
          <p className="text-[10px] text-teal-300 font-bold uppercase tracking-wider font-heading">Pending Approval</p>
          <p className="text-xl font-heading font-extrabold text-white">
            {timesheets.filter((t) => t.approvalStatus === 'submitted').length}
          </p>
        </div>
      </div>

      {/* STATUS TABS */}
      <div className="bg-white p-2 rounded-xl border border-border-default shadow-2xs flex items-center gap-1.5 max-w-md relative z-10">
        {[
          { id: 'submitted', label: 'Pending Approval' },
          { id: 'approved_by_facility', label: 'Approved' },
          { id: 'rejected', label: 'Rejected' },
          { id: 'all', label: 'All Timesheets' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-heading font-bold transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-brand-teal text-white shadow-2xs'
                : 'text-text-muted hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TIMESHEET TABLE */}
      <PulseTableContainer title="Shift Timesheet Records" subtitle="Institutional workforce shift verification logs">
        <table className="w-full text-left text-xs">
          <PulseTableHeader>
            <tr>
              <th className="p-4">Timesheet No</th>
              <th className="p-4">Shift Date</th>
              <th className="p-4">Staff Member</th>
              <th className="p-4">Department</th>
              <th className="p-4">Clocked Times</th>
              <th className="p-4 text-center">Hours</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </PulseTableHeader>
          <tbody className="divide-y divide-border-light">
            {filteredTimesheets.map((ts) => (
              <PulseTableRow
                key={ts.id}
                statusAccent={
                  ts.approvalStatus === 'approved_by_facility'
                    ? 'success'
                    : ts.approvalStatus === 'rejected'
                    ? 'danger'
                    : 'warning'
                }
              >
                <td className="p-4 font-mono font-bold text-brand-teal">{ts.timesheetNumber}</td>
                <td className="p-4 font-heading font-bold text-text-primary">{ts.shiftDate}</td>
                <td className="p-4">
                  <div className="space-y-0.5">
                    <p className="font-heading font-extrabold text-text-primary">{ts.staffName}</p>
                    <p className="text-[11px] text-text-muted font-sans">{ts.staffEmployeeId} • {ts.staffRole}</p>
                  </div>
                </td>
                <td className="p-4 font-bold text-text-secondary">{ts.department}</td>
                <td className="p-4">
                  <span className="font-mono text-[11px] font-bold text-text-primary bg-surface-subtle px-2 py-0.5 rounded border border-border-default">
                    {ts.clockInTime || '--'} – {ts.clockOutTime || '--'}
                  </span>
                </td>
                <td className="p-4 text-center font-heading font-extrabold text-text-primary">{ts.hoursWorked}h</td>
                <td className="p-4 text-center">
                  <PulseStatus
                    status={
                      ts.approvalStatus === 'approved_by_facility'
                        ? 'success'
                        : ts.approvalStatus === 'rejected'
                        ? 'danger'
                        : 'warning'
                    }
                    label={ts.approvalStatus.replace(/_/g, ' ')}
                    size="sm"
                  />
                </td>
                <td className="p-4 text-center">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setSelectedTimesheet(ts);
                      setIsRejecting(false);
                      setRejectionReason('');
                    }}
                    leftIcon={<Eye className="w-3.5 h-3.5" />}
                    className="border-border-default text-text-primary hover:bg-slate-100 font-bold text-[11px] cursor-pointer rounded-full"
                  >
                    Review
                  </Button>
                </td>
              </PulseTableRow>
            ))}
          </tbody>
        </table>
      </PulseTableContainer>

      {/* SHIFT TIMESHEET REVIEW MODAL */}
      {selectedTimesheet && (
        <PulseModal
          isOpen={!!selectedTimesheet}
          onClose={() => setSelectedTimesheet(null)}
          title={`Timesheet Verification — ${selectedTimesheet.timesheetNumber}`}
        >
          <div className="space-y-5 text-left text-xs">
            {actionSuccessMsg ? (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 font-heading font-extrabold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>{actionSuccessMsg}</span>
              </div>
            ) : (
              <>
                <PulseSurface variant="flat" padding="md" className="space-y-1">
                  <span className="font-mono text-[10px] font-bold text-brand-teal uppercase">
                    Requisition Ref: {selectedTimesheet.requestNumber}
                  </span>
                  <h3 className="text-base font-heading font-extrabold text-text-primary pt-1">{selectedTimesheet.staffName}</h3>
                  <p className="text-text-muted">Role: <strong className="text-text-primary">{selectedTimesheet.staffRole}</strong> ({selectedTimesheet.staffEmployeeId})</p>
                  <p className="text-text-muted">Department: <strong className="text-text-primary">{selectedTimesheet.department}</strong> • Date: <strong className="text-text-primary">{selectedTimesheet.shiftDate}</strong></p>
                </PulseSurface>

                <div className="grid grid-cols-2 gap-3 text-text-primary">
                  <div className="p-3 rounded-xl border border-border-default bg-white space-y-0.5">
                    <span className="text-[10px] text-text-muted font-bold uppercase">Scheduled Shift</span>
                    <p className="font-heading font-bold text-text-primary">{selectedTimesheet.shiftType.replace(/_/g, ' ')}</p>
                  </div>
                  <div className="p-3 rounded-xl border border-border-default bg-white space-y-0.5">
                    <span className="text-[10px] text-text-muted font-bold uppercase">Actual Clock In/Out</span>
                    <p className="font-heading font-bold text-brand-teal">{selectedTimesheet.clockInTime} → {selectedTimesheet.clockOutTime}</p>
                  </div>
                  <div className="p-3 rounded-xl border border-border-default bg-white space-y-0.5">
                    <span className="text-[10px] text-text-muted font-bold uppercase">Break Duration</span>
                    <p className="font-heading font-bold text-text-primary">{selectedTimesheet.breakDurationMins} Mins</p>
                  </div>
                  <div className="p-3 rounded-xl border border-border-default bg-white space-y-0.5">
                    <span className="text-[10px] text-text-muted font-bold uppercase">Total Verified Hours</span>
                    <p className="font-heading font-black text-emerald-700 text-sm">{selectedTimesheet.hoursWorked} Hours</p>
                  </div>
                </div>

                {/* Handover & Supervisor Notes */}
                <div className="p-3.5 rounded-xl border border-border-default bg-surface-subtle space-y-1">
                  <p className="font-heading font-bold text-text-primary">Shift Handover Note</p>
                  <p className="text-text-muted leading-relaxed font-medium font-sans">
                    All 4 ventilator patients in Ward 4 monitored cleanly. Vitals chart logged in daily clinical sheet.
                  </p>
                </div>

                {/* Rejection Form Input */}
                {isRejecting ? (
                  <div className="space-y-3 pt-2 border-t border-border-light">
                    <label className="block text-xs font-bold text-rose-700">Reason for Rejection *</label>
                    <textarea
                      rows={2}
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                      placeholder="Specify reason for rejecting shift timesheet..."
                      className="w-full px-3 py-2 rounded-xl border border-rose-300 text-xs font-sans text-text-primary bg-white"
                      required
                    />
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setIsRejecting(false)}
                        className="text-text-muted font-bold text-xs rounded-full"
                      >
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleRejectTimesheet(selectedTimesheet.id)}
                        className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-full"
                      >
                        Confirm Rejection
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between pt-3 border-t border-border-light">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setIsRejecting(true)}
                      leftIcon={<XCircle className="w-3.5 h-3.5 text-rose-600" />}
                      className="border-rose-200 text-rose-700 hover:bg-rose-50 font-bold text-xs cursor-pointer rounded-full"
                    >
                      Reject Timesheet
                    </Button>

                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => handleApproveTimesheet(selectedTimesheet.id)}
                      leftIcon={<CheckCircle2 className="w-3.5 h-3.5" />}
                      className="bg-brand-teal hover:bg-brand-teal-hover text-white font-bold text-xs cursor-pointer px-4 rounded-full"
                    >
                      Approve Shift Timesheet
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </PulseModal>
      )}
    </div>
  );
};
