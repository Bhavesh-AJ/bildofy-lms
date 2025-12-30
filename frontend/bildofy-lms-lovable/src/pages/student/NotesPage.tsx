import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { XPBadge } from '@/components/gamification/XPBadge';
import { useOnlineStatus } from '@/contexts/OnlineContext';
import {
  ArrowLeft,
  FileText,
  Plus,
  Download,
  Search,
  WifiOff,
  CheckCircle,
  CloudOff,
  Eye,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock data
const mockNotes = [
  {
    id: '1',
    title: 'Laws of Motion',
    subject: 'Physics',
    chapter: 'Chapter 5',
    createdAt: new Date('2024-01-15'),
    xpEarned: 25,
    isOfflineAvailable: true,
    pages: 12,
  },
  {
    id: '2',
    title: 'Chemical Bonding',
    subject: 'Chemistry',
    chapter: 'Chapter 4',
    createdAt: new Date('2024-01-12'),
    xpEarned: 25,
    isOfflineAvailable: false,
    pages: 8,
  },
  {
    id: '3',
    title: 'Quadratic Equations',
    subject: 'Mathematics',
    chapter: 'Chapter 3',
    createdAt: new Date('2024-01-10'),
    xpEarned: 25,
    isOfflineAvailable: true,
    pages: 15,
  },
];

const NotesPage: React.FC = () => {
  const { isOnline } = useOnlineStatus();
  const [searchQuery, setSearchQuery] = useState('');
  const [showGenerateForm, setShowGenerateForm] = useState(false);

  const filteredNotes = mockNotes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              <h1 className="text-xl font-display font-bold text-foreground">Notes</h1>
              <p className="text-sm text-muted-foreground">AI-generated study notes</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            onClick={() => setShowGenerateForm(true)}
            disabled={!isOnline}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            Generate Notes
            <XPBadge xp={25} size="sm" />
          </Button>
        </div>

        {/* Generate Form Modal */}
        {showGenerateForm && (
          <div className="mb-6 p-6 rounded-xl bg-card border border-border shadow-lg animate-scale-in">
            <h3 className="font-display font-semibold text-foreground mb-4">Generate New Notes</h3>
            <div className="grid gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Subject</label>
                <Input placeholder="e.g., Physics, Chemistry, Mathematics" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Topic/Chapter</label>
                <Input placeholder="e.g., Laws of Motion, Chapter 5" />
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setShowGenerateForm(false)}>
                  Cancel
                </Button>
                <Button className="gap-2">
                  <FileText className="w-4 h-4" />
                  Generate
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Notes List */}
        <div className="grid gap-4">
          {filteredNotes.map((note, index) => (
            <div
              key={note.id}
              className="p-4 rounded-xl bg-card border border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-200 animate-fade-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{note.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {note.subject} • {note.chapter} • {note.pages} pages
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center gap-1 text-xs text-success">
                        <CheckCircle className="w-3 h-3" />
                        <span>+{note.xpEarned} XP earned</span>
                      </div>
                      {note.isOfflineAvailable ? (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <CheckCircle className="w-3 h-3" />
                          <span>Available offline</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <CloudOff className="w-3 h-3" />
                          <span>Online only</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" disabled={!isOnline && !note.isOfflineAvailable}>
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" disabled={!isOnline}>
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredNotes.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No notes found</h3>
            <p className="text-muted-foreground">Try adjusting your search or generate new notes.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default NotesPage;
