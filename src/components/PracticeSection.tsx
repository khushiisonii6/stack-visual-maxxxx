import React, { useState } from 'react';
import { PRACTICE_PROBLEMS } from '../data/practiceData';
import { PracticeProblem } from '../types';
import { CheckCircle2, Circle, Code2, HelpCircle, Lightbulb, Search, ChevronDown, ChevronUp } from 'lucide-react';

interface PracticeSectionProps {
  completedProblems: string[];
  onToggleComplete: (id: string) => void;
}

export const PracticeSection: React.FC<PracticeSectionProps> = ({
  completedProblems,
  onToggleComplete,
}) => {
  const [search, setSearch] = useState<string>('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedLang, setSelectedLang] = useState<'python' | 'cpp' | 'java'>('python');
  const [showHintId, setShowHintId] = useState<string | null>(null);

  const filteredProblems = PRACTICE_PROBLEMS.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase());
    const matchesDiff = difficultyFilter === 'All' || p.difficulty === difficultyFilter;
    return matchesSearch && matchesDiff;
  });

  const getDiffBadge = (diff: string) => {
    if (diff === 'Easy') return <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-bold">Easy</span>;
    if (diff === 'Medium') return <span className="px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800 text-xs font-bold">Medium</span>;
    return <span className="px-2.5 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-800 text-xs font-bold">Hard</span>;
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Data Structure Practice Problems</h1>
        <p className="text-slate-400 text-sm">
          Curated coding problems with step-by-step hints, time/space complexity bounds, and code solutions in Python, C++, and Java.
        </p>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900 p-4 rounded-xl border border-slate-800">
        <div className="relative w-72 max-w-full">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search problems or topics..."
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2">
          {['All', 'Easy', 'Medium', 'Hard'].map((diff) => (
            <button
              key={diff}
              onClick={() => setDifficultyFilter(diff)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                difficultyFilter === diff
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {/* Problems Accordion List */}
      <div className="flex flex-col gap-4">
        {filteredProblems.map((problem) => {
          const isCompleted = completedProblems.includes(problem.id);
          const isExpanded = expandedId === problem.id;

          return (
            <div
              key={problem.id}
              className={`bg-slate-900 border rounded-2xl overflow-hidden transition-all ${
                isCompleted ? 'border-emerald-900/60 bg-emerald-950/10' : 'border-slate-800'
              }`}
            >
              {/* Card Header */}
              <div
                onClick={() => setExpandedId(isExpanded ? null : problem.id)}
                className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-800/50 transition"
              >
                <div className="flex items-center gap-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleComplete(problem.id);
                    }}
                    className="text-slate-500 hover:text-emerald-400 transition cursor-pointer"
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-400 fill-emerald-400/20" />
                    ) : (
                      <Circle className="w-6 h-6 text-slate-600" />
                    )}
                  </button>

                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className={`font-bold text-base ${isCompleted ? 'line-through text-slate-400' : 'text-white'}`}>
                        {problem.title}
                      </h3>
                      {getDiffBadge(problem.difficulty)}
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono text-[10px]">
                        {problem.category}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-slate-400">
                  <span className="text-xs font-mono hidden sm:inline">
                    Time: {problem.complexity.time}
                  </span>
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="p-6 border-t border-slate-800 bg-slate-950/60 flex flex-col gap-6 text-sm text-slate-300">
                  {/* Problem Statement */}
                  <div>
                    <h4 className="font-bold text-slate-200 mb-2">Problem Statement:</h4>
                    <p className="leading-relaxed bg-slate-900 p-4 rounded-xl border border-slate-800">
                      {problem.statement}
                    </p>
                  </div>

                  {/* Examples & Constraints */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                      <span className="font-bold text-slate-300 text-xs uppercase tracking-wider block mb-2">
                        Example:
                      </span>
                      <div className="font-mono text-xs text-indigo-300">
                        <div><strong>Input:</strong> {problem.inputExample}</div>
                        <div><strong>Output:</strong> {problem.outputExample}</div>
                      </div>
                    </div>

                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                      <span className="font-bold text-slate-300 text-xs uppercase tracking-wider block mb-2">
                        Constraints:
                      </span>
                      <ul className="list-disc list-inside text-xs text-slate-400 space-y-1">
                        {problem.constraints.map((c, i) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Hints */}
                  <div>
                    <button
                      onClick={() => setShowHintId(showHintId === problem.id ? null : problem.id)}
                      className="flex items-center gap-2 text-amber-400 font-semibold text-xs hover:underline cursor-pointer"
                    >
                      <Lightbulb className="w-4 h-4" />
                      {showHintId === problem.id ? 'Hide Hints' : 'Show Problem Hints'}
                    </button>

                    {showHintId === problem.id && (
                      <div className="mt-3 p-4 bg-amber-950/30 border border-amber-800/40 text-amber-200 rounded-xl text-xs space-y-2">
                        {problem.hints.map((hint, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <span className="font-bold">Hint {idx + 1}:</span>
                            <span>{hint}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Code Solution Tabs */}
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col gap-3">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <span className="font-bold text-slate-200 text-xs flex items-center gap-1.5">
                        <Code2 className="w-4 h-4 text-indigo-400" /> Solution Code:
                      </span>
                      <div className="flex items-center gap-2">
                        {(['python', 'cpp', 'java'] as const).map((lang) => (
                          <button
                            key={lang}
                            onClick={() => setSelectedLang(lang)}
                            className={`px-3 py-1 rounded-md text-xs font-mono uppercase transition cursor-pointer ${
                              selectedLang === lang
                                ? 'bg-indigo-600 text-white font-bold'
                                : 'bg-slate-800 text-slate-400 hover:text-white'
                            }`}
                          >
                            {lang}
                          </button>
                        ))}
                      </div>
                    </div>

                    <pre className="p-4 bg-slate-950 rounded-lg text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed border border-slate-800">
                      {problem.solutions[selectedLang]}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
