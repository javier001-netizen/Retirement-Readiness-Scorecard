import React, { useState, useEffect } from 'react';
import { Cpu, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

interface ResultsCalibrationScreenProps {
  onComplete: () => void;
}

interface StepItem {
  id: number;
  label: string;
  detail: string;
  minProgress: number;
}

const CALIBRATION_STEPS: StepItem[] = [
  {
    id: 1,
    label: 'Demographic & Runway Analysis',
    detail: 'Calibrating accumulation timeframe and CPF Special Account transition milestones...',
    minProgress: 15,
  },
  {
    id: 2,
    label: 'CPF LIFE Payout Modeling',
    detail: 'Evaluating non-negotiable living floor across Standard, Basic, and Escalating plans...',
    minProgress: 40,
  },
  {
    id: 3,
    label: 'Decumulation Sequence Simulation',
    detail: 'Simulating order of account liquidation to protect against Sequence of Returns Risk...',
    minProgress: 65,
  },
  {
    id: 4,
    label: 'SRS & Tax Bracket Optimization',
    detail: 'Mapping statutory 10-year penalty-free withdrawal tranches for zero taxable exposure...',
    minProgress: 88,
  },
  {
    id: 5,
    label: 'Generating Personalized Diagnostic Blueprint',
    detail: 'Compiling 4-pillar balance radar, drawdown projections, and actionable executive insights...',
    minProgress: 98,
  },
];

export const ResultsCalibrationScreen: React.FC<ResultsCalibrationScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState<number>(8);
  const [statusMessage, setStatusMessage] = useState<string>('Initializing multi-asset diagnostic model...');

  useEffect(() => {
    // Human-like stepped pacing with organic intervals
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 450);
          return 100;
        }

        // Variable increments to simulate complex computation phases
        let increment = 3;
        if (prev < 30) increment = 4;
        else if (prev >= 30 && prev < 60) increment = 2; // deliberate pause at simulation
        else if (prev >= 60 && prev < 85) increment = 3;
        else increment = 2;

        const next = Math.min(prev + increment, 100);

        if (next < 25) {
          setStatusMessage('Synthesizing your statutory CPF and runway parameters...');
        } else if (next < 50) {
          setStatusMessage('Cross-referencing CPF LIFE payout tiers against your target spending...');
        } else if (next < 75) {
          setStatusMessage('Stress-testing decumulation sequence against historical market drawdowns...');
        } else if (next < 95) {
          setStatusMessage('Optimizing SRS distribution schedule for statutory tax efficiency...');
        } else {
          setStatusMessage('Finalizing your custom Retirement Readiness Scorecard...');
        }

        return next;
      });
    }, 110);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="w-full max-w-2xl mx-auto py-8 sm:py-14 px-4 sm:px-6 flex flex-col items-center text-center animate-fadeIn">
      {/* Top Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-semibold mb-6 shadow-sm">
        <Cpu className="w-3.5 h-3.5 animate-pulse text-amber-400" />
        <span>Synthesizing Tailored Diagnostic Analysis</span>
      </div>

      {/* Main Title */}
      <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
        Calibrating Your Readiness Scorecard
      </h2>
      <p className="text-sm text-slate-300 mt-2 max-w-lg leading-relaxed">
        Our diagnostic engine is evaluating your responses against statutory CPF regulations, MAS advisory guidelines, and decumulation math.
      </p>

      {/* Progress Bar Container */}
      <div className="w-full mt-8 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl text-left">
        <div className="flex items-center justify-between text-xs mb-2.5">
          <span className="font-semibold text-slate-200 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Diagnostic Calculation</span>
          </span>
          <span className="font-mono font-bold text-amber-400 text-sm">{progress}%</span>
        </div>

        {/* Outer Bar */}
        <div className="w-full h-2.5 rounded-full bg-slate-950 border border-slate-800 overflow-hidden p-0.5 shadow-inner">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 via-amber-400 to-yellow-400 transition-all duration-150 ease-out shadow-[0_0_12px_rgba(245,158,11,0.5)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Current status message ticker */}
        <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
          <div className="w-2 h-2 rounded-full bg-amber-400 animate-ping shrink-0" />
          <span className="italic font-medium text-slate-300 truncate">{statusMessage}</span>
        </div>

        {/* Step-by-Step Calibration Milestones */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 space-y-3">
          {CALIBRATION_STEPS.map((step) => {
            const isCompleted = progress >= step.minProgress;
            const isCurrent = progress < step.minProgress && progress >= step.minProgress - 25;

            return (
              <div
                key={step.id}
                className={`flex items-start gap-3 p-2.5 rounded-xl transition-all duration-300 ${
                  isCompleted
                    ? 'bg-slate-950/50 border border-emerald-500/20 text-slate-200'
                    : isCurrent
                    ? 'bg-amber-500/5 border border-amber-500/20 text-slate-300'
                    : 'opacity-40 text-slate-300'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 animate-fadeIn" />
                  ) : (
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center text-[9px] font-bold ${
                        isCurrent
                          ? 'border-amber-400 text-amber-400 animate-pulse'
                          : 'border-slate-700 text-slate-600'
                      }`}
                    >
                      {step.id}
                    </div>
                  )}
                </div>

                <div className="flex-1 text-left">
                  <div className="text-xs font-semibold flex items-center justify-between">
                    <span className={isCompleted ? 'text-white' : isCurrent ? 'text-amber-300' : 'text-slate-300'}>
                      {step.label}
                    </span>
                    {isCompleted && (
                      <span className="text-[10px] text-emerald-400 font-mono font-medium">Verified</span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-300 mt-0.5 leading-snug">
                    {step.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Trust & Privacy Note */}
      <div className="mt-6 flex items-center justify-between w-full max-w-2xl px-2 text-[11px] text-slate-300">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
          MAS-Compliant Objective Scoring Algorithm
        </span>
        <button
          type="button"
          onClick={onComplete}
          className="text-slate-300 hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
        >
          Skip animation
        </button>
      </div>
    </div>
  );
};
