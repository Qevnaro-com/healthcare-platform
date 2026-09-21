/**
 * Healthcare Staffing & Home Care Platform
 * Synthetic Demo Dataset
 * Source of Truth: docs/18-Demo-Data-Specification.md
 *
 * ALL DATA IS SYNTHETIC, DETERMINISTIC, INR-DENOMINATED, AND DELHI NCR-LOCATED.
 * NO REAL PII OR GOVERNMENT IDS ARE USED.
 */

import type {
  Service,
  ProfessionalProfile,
  ClientProfile,
  Organization,
  Booking,
  Payment,
  Payout,
  SupportTicket,
  Review,
  Notification,
  AuditLog,
  PlatformSettings,
  ServiceArea
} from '../types';
import { VISUAL_ASSETS } from './visualAssets';

// ==========================================
// 1. SERVICES CATALOG (11 SERVICES)
// ==========================================

export const MOCK_SERVICES: Service[] = [
  // Home Nursing
  {
    id: 'srv-nursing-post-op',
    slug: 'post-operative-nursing-care',
    category: 'home_nursing',
    name: 'Post-Operative Nursing Care',
    shortDescription: 'Dedicated wound care, vital monitoring, and IV administration following surgery.',
    fullDescription: 'Comprehensive post-surgical care provided by registered B.Sc Nurses. Includes sterile surgical dressing changes, medication administration, pain management monitoring, catheter care, and coordination with operating surgeon notes.',
    iconName: 'Activity',
    cardMedia: VISUAL_ASSETS.servicePostOpCard.url,
    heroMedia: VISUAL_ASSETS.servicePostOpHero.url,
    featured: true,
    pricing: {
      basePrice: 1200,
      priceUnit: 'per_visit',
      minHours: 2,
      nightShiftSurchargePercent: 20,
      platformCommissionPercent: 15,
    },
    estimatedDuration: '2 - 4 Hours',
    requiredQualifications: ['B.Sc Nursing', 'RN License'],
    idealFor: ['Post-surgery recovery', 'Wound & drain management', 'Orthopedic / Cardiac post-discharge'],
    keyInclusions: [
      'Aseptic wound dressing',
      'Vital signs monitoring & logging',
      'IV / IM injections administration',
      'Drain & catheter care',
      'Post-op recovery progress report'
    ],
    whoItsForList: [
      { title: 'Post-Surgical Patients', desc: 'Patients recovering at home after cardiac, orthopedic, or abdominal surgery.', iconName: 'Activity' },
      { title: 'Wound Care Cases', desc: 'Surgical incisions requiring daily sterile dressing and infection control.', iconName: 'ShieldPlus' },
      { title: 'Catheter & Drain Support', desc: 'Patients needing ongoing urinary catheter or surgical drain hygiene.', iconName: 'HeartPulse' }
    ],
    categorizedInclusions: [
      { category: 'Clinical Procedures', items: ['Aseptic wound dressing & suture care', 'IV fluid & antibiotic administration', 'Catheter insertion & bag flushing'] },
      { category: 'Vital Signs & Monitoring', items: ['BP, Pulse, Temperature, SpO2 charting', 'Pain score observation', 'Surgeon progress report logging'] }
    ],
    exclusions: [
      'Operating room surgical procedures',
      'Intensive diagnostic imaging at home',
      'Direct emergency ambulance transport (referral provided)'
    ],
    shiftOptions: [
      { id: 'sh-short', label: 'Short Visit', durationLabel: '2 Hours', hours: 2, priceMultiplier: 1.0 },
      { id: 'sh-half', label: 'Half Day Shift', durationLabel: '6 Hours', hours: 6, priceMultiplier: 2.2 },
      { id: 'sh-day', label: '12-Hour Day Shift', durationLabel: '12 Hours', hours: 12, priceMultiplier: 3.5 },
      { id: 'sh-night', label: '10-Hour Night Shift', durationLabel: '10 Hours (10 PM - 8 AM)', hours: 10, priceMultiplier: 3.2 }
    ],
    serviceAreas: ['Delhi', 'Noida', 'Gurugram', 'Faridabad'],
    faqList: [
      { q: 'How quickly can a nurse arrive post-discharge?', a: 'Once your request is received, Central Operations verifies clinical requirements and dispatches an assigned in-house nurse within 2-4 hours in Delhi NCR.' },
      { q: 'Do nurses bring dressing materials?', a: 'Nurses bring basic clinical consumables (sterile gloves, BP monitor, oximeter). Specific surgical dressing kits prescribed by your doctor should be kept ready at home.' },
      { q: 'Can I book night shifts?', a: 'Yes, 10-hour night shifts (10:00 PM to 08:00 AM) are available with transparent night surcharge calculation at checkout.' }
    ],
    preparationInstructions: [
      'Keep hospital discharge summary ready',
      'Ensure surgeon prescribed medications are present',
      'Provide clean workspace with bright lighting'
    ],
    isActive: true,
    active: true,
    allowedShifts: ['12hr_day', '12hr_night', '24hr_livein', 'single_visit'],
    allowedFrequencies: ['single', 'date_range', 'recurring'],
    dutyChecklist: [
      'Sterile wound dressing & incision check',
      'Vital signs (BP, Pulse, SpO2, Temp) charting',
      'Prescribed medication / injection administration',
      'Catheter / drain hygiene check',
      'Post-op progress log entry'
    ],
    serviceQuestions: [
      {
        id: 'q_postop_reason',
        label: 'Surgery or recovery reason',
        type: 'text',
        required: true,
        active: true,
        helpText: 'e.g. Total Knee Replacement, Abdominal Surgery, Cardiac Bypass'
      },
      {
        id: 'q_postop_wound',
        label: 'Is sterile wound dressing required?',
        type: 'yes_no',
        required: true,
        active: true
      },
      {
        id: 'q_postop_dressing_type',
        label: 'Select dressing care type',
        type: 'single_choice',
        required: false,
        options: ['Surgical Incision Dressing', 'Drainage Site Dressing', 'Staples / Suture Removal Prep'],
        dependsOn: { fieldId: 'q_postop_wound', value: 'yes' },
        active: true
      },
      {
        id: 'q_postop_catheter',
        label: 'Is urinary catheter or surgical drain care required?',
        type: 'yes_no',
        required: true,
        active: true
      },
      {
        id: 'q_postop_injection',
        label: 'Is prescribed IV or IM injection administration required?',
        type: 'yes_no',
        required: true,
        active: true
      }
    ]
  },
  {
    id: 'srv-nursing-elderly',
    slug: 'senior-skilled-nursing-visit',
    category: 'home_nursing',
    name: 'Senior Skilled Nursing Visit',
    shortDescription: 'Routine clinical checkup, medication management, and chronic care for seniors.',
    fullDescription: 'Tailored home nursing for elderly patients managing hypertension, diabetes, COPD, or dementia. Covers daily injections (e.g., insulin), sugar monitoring, bedridden patient hygiene support, and tube feeding.',
    iconName: 'HeartPulse',
    cardMedia: VISUAL_ASSETS.serviceElderlyNursingCard.url,
    heroMedia: VISUAL_ASSETS.serviceElderlyNursingHero.url,
    featured: false,
    pricing: {
      basePrice: 800,
      priceUnit: 'per_visit',
      minHours: 1,
      nightShiftSurchargePercent: 15,
      platformCommissionPercent: 15,
    },
    estimatedDuration: '1 - 2 Hours',
    requiredQualifications: ['GNM', 'B.Sc Nursing'],
    idealFor: ['Elderly care', 'Diabetes & BP management', 'Insulin & injection therapy'],
    keyInclusions: [
      'Blood glucose & BP check',
      'Insulin administration',
      'Ryle tube / PEG feeding assistance',
      'Bedsores preventative dressing'
    ],
    whoItsForList: [
      { title: 'Geriatric Patients', desc: 'Elderly individuals managing age-related chronic conditions at home.', iconName: 'HeartPulse' },
      { title: 'Insulin Dependent Seniors', desc: 'Daily subcutaneous insulin administration & blood sugar tracking.', iconName: 'Activity' }
    ],
    categorizedInclusions: [
      { category: 'Geriatric Nursing', items: ['Insulin & daily medication administration', 'Ryle tube & PEG tube feeding', 'Bedsores staging & preventative dressing'] }
    ],
    exclusions: ['Full-time maid work or house cleaning', 'Medication purchasing without prescription'],
    shiftOptions: [
      { id: 'sh-visit-1', label: 'Single Clinical Visit', durationLabel: '1 Hour', hours: 1, priceMultiplier: 1.0 },
      { id: 'sh-visit-2', label: 'Extended Nursing Visit', durationLabel: '2 Hours', hours: 2, priceMultiplier: 1.6 }
    ],
    serviceAreas: ['Delhi', 'Noida', 'Gurugram', 'Faridabad'],
    faqList: [
      { q: 'Is this suitable for daily insulin visits?', a: 'Yes, seniors can set up daily or weekly recurring nursing visits at discounted bundle rates.' }
    ],
    isActive: true,
  },

  // Caregiver / Attendant
  {
    id: 'srv-caregiver-12hr',
    slug: '12-hour-caregiver-attendant',
    category: 'caregiver_attendant',
    name: '12-Hour Day / Night Caregiver',
    shortDescription: 'Continuous compassionate daily living support for elderly or recovering patients.',
    fullDescription: 'Experienced bedside caregiver for 12-hour shifts. Assists with personal hygiene, bathing, diaper changes, mobility/transfer assistance, feeding, medication reminders, and companionship.',
    iconName: 'UserCheck',
    cardMedia: VISUAL_ASSETS.serviceAttendant12hCard.url,
    heroMedia: VISUAL_ASSETS.serviceAttendant12hHero.url,
    featured: true,
    pricing: {
      basePrice: 1800,
      priceUnit: 'per_day',
      minHours: 12,
      nightShiftSurchargePercent: 10,
      platformCommissionPercent: 15,
    },
    estimatedDuration: '12 Hours',
    requiredQualifications: ['Certified Caregiver', 'First Aid Certified'],
    idealFor: ['Bedridden patient care', 'Elderly assistance', 'Post-stroke mobility support'],
    keyInclusions: [
      'Bathing & oral hygiene care',
      'Mobility & wheelchair transfer',
      'Feeding & hydration support',
      'Medication timely reminders',
      'Vitals recording (BP, Temp, SpO2)'
    ],
    whoItsForList: [
      { title: 'Elderly Family Members', desc: 'Seniors who require dedicated bedside support for daily living.', iconName: 'UserCheck' },
      { title: 'Bedridden & Recovery Patients', desc: 'Assistance with diaper changes, position rotation, and grooming.', iconName: 'Clock' }
    ],
    categorizedInclusions: [
      { category: 'Daily Living Support', items: ['Sponge bath & hair wash', 'Oral care & diaper changing', 'Feeding & liquid intake tracking'] },
      { category: 'Mobility & Safety', items: ['Bed to wheelchair transfer', 'Walk support & fall prevention', 'Bed position shift every 2h'] }
    ],
    exclusions: ['Clinical IV injections (handled by Nursing service)', 'Heavy domestic housework or cooking for whole family'],
    shiftOptions: [
      { id: 'sh-cg-day', label: '12-Hour Day Shift', durationLabel: '08:00 AM - 08:00 PM', hours: 12, priceMultiplier: 1.0 },
      { id: 'sh-cg-night', label: '10-Hour Night Shift', durationLabel: '10:00 PM - 08:00 AM (Overnight)', hours: 10, priceMultiplier: 1.1 }
    ],
    serviceAreas: ['Delhi', 'Noida', 'Gurugram', 'Faridabad'],
    faqList: [
      { q: 'Will the caregiver help with bathing?', a: 'Yes, daily sponge baths, hair washing, oral care, and diaper changes are core caregiver responsibilities.' }
    ],
    isActive: true,
  },
  {
    id: 'srv-caregiver-24hr',
    slug: '24-hour-live-in-caregiver',
    category: 'caregiver_attendant',
    name: '24-Hour Live-in Caregiver',
    shortDescription: 'Full 24-hour round-the-clock personal care for bedridden or elderly family members.',
    fullDescription: 'Uninterrupted 24-hour live-in support for total assistance cases. Ensures patient safety overnight, frequent position shifts to prevent bedsores, hygiene management, and peace of mind for family.',
    iconName: 'Clock',
    cardMedia: VISUAL_ASSETS.serviceAttendant24x7Card.url,
    heroMedia: VISUAL_ASSETS.serviceAttendant24x7Hero.url,
    featured: false,
    pricing: {
      basePrice: 2800,
      priceUnit: 'per_day',
      minHours: 24,
      nightShiftSurchargePercent: 0,
      platformCommissionPercent: 15,
    },
    estimatedDuration: '24 Hours',
    requiredQualifications: ['Certified Caregiver', 'Geriatric Care Specialist'],
    idealFor: ['24/7 Bedside support', 'Dementia patient supervision', 'Total dependency care'],
    keyInclusions: [
      '24-hour continuous care',
      'Overnight assistance',
      'Bed rotation every 2 hours',
      'Complete personal care'
    ],
    shiftOptions: [
      { id: 'sh-24hr', label: '24-Hour Live-In Shift', durationLabel: 'Round the Clock (24h)', hours: 24, priceMultiplier: 1.0 }
    ],
    serviceAreas: ['Delhi', 'Noida', 'Gurugram', 'Faridabad'],
    isActive: true,
  },

  // Physiotherapy
  {
    id: 'srv-physio-ortho',
    slug: 'orthopedic-joint-rehab-physio',
    category: 'physiotherapy',
    name: 'Orthopedic & Joint Rehab Physio',
    shortDescription: 'Specialized physiotherapy for knee replacement, fractures, back pain, and arthritis.',
    fullDescription: 'Evidence-based physical therapy performed at home by certified BPT/MPT physiotherapists. Focuses on joint mobilization, gait training, muscle strengthening, and pain relief exercises.',
    iconName: 'Activity',
    cardMedia: VISUAL_ASSETS.servicePhysioOrthoCard.url,
    heroMedia: VISUAL_ASSETS.servicePhysioOrthoHero.url,
    featured: false,
    pricing: {
      basePrice: 950,
      priceUnit: 'per_session',
      minHours: 1,
      platformCommissionPercent: 15,
    },
    estimatedDuration: '45 - 60 Mins',
    requiredQualifications: ['BPT', 'MPT (Orthopedics)'],
    idealFor: ['Knee replacement rehab', 'Spine & back pain therapy', 'Post-fracture stiffness'],
    keyInclusions: [
      'Joint mobility assessment',
      'Targeted therapeutic exercises',
      'Gait & balance rehab',
      'TENS / Ultrasound therapeutic session',
      'Home exercise chart'
    ],
    shiftOptions: [
      { id: 'sh-py-session', label: 'Single Therapy Session', durationLabel: '45-60 Mins', hours: 1, priceMultiplier: 1.0 }
    ],
    serviceAreas: ['Delhi', 'Noida', 'Gurugram', 'Faridabad'],
    isActive: true,
  },
  {
    id: 'srv-physio-neuro',
    slug: 'neuro-rehabilitation-physio',
    category: 'physiotherapy',
    name: 'Neuro-Rehabilitation Physio',
    shortDescription: 'Specialized therapy for stroke recovery, Parkinson’s disease, and spinal injuries.',
    fullDescription: 'Advanced neurological physiotherapy aimed at neuromuscular re-education, motor recovery post-stroke, coordination improvement, and fall prevention.',
    iconName: 'Zap',
    cardMedia: VISUAL_ASSETS.servicePhysioNeuroCard.url,
    heroMedia: VISUAL_ASSETS.servicePhysioNeuroHero.url,
    featured: false,
    pricing: {
      basePrice: 1250,
      priceUnit: 'per_session',
      minHours: 1,
      platformCommissionPercent: 15,
    },
    estimatedDuration: '60 Mins',
    requiredQualifications: ['MPT (Neurology)', 'BPT'],
    idealFor: ['Post-stroke recovery', 'Parkinson’s mobility rehab', 'Paraplegia / Quadriplegia care'],
    keyInclusions: [
      'Stroke motor retraining',
      'Balance & equilibrium exercises',
      'Spasticity management',
      'Functional independence training'
    ],
    shiftOptions: [
      { id: 'sh-py-neuro', label: 'Neuro Rehab Session', durationLabel: '60 Mins', hours: 1, priceMultiplier: 1.0 }
    ],
    serviceAreas: ['Delhi', 'Noida', 'Gurugram', 'Faridabad'],
    isActive: true,
  },

  // Doctor Visit
  // High-Dependency Nursing Care
  {
    id: 'srv-nursing-high-dependency',
    slug: 'high-dependency-nursing-care',
    category: 'home_nursing',
    name: 'High-Dependency Nursing Care',
    shortDescription: '12-hour or 24-hour skilled nursing care for patients requiring continuous monitoring and support.',
    fullDescription: 'Dedicated bedside nursing care delivered at home by experienced B.Sc / GNM Registered Nurses. Covers vital sign monitoring, catheter hygiene, Ryle tube/PEG feeding support, and surgeon note adherence.',
    iconName: 'Activity',
    cardMedia: VISUAL_ASSETS.clinicalVitals.url,
    heroMedia: VISUAL_ASSETS.servicePhysioOrthoHero.url,
    featured: false,
    pricing: {
      basePrice: 2200,
      priceUnit: 'per_day',
      minHours: 12,
      nightShiftSurchargePercent: 20,
      platformCommissionPercent: 15,
    },
    estimatedDuration: '12 Hours',
    requiredQualifications: ['B.Sc Nursing', 'GNM Nursing'],
    idealFor: ['High-dependency recovery', 'Post-discharge monitoring', 'Continuous bedside nursing'],
    keyInclusions: [
      'Continuous vital sign observation',
      'Airway & catheter hygiene',
      'Prescribed medication administration',
      'Shift progress logging'
    ],
    shiftOptions: [
      { id: 'sh-icu-12h', label: '12-Hour Nursing Shift', durationLabel: '12 Hours', hours: 12, priceMultiplier: 1.0 },
      { id: 'sh-icu-24h', label: '24-Hour Continuous Care', durationLabel: '24 Hours', hours: 24, priceMultiplier: 1.9 }
    ],
    serviceAreas: ['Delhi', 'Noida', 'Gurugram', 'Faridabad'],
    isActive: true,
  }
];

