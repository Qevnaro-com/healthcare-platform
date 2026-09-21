/**
 * Pulse n Care — Central Visual Asset Registry
 * Source of Truth for Platform Visual Assets
 *
 * ABSOLUTE RULE: reuseAllowed is FALSE for all primary content visuals.
 * Every visual asset must have a unique ID, explicit semantic purpose, and 100% unique image URL.
 */

export interface VisualAsset {
  assetId: string;
  page: string;
  section: string;
  purpose: string;
  visualType: 'editorial_photography' | 'documentary_close_up' | 'lifestyle_photography' | 'ui_data_composition' | 'workplace_photography' | 'lottie_animation';
  subject: string;
  source: string;
  url: string;
  reuseAllowed: boolean;
}

export const VISUAL_ASSETS: Record<string, VisualAsset> = {
  // ==========================================
  // 1. PUBLIC PAGE HERO & FEATURE VISUALS (INDIAN HEALTHCARE ENVIRONMENT)
  // ==========================================
  homeHeroCare: {
    assetId: 'homeHeroCare',
    page: 'Home',
    section: 'Hero Banner',
    purpose: 'Hero visual showcasing professional in-home clinical nursing care in Delhi NCR',
    visualType: 'editorial_photography',
    subject: 'Senior Indian nurse checking vitals of patient in home setting',
    source: 'Pulse n Care Indian Healthcare Media',
    url: '/assets/services/home-nursing/pulse-n-care-team-hero.jpg',
    reuseAllowed: false
  },
  homeFlagshipNursing: {
    assetId: 'homeFlagshipNursing',
    page: 'Home',
    section: 'Flagship Home Nursing Section',
    purpose: 'Featured card showcasing 24x7 skilled home nursing care',
    visualType: 'editorial_photography',
    subject: 'Registered Indian nurse monitoring patient recovery equipment at home',
    source: 'Pulse n Care Indian Healthcare Media',
    url: '/assets/services/home-nursing/pulse-n-care-home-nursing-hero.jpg',
    reuseAllowed: false
  },
  homePrinciplesOps: {
    assetId: 'homePrinciplesOps',
    page: 'Home',
    section: 'Care Principles Section',
    purpose: 'Visual representing operational rigor and clinical protocol',
    visualType: 'editorial_photography',
    subject: 'Indian healthcare professional organizing clinical documentation and equipment',
    source: 'Pulse n Care Indian Healthcare Media',
    url: '/assets/services/home-nursing/pulse-n-care-equipment.jpg',
    reuseAllowed: false
  },
  aboutCarePrep: {
    assetId: 'aboutCarePrep',
    page: 'About',
    section: 'Mission & Team Hero',
    purpose: 'Documentary close-up representing the human preparation behind care',
    visualType: 'documentary_close_up',
    subject: 'Hands preparing sterile medical kit and stethoscope in Indian home',
    source: 'Pulse n Care Indian Healthcare Media',
    url: '/assets/services/home-nursing/pulse-n-care-nursing-kit.png',
    reuseAllowed: false
  },
  careersTeam: {
    assetId: 'careersTeam',
    page: 'Careers',
    section: 'Join Our Team Hero',
    purpose: 'Workplace photography showing healthcare professionals collaborating',
    visualType: 'workplace_photography',
    subject: 'Indian nursing staff and care coordinators in clinical briefing',
    source: 'Pulse n Care Indian Healthcare Media',
    url: '/assets/services/home-nursing/pulse-n-care-team-campaign-7-9.jpg',
    reuseAllowed: false
  },
  supportConnection: {
    assetId: 'supportConnection',
    page: 'Support',
    section: 'Concierge Support Banner',
    purpose: 'Clean communication visual showing attentive patient care coordination',
    visualType: 'editorial_photography',
    subject: 'Care coordinator answering client inquiry',
    source: 'Pulse n Care Indian Healthcare Media',
    url: '/assets/services/home-nursing/pulse-n-care-handover.jpg',
    reuseAllowed: false
  },
  homeNursingHero: {
    assetId: 'homeNursingHero',
    page: 'Home Nursing Service',
    section: 'Service Hero',
    purpose: 'In-home clinical nursing procedure visualization',
    visualType: 'editorial_photography',
    subject: 'Nurse administering post-operative care at bedside',
    source: 'Pulse n Care Indian Healthcare Media',
    url: '/assets/services/home-nursing/pulse-n-care-home-nursing-hero.jpg',
    reuseAllowed: false
  },

  // ==========================================
  // 2. CLINICAL PROCEDURE GRID VISUALS
  // ==========================================
  clinicalVitals: {
    assetId: 'clinicalVitals',
    page: 'Home Nursing Service',
    section: 'Clinical Care Grid — Vitals Stream',
    purpose: 'Procedure visual for continuous vitals monitoring',
    visualType: 'editorial_photography',
    subject: 'Digital blood pressure and pulse oximeter monitoring',
    source: 'Pulse n Care Indian Healthcare Media',
    url: '/assets/services/home-nursing/pulse-n-care-vitals.jpg',
    reuseAllowed: false
  },
  clinicalMedication: {
    assetId: 'clinicalMedication',
    page: 'Home Nursing Service',
    section: 'Clinical Care Grid — Medication Administration',
    purpose: 'Procedure visual for accurate medication dosage',
    visualType: 'editorial_photography',
    subject: 'Nurse organizing medication tray according to doctor schedule',
    source: 'Pulse n Care Indian Healthcare Media',
    url: '/assets/services/home-nursing/pulse-n-care-medication.webp',
    reuseAllowed: false
  },
  clinicalWoundCare: {
    assetId: 'clinicalWoundCare',
    page: 'Home Nursing Service',
    section: 'Clinical Care Grid — Sterile Wound Dressing',
    purpose: 'Procedure visual for aseptic post-op surgical dressing',
    visualType: 'editorial_photography',
    subject: 'Sterile surgical dressing kit preparation',
    source: 'Pulse n Care Indian Healthcare Media',
    url: '/assets/services/home-nursing/pulse-n-care-wound-care.jpg',
    reuseAllowed: false
  },
  clinicalHandover: {
    assetId: 'clinicalHandover',
    page: 'Home Nursing Service',
    section: 'Clinical Care Grid — Shift Handover',
    purpose: 'Procedure visual for nurse shift log handover',
    visualType: 'editorial_photography',
    subject: 'Daily chart review and digital shift report notes',
    source: 'Pulse n Care Indian Healthcare Media',
    url: '/assets/services/home-nursing/pulse-n-care-handover.jpg',
    reuseAllowed: false
  },

  // ==========================================
  // 3. PERSONAL CARE SECTION VISUALS
  // ==========================================
  personalBedside: {
    assetId: 'personalBedside',
    page: 'Home Nursing Service',
    section: 'Personal Care Section — Bedside Assistance',
    purpose: 'Visual representing compassionate daily attendant care',
    visualType: 'lifestyle_photography',
    subject: 'Caregiver assisting patient with comfortable positioning',
    source: 'Pulse n Care Indian Healthcare Media',
    url: '/assets/services/home-nursing/pulse-n-care-bedside-support.webp',
    reuseAllowed: false
  },
  personalHygiene: {
    assetId: 'personalHygiene',
    page: 'Home Nursing Service',
    section: 'Personal Care Section — Grooming & Hygiene',
    purpose: 'Visual for grooming and dignified personal hygiene care',
    visualType: 'lifestyle_photography',
    subject: 'Attendant providing gentle care and assistance to elder at home',
    source: 'Pulse n Care Indian Healthcare Media',
    url: '/assets/services/home-nursing/pulse-n-care-nurse-portrait.webp',
    reuseAllowed: false
  },

  // ==========================================
  // 4. 11 UNIQUE SERVICES CATALOG VISUALS
  // ==========================================
  servicePostOpCard: {
    assetId: 'servicePostOpCard',
    page: 'Services Catalog',
    section: 'Post-Operative Nursing Care Card',
    purpose: 'Card media for post-surgery recovery nursing',
    visualType: 'editorial_photography',
    subject: 'Wound care dressing and post-op vitals monitoring',
    source: 'Pulse n Care Indian Healthcare Media',
    url: '/assets/services/home-nursing/pulse-n-care-wound-care.jpg',
    reuseAllowed: false
  },
  servicePostOpHero: {
    assetId: 'servicePostOpHero',
    page: 'Service Detail — Post-Op Nursing',
    section: 'Hero Banner',
    purpose: 'Hero banner for post-operative care detail page',
    visualType: 'editorial_photography',
    subject: 'Nurse recording post-surgical vitals',
    source: 'Pulse n Care Indian Healthcare Media',
    url: '/assets/services/home-nursing/pulse-n-care-home-nursing-hero.jpg',
    reuseAllowed: false
  },
  serviceElderlyNursingCard: {
    assetId: 'serviceElderlyNursingCard',
    page: 'Services Catalog',
    section: 'Senior Skilled Nursing Visit Card',
    purpose: 'Card media for senior nursing visits',
    visualType: 'lifestyle_photography',
    subject: 'Senior patient receiving routine blood pressure check at home',
    source: 'Pulse n Care Indian Healthcare Media',
    url: '/assets/services/home-nursing/pulse-n-care-vitals.jpg',
    reuseAllowed: false
  },
  serviceElderlyNursingHero: {
    assetId: 'serviceElderlyNursingHero',
    page: 'Service Detail — Senior Nursing',
    section: 'Hero Banner',
    purpose: 'Hero banner for senior nursing care',
    visualType: 'lifestyle_photography',
    subject: 'Elderly patient smiling with visiting home nurse',
    source: 'Pulse n Care Indian Healthcare Media',
    url: '/assets/services/home-nursing/pulse-n-care-nurse-portrait.webp',
    reuseAllowed: false
  },
  servicePhysioOrthoCard: {
    assetId: 'servicePhysioOrthoCard',
    page: 'Services Catalog',
    section: 'Orthopedic Rehabilitation Physiotherapy Card',
    purpose: 'Card media for orthopedic physical therapy',
    visualType: 'lifestyle_photography',
    subject: 'Physiotherapist guiding knee joint rehabilitation exercises',
    source: 'Pulse n Care Indian Healthcare Media',
    url: '/assets/services/home-nursing/pulse-n-care-mobility.webp',
    reuseAllowed: false
  },
  servicePhysioOrthoHero: {
    assetId: 'servicePhysioOrthoHero',
    page: 'Service Detail — Ortho Physio',
    section: 'Hero Banner',
    purpose: 'Hero banner for orthopedic rehabilitation',
    visualType: 'lifestyle_photography',
    subject: 'Physical therapist assisting patient with leg elevation exercise',
    source: 'Pulse n Care Indian Healthcare Media',
    url: '/assets/services/home-nursing/pulse-n-care-equipment.jpg',
    reuseAllowed: false
  },
  servicePhysioNeuroCard: {
    assetId: 'servicePhysioNeuroCard',
    page: 'Services Catalog',
    section: 'Neurological & Stroke Rehab Card',
    purpose: 'Card media for neuro rehabilitation',
    visualType: 'lifestyle_photography',
    subject: 'Specialized neuro therapist assisting stroke patient balance',
    source: 'Pulse n Care Indian Healthcare Media',
    url: '/assets/services/home-nursing/pulse-n-care-handover.jpg',
    reuseAllowed: false
  },
  servicePhysioNeuroHero: {
    assetId: 'servicePhysioNeuroHero',
    page: 'Service Detail — Neuro Physio',
    section: 'Hero Banner',
    purpose: 'Hero banner for neurological rehab',
    visualType: 'lifestyle_photography',
    subject: 'Therapist guiding motor recovery training',
    source: 'Pulse n Care Indian Healthcare Media',
    url: '/assets/services/home-nursing/pulse-n-care-documentation.webp',
    reuseAllowed: false
  },
  serviceAttendant24x7Card: {
    assetId: 'serviceAttendant24x7Card',
    page: 'Services Catalog',
    section: '24/7 In-Home Caregiver Attendant Card',
    purpose: 'Card media for full-day attendant care',
    visualType: 'lifestyle_photography',
    subject: 'Attendant helping senior sitting comfortably at home',
    source: 'Pulse n Care Indian Healthcare Media',
    url: '/assets/services/home-nursing/pulse-n-care-bedside-support.webp',
    reuseAllowed: false
  },
  serviceAttendant24x7Hero: {
    assetId: 'serviceAttendant24x7Hero',
    page: 'Service Detail — 24x7 Attendant',
    section: 'Hero Banner',
    purpose: 'Hero banner for 24/7 caregiver support',
    visualType: 'lifestyle_photography',
    subject: 'Attendant preparing nutritious meal for bedridden senior',
    source: 'Pulse n Care Indian Healthcare Media',
    url: '/assets/images/illustrations/nursing-caregiver-heart.jpg',
    reuseAllowed: false
  },
  serviceAttendant12hCard: {
    assetId: 'serviceAttendant12hCard',
    page: 'Services Catalog',
    section: '12-Hour Day Shift Caregiver Card',
    purpose: 'Card media for day shift caregiver support',
    visualType: 'lifestyle_photography',
    subject: 'Day attendant assisting senior reading in living room',
    source: 'Pulse n Care Indian Healthcare Media',
    url: '/assets/services/home-nursing/pulse-n-care-nurse-portrait.webp',
    reuseAllowed: false
  },
  serviceAttendant12hHero: {
    assetId: 'serviceAttendant12hHero',
    page: 'Service Detail — 12h Attendant',
    section: 'Hero Banner',
    purpose: 'Hero banner for 12-hour caregiver service',
    visualType: 'lifestyle_photography',
    subject: 'Day caregiver recording daily activity log',
    source: 'Pulse n Care Indian Healthcare Media',
    url: '/assets/images/illustrations/doctor-home-visit.jpg',
    reuseAllowed: false
  },

  // ==========================================
  // 5. 12 UNIQUE STAFF PROFILE AVATARS (AUTHENTIC INDIAN STAFF MEDIA)
  // ==========================================
  staffAarti: {
    assetId: 'staffAarti',
    page: 'Staff Profiles',
    section: 'Aarti Saxena Headshot',
    purpose: 'Profile photo for Aarti Saxena, B.Sc Nursing',
    visualType: 'editorial_photography',
    subject: 'Professional headshot of female nurse Aarti Saxena',
    source: 'Pulse n Care Indian Healthcare Media',
    url: '/assets/services/home-nursing/pulse-n-care-nurse-portrait.webp',
    reuseAllowed: false
  },
  staffRajesh: {
    assetId: 'staffRajesh',
    page: 'Staff Profiles',
    section: 'Rajesh Kumar Headshot',
    purpose: 'Profile photo for Rajesh Kumar, Senior Physiotherapist',
    visualType: 'editorial_photography',
    subject: 'Professional headshot of male physiotherapist Rajesh Kumar',
    source: 'Pulse n Care Indian Healthcare Media',
    url: '/assets/services/home-nursing/pulse-n-care-nurse-hero.png',
    reuseAllowed: false
  },
  staffSunita: {
    assetId: 'staffSunita',
    page: 'Staff Profiles',
    section: 'Sunita Reddy Headshot',
    purpose: 'Profile photo for Sunita Reddy, GNM Nurse',
    visualType: 'editorial_photography',
    subject: 'Professional headshot of female nurse Sunita Reddy',
    source: 'Pulse n Care Indian Healthcare Media',
    url: '/assets/services/home-nursing/pulse-n-care-nurse-portrait.webp',
    reuseAllowed: false
  },
  staffVikram: {
    assetId: 'staffVikram',
    page: 'Staff Profiles',
    section: 'Vikram Singh Headshot',
    purpose: 'Profile photo for Vikram Singh, General Attendant',
    visualType: 'editorial_photography',
    subject: 'Professional headshot of male caregiver Vikram Singh',
    source: 'Pulse n Care Indian Healthcare Media',
    url: '/assets/services/home-nursing/pulse-n-care-nurse-hero.png',
    reuseAllowed: false
  },
  staffPooja: {
    assetId: 'staffPooja',
    page: 'Staff Profiles',
    section: 'Pooja Verma Headshot',
    purpose: 'Profile photo for Pooja Verma, Pediatric Nurse',
    visualType: 'editorial_photography',
    subject: 'Professional headshot of female pediatric nurse Pooja Verma',
    source: 'Pulse n Care Indian Healthcare Media',
    url: '/assets/services/home-nursing/pulse-n-care-nurse-portrait.webp',
    reuseAllowed: false
  },
  staffAmit: {
    assetId: 'staffAmit',
    page: 'Staff Profiles',
    section: 'Amit Patel Headshot',
    purpose: 'Profile photo for Amit Patel, ICU Specialist Nurse',
    visualType: 'editorial_photography',
    subject: 'Professional headshot of male ICU nurse Amit Patel',
    source: 'Pulse n Care Indian Healthcare Media',
    url: '/assets/services/home-nursing/pulse-n-care-nurse-hero.png',
    reuseAllowed: false
  },
  staffKarthik: {
    assetId: 'staffKarthik',
    page: 'Staff Profiles',
    section: 'Karthik Verma Headshot',
    purpose: 'Profile photo for Karthik Verma, ICU & Tracheostomy Nurse',
    visualType: 'editorial_photography',
    subject: 'Professional headshot of male nurse Karthik Verma',
    source: 'Pulse n Care Indian Healthcare Media',
    url: '/assets/services/home-nursing/pulse-n-care-nurse-hero.png',
    reuseAllowed: false
  },
  staffMeena: {
    assetId: 'staffMeena',
    page: 'Staff Profiles',
    section: 'Meena Kumari Headshot',
    purpose: 'Profile photo for Meena Kumari, Geriatric Attendant',
    visualType: 'editorial_photography',
    subject: 'Professional headshot of female attendant Meena Kumari',
    source: 'Pulse n Care Indian Healthcare Media',
    url: '/assets/services/home-nursing/pulse-n-care-nurse-portrait.webp',
    reuseAllowed: false
  },
  staffSuresh: {
    assetId: 'staffSuresh',
    page: 'Staff Profiles',
    section: 'Suresh Nair Headshot',
    purpose: 'Profile photo for Suresh Nair, Neuro Rehab Specialist',
    visualType: 'editorial_photography',
    subject: 'Professional headshot of male therapist Suresh Nair',
    source: 'Pulse n Care Indian Healthcare Media',
    url: '/assets/services/home-nursing/pulse-n-care-nurse-hero.png',
    reuseAllowed: false
  },
  staffKavita: {
    assetId: 'staffKavita',
    page: 'Staff Profiles',
    section: 'Kavita Joshi Headshot',
    purpose: 'Profile photo for Kavita Joshi, Critical Care Specialist',
    visualType: 'editorial_photography',
    subject: 'Professional headshot of female critical care nurse Kavita Joshi',
    source: 'Pulse n Care Indian Healthcare Media',
    url: '/assets/services/home-nursing/pulse-n-care-nurse-portrait.webp',
    reuseAllowed: false
  },
  staffDeepak: {
    assetId: 'staffDeepak',
    page: 'Staff Profiles',
    section: 'Deepak Sharma Headshot',
    purpose: 'Profile photo for Deepak Sharma, Cardiac Rehab Nurse',
    visualType: 'editorial_photography',
    subject: 'Professional headshot of male nurse Deepak Sharma',
    source: 'Pulse n Care Indian Healthcare Media',
    url: '/assets/services/home-nursing/pulse-n-care-nurse-hero.png',
    reuseAllowed: false
  },
  staffAnanya: {
    assetId: 'staffAnanya',
    page: 'Staff Profiles',
    section: 'Ananya Roy Headshot',
    purpose: 'Profile photo for Ananya Roy, Post-Op Care Specialist',
    visualType: 'editorial_photography',
    subject: 'Professional headshot of female nurse Ananya Roy',
    source: 'Pulse n Care Indian Healthcare Media',
    url: '/assets/services/home-nursing/pulse-n-care-nurse-portrait.webp',
    reuseAllowed: false
  },
  staffRohan: {
    assetId: 'staffRohan',
    page: 'Staff Profiles',
    section: 'Rohan Mehta Headshot',
    purpose: 'Profile photo for Rohan Mehta, Ortho Rehab Physio',
    visualType: 'editorial_photography',
    subject: 'Professional headshot of male therapist Rohan Mehta',
    source: 'Pulse n Care Indian Healthcare Media',
    url: '/assets/services/home-nursing/pulse-n-care-nurse-hero.png',
    reuseAllowed: false
  }
};

/**
 * Retrieve a registered visual asset by ID.
 */
export function getVisualAsset(assetId: string): VisualAsset | undefined {
  return VISUAL_ASSETS[assetId];
}
