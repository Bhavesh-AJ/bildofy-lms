import React from 'react';
import { XPBar } from '@/components/gamification/XPBar';
import { StreakIndicator } from '@/components/gamification/StreakIndicator';
import { LevelBadge } from '@/components/gamification/LevelBadge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Bell, Settings, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

interface StudentHeaderProps {
  student: {
    name: string;
    avatar?: string;
    grade: string;
    board: string;
    level: number;
    currentXP: number;
    maxXP: number;
    streak: number;
  };
  onMenuClick?: () => void;
}

export const StudentHeader: React.FC<StudentHeaderProps> = ({ student, onMenuClick }) => {
  const initials = student.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Menu + Logo */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={onMenuClick}>
              <Menu className="w-5 h-5" />
            </Button>
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">L</span>
              </div>
              <span className="hidden sm:block font-display font-bold text-lg text-foreground">
                LearnSphere
              </span>
            </Link>
          </div>

          {/* Center: XP Progress (hidden on mobile) */}
          <div className="hidden md:flex flex-1 max-w-md">
            <XPBar
              currentXP={student.currentXP}
              maxXP={student.maxXP}
              level={student.level}
              size="sm"
            />
          </div>

          {/* Right: Streak + Avatar + Actions */}
          <div className="flex items-center gap-3">
            <StreakIndicator streak={student.streak} size="sm" />
            
            <div className="hidden sm:flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <LevelBadge level={student.level} size="sm" />
              <div className="hidden sm:block text-right">
                <p className="text-sm font-semibold text-foreground">{student.name}</p>
                <p className="text-xs text-muted-foreground">
                  {student.grade} • {student.board}
                </p>
              </div>
              <Avatar className="w-9 h-9 border-2 border-primary/20">
                <AvatarImage src={student.avatar} alt={student.name} />
                <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>

        {/* Mobile XP Bar */}
        <div className="md:hidden mt-3">
          <XPBar
            currentXP={student.currentXP}
            maxXP={student.maxXP}
            level={student.level}
            size="sm"
          />
        </div>
      </div>
    </header>
  );
};