// ==========================================
// 2. HEALTHCARE PROFESSIONALS (20 PROS)
// ==========================================

export const MOCK_PROFESSIONALS: ProfessionalProfile[] = [
  {
    id: 'pro-001',
    userId: 'usr-pro-001',
    displayName: 'Dr. Anjali Sharma, BPT',
    bio: 'Senior Physiotherapist with 7+ years experience in neuro-rehab and joint recovery post-knee replacement.',
    qualification: 'BPT (Physiotherapy)',
    qualificationDetails: 'Delhi University (RAK College of Nursing), 2017. Reg No: DCPT-88912',
    registrationNumber: 'DCPT-88912',
    specializations: ['Post-Surgical Rehab', 'Stroke Rehabilitation', 'Geriatric Mobility'],
    experienceYears: 7,
    servicesOffered: ['srv-physio-ortho', 'srv-physio-neuro'],
    serviceRadius: 12,
    location: { latitude: 28.5800, longitude: 77.2300, addressName: 'Defence Colony, New Delhi' },
    languages: ['English', 'Hindi', 'Kannada'],
    hourlyRate: 950,
    rating: 4.9,
    reviewCount: 48,
    totalVisits: 142,
    completionRate: 99,
    isVerified: true,
    kycStatus: 'approved',
    availabilityStatus: 'active',
    profilePhoto: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&q=80',
    badge: 'Top Rated Specialist',
    documents: [
      {
        id: 'doc-001-1',
        type: 'degree_certificate',
        documentNumber: 'BPT-2017-RGUHS-441',
        fileUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=500&doc=cert1',
        fileName: 'BPT_Degree_Certificate.pdf',
        uploadedAt: '2025-01-10T09:30:00Z',
        verificationStatus: 'verified'
      },
      {
        id: 'doc-001-2',
        type: 'nursing_license',
        documentNumber: 'DCPT-88912',
        fileUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=500&doc=cert2',
        fileName: 'State_Council_Registration.pdf',
        uploadedAt: '2025-01-10T09:35:00Z',
        verificationStatus: 'verified'
      }
    ],
    availability: [
      { id: 'av-1', dayOfWeek: 1, startTime: '08:00', endTime: '18:00', isAvailable: true },
      { id: 'av-2', dayOfWeek: 2, startTime: '08:00', endTime: '18:00', isAvailable: true },
      { id: 'av-3', dayOfWeek: 3, startTime: '08:00', endTime: '18:00', isAvailable: true },
      { id: 'av-4', dayOfWeek: 4, startTime: '08:00', endTime: '18:00', isAvailable: true },
      { id: 'av-5', dayOfWeek: 5, startTime: '08:00', endTime: '18:00', isAvailable: true },
    ],
    createdAt: '2025-01-08T10:00:00Z',
    updatedAt: '2026-03-01T12:00:00Z'
  },
  {
    id: 'pro-002',
    userId: 'usr-pro-002',
    displayName: 'Karthik Rao, RN',
    bio: 'Registered Nursing Specialist with 5 years clinical experience in high-dependency recovery and post-operative monitoring.',
    qualification: 'B.Sc Nursing, High-Dependency Nursing Certified',
    qualificationDetails: 'KNC Registered Nurse #66412',
    registrationNumber: 'DNC-66412',
    specializations: ['High-Dependency Care', 'Catheter Hygiene', 'Post-Op Wound Care'],
    experienceYears: 5,
    servicesOffered: ['srv-nursing-post-op', 'srv-nursing-high-dependency'],
    serviceRadius: 15,
    location: { latitude: 28.4590, longitude: 77.0910, addressName: 'DLF Phase 5, Gurugram' },
    languages: ['English', 'Kannada', 'Tamil'],
    hourlyRate: 1200,
    rating: 4.8,
    reviewCount: 36,
    totalVisits: 98,
    completionRate: 98,
    isVerified: true,
    kycStatus: 'approved',
    availabilityStatus: 'active',
    profilePhoto: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&q=80',
    badge: 'Council Verified',
    documents: [],
    availability: [],
    createdAt: '2025-01-12T10:00:00Z',
    updatedAt: '2026-03-02T12:00:00Z'
  },
  {
    id: 'pro-003',
    userId: 'usr-pro-003',
    displayName: 'Sunita Reddy, GNM',
    bio: 'Compassionate senior caregiver specialized in dementia care, elder hygiene, and diabetes monitoring.',
    qualification: 'GNM (General Nursing & Midwifery)',
    qualificationDetails: 'Delhi Nursing Council #34120',
    registrationNumber: 'DNC-34120',
    specializations: ['Geriatric Care', 'Diabetes Care', 'Bedridden Hygiene'],
    experienceYears: 8,
    servicesOffered: ['srv-nursing-elderly', 'srv-caregiver-12hr'],
    serviceRadius: 10,
    location: { latitude: 28.6280, longitude: 77.3750, addressName: 'Sector 62, Noida' },
    languages: ['Kannada', 'Telugu', 'Hindi', 'English'],
    hourlyRate: 800,
    rating: 4.95,
    reviewCount: 62,
    totalVisits: 210,
    completionRate: 100,
    isVerified: true,
    kycStatus: 'approved',
    availabilityStatus: 'busy',
    profilePhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80',
    badge: 'Patient Favorite',
    documents: [],
    availability: [],
    createdAt: '2025-01-05T10:00:00Z',
    updatedAt: '2026-03-10T12:00:00Z'
  },
  {
    id: 'pro-004',
    userId: 'usr-pro-004',
    displayName: 'Vikramaditya Hegde, B.Sc Nursing',
    bio: 'Senior Nurse Supervisor focused on home-based clinical nursing, senior care checkups, and post-discharge recovery.',
    qualification: 'B.Sc Nursing, Clinical Supervision Dip.',
    qualificationDetails: 'AIIMS Nursing Alumnus, DNC #89104',
    registrationNumber: 'DNC-89104',
    specializations: ['Geriatric Nursing', 'Post-Op Recovery', 'Vitals Supervision'],
    experienceYears: 11,
    servicesOffered: ['srv-nursing-elderly', 'srv-nursing-post-op'],
    serviceRadius: 20,
    location: { latitude: 28.4089, longitude: 77.3178, addressName: 'Sector 15, Faridabad' },
    languages: ['English', 'Kannada', 'Hindi'],
    hourlyRate: 1500,
    rating: 4.9,
    reviewCount: 52,
    totalVisits: 130,
    completionRate: 99,
    isVerified: true,
    kycStatus: 'approved',
    availabilityStatus: 'active',
    profilePhoto: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&q=80',
    badge: 'Senior Nurse',
    documents: [],
    availability: [],
    createdAt: '2024-11-01T10:00:00Z',
    updatedAt: '2026-03-12T12:00:00Z'
  },
  {
    id: 'pro-005',
    userId: 'usr-pro-005',
    displayName: 'Priya Nambiar, B.Sc Nursing',
    bio: 'Oncology certified nurse experienced with chemotherapy side-effect support and PICC line dressings.',
    qualification: 'B.Sc Nursing, Oncology Nursing Dip.',
    qualificationDetails: 'KNC #99102',
    registrationNumber: 'DNC-99102',
    specializations: ['Oncology Nursing', 'Palliative Care', 'Port Dressing'],
    experienceYears: 6,
    servicesOffered: ['srv-specialized-chemo', 'srv-nursing-post-op'],
    serviceRadius: 15,
    location: { latitude: 28.5200, longitude: 77.1500, addressName: 'Vasant Kunj, New Delhi' },
    languages: ['English', 'Malayalam', 'Kannada'],
    hourlyRate: 1400,
    rating: 4.85,
    reviewCount: 29,
    totalVisits: 84,
    completionRate: 97,
    isVerified: true,
    kycStatus: 'approved',
    availabilityStatus: 'active',
    profilePhoto: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&q=80',
    badge: 'Oncology Specialist',
    documents: [],
    availability: [],
    createdAt: '2025-02-01T10:00:00Z',
    updatedAt: '2026-03-05T12:00:00Z'
  },
  {
    id: 'pro-006',
    userId: 'usr-pro-006',
    displayName: 'Arun Kumar, BPT',
    bio: 'Sports and Orthopedic physiotherapist specializing in spine rehabilitation and knee arthritis.',
    qualification: 'BPT (Physiotherapy)',
    qualificationDetails: 'Reg No: DCPT-77610',
    registrationNumber: 'DCPT-77610',
    specializations: ['Back Pain Rehab', 'Knee Joint Therapy'],
    experienceYears: 4,
    servicesOffered: ['srv-physio-ortho'],
    serviceRadius: 8,
    location: { latitude: 28.4700, longitude: 77.1000, addressName: 'Golf Course Road, Gurugram' },
    languages: ['English', 'Kannada', 'Hindi'],
    hourlyRate: 900,
    rating: 4.7,
    reviewCount: 19,
    totalVisits: 56,
    completionRate: 96,
    isVerified: true,
    kycStatus: 'approved',
    availabilityStatus: 'active',
    profilePhoto: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300&q=80',
    documents: [],
    availability: [],
    createdAt: '2025-02-15T10:00:00Z',
    updatedAt: '2026-03-01T12:00:00Z'
  },
  {
    id: 'pro-007',
    userId: 'usr-pro-007',
    displayName: 'Meenakshi Sundaram, GNM',
    bio: 'Dedicated maternal and infant care nurse with 9 years experience in post-partum mother support.',
    qualification: 'GNM, Maternal Care Dip.',
    qualificationDetails: 'KNC #41029',
    registrationNumber: 'DNC-41029',
    specializations: ['Newborn Care', 'Lactation Advice', 'C-Section Wound Care'],
    experienceYears: 9,
    servicesOffered: ['srv-specialized-maternal'],
    serviceRadius: 10,
    location: { latitude: 28.5350, longitude: 77.3910, addressName: 'Noida Expressway, Noida' },
    languages: ['English', 'Tamil', 'Kannada'],
    hourlyRate: 1300,
    rating: 4.9,
    reviewCount: 41,
    totalVisits: 112,
    completionRate: 100,
    isVerified: true,
    kycStatus: 'approved',
    availabilityStatus: 'active',
    profilePhoto: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=300&q=80',
    badge: 'Maternal Expert',
    documents: [],
    availability: [],
    createdAt: '2025-01-20T10:00:00Z',
    updatedAt: '2026-03-08T12:00:00Z'
  },
  {
    id: 'pro-008',
    userId: 'usr-pro-008',
    displayName: 'Rajesh Gopinath, B.Sc Nursing',
    bio: 'Recent applicant with 3 years hospital ward nursing experience. Submitted documents for verification.',
    qualification: 'B.Sc Nursing',
    qualificationDetails: 'KNC #10293',
    registrationNumber: 'DNC-10293',
    specializations: ['General Ward Nursing', 'Catheter Care'],
    experienceYears: 3,
    servicesOffered: ['srv-nursing-elderly'],
    serviceRadius: 10,
    location: { latitude: 13.0033, longitude: 77.5647, addressName: 'Hauz Khas, New Delhi' },
    languages: ['Kannada', 'English'],
    hourlyRate: 750,
    rating: 0,
    reviewCount: 0,
    totalVisits: 0,
    completionRate: 0,
    isVerified: false,
    kycStatus: 'under_review',
    availabilityStatus: 'pending_verification',
    profilePhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80&staff=rajesh_g',
    documents: [
      {
        id: 'doc-008-1',
        type: 'nursing_license',
        documentNumber: 'DNC-10293',
        fileUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=500&doc=cert3',
        fileName: 'Rajesh_KNC_License.pdf',
        uploadedAt: '2026-03-14T10:00:00Z',
        verificationStatus: 'pending'
      }
    ],
    availability: [],
    createdAt: '2026-03-14T09:00:00Z',
    updatedAt: '2026-03-14T10:00:00Z'
  },
  {
    id: 'pro-009',
    userId: 'usr-pro-009',
    displayName: 'Suresh Patil, Certified Caregiver',
    bio: 'Attendant with 6 years experience in bedridden elderly patient assistance.',
    qualification: 'Certified Home Health Aide',
    qualificationDetails: 'St. John Ambulance Certified #8812',
    registrationNumber: 'HA-8812',
    specializations: ['Bedridden Care', 'Baths & Hygiene'],
    experienceYears: 6,
    servicesOffered: ['srv-caregiver-12hr', 'srv-caregiver-24hr'],
    serviceRadius: 12,
    location: { latitude: 12.9830, longitude: 77.5796, addressName: 'Greater Kailash, New Delhi' },
    languages: ['Kannada', 'Marathi', 'Hindi'],
    hourlyRate: 700,
    rating: 4.75,
    reviewCount: 22,
    totalVisits: 75,
    completionRate: 98,
    isVerified: true,
    kycStatus: 'approved',
    availabilityStatus: 'active',
    profilePhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80&staff=suresh_p',
    documents: [],
    availability: [],
    createdAt: '2025-02-10T10:00:00Z',
    updatedAt: '2026-03-10T12:00:00Z'
  },
  {
    id: 'pro-010',
    userId: 'usr-pro-010',
    displayName: 'Deepa V., MPT',
    bio: 'Master of Physiotherapy in Neurology. Expert in Parkinson’s gait training.',
    qualification: 'MPT (Neurology)',
    qualificationDetails: 'KPT #99014',
    registrationNumber: 'DCPT-99014',
    specializations: ['Parkinsons Rehab', 'Balance Training'],
    experienceYears: 8,
    servicesOffered: ['srv-physio-neuro'],
    serviceRadius: 10,
    location: { latitude: 12.9172, longitude: 77.6228, addressName: 'Cyber City, Gurugram' },
    languages: ['English', 'Kannada', 'Telugu'],
    hourlyRate: 1300,
    rating: 4.9,
    reviewCount: 38,
    totalVisits: 110,
    completionRate: 100,
    isVerified: true,
    kycStatus: 'approved',
    availabilityStatus: 'active',
    profilePhoto: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=300&q=80&staff=deepa',
    badge: 'Neuro Specialist',
    documents: [],
    availability: [],
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2026-03-09T12:00:00Z'
  },

  // 10 additional professionals for 20 total
  {
    id: 'pro-011',
    userId: 'usr-pro-011',
    displayName: 'Dr. Ramesh Narayan, MBBS',
    bio: 'Physician with 15+ years experience in chronic disease management and adult vaccinations.',
    qualification: 'MBBS',
    qualificationDetails: 'KMC #45102',
    registrationNumber: 'DMC-45102',
    specializations: ['Hypertension & Diabetes', 'Geriatric Checkup'],
    experienceYears: 15,
    servicesOffered: ['srv-doc-general'],
    serviceRadius: 18,
    location: { latitude: 13.0110, longitude: 77.6520, addressName: 'Saket, New Delhi' },
    languages: ['English', 'Kannada', 'Hindi'],
    hourlyRate: 1600,
    rating: 4.88,
    reviewCount: 74,
    totalVisits: 190,
    completionRate: 99,
    isVerified: true,
    kycStatus: 'approved',
    availabilityStatus: 'active',
    profilePhoto: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&q=80&staff=ramesh',
    documents: [],
    availability: [],
    createdAt: '2024-10-01T10:00:00Z',
    updatedAt: '2026-03-10T12:00:00Z'
  },
  {
    id: 'pro-012',
    userId: 'usr-pro-012',
    displayName: 'Kavitha S., RN',
    bio: 'Pediatric & Maternal Care Nurse.',
    qualification: 'B.Sc Nursing',
    qualificationDetails: 'KNC #88201',
    registrationNumber: 'DNC-88201',
    specializations: ['Infant Care', 'Pediatric Nursing'],
    experienceYears: 5,
    servicesOffered: ['srv-specialized-maternal'],
    serviceRadius: 10,
    location: { latitude: 12.9279, longitude: 77.6271, addressName: 'DLF Phase 5, Gurugram' },
    languages: ['English', 'Kannada'],
    hourlyRate: 1350,
    rating: 4.8,
    reviewCount: 20,
    totalVisits: 60,
    completionRate: 97,
    isVerified: true,
    kycStatus: 'approved',
    availabilityStatus: 'active',
    profilePhoto: 'https://images.unsplash.com/photo-1594824813566-88855ce78905?w=300&q=80&staff=kavitha',
    documents: [],
    availability: [],
    createdAt: '2025-02-20T10:00:00Z',
    updatedAt: '2026-03-01T12:00:00Z'
  },
  {
    id: 'pro-013',
    userId: 'usr-pro-013',
    displayName: 'Mohammed Irfan, BPT',
    bio: 'Physiotherapist specializing in sports injury rehabilitation and posture correction.',
    qualification: 'BPT',
    qualificationDetails: 'KPT #66201',
    registrationNumber: 'DCPT-66201',
    specializations: ['Sports Injury', 'Post-Op Knee Rehab'],
    experienceYears: 4,
    servicesOffered: ['srv-physio-ortho'],
    serviceRadius: 12,
    location: { latitude: 12.9600, longitude: 77.6480, addressName: 'Sector 15, Faridabad' },
    languages: ['English', 'Hindi', 'Urdu'],
    hourlyRate: 900,
    rating: 4.65,
    reviewCount: 15,
    totalVisits: 40,
    completionRate: 95,
    isVerified: true,
    kycStatus: 'approved',
    availabilityStatus: 'active',
    profilePhoto: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300&q=80',
    documents: [],
    availability: [],
    createdAt: '2025-03-01T10:00:00Z',
    updatedAt: '2026-03-05T12:00:00Z'
  },
  {
    id: 'pro-014',
    userId: 'usr-pro-014',
    displayName: 'Lakshmi Narayan, GNM',
    bio: 'Senior nurse specializing in wound care, catheter management, and bedridden patient support.',
    qualification: 'GNM',
    qualificationDetails: 'KNC #55102',
    registrationNumber: 'DNC-55102',
    specializations: ['Wound Care', 'Catheterization'],
    experienceYears: 10,
    servicesOffered: ['srv-nursing-post-op', 'srv-nursing-elderly'],
    serviceRadius: 15,
    location: { latitude: 12.9010, longitude: 77.5810, addressName: 'Dwarka Sector 10, New Delhi' },
    languages: ['Kannada', 'English', 'Telugu'],
    hourlyRate: 900,
    rating: 4.92,
    reviewCount: 58,
    totalVisits: 170,
    completionRate: 100,
    isVerified: true,
    kycStatus: 'approved',
    availabilityStatus: 'active',
    profilePhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80',
    badge: 'Veteran Nurse',
    documents: [],
    availability: [],
    createdAt: '2024-12-01T10:00:00Z',
    updatedAt: '2026-03-11T12:00:00Z'
  },
  {
    id: 'pro-015',
    userId: 'usr-pro-015',
    displayName: 'Ganesh Shinde, Certified Attendant',
    bio: 'Patient care attendant for male patients requiring transfer and mobility support.',
    qualification: 'Caregiver Certificate',
    qualificationDetails: 'HSSC Certified #9921',
    registrationNumber: 'HSSC-9921',
    specializations: ['Male Patient Care', 'Mobility Support'],
    experienceYears: 5,
    servicesOffered: ['srv-caregiver-12hr'],
    serviceRadius: 10,
    location: { latitude: 12.9550, longitude: 77.5700, addressName: 'Rohini Sector 9, New Delhi' },
    languages: ['Kannada', 'Marathi', 'Hindi'],
    hourlyRate: 750,
    rating: 4.75,
    reviewCount: 25,
    totalVisits: 80,
    completionRate: 98,
    isVerified: true,
    kycStatus: 'approved',
    availabilityStatus: 'active',
    profilePhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80',
    documents: [],
    availability: [],
    createdAt: '2025-01-25T10:00:00Z',
    updatedAt: '2026-03-02T12:00:00Z'
  },
  {
    id: 'pro-016',
    userId: 'usr-pro-016',
    displayName: 'Dr. Shalini Menon, MD',
    bio: 'Consultant Geriatrician for complex home-based elderly care evaluations.',
    qualification: 'MD (Internal Medicine), Geriatric Fellow',
    qualificationDetails: 'KMC #77109',
    registrationNumber: 'DMC-77109',
    specializations: ['Geriatrics', 'Palliative Medicine'],
    experienceYears: 14,
    servicesOffered: ['srv-doc-geriatric'],
    serviceRadius: 20,
    location: { latitude: 13.0280, longitude: 77.5410, addressName: 'Pitampura, New Delhi' },
    languages: ['English', 'Malayalam', 'Hindi'],
    hourlyRate: 2200,
    rating: 4.95,
    reviewCount: 45,
    totalVisits: 105,
    completionRate: 100,
    isVerified: true,
    kycStatus: 'approved',
    availabilityStatus: 'active',
    profilePhoto: 'https://images.unsplash.com/photo-1594824813566-88855ce78905?w=300&q=80',
    badge: 'Senior Consultant',
    documents: [],
    availability: [],
    createdAt: '2024-11-15T10:00:00Z',
    updatedAt: '2026-03-14T12:00:00Z'
  },
  {
    id: 'pro-017',
    userId: 'usr-pro-017',
    displayName: 'Venkatesh Rao, RN',
    bio: 'ICU nurse with specialization in tracheostomy management and mechanical ventilation.',
    qualification: 'B.Sc Nursing',
    qualificationDetails: 'KNC #77301',
    registrationNumber: 'DNC-77301',
    specializations: ['ICU Nursing', 'Tracheostomy Care'],
    experienceYears: 7,
    servicesOffered: ['srv-specialized-icu'],
    serviceRadius: 15,
    location: { latitude: 12.9900, longitude: 77.6800, addressName: 'Mayur Vihar Phase 1, New Delhi' },
    languages: ['Kannada', 'English', 'Telugu'],
    hourlyRate: 2500,
    rating: 4.85,
    reviewCount: 30,
    totalVisits: 85,
    completionRate: 98,
    isVerified: true,
    kycStatus: 'approved',
    availabilityStatus: 'active',
    profilePhoto: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&q=80',
    documents: [],
    availability: [],
    createdAt: '2025-01-02T10:00:00Z',
    updatedAt: '2026-03-08T12:00:00Z'
  },
  {
    id: 'pro-018',
    userId: 'usr-pro-018',
    displayName: 'Archana Gowda, GNM',
    bio: 'KYC resubmission pending due to blurred degree certificate upload.',
    qualification: 'GNM',
    qualificationDetails: 'KNC #33019',
    registrationNumber: 'DNC-33019',
    specializations: ['General Nursing'],
    experienceYears: 4,
    servicesOffered: ['srv-nursing-elderly'],
    serviceRadius: 10,
    location: { latitude: 12.9400, longitude: 77.5600, addressName: 'Janakpuri, New Delhi' },
    languages: ['Kannada', 'English'],
    hourlyRate: 800,
    rating: 0,
    reviewCount: 0,
    totalVisits: 0,
    completionRate: 0,
    isVerified: false,
    kycStatus: 'reupload_required',
    kycRejectionReason: 'Degree certificate scan is blurry. Please upload a clear original copy.',
    availabilityStatus: 'pending_verification',
    profilePhoto: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&q=80',
    documents: [
      {
        id: 'doc-018-1',
        type: 'degree_certificate',
        documentNumber: 'GNM-33019',
        fileUrl: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=500',
        fileName: 'Blurred_GNM_Certificate.pdf',
        uploadedAt: '2026-03-12T10:00:00Z',
        verificationStatus: 'rejected',
        rejectionReason: 'Blurred scan.'
      }
    ],
    availability: [],
    createdAt: '2026-03-11T10:00:00Z',
    updatedAt: '2026-03-13T12:00:00Z'
  },
  {
    id: 'pro-019',
    userId: 'usr-pro-019',
    displayName: 'Nitin Sharma, BPT',
    bio: 'Orthopedic physiotherapist specializing in shoulder pain and spine alignment.',
    qualification: 'BPT',
    qualificationDetails: 'KPT #44102',
    registrationNumber: 'DCPT-44102',
    specializations: ['Shoulder Pain', 'Spine Alignment'],
    experienceYears: 6,
    servicesOffered: ['srv-physio-ortho'],
    serviceRadius: 10,
    location: { latitude: 13.0400, longitude: 77.6200, addressName: 'Sector 50, Noida' },
    languages: ['Hindi', 'English', 'Punjabi'],
    hourlyRate: 950,
    rating: 4.8,
    reviewCount: 28,
    totalVisits: 90,
    completionRate: 97,
    isVerified: true,
    kycStatus: 'approved',
    availabilityStatus: 'active',
    profilePhoto: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&q=80',
    documents: [],
    availability: [],
    createdAt: '2025-01-18T10:00:00Z',
    updatedAt: '2026-03-04T12:00:00Z'
  },
  {
    id: 'pro-020',
    userId: 'usr-pro-020',
    displayName: 'Fatima Zahra, B.Sc Nursing',
    bio: 'Oncology and palliative care nurse.',
    qualification: 'B.Sc Nursing',
    qualificationDetails: 'KNC #11920',
    registrationNumber: 'DNC-11920',
    specializations: ['Oncology', 'Pain Management'],
    experienceYears: 7,
    servicesOffered: ['srv-specialized-chemo'],
    serviceRadius: 12,
    location: { latitude: 12.9800, longitude: 77.6100, addressName: 'Civil Lines, New Delhi' },
    languages: ['English', 'Urdu', 'Hindi'],
    hourlyRate: 1500,
    rating: 4.9,
    reviewCount: 35,
    totalVisits: 100,
    completionRate: 99,
    isVerified: true,
    kycStatus: 'approved',
    availabilityStatus: 'active',
    profilePhoto: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=300&q=80',
    documents: [],
    availability: [],
    createdAt: '2024-12-10T10:00:00Z',
    updatedAt: '2026-03-07T12:00:00Z'
  }
];

