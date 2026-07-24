import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, Eye, Info, RefreshCw, Volume2, VolumeX } from 'lucide-react';
import { soundFx } from '../../utils/audio';

export const StackVisualizer: React.FC = () => {
  const [items, setItems] = useState<number[]>([15, 22, 37]);
  const [inputValue, setInputValue] = useState<string>('');
  const [maxSize, setMaxSize] = useState<number>(8);
  const [message, setMessage] = useState<string>('Stack initialized with default values.');
  const [peekedIndex, setPeekedIndex] = useState<number | null>(null);

  const handlePush = () => {
    if (items.length >= maxSize) {
      setMessage(`Stack Overflow! Maximum size is ${maxSize}.`);
      soundFx.playError();
      return;
    }
    const val = inputValue.trim() !== '' ? parseInt(inputValue, 10) : Math.floor(Math.random() * 90) + 10;
    if (isNaN(val)) {
      setMessage('Please enter a valid integer.');
      soundFx.playError();
      return;
    }
    setItems((prev) => [...prev, val]);
    setMessage(`Pushed value ${val} onto top of Stack.`);
    setInputValue('');
    setPeekedIndex(null);
    soundFx.playPush();
  };

  const handlePop = () => {
    if (items.length === 0) {
      setMessage('Stack Underflow! Cannot pop from an empty stack.');
      soundFx.playError();
      return;
    }
    const poppedVal = items[items.length - 1];
    setItems((prev) => prev.slice(0, prev.length - 1));
    setMessage(`Popped value ${poppedVal} from top of Stack.`);
    setPeekedIndex(null);
    soundFx.playPop();
  };

  const handlePeek = () => {
    if (items.length === 0) {
      setMessage('Stack is empty! Nothing to peek.');
      soundFx.playError();
      return;
    }
    const topIdx = items.length - 1;
    setPeekedIndex(topIdx);
    setMessage(`Peek: Top element is ${items[topIdx]} at index ${topIdx}.`);
    soundFx.playStep(1.5);
    setTimeout(() => setPeekedIndex(null), 2500);
  };

  const handleClear = () => {
    setItems([]);
    setMessage('Stack cleared.');
    setPeekedIndex(null);
    soundFx.playPop();
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl text-slate-100 flex flex-col gap-6">
      {/* Visualizer Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-800/60 p-4 rounded-xl border border-slate-700/50">
        <div className="flex items-center gap-3">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Value (e.g. 15)"
            className="w-32 px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500"
            onKeyDown={(e) => e.key === 'Enter' && handlePush()}
          />
          <button
            onClick={handlePush}
            className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition cursor-pointer shadow-md shadow-indigo-600/20"
          >
            <Plus className="w-4 h-4" /> Push
          </button>
          <button
            onClick={handlePop}
            className="flex items-center gap-1.5 px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-sm font-medium transition cursor-pointer shadow-md shadow-rose-600/20"
          >
            <Trash2 className="w-4 h-4" /> Pop
          </button>
          <button
            onClick={handlePeek}
            className="flex items-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-sm font-medium transition cursor-pointer shadow-md shadow-amber-600/20"
          >
            <Eye className="w-4 h-4" /> Peek
          </button>
        </div>

        <div className="flex items-center gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <span>Max Capacity:</span>
            <select
              value={maxSize}
              onChange={(e) => setMaxSize(Number(e.target.value))}
              className="px-2 py-1 bg-slate-950 border border-slate-700 rounded text-xs focus:outline-none"
            >
              <option value={5}>5</option>
              <option value={8}>8</option>
              <option value={10}>10</option>
            </select>
          </div>
          <button
            onClick={handleClear}
            className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition"
            title="Reset Stack"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Info Status Banner */}
      <div className="flex items-center gap-3 px-4 py-2.5 bg-indigo-950/40 border border-indigo-800/40 text-indigo-300 rounded-xl text-xs sm:text-sm">
        <Info className="w-4 h-4 text-indigo-400 shrink-0" />
        <span>{message}</span>
        <span className="ml-auto font-mono text-slate-400">
          Size: {items.length} / {maxSize} | isEmpty: {items.length === 0 ? 'true' : 'false'}
        </span>
      </div>

      {/* Interactive Stack Visualization Canvas */}
      <div className="relative min-h-[360px] bg-slate-950/80 border border-slate-800 rounded-xl p-8 flex flex-col justify-end items-center overflow-hidden">
        {/* Visual Container Boundaries (U-Shape Stack Bucket) */}
        <div className="relative w-64 max-w-full border-x-4 border-b-4 border-slate-700 rounded-b-2xl p-3 flex flex-col-reverse items-center gap-2 min-h-[280px]">
          {/* Base platform */}
          <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500" />

          {/* Top Pointer Indicator */}
          {items.length > 0 && (
            <div className="absolute -top-7 right-0 flex items-center gap-1.5 text-xs font-semibold text-indigo-400 animate-pulse">
              <span>TOP ({items.length - 1})</span>
              <span className="text-lg">↓</span>
            </div>
          )}

          <AnimatePresence>
            {items.map((val, idx) => {
              const isTop = idx === items.length - 1;
              const isPeeked = idx === peekedIndex;

              return (
                <motion.div
                  key={`${idx}-${val}`}
                  initial={{ y: -60, opacity: 0, scale: 0.9 }}
                  animate={{
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    borderColor: isPeeked
                      ? '#f59e0b'
                      : isTop
                      ? '#6366f1'
                      : '#334155',
                  }}
                  exit={{ y: -80, opacity: 0, scale: 0.8 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  className={`w-full py-3 rounded-lg border-2 text-center font-mono text-lg font-bold shadow-lg transition-colors flex items-center justify-between px-4 ${
                    isPeeked
                      ? 'bg-amber-500/20 text-amber-300 border-amber-400 ring-2 ring-amber-400/50'
                      : isTop
                      ? 'bg-indigo-600/30 text-indigo-200 border-indigo-500 shadow-indigo-500/20'
                      : 'bg-slate-800/80 text-slate-300 border-slate-700'
                  }`}
                >
                  <span className="text-xs font-normal text-slate-400 font-sans">
                    [{idx}]
                  </span>
                  <span>{val}</span>
                  {isTop && (
                    <span className="text-[10px] uppercase font-sans tracking-wider px-2 py-0.5 rounded bg-indigo-500/30 text-indigo-300 border border-indigo-400/30">
                      TOP
                    </span>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>

          {items.length === 0 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-600 text-sm italic">
              Stack is currently empty
              <span className="text-xs text-slate-700 mt-1">Enter a value and click Push</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
