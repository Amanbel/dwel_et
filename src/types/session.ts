export interface Session {
  id: string;
  timestamp: string;
  appName: string;
  icon: string;
  iconColor: string;
  context: string;
  category: string;
  sentiment: 'Deep Work' | 'Positive' | 'Neutral' | 'Negative';
  impactScore: number;
}

export interface SessionFilters {
  dateRange: string;
  application: string;
  category: string;
  sentiment: string;
}