// ==========================================
// 3. CLIENT PROFILES (10 CLIENTS)
// ==========================================

export const MOCK_CLIENTS: ClientProfile[] = [
  {
    id: 'clt-001',
    userId: 'usr-clt-001',
    preferredLanguages: ['English', 'Hindi'],
    bookingCount: 4,
    emergencyContact: { name: 'Sunil Mehta', relationship: 'Brother', phone: '+91-XXXXX-C9901' },
    addresses: [
      {
        id: 'addr-001-1',
        label: 'Home',
        line1: 'Flat 402, Sterling Residency',
        line2: 'Ring Road, Defence Colony',
        city: 'New Delhi',
        state: 'Delhi NCR',
        pincode: '110024',
        latitude: 12.9716,
        longitude: 77.5946,
        isDefault: true
      }
    ],
    patients: [
      {
        id: 'pat-001-1',
        clientId: 'clt-001',
        firstName: 'Kamla',
        lastName: 'Mehta',
        relationship: 'parent',
        dateOfBirth: '1952-04-12',
        gender: 'female',
        mobilityStatus: 'assisted',
        medicalNotes: 'Recovering from right total knee replacement (TKR). Mild hypertension.',
        allergies: ['Penicillin'],
        currentMedications: ['Amlodipine 5mg', 'Paracetamol 650mg PRN'],
        createdAt: '2026-01-15T10:00:00Z'
      }
    ],
    createdAt: '2026-01-15T09:00:00Z'
  },
  {
    id: 'clt-002',
    userId: 'usr-clt-002',
    preferredLanguages: ['Kannada', 'English'],
    bookingCount: 8,
    emergencyContact: { name: 'Sneha Gowda', relationship: 'Daughter', phone: '+91-XXXXX-C9902' },
    addresses: [
      {
        id: 'addr-002-1',
        label: 'Home',
        line1: 'No 45, 4th Main, 3rd Block',
        line2: 'Sector 62',
        city: 'New Delhi',
        state: 'Delhi NCR',
        pincode: '122002',
        latitude: 12.9250,
        longitude: 77.5897,
        isDefault: true
      }
    ],
    patients: [
      {
        id: 'pat-002-1',
        clientId: 'clt-002',
        firstName: 'Ramachandra',
        lastName: 'Gowda',
        relationship: 'parent',
        dateOfBirth: '1946-08-20',
        gender: 'male',
        mobilityStatus: 'wheelchair',
        medicalNotes: 'Ischemic stroke 2 years ago. Left hemiparesis. Requires transfer assistance.',
        currentMedications: ['Ecosprin 75mg', 'Atorvastatin 20mg'],
        createdAt: '2025-11-10T10:00:00Z'
      }
    ],
    createdAt: '2025-11-10T09:00:00Z'
  }
];

