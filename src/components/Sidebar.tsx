import React from 'react';
import { ActiveView, DataStructureId } from '../types';
import {
  Home,
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
  ArrowUpDown,
  Search,
  Table,
  CheckSquare,
  Gamepad2,
  Trophy,
  Activity,
  X
} from 'lucide-react';

interface SidebarProps {
  activeView: ActiveView;
  selectedDSId: DataStructureId | null;
  onNavigate: (view: ActiveView, dsId?: DataStructureId) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  selectedDSId,
  onNavigate,
  isOpenMobile,
  onCloseMobile,
}) => {
  const linearDS: { id: DataStructureId; name: string; icon: React.ReactNode }[] = [
    { id: 'stack', name: 'Stack', icon: <Layers className="w-4 h-4 text-indigo-400" /> },
    { id: 'queue', name: 'Queue', icon: <ArrowRightLeft className="w-4 h-4 text-cyan-400" /> },
    { id: 'circular-queue', name: 'Circular Queue', icon: <Repeat className="w-4 h-4 text-purple-400" /> },
    { id: 'priority-queue', name: 'Priority Queue', icon: <ListOrdered className="w-4 h-4 text-amber-400" /> },
    { id: 'singly-linked-list', name: 'Singly Linked List', icon: <GitCommit className="w-4 h-4 text-emerald-400" /> },
    { id: 'doubly-linked-list', name: 'Doubly Linked List', icon: <ArrowLeftRight className="w-4 h-4 text-rose-400" /> },
    { id: 'circular-linked-list', name: 'Circular Linked List', icon: <RotateCw className="w-4 h-4 text-sky-400" /> },
  ];

  const nonLinearDS: { id: DataStructureId; name: string; icon: React.ReactNode }[] = [
    { id: 'binary-search-tree', name: 'Binary Search Tree (BST)', icon: <Network className="w-4 h-4 text-indigo-400" /> },
    { id: 'avl-tree', name: 'AVL Tree', icon: <GitBranch className="w-4 h-4 text-emerald-400" /> },
    { id: 'max-heap', name: 'Max / Min Heap', icon: <Pyramid className="w-4 h-4 text-amber-400" /> },
    { id: 'graph', name: 'Graph', icon: <Share2 className="w-4 h-4 text-cyan-400" /> },
    { id: 'hash-table', name: 'Hash Table', icon: <Hash className="w-4 h-4 text-rose-400" /> },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      <aside
        className={`fixed md:sticky top-14 left-0 z-40 w-60 h-[calc(100vh-3.5rem)] bg-slate-950/95 border-r border-slate-800/90 flex flex-col justify-between p-3 transition-transform duration-300 overflow-y-auto ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex flex-col gap-4">
          {/* Mobile Close Button */}
          <div className="flex items-center justify-between md:hidden pb-2 border-b border-slate-800">
            <span className="font-bold text-white text-xs">Navigation</span>
            <button onClick={onCloseMobile} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Main Core Links */}
          <div className="flex flex-col gap-0.5">
            <button
              onClick={() => {
                onNavigate('home');
                onCloseMobile();
              }}
              className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg font-bold text-xs transition cursor-pointer ${
                activeView === 'home'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <Home className="w-3.5 h-3.5" /> Home Dashboard
            </button>

            <button
              onClick={() => {
                onNavigate('sorting');
                onCloseMobile();
              }}
              className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg font-bold text-xs transition cursor-pointer ${
                activeView === 'sorting'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <ArrowUpDown className="w-3.5 h-3.5 text-indigo-400" /> Sorting Visualizer
            </button>

            <button
              onClick={() => {
                onNavigate('searching');
                onCloseMobile();
              }}
              className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg font-bold text-xs transition cursor-pointer ${
                activeView === 'searching'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <Search className="w-3.5 h-3.5 text-cyan-400" /> Searching Visualizer
            </button>

            <button
              onClick={() => {
                onNavigate('complexity-matrix');
                onCloseMobile();
              }}
              className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg font-bold text-xs transition cursor-pointer ${
                activeView === 'complexity-matrix'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <Table className="w-3.5 h-3.5 text-emerald-400" /> Complexity Matrix
            </button>

            <button
              onClick={() => {
                onNavigate('practice');
                onCloseMobile();
              }}
              className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg font-bold text-xs transition cursor-pointer ${
                activeView === 'practice'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <CheckSquare className="w-3.5 h-3.5 text-purple-400" /> Practice Problems
            </button>

            <button
              onClick={() => {
                onNavigate('mini-games');
                onCloseMobile();
              }}
              className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg font-bold text-xs transition cursor-pointer ${
                activeView === 'mini-games'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <Gamepad2 className="w-3.5 h-3.5 text-amber-400" /> Mini Games Hub
            </button>
          </div>

          {/* Group: Linear Data Structures */}
          <div>
            <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest block mb-1.5 px-2">
              Linear Data Structures
            </span>
            <div className="flex flex-col gap-0.5">
              {linearDS.map((ds) => {
                const isSelected = activeView === 'ds-detail' && selectedDSId === ds.id;
                return (
                  <button
                    key={ds.id}
                    onClick={() => {
                      onNavigate('ds-detail', ds.id);
                      onCloseMobile();
                    }}
                    className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md text-[11px] font-semibold transition cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 text-indigo-300 border-l-2 border-indigo-500 font-bold'
                        : 'text-slate-400 hover:bg-slate-900/60 hover:text-slate-200'
                    }`}
                  >
                    {ds.icon}
                    <span className="truncate">{ds.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Group: Non-Linear Data Structures */}
          <div>
            <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest block mb-1.5 px-2">
              Non-Linear Data Structures
            </span>
            <div className="flex flex-col gap-0.5">
              {nonLinearDS.map((ds) => {
                const isSelected = activeView === 'ds-detail' && selectedDSId === ds.id;
                return (
                  <button
                    key={ds.id}
                    onClick={() => {
                      onNavigate('ds-detail', ds.id);
                      onCloseMobile();
                    }}
                    className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md text-[11px] font-semibold transition cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 text-indigo-300 border-l-2 border-indigo-500 font-bold'
                        : 'text-slate-400 hover:bg-slate-900/60 hover:text-slate-200'
                    }`}
                  >
                    {ds.icon}
                    <span className="truncate">{ds.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Progress Quick Card */}
        <div
          onClick={() => {
            onNavigate('progress');
            onCloseMobile();
          }}
          className="mt-4 p-3 bg-slate-900/90 border border-slate-800/80 rounded-lg cursor-pointer hover:border-slate-700 transition"
        >
          <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1">
            <span className="flex items-center gap-1.5 text-[11px]">
              <Activity className="w-3.5 h-3.5 text-indigo-400" /> Stats Tracker
            </span>
            <span className="text-indigo-400 text-[10px] font-mono">View →</span>
          </div>
          <span className="text-[10px] text-slate-500 block leading-tight">
            Quizzes, practice problems & high scores.
          </span>
        </div>
      </aside>
    </>
  );
};
