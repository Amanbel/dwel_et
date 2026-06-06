import React from 'react';
import { useAnalytics } from '../../hooks/useAnalytics';
import { useLanguage } from '../../store/LanguageContext';
import { Card } from '../../components/common/Card';
import { Loader } from '../../components/common/Loader';
import { Badge } from '../../components/common/Badge';
import { formatImpactScore } from '../../utils/formatters';
import { ImpactBarChart } from '../../components/charts/ImpactBarChart';

export const AnalyticsPage: React.FC = () => {
  const { categories, appImpacts, insights, isLoading } = useAnalytics();
  const { t, tText, language } = useLanguage();

  const handleExportCSV = () => {
    alert(language === 'am' ? 'የተጋላጭነት ዝርዝርን እንደ CSV በመላክ ላይ' : 'Exporting exposure breakdown as CSV');
  };

  const handleExportPDF = () => {
    alert(language === 'am' ? 'ዝርዝር የፒዲኤፍ የትንታኔ ሪፖርት በማመንጨት ላይ' : 'Generating detailed PDF analytics report');
  };

  const formatTimeValue = (timeStr: string) => {
    if (language === 'am') {
      return timeStr.replace('h', 'ሰ').replace('m', 'ደ');
    }
    return timeStr;
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="space-y-gutter">
      {/* Page Header */}
      <div className="mb-lg">
        <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface dark:text-on-surface">
          {t('exposureAnalytics')}
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant dark:text-on-surface-variant/80 mt-xs">
          {t('exposureAnalyticsDesc')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Category Breakdown Table (Full Width) */}
        <div className="lg:col-span-12">
          <Card accentColor="primary" className="p-lg dark:bg-surface-container-lowest dark:border-outline-variant">
            <div className="flex justify-between items-center mb-md">
              <h3 className="font-headline-md text-headline-md text-on-surface dark:text-on-surface">{t('contentExposureBreakdown')}</h3>
              <button
                onClick={handleExportCSV}
                className="flex items-center space-x-xs text-primary dark:text-primary font-label-md text-label-md hover:bg-surface-container dark:hover:bg-surface-container py-xs px-sm rounded-lg transition-colors focus:outline-none"
              >
                <span className="material-symbols-outlined text-[18px]">download</span>
                <span>{t('exportCsv')}</span>
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-outline-variant dark:border-outline-variant/30">
                    <th className="py-sm px-sm font-label-md text-label-md text-outline dark:text-outline/85">{t('category')}</th>
                    <th className="py-sm px-sm font-label-md text-label-md text-outline dark:text-outline/85">{t('exposureTime')}</th>
                    <th className="py-sm px-sm font-label-md text-label-md text-outline dark:text-outline/85">{t('percentage')}</th>
                    <th className="py-sm px-sm font-label-md text-label-md text-outline dark:text-outline/85">{t('impactScore')}</th>
                    <th className="py-sm px-sm font-label-md text-label-md text-outline dark:text-outline/85">{t('trend')}</th>
                  </tr>
                </thead>
                <tbody className="font-body-sm text-body-sm">
                  {categories.map((cat, i) => (
                    <tr key={i} className="border-b border-surface-variant dark:border-surface-variant/30 hover:bg-surface dark:hover:bg-surface-container transition-colors">
                      <td className="py-sm px-sm font-medium text-on-surface dark:text-on-surface flex items-center">
                        <span
                          className="w-2.5 h-2.5 rounded-full mr-sm shrink-0"
                          style={{ backgroundColor: cat.color }}
                        ></span>
                        {tText(cat.category)}
                      </td>
                      <td className="py-sm px-sm text-on-surface-variant dark:text-on-surface-variant/80">{formatTimeValue(cat.time)}</td>
                      <td className="py-sm px-sm">
                        <div className="flex items-center">
                          <span className="w-8 text-right mr-sm text-on-surface-variant dark:text-on-surface-variant/80">
                            {cat.percentage}%
                          </span>
                          <div className="w-24 h-2 bg-surface-container dark:bg-surface-container rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{ width: `${cat.percentage}%`, backgroundColor: cat.color }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="py-sm px-sm">
                        <Badge status={cat.impact >= 0 ? 'positive' : 'negative'}>
                          {formatImpactScore(cat.impact)}
                        </Badge>
                      </td>
                      <td className="py-sm px-sm">
                        <span className="material-symbols-outlined text-outline dark:text-outline/80">
                          {cat.trend === 'up'
                            ? 'trending_up'
                            : cat.trend === 'down'
                            ? 'trending_down'
                            : 'trending_flat'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Emotional Analysis (Two Thirds) */}
        <div className="lg:col-span-8">
          <Card accentColor="tertiary" className="p-lg h-full flex flex-col justify-between dark:bg-surface-container-lowest dark:border-outline-variant">
            <div className="flex justify-between items-center mb-md">
              <h3 className="font-headline-md text-headline-md text-on-surface dark:text-on-surface">{t('emotionalExposureTrends')}</h3>
              <div className="flex space-x-sm bg-surface-container dark:bg-surface-container p-xs rounded-md">
                <span className="font-label-sm text-label-sm px-sm py-xs bg-surface-container-lowest dark:bg-surface-container-lowest shadow-xs rounded text-on-surface dark:text-on-surface font-semibold">
                  {t('sevenDays')}
                </span>
                <span className="font-label-sm text-label-sm px-sm py-xs text-outline dark:text-outline/80 cursor-pointer hover:bg-surface dark:hover:bg-surface rounded">
                  {t('thirtyDays')}
                </span>
              </div>
            </div>
            
            <ImpactBarChart />
            
            <div className="flex justify-center mt-md space-x-lg">
              <div className="flex items-center">
                <span className="w-3 h-3 rounded bg-secondary opacity-80 mr-xs"></span>
                <span className="font-label-sm text-label-sm text-outline dark:text-outline/80">{t('calmFocus')}</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 rounded bg-error opacity-80 mr-xs"></span>
                <span className="font-label-sm text-label-sm text-outline dark:text-outline/80">{t('stressFatigue')}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Topic Analysis Cloud (One Third) */}
        <div className="lg:col-span-4">
          <Card className="p-lg flex flex-col h-full justify-between dark:bg-surface-container-lowest dark:border-outline-variant">
            <div>
              <h3 className="font-headline-md text-headline-md text-on-surface dark:text-on-surface mb-md">{t('semanticTopics')}</h3>
              <p className="font-body-sm text-body-sm text-outline dark:text-outline/80 mb-md leading-relaxed">
                {t('semanticTopicsDesc')}
              </p>
            </div>
            <div className="flex-1 bg-surface-container-low dark:bg-surface-container-low/50 rounded-lg border border-surface-variant dark:border-outline-variant p-md flex flex-wrap content-center justify-center gap-sm min-h-[160px]">
              <span className="px-3 py-1 bg-primary-fixed text-on-primary-fixed dark:bg-primary-container dark:text-on-primary-container rounded-full text-sm font-bold opacity-90">
                {t('topicResearchData')}
              </span>
              <span className="px-2 py-1 bg-tertiary-fixed-dim text-on-tertiary-fixed dark:bg-tertiary-container dark:text-on-tertiary-container rounded-full text-xs font-medium opacity-85">
                {t('topicMachineLearning')}
              </span>
              <span className="px-3 py-1 bg-surface-variant text-on-surface-variant dark:bg-surface-container-high dark:text-on-surface-variant rounded-full text-xs opacity-75">
                {t('topicUiDesign')}
              </span>
              <span className="px-2 py-1 bg-error-container text-on-error-container dark:bg-error/20 dark:text-error rounded-full text-[10px] opacity-60">
                {t('topicNewsHeadlines')}
              </span>
              <span className="px-4 py-2 bg-secondary-fixed text-on-secondary-fixed dark:bg-secondary-container dark:text-on-secondary-container rounded-full text-base font-bold opacity-100">
                {t('topicCognitiveScience')}
              </span>
              <span className="px-2 py-1 bg-surface-container-high text-on-surface-variant dark:bg-surface-container-highest dark:text-on-surface-variant rounded-full text-xs opacity-75">
                {t('topicEmailChains')}
              </span>
              <span className="px-2 py-1 bg-primary-container text-on-primary-container dark:bg-primary/25 dark:text-primary rounded-full text-[10px] opacity-80">
                {t('topicSystemConfig')}
              </span>
            </div>
          </Card>
        </div>

        {/* App Impact Analysis (Half Width) */}
        <div className="lg:col-span-6">
          <Card className="p-lg h-full flex flex-col justify-between dark:bg-surface-container-lowest dark:border-outline-variant">
            <h3 className="font-headline-md text-headline-md text-on-surface dark:text-on-surface mb-md">{t('appImpactRanking')}</h3>
            <div className="space-y-sm">
              {appImpacts.map((app) => (
                <div
                  key={app.id}
                  className="flex items-center justify-between p-sm rounded-lg hover:bg-surface-container-lowest dark:hover:bg-surface-container-low transition-colors border border-transparent hover:border-surface-variant dark:hover:border-outline-variant"
                >
                  <div className="flex items-center">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center mr-sm text-white"
                      style={{ backgroundColor: app.color }}
                    >
                      <span className="material-symbols-outlined">{app.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-label-md text-label-md text-on-surface dark:text-on-surface font-bold">
                        {tText(app.appName)}
                      </h4>
                      <p className="font-body-sm text-body-sm text-outline dark:text-outline/80">{tText(app.category)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-label-md text-label-md text-on-surface dark:text-on-surface font-bold">{formatTimeValue(app.time)}</p>
                    <Badge
                      status={
                        app.impact === 'positive'
                          ? 'positive'
                          : app.impact === 'negative'
                          ? 'negative'
                          : 'neutral'
                      }
                      className="mt-xs text-[10px]"
                    >
                      {tText(app.focusLabel)}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Contextual Insights (Half Width) */}
        <div className="lg:col-span-6">
          <Card className="p-lg bg-gradient-to-br from-surface to-primary-fixed/20 dark:from-surface-container-lowest dark:to-primary-container/10 h-full flex flex-col justify-between dark:bg-surface-container-lowest dark:border-outline-variant">
            <div>
              <h3 className="font-headline-md text-headline-md text-on-surface dark:text-on-surface mb-md">{t('labInsights')}</h3>
              <div className="space-y-md">
                {insights.map((ins) => (
                  <div key={ins.id} className="flex items-start">
                    <span
                      className={`material-symbols-outlined mr-sm mt-1 shrink-0 ${
                        ins.type === 'warning' ? 'text-error' : 'text-secondary'
                      }`}
                    >
                      {ins.type === 'warning' ? 'warning' : 'lightbulb'}
                    </span>
                    <div>
                      <h4 className="font-label-md text-label-md text-on-surface dark:text-on-surface font-bold">
                        {tText(ins.title)}
                      </h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-on-surface-variant/80 mt-xs leading-relaxed">
                        {tText(ins.description)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={handleExportPDF}
              className="mt-lg w-full py-sm bg-primary text-on-primary rounded-lg font-label-md text-label-md hover:bg-surface-tint dark:hover:bg-primary/80 transition-all hover:scale-[1.01] shadow-sm font-semibold focus:outline-none"
            >
              {t('generatePdfReport')}
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
