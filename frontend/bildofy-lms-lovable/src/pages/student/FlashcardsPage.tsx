import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { XPBadge } from '@/components/gamification/XPBadge';
import { ProgressRing } from '@/components/progress/ProgressRing';
import {
  ArrowLeft,
  Play,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  Cloud,
  CloudOff,
  CheckCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type ViewState = 'list' | 'study' | 'complete';

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
  {
    id: '1',
    front: "What is Newton's First Law?",
    back:
      'An object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force.',
  },
  { id: '2', front: 'Formula for Kinetic Energy?', back: 'KE = ½mv²' },
  {
    id: '3',
    front: 'What is acceleration?',
    back: 'The rate of change of velocity with respect to time.',
  },
];

const FlashcardsPage: React.FC = () => {
  const [view, setView] = useState<ViewState>('list');
  const [selectedSet, setSelectedSet] = useState<string | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentCard = mockCards[currentCardIndex];

  /* ---------------- RESET HELPERS ---------------- */
  const resetStudy = () => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setSelectedSet(null);
    setView('list');
  };

  /* ================= STUDY VIEW ================= */
  if (view === 'study' && selectedSet) {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-lg border-b border-border">
          <div className="container mx-auto px-4 py-4 flex justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={resetStudy}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold">Review Mode</h1>
                <p className="text-sm text-muted-foreground">
                  Card {currentCardIndex + 1} of {mockCards.length}
                </p>
              </div>
            </div>
            <XPBadge xp={15} size="sm" />
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          {/* Progress */}
          <div className="flex justify-center mb-6 gap-1">
            {mockCards.map((_, index) => (
              <div
                key={index}
                className={cn(
                  'w-8 h-2 rounded-full',
                  index < currentCardIndex
                    ? 'bg-success'
                    : index === currentCardIndex
                    ? 'bg-primary'
                    : 'bg-secondary'
                )}
              />
            ))}
          </div>

          {/* Flashcard */}
          <div
            className="max-w-lg mx-auto cursor-pointer"
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <div
              className="relative w-full aspect-[3/2] transition-all duration-500"
              style={{
                transformStyle: 'preserve-3d',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
            >
              {/* Front */}
              <div
                className="absolute inset-0 p-8 rounded-2xl bg-gradient-primary text-primary-foreground shadow-lg flex flex-col items-center justify-center text-center"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <p className="text-xs uppercase opacity-70 mb-4">Question</p>
                <p className="text-xl font-semibold">{currentCard.front}</p>
                <p className="text-sm opacity-70 mt-4">Tap to reveal</p>
              </div>

              {/* Back */}
              <div
                className="absolute inset-0 p-8 rounded-2xl bg-card border shadow-lg flex flex-col items-center justify-center text-center"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                }}
              >
                <p className="text-xs uppercase text-muted-foreground mb-4">
                  Answer
                </p>
                <p className="text-lg font-medium">{currentCard.back}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="lg"
              disabled={currentCardIndex === 0}
              onClick={() => {
                setIsFlipped(false);
                setCurrentCardIndex((i) => i - 1);
              }}
            >
              <ChevronLeft />
            </Button>

            <Button
              variant="destructive"
              size="lg"
              onClick={() => {
                setIsFlipped(false);
                if (currentCardIndex === mockCards.length - 1) {
                  setView('complete');
                } else {
                  setCurrentCardIndex((i) => i + 1);
                }
              }}
            >
              <X className="mr-1" /> Didn’t Know
            </Button>

            <Button
              variant="success"
              size="lg"
              onClick={() => {
                setIsFlipped(false);
                if (currentCardIndex === mockCards.length - 1) {
                  setView('complete');
                } else {
                  setCurrentCardIndex((i) => i + 1);
                }
              }}
            >
              <Check className="mr-1" /> Got It
            </Button>

            <Button
              variant="outline"
              size="lg"
              disabled={currentCardIndex === mockCards.length - 1}
              onClick={() => {
                setIsFlipped(false);
                setCurrentCardIndex((i) => i + 1);
              }}
            >
              <ChevronRight />
            </Button>
          </div>
        </main>
      </div>
    );
  }

  /* ================= COMPLETE VIEW ================= */
  if (view === 'complete') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <CheckCircle className="w-12 h-12 mx-auto text-success" />
          <h2 className="text-2xl font-bold">Session Complete 🎉</h2>
          <p className="text-muted-foreground">You earned XP for studying!</p>
          <Button onClick={resetStudy}>Back to Flashcards</Button>
        </div>
      </div>
    );
  }

  /* ================= LIST VIEW ================= */
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/student">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold">Flashcards</h1>
            <p className="text-sm text-muted-foreground">
              Review and memorize concepts
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 grid gap-4">
        {mockFlashcardSets.map((set) => {
          const progress = Math.round((set.mastered / set.cards) * 100);
          return (
            <div
              key={set.id}
              className="p-5 rounded-xl bg-card border hover:shadow-md transition"
            >
              <div className="flex justify-between">
                <div className="flex gap-4">
                  <ProgressRing progress={progress} size={60} />
                  <div>
                    <h3 className="font-semibold">{set.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {set.subject} • {set.mastered}/{set.cards} mastered
                    </p>
                    <p className="text-xs mt-1 flex items-center gap-1">
                      {set.isOfflineAvailable ? (
                        <>
                          <Cloud className="w-3 h-3" /> Offline available
                        </>
                      ) : (
                        <>
                          <CloudOff className="w-3 h-3" /> Online only
                        </>
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <XPBadge xp={set.xpReward} size="sm" />
                  <Button
                    size="sm"
                    onClick={() => {
                      setSelectedSet(set.id);
                      setView('study');
                    }}
                  >
                    <Play className="w-4 h-4 mr-1" />
                    Review
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
};

export default FlashcardsPage;
