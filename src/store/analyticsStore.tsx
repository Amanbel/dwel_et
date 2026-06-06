import React, { createContext, useContext, useState, useEffect } from 'react';
import { WellnessOverview, CategoryExposure, EmotionalExposureTrend, AppImpact, LabInsight } from '../types/analytics';
import { analyticsService } from '../services/analyticsService';

interface AnalyticsContextType {
  overview: WellnessOverview | null;
  categories: CategoryExposure[];
  emotionalTrends: EmotionalExposureTrend[];
  appImpacts: AppImpact[];
  insights: LabInsight[];
  isLoading: boolean;
  dateRange: string;
  setDateRange: (range: string) => void;
  refresh: () => Promise<void>;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export const AnalyticsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [overview, setOverview] = useState<WellnessOverview | null>(null);
  const [categories, setCategories] = useState<CategoryExposure[]>([]);
  const [emotionalTrends, setEmotionalTrends] = useState<EmotionalExposureTrend[]>([]);
  const [appImpacts, setAppImpacts] = useState<AppImpact[]>([]);
  const [insights, setInsights] = useState<LabInsight[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [dateRange, setDateRange] = useState<string>('Last 7 Days');

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [ov, cat, emo, app, ins] = await Promise.all([
        analyticsService.getOverview(),
        analyticsService.getCategories(),
        analyticsService.getEmotionalTrends(),
        analyticsService.getAppImpacts(),
        analyticsService.getInsights()
      ]);
      
      setOverview(ov);
      setCategories(cat);
      setEmotionalTrends(emo);
      setAppImpacts(app);
      setInsights(ins);
    } catch (error) {
      console.error('Failed to load analytics data', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [dateRange]);

  return (
    <AnalyticsContext.Provider
      value={{
        overview,
        categories,
        emotionalTrends,
        appImpacts,
        insights,
        isLoading,
        dateRange,
        setDateRange,
        refresh: loadData
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalyticsContext = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalyticsContext must be used within an AnalyticsProvider');
  }
  return context;
};
