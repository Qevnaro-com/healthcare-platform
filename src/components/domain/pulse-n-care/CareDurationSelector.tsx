import React, { useState } from 'react';
import { Card } from '../../common/Card';
import { Moon, CheckCircle2 } from 'lucide-react';
import { WhatsAppIcon } from '../../common/WhatsAppButton';
import { openWhatsApp } from '../../../utils/whatsapp';
import { clsx } from 'clsx';

export const CareDurationSelector: React.FC = () => {
  const [selectedShift, setSelectedShift] = useState<'short' | 'day' | 'shift12' | 'night' | 'livein'>('night');
  const [startDate, setStartDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return `${tomorrow.getFullYear()}-${String(tomorrow.getMonth() + 1).padStart(2, '0')}-${String(tomorrow.getDate()).padStart(2, '0')}`;
  });

  // Calculate overnight date rollover for night shift
  const calculateNightRollover = (startStr: string) => {
    const dateObj = new Date(startStr);
    dateObj.setDate(dateObj.getDate() + 1);
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
    return dateObj.toLocaleDateString('en-GB', options);
  };

  const nextDayFormatted = calculateNightRollover(startDate);

  const durationOptions = [
    { id: 'short', title: '2–4 Hours', label: 'Short Clinical Visit', desc: 'Ideal for wound dressing, injections, or catheter change', hours: 4 },
    { id: 'day', title: '8 Hours', label: 'Day Care Shift', desc: 'Monitored day support & medication management', hours: 8 },
    { id: 'shift12', title: '12 Hours', label: 'Half-Day Shift', desc: 'Continuous 12-hour day or night clinical care', hours: 12 },
    { id: 'night', title: 'Night Care (10 PM - 8 AM)', label: 'Overnight Shift', desc: 'Dedicated overnight supervision & vital monitoring', hours: 10, isNight: true },
    { id: 'livein', title: '24 Hours', label: 'Rotational 24×7 Care', desc: 'Two 12-hour rotating nurses for round-the-clock care', hours: 24 }
  ];

  return (
    <section className="py-12 bg-white border-b border-border-default">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-left">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-extrabold text-[#015498] uppercase tracking-widest block">
            Flexible Shift Options
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-text-primary tracking-tight">
            Choose duration &amp; shift schedules tailored to your patient.
          </h2>
          <p className="text-sm text-text-secondary">
            Select the exact timing your family requires. Our Operations Desk confirms qualified internal staff in Delhi NCR.
          </p>
        </div>

        {/* Duration Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {durationOptions.map((d) => {
            const isSelected = selectedShift === d.id;
            return (
              <div
                key={d.id}
                onClick={() => setSelectedShift(d.id as any)}
                className={clsx(
                  'p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between space-y-3 text-left',
                  isSelected
                    ? 'border-[#015498] bg-blue-50/60 ring-2 ring-[#015498]/20 shadow-xs'
                    : 'border-border-default bg-white hover:border-slate-300'
                )}
              >
                <div className="space-y-1">
                  <span className="font-extrabold text-text-primary text-sm block flex items-center gap-1">
                    {d.isNight && <Moon className="w-4 h-4 text-amber-500" />} {d.title}
                  </span>
                  <span className="text-[11px] font-bold text-[#015498] block">{d.label}</span>
                  <p className="text-[11px] text-text-muted mt-1 leading-tight">{d.desc}</p>
                </div>

                {isSelected && (
                  <span className="text-[10px] font-extrabold text-[#015498] flex items-center gap-1 pt-2 border-t border-blue-200">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Selected Shift
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Night Shift Date Rollover Calculator Banner */}
        {selectedShift === 'night' && (
          <Card className="p-5 border-amber-300 bg-amber-50 text-amber-950 space-y-3 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
                  <Moon className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-extrabold text-sm block">Overnight Shift Schedule &amp; Date Rollover</span>
                  <span className="text-amber-800">
                    Shift Start: <strong>10:00 PM ({startDate})</strong> → Shift End: <strong>08:00 AM ({nextDayFormatted})</strong> (10 Hours)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-xs font-bold text-amber-900">Start Date:</label>
                <input
                  aria-label="Care start date" type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="px-3 py-1.5 text-xs bg-white border border-amber-300 rounded-xl font-extrabold text-amber-950 focus:outline-none"
                />
              </div>
            </div>
          </Card>
        )}

        {/* Direct WhatsApp Instant Booking CTA */}
        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={() => openWhatsApp(`Hello Pulse n Care, I want to book Home Nursing for ${selectedShift.toUpperCase()} shift starting on ${startDate}.`)}
            className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold px-8 py-3.5 rounded-2xl cursor-pointer shadow-[0_6px_20px_rgba(37,211,102,0.4)] text-sm transition-transform hover:scale-105 active:scale-95"
          >
            <WhatsAppIcon className="w-4 h-4 fill-white" />
            <span>Confirm {selectedShift.toUpperCase()} Shift on WhatsApp</span>
          </button>
        </div>
      </div>
    </section>
  );
};
