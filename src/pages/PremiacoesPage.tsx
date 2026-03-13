import React from 'react';
import { Gift, TrendingUp } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import PageHeader from '@/components/PageHeader';

const premios = [
  { nome: 'Mochila', emoji: '🎒', desc: 'Mochila executiva exclusiva', popular: true },
  { nome: 'Bag de Peito', emoji: '👝', desc: 'Bag de peito estilosa para o dia a dia', popular: false },
  { nome: 'Fardo de Produtos', emoji: '📦', desc: 'Fardo com produtos selecionados', popular: true },
  { nome: 'Boné', emoji: '🧢', desc: 'Boné exclusivo da coleção', popular: false },
];

const floatClasses = ['animate-float', 'animate-float-delay-1', 'animate-float-delay-2', 'animate-float-delay-3'];

const PremiacoesPage: React.FC = () => {
  return (
    <div className="min-h-screen pb-safe">
      <PageHeader />

      <div className="mx-auto max-w-lg px-4 py-6">
        <div className="mb-2 flex items-center gap-2">
          <Gift size={24} className="text-secondary" />
          <h2 className="font-heading text-xl font-bold">Premiações</h2>
        </div>
        <p className="mb-6 text-xs text-muted-foreground">🏆 Os 3 melhores colocados no ranking concorrem a um sorteio para levar tudo!</p>

        <div className="mb-8 grid grid-cols-2 gap-4">
          {premios.map((p, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-lg cursor-pointer ${floatClasses[i]}`}
            >
              {p.popular && (
                <div className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-secondary/20 px-2 py-0.5 text-[10px] font-semibold text-secondary">
                  <TrendingUp size={10} /> Popular
                </div>
              )}
              <div className="mb-3 text-4xl">{p.emoji}</div>
              <h3 className="text-sm font-bold text-foreground">{p.nome}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 text-center">
          <p className="text-sm font-semibold text-primary">🎁 Sorteio Exclusivo</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Os 3 melhores colocados no ranking da primeira tentativa do quiz participam de um sorteio para levar todos os prêmios acima!
          </p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default PremiacoesPage;
