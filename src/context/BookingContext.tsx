/**
 * Healthcare Staffing & Home Care Platform
 * Central Booking & Operational Workflow State Machine
 * V2.1 Business Workflow Architecture: Care Request -> Assignment -> Duty -> Timesheet -> Invoice -> Payment
 */

import React, { createContext, useContext, useState } from 'react';
import type {
  Booking,
  BookingStatus,
  Service,
  ProfessionalProfile,
  ServiceCategory,
  KYCStatus,
  PatientProfile,
  Address,
  PriceBreakdown,
  UserRole,
  BookingStatusHistory,
  CareRequest,
  RequestStatus,
  CareAssignment,
  CareDuty,
  DutyStatus,
  CareTimesheet,
  PriceSnapshot,
  CareInvoice,
  PaymentRecord
} from '../types';
import {
  MOCK_BOOKINGS,
  MOCK_SERVICES,
  MOCK_PROFESSIONALS,
  MOCK_CLIENTS
} from '../data/mockData';

export interface BookingWizardDraft {
  service?: Service;
  patient?: PatientProfile;
  address?: Address;
  scheduledDate?: string;
  scheduledTimeSlot?: string;
  durationHours?: number;
  durationDays?: number;
  selectedProfessional?: ProfessionalProfile;
  specialInstructions?: string;
  patientCareContext?: string;
  careTasks?: string[];
  shiftType?: string;
  dateRange?: {
    startDate: string;
    endDate: string;
    isRecurring?: boolean;
    recurringDays?: string[];
  };
  staffPreferences?: {
    role?: string;
    gender?: 'no_preference' | 'female' | 'male';
    minExperienceYears?: number;
    languages?: string[];
  };
}

interface BookingContextType {
  // Legacy / Master collections
  bookings: Booking[];
  services: Service[];
  professionals: ProfessionalProfile[];
  wizardDraft: BookingWizardDraft;

  // V2.1 Operational Collections
  careRequests: CareRequest[];
  careAssignments: CareAssignment[];
  careDuties: CareDuty[];
  careTimesheets: CareTimesheet[];
  careInvoices: CareInvoice[];
  paymentRecords: PaymentRecord[];

  // Wizard state management
  updateWizardDraft: (data: Partial<BookingWizardDraft>) => void;
  resetWizardDraft: () => void;

  // Commercial Pricing Engine
  calculatePriceSnapshot: (service: Service, durationDays?: number, shiftType?: string) => PriceSnapshot;
  calculatePrice: (service: Service, duration?: number) => PriceBreakdown;

  // V2.1 Workflow Operations
  createCareRequest: (draft: BookingWizardDraft) => CareRequest;
  assignStaffToRequest: (requestId: string, staffId: string, notes?: string) => CareAssignment | undefined;
  updateDutyStatus: (dutyId: string, newStatus: DutyStatus, note?: string) => void;
  completeDuty: (
    dutyId: string,
    completionNotes: string,
    vitals?: CareDuty['vitalsObserved']
  ) => void;
  recordPayment: (
    invoiceId: string,
    amount: number,
    paymentMethod: PaymentRecord['paymentMethod'],
    paymentReference?: string
  ) => PaymentRecord;

  // Legacy state machine actions (synced with V2.1)
  createBooking: (draft: BookingWizardDraft) => Booking;
  updateBookingStatus: (bookingId: string, newStatus: BookingStatus, note?: string) => void;
  assignProfessional: (bookingId: string, professionalId: string) => void;
  cancelBooking: (bookingId: string, reason: string) => void;

  // KYC & Staff Management
  updateKYCStatus: (professionalId: string, newStatus: KYCStatus, rejectionReason?: string) => void;
  addProfessional: (newPro: ProfessionalProfile) => void;

