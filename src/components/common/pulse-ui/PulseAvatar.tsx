import React from 'react';
import { clsx } from 'clsx';
import { PulseStatus } from './PulseStatus';
import type { PulseStatusType } from './PulseStatus';

export interface PulseAvatarProps {
  name: string;
  src?: string;
  role?: string;
  status?: PulseStatusType;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const PulseAvatar: React.FC<PulseAvatarProps> = ({
  name,
  src,
  role,
  status,
  size = 'md',
  className
}) => {
  const sizeMap = {
    sm: 'w-7 h-7 text-2xs',
    md: 'w-9 h-9 text-xs',
    lg: 'w-11 h-11 text-sm',
    xl: 'w-14 h-14 text-base font-bold'
  };

  const initials = name
    ? name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'PC';

  return (
    <div className="relative inline-flex items-center gap-2.5">
      <div className="relative shrink-0">
        {src ? (
          <img
            src={src}
            alt={name}
            className={clsx('rounded-full object-cover border-2 border-white shadow-sm', sizeMap[size], className)}
          />
        ) : (
          <div
            className={clsx(
              'rounded-full bg-gradient-to-br from-brand-teal/20 via-brand-teal/10 to-brand-blue/20 text-brand-teal font-heading font-bold flex items-center justify-center border border-brand-teal/30 shadow-2xs',
              sizeMap[size],
              className
            )}
          >
            {initials}
          </div>
        )}

        {status && (
          <span className="absolute -bottom-0.5 -right-0.5 z-10">
            <PulseStatus status={status} size="sm" pulse />
          </span>
        )}
      </div>

      {(name || role) && (
        <div className="hidden sm:block text-left min-w-0">
          <p className="text-xs font-heading font-semibold text-text-primary truncate">{name}</p>
          {role && <p className="text-2xs text-text-muted font-sans truncate">{role}</p>}
        </div>
      )}
    </div>
  );
};
