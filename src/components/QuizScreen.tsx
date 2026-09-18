import React, { useState } from 'react';
import { ChevronLeft, ArrowRight, Check, Sparkles, HeartHandshake } from 'lucide-react';
import { QUESTIONS } from '../data/questions';
import { UserAnswers, Question } from '../types';

interface QuizScreenProps {
  answers: UserAnswers;
  onUpdateAnswer: (questionId: number, value: string | number) => void;
  onFinishQuiz: () => void;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({
  answers,
  onUpdateAnswer,
  onFinishQuiz,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const currentQuestion: Question = QUESTIONS[currentIndex];
  const selectedValue = answers[currentQuestion.id];

  const isFirstQuestion = currentIndex === 0;
  const isLastQuestion = currentIndex === QUESTIONS.length - 1;
  const progressPercent = Math.round(((currentIndex + 1) / QUESTIONS.length) * 100);

  const handleSelectOption = (optionId: string | number) => {
    onUpdateAnswer(currentQuestion.id, optionId);
  };

  const handleNext = () => {
    if (selectedValue === undefined || selectedValue === null) return;
    if (isLastQuestion) {
      onFinishQuiz();
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto py-6 sm:py-10 px-4 sm:px-6">
      {/* Neurological Dopamine & Trust Trigger Banner (shown at start) */}
      {currentIndex === 0 && (
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-blue-900/60 via-slate-900 to-indigo-950/60 border border-blue-500/30 text-slate-200 flex items-start gap-3.5 shadow-lg animate-fadeIn">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 shrink-0 mt-0.5">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs uppercase font-bold tracking-wider text-amber-400 mb-0.5">
              Strategic Self-Check Initiated
            </div>
            <p className="text-sm font-medium text-white leading-relaxed">
              “You’ve already made a smart move by checking in—most people wait until it’s too late.”
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Takes just 7 targeted questions. No jargon, no product sales.
            </p>
          </div>
        </div>
      )}

      {/* Progress & Category Header */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2">
          {currentIndex > 0 && (
            <button
              type="button"
              onClick={handlePrev}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Previous question"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-950/80 text-blue-300 border border-blue-800/60">
            {currentQuestion.categoryLabel}
          </span>
        </div>

        <div className="text-xs font-semibold text-slate-400">
          Question <span className="text-white font-bold">{currentIndex + 1}</span> of {QUESTIONS.length}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-slate-900 rounded-full mb-6 overflow-hidden border border-slate-800">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-amber-400 to-amber-300 rounded-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl transition-all">
        <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-snug">
          {currentQuestion.title}
        </h2>
        <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
          {currentQuestion.subtitle}
        </p>

        {/* Sensory quote if present */}
        {currentQuestion.sensoryQuote && (
          <div className="mt-3.5 flex items-center gap-2 text-xs italic text-amber-300/90 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>“{currentQuestion.sensoryQuote}”</span>
          </div>
        )}

        {/* Question Options */}
        <div className="mt-8 space-y-3">
          {currentQuestion.type === 'scale5' ? (
            <div className="space-y-4">
              <div className="grid grid-cols-5 gap-2 sm:gap-3">
                {currentQuestion.options.map((opt) => {
                  const isSelected = String(selectedValue) === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleSelectOption(opt.id)}
                      className={`py-3.5 sm:py-4 px-2 rounded-2xl flex flex-col items-center justify-center transition-all border text-center ${
                        isSelected
                          ? 'bg-amber-500 text-slate-950 font-bold border-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.4)] scale-[1.03]'
                          : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:border-slate-700'
                      }`}
                    >
                      <span className="text-lg sm:text-2xl font-extrabold">{opt.id}</span>
                      <span className="text-[10px] uppercase font-bold tracking-wider mt-1 opacity-80">
                        {opt.id === '1' ? 'Low' : opt.id === '5' ? 'Optimal' : ''}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic descriptor for selected scale item */}
              <div className="mt-3 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs sm:text-sm text-slate-300">
                {selectedValue ? (
                  <span className="text-amber-300">
                    {currentQuestion.options.find((o) => o.id === String(selectedValue))?.sublabel}
                  </span>
                ) : (
                  <span className="text-slate-400">
                    Select a number from 1 (Substantial uncertainty) to 5 (Complete groundedness)
                  </span>
                )}
              </div>
            </div>
          ) : (
            currentQuestion.options.map((opt) => {
              const isSelected = String(selectedValue) === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleSelectOption(opt.id)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl transition-all border flex items-start justify-between gap-3 group cursor-pointer ${
                    isSelected
                      ? 'bg-blue-950/50 border-amber-400/90 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                      : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-800/60 hover:border-slate-700'
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-sm sm:text-base font-semibold transition-colors ${
                          isSelected ? 'text-amber-300' : 'text-slate-200 group-hover:text-white'
                        }`}
                      >
                        {opt.label}
                      </span>
                    </div>

                    {opt.sublabel && (
                      <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-snug">
                        {opt.sublabel}
                      </p>
                    )}

                    {opt.sensoryHint && (
                      <div className="mt-2 text-[11px] text-amber-400/80 italic">
                        ↳ {opt.sensoryHint}
                      </div>
                    )}
                  </div>

                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border transition-all mt-0.5 ${
                      isSelected
                        ? 'bg-amber-500 border-amber-400 text-slate-950'
                        : 'border-slate-700 bg-slate-900 group-hover:border-slate-500'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer controls for Question */}
        <div className="mt-8 pt-5 border-t border-slate-800 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors ${
              currentIndex === 0
                ? 'opacity-0 pointer-events-none'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            ← Previous
          </button>

          <div className="flex items-center gap-3">
            {selectedValue !== undefined && selectedValue !== null && (
              <span className="text-[11px] text-amber-400 hidden sm:inline-block font-medium animate-fadeIn">
                Selection recorded. Click Continue →
              </span>
            )}

            <button
              type="button"
              onClick={handleNext}
              disabled={selectedValue === undefined || selectedValue === null}
              className={`inline-flex items-center gap-2 px-6 sm:px-7 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                selectedValue !== undefined && selectedValue !== null
                  ? 'bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.35)] hover:shadow-[0_0_25px_rgba(245,158,11,0.5)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer'
                  : 'bg-slate-800/80 text-slate-500 cursor-not-allowed border border-slate-700/60'
              }`}
            >
              <span>{isLastQuestion ? 'Calibrate & View Scorecard' : 'Continue'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