// ==========================================
// 4. ORGANIZATIONS (3 HOSPITALS)
// ==========================================

export const MOCK_ORGANIZATIONS: Organization[] = [
  {
    id: 'org-001',
    name: 'Max Super Speciality Hospital Saket, New Delhi',
    type: 'hospital',
    registrationNumber: 'HOSP-KA-88192',
    contactEmail: 'staffing@manipal.demo.test',
    contactPhone: '+91-XXXXX-O0001',
    address: {
      id: 'addr-org-1',
      label: 'Main Hospital',
      line1: '98 Vasant Kunj Main Road',
      city: 'New Delhi',
      state: 'Delhi NCR',
      pincode: '201309',
      latitude: 12.9580,
      longitude: 77.6490
    },
    activeStaffCount: 14,
    openStaffingRequestsCount: 2,
    createdAt: '2025-01-01T10:00:00Z'
  }
];

// ==========================================
// 5. BOOKINGS (25 DEMO BOOKINGS)
// ==========================================

export const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'bkg-001',
    bookingCode: 'BKG-2026-8819',
    clientId: 'clt-001',
    clientName: 'Rahul Mehta',
    clientPhone: '+91-XXXXX-C0001',
    patientProfile: {
      id: 'pat-001-1',
      clientId: 'clt-001',
      firstName: 'Kamla',
      lastName: 'Mehta',
      relationship: 'parent',
      dateOfBirth: '1952-04-12',
      gender: 'female',
      mobilityStatus: 'assisted',
      medicalNotes: 'Post-op Knee Rehab',
      createdAt: '2026-01-15T10:00:00Z'
    },
    serviceId: 'srv-physio-ortho',
    serviceName: 'Orthopedic & Joint Rehab Physio',
    serviceCategory: 'physiotherapy',
    professionalId: 'pro-001',
    professionalName: 'Dr. Anjali Sharma, BPT',
    professionalPhoto: 'https://images.unsplash.com/photo-1594824813566-88855ce78905?w=300&q=80&bkg=b1',
    professionalPhone: '+91-XXXXX-X0001',
    address: {
      id: 'addr-001-1',
      label: 'Home',
      line1: 'Flat 402, Sterling Residency',
      line2: 'Ring Road, Defence Colony',
      city: 'New Delhi',
      state: 'Delhi NCR',
      pincode: '110024',
      latitude: 12.9716,
      longitude: 77.5946
    },
    scheduledDate: '2026-03-16',
    scheduledTimeSlot: '10:00 AM - 11:00 AM',
    durationHours: 1,
    status: 'IN_PROGRESS',
    statusHistory: [
      { status: 'DRAFT', timestamp: '2026-03-15T14:00:00Z', actorId: 'clt-001', actorRole: 'client' },
      { status: 'REQUESTED', timestamp: '2026-03-15T14:05:00Z', actorId: 'clt-001', actorRole: 'client' },
      { status: 'MATCHING', timestamp: '2026-03-15T14:05:05Z', actorId: 'sys', actorRole: 'super_admin' },
      { status: 'ASSIGNED', timestamp: '2026-03-15T14:06:00Z', actorId: 'sys', actorRole: 'super_admin' },
      { status: 'ACCEPTED', timestamp: '2026-03-15T14:10:00Z', actorId: 'pro-001', actorRole: 'professional' },
      { status: 'ON_THE_WAY', timestamp: '2026-03-16T09:30:00Z', actorId: 'pro-001', actorRole: 'professional' },
      { status: 'CHECKED_IN', timestamp: '2026-03-16T09:55:00Z', actorId: 'pro-001', actorRole: 'professional' },
      { status: 'IN_PROGRESS', timestamp: '2026-03-16T10:00:00Z', actorId: 'pro-001', actorRole: 'professional' }
    ],
    priceBreakdown: {
      serviceBasePrice: 950,
      durationUnits: 1,
      subtotal: 950,
      taxesAndFees: 171, // 18% GST
      discount: 0,
      totalPrice: 1121,
      professionalEarning: 807.5,
      platformCommission: 142.5
    },
    paymentStatus: 'COMPLETED',
    specialInstructions: 'Patient uses walker. Please call when reaching security gate.',
    createdAt: '2026-03-15T14:00:00Z',
    updatedAt: '2026-03-16T10:00:00Z'
  },
  {
    id: 'bkg-002',
    bookingCode: 'BKG-2026-8820',
    clientId: 'clt-002',
    clientName: 'Priya Gowda',
    clientPhone: '+91-XXXXX-C0002',
    patientProfile: {
      id: 'pat-002-1',
      clientId: 'clt-002',
      firstName: 'Ramachandra',
      lastName: 'Gowda',
      relationship: 'parent',
      dateOfBirth: '1946-08-20',
      gender: 'male',
      mobilityStatus: 'wheelchair',
      createdAt: '2025-11-10T10:00:00Z'
    },
    serviceId: 'srv-nursing-elderly',
    serviceName: 'Senior Skilled Nursing Visit',
    serviceCategory: 'home_nursing',
    professionalId: 'pro-003',
    professionalName: 'Sunita Reddy, GNM',
    professionalPhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80&bkg=b2',
    address: {
      id: 'addr-002-1',
      label: 'Home',
      line1: 'No 45, 4th Main, 3rd Block',
      line2: 'Sector 62',
      city: 'New Delhi',
      state: 'Delhi NCR',
      pincode: '122002',
      latitude: 12.9250,
      longitude: 77.5897
    },
    scheduledDate: '2026-03-16',
    scheduledTimeSlot: '02:00 PM - 04:00 PM',
    durationHours: 2,
    status: 'ACCEPTED',
    statusHistory: [
      { status: 'DRAFT', timestamp: '2026-03-16T08:00:00Z', actorId: 'clt-002', actorRole: 'client' },
      { status: 'REQUESTED', timestamp: '2026-03-16T08:10:00Z', actorId: 'clt-002', actorRole: 'client' },
      { status: 'MATCHING', timestamp: '2026-03-16T08:10:05Z', actorId: 'sys', actorRole: 'super_admin' },
      { status: 'ASSIGNED', timestamp: '2026-03-16T08:12:00Z', actorId: 'sys', actorRole: 'super_admin' },
      { status: 'ACCEPTED', timestamp: '2026-03-16T08:15:00Z', actorId: 'pro-003', actorRole: 'professional' }
    ],
    priceBreakdown: {
      serviceBasePrice: 800,
      durationUnits: 2,
      subtotal: 1600,
      taxesAndFees: 288,
      discount: 100,
      totalPrice: 1788,
      professionalEarning: 1360,
      platformCommission: 240
    },
    paymentStatus: 'COMPLETED',
    createdAt: '2026-03-16T08:00:00Z',
    updatedAt: '2026-03-16T08:15:00Z'
  },
  {
    id: 'bkg-003',
    bookingCode: 'BKG-2026-8821',
    clientId: 'clt-001',
    clientName: 'Rahul Mehta',
    clientPhone: '+91-XXXXX-C0001',
    patientProfile: {
      id: 'pat-001-1',
      clientId: 'clt-001',
      firstName: 'Kamla',
      lastName: 'Mehta',
      relationship: 'parent',
      dateOfBirth: '1952-04-12',
      gender: 'female',
      createdAt: '2026-01-15T10:00:00Z'
    },
    serviceId: 'srv-nursing-elderly',
    serviceName: 'Senior Skilled Nursing Visit',
    serviceCategory: 'home_nursing',
    address: {
      id: 'addr-001-1',
      label: 'Home',
      line1: 'Flat 402, Sterling Residency',
      line2: 'Ring Road, Defence Colony',
      city: 'New Delhi',
      state: 'Delhi NCR',
      pincode: '110024',
      latitude: 12.9716,
      longitude: 77.5946
    },
    scheduledDate: '2026-03-17',
    scheduledTimeSlot: '11:00 AM - 12:00 PM',
    status: 'MATCHING',
    statusHistory: [
      { status: 'DRAFT', timestamp: '2026-03-16T11:00:00Z', actorId: 'clt-001', actorRole: 'client' },
      { status: 'REQUESTED', timestamp: '2026-03-16T11:05:00Z', actorId: 'clt-001', actorRole: 'client' },
      { status: 'MATCHING', timestamp: '2026-03-16T11:05:05Z', actorId: 'sys', actorRole: 'super_admin' }
    ],
    priceBreakdown: {
      serviceBasePrice: 1500,
      durationUnits: 1,
      subtotal: 1500,
      taxesAndFees: 270,
      discount: 0,
      totalPrice: 1770,
      professionalEarning: 1275,
      platformCommission: 225
    },
    paymentStatus: 'PENDING',
    createdAt: '2026-03-16T11:00:00Z',
    updatedAt: '2026-03-16T11:05:00Z'
  }
];