  // Admin Service & Question Registry Control
  updateServiceConfig: (serviceId: string, updates: Partial<Service>) => void;
  toggleServiceActive: (serviceId: string) => void;
  updateServiceQuestions: (serviceId: string, questions: Service['serviceQuestions']) => void;
  updateDutyChecklist: (serviceId: string, checklist: string[]) => void;

  // Lookups & Filters
  getBookingById: (bookingId: string) => Booking | undefined;
  getCareRequestById: (requestId: string) => CareRequest | undefined;
  getServiceById: (serviceId: string) => Service | undefined;
  getProfessionalById: (proId: string) => ProfessionalProfile | undefined;
  filterServicesByCategory: (category?: ServiceCategory) => Service[];
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

// Initial Mock Seed Data Transformation
const INITIAL_CARE_REQUESTS: CareRequest[] = MOCK_BOOKINGS.map((b) => {
  const duration = b.durationHours || 12;
  const days = Math.max(1, Math.round(duration / 12));
  const basePrice = b.priceBreakdown.serviceBasePrice || 1200;
  const subtotal = basePrice * days;
  const tax = Math.round(subtotal * 0.18);

  const snapshot: PriceSnapshot = {
    snapshotId: `snp-${b.id}`,
    serviceId: b.serviceId,
    basePrice,
    priceUnit: 'per_day',
    durationUnits: days,
    shiftMultiplier: 1.0,
    subtotal,
    taxRate: 0.18,
    taxAmount: tax,
    totalAmount: subtotal + tax,
    snapshotTimestamp: b.createdAt
  };

  return {
    id: b.id,
    requestRef: b.bookingCode.replace('BKG', 'PNC-REQ'),
    clientId: b.clientId,
    clientName: b.clientName,
    clientPhone: b.clientPhone,
    patientId: b.patientProfile.id,
    patientName: `${b.patientProfile.firstName} ${b.patientProfile.lastName}`,
    patientAge: 64,
    relationship: b.patientProfile.relationship,
    patientProfile: b.patientProfile,
    serviceId: b.serviceId,
    serviceName: b.serviceName,
    serviceCategory: b.serviceCategory,
    address: b.address,
    startDate: b.scheduledDate,
    endDate: b.dateRange?.endDate || b.scheduledDate,
    shiftType: b.shiftType || '12hr_day',
    frequency: b.dateRange?.isRecurring ? 'recurring' : 'single',
    careTasks: b.careTasks || [],
    patientCareContext: b.specialInstructions,
    staffPreferences: b.staffPreferences,
    status: (b.status === 'MATCHING' ? 'UNDER_REVIEW' : b.status) as RequestStatus,
    statusHistory: b.statusHistory,
    priceSnapshot: snapshot,
    assignedStaffId: b.professionalId || b.assignedStaffId,
    assignedStaffName: b.professionalName || b.assignedStaffName,
    specialInstructions: b.specialInstructions,
    createdAt: b.createdAt,
    updatedAt: b.updatedAt
  };
});

const INITIAL_DUTIES: CareDuty[] = [
  {
    dutyId: 'duty-2026-001',
    careRequestId: 'bkg-001',
    assignmentId: 'asg-001',
    staffId: 'pro-001',
    staffName: 'Dr. Anjali Sharma, BPT',
    patientName: 'Savitri Devi',
    locationAddress: MOCK_CLIENTS[0].addresses[0],
    scheduledStart: '2026-03-20T08:00:00Z',
    scheduledEnd: '2026-03-20T12:00:00Z',
    shiftType: '12hr_day',
    status: 'IN_CARE',
    dutyEvents: [
      { eventId: 'evt-1', eventType: 'ASSIGNED', timestamp: '2026-03-19T10:00:00Z', actorId: 'admin-1' },
      { eventId: 'evt-2', eventType: 'ACKNOWLEDGED', timestamp: '2026-03-19T10:15:00Z', actorId: 'pro-001' },
      { eventId: 'evt-3', eventType: 'EN_ROUTE', timestamp: '2026-03-20T07:30:00Z', actorId: 'pro-001' },
      { eventId: 'evt-4', eventType: 'ARRIVED', timestamp: '2026-03-20T07:55:00Z', actorId: 'pro-001' },
      { eventId: 'evt-5', eventType: 'IN_CARE', timestamp: '2026-03-20T08:00:00Z', actorId: 'pro-001' }
    ]
  },
  {
    dutyId: 'duty-2026-002',
    careRequestId: 'bkg-002',
    assignmentId: 'asg-002',
    staffId: 'pro-002',
    staffName: 'Karthik Rao, RN',
    patientName: 'Ramesh Mehta',
    locationAddress: MOCK_CLIENTS[0].addresses[0],
    scheduledStart: '2026-03-21T08:00:00Z',
    scheduledEnd: '2026-03-21T20:00:00Z',
    shiftType: '12hr_day',
    status: 'ASSIGNED',
    dutyEvents: [
      { eventId: 'evt-6', eventType: 'ASSIGNED', timestamp: '2026-03-19T14:00:00Z', actorId: 'admin-1' }
    ]
  }
];

const INITIAL_INVOICES: CareInvoice[] = INITIAL_CARE_REQUESTS.map((req, index) => ({
  id: `inv-${req.id}`,
  invoiceNumber: `PNC-INV-2026-${1001 + index}`,
  careRequestId: req.id,
  clientId: req.clientId,
  clientName: req.clientName,
  patientName: req.patientName,
  billingAddress: req.address,
  issueDate: req.createdAt.split('T')[0],
  dueDate: req.startDate,
  lineItems: [
    {
      description: `${req.serviceName} (${req.shiftType})`,
      quantity: req.priceSnapshot.durationUnits,
      unitPrice: req.priceSnapshot.basePrice,
      amount: req.priceSnapshot.subtotal
    }
  ],
  subtotal: req.priceSnapshot.subtotal,
  taxAmount: req.priceSnapshot.taxAmount,
  totalAmount: req.priceSnapshot.totalAmount,
  status: 'ISSUED',
  createdAt: req.createdAt
}));

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>(MOCK_BOOKINGS);
  const [careRequests, setCareRequests] = useState<CareRequest[]>(INITIAL_CARE_REQUESTS);
  const [careAssignments, setCareAssignments] = useState<CareAssignment[]>([]);
  const [careDuties, setCareDuties] = useState<CareDuty[]>(INITIAL_DUTIES);
  const [careTimesheets, setCareTimesheets] = useState<CareTimesheet[]>([]);
  const [careInvoices, setCareInvoices] = useState<CareInvoice[]>(INITIAL_INVOICES);
  const [paymentRecords, setPaymentRecords] = useState<PaymentRecord[]>([]);

