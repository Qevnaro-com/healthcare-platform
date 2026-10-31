import React, { useState } from 'react';
import { X, UserPlus, ShieldCheck, Mail, Phone, Award, CheckCircle2 } from 'lucide-react';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import type { ProfessionalProfile } from '../../types';

interface AdminCreateStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newStaff: ProfessionalProfile) => void;
}

export const AdminCreateStaffModal: React.FC<AdminCreateStaffModalProps> = ({
  isOpen,
  onClose,
  onSave
}) => {
  const [employeeId] = useState(`EMP-${Math.floor(1000 + Math.random() * 9000)}`);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [qualification, setQualification] = useState('B.Sc Nursing, RN');
  const [registrationNumber, setRegistrationNumber] = useState('DNC-98412');
  const [employmentType, setEmploymentType] = useState<'full_time' | 'part_time' | 'contract'>('full_time');
  const [primaryServiceArea, setPrimaryServiceArea] = useState('Delhi (NCR Central & South)');
  const [serviceRadius, setServiceRadius] = useState(20);
  const [hourlyRate, setHourlyRate] = useState(350);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([
    'Post-Operative Wound Care',
    'Vital Monitoring',
    'Medication Administration'
  ]);
  const [sendInvitation, setSendInvitation] = useState(true);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const availableSkills = [
    'Post-Operative Wound Care',
    'Vital Monitoring',
    'Medication Administration',
    'Tracheostomy Care',
    'Ryle Tube & PEG Feeding',
    'Physiotherapy & Mobility',
    'Bedsores Preventative Dressing',
    'Dementia & Elderly Care'
  ];

  const handleSkillToggle = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const displayName = `${firstName.trim()} ${lastName.trim()}`.trim() || 'New Staff Member';

    const newStaff: ProfessionalProfile = {
      id: `pro-emp-${Date.now()}`,
      userId: `usr-pro-${Date.now()}`,
      employeeId,
      displayName,
      bio: `Internal ${qualification} staff assigned to ${primaryServiceArea}. Experienced in ${selectedSkills.slice(0, 2).join(', ')}.`,
      qualification,
      qualificationDetails: `${qualification} — Verified Internal Employee`,
      registrationNumber,
      specializations: selectedSkills,
      experienceYears: 5,
      servicesOffered: ['srv-nursing-post-op', 'srv-nursing-elderly'],
      serviceRadius,
      location: {
        latitude: 28.6139,
        longitude: 77.209,
        addressName: primaryServiceArea
      },
      languages: ['English', 'Hindi'],
      hourlyRate,
      rating: 5.0,
      reviewCount: 0,
      totalVisits: 0,
      completionRate: 100,
      isVerified: true,
      kycStatus: 'approved',
      availabilityStatus: 'active',
      profilePhoto: 'https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=300&q=80',
      documents: [
        {
          id: `doc-${Date.now()}-1`,
          type: 'nursing_license',
          documentNumber: registrationNumber,
          fileUrl: 'https://example.com/license.pdf',
          fileName: 'State_Nursing_Council_License.pdf',
          uploadedAt: new Date().toISOString(),
          verificationStatus: 'verified'
        }
      ],
      availability: [
        { id: '1', dayOfWeek: 1, startTime: '08:00', endTime: '20:00', isAvailable: true },
        { id: '2', dayOfWeek: 2, startTime: '08:00', endTime: '20:00', isAvailable: true },
        { id: '3', dayOfWeek: 3, startTime: '08:00', endTime: '20:00', isAvailable: true },
        { id: '4', dayOfWeek: 4, startTime: '08:00', endTime: '20:00', isAvailable: true },
        { id: '5', dayOfWeek: 5, startTime: '08:00', endTime: '20:00', isAvailable: true }
      ],
      employmentType,
      badge: 'In-House Workforce Staff',
      assignedShiftCount: 0,
      leaveStatus: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setSuccess(true);
    setTimeout(() => {
      onSave(newStaff);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-border-default shadow-2xl overflow-hidden my-8 text-left animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-700 via-brand-teal to-teal-800 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center shrink-0">
              <UserPlus className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-teal-200">
                Operations Administration
              </span>
              <h2 className="text-xl font-extrabold text-white">Provision New Internal Staff Member</h2>
              <p className="text-xs text-teal-100 mt-0.5">
                Staff registration is admin-controlled. Create employee profile & credentials.
              </p>
            </div>
          </div>
        </div>

        {success ? (
          <div className="p-12 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 rounded-full text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">Staff Profile Created Successfully!</h3>
            <p className="text-xs text-slate-600">
              Employee ID <span className="font-mono font-bold text-brand-teal">{employeeId}</span> has been provisioned and added to active internal staff roster.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
            {/* Employee ID & Basic Info */}
            <div className="bg-canvas-secondary p-4 rounded-2xl border border-border-default space-y-3">
              <div className="flex justify-between items-center border-b border-border-light pb-2">
                <span className="text-xs font-extrabold text-text-primary uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-brand-teal" /> Employee Core Identity
                </span>
                <span className="text-xs font-mono font-bold text-brand-teal bg-white px-3 py-1 rounded-lg border border-teal-200 shadow-2xs">
                  ID: {employeeId}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="e.g. Suman"
                />
                <Input
                  label="Last Name"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="e.g. Verma"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Official Email"
                  type="email"
                  required
                  leftIcon={<Mail className="w-4 h-4 text-text-muted" />}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="suman.verma@healthplatform.test"
                />
                <Input
                  label="Phone Number"
                  type="tel"
                  required
                  leftIcon={<Phone className="w-4 h-4 text-text-muted" />}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            {/* Professional Qualification & Service Area */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">
                  Qualification / Role
                </label>
                <select
                  value={qualification}
                  onChange={(e) => setQualification(e.target.value)}
                  className="w-full h-11 px-3 text-xs font-semibold bg-white border border-border-default rounded-xl focus:border-brand-teal focus:outline-none"
                >
                  <option value="B.Sc Nursing, RN">B.Sc Registered Nurse (RN)</option>
                  <option value="GNM Nurse">GNM Diploma Nurse</option>
                  <option value="BPT Physiotherapist">BPT Senior Physiotherapist</option>
                  <option value="Bedside Caregiver">Bedside Caregiver & Attendant</option>
                  <option value="MBBS Medical Officer">MBBS Medical Officer</option>
                </select>
              </div>

              <Input
                label="Registration / License Number"
                required
                leftIcon={<Award className="w-4 h-4 text-text-muted" />}
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value)}
                placeholder="e.g. DNC-88419"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">
                  Employment Type
                </label>
                <select
                  value={employmentType}
                  onChange={(e) => setEmploymentType(e.target.value as any)}
                  className="w-full h-11 px-3 text-xs font-semibold bg-white border border-border-default rounded-xl focus:border-brand-teal focus:outline-none"
                >
                  <option value="full_time">Full-Time Staff</option>
                  <option value="contract">Contract Staff</option>
                  <option value="part_time">Part-Time / On-Call</option>
                </select>
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">
                  Primary Service Area (NCR)
                </label>
                <select
                  value={primaryServiceArea}
                  onChange={(e) => setPrimaryServiceArea(e.target.value)}
                  className="w-full h-11 px-3 text-xs font-semibold bg-white border border-border-default rounded-xl focus:border-brand-teal focus:outline-none"
                >
                  <option value="Delhi (NCR Central & South)">Delhi (NCR Central & South)</option>
                  <option value="Noida & Greater Noida">Noida & Greater Noida</option>
                  <option value="Gurugram / Gurgaon">Gurugram / Gurgaon</option>
                  <option value="Faridabad">Faridabad</option>
                </select>
              </div>

              <Input
                label="Radius (km)"
                type="number"
                value={serviceRadius.toString()}
                onChange={(e) => setServiceRadius(Number(e.target.value) || 20)}
              />

              <Input
                label="Hourly Rate (₹)"
                type="number"
                value={hourlyRate.toString()}
                onChange={(e) => setHourlyRate(Number(e.target.value) || 350)}
              />
            </div>

            {/* Skills & Specializations Multi-Select */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-secondary uppercase tracking-wider block">
                Clinical Skills & Care Specializations
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-36 overflow-y-auto p-2 bg-slate-50 rounded-xl border border-border-default">
                {availableSkills.map((skill) => {
                  const isChecked = selectedSkills.includes(skill);
                  return (
                    <label
                      key={skill}
                      onClick={() => handleSkillToggle(skill)}
                      className={`flex items-center gap-2 p-2 rounded-lg border text-xs cursor-pointer select-none transition-colors ${
                        isChecked
                          ? 'bg-canvas-teal border-brand-teal font-extrabold text-brand-teal'
                          : 'bg-white border-border-default text-text-secondary hover:bg-slate-100'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="rounded text-brand-teal focus:ring-brand-teal"
                      />
                      <span>{skill}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Credential Invitation Options */}
            <div className="p-4 bg-teal-50/60 rounded-xl border border-teal-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-extrabold text-slate-900 block">Send Password Setup Invitation</span>
                <span className="text-[11px] text-slate-600">
                  Sends email with temporary magic link for initial account password setup.
                </span>
              </div>
              <input
                type="checkbox"
                checked={sendInvitation}
                onChange={(e) => setSendInvitation(e.target.checked)}
                className="w-5 h-5 accent-brand-teal cursor-pointer"
              />
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end gap-3 pt-3 border-t border-border-default">
              <Button type="button" variant="outline" onClick={onClose} className="font-bold text-xs">
                Cancel
              </Button>
              <Button type="submit" className="bg-brand-teal hover:bg-brand-teal-hover text-white font-extrabold text-xs px-5">
                Provision Employee Account
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
