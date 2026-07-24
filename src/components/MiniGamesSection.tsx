import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { COMPLEXITY_FLASHCARDS, ARRANGE_STEPS_QUESTIONS, MATCHING_GAME_PAIRS, MatchPair } from '../data/miniGamesData';
import { soundFx } from '../utils/audio';
import { Trophy, Zap, CheckCircle, XCircle, RotateCcw, ArrowRight, HelpCircle } from 'lucide-react';

interface MiniGamesProps {
  highScores: {
    complexity: number;
    arrange: number;
    matching: number;
  };
  onUpdateHighScore: (game: 'complexity' | 'arrange' | 'matching', score: number) => void;
}

export const MiniGamesSection: React.FC<MiniGamesProps> = ({ highScores, onUpdateHighScore }) => {
  const [activeTab, setActiveTab] = useState<'complexity' | 'arrange' | 'matching'>('complexity');

  // GAME 1: GUESS THE COMPLEXITY STATE
  const [cIdx, setCIdx] = useState<number>(0);
  const [cScore, setCScore] = useState<number>(0);
  const [cStreak, setCStreak] = useState<number>(0);
  const [cSelected, setCSelected] = useState<string | null>(null);
  const [cAnswered, setCAnswered] = useState<boolean>(false);

  const currentFlashcard = COMPLEXITY_FLASHCARDS[cIdx];

  const handleSelectComplexity = (option: string) => {
    if (cAnswered) return;
    setCSelected(option);
    setCAnswered(true);

    if (option === currentFlashcard.correctAnswer) {
      const newScore = cScore + 10;
      const newStreak = cStreak + 1;
      setCScore(newScore);
      setCStreak(newStreak);
      soundFx.playSuccess();

      if (newScore > highScores.complexity) {
        onUpdateHighScore('complexity', newScore);
        confetti({ particleCount: 50, spread: 60 });
      }
    } else {
      setCStreak(0);
      soundFx.playError();
    }
  };

  const handleNextFlashcard = () => {
    setCSelected(null);
    setCAnswered(false);
    if (cIdx < COMPLEXITY_FLASHCARDS.length - 1) {
      setCIdx(cIdx + 1);
    } else {
      // Loop or restart
      setCIdx(0);
      confetti({ particleCount: 100, spread: 70 });
    }
  };

  // GAME 2: ARRANGE THE STEPS STATE
  const [aIdx, setAIdx] = useState<number>(0);
  const currentArrangeQ = ARRANGE_STEPS_QUESTIONS[aIdx];
  const [userOrder, setUserOrder] = useState<string[]>(
    currentArrangeQ.scrambledSteps.map((s) => s.id)
  );
  const [aStatus, setAStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');

  const handleMoveStep = (fromIdx: number, toIdx: number) => {
    const updated = [...userOrder];
    const [moved] = updated.splice(fromIdx, 1);
    updated.splice(toIdx, 0, moved);
    setUserOrder(updated);
    setAStatus('idle');
  };

  const handleCheckArrangeOrder = () => {
    const isCorrect = userOrder.every((id, idx) => id === currentArrangeQ.correctOrder[idx]);
    if (isCorrect) {
      setAStatus('correct');
      soundFx.playSuccess();
      confetti({ particleCount: 80, spread: 70 });
      onUpdateHighScore('arrange', (highScores.arrange || 0) + 20);
    } else {
      setAStatus('wrong');
      soundFx.playError();
    }
  };

  // GAME 3: MATCHING GAME STATE
  const [selectedDS, setSelectedDS] = useState<MatchPair | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [mScore, setMScore] = useState<number>(0);

  const handleMatchSelect = (pair: MatchPair) => {
    if (!selectedDS) {
      setSelectedDS(pair);
      soundFx.playStep();
    } else {
      if (selectedDS.id === pair.id && !matchedIds.includes(pair.id)) {
        setMatchedIds([...matchedIds, pair.id]);
        setMScore(mScore + 15);
        soundFx.playSuccess();
        if (matchedIds.length + 1 === MATCHING_GAME_PAIRS.length) {
          confetti({ particleCount: 100, spread: 80 });
          onUpdateHighScore('matching', mScore + 15);
        }
      } else {
        soundFx.playError();
      }
      setSelectedDS(null);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Data Structures Mini-Games Hub</h1>
        <p className="text-slate-400 text-sm">
          Test your Big-O complexity recall, algorithm step arrangement, and concept matching skills through interactive mini-games.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-3 border-b border-slate-800 pb-4">
        <button
          onClick={() => setActiveTab('complexity')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm cursor-pointer transition ${
            activeTab === 'complexity'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Zap className="w-4 h-4 text-amber-400" /> Guess the Complexity
        </button>
        <button
          onClick={() => setActiveTab('arrange')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm cursor-pointer transition ${
            activeTab === 'arrange'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <RotateCcw className="w-4 h-4 text-purple-400" /> Arrange the Steps
        </button>
        <button
          onClick={() => setActiveTab('matching')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm cursor-pointer transition ${
            activeTab === 'matching'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Trophy className="w-4 h-4 text-emerald-400" /> Matching Game
        </button>
      </div>

      {/* GAME 1: GUESS THE COMPLEXITY */}
      {activeTab === 'complexity' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col gap-6">
          <div className="flex items-center justify-between bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-sm">
            <div className="flex items-center gap-4">
              <span>Card {cIdx + 1} / {COMPLEXITY_FLASHCARDS.length}</span>
              <span className="text-amber-400 font-bold">Streak: 🔥 {cStreak}</span>
            </div>
            <div className="flex items-center gap-2 text-indigo-400 font-bold">
              <Trophy className="w-4 h-4" /> Score: {cScore} (High: {highScores.complexity})
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-950/60 to-slate-950 p-8 rounded-2xl border border-indigo-800/40 text-center flex flex-col items-center justify-center gap-3">
            <span className="px-3 py-1 rounded-full bg-indigo-900/60 text-indigo-300 font-mono text-xs font-bold uppercase tracking-wider">
              {currentFlashcard.dataStructureOrAlgo}
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              {currentFlashcard.operation}
            </h2>
            <p className="text-slate-400 text-xs">What is the Big-O Time Complexity?</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {currentFlashcard.options.map((opt) => {
              const isSelected = cSelected === opt;
              const isCorrect = opt === currentFlashcard.correctAnswer;

              let btnStyle = 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700';
              if (cAnswered) {
                if (isCorrect) btnStyle = 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold';
                else if (isSelected) btnStyle = 'bg-rose-950 border-rose-500 text-rose-200 font-bold';
              }

              return (
                <button
                  key={opt}
                  disabled={cAnswered}
                  onClick={() => handleSelectComplexity(opt)}
                  className={`p-4 rounded-xl border font-mono text-lg font-bold transition cursor-pointer shadow-md ${btnStyle}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {cAnswered && (
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-indigo-400">Explanation: </strong> {currentFlashcard.explanation}
              </p>
              <button
                onClick={handleNextFlashcard}
                className="flex items-center gap-1.5 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold cursor-pointer shrink-0"
              >
                Next Card <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* GAME 2: ARRANGE THE STEPS */}
      {activeTab === 'arrange' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col gap-6">
          <div className="flex items-center justify-between bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div>
              <h3 className="font-bold text-white text-base">{currentArrangeQ.title}</h3>
              <span className="text-xs text-slate-400">Reorder the steps into correct execution sequence.</span>
            </div>
            <button
              onClick={() => {
                const nextQ = (aIdx + 1) % ARRANGE_STEPS_QUESTIONS.length;
                setAIdx(nextQ);
                setUserOrder(ARRANGE_STEPS_QUESTIONS[nextQ].scrambledSteps.map((s) => s.id));
                setAStatus('idle');
              }}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-bold cursor-pointer"
            >
              Next Problem
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {userOrder.map((stepId, idx) => {
              const stepObj = currentArrangeQ.scrambledSteps.find((s) => s.id === stepId)!;
              return (
                <div
                  key={stepId}
                  className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between gap-4 shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-700/60 font-mono font-bold text-xs flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="text-sm font-medium text-slate-200">{stepObj.text}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      disabled={idx === 0}
                      onClick={() => handleMoveStep(idx, idx - 1)}
                      className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs disabled:opacity-30 cursor-pointer"
                    >
                      ▲
                    </button>
                    <button
                      disabled={idx === userOrder.length - 1}
                      onClick={() => handleMoveStep(idx, idx + 1)}
                      className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs disabled:opacity-30 cursor-pointer"
                    >
                      ▼
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between border-t border-slate-800 pt-4">
            <button
              onClick={handleCheckArrangeOrder}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm shadow-lg cursor-pointer"
            >
              Verify Step Order
            </button>

            {aStatus === 'correct' && (
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold text-sm">
                <CheckCircle className="w-5 h-5" /> Correct Order! Excellent.
              </span>
            )}
            {aStatus === 'wrong' && (
              <span className="flex items-center gap-1.5 text-rose-400 font-bold text-sm">
                <XCircle className="w-5 h-5" /> Incorrect step sequence. Adjust and try again!
              </span>
            )}
          </div>
        </div>
      )}

      {/* GAME 3: MATCHING GAME */}
      {activeTab === 'matching' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col gap-6">
          <div className="flex items-center justify-between bg-slate-950 p-4 rounded-xl border border-slate-800 text-sm">
            <span className="text-slate-300 font-semibold">Match Data Structures with their primary characteristics:</span>
            <span className="text-indigo-400 font-bold font-mono">Matched: {matchedIds.length} / {MATCHING_GAME_PAIRS.length}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MATCHING_GAME_PAIRS.map((pair) => {
              const isMatched = matchedIds.includes(pair.id);
              const isSelected = selectedDS?.id === pair.id;

              return (
                <div
                  key={pair.id}
                  onClick={() => !isMatched && handleMatchSelect(pair)}
                  className={`p-5 rounded-2xl border flex flex-col gap-2 cursor-pointer transition shadow-md ${
                    isMatched
                      ? 'bg-emerald-950/40 border-emerald-800 opacity-60'
                      : isSelected
                      ? 'bg-indigo-950 border-indigo-400 ring-2 ring-indigo-500/50'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-white text-base">{pair.dsName}</span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono text-[10px]">
                      {pair.tag}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 font-mono bg-slate-900 p-2.5 rounded-lg border border-slate-800/80">
                    {pair.concept}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
