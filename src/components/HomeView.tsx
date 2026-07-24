import React, { useState } from 'react';
import { ActiveView, DataStructureId } from '../types';
import { DS_THEORY_DATA } from '../data/dsData';
import {
  Layers,
  ArrowRightLeft,
  Repeat,
  ListOrdered,
  GitCommit,
  ArrowLeftRight,
  RotateCw,
  Network,
  GitBranch,
  Pyramid,
  Share2,
  Hash,
  Search,
  Sparkles,
  ArrowRight,
  CheckCircle,
  PlayCircle,
  Zap,
  BookOpen
} from 'lucide-react';

interface HomeViewProps {
  onNavigate: (view: ActiveView, dsId?: DataStructureId) => void;
  completedDS: string[];
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, completedDS }) => {
  const [search, setSearch] = useState<string>('');

  const getIcon = (id: string) => {
    switch (id) {
      case 'stack': return <Layers className="w-6 h-6 text-indigo-400" />;
      case 'queue': return <ArrowRightLeft className="w-6 h-6 text-cyan-400" />;
      case 'circular-queue': return <Repeat className="w-6 h-6 text-purple-400" />;
      case 'priority-queue': return <ListOrdered className="w-6 h-6 text-amber-400" />;
      case 'singly-linked-list': return <GitCommit className="w-6 h-6 text-emerald-400" />;
      case 'doubly-linked-list': return <ArrowLeftRight className="w-6 h-6 text-rose-400" />;
      case 'circular-linked-list': return <RotateCw className="w-6 h-6 text-sky-400" />;
      case 'binary-search-tree': return <Network className="w-6 h-6 text-indigo-400" />;
      case 'avl-tree': return <GitBranch className="w-6 h-6 text-emerald-400" />;
      case 'max-heap': return <Pyramid className="w-6 h-6 text-amber-400" />;
      case 'graph': return <Share2 className="w-6 h-6 text-cyan-400" />;
      case 'hash-table': return <Hash className="w-6 h-6 text-rose-400" />;
      default: return <Layers className="w-6 h-6 text-indigo-400" />;
    }
  };

  const allStructures = Object.values(DS_THEORY_DATA).filter((item) => {
    return (
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase()) ||
      item.shortDesc.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Hero Section */}
      <div className="relative rounded-2xl bg-gradient-to-br from-indigo-950/80 via-slate-900 to-slate-950 border border-slate-800/90 p-5 sm:p-8 overflow-hidden shadow-2xl">
        <div className="relative z-10 flex flex-col gap-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-indigo-950/90 border border-indigo-700/60 text-indigo-300 text-[11px] font-mono font-semibold uppercase tracking-wider w-fit">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> Interactive Learning Simulator
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Learn Data Structures <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">Visually</span>
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
            Step beyond static notes. Interact with real-time animations for Stacks, Queues, Linked Lists, Trees, Heaps, Graphs, Sorting algorithms, and Hash Tables with multi-language code snippets and quizzes.
          </p>

          {/* Search Input in Hero */}
          <div className="relative w-full max-w-xl mt-1">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter modules (e.g. Stack, Linked List, BST, Graph)..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950/90 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 shadow-xl font-sans"
            />
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            <button
              onClick={() => onNavigate('sorting')}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold text-xs shadow-md shadow-indigo-600/30 transition cursor-pointer"
            >
              <PlayCircle className="w-3.5 h-3.5" /> Try Sorting Simulator
            </button>
            <button
              onClick={() => onNavigate('mini-games')}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 rounded-lg font-bold text-xs transition cursor-pointer border border-slate-800"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" /> Play Mini-Games
            </button>
            <button
              onClick={() => onNavigate('practice')}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 rounded-lg font-bold text-xs transition cursor-pointer border border-slate-800"
            >
              <BookOpen className="w-3.5 h-3.5 text-purple-400" /> Practice Problems
            </button>
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-white">Data Structure Modules</h2>
            <p className="text-[11px] text-slate-400">Select any module to open theory, simulator, code, and quiz.</p>
          </div>
          <span className="text-xs font-mono font-bold text-indigo-400 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
            {allStructures.length} Modules
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
          {allStructures.map((ds) => {
            const isCompleted = completedDS.includes(ds.id);

            return (
              <div
                key={ds.id}
                onClick={() => onNavigate('ds-detail', ds.id)}
                className={`group p-4 rounded-xl bg-slate-900/90 border transition-all duration-200 cursor-pointer flex flex-col justify-between gap-3 shadow-lg hover:border-indigo-500/60 ${
                  isCompleted
                    ? 'border-emerald-900/80 bg-emerald-950/10 hover:border-emerald-700'
                    : 'border-slate-800/90 hover:bg-slate-850'
                }`}
              >
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 group-hover:scale-105 transition-transform">
                      {getIcon(ds.id)}
                    </div>
                    {isCompleted ? (
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-mono font-bold">
                        <CheckCircle className="w-3 h-3 text-emerald-400" /> Done
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-md bg-slate-950 text-slate-400 text-[10px] font-mono font-semibold border border-slate-800">
                        {ds.category}
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-sm text-white group-hover:text-indigo-300 transition-colors">
                    {ds.name}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-snug">
                    {ds.shortDesc}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2.5 border-t border-slate-800/80 text-[11px] font-mono font-semibold text-slate-400 group-hover:text-indigo-400 transition-colors">
                  <span>Open Module</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
