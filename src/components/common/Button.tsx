import React from 'react';
import { clsx } from 'clsx';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline' | 'ops' | 'navy' | 'darkCTA';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className,
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-bold transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none rounded-btn';

  const variantStyles = {
    primary: 'bg-brand-teal text-white hover:bg-brand-teal-700 active:scale-[0.98] shadow-subtle hover:shadow-card',
    secondary: 'bg-white text-text-primary border border-border-default hover:border-brand-teal-300 hover:bg-canvas-cool shadow-subtle active:scale-[0.98]',
    ghost: 'bg-transparent text-brand-teal-700 hover:bg-brand-teal-50 hover:text-brand-teal-800 active:scale-[0.98]',
    danger: 'bg-rose-600 text-white hover:bg-rose-700 active:scale-[0.98] shadow-subtle',
    outline: 'bg-transparent border border-brand-teal text-brand-teal-700 hover:bg-brand-teal-50 active:scale-[0.98]',
    ops: 'bg-care-blue-600 text-white hover:bg-care-blue-700 active:scale-[0.98] shadow-subtle hover:shadow-card',
    navy: 'bg-brand-navy text-white hover:bg-brand-navy-light active:scale-[0.98] shadow-subtle',
    darkCTA: 'bg-white text-brand-navy hover:bg-brand-teal-50 font-extrabold active:scale-[0.98] shadow-subtle',
  };

  const sizeStyles = {
    sm: 'h-9 px-3.5 text-xs gap-1.5',
    md: 'h-10 px-4 text-sm gap-2',
    lg: 'h-12 px-6 text-base gap-2.5'
  };

  return (
    <button
      className={clsx(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        leftIcon
      )}
      <span>{children}</span>
      {!isLoading && rightIcon}
    </button>
  );
};
