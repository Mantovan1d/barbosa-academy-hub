import React from 'react';
import { useApp } from '@/context/AppContext';
import { Trophy, Medal, Award, TrendingUp } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import PageHeader from '@/components/PageHeader';

const podiumIcons = [Trophy, Medal, Award];
const podiumColors = ['text-secondary', 'text-muted-foreground', 'text-orange-600'];

const RankingPage: React.FC = () => {
  const { getRanking, user } = useApp();
  const ranking = getRanking();

  return (
    <div className="min-h-screen pb-safe">
      <PageHeader />

      <div className="mx-auto max-w-lg px-4 py-6">
        <div className="mb-6 flex items-center gap-2">
          <Trophy size={24} className="text-secondary" />
          <h2 className="font-heading text-xl font-bold">Ranking</h2>
        </div>
        <p className="mb-6 text-xs text-muted-foreground">Classificação baseada na 1ª tentativa do quiz</p>

        {ranking.length > 0 && (
          <div className="mb-6 flex items-end justify-center gap-3">
            {[1, 0, 2].map(pos => {
              const entry = ranking[pos];
              if (!entry) return <div key={pos} className="w-24" />;
              const Icon = podiumIcons[pos];
              const isCenter = pos === 0;
              return (
                <div key={pos} className={`flex flex-col items-center ${isCenter ? 'mb-4' : ''}`}>
                  <Icon size={isCenter ? 32 : 24} className={podiumColors[pos]} />
                  <div className={`mt-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-primary ${isCenter ? 'h-12 w-12 text-lg' : ''}`}>
                    {pos + 1}
                  </div>
                  <p className="mt-1 text-center text-xs font-medium text-foreground truncate max-w-[80px]">{entry.user.nome.split(' ')[0]}</p>
                  <p className="text-xs text-muted-foreground">{entry.score}/{entry.total}</p>
                </div>
              );
            })}
          </div>
        )}

        <div className="space-y-2">
          {ranking.map((entry, i) => {
            const isCurrentUser = user?.id === entry.user.id;
            return (
              <div key={entry.user.id}
                className={`flex items-center gap-3 rounded-xl border p-3 transition-colors ${
                  isCurrentUser ? 'border-primary bg-primary/5' : 'border-border bg-card'
                }`}
              >
                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  i < 3 ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
                }`}>
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">
                    {entry.user.nome} {isCurrentUser && <span className="text-xs text-primary">(você)</span>}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-foreground">{entry.score}/{entry.total}</p>
                  {i < 3 && <TrendingUp size={12} className="ml-auto text-secondary" />}
                </div>
              </div>
            );
          })}
        </div>

        {ranking.length === 0 && (
          <p className="py-12 text-center text-sm text-muted-foreground">Nenhuma tentativa registrada ainda.</p>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default RankingPage;
