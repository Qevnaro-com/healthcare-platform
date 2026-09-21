import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useBookings } from '../../context/BookingContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { BookingStatusBadge } from '../../components/common/Badge';
import { BookingStatusTimeline } from '../../components/domain/BookingStatusTimeline';
import { HealthcareTexture } from '../../components/common/HealthcareTexture';
import {
  ArrowLeft,
  PhoneCall,
  MessageSquare,
  ShieldCheck,
  FileText,
  Calendar,
  MapPin,
  Clock,
  Moon,
  Download,
  Star,
  XCircle,
  UserCheck
} from 'lucide-react';

export const BookingDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { bookings, getProfessionalById, updateBookingStatus } = useBookings();

  const [callbackModalOpen, setCallbackModalOpen] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState('Schedule Conflict');
  const [callbackNotes, setCallbackNotes] = useState('');
  const [callbackRequested, setCallbackRequested] = useState(false);

  const booking = bookings.find((b) => b.id === id) || bookings[0];
  const assignedPro = booking.professionalId ? getProfessionalById(booking.professionalId) : null;

  const isNightShift = booking.shiftType?.toLowerCase().includes('night') || booking.scheduledTimeSlot?.includes('10:00 PM');

  const handleCancelBooking = () => {
    updateBookingStatus(booking.id, 'CANCELLED', `Cancelled by client: ${cancelReason}`);
    setCancelModalOpen(false);
  };

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCallbackRequested(true);
    setTimeout(() => {
      setCallbackModalOpen(false);
      setCallbackRequested(false);
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left relative bg-white">
      <HealthcareTexture type="care-pathway" opacity={0.03} />

      {/* Navigation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border-default pb-4 gap-4">
        <div className="flex items-center gap-3">
          <Link to="/client/bookings">
            <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Back
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-text-primary">{booking.serviceName}</h1>
              <BookingStatusBadge status={booking.status} />
            </div>
            <p className="text-xs text-text-muted mt-0.5 font-mono">
              Booking Code: {booking.bookingCode || 'BKG-2026-9042'} • Created: {new Date(booking.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCallbackModalOpen(true)}
            leftIcon={<PhoneCall className="w-4 h-4 text-brand-teal" />}
            className="font-bold cursor-pointer"
          >
            Request Ops Callback
          </Button>

          {booking.status !== 'CANCELLED' && booking.status !== 'COMPLETED' && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setCancelModalOpen(true)}
              className="font-bold text-rose-700 hover:bg-rose-50 border-rose-200 cursor-pointer"
            >
              Cancel Request
            </Button>
          )}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 7 Columns: Care Visit Status & Clinical Context */}
        <div className="lg:col-span-7 space-y-6">
          {/* Status Timeline */}
          <Card className="p-6 border-border-default shadow-subtle bg-white space-y-6">
            <div className="flex items-center justify-between border-b border-border-light pb-4">
              <h3 className="text-base font-extrabold text-text-primary flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-brand-teal" /> Care Dispatch & Shift Lifecycle
              </h3>
              <span className="text-xs font-bold text-brand-teal bg-canvas-teal px-3 py-1 rounded-full border border-teal-200 uppercase">
                Care Concierge
              </span>
            </div>

            <BookingStatusTimeline currentStatus={booking.status} history={booking.statusHistory} />
          </Card>

          {/* Patient Profile & Clinical Context */}
          <Card className="p-6 space-y-4 border-border-default shadow-subtle bg-white">
            <h4 className="text-sm font-extrabold text-text-primary flex items-center gap-2 border-b border-border-light pb-2">
              <FileText className="w-4 h-4 text-brand-teal" /> Patient Profile & Care Requirements
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 bg-canvas-secondary rounded-xl border border-border-default space-y-1">
                <span className="text-[10px] font-bold text-text-muted uppercase">Patient Name</span>
                <p className="font-extrabold text-text-primary">
                  {booking.patientProfile.firstName} {booking.patientProfile.lastName} ({booking.patientProfile.relationship})
                </p>
                <p className="text-text-muted">
                  DOB: {booking.patientProfile.dateOfBirth} • Gender: {booking.patientProfile.gender}
                </p>
              </div>

              <div className="p-3.5 bg-canvas-secondary rounded-xl border border-border-default space-y-1">
                <span className="text-[10px] font-bold text-text-muted uppercase">Mobility & Allergies</span>
                <p className="font-bold text-text-primary capitalize">
                  Mobility: {booking.patientProfile.mobilityStatus || 'Assisted'}
                </p>
                <p className="text-rose-700 font-semibold">
                  Allergies: {booking.patientProfile.allergies?.join(', ') || 'None recorded'}
                </p>
              </div>
            </div>

            {booking.specialInstructions && (
              <div className="p-3.5 bg-canvas-teal rounded-xl border border-teal-200 text-xs text-teal-900 space-y-1">
                <span className="font-extrabold text-brand-teal block uppercase text-[10px]">
                  Clinical Handling Notes for Nurse:
                </span>
                <p className="font-medium italic">{booking.specialInstructions}</p>
              </div>
            )}
          </Card>
        </div>

        {/* Right 5 Columns: Staff Reveal, Schedule & Invoice Ledger */}
        <div className="lg:col-span-5 space-y-6">
          {/* Assigned Staff Reveal Card */}
          {assignedPro ? (
            <Card className="p-5 space-y-4 border-brand-teal bg-canvas-teal/10 shadow-subtle relative">
              <div className="flex items-start justify-between">
                <span className="text-xs font-extrabold text-brand-teal uppercase tracking-wider flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-brand-teal" /> Assigned Internal Staff
                </span>
                <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                  COUNCIL VERIFIED
                </span>
              </div>

              <div className="flex items-center gap-4">
                <img
                  src={assignedPro.profilePhoto}
                  alt={assignedPro.displayName}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-brand-teal shadow-xs shrink-0"
                />
                <div className="space-y-1 text-xs">
                  <h4 className="font-extrabold text-text-primary text-base flex items-center gap-1.5">
                    {assignedPro.displayName} <ShieldCheck className="w-4 h-4 text-brand-teal" />
                  </h4>
                  <p className="text-text-muted font-medium">{assignedPro.qualification}</p>
                  <p className="text-[11px] font-mono text-brand-teal font-bold">
                    Reg #: {assignedPro.registrationNumber} • Staff ID: {assignedPro.employeeId || 'EMP-1042'}
                  </p>
                  <div className="flex items-center gap-1 text-amber-600 font-extrabold pt-0.5">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{assignedPro.rating} ({assignedPro.reviewCount} Care Reviews)</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-border-default flex items-center gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full bg-brand-teal hover:bg-brand-teal-hover text-white font-bold cursor-pointer text-xs"
                  leftIcon={<PhoneCall className="w-3.5 h-3.5" />}
                >
                  Call Staff Member
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full font-bold text-xs cursor-pointer"
                  leftIcon={<MessageSquare className="w-3.5 h-3.5 text-brand-teal" />}
                >
                  Message Staff
                </Button>
              </div>
            </Card>
          ) : (
            <Card className="p-5 space-y-3 border-amber-200 bg-amber-50/70 text-xs text-amber-900">
              <span className="font-extrabold text-amber-950 flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-amber-600 animate-spin" /> Selecting Internal Staff...
              </span>
              <p>
                Pulse n Care Operations Desk is selecting a qualified, background-checked nurse/caregiver active in your Delhi NCR locality.
              </p>
            </Card>
          )}

          {/* Schedule & Location Card */}
          <Card className="p-5 space-y-3 text-xs border-border-default shadow-subtle bg-white">
            <h4 className="font-extrabold text-text-primary border-b border-border-light pb-2 text-sm">
              Schedule & Location Details
            </h4>

            <div className="space-y-2 text-text-secondary">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-brand-teal shrink-0" />
                <span className="font-bold text-text-primary">
                  {booking.scheduledDate} ({booking.scheduledTimeSlot})
                </span>
              </div>

              {isNightShift && (
                <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 flex items-center gap-2 font-medium">
                  <Moon className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Overnight shift active (10 PM to 8 AM)</span>
                </div>
              )}

              <div className="flex items-start gap-2 pt-1">
                <MapPin className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-text-primary block">
                    {booking.address.line1}
                  </span>
                  <span className="text-text-muted">
                    {booking.address.city}, {booking.address.state} - {booking.address.pincode}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* Payment Receipt Card */}
          <Card className="p-5 space-y-3 text-xs border-border-default shadow-subtle bg-white">
            <div className="flex items-center justify-between border-b border-border-light pb-2">
              <h4 className="font-extrabold text-text-primary text-sm">Payment Receipt & Invoice</h4>
              <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 uppercase">
                {booking.paymentStatus || 'PAID'}
              </span>
            </div>

            <div className="space-y-2 text-text-secondary">
              <div className="flex justify-between">
                <span>Base Service Rate</span>
                <span>₹{booking.priceBreakdown.serviceBasePrice}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (18% Statutory)</span>
                <span>₹{booking.priceBreakdown.taxesAndFees}</span>
              </div>
              <div className="pt-2 border-t border-border-light flex justify-between text-sm font-extrabold text-text-primary">
                <span>Total Amount</span>
                <span className="text-brand-teal text-base">₹{booking.priceBreakdown.totalPrice}</span>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              leftIcon={<Download className="w-4 h-4 text-brand-teal" />}
              onClick={() => window.print()}
              className="w-full font-bold cursor-pointer text-xs"
            >
              Print / Download Tax Invoice & Receipt
            </Button>
          </Card>
        </div>
      </div>

      {/* Ops Callback Modal */}
      <Modal
        isOpen={callbackModalOpen}
        onClose={() => setCallbackModalOpen(false)}
        title="Request Operations Desk Callback"
        maxWidth="md"
      >
        <div className="space-y-4 text-left">
          <p className="text-xs text-text-secondary">
            Need to change visit timings, update clinical handling instructions, or add specific medical equipment? Our Delhi NCR Operations Desk will call you within 15 minutes.
          </p>

          {!callbackRequested ? (
            <form onSubmit={handleCallbackSubmit} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-text-secondary">Callback Reason / Notes</label>
                <textarea
                  rows={3}
                  value={callbackNotes}
                  onChange={(e) => setCallbackNotes(e.target.value)}
                  placeholder="e.g. Need to adjust shift start time to 11 PM..."
                  required
                  className="w-full p-3 text-sm bg-white border border-border-default rounded-xl focus:border-brand-teal focus:outline-none"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                leftIcon={<PhoneCall className="w-4 h-4" />}
                className="w-full bg-brand-teal text-white font-bold h-11 rounded-xl cursor-pointer"
              >
                Submit Callback Request
              </Button>
            </form>
          ) : (
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs font-bold text-emerald-900 text-center">
              ✓ Operations callback scheduled. Our Ops Lead will reach out to your registered phone number.
            </div>
          )}
        </div>
      </Modal>

      {/* Cancellation Modal */}
      <Modal
        isOpen={cancelModalOpen}
        onClose={() => setCancelModalOpen(false)}
        title="Confirm Booking Cancellation"
        maxWidth="md"
      >
        <div className="space-y-4 text-left">
          <p className="text-xs text-text-secondary">
            Are you sure you want to cancel booking <strong>{booking.bookingCode || booking.id}</strong>? Cancellation before staff travel is free of charge.
          </p>

          <div className="space-y-1">
            <label className="text-xs font-bold text-text-secondary">Reason for Cancellation</label>
            <select
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              className="w-full h-11 px-3 text-sm bg-white border border-border-default rounded-xl focus:border-brand-teal focus:outline-none"
            >
              <option value="Schedule Conflict">Schedule Conflict / Plans Changed</option>
              <option value="Patient Hospitalized">Patient Readmitted to Hospital</option>
              <option value="Found Alternate Care">Found Alternate Caregiver</option>
              <option value="Other">Other Reason</option>
            </select>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <Button
              variant="ghost"
              onClick={() => setCancelModalOpen(false)}
              className="w-full cursor-pointer"
            >
              Keep Booking
            </Button>
            <Button
              variant="danger"
              onClick={handleCancelBooking}
              leftIcon={<XCircle className="w-4 h-4" />}
              className="w-full bg-rose-600 text-white font-bold h-11 rounded-xl cursor-pointer"
            >
              Confirm Cancellation
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
