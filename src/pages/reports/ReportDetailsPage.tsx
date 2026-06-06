import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useReports } from '../../hooks/useReports';
import { Loader } from '../../components/common/Loader';
import { ReportSummary } from '../../components/reports/ReportSummary';
import { RecommendationCard } from '../../components/reports/RecommendationCard';
import { Card } from '../../components/common/Card';

export const ReportDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { activeReport, loadReportDetails, isLoading } = useReports();

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
          Back to Reports
        </Link>
      </div>

      <ReportSummary report={activeReport} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
        {/* Focus Breakdown */}
        <Card hoverable={false}>
          <div className="flex items-center justify-between mb-sm">
            <h4 className="font-label-md text-label-md text-on-surface font-bold">Focus vs Disruption</h4>
            <span className="material-symbols-outlined text-outline">pie_chart</span>
          </div>
          <div className="mt-md space-y-sm">
            <div>
              <div className="flex justify-between items-center text-sm mb-1">
                <span className="font-label-sm text-label-sm text-on-surface-variant">Focus</span>
                <span className="font-label-sm text-label-sm text-tertiary font-bold">{activeReport.focusPercentage}%</span>
              </div>
              <div className="w-full bg-surface-variant rounded-full h-2">
                <div className="bg-tertiary h-2 rounded-full" style={{ width: `${activeReport.focusPercentage}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center text-sm mb-1">
                <span className="font-label-sm text-label-sm text-on-surface-variant">Disruption</span>
                <span className="font-label-sm text-label-sm text-error font-bold">{activeReport.disruptionPercentage}%</span>
              </div>
              <div className="w-full bg-surface-variant rounded-full h-2">
                <div className="bg-error h-2 rounded-full" style={{ width: `${activeReport.disruptionPercentage}%` }}></div>
              </div>
            </div>
          </div>
        </Card>

        {/* Emotional Splitting */}
        <Card hoverable={false}>
          <div className="flex items-center gap-sm mb-lg border-b border-outline-variant pb-sm">
            <span className="material-symbols-outlined text-secondary">psychology</span>
            <h4 className="font-label-md text-label-md text-on-surface font-bold">Emotional Split</h4>
          </div>
          <div className="space-y-md">
            <div className="flex justify-between items-center p-sm bg-surface rounded-lg border border-outline-variant">
              <div className="flex items-center gap-sm">
                <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
                  <span className="material-symbols-outlined text-[16px]">sentiment_satisfied</span>
                </div>
                <span className="font-body-md text-body-md text-on-surface">Calm & Focused</span>
              </div>
              <span className="font-label-md text-label-md text-secondary font-bold">{activeReport.calmPercentage}%</span>
            </div>
            <div className="flex justify-between items-center p-sm bg-surface rounded-lg border border-outline-variant">
              <div className="flex items-center gap-sm">
                <div className="w-8 h-8 rounded-full bg-error-container flex items-center justify-center text-on-error-container">
                  <span className="material-symbols-outlined text-[16px]">sentiment_dissatisfied</span>
                </div>
                <span className="font-body-md text-body-md text-on-surface">Stressed / Rushed</span>
              </div>
              <span className="font-label-md text-label-md text-error font-bold">{activeReport.stressPercentage}%</span>
            </div>
            <div className="flex justify-between items-center p-sm bg-surface rounded-lg border border-outline-variant">
              <div className="flex items-center gap-sm">
                <div className="w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center text-on-surface-variant">
                  <span className="material-symbols-outlined text-[16px]">sentiment_neutral</span>
                </div>
                <span className="font-body-md text-body-md text-on-surface">Neutral / Passive</span>
              </div>
              <span className="font-label-md text-label-md text-outline font-bold">{activeReport.neutralPercentage}%</span>
            </div>
          </div>
        </Card>
      </div>

      <RecommendationCard recommendations={activeReport.recommendations} />
    </div>
  );
};
export default ReportDetailsPage;
