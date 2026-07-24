export type DataStructureId = 
  | 'stack' 
  | 'queue' 
  | 'circular-queue' 
  | 'priority-queue' 
  | 'singly-linked-list' 
  | 'doubly-linked-list' 
  | 'circular-linked-list' 
  | 'binary-search-tree' 
  | 'avl-tree' 
  | 'max-heap' 
  | 'min-heap' 
  | 'graph' 
  | 'hash-table';

export type SortingAlgorithmId = 
  | 'bubble' 
  | 'selection' 
  | 'insertion' 
  | 'merge' 
  | 'quick' 
  | 'heap';

export type SearchAlgorithmId = 
  | 'linear-search' 
  | 'binary-search';

export type ActiveView = 
  | 'home' 
  | 'ds-detail' 
  | 'sorting' 
  | 'searching' 
  | 'complexity-matrix' 
  | 'practice' 
  | 'mini-games' 
  | 'quizzes' 
  | 'progress';

export type CodeLanguage = 'python' | 'c' | 'cpp' | 'java';

export interface CodeSnippets {
  python: string;
  c: string;
  cpp: string;
  java: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface DSTheory {
  id: DataStructureId;
  name: string;
  category: 'Linear' | 'Non-Linear';
  icon: string;
  shortDesc: string;
  definition: string;
  realLifeExample: string;
  applications: string[];
  advantages: string[];
  disadvantages: string[];
  timeComplexity: {
    access: string;
    search: string;
    insert: string;
    delete: string;
  };
  spaceComplexity: string;
  code: CodeSnippets;
  quiz: QuizQuestion[];
}

export interface PracticeProblem {
  id: string;
  title: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  statement: string;
  inputExample: string;
  outputExample: string;
  constraints: string[];
  hints: string[];
  complexity: {
    time: string;
    space: string;
  };
  solutions: {
    python: string;
    cpp: string;
    java: string;
  };
}

export interface UserProgress {
  completedDS: string[];
  completedProblems: string[];
  quizScores: Record<string, { score: number; total: number }>;
  highScores: {
    complexity: number;
    arrange: number;
    matching: number;
  };
}

export interface ComplexityRow {
  name: string;
  category: 'Data Structure' | 'Sorting Algorithm' | 'Search Algorithm';
  type: string;
  bestSearch: string;
  avgSearch: string;
  worstSearch: string;
  bestInsert: string;
  avgInsert: string;
  worstInsert: string;
  bestDelete: string;
  avgDelete: string;
  worstDelete: string;
  spaceComplexity: string;
}
