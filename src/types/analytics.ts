export interface CategoryExposure {
  category: string;
  time: string;
  percentage: number;
  impact: number;
  trend: 'up' | 'flat' | 'down';
  color: string;
}

export interface EmotionalExposureTrend {
  day: string;
  stress: number;
  calm: number;
}

export interface AppImpact {
  id: string;
  appName: string;
  icon: string;
  category: string;
  time: string;
  impact: 'positive' | 'neutral' | 'negative';
  focusLabel: string;
  color: string;
}

export interface LabInsight {
  id: string;
  type: 'optimal' | 'warning' | 'info';
  title: string;
  description: string;
}

export interface WellnessOverview {
  overallScore: number;
  screenTime: string;
  socialMediaTime: string;
  positiveContentPercentage: number;
}
