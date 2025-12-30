import React from 'react';
import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';

interface LevelBadgeProps {
  level: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LevelBadge: React.FC<LevelBadgeProps> = ({
  level,
  size = 'md',
  className,
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-lg',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <div
      className={cn(
        'relative inline-flex items-center justify-center rounded-full bg-gradient-primary text-primary-foreground font-bold shadow-glow',
        sizeClasses[size],
        className
      )}
    >
      <Star className={cn(iconSizes[size], 'absolute -top-1 -right-1 fill-xp text-xp')} />
      <span>{level}</span>
    </div>
  );
};
