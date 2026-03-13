import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { MessageCircle, Send } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import PageHeader from '@/components/PageHeader';

const ComentariosPage: React.FC = () => {
  const { comments, addComment, user } = useApp();
  const [text, setText] = useState('');

  const handleSend = () => {
    if (!text.trim() || !user) return;
    addComment({
      id: Date.now().toString(),
      userId: user.id,
      userName: user.nome,
      text: text.trim(),
      timestamp: new Date().toISOString(),
    });
    setText('');
  };

  const formatTime = (ts: string) => {
    const d = new Date(ts);
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }) + ' · ' + d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen pb-safe">
      <PageHeader />

      <div className="mx-auto max-w-lg px-4 py-6">
        <div className="mb-6 flex items-center gap-2">
          <MessageCircle size={24} className="text-primary" />
          <h2 className="font-heading text-xl font-bold">Comentários</h2>
        </div>

        <div className="mb-6 flex gap-2">
          <input
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Escreva um comentário..."
            className="flex-1 rounded-xl border border-border bg-muted px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
          />
          <Button onClick={handleSend} size="icon" className="shrink-0 bg-primary text-primary-foreground">
            <Send size={18} />
          </Button>
        </div>

        <div className="space-y-3">
          {comments.map(c => (
            <div key={c.id} className="rounded-xl border border-border bg-card p-4 animate-fade-in">
              <div className="mb-2">
                <span className="text-sm font-semibold text-foreground">{c.userName}</span>
              </div>
              <p className="text-sm text-foreground/90">{c.text}</p>
              <p className="mt-2 text-[10px] text-muted-foreground">{formatTime(c.timestamp)}</p>
            </div>
          ))}
        </div>

        {comments.length === 0 && (
          <p className="py-12 text-center text-sm text-muted-foreground">Nenhum comentário ainda. Seja o primeiro!</p>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default ComentariosPage;
