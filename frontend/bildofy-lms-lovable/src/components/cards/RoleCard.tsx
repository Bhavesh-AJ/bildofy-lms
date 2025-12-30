import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon, ArrowRight } from 'lucide-react';

interface RoleCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: 'primary' | 'accent' | 'success';
  onClick?: () => void;
  className?: string;
}

export const RoleCard: React.FC<RoleCardProps> = ({
  title,
  description,
  icon: Icon,
  gradient,
  onClick,
  className,
}) => {
  const gradientClasses = {
    primary: 'from-primary to-primary/80 hover:shadow-glow',
    accent: 'from-accent to-accent/80 hover:shadow-xp',
    success: 'from-success to-success/80',
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        'group relative w-full p-6 rounded-2xl transition-all duration-500',
        'bg-gradient-to-br text-primary-foreground',
        'hover:-translate-y-2 hover:scale-[1.02]',
        'focus:outline-none focus:ring-4 focus:ring-primary/30',
        'shadow-lg',
        gradientClasses[gradient],
        className
      )}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden opacity-10">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-2xl" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-xl" />
      </div>

      <div className="relative z-10">
        {/* Icon */}
        <div className="w-16 h-16 mb-4 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-8 h-8" />
        </div>

        {/* Content */}
        <h3 className="text-xl font-display font-bold mb-2">{title}</h3>
        <p className="text-sm opacity-90 mb-4 line-clamp-2">{description}</p>

        {/* CTA */}
        <div className="flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all duration-300">
          <span>Get Started</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </button>
  );
};
