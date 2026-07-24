import React, { useState, useEffect } from 'react';
import { ActiveView, DataStructureId } from '../types';
import { DS_THEORY_DATA } from '../data/dsData';
import { Search, X, Layers, ArrowUpDown, Table, CheckSquare, Gamepad2 } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: ActiveView, dsId?: DataStructureId) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredDS = Object.values(DS_THEORY_DATA).filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-start justify-center pt-20 p-4">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Search Header */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3 bg-slate-950">
          <Search className="w-5 h-5 text-indigo-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a data structure name or topic (e.g., Stack, Tree, Quick Sort)..."
            className="w-full bg-transparent text-sm text-white focus:outline-none"
          />
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-4 max-h-[380px] overflow-y-auto flex flex-col gap-2 text-xs">
          {/* Quick Tools */}
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Tools & Simulators</div>
          <div className="grid grid-cols-2 gap-2 mb-3">
            <button
              onClick={() => {
                onNavigate('sorting');
                onClose();
              }}
              className="p-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 text-left flex items-center gap-2 font-semibold"
            >
              <ArrowUpDown className="w-4 h-4 text-indigo-400" /> Sorting Simulator
            </button>
            <button
              onClick={() => {
                onNavigate('complexity-matrix');
                onClose();
              }}
              className="p-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 text-left flex items-center gap-2 font-semibold"
            >
              <Table className="w-4 h-4 text-emerald-400" /> Complexity Matrix
            </button>
          </div>

          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Data Structures</div>
          {filteredDS.map((ds) => (
            <button
              key={ds.id}
              onClick={() => {
                onNavigate('ds-detail', ds.id);
                onClose();
              }}
              className="p-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 text-left flex items-center justify-between font-semibold transition"
            >
              <div className="flex items-center gap-3">
                <Layers className="w-4 h-4 text-indigo-400" />
                <span>{ds.name}</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-500 font-mono text-[10px]">
                {ds.category}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
