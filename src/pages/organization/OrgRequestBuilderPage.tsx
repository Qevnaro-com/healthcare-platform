import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Input } from '../../components/common/Input';
import { HealthcareTexture } from '../../components/common/HealthcareTexture';
import { MOCK_B2B_REQUESTS } from '../../data/mockB2BData';
import type { StaffingRequirementLine, OrganizationStaffingRequest } from '../../types';
import {
  Plus,
  Trash2,
  CheckCircle2,
  Send,
  ChevronRight,
  ChevronLeft,
  Building2,
  Clock,
  ShieldCheck,
} from 'lucide-react';

export const OrgRequestBuilderPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [submittedReqNo, setSubmittedReqNo] = useState<string | null>(null);

  // STEP 1: BASICS STATE
  const [requestTitle, setRequestTitle] = useState('September ICU & Recovery Staffing');
  const [facilityName, setFacilityName] = useState('Max Super Speciality Hospital, Saket');
  const [department, setDepartment] = useState('Cardiac ICU Ward 4');
  const [requestType, setRequestType] = useState<'monthly_retainer' | 'per_shift' | 'emergency_deployment'>('monthly_retainer');
  const [contactName, setContactName] = useState('Dr. Rakesh Sharma');
  const [contactDesignation, setContactDesignation] = useState('Nursing Superintendent');
  const [contactPhone, setContactPhone] = useState('+91-98112-99012');
  const [contactEmail, setContactEmail] = useState('rakesh.sharma@maxhealthcare.in');

  // STEP 2: MULTI-LINE REQUIREMENTS STATE
  const [requirementLines, setRequirementLines] = useState<StaffingRequirementLine[]>([
    {
      id: 'line-1',
      roleCategory: 'icu_nurse',
      roleCategoryTitle: 'ICU / Cardiac Critical Care Nurse',
      requiredCount: 4,
      assignedCount: 0,
      shiftType: '12h_day',
      requiredQualifications: ['B.Sc Nursing', 'BLS/ACLS Certified', 'Min 3 Yrs ICU Experience'],
      genderPreference: 'female',
      agreedDailyRate: 3200,
    },
    {
      id: 'line-2',
      roleCategory: 'icu_nurse',
      roleCategoryTitle: 'ICU / Critical Care Night Nurse',
      requiredCount: 4,
      assignedCount: 0,
      shiftType: '12h_night',
      requiredQualifications: ['B.Sc Nursing', 'ACLS Mandatory'],
      genderPreference: 'no_preference',
      agreedDailyRate: 3400,
    },
    {
      id: 'line-3',
      roleCategory: 'physiotherapist',
      roleCategoryTitle: 'Physiotherapy Specialist',
      requiredCount: 2,
      assignedCount: 0,
      shiftType: '8h_general',
      requiredQualifications: ['BPT / MPT', 'Post-op Rehab Specialist'],
      genderPreference: 'no_preference',
      agreedDailyRate: 2800,
    },
  ]);

  // STEP 3: SCHEDULE STATE
  const [scheduleType, setScheduleType] = useState<'date_range' | 'one_time' | 'recurring'>('date_range');
  const [startDate, setStartDate] = useState('2026-09-20');
  const [endDate, setEndDate] = useState('2026-10-20');

  // STEP 4: SKILLS STATE
  const [selectedSkills, setSelectedSkills] = useState<string[]>([
    'ICU Ventilator Care',
    'ACLS Certified',
    'Patient Vital Monitoring',
    'Tracheostomy Care',
  ]);

  // STEP 5: FACILITY DETAILS STATE
  const [facilityAddress, setFacilityAddress] = useState('1, 2 Press Enclave Marg, Saket Institutional Area, New Delhi - 110017');
  const [reportingLocation, setReportingLocation] = useState('Nursing Superintendent Office, 3rd Floor');
  const [supervisorName, setSupervisorName] = useState('Sr. Mary Kurien');
  const [scrubRequirement, setScrubRequirement] = useState('PNC Sterile Blue Scrubs mandatory for all assigned staff.');
  const [specialInstructions, setSpecialInstructions] = useState('Staff must report 15 minutes prior to shift start for clinical briefing and handover.');

  const skillOptions = [
    'ICU Ventilator Care',
    'ACLS Certified',
    'BLS Certified',
    'Patient Vital Monitoring',
    'Tracheostomy Care',
    'Central Line Care',
    'Catheter Care',
    'IV Infusion Pump Care',
    'Post-op Wound Care',
    'Stroke Rehabilitation',
  ];

  // Requirement Lines Handlers
  const handleAddRequirementLine = () => {
    const newLine: StaffingRequirementLine = {
      id: `line-${Date.now()}`,
      roleCategory: 'registered_nurse',
      roleCategoryTitle: 'General Ward Registered Nurse',
      requiredCount: 2,
      assignedCount: 0,
      shiftType: '12h_day',
      requiredQualifications: ['GNM / B.Sc Nursing'],
      genderPreference: 'no_preference',
      agreedDailyRate: 2800,
    };
    setRequirementLines([...requirementLines, newLine]);
  };

  const handleUpdateRequirementLine = (id: string, field: keyof StaffingRequirementLine, value: any) => {
    setRequirementLines((prev) =>
      prev.map((line) => {
        if (line.id === id) {
          const updated = { ...line, [field]: value };
          if (field === 'roleCategory') {
            if (value === 'icu_nurse') updated.roleCategoryTitle = 'ICU / Critical Care Nurse';
            else if (value === 'registered_nurse') updated.roleCategoryTitle = 'General Ward Registered Nurse';
            else if (value === 'physiotherapist') updated.roleCategoryTitle = 'Physiotherapy Specialist';
            else if (value === 'caregiver_attendant') updated.roleCategoryTitle = 'Clinical Nursing Attendant';
          }
          return updated;
        }
        return line;
      })
    );
  };

  const handleRemoveRequirementLine = (id: string) => {
    if (requirementLines.length <= 1) return;
    setRequirementLines((prev) => prev.filter((l) => l.id !== id));
  };

  const handleToggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  // Submit Handler
  const handleSubmitRequest = () => {
    const reqNo = `PNC-B2B-2026-${Math.floor(100 + Math.random() * 900)}`;
    const totalStaff = requirementLines.reduce((acc, line) => acc + Number(line.requiredCount), 0);
    const estimatedValue = requirementLines.reduce(
      (acc, line) => acc + Number(line.requiredCount) * Number(line.agreedDailyRate) * 30,
      0
    );

    const newRequest: OrganizationStaffingRequest = {
      id: `req-b2b-${Date.now()}`,
      requestNumber: reqNo,
      organizationId: 'org-max-saket',
      organizationName: facilityName,
      organizationType: 'hospital',
      facilityLocation: {
        facilityName: facilityName,
        department: department,
        address: facilityAddress,
        city: 'Delhi',
        pincode: '110017',
        contactPersonName: contactName,
        contactPersonPhone: contactPhone,
      },
      contactPerson: {
        name: contactName,
        designation: contactDesignation,
        phone: contactPhone,
        email: contactEmail,
      },
      startDate: startDate,
      endDate: endDate,
      totalDays: 30,
      requirements: requirementLines,
      totalStaffRequired: totalStaff,
      totalStaffAssigned: 0,
      contractType: requestType,
      estimatedContractValue: estimatedValue,
      status: 'under_review',
      specialRequirements: `${scrubRequirement} ${specialInstructions}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    MOCK_B2B_REQUESTS.unshift(newRequest);
    setSubmittedReqNo(reqNo);
  };

  return (
    <div className="space-y-8 text-left max-w-5xl mx-auto relative px-4 sm:px-6">
      <HealthcareTexture type="soft-cell" opacity={0.03} />

      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-6 sm:p-8 rounded-3xl text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider border border-blue-400/20">
            <Building2 className="w-3.5 h-3.5" />
            Institutional Staffing Requisition Wizard
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Create Staffing Requirement
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm font-medium">
            Define multi-line clinical workforce requirements for your hospital or healthcare facility.
          </p>
        </div>

        {submittedReqNo && (
          <Badge variant="success" className="text-xs px-3 py-1 font-extrabold">
            Request Submitted
          </Badge>
        )}
      </div>

      {/* STEP PROGRESS BAR */}
      {!submittedReqNo && (
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs relative z-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { step: 1, title: '01 REQUEST' },
              { step: 2, title: '02 REQUIREMENTS' },
              { step: 3, title: '03 LOCATION & SCHEDULE' },
              { step: 4, title: '04 REVIEW & SUBMIT' },
            ].map((s) => {
              const isCurrent = currentStep === s.step;
              const isPassed = currentStep > s.step;
              return (
                <div
                  key={s.step}
                  onClick={() => isPassed && setCurrentStep(s.step)}
                  className={`flex flex-col items-center text-center p-2 rounded-xl transition-all ${
                    isCurrent
                      ? 'bg-blue-600 text-white font-extrabold shadow-sm'
                      : isPassed
                      ? 'bg-blue-50 text-blue-800 font-bold cursor-pointer hover:bg-blue-100'
                      : 'bg-slate-100 text-slate-400 font-bold'
                  }`}
                >
                  <span className="text-xs font-mono">{s.title}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 1: REQUEST BASICS */}
      {!submittedReqNo && currentStep === 1 && (
        <Card className="p-6 bg-white border-slate-200 shadow-xs rounded-3xl space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-lg font-extrabold text-slate-900">Step 1: Requisition Basics</h2>
            <p className="text-xs text-slate-500">Provide high-level title, facility, and primary contact details.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Requisition Title *"
              value={requestTitle}
              onChange={(e) => setRequestTitle(e.target.value)}
              placeholder="e.g. September ICU Staffing"
              required
            />
            <Input
              label="Facility / Hospital Name *"
              value={facilityName}
              onChange={(e) => setFacilityName(e.target.value)}
              placeholder="Max Super Speciality Hospital, Saket"
              required
            />
            <Input
              label="Department / Unit *"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              placeholder="Cardiac ICU Ward 4"
              required
            />
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Contract Deployment Type *</label>
              <select
                value={requestType}
                onChange={(e) => setRequestType(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 bg-white focus:ring-2 focus:ring-blue-600"
              >
                <option value="monthly_retainer">Monthly Retainer (Fixed 30-Day Roster)</option>
                <option value="per_shift">Per-Shift Deployment (On-Demand)</option>
                <option value="emergency_deployment">Emergency Rapid Response (4-Hour Deployment)</option>
              </select>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-4">
            <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">Primary Facility Contact</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Input
                label="Contact Person Name *"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="Dr. Rakesh Sharma"
                required
              />
              <Input
                label="Designation *"
                value={contactDesignation}
                onChange={(e) => setContactDesignation(e.target.value)}
                placeholder="Nursing Superintendent"
                required
              />
              <Input
                label="Contact Phone (+91) *"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder="+91-98112-99012"
                required
              />
              <Input
                label="Contact Email *"
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="rakesh.sharma@maxhealthcare.in"
                required
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <Button
              variant="primary"
              onClick={() => setCurrentStep(2)}
              rightIcon={<ChevronRight className="w-4 h-4" />}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs cursor-pointer"
            >
              Continue to Workforce Requirements
            </Button>
          </div>
        </Card>
      )}

      {/* STEP 2: MULTI-LINE REQUIREMENTS */}
      {!submittedReqNo && currentStep === 2 && (
        <Card className="p-6 bg-white border-slate-200 shadow-xs rounded-3xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900">Step 2: What Workforce Do You Need?</h2>
              <p className="text-xs text-slate-500">Add multiple clinical requirement lines per request.</p>
            </div>

            <Button
              size="sm"
              variant="outline"
              onClick={handleAddRequirementLine}
              leftIcon={<Plus className="w-4 h-4" />}
              className="border-blue-600 text-blue-600 hover:bg-blue-50 font-bold text-xs cursor-pointer"
            >
              Add Requirement Line
            </Button>
          </div>

          <div className="space-y-4">
            {requirementLines.map((line, index) => (
              <div
                key={line.id}
                className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4 relative text-left"
              >
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                  <span className="text-xs font-mono font-extrabold text-blue-700 uppercase">
                    Requirement Line #{index + 1}
                  </span>

                  {requirementLines.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveRequirementLine(line.id)}
                      className="text-red-600 hover:text-red-700 text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Clinical Role Category *</label>
                    <select
                      value={line.roleCategory}
                      onChange={(e) => handleUpdateRequirementLine(line.id, 'roleCategory', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 bg-white"
                    >
                      <option value="icu_nurse">ICU Registered Nurse</option>
                      <option value="registered_nurse">General Ward Registered Nurse</option>
                      <option value="physiotherapist">Physiotherapy Specialist</option>
                      <option value="caregiver_attendant">Nursing Attendant</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Required Quantity *</label>
                    <input
                      type="number"
                      min="1"
                      max="50"
                      value={line.requiredCount}
                      onChange={(e) => handleUpdateRequirementLine(line.id, 'requiredCount', parseInt(e.target.value) || 1)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Shift Type *</label>
                    <select
                      value={line.shiftType}
                      onChange={(e) => handleUpdateRequirementLine(line.id, 'shiftType', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 bg-white"
                    >
                      <option value="12h_day">12 Hour Day (08:00 – 20:00)</option>
                      <option value="12h_night">12 Hour Night (20:00 – 08:00 Next Day)</option>
                      <option value="8h_general">8 Hour General (09:00 – 18:00)</option>
                      <option value="24h_rotational">24 Hour Rotational</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Commercial Terms Rate</label>
                    <div className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-100 text-xs font-extrabold text-blue-900">
                      Standard Rate: ₹{line.agreedDailyRate}/day
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(1)}
              leftIcon={<ChevronLeft className="w-4 h-4" />}
              className="text-slate-700 font-bold text-xs cursor-pointer"
            >
              Back
            </Button>
            <Button
              variant="primary"
              onClick={() => setCurrentStep(3)}
              rightIcon={<ChevronRight className="w-4 h-4" />}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs cursor-pointer"
            >
              Continue to Schedule
            </Button>
          </div>
        </Card>
      )}

      {/* STEP 3: SCHEDULE */}
      {!submittedReqNo && currentStep === 3 && (
        <Card className="p-6 bg-white border-slate-200 shadow-xs rounded-3xl space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-lg font-extrabold text-slate-900">Step 3: Contract Schedule</h2>
            <p className="text-xs text-slate-500">Define deployment dates and shift timing calculations.</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Schedule Pattern *</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'date_range', title: 'Date Range Contract', desc: 'Continuous deployment (e.g. 30 days)' },
                  { id: 'one_time', title: 'One-Time Shift', desc: 'Single day deployment' },
                  { id: 'recurring', title: 'Recurring Roster', desc: 'Mon–Fri or custom days' },
                ].map((s) => (
                  <div
                    key={s.id}
                    onClick={() => setScheduleType(s.id as any)}
                    className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                      scheduleType === s.id
                        ? 'border-blue-600 bg-blue-50/50 shadow-2xs ring-1 ring-blue-600'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <p className="font-extrabold text-slate-900 text-xs">{s.title}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <Input
                label="Deployment Start Date *"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
              <Input
                label="Deployment End Date *"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>

            {/* Overnight Shift Display Notice */}
            <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 text-xs text-blue-900 space-y-1">
              <p className="font-extrabold flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-blue-600" /> Overnight Shift Calculation Notice
              </p>
              <p className="text-[11px] leading-relaxed">
                Night shifts starting at <strong>20:00</strong> naturally conclude at <strong>08:00 on the following morning</strong>. Shift duration calculations automatically factor cross-midnight hours for accurate timesheet sign-offs.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(2)}
              leftIcon={<ChevronLeft className="w-4 h-4" />}
              className="text-slate-700 font-bold text-xs cursor-pointer"
            >
              Back
            </Button>
            <Button
              variant="primary"
              onClick={() => setCurrentStep(4)}
              rightIcon={<ChevronRight className="w-4 h-4" />}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs cursor-pointer"
            >
              Continue to Qualifications
            </Button>
          </div>
        </Card>
      )}

      {/* STEP 4: SKILLS & QUALIFICATIONS */}
      {!submittedReqNo && currentStep === 4 && (
        <Card className="p-6 bg-white border-slate-200 shadow-xs rounded-3xl space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-lg font-extrabold text-slate-900">Step 4: Clinical Qualifications & Certifications</h2>
            <p className="text-xs text-slate-500">Pulse n Care Operations Eligibility Engine filters internal staff based on these criteria.</p>
          </div>

          <div className="space-y-4">
            <label className="block text-xs font-bold text-slate-700">Mandatory Clinical Competencies *</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {skillOptions.map((skill) => {
                const isSelected = selectedSkills.includes(skill);
                return (
                  <div
                    key={skill}
                    onClick={() => handleToggleSkill(skill)}
                    className={`p-3 rounded-xl border text-xs font-bold text-left cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50 text-blue-900 shadow-2xs'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <span>{skill}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(3)}
              leftIcon={<ChevronLeft className="w-4 h-4" />}
              className="text-slate-700 font-bold text-xs cursor-pointer"
            >
              Back
            </Button>
            <Button
              variant="primary"
              onClick={() => setCurrentStep(5)}
              rightIcon={<ChevronRight className="w-4 h-4" />}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs cursor-pointer"
            >
              Continue to Facility Details
            </Button>
          </div>
        </Card>
      )}

      {/* STEP 5: FACILITY DETAILS */}
      {!submittedReqNo && currentStep === 5 && (
        <Card className="p-6 bg-white border-slate-200 shadow-xs rounded-3xl space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-lg font-extrabold text-slate-900">Step 5: Facility Reporting & Guidelines</h2>
            <p className="text-xs text-slate-500">Information provided to assigned staff upon duty dispatch.</p>
          </div>

          <div className="space-y-4">
            <Input
              label="Facility Full Address *"
              value={facilityAddress}
              onChange={(e) => setFacilityAddress(e.target.value)}
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Reporting Location / Desk *"
                value={reportingLocation}
                onChange={(e) => setReportingLocation(e.target.value)}
                placeholder="Nursing Superintendent Office, 3rd Floor"
                required
              />
              <Input
                label="Duty Supervisor Name *"
                value={supervisorName}
                onChange={(e) => setSupervisorName(e.target.value)}
                placeholder="Sr. Mary Kurien"
                required
              />
            </div>

            <Input
              label="Scrub & Uniform Instructions *"
              value={scrubRequirement}
              onChange={(e) => setScrubRequirement(e.target.value)}
              placeholder="PNC Sterile Blue Scrubs mandatory for all assigned staff."
              required
            />

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Special Reporting Instructions</label>
              <textarea
                rows={3}
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 bg-white"
                placeholder="Staff must report 15 minutes prior to shift start..."
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(4)}
              leftIcon={<ChevronLeft className="w-4 h-4" />}
              className="text-slate-700 font-bold text-xs cursor-pointer"
            >
              Back
            </Button>
            <Button
              variant="primary"
              onClick={() => setCurrentStep(6)}
              rightIcon={<ChevronRight className="w-4 h-4" />}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs cursor-pointer"
            >
              Review Requisition
            </Button>
          </div>
        </Card>
      )}

      {/* STEP 6: REVIEW & SUBMIT */}
      {!submittedReqNo && currentStep === 6 && (
        <Card className="p-6 bg-white border-slate-200 shadow-xs rounded-3xl space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-lg font-extrabold text-slate-900">Step 6: Review & Finalize Requisition</h2>
            <p className="text-xs text-slate-500">Verify all staffing details before submitting to Pulse n Care Operations.</p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-slate-900 text-sm">{requestTitle}</span>
                <Badge variant="info" className="capitalize">{requestType.replace(/_/g, ' ')}</Badge>
              </div>
              <p className="text-slate-600">Facility: <strong>{facilityName}</strong> • Department: <strong>{department}</strong></p>
              <p className="text-slate-600">Schedule: <strong>{startDate} to {endDate} (30 Days)</strong></p>
            </div>

            <div className="space-y-2">
              <h4 className="font-extrabold text-slate-900 uppercase tracking-wider text-[11px]">Required Workforce Breakdown</h4>
              <div className="space-y-2">
                {requirementLines.map((line) => (
                  <div key={line.id} className="p-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="font-extrabold text-slate-900">{line.roleCategoryTitle}</p>
                      <p className="text-slate-500 text-[11px]">Shift: {line.shiftType.replace(/_/g, ' ')}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-blue-700 text-sm">{line.requiredCount} Staff Positions</p>
                      <p className="text-slate-500 text-[11px]">₹{line.agreedDailyRate.toLocaleString('en-IN')}/day</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 text-blue-900 space-y-1">
              <p className="font-extrabold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-600" /> Managed Operations Guarantee
              </p>
              <p className="text-[11px] leading-relaxed">
                Pulse n Care Operations will review these criteria, verify staff certifications against mandatory qualifications, and deploy assigned workforce to your roster.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(5)}
              leftIcon={<ChevronLeft className="w-4 h-4" />}
              className="text-slate-700 font-bold text-xs cursor-pointer"
            >
              Back
            </Button>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => navigate('/organization/requests')}
                className="text-slate-600 font-bold text-xs cursor-pointer"
              >
                Save Draft
              </Button>
              <Button
                variant="primary"
                onClick={handleSubmitRequest}
                leftIcon={<Send className="w-4 h-4" />}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs cursor-pointer px-5"
              >
                Submit Staffing Request
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* POST-SUBMISSION CONFIRMATION SCREEN */}
      {submittedReqNo && (
        <Card className="p-8 bg-white border-slate-200 shadow-xl rounded-3xl text-center space-y-6 max-w-2xl mx-auto my-8">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="font-mono text-sm font-extrabold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 inline-block">
              {submittedReqNo}
            </span>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Staffing Request Submitted Successfully!
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
              We've received your staffing requirements for <strong>{facilityName} ({department})</strong>.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2">
            <p className="font-extrabold text-slate-900">What Happens Next?</p>
            <ol className="list-decimal list-inside space-y-1 text-slate-600 font-medium">
              <li>Pulse n Care Operations reviews requirement lines & qualifications.</li>
              <li>Eligibility Engine filters active internal workforce for shift availability.</li>
              <li>Operations assigns staff to your facility roster.</li>
            </ol>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <Button
              variant="outline"
              onClick={() => navigate('/organization/requests')}
              className="text-slate-700 font-bold text-xs cursor-pointer"
            >
              All Requests
            </Button>
            <Button
              variant="primary"
              onClick={() => navigate(`/organization/requests/${submittedReqNo}`)}
              rightIcon={<ChevronRight className="w-4 h-4" />}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs cursor-pointer"
            >
              View Request Fulfillment Board
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};
