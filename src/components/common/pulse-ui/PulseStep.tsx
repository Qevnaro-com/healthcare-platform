import React from 'react';
import { clsx } from 'clsx';
import { Check } from 'lucide-react';

export interface StepItem {
  id: string | number;
  label: string;
  description?: string;
}

export interface PulseStepProps {
  steps: StepItem[];
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
  className?: string;
}

export const PulseStepTracker: React.FC<PulseStepProps> = ({
  steps,
  currentStep,
  onStepClick,
  className
}) => {
  return (
    <div className={clsx('w-full py-2', className)}>
      <div className="flex items-center justify-between relative">
        {steps.map((step, idx) => {
          const isCompleted = idx < currentStep;
          const isCurrent = idx === currentStep;
          const isLast = idx === steps.length - 1;

          return (
            <React.Fragment key={step.id || idx}>
              <div
                onClick={() => onStepClick && onStepClick(idx)}
                className={clsx(
                  'flex items-center gap-2.5 z-10 select-none',
                  onStepClick && 'cursor-pointer group'
                )}
              >
                <div
                  className={clsx(
                    'w-8 h-8 rounded-full font-bold text-xs flex items-center justify-center transition-all duration-200 shrink-0',
                    isCompleted
                      ? 'bg-emerald-500 text-white shadow-sm'
                      : isCurrent
                      ? 'bg-brand-teal text-white ring-4 ring-brand-teal/20 shadow-sm font-extrabold'
                      : 'bg-slate-100 text-slate-400 border border-slate-300'
                  )}
                >
                  {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : idx + 1}
                </div>

                <div className="hidden sm:block text-left">
                  <p
                    className={clsx(
                      'text-xs font-heading font-semibold tracking-tight leading-tight',
                      isCurrent ? 'text-brand-teal' : isCompleted ? 'text-text-primary' : 'text-text-muted'
                    )}
                  >
                    {step.label}
                  </p>
                  {step.description && (
                    <p className="text-2xs text-text-muted font-sans mt-0.5">{step.description}</p>
                  )}
                </div>
              </div>

              {!isLast && (
                <div className="flex-1 mx-3 h-0.5 relative overflow-hidden rounded bg-slate-200">
                  <div
                    className={clsx(
                      'h-full transition-all duration-300',
                      idx < currentStep ? 'bg-emerald-500 w-full' : 'w-0'
                    )}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
