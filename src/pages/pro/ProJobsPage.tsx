import React, { useState } from 'react';
import { useBookings } from '../../context/BookingContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import {
  MapPin,
  CheckCircle2,
  Navigation,
  CheckCheck,
  Activity,
  Calendar
} from 'lucide-react';
import type { DutyStatus } from '../../types';

export const ProJobsPage: React.FC = () => {
  const { careDuties, updateDutyStatus, completeDuty, getCareRequestById, getServiceById } = useBookings();
  const [activeDutyId, setActiveDutyId] = useState<string | null>(null);
  const [completeModalOpen, setCompleteModalOpen] = useState(false);
  const [completionNotes, setCompletionNotes] = useState('');
  const [checkedTasks, setCheckedTasks] = useState<Record<string, boolean>>({});
  const [vitals, setVitals] = useState({
    bp: '120/80',
    pulse: '76',
    temp: '98.4',
    spo2: '98'
  });

  const assignedDuties = careDuties;

  const handleOpenComplete = (dutyId: string) => {
    setActiveDutyId(dutyId);
    setCompleteModalOpen(true);
  };

  const handleFinalizeCompletion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeDutyId) return;

    completeDuty(activeDutyId, completionNotes || 'Shift completed. Vitals stable, prescribed care delivered.', {
      bloodPressure: vitals.bp,
      pulseRate: Number(vitals.pulse) || 76,
      temperature: Number(vitals.temp) || 98.4,
      spo2: Number(vitals.spo2) || 98
    });

    setCompleteModalOpen(false);
    setActiveDutyId(null);
    setCompletionNotes('');
  };

  const renderDutyActionButtons = (dutyId: string, currentStatus: DutyStatus) => {
    switch (currentStatus) {
      case 'ASSIGNED':
        return (
          <Button
            variant="primary"
            size="sm"
            className="w-full bg-brand-teal text-white font-bold"
            leftIcon={<CheckCircle2 className="w-4 h-4" />}
            onClick={() => updateDutyStatus(dutyId, 'ACKNOWLEDGED')}
          >
            Acknowledge Duty
          </Button>
        );
      case 'ACKNOWLEDGED':
        return (
          <Button
            variant="primary"
            size="sm"
            className="w-full bg-blue-600 text-white font-bold"
            leftIcon={<Navigation className="w-4 h-4" />}
            onClick={() => updateDutyStatus(dutyId, 'EN_ROUTE')}
          >
            Start Travel (En Route)
          </Button>
        );
      case 'EN_ROUTE':
        return (
          <Button
            variant="primary"
            size="sm"
            className="w-full bg-indigo-600 text-white font-bold"
            leftIcon={<MapPin className="w-4 h-4" />}
            onClick={() => updateDutyStatus(dutyId, 'ARRIVED')}
          >
            I've Arrived at Doorstep
          </Button>
        );
      case 'ARRIVED':
        return (
          <Button
            variant="primary"
            size="sm"
            className="w-full bg-teal-600 text-white font-bold"
            leftIcon={<Activity className="w-4 h-4" />}
            onClick={() => updateDutyStatus(dutyId, 'IN_CARE')}
          >
            Start Care Session
          </Button>
        );
      case 'IN_CARE':
        return (
          <Button
            variant="primary"
            size="sm"
            className="w-full bg-emerald-600 text-white font-bold"
            leftIcon={<CheckCheck className="w-4 h-4" />}
            onClick={() => handleOpenComplete(dutyId)}
          >
            Complete Duty & Log Notes
          </Button>
        );
      case 'COMPLETED':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-extrabold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
            ✓ Care Duty Completed
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6 text-left">
      <div>
        <span className="text-xs font-bold text-brand-teal uppercase tracking-widest">In-House Staff Duty Portal</span>
        <h1 className="text-3xl font-extrabold text-text-primary">Today's Assigned Duties</h1>
        <p className="text-xs text-text-muted mt-1">Operational duty execution lifecycle: Acknowledge ➔ En Route ➔ Arrived ➔ In Care ➔ Complete.</p>
      </div>

      <div className="space-y-4">
        {assignedDuties.length === 0 ? (
          <Card className="p-8 text-center text-text-muted">
            No active duty assignments scheduled for today.
          </Card>
        ) : (
          assignedDuties.map((duty) => (
            <Card key={duty.dutyId} className="p-6 border-l-4 border-l-brand-teal space-y-4 shadow-subtle">
              <div className="flex items-center justify-between border-b border-border-default pb-3">
                <span className="text-xs font-mono font-bold text-brand-teal">{duty.dutyId}</span>
                <span className="text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                  Status: {duty.status}
                </span>
              </div>

              {(() => {
                const parentReq = getCareRequestById(duty.careRequestId);
                const parentService = parentReq ? getServiceById(parentReq.serviceId) : undefined;
                const checklist = parentService?.dutyChecklist || [
                  'Vital signs (BP, Pulse, SpO2) measurement',
                  'Prescribed medication / care task execution',
                  'Patient hygiene & comfort check',
                  'Handover notes preparation'
                ];

                return (
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="space-y-2">
                        <h3 className="text-base font-extrabold text-text-primary">Patient: {duty.patientName}</h3>
                        <div className="flex items-center gap-1.5 text-text-muted">
                          <MapPin className="w-4 h-4 text-brand-teal shrink-0" />
                          <span>{duty.locationAddress.line1}, {duty.locationAddress.city} ({duty.locationAddress.pincode})</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-text-muted">
                          <Calendar className="w-4 h-4 text-brand-teal shrink-0" />
                          <span>Shift: {duty.shiftType}</span>
                        </div>
                      </div>

                      <div className="bg-canvas-secondary p-4 rounded-xl border border-border-default space-y-3 flex flex-col justify-between">
                        <p className="text-xs text-text-muted">
                          Execute duty step-by-step as you progress through patient care.
                        </p>
                        <div>
                          {renderDutyActionButtons(duty.dutyId, duty.status)}
                        </div>
                      </div>
                    </div>

                    {/* Operational Duty Checklist */}
                    {(duty.status === 'IN_CARE' || duty.status === 'ARRIVED') && (
                      <div className="pt-3 border-t border-border-default space-y-2 text-xs">
                        <span className="font-extrabold text-text-primary block uppercase tracking-wider text-[11px]">
                          Operational Duty Checklist ({parentService?.name || 'Home Care'})
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {checklist.map((taskItem, tIdx) => {
                            const taskKey = `${duty.dutyId}_${tIdx}`;
                            const isChecked = !!checkedTasks[taskKey];

                            return (
                              <label
                                key={tIdx}
                                className={`p-2.5 rounded-lg border flex items-center gap-2 cursor-pointer transition-all ${
                                  isChecked
                                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold'
                                    : 'bg-white border-border-default text-text-secondary hover:border-brand-teal-300'
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={(e) =>
                                    setCheckedTasks({ ...checkedTasks, [taskKey]: e.target.checked })
                                  }
                                  className="rounded text-brand-teal focus:ring-brand-teal"
                                />
                                <span>{taskItem}</span>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}
            </Card>
          ))
        )}
      </div>

      {/* Duty Completion Modal */}
      <Modal
        isOpen={completeModalOpen}
        onClose={() => setCompleteModalOpen(false)}
        title="Complete Duty & Record Care Notes"
        subtitle="Log observed vitals and care summary before submitting timesheet."
      >
        <form onSubmit={handleFinalizeCompletion} className="space-y-4 text-xs text-left">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-extrabold text-text-primary mb-1">Blood Pressure</label>
              <input
                type="text"
                value={vitals.bp}
                onChange={(e) => setVitals({ ...vitals, bp: e.target.value })}
                className="w-full h-9 px-3 border border-border-default rounded-lg"
              />
            </div>
            <div>
              <label className="block font-extrabold text-text-primary mb-1">Pulse Rate (bpm)</label>
              <input
                type="text"
                value={vitals.pulse}
                onChange={(e) => setVitals({ ...vitals, pulse: e.target.value })}
                className="w-full h-9 px-3 border border-border-default rounded-lg"
              />
            </div>
            <div>
              <label className="block font-extrabold text-text-primary mb-1">Temperature (°F)</label>
              <input
                type="text"
                value={vitals.temp}
                onChange={(e) => setVitals({ ...vitals, temp: e.target.value })}
                className="w-full h-9 px-3 border border-border-default rounded-lg"
              />
            </div>
            <div>
              <label className="block font-extrabold text-text-primary mb-1">SpO2 (%)</label>
              <input
                type="text"
                value={vitals.spo2}
                onChange={(e) => setVitals({ ...vitals, spo2: e.target.value })}
                className="w-full h-9 px-3 border border-border-default rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block font-extrabold text-text-primary mb-1">Duty Handover Notes</label>
            <textarea
              rows={3}
              value={completionNotes}
              onChange={(e) => setCompletionNotes(e.target.value)}
              placeholder="e.g. Sterile dressing applied, surgical drain flushed, medication administered on schedule."
              className="w-full p-3 border border-border-default rounded-lg"
            />
          </div>

          <Button type="submit" variant="primary" className="w-full bg-emerald-600 text-white font-bold py-2.5">
            Submit Care Notes & Complete Duty
          </Button>
        </form>
      </Modal>
    </div>
  );
};
