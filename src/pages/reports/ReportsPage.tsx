import React from 'react';
import { useReports } from '../../hooks/useReports';
import { Card } from '../../components/common/Card';
import { Loader } from '../../components/common/Loader';
import { ReportCard } from '../../components/reports/ReportCard';
import { ReportSummary } from '../../components/reports/ReportSummary';
import { RecommendationCard } from '../../components/reports/RecommendationCard';
import { useLanguage } from '../../store/LanguageContext';

export const ReportsPage: React.FC = () => {
  const { reports, selectedType, setSelectedType, activeReport, loadReportDetails, isLoading } = useReports();
  const { t, language } = useLanguage();

  const translatePeriodType = (typeStr: 'daily' | 'weekly' | 'monthly') => {
    if (language === 'am') {
      return typeStr === 'daily' ? 'ዕለታዊ' : typeStr === 'weekly' ? 'ሳምንታዊ' : 'ወርሃዊ';
    }
    return typeStr;
  };

  return (
    <div className="space-y-gutter">
      {/* Page Header & Tabs */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-md">
        <div>
          <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface dark:text-on-surface">
            {t('wellnessReports')}
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant/80 mt-sm">
            {t('reportsDesc')}
          </p>
        </div>
        
        {/* Period Tabs */}
        <div className="flex bg-surface-container-high dark:bg-surface-container p-xs rounded-lg">
          {(['daily', 'weekly', 'monthly'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-lg py-sm rounded-md font-label-md text-label-md transition-colors focus:outline-none capitalize ${
                selectedType === type
                  ? 'bg-surface-container-lowest dark:bg-surface-container-lowest text-primary dark:text-primary font-bold shadow-sm'
                  : 'text-on-surface-variant dark:text-on-surface-variant/80 hover:bg-surface-variant dark:hover:bg-surface-container-high'
              }`}
            >
              {translatePeriodType(type)}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Reports List - Left Column */}
          <div className="lg:col-span-4 space-y-md">
            <h3 className="font-headline-md text-headline-md text-on-surface dark:text-on-surface mb-xs px-xs">
              {t('historicalReports')}
            </h3>
            {reports.length === 0 ? (
              <p className="font-body-md text-body-md text-outline dark:text-outline/80 px-xs">
                {t('noReportsFound')}
              </p>
            ) : (
              reports.map((report) => (
                <ReportCard
                  key={report.id}
                  report={report}
                  isSelected={activeReport?.id === report.id}
                  onClick={() => loadReportDetails(report.id)}
                />
              ))
            )}
          </div>

          {/* Active Report Detail - Right Column */}
          {activeReport ? (
            <div className="lg:col-span-8 space-y-gutter">
              {/* Executive Summary */}
              <ReportSummary report={activeReport} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                {/* Focus vs Disruption Breakdown */}
                <Card hoverable={false} className="flex flex-col justify-between dark:bg-surface-container-lowest dark:border-outline-variant">
                  <div>
                    <div className="flex items-center justify-between mb-sm">
                      <h4 className="font-label-md text-label-md text-on-surface dark:text-on-surface font-bold">
                        {t('focusDisruption')}
                      </h4>
                      <span className="material-symbols-outlined text-outline dark:text-outline/80">pie_chart</span>
                    </div>
                    
                    {/* Visual Bar Splits */}
                    <div className="mt-md space-y-sm">
                      <div>
                        <div className="flex justify-between items-center text-sm mb-1">
                          <span className="font-label-sm text-label-sm text-on-surface-variant dark:text-on-surface-variant/80">
                            {language === 'am' ? 'ትኩረት' : 'Focus'}
                          </span>
                          <span className="font-label-sm text-label-sm text-tertiary font-bold">
                            {activeReport.focusPercentage}%
                          </span>
                        </div>
                        <div className="w-full bg-surface-variant dark:bg-surface-container-high rounded-full h-2">
                          <div
                            className="bg-tertiary h-2 rounded-full"
                            style={{ width: `${activeReport.focusPercentage}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center text-sm mb-1">
                          <span className="font-label-sm text-label-sm text-on-surface-variant dark:text-on-surface-variant/80">
                            {language === 'am' ? 'መስተጓጎል' : 'Disruption'}
                          </span>
                          <span className="font-label-sm text-label-sm text-error font-bold">
                            {activeReport.disruptionPercentage}%
                          </span>
                        </div>
                        <div className="w-full bg-surface-variant dark:bg-surface-container-high rounded-full h-2">
                          <div
                            className="bg-error h-2 rounded-full"
                            style={{ width: `${activeReport.disruptionPercentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Emotional Trends */}
                <Card hoverable={false} className="dark:bg-surface-container-lowest dark:border-outline-variant">
                  <div className="flex items-center gap-sm mb-lg border-b border-outline-variant dark:border-outline-variant/30 pb-sm">
                    <span className="material-symbols-outlined text-secondary">psychology</span>
                    <h4 className="font-label-md text-label-md text-on-surface dark:text-on-surface font-bold">
                      {t('emotionalSplit')}
                    </h4>
                  </div>
                  <div className="space-y-md">
                    <div className="flex justify-between items-center p-sm bg-surface dark:bg-surface-container-low rounded-lg border border-outline-variant dark:border-outline-variant/30">
                      <div className="flex items-center gap-sm">
                        <div className="w-8 h-8 rounded-full bg-secondary-container dark:bg-secondary-container/30 flex items-center justify-center text-on-secondary-container dark:text-secondary">
                          <span className="material-symbols-outlined text-[16px]">sentiment_satisfied</span>
                        </div>
                        <span className="font-body-md text-body-md text-on-surface dark:text-on-surface">
                          {t('calmFocused')}
                        </span>
                      </div>
                      <span className="font-label-md text-label-md text-secondary font-bold">
                        {activeReport.calmPercentage}%
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-sm bg-surface dark:bg-surface-container-low rounded-lg border border-outline-variant dark:border-outline-variant/30">
                      <div className="flex items-center gap-sm">
                        <div className="w-8 h-8 rounded-full bg-error-container dark:bg-error/20 flex items-center justify-center text-on-error-container dark:text-error">
                          <span className="material-symbols-outlined text-[16px]">sentiment_dissatisfied</span>
                        </div>
                        <span className="font-body-md text-body-md text-on-surface dark:text-on-surface">
                          {t('stressedRushed')}
                        </span>
                      </div>
                      <span className="font-label-md text-label-md text-error font-bold">
                        {activeReport.stressPercentage}%
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-sm bg-surface dark:bg-surface-container-low rounded-lg border border-outline-variant dark:border-outline-variant/30">
                      <div className="flex items-center gap-sm">
                        <div className="w-8 h-8 rounded-full bg-surface-variant dark:bg-surface-container-high flex items-center justify-center text-on-surface-variant dark:text-on-surface-variant/80">
                          <span className="material-symbols-outlined text-[16px]">sentiment_neutral</span>
                        </div>
                        <span className="font-body-md text-body-md text-on-surface dark:text-on-surface">
                          {t('neutralPassive')}
                        </span>
                      </div>
                      <span className="font-label-md text-label-md text-outline dark:text-outline/80 font-bold">
                        {activeReport.neutralPercentage}%
                      </span>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Recommendations */}
              <RecommendationCard recommendations={activeReport.recommendations} />
            </div>
          ) : (
            <div className="lg:col-span-8 flex justify-center items-center h-48">
              <p className="font-body-md text-body-md text-outline dark:text-outline/80">
                {t('selectReport')}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ReportsPage;
