import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Trash2, Info, RefreshCw } from 'lucide-react';
import { soundFx } from '../../utils/audio';

export const CircularQueueVisualizer: React.FC = () => {
  const capacity = 6;
  const [buffer, setBuffer] = useState<(number | null)[]>([10, 20, 30, null, null, null]);
  const [head, setHead] = useState<number>(0);
  const [tail, setTail] = useState<number>(2);
  const [inputValue, setInputValue] = useState<string>('');
  const [message, setMessage] = useState<string>('Circular Queue initialized (Capacity: 6). Head = 0, Tail = 2.');

  const isFull = (head: number, tail: number, buffer: (number | null)[]) => {
    return (tail + 1) % capacity === head && buffer[head] !== null;
  };

  const isEmpty = (buffer: (number | null)[]) => {
    return buffer.every((val) => val === null);
  };

  const handleEnqueue = () => {
    if (buffer.filter((x) => x !== null).length === capacity) {
      setMessage(`Circular Queue Overflow! All ${capacity} slots are full.`);
      soundFx.playError();
      return;
    }

    const val = inputValue.trim() !== '' ? parseInt(inputValue, 10) : Math.floor(Math.random() * 90) + 10;
    if (isNaN(val)) {
      setMessage('Please enter a valid integer.');
      soundFx.playError();
      return;
    }

    let nextHead = head;
    let nextTail = tail;

    if (isEmpty(buffer)) {
      nextHead = 0;
      nextTail = 0;
    } else {
      nextTail = (tail + 1) % capacity;
    }

    const newBuffer = [...buffer];
    newBuffer[nextTail] = val;

    setBuffer(newBuffer);
    setHead(nextHead);
    setTail(nextTail);
    setMessage(`Enqueued ${val} at index ${nextTail} using (tail + 1) % ${capacity} = ${nextTail}.`);
    setInputValue('');
    soundFx.playPush();
  };

  const handleDequeue = () => {
    if (isEmpty(buffer)) {
      setMessage('Circular Queue Underflow! Buffer is completely empty.');
      soundFx.playError();
      return;
    }

    const dequeuedVal = buffer[head];
    const newBuffer = [...buffer];
    newBuffer[head] = null;

    let nextHead = head;
    let nextTail = tail;

    if (head === tail) {
      // Last item removed
      nextHead = 0;
      nextTail = 0;
    } else {
      nextHead = (head + 1) % capacity;
    }

    setBuffer(newBuffer);
    setHead(nextHead);
    setTail(nextTail);
    setMessage(`Dequeued value ${dequeuedVal} from index ${head}. Head advanced to ${nextHead}.`);
    soundFx.playPop();
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl text-slate-100 flex flex-col gap-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-800/60 p-4 rounded-xl border border-slate-700/50">
        <div className="flex items-center gap-3">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Value (e.g. 45)"
            className="w-32 px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500"
            onKeyDown={(e) => e.key === 'Enter' && handleEnqueue()}
          />
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
            <Trash2 className="w-4 h-4" /> Dequeue
          </button>
        </div>

        <button
          onClick={() => {
            setBuffer([null, null, null, null, null, null]);
            setHead(0);
            setTail(0);
            setMessage('Circular Queue reset.');
          }}
          className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition"
          title="Reset"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Info Status Banner */}
      <div className="flex items-center gap-3 px-4 py-2.5 bg-indigo-950/40 border border-indigo-800/40 text-indigo-300 rounded-xl text-xs sm:text-sm">
        <Info className="w-4 h-4 text-indigo-400 shrink-0" />
        <span>{message}</span>
      </div>

      {/* Ring Buffer Layout */}
      <div className="relative min-h-[320px] bg-slate-950/80 border border-slate-800 rounded-xl p-8 flex flex-col items-center justify-center">
        <div className="relative w-64 h-64 border-4 border-slate-800 rounded-full flex items-center justify-center">
          {buffer.map((val, idx) => {
            const angle = (idx * (360 / capacity) - 90) * (Math.PI / 180);
            const radius = 100; // px
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            const isHead = idx === head && val !== null;
            const isTail = idx === tail && val !== null;

            return (
              <motion.div
                key={idx}
                style={{
                  position: 'absolute',
                  transform: `translate(${x}px, ${y}px)`,
                }}
                className={`w-14 h-14 rounded-full border-2 flex flex-col items-center justify-center font-mono shadow-md ${
                  val !== null
                    ? 'bg-indigo-950/90 border-indigo-500 text-indigo-200'
                    : 'bg-slate-900 border-slate-700 text-slate-600 border-dashed'
                }`}
              >
                <span className="text-[10px] text-slate-400 font-sans">{idx}</span>
                <span className="font-bold text-sm">{val !== null ? val : '-'}</span>

                {isHead && (
                  <span className="absolute -top-5 text-[10px] font-bold text-cyan-400 uppercase bg-cyan-950 px-1 rounded border border-cyan-500/50">
                    HEAD
                  </span>
                )}
                {isTail && (
                  <span className="absolute -bottom-5 text-[10px] font-bold text-purple-400 uppercase bg-purple-950 px-1 rounded border border-purple-500/50">
                    TAIL
                  </span>
                )}
              </motion.div>
            );
          })}

          <div className="text-center font-mono text-xs text-slate-400">
            <div className="font-bold text-slate-200 text-sm">RING BUFFER</div>
            <div>Cap: {capacity}</div>
            <div className="mt-1 text-[11px] text-indigo-400 font-semibold">
              tail = (tail + 1) % {capacity}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
