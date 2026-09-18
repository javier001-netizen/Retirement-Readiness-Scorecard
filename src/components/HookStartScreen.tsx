import React from 'react';
import { ArrowRight, Shield, Clock, Lock, Sparkles, CheckCircle2 } from 'lucide-react';

interface HookStartScreenProps {
  onStart: () => void;
}

export const HookStartScreen: React.FC<HookStartScreenProps> = ({ onStart }) => {
  return (
    <div className="w-full max-w-4xl mx-auto py-8 md:py-14 px-4 sm:px-6 flex flex-col items-center text-center">
      {/* Discreet Trust Pill */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/70 border border-blue-800/60 text-blue-300 text-xs font-semibold mb-6 shadow-sm">
        <Shield className="w-3.5 h-3.5 text-amber-400" />
        <span>MAS-Compliant Educational Diagnostic for Singapore Executives</span>
      </div>

      {/* Main Headline & Sub-headline */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight max-w-3xl leading-[1.15]">
        In 2 minutes, discover the <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500">3 numbers</span> that shape your retirement confidence.
      </h1>

      <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mt-5 font-normal leading-relaxed">
        A private, educational self-check for Singapore professionals.
      </p>

      {/* Contextual Value Proposition Card */}
      <div className="w-full max-w-2xl mt-8 p-5 sm:p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-2xl text-left">
        <div className="text-xs uppercase tracking-wider text-amber-400 font-bold mb-3 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>What this diagnostic illuminates:</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-xs text-slate-300">
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col justify-between">
            <span className="text-amber-300 font-bold text-sm mb-1">01. The Floor</span>
            <p className="text-slate-300 leading-snug">
              How your CPF LIFE payouts form a guaranteed non-negotiable living floor.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col justify-between">
            <span className="text-amber-300 font-bold text-sm mb-1">02. The Sequence</span>
            <p className="text-slate-300 leading-snug">
              Why the chronological order of account withdrawals outlasts total balance.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col justify-between">
            <span className="text-amber-300 font-bold text-sm mb-1">03. The Tax Gap</span>
            <p className="text-slate-300 leading-snug">
              How to avoid heavy tax friction when tapping SRS across the 10-year window.
            </p>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            No product push or sales pressure
          </span>
          <span className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-blue-400" />
            Zero bank login credentials required
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            Takes approximately 2 minutes
          </span>
        </div>
      </div>

      {/* Single CTA Button */}
      <div className="mt-8 flex flex-col items-center">
        <button
          type="button"
          onClick={onStart}
          className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 font-bold text-base sm:text-lg shadow-[0_0_25px_rgba(245,158,11,0.35)] hover:shadow-[0_0_35px_rgba(245,158,11,0.5)] hover:scale-[1.02] active:scale-[0.99] transition-all duration-200 cursor-pointer"
        >
          <span>Begin My Check</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
