import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, Search, Info, RefreshCw } from 'lucide-react';
import { soundFx } from '../../utils/audio';

interface KeyValuePair {
  key: string;
  value: string;
}

export const HashTableVisualizer: React.FC = () => {
  const bucketCount = 5;
  const [buckets, setBuckets] = useState<KeyValuePair[][]>([
    [{ key: 'Rahul', value: '15' }],
    [{ key: 'Priya', value: '22' }],
    [],
    [{ key: 'Amit', value: '38' }],
    [],
  ]);

  const [keyInput, setKeyInput] = useState<string>('');
  const [valInput, setValInput] = useState<string>('');
  const [activeBucket, setActiveBucket] = useState<number | null>(null);
  const [computedHash, setComputedHash] = useState<number | null>(null);
  const [message, setMessage] = useState<string>('Hash Table: Hash function `hash(key) % 5` maps key to bucket index.');

  const computeSimpleHash = (str: string): number => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash += str.charCodeAt(i);
    }
    return hash % bucketCount;
  };

  const handlePut = () => {
    const key = keyInput.trim();
    const value = valInput.trim() || '100';
    if (!key) {
      setMessage('Key cannot be empty!');
      soundFx.playError();
      return;
    }

    const idx = computeSimpleHash(key);
    setComputedHash(idx);
    setActiveBucket(idx);

    const newBuckets = [...buckets];
    const existingIdx = newBuckets[idx].findIndex((pair) => pair.key === key);

    if (existingIdx !== -1) {
      newBuckets[idx][existingIdx].value = value;
      setMessage(`Updated Key "${key}" with new value "${value}" at Bucket [${idx}].`);
    } else {
      newBuckets[idx].push({ key, value });
      setMessage(`Hashed "${key}" → Bucket [${idx}]. Added ({${key}: ${value}}). Collision handling via Separate Chaining.`);
    }

    setBuckets(newBuckets);
    setKeyInput('');
    setValInput('');
    soundFx.playPush();

    setTimeout(() => {
      setActiveBucket(null);
      setComputedHash(null);
    }, 2500);
  };

  const handleSearch = () => {
    const key = keyInput.trim();
    if (!key) return;

    const idx = computeSimpleHash(key);
    setComputedHash(idx);
    setActiveBucket(idx);

    const bucket = buckets[idx];
    const found = bucket.find((p) => p.key === key);

    if (found) {
      setMessage(`Key "${key}" FOUND in Bucket [${idx}] with Value "${found.value}"!`);
      soundFx.playSuccess();
    } else {
      setMessage(`Key "${key}" NOT found in Bucket [${idx}].`);
      soundFx.playError();
    }

    setTimeout(() => {
      setActiveBucket(null);
      setComputedHash(null);
    }, 2500);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl text-slate-100 flex flex-col gap-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-800/60 p-4 rounded-xl border border-slate-700/50">
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="text"
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            placeholder="Key (e.g. Rahul)"
            className="w-32 px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500"
          />
          <input
            type="text"
            value={valInput}
            onChange={(e) => setValInput(e.target.value)}
            placeholder="Value (e.g. 15)"
            className="w-32 px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none"
          />
          <button
            onClick={handlePut}
            className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Put (Insert/Update)
          </button>
          <button
            onClick={handleSearch}
            className="flex items-center gap-1.5 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-sm font-medium transition cursor-pointer"
          >
            <Search className="w-4 h-4" /> Get (Lookup)
          </button>
        </div>

        <button
          onClick={() => {
            setBuckets([[], [], [], [], []]);
            setMessage('Hash Table cleared.');
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

      {/* Buckets Chaining Display */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-6 flex flex-col gap-3 min-h-[300px]">
        {buckets.map((bucket, bIdx) => {
          const isActive = bIdx === activeBucket;
          return (
            <div
              key={bIdx}
              className={`p-3 rounded-xl border flex items-center gap-4 transition-all ${
                isActive
                  ? 'bg-amber-950/40 border-amber-500 text-amber-200 ring-2 ring-amber-500/40 scale-[1.01]'
                  : 'bg-slate-900 border-slate-800 text-slate-300'
              }`}
            >
              <div className="w-24 px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg font-mono text-xs font-bold text-slate-400 flex flex-col items-center shrink-0">
                <span>BUCKET [{bIdx}]</span>
                <span className="text-[10px] text-slate-500 font-sans">
                  {bucket.length} {bucket.length === 1 ? 'item' : 'items'}
                </span>
              </div>

              {/* Chained Linked List Items */}
              <div className="flex items-center gap-3 overflow-x-auto py-1">
                {bucket.map((pair, pIdx) => (
                  <React.Fragment key={pIdx}>
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="px-3 py-2 bg-indigo-950/80 border border-indigo-500/60 rounded-lg font-mono text-xs font-bold text-indigo-200 flex items-center gap-2 shadow-md shrink-0"
                    >
                      <span className="text-cyan-400">{pair.key}:</span>
                      <span className="text-slate-100">{pair.value}</span>
                    </motion.div>
                    {pIdx < bucket.length - 1 && <span className="text-slate-600 font-bold">➔</span>}
                  </React.Fragment>
                ))}

                {bucket.length === 0 && (
                  <span className="text-xs text-slate-600 italic">Empty Bucket (NULL)</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
