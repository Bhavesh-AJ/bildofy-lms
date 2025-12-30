import React from 'react';
import { cn } from '@/lib/utils';
import { XPBadge } from '@/components/gamification/XPBadge';
import { useOnlineStatus } from '@/contexts/OnlineContext';
import { LucideIcon, WifiOff, ChevronRight, Check } from 'lucide-react';

interface ActionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  xpReward: number;
  progress?: number; // 0-100
  completed?: boolean;
  requiresOnline?: boolean;
  onClick?: () => void;
  className?: string;
  variant?: 'default' | 'featured';
}

export const ActionCard: React.FC<ActionCardProps> = ({
  title,
  description,
  icon: Icon,
  xpReward,
  progress,
  completed = false,
  requiresOnline = false,
  onClick,
  className,
  variant = 'default',
}) => {
  const { isOnline } = useOnlineStatus();
  const isDisabled = requiresOnline && !isOnline;

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={cn(
        'relative w-full text-left p-4 rounded-xl transition-all duration-300',
        'bg-card border border-border shadow-sm',
        'hover:shadow-lg hover:-translate-y-1 hover:border-primary/30',
        'focus:outline-none focus:ring-2 focus:ring-primary/50',
        'disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-sm',
        variant === 'featured' && 'border-primary/30 bg-gradient-card',
        completed && 'bg-success/5 border-success/30',
        className
      )}
    >
      {/* Progress bar at top */}
      {progress !== undefined && progress > 0 && !completed && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-secondary rounded-t-xl overflow-hidden">
          <div
            className="h-full bg-gradient-primary transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      <div className="flex items-start gap-4">
        {/* Icon */}
        <div
          className={cn(
            'flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center',
            completed
              ? 'bg-success/10 text-success'
              : variant === 'featured'
              ? 'bg-gradient-primary text-primary-foreground'
              : 'bg-primary/10 text-primary'
          )}
        >
          {completed ? <Check className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-foreground">{title}</h3>
              <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">
                {description}
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-3">
            <XPBadge xp={xpReward} size="sm" />
            {isDisabled && (
              <div className="flex items-center gap-1 text-xs text-offline">
                <WifiOff className="w-3 h-3" />
                <span>Requires internet</span>
              </div>
            )}
            {progress !== undefined && !completed && (
              <span className="text-xs text-muted-foreground">{progress}% complete</span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
};
