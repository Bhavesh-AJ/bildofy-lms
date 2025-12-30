import React from 'react';
import { cn } from '@/lib/utils';
import { Flame } from 'lucide-react';

interface StreakIndicatorProps {
  streak: number;
  isActive?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const StreakIndicator: React.FC<StreakIndicatorProps> = ({
  streak,
  isActive = true,
  size = 'md',
  className,
}) => {
  const sizeClasses = {
    sm: 'text-sm gap-1',
    md: 'text-base gap-1.5',
    lg: 'text-lg gap-2',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <div
      className={cn(
        'flex items-center font-bold',
        sizeClasses[size],
        isActive ? 'text-streak' : 'text-muted-foreground',
        className
      )}
    >
      <Flame
        className={cn(
          iconSizes[size],
          isActive && 'streak-flame fill-streak/20'
        )}
      />
      <span>{streak}</span>
      <span className="text-xs font-medium opacity-70">day{streak !== 1 ? 's' : ''}</span>
    </div>
  );
};
