import React, { useState, useEffect } from 'react';
import { ActiveView, DataStructureId, UserProgress } from './types';
import { DS_THEORY_DATA } from './data/dsData';

import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { HomeView } from './components/HomeView';
import { DSPageContainer } from './components/DSPageContainer';
import { SortingVisualizer } from './components/visualizers/SortingVisualizer';
import { SearchVisualizer } from './components/visualizers/SearchVisualizer';
import { ComplexityMatrix } from './components/ComplexityMatrix';
import { PracticeSection } from './components/PracticeSection';
import { MiniGamesSection } from './components/MiniGamesSection';
import { ProgressView } from './components/ProgressView';
import { SearchModal } from './components/SearchModal';
import { Menu } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'datastruct_studio_user_progress';

const initialProgress: UserProgress = {
  completedDS: [],
  quizScores: {},
  completedProblems: [],
  highScores: {
    complexity: 0,
    arrange: 0,
    matching: 0,
  },
};

export function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [selectedDSId, setSelectedDSId] = useState<DataStructureId | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);

  // LocalStorage Persistence
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved ? JSON.parse(saved) : initialProgress;
    } catch {
      return initialProgress;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error('Failed to save progress to localStorage:', e);
    }
  }, [progress]);

  const handleToggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleNavigate = (view: ActiveView, dsId?: DataStructureId) => {
    setActiveView(view);
    if (dsId) {
      setSelectedDSId(dsId);
    } else if (view === 'ds-detail' && !selectedDSId) {
      setSelectedDSId('stack');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMarkDSComplete = (dsId: string) => {
    setProgress((prev) => {
      const exists = prev.completedDS.includes(dsId);
      const updated = exists
        ? prev.completedDS.filter((id) => id !== dsId)
        : [...prev.completedDS, dsId];
      return { ...prev, completedDS: updated };
    });
  };

  const handleQuizComplete = (dsId: string, score: number, total: number) => {
    setProgress((prev) => ({
      ...prev,
      quizScores: {
        ...prev.quizScores,
        [dsId]: { score, total },
      },
    }));
  };

  const handleTogglePracticeComplete = (problemId: string) => {
    setProgress((prev) => {
      const exists = prev.completedProblems.includes(problemId);
      const updated = exists
        ? prev.completedProblems.filter((id) => id !== problemId)
        : [...prev.completedProblems, problemId];
      return { ...prev, completedProblems: updated };
    });
  };

  const handleUpdateHighScore = (game: 'complexity' | 'arrange' | 'matching', score: number) => {
    setProgress((prev) => ({
      ...prev,
      highScores: {
        ...prev.highScores,
        [game]: Math.max(prev.highScores[game] || 0, score),
      },
    }));
  };

  const handleResetProgress = () => {
    setProgress(initialProgress);
  };

  const completedDSPercent = Math.round((progress.completedDS.length / 12) * 100);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-100 text-slate-900'} font-sans antialiased bg-density-grid`}>
      {/* Top Header */}
      <Header
        theme={theme}
        onToggleTheme={handleToggleTheme}
        activeView={activeView}
        onNavigate={handleNavigate}
        progressPercent={completedDSPercent}
        onOpenSearch={() => setIsSearchModalOpen(true)}
      />

      {/* Main Layout Container */}
      <div className="flex max-w-[1600px] mx-auto">
        {/* Mobile Hamburger Toggle Bar */}
        <div className="md:hidden fixed bottom-4 right-4 z-40">
          <button
            onClick={() => setIsMobileSidebarOpen(true)}
            className="p-3 bg-indigo-600 text-white rounded-full shadow-2xl flex items-center justify-center cursor-pointer border border-indigo-400/30"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <Sidebar
          activeView={activeView}
          selectedDSId={selectedDSId}
          onNavigate={handleNavigate}
          isOpenMobile={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />

        {/* View Viewports */}
        <main className="flex-1 p-3 sm:p-6 min-w-0">
          {activeView === 'home' && (
            <HomeView onNavigate={handleNavigate} completedDS={progress.completedDS} />
          )}

          {activeView === 'ds-detail' && selectedDSId && DS_THEORY_DATA[selectedDSId] && (
            <DSPageContainer
              theory={DS_THEORY_DATA[selectedDSId]}
              onQuizComplete={handleQuizComplete}
              onMarkComplete={handleMarkDSComplete}
              isCompleted={progress.completedDS.includes(selectedDSId)}
            />
          )}

          {activeView === 'sorting' && (
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Sorting Algorithm Simulator</h1>
              <p className="text-slate-400 text-sm">Visualize step-by-step element comparisons and swap operations for classic sorting algorithms.</p>
              <SortingVisualizer />
            </div>
          )}

          {activeView === 'searching' && (
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Searching Algorithm Simulator</h1>
              <p className="text-slate-400 text-sm">Step-by-step target index lookup for Linear Search and Binary Search algorithms.</p>
              <SearchVisualizer />
            </div>
          )}

          {activeView === 'complexity-matrix' && <ComplexityMatrix />}

          {activeView === 'practice' && (
            <PracticeSection
              completedProblems={progress.completedProblems}
              onToggleComplete={handleTogglePracticeComplete}
            />
          )}

          {activeView === 'mini-games' && (
            <MiniGamesSection
              highScores={progress.highScores}
              onUpdateHighScore={handleUpdateHighScore}
            />
          )}

          {activeView === 'progress' && (
            <ProgressView progress={progress} onResetProgress={handleResetProgress} />
          )}
        </main>
      </div>

      {/* Global Quick Search Modal */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
export default App;
