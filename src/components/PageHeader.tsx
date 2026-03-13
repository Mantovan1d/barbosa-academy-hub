import React from 'react';
import ThemeToggle from './ThemeToggle';
import { useApp } from '@/context/AppContext';

interface PageHeaderProps {
  showUser?: boolean;
  extra?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ showUser = false, extra }) => {
  const { user } = useApp();

  return (
    <header className="border-b border-border bg-card/80 px-4 py-3 backdrop-blur-md">
      <div className="mx-auto flex max-w-lg items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="leading-tight">
            <h1 className="font-heading text-sm font-bold tracking-tight">
              <span className="text-primary">EXPERIENCIA </span>
              <span className="text-secondary">MONSTER</span>
            </h1>
            <p className="font-heading text-xs font-bold text-primary tracking-wide">BARBOSA</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {extra}
          <ThemeToggle />
          {showUser && user && (
            <div className="text-right text-xs text-muted-foreground">
              <p className="font-medium text-foreground">{user.nome.split(' ')[0]}</p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
