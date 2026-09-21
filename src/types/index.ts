/**
 * Healthcare Staffing & Home Care Platform
 * Master Data Model & TypeScript Interfaces
 * Source of Truth: docs/10-Data-Model.md
 */

// ==========================================
// 1. ROLE & USER ENUMS AND INTERFACES
// ==========================================

export type UserRole = 'client' | 'professional' | 'admin' | 'organization' | 'super_admin' | 'staff';

export interface User {
  id: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
  isActive: boolean;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  createdAt: string; // ISO 8601
  updatedAt: string;
  lastLoginAt?: string;
}

// ==========================================
// 2. CLIENT & PATIENT PROFILES
// ==========================================

export interface Address {
  id: string;
  label: string; // e.g. "Home", "Parents' Place", "Hospital Room"
  line1: string;
  line2?: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  latitude: number;
  longitude: number;
  isDefault?: boolean;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

export interface PatientProfile {
  id: string;
  clientId: string;
  firstName: string;
  lastName: string;
  relationship: 'self' | 'parent' | 'spouse' | 'child' | 'sibling' | 'other';
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  medicalNotes?: string; // SENSITIVE: Only visible to assigned pro & admin
  mobilityStatus?: 'independent' | 'assisted' | 'wheelchair' | 'bedridden';
  allergies?: string[];
  currentMedications?: string[];
  createdAt: string;
}

export interface ClientProfile {
  id: string;
  userId: string;
  addresses: Address[];
  patients: PatientProfile[];
  preferredLanguages: string[];
  emergencyContact?: EmergencyContact;
  bookingCount: number;
  createdAt: string;
}

// ==========================================
// 3. HEALTHCARE PROFESSIONAL & KYC
// ==========================================

export type ProfessionalStatus =
  | 'pending_verification'
  | 'verified'
  | 'active'
  | 'offline'
  | 'busy'
  | 'suspended'
  | 'deactivated';

export type KYCStatus =
  | 'not_started'
  | 'draft'
  | 'submitted'
  | 'under_review'
  | 'approved'
  | 'rejected'
  | 'reupload_required'
  | 'expired';

export interface GeoLocation {
  latitude: number;
  longitude: number;
  addressName?: string;
}

export interface ProfessionalDocument {
  id: string;
  type: 'nursing_license' | 'degree_certificate' | 'identity_proof' | 'background_check' | 'address_proof';
  documentNumber: string;
  fileUrl: string;
  fileName: string;
  uploadedAt: string;
  expiresAt?: string;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  rejectionReason?: string;
}

export interface AvailabilitySlot {
  id: string;
  dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = Sunday
  startTime: string; // HH:mm format
  endTime: string; // HH:mm format
  isAvailable: boolean;
}

export interface ProfessionalProfile {
  id: string;
  userId: string;
  displayName: string;
  bio: string;
  qualification: string; // e.g., "B.Sc Nursing, RN", "BPT (Physiotherapy)", "MBBS", "GNM"
  qualificationDetails: string;
  registrationNumber: string;
  specializations: string[];
  experienceYears: number;
  servicesOffered: string[]; // Service IDs
  serviceRadius: number; // in km
  location: GeoLocation;
  languages: string[];
  hourlyRate: number; // in INR (₹)
  rating: number; // 0-5
  reviewCount: number;
  totalVisits: number;
  completionRate: number; // Percentage e.g. 98
  isVerified: boolean;
  kycStatus: KYCStatus;
  kycRejectionReason?: string;
  availabilityStatus: ProfessionalStatus;
  profilePhoto: string;
  documents: ProfessionalDocument[];
  availability: AvailabilitySlot[];
  badge?: string; // e.g. "Top Rated", "Verified Expert", "Hospital Experienced"
  employeeId?: string; // e.g. "EMP-8041"
  employmentType?: 'full_time' | 'part_time' | 'contract';
  assignedShiftCount?: number;
  leaveStatus?: 'active' | 'on_leave' | 'sick_leave';
  leaves?: Array<{ id: string; startDate: string; endDate: string; type: string; reason: string; status: 'pending' | 'approved' | 'rejected' }>;
  createdAt: string;
  updatedAt: string;
}

// ==========================================
// 4. ORGANIZATION / HOSPITAL
// ==========================================

export interface Organization {
  id: string;
  name: string;
  type: 'hospital' | 'clinic' | 'rehab_center' | 'elderly_care_home' | 'corporate';
  registrationNumber: string;
  contactEmail: string;
  contactPhone: string;
  address: Address;
  activeStaffCount: number;
  openStaffingRequestsCount: number;
  contractType?: 'monthly_retainer' | 'per_shift' | 'volume_discount';
  billingCycle?: 'monthly' | 'biweekly' | 'weekly';
  createdAt: string;
}

export interface StaffingRequest {
  id: string;
  organizationId: string;
  organizationName: string;
  serviceCategory: string;
  requiredQualification: string;
  shiftType: 'day' | 'night' | '24hr' | 'custom';
  startDate: string;
  endDate: string;
  requiredCount: number;
  assignedCount: number;
  hourlyRateOffered: number; // INR (₹)
  status: 'open' | 'partially_filled' | 'filled' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: string;
}

export interface Shift {
  id: string;
  requestId: string;
  organizationId: string;
  professionalId?: string;
  professionalName?: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'unassigned' | 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  hourlyRate: number;
}

export interface Timesheet {
  id: string;
  shiftId: string;
  organizationId: string;
  professionalId: string;
  professionalName: string;
  date: string;
  hoursWorked: number;
  hourlyRate: number;
  totalAmount: number;
  status: 'submitted' | 'approved' | 'rejected' | 'paid';
  approvedBy?: string;
  approvedAt?: string;
}

// ==========================================
// 5. SERVICES & PRICING
// ==========================================

export type ServiceCategory =
  | 'home_nursing'
  | 'caregiver_attendant'
  | 'physiotherapy'
  | 'doctor_visit'
  | 'specialized_care';

export interface ServicePricing {
  basePrice: number; // in INR (₹)
  priceUnit: 'per_visit' | 'per_hour' | 'per_session' | 'per_day';
  minHours?: number;
  nightShiftSurchargePercent?: number; // e.g. 20%
  platformCommissionPercent: number; // e.g. 15%
}

export interface ServiceShiftOption {
  id: string;
  label: string;
  durationLabel: string;
  hours: number;
  priceMultiplier: number;
}

export interface ServiceCareTaskOption {
  id: string;
  name: string;
  category: string;
}

export interface ConfigurableQuestion {
  id: string;
  label: string;
  type: 'single_choice' | 'multi_choice' | 'yes_no' | 'text' | 'textarea' | 'number' | 'date';
  required: boolean;
  options?: string[];
  dependsOn?: { fieldId: string; value: string };
  active: boolean;
  helpText?: string;
}

export interface Service {
  id: string;
  slug?: string;
  category: ServiceCategory;
  name: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string; // Lucide icon identifier
  heroMedia?: string;
  cardMedia?: string;
  pricing: ServicePricing;
  estimatedDuration: string; // e.g. "45 - 60 mins", "4 Hours", "12 Hours"
  requiredQualifications: string[];
  keyInclusions: string[];
  idealFor?: string[];
  whoItsFor?: string;
  whoItsForList?: { title: string; desc: string; iconName?: string }[];
  categorizedInclusions?: { category: string; items: string[] }[];
  exclusions?: string[];
  shiftOptions?: ServiceShiftOption[];
  careTasksOptions?: ServiceCareTaskOption[];
  preparationInstructions?: string[];
  serviceAreas?: string[];
  faqList?: { q: string; a: string }[];
  featured?: boolean;
  isActive: boolean;
  active?: boolean; // Synced with isActive for Admin toggle
  allowedShifts?: string[];
  allowedFrequencies?: string[];
  serviceQuestions?: ConfigurableQuestion[];
  dutyChecklist?: string[];
}

// ==========================================
// 6. CANONICAL V2.1 OPERATIONAL DOMAIN MODELS
// ==========================================

export type RequestStatus =
  | 'DRAFT'
  | 'REQUESTED'
  | 'REQUEST_SUBMITTED'
  | 'SUBMITTED'
  | 'UNDER_REVIEW'
  | 'UNDER_OPERATIONS_REVIEW'
  | 'CLARIFICATION_REQUIRED'
  | 'STAFF_ASSIGNMENT_PENDING'
  | 'STAFF_ASSIGNED'
  | 'ASSIGNED'
  | 'CLIENT_CONFIRMATION_PENDING'
  | 'CLIENT_CONFIRMATION_REQUIRED'
  | 'CONFIRMED'
  | 'UPCOMING'
  | 'STAFF_EN_ROUTE'
  | 'STAFF_ARRIVED'
  | 'CARE_IN_PROGRESS'
  | 'IN_PROGRESS'
  | 'CARE_COMPLETED'
  | 'COMPLETED'
  | 'TIMESHEET_PENDING'
  | 'CARE_RECORD_PENDING'
  | 'INVOICE_GENERATED'
  | 'PAYMENT_PENDING'
  | 'PAID'
  | 'CLOSED'
  | 'CANCELLED'
  | 'REJECTED';

export type DutyStatus =
  | 'ASSIGNED'
  | 'ACKNOWLEDGED'
  | 'EN_ROUTE'
  | 'ARRIVED'
  | 'IN_CARE'
  | 'COMPLETED'
  | 'CANCELLED';

export interface PriceSnapshot {
  snapshotId: string;
  serviceId: string;
  basePrice: number; // INR (₹)
  priceUnit: 'per_visit' | 'per_day' | 'per_shift' | 'per_hour' | 'per_session';
  durationUnits: number;
  shiftMultiplier: number;
  subtotal: number;
  taxRate: number; // e.g. 0.18 for 18% GST
  taxAmount: number;
  totalAmount: number;
  snapshotTimestamp: string;
}

export interface CareRequest {
  id: string; // Stable ID, e.g. "req-2026-8819"
  requestRef: string; // Human readable, e.g. "PNC-REQ-8819"
  clientId: string;
  clientName: string;
  clientPhone: string;
  patientId: string;
  patientName: string;
  patientAge?: number;
  relationship?: string;
  patientProfile?: PatientProfile;
  serviceId: string;
  serviceName: string;
  serviceCategory: ServiceCategory;
  address: Address;
  startDate: string; // YYYY-MM-DD
  endDate?: string; // YYYY-MM-DD
  shiftType: '12hr_day' | '12hr_night' | '24hr_livein' | 'single_visit' | string;
  frequency: 'single' | 'date_range' | 'recurring' | string;
  careTasks: string[];
  patientCareContext?: string;
  staffPreferences?: {
    gender?: 'no_preference' | 'female' | 'male';
    language?: string;
    role?: string;
    minExperienceYears?: number;
  };
  status: RequestStatus;
  statusHistory: BookingStatusHistory[];
  priceSnapshot: PriceSnapshot;
  assignedStaffId?: string;
  assignedStaffName?: string;
  specialInstructions?: string;
  cancellationReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CareAssignment {
  assignmentId: string;
  careRequestId: string;
  staffId: string;
  staffName: string;
  staffRole: string;
  staffPhone?: string;
  assignedBy: string; // Admin User ID
  assignedAt: string;
  status: 'active' | 'reassigned' | 'cancelled';
  notes?: string;
}

export interface CareDuty {
  dutyId: string;
  careRequestId: string;
  assignmentId: string;
  staffId: string;
  staffName: string;
  patientName: string;
  locationAddress: Address;
  scheduledStart: string; // ISO 8601
  scheduledEnd: string; // ISO 8601
  shiftType: '12hr_day' | '12hr_night' | '24hr_livein' | 'single_visit' | string;
  status: DutyStatus;
  dutyEvents?: Array<{ eventId: string; eventType: string; timestamp: string; actorId: string; note?: string }>;
  completionNotes?: string;
  vitalsObserved?: {
    bloodPressure?: string;
    pulseRate?: number;
    temperature?: number;
    spo2?: number;
    sugarLevel?: number;
  };
}

export interface CareTimesheet {
  timesheetId: string;
  dutyId: string;
  careRequestId: string;
  staffId: string;
  scheduledHours: number;
  actualStart?: string;
  actualEnd?: string;
  actualHoursWorked: number;
  overtimeHours: number;
  status: 'submitted' | 'approved' | 'disputed';
  approvedBy?: string;
  approvedAt?: string;
}

export interface CareInvoice {
  id: string; // Internal UUID
  invoiceNumber: string; // Formatted ref e.g. "PNC-INV-2026-0041"
  careRequestId: string;
  clientId: string;
  clientName: string;
  patientName: string;
  billingAddress: Address;
  issueDate: string; // YYYY-MM-DD
  dueDate: string; // YYYY-MM-DD
  lineItems: Array<{
    description: string;
    quantity: number;
    unitPrice: number;
    amount: number;
  }>;
  subtotal: number;
  taxAmount: number;
  totalAmount: number;
  status: 'DRAFT' | 'ISSUED' | 'VOID';
  createdAt: string;
}

export interface PaymentRecord {
  id: string;
  invoiceId: string;
  careRequestId: string;
  clientId: string;
  amount: number;
  paymentMethod: 'cash' | 'bank_transfer' | 'upi_manual' | 'cheque';
  status: 'UNPAID' | 'PAID' | 'PARTIALLY_PAID' | 'REFUNDED';
  paymentReference?: string;
  paidAt?: string;
  recordedBy?: string;
  createdAt: string;
}

// ==========================================
// 6B. LEGACY BOOKING ALIASES (COMPATIBILITY)
// ==========================================

export type BookingStatus = RequestStatus | 'MATCHING' | 'ACCEPTED' | 'ON_THE_WAY' | 'CHECKED_IN' | 'PAYMENT_PENDING' | 'CLOSED' | 'DISPUTED';

export interface BookingStatusHistory {
  status: BookingStatus;
  timestamp: string;
  actorId: string;
  actorRole: UserRole;
  note?: string;
}

export interface PriceBreakdown {
  serviceBasePrice: number; // INR
  durationUnits: number; // e.g., 4 hours or 1 visit
  subtotal: number;
  taxesAndFees: number; // GST (18%)
  discount: number;
  totalPrice: number; // INR
  professionalEarning: number; // After commission
  platformCommission: number;
}

export interface Booking {
  id: string;
  bookingCode: string; // e.g. "BKG-2026-8819"
  clientId: string;
  clientName: string;
  clientPhone: string;
  patientProfile: PatientProfile;
  serviceId: string;
  serviceName: string;
  serviceCategory: ServiceCategory;
  professionalId?: string;
  professionalName?: string;
  professionalPhoto?: string;
  professionalPhone?: string;
  address: Address;
  scheduledDate: string; // YYYY-MM-DD
  scheduledTimeSlot: string; // e.g. "09:00 AM - 01:00 PM"
  durationHours?: number;
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
  assignedStaffId?: string;
  assignedStaffName?: string;
  status: BookingStatus;
  statusHistory: BookingStatusHistory[];
  priceBreakdown: PriceBreakdown;
  paymentStatus: PaymentStatus;
  specialInstructions?: string;
  cancellationReason?: string;
  cancellationFee?: number;
  createdAt: string;
  updatedAt: string;
}

export interface VisitNote {
  id: string;
  visitId: string;
  authorId: string;
  authorName: string;
  timestamp: string;
  vitalSigns?: {
    bloodPressure?: string;
    pulseRate?: number;
    temperature?: number;
    spo2?: number;
    sugarLevel?: number;
  };
  careProvided: string;
  patientConditionSummary: string;
  medicationsAdministered?: string[];
  recommendationsForFamily?: string;
}

export interface Visit {
  id: string;
  bookingId: string;
  professionalId: string;
  professionalName: string;
  clientId: string;
  patientName: string;
  checkInTime?: string;
  checkOutTime?: string;
  checkInLocation?: GeoLocation;
  checkOutLocation?: GeoLocation;
  actualDurationMinutes?: number;
  visitNotes?: VisitNote;
  otpVerified: boolean;
  status: 'scheduled' | 'on_the_way' | 'checked_in' | 'in_progress' | 'completed' | 'disputed';
}

// ==========================================
// 7. PAYMENT & PAYOUT STATE MACHINES
// ==========================================

export type PaymentStatus =
  | 'PENDING'
  | 'PROCESSING'
  | 'COMPLETED'
  | 'FAILED'
  | 'REFUND_REQUESTED'
  | 'REFUNDED'
  | 'DISPUTED';

export interface Payment {
  id: string;
  transactionId: string;
  bookingId: string;
  bookingCode: string;
  clientId: string;
  clientName: string;
  amount: number; // INR (₹)
  paymentMethod: 'upi' | 'card' | 'netbanking' | 'wallet' | 'cash_on_delivery';
  paymentProviderTransactionId?: string;
  status: PaymentStatus;
  paidAt?: string;
  refundedAmount?: number;
  refundReason?: string;
  createdAt: string;
}

export type PayoutStatus =
  | 'NOT_ELIGIBLE'
  | 'ELIGIBLE'
  | 'PROCESSING'
  | 'COMPLETED'
  | 'FAILED'
  | 'HELD';

export interface Payout {
  id: string;
  payoutBatchId: string;
  professionalId: string;
  professionalName: string;
  bankName: string;
  accountNumberMasked: string; // e.g. "XXXX-XXXX-4819"
  ifscCode: string;
  amount: number; // INR (₹)
  bookingIds: string[];
  status: PayoutStatus;
  processedAt?: string;
  createdAt: string;
}

// ==========================================
// 8. REVIEWS, RATINGS & SUPPORT
// ==========================================

export interface Review {
  id: string;
  bookingId: string;
  professionalId: string;
  clientId: string;
  clientName: string;
  clientAvatar?: string;
  rating: number; // 1-5
  punctualityRating: number;
  careQualityRating: number;
  hygieneRating: number;
  communicationRating: number;
  comment: string;
  professionalReply?: string;
  createdAt: string;
  isVerifiedVisit: boolean;
}

export type SupportTicketStatus = 'OPEN' | 'ASSIGNED' | 'IN_PROGRESS' | 'RESOLVED' | 'REOPENED' | 'CLOSED';
export type TicketCategory = 'booking_issue' | 'payment_refund' | 'professional_conduct' | 'clinical_concern' | 'kyc_verification' | 'app_bug' | 'other';
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface SupportMessage {
  id: string;
  ticketId: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  message: string;
  timestamp: string;
  attachments?: string[];
}

export interface SupportTicket {
  id: string;
  ticketNumber: string; // e.g. "TKT-9912"
  creatorId: string;
  creatorName: string;
  creatorRole: UserRole;
  bookingId?: string;
  category: TicketCategory;
  priority: TicketPriority;
  subject: string;
  description: string;
  status: SupportTicketStatus;
  assignedAdminId?: string;
  assignedAdminName?: string;
  messages: SupportMessage[];
  createdAt: string;
  updatedAt: string;
}

// ==========================================
// 9. NOTIFICATIONS & AUDIT LOGS
// ==========================================

export type NotificationType =
  | 'booking_status_change'
  | 'job_offer_received'
  | 'kyc_update'
  | 'payment_confirmation'
  | 'payout_processed'
  | 'support_ticket_reply'
  | 'visit_reminder'
  | 'system_announcement';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  body: string;
  actionUrl?: string;
  isRead: boolean;
  priority: 'low' | 'normal' | 'high';
  createdAt: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actorId: string;
  actorName: string;
  actorRole: UserRole;
  action: string;
  entityType: string;
  entityId: string;
  ipAddress: string;
  details: string;
}

// ==========================================
// 10. SYSTEM & MATCHING CONFIG
// ==========================================

export interface MatchingResult {
  bookingId: string;
  matchedProfessionals: {
    professional: ProfessionalProfile;
    matchScore: number; // 0 - 100
    distanceKm: number;
    isEligible: boolean;
    reasonIfNotEligible?: string;
  }[];
  selectedProfessionalId?: string;
  autoMatchedAt?: string;
}

export interface PlatformSettings {
  platformName: string;
  defaultCommissionPercent: number;
  jobAcceptanceTimeoutSeconds: number;
  sessionTimeoutMinutes: number;
  kycValidityMonths: number;
  maxFileUploadMb: number;
  minimumRestHours: number; // Default 10 hours rest between shifts
  supportEmail: string;
  supportPhone: string;
  demoMode: boolean;
}

// ==========================================
// 11. SERVICE AREA MASTER (NCR ENFORCEMENT)
// ==========================================

export interface ServiceArea {
  id: string;
  name: string;
  city: string;
  state: string;
  supportedPincodes: string[];
  isActive: boolean;
  hubLocation: GeoLocation;
  coveredRadiusKm: number;
}

// Re-export Staff Operations, B2B, Careers, & Duty Data Models
export * from './staff';
export * from './b2b';
export * from './careers';
export * from './duty';



