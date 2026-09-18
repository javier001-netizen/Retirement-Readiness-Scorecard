export type ScreenStage = 'hook' | 'buffering' | 'quiz' | 'calibrating-results' | 'result';

export type AgeBand =
  | '20-29'
  | '30-39'
  | '40-49'
  | '50-54'
  | '55-59'
  | '60-64'
  | '65+';

export interface QuestionOption {
  id: string;
  label: string;
  sublabel?: string;
  score: number; // 0 to 10 scaled or weighting
  sensoryHint?: string;
}

export interface Question {
  id: number;
  topic: string;
  category: 'Profile' | 'Trajectory' | 'CPF LIFE' | 'Cashflow' | 'Coordination' | 'Tax & SRS' | 'Decumulation';
  categoryLabel: string;
  title: string;
  subtitle: string;
  sensoryQuote?: string;
  type: 'single' | 'scale5';
  options: QuestionOption[];
}

export interface UserAnswers {
  [questionId: number]: string | number;
}

export interface DimensionScore {
  name: string;
  shortName: string;
  score: number; // 0-10
  description: string;
  insight: string;
  status: 'Needs Structure' | 'Emerging Clarity' | 'Strong Foundation';
  color: string;
}

export interface AssessmentResult {
  overallScore: number; // e.g. 6.8 out of 10
  scoreBand: string;
  bandDescription: string;
  counterIntuitiveInsight: string;
  dimensions: {
    cpfFoundation: DimensionScore;
    decumulationSequence: DimensionScore;
    taxEfficiency: DimensionScore;
    assetCoordination: DimensionScore;
  };
  recommendedFocusAreas: string[];
}

export interface LeadFormData {
  fullName: string;
  email: string;
  whatsapp: string;
  consentGiven: boolean;
}

export interface AdvisorProfile {
  firmName: string;
  firmUen: string;
  repName: string;
  repLicenseNo: string;
  role: string;
  contactEmail: string;
  officeLocation: string;
}
