import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Video, FileText, Trophy, MessageCircle, Gift } from 'lucide-react';

const tabs = [
  { path: '/curso', label: 'Curso', icon: Video },
  { path: '/quiz', label: 'Quiz', icon: FileText },
  { path: '/ranking', label: 'Ranking', icon: Trophy },
  { path: '/comentarios', label: 'Comentários', icon: MessageCircle },
  { path: '/premiacoes', label: 'Premiações', icon: Gift },
];

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-lg items-center justify-around py-2">
        {tabs.map(tab => {
          const isActive = location.pathname === tab.path;
          const Icon = tab.icon;
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 text-xs transition-colors ${
                isActive
                  ? 'text-primary font-semibold'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 1.5} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
