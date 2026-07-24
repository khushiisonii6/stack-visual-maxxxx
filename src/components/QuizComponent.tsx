import React, { useState } from 'react';
import { QuizQuestion } from '../types';
import { soundFx } from '../utils/audio';
import confetti from 'canvas-confetti';
import { CheckCircle2, XCircle, RotateCcw, Trophy, ArrowRight } from 'lucide-react';

interface QuizComponentProps {
  dsName: string;
  dsId: string;
  questions: QuizQuestion[];
  onQuizComplete: (dsId: string, score: number, total: number) => void;
}

export const QuizComponent: React.FC<QuizComponentProps> = ({
  dsName,
  dsId,
  questions,
  onQuizComplete,
}) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [score, setScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const currentQ = questions[currentIdx];

  const handleSelectOption = (optIdx: number) => {
    if (isSubmitted) return;
    setSelectedOption(optIdx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isSubmitted) return;
    setIsSubmitted(true);

    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentIdx] = selectedOption;
    setUserAnswers(updatedAnswers);

    if (selectedOption === currentQ.correctAnswer) {
      setScore((prev) => prev + 1);
      soundFx.playSuccess();
    } else {
      soundFx.playError();
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      setQuizFinished(true);
      const finalScore = score + (selectedOption === currentQ.correctAnswer ? 0 : 0);
      onQuizComplete(dsId, finalScore, questions.length);
      if (finalScore >= 3) {
        confetti({ particleCount: 100, spread: 70 });
      }
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setUserAnswers(Array(questions.length).fill(null));
    setScore(0);
    setQuizFinished(false);
  };

  if (quizFinished) {
    const pct = Math.round((score / questions.length) * 100);

    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center flex flex-col items-center justify-center gap-6 shadow-xl">
        <div className="w-20 h-20 rounded-full bg-indigo-950 border-2 border-indigo-500 flex items-center justify-center text-indigo-400">
          <Trophy className="w-10 h-10" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white mb-1">{dsName} Quiz Completed!</h2>
          <p className="text-slate-400 text-sm">
            You scored <span className="text-indigo-400 font-bold font-mono text-lg">{score} / {questions.length}</span> ({pct}%)
          </p>
        </div>

        <button
          onClick={handleRestart}
          className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm shadow-lg transition cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" /> Retake Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col gap-6">
      {/* Progress */}
      <div className="flex items-center justify-between bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs">
        <span className="text-slate-400">Question {currentIdx + 1} of {questions.length}</span>
        <span className="text-indigo-400 font-bold">Current Score: {score}</span>
      </div>

      {/* Question Statement */}
      <div className="bg-slate-950 p-6 rounded-xl border border-slate-800">
        <h3 className="text-lg font-bold text-white mb-2">{currentQ.question}</h3>
      </div>

      {/* Options */}
      <div className="flex flex-col gap-3">
        {currentQ.options.map((opt, idx) => {
          const isSelected = selectedOption === idx;
          const isCorrect = idx === currentQ.correctAnswer;

          let optionStyle = 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700 text-slate-200';
          if (isSelected) optionStyle = 'bg-indigo-950 border-indigo-500 text-indigo-100 ring-2 ring-indigo-500/40';

          if (isSubmitted) {
            if (isCorrect) optionStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold';
            else if (isSelected) optionStyle = 'bg-rose-950/80 border-rose-500 text-rose-200 font-bold';
          }

          return (
            <button
              key={idx}
              disabled={isSubmitted}
              onClick={() => handleSelectOption(idx)}
              className={`p-4 rounded-xl border text-left text-sm font-medium transition cursor-pointer flex items-center justify-between ${optionStyle}`}
            >
              <span>{opt}</span>
              {isSubmitted && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
              {isSubmitted && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-400" />}
            </button>
          );
        })}
      </div>

      {/* Submit / Next Bar */}
      <div className="flex items-center justify-between border-t border-slate-800 pt-4">
        {!isSubmitted ? (
          <button
            disabled={selectedOption === null}
            onClick={handleSubmitAnswer}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white rounded-xl font-bold text-sm shadow-lg cursor-pointer"
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={handleNextQuestion}
            className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm shadow-lg cursor-pointer ml-auto"
          >
            {currentIdx < questions.length - 1 ? 'Next Question' : 'View Results'} <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Explanation */}
      {isSubmitted && (
        <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 leading-relaxed">
          <strong className="text-indigo-400 font-bold block mb-1">Explanation:</strong>
          {currentQ.explanation}
        </div>
      )}
    </div>
  );
};
