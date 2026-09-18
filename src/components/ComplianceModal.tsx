import React from 'react';
import { X, Shield, Lock, FileText, CheckCircle2 } from 'lucide-react';
import { DEFAULT_ADVISOR, MAS_DISCLAIMER_TEXT, PDPA_CONSENT_TEXT } from '../data/questions';

interface ComplianceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ComplianceModal: React.FC<ComplianceModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl p-6 md:p-8 shadow-2xl text-slate-200 max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
          <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">MAS Regulatory Disclosures & PDPA Compliance</h2>
            <p className="text-xs text-slate-400">Financial Advisers Act (Cap. 110) & Personal Data Protection Act 2012</p>
          </div>
        </div>

        <div className="space-y-5 text-xs md:text-sm text-slate-300 mt-5 leading-relaxed">
          {/* Institutional Identification */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Institutional & Representative Identification
            </div>
            <p className="font-semibold text-white">{DEFAULT_ADVISOR.firmName} ({DEFAULT_ADVISOR.firmUen})</p>
            <p className="text-slate-400">
              Representative: {DEFAULT_ADVISOR.repName} | {DEFAULT_ADVISOR.repLicenseNo}
            </p>
            <p className="text-slate-400">{DEFAULT_ADVISOR.role} • Registered Address: {DEFAULT_ADVISOR.officeLocation}</p>
          </div>

          {/* No Financial Advice */}
          <div>
            <h3 className="font-bold text-white flex items-center gap-2 mb-1.5">
              <FileText className="w-4 h-4 text-blue-400" />
              1. Non-Advisory Educational Classification
            </h3>
            <p className="text-slate-300">{MAS_DISCLAIMER_TEXT}</p>
          </div>

          {/* Fair and Balanced */}
          <div>
            <h3 className="font-bold text-white flex items-center gap-2 mb-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              2. Fair & Balanced Presentation Standards
            </h3>
            <p className="text-slate-300">
              In adherence to the Monetary Authority of Singapore (MAS) Guidelines on the Conduct of Business for Financial Advisers, this tool presents objective, balanced insights. All quantitative projections are illustrative only and do not guarantee future returns or capital preservation.
            </p>
          </div>

          {/* PDPA Charter */}
          <div>
            <h3 className="font-bold text-white flex items-center gap-2 mb-1.5">
              <Lock className="w-4 h-4 text-amber-400" />
              3. Singapore PDPA 2012 Data Privacy Charter
            </h3>
            <p className="text-slate-300">
              Personal contact details submitted through this self-assessment are collected exclusively with your explicit consent for the stated purpose of receiving your customized Retirement Readiness Diagnostic Report. Your information is encrypted in transit and at rest, and will strictly never be shared, sold, or distributed to third-party telemarketers.
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs md:text-sm transition-all"
          >
            Acknowledge & Return
          </button>
        </div>
      </div>
    </div>
  );
};
