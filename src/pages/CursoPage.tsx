import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useApp } from '@/context/AppContext';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import PageHeader from '@/components/PageHeader';

const YOUTUBE_VIDEO_ID = 'YFX-uZo9Ekk';

const CursoPage: React.FC = () => {
  const { videoCompleted, setVideoCompleted } = useApp();
  const [progress, setProgress] = useState(0);
  const [showExitWarning, setShowExitWarning] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Simulate progress tracking (since YouTube API with controls=0 is limited)
  const startTracking = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setVideoCompleted(true);
          return 100;
        }
        return prev + 0.3;
      });
    }, 300);
  }, [setVideoCompleted]);

  useEffect(() => {
    startTracking();
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!videoCompleted) {
        e.preventDefault();
        setShowExitWarning(true);
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [videoCompleted, startTracking]);

  return (
    <div className="min-h-screen pb-safe">
      <PageHeader showUser />

      <div className="mx-auto max-w-lg px-4 py-6">
        <h2 className="mb-1 font-heading text-xl font-bold text-foreground">Treinamento Cross Merchandising</h2>
        <p className="mb-6 text-sm text-muted-foreground">Assista ao vídeo completo para liberar o quiz</p>

        {/* YouTube Video */}
        <div className="relative mb-4 aspect-video overflow-hidden rounded-xl border border-border bg-muted">
          <iframe
            ref={iframeRef}
            src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?controls=0&disablekb=1&rel=0&modestbranding=1&autoplay=1`}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Treinamento Cross Merchandising"
          />
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

        {/* Warning */}
        {showExitWarning && (
          <div className="mt-4 flex items-start gap-3 rounded-lg border border-secondary bg-secondary/10 p-4">
            <AlertTriangle size={20} className="mt-0.5 shrink-0 text-secondary" />
            <div>
              <p className="text-sm font-semibold text-secondary">⚠️ Se sair, o vídeo reinicia</p>
              <p className="text-xs text-muted-foreground">Continue assistindo para liberar o quiz.</p>
            </div>
          </div>
        )}

        {videoCompleted && (
          <div className="mt-4 flex items-start gap-3 rounded-lg border border-secondary bg-secondary/10 p-4">
            <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-secondary" />
            <div>
              <p className="text-sm font-semibold text-secondary">Vídeo Concluído!</p>
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
