import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { XPBadge } from '@/components/gamification/XPBadge';
import { ProgressRing } from '@/components/progress/ProgressRing';
import { useOnlineStatus } from '@/contexts/OnlineContext';
import {
  ArrowLeft,
  ClipboardCheck,
  Clock,
  Target,
  Play,
  Trophy,
  Zap,
  WifiOff,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type Difficulty = 'easy' | 'medium' | 'hard';

const mockTests = [
  {
    id: '1',
    title: 'Physics - Motion',
    subject: 'Physics',
    questions: 20,
    duration: 30,
    difficulty: 'medium' as Difficulty,
    xpReward: 100,
    isCompleted: false,
    bestScore: null,
  },
  {
    id: '2',
    title: 'Chemistry - Periodic Table',
    subject: 'Chemistry',
    questions: 15,
    duration: 25,
    difficulty: 'easy' as Difficulty,
    xpReward: 75,
    isCompleted: true,
    bestScore: 85,
  },
  {
    id: '3',
    title: 'Math - Calculus Basics',
    subject: 'Mathematics',
    questions: 25,
    duration: 45,
    difficulty: 'hard' as Difficulty,
    xpReward: 150,
    isCompleted: false,
    bestScore: null,
  },
];

const difficultyConfig = {
  easy: { label: 'Easy', color: 'bg-success/10 text-success border-success/30' },
  medium: { label: 'Medium', color: 'bg-warning/10 text-warning border-warning/30' },
  hard: { label: 'Hard', color: 'bg-destructive/10 text-destructive border-destructive/30' },
};

const TestsPage: React.FC = () => {
  const { isOnline } = useOnlineStatus();
  const [selectedTest, setSelectedTest] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link to="/student">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-display font-bold text-foreground">Tests</h1>
              <p className="text-sm text-muted-foreground">Practice and earn XP</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {!isOnline && (
          <div className="mb-6 p-4 rounded-xl bg-offline/10 border border-offline/30 flex items-center gap-3">
            <WifiOff className="w-5 h-5 text-offline" />
            <p className="text-sm text-foreground">
              You're offline. Tests require an internet connection to submit answers.
            </p>
          </div>
        )}

        {/* Test Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-card border border-border text-center">
            <Target className="w-6 h-6 mx-auto text-primary mb-2" />
            <p className="text-2xl font-bold text-foreground">24</p>
            <p className="text-xs text-muted-foreground">Tests Taken</p>
          </div>
          <div className="p-4 rounded-xl bg-card border border-border text-center">
            <Trophy className="w-6 h-6 mx-auto text-xp mb-2" />
            <p className="text-2xl font-bold text-foreground">78%</p>
            <p className="text-xs text-muted-foreground">Avg Score</p>
          </div>
          <div className="p-4 rounded-xl bg-card border border-border text-center">
            <Zap className="w-6 h-6 mx-auto text-accent mb-2" />
            <p className="text-2xl font-bold text-foreground">2.4K</p>
            <p className="text-xs text-muted-foreground">Total XP</p>
          </div>
        </div>

        {/* Available Tests */}
        <h2 className="text-lg font-display font-semibold text-foreground mb-4">Available Tests</h2>
        <div className="grid gap-4">
          {mockTests.map((test, index) => {
            const difficulty = difficultyConfig[test.difficulty];
            return (
              <div
                key={test.id}
                className={cn(
                  'p-5 rounded-xl bg-card border border-border shadow-sm transition-all duration-200 animate-fade-up',
                  'hover:shadow-md hover:border-primary/30',
                  test.isCompleted && 'bg-success/5 border-success/20'
                )}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={cn(
                          'text-xs font-medium px-2 py-0.5 rounded-full border',
                          difficulty.color
                        )}
                      >
                        {difficulty.label}
                      </span>
                      <span className="text-xs text-muted-foreground">{test.subject}</span>
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">{test.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <ClipboardCheck className="w-4 h-4" />
                        {test.questions} questions
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {test.duration} min
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {test.isCompleted ? (
                      <>
                        <div className="flex items-center gap-2">
                          <ProgressRing progress={test.bestScore || 0} size={50} color="success" />
                        </div>
                        <Button variant="outline" size="sm" disabled={!isOnline}>
                          <Play className="w-4 h-4 mr-1" />
                          Retry
                        </Button>
                      </>
                    ) : (
                      <>
                        <XPBadge xp={test.xpReward} />
                        <Button size="sm" disabled={!isOnline}>
                          <Play className="w-4 h-4 mr-1" />
                          Start Test
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default TestsPage;
