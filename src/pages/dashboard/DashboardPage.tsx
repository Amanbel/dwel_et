import React from 'react';
import { useAnalytics } from '../../hooks/useAnalytics';
import { useLanguage } from '../../store/LanguageContext';
import { Card } from '../../components/common/Card';
import { Loader } from '../../components/common/Loader';
import { WellnessTrendChart } from '../../components/charts/WellnessTrendChart';
import { AppUsageChart } from '../../components/charts/AppUsageChart';
import { CategoryPieChart } from '../../components/charts/CategoryPieChart';
import { EmotionRadarChart } from '../../components/charts/EmotionRadarChart';

export const DashboardPage: React.FC = () => {
  const { overview, insights, isLoading } = useAnalytics();
  const { t, language } = useLanguage();

  if (isLoading || !overview) {
    return <Loader />;
  }

  const formatTimeValue = (timeStr: string) => {
    if (language === 'am') {
      return timeStr.replace('h', 'ሰ').replace('m', 'ደ');
    }
    return timeStr;
  };

  const getInsightDescription = (description: string) => {
    if (language === 'am') {
      if (description.includes('09:00') || description.includes('Optimal Focus')) {
        return 'ከፍተኛው የእውቀት ተሳትፎዎ ከጠዋቱ 3:00 እስከ 5:30 ባለው ጊዜ ውስጥ ይከሰታል። ውስብስብ ትንታኔዎችን በዚህ ጊዜ ውስጥ ለማቀድ ያስቡበት።';
      }
      if (description.includes('42 times') || description.includes('Context Switching')) {
        return 'ባለፈው አንድ ሰዓት ውስጥ መተግበሪያዎችን 42 ጊዜ ቀያይረዋል፣ ይህም ከ15% የስራ ጥራት መቀነስ ጋር ይዛመዳል።';
      }
    }
    return description;
  };

  return (
    <div className="space-y-gutter">
      {/* Welcome Header */}
      <div className="mb-lg animate-fade-in">
        <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface">
          {t('dashboard')}
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant mt-sm">
          {t('welcome')}
        </p>
      </div>

      {/* Summary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
        {/* Card 1: Wellness Score */}
        <Card accentColor="primary" className="flex flex-col justify-between">
          <div className="flex justify-between items-start mb-sm">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
              {t('overallScore')}
            </span>
            <span className="material-symbols-outlined text-primary">health_and_safety</span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface">
              {overview.overallScore}
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">/100</span>
          </div>
        </Card>

        {/* Card 2: Screen Time */}
        <Card accentColor="secondary" className="flex flex-col justify-between">
          <div className="flex justify-between items-start mb-sm">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
              {t('screenTime')}
            </span>
            <span className="material-symbols-outlined text-secondary">schedule</span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface">
              {formatTimeValue(overview.screenTime)}
            </span>
          </div>
        </Card>

        {/* Card 3: Social Media Usage */}
        <Card accentColor="tertiary" className="flex flex-col justify-between">
          <div className="flex justify-between items-start mb-sm">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
              {t('socialUsage')}
            </span>
            <span className="material-symbols-outlined text-tertiary">smartphone</span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface">
              {formatTimeValue(overview.socialMediaTime)}
            </span>
          </div>
        </Card>

        {/* Card 4: Positive Content */}
        <Card accentColor="secondary" className="flex flex-col justify-between">
          <div className="flex justify-between items-start mb-sm">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
              {t('positiveContent')}
            </span>
            <span className="material-symbols-outlined text-secondary">sentiment_satisfied</span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface">
              {overview.positiveContentPercentage}%
            </span>
          </div>
        </Card>
      </div>

      {/* Bento Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
        {/* Main Chart Area (Spans 2 columns) */}
        <div className="lg:col-span-2 space-y-gutter">
          {/* Wellness Trend */}
          <Card hoverable={false} className="p-lg">
            <div className="flex justify-between items-center mb-md">
              <h3 className="font-headline-md text-headline-md text-on-surface">{t('wellnessTrend')}</h3>
              <button className="text-on-surface-variant hover:text-primary transition-colors focus:outline-none">
                <span className="material-symbols-outlined">more_vert</span>
              </button>
            </div>
            <WellnessTrendChart />
          </Card>

          {/* App Usage Bar Chart */}
          <Card hoverable={false} className="p-lg">
            <div className="flex justify-between items-center mb-md">
              <h3 className="font-headline-md text-headline-md text-on-surface">{t('appUsage')}</h3>
              <button className="text-on-surface-variant hover:text-primary transition-colors focus:outline-none">
                <span className="material-symbols-outlined">more_vert</span>
              </button>
            </div>
            <AppUsageChart />
          </Card>
        </div>

        {/* Side Column */}
        <div className="space-y-gutter">
          {/* Content Categories */}
          <Card hoverable={false} className="p-lg">
            <h3 className="font-headline-md text-headline-md text-on-surface mb-md">{t('contentCategories')}</h3>
            <CategoryPieChart />
          </Card>

          {/* Emotional Exposure */}
          <Card hoverable={false} className="p-lg">
            <h3 className="font-headline-md text-headline-md text-on-surface mb-md">{t('emotionalExposure')}</h3>
            <EmotionRadarChart />
          </Card>

          {/* Recent Insights */}
          {insights.length > 0 && (
            <Card hoverable={false} className="p-lg">
              <div className="flex items-center space-x-sm mb-md">
                <span className="material-symbols-outlined text-tertiary">lightbulb</span>
                <h3 className="font-headline-md text-headline-md text-on-surface">{t('recentInsights')}</h3>
              </div>
              <div className="bg-surface-container rounded-lg p-md border border-outline-variant/30">
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-xs">{t('keyTakeaway')}</p>
                <p className="font-label-md text-label-md text-on-surface font-medium leading-relaxed">
                  "{getInsightDescription(insights[0].description)}"
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
