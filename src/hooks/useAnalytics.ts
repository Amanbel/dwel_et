import { useAnalyticsContext } from '../store/analyticsStore';

export const useAnalytics = () => {
  const {
    overview,
    categories,
    emotionalTrends,
    appImpacts,
    insights,
    isLoading,
    dateRange,
    setDateRange,
    refresh
  } = useAnalyticsContext();

  return {
    overview,
    categories,
    emotionalTrends,
    appImpacts,
    insights,
    isLoading,
    dateRange,
    setDateRange,
    refresh
  };
};
