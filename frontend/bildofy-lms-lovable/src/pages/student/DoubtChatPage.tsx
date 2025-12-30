import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { XPBadge } from '@/components/gamification/XPBadge';
import { useOnlineStatus } from '@/contexts/OnlineContext';
import { ArrowLeft, MessageCircleQuestion, Send, Bot, User, WifiOff, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

const mockMessages: Message[] = [
  {
    id: '1',
    content: 'Hello! I\'m your AI study assistant. Ask me any question about your subjects, and I\'ll help you understand better. You earn XP for meaningful interactions!',
    role: 'assistant',
    timestamp: new Date(),
  },
];

const DoubtChatPage: React.FC = () => {
  const { isOnline } = useOnlineStatus();
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response (in production, this calls the API)
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: isOnline
          ? 'Great question! Let me explain this concept in detail...\n\nThe answer involves understanding the fundamental principles involved. Would you like me to break it down further or provide an example?'
          : 'I\'m currently in offline mode. I can only provide basic responses. For detailed explanations, please connect to the internet.',
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/student">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-display font-bold text-foreground flex items-center gap-2">
                  <MessageCircleQuestion className="w-5 h-5 text-primary" />
                  AI Doubt Assistant
                </h1>
                <p className="text-sm text-muted-foreground">
                  {isOnline ? 'Online • Full capabilities' : 'Offline • Limited responses'}
                </p>
              </div>
            </div>
            <XPBadge xp={10} size="sm" />
          </div>
        </div>
      </header>

      {/* Offline Banner */}
      {!isOnline && (
        <div className="bg-offline/10 border-b border-offline/30 px-4 py-2 flex items-center justify-center gap-2 text-sm">
          <WifiOff className="w-4 h-4 text-offline" />
          <span className="text-foreground">Limited AI responses in offline mode</span>
        </div>
      )}

      {/* Messages */}
      <main className="flex-1 overflow-y-auto p-4">
        <div className="container mx-auto max-w-2xl space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'flex gap-3 animate-fade-up',
                message.role === 'user' && 'flex-row-reverse'
              )}
            >
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
                  message.role === 'assistant'
                    ? 'bg-gradient-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground'
                )}
              >
                {message.role === 'assistant' ? (
                  <Bot className="w-4 h-4" />
                ) : (
                  <User className="w-4 h-4" />
                )}
              </div>
              <div
                className={cn(
                  'max-w-[80%] p-4 rounded-2xl',
                  message.role === 'assistant'
                    ? 'bg-card border border-border rounded-tl-sm'
                    : 'bg-primary text-primary-foreground rounded-tr-sm'
                )}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 animate-fade-up">
              <div className="w-8 h-8 rounded-full bg-gradient-primary text-primary-foreground flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-card border border-border p-4 rounded-2xl rounded-tl-sm">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Input */}
      <footer className="sticky bottom-0 bg-card border-t border-border p-4">
        <div className="container mx-auto max-w-2xl">
          <div className="flex gap-3">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask your doubt..."
              className="flex-1"
            />
            <Button onClick={handleSend} disabled={!input.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-center text-muted-foreground mt-2">
            <Sparkles className="w-3 h-3 inline mr-1" />
            Earn XP for meaningful questions and interactions
          </p>
        </div>
      </footer>
    </div>
  );
};

export default DoubtChatPage;
