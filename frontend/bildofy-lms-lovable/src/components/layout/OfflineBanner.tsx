import React from 'react';
import { useOnlineStatus } from '@/contexts/OnlineContext';
import { WifiOff, CloudOff } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OfflineBannerProps {
  className?: string;
}

export const OfflineBanner: React.FC<OfflineBannerProps> = ({ className }) => {
  const { isOnline } = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div
      className={cn(
        'fixed top-0 left-0 right-0 z-50 bg-offline text-offline-foreground py-2 px-4 flex items-center justify-center gap-2 text-sm font-medium offline-pulse',
        className
      )}
    >
      <WifiOff className="w-4 h-4" />
      <span>You're offline. Some features may be limited.</span>
      <CloudOff className="w-4 h-4" />
    </div>
  );
};