  const [services, setServices] = useState<Service[]>(MOCK_SERVICES);
  const [professionals, setProfessionals] = useState<ProfessionalProfile[]>(MOCK_PROFESSIONALS);
  const [wizardDraft, setWizardDraft] = useState<BookingWizardDraft>({});

  const updateServiceConfig = (serviceId: string, updates: Partial<Service>) => {
    setServices((prev) =>
      prev.map((s) => (s.id === serviceId ? { ...s, ...updates } : s))
    );
  };

  const toggleServiceActive = (serviceId: string) => {
    setServices((prev) =>
      prev.map((s) => {
        if (s.id === serviceId) {
          const newActive = s.active === false ? true : false;
          return { ...s, isActive: newActive, active: newActive };
        }
        return s;
      })
    );
  };

  const updateServiceQuestions = (serviceId: string, questions: Service['serviceQuestions']) => {
    setServices((prev) =>
      prev.map((s) => (s.id === serviceId ? { ...s, serviceQuestions: questions } : s))
    );
  };

  const updateDutyChecklist = (serviceId: string, checklist: string[]) => {
    setServices((prev) =>
      prev.map((s) => (s.id === serviceId ? { ...s, dutyChecklist: checklist } : s))
    );
  };

  const updateWizardDraft = (data: Partial<BookingWizardDraft>) => {
    setWizardDraft((prev) => ({ ...prev, ...data }));
  };