// ==========================================
// 6. PAYMENTS & PAYOUTS
// ==========================================

export const MOCK_PAYMENTS: Payment[] = [
  {
    id: 'pay-001',
    transactionId: 'TXN-9910-4412',
    bookingId: 'bkg-001',
    bookingCode: 'BKG-2026-8819',
    clientId: 'clt-001',
    clientName: 'Rahul Mehta',
    amount: 1121,
    paymentMethod: 'upi',
    paymentProviderTransactionId: 'UPI/6075192841/rahul@upi',
    status: 'COMPLETED',
    paidAt: '2026-03-15T14:05:00Z',
    createdAt: '2026-03-15T14:05:00Z'
  },
  {
    id: 'pay-002',
    transactionId: 'TXN-9910-4413',
    bookingId: 'bkg-002',
    bookingCode: 'BKG-2026-8820',
    clientId: 'clt-002',
    clientName: 'Priya Gowda',
    amount: 1788,
    paymentMethod: 'card',
    paymentProviderTransactionId: 'PG/CARD/8812941',
    status: 'COMPLETED',
    paidAt: '2026-03-16T08:10:00Z',
    createdAt: '2026-03-16T08:10:00Z'
  }
];

export const MOCK_PAYOUTS: Payout[] = [
  {
    id: 'pyt-001',
    payoutBatchId: 'BATCH-2026-W10',
    professionalId: 'pro-001',
    professionalName: 'Dr. Anjali Sharma, BPT',
    bankName: 'HDFC Bank',
    accountNumberMasked: 'XXXX-XXXX-4819',
    ifscCode: 'HDFC0000240',
    amount: 8450,
    bookingIds: ['bkg-010', 'bkg-012', 'bkg-014'],
    status: 'COMPLETED',
    processedAt: '2026-03-10T18:00:00Z',
    createdAt: '2026-03-10T09:00:00Z'
  },
  {
    id: 'pyt-002',
    payoutBatchId: 'BATCH-2026-W11',
    professionalId: 'pro-003',
    professionalName: 'Sunita Reddy, GNM',
    bankName: 'State Bank of India',
    accountNumberMasked: 'XXXX-XXXX-9912',
    ifscCode: 'SBIN0004812',
    amount: 11200,
    bookingIds: ['bkg-015', 'bkg-018'],
    status: 'PROCESSING',
    createdAt: '2026-03-15T09:00:00Z'
  }
];

