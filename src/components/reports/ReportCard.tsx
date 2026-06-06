import React from 'react';
import { Report } from '../../types/report';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { useLanguage } from '../../store/LanguageContext';

interface ReportCardProps {
  report: Report;
  isSelected?: boolean;
  onClick?: () => void;
}

export const ReportCard: React.FC<ReportCardProps> = ({
  report,
  isSelected = false,
  onClick
}) => {
  const { t, tText, language } = useLanguage();

  return (
    <Card
      accentColor={isSelected ? 'primary' : 'none'}
      onClick={onClick}
      className={`cursor-pointer transition-all duration-200 dark:bg-surface-container-lowest dark:border-outline-variant ${
        isSelected ? 'border-primary ring-2 ring-primary/10' : ''
      }`}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-[11px] font-bold text-primary uppercase tracking-widest">
            {tText(report.dateRange)}
          </p>
          <h4 className="font-label-md text-label-md font-bold text-on-surface dark:text-on-surface mt-xs">
            {tText(report.title)}
          </h4>
        </div>
        <Badge status={report.score >= 80 ? 'positive' : 'neutral'}>
          {report.score}/100
        </Badge>
      </div>
      <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-on-surface-variant/80 mt-sm line-clamp-2 leading-relaxed">
        {tText(report.summary)}
      </p>
      <div className="flex gap-md border-t border-outline-variant dark:border-outline-variant/30 pt-sm mt-md">
        <div>
          <span className="text-[10px] text-outline dark:text-outline/80 block">{tText('Deep Work')}</span>
          <span className="font-label-sm text-label-sm font-bold text-tertiary">
            {report.deepWorkHours} {language === 'am' ? 'ሰዓት' : 'hrs'}
          </span>
        </div>
        <div>
          <span className="text-[10px] text-outline dark:text-outline/80 block">{t('fatigueRisk')}</span>
          <span className="font-label-sm text-label-sm font-bold text-primary">
            {tText(report.fatigueRisk)}
          </span>
        </div>
      </div>
    </Card>
  );
};
