import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import {
  Building2,
  Users,
  Calendar,
  CheckCircle2,
  ShieldCheck,
  FileSpreadsheet,
  ArrowRight
} from 'lucide-react';

export const OrgLandingPage: React.FC = () => {
  const [reqModalOpen, setReqModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="space-y-16 text-left py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">

      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 bg-canvas-teal text-brand-teal px-3.5 py-1.5 rounded-full text-xs font-extrabold border border-teal-200">
            <Building2 className="w-4 h-4 text-brand-teal" /> B2B Hospital & Healthcare Staffing Solutions
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-text-primary tracking-tight leading-tight">
            Instantly Scale Your Clinical Workforce With Managed In-House Professionals.
          </h1>
          <p className="text-base text-text-secondary leading-relaxed">
            Partner with Pulse n Care to fulfill ICU nursing shifts, ward attendants, night coverage, and specialized clinical requisitions with 100% verified, background-checked staff.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link to="/organization/dashboard">
              <Button size="lg" variant="primary" rightIcon={<ArrowRight className="w-5 h-5" />} className="bg-brand-teal hover:bg-brand-teal-hover font-bold">
                Access Hospital Portal
              </Button>
            </Link>
            <Button size="lg" variant="outline" onClick={() => setReqModalOpen(true)} className="font-bold border-border-default">
              Submit Staffing Requisition
            </Button>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="bg-white p-6 rounded-3xl border border-border-default shadow-subtle space-y-4">
            <h3 className="font-extrabold text-text-primary text-base border-b border-border-light pb-2 flex items-center justify-between">
              <span>B2B Staffing Overview</span>
              <span className="text-xs text-brand-teal font-mono">LIVE CAPACITY</span>
            </h3>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-canvas-secondary p-4 rounded-2xl border border-border-default">
                <span className="text-2xl font-extrabold text-brand-teal block">450+</span>
                <span className="text-xs text-text-muted font-bold">Verified RN Nurses</span>
              </div>
              <div className="bg-canvas-secondary p-4 rounded-2xl border border-border-default">
                <span className="text-2xl font-extrabold text-text-primary block">99.4%</span>
                <span className="text-xs text-text-muted font-bold">Shift SLA Fulfillment</span>
              </div>
            </div>

            <div className="p-4 bg-canvas-teal rounded-2xl border border-teal-200 flex items-center gap-3 text-xs text-teal-900 font-semibold">
              <ShieldCheck className="w-6 h-6 text-brand-teal shrink-0" />
              <span>Full compliance with NABH standards, State Medical Council registrations, and biometric attendance.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 space-y-3 border-border-default shadow-subtle">
          <div className="w-12 h-12 rounded-2xl bg-canvas-teal text-brand-teal flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-text-primary text-base">Bulk Ward & ICU Staffing</h3>
          <p className="text-xs text-text-secondary leading-relaxed">
            Deploy teams of 5 to 50 nurses for day/night ward rotations or temporary surge capacity.
          </p>
        </Card>

        <Card className="p-6 space-y-3 border-border-default shadow-subtle">
          <div className="w-12 h-12 rounded-2xl bg-canvas-teal text-brand-teal flex items-center justify-center">
            <Calendar className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-text-primary text-base">Interactive Ward Roster Grid</h3>
          <p className="text-xs text-text-secondary leading-relaxed">
            Manage shift schedules, attendance logs, OT tracking, and real-time coverage from a central hospital console.
          </p>
        </Card>

        <Card className="p-6 space-y-3 border-border-default shadow-subtle">
          <div className="w-12 h-12 rounded-2xl bg-canvas-teal text-brand-teal flex items-center justify-center">
            <FileSpreadsheet className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-text-primary text-base">Automated Timesheets & Invoicing</h3>
          <p className="text-xs text-text-secondary leading-relaxed">
            Consolidated monthly billing, verified digital sign-offs, and transparent hourly rate reporting.
          </p>
        </Card>
      </div>

      {/* Requisition Modal */}
      {reqModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-2xl space-y-5 text-left">
            <div className="flex justify-between items-center border-b border-border-default pb-3">
              <h3 className="text-lg font-extrabold text-text-primary flex items-center gap-2">
                <Building2 className="w-5 h-5 text-brand-teal" /> Submit Hospital Staffing Request
              </h3>
              <button onClick={() => setReqModalOpen(false)} className="text-text-muted hover:text-text-primary cursor-pointer">
                ✕
              </button>
            </div>

            {submitted ? (
              <div className="p-6 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-extrabold text-text-primary text-base">Requisition Received!</h4>
                <p className="text-xs text-text-muted">Our B2B Enterprise Account Manager will contact your hospital medical director within 30 minutes.</p>
                <Button variant="primary" onClick={() => { setSubmitted(false); setReqModalOpen(false); }} className="bg-brand-teal text-white font-bold">
                  Close
                </Button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-text-primary block mb-1">Organization / Hospital Name</label>
                  <input required placeholder="E.g. Max Hospital, HAL Airport Rd" className="w-full h-11 px-3 bg-canvas-secondary border border-border-default rounded-xl focus:outline-none focus:border-brand-teal" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-text-primary block mb-1">Required Qualification</label>
                    <select className="w-full h-11 px-3 bg-canvas-secondary border border-border-default rounded-xl focus:outline-none focus:border-brand-teal">
                      <option>B.Sc ICU Nurse</option>
                      <option>GNM Staff Nurse</option>
                      <option>Ward Attendant</option>
                      <option>Senior Physiotherapist</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-bold text-text-primary block mb-1">Staff Count Required</label>
                    <input type="number" defaultValue={5} min={1} className="w-full h-11 px-3 bg-canvas-secondary border border-border-default rounded-xl focus:outline-none focus:border-brand-teal" />
                  </div>
                </div>
                <div>
                  <label className="font-bold text-text-primary block mb-1">Contact Email & Phone</label>
                  <input required placeholder="medicaldirector@hospital.com" className="w-full h-11 px-3 bg-canvas-secondary border border-border-default rounded-xl focus:outline-none focus:border-brand-teal" />
                </div>
                <Button type="submit" variant="primary" className="w-full bg-brand-teal hover:bg-brand-teal-hover text-white font-bold h-11">
                  Submit Institutional Request
                </Button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
