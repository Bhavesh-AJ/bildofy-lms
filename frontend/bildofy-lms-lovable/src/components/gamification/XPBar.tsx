import React from 'react';
import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';

interface XPBarProps {
  currentXP: number;
  maxXP: number;
  level: number;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  animated?: boolean;
}

export const XPBar: React.FC<XPBarProps> = ({
  currentXP,
  maxXP,
  level,
  showLabel = true,
  size = 'md',
  className,
  animated = true,
}) => {
  const progress = Math.min((currentXP / maxXP) * 100, 100);

  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-xp" />
            <span className="text-sm font-semibold text-foreground">
              Level {level}
            </span>
          </div>
          <span className="text-xs font-medium text-muted-foreground">
            {currentXP.toLocaleString()} / {maxXP.toLocaleString()} XP
          </span>
        </div>
      )}
      <div
        className={cn(
          'w-full bg-secondary rounded-full overflow-hidden relative',
          sizeClasses[size]
        )}
      >
        <div
          className={cn(
            'h-full bg-gradient-xp rounded-full relative transition-all duration-500 ease-out',
            animated && 'glow-xp'
          )}
          style={{ width: `${progress}%` }}
        >
          {animated && progress > 10 && (
            <div className="absolute inset-0 progress-shimmer" />
          )}
        </div>
      </div>
    </div>
  );
};
