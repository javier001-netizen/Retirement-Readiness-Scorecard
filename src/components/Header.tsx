import React from 'react';
import { ShieldCheck, Lock } from 'lucide-react';

interface HeaderProps {
  onOpenCompliance: () => void;
  currentStep?: string;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCompliance, currentStep }) => {
  return (
    <header className="w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 sticky top-0 z-40 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Title */}
        <div className="flex items-center gap-2.5">
          <span className="font-bold text-white text-sm sm:text-base tracking-tight">
            Retirement Readiness Scorecard
          </span>
        </div>

        {/* Right Status / Trust Indicator */}
        <div className="flex items-center gap-3 sm:gap-4">
          {currentStep && (
            <span className="text-xs font-semibold text-slate-400 hidden md:inline-block px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
              {currentStep}
            </span>
          )}

          <div className="flex items-center gap-1.5 text-xs text-slate-300">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">100% Private</span>
          </div>

          <button
            type="button"
            onClick={onOpenCompliance}
            className="flex items-center gap-1 text-[11px] font-medium text-slate-400 hover:text-amber-400 transition-colors px-2 py-1 rounded hover:bg-slate-900"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>Disclosures</span>
          </button>
        </div>
      </div>
    </header>
  );
};
