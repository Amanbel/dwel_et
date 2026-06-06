import React from 'react';
import { Report } from '../../types/report';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { useLanguage } from '../../store/LanguageContext';

interface ReportSummaryProps {
  report: Report;
}

export const ReportSummary: React.FC<ReportSummaryProps> = ({ report }) => {
  const { t, tText, language } = useLanguage();

  const handleDownload = () => {
    alert(
      language === 'am'
        ? `ሪፖርቱን በማውረድ ላይ: ${tText(report.title)} (${tText(report.dateRange)})`
        : `Downloading PDF for report: ${report.title} (${report.dateRange})`
    );
  };

  return (
    <Card accentColor="primary" hoverable={false} className="relative overflow-hidden dark:bg-surface-container-lowest dark:border-outline-variant">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-md mb-md">
        <div>
          <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider">
            {t('weekOf')} {tText(report.dateRange)}
          </span>
          <h3 className="font-headline-md text-headline-md text-on-surface dark:text-on-surface mt-xs">
            {tText(report.title)}
          </h3>
        </div>
        <Button variant="primary" onClick={handleDownload} className="flex items-center gap-sm shrink-0">
          <span className="material-symbols-outlined text-[18px]">download</span>
          {t('downloadPdf')}
        </Button>
      </div>

      <p className="font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant/80 mb-lg leading-relaxed">
        {tText(report.summary)}
      </p>

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-md border-t border-outline-variant dark:border-outline-variant/30 pt-md">
        <div>
          <p className="font-label-sm text-label-sm text-on-surface-variant dark:text-on-surface-variant/80">{t('overallScore')}</p>
          <p className="font-display-lg-mobile text-display-lg-mobile text-secondary font-bold">
            {report.score}
            <span className="text-label-md text-outline dark:text-outline/80">/100</span>
          </p>
        </div>
        <div>
          <p className="font-label-sm text-label-sm text-on-surface-variant dark:text-on-surface-variant/80">{tText('Deep Work')}</p>
          <p className="font-display-lg-mobile text-display-lg-mobile text-tertiary font-bold">
            {report.deepWorkHours}
            <span className="text-label-md text-outline dark:text-outline/80">{language === 'am' ? 'ሰዓት' : 'hrs'}</span>
          </p>
        </div>
        <div>
          <p className="font-label-sm text-label-sm text-on-surface-variant dark:text-on-surface-variant/80">{t('fatigueRisk')}</p>
          <p className="font-display-lg-mobile text-display-lg-mobile text-primary font-bold">
            {tText(report.fatigueRisk)}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default ReportSummary;
