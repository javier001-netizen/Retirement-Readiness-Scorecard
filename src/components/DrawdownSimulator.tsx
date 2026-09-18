import React, { useState } from 'react';
import { ShieldCheck, TrendingUp, AlertTriangle, ArrowRight, Layers, HelpCircle } from 'lucide-react';

export const DrawdownSimulator: React.FC = () => {
  const [strategyMode, setStrategyMode] = useState<'uncoordinated' | 'optimized'>('optimized');
  const [selectedMilestone, setSelectedMilestone] = useState<number>(65);

  const milestones = [
    {
      age: 55,
      label: 'Age 55',
      title: 'RA Creation & CPF SA Closure',
      uncoordinated:
        'Withdrawing cash erratically without understanding the SA closure shift, leaving funds in low-yield 0.05% bank accounts.',
      optimized:
        'CPF Retirement Account (RA) formed to meet Full or Enhanced Retirement Sum (FRS/ERS). Non-RA funds deployed into high-yield short-term instruments.',
      taxImpact: '0% Tax',
      liquidityLevel: 'High Liquidity Buffer',
    },
    {
      age: 62,
      label: 'Age 62–63',
      title: 'SRS 10-Year Window Starts',
      uncoordinated:
        'Withdrawing large lump sums from SRS in 2–3 years, pushing taxable income into Singapore’s 15%–22% tax brackets.',
      optimized:
        'Staging SRS withdrawals across the full 10-year window (under S$40,000/year) to utilize the 50% tax exemption, paying $0 income tax.',
      taxImpact: strategyMode === 'optimized' ? 'S$0 Tax Incurred' : 'Heavy Tax Friction (~S$18,000+)',
      liquidityLevel: 'Tax-Exempt Tranche',
    },
    {
      age: 65,
      label: 'Age 65',
      title: 'CPF LIFE Floor Commences',
      uncoordinated:
        'Selling equities to fund living expenses while leaving CPF LIFE unoptimized, crystallising losses if a market correction occurs.',
      optimized:
        'CPF LIFE begins monthly lifelong payouts to cover 100% of baseline living costs. Investment assets remain untouched during market dips.',
      taxImpact: '100% Tax-Free Payouts',
      liquidityLevel: 'Guaranteed Lifetime Floor',
    },
    {
      age: 75,
      label: 'Age 75+',
      title: 'Longevity & Legacy Phase',
      uncoordinated:
        'Portfolio suffering from Sequence-of-Returns exhaustion; forced to downsize property or rely on children for healthcare needs.',
      optimized:
        'Growth portfolio preserved through market cycles. Capital longevity extended by 7 to 9 years with complete financial dignity.',
      taxImpact: 'Generational Preservation',
      liquidityLevel: 'Resilient Surplus',
    },
  ];

  const currentMilestone = milestones.find((m) => m.age === selectedMilestone) || milestones[2];

  return (
    <div className="w-full bg-slate-900/90 rounded-2xl p-5 md:p-6 border border-slate-700/80 shadow-xl">
      {/* Header with Title & Strategy Toggle */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white tracking-tight">
              Interactive Singapore Drawdown Simulator
            </h3>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Simulate how the chronological order of account withdrawals transforms capital longevity.
          </p>
        </div>

        {/* Strategy Switcher */}
        <div className="inline-flex p-1 bg-slate-950 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => setStrategyMode('uncoordinated')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              strategyMode === 'uncoordinated'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Uncoordinated Drawdown
          </button>
          <button
            type="button"
            onClick={() => setStrategyMode('optimized')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              strategyMode === 'optimized'
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Sequence-Optimised Waterfall
          </button>
        </div>
      </div>

      {/* Comparative Capital Longevity Visual Metric */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5 p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
        <div>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-slate-400 font-medium">Estimated Capital Longevity</span>
            <span
              className={`font-bold ${
                strategyMode === 'optimized' ? 'text-amber-400 text-sm' : 'text-rose-400 text-sm'
              }`}
            >
              {strategyMode === 'optimized' ? '31+ Years (Age 96+)' : '23 Years (Age 88)'}
            </span>
          </div>
          {/* Visual Progress Bar */}
          <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden flex">
            <div
              className={`h-full transition-all duration-700 rounded-full ${
                strategyMode === 'optimized'
                  ? 'w-[95%] bg-gradient-to-r from-amber-500 to-emerald-400 shadow-[0_0_10px_rgba(245,158,11,0.5)]'
                  : 'w-[68%] bg-gradient-to-r from-rose-600 to-amber-600'
              }`}
            />
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            {strategyMode === 'optimized'
              ? 'Sequence ordering adds an estimated ~8 additional years of portfolio resilience with the exact same initial capital.'
              : 'Premature selling in market down-cycles triggers avoidable portfolio exhaustion.'}
          </p>
        </div>

        <div className="flex flex-col justify-center border-t md:border-t-0 md:border-l border-slate-800 md:pl-4 pt-3 md:pt-0">
          <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
            Core Behavioral Insight
          </div>
          <p className="text-xs text-slate-200 leading-relaxed italic">
            {strategyMode === 'optimized'
              ? '“By letting CPF LIFE cover the baseline floor, you eliminate the emotional impulse to panic-sell dividend equities in market downturns.”'
              : '“Without a structured waterfall, investors inadvertently withdraw from their most volatile assets at the worst possible market moments.”'}
          </p>
        </div>
      </div>

      {/* Interactive Milestone Timeline */}
      <div className="mt-4">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
          Click an age to examine the Singapore decumulation trigger:
        </div>
        <div className="grid grid-cols-4 gap-2">
          {milestones.map((m) => {
            const isSelected = m.age === selectedMilestone;
            return (
              <button
                key={m.age}
                type="button"
                onClick={() => setSelectedMilestone(m.age)}
                className={`py-2 px-2 rounded-xl text-center transition-all border ${
                  isSelected
                    ? 'bg-blue-600/30 border-blue-400 text-white shadow-[0_0_12px_rgba(59,130,246,0.3)]'
                    : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <div className={`text-xs md:text-sm font-bold ${isSelected ? 'text-blue-300' : 'text-slate-300'}`}>
                  {m.label}
                </div>
                <div className="text-[10px] truncate opacity-80">{m.title.split('&')[0]}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Milestone Drill-down Card */}
      <div className="mt-4 p-4 rounded-xl bg-slate-800/70 border border-slate-700">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse"></span>
            <span className="text-sm font-bold text-white">
              {currentMilestone.label}: {currentMilestone.title}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">Tax Friction:</span>
            <span
              className={`font-semibold px-2 py-0.5 rounded ${
                strategyMode === 'optimized'
                  ? 'bg-emerald-900/50 text-emerald-300 border border-emerald-700/50'
                  : 'bg-rose-900/50 text-rose-300 border border-rose-700/50'
              }`}
            >
              {currentMilestone.taxImpact}
            </span>
          </div>
        </div>

        <div className="mt-3 text-xs md:text-sm text-slate-300 leading-relaxed">
          {strategyMode === 'optimized' ? (
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{currentMilestone.optimized}</span>
            </div>
          ) : (
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>{currentMilestone.uncoordinated}</span>
            </div>
          )}
        </div>
      </div>

      <p className="text-[10px] text-slate-400 mt-3 italic text-center">
        Illustrative educational model. Actual retirement longevity is subject to market variability, individual drawdown rates, and CPF statutory terms.
      </p>
    </div>
  );
};
