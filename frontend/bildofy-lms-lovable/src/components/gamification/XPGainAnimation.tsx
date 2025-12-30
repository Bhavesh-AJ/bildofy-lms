import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Zap } from 'lucide-react';

interface XPGainAnimationProps {
  xp: number;
  onComplete?: () => void;
  className?: string;
}

export const XPGainAnimation: React.FC<XPGainAnimationProps> = ({
  xp,
  onComplete,
  className,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 1000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 pointer-events-none flex items-center justify-center z-50',
        className
      )}
    >
      <div className="xp-float flex items-center gap-2 text-2xl font-bold text-xp bg-card/95 backdrop-blur-sm px-6 py-3 rounded-full shadow-xp border border-xp/20">
        <Zap className="w-6 h-6 fill-xp" />
        <span>+{xp} XP</span>
      </div>
    </div>
  );
};
