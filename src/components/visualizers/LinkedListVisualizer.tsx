import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, Search, RotateCcw, Info, RefreshCw } from 'lucide-react';
import { soundFx } from '../../utils/audio';

type ListType = 'singly' | 'doubly' | 'circular';

interface LLNode {
  id: string;
  val: number;
}

export const LinkedListVisualizer: React.FC = () => {
  const [listType, setListType] = useState<ListType>('singly');
  const [nodes, setNodes] = useState<LLNode[]>([
    { id: '1', val: 10 },
    { id: '2', val: 20 },
    { id: '3', val: 30 },
  ]);
  const [inputValue, setInputValue] = useState<string>('');
  const [searchTarget, setSearchTarget] = useState<string>('');
  const [searchingIndex, setSearchingIndex] = useState<number | null>(null);
  const [foundIndex, setFoundIndex] = useState<number | null>(null);
  const [message, setMessage] = useState<string>('Singly Linked List initialized: 10 -> 20 -> 30 -> NULL');

  const handleInsertHead = () => {
    const val = inputValue.trim() !== '' ? parseInt(inputValue, 10) : Math.floor(Math.random() * 90) + 10;
    if (isNaN(val)) return;
    const newNode: LLNode = { id: Date.now().toString(), val };
    setNodes((prev) => [newNode, ...prev]);
    setMessage(`Inserted ${val} at Head (Index 0).`);
    setInputValue('');
    soundFx.playPush();
  };

  const handleInsertTail = () => {
    const val = inputValue.trim() !== '' ? parseInt(inputValue, 10) : Math.floor(Math.random() * 90) + 10;
    if (isNaN(val)) return;
    const newNode: LLNode = { id: Date.now().toString(), val };
    setNodes((prev) => [...prev, newNode]);
    setMessage(`Inserted ${val} at Tail.`);
    setInputValue('');
    soundFx.playPush();
  };

  const handleDelete = () => {
    if (nodes.length === 0) {
      setMessage('List is empty!');
      soundFx.playError();
      return;
    }
    const val = inputValue.trim() !== '' ? parseInt(inputValue, 10) : nodes[0].val;
    const idx = nodes.findIndex((n) => n.val === val);

    if (idx === -1) {
      setMessage(`Value ${val} not found in linked list.`);
      soundFx.playError();
      return;
    }

    setNodes((prev) => prev.filter((_, i) => i !== idx));
    setMessage(`Deleted node with value ${val} from index ${idx}.`);
    soundFx.playPop();
  };

  const handleSearch = async () => {
    const target = parseInt(searchTarget, 10);
    if (isNaN(target)) {
      setMessage('Please enter a valid search target integer.');
      soundFx.playError();
      return;
    }

    setMessage(`Searching for target ${target} node-by-node...`);
    setFoundIndex(null);

    for (let i = 0; i < nodes.length; i++) {
      setSearchingIndex(i);
      soundFx.playStep(1 + i * 0.1);
      await new Promise((res) => setTimeout(res, 600));

      if (nodes[i].val === target) {
        setSearchingIndex(null);
        setFoundIndex(i);
        setMessage(`Target ${target} FOUND at Node Index ${i}!`);
        soundFx.playSuccess();
        setTimeout(() => setFoundIndex(null), 3000);
        return;
      }
    }

    setSearchingIndex(null);
    setMessage(`Target ${target} NOT found in linked list.`);
    soundFx.playError();
  };

  const handleReverse = () => {
    if (nodes.length < 2) {
      setMessage('List needs at least 2 nodes to reverse.');
      return;
    }
    setNodes((prev) => [...prev].reverse());
    setMessage('Reversed the Linked List order.');
    soundFx.playSwap();
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl text-slate-100 flex flex-col gap-6">
      {/* List Variant Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => {
            setListType('singly');
            setMessage('Singly Linked List: Nodes with Next pointer only.');
          }}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
            listType === 'singly'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          Singly Linked List
        </button>
        <button
          onClick={() => {
            setListType('doubly');
            setMessage('Doubly Linked List: Nodes with Prev & Next pointers.');
          }}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
            listType === 'doubly'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          Doubly Linked List
        </button>
        <button
          onClick={() => {
            setListType('circular');
            setMessage('Circular Linked List: Tail.next points back to Head.');
          }}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
            listType === 'circular'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          Circular Linked List
        </button>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-800/60 p-4 rounded-xl border border-slate-700/50">
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Val (e.g. 15)"
            className="w-28 px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500"
          />
          <button
            onClick={handleInsertHead}
            className="flex items-center gap-1.5 px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Head
          </button>
          <button
            onClick={handleInsertTail}
            className="flex items-center gap-1.5 px-3 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-sm font-medium transition cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Tail
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center gap-1.5 px-3 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-sm font-medium transition cursor-pointer"
          >
            <Trash2 className="w-4 h-4" /> Delete
          </button>
          <button
            onClick={handleReverse}
            className="flex items-center gap-1.5 px-3 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-sm font-medium transition cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" /> Reverse
          </button>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={searchTarget}
            onChange={(e) => setSearchTarget(e.target.value)}
            placeholder="Search Target"
            className="w-32 px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none"
          />
          <button
            onClick={handleSearch}
            className="flex items-center gap-1.5 px-3 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-sm font-medium transition cursor-pointer"
          >
            <Search className="w-4 h-4" /> Search
          </button>
          <button
            onClick={() => {
              setNodes([]);
              setMessage('List cleared.');
            }}
            className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Info Status Banner */}
      <div className="flex items-center gap-3 px-4 py-2.5 bg-indigo-950/40 border border-indigo-800/40 text-indigo-300 rounded-xl text-xs sm:text-sm">
        <Info className="w-4 h-4 text-indigo-400 shrink-0" />
        <span>{message}</span>
        <span className="ml-auto font-mono text-slate-400">Node Count: {nodes.length}</span>
      </div>

      {/* Node Pointer Canvas */}
      <div className="relative min-h-[280px] bg-slate-950/80 border border-slate-800 rounded-xl p-8 flex items-center overflow-x-auto justify-start">
        <div className="flex items-center gap-3 py-6 px-4 min-w-full">
          <AnimatePresence>
            {nodes.map((node, idx) => {
              const isHead = idx === 0;
              const isTail = idx === nodes.length - 1;
              const isSearching = idx === searchingIndex;
              const isFound = idx === foundIndex;

              return (
                <React.Fragment key={node.id}>
                  {/* Node Box */}
                  <motion.div
                    layout
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    className={`relative min-w-28 h-20 rounded-xl border-2 flex items-center justify-between p-3 font-mono shadow-xl ${
                      isFound
                        ? 'bg-emerald-950 border-emerald-400 text-emerald-200 ring-4 ring-emerald-500/40'
                        : isSearching
                        ? 'bg-amber-950 border-amber-400 text-amber-200 ring-2 ring-amber-400/50 scale-105'
                        : isHead
                        ? 'bg-indigo-950 border-indigo-500 text-indigo-100'
                        : isTail
                        ? 'bg-purple-950 border-purple-500 text-purple-100'
                        : 'bg-slate-900 border-slate-700 text-slate-200'
                    }`}
                  >
                    {/* Head / Tail Tags */}
                    {isHead && (
                      <span className="absolute -top-6 left-1 text-[10px] font-bold text-cyan-400 uppercase tracking-wider">
                        HEAD
                      </span>
                    )}
                    {isTail && (
                      <span className="absolute -top-6 right-1 text-[10px] font-bold text-purple-400 uppercase tracking-wider">
                        TAIL
                      </span>
                    )}

                    {/* Left Pointer box for Doubly */}
                    {listType === 'doubly' && (
                      <div className="w-5 h-full bg-slate-800/80 border-r border-slate-700 rounded-l flex items-center justify-center text-[9px] text-slate-400">
                        P
                      </div>
                    )}

                    <div className="flex-1 text-center flex flex-col items-center justify-center">
                      <span className="text-[9px] text-slate-500">Idx {idx}</span>
                      <span className="text-base font-bold">{node.val}</span>
                    </div>

                    <div className="w-5 h-full bg-slate-800/80 border-l border-slate-700 rounded-r flex items-center justify-center text-[9px] text-slate-400">
                      N
                    </div>
                  </motion.div>

                  {/* Arrow Pointer Link */}
                  {!isTail && (
                    <div className="flex flex-col items-center justify-center text-indigo-400 font-mono font-bold shrink-0">
                      <span className="text-xs">{listType === 'doubly' ? '⇇ ⇉' : '➔'}</span>
                    </div>
                  )}

                  {/* Terminal NULL or Circular link */}
                  {isTail && (
                    <div className="flex items-center gap-2 text-slate-500 font-mono text-xs font-bold shrink-0">
                      <span>➔</span>
                      {listType === 'circular' ? (
                        <span className="px-2 py-1 rounded bg-indigo-950 text-indigo-300 border border-indigo-700/60 text-[10px]">
                          ↺ HEAD
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded bg-slate-900 text-slate-500 border border-slate-800 text-[10px]">
                          NULL
                        </span>
                      )}
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </AnimatePresence>

          {nodes.length === 0 && (
            <div className="w-full text-center py-12 text-slate-600 text-sm italic">
              Linked List is empty. Insert elements to visualize nodes and pointer links.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
