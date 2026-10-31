import React, { useState } from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { HealthcareTexture } from '../../components/common/HealthcareTexture';
import { MOCK_B2B_REQUESTS, MOCK_FACILITY_ROSTER_SLOTS } from '../../data/mockB2BData';
import { MOCK_STAFF_PROFILES } from '../../data/mockStaffData';
import type { OrganizationStaffingRequest, StaffingRequirementLine, FacilityShiftRosterSlot, StaffProfile } from '../../types';
import {
  Building2,
  CheckCircle2,
  UserPlus,
  X,
} from 'lucide-react';

export const AdminOrganizationRequestsPage: React.FC = () => {
  const [requests, setRequests] = useState<OrganizationStaffingRequest[]>(MOCK_B2B_REQUESTS);
  const [selectedReq, setSelectedReq] = useState<OrganizationStaffingRequest | null>(null);
  const [selectedLine, setSelectedLine] = useState<StaffingRequirementLine | null>(null);
  const [isRosterModalOpen, setIsRosterModalOpen] = useState(false);
  const [assignmentSuccessMsg, setAssignmentSuccessMsg] = useState<string | null>(null);

  // Filter available staff for the selected requirement line
  const eligibleStaff = MOCK_STAFF_PROFILES.filter((s: StaffProfile) => s.employmentStatus === 'active');

  const handleAssignStaffToRoster = (staffId: string, staffName: string) => {
    if (!selectedReq || !selectedLine) return;

    // Update requirements line count
    setRequests((prev) =>
      prev.map((r) => {
        if (r.id === selectedReq.id) {
          const updatedLines = r.requirements.map((line) => {
            if (line.id === selectedLine.id) {
              return { ...line, assignedCount: Math.min(line.requiredCount, line.assignedCount + 1) };
            }
            return line;
          });
          const totalAssigned = updatedLines.reduce((acc, curr) => acc + curr.assignedCount, 0);
          const isFullyFulfilled = totalAssigned >= r.totalStaffRequired;
          return {
            ...r,
            requirements: updatedLines,
            totalStaffAssigned: totalAssigned,
            status: isFullyFulfilled ? 'fulfilled' : 'partially_fulfilled',
          };
        }
        return r;
      })
    );

    // Create new facility shift roster slot
    const newRosterSlot: FacilityShiftRosterSlot = {
      id: `rst-${Date.now()}`,
      requestId: selectedReq.id,
      requestNumber: selectedReq.requestNumber,
      requirementLineId: selectedLine.id,
      organizationId: selectedReq.organizationId,
      organizationName: selectedReq.organizationName,
      department: selectedReq.facilityLocation.department,
      date: selectedReq.startDate,
      shiftType: selectedLine.shiftType,
      startTime: selectedLine.shiftType === '12h_night' ? '20:00' : '08:00',
      endTime: selectedLine.shiftType === '12h_night' ? '08:00' : '20:00',
      assignedStaffId: staffId,
      assignedStaffName: staffName,
      assignedStaffPhone: '+91 98765 43210',
      assignedStaffEmployeeId: 'PNC-EMP-0042',
      assignedStaffRole: selectedLine.roleCategoryTitle,
      status: 'assigned',
      dailyRate: selectedLine.agreedDailyRate,
      createdAt: new Date().toISOString(),
    };

    MOCK_FACILITY_ROSTER_SLOTS.push(newRosterSlot);

    setAssignmentSuccessMsg(`Successfully assigned ${staffName} to ${selectedReq.organizationName} roster!`);
    setTimeout(() => {
      setAssignmentSuccessMsg(null);
      setIsRosterModalOpen(false);
    }, 1500);
  };

  return (
    <div className="space-y-8 text-left max-w-7xl mx-auto relative px-4 sm:px-6">
      <HealthcareTexture type="soft-cell" opacity={0.03} />

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-6 sm:p-8 rounded-3xl text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-4 h-4" />
            Institutional B2B Care Operations Desk
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Hospital & Facility Staffing Requisitions
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm font-medium">
            Manage multi-staff institutional requirements for hospitals, ICUs, and partner clinics across Delhi NCR.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white/10 backdrop-blur-xs px-4 py-2 rounded-2xl text-center border border-white/10">
            <p className="text-[10px] text-slate-300 font-bold uppercase">Active Requisitions</p>
            <p className="text-xl font-extrabold text-white">{requests.length}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-xs px-4 py-2 rounded-2xl text-center border border-white/10">
            <p className="text-[10px] text-teal-300 font-bold uppercase">Roster Placements</p>
            <p className="text-xl font-extrabold text-teal-300">{MOCK_FACILITY_ROSTER_SLOTS.length}</p>
          </div>
        </div>
      </div>

      {/* Requisitions List */}
      <div className="space-y-6 relative z-10">
        {requests.map((req) => (
          <Card key={req.id} className="p-6 border-slate-200 space-y-6 shadow-xs">
            {/* Top Bar */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-extrabold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                    {req.requestNumber}
                  </span>
                  <Badge
                    variant={
                      req.status === 'fulfilled'
                        ? 'success'
                        : req.status === 'partially_fulfilled'
                        ? 'warning'
                        : 'info'
                    }
                    className="capitalize font-bold text-[10px]"
                  >
                    {req.status.replace(/_/g, ' ')}
                  </Badge>
                </div>
                <h3 className="text-xl font-extrabold text-slate-900">{req.organizationName}</h3>
                <p className="text-xs text-slate-600 font-medium">
                  Department: <strong className="text-slate-800">{req.facilityLocation.department}</strong> • City:{' '}
                  <strong className="text-slate-800">{req.facilityLocation.city}</strong>
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs">
                <div className="text-right">
                  <p className="text-slate-400 font-medium">Deployment Contract</p>
                  <p className="font-extrabold text-slate-900">
                    ₹{req.estimatedContractValue.toLocaleString('en-IN')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-slate-400 font-medium">Staff Fulfillment</p>
                  <p className="font-extrabold text-teal-700">
                    {req.totalStaffAssigned} / {req.totalStaffRequired} Assigned
                  </p>
                </div>
              </div>
            </div>

            {/* Requirement Lines Breakdown */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Staff Requirement Lines & Roster Slots
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {req.requirements.map((line) => (
                  <div
                    key={line.id}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <h5 className="font-extrabold text-slate-900 text-sm">{line.roleCategoryTitle}</h5>
                        <span className="font-mono text-teal-700 font-bold bg-white px-2 py-0.5 rounded border border-slate-200">
                          ₹{line.agreedDailyRate}/day
                        </span>
                      </div>
                      <p className="text-slate-600">
                        Shift Type: <strong className="capitalize">{line.shiftType.replace('_', ' ')}</strong>
                      </p>
                      <p className="text-slate-500">
                        Qualifications: {line.requiredQualifications.join(', ')}
                      </p>
                      <div className="flex items-center gap-2 pt-1">
                        <span className="text-xs font-bold text-slate-700">Fulfillment:</span>
                        <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-teal-600 rounded-full"
                            style={{ width: `${(line.assignedCount / line.requiredCount) * 100}%` }}
                          />
                        </div>
                        <span className="font-bold text-slate-800">
                          {line.assignedCount} / {line.requiredCount}
                        </span>
                      </div>
                    </div>

                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => {
                        setSelectedReq(req);
                        setSelectedLine(line);
                        setIsRosterModalOpen(true);
                      }}
                      leftIcon={<UserPlus className="w-3.5 h-3.5" />}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold cursor-pointer text-xs self-start"
                    >
                      Assign Staff Member
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Roster Assignment Modal */}
      {isRosterModalOpen && selectedReq && selectedLine && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative text-left">
            <button
              onClick={() => setIsRosterModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!assignmentSuccessMsg ? (
              <>
                <div className="space-y-1 border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="info" className="uppercase font-bold text-[10px]">
                      {selectedReq.requestNumber}
                    </Badge>
                    <span className="text-xs text-slate-500">{selectedReq.organizationName}</span>
                  </div>
                  <h2 className="text-xl font-extrabold text-slate-900">
                    Assign Staff to {selectedLine.roleCategoryTitle} Roster
                  </h2>
                  <p className="text-xs text-slate-600">
                    Shift: {selectedLine.shiftType.replace('_', ' ')} • Agreed Rate: ₹{selectedLine.agreedDailyRate}/day
                  </p>
                </div>

                {/* 7-Point Conflict Checker Results */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Available Verified Staff Members (7-Point Conflict Checked)
                  </h4>

                  <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                    {eligibleStaff.map((staff: StaffProfile) => (
                      <div
                        key={staff.id}
                        className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-4 text-xs"
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <h5 className="font-extrabold text-slate-900">{staff.fullName}</h5>
                            <span className="font-mono text-[10px] text-slate-500">{staff.employeeId}</span>
                            <Badge variant="success" className="text-[9px]">Verified</Badge>
                          </div>
                          <p className="text-slate-600">
                            Experience: {staff.totalExperienceYears} Yrs • Rating: ★ {staff.averageRating.toFixed(1)}
                          </p>
                        </div>

                        <Button
                          size="sm"
                          variant="primary"
                          onClick={() => handleAssignStaffToRoster(staff.id, staff.fullName)}
                          className="bg-teal-600 hover:bg-teal-700 text-white font-bold cursor-pointer text-xs"
                        >
                          Assign to Roster
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center space-y-4 py-6">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900">Roster Assignment Success!</h3>
                <p className="text-xs text-slate-600">{assignmentSuccessMsg}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
