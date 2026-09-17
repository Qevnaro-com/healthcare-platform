import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useBookings } from '../../context/BookingContext';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { HealthcareTexture } from '../../components/common/HealthcareTexture';
import { LocationPicker } from '../../components/domain/LocationPicker';
import type { LocationData } from '../../components/domain/LocationPicker';
import { SavedPatientSelector } from '../../components/domain/SavedPatientSelector';
import {
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Clock,
  ShieldCheck,
  Moon,
  Sparkles,
  Loader2,
  Check
} from 'lucide-react';
import { clsx } from 'clsx';
import type { Service, PatientProfile } from '../../types';
import { validateNCRServiceLocation } from '../../data/serviceAreaMatrix';

const DRAFT_STORAGE_KEY = 'pulsen_care_b2c_booking_draft_v3';

export const BookingWizardPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { services, createBooking } = useBookings();
  const { currentUser, switchRole } = useAuth();

  const initialServiceId = searchParams.get('serviceId') || services[0]?.id;

  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<Service>(
    services.find((s) => s.id === initialServiceId) || services[0]
  );

  // Step 2: Contextual Care Requirements & Tasks
  const [careCategory, setCareCategory] = useState<string>('post_surgery');
  const [selectedTasks, setSelectedTasks] = useState<string[]>([
    'Vital signs monitoring & logging',
    'Medication timely administration',
    'Hygiene & bathing support'
  ]);
  const [physioAffectedArea, setPhysioAffectedArea] = useState<string>('Knee Joint (Post-TKR)');
  const [physioMobilityStatus, setPhysioMobilityStatus] = useState<string>('Walker Assisted');
  const [doctorComplaint, setDoctorComplaint] = useState<string>('Post-Hospitalization Follow-up & Vitals Assessment');

  // Step 3: Patient Profile
  const [patient, setPatient] = useState<PatientProfile>({
    id: 'pat-001',
    clientId: currentUser?.id || 'clt-001',
    firstName: 'Kamla',
    lastName: 'Mehta',
    relationship: 'parent',
    dateOfBirth: '1958-05-14',
    gender: 'female',
    medicalNotes: 'Post-op total knee replacement (TKR), Type-2 Diabetes',
    mobilityStatus: 'assisted',
    allergies: ['Penicillin'],
    createdAt: new Date().toISOString()
  });

  // Step 4: Location & NCR Validation
  const [locationData, setLocationData] = useState<LocationData>({
    addressType: 'Home Apartment',
    line1: 'A-124, Defence Colony',
    line2: 'Near Lajpat Nagar Metro Station',
    landmark: 'Opposite Flyover Pillar 14',
    city: 'New Delhi',
    state: 'Delhi NCR',
    pincode: '110024',
    accessNotes: 'Elevator active 24/7. Visitor parking inside gate.',
    latitude: 28.6139,
    longitude: 77.2090,
    isVerified: true
  });

  // Step 5: Schedule & Recurrence
  const [scheduleType, setScheduleType] = useState<'single' | 'range' | 'recurring'>('range');
  const [startDate, setStartDate] = useState('2026-03-20');
  const [endDate, setEndDate] = useState('2026-03-27');
  const [recurringDays, setRecurringDays] = useState<string[]>(['Mon', 'Wed', 'Fri']);

  // Step 6: Time & Shift Type
  const [shiftType, setShiftType] = useState('Night Shift (10 PM - 8 AM)');
  const [timeSlot, setTimeSlot] = useState('10:00 PM - 08:00 AM');
  const [durationHours, setDurationHours] = useState(10);

  // Step 7: Staff Preferences
  const [preferredRole, setPreferredRole] = useState('B.Sc Registered Nurse');
  const [preferredGender, setPreferredGender] = useState<'no_preference' | 'female' | 'male'>('female');
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(['English', 'Hindi']);

  // Step 8: Special Instructions & Medical Equipment
  const [specialInstructions, setSpecialInstructions] = useState(
    'Patient needs gentle handling for left leg movement. Require strict aseptic dressing for surgical incision.'
  );
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>(['Hospital Bed', 'Oxygen Cylinder']);

  // Step 10: Auth Gate & Dispatch Simulation State
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authPhone, setAuthPhone] = useState('');
  const [authOtp, setAuthOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [assignmentState, setAssignmentState] = useState<'reviewing' | 'finding' | 'assigned'>('reviewing');
  const [assignedStaff, setAssignedStaff] = useState<any>(null);

  // Load draft from localStorage & location query params on mount
  useEffect(() => {
    const locParam = searchParams.get('location');
    if (locParam) {
      const decodedLoc = decodeURIComponent(locParam).trim();
      if (decodedLoc) {
        const pinMatch = decodedLoc.match(/\b\d{6}\b/);
        const pin = pinMatch ? pinMatch[0] : '';
        const validation = validateNCRServiceLocation(decodedLoc, pin);
        const matchedCity = validation.matchedHub
          ? (validation.matchedHub.city === 'Delhi' ? 'New Delhi' : validation.matchedHub.city)
          : (decodedLoc.toLowerCase().includes('gurugram') || decodedLoc.toLowerCase().includes('gurgaon')
            ? 'Gurugram'
            : decodedLoc.toLowerCase().includes('noida')
            ? 'Noida'
            : decodedLoc.toLowerCase().includes('faridabad')
            ? 'Faridabad'
            : 'New Delhi');

        const cleanLine1 = decodedLoc.replace(/\(\d{6}\)/, '').trim();

        setLocationData((prev) => ({
          ...prev,
          line1: cleanLine1 || prev.line1,
          city: matchedCity,
          pincode: pin || (validation.matchedHub ? validation.matchedHub.pincodePrefixes[0] : prev.pincode),
          isVerified: true
        }));
      }
    }

    try {
      const savedDraft = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (savedDraft) {
        const parsed = JSON.parse(savedDraft);
        if (parsed.step) setStep(parsed.step);
        if (parsed.selectedServiceId) {
          const srv = services.find((s) => s.id === parsed.selectedServiceId);
          if (srv) setSelectedService(srv);
        }
        if (parsed.careCategory) setCareCategory(parsed.careCategory);
        if (parsed.selectedTasks) setSelectedTasks(parsed.selectedTasks);
        if (parsed.patient) setPatient(parsed.patient);
        if (parsed.locationData && !locParam) setLocationData(parsed.locationData);
        if (parsed.scheduleType) setScheduleType(parsed.scheduleType);
        if (parsed.startDate) setStartDate(parsed.startDate);
        if (parsed.endDate) setEndDate(parsed.endDate);
        if (parsed.recurringDays) setRecurringDays(parsed.recurringDays);
        if (parsed.shiftType) setShiftType(parsed.shiftType);
        if (parsed.timeSlot) setTimeSlot(parsed.timeSlot);
        if (parsed.durationHours) setDurationHours(parsed.durationHours);
        if (parsed.preferredRole) setPreferredRole(parsed.preferredRole);
        if (parsed.preferredGender) setPreferredGender(parsed.preferredGender);
        if (parsed.selectedLanguages) setSelectedLanguages(parsed.selectedLanguages);
        if (parsed.specialInstructions) setSpecialInstructions(parsed.specialInstructions);
        if (parsed.selectedEquipment) setSelectedEquipment(parsed.selectedEquipment);
      }
    } catch (e) {
      console.error('Failed to parse saved draft:', e);
    }
  }, [services, searchParams]);

  // Save draft state on changes
  useEffect(() => {
    const draftPayload = {
      step,
      selectedServiceId: selectedService.id,
      careCategory,
      selectedTasks,
      patient,
      locationData,
      scheduleType,
      startDate,
      endDate,
      recurringDays,
      shiftType,
      timeSlot,
      durationHours,
      preferredRole,
      preferredGender,
      selectedLanguages,
      specialInstructions,
      selectedEquipment
    };
    try {
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draftPayload));
    } catch (e) {
      console.error('Failed to save draft:', e);
    }
  }, [
    step,
    selectedService,
    careCategory,
    selectedTasks,
    patient,
    locationData,
    scheduleType,
    startDate,
    endDate,
    recurringDays,
    shiftType,
    timeSlot,
    durationHours,
    preferredRole,
    preferredGender,
    selectedLanguages,
    specialInstructions,
    selectedEquipment
  ]);

  // Pricing Calculations
  const calculateDaysCount = () => {
    if (scheduleType === 'single') return 1;
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    const diffDays = Math.ceil(Math.abs(end - start) / (1000 * 60 * 60 * 24)) + 1;
    return isNaN(diffDays) || diffDays < 1 ? 1 : diffDays;
  };

  const daysCount = calculateDaysCount();
  const isNightShift = shiftType.toLowerCase().includes('night');
  const baseRatePerDay = selectedService.pricing.basePrice * (durationHours > 8 ? 1 : 0.85);
  const subtotalBeforeNight = Math.round(baseRatePerDay * daysCount);
  const nightSurcharge = isNightShift ? Math.round(subtotalBeforeNight * 0.2) : 0;
  const subtotal = subtotalBeforeNight + nightSurcharge;
  const gst = Math.round(subtotal * 0.18);
  const grandTotal = subtotal + gst;

  // Night Shift Date Rollover Calculator
  const calculateNightRollover = () => {
    const nextDay = new Date(startDate);
    nextDay.setDate(nextDay.getDate() + 1);
    const nextDayStr = nextDay.toISOString().split('T')[0];
    return { nextDayStr };
  };
  const { nextDayStr } = calculateNightRollover();

  const handleTaskToggle = (task: string) => {
    if (selectedTasks.includes(task)) {
      setSelectedTasks(selectedTasks.filter((t) => t !== task));
    } else {
      setSelectedTasks([...selectedTasks, task]);
    }
  };

  const handleEquipmentToggle = (item: string) => {
    if (selectedEquipment.includes(item)) {
      setSelectedEquipment(selectedEquipment.filter((e) => e !== item));
    } else {
      setSelectedEquipment([...selectedEquipment, item]);
    }
  };

  const handleLanguageToggle = (lang: string) => {
    if (selectedLanguages.includes(lang)) {
      setSelectedLanguages(selectedLanguages.filter((l) => l !== lang));
    } else {
      setSelectedLanguages([...selectedLanguages, lang]);
    }
  };

  const handleInitiateSubmit = () => {
    if (!currentUser) {
      setShowAuthModal(true);
    } else {
      executeSubmission();
    }
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpSent) {
      if (authPhone.length >= 10) setOtpSent(true);
    } else {
      // Simulate quick OTP verification & client login
      switchRole('client');
      setShowAuthModal(false);
      executeSubmission();
    }
  };

  const executeSubmission = () => {
    setSubmitting(true);
    setAssignmentState('reviewing');

    setTimeout(() => {
      setAssignmentState('finding');
    }, 1600);

    setTimeout(() => {
      setAssignmentState('assigned');
      setAssignedStaff({
        displayName: 'Priya Sharma, RN',
        qualification: 'B.Sc Nursing (KNC Reg #88419)',
        experienceYears: 6,
        photo: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=300&q=80',
        employeeId: 'EMP-1042',
        rating: 4.9,
        activeHub: 'South Delhi Operations Center'
      });
    }, 3600);
  };

  const handleFinalRedirect = () => {
    localStorage.removeItem(DRAFT_STORAGE_KEY);
    const newBooking = createBooking({
      service: selectedService,
      patient,
      address: {
        id: `addr-${Date.now()}`,
        label: locationData.addressType,
        line1: locationData.line1,
        line2: locationData.line2,
        landmark: locationData.landmark,
        city: locationData.city,
        state: locationData.state,
        pincode: locationData.pincode,
        latitude: locationData.latitude || 28.6139,
        longitude: locationData.longitude || 77.2090
      },
      scheduledDate: startDate,
      scheduledTimeSlot: timeSlot,
      durationHours,
      careTasks: selectedTasks,
      shiftType,
      dateRange: {
        startDate,
        endDate: scheduleType === 'single' ? startDate : endDate,
        isRecurring: scheduleType === 'recurring',
        recurringDays
      },
      staffPreferences: {
        role: preferredRole,
        gender: preferredGender,
        languages: selectedLanguages
      },
      specialInstructions
    });

    navigate(`/client/bookings/${newBooking.id}`);
  };

  const stepsList = [
    '1. Service',
    '2. Care Tasks',
    '3. Patient',
    '4. Location',
    '5. Dates',
    '6. Shift',
    '7. Staff Prefs',
    '8. Notes',
    '9. Price',
    '10. Review'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left relative bg-white pb-24 lg:pb-8">
      <HealthcareTexture type="care-pathway" opacity={0.03} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border-default pb-4 gap-3">
        <div>
          <span className="text-xs font-extrabold text-brand-teal uppercase tracking-widest flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-brand-teal" /> Care Concierge Guided Experience
          </span>
          <h1 className="text-2xl font-extrabold text-text-primary">Schedule Managed Clinical Home Care</h1>
          <p className="text-xs text-text-muted mt-0.5">
            Specify patient requirements. Pulse n Care Operations assigns qualified internal staff in Delhi NCR.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-text-secondary bg-canvas-tertiary px-3.5 py-1.5 rounded-full border border-border-default">
            Step {step} of 10
          </span>
        </div>
      </div>

      {/* Stepper Progress Bar */}
      <div className="grid grid-cols-5 md:grid-cols-10 gap-1.5">
        {stepsList.map((label, idx) => {
          const stepNum = idx + 1;
          const isActive = step === stepNum;
          const isDone = step > stepNum;

          return (
            <button
              key={label}
              onClick={() => isDone && setStep(stepNum)}
              disabled={!isDone && !isActive}
              className="text-left space-y-1 focus:outline-none disabled:cursor-not-allowed cursor-pointer"
            >
              <div
                className={clsx(
                  'h-2 rounded-full transition-all',
                  isDone && 'bg-brand-teal',
                  isActive && 'bg-brand-teal ring-2 ring-brand-teal/30 animate-pulse',
                  !isDone && !isActive && 'bg-border-default'
                )}
              />
              <span
                className={clsx(
                  'text-[10px] font-bold block truncate',
                  isActive ? 'text-brand-teal font-extrabold' : isDone ? 'text-text-primary' : 'text-text-muted'
                )}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Step Interactive Decision Card */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="p-6 space-y-6 border-border-default shadow-subtle bg-white">
            {/* STEP 1: Service Selection */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-extrabold text-text-primary">Step 1: Select Home Care Service</h2>
                  <p className="text-xs text-text-muted">Select from our internal clinical & caregiver workforce catalog.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {services.map((srv) => {
                    const isSelected = selectedService.id === srv.id;
                    return (
                      <div
                        key={srv.id}
                        onClick={() => setSelectedService(srv)}
                        className={clsx(
                          'p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between space-y-3',
                          isSelected
                            ? 'border-brand-teal bg-canvas-teal ring-2 ring-brand-teal/20 shadow-xs'
                            : 'border-border-default bg-white hover:border-border-hover'
                        )}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-extrabold text-text-primary text-sm">{srv.name}</span>
                            {isSelected && <CheckCircle2 className="w-5 h-5 text-brand-teal shrink-0" />}
                          </div>
                          <p className="text-xs text-text-secondary line-clamp-2">{srv.shortDescription}</p>
                        </div>
                        <div className="flex items-center justify-between border-t border-border-light pt-2 text-xs">
                          <span className="text-text-muted font-medium">{srv.estimatedDuration}</span>
                          <span className="font-extrabold text-brand-teal">From ₹{srv.pricing.basePrice}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 2: Smart Contextual Care Requirements */}
            {step === 2 && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-lg font-extrabold text-text-primary">Step 2: Smart Care Requirement & Specific Tasks</h2>
                  <p className="text-xs text-text-muted">Customized questions based on your selected service category.</p>
                </div>

                {/* Service Category: Nursing */}
                {selectedService.category === 'home_nursing' && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">Primary Clinical Focus</label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {[
                          { id: 'post_surgery', label: 'Post-Surgery Recovery' },
                          { id: 'elderly_nursing', label: 'Elderly Nursing Care' },
                          { id: 'icu_transition', label: 'ICU / High-Dependency Setup' },
                          { id: 'wound_care', label: 'Wound Care & Dressing' },
                          { id: 'chronic_care', label: 'Chronic Disease Support' },
                          { id: 'palliative', label: 'Palliative Care' }
                        ].map((cat) => (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => setCareCategory(cat.id)}
                            className={clsx(
                              'p-3 rounded-xl border text-xs font-bold text-center cursor-pointer transition-all',
                              careCategory === cat.id
                                ? 'bg-brand-teal text-white border-brand-teal shadow-xs'
                                : 'bg-canvas-secondary border-border-default text-text-primary hover:border-border-hover'
                            )}
                          >
                            {cat.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2 pt-2">
                      <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">
                        Required Nursing Tasks & Clinical Procedures
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {[
                          'Sterile surgical wound dressing & drain care',
                          'Vital signs monitoring & digital chart logging',
                          'Medication timely administration (Oral / Injections)',
                          'IV infusion / IM injection & drip management',
                          'Ryle tube / PEG tube feeding assistance',
                          'Urinary catheter care & bag management',
                          'Tracheostomy care & suctioning support',
                          'Bedsore prevention & position rotation schedule'
                        ].map((task) => {
                          const isChecked = selectedTasks.includes(task);
                          return (
                            <div
                              key={task}
                              onClick={() => handleTaskToggle(task)}
                              className={clsx(
                                'p-3 rounded-xl border cursor-pointer flex items-center justify-between text-xs font-semibold transition-all',
                                isChecked
                                  ? 'bg-canvas-teal border-brand-teal text-brand-teal font-bold'
                                  : 'bg-white border-border-default text-text-secondary hover:border-border-hover'
                              )}
                            >
                              <span>{task}</span>
                              <div
                                className={clsx(
                                  'w-4 h-4 rounded flex items-center justify-center border',
                                  isChecked ? 'bg-brand-teal border-brand-teal text-white' : 'border-border-hover'
                                )}
                              >
                                {isChecked && <CheckCircle2 className="w-3 h-3 text-white" />}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* Service Category: Physiotherapy */}
                {selectedService.category === 'physiotherapy' && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">Affected Area / Target Joint</label>
                      <select
                        value={physioAffectedArea}
                        onChange={(e) => setPhysioAffectedArea(e.target.value)}
                        className="w-full h-11 px-3 text-sm bg-white border border-border-default rounded-xl focus:border-brand-teal focus:outline-none"
                      >
                        <option value="Knee Joint (Post-TKR)">Knee Joint (Post-TKR Surgery)</option>
                        <option value="Hip Joint (Post-THR)">Hip Joint (Post-THR Replacement)</option>
                        <option value="Shoulder / Frozen Shoulder">Shoulder / Frozen Shoulder Rehab</option>
                        <option value="Spine / Lumbar Back">Spine / Lumbar Back Pain</option>
                        <option value="Post-Stroke Neuro Mobility">Post-Stroke Neuro Mobility & Gait</option>
                        <option value="Parkinson Mobility">Parkinson Motor Skills Rehab</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">Patient Current Mobility Status</label>
                      <div className="grid grid-cols-2 gap-2.5">
                        {['Bedridden', 'Wheelchair Bound', 'Walker Assisted', 'Independent Step'].map((mob) => (
                          <button
                            key={mob}
                            type="button"
                            onClick={() => setPhysioMobilityStatus(mob)}
                            className={clsx(
                              'p-3 rounded-xl border text-xs font-bold text-center cursor-pointer transition-all',
                              physioMobilityStatus === mob
                                ? 'bg-brand-teal text-white border-brand-teal shadow-xs'
                                : 'bg-canvas-secondary border-border-default text-text-primary'
                            )}
                          >
                            {mob}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Service Category: Doctor Visit */}
                {selectedService.category === 'doctor_visit' && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">Chief Medical Complaint / Purpose</label>
                      <input
                        type="text"
                        value={doctorComplaint}
                        onChange={(e) => setDoctorComplaint(e.target.value)}
                        className="w-full h-11 px-3 text-sm bg-white border border-border-default rounded-xl focus:border-brand-teal focus:outline-none"
                        placeholder="e.g., High fever review, post-hospitalization check, medication audit..."
                      />
                    </div>
                  </div>
                )}

                {/* Service Category: Caregiver / Attendant */}
                {selectedService.category === 'caregiver_attendant' && (
                  <div className="space-y-4">
                    <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">Bedside Attendant Duties</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {[
                        'Bedside hygiene & daily sponge bath',
                        'Oral feeding & hydration assistance',
                        'Diaper changes & commode assistance',
                        'Position rotation & bed transfer support',
                        'Walking assistance & mobility guard',
                        'Night supervision & bed alarm monitoring'
                      ].map((task) => {
                        const isChecked = selectedTasks.includes(task);
                        return (
                          <div
                            key={task}
                            onClick={() => handleTaskToggle(task)}
                            className={clsx(
                              'p-3 rounded-xl border cursor-pointer flex items-center justify-between text-xs font-semibold transition-all',
                              isChecked
                                ? 'bg-canvas-teal border-brand-teal text-brand-teal font-bold'
                                : 'bg-white border-border-default text-text-secondary hover:border-border-hover'
                            )}
                          >
                            <span>{task}</span>
                            <div
                              className={clsx(
                                'w-4 h-4 rounded flex items-center justify-center border',
                                isChecked ? 'bg-brand-teal border-brand-teal text-white' : 'border-border-hover'
                              )}
                            >
                              {isChecked && <CheckCircle2 className="w-3 h-3 text-white" />}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* STEP 3: Patient Selection */}
            {step === 3 && (
              <SavedPatientSelector
                selectedPatientId={patient.id}
                onSelectPatient={(selected) => setPatient(selected)}
              />
            )}

            {/* STEP 4: Location & Access */}
            {step === 4 && (
              <LocationPicker
                value={locationData}
                onChange={(updated) => setLocationData(updated)}
              />
            )}

            {/* STEP 5: Dates & Recurrence */}
            {step === 5 && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-lg font-extrabold text-text-primary">Step 5: Schedule & Recurrence Pattern</h2>
                  <p className="text-xs text-text-muted">Choose single visits, contiguous dates, or recurring weekly shifts.</p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'single', label: 'Single Day Visit', desc: 'One-off appointment' },
                    { id: 'range', label: 'Contiguous Dates', desc: 'Multiple consecutive days' },
                    { id: 'recurring', label: 'Weekly Recurring', desc: 'Selected days every week' }
                  ].map((st) => (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => setScheduleType(st.id as any)}
                      className={clsx(
                        'p-3.5 rounded-xl border text-left cursor-pointer transition-all space-y-1',
                        scheduleType === st.id
                          ? 'border-brand-teal bg-canvas-teal ring-2 ring-brand-teal/20'
                          : 'border-border-default bg-white hover:border-border-hover'
                      )}
                    >
                      <span className="text-xs font-extrabold text-text-primary block">{st.label}</span>
                      <span className="text-[10px] text-text-muted block">{st.desc}</span>
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">Start Date</label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full h-11 px-3 text-sm bg-white border border-border-default rounded-xl focus:border-brand-teal focus:outline-none"
                    />
                  </div>

                  {scheduleType !== 'single' && (
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">End Date</label>
                      <input
                        type="date"
                        value={endDate}
                        min={startDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full h-11 px-3 text-sm bg-white border border-border-default rounded-xl focus:border-brand-teal focus:outline-none"
                      />
                    </div>
                  )}
                </div>

                {scheduleType === 'recurring' && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">
                        Select Weekdays
                      </label>
                      <span className="text-xs font-extrabold text-brand-teal">
                        {daysCount} Shifts Total
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => {
                        const isSelected = recurringDays.includes(day);
                        return (
                          <button
                            key={day}
                            type="button"
                            onClick={() => {
                              if (isSelected) setRecurringDays(recurringDays.filter((d) => d !== day));
                              else setRecurringDays([...recurringDays, day]);
                            }}
                            className={clsx(
                              'w-10 h-10 rounded-xl text-xs font-bold border flex items-center justify-center cursor-pointer transition-all',
                              isSelected
                                ? 'bg-brand-teal text-white border-brand-teal'
                                : 'bg-canvas-secondary border-border-default text-text-secondary'
                            )}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* STEP 6: Shift Timing & Night Rollover UX */}
            {step === 6 && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-lg font-extrabold text-text-primary">Step 6: Shift Timing & Overnight Rollover</h2>
                  <p className="text-xs text-text-muted">Choose your shift timing. Night shifts calculate overnight date rollover automatically.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { label: 'Night Shift (10 PM - 8 AM)', time: '10:00 PM - 08:00 AM', hours: 10, isNight: true },
                    { label: 'Day Shift (12 Hours)', time: '08:00 AM - 08:00 PM', hours: 12 },
                    { label: 'Half Day (6 Hours)', time: '08:00 AM - 02:00 PM', hours: 6 },
                    { label: '24-Hour Live-in Care', time: 'Round the Clock (24h)', hours: 24 }
                  ].map((s) => (
                    <div
                      key={s.label}
                      onClick={() => {
                        setShiftType(s.label);
                        setTimeSlot(s.time);
                        setDurationHours(s.hours);
                      }}
                      className={clsx(
                        'p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between',
                        shiftType === s.label
                          ? 'border-brand-teal bg-canvas-teal ring-2 ring-brand-teal/20'
                          : 'border-border-default bg-white hover:border-border-hover'
                      )}
                    >
                      <div>
                        <span className="font-extrabold text-text-primary text-xs flex items-center gap-1.5">
                          {s.isNight && <Moon className="w-4 h-4 text-amber-500" />} {s.label}
                        </span>
                        <span className="text-[11px] text-text-muted flex items-center gap-1 mt-1">
                          <Clock className="w-3 h-3 text-brand-teal" /> {s.time}
                        </span>
                      </div>
                      {shiftType === s.label && <CheckCircle2 className="w-5 h-5 text-brand-teal" />}
                    </div>
                  ))}
                </div>

                {/* Night Shift Rollover Card */}
                {isNightShift && (
                  <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 space-y-1">
                    <span className="font-extrabold block flex items-center gap-1.5">
                      <Moon className="w-4 h-4 text-amber-600" /> Overnight Shift Schedule Banner
                    </span>
                    <p className="font-medium">
                      Shift Start: <span className="font-bold">{startDate} 10:00 PM</span> → Shift End: <span className="font-bold">{nextDayStr} 08:00 AM</span> (Duration: 10 Hours)
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* STEP 7: Staff Preferences */}
            {step === 7 && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-lg font-extrabold text-text-primary">Step 7: Staff Qualification & Preferences</h2>
                  <p className="text-xs text-text-muted">Define preferences for internal staff assignment.</p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">
                    Required Staff Qualification / Role
                  </label>
                  <select
                    value={preferredRole}
                    onChange={(e) => setPreferredRole(e.target.value)}
                    className="w-full h-11 px-3 text-sm bg-white border border-border-default rounded-xl focus:border-brand-teal focus:outline-none"
                  >
                    <option value="B.Sc Registered Nurse">B.Sc Registered Nurse (RN)</option>
                    <option value="GNM Staff Nurse">GNM Staff Nurse</option>
                    <option value="Certified Caregiver">Certified Bedside Caregiver / Attendant</option>
                    <option value="Senior Physiotherapist">Senior Physiotherapist (BPT/MPT)</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">
                      Staff Gender Preference
                    </label>
                    <select
                      value={preferredGender}
                      onChange={(e) => setPreferredGender(e.target.value as any)}
                      className="w-full h-11 px-3 text-sm bg-white border border-border-default rounded-xl focus:border-brand-teal focus:outline-none"
                    >
                      <option value="female">Female Staff Preferred</option>
                      <option value="male">Male Staff Preferred</option>
                      <option value="no_preference">No Preference (First Available)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">
                      Languages Spoken
                    </label>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {['English', 'Hindi', 'Punjabi', 'Bengali'].map((lang) => {
                        const isSelected = selectedLanguages.includes(lang);
                        return (
                          <button
                            key={lang}
                            type="button"
                            onClick={() => handleLanguageToggle(lang)}
                            className={clsx(
                              'px-3 py-1.5 rounded-full text-xs font-bold border cursor-pointer transition-all',
                              isSelected
                                ? 'bg-canvas-teal text-brand-teal border-teal-300'
                                : 'bg-white text-text-secondary border-border-default'
                            )}
                          >
                            {lang}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 8: Special Instructions & Equipment */}
            {step === 8 && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-lg font-extrabold text-text-primary">Step 8: Special Instructions & Medical Equipment</h2>
                  <p className="text-xs text-text-muted">Clinical handling notes and equipment at home.</p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">
                    Care Notes for Assigned Nurse / Caregiver
                  </label>
                  <textarea
                    rows={4}
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    className="w-full p-3.5 text-sm bg-white border border-border-default rounded-xl focus:border-brand-teal focus:outline-none"
                    placeholder="Enter any special requests, diet instructions, or patient behavioral tips..."
                  />
                </div>

                <div className="space-y-2 pt-2">
                  <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">
                    Medical Equipment Available at Home
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {[
                      'Hospital Bed',
                      'Oxygen Cylinder',
                      'Wheelchair',
                      'Patient Lift',
                      'Suction Machine',
                      'Multipara Monitor'
                    ].map((eq) => {
                      const isChecked = selectedEquipment.includes(eq);
                      return (
                        <button
                          key={eq}
                          type="button"
                          onClick={() => handleEquipmentToggle(eq)}
                          className={clsx(
                            'p-3 rounded-xl border text-xs font-semibold flex items-center justify-between cursor-pointer transition-all',
                            isChecked
                              ? 'bg-canvas-teal border-brand-teal text-brand-teal font-bold'
                              : 'bg-white border-border-default text-text-secondary'
                          )}
                        >
                          <span>{eq}</span>
                          {isChecked && <Check className="w-3.5 h-3.5 text-brand-teal" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 9: Transparent Price Breakdown */}
            {step === 9 && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-lg font-extrabold text-text-primary">Step 9: Price Estimate Breakdown</h2>
                  <p className="text-xs text-text-muted">Transparent itemized pricing for your care request.</p>
                </div>

                <div className="bg-canvas-secondary p-5 rounded-2xl border border-border-default space-y-3 text-xs">
                  <div className="flex justify-between font-extrabold text-text-primary text-sm border-b border-border-default pb-2">
                    <span>{selectedService.name} ({shiftType})</span>
                    <span>₹{subtotalBeforeNight}</span>
                  </div>
                  <div className="flex justify-between text-text-secondary">
                    <span>Duration & Shifts</span>
                    <span>{daysCount} Day(s) × {durationHours} Hours</span>
                  </div>
                  {isNightShift && (
                    <div className="flex justify-between text-amber-700 font-semibold">
                      <span>Night Shift Adjustment (+20%)</span>
                      <span>₹{nightSurcharge}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-text-secondary">
                    <span>GST (18% Statutory Tax)</span>
                    <span>₹{gst}</span>
                  </div>
                  <div className="flex justify-between font-extrabold text-brand-teal text-base border-t border-border-default pt-2">
                    <span>Estimated Total Amount</span>
                    <span>₹{grandTotal}</span>
                  </div>
                </div>

                <p className="text-[11px] text-text-muted italic">
                  * Final amount verified by Operations Desk. No hidden fees or cash demands at home.
                </p>
              </div>
            )}

            {/* STEP 10: Review & Post-Submission Interactive Tracker */}
            {step === 10 && (
              <div className="space-y-6">
                {!submitting ? (
                  <div className="space-y-5">
                    <div>
                      <h2 className="text-lg font-extrabold text-text-primary">Step 10: Review & Submit Request</h2>
                      <p className="text-xs text-text-muted">Review your booking details before submitting to Pulse n Care Operations.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="p-4 bg-canvas-secondary rounded-xl border border-border-default space-y-2">
                        <span className="font-bold text-text-primary block border-b border-border-light pb-1">
                          Service & Patient
                        </span>
                        <p className="font-extrabold text-text-primary">{selectedService.name}</p>
                        <p className="text-text-muted">Patient: {patient.firstName} {patient.lastName} ({patient.relationship})</p>
                      </div>

                      <div className="p-4 bg-canvas-secondary rounded-xl border border-border-default space-y-2">
                        <span className="font-bold text-text-primary block border-b border-border-light pb-1">
                          Location & Schedule
                        </span>
                        <p className="font-semibold text-text-primary">{locationData.line1}, {locationData.city}</p>
                        <p className="text-text-muted">{startDate} • {shiftType}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Post-Submission Animated Operations Tracker */
                  <div className="p-6 bg-canvas-teal rounded-3xl border border-teal-200 text-center space-y-6">
                    <div className="w-16 h-16 rounded-full bg-brand-teal text-white flex items-center justify-center mx-auto shadow-lg animate-pulse">
                      {assignmentState === 'assigned' ? <CheckCircle2 className="w-8 h-8" /> : <Loader2 className="w-8 h-8 animate-spin" />}
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-xl font-extrabold text-teal-950">
                        {assignmentState === 'assigned' ? 'Staff Successfully Assigned!' : 'Your Request is with Operations'}
                      </h3>
                      <p className="text-xs text-teal-800">
                        {assignmentState === 'assigned'
                          ? 'Your care team is confirmed for dispatch.'
                          : 'Matching rule engine is selecting available internal staff...'}
                      </p>
                    </div>

                    {/* Timeline Progression */}
                    <div className="flex justify-between items-center max-w-md mx-auto text-[11px] font-bold">
                      <span className="text-emerald-700">Request Received ✓</span>
                      <span className={assignmentState !== 'reviewing' ? 'text-emerald-700' : 'text-teal-900'}>Reviewing ✓</span>
                      <span className={assignmentState === 'assigned' ? 'text-emerald-700' : 'text-brand-teal animate-pulse'}>
                        {assignmentState === 'assigned' ? 'Staff Assigned ✓' : 'Finding Staff...'}
                      </span>
                    </div>

                    {/* Assigned Staff Reveal Card */}
                    {assignedStaff && (
                      <div className="p-4 bg-white rounded-2xl border border-teal-300 shadow-subtle flex items-center justify-between text-left animate-in zoom-in duration-300">
                        <div className="flex items-center gap-3">
                          <img src={assignedStaff.photo} alt="" className="w-12 h-12 rounded-xl object-cover border border-teal-200" />
                          <div>
                            <span className="font-extrabold text-text-primary text-sm flex items-center gap-1">
                              {assignedStaff.displayName} <ShieldCheck className="w-4 h-4 text-brand-teal" />
                            </span>
                            <span className="text-xs text-text-muted block">{assignedStaff.qualification}</span>
                            <span className="text-[10px] font-mono font-bold text-brand-teal">Staff ID: {assignedStaff.employeeId}</span>
                          </div>
                        </div>
                        <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                          CONFIRMED
                        </span>
                      </div>
                    )}

                    {assignedStaff && (
                      <Button
                        onClick={handleFinalRedirect}
                        variant="primary"
                        className="bg-brand-teal hover:bg-brand-teal-hover text-white font-bold px-8 py-3 rounded-xl cursor-pointer"
                      >
                        View Active Care Booking Detail
                      </Button>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Stepper Footer Controls */}
            {!submitting && (
              <div className="flex justify-between items-center border-t border-border-default pt-4">
                <Button
                  variant="secondary"
                  onClick={() => step > 1 && setStep(step - 1)}
                  disabled={step === 1}
                  leftIcon={<ArrowLeft className="w-4 h-4" />}
                  className="cursor-pointer"
                >
                  Back
                </Button>

                {step < 10 ? (
                  <Button
                    variant="primary"
                    onClick={() => setStep(step + 1)}
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                    className="bg-brand-teal hover:bg-brand-teal-hover text-white font-bold cursor-pointer"
                  >
                    Continue to Step {step + 1}
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    onClick={handleInitiateSubmit}
                    leftIcon={<CheckCircle2 className="w-4 h-4" />}
                    className="bg-brand-teal hover:bg-brand-teal-hover text-white font-bold px-8 py-3 cursor-pointer shadow-subtle text-sm"
                  >
                    Submit Care Request
                  </Button>
                )}
              </div>
            )}
          </Card>
        </div>

        {/* Live Persistent Desktop Booking Summary Sidebar */}
        <div className="lg:col-span-4">
          <div className="bg-white p-5 rounded-2xl border border-border-default shadow-subtle space-y-4 sticky top-6 text-left">
            <h3 className="font-extrabold text-text-primary text-sm border-b border-border-light pb-2 uppercase tracking-wider">
              Live Care Request Summary
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-text-muted font-medium">Service:</span>
                <span className="font-bold text-text-primary text-right">{selectedService.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted font-medium">Patient:</span>
                <span className="font-bold text-text-primary">{patient.firstName} {patient.lastName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted font-medium">Location:</span>
                <span className="font-semibold text-text-primary text-right">{locationData.city} ({locationData.addressType})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted font-medium">Start Date:</span>
                <span className="font-bold text-text-primary">{startDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted font-medium">Shift:</span>
                <span className="font-bold text-brand-teal">{shiftType}</span>
              </div>

              {/* Itemized Price Presentation */}
              <div className="border-t border-border-default pt-3 space-y-1.5">
                <div className="flex justify-between text-text-secondary">
                  <span>Base Service ({daysCount} d)</span>
                  <span>₹{subtotalBeforeNight}</span>
                </div>
                {isNightShift && (
                  <div className="flex justify-between text-amber-700 font-semibold">
                    <span>Night Shift Adjustment</span>
                    <span>₹{nightSurcharge}</span>
                  </div>
                )}
                <div className="flex justify-between text-text-secondary">
                  <span>GST (18%)</span>
                  <span>₹{gst}</span>
                </div>
                <div className="flex justify-between font-extrabold text-text-primary text-sm pt-2 border-t border-border-light">
                  <span>Estimated Total</span>
                  <span className="text-brand-teal text-base">₹{grandTotal}</span>
                </div>
              </div>
            </div>

            <div className="bg-canvas-teal p-3 rounded-xl border border-teal-200 flex items-center gap-2 text-[11px] text-teal-800 font-semibold">
              <ShieldCheck className="w-4 h-4 text-brand-teal shrink-0" />
              <span>Assigned staff background checked & council verified.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Sticky Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border-default p-4 flex items-center justify-between z-40 shadow-lg">
        <div>
          <span className="text-[10px] text-text-muted block font-bold uppercase">Step {step} of 10</span>
          <span className="text-sm font-extrabold text-brand-teal">₹{grandTotal}</span>
        </div>
        {step < 10 ? (
          <Button
            variant="primary"
            onClick={() => setStep(step + 1)}
            className="bg-brand-teal text-white font-bold text-xs py-2 px-5 rounded-xl cursor-pointer"
          >
            Step {step + 1} →
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={handleInitiateSubmit}
            className="bg-brand-teal text-white font-bold text-xs py-2 px-5 rounded-xl cursor-pointer"
          >
            Submit Request
          </Button>
        )}
      </div>

      {/* Late Auth Modal Gate */}
      <Modal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        title="Confirm Client Identity"
        maxWidth="md"
      >
        <div className="space-y-4 text-left">
          <p className="text-xs text-text-secondary">
            Please enter your mobile number to receive an instant OTP verification before submitting your care request.
          </p>
          <form onSubmit={handleAuthSubmit} className="space-y-3">
            <div>
              <label className="text-xs font-bold text-text-secondary block mb-1">Mobile Number (+91)</label>
              <input
                type="tel"
                value={authPhone}
                onChange={(e) => setAuthPhone(e.target.value)}
                placeholder="9876543210"
                required
                className="w-full h-11 px-3 text-sm border border-border-default rounded-xl focus:border-brand-teal focus:outline-none"
              />
            </div>

            {otpSent && (
              <div>
                <label className="text-xs font-bold text-text-secondary block mb-1">6-Digit OTP</label>
                <input
                  type="text"
                  value={authOtp}
                  onChange={(e) => setAuthOtp(e.target.value)}
                  placeholder="123456"
                  required
                  className="w-full h-11 px-3 text-sm border border-border-default rounded-xl focus:border-brand-teal focus:outline-none"
                />
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              className="w-full bg-brand-teal hover:bg-brand-teal-hover text-white font-bold h-11 rounded-xl cursor-pointer"
            >
              {otpSent ? 'Verify OTP & Continue' : 'Send OTP'}
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
};
