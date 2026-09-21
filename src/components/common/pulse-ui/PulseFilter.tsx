import React from 'react';
import { clsx } from 'clsx';
import { Search, Filter, X } from 'lucide-react';

export interface FilterTag {
  id: string;
  label: string;
  value: string;
}

export interface PulseFilterBarProps {
  searchValue?: string;
  onSearchChange?: (val: string) => void;
  searchPlaceholder?: string;
  activeFilters?: FilterTag[];
  onRemoveFilter?: (id: string) => void;
  onClearAll?: () => void;
  filterControls?: React.ReactNode;
  className?: string;
}

export const PulseFilterBar: React.FC<PulseFilterBarProps> = ({
  searchValue = '',
  onSearchChange,
  searchPlaceholder = 'Filter records...',
  activeFilters = [],
  onRemoveFilter,
  onClearAll,
  filterControls,
  className
}) => {
  return (
    <div className={clsx('space-y-3 mb-4', className)}>
      <div className="flex items-center gap-3 flex-wrap">
        {onSearchChange && (
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-white border border-border-default text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-teal/30 focus:border-brand-teal"
            />
            {searchValue && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}

        {filterControls && <div className="flex items-center gap-2 flex-wrap">{filterControls}</div>}
      </div>

      {activeFilters.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap pt-1">
          <span className="text-2xs font-semibold text-text-muted uppercase tracking-wider flex items-center gap-1">
            <Filter className="w-3 h-3 text-brand-teal" /> Active:
          </span>
          {activeFilters.map((f) => (
            <span
              key={f.id}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-2xs font-medium bg-teal-50 text-brand-teal border border-brand-teal/30"
            >
              <span className="text-text-muted">{f.label}:</span>
              <span className="font-semibold">{f.value}</span>
              {onRemoveFilter && (
                <button
                  onClick={() => onRemoveFilter(f.id)}
                  className="hover:text-rose-600 transition-colors ml-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </span>
          ))}

          {onClearAll && (
            <button
              onClick={onClearAll}
              className="text-2xs text-text-muted hover:text-rose-600 font-medium underline ml-2 cursor-pointer"
            >
              Clear All
            </button>
          )}
        </div>
      )}
    </div>
  );
};
