import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Zap, CheckCircle2, XCircle, Lock } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import PageHeader from '@/components/PageHeader';

const questions = [
  { q: 'O que é Cross Merchandising?', options: ['Técnica de exposição conjunta de produtos complementares', 'Venda de produtos importados', 'Promoção relâmpago', 'Troca de mercadorias entre lojas'], answer: 0 },
  { q: 'Qual é o principal objetivo do Cross Merchandising?', options: ['Reduzir estoque', 'Aumentar o ticket médio', 'Diminuir o número de funcionários', 'Mudar o layout da loja'], answer: 1 },
  { q: 'Exemplo de Cross Merchandising: macarrão + ?', options: ['Sabão em pó', 'Molho de tomate', 'Desinfetante', 'Papel higiênico'], answer: 1 },
  { q: 'Onde é melhor posicionar produtos de Cross Merchandising?', options: ['No estoque', 'Próximo ao produto principal', 'Na entrada da loja', 'Perto dos caixas apenas'], answer: 1 },
  { q: 'Qual combinação NÃO é um bom exemplo de Cross Merchandising?', options: ['Churrasco + carvão', 'Café + filtro de papel', 'Shampoo + arroz', 'Vinho + queijo'], answer: 2 },
  { q: 'O Cross Merchandising pode ser aplicado em qual setor?', options: ['Apenas em alimentos', 'Apenas em higiene', 'Em todos os setores', 'Apenas em bebidas'], answer: 2 },
  { q: 'Qual ferramenta é essencial para planejar o Cross Merchandising?', options: ['Planograma', 'Nota fiscal', 'Folha de pagamento', 'Balanço patrimonial'], answer: 0 },
  { q: 'Quem deve participar do planejamento de Cross Merchandising?', options: ['Apenas o gerente', 'Apenas o fornecedor', 'Toda a equipe da loja', 'Apenas o RH'], answer: 2 },
  { q: 'Qual a frequência ideal para atualizar as ações de Cross Merchandising?', options: ['Uma vez por ano', 'Nunca', 'Regularmente, conforme sazonalidade', 'A cada 5 anos'], answer: 2 },
  { q: 'O que acontece quando o Cross Merchandising é bem executado?', options: ['Aumento de custos', 'Queda nas vendas', 'Aumento das vendas e satisfação do cliente', 'Nada muda'], answer: 2 },
  { q: 'Qual destes é um benefício indireto do Cross Merchandising?', options: ['Fidelização do cliente', 'Aumento do aluguel', 'Redução de salários', 'Demissão de funcionários'], answer: 0 },
];

