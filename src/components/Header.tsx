import React from 'react';
import { Moon, Sun, Search, Sparkles, BookOpen, Layers } from 'lucide-react';
import { ActiveView } from '../types';

interface HeaderProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  activeView: ActiveView;
  onNavigate: (view: ActiveView) => void;
  progressPercent: number;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  onToggleTheme,
  activeView,
  onNavigate,
  progressPercent,
  onOpenSearch,
}) => {
  return (
    <header className="h-14 border-b border-slate-800/90 bg-slate-950/90 backdrop-blur-md sticky top-0 z-30 px-3 sm:px-6 flex items-center justify-between text-slate-100">
      {/* Brand Title */}
      <div
        onClick={() => onNavigate('home')}
        className="flex items-center gap-2.5 cursor-pointer select-none group"
      >
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-500 flex items-center justify-center border border-indigo-400/30 shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
          <Layers className="w-4 h-4 text-white" />
        </div>
        <div>
          <span className="font-extrabold text-base sm:text-lg tracking-tight bg-gradient-to-r from-white via-indigo-100 to-indigo-300 bg-clip-text text-transparent">
            DataStruct Studio
          </span>
          <span className="hidden sm:inline text-[9px] text-indigo-400/90 font-mono block -mt-1 font-semibold uppercase tracking-widest">
            Data Structures Lab
          </span>
        </div>
      </div>

      {/* Global Quick Search Button */}
      <button
        onClick={onOpenSearch}
        className="hidden md:flex items-center gap-2.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 rounded-lg text-slate-400 text-xs transition cursor-pointer"
      >
        <Search className="w-3.5 h-3.5 text-slate-500" />
        <span>Search Data Structures or Algorithms...</span>
        <kbd className="px-1.5 py-0.5 text-[9px] bg-slate-950 text-slate-500 border border-slate-800 rounded font-mono font-bold">
          ⌘K
        </kbd>
      </button>

      {/* Progress & Theme Toggle */}
      <div className="flex items-center gap-3">
        {/* Progress Pill */}
        <div
          onClick={() => onNavigate('progress')}
          className="flex items-center gap-1.5 px-2.5 py-1 bg-indigo-950/80 border border-indigo-800/80 rounded-lg text-indigo-300 text-xs font-mono font-bold cursor-pointer hover:bg-indigo-900/70 transition"
          title="View Progress Tracker"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>{progressPercent}% Done</span>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={onToggleTheme}
          className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
          title="Toggle Theme"
        >
          {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-indigo-400" />}
        </button>
      </div>
    </header>
  );
};
