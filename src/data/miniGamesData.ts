export interface ComplexityCard {
  id: string;
  operation: string;
  dataStructureOrAlgo: string;
  correctAnswer: string;
  options: string[];
  explanation: string;
}

export interface ArrangeStepQuestion {
  id: string;
  title: string;
  dataStructureOrAlgo: string;
  scrambledSteps: { id: string; text: string }[];
  correctOrder: string[]; // step ids in correct order
  explanation: string;
}

export interface MatchPair {
  id: string;
  dsName: string;
  concept: string;
  tag: string;
}

export const COMPLEXITY_FLASHCARDS: ComplexityCard[] = [
  {
    id: 'c1',
    operation: 'Pushing an item onto a Stack',
    dataStructureOrAlgo: 'Stack',
    correctAnswer: 'O(1)',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
    explanation: 'Pushing an element onto a stack only updates the top pointer/array end, taking constant time O(1).'
  },
  {
    id: 'c2',
    operation: 'Searching for a value in an Unsorted Array',
    dataStructureOrAlgo: 'Array',
    correctAnswer: 'O(n)',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
    explanation: 'In an unsorted array, you may need to inspect every element sequentially, taking O(n) worst-case.'
  },
  {
    id: 'c3',
    operation: 'Binary Search on a Sorted Array',
    dataStructureOrAlgo: 'Binary Search',
    correctAnswer: 'O(log n)',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
    explanation: 'Binary Search repeatedly cuts the search interval in half, yielding logarithmic time O(log n).'
  },
  {
    id: 'c4',
    operation: 'Average search in a Hash Table',
    dataStructureOrAlgo: 'Hash Table',
    correctAnswer: 'O(1)',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
    explanation: 'A uniform hash function maps keys directly to bucket indices in average O(1) constant time.'
  },
  {
    id: 'c5',
    operation: 'Worst-case sorting with QuickSort',
    dataStructureOrAlgo: 'QuickSort',
    correctAnswer: 'O(n²)',
    options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(2ⁿ)'],
    explanation: 'If the chosen pivot is consistently the smallest or largest element (e.g. sorted array without random pivot), QuickSort degrades to O(n²).'
  },
  {
    id: 'c6',
    operation: 'Average case time complexity of Merge Sort',
    dataStructureOrAlgo: 'Merge Sort',
    correctAnswer: 'O(n log n)',
    options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
    explanation: 'Merge Sort always splits the array into halves (log n levels) and merges n elements at each level, taking O(n log n).'
  },
  {
    id: 'c7',
    operation: 'Extracting Max from a Binary Max Heap',
    dataStructureOrAlgo: 'Heap',
    correctAnswer: 'O(log n)',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
    explanation: 'Extracting Max replaces root with the last leaf and sifts down along the tree height (O(log n)).'
  },
  {
    id: 'c8',
    operation: 'Inorder Traversal of a Binary Tree with N nodes',
    dataStructureOrAlgo: 'Binary Tree',
    correctAnswer: 'O(n)',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
    explanation: 'Inorder traversal visits every single node exactly once, taking O(n) linear time.'
  }
];

export const ARRANGE_STEPS_QUESTIONS: ArrangeStepQuestion[] = [
  {
    id: 'as-1',
    title: 'Binary Search Algorithm Steps',
    dataStructureOrAlgo: 'Binary Search',
    scrambledSteps: [
      { id: 's2', text: 'Calculate middle index: mid = (low + high) / 2' },
      { id: 's4', text: 'If target < arr[mid], search left half: high = mid - 1' },
      { id: 's1', text: 'Initialize pointers low = 0 and high = array.length - 1' },
      { id: 's3', text: 'Compare target with element at arr[mid]' },
      { id: 's5', text: 'If target > arr[mid], search right half: low = mid + 1' }
    ],
    correctOrder: ['s1', 's2', 's3', 's4', 's5'],
    explanation: '1) Set low & high pointers. 2) Compute middle. 3) Compare target. 4 & 5) Narrow search space left or right.'
  },
  {
    id: 'as-2',
    title: 'Breadth-First Search (BFS) Traversal',
    dataStructureOrAlgo: 'Graph / Queue',
    scrambledSteps: [
      { id: 'b2', text: 'Enqueue starting node and mark it as visited' },
      { id: 'b4', text: 'For each unvisited neighbor, mark as visited and enqueue it' },
      { id: 'b1', text: 'Initialize an empty Queue and visited set' },
      { id: 'b3', text: 'Dequeue front node and process its value' },
      { id: 'b5', text: 'Repeat until queue becomes empty' }
    ],
    correctOrder: ['b1', 'b2', 'b3', 'b4', 'b5'],
    explanation: '1) Init queue. 2) Enqueue start node. 3) Dequeue & visit. 4) Enqueue unvisited neighbors. 5) Loop until empty.'
  },
  {
    id: 'as-3',
    title: 'Inserting a Node into a Max Heap',
    dataStructureOrAlgo: 'Max Heap',
    scrambledSteps: [
      { id: 'h2', text: 'Compare newly added node with its parent node' },
      { id: 'h4', text: 'Repeat comparison and swapping until heap property holds or root is reached' },
      { id: 'h1', text: 'Append new element at the very end of heap array (bottom-right leaf)' },
      { id: 'h3', text: 'If child node is greater than parent, swap child and parent' }
    ],
    correctOrder: ['h1', 'h2', 'h3', 'h4'],
    explanation: '1) Append at bottom leaf. 2) Compare with parent. 3) Swap if greater. 4) Bubble/Sift up until restored.'
  }
];

export const MATCHING_GAME_PAIRS: MatchPair[] = [
  { id: 'm1', dsName: 'Stack', concept: 'LIFO (Last-In First-Out) / Function Call Memory', tag: 'Linear' },
  { id: 'm2', dsName: 'Queue', concept: 'FIFO (First-In First-Out) / Task Scheduling', tag: 'Linear' },
  { id: 'm3', dsName: 'BST', concept: 'Left < Root < Right / Logarithmic Search', tag: 'Hierarchical' },
  { id: 'm4', dsName: 'Graph', concept: 'Network of Vertices and Edges / Social Networks', tag: 'Network' },
  { id: 'm5', dsName: 'Hash Table', concept: 'Key-Value Mapping via Hash Function / Constant Lookup', tag: 'Map' },
  { id: 'm6', dsName: 'Heap', concept: 'Parent >= Children / Priority Queue Implementation', tag: 'Tree' }
];
