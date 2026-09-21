import React from 'react';
import { clsx } from 'clsx';
import { Search, Command } from 'lucide-react';

export interface PulseCommandProps {
  placeholder?: string;
  onClick?: () => void;
  shortcut?: string;
  className?: string;
  variant?: 'compact' | 'expanded';
}

export const PulseCommandBar: React.FC<PulseCommandProps> = ({
  placeholder = 'Search healthcare network, staff, shifts, invoices (Ctrl+K)...',
  onClick,
  className,
  variant = 'compact'
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'group relative flex items-center justify-between w-full rounded-pill text-left transition-all duration-200',
        'bg-surface-subtle/80 hover:bg-white border border-border-default hover:border-brand-teal/40',
        'shadow-sm hover:shadow-floating focus:outline-none focus:ring-2 focus:ring-brand-teal/30',
        variant === 'compact' ? 'px-3.5 py-2 text-xs' : 'px-4 py-3 text-sm',
        className
      )}
    >
      <div className="flex items-center gap-2.5 text-text-muted group-hover:text-text-primary min-w-0">
        <Search className="w-4 h-4 text-brand-teal shrink-0 group-hover:scale-110 transition-transform" />
        <span className="truncate font-sans font-normal text-text-muted group-hover:text-text-secondary">
          {placeholder}
        </span>
      </div>

      <div className="flex items-center gap-1.5 shrink-0 ml-2">
        <span className="inline-flex items-center gap-0.5 px-2 py-0.5 text-2xs font-semibold rounded bg-white text-text-muted border border-border-default group-hover:border-brand-teal/30 group-hover:text-brand-teal shadow-2xs font-mono">
          <Command className="w-3 h-3" />
          <span>K</span>
        </span>
      </div>
    </button>
  );
};
