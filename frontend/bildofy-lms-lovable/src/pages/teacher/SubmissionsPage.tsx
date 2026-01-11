import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const SubmissionsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-card border-b">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/teacher">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Student Submissions</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10 text-center">
        <p className="text-muted-foreground">
          Student submissions will appear here.
        </p>
      </main>
    </div>
  );
};

export default SubmissionsPage;
