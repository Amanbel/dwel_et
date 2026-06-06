import React from 'react';
import { Card } from '../common/Card';
import { useLanguage } from '../../store/LanguageContext';

interface Recommendation {
  id: string;
  title: string;
  description: string;
}

interface RecommendationCardProps {
  recommendations: Recommendation[];
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendations }) => {
  const { t, tText } = useLanguage();

  return (
    <Card hoverable={false} className="dark:bg-surface-container-lowest dark:border-outline-variant">
      <div className="flex items-center gap-sm mb-lg border-b border-outline-variant dark:border-outline-variant/30 pb-sm">
        <span className="material-symbols-outlined text-primary">lightbulb</span>
        <h4 className="font-label-md text-label-md text-on-surface dark:text-on-surface font-bold">
          {t('specificRecs')}
        </h4>
      </div>
      <ul className="space-y-md">
        {recommendations.map((rec) => (
          <li key={rec.id} className="flex items-start gap-sm">
            <span className="material-symbols-outlined text-secondary mt-0.5 text-[18px]">check_circle</span>
            <div>
              <p className="font-label-md text-label-md text-on-surface dark:text-on-surface font-bold">{tText(rec.title)}</p>
              <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-on-surface-variant/80 mt-xs leading-relaxed">
                {tText(rec.description)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default RecommendationCard;
