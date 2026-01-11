import React, { useEffect, useState } from 'react';
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
  CheckCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type Difficulty = 'easy' | 'medium' | 'hard';
type ViewState = 'list' | 'instructions' | 'attempt' | 'result';

type Test = {
  id: string;
  title: string;
  subject: string;
  questions: number;
  duration: number;
  difficulty: Difficulty;
  xpReward: number;
  isCompleted: boolean;
  bestScore: number | null;
};

const mockTests: Test[] = [
  {
    id: '1',
    title: 'Physics - Motion',
    subject: 'Physics',
    questions: 5,
    duration: 5,
    difficulty: 'medium',
    xpReward: 100,
    isCompleted: false,
    bestScore: null,
  },
  {
    id: '2',
    title: 'Chemistry - Periodic Table',
    subject: 'Chemistry',
    questions: 5,
    duration: 5,
    difficulty: 'easy',
    xpReward: 75,
    isCompleted: true,
    bestScore: 85,
  },
];

const difficultyConfig = {
  easy: { label: 'Easy', color: 'bg-success/10 text-success border-success/30' },
  medium: { label: 'Medium', color: 'bg-warning/10 text-warning border-warning/30' },
  hard: { label: 'Hard', color: 'bg-destructive/10 text-destructive border-destructive/30' },
};

const mockQuestions = [
  {
    id: 1,
    question: 'What is the SI unit of velocity?',
    options: ['m/s', 'm', 'kg', 'N'],
    correct: 'm/s',
  },
  {
    id: 2,
    question: 'Which law explains inertia?',
    options: ['First Law', 'Second Law', 'Third Law', 'Law of Gravitation'],
    correct: 'First Law',
  },
];

const TestsPage: React.FC = () => {
  const { isOnline } = useOnlineStatus();

  const [view, setView] = useState<ViewState>('list');
  const [selectedTest, setSelectedTest] = useState<Test | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [score, setScore] = useState(0);

  /* ---------------- TIMER ---------------- */
  useEffect(() => {
    if (view !== 'attempt') return;
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer);
          submitTest();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [view]);

  const startTest = (test: Test) => {
    setSelectedTest(test);
    setTimeLeft(test.duration * 60);
    setCurrentIndex(0);
    setAnswers({});
    setScore(0);
    setView('instructions');
  };

  const submitTest = () => {
    let s = 0;
    mockQuestions.forEach((q) => {
      if (answers[q.id] === q.correct) s += 1;
    });
    setScore(Math.round((s / mockQuestions.length) * 100));
    setView('result');
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
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
      </header>

      <main className="container mx-auto px-4 py-6">
        {!isOnline && (
          <div className="mb-6 p-4 rounded-xl bg-offline/10 border border-offline/30 flex items-center gap-3">
            <WifiOff className="w-5 h-5 text-offline" />
            <p className="text-sm">You’re offline. Tests need internet.</p>
          </div>
        )}

        {/* ================= LIST ================= */}
        {view === 'list' && (
          <>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-card border text-center">
                <Target className="w-6 h-6 mx-auto text-primary mb-2" />
                <p className="text-2xl font-bold">24</p>
                <p className="text-xs text-muted-foreground">Tests Taken</p>
              </div>
              <div className="p-4 rounded-xl bg-card border text-center">
                <Trophy className="w-6 h-6 mx-auto text-xp mb-2" />
                <p className="text-2xl font-bold">78%</p>
                <p className="text-xs text-muted-foreground">Avg Score</p>
              </div>
              <div className="p-4 rounded-xl bg-card border text-center">
                <Zap className="w-6 h-6 mx-auto text-accent mb-2" />
                <p className="text-2xl font-bold">2.4K</p>
                <p className="text-xs text-muted-foreground">Total XP</p>
              </div>
            </div>

            <h2 className="text-lg font-semibold mb-4">Available Tests</h2>

            <div className="grid gap-4">
              {mockTests.map((test, index) => {
                const difficulty = difficultyConfig[test.difficulty];
                return (
                  <div
                    key={test.id}
                    className={cn(
                      'p-5 rounded-xl bg-card border shadow-sm hover:shadow-md',
                      test.isCompleted && 'bg-success/5'
                    )}
                  >
                    <div className="flex justify-between">
                      <div>
                        <span className={cn('text-xs px-2 py-0.5 rounded-full border', difficulty.color)}>
                          {difficulty.label}
                        </span>
                        <h3 className="font-semibold mt-1">{test.title}</h3>
                        <div className="text-sm text-muted-foreground flex gap-4">
                          <span>{test.questions} questions</span>
                          <span>{test.duration} min</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        {!test.isCompleted && <XPBadge xp={test.xpReward} />}
                        <Button
                          size="sm"
                          disabled={!isOnline}
                          onClick={() => startTest(test)}
                        >
                          <Play className="w-4 h-4 mr-1" />
                          Start Test
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* ================= INSTRUCTIONS ================= */}
        {view === 'instructions' && selectedTest && (
          <div className="max-w-xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold">{selectedTest.title}</h2>
            <ul className="list-disc ml-5 text-sm text-muted-foreground">
              <li>{selectedTest.questions} MCQs</li>
              <li>{selectedTest.duration} minutes</li>
              <li>No negative marking</li>
              <li>Auto-submit on timeout</li>
            </ul>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setView('list')}>
                Cancel
              </Button>
              <Button onClick={() => setView('attempt')}>Start Test</Button>
            </div>
          </div>
        )}

        {/* ================= ATTEMPT ================= */}
        {view === 'attempt' && selectedTest && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex justify-between text-sm">
              <span>
                Question {currentIndex + 1} / {mockQuestions.length}
              </span>
              <span>
                ⏱ {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
              </span>
            </div>

            <h3 className="font-semibold">
              {mockQuestions[currentIndex].question}
            </h3>

            <div className="space-y-2">
              {mockQuestions[currentIndex].options.map((opt) => (
                <button
                  key={opt}
                  onClick={() =>
                    setAnswers({ ...answers, [mockQuestions[currentIndex].id]: opt })
                  }
                  className={cn(
                    'w-full p-3 rounded border text-left',
                    answers[mockQuestions[currentIndex].id] === opt &&
                      'border-primary bg-primary/5'
                  )}
                >
                  {opt}
                </button>
              ))}
            </div>

            <div className="flex justify-between">
              <Button
                variant="outline"
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex((i) => i - 1)}
              >
                Previous
              </Button>

              {currentIndex === mockQuestions.length - 1 ? (
                <Button onClick={submitTest}>Submit</Button>
              ) : (
                <Button onClick={() => setCurrentIndex((i) => i + 1)}>
                  Next
                </Button>
              )}
            </div>
          </div>
        )}

        {/* ================= RESULT ================= */}
        {view === 'result' && selectedTest && (
          <div className="text-center space-y-6 py-12">
            <CheckCircle className="w-12 h-12 mx-auto text-success" />
            <h2 className="text-3xl font-bold">Test Completed 🎉</h2>
            <p className="text-xl">Score: {score}%</p>
            <Button
              onClick={() => {
                setView('list');
                setSelectedTest(null);
              }}
            >
              Back to Tests
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default TestsPage;
