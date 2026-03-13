import React, { createContext, useContext, useState, useCallback } from 'react';

export interface User {
  id: string;
  nome: string;
  cpf: string;
  cargo: string;
  dataNascimento: string;
  isAdmin?: boolean;
}

export interface QuizAttempt {
  userId: string;
  score: number;
  total: number;
  attemptNumber: number;
  timestamp: string;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  text: string;
  timestamp: string;
}

interface AppState {
  user: User | null;
  videoCompleted: boolean;
  quizAttempts: QuizAttempt[];
  allAttempts: QuizAttempt[];
  comments: Comment[];
  users: User[];
}

interface AppContextType extends AppState {
  login: (user: User) => void;
  logout: () => void;
  setVideoCompleted: (v: boolean) => void;
  addQuizAttempt: (attempt: QuizAttempt) => void;
  addComment: (comment: Comment) => void;
  getUserAttempts: (userId: string) => QuizAttempt[];
  getRanking: () => Array<{ user: User; score: number; total: number }>;
  registerUser: (user: User) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const seedUsers: User[] = [
  { id: '12345678900', nome: 'Carlos Silva', cpf: '123.456.789-00', cargo: 'Repositor', dataNascimento: '15/03/1990' },
  { id: '23456789011', nome: 'Maria Santos', cpf: '234.567.890-11', cargo: 'Caixa', dataNascimento: '22/07/1988' },
  { id: '34567890122', nome: 'João Oliveira', cpf: '345.678.901-22', cargo: 'Atendente', dataNascimento: '10/11/1995' },
  { id: '45678901233', nome: 'Ana Costa', cpf: '456.789.012-33', cargo: 'Supervisora', dataNascimento: '05/01/1992' },
  { id: '56789012344', nome: 'Pedro Lima', cpf: '567.890.123-44', cargo: 'Repositor', dataNascimento: '18/06/1993' },
];

const seedAttempts: QuizAttempt[] = [
  { userId: '12345678900', score: 10, total: 11, attemptNumber: 1, timestamp: '2024-01-15T10:00:00' },
  { userId: '23456789011', score: 9, total: 11, attemptNumber: 1, timestamp: '2024-01-15T11:00:00' },
  { userId: '34567890122', score: 8, total: 11, attemptNumber: 1, timestamp: '2024-01-15T12:00:00' },
  { userId: '45678901233', score: 11, total: 11, attemptNumber: 1, timestamp: '2024-01-15T09:00:00' },
  { userId: '56789012344', score: 7, total: 11, attemptNumber: 1, timestamp: '2024-01-15T14:00:00' },
];

const seedComments: Comment[] = [
  { id: 'c1', userId: '12345678900', userName: 'Carlos Silva', text: 'Excelente treinamento! Aprendi muito sobre Cross Merchandising.', timestamp: '2024-01-15T10:30:00' },
  { id: 'c2', userId: '23456789011', userName: 'Maria Santos', text: 'O quiz está muito bem elaborado, parabéns!', timestamp: '2024-01-15T11:30:00' },
  { id: 'c3', userId: '45678901233', userName: 'Ana Costa', text: 'Vamos aplicar essas técnicas!', timestamp: '2024-01-15T13:00:00' },
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [videoCompleted, setVideoCompleted] = useState(false);
  const [allAttempts, setAllAttempts] = useState<QuizAttempt[]>(seedAttempts);
  const [comments, setComments] = useState<Comment[]>(seedComments);
  const [users, setUsers] = useState<User[]>(seedUsers);

  const login = useCallback((u: User) => setUser(u), []);
  const logout = useCallback(() => {
    setUser(null);
    setVideoCompleted(false);
  }, []);

  const registerUser = useCallback((u: User) => {
    setUsers(prev => {
      if (prev.find(x => x.id === u.id)) return prev;
      return [...prev, u];
    });
  }, []);

  const addQuizAttempt = useCallback((attempt: QuizAttempt) => {
    setAllAttempts(prev => [...prev, attempt]);
  }, []);

  const addComment = useCallback((comment: Comment) => {
    setComments(prev => [comment, ...prev]);
  }, []);

  const getUserAttempts = useCallback((userId: string) => {
    return allAttempts.filter(a => a.userId === userId);
  }, [allAttempts]);

  const getRanking = useCallback(() => {
    const firstAttempts = new Map<string, QuizAttempt>();
    allAttempts.forEach(a => {
      if (a.attemptNumber === 1 && !firstAttempts.has(a.userId)) {
        firstAttempts.set(a.userId, a);
      }
    });

    const ranking = Array.from(firstAttempts.entries()).map(([userId, attempt]) => {
      const u = users.find(u => u.id === userId) || seedUsers[0];
      return { user: u, score: attempt.score, total: attempt.total };
    });

    return ranking.sort((a, b) => b.score - a.score);
  }, [allAttempts, users]);

  const quizAttempts = user ? allAttempts.filter(a => a.userId === user.id) : [];

  return (
    <AppContext.Provider value={{
      user, videoCompleted, quizAttempts, allAttempts, comments, users,
      login, logout, setVideoCompleted, addQuizAttempt, addComment, getUserAttempts, getRanking, registerUser,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
