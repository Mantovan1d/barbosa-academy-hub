import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle2, Play } from 'lucide-react';
import BottomNav from '@/components/BottomNav';

const CursoPage: React.FC = () => {
  const { videoCompleted, setVideoCompleted, user } = useApp();
  const [progress, setProgress] = useState(0);
  const [showExitWarning, setShowExitWarning] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Simulate video progress
  const startVideo = useCallback(() => {
    setIsPlaying(true);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setVideoCompleted(true);
          return 100;
        }
        return prev + 0.5;
      });
    }, 150);
  }, [setVideoCompleted]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isPlaying && !videoCompleted) {
        e.preventDefault();
        setShowExitWarning(true);
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, videoCompleted]);

  return (
    <div className="min-h-screen pb-safe">
      {/* Header */}
      <header className="border-b border-border bg-card/80 px-4 py-3 backdrop-blur-md">
        <div className="mx-auto flex max-w-lg items-center justify-between">
          <div>
            <h1 className="font-heading text-lg font-bold">
              <span className="text-primary">BARBOSA</span> ACADEMY
            </h1>
          </div>
          {user && (
            <div className="text-right text-xs text-muted-foreground">
              <p className="font-medium text-foreground">{user.nome.split(' ')[0]}</p>
              <p>{user.loja}</p>
            </div>
          )}
        </div>
      </header>

      <div className="mx-auto max-w-lg px-4 py-6">
        <h2 className="mb-1 font-heading text-xl font-bold text-foreground">Treinamento Cross Merchandising</h2>
        <p className="mb-6 text-sm text-muted-foreground">Assista ao vídeo completo para liberar o quiz</p>

        {/* Video area */}
        <div className="relative mb-4 aspect-video overflow-hidden rounded-xl border border-border bg-muted">
          {!isPlaying ? (
            <button
              onClick={startVideo}
              className="group absolute inset-0 flex flex-col items-center justify-center gap-3"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary shadow-lg transition-transform group-hover:scale-110">
                <Play size={28} className="ml-1 text-primary-foreground" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">Clique para iniciar o vídeo</span>
            </button>
          ) : (
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <div className="mb-2 font-heading text-5xl font-bold text-primary">
                  {Math.floor(progress)}%
                </div>
                <p className="text-sm text-muted-foreground">
                  {videoCompleted ? 'Vídeo concluído!' : 'Reproduzindo...'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div className="mb-4 h-2 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{Math.floor(progress)}% assistido</span>
          <span>{progress >= 95 ? '✓ Liberado' : 'Mínimo: 95%'}</span>
        </div>

        {/* Warning / Success messages */}
        {showExitWarning && (
          <div className="mt-4 flex items-start gap-3 rounded-lg border border-secondary bg-secondary/10 p-4">
            <AlertTriangle size={20} className="mt-0.5 shrink-0 text-secondary" />
            <div>
              <p className="text-sm font-semibold text-secondary">Atenção!</p>
              <p className="text-xs text-muted-foreground">Se sair agora, seu progresso será perdido. Continue assistindo para liberar o quiz.</p>
            </div>
          </div>
        )}

        {videoCompleted && (
          <div className="mt-4 flex items-start gap-3 rounded-lg border border-green-600 bg-green-600/10 p-4">
            <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-green-500" />
            <div>
              <p className="text-sm font-semibold text-green-500">Vídeo Concluído!</p>
              <p className="text-xs text-muted-foreground">Você já pode acessar o quiz na aba abaixo.</p>
            </div>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default CursoPage;
