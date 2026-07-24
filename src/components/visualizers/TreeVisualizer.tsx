import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Trash2, Search, Play, Info, RefreshCw } from 'lucide-react';
import { soundFx } from '../../utils/audio';

interface TreeNodeData {
  val: number;
  left?: TreeNodeData;
  right?: TreeNodeData;
}

interface RenderNode {
  val: number;
  x: number;
  y: number;
  px?: number;
  py?: number;
}

export const TreeVisualizer: React.FC = () => {
  const [root, setRoot] = useState<TreeNodeData | undefined>({
    val: 50,
    left: {
      val: 30,
      left: { val: 20 },
      right: { val: 40 },
    },
    right: {
      val: 70,
      left: { val: 60 },
      right: { val: 80 },
    },
  });

  const [inputValue, setInputValue] = useState<string>('');
  const [highlightedVal, setHighlightedVal] = useState<number | null>(null);
  const [traversalSequence, setTraversalSequence] = useState<number[]>([]);
  const [activeTraversalIdx, setActiveTraversalIdx] = useState<number | null>(null);
  const [message, setMessage] = useState<string>('BST loaded: Root = 50. Supports Insert, Search, Delete, and Traversals.');

  // Helper BST Insert
  const insertBST = (node: TreeNodeData | undefined, val: number): TreeNodeData => {
    if (!node) return { val };
    if (val < node.val) node.left = insertBST(node.left, val);
    else if (val > node.val) node.right = insertBST(node.right, val);
    return node;
  };

  // Helper BST Delete
  const deleteBST = (node: TreeNodeData | undefined, val: number): TreeNodeData | undefined => {
    if (!node) return undefined;
    if (val < node.val) node.left = deleteBST(node.left, val);
    else if (val > node.val) node.right = deleteBST(node.right, val);
    else {
      if (!node.left) return node.right;
      if (!node.right) return node.left;
      let minNode = node.right;
      while (minNode.left) minNode = minNode.left;
      node.val = minNode.val;
      node.right = deleteBST(node.right, minNode.val);
    }
    return node;
  };

  const handleInsert = () => {
    const val = inputValue.trim() !== '' ? parseInt(inputValue, 10) : Math.floor(Math.random() * 90) + 10;
    if (isNaN(val)) return;

    const newRoot = insertBST(JSON.parse(JSON.stringify(root || null)), val);
    setRoot(newRoot);
    setHighlightedVal(val);
    setMessage(`Inserted ${val} into BST.`);
    setInputValue('');
    soundFx.playPush();
    setTimeout(() => setHighlightedVal(null), 2000);
  };

  const handleDelete = () => {
    const val = parseInt(inputValue, 10);
    if (isNaN(val)) {
      setMessage('Enter a value to delete.');
      return;
    }
    const newRoot = deleteBST(JSON.parse(JSON.stringify(root || null)), val);
    setRoot(newRoot);
    setMessage(`Deleted value ${val} from tree.`);
    setInputValue('');
    soundFx.playPop();
  };

  const handleSearch = async () => {
    const val = parseInt(inputValue, 10);
    if (isNaN(val)) {
      setMessage('Enter a value to search.');
      return;
    }

    let curr = root;
    while (curr) {
      setHighlightedVal(curr.val);
      soundFx.playStep();
      await new Promise((res) => setTimeout(res, 600));

      if (curr.val === val) {
        setMessage(`Value ${val} FOUND in tree!`);
        soundFx.playSuccess();
        setTimeout(() => setHighlightedVal(null), 2500);
        return;
      } else if (val < curr.val) {
        curr = curr.left;
      } else {
        curr = curr.right;
      }
    }

    setHighlightedVal(null);
    setMessage(`Value ${val} NOT found in tree.`);
    soundFx.playError();
  };

  // Traversal Generators
  const runTraversal = async (type: 'inorder' | 'preorder' | 'postorder') => {
    const seq: number[] = [];
    const inorder = (n?: TreeNodeData) => {
      if (!n) return;
      inorder(n.left);
      seq.push(n.val);
      inorder(n.right);
    };
    const preorder = (n?: TreeNodeData) => {
      if (!n) return;
      seq.push(n.val);
      preorder(n.left);
      preorder(n.right);
    };
    const postorder = (n?: TreeNodeData) => {
      if (!n) return;
      postorder(n.left);
      postorder(n.right);
      seq.push(n.val);
    };

    if (type === 'inorder') inorder(root);
    if (type === 'preorder') preorder(root);
    if (type === 'postorder') postorder(root);

    setTraversalSequence(seq);
    setMessage(`Running ${type.toUpperCase()} Traversal...`);

    for (let i = 0; i < seq.length; i++) {
      setActiveTraversalIdx(i);
      setHighlightedVal(seq[i]);
      soundFx.playStep(1 + i * 0.1);
      await new Promise((res) => setTimeout(res, 500));
    }

    setActiveTraversalIdx(null);
    setHighlightedVal(null);
    soundFx.playSuccess();
    setMessage(`${type.toUpperCase()} Traversal complete: [${seq.join(', ')}]`);
  };

  // Flatten tree into x/y nodes for SVG render
  const getRenderNodes = (): RenderNode[] => {
    if (!root) return [];
    const nodes: RenderNode[] = [];

    const traverse = (
      node: TreeNodeData | undefined,
      x: number,
      y: number,
      offset: number,
      px?: number,
      py?: number
    ) => {
      if (!node) return;
      nodes.push({ val: node.val, x, y, px, py });
      traverse(node.left, x - offset, y + 60, offset / 2, x, y);
      traverse(node.right, x + offset, y + 60, offset / 2, x, y);
    };

    traverse(root, 300, 40, 120);
    return nodes;
  };

  const renderNodes = getRenderNodes();

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl text-slate-100 flex flex-col gap-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-800/60 p-4 rounded-xl border border-slate-700/50">
        <div className="flex items-center gap-3">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Val (e.g. 25)"
            className="w-32 px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none"
          />
          <button
            onClick={handleInsert}
            className="flex items-center gap-1.5 px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Insert
          </button>
          <button
            onClick={handleSearch}
            className="flex items-center gap-1.5 px-3 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-sm font-medium transition cursor-pointer"
          >
            <Search className="w-4 h-4" /> Search
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center gap-1.5 px-3 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-sm font-medium transition cursor-pointer"
          >
            <Trash2 className="w-4 h-4" /> Delete
          </button>
        </div>

        {/* Traversal Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => runTraversal('inorder')}
            className="px-3 py-2 bg-purple-900/60 hover:bg-purple-800 text-purple-200 border border-purple-700/60 rounded-lg text-xs font-semibold cursor-pointer"
          >
            Inorder (Sorted)
          </button>
          <button
            onClick={() => runTraversal('preorder')}
            className="px-3 py-2 bg-purple-900/60 hover:bg-purple-800 text-purple-200 border border-purple-700/60 rounded-lg text-xs font-semibold cursor-pointer"
          >
            Preorder
          </button>
          <button
            onClick={() => runTraversal('postorder')}
            className="px-3 py-2 bg-purple-900/60 hover:bg-purple-800 text-purple-200 border border-purple-700/60 rounded-lg text-xs font-semibold cursor-pointer"
          >
            Postorder
          </button>

          <button
            onClick={() => {
              setRoot(undefined);
              setMessage('Tree cleared.');
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
      </div>

      {/* Traversal Sequence Banner */}
      {traversalSequence.length > 0 && (
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl overflow-x-auto text-xs font-mono">
          <span className="text-purple-400 font-bold shrink-0">Traversal Sequence:</span>
          {traversalSequence.map((val, idx) => (
            <span
              key={idx}
              className={`px-2 py-0.5 rounded ${
                idx === activeTraversalIdx
                  ? 'bg-amber-500 text-slate-950 font-bold animate-pulse'
                  : 'bg-slate-800 text-slate-300'
              }`}
            >
              {val}
            </span>
          ))}
        </div>
      )}

      {/* SVG Interactive Canvas */}
      <div className="relative min-h-[320px] bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex items-center justify-center overflow-x-auto">
        <svg className="w-[600px] h-[300px] overflow-visible">
          {/* Edge Lines */}
          {renderNodes.map((n) => {
            if (n.px !== undefined && n.py !== undefined) {
              return (
                <line
                  key={`line-${n.x}-${n.y}`}
                  x1={n.px}
                  y1={n.py}
                  x2={n.x}
                  y2={n.y}
                  stroke="#475569"
                  strokeWidth="2"
                />
              );
            }
            return null;
          })}

          {/* Nodes */}
          {renderNodes.map((n) => {
            const isHighlighted = n.val === highlightedVal;
            return (
              <g key={`node-${n.val}`} transform={`translate(${n.x}, ${n.y})`}>
                <circle
                  r="20"
                  fill={isHighlighted ? '#f59e0b' : '#1e1b4b'}
                  stroke={isHighlighted ? '#fbbf24' : '#6366f1'}
                  strokeWidth="3"
                  className="transition-all duration-300"
                />
                <text
                  textAnchor="middle"
                  dy="5"
                  fill={isHighlighted ? '#0f172a' : '#f8fafc'}
                  fontSize="12"
                  fontWeight="bold"
                  fontFamily="monospace"
                >
                  {n.val}
                </text>
              </g>
            );
          })}
        </svg>

        {renderNodes.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-slate-600 text-sm italic">
            Tree is empty. Insert nodes to view tree structure.
          </div>
        )}
      </div>
    </div>
  );
};
