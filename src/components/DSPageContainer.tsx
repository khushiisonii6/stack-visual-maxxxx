import React, { useState } from 'react';
import { DSTheory, CodeLanguage } from '../types';
import { BookOpen, Settings2, Code, Brain, Check, Copy, Clock, Layers, Sparkles } from 'lucide-react';
import { QuizComponent } from './QuizComponent';

// Visualizer Dispatcher
import { StackVisualizer } from './visualizers/StackVisualizer';
import { QueueVisualizer } from './visualizers/QueueVisualizer';
import { CircularQueueVisualizer } from './visualizers/CircularQueueVisualizer';
import { PriorityQueueVisualizer } from './visualizers/PriorityQueueVisualizer';
import { LinkedListVisualizer } from './visualizers/LinkedListVisualizer';
import { TreeVisualizer } from './visualizers/TreeVisualizer';
import { HeapVisualizer } from './visualizers/HeapVisualizer';
import { GraphVisualizer } from './visualizers/GraphVisualizer';
import { HashTableVisualizer } from './visualizers/HashTableVisualizer';

interface DSPageContainerProps {
  theory: DSTheory;
  onQuizComplete: (dsId: string, score: number, total: number) => void;
  onMarkComplete: (dsId: string) => void;
  isCompleted: boolean;
}

export const DSPageContainer: React.FC<DSPageContainerProps> = ({
  theory,
  onQuizComplete,
  onMarkComplete,
  isCompleted,
}) => {
  const [activeTab, setActiveTab] = useState<'learn' | 'operations' | 'code' | 'quiz'>('operations');
  const [selectedLang, setSelectedLang] = useState<CodeLanguage>('python');
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(theory.code[selectedLang]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderVisualizer = () => {
    switch (theory.id) {
      case 'stack':
        return <StackVisualizer />;
      case 'queue':
        return <QueueVisualizer />;
      case 'circular-queue':
        return <CircularQueueVisualizer />;
      case 'priority-queue':
        return <PriorityQueueVisualizer />;
      case 'singly-linked-list':
      case 'doubly-linked-list':
      case 'circular-linked-list':
        return <LinkedListVisualizer />;
      case 'binary-search-tree':
      case 'avl-tree':
        return <TreeVisualizer />;
      case 'max-heap':
      case 'min-heap':
        return <HeapVisualizer />;
      case 'graph':
        return <GraphVisualizer />;
      case 'hash-table':
        return <HashTableVisualizer />;
      default:
        return <StackVisualizer />;
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/90 border border-slate-800/90 p-4 sm:p-5 rounded-xl shadow-lg">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <h1 className="text-xl sm:text-2xl font-extrabold text-white">{theory.name}</h1>
            <span className="px-2 py-0.5 rounded-md bg-indigo-950/80 text-indigo-300 border border-indigo-800/80 text-[10px] font-mono font-bold uppercase">
              {theory.category} DS
            </span>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm">{theory.shortDesc}</p>
        </div>

        <button
          onClick={() => onMarkComplete(theory.id)}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg font-bold text-xs cursor-pointer transition ${
            isCompleted
              ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800'
              : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30'
          }`}
        >
          {isCompleted ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Sparkles className="w-3.5 h-3.5" />}
          {isCompleted ? 'Completed' : 'Mark Completed'}
        </button>
      </div>

      {/* 4 Main Section Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800/80 pb-2.5">
        <button
          onClick={() => setActiveTab('learn')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold text-xs cursor-pointer transition ${
            activeTab === 'learn'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5 text-cyan-400" /> Learn Theory
        </button>
        <button
          onClick={() => setActiveTab('operations')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold text-xs cursor-pointer transition ${
            activeTab === 'operations'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Settings2 className="w-3.5 h-3.5 text-amber-400" /> Simulator & Ops
        </button>
        <button
          onClick={() => setActiveTab('code')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold text-xs cursor-pointer transition ${
            activeTab === 'code'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Code className="w-3.5 h-3.5 text-emerald-400" /> Code Snippets
        </button>
        <button
          onClick={() => setActiveTab('quiz')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold text-xs cursor-pointer transition ${
            activeTab === 'quiz'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Brain className="w-3.5 h-3.5 text-purple-400" /> Quiz ({theory.quiz.length} MCQs)
        </button>
      </div>

      {/* SECTION 1: LEARN */}
      {activeTab === 'learn' && (
        <div className="flex flex-col gap-6 text-sm text-slate-300">
          {/* Definition */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-cyan-400" /> Definition
            </h2>
            <p className="leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800">
              {theory.definition}
            </p>
          </div>

          {/* Real Life Example */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" /> Real-Life Example
            </h2>
            <p className="leading-relaxed bg-amber-950/20 text-amber-200 p-4 rounded-xl border border-amber-900/40">
              {theory.realLifeExample}
            </p>
          </div>

          {/* Applications */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <h2 className="text-lg font-bold text-white mb-3">Applications</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {theory.applications.map((app, i) => (
                <li key={i} className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span>{app}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Advantages & Disadvantages */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
              <h2 className="text-lg font-bold text-emerald-400 mb-3">Advantages</h2>
              <ul className="space-y-2">
                {theory.advantages.map((adv, i) => (
                  <li key={i} className="bg-emerald-950/30 text-emerald-200 p-3 rounded-xl border border-emerald-900/40 flex items-start gap-2">
                    <span>✓</span>
                    <span>{adv}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
              <h2 className="text-lg font-bold text-rose-400 mb-3">Disadvantages</h2>
              <ul className="space-y-2">
                {theory.disadvantages.map((dis, i) => (
                  <li key={i} className="bg-rose-950/30 text-rose-200 p-3 rounded-xl border border-rose-900/40 flex items-start gap-2">
                    <span>✕</span>
                    <span>{dis}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Time Complexities Card */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-purple-400" /> Time & Space Complexity Bounds
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center font-mono">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-500 font-sans block mb-1">Search</span>
                <span className="font-bold text-indigo-400">{theory.timeComplexity.search}</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-500 font-sans block mb-1">Insert</span>
                <span className="font-bold text-emerald-400">{theory.timeComplexity.insert}</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-500 font-sans block mb-1">Delete</span>
                <span className="font-bold text-rose-400">{theory.timeComplexity.delete}</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-500 font-sans block mb-1">Space</span>
                <span className="font-bold text-amber-400">{theory.spaceComplexity}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: OPERATIONS & VISUALIZER */}
      {activeTab === 'operations' && renderVisualizer()}

      {/* SECTION 3: CODE */}
      {activeTab === 'code' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              {(['python', 'c', 'cpp', 'java'] as CodeLanguage[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLang(lang)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition cursor-pointer ${
                    selectedLang === lang
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy Code'}
            </button>
          </div>

          <pre className="p-6 bg-slate-950 rounded-xl text-xs sm:text-sm font-mono text-emerald-300 overflow-x-auto leading-relaxed border border-slate-800/80">
            {theory.code[selectedLang]}
          </pre>
        </div>
      )}

      {/* SECTION 4: QUIZ */}
      {activeTab === 'quiz' && (
        <QuizComponent
          dsName={theory.name}
          dsId={theory.id}
          questions={theory.quiz}
          onQuizComplete={onQuizComplete}
        />
      )}
    </div>
  );
};
