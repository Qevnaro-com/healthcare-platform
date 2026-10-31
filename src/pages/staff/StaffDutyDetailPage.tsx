import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { HealthcareTexture } from '../../components/common/HealthcareTexture';
import {
  MapPin,
  Phone,
  Navigation,
  CheckCircle,
  AlertTriangle,
  ChevronLeft,
  Activity
} from 'lucide-react';
import { MOCK_DUTIES } from '../../data/mockStaffData';
import type { DutyStatus } from '../../types/staff';

export const StaffDutyDetailPage: React.FC = () => {
  const { dutyId } = useParams<{ dutyId: string }>();
  const navigate = useNavigate();

  const initialDuty = MOCK_DUTIES.find(d => d.id === dutyId) || MOCK_DUTIES[0];
  const [dutyStatus, setDutyStatus] = useState<DutyStatus>(initialDuty.status);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);

  const toggleTask = (task: string) => {
    setCompletedTasks(prev =>
      prev.includes(task) ? prev.filter(t => t !== task) : [...prev, task]
    );
  };

  const ALLOWED_TRANSITIONS: Record<string, string[]> = {
    ASSIGNED: ['ACKNOWLEDGED', 'TRAVELLING'],
    ACKNOWLEDGED: ['TRAVELLING'],
    TRAVELLING: ['ARRIVED'],
    ARRIVED: ['IN_CARE'],
    IN_CARE: ['COMPLETED'],
    COMPLETED: []
  };

  const handleStateTransition = (targetStatus: DutyStatus) => {
    if (dutyStatus === 'COMPLETED' && targetStatus !== 'COMPLETED') {
      return; // Block invalid transition from terminal COMPLETED state
    }
    const allowed = ALLOWED_TRANSITIONS[dutyStatus] || [];
    if (allowed.length > 0 && !allowed.includes(targetStatus) && targetStatus !== dutyStatus) {
      return;
    }
    setDutyStatus(targetStatus);
  };

  return (
    <div className="space-y-6 pb-10">
      
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <button
          onClick={() => navigate('/staff/dashboard')}
          className="text-xs font-extrabold text-slate-600 hover:text-brand-teal flex items-center gap-1 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Today's Duty
        </button>
        <span className="text-xs font-mono font-bold text-brand-teal">{initialDuty.bookingCode}</span>
      </div>

      {/* Duty Overview Card */}
      <Card className="p-6 bg-white border-slate-200 shadow-xl rounded-3xl space-y-5 relative overflow-hidden">
        <HealthcareTexture type="micro-dot-mesh" opacity={0.03} />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <Badge variant="teal" size="sm">DUTY CHECKLIST</Badge>
            <h1 className="text-xl font-black text-slate-900 mt-1">{initialDuty.serviceName}</h1>
            <p className="text-xs text-slate-500 font-medium">Scheduled Shift: <strong className="text-slate-900">{initialDuty.scheduledStartTime} - {initialDuty.scheduledEndTime}</strong> ({initialDuty.durationHours} Hours)</p>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black self-start sm:self-auto border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            CURRENT STATUS: {dutyStatus.replace('_', ' ')}
          </span>
        </div>

        {/* STATUS LIFECYCLE CONTROLS */}
        <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-3">
          <p className="text-[10px] font-black uppercase tracking-widest text-teal-400">Update Duty State:</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <button
              onClick={() => handleStateTransition('TRAVELLING')}
              disabled={dutyStatus === 'COMPLETED'}
              className={`p-2.5 rounded-xl font-extrabold border transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                dutyStatus === 'TRAVELLING' ? 'bg-amber-500 text-slate-950 border-amber-400' : 'bg-slate-800 border-slate-700 text-slate-300'
              }`}
            >
              1. Start Travel
            </button>
            <button
              onClick={() => handleStateTransition('ARRIVED')}
              disabled={dutyStatus === 'COMPLETED'}
              className={`p-2.5 rounded-xl font-extrabold border transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                dutyStatus === 'ARRIVED' ? 'bg-amber-500 text-slate-950 border-amber-400' : 'bg-slate-800 border-slate-700 text-slate-300'
              }`}
            >
              2. Arrived
            </button>
            <button
              onClick={() => handleStateTransition('IN_CARE')}
              disabled={dutyStatus === 'COMPLETED'}
              className={`p-2.5 rounded-xl font-extrabold border transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                dutyStatus === 'IN_CARE' ? 'bg-emerald-500 text-slate-950 border-emerald-400' : 'bg-slate-800 border-slate-700 text-slate-300'
              }`}
            >
              3. Start Care
            </button>
            <button
              onClick={() => handleStateTransition('COMPLETED')}
              className={`p-2.5 rounded-xl font-extrabold border transition-all cursor-pointer ${
                dutyStatus === 'COMPLETED' ? 'bg-teal-400 text-slate-950 border-teal-300' : 'bg-slate-800 border-slate-700 text-slate-300'
              }`}
            >
              4. Complete Duty
            </button>
          </div>
        </div>

        {/* Patient & Care Instructions */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-brand-teal" /> Patient Clinical Care Requirements
          </h3>

          <div className="space-y-2">
            {initialDuty.careInstructions.map((instruction, idx) => {
              const isDone = completedTasks.includes(instruction);
              return (
                <button
                  key={idx}
                  onClick={() => toggleTask(instruction)}
                  className={`w-full p-3.5 rounded-2xl border text-left text-xs font-bold transition-all cursor-pointer flex items-start gap-3 ${
                    isDone
                      ? 'bg-teal-50 border-teal-200 text-slate-700 line-through'
                      : 'bg-white border-slate-200 text-slate-900 hover:border-teal-200 shadow-2xs'
                  }`}
                >
                  <CheckCircle className={`w-4 h-4 shrink-0 mt-0.5 ${isDone ? 'text-brand-teal' : 'text-slate-300'}`} />
                  <span>{instruction}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Turn-by-Turn Route & Contact Bar */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 pt-4">
          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <p className="text-xs font-black text-slate-900">{initialDuty.address.line1}, {initialDuty.address.city}</p>
              <p className="text-[11px] text-slate-500">Client Contact: <strong className="text-slate-900">{initialDuty.clientName} ({initialDuty.clientPhone})</strong></p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${initialDuty.address.line1}, ${initialDuty.address.city}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Navigation className="w-4 h-4 text-teal-400" /> Route
            </a>

            <a
              href={`tel:${initialDuty.clientPhone}`}
              className="py-2.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-brand-teal text-xs font-extrabold flex items-center justify-center gap-1.5 border border-teal-200 transition-colors cursor-pointer"
            >
              <Phone className="w-4 h-4 text-brand-teal" /> Call Client
            </a>
          </div>
        </div>

        {/* Operational Support Escalation */}
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-between text-xs text-rose-900">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
            <div>
              <p className="font-extrabold">Emergency / Delay Escalation</p>
              <p className="text-[11px] text-rose-700">Need operational support or delay escalation?</p>
            </div>
          </div>
          <a
            href="tel:+919211765429"
            className="px-3 py-1.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-[11px] whitespace-nowrap shadow-xs"
          >
            Call Operations
          </a>
        </div>
      </Card>
    </div>
  );
};
