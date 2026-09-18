import React, { useEffect, useState } from 'react';
import { ShieldCheck, Cpu, Database, CheckCircle2 } from 'lucide-react';

interface BufferingScreenProps {
  onComplete: () => void;
}

export const BufferingScreen: React.FC<BufferingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState<number>(0);
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(0);

  const stages = [
    { text: 'Calibrating your profile…', icon: Cpu, subtext: 'Setting up diagnostic parameters for Singapore executive benchmarks' },
    { text: 'Cross-referencing general retirement patterns…', icon: Database, subtext: 'Reviewing statutory CPF LIFE tiers, SRS frameworks, and longevity curves' },
    { text: 'Preparing your scorecard…', icon: ShieldCheck, subtext: 'Establishing private educational self-check workspace' },
  ];

  useEffect(() => {
    // Total duration: 3.8 seconds
    const totalDuration = 3800;
    const intervalTime = 40;
    const step = 100 / (totalDuration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onComplete();
          }, 350);
          return 100;
        }

        if (next < 35) {
          setCurrentStageIndex(0);
        } else if (next < 75) {
          setCurrentStageIndex(1);
        } else {
          setCurrentStageIndex(2);
        }

        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  const CurrentIcon = stages[currentStageIndex].icon;

  return (
    <div className="w-full max-w-xl mx-auto py-16 px-4 sm:px-6 flex flex-col items-center justify-center text-center">
      {/* Animated Center Symbol */}
      <div className="relative mb-8">
        <div className="w-20 h-20 rounded-2xl bg-blue-900/40 border border-blue-500/30 flex items-center justify-center text-amber-400 shadow-[0_0_30px_rgba(37,99,235,0.3)]">
          <CurrentIcon className="w-9 h-9 animate-pulse text-amber-400" />
        </div>
        <div className="absolute -inset-2 rounded-3xl border border-amber-400/20 animate-ping opacity-30 pointer-events-none" />
      </div>

      {/* Cycling Micro-copy Text */}
      <div className="min-h-[72px] flex flex-col items-center justify-center">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight transition-all duration-300">
          {stages[currentStageIndex].text}
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-md transition-opacity duration-300">
          {stages[currentStageIndex].subtext}
        </p>
      </div>

      {/* Engaging Loading Bar */}
      <div className="w-full max-w-md mt-8">
        <div className="flex justify-between items-center text-xs font-semibold text-slate-400 mb-2">
          <span className="flex items-center gap-1.5 text-blue-400">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
            Synchronising diagnostic matrix
          </span>
          <span className="text-amber-400 font-mono text-sm">{Math.min(100, Math.round(progress))}%</span>
        </div>

        <div className="w-full h-3.5 bg-slate-900 rounded-full p-0.5 border border-slate-700/80 shadow-inner overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-600 via-amber-400 to-amber-300 transition-all ease-out duration-75 shadow-[0_0_12px_rgba(245,158,11,0.6)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Neurological Pattern Interrupt Note */}
      <div className="mt-8 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
        <span>Calibrating against Singapore statutory age milestones (55, 62, 65)</span>
      </div>
    </div>
  );
};
