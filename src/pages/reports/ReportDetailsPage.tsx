import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useReports } from '../../hooks/useReports';
import { Loader } from '../../components/common/Loader';
import { ReportSummary } from '../../components/reports/ReportSummary';
import { RecommendationCard } from '../../components/reports/RecommendationCard';
import { Card } from '../../components/common/Card';
import { useLanguage } from '../../store/LanguageContext';

export const ReportDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { activeReport, loadReportDetails, isLoading } = useReports();
  const { t, language } = useLanguage();

  useEffect(() => {
    if (id) {
      loadReportDetails(id);
    }
  }, [id]);

  if (isLoading || !activeReport) {
    return <Loader />;
  }

  return (
    <div className="space-y-gutter">
      <div className="mb-md">
        <Link to="/reports" className="inline-flex items-center gap-sm text-primary hover:text-surface-tint font-label-md text-label-md">
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          {t('backToReports')}
        </Link>
      </div>

      <ReportSummary report={activeReport} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
        {/* Focus Breakdown */}
        <Card hoverable={false} className="dark:bg-surface-container-lowest dark:border-outline-variant">
          <div className="flex items-center justify-between mb-sm">
            <h4 className="font-label-md text-label-md text-on-surface dark:text-on-surface font-bold">
              {t('focusDisruption')}
            </h4>
            <span className="material-symbols-outlined text-outline dark:text-outline/80">pie_chart</span>
          </div>
          <div className="mt-md space-y-sm">
            <div>
              <div className="flex justify-between items-center text-sm mb-1">
                <span className="font-label-sm text-label-sm text-on-surface-variant dark:text-on-surface-variant/80">
                  {language === 'am' ? 'ትኩረት' : 'Focus'}
                </span>
                <span className="font-label-sm text-label-sm text-tertiary font-bold">{activeReport.focusPercentage}%</span>
              </div>
              <div className="w-full bg-surface-variant dark:bg-surface-container-high rounded-full h-2">
                <div className="bg-tertiary h-2 rounded-full" style={{ width: `${activeReport.focusPercentage}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center text-sm mb-1">
                <span className="font-label-sm text-label-sm text-on-surface-variant dark:text-on-surface-variant/80">
                  {language === 'am' ? 'መስተጓጎል' : 'Disruption'}
                </span>
                <span className="font-label-sm text-label-sm text-error font-bold">{activeReport.disruptionPercentage}%</span>
              </div>
              <div className="w-full bg-surface-variant dark:bg-surface-container-high rounded-full h-2">
                <div className="bg-error h-2 rounded-full" style={{ width: `${activeReport.disruptionPercentage}%` }}></div>
              </div>
            </div>
          </div>
        </Card>

        {/* Emotional Splitting */}
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
                <span className="font-body-md text-body-md text-on-surface dark:text-on-surface">{t('calmFocused')}</span>
              </div>
              <span className="font-label-md text-label-md text-secondary font-bold">{activeReport.calmPercentage}%</span>
            </div>
            <div className="flex justify-between items-center p-sm bg-surface dark:bg-surface-container-low rounded-lg border border-outline-variant dark:border-outline-variant/30">
              <div className="flex items-center gap-sm">
                <div className="w-8 h-8 rounded-full bg-error-container dark:bg-error/20 flex items-center justify-center text-on-error-container dark:text-error">
                  <span className="material-symbols-outlined text-[16px]">sentiment_dissatisfied</span>
                </div>
                <span className="font-body-md text-body-md text-on-surface dark:text-on-surface">{t('stressedRushed')}</span>
              </div>
              <span className="font-label-md text-label-md text-error font-bold">{activeReport.stressPercentage}%</span>
            </div>
            <div className="flex justify-between items-center p-sm bg-surface dark:bg-surface-container-low rounded-lg border border-outline-variant dark:border-outline-variant/30">
              <div className="flex items-center gap-sm">
                <div className="w-8 h-8 rounded-full bg-surface-variant dark:bg-surface-container-high flex items-center justify-center text-on-surface-variant dark:text-on-surface-variant/80">
                  <span className="material-symbols-outlined text-[16px]">sentiment_neutral</span>
                </div>
                <span className="font-body-md text-body-md text-on-surface dark:text-on-surface">{t('neutralPassive')}</span>
              </div>
              <span className="font-label-md text-label-md text-outline dark:text-outline/80 font-bold">{activeReport.neutralPercentage}%</span>
            </div>
          </div>
        </Card>
      </div>

      <RecommendationCard recommendations={activeReport.recommendations} />
    </div>
  );
};

export default ReportDetailsPage;
