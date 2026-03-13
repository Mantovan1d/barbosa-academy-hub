import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';

const ADMIN_CPF = '77997624546';
const ADMIN_DOB = '04/02/1989';

const LoginPage: React.FC = () => {
  const { login, registerUser } = useApp();
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [error, setError] = useState('');

  const formatCPF = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 11);
    return digits
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  };

  const formatDate = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 8);
    return digits
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\d{2})(\d)/, '$1/$2');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim() || !cpf.trim() || !dataNascimento.trim()) {
      setError('Preencha todos os campos');
      return;
    }
    const cpfDigits = cpf.replace(/\D/g, '');
    if (cpfDigits.length !== 11) {
      setError('CPF inválido');
      return;
    }

    const isAdmin = cpfDigits === ADMIN_CPF && dataNascimento === ADMIN_DOB;

    const userData = {
      id: cpfDigits,
      nome: nome.trim(),
      cpf,
      cargo: isAdmin ? 'Administrador' : 'Funcionário',
      dataNascimento,
      isAdmin,
    };

    registerUser(userData);
    login(userData);
    navigate(isAdmin ? '/admin' : '/curso');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="mb-8 text-center animate-fade-in">
        <h1 className="font-heading text-3xl font-bold tracking-tight">
          <span className="text-primary">EXPERIENCIA </span>
          <span className="text-secondary">MONSTER</span>
        </h1>
        <p className="font-heading text-2xl font-bold text-primary tracking-wide">BARBOSA</p>
        <p className="mt-2 text-sm text-muted-foreground">Treinamento que transforma</p>
      </div>

      <div className="w-full max-w-sm animate-slide-up">
        <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
          <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Acesso do Funcionário
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="nome" className="text-sm font-medium text-foreground">Nome Completo</Label>
              <Input
                id="nome"
                placeholder="Seu nome completo"
                value={nome}
                onChange={e => setNome(e.target.value)}
                className="bg-muted border-border"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="cpf" className="text-sm font-medium text-foreground">CPF</Label>
              <Input
                id="cpf"
                placeholder="000.000.000-00"
                value={cpf}
                onChange={e => setCpf(formatCPF(e.target.value))}
                className="bg-muted border-border"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="nascimento" className="text-sm font-medium text-foreground">Data de Nascimento</Label>
              <Input
                id="nascimento"
                placeholder="DD/MM/AAAA"
                value={dataNascimento}
                onChange={e => setDataNascimento(formatDate(e.target.value))}
                className="bg-muted border-border"
              />
            </div>

            {error && (
              <p className="flex items-center gap-1.5 text-xs text-destructive">
                <AlertCircle size={14} /> {error}
              </p>
            )}

            <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-heading font-bold text-sm uppercase tracking-wider">
              Entrar
            </Button>

            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <AlertCircle size={14} />
              Use seu CPF e data de nascimento para acessar
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
