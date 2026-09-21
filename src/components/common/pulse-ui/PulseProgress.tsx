import React from 'react';
import { clsx } from 'clsx';

export interface PulseProgressProps {
  value: number; // 0 to 100
  max?: number;
  label?: string;
  showValue?: boolean;
  color?: 'teal' | 'blue' | 'emerald' | 'amber' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  className?: string;
}

export const PulseProgress: React.FC<PulseProgressProps> = ({
  value,
  max = 100,
  label,
  showValue = true,
  color = 'gradient',
  size = 'md',
  animated = true,
  className
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const colorMap = {
    teal: 'bg-brand-teal',
    blue: 'bg-brand-blue',
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-500',
    gradient: 'bg-gradient-to-r from-brand-teal via-brand-blue to-brand-teal'
  };

  const heightMap = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4'
  };

  return (
    <div className={clsx('w-full', className)}>
      {(label || showValue) && (
        <div className="flex justify-between items-center text-xs font-medium mb-1.5">
          {label && <span className="text-text-secondary">{label}</span>}
          {showValue && (
            <span className="text-brand-teal font-heading font-semibold ml-auto">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}

      <div className={clsx('w-full bg-slate-100 rounded-full overflow-hidden relative p-0.5 border border-slate-200/60', heightMap[size])}>
        <div
          className={clsx(
            'h-full rounded-full transition-all duration-500 ease-out relative',
            colorMap[color]
          )}
          style={{ width: `${percentage}%` }}
        >
          {animated && percentage > 0 && (
            <div className="absolute top-0 right-0 bottom-0 w-4 bg-white/40 blur-xs rounded-full animate-pulse" />
          )}
        </div>
      </div>
    </div>
  );
};
