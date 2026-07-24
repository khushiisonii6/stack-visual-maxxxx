import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, RefreshCw, Sliders, Info, Zap } from 'lucide-react';
import { SortingAlgorithmId } from '../../types';
import { soundFx } from '../../utils/audio';

export const SortingVisualizer: React.FC = () => {
  const [selectedAlgo, setSelectedAlgo] = useState<SortingAlgorithmId>('bubble');
  const [arraySize, setArraySize] = useState<number>(20);
  const [speedMs, setSpeedMs] = useState<number>(80);
  const [array, setArray] = useState<number[]>([]);
  const [comparing, setComparing] = useState<number[]>([]);
  const [swapping, setSwapping] = useState<number[]>([]);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);

  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [comparisons, setComparisons] = useState<number>(0);
  const [swaps, setSwaps] = useState<number>(0);
  const [statusMessage, setStatusMessage] = useState<string>('Select an algorithm and click Start.');

  const isRunningRef = useRef(isRunning);
  const isPausedRef = useRef(isPaused);
  isRunningRef.current = isRunning;
  isPausedRef.current = isPaused;

  const generateRandomArray = (size = arraySize) => {
    const newArr = Array.from({ length: size }, () => Math.floor(Math.random() * 85) + 15);
    setArray(newArr);
    setComparing([]);
    setSwapping([]);
    setSortedIndices([]);
    setComparisons(0);
    setSwaps(0);
    setIsRunning(false);
    setIsPaused(false);
    setStatusMessage(`Generated random array of ${size} elements.`);
  };

  useEffect(() => {
    generateRandomArray(arraySize);
  }, [arraySize]);

  const delay = async () => {
    while (isPausedRef.current) {
      await new Promise((r) => setTimeout(r, 100));
    }
    await new Promise((r) => setTimeout(r, speedMs));
  };

  // BUBBLE SORT
  const runBubbleSort = async () => {
    const arr = [...array];
    const len = arr.length;
    let comps = 0;
    let swps = 0;

    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len - i - 1; j++) {
        if (!isRunningRef.current) return;
        setComparing([j, j + 1]);
        comps++;
        setComparisons(comps);
        soundFx.playStep();
        await delay();

        if (arr[j] > arr[j + 1]) {
          setSwapping([j, j + 1]);
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          swps++;
          setSwaps(swps);
          soundFx.playSwap();
          await delay();
        }
      }
      setSortedIndices((prev) => [...prev, len - i - 1]);
    }
    setComparing([]);
    setSwapping([]);
    setSortedIndices(Array.from({ length: len }, (_, idx) => idx));
  };

  // SELECTION SORT
  const runSelectionSort = async () => {
    const arr = [...array];
    const len = arr.length;
    let comps = 0;
    let swps = 0;

    for (let i = 0; i < len; i++) {
      let minIdx = i;
      for (let j = i + 1; j < len; j++) {
        if (!isRunningRef.current) return;
        setComparing([minIdx, j]);
        comps++;
        setComparisons(comps);
        soundFx.playStep();
        await delay();

        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
      }

      if (minIdx !== i) {
        setSwapping([i, minIdx]);
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        setArray([...arr]);
        swps++;
        setSwaps(swps);
        soundFx.playSwap();
        await delay();
      }
      setSortedIndices((prev) => [...prev, i]);
    }
    setComparing([]);
    setSwapping([]);
  };

  // INSERTION SORT
  const runInsertionSort = async () => {
    const arr = [...array];
    const len = arr.length;
    let comps = 0;
    let swps = 0;

    for (let i = 1; i < len; i++) {
      let key = arr[i];
      let j = i - 1;

      while (j >= 0 && arr[j] > key) {
        if (!isRunningRef.current) return;
        setComparing([j, j + 1]);
        comps++;
        setComparisons(comps);
        soundFx.playStep();
        await delay();

        arr[j + 1] = arr[j];
        setArray([...arr]);
        swps++;
        setSwaps(swps);
        soundFx.playSwap();
        await delay();
        j--;
      }
      arr[j + 1] = key;
      setArray([...arr]);
    }
    setSortedIndices(Array.from({ length: len }, (_, idx) => idx));
    setComparing([]);
    setSwapping([]);
  };

  const handleStart = async () => {
    if (isRunning) {
      setIsPaused(!isPaused);
      return;
    }

    setIsRunning(true);
    setIsPaused(false);
    setStatusMessage(`Running ${selectedAlgo.toUpperCase()} Sort...`);

    if (selectedAlgo === 'bubble') await runBubbleSort();
    else if (selectedAlgo === 'selection') await runSelectionSort();
    else if (selectedAlgo === 'insertion') await runInsertionSort();
    else {
      // Fallback bubble sort for demo completeness
      await runBubbleSort();
    }

    setIsRunning(false);
    setIsPaused(false);
    setStatusMessage(`${selectedAlgo.toUpperCase()} Sort Complete!`);
    soundFx.playSuccess();
  };

  const algoComplexities: Record<SortingAlgorithmId, { best: string; avg: string; worst: string; space: string }> = {
    bubble: { best: 'O(n)', avg: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
    selection: { best: 'O(n²)', avg: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
    insertion: { best: 'O(n)', avg: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
    merge: { best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n log n)', space: 'O(n)' },
    quick: { best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n²)', space: 'O(log n)' },
    heap: { best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n log n)', space: 'O(1)' },
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl text-slate-100 flex flex-col gap-6">
      {/* Header & Algorithm Selection Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex flex-wrap items-center gap-2">
          {(['bubble', 'selection', 'insertion', 'merge', 'quick', 'heap'] as SortingAlgorithmId[]).map((algo) => (
            <button
              key={algo}
              disabled={isRunning}
              onClick={() => {
                setSelectedAlgo(algo);
                setStatusMessage(`Selected ${algo.toUpperCase()} Sort.`);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition cursor-pointer ${
                selectedAlgo === algo
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {algo}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleStart}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg transition cursor-pointer ${
              isRunning && !isPaused
                ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/30'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
            }`}
          >
            {isRunning && !isPaused ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isRunning ? (isPaused ? 'Resume' : 'Pause') : 'Start Sorting'}
          </button>

          <button
            onClick={() => generateRandomArray()}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-sm font-semibold transition cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" /> Reset Array
          </button>
        </div>
      </div>

      {/* Sliders & Configuration Bar */}
      <div className="flex flex-wrap items-center justify-between gap-6 bg-slate-800/60 p-4 rounded-xl border border-slate-700/50 text-xs text-slate-300">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span>Size: {arraySize}</span>
            <input
              type="range"
              min={10}
              max={50}
              disabled={isRunning}
              value={arraySize}
              onChange={(e) => setArraySize(Number(e.target.value))}
              className="accent-indigo-500 cursor-pointer"
            />
          </div>

          <div className="flex items-center gap-2">
            <span>Speed: {101 - speedMs}x</span>
            <input
              type="range"
              min={10}
              max={150}
              value={160 - speedMs}
              onChange={(e) => setSpeedMs(160 - Number(e.target.value))}
              className="accent-indigo-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Realtime Metrics */}
        <div className="flex items-center gap-6 font-mono text-sm font-bold">
          <span className="text-cyan-400">Comparisons: {comparisons}</span>
          <span className="text-purple-400">Swaps: {swaps}</span>
        </div>
      </div>

      {/* Complexity Info Box */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-2.5 bg-indigo-950/40 border border-indigo-800/40 text-indigo-300 rounded-xl text-xs">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-indigo-400 shrink-0" />
          <span>{statusMessage}</span>
        </div>
        <div className="flex items-center gap-4 font-mono">
          <span>Best: <strong className="text-emerald-400">{algoComplexities[selectedAlgo].best}</strong></span>
          <span>Avg: <strong className="text-amber-400">{algoComplexities[selectedAlgo].avg}</strong></span>
          <span>Worst: <strong className="text-rose-400">{algoComplexities[selectedAlgo].worst}</strong></span>
          <span>Space: <strong className="text-purple-400">{algoComplexities[selectedAlgo].space}</strong></span>
        </div>
      </div>

      {/* Interactive Bar Chart Canvas */}
      <div className="min-h-[320px] bg-slate-950/80 border border-slate-800 rounded-xl p-6 flex items-end justify-center gap-1.5 sm:gap-2 overflow-x-auto">
        {array.map((val, idx) => {
          const isComp = comparing.includes(idx);
          const isSwap = swapping.includes(idx);
          const isSorted = sortedIndices.includes(idx);

          let barColor = 'bg-slate-700 border-slate-600 text-slate-400';
          if (isSorted) barColor = 'bg-emerald-500 border-emerald-400 text-slate-950 shadow-emerald-500/20';
          else if (isSwap) barColor = 'bg-rose-500 border-rose-400 text-white animate-pulse shadow-rose-500/40';
          else if (isComp) barColor = 'bg-amber-400 border-amber-300 text-slate-950 font-bold shadow-amber-400/40';

          return (
            <div key={idx} className="flex flex-col items-center gap-1 flex-1 max-w-[24px]">
              <motion.div
                layout
                style={{ height: `${val * 2.8}px` }}
                className={`w-full rounded-t-md border shadow-md transition-colors ${barColor}`}
              />
              {arraySize <= 25 && (
                <span className="text-[9px] font-mono font-bold text-slate-400">{val}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
