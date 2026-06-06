import React from 'react';
import { cn } from '../../utils/helpers';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  isLoading,
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex min-h-10 items-center justify-center gap-xs font-label-md text-label-md rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/25 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]';
  
  const variants = {
    primary: 'bg-primary text-on-primary hover:bg-primary/90 shadow-[0_12px_26px_rgba(15,93,168,0.22)] hover:-translate-y-0.5',
    secondary: 'bg-surface-container-lowest border border-outline-variant text-primary hover:bg-surface-container-low hover:border-primary/40 shadow-[0_8px_18px_rgba(19,35,53,0.05)]',
    tertiary: 'bg-tertiary text-on-tertiary hover:bg-tertiary/90 shadow-[0_12px_26px_rgba(139,63,127,0.18)] hover:-translate-y-0.5',
    danger: 'bg-error text-on-error hover:bg-error/90 shadow-[0_10px_22px_rgba(186,26,26,0.14)] hover:-translate-y-0.5',
    ghost: 'text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors',
  };

  const sizes = {
    sm: 'px-md py-sm text-xs',
    md: 'px-lg py-sm',
    lg: 'px-xl py-md',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      ) : null}
      {children}
    </button>
  );
};
