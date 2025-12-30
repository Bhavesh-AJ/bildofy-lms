import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RoleCard } from '@/components/cards/RoleCard';
import { GraduationCap, Users, UserCheck, Sparkles } from 'lucide-react';

const RoleSelection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-success/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 min-h-screen flex flex-col items-center justify-center">
        {/* Logo & Tagline */}
        <div className="text-center mb-12 animate-fade-up">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-hero shadow-glow mb-6">
            <Sparkles className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            LearnSphere
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Your AI-powered learning companion. Choose your role to begin your journey.
          </p>
        </div>

        {/* Role Cards */}
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <RoleCard
              title="Student Dashboard"
              description="Track progress, earn XP, and master your subjects with AI-powered learning."
              icon={GraduationCap}
              gradient="primary"
              onClick={() => navigate('/student')}
            />
          </div>

          <div className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <RoleCard
              title="Teacher Dashboard"
              description="Create assignments, track student performance, and leverage AI tools."
              icon={Users}
              gradient="accent"
              onClick={() => navigate('/teacher')}
            />
          </div>

          <div className="animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <RoleCard
              title="Parent Dashboard"
              description="Monitor your child's progress with detailed insights and weekly reports."
              icon={UserCheck}
              gradient="success"
              onClick={() => navigate('/parent')}
            />
          </div>
        </div>

        {/* Footer */}
        <p className="mt-12 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: '0.5s' }}>
          Designed for Indian students • Grades 9-12 • CBSE, ICSE & State Boards
        </p>
      </div>
    </div>
  );
};

export default RoleSelection;
