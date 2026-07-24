import React, { useState } from 'react';
import { COMPLEXITY_MATRIX_DATA } from '../data/complexityData';
import { Search, Filter, ArrowUpDown } from 'lucide-react';

export const ComplexityMatrix: React.FC = () => {
  const [search, setSearch] = useState<string>('');
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const filteredData = COMPLEXITY_MATRIX_DATA.filter((row) => {
    const matchesSearch = row.name.toLowerCase().includes(search.toLowerCase());
    const matchesCat = filterCategory === 'All' || row.category === filterCategory;
    return matchesSearch && matchesCat;
  });

  const getComplexityBadge = (complexity: string) => {
    if (complexity === 'O(1)') {
      return <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono text-xs font-bold">O(1)</span>;
    }
    if (complexity.includes('log n') && !complexity.includes('n log n')) {
      return <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-mono text-xs font-bold">{complexity}</span>;
    }
    if (complexity === 'O(n)') {
      return <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 font-mono text-xs font-bold">O(n)</span>;
    }
    if (complexity.includes('n log n')) {
      return <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800 font-mono text-xs font-bold">{complexity}</span>;
    }
    if (complexity.includes('n²')) {
      return <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 font-mono text-xs font-bold">{complexity}</span>;
    }
    return <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-xs">{complexity}</span>;
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Time & Space Complexity Comparison</h1>
        <p className="text-slate-400 text-sm">
          Interactive Big-O reference matrix for all Data Structures, Sorting Algorithms, and Searching Techniques.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900 p-4 rounded-xl border border-slate-800">
        <div className="relative w-72 max-w-full">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Structure or Algorithm..."
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none"
          >
            <option value="All">All Categories</option>
            <option value="Data Structure">Data Structures</option>
            <option value="Sorting Algorithm">Sorting Algorithms</option>
            <option value="Search Algorithm">Search Algorithms</option>
          </select>
        </div>
      </div>

      {/* Matrix Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-slate-950 border-b border-slate-800 text-xs font-bold text-slate-400 uppercase tracking-wider">
              <th className="p-4">Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Search (Avg)</th>
              <th className="p-4">Insert (Avg)</th>
              <th className="p-4">Delete (Avg)</th>
              <th className="p-4">Worst Case</th>
              <th className="p-4">Space Complexity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-sm font-sans">
            {filteredData.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-800/40 transition">
                <td className="p-4 font-bold text-white flex items-center gap-2">
                  <span>{row.name}</span>
                </td>
                <td className="p-4 text-xs text-slate-400">{row.category}</td>
                <td className="p-4">{getComplexityBadge(row.avgSearch)}</td>
                <td className="p-4">{getComplexityBadge(row.avgInsert)}</td>
                <td className="p-4">{getComplexityBadge(row.avgDelete)}</td>
                <td className="p-4">{getComplexityBadge(row.worstSearch)}</td>
                <td className="p-4">{getComplexityBadge(row.spaceComplexity)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
