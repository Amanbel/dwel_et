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
        'surface-panel rounded-lg p-lg',
        accentBorderStyles[accentColor],
        hoverable ? 'hover:shadow-[0_22px_54px_rgba(19,35,53,0.1)] hover:-translate-y-0.5 transition-all duration-300' : '',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
