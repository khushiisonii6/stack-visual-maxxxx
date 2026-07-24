import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, Info, RefreshCw } from 'lucide-react';
import { soundFx } from '../../utils/audio';

interface PQItem {
  id: string;
  value: string;
  priority: number;
}

export const PriorityQueueVisualizer: React.FC = () => {
  const [items, setItems] = useState<PQItem[]>([
    { id: '1', value: 'Task A (Normal)', priority: 3 },
    { id: '2', value: 'Task B (Urgent)', priority: 1 },
    { id: '3', value: 'Task C (Medium)', priority: 2 },
  ].sort((a, b) => a.priority - b.priority));

  const [valInput, setValInput] = useState<string>('');
  const [prioInput, setPrioInput] = useState<string>('1');
  const [message, setMessage] = useState<string>('Min-Priority Queue: Lower numerical priority value = higher processing priority.');

  const handleEnqueue = () => {
    const val = valInput.trim() || `Task ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`;
    const prio = parseInt(prioInput, 10);
    if (isNaN(prio) || prio < 1) {
      setMessage('Priority must be a positive integer.');
      soundFx.playError();
      return;
    }

    const newItem: PQItem = {
      id: Date.now().toString(),
      value: val,
      priority: prio,
    };

    const updated = [...items, newItem].sort((a, b) => a.priority - b.priority);
    setItems(updated);
    setMessage(`Enqueued "${val}" with priority ${prio}. Automatically sorted into position.`);
    setValInput('');
    soundFx.playPush();
  };

  const handleDequeue = () => {
    if (items.length === 0) {
      setMessage('Priority Queue is empty! Cannot dequeue.');
      soundFx.playError();
      return;
    }

    const highestPrioItem = items[0];
    setItems((prev) => prev.slice(1));
    setMessage(`Dequeued highest priority item "${highestPrioItem.value}" (Priority ${highestPrioItem.priority}).`);
    soundFx.playPop();
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl text-slate-100 flex flex-col gap-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-800/60 p-4 rounded-xl border border-slate-700/50">
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="text"
            value={valInput}
            onChange={(e) => setValInput(e.target.value)}
            placeholder="Task Name (e.g. Emergency ER)"
            className="w-48 px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500"
          />
          <div className="flex items-center gap-1.5 text-xs text-slate-300">
            <span>Priority:</span>
            <input
              type="number"
              min={1}
              max={10}
              value={prioInput}
              onChange={(e) => setPrioInput(e.target.value)}
              className="w-16 px-2 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none"
            />
          </div>
          <button
            onClick={handleEnqueue}
            className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Enqueue
          </button>
          <button
            onClick={handleDequeue}
            className="flex items-center gap-1.5 px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-sm font-medium transition cursor-pointer"
          >
            <Trash2 className="w-4 h-4" /> Dequeue Highest Priority
          </button>
        </div>

        <button
          onClick={() => {
            setItems([]);
            setMessage('Priority Queue cleared.');
          }}
          className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Info Banner */}
      <div className="flex items-center gap-3 px-4 py-2.5 bg-indigo-950/40 border border-indigo-800/40 text-indigo-300 rounded-xl text-xs sm:text-sm">
        <Info className="w-4 h-4 text-indigo-400 shrink-0" />
        <span>{message}</span>
      </div>

      {/* Priority Cards List */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-6 min-h-[260px] flex flex-col gap-3">
        <AnimatePresence>
          {items.map((item, idx) => {
            const isHighest = idx === 0;
            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className={`p-4 rounded-xl border flex items-center justify-between shadow-md ${
                  isHighest
                    ? 'bg-amber-950/50 border-amber-500/60 text-amber-200 ring-1 ring-amber-500/40'
                    : 'bg-slate-900 border-slate-800 text-slate-200'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-mono ${
                      isHighest
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}
                  >
                    P{item.priority}
                  </span>
                  <span className="font-semibold text-sm">{item.value}</span>
                </div>

                <div className="flex items-center gap-3">
                  {isHighest && (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      NEXT IN LINE
                    </span>
                  )}
                  <span className="text-xs text-slate-500 font-mono">Pos #{idx + 1}</span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {items.length === 0 && (
          <div className="text-center py-12 text-slate-600 text-sm italic">
            Priority Queue is empty. Enqueue tasks with priorities to view reordering.
          </div>
        )}
      </div>
    </div>
  );
};
