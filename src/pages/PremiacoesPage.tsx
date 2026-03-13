import React from 'react';
import { Gift, TrendingUp, Ticket } from 'lucide-react';
import BottomNav from '@/components/BottomNav';

const premios = [
  { nome: 'Mochila Barbosa', desc: 'Mochila executiva com logo Barbosa', popular: true },
  { nome: 'Bag de Peito', desc: 'Bag de peito estilosa para o dia a dia', popular: false },
  { nome: 'Fardo de Produtos', desc: 'Fardo com produtos selecionados da loja', popular: true },
  { nome: 'Boné Barbosa', desc: 'Boné exclusivo da coleção Barbosa Academy', popular: false },
];

const cupons = [
  { codigo: 'BARBOSA10', desconto: '10% OFF', desc: 'Em compras acima de R$100' },
  { codigo: 'ACADEMY15', desconto: '15% OFF', desc: 'Produtos selecionados' },
];

const PremiacoesPage: React.FC = () => {
  return (
    <div className="min-h-screen pb-safe">
      <header className="border-b border-border bg-card/80 px-4 py-3 backdrop-blur-md">
        <div className="mx-auto max-w-lg">
          <h1 className="font-heading text-lg font-bold"><span className="text-primary">BARBOSA</span> ACADEMY</h1>
        </div>
      </header>

      <div className="mx-auto max-w-lg px-4 py-6">
        <div className="mb-2 flex items-center gap-2">
          <Gift size={24} className="text-secondary" />
          <h2 className="font-heading text-xl font-bold">Premiações</h2>
        </div>
        <p className="mb-6 text-xs text-muted-foreground">Sorteio entre os 3 melhores colocados do ranking</p>

        {/* Prizes */}
        <div className="mb-8 grid grid-cols-2 gap-3">
          {premios.map((p, i) => (
            <div key={i} className="relative overflow-hidden rounded-xl border border-border bg-card p-4 transition-shadow hover:shadow-lg">
              {p.popular && (
                <div className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-secondary/20 px-2 py-0.5 text-[10px] font-semibold text-secondary">
                  <TrendingUp size={10} /> Popular
                </div>
              )}
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Gift size={24} className="text-primary" />
              </div>
              <h3 className="text-sm font-bold text-foreground">{p.nome}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Coupons */}
        <div className="mb-2 flex items-center gap-2">
          <Ticket size={20} className="text-accent" />
          <h3 className="font-heading text-lg font-bold">Cupons Extras</h3>
        </div>
        <p className="mb-4 text-xs text-muted-foreground">Prêmios extras para todos os participantes</p>

        <div className="space-y-3">
          {cupons.map((c, i) => (
            <div key={i} className="flex items-center gap-4 rounded-xl border border-dashed border-accent/40 bg-accent/5 p-4">
              <div className="text-center">
                <p className="font-heading text-lg font-bold text-accent">{c.desconto}</p>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">{c.codigo}</p>
                <p className="text-xs text-muted-foreground">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default PremiacoesPage;
