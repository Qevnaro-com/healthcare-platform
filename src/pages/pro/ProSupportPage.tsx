import React, { useState } from 'react';
import { PhoneCall, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { Button } from '../../components/common/Button';

export const ProSupportPage: React.FC = () => {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSubject('');
      setDescription('');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Healthcare Staff Support Desk</h1>
          <p className="text-slate-600 text-sm mt-1">24/7 Field Support, SOS Dispatch Assistance, and Payout Inquiries</p>
        </div>

        {/* Emergency SOS Callout */}
        <div className="p-5 bg-gradient-to-r from-rose-500 to-red-600 text-white rounded-2xl shadow-md flex justify-between items-center">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-white/20 uppercase tracking-wider">
              <ShieldAlert className="w-3.5 h-3.5" /> Clinical SOS Helpline
            </span>
            <h2 className="text-lg font-bold">In-Person Emergency or Safety Incident?</h2>
            <p className="text-xs text-rose-100">Tap below for 24/7 priority operations hotline connecting to field leads.</p>
          </div>
          <a
            href="tel:+919211765429"
            className="bg-white text-rose-700 font-extrabold px-5 py-3 rounded-xl shadow hover:bg-rose-50 transition-colors text-xs flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <PhoneCall className="w-4 h-4" /> Call Dispatch Desk
          </a>
        </div>

        {/* Support Ticket Form */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Submit Non-Emergency Field Ticket</h2>

          {submitted ? (
            <div className="p-4 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 flex items-center gap-2 text-xs font-semibold">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Ticket submitted! Operations manager will call you within 15 minutes.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Issue Subject</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Discrepancy in shift hours for visit #BK-1002"
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Issue Details</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  placeholder="Provide context regarding patient address, shift timing, or payment..."
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>

              <Button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-6 py-3 rounded-xl cursor-pointer">
                Send Support Ticket
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