  const resetWizardDraft = () => {
    setWizardDraft({});
  };

  const calculatePriceSnapshot = (
    service: Service,
    durationDays: number = 1,
    shiftType: string = '12hr_day'
  ): PriceSnapshot => {
    const base = service.pricing.basePrice;
    let shiftMultiplier = 1.0;
    if (shiftType.includes('24') || shiftType.includes('live')) {
      shiftMultiplier = 1.8;
    } else if (shiftType.includes('night')) {
      shiftMultiplier = 1.2;
    }

    const subtotal = Math.round(base * durationDays * shiftMultiplier);
    const taxAmount = Math.round(subtotal * 0.18);
    const totalAmount = subtotal + taxAmount;

    return {
      snapshotId: `snp-${Date.now()}`,
      serviceId: service.id,
      basePrice: base,
      priceUnit: service.pricing.priceUnit,
      durationUnits: durationDays,
      shiftMultiplier,
      subtotal,
      taxRate: 0.18,
      taxAmount,
      totalAmount,
      snapshotTimestamp: new Date().toISOString()
    };
  };

  const calculatePrice = (service: Service, duration: number = 1): PriceBreakdown => {
    const base = service.pricing.basePrice;
    const subtotal = base * duration;
    const gst = Math.round(subtotal * 0.18);
    const total = subtotal + gst;
    const commissionPercent = service.pricing.platformCommissionPercent || 15;
    const commission = Math.round((subtotal * commissionPercent) / 100);
    const proEarning = subtotal - commission;

    return {
      serviceBasePrice: base,
      durationUnits: duration,
      subtotal,
      taxesAndFees: gst,
      discount: 0,
      totalPrice: total,
      professionalEarning: proEarning,
      platformCommission: commission
    };
  };

