import React from 'react';
import { useAnalytics } from '../../hooks/useAnalytics';
import { Card } from '../../components/common/Card';
import { Loader } from '../../components/common/Loader';
import { WellnessTrendChart } from '../../components/charts/WellnessTrendChart';
import { AppUsageChart } from '../../components/charts/AppUsageChart';
import { CategoryPieChart } from '../../components/charts/CategoryPieChart';
import { EmotionRadarChart } from '../../components/charts/EmotionRadarChart';

export const DashboardPage: React.FC = () => {
  const { overview, insights, isLoading } = useAnalytics();

  if (isLoading || !overview) {
    return <Loader />;
  }

  return (
    <div className="space-y-gutter">
      {/* Welcome Header */}
      <div className="mb-lg">
        <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface">
          Dashboard
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant mt-sm">
          Welcome back. Here is your wellness overview for today.
        </p>
      </div>

      {/* Summary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
        {/* Card 1: Wellness Score */}
        <Card accentColor="primary" className="flex flex-col justify-between">
          <div className="flex justify-between items-start mb-sm">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
              Overall Wellness Score
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
              Today's Screen Time
            </span>
            <span className="material-symbols-outlined text-secondary">schedule</span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface">
              {overview.screenTime}
            </span>
          </div>
        </Card>

        {/* Card 3: Social Media Usage */}
        <Card accentColor="tertiary" className="flex flex-col justify-between">
          <div className="flex justify-between items-start mb-sm">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
              Social Media Usage
            </span>
            <span className="material-symbols-outlined text-tertiary">smartphone</span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface">
              {overview.socialMediaTime}
            </span>
          </div>
        </Card>

        {/* Card 4: Positive Content */}
        <Card accentColor="secondary" className="flex flex-col justify-between">
          <div className="flex justify-between items-start mb-sm">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
              Positive Content
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
              <h3 className="font-headline-md text-headline-md text-on-surface">Wellness Trend</h3>
              <button className="text-on-surface-variant hover:text-primary transition-colors focus:outline-none">
                <span className="material-symbols-outlined">more_vert</span>
              </button>
            </div>
            <WellnessTrendChart />
          </Card>

          {/* App Usage Bar Chart */}
          <Card hoverable={false} className="p-lg">
            <div className="flex justify-between items-center mb-md">
              <h3 className="font-headline-md text-headline-md text-on-surface">App Usage</h3>
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
            <h3 className="font-headline-md text-headline-md text-on-surface mb-md">Content Categories</h3>
            <CategoryPieChart />
          </Card>

          {/* Emotional Exposure */}
          <Card hoverable={false} className="p-lg">
            <h3 className="font-headline-md text-headline-md text-on-surface mb-md">Emotional Exposure</h3>
            <EmotionRadarChart />
          </Card>

          {/* Recent Insights */}
          {insights.length > 0 && (
            <Card hoverable={false} className="p-lg">
              <div className="flex items-center space-x-sm mb-md">
                <span className="material-symbols-outlined text-tertiary">lightbulb</span>
                <h3 className="font-headline-md text-headline-md text-on-surface">Recent Insights</h3>
              </div>
              <div className="bg-surface-container rounded-lg p-md border border-outline-variant/30">
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-xs">Key Takeaway</p>
                <p className="font-label-md text-label-md text-on-surface font-medium leading-relaxed">
                  "{insights[0].description}"
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
