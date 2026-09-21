import React from 'react';
import { clsx } from 'clsx';
import { PulseLine } from './PulseLine';
import { PulseSurface } from './PulseSurface';

export interface PulseEmptyProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  secondaryAction?: React.ReactNode;
  className?: string;
}

export const PulseEmptyState: React.FC<PulseEmptyProps> = ({
  icon,
  title,
  description,
  action,
  secondaryAction,
  className
}) => {
  return (
    <PulseSurface
      variant="flat"
      className={clsx(
        'flex flex-col items-center justify-center text-center p-8 sm:p-12 border-dashed border-2 border-border-default bg-pulse-dots',
        className
      )}
    >
      {icon ? (
        <div className="p-4 rounded-full bg-brand-teal/10 text-brand-teal mb-4 ring-8 ring-brand-teal/5">
          {icon}
        </div>
      ) : (
        <div className="mb-4">
          <PulseLine variant="mini" animated />
        </div>
      )}

      <h3 className="font-heading font-semibold text-lg text-text-primary tracking-tight mb-1">
        {title}
      </h3>

      {description && (
        <p className="text-sm text-text-muted max-w-sm mb-6 leading-relaxed">
          {description}
        </p>
      )}

      {(action || secondaryAction) && (
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {action}
          {secondaryAction}
        </div>
      )}
    </PulseSurface>
  );
};
