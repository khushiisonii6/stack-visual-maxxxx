import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Play, RefreshCw, Info } from 'lucide-react';
import { soundFx } from '../../utils/audio';

export const SearchVisualizer: React.FC = () => {
  const [searchAlgo, setSearchAlgo] = useState<'linear' | 'binary'>('linear');
  const [array, setArray] = useState<number[]>([12, 18, 25, 33, 42, 55, 68, 74, 89, 95]);
  const [target, setTarget] = useState<string>('55');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [lowPtr, setLowPtr] = useState<number | null>(null);
  const [highPtr, setHighPtr] = useState<number | null>(null);
  const [foundIndex, setFoundIndex] = useState<number | null>(null);
  const [message, setMessage] = useState<string>('Linear Search: Searches element by element. Binary Search: Requires sorted array.');

  const generateNewArray = () => {
    const arr = Array.from({ length: 10 }, () => Math.floor(Math.random() * 85) + 10);
    if (searchAlgo === 'binary') arr.sort((a, b) => a - b);
    setArray(arr);
    setActiveIndex(null);
    setLowPtr(null);
    setHighPtr(null);
    setFoundIndex(null);
    setMessage('Generated new array.');
  };

  const handleRunSearch = async () => {
    const targetVal = parseInt(target, 10);
    if (isNaN(targetVal)) {
      setMessage('Please enter a valid target integer.');
      soundFx.playError();
      return;
    }

    setFoundIndex(null);

    if (searchAlgo === 'linear') {
      setMessage(`Running Linear Search for Target = ${targetVal}...`);
      for (let i = 0; i < array.length; i++) {
        setActiveIndex(i);
        soundFx.playStep(1 + i * 0.1);
        await new Promise((res) => setTimeout(res, 600));

        if (array[i] === targetVal) {
          setFoundIndex(i);
          setActiveIndex(null);
          setMessage(`Target ${targetVal} FOUND at Index ${i}!`);
          soundFx.playSuccess();
          return;
        }
      }
      setActiveIndex(null);
      setMessage(`Target ${targetVal} NOT found in array.`);
      soundFx.playError();
    } else {
      // BINARY SEARCH
      const sortedArr = [...array].sort((a, b) => a - b);
      setArray(sortedArr);
      setMessage(`Running Binary Search for Target = ${targetVal}...`);

      let low = 0;
      let high = sortedArr.length - 1;

      while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        setLowPtr(low);
        setHighPtr(high);
        setActiveIndex(mid);

        soundFx.playStep();
        await new Promise((res) => setTimeout(res, 800));

        if (sortedArr[mid] === targetVal) {
          setFoundIndex(mid);
          setActiveIndex(null);
          setLowPtr(null);
          setHighPtr(null);
          setMessage(`Target ${targetVal} FOUND at Index ${mid}!`);
          soundFx.playSuccess();
          return;
        } else if (sortedArr[mid] < targetVal) {
          low = mid + 1;
        } else {
          high = mid - 1;
        }
      }

      setActiveIndex(null);
      setLowPtr(null);
      setHighPtr(null);
      setMessage(`Target ${targetVal} NOT found in array.`);
      soundFx.playError();
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl text-slate-100 flex flex-col gap-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-800/60 p-4 rounded-xl border border-slate-700/50">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setSearchAlgo('linear');
              setMessage('Selected Linear Search O(n).');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              searchAlgo === 'linear' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
            }`}
          >
            Linear Search
          </button>
          <button
            onClick={() => {
              setSearchAlgo('binary');
              setArray([...array].sort((a, b) => a - b));
              setMessage('Selected Binary Search O(log n). Array sorted.');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              searchAlgo === 'binary' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
            }`}
          >
            Binary Search
          </button>

          <input
            type="number"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            placeholder="Target"
            className="w-28 px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none"
          />
          <button
            onClick={handleRunSearch}
            className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition cursor-pointer"
          >
            <Play className="w-4 h-4" /> Start Search
          </button>
        </div>

        <button
          onClick={generateNewArray}
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

      {/* Visual Array Blocks */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-8 min-h-[240px] flex items-center justify-center gap-3 overflow-x-auto">
        {array.map((val, idx) => {
          const isMid = idx === activeIndex;
          const isLow = idx === lowPtr;
          const isHigh = idx === highPtr;
          const isFound = idx === foundIndex;

          return (
            <motion.div
              key={idx}
              layout
              className={`relative min-w-16 h-20 rounded-xl border-2 font-mono flex flex-col items-center justify-center shadow-lg transition-all ${
                isFound
                  ? 'bg-emerald-950 border-emerald-400 text-emerald-200 ring-4 ring-emerald-500/50 scale-110'
                  : isMid
                  ? 'bg-amber-950 border-amber-400 text-amber-200 ring-2 ring-amber-400/50 scale-105'
                  : 'bg-slate-900 border-slate-800 text-slate-200'
              }`}
            >
              <span className="text-[10px] text-slate-500">Idx {idx}</span>
              <span className="text-lg font-bold">{val}</span>

              {/* Binary Search Pointers */}
              {searchAlgo === 'binary' && (
                <div className="absolute -bottom-6 flex items-center gap-1 text-[9px] font-bold uppercase font-sans">
                  {isLow && <span className="text-cyan-400">LOW</span>}
                  {isMid && <span className="text-amber-400">MID</span>}
                  {isHigh && <span className="text-purple-400">HIGH</span>}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
