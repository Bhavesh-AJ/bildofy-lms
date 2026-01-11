import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, ClipboardCheck } from 'lucide-react';

const CreateTestPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-card border-b">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/teacher">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Create Test</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-xl space-y-4">
        <Input placeholder="Test Title" />
        <Input placeholder="Subject" />
        <Input type="number" placeholder="Number of Questions" />
        <Input type="number" placeholder="Duration (minutes)" />
        <Input type="number" placeholder="XP Reward" />

        <Button className="w-full gap-2">
          <ClipboardCheck className="w-4 h-4" />
          Create Test
        </Button>
      </main>
    </div>
  );
};

export default CreateTestPage;
