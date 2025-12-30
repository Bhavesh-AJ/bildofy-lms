import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { XPBadge } from '@/components/gamification/XPBadge';
import { ProgressRing } from '@/components/progress/ProgressRing';
import { ArrowLeft, Layers, Play, RotateCcw, ChevronLeft, ChevronRight, Check, X, Cloud, CloudOff } from 'lucide-react';
import { cn } from '@/lib/utils';

const mockFlashcardSets = [
  {
    id: '1',
    title: 'Physics Formulas',
    subject: 'Physics',
    cards: 25,
    mastered: 15,
    xpReward: 15,
    isOfflineAvailable: true,
  },
  {
    id: '2',
    title: 'Chemistry Elements',
    subject: 'Chemistry',
    cards: 30,
    mastered: 20,
    xpReward: 15,
    isOfflineAvailable: true,
  },
  {
    id: '3',
    title: 'Math Theorems',
    subject: 'Mathematics',
    cards: 18,
    mastered: 5,
    xpReward: 15,
    isOfflineAvailable: false,
  },
];

const mockCards = [
  { id: '1', front: 'What is Newton\'s First Law?', back: 'An object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force.' },
  { id: '2', front: 'Formula for Kinetic Energy?', back: 'KE = ½mv²' },
  { id: '3', front: 'What is acceleration?', back: 'The rate of change of velocity with respect to time.' },
];

const FlashcardsPage: React.FC = () => {
  const [selectedSet, setSelectedSet] = useState<string | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  if (selectedSet) {
    const currentCard = mockCards[currentCardIndex];

    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-lg border-b border-border">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => setSelectedSet(null)}>
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <div>
                  <h1 className="text-xl font-display font-bold text-foreground">Review Mode</h1>
                  <p className="text-sm text-muted-foreground">
                    Card {currentCardIndex + 1} of {mockCards.length}
                  </p>
                </div>
              </div>
              <XPBadge xp={15} size="sm" />
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          {/* Progress */}
          <div className="flex justify-center mb-6">
            <div className="flex gap-1">
              {mockCards.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    'w-8 h-2 rounded-full transition-colors',
                    index < currentCardIndex
                      ? 'bg-success'
                      : index === currentCardIndex
                      ? 'bg-primary'
                      : 'bg-secondary'
                  )}
                />
              ))}
            </div>
          </div>

          {/* Flashcard */}
          <div
            className="max-w-lg mx-auto cursor-pointer perspective-1000"
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <div
              className={cn(
                'relative w-full aspect-[3/2] transition-all duration-500 preserve-3d',
                isFlipped && 'rotate-y-180'
              )}
              style={{
                transformStyle: 'preserve-3d',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
            >
              {/* Front */}
              <div
                className="absolute inset-0 backface-hidden p-8 rounded-2xl bg-gradient-primary text-primary-foreground shadow-lg flex flex-col items-center justify-center text-center"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <p className="text-xs uppercase tracking-wider opacity-70 mb-4">Question</p>
                <p className="text-xl font-semibold">{currentCard.front}</p>
                <p className="text-sm opacity-70 mt-4">Tap to reveal answer</p>
              </div>

              {/* Back */}
              <div
                className="absolute inset-0 backface-hidden p-8 rounded-2xl bg-card border border-border shadow-lg flex flex-col items-center justify-center text-center"
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
              >
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-4">Answer</p>
                <p className="text-lg font-medium text-foreground">{currentCard.back}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                setIsFlipped(false);
                setCurrentCardIndex((prev) => (prev > 0 ? prev - 1 : prev));
              }}
              disabled={currentCardIndex === 0}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="destructive"
              size="lg"
              onClick={() => {
                setIsFlipped(false);
                if (currentCardIndex < mockCards.length - 1) {
                  setCurrentCardIndex((prev) => prev + 1);
                }
              }}
            >
              <X className="w-5 h-5 mr-1" />
              Didn't Know
            </Button>
            <Button
              variant="success"
              size="lg"
              onClick={() => {
                setIsFlipped(false);
                if (currentCardIndex < mockCards.length - 1) {
                  setCurrentCardIndex((prev) => prev + 1);
                }
              }}
            >
              <Check className="w-5 h-5 mr-1" />
              Got It
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                setIsFlipped(false);
                setCurrentCardIndex((prev) => (prev < mockCards.length - 1 ? prev + 1 : prev));
              }}
              disabled={currentCardIndex === mockCards.length - 1}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </main>
      </div>
    );
  }

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
              <h1 className="text-xl font-display font-bold text-foreground">Flashcards</h1>
              <p className="text-sm text-muted-foreground">Review and memorize concepts</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="grid gap-4">
          {mockFlashcardSets.map((set, index) => {
            const progress = Math.round((set.mastered / set.cards) * 100);

            return (
              <div
                key={set.id}
                className="p-5 rounded-xl bg-card border border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-200 animate-fade-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <ProgressRing progress={progress} size={60} color="primary" />
                    <div>
                      <h3 className="font-semibold text-foreground">{set.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {set.subject} • {set.mastered}/{set.cards} mastered
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        {set.isOfflineAvailable ? (
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Cloud className="w-3 h-3" /> Offline available
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <CloudOff className="w-3 h-3" /> Online only
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <XPBadge xp={set.xpReward} size="sm" />
                    <Button size="sm" onClick={() => setSelectedSet(set.id)}>
                      <Play className="w-4 h-4 mr-1" />
                      Review
                    </Button>
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

export default FlashcardsPage;
