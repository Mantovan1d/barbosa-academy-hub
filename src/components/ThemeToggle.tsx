import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle: React.FC = () => {
  const [dark, setDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      setDark(true);
    }
  }, []);

  return (
    <button
      onClick={() => setDark(d => !d)}
      className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-muted text-muted-foreground transition-colors hover:text-foreground"
      aria-label="Alternar tema"
    >
      {dark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
};

export default ThemeToggle;
