import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { clsx } from 'clsx';

export interface PulseDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const PulseDrawer: React.FC<PulseDrawerProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
  size = 'md',
  className
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-xs sm:max-w-sm',
    md: 'max-w-md sm:max-w-lg',
    lg: 'max-w-lg sm:max-w-2xl',
    xl: 'max-w-2xl sm:max-w-4xl'
  };

  return createPortal(
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-6">
        <div
          className={clsx(
            'w-screen bg-white shadow-floating border-l border-border-default flex flex-col relative overflow-hidden',
            sizeClasses[size],
            className
          )}
        >
          {/* Top pulse accent bar */}
          <div className="h-1 bg-gradient-to-r from-brand-teal via-brand-blue to-brand-teal" />

          {/* Drawer Header */}
          <div className="flex items-start justify-between p-5 sm:p-6 border-b border-border-light bg-surface-subtle/50">
            <div>
              {typeof title === 'string' ? (
                <h2 className="text-lg font-heading font-semibold text-text-primary tracking-tight">
                  {title}
                </h2>
              ) : (
                title
              )}
              {subtitle && <p className="text-xs text-text-muted mt-0.5">{subtitle}</p>}
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-text-muted hover:text-text-primary rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 p-5 sm:p-6 overflow-y-auto">{children}</div>

          {/* Drawer Footer */}
          {footer && (
            <div className="p-4 px-6 border-t border-border-light bg-surface-subtle/50 flex items-center justify-end gap-3">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};
