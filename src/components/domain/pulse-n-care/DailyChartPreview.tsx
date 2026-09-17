import React from 'react';
import { Card } from '../../common/Card';
import { FileText, ShieldCheck, CheckCircle2, UserCheck } from 'lucide-react';

export const DailyChartPreview: React.FC = () => {
  const chartRows = [
    { time: '08:00 AM', bp: '122 / 78 mmHg', pulse: '74 bpm', spo2: '98%', temp: '98.4°F', notes: 'Morning vitals normal. Patient comfortable.' },
    { time: '10:00 AM', bp: '—', pulse: '—', spo2: '—', temp: '—', notes: 'Oral meds administered as prescribed.' },
    { time: '12:00 PM', bp: '120 / 76 mmHg', pulse: '76 bpm', spo2: '97%', temp: '98.2°F', notes: 'Fluid intake logged. Position rotated.' },
    { time: '02:00 PM', bp: '—', pulse: '—', spo2: '—', temp: '—', notes: 'Surgical incision dressing changed (sterile).' },
    { time: '06:00 PM', bp: '124 / 80 mmHg', pulse: '78 bpm', spo2: '98%', temp: '98.6°F', notes: 'Evening vitals recorded. Family briefed.' }
  ];

  return (
    <section className="py-12 bg-canvas-secondary border-b border-border-default">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-left">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-extrabold text-brand-teal uppercase tracking-widest block">
            Shift Documentation & Safety
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-text-primary tracking-tight">
            Every shift is part of a structured care journey.
          </h2>
          <p className="text-sm text-text-secondary">
            Our nurses log daily vitals, medication timings, and clinical notes to keep attending physicians and family members completely informed.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            {/* Illustrative Nursing Chart Table Card */}
            <Card className="p-6 border-border-default shadow-subtle bg-white space-y-4">
              <div className="flex items-center justify-between border-b border-border-light pb-3">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-brand-teal" />
                  <h3 className="font-extrabold text-text-primary text-sm">Daily Nursing Chart & Vitals Log</h3>
                </div>
                <span className="text-[10px] font-mono font-bold bg-amber-50 text-amber-900 border border-amber-200 px-2.5 py-1 rounded-full uppercase">
                  Illustrative Care-Chart Example
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-border-default bg-canvas-secondary text-text-secondary font-bold uppercase text-[10px]">
                      <th className="p-3">Time</th>
                      <th className="p-3">Blood Pressure</th>
                      <th className="p-3">Pulse</th>
                      <th className="p-3">SpO₂</th>
                      <th className="p-3">Temp</th>
                      <th className="p-3">Nursing Intervention Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-light">
                    {chartRows.map((row, idx) => (
                      <tr key={idx} className="hover:bg-canvas-teal/10 transition-colors">
                        <td className="p-3 font-mono font-extrabold text-brand-teal">{row.time}</td>
                        <td className="p-3 font-semibold text-text-primary">{row.bp}</td>
                        <td className="p-3 font-semibold text-text-primary">{row.pulse}</td>
                        <td className="p-3 font-semibold text-emerald-700">{row.spo2}</td>
                        <td className="p-3 font-semibold text-text-primary">{row.temp}</td>
                        <td className="p-3 text-text-secondary italic">{row.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-3 bg-canvas-teal rounded-xl border border-teal-200 text-xs text-teal-900 flex items-center justify-between font-medium">
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-brand-teal shrink-0" />
                  <span>Attending physician can review logs during follow-up visits.</span>
                </span>
                <span className="text-[10px] font-bold text-brand-teal uppercase">Care Governance</span>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-4 space-y-4">
            <div className="rounded-2xl overflow-hidden h-52 border border-border-default shadow-card">
              <img src="/assets/services/home-nursing/pulse-n-care-documentation.webp" alt="Shift Documentation" className="w-full h-full object-cover" />
            </div>
            <div className="p-4 bg-white rounded-2xl border border-border-default shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-teal-900">
                <UserCheck className="w-4 h-4 text-brand-teal" />
                <span>Verified Shift Handover Protocol</span>
              </div>
              <p className="text-xs text-text-secondary">
                Shift logs are digitally timestamped and reviewed by Pulse n Care Clinical Operations Supervisors.
              </p>
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Compliance Audit: 100% Passed
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
