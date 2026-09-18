import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  ShieldCheck,
  Download,
  MessageCircle,
  Coffee,
  Sparkles,
  Lock,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Layers,
  FileCheck,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';
import { AssessmentResult, LeadFormData, UserAnswers } from '../types';
import { PDPA_CONSENT_TEXT } from '../data/questions';
import { RadarChart } from './RadarChart';
import { DrawdownSimulator } from './DrawdownSimulator';

interface ResultScreenProps {
  result: AssessmentResult;
  answers: UserAnswers;
  onRetake: () => void;
  onOpenCompliance: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  result,
  answers,
  onRetake,
  onOpenCompliance,
}) => {
  const [formData, setFormData] = useState<LeadFormData>({
    fullName: '',
    email: '',
    whatsapp: '+65 ',
    consentGiven: false,
  });

  const [formErrors, setFormErrors] = useState<{ [k: string]: string }>({});
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'visual' | 'simulator'>('visual');

  const handleWhatsappChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (!val.startsWith('+65')) {
      val = '+65 ' + val.replace(/^\+?65\s*/, '');
    }
    setFormData({ ...formData, whatsapp: val });
  };

  const validateForm = (): boolean => {
    const errors: { [k: string]: string } = {};

    if (!formData.fullName.trim()) {
      errors.fullName = 'Please enter your full name.';
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      errors.email = 'Please provide a valid corporate or personal email.';
    }

    const cleanNumber = formData.whatsapp.replace(/\D/g, '');
    // Expect 65 followed by 8 digits (total 10 digits)
    if (cleanNumber.length < 10) {
      errors.whatsapp = 'Please enter a valid Singapore mobile number (8 digits).';
    }

    if (!formData.consentGiven) {
      errors.consent = 'Your explicit consent is required under Singapore PDPA regulations.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsUnlocked(true);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f59e0b', '#3b82f6', '#10b981'],
        });
      } catch {
        // fail silently
      }
    }, 600);
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-6 sm:py-10 px-4 sm:px-6">
      {/* Top Title & Indicator */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-amber-400 font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Diagnostic Evaluation Complete</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Your Readiness Indicator: <span className="text-amber-400">{result.overallScore} / 10</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1.5">
          Self-assessment classification: <strong className="text-white">{result.scoreBand}</strong>
        </p>
      </div>

      {/* Pattern Interruption / Counter-Intuitive Insight Box */}
      <div className="mb-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-amber-500/15 via-blue-950/40 to-slate-900 border border-amber-400/40 shadow-xl">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 shrink-0 mt-0.5">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs uppercase font-bold tracking-wider text-amber-400 mb-1">
              Counter-Intuitive Behavioral Financial Insight
            </div>
            <p className="text-base sm:text-lg font-bold text-white leading-snug">
              “{result.counterIntuitiveInsight}”
            </p>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              In Singapore’s unique multi-tiered system (Cash, CPF Ordinary/Special/Retirement Accounts, and SRS), withdrawing in an uncoordinated order prematurely triggers tax friction and exposes portfolios to severe bear-market losses.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Visualisation Section */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-8 shadow-2xl mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Interactive Diagnostic Breakdown
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Explore your 4 readiness dimensions and test the Singapore decumulation sequence timeline.
            </p>
          </div>

          {/* Interactive Visualisation View Selector */}
          <div className="inline-flex p-1 bg-slate-950 rounded-xl border border-slate-800 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setActiveTab('visual')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'visual'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              4-Pillar Radar Matrix
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('simulator')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'simulator'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Drawdown Timeline Simulator
            </button>
          </div>
        </div>

        {/* Tab 1: 4-Pillar Radar Chart & Breakdown */}
        {activeTab === 'visual' && (
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 flex justify-center">
              <RadarChart result={result} />
            </div>

            <div className="lg:col-span-7 space-y-3">
              <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
                Detailed Diagnostic Dimensions:
              </div>

              {Object.values(result.dimensions).map((dim) => (
                <div
                  key={dim.name}
                  className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-bold text-white">{dim.name}</span>
                    <span
                      className="text-xs font-extrabold px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: `${dim.color}20`, color: dim.color }}
                    >
                      {dim.score} / 10
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1 leading-snug">{dim.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Interactive Drawdown Simulator */}
        {activeTab === 'simulator' && (
          <div className="mt-6">
            <DrawdownSimulator />
          </div>
        )}

        {/* General Assessment Disclaimer under the visualizer */}
        <div className="mt-6 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-[11px] text-slate-400 leading-relaxed flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
          <span>
            {result.bandDescription}
          </span>
        </div>
      </div>

      {/* LEAD CAPTURE / GATED UNLOCKED STATE */}
      {!isUnlocked ? (
        <div className="bg-gradient-to-b from-slate-900 to-blue-950/50 border border-amber-400/40 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-semibold mb-3">
              <Lock className="w-3.5 h-3.5" />
              <span>Personalised Diagnostic Roadmap Waiting</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Unlock Your Detailed “Next Steps” & Singapore Execution Guide
            </h2>

            {/* Future Pacing Copy */}
            <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed italic">
              “Imagine waking up 10 years from now, knowing you made this simple check today. That peace of mind starts here.”
            </p>

            <p className="text-xs text-slate-400 mt-2">
              Receive your bespoke breakdown of the 3 numbers shaping your confidence, complete with an objective CPF LIFE and SRS coordination checklist.
            </p>

            {/* Lead Capture Form */}
            <form onSubmit={handleSubmitLead} className="mt-8 text-left space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Full Name <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rachel Lim"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl bg-slate-950 border text-white text-sm focus:outline-none transition-colors ${
                    formErrors.fullName ? 'border-rose-500 focus:border-rose-500' : 'border-slate-700 focus:border-amber-400'
                  }`}
                />
                {formErrors.fullName && (
                  <p className="text-rose-400 text-[11px] mt-1">{formErrors.fullName}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Work / Personal Email <span className="text-amber-400">*</span>
                </label>
                <input
                  type="email"
                  placeholder="e.g. rachel.lim@company.sg"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl bg-slate-950 border text-white text-sm focus:outline-none transition-colors ${
                    formErrors.email ? 'border-rose-500 focus:border-rose-500' : 'border-slate-700 focus:border-amber-400'
                  }`}
                />
                {formErrors.email && (
                  <p className="text-rose-400 text-[11px] mt-1">{formErrors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  WhatsApp Number (with Singapore country code +65) <span className="text-amber-400">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.whatsapp}
                  onChange={handleWhatsappChange}
                  placeholder="+65 9123 4567"
                  className={`w-full px-4 py-3 rounded-xl bg-slate-950 border text-white text-sm font-mono focus:outline-none transition-colors ${
                    formErrors.whatsapp ? 'border-rose-500 focus:border-rose-500' : 'border-slate-700 focus:border-amber-400'
                  }`}
                />
                {formErrors.whatsapp && (
                  <p className="text-rose-400 text-[11px] mt-1">{formErrors.whatsapp}</p>
                )}
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Used solely to transmit your scorecard summary and optional PDF download link.
                </span>
              </div>

              {/* PDPA Compliant Explicit Opt-in Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={formData.consentGiven}
                    onChange={(e) => setFormData({ ...formData, consentGiven: e.target.checked })}
                    className="mt-1 w-4 h-4 rounded border-slate-700 bg-slate-950 text-amber-500 focus:ring-amber-400 focus:ring-offset-slate-900 cursor-pointer"
                  />
                  <span className="text-xs text-slate-300 leading-relaxed select-none group-hover:text-white">
                    I agree to be contacted for a no-obligation, educational conversation about my results. I understand this is not financial advice.
                  </span>
                </label>
                {formErrors.consent && (
                  <p className="text-rose-400 text-[11px] mt-1.5">{formErrors.consent}</p>
                )}
              </div>

              {/* Submit CTA */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 font-bold text-base shadow-[0_0_20px_rgba(245,158,11,0.35)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{isSubmitting ? 'Generating Your Personalized Guide...' : 'Unlock My Complete Roadmap & Next Steps'}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400 pt-2">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                  PDPA Strict Privacy Guarantee
                </span>
                <span>•</span>
                <span>No Third-Party Brokers</span>
                <span>•</span>
                <span>No Obligation</span>
              </div>
            </form>
          </div>
        </div>
      ) : (
        /* UNLOCKED STATE: THE 3 NUMBERS & NEXT STEPS ROADMAP */
        <div className="bg-slate-900/90 border border-emerald-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 animate-fadeIn">
          {/* Success Banner */}
          <div className="p-4 sm:p-5 rounded-2xl bg-emerald-950/60 border border-emerald-600/40 flex items-start gap-3.5">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <div className="text-xs uppercase tracking-wider text-emerald-400 font-bold">
                Profile Unlocked for {formData.fullName}
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
                Your Executive Retirement Architecture Roadmap
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                A summary copy has been prepared for <strong className="text-white">{formData.email}</strong> and WhatsApp dispatch to <strong className="text-white">{formData.whatsapp}</strong>.
              </p>
            </div>
          </div>

          {/* Reveal: The 3 Numbers that Shape Your Confidence */}
          <div>
            <div className="text-xs uppercase font-bold tracking-wider text-amber-400 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>The 3 Numbers That Shape Your Retirement Confidence:</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Your Personalised Blueprint Pillars
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
              {/* Number 1: The Guaranteed Floor */}
              <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-bold mb-3">
                    01
                  </div>
                  <h4 className="text-base font-bold text-white">Your Guaranteed Floor</h4>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    The exact monthly non-negotiable income guaranteed by CPF LIFE (Enhanced Retirement Sum ~S$3,300/mo or Full Retirement Sum ~S$1,700/mo).
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-amber-300 font-medium">
                  → Target: 100% of baseline living costs covered without selling investments.
                </div>
              </div>

              {/* Number 2: The Decumulation Sequence Gap */}
              <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center text-sm font-bold mb-3">
                    02
                  </div>
                  <h4 className="text-base font-bold text-white">The Drawdown Sequence</h4>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    The multi-year chronological order: drawing cash buffers first, tapping SRS within the 10-year 50% tax exemption, and delaying equities withdrawals.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-amber-300 font-medium">
                  → Impact: Adds an estimated 6–9 years of portfolio resilience.
                </div>
              </div>

              {/* Number 3: The Longevity & Medical Buffer */}
              <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm font-bold mb-3">
                    03
                  </div>
                  <h4 className="text-base font-bold text-white">The Healthcare Buffer</h4>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    Protecting against Singapore medical inflation (averaging 9–11% per annum) with Medisave-approved integrated shields and CareShield Life.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-amber-300 font-medium">
                  → Goal: Zero disruption to children or legacy assets for healthcare events.
                </div>
              </div>
            </div>
          </div>

          {/* Actionable Next Steps Checklist */}
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-950/80 border border-slate-800">
            <h4 className="text-base font-bold text-white mb-3">
              Your Recommended Next 3 Actions (General Educational Guidelines)
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Log in to My CPF Portal:</strong> Verify whether your Retirement Account (RA) projection tracks toward the Enhanced Retirement Sum (ERS) ceiling (S$426,000 in 2025 onwards).
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Plan the SRS 10-Year Exit Window:</strong> Map your SRS withdrawals to commence at statutory retirement age, capping annual distributions under S$40,000 to keep taxable amounts at $0.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Consolidate Dispersed Accounts:</strong> Conduct a clean inventory of your bank deposits, unit trusts, and brokerage balances into a structured Cash-Income-Growth waterfall.
                </span>
              </li>
            </ul>
          </div>

          {/* Relatable Singapore Reality Check & Friendly WhatsApp Chat */}
          <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/30 border border-amber-500/25 shadow-xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-start gap-4 max-w-xl text-left">
                <div className="w-11 h-11 rounded-2xl bg-amber-500/15 border border-amber-400/30 text-amber-400 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <Coffee className="w-5 h-5" />
                </div>
                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-400">
                    <span>A Quick Singapore Reality Check</span>
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug">
                    “I have savings in CPF and investments, but what will my actual cash-in-hand look like each month?”
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Almost every Singaporean in their 40s and 50s shares this exact dilemma. No sales pitch, no boring product brochures—just an honest second opinion over WhatsApp to sanity-check your numbers in plain English.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto shrink-0">
                <a
                  href={`https://wa.me/6591234567?text=${encodeURIComponent(
                    `Hi! I just completed the Retirement Readiness Scorecard (scored ${result.overallScore}/10 - ${result.scoreBand}) and wanted to ask a quick, casual question about my CPF LIFE and monthly cashflow numbers.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm shadow-[0_0_16px_rgba(16,185,129,0.3)] hover:shadow-[0_0_24px_rgba(16,185,129,0.5)] transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Ask on WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold text-xs border border-slate-700/80 transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Save PDF</span>
                </button>
              </div>
            </div>
          </div>

          {/* Retake Button */}
          <div className="flex justify-center pt-2">
            <button
              type="button"
              onClick={onRetake}
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retake Diagnostic Assessment</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
