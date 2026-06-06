import React from "react";
import { useAnalytics } from "../../hooks/useAnalytics";
import { useLanguage } from "../../store/LanguageContext";
import { Card } from "../../components/common/Card";
import { Loader } from "../../components/common/Loader";
import { WellnessTrendChart } from "../../components/charts/WellnessTrendChart";
import { AppUsageChart } from "../../components/charts/AppUsageChart";
import { CategoryPieChart } from "../../components/charts/CategoryPieChart";
import { EmotionRadarChart } from "../../components/charts/EmotionRadarChart";

export const DashboardPage: React.FC = () => {
  const { overview, insights, isLoading } = useAnalytics();
  const { t, language } = useLanguage();

  if (isLoading) {
    return <Loader />;
  }

  if (!overview) {
    return (
      <div className="space-y-gutter">
        <div className="page-hero rounded-lg p-lg md:p-xl animate-fade-in overflow-hidden">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-xs rounded-lg bg-secondary-container/70 text-on-secondary-container px-sm py-xs font-label-sm text-label-sm mb-md">
              <span className="material-symbols-outlined text-[16px]">
                info
              </span>
              {t("dashboardNoAnalytics")}
            </div>
            <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface">
              {t("dashboard")}
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-sm leading-relaxed">
              {t("dashboardNoAnalyticsDesc")}
            </p>
          </div>
        </div>

        <Card hoverable={false} className="p-lg">
          <div className="flex items-start gap-md">
            <span className="material-symbols-outlined text-primary bg-primary-container/70 rounded-lg p-xs">
              database
            </span>
            <div>
              <h3 className="font-headline-md text-headline-md text-on-surface">
                {t("dashboardWaitingForData")}
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-xs">
                {t("dashboardWaitingForDataDesc")}
              </p>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  const formatTimeValue = (timeStr: string) => {
    if (language === "am") {
      return timeStr.replace("h", "ሰ").replace("m", "ደ");
    }
    return timeStr;
  };

  const getInsightDescription = (description: string) => {
    if (language === "am") {
      if (
        description.includes("09:00") ||
        description.includes("Optimal Focus")
      ) {
        return "ከፍተኛው የእውቀት ተሳትፎዎ ከጠዋቱ 3:00 እስከ 5:30 ባለው ጊዜ ውስጥ ይከሰታል። ውስብስብ ትንታኔዎችን በዚህ ጊዜ ውስጥ ለማቀድ ያስቡበት።";
      }
      if (
        description.includes("42 times") ||
        description.includes("Context Switching")
      ) {
        return "ባለፈው አንድ ሰዓት ውስጥ መተግበሪያዎችን 42 ጊዜ ቀያይረዋል፣ ይህም ከ15% የስራ ጥራት መቀነስ ጋር ይዛመዳል።";
      }
    }
    return description;
  };

  return (
    <div className="space-y-gutter">
      {/* Welcome Header */}
      <div className="page-hero rounded-lg p-lg md:p-xl animate-fade-in overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-lg">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-xs rounded-lg bg-secondary-container/70 text-on-secondary-container px-sm py-xs font-label-sm text-label-sm mb-md">
              <span className="material-symbols-outlined text-[16px] icon-fill">
                verified
              </span>
              Live wellness overview
            </div>
            <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface">
              {t("dashboard")}
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-sm leading-relaxed">
              {t("welcome")}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-sm min-w-full sm:min-w-[360px]">
            <div className="rounded-lg bg-surface-container-lowest/80 border border-outline-variant p-sm">
              <p className="text-[10px] uppercase font-bold text-outline">
                Events
              </p>
              <p className="text-xl font-bold text-on-surface">
                {overview.positiveContentPercentage}%
              </p>
            </div>
            <div className="rounded-lg bg-surface-container-lowest/80 border border-outline-variant p-sm">
              <p className="text-[10px] uppercase font-bold text-outline">
                Score
              </p>
              <p className="text-xl font-bold text-primary">
                {overview.overallScore}
              </p>
            </div>
            <div className="rounded-lg bg-surface-container-lowest/80 border border-outline-variant p-sm">
              <p className="text-[10px] uppercase font-bold text-outline">
                Time
              </p>
              <p className="text-xl font-bold text-secondary">
                {formatTimeValue(overview.socialMediaTime)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
        {/* Card 1: Wellness Score */}
        <Card
          accentColor="primary"
          className="metric-card flex flex-col justify-between"
        >
          <div className="flex justify-between items-start mb-sm">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
              {t("overallScore")}
            </span>
            <span className="material-symbols-outlined text-primary bg-primary-container/70 rounded-lg p-xs">
              health_and_safety
            </span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface">
              {overview.overallScore}
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              /100
            </span>
          </div>
          <p className="mt-sm text-xs text-on-surface-variant">
            Balanced score from recent content impact.
          </p>
        </Card>

        {/* Card 2: Screen Time */}
        <Card
          accentColor="secondary"
          className="metric-card flex flex-col justify-between"
        >
          <div className="flex justify-between items-start mb-sm">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
              {t("screenTime")}
            </span>
            <span className="material-symbols-outlined text-secondary bg-secondary-container/70 rounded-lg p-xs">
              schedule
            </span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface">
              {formatTimeValue(overview.screenTime)}
            </span>
          </div>
          <p className="mt-sm text-xs text-on-surface-variant">
            Total tracked digital exposure.
          </p>
        </Card>

        {/* Card 3: Social Media Usage */}
        <Card
          accentColor="tertiary"
          className="metric-card flex flex-col justify-between"
        >
          <div className="flex justify-between items-start mb-sm">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
              {t("socialUsage")}
            </span>
            <span className="material-symbols-outlined text-tertiary bg-tertiary-container/70 rounded-lg p-xs">
              smartphone
            </span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface">
              {formatTimeValue(overview.socialMediaTime)}
            </span>
          </div>
          <p className="mt-sm text-xs text-on-surface-variant">
            Time spent on social platforms.
          </p>
        </Card>

        {/* Card 4: Positive Content */}
        <Card
          accentColor="secondary"
          className="metric-card flex flex-col justify-between"
        >
          <div className="flex justify-between items-start mb-sm">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
              {t("positiveContent")}
            </span>
            <span className="material-symbols-outlined text-secondary bg-secondary-container/70 rounded-lg p-xs">
              sentiment_satisfied
            </span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface">
              {overview.positiveContentPercentage}%
            </span>
          </div>
          <p className="mt-sm text-xs text-on-surface-variant">
            Supportive content share.
          </p>
        </Card>
      </div>

      {/* Bento Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
        {/* Main Chart Area (Spans 2 columns) */}
        <div className="lg:col-span-2 space-y-gutter">
          {/* Wellness Trend */}
          <Card hoverable={false} className="p-lg">
            <div className="flex justify-between items-center mb-md">
              <h3 className="font-headline-md text-headline-md text-on-surface">
                {t("wellnessTrend")}
              </h3>
              <button className="text-on-surface-variant hover:text-primary transition-colors focus:outline-none">
                <span className="material-symbols-outlined">more_vert</span>
              </button>
            </div>
            <WellnessTrendChart />
          </Card>

          {/* App Usage Bar Chart */}
          <Card hoverable={false} className="p-lg">
            <div className="flex justify-between items-center mb-md">
              <h3 className="font-headline-md text-headline-md text-on-surface">
                {t("appUsage")}
              </h3>
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
            <h3 className="font-headline-md text-headline-md text-on-surface mb-md">
              {t("contentCategories")}
            </h3>
            <CategoryPieChart />
          </Card>

          {/* Emotional Exposure */}
          <Card hoverable={false} className="p-lg">
            <h3 className="font-headline-md text-headline-md text-on-surface mb-md">
              {t("emotionalExposure")}
            </h3>
            <EmotionRadarChart />
          </Card>

          {/* Recent Insights */}
          {insights.length > 0 && (
            <Card hoverable={false} className="p-lg">
              <div className="flex items-center space-x-sm mb-md">
                <span className="material-symbols-outlined text-tertiary">
                  lightbulb
                </span>
                <h3 className="font-headline-md text-headline-md text-on-surface">
                  {t("recentInsights")}
                </h3>
              </div>
              <div className="bg-surface-container rounded-lg p-md border border-outline-variant/30">
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-xs">
                  {t("keyTakeaway")}
                </p>
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