// ==========================================
// 7. REVIEWS & SUPPORT TICKETS
// ==========================================

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'rev-001',
    bookingId: 'bkg-010',
    professionalId: 'pro-001',
    clientId: 'clt-001',
    clientName: 'Rahul Mehta',
    rating: 5,
    punctualityRating: 5,
    careQualityRating: 5,
    hygieneRating: 5,
    communicationRating: 5,
    comment: 'Dr. Anjali was extremely punctual and gentle during my mother post-knee surgery physio session. Highly recommended!',
    createdAt: '2026-03-08T14:30:00Z',
    isVerifiedVisit: true
  },
  {
    id: 'rev-002',
    bookingId: 'bkg-015',
    professionalId: 'pro-003',
    clientId: 'clt-002',
    clientName: 'Priya Gowda',
    rating: 5,
    punctualityRating: 5,
    careQualityRating: 5,
    hygieneRating: 5,
    communicationRating: 5,
    comment: 'Sunita care for my stroke-recovering father was outstanding. Very patient and attentive.',
    createdAt: '2026-03-12T16:00:00Z',
    isVerifiedVisit: true
  }
];

export const MOCK_SUPPORT_TICKETS: SupportTicket[] = [
  {
    id: 'tkt-001',
    ticketNumber: 'TKT-9912',
    creatorId: 'clt-001',
    creatorName: 'Rahul Mehta',
    creatorRole: 'client',
    bookingId: 'bkg-001',
    category: 'booking_issue',
    priority: 'medium',
    subject: 'Request to update instructions for today visit',
    description: 'Please inform Dr. Anjali that gate code is 4819.',
    status: 'RESOLVED',
    assignedAdminId: 'adm-001',
    assignedAdminName: 'Deepak Kumar',
    messages: [
      {
        id: 'msg-1',
        ticketId: 'tkt-001',
        senderId: 'clt-001',
        senderName: 'Rahul Mehta',
        senderRole: 'client',
        message: 'Please inform Dr. Anjali that gate code is 4819.',
        timestamp: '2026-03-16T09:10:00Z'
      },
      {
        id: 'msg-2',
        ticketId: 'tkt-001',
        senderId: 'adm-001',
        senderName: 'Deepak Kumar',
        senderRole: 'admin',
        message: 'Noted! I have passed the gate code to Dr. Anjali.',
        timestamp: '2026-03-16T09:15:00Z'
      }
    ],
    createdAt: '2026-03-16T09:10:00Z',
    updatedAt: '2026-03-16T09:15:00Z'
  }
];

