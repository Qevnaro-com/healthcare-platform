import React from 'react';
import { clsx } from 'clsx';
import { PulseStatus } from './PulseStatus';

export interface PulseHeaderProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  tag?: string;
  statusLabel?: string;
  statusType?: 'success' | 'warning' | 'danger' | 'info' | 'active';
  actions?: React.ReactNode;
  breadcrumbs?: React.ReactNode;
  className?: string;
}

export const PulseHeader: React.FC<PulseHeaderProps> = ({
  title,
  subtitle,
  tag,
  statusLabel = 'System Operational',
  statusType = 'success',
  actions,
  breadcrumbs,
  className
}) => {
  return (
    <div className={clsx('relative pb-6 border-b border-border-light mb-6 sm:mb-8', className)}>
      {breadcrumbs && <div className="mb-3 text-xs text-text-muted">{breadcrumbs}</div>}

      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap mb-1">
            {tag && (
              <span className="px-2 py-0.5 rounded text-2xs font-semibold uppercase tracking-wider bg-brand-teal/10 text-brand-teal border border-brand-teal/20">
                {tag}
              </span>
            )}
            {statusLabel && (
              <PulseStatus status={statusType} label={statusLabel} size="sm" pulse />
            )}
          </div>

          {typeof title === 'string' ? (
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-text-primary tracking-tight">
              {title}
            </h1>
          ) : (
            title
          )}

          {subtitle && (
            <p className="text-sm sm:text-base text-text-muted mt-1 max-w-3xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {actions && <div className="flex items-center gap-3 shrink-0">{actions}</div>}
      </div>
    </div>
  );
};
