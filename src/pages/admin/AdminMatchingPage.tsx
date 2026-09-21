import React, { useState } from 'react';
import { Cpu, MapPin, CheckCircle2, Calendar, ShieldAlert } from 'lucide-react';
import { useBookings } from '../../context/BookingContext';
import { Button } from '../../components/common/Button';
import { BookingStatusBadge } from '../../components/common/Badge';
import { AdminOverrideModal } from '../../components/domain/AdminOverrideModal';
import { checkStaffConflict } from '../../utils/conflictEngine';
import {
  PulseHeader,
  PulseSurface,
  PulsePanel,
  PulseStatus
} from '../../components/common/PulseUI';
import type { Booking, StaffProfile } from '../../types';
import { MOCK_STAFF_PROFILES } from '../../data/mockStaffData';

export const AdminMatchingPage: React.FC = () => {
  const { bookings, assignProfessional, updateBookingStatus } = useBookings();

  // Operational Settings (Minimum Rest Hours configurable)
  const minimumRestHours = 10;

  // Filter requested/unassigned bookings
  const unassignedBookings = bookings.filter(
    (b: Booking) => b.status === 'REQUESTED' || b.status === 'MATCHING' || !b.professionalId
  );

  const [selectedBookingId, setSelectedBookingId] = useState<string>(
    unassignedBookings[0]?.id || bookings[0]?.id
  );
  const [successMsg, setSuccessMsg] = useState('');
  const [overrideModal, setOverrideModal] = useState<{
    isOpen: boolean;
    staff: StaffProfile | null;
    conflictReason: string;
  }>({
    isOpen: false,
    staff: null,
    conflictReason: '',
  });

  const selectedBooking = bookings.find((b) => b.id === selectedBookingId) || unassignedBookings[0] || bookings[0];
  const activeStaff = MOCK_STAFF_PROFILES.filter((s) => s.employmentStatus === 'active');

  const handleManualDispatch = (staffId: string, isOverride: boolean = false, overrideRationale?: string) => {
    const staff = MOCK_STAFF_PROFILES.find((s) => s.id === staffId);
    if (!selectedBooking || !staff) return;

    assignProfessional(selectedBooking.id, staff.id);
    const note = isOverride
      ? `[SUPER ADMIN OVERRIDE] Force assigned ${staff.fullName} (${staff.employeeId}). Rationale: ${overrideRationale}`
      : `Assigned internal staff ${staff.fullName} (${staff.employeeId}) by Operations Desk.`;

    updateBookingStatus(selectedBooking.id, 'ASSIGNED', note);

    setSuccessMsg(
      `Booking ${selectedBooking.bookingCode} assigned to ${staff.fullName} (${staff.employeeId}). ${
        isOverride ? '⚡ Super Admin Override Recorded.' : ''
      }`
    );
    setTimeout(() => {
      setSuccessMsg('');
    }, 4000);
  };

  return (
    <div className="space-y-6 text-left max-w-7xl mx-auto min-h-screen bg-canvas-primary p-4 sm:p-6 lg:p-8">
      {/* Header Banner */}
      <PulseHeader
        tag="Care Operations Command Center"
        title="Staff Eligibility & Assignment Engine"
        subtitle="Rule-based eligibility verification (Skills, Location, Rest Window & Conflict Prevention) for home care dispatch."
        statusLabel={`${unassignedBookings.length} Unassigned Request(s)`}
        statusType={unassignedBookings.length > 0 ? 'warning' : 'success'}
      />

      {successMsg && (
        <div className="p-4 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 text-xs font-heading font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" /> {successMsg}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Unassigned Booking Queue */}
        <div className="lg:col-span-4">
          <PulsePanel
            title={
              <div className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-brand-teal" />
                <span>Pending Dispatch Queue ({unassignedBookings.length})</span>
              </div>
            }
            variant="raised"
          >
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
              {unassignedBookings.length === 0 ? (
                <div className="p-8 text-center text-text-muted text-xs">
                  All client care requests have assigned internal staff.
                </div>
              ) : (
                unassignedBookings.map((b: Booking) => {
                  const isSelected = selectedBooking?.id === b.id;
                  return (
                    <div
                      key={b.id}
                      onClick={() => setSelectedBookingId(b.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-teal-50/70 border-brand-teal ring-2 ring-brand-teal/20 shadow-xs'
                          : 'bg-white border-border-default hover:border-brand-teal/40'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <span className="font-mono text-xs font-bold text-brand-teal">{b.bookingCode || b.id}</span>
                        <BookingStatusBadge status={b.status} />
                      </div>
                      <h3 className="font-heading font-bold text-text-primary text-sm mt-2">{b.serviceName}</h3>
                      <p className="text-xs text-text-muted mt-0.5 font-sans">
                        {b.clientName} • {b.address.line1}
                      </p>
                      <div className="flex justify-between items-center text-[10px] text-text-muted mt-3 pt-2 border-t border-border-light font-sans">
                        <span>Date: {b.scheduledDate}</span>
                        <span className="font-heading font-extrabold text-text-primary">₹{b.priceBreakdown.totalPrice}</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </PulsePanel>
        </div>

        {/* Selected Booking Eligibility Inspection & Assignment Panel */}
        <div className="lg:col-span-8 space-y-6">
          {selectedBooking ? (
            <PulsePanel variant="raised" padding="lg" className="space-y-6">
              <div>
                <span className="text-xs font-heading font-extrabold text-brand-teal uppercase tracking-widest block">
                  Care Request Specification & Eligibility Audit
                </span>
                <div className="flex justify-between items-start mt-1">
                  <div>
                    <h2 className="text-xl font-heading font-extrabold text-text-primary">{selectedBooking.serviceName}</h2>
                    <p className="text-xs text-text-muted mt-0.5 font-sans">
                      Code: {selectedBooking.bookingCode || selectedBooking.id} • Patient:{' '}
                      {selectedBooking.patientProfile.firstName} {selectedBooking.patientProfile.lastName} (
                      {selectedBooking.patientProfile.relationship})
                    </p>
                  </div>
                  <BookingStatusBadge status={selectedBooking.status} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
                <div className="p-4 bg-surface-subtle rounded-xl border border-border-default space-y-2">
                  <span className="font-heading font-bold text-text-primary block text-xs border-b border-border-light pb-1">
                    Location & Scheduled Shift
                  </span>
                  <div className="flex items-center gap-2 text-text-secondary">
                    <MapPin className="w-4 h-4 text-brand-teal shrink-0" />
                    <span>
                      {selectedBooking.address.line1}, {selectedBooking.address.city} (Pincode:{' '}
                      {selectedBooking.address.pincode})
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-text-secondary">
                    <Calendar className="w-4 h-4 text-brand-teal shrink-0" />
                    <span>
                      {selectedBooking.scheduledDate} ({selectedBooking.scheduledTimeSlot})
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-surface-subtle rounded-xl border border-border-default space-y-2">
                  <span className="font-heading font-bold text-text-primary block text-xs border-b border-border-light pb-1">
                    Clinical Care Requirements & Constraints
                  </span>
                  <p className="text-text-secondary">
                    {selectedBooking.careTasks?.join(', ') || 'Post-op nursing, vitals monitoring, sterile dressing'}
                  </p>
                  <p className="text-text-muted italic text-[11px]">
                    Rest Window Threshold: Minimum {minimumRestHours} hours required between shifts.
                  </p>
                </div>
              </div>

              {/* In-House Staff Eligibility Matrix */}
              <div className="space-y-4 pt-2">
                <div>
                  <h3 className="text-sm font-heading font-extrabold text-text-primary">
                    In-House Care Team Eligibility & Conflict Checker
                  </h3>
                  <p className="text-xs text-text-muted font-sans">
                    Staff candidates are evaluated against active license, geographic radius, schedule availability, and mandatory {minimumRestHours}h rest windows.
                  </p>
                </div>

                <div className="space-y-3">
                  {activeStaff.map((staff: StaffProfile) => {
                    const isAlreadyAssigned = selectedBooking.assignedStaffId === staff.id;
                    const conflictCheck = checkStaffConflict(
                      staff as any,
                      selectedBooking.scheduledDate,
                      selectedBooking.scheduledTimeSlot,
                      bookings
                    );
                    const hasConflict = conflictCheck.hasConflict;
                    const isLicenseVerified = staff.verificationStatus === 'verified';

                    return (
                      <PulseSurface
                        key={staff.id}
                        variant={hasConflict ? 'flat' : isAlreadyAssigned ? 'highlight' : 'raised'}
                        padding="md"
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-xl bg-slate-900 text-white font-heading font-extrabold text-sm flex items-center justify-center shrink-0">
                            {staff.fullName.charAt(0)}
                          </div>
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-heading font-extrabold text-text-primary text-sm">{staff.fullName}</span>
                              <span className="font-mono text-[10px] text-brand-teal font-bold bg-teal-50 px-2 py-0.5 rounded border border-brand-teal/20">
                                {staff.employeeId}
                              </span>

                              {!hasConflict && isLicenseVerified && (
                                <PulseStatus status="success" label="ELIGIBLE" size="sm" pulse={false} />
                              )}

                              {hasConflict && (
                                <PulseStatus status="warning" label={`NOT ELIGIBLE — ${conflictCheck.reason}`} size="sm" pulse={false} />
                              )}
                            </div>

                            <p className="text-xs text-text-muted mt-0.5 font-sans">
                              {staff.roleCategory.replace('_', ' ').toUpperCase()} • {staff.totalExperienceYears} Yrs Exp • Rating: ★ {staff.averageRating.toFixed(1)}
                            </p>
                          </div>
                        </div>

                        <div className="self-start sm:self-auto">
                          {isAlreadyAssigned ? (
                            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1.5 rounded-full border border-emerald-300 flex items-center gap-1 shrink-0">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Currently Assigned
                            </span>
                          ) : hasConflict ? (
                            <Button
                              type="button"
                              onClick={() =>
                                setOverrideModal({
                                  isOpen: true,
                                  staff,
                                  conflictReason: conflictCheck.reason || 'Shift overlap / rest window conflict detected',
                                })
                              }
                              leftIcon={<ShieldAlert className="w-4 h-4 text-amber-100" />}
                              className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-3 py-2 rounded-full shrink-0 cursor-pointer shadow-2xs"
                            >
                              Super Admin Override
                            </Button>
                          ) : (
                            <Button
                              onClick={() => handleManualDispatch(staff.id)}
                              className="bg-brand-teal hover:bg-brand-teal-hover text-white font-bold text-xs px-4 py-2 rounded-full shrink-0 cursor-pointer"
                            >
                              Assign Staff Member
                            </Button>
                          )}
                        </div>
                      </PulseSurface>
                    );
                  })}
                </div>
              </div>
            </PulsePanel>
          ) : (
            <div className="p-12 text-center bg-white rounded-3xl border border-border-default text-text-muted text-xs">
              No care request selected.
            </div>
          )}
        </div>
      </div>

      {/* Super Admin Hard Conflict Override Modal */}
      <AdminOverrideModal
        isOpen={overrideModal.isOpen}
        onClose={() => setOverrideModal({ isOpen: false, staff: null, conflictReason: '' })}
        booking={selectedBooking}
        professional={overrideModal.staff as any}
        conflictReason={overrideModal.conflictReason}
        onConfirmOverride={(rationale) => {
          if (overrideModal.staff) {
            handleManualDispatch(overrideModal.staff.id, true, rationale);
          }
        }}
      />
    </div>
  );
};