// ==========================================
// 8. NOTIFICATIONS & AUDIT LOGS
// ==========================================

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif-001',
    userId: 'usr-clt-001',
    type: 'booking_status_change',
    title: 'Professional Checked In',
    body: 'Dr. Anjali Sharma has arrived and checked in for your post-op physio visit.',
    actionUrl: '/client/bookings/bkg-001',
    isRead: false,
    priority: 'high',
    createdAt: '2026-03-16T09:55:00Z'
  },
  {
    id: 'notif-002',
    userId: 'usr-pro-001',
    type: 'job_offer_received',
    title: 'New Visit Accepted',
    body: 'You accepted booking BKG-2026-8819 for 10:00 AM today.',
    actionUrl: '/pro/visits/bkg-001',
    isRead: true,
    priority: 'normal',
    createdAt: '2026-03-15T14:10:00Z'
  }
];

export const MOCK_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'aud-001',
    timestamp: '2026-03-16T10:00:00Z',
    actorId: 'pro-001',
    actorName: 'Dr. Anjali Sharma',
    actorRole: 'professional',
    action: 'BKG_SERVICE_STARTED',
    entityType: 'Booking',
    entityId: 'bkg-001',
    ipAddress: '106.51.24.12',
    details: 'Status changed from CHECKED_IN to IN_PROGRESS'
  }
];

