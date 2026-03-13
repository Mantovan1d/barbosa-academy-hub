import React from 'react';
import { useApp } from '@/context/AppContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, Users, Trophy, LogOut, Download } from 'lucide-react';
import PageHeader from '@/components/PageHeader';

const AdminPage: React.FC = () => {
  const { users, getRanking, allAttempts, comments, logout } = useApp();
  const navigate = useNavigate();
  const ranking = getRanking();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const exportCSV = () => {
    const headers = ['Posição', 'Nome', 'CPF', 'Cargo', 'Pontuação', 'Total'];
    const rows = ranking.map((r, i) => [
      i + 1,
      r.user.nome,
      r.user.cpf,
      r.user.cargo,
      r.score,
      r.total,
    ]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ranking_barbosa.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen">
      <PageHeader extra={
        <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground">
          <LogOut size={16} className="mr-1" /> Sair
        </Button>
      } />

      <div className="mx-auto max-w-2xl px-4 py-6">
        <div className="mb-6 flex items-center gap-2">
          <Shield size={24} className="text-primary" />
          <h2 className="font-heading text-xl font-bold">Painel Administrativo</h2>
        </div>

        {/* Stats */}
        <div className="mb-6 grid grid-cols-3 gap-3">
          <div className="rounded-xl border border-border bg-card p-4 text-center">
            <Users size={20} className="mx-auto mb-1 text-primary" />
            <p className="text-2xl font-bold text-foreground">{users.length}</p>
            <p className="text-xs text-muted-foreground">Funcionários</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 text-center">
            <Trophy size={20} className="mx-auto mb-1 text-secondary" />
            <p className="text-2xl font-bold text-foreground">{allAttempts.length}</p>
            <p className="text-xs text-muted-foreground">Tentativas</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{comments.length}</p>
            <p className="text-xs text-muted-foreground">Comentários</p>
          </div>
        </div>

        {/* Export */}
        <div className="mb-6">
          <Button onClick={exportCSV} variant="outline" className="gap-2">
            <Download size={16} /> Exportar Ranking (CSV)
          </Button>
        </div>

        {/* Users table */}
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="border-b border-border bg-muted px-4 py-3">
            <h3 className="font-heading text-sm font-bold">Funcionários Cadastrados</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs text-muted-foreground">
                  <th className="px-4 py-2">Nome</th>
                  <th className="px-4 py-2">CPF</th>
                  <th className="px-4 py-2">Cargo</th>
                  <th className="px-4 py-2">Pontuação (1ª)</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => {
                  const r = ranking.find(r => r.user.id === u.id);
                  return (
                    <tr key={u.id} className="border-b border-border last:border-0">
                      <td className="px-4 py-2.5 font-medium text-foreground">{u.nome}</td>
                      <td className="px-4 py-2.5 text-muted-foreground">{u.cpf}</td>
                      <td className="px-4 py-2.5 text-muted-foreground">{u.cargo}</td>
                      <td className="px-4 py-2.5">{r ? `${r.score}/${r.total}` : '—'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Ranking */}
        <div className="mt-6 rounded-xl border border-border bg-card overflow-hidden">
          <div className="border-b border-border bg-muted px-4 py-3">
            <h3 className="font-heading text-sm font-bold">Ranking (1ª Tentativa)</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs text-muted-foreground">
                  <th className="px-4 py-2">#</th>
                  <th className="px-4 py-2">Nome</th>
                  <th className="px-4 py-2">Pontuação</th>
                </tr>
              </thead>
              <tbody>
                {ranking.map((r, i) => (
                  <tr key={r.user.id} className={`border-b border-border last:border-0 ${i < 3 ? 'bg-primary/5' : ''}`}>
                    <td className="px-4 py-2.5 font-bold">{i + 1}</td>
                    <td className="px-4 py-2.5 font-medium text-foreground">{r.user.nome}</td>
                    <td className="px-4 py-2.5">{r.score}/{r.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
