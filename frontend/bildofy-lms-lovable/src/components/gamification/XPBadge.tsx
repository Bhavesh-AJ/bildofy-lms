import React from 'react';
import { cn } from '@/lib/utils';
import { Zap } from 'lucide-react';

interface XPBadgeProps {
  xp: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showIcon?: boolean;
}

export const XPBadge: React.FC<XPBadgeProps> = ({
  xp,
  size = 'md',
  className,
  showIcon = true,
}) => {
  const sizeClasses = {
    sm: 'text-xs px-1.5 py-0.5 gap-0.5',
    md: 'text-sm px-2 py-1 gap-1',
    lg: 'text-base px-3 py-1.5 gap-1.5',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center font-bold rounded-full bg-gradient-xp text-accent-foreground shadow-sm',
        sizeClasses[size],
        className
      )}
    >
      {showIcon && <Zap className={cn(iconSizes[size], 'fill-current')} />}
      <span>+{xp} XP</span>
    </div>
  );
};
