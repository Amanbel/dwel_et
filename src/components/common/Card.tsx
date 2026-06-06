import React from 'react';
import { cn } from '../../utils/helpers';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  accentColor?: 'primary' | 'secondary' | 'tertiary' | 'error' | 'none';
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  accentColor = 'none',
  hoverable = true,
  ...props
}) => {
  const accentBorderStyles = {
    none: '',
    primary: 'border-l-4 border-l-primary',
    secondary: 'border-l-4 border-l-secondary',
    tertiary: 'border-l-4 border-l-tertiary',
    error: 'border-l-4 border-l-error',
  };

  return (
    <div
      className={cn(
        'bg-surface-container-lowest rounded-xl border border-outline-variant p-lg shadow-sm',
        accentBorderStyles[accentColor],
        hoverable ? 'hover:shadow-md transition-all duration-300' : '',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
