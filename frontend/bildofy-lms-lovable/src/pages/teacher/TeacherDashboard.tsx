import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/cards/StatCard';
import {
  Users,
  ClipboardCheck,
  TrendingUp,
  Plus,
  BarChart3,
  BookOpen,
  Settings,
  LogOut,
  Sparkles,
} from 'lucide-react';

const mockStats = {
  totalStudents: 156,
  activeAssignments: 8,
  testsCreated: 24,
  avgClassScore: 72,
};

const recentActivity = [
  { id: '1', action: 'Created test', item: 'Physics Chapter 5', time: '2 hours ago' },
  { id: '2', action: 'Graded assignment', item: 'Math Homework Set 3', time: '4 hours ago' },
  { id: '3', action: 'AI generated notes', item: 'Chemistry Bonding', time: 'Yesterday' },
];

const TeacherDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">L</span>
                </div>
                <span className="font-display font-bold text-lg text-foreground">
                  LearnSphere
                </span>
              </Link>
              <span className="text-sm text-muted-foreground px-2 py-0.5 bg-secondary rounded-full">
                Teacher
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
              <Link to="/">
                <Button variant="ghost" size="icon">
                  <LogOut className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="mb-8 animate-fade-up">
          <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">
            Teacher Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your classes, create content, and track student progress.
          </p>
        </div>

        {/* Quick Actions */}
        <section className="mb-8 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <h2 className="text-lg font-display font-semibold text-foreground mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              variant="action"
              className="h-auto py-4 flex-col gap-2"
              onClick={() => navigate('/teacher/create-assignment')}
            >
              <Plus className="w-6 h-6 text-primary" />
              <span>Create Assignment</span>
            </Button>

            <Button
              variant="action"
              className="h-auto py-4 flex-col gap-2"
              onClick={() => navigate('/teacher/create-test')}
            >
              <ClipboardCheck className="w-6 h-6 text-primary" />
              <span>Create Test</span>
            </Button>

            <Button
              variant="action"
              className="h-auto py-4 flex-col gap-2"
              onClick={() => navigate('/teacher/ai-content')}
            >
              <Sparkles className="w-6 h-6 text-primary" />
              <span>AI Content</span>
            </Button>

            <Button
              variant="action"
              className="h-auto py-4 flex-col gap-2"
              onClick={() => navigate('/teacher/analytics')}
            >
              <BarChart3 className="w-6 h-6 text-primary" />
              <span>View Analytics</span>
            </Button>
          </div>
        </section>

        {/* Stats */}
        <section className="mb-8 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-lg font-display font-semibold text-foreground mb-4">
            Overview
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              title="Total Students"
              value={mockStats.totalStudents}
              icon={Users}
            />
            <StatCard
              title="Active Assignments"
              value={mockStats.activeAssignments}
              icon={BookOpen}
            />
            <StatCard
              title="Tests Created"
              value={mockStats.testsCreated}
              icon={ClipboardCheck}
            />
            <StatCard
              title="Class Average"
              value={`${mockStats.avgClassScore}%`}
              icon={TrendingUp}
              trend={{ value: 5, isPositive: true }}
            />
          </div>
        </section>

        {/* Recent Activity */}
        <section className="animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <h2 className="text-lg font-display font-semibold text-foreground mb-4">
            Recent Activity
          </h2>
          <div className="bg-card border border-border rounded-xl divide-y divide-border">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">{activity.item}</p>
                </div>
                <span className="text-sm text-muted-foreground">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default TeacherDashboard;
