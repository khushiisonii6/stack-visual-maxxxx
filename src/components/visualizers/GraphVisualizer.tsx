import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Trash2, Play, Info, RefreshCw } from 'lucide-react';
import { soundFx } from '../../utils/audio';

interface Vertex {
  id: string;
  label: string;
  x: number;
  y: number;
}

interface Edge {
  u: string;
  v: string;
}

export const GraphVisualizer: React.FC = () => {
  const [vertices, setVertices] = useState<Vertex[]>([
    { id: 'A', label: 'A', x: 100, y: 80 },
    { id: 'B', label: 'B', x: 260, y: 60 },
    { id: 'C', label: 'C', x: 180, y: 190 },
    { id: 'D', label: 'D', x: 380, y: 160 },
  ]);

  const [edges, setEdges] = useState<Edge[]>([
    { u: 'A', v: 'B' },
    { u: 'A', v: 'C' },
    { u: 'B', v: 'D' },
    { u: 'C', v: 'D' },
  ]);

  const [selectedU, setSelectedU] = useState<string>('A');
  const [selectedV, setSelectedV] = useState<string>('B');
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [visitedNodes, setVisitedNodes] = useState<string[]>([]);
  const [message, setMessage] = useState<string>('Interactive Graph: Click "Add Edge" or run BFS/DFS traversals.');

  const handleAddVertex = () => {
    const nextChar = String.fromCharCode(65 + vertices.length);
    if (vertices.length >= 8) {
      setMessage('Maximum 8 vertices allowed for optimal layout.');
      return;
    }
    const newVertex: Vertex = {
      id: nextChar,
      label: nextChar,
      x: 80 + (vertices.length % 4) * 120 + Math.random() * 20,
      y: 80 + Math.floor(vertices.length / 4) * 100 + Math.random() * 20,
    };
    setVertices((prev) => [...prev, newVertex]);
    setMessage(`Added Vertex ${nextChar}.`);
    soundFx.playPush();
  };

  const handleAddEdge = () => {
    if (selectedU === selectedV) {
      setMessage('Cannot create self-loop edge.');
      return;
    }
    const exists = edges.some(
      (e) => (e.u === selectedU && e.v === selectedV) || (e.u === selectedV && e.v === selectedU)
    );
    if (exists) {
      setMessage(`Edge between ${selectedU} and ${selectedV} already exists.`);
      return;
    }
    setEdges((prev) => [...prev, { u: selectedU, v: selectedV }]);
    setMessage(`Added Undirected Edge (${selectedU} - ${selectedV}).`);
    soundFx.playPush();
  };

  const handleRemoveEdge = () => {
    setEdges((prev) =>
      prev.filter(
        (e) => !(e.u === selectedU && e.v === selectedV) && !(e.u === selectedV && e.v === selectedU)
      )
    );
    setMessage(`Removed Edge (${selectedU} - ${selectedV}).`);
    soundFx.playPop();
  };

  // Run BFS
  const runBFS = async () => {
    if (vertices.length === 0) return;
    const start = vertices[0].id;
    const visited = new Set<string>([start]);
    const queue = [start];
    const order: string[] = [];

    setMessage(`Starting BFS from Vertex ${start}...`);

    while (queue.length > 0) {
      const curr = queue.shift()!;
      order.push(curr);
      setActiveNode(curr);
      setVisitedNodes([...order]);
      soundFx.playStep();
      await new Promise((res) => setTimeout(res, 600));

      // Neighbors
      const neighbors = edges
        .filter((e) => e.u === curr || e.v === curr)
        .map((e) => (e.u === curr ? e.v : e.u));

      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }

    setActiveNode(null);
    soundFx.playSuccess();
    setMessage(`BFS Traversal Complete: [${order.join(' → ')}]`);
  };

  // Run DFS
  const runDFS = async () => {
    if (vertices.length === 0) return;
    const start = vertices[0].id;
    const visited = new Set<string>();
    const order: string[] = [];

    setMessage(`Starting DFS from Vertex ${start}...`);

    const dfs = async (node: string) => {
      visited.add(node);
      order.push(node);
      setActiveNode(node);
      setVisitedNodes([...order]);
      soundFx.playStep();
      await new Promise((res) => setTimeout(res, 600));

      const neighbors = edges
        .filter((e) => e.u === node || e.v === node)
        .map((e) => (e.u === node ? e.v : e.u));

      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          await dfs(neighbor);
        }
      }
    };

    await dfs(start);

    setActiveNode(null);
    soundFx.playSuccess();
    setMessage(`DFS Traversal Complete: [${order.join(' → ')}]`);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl text-slate-100 flex flex-col gap-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-800/60 p-4 rounded-xl border border-slate-700/50">
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleAddVertex}
            className="flex items-center gap-1.5 px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Vertex
          </button>

          <div className="flex items-center gap-2">
            <select
              value={selectedU}
              onChange={(e) => setSelectedU(e.target.value)}
              className="px-2 py-1.5 bg-slate-950 border border-slate-700 rounded text-xs text-white"
            >
              {vertices.map((v) => (
                <option key={v.id} value={v.id}>
                  Node {v.id}
                </option>
              ))}
            </select>
            <span className="text-xs text-slate-500">—</span>
            <select
              value={selectedV}
              onChange={(e) => setSelectedV(e.target.value)}
              className="px-2 py-1.5 bg-slate-950 border border-slate-700 rounded text-xs text-white"
            >
              {vertices.map((v) => (
                <option key={v.id} value={v.id}>
                  Node {v.id}
                </option>
              ))}
            </select>
            <button
              onClick={handleAddEdge}
              className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-semibold cursor-pointer"
            >
              Add Edge
            </button>
            <button
              onClick={handleRemoveEdge}
              className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-semibold cursor-pointer"
            >
              Remove Edge
            </button>
          </div>
        </div>

        {/* Traversals */}
        <div className="flex items-center gap-2">
          <button
            onClick={runBFS}
            className="flex items-center gap-1 px-3 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-semibold cursor-pointer"
          >
            <Play className="w-3.5 h-3.5" /> BFS
          </button>
          <button
            onClick={runDFS}
            className="flex items-center gap-1 px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold cursor-pointer"
          >
            <Play className="w-3.5 h-3.5" /> DFS
          </button>
          <button
            onClick={() => {
              setVertices([]);
              setEdges([]);
              setMessage('Graph cleared.');
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

      {/* Visited order badge */}
      {visitedNodes.length > 0 && (
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono">
          <span className="text-cyan-400 font-bold">Visited Traversal Order:</span>
          {visitedNodes.map((n, i) => (
            <span key={i} className="px-2 py-0.5 bg-cyan-950 text-cyan-200 border border-cyan-800 rounded">
              {n}
            </span>
          ))}
        </div>
      )}

      {/* Graph Canvas */}
      <div className="relative min-h-[300px] bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex items-center justify-center overflow-hidden">
        <svg className="w-[500px] h-[260px]">
          {/* Edges */}
          {edges.map((e, idx) => {
            const uVert = vertices.find((v) => v.id === e.u);
            const vVert = vertices.find((v) => v.id === e.v);
            if (!uVert || !vVert) return null;
            return (
              <line
                key={`edge-${idx}`}
                x1={uVert.x}
                y1={uVert.y}
                x2={vVert.x}
                y2={vVert.y}
                stroke="#475569"
                strokeWidth="2"
              />
            );
          })}

          {/* Vertices */}
          {vertices.map((v) => {
            const isActive = v.id === activeNode;
            const isVisited = visitedNodes.includes(v.id);

            return (
              <g key={v.id} transform={`translate(${v.x}, ${v.y})`}>
                <circle
                  r="22"
                  fill={isActive ? '#f59e0b' : isVisited ? '#065f46' : '#1e1b4b'}
                  stroke={isActive ? '#fbbf24' : isVisited ? '#34d399' : '#6366f1'}
                  strokeWidth="3"
                  className="transition-all duration-300 cursor-pointer"
                />
                <text
                  textAnchor="middle"
                  dy="5"
                  fill="#f8fafc"
                  fontSize="13"
                  fontWeight="bold"
                  fontFamily="monospace"
                >
                  {v.label}
                </text>
              </g>
            );
          })}
        </svg>

        {vertices.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-slate-600 text-sm italic">
            Graph is empty. Click "Add Vertex" to start building vertices and edges.
          </div>
        )}
      </div>
    </div>
  );
};
