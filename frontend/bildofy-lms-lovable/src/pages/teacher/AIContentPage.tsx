import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Sparkles } from 'lucide-react';

const AIContentPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/teacher">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold text-foreground">AI Content</h1>
            <p className="text-sm text-muted-foreground">
              Generate smart teaching materials using AI
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 text-center">
        <Sparkles className="w-14 h-14 mx-auto text-muted-foreground mb-4" />
        <h2 className="text-2xl font-semibold mb-2">
          AI Content Tools – Coming Soon ✨
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          This section will allow teachers to generate notes, questions,
          assignments, and explanations using AI assistance.
        </p>

        <Button className="mt-6" asChild>
          <Link to="/teacher">Back to Dashboard</Link>
        </Button>
      </main>
    </div>
  );
};

export default AIContentPage;
