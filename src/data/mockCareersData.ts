import type { JobPosting, JobApplication } from '../types';

export const MOCK_JOB_POSTINGS: JobPosting[] = [
  {
    id: 'job-hhc-nurse',
    jobCode: 'PNC-JOB-HHC-01',
    title: 'Home Healthcare Nurse (GNM / B.Sc Nursing)',
    roleCategory: 'registered_nurse',
    employmentType: 'full_time',
    location: 'Delhi NCR (Patient Residences)',
    experienceRequired: '1 – 3 Years in hospital or home care setting',
    qualifications: [
      'GNM (General Nursing and Midwifery) / B.Sc Nursing',
      'Active State Nursing Council Registration (DNC / INC / State Council)',
      'Basic Life Support (BLS) Preferred'
    ],
    salaryRange: '₹22,000 – ₹35,000 / month (+ ₹10,000 Sign-In Bonus)',
    description: 'Provide professional bedside nursing care, monitor patient vitals, administer medications, assist in post-operative recovery, and handle medical equipment at patient residences across Delhi NCR.',
    responsibilities: [
      'Provide professional bedside nursing care following treating doctor guidelines.',
      'Routinely monitor and record patient vital signs (BP, Pulse, Temperature, SpO2, and Blood Sugar).',
      'Accurately administer oral, IV, and IM medications as prescribed.',
      'Assist in post-operative recovery, sterile surgical wound dressing, and suture monitoring.',
      'Manage tracheostomy hygiene, Foley catheter care, and Ryle tube / PEG feedings.',
      'Operate home medical equipment safely and maintain comprehensive shift reports.'
    ],
    requirements: [
      'GNM or B.Sc Nursing degree from a recognized institution with valid council registration.',
      '1 to 3 years of clinical bedside experience in hospital wards or managed home care settings.',
      'Demonstrated skills in patient assessment, IV/IM administration, wound dressing, and catheter care.',
      'Fluent verbal communication in Hindi and functional English.',
      'Punctual, empathetic bedside manner and dedication to patient dignity.'
    ],
    benefits: [
      'Fixed monthly salary (₹22,000 – ₹35,000) with guaranteed on-time bank transfers.',
      '₹10,000 Sign-In Bonus upon successful onboarding and milestone completion.',
      'Designated clinical support desk and emergency medical officer backup.',
      'Verified patient assignments with clear care scopes across Delhi NCR.'
    ],
    isOpen: true,
    applicantCount: 24,
    postedAt: '2026-10-30T09:00:00Z',
  },
  {
    id: 'job-icu-nurse',
    jobCode: 'PNC-JOB-ICU-02',
    title: 'Critical Care / ICU Trained Nurse',
    roleCategory: 'icu_nurse',
    employmentType: 'full_time',
    location: 'Delhi NCR (High-Dependency Patient Residences)',
    experienceRequired: '2+ Years of ICU / HDU experience in an accredited hospital',
    qualifications: [
      'B.Sc Nursing / Post Basic B.Sc / GNM with Critical Care Training',
      'Active Nursing Council Registration',
      'ICU / CCU Protocol Certification'
    ],
    salaryRange: '₹30,000 – ₹45,000 / month (+ ₹10,000 Sign-In Bonus)',
    description: 'Manage bedridden or critically ill patients at home, oversee ventilators/BIPAP/oxygen concentrators, handle emergencies, and maintain clinical reports.',
    responsibilities: [
      'Provide intensive bedside care for bedridden or critically ill patients in home settings.',
      'Oversee mechanical ventilators, BIPAP/CPAP circuits, and oxygen concentrators.',
      'Execute sterile endotracheal / tracheostomy suctioning and central line maintenance.',
      'Promptly recognize patient distress, handle emergencies, and execute structured escalation protocols.',
      'Maintain rigorous digital vitals ledgers and daily clinical handover reports for family and doctors.'
    ],
    requirements: [
      'Minimum 2 years of proven bedside experience in an accredited hospital ICU, CCU, or HDU.',
      'Hands-on expertise in ICU/CCU protocols, ventilator monitoring, and emergency response.',
      'Valid Nursing Council Registration certificate.',
      'Resident of Delhi NCR or ready to deploy across assigned NCR care clusters.'
    ],
    benefits: [
      'Top-tier monthly salary (₹30,000 – ₹45,000) based on experience and acuity skill.',
      '₹10,000 Sign-In Bonus upon completing initial onboarding cycle.',
      'High-acuity case allowances and travel subsidies for residential assignments.',
      'Supportive NRI-funded healthcare startup culture with professional growth.'
    ],
    isOpen: true,
    applicantCount: 16,
    postedAt: '2026-10-30T09:00:00Z',
  }
];

export const MOCK_JOB_APPLICATIONS: JobApplication[] = [
  {
    id: 'app-2026-101',
    applicationNumber: 'APP-2026-101',
    jobId: 'job-icu-nurse',
    jobTitle: 'Critical Care / ICU Trained Nurse',
    jobCode: 'PNC-JOB-ICU-02',
    fullName: 'Pooja Verma',
    email: 'pooja.verma.nurse@gmail.com',
    phone: '+91-98710-55421',
    gender: 'female',
    dateOfBirth: '1995-07-14',
    qualification: 'B.Sc Nursing (Critical Care)',
    experienceYears: 4,
    currentOrganization: 'Max Super Speciality Hospital, Saket',
    noticePeriodDays: 15,
    resumeUrl: '/documents/resumes/pooja_verma_cv.pdf',
    resumeFileName: 'Pooja_Verma_CV.pdf',
    status: 'interview_scheduled',
    adminNotes: '4 years of Medical ICU experience. Expert in ventilator settings and tracheostomy care. Eligible for ₹10,000 sign-in bonus.',
    interviewScheduledAt: '2026-11-02T11:00:00Z',
    appliedAt: '2026-10-30T14:20:00Z',
    updatedAt: '2026-10-30T16:00:00Z',
  },
  {
    id: 'app-2026-102',
    applicationNumber: 'APP-2026-102',
    jobId: 'job-hhc-nurse',
    jobTitle: 'Home Healthcare Nurse (GNM / B.Sc Nursing)',
    jobCode: 'PNC-JOB-HHC-01',
    fullName: 'Sunil Kumar Sharma',
    email: 'sunil.sharma.gnm@gmail.com',
    phone: '+91-99581-22871',
    gender: 'male',
    dateOfBirth: '1997-03-22',
    qualification: 'GNM Diploma',
    experienceYears: 2,
    currentOrganization: 'Fortis Hospital, Noida',
    noticePeriodDays: 7,
    resumeUrl: '/documents/resumes/sunil_sharma_gnm.pdf',
    resumeFileName: 'Sunil_Sharma_GNM.pdf',
    status: 'screening',
    adminNotes: 'Experienced in surgical wound care and elderly patient vitals monitoring. Cleared initial screening.',
    appliedAt: '2026-10-30T11:15:00Z',
    updatedAt: '2026-10-30T11:15:00Z',
  }
];