const QuizPage: React.FC = () => {
  const { user, videoCompleted, quizAttempts, addQuizAttempt } = useApp();
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
  const [showResult, setShowResult] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const userAttempts = quizAttempts.filter(a => a.userId === user?.id);
  const attemptsLeft = 3 - userAttempts.length;
  const canAttempt = attemptsLeft > 0;

  if (!videoCompleted) {
    return (
      <div className="min-h-screen pb-safe">
        <PageHeader />
        <div className="mx-auto flex max-w-lg flex-col items-center justify-center px-4 py-20 text-center">
          <Lock size={48} className="mb-4 text-muted-foreground" />
          <h2 className="mb-2 font-heading text-xl font-bold">Quiz Bloqueado</h2>
          <p className="text-sm text-muted-foreground">Assista ao vídeo completo (95%) na aba Curso para liberar o quiz.</p>
        </div>
        <BottomNav />
      </div>
    );
  }

  const handleNext = () => {
    if (selected === null) return;
    const newAnswers = [...answers];
    newAnswers[currentQ] = selected;
    setAnswers(newAnswers);

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
    } else {
      const score = newAnswers.reduce((acc, ans, i) => acc + (ans === questions[i].answer ? 1 : 0), 0);
      addQuizAttempt({
        userId: user!.id,
        score,
        total: questions.length,
        attemptNumber: userAttempts.length + 1,
        timestamp: new Date().toISOString(),
      });
      setShowResult(true);
    }
  };

  const lastAttempt = userAttempts[userAttempts.length - 1];

  if (showResult || (!canAttempt && !quizStarted)) {
    const displayAttempt = showResult
      ? { score: answers.reduce((acc, ans, i) => acc + (ans === questions[i].answer ? 1 : 0), 0), total: questions.length }
      : lastAttempt;

    return (
      <div className="min-h-screen pb-safe">
        <PageHeader />
        <div className="mx-auto max-w-lg px-4 py-8 text-center">
          <div className="mb-6 animate-fade-in">
            {displayAttempt && displayAttempt.score >= 8 ? (
              <CheckCircle2 size={64} className="mx-auto mb-4 text-secondary" />
            ) : (
              <XCircle size={64} className="mx-auto mb-4 text-destructive" />
            )}
            <h2 className="mb-2 font-heading text-2xl font-bold">
              {displayAttempt && displayAttempt.score >= 8 ? 'Parabéns!' : 'Continue Estudando!'}
            </h2>
            <p className="text-4xl font-bold text-primary">
              {displayAttempt?.score}/{displayAttempt?.total}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">acertos</p>
          </div>

          <div className="rounded-xl border border-border bg-card p-4 text-left text-sm">
            <p className="text-muted-foreground">Tentativas usadas: <span className="font-semibold text-foreground">{userAttempts.length}/3</span></p>
            {userAttempts.length === 1 && <p className="mt-1 text-xs text-secondary">⚡ Apenas a 1ª tentativa vale para o ranking!</p>}
            {canAttempt && (
              <Button onClick={() => { setShowResult(false); setQuizStarted(true); setCurrentQ(0); setSelected(null); setAnswers(new Array(questions.length).fill(null)); }}
                className="mt-4 w-full" variant="outline">
                Tentar Novamente ({attemptsLeft - (showResult ? 1 : 0)} restante{attemptsLeft > 2 ? 's' : ''})
              </Button>
            )}
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  if (!quizStarted) {
    return (
      <div className="min-h-screen pb-safe">
        <PageHeader />
        <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-12 text-center">
          <Zap size={48} className="mb-4 text-secondary" />
          <h2 className="mb-2 font-heading text-2xl font-bold">Quiz Rápido</h2>
          <p className="mb-2 text-sm text-muted-foreground">11 perguntas sobre Cross Merchandising</p>
          <p className="mb-6 text-xs text-muted-foreground">Você tem 3 tentativas. Apenas a 1ª vale para o ranking.</p>
          <Button onClick={() => setQuizStarted(true)} className="bg-primary text-primary-foreground font-heading font-bold uppercase tracking-wider">
            Iniciar Quiz
          </Button>
        </div>
        <BottomNav />
      </div>
    );
  }

  const question = questions[currentQ];

  return (
    <div className="min-h-screen pb-safe">
      <PageHeader extra={<span className="text-xs text-muted-foreground">{currentQ + 1}/{questions.length}</span>} />

      <div className="mx-auto max-w-lg px-4 py-6">
        <div className="mb-6 h-1.5 overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }} />
        </div>

        <h3 className="mb-6 font-heading text-lg font-semibold">{question.q}</h3>

        <div className="space-y-3">
          {question.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`w-full rounded-xl border p-4 text-left text-sm transition-all ${
                selected === i
                  ? 'border-primary bg-primary/10 text-foreground'
                  : 'border-border bg-card text-muted-foreground hover:border-muted-foreground'
              }`}
            >
              <span className="mr-3 inline-flex h-6 w-6 items-center justify-center rounded-full border border-current text-xs font-bold">
                {String.fromCharCode(65 + i)}
              </span>
              {opt}
            </button>
          ))}
        </div>

        <Button
          onClick={handleNext}
          disabled={selected === null}
          className="mt-6 w-full bg-primary text-primary-foreground font-heading font-bold uppercase tracking-wider"
        >
          {currentQ < questions.length - 1 ? 'Próxima' : 'Finalizar'}
        </Button>
      </div>

      <BottomNav />
    </div>
  );
};

export default QuizPage;