  const createCareRequest = (draft: BookingWizardDraft): CareRequest => {
    const service = draft.service || services[0];
    const durationDays = draft.durationDays || (draft.dateRange ? 3 : 1);
    const shiftType = draft.shiftType || '12hr_day';
    const snapshot = calculatePriceSnapshot(service, durationDays, shiftType);
    const defaultPatient = MOCK_CLIENTS[0].patients[0];
    const defaultAddress = MOCK_CLIENTS[0].addresses[0];

    const reqId = `req-${Date.now()}`;
    const newRequest: CareRequest = {
      id: reqId,
      requestRef: `PNC-REQ-${Math.floor(1000 + Math.random() * 9000)}`,
      clientId: 'clt-001',
      clientName: 'Rahul Mehta',
      clientPhone: '+91-98450-99881',
      patientId: draft.patient?.id || defaultPatient.id,
      patientName: draft.patient ? `${draft.patient.firstName} ${draft.patient.lastName}` : 'Savitri Devi',
      patientAge: 64,
      relationship: draft.patient?.relationship || 'parent',
      patientProfile: draft.patient || defaultPatient,
      serviceId: service.id,
      serviceName: service.name,
      serviceCategory: service.category,
      address: draft.address || defaultAddress,
      startDate: draft.scheduledDate || draft.dateRange?.startDate || '2026-03-25',
      endDate: draft.dateRange?.endDate || draft.scheduledDate || '2026-03-25',
      shiftType,
      frequency: draft.dateRange ? 'date_range' : 'single',
      careTasks: draft.careTasks || ['Vital signs charting', 'Medication support', 'Hygiene care'],
      patientCareContext: draft.patientCareContext || draft.specialInstructions,
      staffPreferences: draft.staffPreferences,
      status: 'SUBMITTED',
      statusHistory: [
        { status: 'DRAFT', timestamp: new Date().toISOString(), actorId: 'clt-001', actorRole: 'client' },
        { status: 'SUBMITTED', timestamp: new Date().toISOString(), actorId: 'clt-001', actorRole: 'client', note: 'Care request submitted for operations review.' }
      ],
      priceSnapshot: snapshot,
      specialInstructions: draft.specialInstructions,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setCareRequests((prev) => [newRequest, ...prev]);

    // Also sync into legacy Booking collection for legacy UI components
    const legacyBooking: Booking = {
      id: newRequest.id,
      bookingCode: newRequest.requestRef,
      clientId: newRequest.clientId,
      clientName: newRequest.clientName,
      clientPhone: newRequest.clientPhone,
      patientProfile: newRequest.patientProfile || defaultPatient,
      serviceId: newRequest.serviceId,
      serviceName: newRequest.serviceName,
      serviceCategory: newRequest.serviceCategory,
      address: newRequest.address,
      scheduledDate: newRequest.startDate,
      scheduledTimeSlot: newRequest.shiftType,
      durationHours: durationDays * 12,
      careTasks: newRequest.careTasks,
      shiftType: newRequest.shiftType,
      status: 'REQUESTED',
      statusHistory: newRequest.statusHistory,
      priceBreakdown: calculatePrice(service, durationDays),
      paymentStatus: 'PENDING',
      specialInstructions: newRequest.specialInstructions,
      createdAt: newRequest.createdAt,
      updatedAt: newRequest.updatedAt
    };
    setBookings((prev) => [legacyBooking, ...prev]);

    // Generate Invoice from frozen snapshot
    const newInvoice: CareInvoice = {
      id: `inv-${reqId}`,
      invoiceNumber: `PNC-INV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      careRequestId: reqId,
      clientId: newRequest.clientId,
      clientName: newRequest.clientName,
      patientName: newRequest.patientName,
      billingAddress: newRequest.address,
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: newRequest.startDate,
      lineItems: [
        {
          description: `${service.name} (${shiftType})`,
          quantity: snapshot.durationUnits,
          unitPrice: snapshot.basePrice,
          amount: snapshot.subtotal
        }
      ],
      subtotal: snapshot.subtotal,
      taxAmount: snapshot.taxAmount,
      totalAmount: snapshot.totalAmount,
      status: 'ISSUED',
      createdAt: new Date().toISOString()
    };
    setCareInvoices((prev) => [newInvoice, ...prev]);

    resetWizardDraft();
    return newRequest;
  };

  const createBooking = (draft: BookingWizardDraft): Booking => {
    const req = createCareRequest(draft);
    return getBookingById(req.id) || bookings[0];
  };

  const assignStaffToRequest = (
    requestId: string,
    staffId: string,
    notes?: string
  ): CareAssignment | undefined => {
    const pro = getProfessionalById(staffId);
    const req = careRequests.find((r) => r.id === requestId);
    if (!pro || !req) return undefined;

    const assignmentId = `asg-${Date.now()}`;
    const newAssignment: CareAssignment = {
      assignmentId,
      careRequestId: requestId,
      staffId: pro.id,
      staffName: pro.displayName,
      staffRole: pro.qualification,
      staffPhone: '+91-98765-43210',
      assignedBy: 'admin-001',
      assignedAt: new Date().toISOString(),
      status: 'active',
      notes
    };

    setCareAssignments((prev) => [newAssignment, ...prev]);

    // Update CareRequest status
    setCareRequests((prev) =>
      prev.map((r) => {
        if (r.id === requestId) {
          const updatedHistory = [
            ...r.statusHistory,
            {
              status: 'CONFIRMED' as BookingStatus,
              timestamp: new Date().toISOString(),
              actorId: 'admin-001',
              actorRole: 'admin' as UserRole,
              note: `Assigned internal staff ${pro.displayName}.`
            }
          ];
          return {
            ...r,
            status: 'CONFIRMED',
            assignedStaffId: pro.id,
            assignedStaffName: pro.displayName,
            statusHistory: updatedHistory,
            updatedAt: new Date().toISOString()
          };
        }
        return r;
      })
    );

    // Sync legacy bookings state
    assignProfessional(requestId, staffId);

    // Generate Duty records
    const durationDays = req.priceSnapshot?.durationUnits || 1;
    const newDuties: CareDuty[] = [];

    for (let i = 0; i < durationDays; i++) {
      const dutyDate = new Date(req.startDate);
      dutyDate.setDate(dutyDate.getDate() + i);
      const startIso = dutyDate.toISOString();

      newDuties.push({
        dutyId: `duty-${requestId}-${i + 1}`,
        careRequestId: requestId,
        assignmentId,
        staffId: pro.id,
        staffName: pro.displayName,
        patientName: req.patientName,
        locationAddress: req.address,
        scheduledStart: startIso,
        scheduledEnd: new Date(dutyDate.getTime() + 12 * 3600 * 1000).toISOString(),
        shiftType: req.shiftType,
        status: 'ASSIGNED',
        dutyEvents: [
          { eventId: `evt-${Date.now()}-${i}`, eventType: 'ASSIGNED', timestamp: new Date().toISOString(), actorId: 'admin-001' }
        ]
      });
    }

    setCareDuties((prev) => [...newDuties, ...prev]);
    return newAssignment;
  };

  const updateDutyStatus = (dutyId: string, newStatus: DutyStatus, note?: string) => {
    setCareDuties((prev) =>
      prev.map((d) => {
        if (d.dutyId === dutyId) {
          const events = d.dutyEvents || [];
          return {
            ...d,
            status: newStatus,
            dutyEvents: [
              ...events,
              {
                eventId: `evt-${Date.now()}`,
                eventType: newStatus,
                timestamp: new Date().toISOString(),
                actorId: d.staffId,
                note
              }
            ]
          };
        }
        return d;
      })
    );
  };

  const completeDuty = (
    dutyId: string,
    completionNotes: string,
    vitals?: CareDuty['vitalsObserved']
  ) => {
    const duty = careDuties.find((d) => d.dutyId === dutyId);
    if (!duty) return;

    // 1. Update Duty Status & save vitals
    setCareDuties((prev) =>
      prev.map((d) => {
        if (d.dutyId === dutyId) {
          const events = d.dutyEvents || [];
          return {
            ...d,
            status: 'COMPLETED' as DutyStatus,
            completionNotes,
            vitalsObserved: vitals,
            dutyEvents: [
              ...events,
              {
                eventId: `evt-${Date.now()}`,
                eventType: 'COMPLETED',
                timestamp: new Date().toISOString(),
                actorId: d.staffId,
                note: completionNotes
              }
            ]
          };
        }
        return d;
      })
    );

    // 2. Create Timesheet
    const timesheet: CareTimesheet = {
      timesheetId: `ts-${Date.now()}`,
      dutyId,
      careRequestId: duty.careRequestId,
      staffId: duty.staffId,
      scheduledHours: 12,
      actualStart: duty.scheduledStart,
      actualEnd: new Date().toISOString(),
      actualHoursWorked: 12,
      overtimeHours: 0,
      status: 'approved',
      approvedBy: 'admin-001',
      approvedAt: new Date().toISOString()
    };
    setCareTimesheets((prev) => [timesheet, ...prev]);

    // 3. Update parent request status if all duties complete
    setCareRequests((prev) =>
      prev.map((r) => {
        if (r.id === duty.careRequestId) {
          return {
            ...r,
            status: 'IN_PROGRESS',
            updatedAt: new Date().toISOString()
          };
        }
        return r;
      })
    );
  };

  const recordPayment = (
    invoiceId: string,
    amount: number,
    paymentMethod: PaymentRecord['paymentMethod'],
    paymentReference?: string
  ): PaymentRecord => {
    const record: PaymentRecord = {
      id: `pmt-${Date.now()}`,
      invoiceId,
      careRequestId: careInvoices.find((i) => i.id === invoiceId)?.careRequestId || '',
      clientId: 'clt-001',
      amount,
      paymentMethod,
      status: 'PAID',
      paymentReference,
      paidAt: new Date().toISOString(),
      recordedBy: 'admin-001',
      createdAt: new Date().toISOString()
    };

    setPaymentRecords((prev) => [record, ...prev]);

    // Update CareInvoice Payment Status
    setCareInvoices((prev) =>
      prev.map((inv) => (inv.id === invoiceId ? { ...inv, status: 'ISSUED' } : inv))
    );

    return record;
  };

  const updateBookingStatus = (bookingId: string, newStatus: BookingStatus, note?: string) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === bookingId) {
          const newEntry: BookingStatusHistory = {
            status: newStatus,
            timestamp: new Date().toISOString(),
            actorId: 'user',
            actorRole: 'admin' as UserRole,
            note
          };
          return {
            ...b,
            status: newStatus,
            statusHistory: [...b.statusHistory, newEntry],
            updatedAt: new Date().toISOString()
          };
        }
        return b;
      })
    );

    setCareRequests((prev) =>
      prev.map((r) => (r.id === bookingId ? { ...r, status: newStatus as RequestStatus } : r))
    );
  };

  const assignProfessional = (bookingId: string, professionalId: string) => {
    const pro = getProfessionalById(professionalId);
    if (!pro) return;

    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === bookingId) {
          return {
            ...b,
            professionalId: pro.id,
            professionalName: pro.displayName,
            professionalPhoto: pro.profilePhoto,
            status: 'ASSIGNED',
            updatedAt: new Date().toISOString()
          };
        }
        return b;
      })
    );
  };

  const cancelBooking = (bookingId: string, reason: string) => {
    updateBookingStatus(bookingId, 'CANCELLED', reason);
  };

  const updateKYCStatus = (professionalId: string, newStatus: KYCStatus, rejectionReason?: string) => {
    setProfessionals((prev) =>
      prev.map((p) => {
        if (p.id === professionalId) {
          return {
            ...p,
            kycStatus: newStatus,
            isVerified: newStatus === 'approved',
            availabilityStatus: newStatus === 'approved' ? 'active' : 'pending_verification',
            kycRejectionReason: rejectionReason,
            updatedAt: new Date().toISOString()
          };
        }
        return p;
      })
    );
  };

  const addProfessional = (newPro: ProfessionalProfile) => {
    setProfessionals((prev) => [newPro, ...prev]);
  };

  const getBookingById = (id: string) => bookings.find((b) => b.id === id);
  const getCareRequestById = (id: string) => careRequests.find((r) => r.id === id);
  const getServiceById = (id: string) => services.find((s) => s.id === id);
  const getProfessionalById = (id: string) => professionals.find((p) => p.id === id);

  const filterServicesByCategory = (category?: ServiceCategory) => {
    if (!category) return services;
    return services.filter((s) => s.category === category);
  };

  return (
    <BookingContext.Provider
      value={{
        bookings,
        services,
        professionals,
        wizardDraft,
        careRequests,
        careAssignments,
        careDuties,
        careTimesheets,
        careInvoices,
        paymentRecords,
        updateWizardDraft,
        resetWizardDraft,
        calculatePriceSnapshot,
        calculatePrice,
        createCareRequest,
        assignStaffToRequest,
        updateDutyStatus,
        completeDuty,
        recordPayment,
        createBooking,
        updateBookingStatus,
        assignProfessional,
        cancelBooking,
        updateKYCStatus,
        addProfessional,
        updateServiceConfig,
        toggleServiceActive,
        updateServiceQuestions,
        updateDutyChecklist,
        getBookingById,
        getCareRequestById,
        getServiceById,
        getProfessionalById,
        filterServicesByCategory
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBookings = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBookings must be used within a BookingProvider');
  }
  return context;
};
