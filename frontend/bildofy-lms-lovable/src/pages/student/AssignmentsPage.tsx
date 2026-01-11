import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { XPBadge } from '@/components/gamification/XPBadge';
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  Upload,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { format, isPast, isToday, isTomorrow } from 'date-fns';

type AssignmentStatus = 'pending' | 'submitted' | 'graded';
type ViewState = 'list' | 'detail' | 'submit' | 'complete';

type Assignment = {
  id: string;
  title: string;
  subject: string;
  dueDate: Date;
  status: AssignmentStatus;
  xpReward: number;
  submittedAt?: Date;
  grade?: string;
  xpEarned?: number;
};

const mockAssignments: Assignment[] = [
  {
    id: '1',
    title: 'Solve Quadratic Equations Set',
    subject: 'Mathematics',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    status: 'pending',
    xpReward: 50,
  },
  {
    id: '2',
    title: 'Newton Laws Essay',
    subject: 'Physics',
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    status: 'pending',
    xpReward: 75,
  },
  {
    id: '3',
    title: 'Chemical Reactions Lab Report',
    subject: 'Chemistry',
    dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    status: 'submitted',
    xpReward: 60,
    submittedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: '4',
    title: 'Poetry Analysis',
    subject: 'English',
    dueDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    status: 'graded',
    xpReward: 40,
    grade: 'A',
    xpEarned: 40,
  },
];

const formatDueDate = (date: Date) => {
  if (isToday(date)) return 'Due Today';
  if (isTomorrow(date)) return 'Due Tomorrow';
  if (isPast(date)) return `Was due ${format(date, 'MMM d')}`;
  return `Due ${format(date, 'MMM d')}`;
};

const statusConfig = {
  pending: { label: 'Pending', color: 'bg-warning/10 text-warning' },
  submitted: { label: 'Submitted', color: 'bg-primary/10 text-primary' },
  graded: { label: 'Graded', color: 'bg-success/10 text-success' },
};

const AssignmentsPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'submitted'>('all');
  const [view, setView] = useState<ViewState>('list');
  const [selectedAssignment, setSelectedAssignment] =
    useState<Assignment | null>(null);

  const filteredAssignments = mockAssignments.filter((a) => {
    if (filter === 'all') return true;
    if (filter === 'pending') return a.status === 'pending';
    if (filter === 'submitted') return a.status !== 'pending';
    return true;
  });

  const pendingCount = mockAssignments.filter(
    (a) => a.status === 'pending'
  ).length;

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
              <h1 className="text-xl font-display font-bold text-foreground">
                Assignments
              </h1>
              <p className="text-sm text-muted-foreground">
                {pendingCount} pending
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* ================= LIST VIEW ================= */}
        {view === 'list' && (
          <>
            {/* Filter Tabs */}
            <div className="flex gap-2 mb-6">
              {(['all', 'pending', 'submitted'] as const).map((tab) => (
                <Button
                  key={tab}
                  variant={filter === tab ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter(tab)}
                  className="capitalize"
                >
                  {tab}
                </Button>
              ))}
            </div>

            {/* Assignments List */}
            <div className="grid gap-4">
              {filteredAssignments.map((assignment, index) => {
                const status = statusConfig[assignment.status];
                const isOverdue =
                  assignment.status === 'pending' &&
                  isPast(assignment.dueDate);

                return (
                  <div
                    key={assignment.id}
                    className={cn(
                      'p-5 rounded-xl bg-card border border-border shadow-sm transition-all duration-200 animate-fade-up',
                      'hover:shadow-md hover:border-primary/30',
                      isOverdue && 'border-destructive/30'
                    )}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div
                          className={cn(
                            'w-12 h-12 rounded-xl flex items-center justify-center',
                            assignment.status === 'graded'
                              ? 'bg-success/10'
                              : 'bg-primary/10'
                          )}
                        >
                          {assignment.status === 'graded' ? (
                            <CheckCircle className="w-6 h-6 text-success" />
                          ) : (
                            <BookOpen className="w-6 h-6 text-primary" />
                          )}
                        </div>
                        <div>
                          <span
                            className={cn(
                              'text-xs font-medium px-2 py-0.5 rounded-full',
                              status.color
                            )}
                          >
                            {status.label}
                          </span>
                          <h3 className="font-semibold text-foreground mt-1">
                            {assignment.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {assignment.subject}
                          </p>
                          <div className="flex items-center gap-2 mt-2 text-sm">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <span
                              className={cn(
                                isOverdue
                                  ? 'text-destructive'
                                  : 'text-muted-foreground'
                              )}
                            >
                              {formatDueDate(assignment.dueDate)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        {assignment.status === 'pending' ? (
                          <>
                            <XPBadge xp={assignment.xpReward} />
                            <Button
                              size="sm"
                              className="gap-1"
                              onClick={() => {
                                setSelectedAssignment(assignment);
                                setView('detail');
                              }}
                            >
                              <Upload className="w-4 h-4" />
                              Submit
                            </Button>
                          </>
                        ) : assignment.status === 'graded' ? (
                          <div className="text-right">
                            <span className="text-2xl font-bold text-success">
                              {assignment.grade}
                            </span>
                            <p className="text-xs text-muted-foreground">
                              +{assignment.xpEarned} XP
                            </p>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-sm text-primary">
                            <Clock className="w-4 h-4" />
                            <span>Awaiting grade</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* ================= DETAIL VIEW ================= */}
        {view === 'detail' && selectedAssignment && (
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold">
              {selectedAssignment.title}
            </h2>
            <p className="text-muted-foreground">
              Subject: {selectedAssignment.subject}
            </p>
            <p>{formatDueDate(selectedAssignment.dueDate)}</p>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setView('list')}>
                Back
              </Button>
              <Button onClick={() => setView('submit')}>
                Proceed to Submit
              </Button>
            </div>
          </div>
        )}

        {/* ================= SUBMIT VIEW ================= */}
        {view === 'submit' && selectedAssignment && (
          <div className="max-w-xl mx-auto space-y-6">
            <h2 className="text-xl font-semibold">Upload Assignment</h2>
            <input type="file" accept=".pdf" />
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setView('detail')}>
                Back
              </Button>
              <Button onClick={() => setView('complete')}>
                Submit Assignment
              </Button>
            </div>
          </div>
        )}

        {/* ================= COMPLETE VIEW ================= */}
        {view === 'complete' && selectedAssignment && (
          <div className="text-center space-y-4 py-12">
            <CheckCircle className="w-12 h-12 mx-auto text-success" />
            <h2 className="text-2xl font-bold">
              Assignment Submitted ✅
            </h2>
            <p className="text-muted-foreground">
              {selectedAssignment.title}
            </p>
            <Button
              onClick={() => {
                setView('list');
                setSelectedAssignment(null);
              }}
            >
              Back to Assignments
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default AssignmentsPage;
