import React, { useState } from 'react';
import { Activity, ShieldCheck, Zap, Users } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { MetricCard } from '../../components/common/CardPrimitives';
import {
  PulseHeader,
  PulseSection,
  PulsePanel,
  PulseTimeline,
  PulseStepTracker
} from '../../components/common/PulseUI';

export const DesignSystemPage: React.FC = () => {
  const [activeStep, setActiveStep] = useState(2);

  const tealScale = [
    { name: 'Teal 50', hex: '#F0FDFA', bg: 'bg-brand-teal-50', text: 'text-brand-teal-900' },
    { name: 'Teal 100', hex: '#CCFBF1', bg: 'bg-brand-teal-100', text: 'text-brand-teal-900' },
    { name: 'Teal 200', hex: '#99F6E4', bg: 'bg-brand-teal-200', text: 'text-brand-teal-900' },
    { name: 'Teal 300', hex: '#5EEAD4', bg: 'bg-brand-teal-300', text: 'text-brand-teal-900' },
    { name: 'Teal 400', hex: '#2DD4BF', bg: 'bg-brand-teal-400', text: 'text-white' },
    { name: 'Teal 500', hex: '#14B8A6', bg: 'bg-brand-teal-500', text: 'text-white' },
    { name: 'Teal 600 (Primary)', hex: '#0EA5A4', bg: 'bg-brand-teal-600', text: 'text-white' },
    { name: 'Teal 700 (Dark)', hex: '#0F766E', bg: 'bg-brand-teal-700', text: 'text-white' },
    { name: 'Teal 800', hex: '#115E59', bg: 'bg-brand-teal-800', text: 'text-white' },
    { name: 'Teal 900', hex: '#134E4A', bg: 'bg-brand-teal-900', text: 'text-white' },
  ];

  const blueScale = [
    { name: 'Blue 50', hex: '#EFF6FF', bg: 'bg-care-blue-50', text: 'text-care-blue-900' },
    { name: 'Blue 100', hex: '#DBEAFE', bg: 'bg-care-blue-100', text: 'text-care-blue-900' },
    { name: 'Blue 200', hex: '#BFDBFE', bg: 'bg-care-blue-200', text: 'text-care-blue-900' },
    { name: 'Blue 400', hex: '#60A5FA', bg: 'bg-care-blue-400', text: 'text-white' },
    { name: 'Blue 600 (Ops)', hex: '#2563EB', bg: 'bg-care-blue-600', text: 'text-white' },
    { name: 'Blue 700 (Deep)', hex: '#1D4ED8', bg: 'bg-care-blue-700', text: 'text-white' },
    { name: 'Blue 900', hex: '#1E3A8A', bg: 'bg-care-blue-900', text: 'text-white' },
  ];

  const sampleTimeline = [
    {
      id: '1',
      title: 'Facility Shift Request Created',
      description: 'St. Jude General Hospital requested 3 ICU Nurses for Night Shift',
      timestamp: '10:00 AM',
      status: 'completed' as const,
      actor: 'Dispatcher Ops'
    },
    {
      id: '2',
      title: 'Automated AI Staff Matching',
      description: 'Algorithm selected 4 verified RN candidates with 98% match confidence',
      timestamp: '10:02 AM',
      status: 'current' as const,
      actor: 'MatchEngine v2.4'
    },
    {
      id: '3',
      title: 'Credentialing & Geofence Verification',
      description: 'Pending GPS arrival signal at facility perimeter',
      timestamp: 'Pending',
      status: 'upcoming' as const
    }
  ];

  return (
    <div className="min-h-screen bg-surface-page py-8 px-4 sm:px-6 lg:px-8 space-y-10 text-left">
      {/* Header */}
      <PulseHeader
        tag="Pulse UI v2.1 Specification"
        title="Pulse n Care Signature Design System"
        subtitle="Operational, High-Trust, and Dynamic UI Specification for Clinical & Healthcare Platform Ecosystems"
        statusLabel="Design Tokens V2.1 Active"
        statusType="success"
      />

      {/* 1. BRAND COLOR PALETTE & SCALE */}
      <PulseSection title="1. Brand Color System (70 / 20 / 7 / 3 Distribution)">
        <div className="space-y-6">
          {/* Brand Teal Scale */}
          <div className="space-y-2">
            <h4 className="text-xs font-black text-text-primary uppercase tracking-wider flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-brand-teal" />
              Brand Teal Tonal Scale (Teal = Care)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2">
              {tealScale.map((color) => (
                <div key={color.name} className={`p-3 rounded-card text-xs font-bold ${color.bg} ${color.text} border border-black/5 flex flex-col justify-between h-20 shadow-subtle`}>
                  <span className="text-[10px] font-extrabold uppercase">{color.name}</span>
                  <span className="text-[11px] font-mono font-black">{color.hex}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Care Blue Scale */}
          <div className="space-y-2">
            <h4 className="text-xs font-black text-text-primary uppercase tracking-wider flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-care-blue-600" />
              Care Blue Family (Blue = Operations & B2B)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
              {blueScale.map((color) => (
                <div key={color.name} className={`p-3 rounded-card text-xs font-bold ${color.bg} ${color.text} border border-black/5 flex flex-col justify-between h-20 shadow-subtle`}>
                  <span className="text-[10px] font-extrabold uppercase">{color.name}</span>
                  <span className="text-[11px] font-mono font-black">{color.hex}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Accents & Navy */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3 bg-brand-navy text-white rounded-card border border-white/10 h-20 flex flex-col justify-between">
              <span className="text-[10px] font-black uppercase text-teal-300">Dark Navy Anchor</span>
              <span className="text-xs font-mono font-bold">#050F33</span>
            </div>
            <div className="p-3 bg-care-cyan text-white rounded-card border border-white/10 h-20 flex flex-col justify-between">
              <span className="text-[10px] font-black uppercase">Care Cyan Accent</span>
              <span className="text-xs font-mono font-bold">#06B6D4</span>
            </div>
            <div className="p-3 bg-warm-soft text-amber-950 rounded-card border border-amber-200 h-20 flex flex-col justify-between">
              <span className="text-[10px] font-black uppercase text-amber-800">Warm Care Accent</span>
              <span className="text-xs font-mono font-bold">#F59E0B / #FFFBEB</span>
            </div>
            <div className="p-3 bg-emerald-500 text-white rounded-card border border-emerald-600 h-20 flex flex-col justify-between">
              <span className="text-[10px] font-black uppercase">Status Success</span>
              <span className="text-xs font-mono font-bold">#16A34A</span>
            </div>
          </div>
        </div>
      </PulseSection>

      {/* 2. SURFACE SYSTEM HIERARCHY */}
      <PulseSection title="2. Surface Hierarchy (Surfaces 0 to 5)">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-5 bg-surface-page rounded-card border border-border-default space-y-2 shadow-subtle">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-text-muted">Surface 0 · Page Background</span>
            <h4 className="font-extrabold text-base text-text-primary">#F8FAFC</h4>
            <p className="text-xs text-text-muted">Default neutral canvas for all main viewports.</p>
          </div>

          <div className="p-5 bg-white rounded-card border border-border-default space-y-2 shadow-card">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-teal">Surface 1 · Standard Card</span>
            <h4 className="font-extrabold text-base text-text-primary">#FFFFFF</h4>
            <p className="text-xs text-text-muted">Pure white card elevation with subtle shadow.</p>
          </div>

          <div className="p-5 bg-surface-brand rounded-card border border-brand-teal-200 space-y-2 shadow-subtle">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-teal-700">Surface 2 · Tinted Brand Surface</span>
            <h4 className="font-extrabold text-base text-brand-teal-900">#F0FDFA</h4>
            <p className="text-xs text-brand-teal-700">Soft teal tint for highlighted care cards and steps.</p>
          </div>

          <div className="p-5 bg-surface-blue rounded-card border border-care-blue-200 space-y-2 shadow-subtle">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-care-blue-700">Surface 3 · Operational Blue</span>
            <h4 className="font-extrabold text-base text-care-blue-900">#EFF6FF</h4>
            <p className="text-xs text-care-blue-700">Operational blue surface for B2B facility metrics.</p>
          </div>

          <div className="p-5 bg-surface-clinical rounded-card border border-teal-200 space-y-2 shadow-subtle">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-800">Surface 4 · Clinical Soft</span>
            <h4 className="font-extrabold text-base text-slate-900">#EEF6F7</h4>
            <p className="text-xs text-slate-600">Soft clinical background for medical parameters.</p>
          </div>

          <div className="p-5 bg-surface-dark-textured text-white rounded-card border border-white/10 space-y-2 shadow-floating">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-300">Surface 5 · Premium Dark Anchor</span>
            <h4 className="font-extrabold text-base text-white">#050F33</h4>
            <p className="text-xs text-slate-300">Selective navy closing surface & visual anchor panels.</p>
          </div>
        </div>
      </PulseSection>

      {/* 3. PROCEDURAL TEXTURES V2 */}
      <PulseSection title="3. Procedural Texture System V2 (CSS-Only)">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-card border border-border-default bg-pulse-grid h-28 space-y-1">
            <span className="font-black text-text-primary block">1. Pulse Grid</span>
            <p className="text-text-muted text-[11px]">Fine medical grid 2-5% opacity</p>
          </div>

          <div className="p-4 rounded-card border border-border-default bg-blueprint-dots h-28 space-y-1">
            <span className="font-black text-text-primary block">2. Blueprint Dots</span>
            <p className="text-text-muted text-[11px]">Refined dotted grid for B2B & admin</p>
          </div>

          <div className="p-4 rounded-card border border-border-default bg-care-wave h-28 space-y-1">
            <span className="font-black text-text-primary block">3. Care Wave</span>
            <p className="text-text-muted text-[11px]">Soft organic radial wave</p>
          </div>

          <div className="p-4 rounded-card border border-border-default bg-clinical-cross h-28 space-y-1">
            <span className="font-black text-text-primary block">4. Clinical Cross Grid</span>
            <p className="text-text-muted text-[11px]">Healthcare cross-inspired geometry</p>
          </div>
        </div>
      </PulseSection>

      {/* 4. BUTTON PRIMITIVES & VARIANTS */}
      <PulseSection title="4. Button System & Action Variants">
        <div className="flex flex-wrap items-center gap-3 bg-white p-6 rounded-surface border border-border-default shadow-subtle">
          <Button variant="primary">Primary Teal</Button>
          <Button variant="secondary">Secondary Border</Button>
          <Button variant="ops">Care Blue Ops</Button>
          <Button variant="navy">Dark Navy</Button>
          <Button variant="outline">Outline Teal</Button>
          <Button variant="ghost">Ghost Text</Button>
          <Button variant="danger">Danger Red</Button>
          <div className="p-2 rounded-xl bg-brand-navy inline-block">
            <Button variant="darkCTA">Dark Surface CTA</Button>
          </div>
        </div>
      </PulseSection>

      {/* 5. METRICS & OPERATIONAL CARDS */}
      <PulseSection title="5. Metric Cards & Operational Panels">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            label="Active Duties Today"
            value="124"
            change="+8 from scheduled"
            changeType="positive"
            accent="teal"
            icon={<Users className="w-4 h-4" />}
          />
          <MetricCard
            label="B2B Shifts Fulfilled"
            value="98.4%"
            change="Target 95%"
            changeType="positive"
            accent="blue"
            icon={<Zap className="w-4 h-4" />}
          />
          <MetricCard
            label="Timesheets Pending"
            value="14"
            change="Action needed"
            changeType="neutral"
            accent="warm"
            icon={<Activity className="w-4 h-4" />}
          />
          <MetricCard
            label="Compliance SLA"
            value="100%"
            change="All verified"
            changeType="positive"
            accent="navy"
            icon={<ShieldCheck className="w-4 h-4" />}
          />
        </div>
      </PulseSection>

      {/* 6. TIMELINE & STEP TRACKER */}
      <PulseSection title="6. Workflow Tracker & Step Rail">
        <div className="space-y-6">
          <PulsePanel title="4-Step Intake Progress Rail">
            <PulseStepTracker
              steps={[
                { id: 1, label: '01 CARE', description: 'Service selection' },
                { id: 2, label: '02 PATIENT & LOCATION', description: 'Intake info' },
                { id: 3, label: '03 SCHEDULE & NEEDS', description: 'Timing & tasks' },
                { id: 4, label: '04 REVIEW & REQUEST', description: 'Dispatch' }
              ]}
              currentStep={activeStep}
              onStepClick={(s) => setActiveStep(s)}
            />
          </PulsePanel>

          <PulsePanel title="Duty Lifecycle Timeline">
            <PulseTimeline items={sampleTimeline} />
          </PulsePanel>
        </div>
      </PulseSection>
    </div>
  );
};
