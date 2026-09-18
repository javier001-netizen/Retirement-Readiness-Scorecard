import React from 'react';
import { ShieldCheck, Lock, ExternalLink } from 'lucide-react';

interface FooterProps {
  onOpenCompliance: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCompliance }) => {
  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800/80 py-8 px-4 sm:px-6 text-slate-400 mt-auto">
      <div className="max-w-6xl mx-auto space-y-4">
        {/* Primary Identification Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-900">
          <div className="text-xs text-slate-400">
            <span className="font-semibold text-white">Retirement Readiness Scorecard</span>
            <span className="mx-2">•</span>
            <span>Singapore Educational Self-Assessment Diagnostic</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button
              type="button"
              onClick={onOpenCompliance}
              className="text-amber-400/90 hover:text-amber-300 underline underline-offset-2 flex items-center gap-1 transition-colors"
            >
              <span>MAS Disclosures & PDPA Policy</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Regulatory Disclaimer Text */}
        <div className="text-[11px] text-slate-400 leading-relaxed space-y-1.5">
          <p>
            <strong className="text-slate-400">Regulatory Disclaimer:</strong> This interactive scorecard is an educational self-assessment tool designed for general information purposes only. In strict compliance with the Monetary Authority of Singapore (MAS) Financial Advisers Act (Cap. 110), this platform does not provide specific investment advice, personal financial recommendations, or product endorsements.
          </p>
          <p>
            Past performance and illustrative decumulation scenarios are not indicative of future performance. Actual outcomes depend on individual expenditure, longevity, statutory CPF regulations, and macroeconomic conditions. Consult a licensed representative to evaluate your specific situation.
          </p>
        </div>

        {/* Trust Badges & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 text-[10px] text-slate-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              Singapore FAA Regulated
            </span>
            <span className="flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              PDPA 2012 Encrypted
            </span>
          </div>
          <div>
            © {new Date().getFullYear()} Retirement Readiness Scorecard. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
