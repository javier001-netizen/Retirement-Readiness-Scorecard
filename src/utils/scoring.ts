import { QUESTIONS } from '../data/questions';
import { AssessmentResult, UserAnswers, DimensionScore } from '../types';

export function calculateReadinessScore(answers: UserAnswers): AssessmentResult {
  // Extract scores for individual questions
  // Q1: Age (weighting / baseline)
  // Q2: Trajectory (1-5 scaled to 2-10)
  // Q3: CPF LIFE (2, 4, 7, 10)
  // Q4: Spending need (3, 5, 8, 10)
  // Q5: Coordination (2, 5, 8, 10)
  // Q6: Tax & SRS (2, 5, 8, 10)
  // Q7: Decumulation Sequence (2, 4, 8, 10)

  const getQuestionScore = (qId: number): number => {
    const question = QUESTIONS.find((q) => q.id === qId);
    if (!question) return 5;
    const answerVal = answers[qId];
    if (answerVal === undefined || answerVal === null) return 5;

    const opt = question.options.find((o) => o.id === String(answerVal));
    return opt ? opt.score : 5;
  };

  const q1Score = getQuestionScore(1);
  const q2Score = getQuestionScore(2);
  const q3Score = getQuestionScore(3);
  const q4Score = getQuestionScore(4);
  const q5Score = getQuestionScore(5);
  const q6Score = getQuestionScore(6);
  const q7Score = getQuestionScore(7);

  // Dimension 1: Guaranteed CPF LIFE & Essential Cashflow Floor (Q3 & Q4)
  const cpfScoreVal = Number(((q3Score * 0.6 + q4Score * 0.4)).toFixed(1));
  const cpfFoundation: DimensionScore = {
    name: 'Guaranteed CPF LIFE & Cash Flow Floor',
    shortName: 'CPF & Income Floor',
    score: cpfScoreVal,
    description: 'Measures how reliably your guaranteed annuities and baseline cash flow cover non-negotiable living expenses after age 65.',
    insight:
      cpfScoreVal < 6
        ? 'A common vulnerability for Singapore professionals is having high capital but unclear lifetime annuity streams, leaving monthly income exposed to market swings.'
        : 'You have a healthy awareness of how CPF LIFE forms the core anchor of your retirement dignity, shielding you from longevity risk.',
    status: cpfScoreVal < 5 ? 'Needs Structure' : cpfScoreVal < 7.5 ? 'Emerging Clarity' : 'Strong Foundation',
    color: '#0284c7', // Sky / Cyan blue
  };

  // Dimension 2: Decumulation Sequence & Order of Drawdown (Q7 & Q1)
  const decumScoreVal = Number(((q7Score * 0.8 + q1Score * 0.2)).toFixed(1));
  const decumulationSequence: DimensionScore = {
    name: 'Decumulation Sequence & Order Strategy',
    shortName: 'Drawdown Sequence',
    score: decumScoreVal,
    description: 'Evaluates whether your withdrawal sequence shields you from Sequence-of-Returns risk during market contractions.',
    insight:
      decumScoreVal < 6
        ? 'Drawing down from accounts in the wrong chronological order can prematurely deplete your portfolio by up to 5–7 years, regardless of total starting balance.'
        : 'Your strategic mindset accounts for market volatility buffers, ensuring equities do not have to be liquidated during severe downturns.',
    status: decumScoreVal < 5 ? 'Needs Structure' : decumScoreVal < 7.5 ? 'Emerging Clarity' : 'Strong Foundation',
    color: '#d97706', // Soft Amber / Gold
  };

  // Dimension 3: Tax & SRS Optimization Efficiency (Q6 & Q4)
  const taxScoreVal = Number(((q6Score * 0.7 + q4Score * 0.3)).toFixed(1));
  const taxEfficiency: DimensionScore = {
    name: 'Tax & SRS Withdrawal Efficiency',
    shortName: 'Tax & SRS Efficiency',
    score: taxScoreVal,
    description: 'Assesses your ability to utilise the SRS 10-year penalty-free withdrawal window and mitigate foreign dividend withholding friction.',
    insight:
      taxScoreVal < 6
        ? 'Many high-earning professionals faithfully contribute to SRS for tax deductions, but accidentally incur heavy income taxes by withdrawing too quickly at retirement.'
        : 'You demonstrate acute awareness of Singapore tax exemptions, preserving hard-earned wealth through staged annual tranches.',
    status: taxScoreVal < 5 ? 'Needs Structure' : taxScoreVal < 7.5 ? 'Emerging Clarity' : 'Strong Foundation',
    color: '#10b981', // Emerald
  };

  // Dimension 4: Asset Coordination & Trajectory (Q5 & Q2)
  const coordScoreVal = Number(((q5Score * 0.6 + q2Score * 0.4)).toFixed(1));
  const assetCoordination: DimensionScore = {
    name: 'Asset Coordination & Master Blueprint',
    shortName: 'Account Coordination',
    score: coordScoreVal,
    description: 'Gauges whether your bank balances, brokerage accounts, CPF, and properties function as an integrated ecosystem.',
    insight:
      coordScoreVal < 6
        ? 'Scattered accounts across different institutions often lead to duplicate management fees, cash drag, and an unsettling lack of overall visibility.'
        : 'Your financial architecture operates with clarity and purpose, eliminating cognitive overhead and redundant cash drag.',
    status: coordScoreVal < 5 ? 'Needs Structure' : coordScoreVal < 7.5 ? 'Emerging Clarity' : 'Strong Foundation',
    color: '#6366f1', // Indigo
  };

  // Overall Weighted Score (out of 10)
  const totalWeighted = (cpfScoreVal + decumScoreVal + taxScoreVal + coordScoreVal) / 4;
  const overallScore = Number(Math.max(1, Math.min(10, totalWeighted)).toFixed(1));

  let scoreBand = 'Solid Foundation';
  let bandDescription =
    'A score in this range often suggests you have established strong earning and savings habits, but would benefit from stress-testing how your accounts are coordinated. This is general educational information, not a recommendation.';

  if (overallScore < 5.0) {
    scoreBand = 'Emerging Structure';
    bandDescription =
      'A score in this range suggests that while your income capacity is robust, your assets may be working in isolated silos. Implementing a unified order-of-withdrawal strategy can unlock substantial peace of mind. This is general educational information, not a recommendation.';
  } else if (overallScore >= 7.5) {
    scoreBand = 'Advanced Alignment';
    bandDescription =
      'A score in this range indicates sophisticated financial discipline. Your primary opportunity lies in fine-tuning tax tranches (SRS) and immunising against healthcare inflation in your golden years. This is general educational information, not a recommendation.';
  }

  const counterIntuitiveInsight =
    'You might be surprised to learn that your retirement number is less about the total balance and more about the order you draw from it.';

  const recommendedFocusAreas = [
    'Locking in your guaranteed monthly income floor before relying on volatile market withdrawals',
    'Aligning your Supplementary Retirement Scheme (SRS) 10-year drawdown with the statutory retirement age',
    'Consolidating fragmented bank and brokerage holdings into a 3-tier waterfall structure (Cash, Income, Growth)',
  ];

  return {
    overallScore,
    scoreBand,
    bandDescription,
    counterIntuitiveInsight,
    dimensions: {
      cpfFoundation,
      decumulationSequence,
      taxEfficiency,
      assetCoordination,
    },
    recommendedFocusAreas,
  };
}
