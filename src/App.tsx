/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ScreenStage, UserAnswers } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HookStartScreen } from './components/HookStartScreen';
import { BufferingScreen } from './components/BufferingScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultsCalibrationScreen } from './components/ResultsCalibrationScreen';
import { ResultScreen } from './components/ResultScreen';
import { ComplianceModal } from './components/ComplianceModal';
import { calculateReadinessScore } from './utils/scoring';

export default function App() {
  const [stage, setStage] = useState<ScreenStage>('hook');
  const [answers, setAnswers] = useState<UserAnswers>({
    1: '40-49',
    2: '3',
    3: 'cpf-2',
    4: 'spend-2',
    5: 'coord-2',
    6: 'tax-2',
    7: 'seq-2',
  });
  const [isComplianceOpen, setIsComplianceOpen] = useState<boolean>(false);

  const handleStart = () => {
    // Screen 1 -> Screen 2 (Buffering pattern interrupt)
    setStage('buffering');
  };

  const handleBufferingComplete = () => {
    // Screen 2 -> Screen 3 (The 7-Question Scorecard)
    setStage('quiz');
  };

  const handleUpdateAnswer = (questionId: number, value: string | number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleFinishQuiz = () => {
    // Screen 3 -> Calibration -> Screen 4 (Result & Lead Capture)
    setStage('calibrating-results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCalibrationComplete = () => {
    setStage('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetake = () => {
    setStage('hook');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const result = calculateReadinessScore(answers);

  const getStepLabel = (): string => {
    switch (stage) {
      case 'hook':
        return 'Overview';
      case 'buffering':
        return 'Calibrating';
      case 'quiz':
        return 'Self-Assessment';
      case 'calibrating-results':
        return 'Analyzing Diagnostic';
      case 'result':
        return 'Scorecard Report';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#09121f] text-slate-100 selection:bg-amber-500 selection:text-slate-950 font-sans relative overflow-x-hidden">
      {/* Background Ambience Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-gradient-to-b from-blue-900/20 via-indigo-950/10 to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-amber-500/5 blur-[120px]" />
      </div>

      {/* Header with MAS Regulated identifier and compliance toggle */}
      <Header
        onOpenCompliance={() => setIsComplianceOpen(true)}
        currentStep={getStepLabel()}
      />

      {/* Main Container */}
      <main className="flex-1 flex flex-col justify-center relative z-10">
        {stage === 'hook' && <HookStartScreen onStart={handleStart} />}

        {stage === 'buffering' && (
          <BufferingScreen onComplete={handleBufferingComplete} />
        )}

        {stage === 'quiz' && (
          <QuizScreen
            answers={answers}
            onUpdateAnswer={handleUpdateAnswer}
            onFinishQuiz={handleFinishQuiz}
          />
        )}

        {stage === 'calibrating-results' && (
          <ResultsCalibrationScreen onComplete={handleCalibrationComplete} />
        )}

        {stage === 'result' && (
          <ResultScreen
            result={result}
            answers={answers}
            onRetake={handleRetake}
            onOpenCompliance={() => setIsComplianceOpen(true)}
          />
        )}
      </main>

      {/* Mandatory MAS Footer present on EVERY screen */}
      <Footer onOpenCompliance={() => setIsComplianceOpen(true)} />

      {/* Compliance & PDPA Disclosure Modal */}
      <ComplianceModal
        isOpen={isComplianceOpen}
        onClose={() => setIsComplianceOpen(false)}
      />
    </div>
  );
}
