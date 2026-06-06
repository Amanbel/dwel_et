import { WellnessOverview, CategoryExposure, EmotionalExposureTrend, AppImpact, LabInsight } from '../types/analytics';
import { api } from './api';

export const analyticsService = {
  getOverview: async (): Promise<WellnessOverview> => {
    const { data } = await api.get('/analytics/overview');
    return data;
  },
  getCategories: async (): Promise<CategoryExposure[]> => {
    const { data } = await api.get('/analytics/categories');
    return data;
  },
  getEmotionalTrends: async (): Promise<EmotionalExposureTrend[]> => {
    const { data } = await api.get('/analytics/emotions/trends');
    return data;
  },
  getAppImpacts: async (): Promise<AppImpact[]> => {
    const { data } = await api.get('/analytics/apps/impacts');
    return data;
  },
  getInsights: async (): Promise<LabInsight[]> => {
    const { data } = await api.get('/analytics/insights');
    return data;
  }
};
