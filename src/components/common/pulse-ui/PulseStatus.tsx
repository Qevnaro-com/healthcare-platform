import React from 'react';
import { clsx } from 'clsx';

export type PulseStatusType = 'success' | 'warning' | 'danger' | 'info' | 'pending' | 'active' | 'neutral';

export interface PulseStatusProps {
  status: PulseStatusType;
  label?: React.ReactNode;
  pulse?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'subtle' | 'solid' | 'outline';
  className?: string;
}

export const PulseStatus: React.FC<PulseStatusProps> = ({
  status = 'info',
  label,
  pulse = true,
  size = 'md',
  className
}) => {
  const statusStyles: Record<PulseStatusType, { badge: string; dot: string; ping: string }> = {
    success: {
      badge: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
      dot: 'bg-emerald-500',
      ping: 'bg-emerald-400'
    },
    warning: {
      badge: 'bg-amber-50 text-amber-700 border-amber-200/80',
      dot: 'bg-amber-500',
      ping: 'bg-amber-400'
    },
    danger: {
      badge: 'bg-rose-50 text-rose-700 border-rose-200/80',
      dot: 'bg-rose-500',
      ping: 'bg-rose-400'
    },
    info: {
      badge: 'bg-teal-50 text-brand-teal border-brand-teal/20',
      dot: 'bg-brand-teal',
      ping: 'bg-brand-teal'
    },
    pending: {
      badge: 'bg-sky-50 text-sky-700 border-sky-200/80',
      dot: 'bg-sky-500',
      ping: 'bg-sky-400'
    },
    active: {
      badge: 'bg-blue-50 text-brand-blue border-brand-blue/20',
      dot: 'bg-brand-blue',
      ping: 'bg-brand-blue'
    },
    neutral: {
      badge: 'bg-slate-100 text-slate-700 border-slate-200',
      dot: 'bg-slate-400',
      ping: 'bg-slate-300'
    }
  };

  const sizeStyles = {
    sm: 'text-2xs px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3 py-1.5 gap-2 font-semibold'
  };

  const dotSize = size === 'sm' ? 'w-1.5 h-1.5' : size === 'lg' ? 'w-2.5 h-2.5' : 'w-2 h-2';

  const cfg = statusStyles[status] || statusStyles.info;

  return (
    <span
      className={clsx(
        'inline-flex items-center font-medium rounded-full border transition-colors select-none',
        cfg.badge,
        sizeStyles[size],
        className
      )}
    >
      <span className="relative flex items-center justify-center shrink-0">
        {pulse && (
          <span
            className={clsx(
              'absolute inline-flex rounded-full opacity-75 animate-ping',
              dotSize,
              cfg.ping
            )}
          />
        )}
        <span className={clsx('relative inline-flex rounded-full', dotSize, cfg.dot)} />
      </span>
      {label && <span>{label}</span>}
    </span>
  );
};
