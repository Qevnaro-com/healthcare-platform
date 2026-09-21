import React from 'react';
import { clsx } from 'clsx';
import { PulseSurface } from './PulseSurface';

export interface PulseTableProps {
  children: React.ReactNode;
  className?: string;
  headerAction?: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  striped?: boolean;
  hoverable?: boolean;
}

export const PulseTableContainer: React.FC<PulseTableProps> = ({
  children,
  className,
  headerAction,
  title,
  subtitle,
}) => {
  return (
    <PulseSurface variant="raised" padding="none" className={clsx('overflow-hidden border border-border-default', className)}>
      {(title || headerAction) && (
        <div className="p-4 sm:p-5 border-b border-border-light bg-surface-subtle/40 flex items-center justify-between gap-4 flex-wrap">
          <div>
            {typeof title === 'string' ? (
              <h3 className="font-heading font-semibold text-text-primary text-base sm:text-lg">{title}</h3>
            ) : (
              title
            )}
            {subtitle && <p className="text-xs text-text-muted mt-0.5">{subtitle}</p>}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}

      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-border-default">
        {children}
      </div>
    </PulseSurface>
  );
};

export const PulseTableHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className
}) => {
  return (
    <thead className={clsx('bg-surface-subtle/80 text-text-secondary text-2xs uppercase tracking-wider font-semibold border-b border-border-default select-none', className)}>
      {children}
    </thead>
  );
};

export const PulseTableRow: React.FC<{
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  statusAccent?: 'success' | 'warning' | 'danger' | 'info' | 'none';
}> = ({ children, className, onClick, statusAccent = 'none' }) => {
  const accentClasses = {
    none: '',
    success: 'border-l-4 border-l-emerald-500',
    warning: 'border-l-4 border-l-amber-500',
    danger: 'border-l-4 border-l-rose-500',
    info: 'border-l-4 border-l-brand-teal'
  };

  return (
    <tr
      onClick={onClick}
      className={clsx(
        'border-b border-border-light transition-colors hover:bg-teal-50/20 last:border-b-0',
        onClick && 'cursor-pointer',
        accentClasses[statusAccent],
        className
      )}
    >
      {children}
    </tr>
  );
};
