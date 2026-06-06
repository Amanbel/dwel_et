import { WellnessOverview, CategoryExposure, EmotionalExposureTrend, AppImpact, LabInsight } from '../types/analytics';
import { delay } from './api';

const MOCK_OVERVIEW: WellnessOverview = {
  overallScore: 82,
  screenTime: '4h 12m',
  socialMediaTime: '2h 45m',
  positiveContentPercentage: 64
};

const MOCK_CATEGORIES: CategoryExposure[] = [
  { category: 'Deep Work', time: '4h 12m', percentage: 42, impact: 8.4, trend: 'up', color: '#006a61' },
  { category: 'Communication', time: '2h 45m', percentage: 28, impact: -1.2, trend: 'flat', color: '#6a1edb' },
  { category: 'Passive Scrolling', time: '1h 50m', percentage: 18, impact: -6.8, trend: 'down', color: '#ba1a1a' },
  { category: 'Utility/Admin', time: '1h 13m', percentage: 12, impact: 0.0, trend: 'flat', color: '#004ac6' }
];

const MOCK_EMOTIONAL_TRENDS: EmotionalExposureTrend[] = [
  { day: 'Mon', stress: 30, calm: 40 },
  { day: 'Tue', stress: 45, calm: 35 },
  { day: 'Wed', stress: 20, calm: 60 },
  { day: 'Thu', stress: 60, calm: 20 },
  { day: 'Fri', stress: 25, calm: 50 },
  { day: 'Sat', stress: 15, calm: 70 },
  { day: 'Sun', stress: 10, calm: 80 }
];

const MOCK_APP_IMPACTS: AppImpact[] = [
  { id: 'app_1', appName: 'DataLab Pro', icon: 'edit_document', category: 'Deep Work', time: '2h 15m', impact: 'positive', focusLabel: 'High Focus', color: '#004ac6' },
  { id: 'app_2', appName: 'TeamChat', icon: 'forum', category: 'Communication', time: '1h 30m', impact: 'neutral', focusLabel: 'Fragmented', color: '#00A4EF' },
  { id: 'app_3', appName: 'Social Feed', icon: 'public', category: 'Passive Scrolling', time: '45m', impact: 'negative', focusLabel: 'High Drain', color: '#1DA1F2' }
];

const MOCK_INSIGHTS: LabInsight[] = [
  { id: 'ins_1', type: 'optimal', title: 'Optimal Focus Window', description: 'Your highest cognitive engagement occurs between 09:00 and 11:30. Consider scheduling complex analysis during this period.' },
  { id: 'ins_2', type: 'warning', title: 'Context Switching Threshold', description: 'You switched apps 42 times in the last hour of your session, correlating with a 15% drop in semantic depth.' }
];

export const analyticsService = {
  getOverview: async (): Promise<WellnessOverview> => {
    await delay(150);
    return MOCK_OVERVIEW;
  },
  getCategories: async (): Promise<CategoryExposure[]> => {
    await delay(150);
    return MOCK_CATEGORIES;
  },
  getEmotionalTrends: async (): Promise<EmotionalExposureTrend[]> => {
    await delay(150);
    return MOCK_EMOTIONAL_TRENDS;
  },
  getAppImpacts: async (): Promise<AppImpact[]> => {
    await delay(150);
    return MOCK_APP_IMPACTS;
  },
  getInsights: async (): Promise<LabInsight[]> => {
    await delay(150);
    return MOCK_INSIGHTS;
  }
};
