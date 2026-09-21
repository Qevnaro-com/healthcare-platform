import React from 'react';
import { clsx } from 'clsx';
import { PulseSurface } from './PulseSurface';

export interface ChartBarData {
  label: string;
  value: number;
  max?: number;
  color?: string;
}

export interface PulseChartProps {
  title?: string;
  subtitle?: string;
  data: ChartBarData[];
  className?: string;
}

export const PulseMiniChart: React.FC<PulseChartProps> = ({
  title,
  subtitle,
  data,
  className
}) => {
  const maxValue = Math.max(...data.map((d) => d.value), 1);

  return (
    <PulseSurface variant="raised" padding="md" className={clsx('relative', className)}>
      {(title || subtitle) && (
        <div className="mb-4">
          {title && <h4 className="font-heading font-semibold text-sm text-text-primary">{title}</h4>}
          {subtitle && <p className="text-2xs text-text-muted mt-0.5">{subtitle}</p>}
        </div>
      )}

      <div className="space-y-3">
        {data.map((item, idx) => {
          const pct = Math.round((item.value / (item.max || maxValue)) * 100);

          return (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between items-center text-xs font-medium">
                <span className="text-text-secondary">{item.label}</span>
                <span className="font-heading font-semibold text-text-primary">{item.value}</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={clsx('h-full rounded-full transition-all duration-500', item.color || 'bg-brand-teal')}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </PulseSurface>
  );
};
