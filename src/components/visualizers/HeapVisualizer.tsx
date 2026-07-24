import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, Info, RefreshCw } from 'lucide-react';
import { soundFx } from '../../utils/audio';

export const HeapVisualizer: React.FC = () => {
  const [heap, setHeap] = useState<number[]>([90, 70, 80, 40, 50, 60, 30]);
  const [isMaxHeap, setIsMaxHeap] = useState<boolean>(true);
  const [inputValue, setInputValue] = useState<string>('');
  const [message, setMessage] = useState<string>('Max Heap initialized. Root is maximum element (90).');
  const [swappingIndices, setSwappingIndices] = useState<[number, number] | null>(null);

  const siftUp = async (arr: number[], index: number) => {
    let curr = index;
    while (curr > 0) {
      const parent = Math.floor((curr - 1) / 2);
      const condition = isMaxHeap ? arr[curr] > arr[parent] : arr[curr] < arr[parent];

      if (condition) {
        setSwappingIndices([curr, parent]);
        soundFx.playSwap();
        await new Promise((res) => setTimeout(res, 500));

        // Swap
        [arr[curr], arr[parent]] = [arr[parent], arr[curr]];
        setHeap([...arr]);

        curr = parent;
      } else {
        break;
      }
    }
    setSwappingIndices(null);
  };

  const siftDown = async (arr: number[], index: number) => {
    let curr = index;
    const len = arr.length;

    while (curr < len) {
      const left = 2 * curr + 1;
      const right = 2 * curr + 2;
      let target = curr;

      if (left < len) {
        const cond = isMaxHeap ? arr[left] > arr[target] : arr[left] < arr[target];
        if (cond) target = left;
      }

      if (right < len) {
        const cond = isMaxHeap ? arr[right] > arr[target] : arr[right] < arr[target];
        if (cond) target = right;
      }

      if (target !== curr) {
        setSwappingIndices([curr, target]);
        soundFx.playSwap();
        await new Promise((res) => setTimeout(res, 500));

        [arr[curr], arr[target]] = [arr[target], arr[curr]];
        setHeap([...arr]);

        curr = target;
      } else {
        break;
      }
    }
    setSwappingIndices(null);
  };

  const handleInsert = async () => {
    const val = inputValue.trim() !== '' ? parseInt(inputValue, 10) : Math.floor(Math.random() * 90) + 10;
    if (isNaN(val)) return;

    const newHeap = [...heap, val];
    setHeap(newHeap);
    setMessage(`Inserted ${val} as leaf at index ${newHeap.length - 1}. Sifting up...`);
    setInputValue('');
    soundFx.playPush();

    await siftUp(newHeap, newHeap.length - 1);
    setMessage(`Heap property restored.`);
  };

  const handleExtractRoot = async () => {
    if (heap.length === 0) {
      setMessage('Heap is empty!');
      soundFx.playError();
      return;
    }

    const rootVal = heap[0];
    if (heap.length === 1) {
      setHeap([]);
      setMessage(`Extracted Root ${rootVal}. Heap is now empty.`);
      soundFx.playPop();
      return;
    }

    const newHeap = [...heap];
    const lastVal = newHeap.pop()!;
    newHeap[0] = lastVal;
    setHeap(newHeap);

    setMessage(`Extracted Root ${rootVal}. Placed last leaf ${lastVal} at root. Sifting down...`);
    soundFx.playPop();

    await siftDown(newHeap, 0);
    setMessage(`Heap property restored.`);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl text-slate-100 flex flex-col gap-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-800/60 p-4 rounded-xl border border-slate-700/50">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setIsMaxHeap(!isMaxHeap);
              setMessage(isMaxHeap ? 'Switched to Min Heap.' : 'Switched to Max Heap.');
            }}
            className="px-3 py-2 bg-indigo-900/60 hover:bg-indigo-800 text-indigo-200 border border-indigo-700/60 rounded-lg text-xs font-bold cursor-pointer"
          >
            Type: {isMaxHeap ? 'MAX HEAP (Root Max)' : 'MIN HEAP (Root Min)'}
          </button>

          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Val (e.g. 95)"
            className="w-32 px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none"
          />
          <button
            onClick={handleInsert}
            className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Insert
          </button>
          <button
            onClick={handleExtractRoot}
            className="flex items-center gap-1.5 px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-sm font-medium transition cursor-pointer"
          >
            <Trash2 className="w-4 h-4" /> Extract Root ({isMaxHeap ? 'Max' : 'Min'})
          </button>
        </div>

        <button
          onClick={() => {
            setHeap([]);
            setMessage('Heap cleared.');
          }}
          className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Info Status Banner */}
      <div className="flex items-center gap-3 px-4 py-2.5 bg-indigo-950/40 border border-indigo-800/40 text-indigo-300 rounded-xl text-xs sm:text-sm">
        <Info className="w-4 h-4 text-indigo-400 shrink-0" />
        <span>{message}</span>
      </div>

      {/* Dual Display: Backing Array Representation */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex flex-col gap-2">
        <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
          Backing Array Representation
        </span>
        <div className="flex items-center gap-2 overflow-x-auto py-2">
          {heap.map((val, idx) => {
            const isSwapping = swappingIndices && swappingIndices.includes(idx);
            return (
              <div
                key={idx}
                className={`min-w-14 py-2 px-3 rounded-lg border-2 text-center font-mono font-bold text-sm ${
                  isSwapping
                    ? 'bg-amber-500/30 border-amber-400 text-amber-200 animate-bounce'
                    : idx === 0
                    ? 'bg-indigo-950 border-indigo-500 text-indigo-200'
                    : 'bg-slate-900 border-slate-800 text-slate-300'
                }`}
              >
                <div className="text-[9px] text-slate-500 font-sans">Idx {idx}</div>
                <div>{val}</div>
              </div>
            );
          })}
          {heap.length === 0 && <span className="text-xs text-slate-600 italic">Empty array</span>}
        </div>
      </div>

      {/* Binary Tree Structure SVG */}
      <div className="relative min-h-[260px] bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex items-center justify-center overflow-x-auto">
        <svg className="w-[500px] h-[240px] overflow-visible">
          {heap.map((val, idx) => {
            const level = Math.floor(Math.log2(idx + 1));
            const pos = idx - (Math.pow(2, level) - 1);
            const totalInLevel = Math.pow(2, level);

            const x = 250 + (pos - (totalInLevel - 1) / 2) * (200 / Math.max(1, level));
            const y = 40 + level * 50;

            let px: number | undefined;
            let py: number | undefined;

            if (idx > 0) {
              const pIdx = Math.floor((idx - 1) / 2);
              const pLevel = Math.floor(Math.log2(pIdx + 1));
              const pPos = pIdx - (Math.pow(2, pLevel) - 1);
              const pTotal = Math.pow(2, pLevel);
              px = 250 + (pPos - (pTotal - 1) / 2) * (200 / Math.max(1, pLevel));
              py = 40 + pLevel * 50;
            }

            const isSwapping = swappingIndices && swappingIndices.includes(idx);

            return (
              <g key={`heap-node-${idx}`}>
                {px !== undefined && py !== undefined && (
                  <line x1={px} y1={py} x2={x} y2={y} stroke="#475569" strokeWidth="2" />
                )}
                <circle
                  cx={x}
                  cy={y}
                  r="18"
                  fill={isSwapping ? '#f59e0b' : idx === 0 ? '#312e81' : '#0f172a'}
                  stroke={isSwapping ? '#fbbf24' : idx === 0 ? '#6366f1' : '#334155'}
                  strokeWidth="2"
                />
                <text
                  x={x}
                  y={y + 4}
                  textAnchor="middle"
                  fill="#f8fafc"
                  fontSize="11"
                  fontWeight="bold"
                  fontFamily="monospace"
                >
                  {val}
                </text>
              </g>
            );
          })}
        </svg>

        {heap.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-slate-600 text-sm italic">
            Heap is empty. Insert elements to visualize tree heapification.
          </div>
        )}
      </div>
    </div>
  );
};
