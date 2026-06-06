import React from 'react';
import { cn } from '../../utils/helpers';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, icon, error, type = 'text', ...props }, ref) => {
    return (
      <div className="w-full space-y-1">
        {label && (
          <label className="block font-label-md text-label-md text-on-surface-variant mb-xs">
            {label}
          </label>
        )}
        <div className="relative rounded-lg shadow-sm">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-outline text-lg">{icon}</span>
            </div>
          )}
          <input
            type={type}
            ref={ref}
            className={cn(
              'focus:ring-primary focus:border-primary block w-full sm:text-sm border-outline-variant rounded-lg font-body-md text-body-md py-sm bg-surface-container-lowest text-on-surface placeholder-outline transition-colors duration-200',
              icon ? 'pl-10' : 'px-md',
              error ? 'border-error focus:ring-error focus:border-error' : '',
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-error font-body-sm">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
