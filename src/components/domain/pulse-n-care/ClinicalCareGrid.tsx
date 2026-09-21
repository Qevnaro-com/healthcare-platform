import React, { useState } from 'react';
import { Card } from '../../common/Card';
import { Activity, Pill, ShieldCheck, Stethoscope, Droplet, Wind, ChevronDown, ChevronUp, HeartPulse, CheckCircle2 } from 'lucide-react';
import { clsx } from 'clsx';
import { VISUAL_ASSETS } from '../../../data/visualAssets';

export const ClinicalCareGrid: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>('vitals');

  const capabilities = [
    {
      id: 'vitals',
      icon: <Activity className="w-5 h-5 text-brand-teal" />,
      title: 'Vitals Tracking & Clinical Observation',
      shortDesc: 'Regular monitoring of vital parameters with digital charting for attending physician review.',
      details: [
        'Blood Pressure (BP) measurement & logging',
        'Pulse Rate & Heart Rate observation',
        'Oxygen Saturation (SpO₂) monitoring via oximeter',
        'Body Temperature recording',
        'Blood Glucose (GRBS) monitoring via glucometer'
      ],
      microUI: (
        <div className="p-3 bg-teal-50/70 border border-teal-200/80 rounded-xl space-y-2 mt-3 text-xs">
          <div className="flex items-center justify-between font-bold text-teal-900">
            <span className="flex items-center gap-1.5"><HeartPulse className="w-4 h-4 text-brand-teal" /> Live Vitals Metric Stream</span>
            <span className="text-[10px] text-teal-700 bg-teal-100 px-2 py-0.5 rounded-full font-mono">SpO₂: 98% | BP: 120/80</span>
          </div>
          <div className="w-full bg-teal-200/50 h-1.5 rounded-full overflow-hidden">
            <div className="bg-brand-teal h-full w-[85%] rounded-full animate-pulse" />
          </div>
        </div>
      ),
      image: VISUAL_ASSETS.clinicalVitals.url
    },
    {
      id: 'medication',
      icon: <Pill className="w-5 h-5 text-brand-teal" />,
      title: 'Medication Administration',
      shortDesc: 'Accurate and timely administration of prescribed medications within professional nurse scope.',
      details: [
        'Oral medication timely dosage administration',
        'Insulin injection administration & timing',
        'Intramuscular (IM) injection administration',
        'Intravenous (IV) fluids & IV medication management as prescribed'
      ],
      microUI: (
        <div className="p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-xl space-y-2 mt-3 text-xs">
          <div className="flex items-center justify-between font-bold text-emerald-900">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Prescribed Dose Verification</span>
            <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-mono">5-Rights Checked</span>
          </div>
        </div>
      ),
      image: VISUAL_ASSETS.clinicalMedication.url
    },
    {
      id: 'wound',
      icon: <ShieldCheck className="w-5 h-5 text-brand-teal" />,
      title: 'Wound & Surgical Care',
      shortDesc: 'Sterile dressing techniques for surgical incisions, pressure sores, and diabetic wounds.',
      details: [
        'Post-operative surgical incision dressing',
        'Bedsore / Pressure ulcer sterile dressing & grade assessment',
        'Diabetic foot ulcer cleaning & protective care',
        'Aseptic technique adherence for infection prevention'
      ],
      microUI: (
        <div className="p-3 bg-blue-50/70 border border-blue-200/80 rounded-xl space-y-2 mt-3 text-xs">
          <div className="flex items-center justify-between font-bold text-blue-900">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-blue-600" /> Sterile Dressing Protocol</span>
            <span className="text-[10px] text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full font-mono">Aseptic Tech</span>
          </div>
        </div>
      ),
      image: VISUAL_ASSETS.clinicalWoundCare.url
    },
    {
      id: 'tube',
      icon: <Droplet className="w-5 h-5 text-brand-teal" />,
      title: 'Tube Feeding Management',
      shortDesc: 'Enteral nutrition administration, tube hygiene, and flushing routines.',
      details: [
        'Ryle’s / Nasogastric (NG) tube meal administration',
        'Percutaneous Endoscopic Gastrostomy (PEG) feeding support',
        'Tube flushing & blockage prevention routines',
        'Sanitization of feeding equipment & posture positioning'
      ],
      microUI: (
        <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl space-y-2 mt-3 text-xs">
          <div className="flex items-center justify-between font-bold text-amber-900">
            <span className="flex items-center gap-1.5"><Droplet className="w-4 h-4 text-amber-600" /> NG/PEG Nutrition Schedule</span>
            <span className="text-[10px] text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full font-mono">Flushed & Sanitized</span>
          </div>
        </div>
      ),
      image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&q=80&asset=proc_tube'
    },
    {
      id: 'catheter',
      icon: <Stethoscope className="w-5 h-5 text-brand-teal" />,
      title: 'Catheter & Stoma Care',
      shortDesc: 'Catheter hygiene, drainage bag management, and stoma bag maintenance.',
      details: [
        'Foley’s urinary catheter care & bag drainage logging',
        'Colostomy / Stoma bag change & skin barrier care',
        'Stoma-site hygiene & infection monitoring',
        'Perineal hygiene routines'
      ],
      microUI: (
        <div className="p-3 bg-purple-50/70 border border-purple-200/80 rounded-xl space-y-2 mt-3 text-xs">
          <div className="flex items-center justify-between font-bold text-purple-900">
            <span className="flex items-center gap-1.5"><Stethoscope className="w-4 h-4 text-purple-600" /> Hygiene & Output Logging</span>
            <span className="text-[10px] text-purple-800 bg-purple-100 px-2 py-0.5 rounded-full font-mono">Daily Charted</span>
          </div>
        </div>
      ),
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80&asset=proc_cath'
    },
    {
      id: 'respiratory',
      icon: <Wind className="w-5 h-5 text-brand-teal" />,
      title: 'Respiratory & Medical Equipment Handling',
      shortDesc: 'Assistance with home medical equipment based on the patient’s prescribed care plan.',
      details: [
        'Oxygen Concentrator & Cylinder flow adjustment',
        'Suction Machine operation & airway clearance support',
        'CPAP / BiPAP mask fitting & compliance',
        'Home ventilator monitoring & alarm awareness'
      ],
      microUI: (
        <div className="p-3 bg-cyan-50/70 border border-cyan-200/80 rounded-xl space-y-2 mt-3 text-xs">
          <div className="flex items-center justify-between font-bold text-cyan-900">
            <span className="flex items-center gap-1.5"><Wind className="w-4 h-4 text-cyan-600" /> O₂ Flow & Suction Protocol</span>
            <span className="text-[10px] text-cyan-800 bg-cyan-100 px-2 py-0.5 rounded-full font-mono">Equipment Verified</span>
          </div>
        </div>
      ),
      image: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=800&q=80&asset=proc_resp'
    }
  ];

  return (
    <section className="py-12 bg-canvas-secondary border-b border-border-default">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-left">
        {/* Section Editorial Header */}
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-extrabold text-brand-teal uppercase tracking-widest block">
            Clinical Scope of Home Nursing
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-text-primary tracking-tight">
            Clinical care, everyday support and continuous observation.
          </h2>
          <p className="text-sm text-text-secondary">
            Pulse n Care home nursing is designed around the patient's care requirements, helping families manage clinical routines, daily support, and ongoing observation from home.
          </p>
        </div>

        {/* 2-Column Capability Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {capabilities.map((cap) => {
            const isExpanded = expandedId === cap.id;
            return (
              <Card
                key={cap.id}
                className={clsx(
                  'p-6 space-y-4 border transition-all bg-white shadow-subtle relative',
                  isExpanded ? 'border-brand-teal ring-1 ring-brand-teal/30' : 'border-border-default'
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-canvas-teal flex items-center justify-center shrink-0 border border-teal-200">
                      {cap.icon}
                    </div>
                    <div>
                      <h3 className="font-extrabold text-text-primary text-base">{cap.title}</h3>
                      <p className="text-xs text-text-secondary mt-0.5">{cap.shortDesc}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setExpandedId(isExpanded ? null : cap.id)}
                    className="p-1.5 rounded-lg text-text-muted hover:text-brand-teal hover:bg-canvas-tertiary transition-colors cursor-pointer shrink-0"
                    title={isExpanded ? 'Collapse' : 'Expand'}
                  >
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>

                {/* Optional Image Header */}
                {cap.image && isExpanded && (
                  <div className="rounded-xl overflow-hidden aspect-video w-full border border-border-default">
                    <img src={cap.image} alt={cap.title} className="w-full h-full object-cover object-top" />
                  </div>
                )}

                {/* Dedicated Animated Vector SVG Component */}
                {cap.microUI}

                {/* Detailed Capability Checklist */}
                {isExpanded && (
                  <div className="pt-3 border-t border-border-light space-y-2 text-xs">
                    <span className="font-extrabold text-brand-teal uppercase tracking-wider text-[10px] block">
                      Prescribed Care Scope:
                    </span>
                    <ul className="space-y-1.5 text-text-secondary">
                      {cap.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-teal shrink-0 mt-1.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
