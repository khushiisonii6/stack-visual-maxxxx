import React from 'react';
import { UserProgress } from '../types';
import { Trophy, CheckCircle, Flame, RotateCcw, Award, BookOpen } from 'lucide-react';

interface ProgressViewProps {
  progress: UserProgress;
  onResetProgress: () => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({ progress, onResetProgress }) => {
  const completedDSCount = progress.completedDS.length;
  const totalDS = 12; // Total DS modules
  const progressPct = Math.round((completedDSCount / totalDS) * 100);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Learning Analytics & Progress</h1>
          <p className="text-slate-400 text-sm">Track your data structure completions, quiz scores, and mini-game records.</p>
        </div>

        <button
          onClick={onResetProgress}
          className="flex items-center gap-1.5 px-4 py-2 bg-rose-950 hover:bg-rose-900 border border-rose-800 text-rose-300 rounded-xl text-xs font-bold transition cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" /> Reset Progress
        </button>
      </div>

      {/* Progress Cards Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center gap-4 shadow-lg">
          <div className="w-12 h-12 rounded-xl bg-indigo-950 border border-indigo-700/60 flex items-center justify-center text-indigo-400 font-bold text-lg">
            {progressPct}%
          </div>
          <div>
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">DS Modules</span>
            <span className="text-lg font-extrabold text-white">{completedDSCount} / {totalDS} Completed</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center gap-4 shadow-lg">
          <div className="w-12 h-12 rounded-xl bg-amber-950 border border-amber-700/60 flex items-center justify-center text-amber-400">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">Complexity Game</span>
            <span className="text-lg font-extrabold text-white">{progress.highScores.complexity} High Score</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center gap-4 shadow-lg">
          <div className="w-12 h-12 rounded-xl bg-emerald-950 border border-emerald-700/60 flex items-center justify-center text-emerald-400">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">Practice Problems</span>
            <span className="text-lg font-extrabold text-white">{progress.completedProblems.length} Solved</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center gap-4 shadow-lg">
          <div className="w-12 h-12 rounded-xl bg-purple-950 border border-purple-700/60 flex items-center justify-center text-purple-400">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">Quizzes Taken</span>
            <span className="text-lg font-extrabold text-white">{Object.keys(progress.quizScores).length} Completed</span>
          </div>
        </div>
      </div>

      {/* Detailed Quiz Performance */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl flex flex-col gap-4">
        <h3 className="font-bold text-white text-base">Quiz Scoreboard</h3>
        {Object.keys(progress.quizScores).length === 0 ? (
          <p className="text-xs text-slate-500 italic">No quizzes taken yet. Complete quizzes under Data Structure pages to track scores here.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.entries(progress.quizScores).map(([dsId, scoreObj]) => {
              const obj = scoreObj as { score: number; total: number };
              return (
                <div key={dsId} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-200 capitalize">{dsId.replace('-', ' ')}</span>
                  <span className="font-mono text-indigo-400 font-bold text-sm">
                    {obj.score} / {obj.total} ({Math.round((obj.score / obj.total) * 100)}%)
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
