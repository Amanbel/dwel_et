export interface Report {
  id: string;
  type: 'daily' | 'weekly' | 'monthly';
  title: string;
  dateRange: string;
  summary: string;
  score: number;
  deepWorkHours: number;
  fatigueRisk: 'Low' | 'Medium' | 'High';
  focusPercentage: number;
  disruptionPercentage: number;
  calmPercentage: number;
  stressPercentage: number;
  neutralPercentage: number;
  recommendations: {
    id: string;
    title: string;
    description: string;
  }[];
}
