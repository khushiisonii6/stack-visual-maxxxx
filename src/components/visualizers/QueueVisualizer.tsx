import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, Eye, Info, RefreshCw } from 'lucide-react';
import { soundFx } from '../../utils/audio';

export const QueueVisualizer: React.FC = () => {
  const [items, setItems] = useState<number[]>([10, 20, 30]);
  const [inputValue, setInputValue] = useState<string>('');
  const [maxSize, setMaxSize] = useState<number>(8);
  const [message, setMessage] = useState<string>('Queue initialized with Front = 10 and Rear = 30.');
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  const handleEnqueue = () => {
    if (items.length >= maxSize) {
      setMessage(`Queue Overflow! Maximum capacity is ${maxSize}.`);
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
    setMessage(`Enqueued value ${val} at Rear (Index ${items.length}).`);
    setInputValue('');
    soundFx.playPush();
  };

  const handleDequeue = () => {
    if (items.length === 0) {
      setMessage('Queue Underflow! Cannot dequeue from an empty queue.');
      soundFx.playError();
      return;
    }
    const frontVal = items[0];
    setItems((prev) => prev.slice(1));
    setMessage(`Dequeued value ${frontVal} from Front.`);
    soundFx.playPop();
  };

  const handleFront = () => {
    if (items.length === 0) {
      setMessage('Queue is empty! No Front element.');
      soundFx.playError();
      return;
    }
    setHighlightedIndex(0);
    setMessage(`Front element is ${items[0]} at Index 0.`);
    soundFx.playStep(1.4);
    setTimeout(() => setHighlightedIndex(null), 2500);
  };

  const handleRear = () => {
    if (items.length === 0) {
      setMessage('Queue is empty! No Rear element.');
      soundFx.playError();
      return;
    }
    const rearIdx = items.length - 1;
    setHighlightedIndex(rearIdx);
    setMessage(`Rear element is ${items[rearIdx]} at Index ${rearIdx}.`);
    soundFx.playStep(1.6);
    setTimeout(() => setHighlightedIndex(null), 2500);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl text-slate-100 flex flex-col gap-6">
      {/* Visualizer Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-800/60 p-4 rounded-xl border border-slate-700/50">
        <div className="flex items-center gap-3">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Value (e.g. 40)"
            className="w-32 px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500"
            onKeyDown={(e) => e.key === 'Enter' && handleEnqueue()}
          />
          <button
            onClick={handleEnqueue}
            className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition cursor-pointer shadow-md shadow-indigo-600/20"
          >
            <Plus className="w-4 h-4" /> Enqueue
          </button>
          <button
            onClick={handleDequeue}
            className="flex items-center gap-1.5 px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-sm font-medium transition cursor-pointer shadow-md shadow-rose-600/20"
          >
            <Trash2 className="w-4 h-4" /> Dequeue
          </button>
          <button
            onClick={handleFront}
            className="flex items-center gap-1.5 px-3 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-sm font-medium transition cursor-pointer"
          >
            <Eye className="w-4 h-4" /> Front
          </button>
          <button
            onClick={handleRear}
            className="flex items-center gap-1.5 px-3 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-sm font-medium transition cursor-pointer"
          >
            <Eye className="w-4 h-4" /> Rear
          </button>
        </div>

        <div className="flex items-center gap-4 text-xs text-slate-300">
          <button
            onClick={() => {
              setItems([]);
              setMessage('Queue cleared.');
            }}
            className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition"
            title="Reset Queue"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Info Banner */}
      <div className="flex items-center gap-3 px-4 py-2.5 bg-indigo-950/40 border border-indigo-800/40 text-indigo-300 rounded-xl text-xs sm:text-sm">
        <Info className="w-4 h-4 text-indigo-400 shrink-0" />
        <span>{message}</span>
        <span className="ml-auto font-mono text-slate-400">
          Size: {items.length} / {maxSize} | FIFO Order
        </span>
      </div>

      {/* Horizontal Queue Pipe Canvas */}
      <div className="relative min-h-[260px] bg-slate-950/80 border border-slate-800 rounded-xl p-8 flex flex-col justify-center items-center overflow-x-auto">
        <div className="flex items-center gap-4 p-4 border-y-4 border-slate-700 rounded-2xl min-w-[500px] justify-start bg-slate-900/60 relative">
          <span className="absolute left-2 -top-6 text-xs text-cyan-400 font-semibold uppercase">← Front (Exit)</span>
          <span className="absolute right-2 -top-6 text-xs text-purple-400 font-semibold uppercase">Rear (Entry) →</span>

          <AnimatePresence>
            {items.map((val, idx) => {
              const isFront = idx === 0;
              const isRear = idx === items.length - 1;
              const isHighlighted = idx === highlightedIndex;

              return (
                <motion.div
                  key={`${idx}-${val}`}
                  initial={{ x: 80, opacity: 0, scale: 0.8 }}
                  animate={{
                    x: 0,
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{ x: -100, opacity: 0, scale: 0.5 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className={`relative min-w-20 py-4 px-3 rounded-xl border-2 text-center font-mono text-lg font-bold shadow-lg flex flex-col items-center justify-center ${
                    isHighlighted
                      ? 'bg-amber-500/30 text-amber-200 border-amber-400 ring-2 ring-amber-400/50'
                      : isFront
                      ? 'bg-cyan-950/80 text-cyan-300 border-cyan-500 shadow-cyan-500/20'
                      : isRear
                      ? 'bg-purple-950/80 text-purple-300 border-purple-500 shadow-purple-500/20'
                      : 'bg-slate-800 text-slate-200 border-slate-700'
                  }`}
                >
                  <span className="text-[10px] text-slate-400 font-sans mb-1">Index {idx}</span>
                  <span>{val}</span>

                  {/* Pointers */}
                  <div className="absolute -bottom-7 flex items-center gap-1 text-[10px] font-sans uppercase tracking-wider font-semibold">
                    {isFront && <span className="text-cyan-400">Front</span>}
                    {isFront && isRear && <span className="text-slate-500">|</span>}
                    {isRear && <span className="text-purple-400">Rear</span>}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {items.length === 0 && (
            <div className="w-full text-center py-8 text-slate-600 text-sm italic">
              Queue is currently empty. Enqueue elements to visualize FIFO structure.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