export const MOCK_PLATFORM_SETTINGS: PlatformSettings = {
  platformName: 'Pulse n Care',
  defaultCommissionPercent: 15,
  jobAcceptanceTimeoutSeconds: 45,
  sessionTimeoutMinutes: 30,
  kycValidityMonths: 12,
  maxFileUploadMb: 10,
  minimumRestHours: 10,
  supportEmail: 'support@pulsen-care.com',
  supportPhone: '+91-80-4920-8800',
  demoMode: true
};

export const MOCK_SERVICE_AREAS: ServiceArea[] = [
  {
    id: 'area-delhi',
    name: 'Delhi (NCR Central & South)',
    city: 'Delhi',
    state: 'Delhi NCR',
    supportedPincodes: ['110001', '110002', '110003', '110016', '110017', '110019', '110020', '110024', '110048', '110065', '110070', '110075', '110091'],
    isActive: true,
    hubLocation: { latitude: 28.6139, longitude: 77.209, addressName: 'Connaught Place Operations Hub' },
    coveredRadiusKm: 25
  },
  {
    id: 'area-noida',
    name: 'Noida & Greater Noida',
    city: 'Noida',
    state: 'Uttar Pradesh',
    supportedPincodes: ['201301', '201303', '201304', '201307', '201309', '201310'],
    isActive: true,
    hubLocation: { latitude: 28.5355, longitude: 77.391, addressName: 'Noida Sector 62 Operations Hub' },
    coveredRadiusKm: 20
  },
  {
    id: 'area-gurugram',
    name: 'Gurugram / Gurgaon',
    city: 'Gurugram',
    state: 'Haryana',
    supportedPincodes: ['122001', '122002', '122003', '122011', '122018', '122051'],
    isActive: true,
    hubLocation: { latitude: 28.4595, longitude: 77.0266, addressName: 'Cyber City Operations Hub' },
    coveredRadiusKm: 22
  },
  {
    id: 'area-faridabad',
    name: 'Faridabad',
    city: 'Faridabad',
    state: 'Haryana',
    supportedPincodes: ['121001', '121002', '121003', '121004', '121006', '121007'],
    isActive: true,
    hubLocation: { latitude: 28.4089, longitude: 77.3178, addressName: 'Faridabad Sector 15 Operations Hub' },
    coveredRadiusKm: 18
  }
];

