import React from 'react';
import { Report } from '../../types/report';
import { Card } from '../common/Card';
import { Button } from '../common/Button';

interface ReportSummaryProps {
  report: Report;
}

export const ReportSummary: React.FC<ReportSummaryProps> = ({ report }) => {
  const handleDownload = () => {
    alert(`Downloading PDF for report: ${report.title} (${report.dateRange})`);
  };

  return (
    <Card accentColor="primary" hoverable={false} className="relative overflow-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-md mb-md">
        <div>
          <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider">
            Week of {report.dateRange}
          </span>
          <h3 className="font-headline-md text-headline-md text-on-surface mt-xs">
            {report.title}
          </h3>
        </div>
        <Button variant="primary" onClick={handleDownload} className="flex items-center gap-sm shrink-0">
          <span className="material-symbols-outlined text-[18px]">download</span>
          Download PDF
        </Button>
      </div>

      <p className="font-body-md text-body-md text-on-surface-variant mb-lg leading-relaxed">
        {report.summary}
      </p>

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-md border-t border-outline-variant pt-md">
        <div>
          <p className="font-label-sm text-label-sm text-on-surface-variant">Wellness Score</p>
          <p className="font-display-lg-mobile text-display-lg-mobile text-secondary font-bold">
            {report.score}
            <span className="text-label-md text-outline">/100</span>
          </p>
        </div>
        <div>
          <p className="font-label-sm text-label-sm text-on-surface-variant">Deep Work</p>
          <p className="font-display-lg-mobile text-display-lg-mobile text-tertiary font-bold">
            {report.deepWorkHours}
            <span className="text-label-md text-outline">hrs</span>
          </p>
        </div>
        <div>
          <p className="font-label-sm text-label-sm text-on-surface-variant">Fatigue Risk</p>
          <p className="font-display-lg-mobile text-display-lg-mobile text-primary font-bold">
            {report.fatigueRisk}
          </p>
        </div>
      </div>
    </Card>
  );
};
export default ReportSummary;
