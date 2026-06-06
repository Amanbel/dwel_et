import React from 'react';
import { cn } from '../../utils/helpers';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status?: 'positive' | 'neutral' | 'negative' | 'default';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  status = 'default',
  ...props
}) => {
  const styles = {
    default: 'bg-surface-variant text-on-surface-variant',
    positive: 'status-chip status-positive',
    neutral: 'status-chip status-neutral',
    negative: 'status-chip status-negative',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide',
        styles[status],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
