import React from 'react';
import { clsx } from 'clsx';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { SurfaceVariant } from './PulseSurface';
import { PulseSurface } from './PulseSurface';

export interface PulseMetricProps {
  label: string;
  value: string | number;
  subvalue?: string;
  change?: number;
  changeLabel?: string;
  trend?: 'up' | 'down' | 'neutral';
  status?: 'success' | 'warning' | 'danger' | 'info' | 'pending' | 'neutral';
  icon?: React.ReactNode;
  sparklineData?: number[];
  variant?: SurfaceVariant;
  onClick?: () => void;
  className?: string;
  tooltip?: string;
}

export const PulseMetric: React.FC<PulseMetricProps> = ({
  label,
  value,
  subvalue,
  change,
  changeLabel,
  trend = 'neutral',
  status = 'info',
  icon,
  sparklineData = [12, 18, 14, 22, 19, 28, 25, 32],
  variant = 'raised',
  onClick,
  className,
  tooltip
}) => {
  const statusGlowMap = {
    success: 'before:bg-emerald-500/20 text-emerald-700 bg-emerald-50 border-emerald-200',
    warning: 'before:bg-amber-500/20 text-amber-700 bg-amber-50 border-amber-200',
    danger: 'before:bg-rose-500/20 text-rose-700 bg-rose-50 border-rose-200',
    info: 'before:bg-brand-teal/20 text-brand-teal bg-teal-50/50 border-brand-teal/20',
    pending: 'before:bg-sky-500/20 text-sky-700 bg-sky-50 border-sky-200',
    neutral: 'before:bg-slate-500/20 text-slate-700 bg-slate-50 border-slate-200'
  };

  const trendIcon = trend === 'up' ? (
    <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
  ) : trend === 'down' ? (
    <TrendingDown className="w-3.5 h-3.5 text-rose-600" />
  ) : (
    <Minus className="w-3.5 h-3.5 text-slate-400" />
  );

  const trendColorClass = trend === 'up' 
    ? 'text-emerald-700 bg-emerald-50 border-emerald-200' 
    : trend === 'down' 
    ? 'text-rose-700 bg-rose-50 border-rose-200' 
    : 'text-slate-600 bg-slate-50 border-slate-200';

  // Compute simple SVG path for sparkline
  const maxSpark = Math.max(...sparklineData, 1);
  const minSpark = Math.min(...sparklineData, 0);
  const range = maxSpark - minSpark || 1;
  const points = sparklineData
    .map((val, idx) => {
      const x = (idx / (sparklineData.length - 1)) * 64;
      const y = 20 - ((val - minSpark) / range) * 16;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <PulseSurface
      variant={variant}
      interactive={Boolean(onClick)}
      onClick={onClick}
      padding="md"
      className={clsx('relative overflow-hidden group', className)}
      title={tooltip}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="text-xs font-medium uppercase tracking-wider text-text-muted">
          {label}
        </span>
        {icon && (
          <div className={clsx('p-2 rounded-lg border text-sm transition-transform group-hover:scale-105', statusGlowMap[status])}>
            {icon}
          </div>
        )}
      </div>

      <div className="flex items-baseline justify-between gap-2 my-1">
        <div>
          <span className="font-heading font-extrabold text-2xl sm:text-3xl text-text-primary tracking-tight">
            {value}
          </span>
          {subvalue && (
            <span className="text-xs font-medium text-text-muted ml-1.5">{subvalue}</span>
          )}
        </div>

        {/* Sparkline mini chart */}
        {sparklineData && sparklineData.length > 1 && (
          <div className="w-16 h-6 shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
            <svg width="64" height="20" className="overflow-visible">
              <polyline
                fill="none"
                stroke={status === 'success' ? '#10B981' : status === 'danger' ? '#F43F5E' : '#0EA5A4'}
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={points}
              />
            </svg>
          </div>
        )}
      </div>

      {(change !== undefined || changeLabel) && (
        <div className="mt-2 pt-2 border-t border-border-light flex items-center justify-between text-xs">
          <div className={clsx('inline-flex items-center gap-1 px-1.5 py-0.5 rounded border text-xs font-semibold', trendColorClass)}>
            {trendIcon}
            {change !== undefined && (
              <span>
                {change > 0 ? `+${change}%` : `${change}%`}
              </span>
            )}
          </div>
          {changeLabel && (
            <span className="text-text-muted text-xs truncate max-w-[140px]">
              {changeLabel}
            </span>
          )}
        </div>
      )}
    </PulseSurface>
  );
};
