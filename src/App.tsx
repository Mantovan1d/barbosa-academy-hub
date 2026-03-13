import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppProvider, useApp } from "@/context/AppContext";
import LoginPage from "./pages/LoginPage";
import CursoPage from "./pages/CursoPage";
import QuizPage from "./pages/QuizPage";
import RankingPage from "./pages/RankingPage";
import ComentariosPage from "./pages/ComentariosPage";
import PremiacoesPage from "./pages/PremiacoesPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useApp();
  if (!user) return <Navigate to="/" replace />;
  return <>{children}</>;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<LoginPage />} />
    <Route path="/curso" element={<ProtectedRoute><CursoPage /></ProtectedRoute>} />
    <Route path="/quiz" element={<ProtectedRoute><QuizPage /></ProtectedRoute>} />
    <Route path="/ranking" element={<ProtectedRoute><RankingPage /></ProtectedRoute>} />
    <Route path="/comentarios" element={<ProtectedRoute><ComentariosPage /></ProtectedRoute>} />
    <Route path="/premiacoes" element={<ProtectedRoute><PremiacoesPage /></ProtectedRoute>} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
